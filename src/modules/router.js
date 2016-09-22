var index = require('./app/app'),
    // App
    appFunc = require('./utils/appFunc'),
    welcomeModule = require('./welcome/welcome'),
    // Dashboard
    cityPickerModule = require('./cityPicker/cityPicker'),

    // Common
    browserModule = require('./browser/browser'),
    searchModule = require('./search/search'),


    // User Center
    loginModule = require('./login/login'),
    registerModule = require('./register/register'),
    systemNoticeModule = require('./systemNotice/systemNotice'),
    privateModule = require('./private/private'),
    blackListModule = require('./blackList/blackList'),
    userModule = require('./user/user');

module.exports = {
    init: function() {
        var that = this;
        $$(document).on('pageBeforeInit', function (e) {
            var page = e.detail.page;
            that.pageBeforeInit(page);
        });

        $$(document).on('pageAfterAnimation', function (e) {
            var page = e.detail.page;
            that.pageAfterAnimation(page);
        });
    },
    pageAfterAnimation: function(page){
        var name = page.name;
        var from = page.from;

        if(name === 'login' || name === "register"){
            mainF7View.showNavbar();
        }

        if(name === 'dashboardView' || name === 'business' || name === 'message' || name === 'user' ){
            if(from === 'left'){
                appFunc.showToolbar();

                // deep page back for init again
                switch (name) {
                    case 'user':
                        userModule.init();
                        break;
                }
            }
        }

        switch (name) {
            case 'city':
                cityPickerModule.init();
        }
    },
    pageBeforeInit: function(page) {
        var name = page.name;
        var query = page.query;console.log("name", name);

        var routerMap = {
            // App
            'welcome': function(){
                welcomeModule.init()
            },
            // Common
            'browser': function(){
                browserModule.init(query)
            },
            'search': function(){
                searchModule.init()
            },
            // User center
            'login': function(){
                loginModule.init()
            },
            'register': function(){
                registerModule.init()
            },
            'setting': function(){
                appFunc.hideToolbar();
            },
            'systemNotice': function(){
                systemNoticeModule.init()
            },
            'private': function(){
                privateModule.init()
            },
            'blackList': function(){
                blackListModule.init(query)
            }
        };

        var router =routerMap[name] &&  routerMap[name]();
    }
};