import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy butter', completedAt: new Date() },
  ];
  

export class TodosController {
    
    //* DI
    constructor (
        private readonly todoRepository: TodoRepository,
    ) {}


    public getTodos = async (req:Request, res:Response) => {
        new GetTodos(this.todoRepository)
        .execute()
        .then(todos => res.json(todos))
        .catch(error => res.status(400).json({error}));
    }

    public getTodoById = async(req:Request, res:Response) => {
        //const id = req.params.id; pasametro que ponemos en postman, para solicitarelo, el + va hacer la conversion de strin a num
        const id = +req.params.id;
        new GetTodo(this.todoRepository)
        .execute(id)
        .then(todos => res.json(todos))
        .catch(error => res.status(400).json({error}));
    };

    public createTodo = async (req: Request, res:Response) => {
        
        const  [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});

        // const todo = await this.todoRepository.create(createTodoDto!);
        // res.json(todo)
        new CreateTodo(this.todoRepository)
        .execute(createTodoDto!)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({error}));
    };

    public updateTodo = async(res:Response, req:Request ) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({error});
       
        new UpdateTodo(this.todoRepository)
        .execute(updateTodoDto!)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({error}));  
    } 

    //!
    public deleteTodo = (req: Request, res:Response) => {
        
        const id = +req.params.id;
        new DeleteTodo(this.todoRepository)
        .execute(id)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({error}));

    };  

}; 