import { request } from "@/utils/request";


interface ITodoInfoType {
    title: string,
    state: '0' | '1',
    id: string
}

// 获取Todo列表
export function getTodoList() {
    return request<ITodoInfoType[]>({
        url: '/todo/list'
    })
}

// 添加todo
export function addTodo(todoInfo: ITodoInfoType) {
    return request({
        url: '/todo/add',
        method: 'POST',
        data: todoInfo
    })
}

// 删除todo
export function deleteTodo(id: string) {
    return request({
        url: `/todo/delete`,
        data:{
            id
        },
        method: 'DELETE',
    })
}


// 编辑todo
export function editTodo(todoId: string, todoInfo: ITodoInfoType) {
    todoInfo.id = todoId
    return request({
        url: `/todo/edit`,
        method: 'PUT',
        data: todoInfo
    })
}
