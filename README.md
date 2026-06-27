# 墨墨梧文 — 投标文件排版工具

**墨墨梧文** 是一款面向投标文件的智能排版工具。用户上传 DOCX 文档后，系统提取版面信息，通过标签化设置页面尺寸/正文字体/标题层级等参数，一键生成符合国家标准的规范化投标文件。

**设计风格**：中国古典水墨卷轴 × 现代杂志编辑风格。主色调为朱红 Cinnabar 与羊皮纸 Parchment，字体使用思源黑体 + Noto Serif SC。

---

## 技术栈

| 层 | 选型 | 版本 |
|---|------|------|
| 框架 | Vue 3 (Composition API + `<script setup>`) | ^3.4 |
| 路由 | Vue Router 4 | ^4.2 |
| 样式 | TailwindCSS v4（CSS-first config） | ^4.0 |
| 图标 | @remixicon/vue | ^4.9 |
| 文档解析 | mammoth (HTML 转换) + docx (生成) | ^1.12 / ^9.7 |
| 文档预览 | @vue-office/docx | ^1.6 |
| 构建 | Vite 5 | ^5.0 |
| 构建插件 | @tailwindcss/vite + @vitejs/plugin-vue | |

---

## 项目结构

```
bid-pageformatting/
├── index.html                          # SPA 入口
├── package.json
├── vite.config.js                      # Vite + Vue + Tailwind 配置
├── src/
│   ├── main.js                         # 应用入口
│   ├── App.vue                         # 根组件（Navbar + router-view + 主题）
│   ├── components/
│   │   ├── Navbar.vue                  # 固定顶部导航栏（Logo + 模板/设置按钮）
│   │   ├── Sidebar.vue                 # 编辑器左侧排版标签面板（9 类标签）
│   │   ├── DocumentPreview.vue         # DOCX 文档预览组件（vue-office）
│   │   ├── SaveTemplateModal.vue       # 保存模板弹框
│   │   └── PreviewTemplateModal.vue    # 模板预览弹框（预览 + 参数汇总）
│   ├── composables/
│   │   ├── useDocument.js              # 文件状态跨组件共享
│   │   ├── useSettings.js              # 主题/模板/显示选项（localStorage）
│   │   ├── useFormatState.js           # 排版参数状态 + 差异计算引擎
│   │   ├── useTemplates.js             # 模板 CRUD（localStorage）
│   │   └── useDocumentExport.js        # 排版后 DOCX 导出（mammoth + docx）
│   ├── views/
│   │   ├── Upload.vue                  # 上传页（拖拽 + 进度模拟动画）
│   │   ├── Editor.vue                  # 编辑器（三栏：Sidebar + 预览 + 设置面板）
│   │   ├── Compare.vue                 # 对比页（并排/叠加模式 + 差异导航）
│   │   ├── Settings.vue                # 设置页（主题/内置模板/显示模式）
│   │   └── Template.vue                # 模板书架（分类导航 + 180×240 卡片 + 底部栏）
│   ├── router/
│   │   └── index.js                    # 5 条路由
│   └── styles/
│       └── tailwind.css                # 主题色 tokens + 深色/纸色主题变量
```

---

## 架构与数据流

### 组件树

```
App.vue
├── Navbar.vue (fixed top, h-16)
└── <router-view>
    ├── Upload.vue          → useDocument.setFile()
    ├── Editor.vue           → useFormatState.formatParams
    │   ├── Sidebar.vue      (9 标签 + 保存/一键修改)
    │   ├── DocumentPreview.vue (vue-office)
    │   └── SaveTemplateModal.vue
    ├── Compare.vue          → useFormatState.diffs + useDocumentExport
    ├── Settings.vue         → useSettings
    └── Template.vue         → useTemplates
        └── PreviewTemplateModal.vue
```

### 跨组件状态（模块级闭包共享）

| composable | 用途 | 持久化 |
|-----------|------|--------|
| `useDocument` | 当前上传文件 File 对象 | 无（内存） |
| `useSettings` | 主题/模板/显示选项 | localStorage `bid-page-settings` |
| `useFormatState` | 排版参数 + before/after 快照 + 差异列表 | localStorage `bid-page-format-state` |
| `useTemplates` | 用户模板 CRUD | localStorage `bid-page-user-templates` |

### 核心业务流程

```
上传 → Upload.vue
  simulateUpload() → useDocument.setFile(file)
  → router.push('/editor')

排版 → Editor.vue
  用户切换 tab → 调整 formatParams
  点击「保存到模板」→ SaveTemplateModal → useTemplates.saveTemplate(name, category, formatParams)
  点击「一键修改」→ useFormatState.applyFormatting()（拍快照 + 计算 diffs）
  → router.push('/compare')

对比 → Compare.vue
  读取 diffs → 并排/叠加渲染
  点击「导出文档」→ useDocumentExport.exportFormattedDoc()（mammoth 解析 → docx 重建 → 下载）

设置 → Settings.vue
  主题切换 → data-theme 属性 + CSS 变量覆写
  内置模板选择 → 显示模式开关（批注/高亮）→ localStorage

模板 → Template.vue
  分类筛选 → 选择模板 → 底部操作栏（预览/应用）
  预览弹框 → vue-office + 参数汇总
  应用 → router.push('/editor')
```

---

## 路由

