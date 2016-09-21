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

        yaoyueApp.showIndicator();
        view.refreshFeedList(true);
        view.initPullToRefresh();
        view.initPageInfiniteScroll();
        view.bindEvents();
    },

    refreshFeedList: function(doRefresh, keyword, page){
        var view = this;
        var $content = view.$el.find(".feed-content");
        var $scroll = view.$el.find(".infinite-scroll");

        keyword = keyword || "";
        page = page || 2;

        var props = {
            city_id: this.cityId,
            tag_identity_id: 0,
            keyword: keyword,
            page: page
        };

        if(doRefresh){
            $content.html("");
            yaoyueApp.attachInfiniteScroll($scroll);
        }

        service.getFeedList(props, function(result){
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

            // 弹出提示消息
            if(page.current_page == 1){
                view.setMatchCount(list.length);
            }

            for(var i = 0; i < list.length; i++){
                var user = list[i];

                user.integrity_progress = user.integrity_progress * 100 + "%";
                user.advantages = user.advantages.slice(0, 3);
                user.needs = user.needs.slice(0, 3);

                var html = appFunc.renderTpl(template, user);
                $content.append(html);
            }

            // 加载标记重置
            view.loading = false;
            yaoyueApp.hideIndicator();
            yaoyueApp.pullToRefreshDone();
        }, function(err){

        });
    },

    initPullToRefresh: function(){
        var view = this;
        var $content = view.$el.find(".pull-to-refresh-content");

        // 添加'refresh'监听器
        $content.on('refresh', function (e) {
            view.refreshFeedList(true, view.keyword, 1);
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

            view.refreshFeedList(false, view.keyword, (view.current_page + 1));
        });
    },

    setMatchCount: function(count){
        var view = this;

        count = count || 0;
        var $content = view.$el.find(".search-content");
        var $match = view.$el.find(".match-panel");

        if(count > 0){
            $match.removeClass("hide").removeClass("hide-panel").find(".match-mark").text(count);

            setTimeout(function(){
                $match.addClass("hide-panel");
            }, 2000);
        }
    },

    scrollToTop: function(e){
        var view = this;
        var $content = view.$el.find(".page-content");

        $content.scrollTop(0, 1000);
    },

    bindEvents: function(){
        var view = this;

        var $top = view.$el.find(".top");
        // scroll listing
        view.$el.find(".page-content").scroll(function(e){
            var $content = $$(this);

            if($content.scrollTop() > 200){
                $top.removeClass("hide");
            }else {
                $top.addClass("hide");
            }
        });

        var bindings = [{
            element: '.top',
            selector: this.$el,
            event: 'click',
            handler: function(e){
                view.scrollToTop(e);
            }
        }];

        appFunc.bindEvents(bindings);
    }
};

module.exports = dashboard;