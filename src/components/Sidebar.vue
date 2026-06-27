<script setup>
import { ref } from 'vue'

const emit = defineEmits(['tab-change'])
const activeTab = ref('page')

const tabs = [
  { id: 'page', label: '页面', sublabel: 'Page Layout', icon: '📄' },
  { id: 'body', label: '正文', sublabel: 'Body Text', icon: '📝' },
  { id: 'heading', label: '标题', sublabel: 'Headings', icon: '🔤' },
  { id: 'chart', label: '图表', sublabel: 'Charts & Tables', icon: '📊' },
  { id: 'toc', label: '目录', sublabel: 'Table of Contents', icon: '📑' },
  { id: 'header', label: '页眉页脚', sublabel: 'Header & Footer', icon: '📃' },
]

const selectTab = (tabId) => {
  activeTab.value = tabId
  emit('tab-change', tabId)
}
</script>

<template>
  <aside class="w-[280px] bg-[#FBF7EF] border-r border-[#E0D5C0] flex flex-col">
    <!-- 面板标题区 -->
    <div class="px-6 pt-5 pb-5">
      <h3 class="text-base font-semibold text-[#3D2B1F]">文档排版标签</h3>
      <div class="w-full h-[1px] bg-[#E0D5C0] mt-[2px]"></div>
      <p class="text-xs text-[#8B7355] mt-2">选择需要识别的排版元素</p>
    </div>

    <!-- 标签列表区 -->
    <div class="flex-1 overflow-y-auto px-4 pb-4">
      <div class="space-y-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="selectTab(tab.id)"
          class="w-full rounded-xl p-3 transition-all text-left"
          :class="activeTab === tab.id 
            ? 'bg-[#C43A31] text-white' 
            : 'bg-[#F5EFE0] hover:bg-[#EDE5D0]'"
        >
          <div class="flex items-center gap-3">
            <span class="text-[20px] w-6 text-center">{{ tab.icon }}</span>
            <div class="flex-1">
              <div class="text-[15px]" :class="activeTab === tab.id ? 'font-semibold text-white' : 'font-medium text-[#3D2B1F]'">
                {{ tab.label }}
              </div>
              <div class="text-[11px]" :class="activeTab === tab.id ? 'text-white/75' : 'text-[#8B7355]'">
                {{ tab.sublabel }}
              </div>
            </div>
            <!-- 选中指示器 -->
            <div 
              v-if="activeTab === tab.id"
              class="w-[9px] h-[8px] bg-white rounded-[4px]"
            ></div>
          </div>
        </button>
      </div>

      <!-- 分隔线 -->
      <div class="mt-4 mb-4">
        <div class="w-full h-[1px] bg-[#E0D5C0]"></div>
      </div>

      <!-- 页码标签 -->
      <button
        class="w-full rounded-xl p-3 bg-[#F5EFE0] hover:bg-[#EDE5D0] transition-all text-left"
      >
        <div class="flex items-center gap-3">
          <span class="text-[20px] w-6 text-center">🔢</span>
          <div class="flex-1">
            <div class="text-[15px] font-medium text-[#3D2B1F]">页码</div>
            <div class="text-[11px] text-[#8B7355]">Page Number</div>
          </div>
        </div>
      </button>
    </div>
  </aside>
</template>
