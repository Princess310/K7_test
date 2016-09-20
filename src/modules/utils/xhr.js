var appFunc = require('./appFunc'),
    networkStatus = require('../components/networkStatus');

module.exports = {

    domainUrl: "http://192.168.0.115/api/entry",

    search: function(code, array){
        for (var i=0;i< array.length; i++){
            if (array[i].code === code) {
                return array[i];
            }
        }
        return false;
    },

    getRequestURL: function(options){
        //var host = apiServerHost || window.location.host;
        //var port = options.port || window.location.port;
        var query = options.query || {};
        var func = options.func || '';

        var apiServer = 'api/' + func + '.json' +
            (appFunc.isEmpty(query) ? '' : '?');

        var name;
        for (name in query) {
            apiServer += name + '=' + query[name] + '&';
        }

        return apiServer.replace(/&$/gi, '');
    },

    ajax: function(method, path, data, successFn, failFn){
        var apiUrl = this.domainUrl + '/index.php?r=';
        var token = appFunc.getCookie("user_access_token");
        var method = method || "POST";

        $$.ajax({
            url: apiUrl + path,
            type: method,
            headers: {
                'X-Access-Token': token
            },
            dataType: "json",
            data: data,
            complete: function(XMLHttpRequest, textStatus){
                // TODO: get the new x-access-token and set it to localStorage
                // console.log("XMLHttpRequest", XMLHttpRequest.getAllResponseHeaders());
            },
            success: function(result){
                if (result.code === 200){
                    successFn(result);
                }else{
                    failFn(result);
                }
            },
            error: function(err){
                failFn(JSON.parse(err.response));
            }
        });

        // --------- Dplus Record Data --------- //
        // Try to record the user actions for Dpuls data
        var dplus = dplus || null;
        if(dplus != null){
            var userId = app.getCookie("userid", userId);
            if(path == "user/login" || path == "user/signup"){
                dplus.track(path, {username: data.username});
            }else {
                dplus.track(path, $.extend(data, {userId: userId}));
            }
        }
        // --------- /Dplus Record Data --------- //
    },

    doGet: function(path, data, successFn, failFn){
        this.ajax("GET",path,data,function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    },

    doPost: function(path, data, successFn, failFn){
        this.ajax("POST",path,data,function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    },

    doPut: function(path, data, successFn, failFn){
        this.ajax("PUT",path,data,function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    },

    doDelete: function(path, data, successFn, failFn){
        this.ajax("DELETE",path,data,function(result){
            successFn(result);
        }, function(err){
            failFn(err);
        });
    }
};