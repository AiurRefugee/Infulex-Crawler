

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/style/variables.scss'
import '@/style/index.scss'
import '@/style/common.scss'


import App from './App.vue'
const app = createApp(App)

import router from './router'



app.use(createPinia())
app.use(router)

app.mount('#app')
