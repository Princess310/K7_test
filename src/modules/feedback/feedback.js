require('./feedback.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    oss = require('../utils/oss'),
    toast = require('../toast/toast'),
    template = require('../templates/publish-file.tpl.html');

module.exports = {
    init: function(){
        var view = this;

        view.$el = $$(".FeedbackView");
        view.fileCount = 0;
        view.bindEvents();
    },

    refreshFileCount: function(){
        var view = this;
        var count = view.fileCount || 0;
        var $count = view.$el.find(".files-container .file-count .count");
        $count.text(count);
    },

    handleUpload: function(e){
        var view = this;
        var $input = $$(e.currentTarget);

        var $container = view.$el.find(".files-container .weui_uploader_files");
        var input = $input[0];
        var file = input.files[0];
        var name = file.name;
        var size = file.size;
        var path = oss.getAvatarFolderPath() + "__" + size + "__" + oss.getFileSuffix(name);
        var html;

        if(view.fileCount == 9){
            return false;
        }

        oss.multipartUpload(path, file, function(result){
            var url = oss.getFileDomain() + oss.getFilePath(result.name);
            // get the img domain
            url = oss.getImgDomain(url);

            html = appFunc.renderTpl(template, {url: url});
            $container.prepend(html);
            // change the file count
            view.fileCount++;
            view.refreshFileCount();

            service.saveFile({
                filename: name,
                url: url,
                model_name: "moments"
            }, function(){}, function(){});
        }, function(){});
    },

    clearFile: function(e){
        var view  = this;
        var $item = $$(e.target);
        var $file = $item.closest(".weui_uploader_file");
        $file.remove();
        // change the file count
        view.fileCount--;
        view.refreshFileCount();
    },

    countText: function(e){
        var view = this;

        var $item = $$(e.currentTarget);
        var $count = view.$el.find(".words-count .count");
        var content = $item.val();
        var count = content.length;
        $count.text(count);
    },

    saveInfo: function(){
        var view = this;
        var $area = view.$el.find(".publish-area");
        var $fileContainer = view.$el.find(".files-container .weui_uploader_files");
        var content = $area.val();
        var pictures = [];
        var url;

        if(content === ""){
            toast.show("内容不能为空！");
            return false;
        }

        $fileContainer.find(".weui_uploader_file").each(function(k, v){
            var url = $$(this).data("url");
            pictures.push(url);
        });

        service.saveFeedBack({
            message: content,
            pictures: pictures.join(",")
        }, function(result){
            userF7View.loadPage({
                url: 'page/look.html?icon=fankui&text=提交成功，感谢您的反馈！&title=意见反馈'
            });
        }, function(error){
            toast.show(error.message);
        });
    },

    bindEvents: function(){
        var view = this;

        var bindings = [{
            element: '#file-upload',
            event: 'change',
            handler: function(e){
                view.handleUpload(e);
            }
        },{
            element: '.publish-area',
            event: 'keyup',
            handler: function(e){
                view.countText(e);
            }
        },{
            element: '.publish-btn',
            event: 'click',
            handler: function(e){
                view.saveInfo(e);
            }
        },{
            element: view.$el,
            selector: '.clear-file',
            event: 'click',
            handler: function(e){
                view.clearFile(e);
            }
        }];

        appFunc.bindEvents(bindings);
    }
};