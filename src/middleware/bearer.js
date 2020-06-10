'use strict';

const users = require('../auth/model/user-model.js');
const tokens = require('../auth/model/token-model.js');

module.exports = async (req, res, next) => {
  try{

    if (!req.headers.authorization){
      next('Invalid Login Please Provide Auth Headers');
    }
    else{
      const [tokenType, token] = req.headers.authorization.split(' ');
      if (tokenType === 'Bearer'){
        const isToken = await tokens.read(token);
        if(!isToken){
          const user = await users.authenticateBearerToken(token);
          tokens.create(token);
          req.user = user;
          next();
        }
        else{
          next('Token already used');
        }
      }
      else{
        next('Token type must be Bearer');
      }
    }
  }catch(err){
    next(err.message);
  }
};