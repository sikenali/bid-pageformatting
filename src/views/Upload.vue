<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDocument } from '../composables/useDocument'
import { RiFileTextLine, RiFilePdfLine, RiFileList3Line, RiMarkdownLine, RiUploadCloud2Line, RiAddLine } from '@remixicon/vue'

const router = useRouter()
const { setFile } = useDocument()
const isDragging = ref(false)
const selectedFile = ref(null)

const handleDragOver = (e) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e) => {
  e.preventDefault()
  isDragging.value = false
  if (e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0]
    selectedFile.value = file
    setFile(file)
    router.push('/editor')
  }
}

const handleFileChange = (e) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0]
    selectedFile.value = file
    setFile(file)
    router.push('/editor')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center pt-20 px-8">
    <div class="max-w-[800px] w-full flex flex-col items-center">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-brown-dark mb-2">开始您的文档排版之旅</h1>
        <p class="text-base text-brown-muted">上传文档，智能识别排版元素，一键美化您的文档</p>
      </div>

      <div
        class="w-full border-2 border-dashed rounded-xl bg-cream p-[60px_40px] text-center transition-all cursor-pointer"
        :class="isDragging ? 'border-cinnabar bg-cinnabar/5' : 'border-tan-dark'"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
      >
        <div class="w-20 h-20 mx-auto mb-6 bg-cream-darker rounded-full flex items-center justify-center">
          <RiUploadCloud2Line size="36" color="#C43A31" />
        </div>

        <p class="text-xl font-semibold text-brown-dark mb-2">
          {{ selectedFile ? `已选择: ${selectedFile.name}` : '拖拽文件到此处，或点击上传' }}
        </p>

        <p class="text-sm text-brown-muted mb-6">支持 .docx / .pdf / .txt / .md 格式，单文件最大 50MB</p>

        <input
          type="file"
          id="file-input"
          class="hidden"
          accept=".docx,.pdf,.txt,.md"
          @change="handleFileChange"
        />

        <label
          for="file-input"
          class="inline-flex items-center gap-2 px-6 py-3 bg-cinnabar text-white rounded-lg cursor-pointer hover:bg-cinnabar-dark transition-colors font-medium"
        >
          <RiAddLine size="18" color="white" />
          <span>选择文件</span>
        </label>
      </div>

      <div class="flex items-center gap-6 mt-10">
        <div class="flex items-center gap-2 px-4 py-2 bg-cream-darker rounded-full">
          <RiFileTextLine size="16" color="#5B8C5A" />
          <span class="text-sm font-medium text-brown">DOCX</span>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 bg-cream-darker rounded-full">
          <RiFilePdfLine size="16" color="#C43A31" />
          <span class="text-sm font-medium text-brown">PDF</span>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 bg-cream-darker rounded-full">
          <RiFileList3Line size="16" color="#6B8CAE" />
          <span class="text-sm font-medium text-brown">TXT</span>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 bg-cream-darker rounded-full">
          <RiMarkdownLine size="16" color="#C8A45C" />
          <span class="text-sm font-medium text-brown">MD</span>
        </div>
      </div>
    </div>
  </div>
</template>
