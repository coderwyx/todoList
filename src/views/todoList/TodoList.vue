<template>
    <todo-list-filter @add="add"></todo-list-filter>
    <a-table :columns="columns" :data-source="store.state.filterTodoList" rowKey="id" bordered>
        <template #state="{ text: state }">
            <span>
                <a-tag :color="state === '0' ? 'red' : 'green'">{{ state === '0' ? '未完成' : '已完成' }}</a-tag>
            </span>
        </template>
        <template #action="{ record }">
            <span>
                <a @click="edit(record.id)">编辑</a>
                <a-divider type="vertical" />
                <!-- <a>状态</a> -->
                <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click.prevent>状态</a>
                    <template #overlay>
                        <a-menu>
                            <a-radio-group @change="stateChange(record)" v-model:value="record.state">
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

                <a-popconfirm title="确定要删除这条Todo吗？" ok-text="是" cancel-text="否" @confirm="deleteItem(record.id)">
                    <a>删除</a>
                </a-popconfirm>
            </span>
        </template>
    </a-table>
    <todo-list-info v-model:visible="visible" :mode="mode" v-model:id="id" @refresh-todo-list="refreshTodoList">
    </todo-list-info>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { DELETE_TODO_ITEM, TODO_LIST_FILTER } from '../../store/mutation-types'
import { message } from 'ant-design-vue';
import { useStore } from 'vuex'
import TodoListFilter from './components/TodoListFilter.vue'
import TodoListInfo from './components/TodoListInfo.vue'
import { deleteTodo, editTodo, getTodoList } from '../../api/todo'
interface todoListType {
    title: string,
    state: '0' | '1',
    id: string
}
const columns = [
    {
        dataIndex: 'title',
        key: 'title',
        title: '标题',
        width: '60%'
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
        TodoListFilter,
        TodoListInfo
    },

    setup() {
        const store = useStore()
        let visible = ref<boolean>(false)
        let mode = ref<'add' | 'edit'>('add')
        let id = ref<string>('')
        const radioStyle = reactive({
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        });
        const todoList = ref<todoListType[]>([])
        onMounted(() => {
            refreshTodoList()
        })
        const edit = (infoId: string) => {
            console.log("编辑")
            mode.value = 'edit'
            id.value = infoId
            visible.value = true
        }
        const refreshTodoList = async () => {
            const res = await getTodoList()
            if (res.data.error === 0) {
                todoList.value = res.data.data
                store.commit('SET_TODO_LIST', res.data.data)
                store.commit('TODO_LIST_FILTER')
                console.log(store.state.todoList);

            }
        }
        const deleteItem = async (id: string) => {

            const res = await deleteTodo(id)
            if (res.data.error === 0) {
                message.success('删除成功')
                refreshTodoList()
            }
            // store.commit(DELETE_TODO_ITEM, id)
            // store.commit(TODO_LIST_FILTER, id)

        }

        const add = () => {
            console.log("添加")
            mode.value = 'add'
            visible.value = true
        }

        const stateChange = async (item: todoListType) => {
            console.log(item);
            const todoInfo = {
                title: item.title,
                state: item.state,
                id: item.id
            }
            const res = await editTodo(item.id, todoInfo)
            if (res.data.error === 0) {
                store.commit(TODO_LIST_FILTER)
                message.success('修改状态成功')
            }else{
                message.error('修改状态失败')
            }

        }

        return {
            store,
            columns,
            visible,
            radioStyle,
            mode,
            id,
            todoList,
            refreshTodoList,
            edit,
            add,
            deleteItem,
            stateChange
        }
    }
})
</script>

<style scoped lang='scss'>
</style>