import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { EditTodoDto } from "./dto/edit-todo.dto";
import { GetToDoDto } from "./dto/get-todo.dto";

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    const dataCreate = await this.prisma.todo.create({
      data: createTodoDto
    });
    return dataCreate;
  }

  async findById(todoId: number) {
    const todo = await this.prisma.todo.findFirst({
      where: {
        id: todoId
      }
    });

    return todo;
  }

  async editTodo(todoId: number, dto: EditTodoDto) {
    const todo = await this.prisma.todo
      .update({
        where: {
          id: todoId
        },
        data: {
          ...dto
        }
      })
      .catch((error) => {
        throw error;
      });
    return todo;
  }

  // get user list
  async getTodoList(query: GetToDoDto) {
    const { description } = query;
    const queryCustom = {
      where: {
        description: {
          contains: description
        }
      }
    };
    const [total, todoList] = await Promise.all([
      this.prisma.todo.count({ where: queryCustom.where }),
      this.prisma.todo.findMany({
        ...queryCustom
      })
    ]);
    return {
      data: todoList
    };
  }

  //delete todo
  async remove(id: number) {
    const data = await this.prisma.todo.delete({
      where: {
        id
      }
    });
    return data;
  }
}
