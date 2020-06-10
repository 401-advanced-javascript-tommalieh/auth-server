'use strict';

const schema = require('./token-schema.js');

class Token {
  constructor() {
    this.schema = schema;
  }

  async read(token) {
    try{
      const result = await this.schema.findOne({ value: token });
      return result;
    }
    catch(err){
      return err;
    }
  }

  async create(token) {
    try {
      const bToken = {value: token};
      const newToken = new this.schema(bToken);
      console.log(newToken);
      return newToken.save();
    }
    catch (err) {
      return err;
    }

  }

}

module.exports = new Token();