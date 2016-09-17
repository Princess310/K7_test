require('./dashboard.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./dashboard.tpl.html'),
    inputModule = require('../input/input');

var dashboard = {
    init: function(){
        this.refreshFeedList();
    },

    refreshFeedList: function(){
        service.getFeedList(function(){

        });
    }
};

module.exports = dashboard;