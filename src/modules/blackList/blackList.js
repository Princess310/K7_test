require('./blackList.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./blackList.tpl.html');

module.exports = {
    init: function(data){
        var view = this;

        view.loading = false;
        view.$el = $$(".BlackListView");
        // type-> 3: 不看他的商务圈, 4: 不让他看我的商务圈, 5: 黑名单
        view.type =data.type;
        yaoyueApp.showIndicator();
        view.setTitle();
        view.refreshList(true);
        view.initPullToRefresh();
        view.initPageInfiniteScroll();
    },

    setTitle: function(){
        var view = this;
        var $title = $$(".black-list-title");

        var titleMap = {
            3: "不看他的商务圈",
            4: "不让他看我的商务圈",
            5: "黑名单"
        };

        $title.text(titleMap[view.type]);
    },

    refreshList: function(doRefresh, page){
        var view = this;
        var $content = view.$el.find(".pull-to-refresh-content");
        var $scroll = view.$el.find(".infinite-scroll");
        var $list = view.$el.find(".page-content .list");
        var url, props;
        var type = view.type;

        if(doRefresh){
            page = view.current_moment_page = 1;
            $list.html("");
            yaoyueApp.attachInfiniteScroll($scroll);
        }

        if(type == 5){
            props = { page: page };
            url = "user/black-list";
        }else {
            props = { type: type, page: page };
            url = "privacy/shield-user"
        }
        service.getList(url, props, function(result){
            var list = result.list;
            var page = result.page;
            view.current_page = page.current_page;
            view.page_count = page.page_count;

            if(page.current_page >= page.page_count){
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                yaoyueApp.detachInfiniteScroll($scroll);
                // 删除加载提示符
                view.$el.find('.infinite-scroll-preloader').remove();
            }

            var html = appFunc.renderTpl(template, {list: list});
            $list.append(html);

            // 加载标记重置
            view.bindEvents();
            view.loading = false;
            yaoyueApp.hideIndicator();
            yaoyueApp.pullToRefreshDone();

        }, function(){});
    },

    initPullToRefresh: function(){
        var view = this;
        var $content = view.$el.find(".pull-to-refresh-content");

        // 添加'refresh'监听器
        $content.on('refresh', function (e) {
            view.refreshList(true, 1);
        });
    },

    initPageInfiniteScroll: function(){
        var view = this;
        var $scroll = view.$el.find(".infinite-scroll");

        $scroll.on("infinite", function(){
            // 如果正在加载，则退出
            if(view.loading ) return;

            // 设置flag
            view.loading = true;

            view.refreshList(false, (view.current_page + 1));
        });
    },

    handleCancel: function(e){
        var view = this;
        var $item = $$(e.currentTarget);
        var $action = $item.closest(".action-item");
        var $feed = $action.find(".feed-detail-mini");
        var type = view.type;
        var id = $feed.data("id");

        if(type == 5){
            service.setUser({fid: id}, function(){
                view.refreshList(true);
            }, function(){})
        }else {
            service.setPrivate({type: type, value: id}, function(){
                view.refreshList(true);
            }, function(){});
        }
    },

    bindEvents: function(){
        var view = this;

        var bindings = [{
            element: ".cancel-btn",
            event: 'click',
            handler: function(e){
                view.handleCancel(e);
            }
        }];

        appFunc.bindEvents(bindings);
    }
};