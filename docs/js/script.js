function scrollTo(e){$([document.documentElement,document.body]).animate({scrollTop:e?$(e).offset().top:0},350)}function pushHistory(e,n){window.history.pushState({selector:n},e,n),scrollTo(n)}function getLocation(e){var n=document.createElement("a");return n.href=e,n}!function(l,s,e,n){"use strict";var t="lightzoom",i={speed:400,imgPadding:10,overlayOpacity:"0.5",viewTitle:!0,isOverlayClickClosing:!1,isWindowClickClosing:!1,isEscClosing:!1};function o(e,n){this.element=e,this.settings=l.extend({},i,n),this._defaults=i,this._name=t,this.init()}l.extend(o.prototype,{init:function(){var n=this;n.build(),l(e).on("click","#lz-close",function(e){e.preventDefault(),n.closeZoom()}),n.settings.isWindowClickClosing?l(e).on("click","#lz-container",function(e){n.closeZoom()}):n.settings.isOverlayClickClosing&&l(e).on("click","#lz-overlay",function(e){n.closeZoom()}),n.settings.isEscClosing&&l(e).keydown(function(e){27===e.which&&n.closeZoom()}),n.resize()},build:function(){var a=this;l(this.element).on("click",function(e){e.preventDefault(),l("body").append('<div id="lz-container">                 <div id="lz-box">                   <div id="lz-overlay"></div>                 </div>                 <div id="loading-center">                   <div id="loading-center-absolute">                     <div class="object" id="object_one"></div>                     <div class="object" id="object_two"></div>                     <div class="object" id="object_three"></div>                  </div>                 </div>               </div>');var n,t=l("#lz-box"),i=l(this).children("picture"),o=l(this).attr("href"),s=i.attr("title");n={opacity:a.settings.overlayOpacity},l("#lz-overlay").css(n),l("#lz-container").fadeIn({display:"block"}),l(new Image).attr("src",o).on("load",function(){t.append('<img src="'+o+'">'),a.showTitle(s),a.setPadding(s),a.setDim(),t.append('<a href="#" id="lz-close" title="Close">Close</a>'),l("#loading-center").remove(),l("#lz-box img").animate({opacity:1},a.settings.speed)})})},showTitle:function(e){this.settings.viewTitle&&e&&l("#lz-box").append("<p>"+e+"</p>")},setPadding:function(e){var n,t=0<this.settings.imgPadding?"#FFF":"none";n={padding:this.settings.viewTitle&&e?this.settings.imgPadding+"px "+this.settings.imgPadding+"px "+(this.settings.imgPadding+30)+"px "+this.settings.imgPadding+"px":this.settings.imgPadding,backgroundColor:t},l("#lz-box img").css(n)},setDim:function(){var e,n,t,i=s.innerWidth?s.innerWidth:l(s).width(),o=s.innerHeight?s.innerHeight:l(s).height();n=o<i?(e="80%","95%"):(e="100%","80%"),"onorientationchange"in s&&s.addEventListener("orientationchange",function(){0===s.orientation?(e="80%",n="100%"):90!==s.orientation&&-90!==s.orientation||(e="100%",n="80%")},!1),t={maxWidth:e,maxHeight:n},l("#lz-box img").css(t)},closeZoom:function(){var e=this;l("#lz-container").fadeOut(e.settings.speed,function(){e.destroy()})},resize:function(){var e=this;l(s).resize(function(){e.setDim()}).resize()},destroy:function(){l("#lz-container").remove()}}),l.fn[t]=function(e){return this.each(function(){l.data(this,"plugin_"+t)||l.data(this,"plugin_"+t,new o(this,e))})}}(jQuery,window,document),function(e,n,t){function s(e){var n=o.className,t=f._config.classPrefix||"";if(d&&(n=n.baseVal),f._config.enableJSClass){var i=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(i,"$1"+t+"js$2")}f._config.enableClasses&&(n+=" "+t+e.join(" "+t),d?o.className.baseVal=n:o.className=n)}function l(e,n){return typeof e===n}function a(e,n){if("object"==typeof e)for(var t in e)c(e,t)&&a(t,e[t]);else{var i=(e=e.toLowerCase()).split("."),o=f[i[0]];if(2==i.length&&(o=o[i[1]]),void 0!==o)return f;n="function"==typeof n?n():n,1==i.length?f[i[0]]=n:(!f[i[0]]||f[i[0]]instanceof Boolean||(f[i[0]]=new Boolean(f[i[0]])),f[i[0]][i[1]]=n),s([(n&&0!=n?"":"no-")+i.join("-")]),f._trigger(e,n)}return f}var c,i,r=[],o=n.documentElement,d="svg"===o.nodeName.toLowerCase(),A=[],u={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){A.push({name:e,fn:n,options:t})},addAsyncTest:function(e){A.push({name:null,fn:e})}},f=function(){};f.prototype=u,f=new f,c=l(i={}.hasOwnProperty,"undefined")||l(i.call,"undefined")?function(e,n){return n in e&&l(e.constructor.prototype[n],"undefined")}:function(e,n){return i.call(e,n)},u._l={},u.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),f.hasOwnProperty(e)&&setTimeout(function(){f._trigger(e,f[e])},0)},u._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e;for(e=0;e<t.length;e++)(0,t[e])(n)},0),delete this._l[e]}},f._q.push(function(){u.addTest=a}),f.addAsyncTest(function(){function t(t,e,i){function n(e){var n=!(!e||"load"!==e.type)&&1==o.width;a(t,"webp"===t&&n?new Boolean(n):n),i&&i(e)}var o=new Image;o.onerror=n,o.onload=n,o.src=e}var i=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],e=i.shift();t(e.name,e.uri,function(e){if(e&&"load"===e.type)for(var n=0;n<i.length;n++)t(i[n].name,i[n].uri)})}),function(){var e,n,t,i,o,s;for(var a in A)if(A.hasOwnProperty(a)){if(e=[],(n=A[a]).name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(i=l(n.fn,"function")?n.fn():n.fn,o=0;o<e.length;o++)1===(s=e[o].split(".")).length?f[s[0]]=i:(!f[s[0]]||f[s[0]]instanceof Boolean||(f[s[0]]=new Boolean(f[s[0]])),f[s[0]][s[1]]=i),r.push((i?"":"no-")+s.join("-"))}}(),s(r),delete u.addTest,delete u.addAsyncTest;for(var g=0;g<f._q.length;g++)f._q[g]();e.Modernizr=f}(window,document),function(){var e=document.querySelector(".menu--js");document.querySelector(".menu__btn--js").addEventListener("click",function(){e.classList.contains("menu--closed")?e.classList.remove("menu--closed"):e.classList.add("menu--closed")})}(),function(){var n=document.querySelector(".up"),t=document.querySelector(".main-js").getBoundingClientRect().top;window.addEventListener("scroll",function(){var e=window.pageYOffset+1;t<e?n.classList.remove("up--none"):n.classList.add("up--none")})}(),window.history.replaceState({initial:!0},""),$(".up-js-btn").on("click",function(e){e.preventDefault(),window.history.pushState({initial:!0},""),scrollTo(!1)}),$(".menu a, .greeting a").on("click",function(e){e.preventDefault(),pushHistory($(this).text(),getLocation(this.href).hash)}),window.onpopstate=function(e){e.state&&e.state.selector?scrollTo(e.state.selector):e.state&&e.state.initial&&scrollTo(!1)},$(document).ready(function(){$(".lightzoom").lightzoom({speed:350,viewTitle:!0,isOverlayClickClosing:!0,isEscClosing:!0})});