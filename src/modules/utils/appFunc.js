require('framework7');

var app = require("../app/app");

module.exports = {

    isPhonegap: function() {
        return (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined');
    },

    renderTpl: function(markup,renderData){
        var compiledTemplate = Template7.compile(markup);
        return compiledTemplate(renderData);
    },

    isEmail: function(str){
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        return reg.test(str);
    },

    getPageNameInUrl: function(url){
        url = url || '';
        var arr = url.split('.');
        return arr[0];
    },

    isEmpty: function(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    },

    hideToolbar: function() {
        yaoyueApp.hideToolbar('.toolbar');
    },

    showToolbar: function() {
        yaoyueApp.showToolbar('.toolbar');
    },

    showMainView: function(){
        this.showToolbar();
        $$(".toolbar").find(".yaoyue-tab").click();
    },

    timeFormat: function(ms){

        ms = ms * 1000;

        var d_second,d_minutes, d_hours, d_days;
        var timeNow = new Date().getTime();
        var d = (timeNow - ms)/1000;
        d_days = Math.round(d / (24*60*60));
        d_hours = Math.round(d / (60*60));
        d_minutes = Math.round(d / 60);
        d_second = Math.round(d);
        if (d_days > 0 && d_days < 2) {
            return d_days + i18n.global.day_ago;
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + i18n.global.hour_ago;
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + i18n.global.minute_ago;
        } else if (d_minutes <= 0 && d_second >= 0) {
            return i18n.global.just_now;
        } else {
            var s = new Date();
            s.setTime(ms);
            return (s.getFullYear() + '-' + f(s.getMonth() + 1) + '-' + f(s.getDate()) + ' '+ f(s.getHours()) + ':'+ f(s.getMinutes()));
        }

        function f(n){
            if(n < 10)
                return '0' + n;
            else
                return n;
        }
    },

    getCharLength: function(str){
        var iLength = 0;
        for(var i = 0;i<str.length;i++)
        {
            if(str.charCodeAt(i) >255)
            {
                iLength += 2;
            }
            else
            {
                iLength += 1;
            }
        }
        return iLength;
    },

    matchUrl: function(string){
        var reg = /((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&;:\/~\+#]*[\w\-\@?^=%&;\/~\+#])?/g;

        string = string.replace(reg,function(a){
            if(a.indexOf('http') !== -1 || a.indexOf('ftp') !== -1){
                return '<a href=\"#\" onclick=\"event.stopPropagation();window.open(\'' + a + '\',\'_blank\')\">' + a + '</a>';
            }
            else
            {
                return '<a href=\"#\" onclick=\"event.stopPropagation();window.open(\'http://' + a + '\',\'_blank\')\">' + a + '</a>';
            }
        });
        return string;
    },

    bindEvents: function(bindings) {
        for (var i in bindings) {
            if(bindings[i].selector) {
                $$(bindings[i].element)
                    .on(bindings[i].event,bindings[i].selector , bindings[i].handler);
            }else{
                $$(bindings[i].element)
                    .on(bindings[i].event, bindings[i].handler);
            }
        }
    },

    setCookie: function(name, value, days, path){
        var d = new Date();
        days = days || 1; // 先保存24小时
        path = path ? path : "/";
        d.setDate(d.getDate() + days);
        var expires = days ? "expires=" + d.toUTCString() : "";
        document.cookie = name + "=" + value + "; " + expires+";path = "+path;
    },

    getCookie: function(name){
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
    },

    removeCookie: function(name){
        document.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },

    getQueryString: function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        return r == null ? (arguments[1] === undefined ? null : arguments[1]) :
            decodeURIComponent(r[2]);
    },

    zeroFill: function(str){
        str = String(str);
        str = str.length < 2 ? "0"+str : str;
        return str;
    },

    logout: function(doDirect){
        this.removeCookie("username");
        this.removeCookie("userid");
        this.removeCookie("mobile");
        this.removeCookie("user_access_token");
        this.removeCookie("user_chat_id");
        this.removeCookie("user_chat_pwd");

        var QC = QC || {};

        // logout qq
        if(QC.Login && QC.Login.check()){
            QC.Login.signOut();
        }

        // set the login tag for wedk
        if(app.wsdk){
            app.wsdk.isLogin = false;
        }

        if(doDirect){
            window.location.reload();
        }
    }
};