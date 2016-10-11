require ('./resetPassword.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc');

module.exports = {
    init: function(){
        var view = this;

        appFunc.hideToolbar();
        view.$el = $$(".ResetPasswordView");
        view.bindEvents();
    },

    refreshBtnStatus: function(e){
        var view = this;
        var $item = $$(e.currentTarget);
        var $btn = view.$el.find(".form-btns .button");
        var $icon = $item.closest(".ali-input").find('.icon-wrapper');

        if($item.val() != ""){
            $icon.addClass("active");
        }else {
            $icon.removeClass("active");
        }

        if($$("#tel-id").val() !== "" && $$("#verify-id").val() !== "" && $$("#pwd-input").val() !== ""){
            $btn.removeClass("disable");
        }else {
            $btn.addClass("disable");
        }
    },

    getVerifyCode: function(e){
        e.stopPropagation();
        var view = this;
        var $item = $$(e.currentTarget);
        var username = view.$el.find("#tel-id").val();

        if(username === ""){
            yaoyueApp.alert("手机账号不能为空！", "提示");
            return;
        }

        var props = {
            type: 1,
            username: username
        };

        service.getVerifyCode(props, function(result){
            $item.addClass("disable");
            view.callCode = true;

            var timeId = setInterval(function(){
                view.resetTime--;
                $item.text(view.resetTime + "s重新获取");

                if(view.resetTime === 0){
                    clearInterval(timeId);
                    $item.removeClass("disable");
                    $item.text("获取验证码");
                    view.callCode = false;
                    view.resetTime = 60;
                    view.verifyCode = 0;
                }
            }, 1000);

            var data = result.data;
            view.verifyCode = data.code;
        }, function(err){
            yaoyueApp.alert(err.message, "提示");
        });
    },

    bindEvents: function(){
        var view = this;

        var bindings = [{
            element: '.look-pwd',
            event: 'click',
            handler: function(e){
                e.stopPropagation();
                var $item = $$(e.currentTarget);
                var $container = $item.closest(".ali-input");
                var $input = $container.find(".pwd-input");
                $item.toggleClass("can-see");

                if($item.hasClass("can-see")){
                    $input.attr("type", "text");
                }else {
                    $input.attr("type", "password");
                }
            }
        }, {
            element: '#tel-id',
            event: 'keyup',
            handler: function(e){
                view.refreshBtnStatus(e);

                if(e.keyCode == 13){
                    view.doLogin();
                }
            }
        }, {
            element: '#verify-id',
            event: 'keyup',
            handler: function(e){
                view.refreshBtnStatus(e);

                if(e.keyCode == 13){
                    view.doLogin();
                }
            }
        }, {
            element: '#pwd-input',
            event: 'keyup',
            handler: function(e){
                view.refreshBtnStatus(e);

                if(e.keyCode == 13){
                    view.doLogin();
                }
            }
        }, {
            element: '.login-btn',
            event: 'click',
            handler: function(e){
                view.doLogin();
            }
        }, {
            element: '.get-verify-code',
            selector: this.$el,
            event: 'click',
            handler: function(e){
                view.getVerifyCode(e);
            }
        }];

        appFunc.bindEvents(bindings);
    }
};