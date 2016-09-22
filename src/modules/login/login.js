require('./login.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service');

module.exports = {
    init: function(){
        this.$el  = $$('.LoginView');
        this.bindEvents();
    },

    /**
     * [refreshBtnStatus 改变登录按钮的状态]
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

        if($$("#input-id").val() !== "" && $$("#pwd-id").val() !== ""){
            $btn.removeClass("disable");
        }else {
            $btn.addClass("disable");
        }
    },

    /**
     * [doLogin 登录表单提交]
     * @return {[Undefined]} [undefined]
     */
    doLogin: function(){
        var view = this;
        var username = view.$el.find("#input-id").val();
        var password = view.$el.find("#pwd-id").val();

        if(username === ""){
            yaoyueApp.alert("用户名不能为空！", "提示");
        }
        if(password === ""){
            yaoyueApp.alert("密码不能为空！", "提示");
        }

        service.login({
            username: username,
            password: password
        }, function(result){
            var data = result.data;
            var userId = data.id;
            var token = data.access_token;

            appFunc.setCookie("user_access_token", token);
            appFunc.setCookie("userid", userId);

            appFunc.showMainView();
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
            element: '#input-id',
            event: 'keyup',
            handler: function(e){
                view.refreshBtnStatus(e);

                if(e.keyCode == 13){
                    view.doLogin();
                }
            }
        }, {
            element: '#pwd-id',
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
        }];

        appFunc.bindEvents(bindings);
    }
};