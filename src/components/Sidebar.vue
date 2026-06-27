<script setup>
import { ref } from 'vue'
import {
  RiPagesLine,
  RiTextSnippet,
  RiHeading,
  RiBarChart2Line,
  RiListCheck2,
  RiLayoutTop2Line,
  RiPhoneFindFill,
  RiFootprintLine,
  RiDoubleQuotesL,
  RiSaveLine,
  RiSparklingLine
} from '@remixicon/vue'

const emit = defineEmits(['tab-change', 'save-template', 'one-click-modify'])
const activeTab = ref('page')

const tabs = [
  { id: 'page', label: '页面', sublabel: 'Page Layout', icon: RiPagesLine },
  { id: 'body', label: '正文', sublabel: 'Body Text', icon: RiTextSnippet },
  { id: 'heading', label: '标题', sublabel: 'Headings', icon: RiHeading },
  { id: 'chart', label: '图表', sublabel: 'Charts & Tables', icon: RiBarChart2Line },
  { id: 'toc', label: '目录', sublabel: 'Table of Contents', icon: RiListCheck2 },
  { id: 'header', label: '页眉页脚', sublabel: 'Header & Footer', icon: RiLayoutTop2Line },
]

const selectTab = (tabId) => {
  activeTab.value = tabId
  emit('tab-change', tabId)
}
</script>

<template>
  <aside class="w-[280px] bg-cream border-r border-tan-border flex flex-col">
    <div class="px-6 pt-5 pb-5">
      <h3 class="text-base font-semibold text-brown-dark">文档排版标签</h3>
      <div class="w-full h-[1px] bg-tan-border mt-[2px]"></div>
      <p class="text-xs text-brown-muted mt-2">选择需要识别的排版元素</p>
    </div>

    <div class="flex-1 overflow-y-auto px-4 pb-4 space-y-1.5">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="selectTab(tab.id)"
        class="w-full rounded-xl p-2 transition-all text-left"
        :class="activeTab === tab.id
          ? 'bg-cinnabar text-white'
          : 'bg-cream-dark hover:bg-cream-darker text-brown-dark'"
      >
        <div class="flex items-center gap-2">
          <component :is="tab.icon" :size="16" :color="activeTab === tab.id ? 'white' : '#5C4033'" />
          <div class="flex-1">
            <div
              class="text-[13px]"
              :class="activeTab === tab.id ? 'font-semibold text-white' : 'font-medium text-brown-dark'"
            >
              {{ tab.label }}
            </div>
            <div
              class="text-[10px]"
              :class="activeTab === tab.id ? 'text-white/75' : 'text-brown-muted'"
            >
              {{ tab.sublabel }}
            </div>
          </div>
          <div
            v-if="activeTab === tab.id"
            class="w-[7px] h-[6px] bg-white rounded-[3px]"
          ></div>
        </div>
      </button>

      <div class="w-full h-[1px] bg-tan-border mt-4 mb-4"></div>

      <!-- 页码 -->
      <button
        @click="selectTab('pagenumber')"
        class="w-full rounded-xl p-2 transition-all text-left"
        :class="activeTab === 'pagenumber'
          ? 'bg-cinnabar text-white'
          : 'bg-cream-dark hover:bg-cream-darker text-brown-dark'"
      >
        <div class="flex items-center gap-2">
          <RiPhoneFindFill :size="16" :color="activeTab === 'pagenumber' ? 'white' : '#5C4033'" />
          <div class="flex-1">
            <div
              class="text-[13px]"
              :class="activeTab === 'pagenumber' ? 'font-semibold text-white' : 'font-medium text-brown-dark'"
            >
              页码
            </div>
            <div
              class="text-[10px]"
              :class="activeTab === 'pagenumber' ? 'text-white/75' : 'text-brown-muted'"
            >
              Page Number
            </div>
          </div>
        </div>
      </button>

      <!-- 脚注 -->
      <button
        @click="selectTab('footnote')"
        class="w-full rounded-xl p-2 transition-all text-left"
        :class="activeTab === 'footnote'
          ? 'bg-cinnabar text-white'
          : 'bg-cream-dark hover:bg-cream-darker text-brown-dark'"
      >
        <div class="flex items-center gap-2">
          <RiFootprintLine :size="16" :color="activeTab === 'footnote' ? 'white' : '#5C4033'" />
          <div class="flex-1">
            <div
              class="text-[13px]"
              :class="activeTab === 'footnote' ? 'font-semibold text-white' : 'font-medium text-brown-dark'"
            >
              脚注
            </div>
            <div
              class="text-[10px]"
              :class="activeTab === 'footnote' ? 'text-white/75' : 'text-brown-muted'"
            >
              Footnotes
            </div>
          </div>
        </div>
      </button>

      <!-- 引用 -->
      <button
        @click="selectTab('citation')"
        class="w-full rounded-xl p-2 transition-all text-left"
        :class="activeTab === 'citation'
          ? 'bg-cinnabar text-white'
          : 'bg-cream-dark hover:bg-cream-darker text-brown-dark'"
      >
        <div class="flex items-center gap-2">
          <RiDoubleQuotesL :size="16" :color="activeTab === 'citation' ? 'white' : '#5C4033'" />
          <div class="flex-1">
            <div
              class="text-[13px]"
              :class="activeTab === 'citation' ? 'font-semibold text-white' : 'font-medium text-brown-dark'"
            >
              引用
            </div>
            <div
              class="text-[10px]"
              :class="activeTab === 'citation' ? 'text-white/75' : 'text-brown-muted'"
            >
              Citations
            </div>
          </div>
        </div>
      </button>
    </div>

    <!-- 底部操作按钮 -->
    <div class="px-4 py-4 space-y-2">
      <button
        @click="emit('save-template')"
        class="w-full flex items-center justify-center gap-1.5 py-2 bg-cream-dark border border-gold-dark/50 rounded-xl text-brown font-semibold text-[12px] transition-all hover:bg-cream-darker"
      >
        <RiSaveLine size="16" color="#C8A45C" />
        保存到模板
      </button>
      <button
        @click="emit('one-click-modify')"
        class="w-full flex items-center justify-center gap-1.5 py-2 bg-cinnabar text-white rounded-xl font-semibold text-[12px] transition-all hover:bg-cinnabar-dark"
      >
        <RiSparklingLine size="16" color="white" />
        一键修改
      </button>
    </div>
  </aside>
</template>
