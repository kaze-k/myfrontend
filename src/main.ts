import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import 'reset-css/less/reset.less'
import 'font-awesome/css/font-awesome.min.css'
// import '@/mock/index.js'

const app = createApp(App)
app.use(router)

app.mount('#app')
