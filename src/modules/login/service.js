var xhr = require('../utils/xhr'),
    jQ = require('jquery');

module.exports = {
    login: function(params){
        var dfd = jQ.Deferred();

        xhr.doPut("user/login", params, function(result){
            dfd.resolve(result);
        }, function(err){
            dfd.reject(err);
        });

        return dfd.promise();
    }
};