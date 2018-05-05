var _ = require('lodash');

var responseCardData = {
	display:"Card",
    payload: {
        message: 'I am a bot'
    }
}
var responseSimpleData = {
	display:"Plain",
    payload: {
        message: 'I am a bot'
    }
}
var responseListData = {
	display:"List",
    payload: {
        message: 'I am a bot'
    }
}

module.exports = {
    getActionConfig: function(action){
        var result = _.filter(config.orgs.aaa.actions, function(data){
            return data.action === action;
        })

        return result;
    },
	processApiData: function(response,queryText){
	
		if(queryText!='' && queryText.toLowerCase()==='project')
		{
			var jsonData = response
			if(jsonData.length > 0){
				var jsonArray =[];
					for(var i=0;i<jsonData.length;i++)
					{
						var tickets={
							"title":jsonData[i].title,
							"issueId":jsonData[i].number
							}
									
						jsonArray.push(tickets);
					}
				
				responseListData.payload = jsonArray;
			}
			
			return responsedata;
		}
		
		
	},
	processDbData: function(response,queryText){
		responseListData.payload = response;	
		return responseListData;
	},
	processData: function(response,queryText){
		responseListData.payload = response;
		return responseListData;
	}
	
}