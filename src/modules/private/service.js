var xhr = require('../utils/xhr');

module.exports = {
    setPrivate: function(params, successFn, failFn){
        xhr.doPost("privacy/set", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    },

    getPrivate: function(params, successFn, failFn){
        xhr.doGet("privacy/verified-user", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    }
};