<script setup>
import { ref, watch, computed } from 'vue'
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

const props = defineProps({
  file: {
    type: File,
    default: null,
  },
})

const docxBuffer = ref(null)

const fileExtension = computed(() => {
  if (!props.file) return ''
  return props.file.name.split('.').pop().toLowerCase()
})

const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

watch(() => props.file, async (newFile) => {
  docxBuffer.value = null
  if (!newFile) return
  if (fileExtension.value === 'docx') {
    try {
      docxBuffer.value = await readFileAsArrayBuffer(newFile)
    } catch (e) {
      console.error('读取文件失败:', e)
    }
  }
}, { immediate: true })
</script>

<template>
  <div class="w-full min-h-full bg-warm-gray overflow-auto py-8">
    <div v-if="!file" class="max-w-[680px] mx-auto bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] rounded-xl min-h-[842px] flex items-center justify-center">
      <p class="text-brown-muted text-lg font-xiaowei">请先上传文档</p>
    </div>
    <div v-else class="max-w-[864px] mx-auto bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] rounded-xl p-[1px]">
      <div v-if="fileExtension === 'docx' && docxBuffer" class="w-full">
        <VueOfficeDocx :src="docxBuffer" style="width: 100%;" />
      </div>
      <div v-else-if="fileExtension === 'docx' && !docxBuffer" class="flex items-center justify-center py-12 text-brown-muted font-xiaowei">
        <p class="text-lg">正在加载文档...</p>
      </div>
      <div v-else class="text-center py-12 text-brown-muted font-xiaowei">
        <p class="text-lg mb-2">暂不支持预览此格式</p>
        <p class="text-sm">当前仅支持 DOCX 格式预览</p>
      </div>
    </div>
  </div>
</template>
