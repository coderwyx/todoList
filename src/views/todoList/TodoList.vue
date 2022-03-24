<template>
    <todo-list-filter></todo-list-filter>
    <a-table :columns="columns" :data-source="store.state.filterTodoList" rowKey="id" bordered>
        <template #state="{ text: state }">
            <span>
                <a-tag :color="state === '0' ? 'red' : 'green'">{{ state === '0' ? '未完成' : '已完成' }}</a-tag>
            </span>
        </template>
        <template #action="{ record }">
            <span>
                <a>编辑</a>
                <a-divider type="vertical" />
                <!-- <a>状态</a> -->
                <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click.prevent>状态</a>
                    <template #overlay>
                        <a-menu>
                            <a-radio-group @change="stateChange" v-model:value="record.state">
                                <a-menu-item>
                                    <!-- <a href="javascript:;">1st menu item</a> -->
                                    <a-radio :style="radioStyle" value="0">未完成</a-radio>
                                </a-menu-item>
                                <a-menu-item>
                                    <!-- <a href="javascript:;">2nd menu item</a> -->
                                    <a-radio :style="radioStyle" value="1">已完成</a-radio>
                                </a-menu-item>
                            </a-radio-group>
                        </a-menu>
                    </template>
                </a-dropdown>
                <a-divider type="vertical" />

                <a-popconfirm
                    title="确定删除这条Todo吗？"
                    ok-text="是"
                    cancel-text="否"
                    @confirm="confirm(record.id)"
                >
                    <a>删除</a>
                </a-popconfirm>
            </span>
        </template>
    </a-table>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { DELETE_TODO_ITEM, TODO_LIST_FILTER } from '../../store/mutation-types'
import { message } from 'ant-design-vue';
import { useStore } from 'vuex'
import TodoListFilter from './components/TodoListFilter.vue'

const columns = [
    {
        dataIndex: 'title',
        key: 'title',
        title: '标题',
        width: '800px'
    },
    {
        dataIndex: 'state',
        key: 'state',
        title: '状态',
        align: 'center',
        slots: {
            customRender: 'state'
        }
    },

    {
        title: '操作',
        key: 'action',
        align: 'center',
        slots: { customRender: 'action' },
    },
];
export default defineComponent({
    name: 'TodoList',
    props: {

    },
    components: {
        TodoListFilter
    },

    setup() {
        const store = useStore()

        const radioStyle = reactive({
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        });
        const confirm = (id: number) => {
            store.commit(DELETE_TODO_ITEM, id)
            message.success('删除成功')

        }
        const stateChange = () => {
            message.success('修改状态成功')
        }

        return {
            store,
            columns,
            radioStyle,
            confirm,
            stateChange
        }
    }
})
</script>

<style scoped lang='scss'>
</style>