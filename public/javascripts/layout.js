(function($){
$.fn.autoTextarea = function(options) {
var defaults={
maxHeight:null,//文本框是否自动撑高，默认：null，不自动撑高；如果自动撑高必须输入数值，该值作为文本框自动撑高的最大高度
minHeight:$(this).height() //默认最小高度，也就是文本框最初的高度，当内容高度小于这个高度的时候，文本以这个高度显示
};
var opts = $.extend({},defaults,options);
$(this).each(function() {
var height,style=this.style;
this.style.height =  opts.minHeight + 'px';
if (this.scrollHeight > opts.minHeight) {
if (opts.maxHeight && this.scrollHeight > opts.maxHeight) {
height = opts.maxHeight;
style.overflowY = 'scroll';
} else {
height = this.scrollHeight;
style.overflowY = 'hidden';
}
style.height = height  + 'px';
}
});
return $(this).each(function() {
$(this).bind("paste cut keydown keyup focus blur",function(){
var height,style=this.style;
this.style.height =  opts.minHeight + 'px';
if (this.scrollHeight > opts.minHeight) {
if (opts.maxHeight && this.scrollHeight > opts.maxHeight) {
height = opts.maxHeight;
style.overflowY = 'scroll';
} else {
height = this.scrollHeight;
style.overflowY = 'hidden';
}
style.height = height  + 'px';
}
});
});
};
})(jQuery);


function formatJSON(json) {
  return JSON.stringify(json, null, 4); // 4 spaces
}

function parseQuery(url) {
  var res = {};
  var query = url.split('?')[1];
  if (!query) {
    return res;
  }

  $(query.split('&')).each(function(idx, param) {
    var kv = param.split('=');
    res[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
  });
  return res;
}

function parseElement(str,data){
  var re = /#{(.*?)}/g;
  var b = str.replace(re, function(word){
    var text = word.replace("#{", "").replace("}", "");
    return data.hasOwnProperty(text) ? data[text] : "";
  });
  return b;
}
function appendData(tmp, data, elementid){
  return $(parseElement(tmp,data)).appendTo($(elementid));
}
function prependData(tmp, data, elementid){
  return $(elementid).prepend($(parseElement(tmp,data)));
}

function diffList(list){
  this.list = list || [];
  $this = this;
  this.insert = function(data){
    if(!$this.list){
      $this.list = [];
    }
    if(typeof(data) == typeof(this.list)){
      data.forEach(function(value){
        if($this.list.indexOf(value) < 0){
          //+
          if($this.afterAdd){
            $this.afterAdd(value);
          }
        }
      });
      $this.list.forEach(function(value){
        if(data.indexOf(value) < 0){
          if($this.afterMinus){
            $this.afterMinus(value);
          }
        }
      });
      this.list = data;
    }else{
      console.log("please insert list");
    }
  },
  this.delete = function(single){
    var index = this.list.indexOf(single);
    if(index> -1){
      this.list.splice(index, 1);
    }
  },
  this.add = function(single){
    var index = this.list.indexOf(single);
    if(index < 0){
      this.list.push(single);
    }
  }
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getLocalStorage(name){
  if(!name) return;
  return localStorage[name];
}

function setLocalStorage(name, value){
  localStorage.setItem(name, value);
}



var Toast = function(config) {
    this.context = config.context == null ? $('body') : config.context; //上下文  
    this.message = config.message; //显示内容  
    this.time = config.time == null ? 3000 : config.time; //持续时间  
    this.left = config.left; //距容器左边的距离  
    this.top = config.top; //距容器上方的距离  
    this.init();
}
var msgEntity;
Toast.prototype = {
    //初始化显示的位置内容等  
    init: function() {
        $("#toastMessage").remove();
        //设置消息体  
        var msgDIV = new Array();
        msgDIV.push('<div id="toastMessage">');
        msgDIV.push('<span>' + this.message + '</span>');
        msgDIV.push('</div>');
        msgEntity = $(msgDIV.join('')).appendTo(this.context);
        //设置消息样式  
        var left = this.left == null ? this.context.width() / 2 - msgEntity.find('span').width() / 2 : this.left;
        var top = this.top == null ? '20px': (this.context.scrollTop() + this.context.height() / 2);
        msgEntity.css({
            position: 'fixed',
            top: "50%",
            'z-index': '3000',
            left: "50%",
            'background-color': 'black',
            color: 'white',
            'font-size': '18px',
            padding: '10px',
            margin: '10px'
        });
        msgEntity.hide();
    },
    //显示动画  
    show: function() {
        msgEntity.fadeIn(this.time / 2);
        msgEntity.fadeOut(this.time / 2);
    }

}

