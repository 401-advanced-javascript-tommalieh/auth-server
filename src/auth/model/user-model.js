'use strict';

const schema = require('./user-schema.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET || 'TOMMALIEH';

class User {
  constructor() {
    this.schema = schema;
    this.roles = {
      user: ['read'],
      writer: ['read', 'create'],
      editor: ['read', 'create', 'update'],
      admin: ['read', 'create', 'update', 'delete'],
    };
      
  }
  

  read() {
    return this.schema.find({});
  }

  async create(record) {
    try {
      const result = await this.schema.findOne({ username: record.username });
      console.log('result', result);
      if (result === null) {
        const newRecord = new this.schema(record);
        newRecord.password = await bcrypt.hash(newRecord.password, 5);
        console.log(newRecord);
        return newRecord.save();
      }
      else {
        return this.generateToken({ result });
      }
    } catch (err) {
      return err;
    }

  }

  async authenticateBasic(user, pass) {
    try {
      console.log(user, pass);
      const result = await this.schema.findOne({ username: user });
      console.log(result);
      if (result) {
        console.log(result);
        const isValid = await bcrypt.compare(pass, result.password);
        return isValid ? result : Promise.reject('Not a user');
      }
      return Promise.reject();
    } catch (err) {
      return err;
    }
  }

  async authenticateBearerToken(bearerToken) {
    try {
      const validUser = await jwt.verify(bearerToken, SECRET);
      const isUserInDb = await this.schema.findOne({ username: validUser.username });
      if (isUserInDb) {
        
        return Promise.resolve(validUser);
      }
      else {
        return Promise.reject('user not found');
      }
    }catch(err) {
      return Promise.reject(err.message);
    }
  }

  generateToken(user) {
    try {
      
      let userData = {
        username: user.username,
        role: user.role,
      };
      const token = jwt.sign(userData, SECRET, {expiresIn: 900});
      return token;
    } catch (err) {
      return err;
    }
  }


}

module.exports = new User();