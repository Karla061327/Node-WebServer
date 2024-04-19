import { Router } from "express";
import { TodosController } from "./controler";


export class TodoRoutes{
     
    static get routes(): Router {
        
        const router = Router();
        const todoController = new TodosController();

        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        
        router.post('/', todoController.createPost);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);
        return router;
    }
}