
import { Server } from '../src/presentation/server';
import { envs } from "../src/config/envs";

jest.mock('../src/presentation/server');

describe('Testing App.ts',() => {

    test('should work', async () => {

        await import ('../src/app');
        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            port: envs.PORT,
            public_path: envs.PUBLIC_PATH,
            routes: expect.any(Function),
        });
    })
})

