import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueCookieNext } from 'vue-cookie-next'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

VueCookieNext.config({ expire: '1MIN' })
VueCookieNext.setCookie('theme', 'default')
VueCookieNext.setCookie('hover-time', { expire: '1s' })

app.use(VueCookieNext, {
    expires: '1d',
})
app.use(router)
app.use(vuetify)

app.mount('#app')

