var OSS_REGION = "oss-cn-hangzhou";
var IMG_REGION = "img-cn-hangzhou";
var ACCESS_KEY_ID = "n70Ga5w3Bw4nCxNB";
var ACCESS_KEY_SECRET = "ApAmZ2VhKIcWzaSYIM6ee9WAa1tb04";
var BUCKT_NAME = "alijian-yaoyue-uploads-1";
var DOMAIN = "http://alijian-yaoyue-uploads-1.oss-cn-hangzhou.aliyuncs.com/";

var date = require("./date"),
    appFunc = require("./appFunc");

module.exports = {
    // 文件模块类型
    module: {
        chat: "chat",
        avatar: "avatar",
        moments: "moments"
    },
    // Sigle Instance: 初始化oss对象
    client: new OSS.Wrapper({
        region: OSS_REGION,
        accessKeyId: ACCESS_KEY_ID,
        accessKeySecret: ACCESS_KEY_SECRET,
        bucket: BUCKT_NAME
    }),
    /**
     * [list 获取文件列表]
     * @param  {[String]} maxKeys     [最大排序数]
     * @param  {[Function]} backSuccess [成功回调]
     * @param  {[Function]} backFail    [错误回调]
     * @return {[Undefined]}             [undefined]
     */
    list: function(maxKeys, backSuccess, backFail){
        this.client.list({
            'max-keys': maxKeys
        }).then(function (result) {
            backSuccess(result);
        }).catch(function (err) {
            console.log("oss error", err);
            backFail(err);
        });
    },

    /**
     * [multipartUpload 上传第三方文件]
     * @param  {[String]} storeAs     [文件名称]
     * @param  {[Object]} file        [文件对象]
     * @param  {[Function]} backSuccess [成功回调]
     * @param  {[Function]} backFail    [错误回调]
     * @return {[Undefined]}             [undefined]
     */
    multipartUpload: function(storeAs, file, backSuccess, backFail){
        this.client.multipartUpload(storeAs, file).then(function (result) {
            backSuccess(result);
        }).catch(function (err) {
            console.log(err);
            backFail(err);
        });
    },

    /**
     * [signatureUrl 下载第三方文件]
     * @param  {[String]} saveAs    [文件名称]
     * @param  {[String]} objectKey [文件key]
     * @return {[String]}           [文件地址url]
     */
    signatureUrl: function(saveAs, objectKey){
        var result = this.client.signatureUrl(objectKey, {
            expires: 3600,
            response: {
                'content-disposition': 'attachment; filename="' + saveAs + '"'
            }
        });
        return result;
    },

    // Chat模块地址
    getChatFolderPath: function(){
        var path = this.module.chat;
        var prefix = date.getRoundTimeStr();
        var userId = appFunc.getCookie("userid");

        return path + "/" + userId + "/" + prefix;
    },

    // Avatar模块地址
    getAvatarFolderPath: function(){
        var path = this.module.avatar;
        var prefix = date.getRoundTimeStr();
        var userId = appFunc.getCookie("userid");

        return path + "/" + userId + "/" + prefix;
    },

    // Moments模块地址
    getMomentsFolderPath: function(){
        var path = this.module.moments;
        var prefix = date.getRoundTimeStr();
        var userId = appFunc.getCookie("userid");

        return path + "/" + userId + "/" + prefix;
    },

    getSourthRegionPath: function(){
        return OSS_REGION;
    },

    getImgRegionPath: function(){
        return IMG_REGION;
    },

    getFileDomain: function(){
        return DOMAIN;
    },

    // url地址的问号转义，也可以用encodeURL
    getFilePath: function(str){
        return str.replace("?", "%3F");
    },

    // 获取文件后缀名
    getFileSuffix: function(fileName){
        var fileExt = (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName.toLowerCase()) : '';
        return "." + fileExt;
    },

    // 缩小文件 150kb for now
    getImgSuitablePath: function(path){
        var path = path;
        var arr1 = path.split("__");
        var size = arr1[arr1.length - 2];

        // 150kb for now
        var checkPicSize = 150 * 1024;
        var resizePercent = 100;

        size = Number(size);

        if(size > checkPicSize){
            resizePercent = Math.round(checkPicSize / size * 100);

            if(resizePercent === 0){
                resizePercent = 1;
            }
        }

        path = path + "@" + resizePercent + "p";

        return path;
    },

    // 文件路径转换
    getImgDomain: function(url){
        var path = this.getSourthRegionPath();
        var imgPath = this.getImgRegionPath();
        var regex = new RegExp(path);

        url = url.replace(regex, imgPath);
        return url;
    }
};