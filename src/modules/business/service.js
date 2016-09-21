var xhr = require('../utils/xhr');

module.exports = {
    getMomentsList: function(params, successFn, failFn){
        xhr.doGet("moments/moments", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    },

    getPlazaList: function(params, successFn, failFn){
        xhr.doGet("moments/plaza", params, function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    }
};