<template>
    <a-modal :visible="$props.visible" :title="$props.mode === 'add' ? '添加' : '编辑'" width="30%" @ok="handleOk"
        @cancel="handleCancel">
        <a-form :rules="rules" ref="formRef" :model="store.state.todoInfo" :label-col="labelCol"
            :wrapper-col="wrapperCol">
            <a-form-item label="标题" name="title">
                <a-input v-model:value="store.state.todoInfo.title" />
            </a-form-item>
            <a-form-item label="状态" name="state">
                <a-select ref="select" v-model:value="store.state.todoInfo.state">
                    <a-select-option value="1">已完成</a-select-option>
                    <a-select-option value="0">未完成</a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script lang='ts'>
import { defineComponent, reactive, watch, ref, onMounted } from 'vue'
import {
    ADD_TODO_ITEM,
    TODO_LIST_FILTER,
    CLEAR_TODO_INFO,
    GET_TODO_INFO,
    EDIT_TODO_ITEM
} from '../../../store/mutation-types'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue';
import { addTodo, editTodo } from '@/api/todo';
export default defineComponent({
    name: 'TodoListInfo',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        mode: {
            type: String,
            default: 'add'
        },
        id: {
            type: String,
            default: ''
        }
    },
    components: {

    },
    emits: ['update:visible', 'update:id', 'refreshTodoList'],
    setup(props, contents) {
        const store = useStore()
        const labelCol = reactive({
            span: 4
        })
        const wrapperCol = reactive({
            span: 18
        })
        const formRef = ref()

        watch(() => props.id, (newValue, oldValue) => {
            if (newValue !== '') {
                console.log(props.id);

                store.commit(GET_TODO_INFO, props.id)
            }
        })
        const rules = {
            title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
            state: [{ required: true, message: '请选择状态', trigger: 'change' }]
        }
        const handleOk = async () => {
            formRef.value
                .validate().then(async () => {
                    console.log('表单验证通过');
                    let mode = ''
                    switch (props.mode) {
                        // case 'add': store.commit(ADD_TODO_ITEM); mode = '添加'; break;
                        case 'add': const addRes = await addTodo(store.state.todoInfo)
                            if (addRes.data.error === 0) {
                                message.success('添加成功')
                                contents.emit('update:visible', false)
                            }
                            ; break;
                        // case 'edit': store.commit(EDIT_TODO_ITEM, props.id); mode = '编辑'; break;
                        case 'edit': const editRes = await editTodo(props.id, store.state.todoInfo);
                            if (editRes.data.error === 0) {
                                message.success('编辑成功')
                                contents.emit('update:visible', false)
                            }
                            break;
                    }
                    contents.emit('update:id', '')
                    contents.emit('refreshTodoList')
                    store.commit(TODO_LIST_FILTER)
                    store.commit(CLEAR_TODO_INFO)
                }).catch(() => {
                    console.log('表单验证失败')
                })

        }
        const resetForm = () => {
            formRef.value.resetFields();
        };
        const handleCancel = () => {
            store.commit(CLEAR_TODO_INFO)
            resetForm()
            contents.emit('update:visible', false)
            contents.emit('update:id', '')
        }

        return {
            formRef,
            rules,
            store,
            labelCol,
            wrapperCol,
            handleOk,
            handleCancel
        }
    }
})
</script>

<style scoped lang='scss'>
</style>
