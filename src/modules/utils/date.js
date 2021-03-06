var moment = require("moment");
moment.locale('zh-cn'); //中文配置初始化

var _DEFAULT_FORMAT_DATE = "YYYY-MM-DD HH:mm:ss";

// the time check value: 1 day for now
var _CHECK_DEFAULT_TIME = 24 * 60 * 60 * 1000;

module.exports = {
    /**
     * [format 时间戳格式化]
     * @param  {[Number || Object]} date   [时间戳或Date对象]
     * @param  {[转换格式]} format [需要转换的格式，不传则用_DEFAULT_FORMAT_DATE]
     * @return {[String]}        [格式化后的时间]
     */
    format: function(date, format){
        if(!date){
            return;
        }

        if(!format){
            format = _DEFAULT_FORMAT_DATE;
        }

        var m = moment(date);
        var dateStr = m.format(format);
        return dateStr;
    },

    /**
     * [dateSinceToday 计算日期距离当前时间多久]
     * @param  {[Number || Object]} date   [时间戳或Date对象]
     * @return {[String]}      [计算结果 如: 1分钟前]
     */
    dateSinceToday: function(date){
        if(!date){
            return;
        }
        var value = moment(date).fromNow();
        return value;
    },

    /**
     * [getParseTime description]
     * @param  {[String]} times [Unix 时间戳]
     * @return {[String]}       [返回时间的时分 如12:20]
     */
    getParseTime: function(times){
        var date = new Date(times * 1000);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        return (hours + ":" + minutes);
    },

    /**
     * [getRoundTimeStr 获取当前时间戳+1000-99999之间的随机数]
     * @return {[String]} [随机数]
     */
    getRoundTimeStr: function(){
        var date = new Date();
        var times = Math.round(date.getTime() / 1000);

        // 获取10000 ~ 99999之间的随机数
        var min = 1000;
        var max = 99999;
        var diff = max - min;
        var num = Math.round(Math.random() * diff) + min;

        return String(times) + num;
    },

    /**
     * [newMoment 生成moment对象]
     * @param  {[Number || Object]} date   [时间戳或Date对象]
     * @return {[Object]}      [moment对象]
     */
    newMoment: function(date){
        return moment(date);
    },

    /**
     * [getTimeForNow 获取当前日期的时间戳]
     * @return {[Number]} [时间戳]
     */
    getTimeForNow: function(){
        return (new Date()).getTime();
    },

    /**
     * [checkDiffDate 判断2个日期间隔是否超过一定的时间]
     * @param  {[Number]} date1    [时间戳 小]
     * @param  {[Number]} date2    [时间戳 大]
     * @param  {[Number]} checkVal [时间间隔时间出戳]
     * @return {[Boolean]}          [判断结果]
     */
    checkDiffDate: function(date1, date2, checkVal){
        if(!checkVal){
            checkVal = _CHECK_DEFAULT_TIME;
        }
        return ((date2 - date1) > checkVal);
    },

    /**
     * [isInSameDay 2个日期是否在相同一天]
     * @param  {[Number]}  date1 [时间戳1]
     * @param  {[Number]}  date2 [时间戳2]
     * @return {Boolean}       [判断结果]
     */
    isInSameDay: function(date1, date2){
        return ((new Date(date1)).getDay() == (new Date(date2)).getDay());
    },

    /**
     * [getMonthNumber 获取日期的月份数]
     * @param  {[Number]} times [时间戳]
     * @return {[Number]}       [月份数]
     */
    getMonthNumber: function(times){
        var date = new Date(times * 1000);

        return (date.getMonth() + 1);
    },

    /**
     * [getDayNumber 获取日期的天]
     * @param  {[Number]} times [时间戳]
     * @return {[Number]}       [天]
     */
    getDayNumber: function(times){
        var date = new Date(times * 1000);

        return date.getDay();
    }
};