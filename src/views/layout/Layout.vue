<template>
    <a-layout style="height: 100vh;">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="logo">
                <icon-svg class="logoSvg" icon-class="Vue" />
                    <span v-show="!collapsed">MyTodoList</span>

                <!-- TODO: Logo动画 -->
                <!-- <transition mode="out-in" name="name">
                    <span v-show="!collapsed">MyTodoList</span>
                </transition> -->
            </div>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="1">
                    <form-outlined />
                    <span>todoList</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <menu-unfold-outlined
                    v-if="collapsed"
                    class="trigger"
                    @click="() => (collapsed = !collapsed)"
                />
                <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            </a-layout-header>
            <a-layout-content
                :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
            >
            <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts">
import {
    FormOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PartitionOutlined
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
    components: {
        FormOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        PartitionOutlined
    },
    setup() {
        return {
            selectedKeys: ref<string[]>(['1']),
            collapsed: ref<boolean>(false),
        };
    },
});
</script>
<style>
/* MyTodoList动画 */

.name-enter-from,
.name-leave-to {
    opacity: 0;
}
.name-enter-active,
.name-leave-active {
    transition: opacity 0.5s ease;
}

.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.trigger:hover {
    color: #1890ff;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    font-size: 18px;
    color: #fff;
    margin: 16px;
}
.logoSvg {
    font-size: 32px;
}

.site-layout .site-layout-background {
    background: #fff;
}
</style>