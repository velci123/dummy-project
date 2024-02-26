import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', () => {
    const selectedLanguage = ref('en')

    const changeLanguage = (language: string) => {
        selectedLanguage.value = language
    }
  
    return { selectedLanguage, changeLanguage }
  })