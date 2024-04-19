
import {Router} from 'express';
import { TodoRoutes } from './todos/router';

export class AppRoutes{
     
    static get routes(): Router {
        
        const router = Router();
        
        //rutas principales
        router.use('/api/todos', TodoRoutes.routes);

    return router;
    }
}

//creamos una instancia cuando vayamos hacer inyeccion de dependencias, sino metodos estaticos
//middleware: una funcion que se va a ejecutar cuanod se haga una peticion