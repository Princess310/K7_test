var xhr = require('../utils/xhr');

module.exports = {
    login: function(params){
        xhr.doPut("user/login", params).done(function (result) {
            console.log("result", result);
        });
    }
};