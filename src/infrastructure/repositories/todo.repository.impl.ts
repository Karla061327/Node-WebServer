import { CreateTodoDto, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";
import { TodoDatasourcesImpl } from "../datasource/todo.datasource.impl";


 export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDatasourcesImpl,
    ){}
     create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
     }
     getAll(): Promise<TodoEntity[]> {
          return this.datasource.getAll();
     }
     findById(id: number): Promise<TodoEntity> {
          return this.datasource.findById(id);
     }
     updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
          return this.datasource.updateById(updateTodoDto);
     }
     deleteById(id: number): Promise<TodoEntity> {
          return this.datasource.deleteById(id);
     }

 }