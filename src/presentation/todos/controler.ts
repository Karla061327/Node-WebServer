import { Request, Response } from "express";

const todos = [
    {id:1, text: 'Buy milk', createdAd: new Date()},
    {id:2, text: 'Buy bread', createdAd: null},
    {id:3, text: 'Buy eggs', createdAd: new Date()},
]

export class TodosController {
    
    //* DI
    constructor () {}


    public getTodos = (req:Request, res:Response) => {

        res.json(todos);
    }

    public getTodoById = (req:Request, res:Response) => {
        //const id = req.params.id; pasametro que ponemos en postman, para solicitarelo, el + va hacer la conversion de strin a num
        const id = +req.params.id;
        const todo = todos.find(todo => todo.id === id);
        
        (todo)
        ?res.json(todo)
        :res.status(404).json({error: `no existe id:${id}`})        
    }
    public createPost = (req: Request, res:Response) => {

        const {text} = req.body;
        if (!text) return res.status(400).json({error: 'Text property id required'});
        
        // interface Todo {
        //     id: number;
        //     text: string;
        //     createdAd: Date | null;
        // }

        const newTodo = {
            id: todos.length + 1,
            text: text, 
            createdAd: null 
        }

        todos.push(newTodo);
        res.json(newTodo)
    };

    public updateTodo = (res:Response, req:Request ) => {

        console.log(req);
        console.log(req.params);
        
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({error:'id is no a number'});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({ error: `Todo with id ${id} no found`});

        const {text, createdAd} = req.body;
        if(!text) return res.status(400).json({error: 'text is required'});

        todo.text = text || todo.text;
        (createdAd === 'null') 
        ? todo.createdAd = null 
        : todo.createdAd = new Date(createdAd || todo.createdAd);

        res.json(todo);
    }
    public deleteTodo = (req: Request, res:Response) => {
        
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({error:'id is no a number'});

        const todo = todos.find(todo => todo.id === id);
        
        (todo && todo.id === id)
        ? todos.splice(todos.indexOf(todo), 1)
        :res.status(404).json({ error: `Todo with id ${id} no found`});

        res.json(todo);
    };  

};