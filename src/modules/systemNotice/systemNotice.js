require ('./systemNotice.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./systemNotice.tpl.html');

module.exports = {
    init: function(){
        var view = this;

        view.$el = $$(".SystemNoticeView");
        appFunc.hideToolbar();
        view.refreshList();
        view.initPullToRefresh();
    },

    refreshList: function(){
        var view = this;
        var $list = view.$el.find(".page-content .list").html("");

        service.getList({}, function(result){
            var list = result.list || [];
            var page = result.page;

            if(list.length > 0){
                view.current_page = page.current_page;
                view.page_count = page.page_count;

                var html = appFunc.renderTpl(template, {list: list});
                $list.append(html);

                yaoyueApp.pullToRefreshDone();
            }
        }, function(){

        })
    },

    initPullToRefresh: function(){
        var view = this;
        var $content = view.$el.find(".pull-to-refresh-content");

        // 添加'refresh'监听器
        $content.on('refresh', function (e) {
            view.refreshList();
        });
    }
};