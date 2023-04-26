const request = require('supertest');

const baseURL = "http://localhost:4000";

describe('POST /login', () => {
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

    test('should return status 400 for invalid credentials', async () => {
        const req = {
            body: {
                username: 'test5',
                password: 'hello'
            }
        };
        const res = await request(baseURL).post('/login').send(req.body);
        expect(res.status).toEqual(400);
    });

    test('should return status 400 for invalid username', async () => {
        const req = {
            body: {
                username: 'test5',
                password: '123'
            }
        };
        const res = await request(baseURL).post('/login').send(req.body);
        expect(res.status).toEqual(400);
    });

    test('should return status 400 for invalid password', async () => {
        const req = {
            body: {
                username: 'test1',
                password: '1234'
            }
        };
        const res = await request(baseURL).post('/login').send(req.body);
        expect(res.status).toEqual(400);
    });
});


describe('POST /register', () => {
    test('should return status 200 for Successful signup', async () => {
        const req = {
            body: {
                email: 'test3@example.com',
                password: '123',
                username : "test3",
            }
        };
        const res = await request(baseURL).post('/register').send(req.body);
        expect(res.status).toEqual(200);
    });

    test('should return status 400 for already exist email', async () => {
        const req = {
            body: {
                email: 'test@example.com',
                password: '123',
                username : "test2",
            }
        };
        const res = await request(baseURL).post('/register').send(req.body);
        expect(res.status).toEqual(400);
    });

    test('should return status 400 for already exist username', async () => {
        const req = {
            body: {
                email: 'test2@example.com',
                password: '123',
                username : "test",
            }
        };
        const res = await request(baseURL).post('/register').send(req.body);
        expect(res.status).toEqual(400);
    });

    test('should return status 400 for invalid data', async () => {
        const req = {
            body: {
                email: 'test2345',
                password: '123',
                username : "test",
            }
        };
        const res = await request(baseURL).post('/register').send(req.body);
        expect(res.status).toEqual(400);
        
    });
});

