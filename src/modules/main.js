require('framework7');
require('../style/less/app.less');

var router = require('./router'),
    appFunc = require('./utils/appFunc'),
    index = require('./app/app');

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        window.onload = this.onDeviceReady();
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(event) {
        switch (event) {
            case 'deviceready':
                app.initMainView();
                break;
        }
    },
    initMainView:function(){
        app.initFramework7();
    },
    initFramework7: function(){
        //Register custom Template7 helpers
        Template7.registerHelper('t', function (options){
            var key = options.hash.i18n || '';
            var keys = key.split('.');

            var value;
            for (var idx = 0, size = keys.length; idx < size; idx++)
            {
                if (value != null)
                {
                    value = value[keys[idx]];
                } else {
                    value = i18n[keys[idx]];
                }

            }
            return value;
        });

        // --------- suitableImg --------- //
        Template7.registerHelper('suitableImg', function (path, options) {
            var path = path || "";

            if(path.indexOf("__") >= 0){
                //path = app.oss.getImgSuitablePath(path);
            }
            return path;
        });
        // --------- /suitableImg --------- //

        // --------- check --------- //
        Template7.registerHelper('check', function (lvalue, operator, rvalue, options) {
            var operators, result;

            if (arguments.length < 3) {
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
            }

            if (options === undefined) {
                options = rvalue;
                rvalue = operator;
                operator = "===";
            }
            operators = {
                '===': function (l, r) { return l === r; },
                '!==': function (l, r) { return l !== r; },
                '<': function (l, r) { return l < r; },
                '>': function (l, r) { return l > r; },
                '<=': function (l, r) { return l <= r; },
                '>=': function (l, r) { return l >= r; },
                'typeof': function (l, r) { return typeof l == r; }
            };

            if (!operators[operator]) {
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
            }
            result = operators[operator](lvalue, rvalue);

            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }

        });
        // --------- /check --------- //

        // --------- parseDistance --------- //
        Template7.registerHelper('parseDistance', function (distance, city, options) {
            var distance = distance;
            var result;

            if(distance >= 0){
                if(distance < 1000){
                    result =  Math.round(distance) + " m";
                }else if(distance < 99 * 1000){
                    result =  Number(distance / 1000).toFixed(1) + " km";
                }else {
                    result = city ? city : ">99km";
                }
            }else {
                result = "未知";
            }
            return result;
        });
        // --------- /parseDistance --------- //

        window.$$ = Dom7;
        window.yaoyueApp = new Framework7({
            popupCloseByOutside:false,
            animateNavBackIcon: true,
            modalTitle: "test",
            modalButtonOk: "ok",
            modalButtonCancel: "cancel",
            preroute: function (view, options) {
                var userId = appFunc.getCookie("userid");
                console.log("in preroute1");
                return true;
            }
        });

        window.mainF7View = yaoyueApp.addView('#mainView', {
            dynamicNavbar: true,
            preroute: function (view, options) {
                var userId = appFunc.getCookie("userid");
                console.log("in preroute2");
                return true;
            }
        });

        window.dashboardF7View = yaoyueApp.addView('#dashboardView', {
            dynamicNavbar: true
        });

        yaoyueApp.addView('#contactView', {
            dynamicNavbar: true
        });

        window.userF7View =  yaoyueApp.addView('#userCenterView', {
            dynamicNavbar: true
        });

        router.init();
        index.init();
    }
};

app.initialize();
