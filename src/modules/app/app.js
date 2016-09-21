require('./app.less');

var appFunc = require('../utils/appFunc'),
    welcome = require('../welcome/welcome'),
    dashboardView = require('../dashboard/dashboard'),
    businessView = require('../business/business'),
    messageView = require('../message/message'),
    userView = require('../user/user');

module.exports = {
    init: function(){
        this.initTabEvents();

        var userId = appFunc.getCookie("userid");

        if(userId === "" || userId === "undefined"){
            welcome.init();
            mainF7View.hideNavbar();
            appFunc.hideToolbar();
        }else {
            appFunc.showMainView();
        }
    },

    initTabEvents: function(){
        var bindings = [{
            element: '.tab-link',
            selector: '.toolbar',
            event: 'click',
            handler: function(e){
                var $item = $$(e.currentTarget);
                var name = $item.data("page");

                switch (name) {
                    case 'dashboard':
                        dashboardView.init();
                        break;
                    case 'business':
                        businessView.init();
                        break;
                    case 'message':
                        messageView.init();
                        break;
                    case 'user':
                        userView.init();
                        break;
                    case 'login':
                        loginModule.init();
                        break;
                    case 'register':
                        registerModule.init();
                        break;
                }
            }
        }];

        appFunc.bindEvents(bindings);
    }
};