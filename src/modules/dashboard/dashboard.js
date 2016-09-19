require('./dashboard.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./dashboard.tpl.html');

var dashboard = {
    init: function(){
        var view = this;

        view.$el = $$(".DashboardView");
        view.cityId = 5101; //成都ID
        view.current_page = 2; // 从第二页开始查
        view.loading = false;
        view.keyword = "";
        view.refreshFeedList(true);
        view.initPullToRefresh();
    },

    refreshFeedList: function(doRefresh, keyword, page){
        var view = this;
        var $content = view.$el.find(".feed-content");

        keyword = keyword || "";
        page = page || 2;

        var props = {
            city_id: this.cityId,
            tag_identity_id: 0,
            keyword: keyword
        };

        if(doRefresh){
            $content.html("");
        }

        service.getFeedList(props, function(result){
            var list = result.list;
            var page = result.page;

            for(var i = 0; i < list.length; i++){
                var user = list[i];
                user.integrity_progress = user.integrity_progress * 100 + "%";
                user.advantages = user.advantages.slice(0, 3);
                user.needs = user.needs.slice(0, 3);

                var html = appFunc.renderTpl(template, user);
                $content.append(html);
            }

            yaoyueApp.pullToRefreshDone();
        }, function(err){

        });
    },

    initPullToRefresh: function(){
        var view = this;
        var $content = view.$el.find(".pull-to-refresh-content");

        // 添加'refresh'监听器
        $content.on('refresh', function (e) {
            view.refreshFeedList(true);
        });
    }
};

module.exports = dashboard;