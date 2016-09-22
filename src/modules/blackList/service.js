var xhr = require('../utils/xhr');

module.exports = {
    getList: function(url, params, successFn, failFn){
        xhr.doGet(url, params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    },

    setUser: function(params, successFn, failFn){
        xhr.doDelete("user/delete-black-list", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    },

    setPrivate: function(params, successFn, failFn){
        xhr.doPost("privacy/cancel-shield", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    }
};