const axios = require('axios');

axios.defaults.headers.post['Content-Type'] = 'application/json';
module.exports = {
    getApiData: function(url, callback) {
        axios.get(url)
            .then(response => {
                callback(response.data);
        })
        .catch(error => {
            
            callback(error);
        });
    }
}