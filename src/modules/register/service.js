var xhr = require('../utils/xhr');

module.exports = {
    getVerifyCode: function(params, successFn, failFn){
        xhr.doGet("code/getcode", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    },

    register: function(params, successFn, failFn){
        xhr.doPost("user/signup", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    }
};