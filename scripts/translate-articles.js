const fs = require("fs/promises");
const path = require("path");

const SOURCE_LANG = "zh";
const TARGET_LANGS = ["en", "jp"];
const LANGUAGE_LABELS = {
  zh: "Simplified Chinese",
  en: "English",
  jp: "Japanese",
};
const LANGUAGE_CODES = {
  zh: "zh",
  en: "en",
  jp: "ja",
};
const PROMPT_TEMPLATE_PATH = path.join(__dirname, "translation-prompt.txt");
const TAG = "[translate-articles]";

// The Codex CLI may default to a model you don't have access to via ~/.codex/config.toml.
// Pin a known-good default, and allow override via env.
const CODEX_MODEL = process.env.CODEX_MODEL || "gpt-5.2-codex";

async function main() {
  try {
    const sourceDir = path.join(__dirname, "..", "src", "articles", SOURCE_LANG);
    const promptTemplate = await loadPromptTemplate();
    if (!promptTemplate) {
      console.warn(`${TAG} Missing prompt template; skipping translations.`);
      return;
    }

    const sourceFiles = await collectMarkdownFiles(sourceDir);
    if (!sourceFiles.length) {
      console.info(
        `${TAG} No source articles found under ${SOURCE_LANG}; skipping translations.`
      );
      return;
    }

    const tasks = await gatherTranslationTasks(sourceFiles);
    if (!tasks.length) {
      console.info(
        `${TAG} No pending translations; all target languages are up to date.`
      );
      return;
    }

    let codex;
    try {
      codex = await createCodexClient();
    } catch (error) {
      console.warn(`${TAG} ${error.message}`);
      return;
    }

    const successes = [];
    const failures = [];

    for (const task of tasks) {
      console.info(
        `${TAG} Translating zh/${task.relativePath} -> ${task.targetLang}`
      );
      const ok = await processTranslationTask({
        ...task,
        codex,
        promptTemplate,
        sourceDir,
      });
      const targetRef = `${task.targetLang}/${task.relativePath}`;
      if (ok) {
        successes.push(targetRef);
      } else {
        failures.push(targetRef);
      }
    }

    if (successes.length) {
      console.info(
        `${TAG} Completed ${successes.length} translation(s): ${successes.join(
          ", "
        )}`
      );
    }

    if (failures.length) {
      console.warn(
        `${TAG} Failed ${failures.length} translation(s): ${failures.join(", ")}`
      );
    }

    if (!successes.length && !failures.length) {
      console.info(`${TAG} No translations were executed.`);
    }
  } catch (error) {
    console.warn(`${TAG} Unexpected error: ${error.message}`);
  }
}

async function loadPromptTemplate() {
  try {
    return await fs.readFile(PROMPT_TEMPLATE_PATH, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn(`${TAG} Failed to read prompt template: ${error.message}`);
    }
    return null;
  }
}

async function collectMarkdownFiles(baseDir) {
  const result = [];

  async function walk(dir, relative = "") {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch (error) {
      if (error.code === "ENOENT") {
        return;
      }
      throw error;
    }

    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);
      const entryRelative = relative
        ? path.join(relative, entry.name)
        : entry.name;

      if (entry.isDirectory()) {
        await walk(entryPath, entryRelative);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        result.push(entryRelative);
      }
    }
  }

  await walk(baseDir);
  result.sort();
  return result;
}

async function gatherTranslationTasks(sourceFiles) {
  const tasks = [];
  const baseDir = path.join(__dirname, "..", "src", "articles");

  for (const targetLang of TARGET_LANGS) {
    const targetDir = path.join(baseDir, targetLang);
    const targetFiles = await collectMarkdownFiles(targetDir);
    const targetSet = new Set(targetFiles);

    for (const relativePath of sourceFiles) {
      if (!targetSet.has(relativePath)) {
        tasks.push({
          targetLang,
          relativePath,
        });
      }
    }
  }

  return tasks;
}

async function createCodexClient() {
  try {
    const codexModule = await import("@openai/codex-sdk");
    const CodexCtor = codexModule.Codex || codexModule.default;
    if (!CodexCtor) {
      throw new Error("Codex SDK export not found.");
    }
    return new CodexCtor();
  } catch (error) {
    if (
      error.message.includes("Cannot find module") ||
      error.message.includes("Cannot find package")
    ) {
      throw new Error(
        "Codex SDK not installed or unavailable; skipping translations."
      );
    }
    throw new Error(`Unable to initialise Codex SDK: ${error.message}`);
  }
}

async function processTranslationTask({
  codex,
  promptTemplate,
  sourceDir,
  targetLang,
  relativePath,
}) {
  const sourceFilePath = path.join(sourceDir, relativePath);
  const targetDir = path.join(__dirname, "..", "src", "articles", targetLang);
  const targetFilePath = path.join(targetDir, relativePath);

  let sourceContent;
  try {
    sourceContent = await fs.readFile(sourceFilePath, "utf8");
  } catch (error) {
    console.warn(
      `${TAG} Failed to read source file ${relativePath}: ${error.message}`
    );
    return false;
  }

  const prompt = buildPrompt(promptTemplate, {
    SOURCE_LANGUAGE_LABEL: LANGUAGE_LABELS[SOURCE_LANG],
    SOURCE_LANGUAGE_CODE: LANGUAGE_CODES[SOURCE_LANG],
    TARGET_LANGUAGE_LABEL: LANGUAGE_LABELS[targetLang],
    TARGET_LANGUAGE_CODE: LANGUAGE_CODES[targetLang],
    ARTICLE_FILENAME: relativePath,
    SOURCE_CONTENT: sourceContent,
  });

  try {
    const translatedContent = await runTranslation(codex, prompt);
    if (!translatedContent.trim().startsWith("---")) {
      throw new Error("Translated output missing YAML front matter.");
    }

    await fs.mkdir(path.dirname(targetFilePath), { recursive: true });
    await fs.writeFile(targetFilePath, ensureTrailingNewline(translatedContent), "utf8");
    console.info(
      `${TAG} Created ${targetLang}/${relativePath} from zh/${relativePath}`
    );
    return true;
  } catch (error) {
    console.warn(
      `${TAG} Translation failed for ${targetLang}/${relativePath}: ${error.message}`
    );
    return false;
  }
}

function buildPrompt(template, variables) {
  return Object.entries(variables).reduce((acc, [key, value]) => {
    const token = `{{${key}}}`;
    return acc.split(token).join(value);
  }, template);
}

async function runTranslation(codex, prompt) {
  const thread = codex.startThread({ skipGitRepoCheck: true, model: CODEX_MODEL });
  const turn = await thread.run(prompt);
  const response = turn?.finalResponse;

  if (typeof response !== "string" || !response.trim()) {
    throw new Error("Empty response from Codex.");
  }

  return response.trim();
}

function ensureTrailingNewline(content) {
  return content.endsWith("\n") ? content : `${content}\n`;
}

main();
