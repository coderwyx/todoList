<template>
    <div class="filter">
        <a-form :model="store.state.filterData" layout="inline">
            <a-form-item :labelCol="{ span: 4 }" :wrapper-col="{ span: 19, offset: 1 }" label="关键字">
                <a-input-search
                    v-model:value="store.state.filterData.keyword"
                    placeholder="输入关键字搜索"
                    style="width: 280px"
                />
            </a-form-item>
            <a-form-item
                :labelCol="{ span: 4, offset: 4 }"
                :wrapper-col="{ span: 12, offset: 1 }"
                label="状态"
            >
                <a-select
                    ref="select"
                    v-model:value="store.state.filterData.state"
                    style="width: 240px"
                >
                    <a-select-option value="all">全部</a-select-option>
                    <a-select-option value="0">未完成</a-select-option>
                    <a-select-option value="1">已完成</a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
        <a-button @click="add" type="primary" size="mini">
            <template #icon>
                <PlusOutlined />
            </template>
            添加
        </a-button>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, watch } from 'vue'
import { TODO_LIST_FILTER } from '../../../store/mutation-types'
import { useStore } from 'vuex';
import { PlusOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    name: 'TodoListFilter',
    //   props: {

    //   },
    components: {
        PlusOutlined
    },
    emits: ['add'],
    setup(props, contents) {

        const store = useStore()

        const add = () => {
            contents.emit('add')
        }


        watch(store.state.filterData, () => {
            store.commit(TODO_LIST_FILTER)
        }, {
            immediate: true
        })




        return {
            store,
            add
        };
    },
})
</script>

<style scoped>
.filter {
    width: 100%;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
}
</style>