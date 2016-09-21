require ('./user.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./user.tpl.html');

module.exports = {
    init: function(){
        var view = this;

        view.$el = $$(".UserCenterView");
        yaoyueApp.showIndicator();
        // 隐藏个人中心的nav
        userF7View.hideNavbar();

        view.showUserInfo();
    },

    showUserInfo: function(){
        var view = this;
        var userId = appFunc.getCookie("userid");
        var $container = view.$el.find(".ali-user-info");
        var statusInfo = "未认证";

        service.getUserInfo({id: userId}, function(result){
            var data = result.data;
            data.integrity_progress = data.integrity_progress * 100 + "%";

            switch(data.verify_status){
                case 0:
                    statusInfo = '<span class="iconfont icon-chengweirenzhengyonghu1" style="margin-right: 8px"></span>未认证';
                    break;
                case -1:
                    statusInfo = "认证失败";
                    break;
                case 1:
                    statusInfo = "认证中";
                    break;
                case 2:
                    statusInfo = "认证成功";
                    break;
            }

            var html = appFunc.renderTpl(template, data);
            $container.html(html);

            yaoyueApp.hideIndicator();
        }, function(){

        })
    }
};