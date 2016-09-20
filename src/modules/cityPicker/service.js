var xhr = require('../utils/xhr');

module.exports = {
    getCityList: function(params, successFn, failFn){
        xhr.doGet("area", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    }
};