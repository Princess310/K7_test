'use strict';

var app = app || {};

// --------- AJAX Wrapper --------- //
// Very simple AJAX wrapper that allow us to simply normalize request/response, and eventually put some hooks such as
// performance and error reporting.
(function(){
    var domainUrl = "http://192.168.0.108/api/entry";

    app.doGet = function(path, data){
        return ajax("GET",path,data);
    };

    app.doPost = function(path, data){
        return ajax("POST",path,data);
    };

    app.doPut = function(path, data){
        return ajax("PUT",path,data);
    };

    app.doDelete = function(path, data){
        return ajax("DELETE",path,data);
    };


    function ajax(method, path, data){
        var apiUrl = domainUrl + '/index.php?r=';
        var token = app.getCookie("user_access_token");
        var dfd = $.Deferred();
        var method = method || "POST";

        if(token && token !== ""){
            $.ajaxSetup({
                headers: {
                    'X-Access-Token': token
                }
            });
        }

        var jqXHR = $.ajax({
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
    }
})();
// --------- /AJAX Wrapper --------- //

(function(){
    //---------------- Cookie---------------//
    app.setCookie = function (name, value, days, path) {
        var d = new Date();
        days = days || 1; // 先保存24小时
        path = path ? path : "/";
        d.setDate(d.getDate() + days);
        var expires = days ? "expires=" + d.toUTCString() : "";
        document.cookie = name + "=" + value + "; " + expires+";path = "+path;
    };

    app.getCookie = function (name) {
        name = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' '){
                c = c.substring(1);
            }
            if (c.indexOf(name) != -1) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    app.removeCookie = function(name){
        document.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
    //---------------- /Cookie---------------//

    //---------------- getQueryString---------------//
    app.getQueryString = function (name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        return r == null ? (arguments[1] === undefined ? null : arguments[1]) :
            decodeURIComponent(r[2]);
    };
    //---------------- /getQueryString---------------//

    app.zeroFill  = function (str) {
        str = String(str);
        str = str.length < 2 ? "0"+str : str;
        return str;
    }
})(jQuery);