var xhr = require('../utils/xhr');

module.exports = {
    getFeedList: function(params, successFn, failFn){
        xhr.doGet("match/index", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    }
};