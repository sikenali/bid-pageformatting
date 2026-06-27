import { ref } from 'vue'

// 使用闭包存储，保证跨组件共享
const currentFile = ref(null)

export function useDocument() {
  return {
    currentFile,
    setFile(file) {
      currentFile.value = file
    },
    getFile() {
      return currentFile.value
    },
    clearFile() {
      currentFile.value = null
    }
  }
}
