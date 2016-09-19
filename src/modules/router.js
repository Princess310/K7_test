var index = require('./app/app'),
    appFunc = require('./utils/appFunc'),
    welcomeModule = require('./welcome/welcome'),
    loginModule = require('./login/login'),
    registerModule = require('./register/register');

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

        if(name === 'dashbordView' || name === 'contactView' || name === 'setting' ){
            if(from === 'left'){
                appFunc.showToolbar();
            }
        }
    },
    pageBeforeInit: function(page) {
        var name = page.name;
        var query = page.query;console.log("name", name);

        switch (name) {
            case 'welcome':
                welcomeModule.init();
                break;
            case 'login':
                loginModule.init();
                break;
            case 'register':
                registerModule.init();
                break;
        }
    }
};