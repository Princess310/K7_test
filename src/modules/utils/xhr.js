var appFunc = require('./appFunc'),
    networkStatus = require('../components/networkStatus'),
    jQ = require('jquery');

module.exports = {

    domainUrl: "http://192.168.0.127/api/entry",

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

    ajax: function(method, path, data){
        var apiUrl = this.domainUrl + '/index.php?r=';
        var token = appFunc.getCookie("user_access_token");
        var dfd = jQ.Deferred();
        var method = method || "POST";

        if(token && token !== ""){
            jQ.ajaxSetup({
                headers: {
                    'X-Access-Token': token
                }
            });
        }

        var jqXHR = jQ.ajax({
            url: apiUrl + path,
            type: method,
            dataType: "json",
            data: data,
            complete: function(XMLHttpRequest, textStatus){
                // TODO: get the new x-access-token and set it to localStorage
                // console.log("XMLHttpRequest", XMLHttpRequest.getAllResponseHeaders());
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

        jqXHR.done(function(response){
            // TODO: need test reponse.result
            if (response.code === 200){
                dfd.resolve(response);
            }else{
                dfd.reject(response);
            }
        });

        jqXHR.fail(function(jqx, textStatus, error){
            dfd.reject(error);
            // TODO: need to normalize error
        });

        return dfd.promise();
    },

    doGet: function(path, data){
        return this.ajax("GET",path,data);
    },

    doPost: function(path, data){
        return this.ajax("POST",path,data);
    },

    doPut: function(path, data){
        return this.ajax("PUT",path,data);
    },

    doDelete: function(path, data){
        return this.ajax("DELETE",path,data);
    }
};