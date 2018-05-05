'use strict';
var _ = require('lodash');
var util = require(rootdir+'/utils/util.js');
var fileService = require(rootdir+'/services/fileservice.js');
var fbService = require(rootdir+'/services/firebaseservice.js');
var restClientService = require(rootdir+'/services/restclientservice.js');

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
		var options = {  
				url: 'http://api.github.com/repos/sebastinnaveen/OrgBot/issues',
				auth: {
					username: 'sebastinnaveen',
					password: 'naveenv@82'
				},
				headers: {
					'User-Agent': 'Web/2.0',
					'Accept': 'application/json'
				}
			};
		restClientService.getApiData(options,function(resp){
		var jsonData = JSON.parse(resp.body);	
		
		var jsonArray =[];
		for(var i=0;i<jsonData.length;i++)
		{
			var tickets={
				"title":jsonData[i].title,
				"issueId":jsonData[i].number
				}
						
			jsonArray.push(tickets);
		}
		responsedata.data = jsonData;
		console.log(jsonArray);
		console.log(jsonData[0].title);
	    res.status(200).json(jsonData);
		});
    },

    fullfilment: function (req, res, next){
        var action = req.body.queryResult.action || '';
		var queryText = req.body.queryResult.queryText || '';
        console.log(action);
        var actionData = util.getActionConfig(action);
        console.log(actionData);
        if(actionData.length > 0){
            var data = actionData[0];
            if(data.source === 'api'){
                restClientService.getRestApi(data.url, data.options,function(response){
					var responsePayload = util.processApiData(response,queryText);
					res.status(200).json(responsePayload);
                })
            }
            else if(data.source === 'local'){
                fileService.getJsonData(data.url, function(jsonResponse){
					var responsePayload = util.processData(jsonResponse,queryText);
					res.status(200).json(responsePayload);
                });
            } else if (data.source === 'db'){
                fbService.getData(data.url, function(jsonResponse){
				    var responsePayload = util.processDbData(jsonResponse,queryText)
                    res.status(200).json(responsePayload);
				
                });
            } else{
                res.status(200).json(responsepay);
            }
        } else{
            res.status(200).json(responsepay);
        }
    }
};

