;(function($){
    //私有函数
    function Dialog($ele, options){
        this.$ele = $ele;
        this.opts = $.extend({},$.fn.popWin.defaults,options);
    }
    var popDialog,titleDialog,descDialog,btnDialog;
    Dialog.prototype = {
        createDialog:function(){
            var _this = this;
            //遮罩层
            this.$ele.css({
                position:'fixed',
                left:0,
                top:0,
                right:0,
                bottom:0,
                backgroundColor:'rgba(0,0,0,0.4)',
                overflow:'hidden'
            });
            //窗口区域
            popDialog = $('<div><div></div><div></div><div></div></div>').css({
                width:this.opts.width,
                height:this.opts.height,
                position:'absolute',
                top:'30%',
                left:'50%',
                marginLeft:'-' + (this.opts.width.split('px')[0] / 2) + 'px',
            }).attr('class',this.opts.winCssName);
            titleDialog = popDialog.find('div:eq(0)')
                                    .text(this.opts.title)
                                    .attr('class',this.opts.titleCssName);
            descDialog = popDialog.find('div:eq(1)')
                                   .text(this.opts.desc)
                                   .attr('class',this.opts.descCssName);
            btnDialog = popDialog.find('div:eq(2)')
                                  .attr('class',this.opts.btnAreaCssName);
            this.opts.btnArr.map(function(item, index) {
                btnDialog.append($('<button></button>')
                    .text(item)
                    .attr({'data-index':index, 'class':_this.opts.btnCssName})
                    .on('click', function() {
                        _this.opts.callback($(this).attr('data-index'));
                        $.fn.popWin.hide(_this.$ele);

                    }));
            });
            this.$ele.append(popDialog);
            $.fn.popWin.show(this.$ele);
        }
    }

    //定义暴露函数
    $.fn.popWin = function(options){
        var dialog = new Dialog(this,options);
        dialog.createDialog();
        return this;
    }
    $.fn.popWin.show = function($ele){
        $ele.show();
    }
    $.fn.popWin.hide = function($ele){
        $ele.hide(); 
        $('.pop-win').remove();
    }
    $.fn.popWin.defaults={
        width: '600', //弹窗宽
        height: '250', //弹窗高
        title: '标题', //标题
        desc: '描述', //描述
        winCssName: 'pop-win', //弹窗的CSS类名
        titleCssName: 'pop-title', //标题区域的CSS类名
        descCssName: 'pop-desc', //描述区域的CSS类名
        btnAreaCssName: 'pop-btn-box', //按钮区域的CSS类名
        btnCssName: 'pop-btn', //单个按钮的CSS类名
        btnArr: ['确定'], //按钮组
        callback: function(){} //点击按钮之后的回调函数
    }
})(jQuery)