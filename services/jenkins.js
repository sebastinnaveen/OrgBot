var jenkinsapi = require('jenkins-api');


module.exports = {
	
    triggerJenkins: function(url,jobname,token, callback) {
		
		var jenkins = jenkinsapi.init(url);

			jenkins.build(jobname,{token: token}, function(err, data) {
			if (!err){ 
				
				callback(data);
			}
		
		});
	}
}



