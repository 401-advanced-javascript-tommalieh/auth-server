'use strict';

const express = require('express');
const basicAuth = require('../middleware/basic.js');
const users = require('./model/user-model.js');
const oauth = require('../middleware/oauth.js');
const bearerAuth = require('../middleware/bearer.js');
const permissionsAuth = require('../middleware/permission.js');
const router = express.Router();

router.get('/oauth', oauth, oauthHandler);
router.post('/signup', signUpHandler);
router.post('/signin', basicAuth, signInHandler);
router.get('/users', basicAuth, listUsersHandler);
router.get('/secret', bearerAuth, secretHandler);



// router.get('/read', bearerAuth, permissionsAuth('read'), permissionsAccessHandler);
// router.post('/add', bearerAuth, permissionsAuth('create'), permissionsAccessHandler);
// router.put('/change', bearerAuth, permissionsAuth('update'), permissionsAccessHandler);
// router.delete('/remove', bearerAuth, permissionsAuth('delete'), permissionsAccessHandler);

// function permissionsAccessHandler(req, res){
//   res.status(200).send(`Authorized to ${req.permission}`);
// }



router.post('/test', (req, res) => {
  users.create(req.body).then( result => {
    res.json(result);
  });
});


function signUpHandler(req, res) {
  users.create(req.body).then(user => {
    const token = users.generateToken(user);
    res.json({ token });
  }).catch(err => {
    res.status(403).send(err);
  });
}

function signInHandler(req, res) {
  res.json({ token: req.token });
}

function listUsersHandler(req, res) {
  users.read().then(users => {
    res.json({ users });
  }).catch(err => {
    res.status(403).send(err);
  });
}

function oauthHandler (req, res) {
  console.log('hello from the route handler');
  res.json({ token: req.token });
}

function secretHandler (req, res) {
  console.log('hello from the route handler');
  res.json({ token: req.user });
}

module.exports = router;