'use strict';

const express = require('express');
const bearerAuth = require('../middleware/bearer.js');
const permissionsAuth = require('../middleware/permission.js');
const router = express.Router();

router.get('/read', bearerAuth, permissionsAuth('read'), permissionsAccessHandler);
router.post('/add', bearerAuth, permissionsAuth('create'), permissionsAccessHandler);
router.put('/change', bearerAuth, permissionsAuth('update'), permissionsAccessHandler);
router.delete('/remove', bearerAuth, permissionsAuth('delete'), permissionsAccessHandler);

function permissionsAccessHandler(req, res){
  res.status(200).send(`Authorized to ${req.permission}`);
}

module.exports = router;