
import supertest, { SuperTest, Test } from 'supertest';
import app from '../server';


let request: SuperTest<Test>;

beforeAll(async () => {

    request = supertest(app);
});

describe('pruebaASecas ', () => {

    /**
     * Test that we can list users without any error.
     */
    it('prueba1',async () => {
        const response = await request.get('/test');
        console.log(response+"   hola");
        expect(response.status).toBe(200);
    });

});