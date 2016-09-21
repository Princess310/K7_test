require('./message.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./message.tpl.html'),
    linkTemplate = require('./link.tpl.html');

module.exports = {
    init: function(){
        var view = this;

        view.$el = $$(".MessageView");
        view.renderActionLinks();
    },

    renderActionLinks: function(){
        var view = this;
        var $wrapper = view.$el.find(".link-wrapper").html("");

        $wrapper.append(appFunc.renderTpl(linkTemplate));
    }
};