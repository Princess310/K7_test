require('./private.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service');

module.exports = {
    init: function(){
        var view = this;

        view.$el = $$(".PrivateView");
        view.setPrivate();
        view.bindEvents();
    },

    setPrivate: function(){
        var view = this;
        var $friend = view.$el.find("#friend-switch");
        var $message = view.$el.find("#message-switch");

        service.getPrivate({}, function(result){
            var data = result.list;

            if(data.invited_by_verified_user_only === "1"){
                $friend[0].checked = true;
            }

            if(data.chat_from_verified_user_only === "1"){
                $message[0].checked = true;
            }
        }, function(){});
    },

    changeFriendSetting: function(e){
        var view = this;
        var $item = $$(e.currentTarget);
        var value = $item[0].checked ? 1 : 0;

        service.setPrivate({type: 1, value: value}, function(){}, function(){})
    },

    changeMessageSetting: function(e){
        var view = this;
        var $item = $$(e.currentTarget);
        var value = $item[0].checked ? 1 : 0;

        service.setPrivate({type: 2, value: value}, function(){}, function(){})
    },

    bindEvents: function(){
        var view = this;

        var bindings = [{
            element: '#friend-switch',
            selector: view.$el,
            event: 'change',
            handler: function(e){
                view.changeFriendSetting(e);
            }
        },{
            element: '#message-switch',
            selector: view.$el,
            event: 'change',
            handler: function(e){
                view.changeMessageSetting(e);
            }
        }];

        appFunc.bindEvents(bindings);
    }
};