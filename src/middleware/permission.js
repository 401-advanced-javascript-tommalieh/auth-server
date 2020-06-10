'use strict';

const userModel = require('../auth/model/user-model.js');

module.exports = (permission) => {
  return (req, res, next) => {
    try{
      let userRole = req.user.role;
      let userPermissions = userModel.roles[userRole];
      req.permission = permission;
      if(userPermissions.includes(permission)){
        next();
      }
      else{
        next('Access Denied');
      }
    }catch(err){
      next(err);
    }
  };
};