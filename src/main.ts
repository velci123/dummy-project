import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import router from './router'
import App from '@/App.vue'

import en from "@/locales/en"
import tr from "@/locales/tr"

const i18n = createI18n({
    locale: 'en',
    availableLocales: ['en', 'tr'],
    fallbackLocale: 'en',
    legacy: false,
    messages: {
        en,
        tr
    }
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(router)
app.mount('#app')
