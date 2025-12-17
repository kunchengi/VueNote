import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useUserStore } from '@/store/user'

window.addEventListener('storage', (e) => {
    console.log('eeee',e);
    if (e.key === 'user') { // 对应persist的key
        const userStore = useUserStore()
        const newState = JSON.parse(e.newValue || '{}')
        userStore.$patch(newState) // 同步最新状态
    }
})

const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
createApp(App).use(pinia).mount('#app')
