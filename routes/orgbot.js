'use strict';

var express = require('express');
var router = express.Router();
var controller = require(rootdir+'/controllers/orgbotcontroller');

//initlize firebase
/*firebase.initializeApp({
  databaseURL: config.firebase.databaseURL,
  serviceAccount: config.firebase.serviceAccount
});*/

router.get('/test', function(req, res, next){
    controller.test(req, res, next);
});
router.get('/testjson', function(req, res, next){
  controller.testjson(req, res, next);
})

router.get('/login', function(req, res, next){
  controller.login(req, res, next);
});

router.post('/fullfilment', function(req, res, next){
  controller.fullfilment(req, res, next);
});

module.exports = router;

