require('./welcome.less');

var appFunc = require('../utils/appFunc'),
    template = require('./welcome.tpl.html');

module.exports = {
    pics: [
        require("../../resource/img/app-1.jpg"),
        require("../../resource/img/app-2.jpg"),
        require("../../resource/img/app-3.jpg"),
        require("../../resource/img/app-4.jpg")
    ],

    init: function(){
        var html = appFunc.renderTpl(template, {pics: this.pics});

        $$(".WelcomeAppView .swiper-wrapper").html(html);
        this.initSwiper();
    },

    initSwiper: function(){
        var mySwiper = yaoyueApp.swiper('.swiper-container',{
            pagination : '.swiper-pagination'
        });
    }
};