require('./register.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service');

module.exports = {
    init: function(){
        var view = this;

        view.$el  = $$('.RegisterView');
        view.step = 1;
        view.callCode = false;
        view.resetTime = 60;
        view.verifyCode = 0;
        view.bindEvents();
    },

    /**
     * [refreshBtnStatus 改变注册按钮的状态]
     * @return {[Undefined]} [undefined]
     */
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

        if($$("#tel-id").val() !== "" && $$("#pwd-input").val() !== "" && $$("#verify-id").val() !== ""){
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
        }

        var props = {
            type: 0,
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

    doRegister: function(e){
        var view = this;
        var username = view.$el.find("#tel-id").val();
        var password = view.$el.find("#pwd-input").val();
        var code = view.$el.find("#verify-id").val();

        var props = {
            username: username,
            password:password,
            code: code
        };

        service.register(props, function(result){
            var data = result.data;
            var token = data.access_token;
            var userId = data.id;

            appFunc.setCookie("username", username);
            appFunc.setCookie("userid", userId);
            appFunc.showMainView();
        }, function(err){
            yaoyueApp.alert(err.message, "提示");
        })
    },

    bindEvents: function(){
        var view = this;

        var bindings = [{
            element: '.look-pwd',
            selector: this.$el,
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
            selector: this.$el,
            event: 'keyup',
            handler: function(e){
                view.refreshBtnStatus(e);

                if(e.keyCode == 13){
                    view.doRegister();
                }
            }
        }, {
            element: '#verify-id',
            selector: this.$el,
            event: 'keyup',
            handler: function(e){
                view.refreshBtnStatus(e);

                if(e.keyCode == 13){
                    view.doRegister();
                }
            }
        }, {
            element: '#pwd-input',
            selector: this.$el,
            event: 'keyup',
            handler: function(e){
                view.refreshBtnStatus(e);

                if(e.keyCode == 13){
                    view.doRegister();
                }
            }
        }, {
            element: '.register-btn',
            selector: this.$el,
            event: 'click',
            handler: function(e){
                view.doRegister();
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