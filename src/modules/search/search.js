require ('./search.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./search.tpl.html');

module.exports = {
  init: function(){
      appFunc.hideToolbar();
  }
};