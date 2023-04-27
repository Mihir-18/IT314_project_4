const request = require('supertest');

const baseURL = "http://localhost:4000";

describe('POST /l', () => {
    test('should return status 200 for valid credentials', async () => {
        const req = {
            body: {
                username: 'test1',
                password: '123'
            }
        };
        const res = await request(baseURL).post('/login').send(req.body);
        expect(res.status).toEqual(200);
    });
});