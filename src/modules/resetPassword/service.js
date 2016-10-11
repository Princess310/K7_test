var xhr = require('../utils/xhr');

module.exports = {
    saveInfo: function(params, successFn, failFn){
        xhr.doPost("user/reset-password", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    },

    getVerifyCode: function(params, successFn, failFn){
        xhr.doGet("code/getcode", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    }
};