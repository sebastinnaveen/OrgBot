'use strict';
var _ = require('lodash');
var fileService = require(rootdir+'/services/fileservice.js');

module.exports = {
    test: function(req, res, next){
        res.status(200).json({
            message: 'I am a bot'
        })
    },
    testjson: function(req, res, next){
        fileService.getJsonData('leaves.json', function(jsonResponse){
            res.status(200).json(jsonResponse);
        });
    },

    fullfillments: function (req, res, next){

    }
};