| 路径 | 页面 | 组件 | 说明 |
|------|------|------|------|
| `/` | 上传 | Upload.vue | 文件上传首页 |
| `/editor` | 编辑器 | Editor.vue | 文档排版编辑 |
| `/compare` | 对比 | Compare.vue | 修改前后差异对比 |
| `/settings` | 设置 | Settings.vue | 主题/模板/显示模式 |
| `/template` | 模板书架 | Template.vue | 用户保存模板管理 |

---

## 功能

### 文件上传
- 拖拽上传 / 点击选择文件
- 格式支持：DOCX / PDF / TXT / MD（最大 50MB）
- 上传进度模拟动画
- 上传完成后自动跳转编辑器

### 文档预览
- 基于 @vue-office/docx 渲染 DOCX 内容
- 纸卡样式：白色背景 + 阴影，max-w 864px
- 深色/纸色主题下自动适配卡片背景色

### 排版标签（Sidebar 9 类）
| 标签 | 设置项 |
|------|--------|
| 页面 | 纸张大小（A4/A3/Letter）、页边距（上下左右）、方向（纵向/横向） |
| 正文 | 字体（宋/仿宋/黑/楷）、字号（三号~五号）、行距、缩进 |
| 标题 | 一级/二级/三级标题的字体与字号 |
| 图表 | _（开发中）_ |
| 目录 | _（开发中）_ |
| 页眉页脚 | _（开发中）_ |
| 页码 | _（开发中）_ |
| 脚注 | _（开发中）_ |
| 引用 | _（开发中）_ |

### 一键排版
- 拍 formatParams 快照 → 计算优化后参数 → 生成差异列表
- 差异包含：分类 / 标签 / 修改前值 / 修改后值 / 合规说明
- 排版规则参照 GB/T 9704-2012 公文标准

### 前后对比
- 两种模式：**并排对比**（左右对照）/ **叠加对比**（半透明覆盖）
- 差异导航：上一处 / 下一处逐个浏览
- 差异卡片：红色（修改前）→ 绿色（修改后）带合规说明
- 接受全部修改 / 导出文档

### 文档导出
- mammoth 解析原始 DOCX 为 HTML
- docx 库按排版参数重建结构化文档
- 自动识别标题层级（一、二、三级）
- 下载为「原文件名_已排版.docx」

### 设置
- **主题**：浅色（羊皮纸）/ 深色（护眼）/ 纯白纸
- **内置模板**：GB/T 国家标准 / 政府公文 / 学术论文 / 商务报告
- **显示模式**：高亮修改处 / 批注形式展示（含预览）
- 取消 / 应用设置按钮在 section header 右侧

### 模板书架
- **分类导航**：全部 / 公文 / 学术 / 商务 / 创意（左侧 280px 面板）
- **模板卡片**：180×240px，书脊色条 + 图标 + 名称 + 分类
- **选中交互**：cinnabar 2.7px 描边 + 阴影 + 底部选中指示器
- **底部操作栏**：选中模板后显示，支持预览 / 应用所选
- **模板预览弹框**：vue-office 预览 + 参数汇总（页面/正文/标题）

---

## 设计系统

### 颜色（Light Theme）

| Token | Hex | 用途 |
|-------|-----|------|
| `cinnabar` | `#C23B22` | 主色、选中态、按钮 |
| `gold` | `#D4AF37` | 金色点缀 |
| `jade` | `#2D8B57` | 绿色强调 |
| `parchment` | `#FDF6E3` | 页面底色 |
| `cream` | `#FBF7EF` | 卡片色 |
| `cream-dark` | `#F5EFE0` | 按钮/面板底色 |
| `cream-darker` | `#F0E8D5` | 悬停/分割态 |
| `tan-border` | `#E0D5C0` | 边框色 |
| `ink-black` | `#2C2C2C` | 正文强调 |
| `brown-dark` | `#3D2B1F` | 标题文字 |
| `brown` | `#5C4033` | 正文文字 |
| `brown-muted` | `#8B7355` | 辅助文字 |

### 深色主题 / 纸色主题
通过 `[data-theme]` CSS 选择器覆写 CSS 变量值，保持 token 名不变。

### 字体

| Token | 字体 | 用途 |
|-------|------|------|
| `sans` | Source Han Sans SC | 正文、UI 文字 |
| `songti` | Noto Serif SC | 文档正文 |
| `calligraphy` | Ma Shan Zheng | 装饰性标题 |
| `xiaowei` | ZCOOL XiaoWei | 占位提示文字 |

### 图标
@remixicon/vue 命名导入。禁止路径导入。
```js
// ✅ 正确
import { RiFileTextLine } from '@remixicon/vue'
// ❌ 错误
import RiFileTextLine from '@remixicon/vue/RiFileTextLine'
```

### 布局
- 设计稿宽度：1440px
- 导航栏高度：h-16（4rem）
- 页面容器：`max-w-7xl` + `px-8`
- 侧边栏宽度：`w-[280px]`

---

## 快速开始

```bash
# 安装依赖
npm install

# 开发服务器（默认 Vite 端口）
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

---

## 开发约定

- 所有颜色使用 Tailwind 主题 tokens，禁止硬编码 hex（已全部替换）
- RemixIcon 使用命名导入 `import { RiXxx } from '@remixicon/vue'`
- 深色主题下 inline style 中的硬编码色逐步替换为 rgba 半透明
- 组合式函数使用模块级闭包实现跨组件状态共享
- 模板参数以深克隆快照方式存储（`JSON.parse(JSON.stringify(...))`）
- View 组件名使用 PascalCase，composable 文件名使用 camelCase
