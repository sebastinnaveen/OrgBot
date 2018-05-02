var _ = require('lodash');


module.exports = {
    getActionConfig: function(action){
        var result = _.filter(config.orgs.aaa.actions, function(data){
            return data.action === action;
        })

        return result;
    }
}