# 项目情报

## 目录结构（截取主要层级）
```
.
├── Doc/
│   ├── plan.md          # 整体规划与需求
│   ├── todo-list.md     # 任务清单（已完成）
│   └── backlog.md       # 后续待办/增强
├── eleventy.config.js   # Eleventy 配置（集合、过滤器、短代码）
├── netlify.toml         # Netlify 部署配置
├── package.json         # npm 项目配置与脚本
├── postcss.config.cjs   # PostCSS（Tailwind + Autoprefixer）
├── tailwind.config.js   # Tailwind JIT 设置
├── scripts/
│   ├── build-sprite.js  # SVG Sprite 构建脚本
│   └── copy-js.js       # 将 JS 复制到静态资源
├── src/
│   ├── _data/           # 全局数据（站点信息、图标映射、i18n 字典等）
│   ├── _includes/       # 模板组件（卡片、分页、基础布局、Meta 等）
│   ├── articles/        # Markdown 案例，按语言子目录组织
│   ├── css/             # 样式入口 `style.css`
│   ├── js/              # 前端交互 `app.js`
│   ├── icons/           # 原始 SVG 图标 + 生成的 sprite
│   └── index.njk        # 首页模板（含 Eleventy 分页配置）
└── public/              # 构建输出（首页、分页、feed、sitemap 等）
```

## 技术栈摘要
- Node.js 22；npm 管理脚本。
- Eleventy 3.x 作为静态站点生成器，使用 collections、shortcode、i18n 字典。
- 原生 CSS + Tailwind JIT（仅生成使用到的工具类）、PostCSS Autoprefixer。
- 资源组织：Markdown 案例 + `_data` 全局数据 + `_includes` 模板。
- 构建脚本：`npm run build` → 清理 `public`、生成 SVG sprite、编译 CSS/JS、运行 Eleventy。
- 部署：Netlify（`netlify.toml` 指定命令 `npm run build` 与输出目录 `public/`）。

### `package.json` scripts
```json
{
  "clean": "node -e \"const fs=require('fs');fs.rmSync('public',{recursive:true,force:true});\"",
  "build:icons": "node scripts/build-sprite.js",
  "build:css": "npx tailwindcss -i ./src/css/style.css -o ./src/static/assets/main.css --minify",
  "build:js": "node scripts/copy-js.js",
  "build:assets": "npm-run-all build:css build:js",
  "eleventy:build": "npx @11ty/eleventy",
  "eleventy:serve": "npx @11ty/eleventy --serve",
  "build": "run-s clean build:icons build:assets eleventy:build",
  "watch:css": "npx tailwindcss -i ./src/css/style.css -o ./src/static/assets/main.css --watch",
  "watch:js": "node scripts/copy-js.js --watch",
  "watch:eleventy": "npx @11ty/eleventy --serve",
  "dev": "npm-run-all build:icons --parallel watch:css watch:js watch:eleventy",
  "lint": "eslint src/js --max-warnings=0",
  "format": "prettier --write \"src/**/*.{njk,md,css,js,json}\" eleventy.config.js Doc/**/*.md"
}
```

### 主题与样式基调
- 主色系参考 onevcat.com：
  - 浅色：背景 `#fafafa`，正文 `#333333`，强调 `#8e2a2a`，标题 `#b83636`，边框 `#f3f3f3`。
  - 深色：背景 `rgb(27,27,30)`，正文 `rgb(175,176,177)`，强调 `#cf6c6c`，标题 `#bc6e6e`，边框 `rgb(45,44,44)`。
- Prompt 复制按钮嵌入代码块右上角，默认 lucide copy 图标，复制成功切换为勾选图标，支持失败状态。

## Eleventy 关键逻辑
- collections：按语言拆分（`cases`, `cases_en`, `cases_jp`），内部按日期降序。
- 过滤器：`readableDate`, `dateIso`, `year`, `t`（多语言）、`toolIcon`（已转为模板中直接引用 sprite）。
- 短代码：分页导航（本地化文案）、语言切换、工具图标。
- 输出：主页使用分页生成 `/index.html`, `/page/N/index.html`；额外生成 `feed.xml`, `feed.json`, `sitemap.xml`。

## 发布与维护提示

### 发布流程
- 触发：`git push` 到 `master`。Netlify 监听默认分支，自动跑 `npm run build`，输出到 `public/`。没有手动 release 步骤，push 即发布。
- 完整 build 链路：`clean → download:icons → build:icons → translate:articles → build:assets → eleventy:build`。

### 新增 tool icon
1. 在 `src/_data/toolIcons.js` 增加条目，填好 `symbolId` / `title` / `svg`（lobehub 等来源的远端 URL）。
2. 本地跑 `npm run download:icons`，脚本会按 URL 拉取 svg 写入 `src/icons/raw/tools/<key>.svg`；对已存在的文件自动跳过，重复跑安全。
3. 把下载到的 svg 一并 `git add` 进 repo。
4. 不需要手动跑 `build:icons`，Netlify 端会自动重建 sprite。

> 为什么要把 svg 提交进 repo：Netlify 默认会跑 `download:icons`，但 unpkg 偶尔抽风（404、重定向异常）会拖垮 CI。把 svg 凝固进 repo，CI 走 "skip exists" 路径，外部依赖故障不影响发布。

## 后续可关注
- 根据 `Doc/backlog.md` 持续补充多语言内容、丰富 SVG 图标、增强性能（懒加载/预渲染）。
- Tailwind 构建警告提示未检测到 utility class，可考虑移除未用的 Tailwind 依赖或引入需要的工具类。
- `caniuse-lite` 警告可通过 `npx update-browserslist-db@latest` 维护最新浏览器数据。
