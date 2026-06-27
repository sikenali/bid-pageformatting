# 墨墨梧文 — 智能文档排版工具

面向投标文件的智能排版工具。上传 DOCX 文档后，通过标签化设置页面尺寸、正文字体、标题层级等参数，一键生成规范化文档，支持在线编辑与前后对比。

---

## 功能概览

| 功能 | 说明 |
|------|------|
| **文件上传** | 拖拽/点击上传 DOCX，自动跳转编辑器 |
| **在线编辑** | 基于 `@eigenpal/docx-editor-vue` 的 WYSIWYG 编辑器，支持修订、评论、表格插入 |
| **文档预览** | 基于 `@vue-office/docx` 的快速只读预览 |
| **排版标签** | 9 类标签（页面/正文/标题/图表/目录/页眉页脚/页码/脚注/引用），右侧联动设置面板 |
| **一键排版** | 应用排版参数，自动计算差异列表 |
| **前后对比** | 并排/叠加模式，差异导航，接受全部修改/导出文档 |
| **模板管理** | 保存/加载排版参数模板，内置 GB/T 政府公文等模板 |
| **主题切换** | 浅色（羊皮纸）/ 深色（护眼）/ 纯白纸，全局生效 |

---

## 设计风格

**中国古典水墨卷轴 × 现代杂志编辑风**

| 元素 | 实现 |
|------|------|
| **底色** | 羊皮纸 `#FDF6E3`，营造古典卷轴质感 |
| **主色** | 朱红 `#C23B22` — 按钮、选中态、强调 |
| **点缀** | 金色 `#D4AF37`、玉绿 `#2D8B57`、云蓝 `#5B7DB1` |
| **字体** | 思源黑体（正文）+ 马善政书法体（装饰标题）+ 站酷小薇体（UI 文字） |
| **布局** | 三栏式（侧边栏 + 预览区 + 设置面板），留白充足 |
| **边框** | 暖棕 `#E0D5C0`，模拟卷轴装裱 |

---

## 代码架构

```
bid-pageformatting/
├── src/
│   ├── components/
│   │   ├── Navbar.vue          # 顶部导航栏（Logo + 模板/设置按钮）
│   │   ├── Sidebar.vue         # 左侧排版标签面板（9 类标签）
│   │   └── SaveTemplateModal.vue  # 保存模板弹框
│   ├── composables/
│   │   ├── useDocument.js      # 文件状态跨组件共享（模块级闭包）
│   │   ├── useSettings.js      # 主题/模板/显示选项（localStorage 持久化）
│   │   ├── useFormatState.js   # 排版参数 + before/after 快照 + 差异计算
│   │   ├── useTemplates.js     # 用户模板 CRUD（localStorage）
│   │   └── useDocumentExport.js # DOCX 导出（mammoth + docx）
│   ├── views/
│   │   ├── Upload.vue          # 上传页
│   │   ├── Editor.vue          # 编辑器（三栏布局 + 双预览引擎）
│   │   ├── Compare.vue         # 前后对比页（并排/叠加模式）
│   │   ├── Settings.vue        # 设置页（主题/模板/显示模式）
│   │   └── Template.vue        # 模板书架
│   ├── router/
│   │   └── index.js            # 5 条路由
│   └── styles/
│       └── tailwind.css        # TailwindCSS v4 主题 tokens
```

### 核心组件关系

```
App.vue
├── Navbar.vue (sticky)
└── <router-view>
    ├── Upload.vue → useDocument.setFile() → /editor
    ├── Editor.vue
    │   ├── Sidebar.vue (排版标签)
    │   ├── DocxEditor (@eigenpal/docx-editor-vue)  ← 编辑模式
    │   └── VueOfficeDocx (@vue-office/docx)         ← 预览模式
    ├── Compare.vue → useFormatState.diffs
    ├── Settings.vue → useSettings
    └── Template.vue → useTemplates
```

### 状态管理

所有 composable 使用**模块级闭包**实现跨组件状态共享，无需 Vuex/Pinia：

| composable | 职责 | 持久化 |
|-----------|------|--------|
| `useDocument` | 当前上传文件 File 对象 | 内存 |
| `useSettings` | 主题/模板/显示选项 | localStorage |
| `useFormatState` | 排版参数 + 差异列表 | localStorage |
| `useTemplates` | 用户模板 CRUD | localStorage |

### 技术栈

- **Vue 3** (Composition API + `<script setup>`)
- **Vue Router 4** — 5 条路由
- **TailwindCSS v4** (CSS-first config) — 主题 tokens
- **@remixicon/vue** — 图标库
- **@eigenpal/docx-editor-vue** — 在线 DOCX 编辑器（修订/评论/协作）
- **@vue-office/docx** — 只读文档预览
- **mammoth** — DOCX 解析为 HTML
- **docx** — 生成规范化 DOCX 文件
- **Vite 5** — 构建工具
