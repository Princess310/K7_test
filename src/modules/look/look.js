require('./look.less');

var appFunc = require('../utils/appFunc');

module.exports = {
    init: function(data){
        var view = this;

        view.$el = $$(".LookView");
        var $title = $$(".look-title");
        var $content = view.$el.find(".page-content");

        $title.text(data.title);
        $content.append('<div class="iconfont icon-'+ data.icon + ' icon"></div><div class="des">' + data.text + '</div>');
    }
};