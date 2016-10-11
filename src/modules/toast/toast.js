require('./toast.less');

var appFunc = require('../utils/appFunc'),
    template = require('./toast.tpl.html');

module.exports = {
    show: function(message){
        var view = this;

        var html = appFunc.renderTpl(template, {message: message});
        $$("body").append(html);

        view.$el = $$(".Toast");
        view.display();
    },

    display: function(){
        var view = this;
        var $window = $$(window);
        var winWidth = $window.width();
        var winHeight = $window.height();
        var width = view.$el.width();
        var height = view.$el.height();
        var timeout = view.timeout || 4000;

        view.$el.offset({
            left: (winWidth - width) / 2,
            top: (winHeight - height) / 2
        });

        view.$el.addClass("show");
        setTimeout(function(){
            view.$el.removeClass("show");
            view.$el.once("btransitionend", function(){
                view.$el.remove();
            });
        }, timeout);
    }
};