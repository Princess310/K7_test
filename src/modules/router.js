var index = require('./app/app'),
    appFunc = require('./utils/appFunc');

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

        if(name === 'homeView' || name === 'contactView' || name === 'setting' ){
            if(from === 'left'){
                appFunc.showToolbar();
            }
        }
    },
    pageBeforeInit: function(page) {
        var name = page.name;
        var query = page.query;
    }
};