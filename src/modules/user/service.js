var xhr = require('../utils/xhr');

module.exports = {
    getUserInfo: function(params, successFn, failFn){
        xhr.doGet("user/info", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    }
};