require('./business.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./business.tpl.html'),
    Layzr = require("layzr.js");

module.exports  = {
    init: function(){
        var view = this;

        view.$el = $$(".BusinessCircleView");
        view.loading = false;

        yaoyueApp.showIndicator();
        view.initPullToRefresh(true);
        view.refreshMoments(true);
        view.initPageInfiniteScroll();
        view.bindEvents();
    },

    refreshMoments: function(doRefresh, page){
        var view = this;
        var $content = view.$el.find("#moments .content");
        var $scroll = view.$el.find("#moments .infinite-scroll");

        if(doRefresh){
            page = view.current_moment_page = 1;
            $content.html("");
            yaoyueApp.attachInfiniteScroll($scroll);
        }

        service.getMomentsList({page: page}, function(result){
            var list = result.list;
            var page = result.page;

            view.current_moment_page = page.current_page;
            view.page_moment_count = page.page_count;

            if(page.current_page >= page.page_count){
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                yaoyueApp.detachInfiniteScroll($scroll);
                // 删除加载提示符
                view.$el.find('#moments .infinite-scroll-preloader').remove();
            }

            if(list.length > 0){
                for(var i = 0; i < list.length; i++){
                    var comment = list[i];
                    var pictures = comment.pictures;
                    // record the img class
                    var img_class = "small";

                    if(pictures.length == 1){
                        img_class = "big";
                    }else if(pictures.length == 2){
                        img_class = "normal";
                    }

                    comment.img_class = img_class;
                    var html = appFunc.renderTpl(template, comment);
                    $content.append(html);
                }
            }

            // 加载标记重置
            view.loading = false;
            view.startLazyLoad();
            yaoyueApp.hideIndicator();
            yaoyueApp.pullToRefreshDone();
        }, function(){

        });
    },

    refreshPlaza: function(doRefresh, page){
        var view = this;
        var $content = view.$el.find("#plaza .content");
        var $scroll = view.$el.find("#plaza .infinite-scroll");

        if(doRefresh){
            page = view.current_plaza_page = 1;
            $content.html("");
            yaoyueApp.attachInfiniteScroll($scroll);
        }

        service.getPlazaList({page: page}, function(result){
            var list = result.list;
            var page = result.page;

            view.current_plaza_page = page.current_page;
            view.page_plaza_count = page.page_count;

            if(page.current_page >= page.page_count){
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                yaoyueApp.detachInfiniteScroll($scroll);
                // 删除加载提示符
                view.$el.find('#plaza .infinite-scroll-preloader').remove();
            }

            if(list.length > 0){
                for(var i = 0; i < list.length; i++){
                    var comment = list[i];
                    var pictures = comment.pictures;
                    // record the img class
                    var img_class = "small";

                    if(pictures.length == 1){
                        img_class = "big";
                    }else if(pictures.length == 2){
                        img_class = "normal";
                    }

                    comment.img_class = img_class;
                    var html = appFunc.renderTpl(template, comment);
                    $content.append(html);
                }
            }

            // 加载标记重置
            view.loading = false;
            view.startLazyLoad();
            yaoyueApp.hideIndicator();
            yaoyueApp.pullToRefreshDone();
        }, function(){

        });
    },

    initPullToRefresh: function(){
        var view = this;
        var $moments = view.$el.find(".moments-tab");
        var $plaza = view.$el.find(".plaza-tab");
        // 添加'refresh'监听器
        $moments.on('refresh', function (e) {
            view.refreshMoments(true);
        });

        $plaza.on('refresh', function (e) {
            view.refreshPlaza(true);
        });
    },

    initPageInfiniteScroll: function(){
        var view = this;
        var $momentScroll = view.$el.find(".moments-tab .infinite-scroll");
        var $plazaScroll = view.$el.find(".plaza-tab .infinite-scroll");

        $momentScroll.on("infinite", function(){
            // 如果正在加载，则退出
            if(view.loading ) return;

            // 设置flag
            view.loading = true;

            view.refreshMoments(false, (view.current_moment_page + 1));
        });

        $plazaScroll.on("infinite", function(){
            // 如果正在加载，则退出
            if(view.loading ) return;

            // 设置flag
            view.loading = true;

            view.refreshPlaza(false, (view.current_plaza_page + 1));
        });
    },

    startLazyLoad: function(){
        const instance = Layzr();

        // img lazy load
        instance
            .update()           // track initial elements
            .check()            // check initial elements
            .handlers(true);    // bind scroll and resize handlers
    },

    bindEvents: function(){
        var view = this;

        var bindings = [{
            element: '#moments',
            selector: this.$el,
            event: 'show',
            handler: function(e){
                view.refreshMoments(true);
            }
        }, {
            element: '#plaza',
            selector: this.$el,
            event: 'show',
            handler: function(e){
                view.refreshPlaza(true);
            }
        }];

        appFunc.bindEvents(bindings);
    }
};