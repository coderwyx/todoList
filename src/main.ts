import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// ant 按需引入
import { Layout, Menu, Form, Input, Checkbox, Button, Card, Row, Col, Select, Table, Tag, Divider, Dropdown, Radio, Popconfirm, Modal } from 'ant-design-vue';
// antd 样式引入
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import './style/index.css'

// 引入字体图标全局组件
import IconSvg from './components/iconSvg/IconSvg.vue'

const app = createApp(App)
app.component('icon-svg', IconSvg)
    .use(Button).use(Checkbox)
    .use(Input).use(Form)
    .use(Menu).use(store)
    .use(Layout)
    .use(Card)
    .use(Row)
    .use(Col)
    .use(Select)
    .use(Table)
    .use(Dropdown)
    .use(Radio)
    .use(Divider)
    .use(Tag)
    .use(Modal)
    .use(Popconfirm)
    .use(router)
    .mount('#app')
