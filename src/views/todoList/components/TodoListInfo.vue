<template>
    <a-modal
        :visible="$props.visible"
        :title="$props.mode === 'add' ? '添加' : '编辑'"
        width="30%"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <a-form :model="store.state.todoInfo" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="标题">
                <a-input v-model:value="store.state.todoInfo.title" />
            </a-form-item>
            <a-form-item label="状态">
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
            type: [Number, String],
            default: ''
        }
    },
    components: {

    },
    emits: ['update:visible', 'update:id'],
    setup(props, contents) {
        const store = useStore()
        const labelCol = reactive({
            span: 4
        })
        const wrapperCol = reactive({
            span: 18
        })

        watch(() => props.id, (newValue, oldValue) => {
            if (newValue !== '') {
                store.commit(GET_TODO_INFO, props.id)
            }
        })

        const handleOk = () => {
            let mode = ''
            switch (props.mode) {
                case 'add': store.commit(ADD_TODO_ITEM); mode = '添加'; break;
                case 'edit': store.commit(EDIT_TODO_ITEM, props.id); mode = '编辑'; break;
            }

            message.success(`${mode}成功`)
            contents.emit('update:visible', false)
            contents.emit('update:id', '')
            store.commit(TODO_LIST_FILTER)
            store.commit(CLEAR_TODO_INFO)
        }
        const handleCancel = () => {
            store.commit(CLEAR_TODO_INFO)
            contents.emit('update:visible', false)
            contents.emit('update:id', '')
        }

        return {
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
