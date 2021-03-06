require('framework7');
require('../style/less/app.less');

var router = require('./router'),
    appFunc = require('./utils/appFunc'),
    index = require('./app/app'),
    date = require('./utils/date'),
    oss = require('./utils/oss');

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
                path = oss.getImgSuitablePath(path);
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

        // --------- parseDate --------- //
        Template7.registerHelper('parseDate', function (value, options) {
            var time = date.getTimeForNow();
            var dateStr = value * 1000;
            var diffTime = 1000 * 60 * 60 * 24 * 7; // 7 days diff
            var result;

            if(date.checkDiffDate(dateStr, time, diffTime)){
                result = date.format(dateStr, "YYYY-MM-DD");
            }else {
                result = date.dateSinceToday(value * 1000);
            }

            return result;
        });
        // --------- /parseDate --------- //

        // --------- parseTime --------- //
        Template7.registerHelper('parseTime', function (value, options) {
            return date.getParseTime(value);
        });
        // --------- /parseTime --------- //

        // --------- parseDay --------- //
        Template7.registerHelper('parseDay', function (value, options) {
            return date.getMonthNumber(value) + "月" + date.getDayNumber(value) + "日";
        });
        // --------- /parseDay --------- //

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

        window.messageF7View = yaoyueApp.addView('#messageView', {
            dynamicNavbar: true
        });

        window.userF7View = window.userF7View =  yaoyueApp.addView('#userCenterView', {
            dynamicNavbar: true
        });

        router.init();
        index.init();
    }
};

app.initialize();
