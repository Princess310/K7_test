var xhr = require('../utils/xhr');

module.exports = {
    login: function(params, successFn, failFn){
        xhr.doPut("user/login", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    }
};