require ('./cityPicker.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./cityPicker.tpl.html'),
    hotTemplate = require('./hotList.tpl.html');

module.exports = {
    init: function(){
        var view = this;
        appFunc.hideToolbar();
        yaoyueApp.showIndicator();

        view.$el = $$(".CityPickerView");
        view.getCityList();
    },

    getCityList: function(){
        var view = this;
        var $list = view.$el.find(".list-block");
        var $hot = view.$el.find(".hot-list .item-inner");

        service.getCityList({}, function(result){
            var data = result.data;
            var hotCityList = data.hot_city;
            var normalCityList = data.normal_city;

            var hotHtml = appFunc.renderTpl(template, {list: hotCityList});
            var html = appFunc.renderTpl(template, {normalCityList: normalCityList});
            $hot.append(hotHtml);
            $list.append(html);

            yaoyueApp.hideIndicator();
        }, function(){

        });
    }
};