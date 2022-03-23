import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// ant 按需引入
import { Layout, Menu, Form, Input, Checkbox, Button } from 'ant-design-vue';
// antd 样式引入
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'


// 引入字体图标全局组件
import IconSvg from './components/iconSvg/IconSvg.vue'

createApp(App)
    .component('icon-svg', IconSvg)
    .use(Button).use(Checkbox)
    .use(Input).use(Form)
    .use(Menu).use(store)
    .use(Layout)
    .use(router)
    .mount('#app')
