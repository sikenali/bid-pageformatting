# 墨墨梧文 — 投标文件排版工具

上传 DOCX/PDF 文档，智能识别排版元素，一键生成规范化投标文件。中国古典水墨卷轴 × 现代杂志编辑风格。

## 快速开始

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 生产构建
```

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Vue 3 (Composition API + `<script setup>`) |
| 路由 | Vue Router 4 |
| 样式 | TailwindCSS v4 |
| 图标 | @remixicon/vue v4 |
| 文档预览 | vue-office |
| 构建 | Vite 5 |

## 项目结构

```
src/
├── App.vue                    # 根组件（Navbar + router-view）
├── components/
│   ├── Navbar.vue             # 顶部导航栏（Logo/文件信息/模板/设置）
│   ├── Sidebar.vue            # 编辑器左侧排版标签面板
│   └── DocumentPreview.vue    # DOCX 文档预览组件
├── composables/
│   ├── useDocument.js         # 文件状态（跨组件共享）
│   └── useSettings.js         # 主题/模板/显示选项（跨组件共享）
├── views/
│   ├── Upload.vue             # 上传页（拖拽/点击上传）
│   ├── Editor.vue             # 编辑器（三栏布局）
│   ├── Compare.vue            # 对比页（并排/叠加模式 + 差异导航）
│   ├── Settings.vue           # 设置页（主题/模板/显示模式）
│   └── Template.vue           # 模板书架页
├── router/
│   └── index.js               # 路由配置（5 条路由）
└── styles/
    └── tailwind.css           # Tailwind 主题色/字体 tokens
```

## 路由

| 路径 | 页面 | 说明 |
|---|---|---|
| `/` | Upload | 文件上传 |
| `/editor` | Editor | 文档排版编辑 |
| `/compare` | Compare | 修改前后对比 |
| `/settings` | Settings | 主题/模板/显示设置 |
| `/template` | Template | 模板书架 |

## 功能

- **文件上传** — 拖拽或点击选择 DOCX/PDF/TXT/MD 文件（最大 50MB）
- **文档预览** — 基于 vue-office 渲染 DOCX 内容
- **排版标签** — 页面/正文/标题/图表/目录/页眉页脚 6 类设置
- **一键排版** — 应用预设规则生成规范化文档
- **前后对比** — 并排 / 叠加两种对比模式，逐处浏览差异
- **主题切换** — 浅色/深色/纯白三种配色方案
- **模板书架** — 按公文/学术/商务/创意分类，选中模板一键应用
- **批注与高亮** — 控制修改建议的展示方式

## 设计系统

- 主色：朱红 `#C23B22` / 金色 `#D4AF37` / Jade 绿 `#2D8B57`
- 底色：羊皮纸 `#FDF6E3`
- 字体：思源黑体（正文）/ Noto Serif SC（宋体）/ Ma Shan Zheng（书法）
