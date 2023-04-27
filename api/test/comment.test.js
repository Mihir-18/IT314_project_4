const request = require('supertest');

const baseURL = "http://localhost:4000";

describe('POST /comments', () => {
     test('should return status 200 for valid comment', async () => {
          const req = {
               body: {
                    title: 'check1',
                    body: 'Everyone is saying hello to eachother',
                    parentId: '644931ff0cca21885e6c9d2a',
                    rootId: '644931f40cca21885e6c9d23',
               },
               
          };
          const res = await request(baseURL).post('/comments')
          .set('Cookie','token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDY3NDU4NTY3Y2M3YmQ1NzA0MTgzYiIsImlhdCI6MTY4MjU4NzczOX0.o3C9m1rz5luzrivag2GgBA1NWHX2Sn76jiRFk8DVCVU')
          .send(req.body);
          expect(res.status).toEqual(200);
     });

     test('should return status 404 for no token user', async () => {
          const req = {
               body: {
                    title: 'check1',
                    body: 'Everyone is saying hello to eachother',
                    parentId: '644931ff0cca21885e6c9d2a',
                    rootId: '644931f40cca21885e6c9d23',
               }
          };
          const res = await request(baseURL).post('/comments').send(req.body);
          expect(res.status).toEqual(404);
     });

     test('invalid token causes server error', async () => {
          const req = {
               body: {
                    title: 'check1',
                    body: 'Everyone is saying hello to eachother',
                    parentId: '644931ff0cca21885e6c9d2a',
                    rootId: '644931f40cca21885e6c9d23',
               },
               
          };
          const res = await request(baseURL).post('/comments')
          .set('Cookie','token=yeJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDY3NDU4NTY3Y2M3YmQ1NzA0MTgzYiIsImlhdCI6MTY4MjU4NzczOX0.o3C9m1rz5luzrivag2GgBA1NWHX2Sn76jiRFk8DVCVU')
          .send(req.body);
          expect(res.status).toEqual(500);
     });
});

describe('GET /comments/:id', () => {
     test('fetching the comment for valid comment id', async () => {
         const req={
            id:'644869e2bfa7b0ff2105b191'
         };
         const res=await request(baseURL).get('/comments/'+req.id);
         expect(res.status).toEqual(200);
     });

     test('unable to fetch comment for invalid comment id', async () => {
          const req={
              id:'mann'
          };
          const res=await request(baseURL).get('/comments/'+req.id);
          expect(res.status).toEqual(404);
      });

     test('fetching the comment with correct rootId', async () => {
          const req={
               id:'6449519feef965a1cdc69229'
          };
          const expected={
               rootId:'644869e2bfa7b0ff2105b191',
          };
          const res=await request(baseURL).get('/comments/'+req.id);
          expect(res.body.rootId).toEqual(expected.rootId);
          expect(res.status).toEqual(200);
     });

     test('fetching the comment with correct parentId', async () => {
          const req={
               id:'6449519feef965a1cdc69229'
          };
          const expected={
               parentId:'644939163340cbf7dbaca4ab',
          };
          const res=await request(baseURL).get('/comments/'+req.id);
          expect(res.body.parentId).toEqual(expected.parentId);
          expect(res.status).toEqual(200);
     });

     test('fetching the comment with correct body', async () => {
          const req={
               id:'6449519feef965a1cdc69229'
          };
          const res=await request(baseURL).get('/comments/'+req.id);
          const expected={
               text:'hello again'
          };
          expect(res.body.body).toEqual(expected.text);
          expect(res.status).toEqual(200);
     });

     test('fetching the comment with correct incorrect body', async () => {
          const req={
               id:'6449519feef965a1cdc69229'
          };
          const expected={
               text:'hello my friend'
          };
          const res=await request(baseURL).get('/comments/'+req.id);
          expect(res.body.body).toEqual(expect.not.stringMatching(expected.text));
          expect(res.status).toEqual(200);
     });
 });

 describe('GET /comments/root/:rootId', () => {
     test('fetching the podt correctly for post id', async () => {
         const req={
            id:'644931f40cca21885e6c9d23'
         };
         const res=await request(baseURL).get('/comments/root/'+req.id);
         
         expect(res.status).toEqual(200);
     });

     test('unable to fetch post for invalid post id', async () => {
          const req={
              id:'mann'
          };
          const res=await request(baseURL).get('/comments/root/'+req.id);
          
          expect(res.status).toEqual(404);
      });
 });

 describe('GET /comments', () => {
     test('searching the comments which matches the request query', async () => {
         const req={
            text:'test'
         };
         const res=await request(baseURL).get('/comments').query(req.text);
         
         expect(res.status).toEqual(200);
     });
 });




