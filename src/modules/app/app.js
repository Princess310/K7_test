require('./app.less');

var appFunc = require('../utils/appFunc'),
    homeView = require('../home/home');

module.exports = {
    init: function(){
        homeView.init()
    }
};