import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../domain";

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
        const todos = await this.todoRepository.getAll();
        console.log(todos);
        return res.json(todos);
    }

    public getTodoById = async(req:Request, res:Response) => {
        //const id = req.params.id; pasametro que ponemos en postman, para solicitarelo, el + va hacer la conversion de strin a num
        const id = +req.params.id;

        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);

        } catch (error) {
            res.status(400).json({error});
        }     
    };

    public createPost = async (req: Request, res:Response) => {
        
        const  [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});

        const todo = await this.todoRepository.create(createTodoDto!);
        res.json(todo)
    };

    public updateTodo = async(res:Response, req:Request ) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({error});
       
        const updatedTodo = await this.todoRepository.updateById( updateTodoDto!);
        return res.json(updatedTodo);   
    } 

    //!
    public deleteTodo = async (req: Request, res:Response) => {
        
        const id = +req.params.id;
        const deletedTodo = await this.todoRepository.deleteById(id);
        res.json(deletedTodo)

    };  

}; 