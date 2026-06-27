<script setup>
import { computed, ref } from 'vue'
import { useDocument } from '../composables/useDocument'
import Sidebar from '../components/Sidebar.vue'
import DocumentPreview from '../components/DocumentPreview.vue'
import { RiResetLeftLine, RiZoomOutLine, RiZoomInLine, RiFilePaper2Line, RiBookmark3Line, RiPagesLine, RiLayout2Line, RiCollageLine, RiFileEditLine, RiListCheck, RiLayoutTop2Line } from '@remixicon/vue'

const { getFile } = useDocument()
const currentFile = computed(() => getFile())

const tabIcons = {
  page: RiFilePaper2Line,
  body: RiFileEditLine,
  heading: RiBookmark3Line,
  chart: RiCollageLine,
  toc: RiListCheck,
  header: RiLayoutTop2Line,
}

const tabTitles = {
  page: '页面设置',
  body: '正文设置',
  heading: '标题设置',
  chart: '图表设置',
  toc: '目录设置',
  header: '页眉页脚设置',
}

const tabSubtitles = {
  page: '配置页面尺寸、边距与方向',
  body: '调整正文字体、字号与行距',
  heading: '设置各级标题样式',
  chart: '配置图表样式与位置',
  toc: '设置目录层级与格式',
  header: '配置页眉页脚内容、位置与样式',
}

const activeTab = ref('page')
</script>

<template>
  <div class="h-[calc(100vh-4rem)] flex">
    <Sidebar @tab-change="activeTab = $event" />

    <div class="flex-1 flex flex-col bg-warm-gray">
      <div class="bg-cream border-b border-tan-border">
        <div class="flex items-center justify-between px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-cinnabar flex items-center justify-center">
              <component :is="tabIcons[activeTab] || RiFilePaper2Line" size="18" color="white" />
            </div>
            <div>
              <div class="text-[16px] font-bold text-brown-dark">{{ tabTitles[activeTab] || '排版设置' }}</div>
              <div class="text-[12px] text-brown-muted">{{ tabSubtitles[activeTab] || '配置文档排版参数' }}</div>
            </div>
          </div>
          <button class="flex items-center gap-1 px-3 py-1.5 bg-cream-dark rounded-lg text-[12px] font-medium text-brown-muted">
            <RiResetLeftLine size="14" color="#8B7355" />
            重置
          </button>
        </div>
      </div>

      <div v-if="activeTab === 'page'" class="bg-cream px-6 py-4 border-b border-tan-border">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3">
            <span class="text-[13px] font-medium text-brown whitespace-nowrap">纸张大小</span>
            <select class="px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown min-w-[180px]">
              <option>A4 (210mm × 297mm)</option>
              <option>A3 (297mm × 420mm)</option>
              <option>Letter (216mm × 279mm)</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[13px] font-medium text-brown">页边距</span>
            <input type="number" placeholder="上" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown text-center" />
            <input type="number" placeholder="下" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown text-center" />
            <input type="number" placeholder="左" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown text-center" />
            <input type="number" placeholder="右" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown text-center" />
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[13px] font-medium text-brown">方向</span>
            <div class="flex bg-cream-darker rounded-lg p-0.5">
              <button class="px-4 py-1.5 bg-white text-cinnabar rounded-md text-[13px] font-semibold">纵向</button>
              <button class="px-4 py-1.5 text-brown rounded-md text-[13px] font-medium">横向</button>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'body'" class="bg-cream px-6 py-4 border-b border-tan-border">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3">
            <span class="text-[13px] font-medium text-brown whitespace-nowrap">字体</span>
            <select class="px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown min-w-[120px]">
              <option>宋体</option>
              <option>仿宋</option>
              <option>黑体</option>
              <option>楷体</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[13px] font-medium text-brown">字号</span>
            <select class="px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown min-w-[120px]">
              <option>三号 (16pt)</option>
              <option>四号 (14pt)</option>
              <option>小四 (12pt)</option>
              <option>五号 (10.5pt)</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[13px] font-medium text-brown">行距</span>
            <select class="px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown min-w-[130px]">
              <option>固定值 28磅</option>
              <option>1.5倍行距</option>
              <option>双倍行距</option>
              <option>单倍行距</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[13px] font-medium text-brown">缩进</span>
            <input type="number" placeholder="首行" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown text-center" />
            <input type="number" placeholder="左" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown text-center" />
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'heading'" class="bg-cream px-6 py-4 border-b border-tan-border">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3">
            <span class="text-[13px] font-medium text-brown whitespace-nowrap">一级标题</span>
            <select class="px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown min-w-[100px]">
              <option>黑体</option>
            </select>
            <input type="number" placeholder="三号" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown text-center" />
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[13px] font-medium text-brown">二级标题</span>
            <select class="px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown min-w-[100px]">
              <option>楷体</option>
            </select>
            <input type="number" placeholder="四号" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown text-center" />
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[13px] font-medium text-brown">三级标题</span>
            <select class="px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown min-w-[100px]">
              <option>仿宋</option>
            </select>
            <input type="number" placeholder="小四" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown text-center" />
          </div>
        </div>
      </div>

      <div v-else class="bg-cream px-6 py-4 border-b border-tan-border">
        <div class="flex items-center justify-center py-6 text-brown-muted">
          <p class="text-[13px]">此功能正在开发中</p>
        </div>
      </div>

      <div class="bg-cream border-b border-tan-border px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button class="w-7 h-7 flex items-center justify-center bg-cream-darker rounded">
            <RiZoomOutLine size="14" color="#5C4033" />
          </button>
          <span class="text-[13px] font-medium text-brown-dark">100%</span>
          <button class="w-7 h-7 flex items-center justify-center bg-cream-darker rounded">
            <RiZoomInLine size="14" color="#5C4033" />
          </button>
          <div class="w-[2px] h-5 bg-tan-border mx-1"></div>
          <RiPagesLine size="16" color="#8B7355" />
          <span class="text-[13px] font-medium text-brown-dark">第 1 页 / 共 12 页</span>
          <RiFileEditLine size="16" color="#8B7355" />
        </div>
        <div class="flex bg-cream-darker rounded-lg p-0.5">
          <button class="w-8 h-7 flex items-center justify-center bg-white rounded">
            <RiLayout2Line size="16" color="#C23B22" />
          </button>
          <button class="w-8 h-7 flex items-center justify-center rounded">
            <RiCollageLine size="16" color="#8B7355" />
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-auto p-6">
        <DocumentPreview :file="currentFile" />
      </div>


    </div>
  </div>
</template>
