var xhr = require('../utils/xhr');

module.exports = {
    getList: function(params, successFn, failFn){
        xhr.doGet("user/message-list", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    }
};