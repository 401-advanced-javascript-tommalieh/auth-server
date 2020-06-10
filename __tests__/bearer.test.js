'use strict';

const bearer = require('../src/middleware/bearer.js');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwiaWF0IjoxNTkxNzE0OTQ3fQ.IX0gYaRY84hlu_qMAQ4FMC6KJrZThCfngAouSsJJaEg';
describe('bearer', () => {
  it('Invokes next() with a masseage invalid token authorization headers arent provided', () => {
    const req ={
      headers:{
            
      },
    };
    const res = {};
    const next = jest.fn();
    bearer(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login Please Provide Auth Headers');
  });

  it('Invokes next() with a masseage Token already used when the token has been used before', () => {
    const req ={
      headers:{
        authorization: `Bearer ${token}`,
      },
    };
    const res = {};
    const next = jest.fn();
    bearer(req, res, next);
    bearer(req, res, next);
    console.log(req);
    expect(next).toHaveBeenCalledWith('Token already used');
  });
  
});