<script setup>
import { ref, watch, computed, onUnmounted } from 'vue'
import { Docx } from 'vue-office'

const props = defineProps({
  file: {
    type: File,
    default: null,
  },
})

const previewComponent = ref(null)
const previewUrl = ref(null)

// 计算文件扩展名
const fileExtension = computed(() => {
  if (!props.file) return ''
  return props.file.name.split('.').pop().toLowerCase()
})

// 监听文件变化
watch(() => props.file, (newFile) => {
  if (!newFile) {
    previewComponent.value = null
    previewUrl.value = null
    return
  }

  const ext = fileExtension.value
  
  // 根据文件类型设置对应的预览组件
  if (ext === 'docx') {
    previewComponent.value = Docx
    // 创建 Blob URL 用于预览
    previewUrl.value = URL.createObjectURL(newFile)
  }
}, { immediate: true })

// 组件卸载时清理
onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})
</script>

<template>
  <div class="w-full h-full bg-white shadow-lg overflow-auto p-8">
    <div v-if="!file" class="flex items-center justify-center h-full text-ink-black/40 font-xiaowei">
      请先上传文档
    </div>
    <div v-else class="max-w-[800px] mx-auto">
      <div class="mb-4 pb-4 border-b border-gold/30">
        <h3 class="font-calligraphy text-2xl text-cinnabar">{{ file.name }}</h3>
      </div>
      
      <!-- DOCX 预览 -->
      <div v-if="fileExtension === 'docx' && previewComponent" class="doc-preview">
        <component
          :is="previewComponent"
          :src="previewUrl"
          class="w-full"
          @rendered="console.log('文档预览渲染完成')"
        />
      </div>

      <!-- 不支持的格式提示 -->
      <div v-else-if="file && !previewComponent" class="text-center py-12 text-ink-black/50 font-xiaowei">
        <p class="text-lg mb-2">暂不支持预览此格式</p>
        <p class="text-sm">当前仅支持 DOCX 格式预览</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doc-preview {
  min-height: 600px;
}
</style>
