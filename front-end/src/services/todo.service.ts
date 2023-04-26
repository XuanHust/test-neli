
import { CommonResponse, TodoInputParams, TodoParams } from '@/models/todo';
import { deleteAsync, getAsync, patchAsync, postAsync } from './request'

const todoAPI = {
  getTodos(params: TodoParams): Promise<CommonResponse> {
    const url = '/v1/todo'
    return getAsync(url, params)
  },
  getTodoId(id: string): Promise<CommonResponse> {
    const url = `/v1/todo/${id}`;
    return getAsync(url);
  },
  createTodo(params: TodoInputParams): Promise<CommonResponse> {
    const url = '/v1/todo'
    return postAsync(url, params)
  },
  updateTodo(
    id: number,
    params: TodoInputParams
  ): Promise<CommonResponse> {
    const url = `/v1/todo/${id}`
    return patchAsync(url, params)
  },
  deleteTodoId(id: number): Promise<CommonResponse> {
    const url = `/v1/todo/${id}`;
    return deleteAsync(url);
  }
}

export default todoAPI
