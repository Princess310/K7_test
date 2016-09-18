require('./app.less');

var appFunc = require('../utils/appFunc'),
    dashboardView = require('../dashboard/dashboard'),
    welcome = require('../welcome/welcome');

module.exports = {
    init: function(){
        var userId = appFunc.getCookie("userid");

        if(userId === "" || userId === "undefined"){
            welcome.init();
            mainF7View.hideNavbar();
            appFunc.hideToolbar();
        }

        dashboardView.init();
    }
};