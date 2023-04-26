import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { EditTodoDto } from "./dto/edit-todo.dto";
import { TodoService } from "./todo.service";
import { GetToDoDto } from "./dto/get-todo.dto";

@Controller({
  path: "/todo",
  version: "1"
})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(@Query() query: GetToDoDto) {
    return this.todoService.getTodoList(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.todoService.findById(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTodoDto: EditTodoDto) {
    return this.todoService.editTodo(+id, updateTodoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.todoService.remove(+id);
  }
}
