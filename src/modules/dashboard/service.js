var xhr = require('../utils/xhr');

module.exports = {
    getFeedList: function(params){
        xhr.doGet("match/index", params);
    }
};