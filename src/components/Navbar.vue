<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Settings, FileText } from 'lucide-vue-next'
import { useDocument } from '../composables/useDocument'

const router = useRouter()
const { getFile } = useDocument()
const currentFile = computed(() => getFile())
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 h-[72px] bg-parchment flex items-center justify-between px-8 z-50">
    <!-- 左侧品牌区 -->
    <div class="flex items-center gap-3 cursor-pointer" @click="router.push('/')">
      <!-- Logo 图标 -->
      <div class="w-11 h-11 bg-[#C43A31] rounded-lg flex items-center justify-center">
        <span class="text-white text-2xl">墨</span>
      </div>
      <!-- 品牌名称 -->
      <div class="flex flex-col">
        <span class="text-lg font-bold text-[#3D2B1F] tracking-tight">墨韵排版</span>
        <span class="text-xs text-[#8B7355]">MoYun Typesetting</span>
      </div>
    </div>

    <!-- 右侧操作区 -->
    <div class="flex items-center gap-4">
      <!-- 当前文件信息 -->
      <div
        v-if="currentFile"
        class="flex items-center gap-2 px-3 py-2 bg-[#F5EFE0] rounded-lg text-sm"
      >
        <span class="text-[#5B8C5A] text-base">📄</span>
        <span class="text-[#5C4033] font-medium truncate max-w-[143px]">{{ currentFile.name }}</span>
      </div>

      <button
        @click="router.push('/editor')"
        class="flex items-center gap-2 px-4 py-2 text-sm bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg hover:bg-[#F0E8D5] transition-colors"
      >
        <span class="text-[#8B7355] text-base">📋</span>
        <span class="text-[#5C4033] font-medium">模板</span>
      </button>
      <button
        @click="router.push('/settings')"
        class="w-10 h-10 flex items-center justify-center bg-[#F5EFE0] border border-[#E0D5C0] rounded-lg hover:bg-[#F0E8D5] transition-colors"
      >
        <Settings :size="20" class="text-[#8B7355]" />
      </button>
    </div>
  </nav>
</template>
