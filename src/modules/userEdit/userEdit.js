require ('./userEdit.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./userEdit.tpl.html');

module.exports = {
    init: function(page){
        var view = this;

        view.$el = $$(".UserEditView");
        appFunc.hideToolbar();
        view.showUserInfo();
    },

    showUserInfo: function(){
        var view = this;
        var id = appFunc.getCookie("userid");
        var $content = view.$el.find(".page-content");

        service.getUserInfo({id: id}, function(result){
            var data = result.data;
            view.data = data;
            view.avatar = data.avatar;
            view.tag_identity_id = data.tag_identity_id;
            view.industry_son_id = data.industry_son_id;

            var html = appFunc.renderTpl(template, data);
            $content.append(html);
        }, function(){});
    }
};