require('./browser.less');

var appFunc = require('../utils/appFunc'),
    template = require('./browser.tpl.html');

module.exports = {
    init: function(data){
        var view = this;console.log("data", data);

        view.$el = $$(".BrowserView");
        view.title = data.title;
        view.url = data.url;
        view.id = data.id;
        view.setTitle();
        view.refreshContent();
    },

    setTitle: function(){
        var view = this;
        var $title = $$(".browser-title");

        $title.text(view.title);
    },

    refreshContent: function(){
        var view = this;
        var $content = view.$el.find(".page-content");
        var url = view.url;

        if(view.id){
            url = url + "?id=" + view.id
        }

        var html = appFunc.renderTpl(template, {url: url});
        $content.append(html);
    }
};