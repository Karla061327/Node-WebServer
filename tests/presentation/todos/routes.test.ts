
import request from 'supertest';
import {testServer} from '../../test-server';
import { prisma } from '../../../src/data/postgres';


describe('Todo routes testing', () => {

    beforeAll(async() => {
        await testServer.start();
    });

    beforeAll(() => {
        testServer.close();
    })
    
    const todo1 = {text: 'Hola 1'};
    const todo2 = {text: 'Hola 2'};

    test('should return TODOs api/todos', async() => {

       await prisma.todo.createMany({
            data: [todo1, todo2]
      });
       
        const response = await request(testServer.app)
            .get('/api/todos')
            .expect(200);  

        console.log(response.body);
         
    })    
})