require('./app.less');

var appFunc = require('../utils/appFunc'),
    dashboardView = require('../dashboard/dashboard');

module.exports = {
    init: function(){
        dashboardView.init()
    }
};