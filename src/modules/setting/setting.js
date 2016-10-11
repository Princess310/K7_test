var appFunc = require('../utils/appFunc');

module.exports = {
    init: function(){
        var view = this;

        view.$el = $$(".SettingView");
        view.bindEvents();
    },

    bindEvents: function(){
        var view = this;

        var bindings = [{
            element: view.$el,
            selector: '.logout-btn',
            event: 'click',
            handler: function(e){
                appFunc.logout(true);
            }
        }];

        appFunc.bindEvents(bindings);
    }
};