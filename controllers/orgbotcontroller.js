'use strict';
var _ = require('lodash');
var util = require(rootdir+'/utils/util.js');
var fileService = require(rootdir+'/services/fileservice.js');
var fbService = require(rootdir+'/services/firebaseservice.js');

var responsepay = {
    payload:{
        message: 'I am a bot'
    }
};

var responsedata = {
    data: {
        message: 'I am a bot'
    }
}

module.exports = {
    test: function(req, res, next){        
        res.status(200).json(responsepay);
    },
    testjson: function(req, res, next){
        fileService.getJsonData('leaves.json', function(jsonResponse){
            responsedata.data = jsonResponse;
            res.status(200).json(responsedata);
        });
    },

    login: function(req, res, next){
        res.status(200).json(responsedata);
    },

    fullfilment: function (req, res, next){
        var action = req.body.queryResult.action || '';
        console.log(action);
        var actionData = util.getActionConfig(action);
        console.log(actionData);
        if(actionData.length > 0){
            var data = actionData[0];
            if(data.source === 'api'){
                fileService.getJsonData(data.url, function(jsonResponse){
                    responsepay.payload = jsonResponse;
                    res.status(200).json(responsepay);
                });
            } else if (data.source === 'db'){
                fbService.getFBData(data.url, function(jsonResponse){
                    responsepay.payload = jsonResponse;
                    res.status(200).json(responsepay);
                });
            } else{
                res.status(200).json(responsepay);
            }
        } else{
            res.status(200).json(responsepay);
        }
    }
};

