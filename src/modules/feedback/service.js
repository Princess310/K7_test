var xhr = require('../utils/xhr');

module.exports = {
    saveFile: function(params, successFn, failFn){
        xhr.doPost("file/save-file", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    },

    saveFeedBack: function(params, successFn, failFn){
        xhr.doPost("user/feedback", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    }
};