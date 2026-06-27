<script setup>
import { computed, ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import DocumentPreview from '../components/DocumentPreview.vue'
import { useDocument } from '../composables/useDocument'

const { getFile } = useDocument()
const currentFile = computed(() => getFile())
const activeTab = ref('page')
</script>

<template>
  <div class="h-[calc(100vh-4rem)] flex">
    <!-- 左侧标签面板 -->
    <Sidebar @tab-change="activeTab = $event" />

    <!-- 中间预览区 -->
    <div class="flex-1 flex flex-col">
      <div class="flex-1 p-4">
        <DocumentPreview :file="currentFile" />
      </div>

      <!-- 底部操作按钮 -->
      <div class="h-16 border-t border-[#E0D5C0] bg-white/50 flex items-center justify-end gap-4 px-6">
        <button class="px-6 py-2 text-sm font-medium text-[#5C4033] bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg hover:bg-[#F0E8D5] transition-colors">
          保存到模板
        </button>
        <button class="px-6 py-2 text-sm font-medium text-white bg-[#C43A31] rounded-lg hover:bg-[#A83028] transition-colors">
          一键修改
        </button>
      </div>
    </div>

    <!-- 右侧设置面板 -->
    <div class="w-[320px] bg-white border-l border-[#E0D5C0] p-6 overflow-y-auto">
      <h3 class="text-base font-semibold text-[#3D2B1F] mb-4">
        <span v-if="activeTab === 'page'">页面设置</span>
        <span v-else-if="activeTab === 'body'">正文设置</span>
        <span v-else-if="activeTab === 'heading'">标题设置</span>
        <span v-else-if="activeTab === 'chart'">图表设置</span>
        <span v-else-if="activeTab === 'toc'">目录设置</span>
        <span v-else-if="activeTab === 'header'">页眉页脚设置</span>
        <span v-else>排版设置</span>
      </h3>

      <!-- 页面设置 -->
      <div v-if="activeTab === 'page'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-[#5C4033] mb-2">纸张大小</label>
          <select class="w-full px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm text-[#5C4033]">
            <option>A4 (210mm × 297mm)</option>
            <option>A3 (297mm × 420mm)</option>
            <option>Letter (216mm × 279mm)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#5C4033] mb-2">页边距</label>
          <div class="grid grid-cols-2 gap-2">
            <input type="number" placeholder="上" class="px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm" />
            <input type="number" placeholder="下" class="px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm" />
            <input type="number" placeholder="左" class="px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm" />
            <input type="number" placeholder="右" class="px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#5C4033] mb-2">页面方向</label>
          <div class="flex gap-2">
            <button class="flex-1 py-2 bg-[#C43A31] text-white rounded-lg text-sm">纵向</button>
            <button class="flex-1 py-2 bg-[#F5EFE0] text-[#5C4033] rounded-lg text-sm">横向</button>
          </div>
        </div>
      </div>

      <!-- 正文设置 -->
      <div v-else-if="activeTab === 'body'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-[#5C4033] mb-2">字体</label>
          <select class="w-full px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm text-[#5C4033]">
            <option>宋体</option>
            <option>仿宋</option>
            <option>黑体</option>
            <option>楷体</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#5C4033] mb-2">字号</label>
          <select class="w-full px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm text-[#5C4033]">
            <option>三号 (16pt)</option>
            <option>四号 (14pt)</option>
            <option>小四 (12pt)</option>
            <option>五号 (10.5pt)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#5C4033] mb-2">行距</label>
          <select class="w-full px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm text-[#5C4033]">
            <option>固定值 28磅</option>
            <option>1.5倍行距</option>
            <option>双倍行距</option>
            <option>单倍行距</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#5C4033] mb-2">段落缩进</label>
          <div class="grid grid-cols-2 gap-2">
            <input type="number" placeholder="首行缩进" class="px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm" />
            <input type="number" placeholder="左缩进" class="px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm" />
            <input type="number" placeholder="右缩进" class="px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm" />
            <input type="number" placeholder="悬挂缩进" class="px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm" />
          </div>
        </div>
      </div>

      <!-- 标题设置 -->
      <div v-else-if="activeTab === 'heading'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-[#5C4033] mb-2">一级标题</label>
          <div class="space-y-2">
            <select class="w-full px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm">
              <option>黑体</option>
            </select>
            <input type="number" placeholder="字号 (三号)" class="w-full px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#5C4033] mb-2">二级标题</label>
          <div class="space-y-2">
            <select class="w-full px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm">
              <option>楷体</option>
            </select>
            <input type="number" placeholder="字号 (四号)" class="w-full px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#5C4033] mb-2">三级标题</label>
          <div class="space-y-2">
            <select class="w-full px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm">
              <option>仿宋</option>
            </select>
            <input type="number" placeholder="字号 (小四)" class="w-full px-3 py-2 bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg text-sm" />
          </div>
        </div>
      </div>

      <!-- 其他标签的占位内容 -->
      <div v-else class="text-center py-12 text-[#8B7355]">
        <p class="text-sm">暂无设置项</p>
        <p class="text-xs mt-2">此功能正在开发中</p>
      </div>
    </div>
  </div>
</template>
