(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{313:function(t,e,r){"use strict";r.d(e,"c",(function(){return o})),r.d(e,"a",(function(){return n})),r.d(e,"b",(function(){return l}));r(15),r(16),r(4);function o(t,g,b){t/=255,g/=255,b/=255;var e,s,r=Math.max(t,g,b),o=Math.min(t,g,b),n=(r+o)/2;if(r===o)e=s=0;else{var l=r-o;switch(s=n>.5?l/(2-r-o):l/(r+o),r){case t:e=(g-b)/l+(g<b?6:0);break;case g:e=(b-t)/l+2;break;case b:e=(t-g)/l+4}e*=60}return[e,100*s,100*n]}function n(t,s,e){var r,g,b;if(t/=360,e/=100,0===(s/=100))r=g=b=e;else{var o=function(p,q,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?p+6*(q-p)*t:t<.5?q:t<2/3?p+(q-p)*(2/3-t)*6:p},q=e<.5?e*(1+s):e+s-e*s,p=2*e-q;r=o(p,q,t+1/3),g=o(p,q,t),b=o(p,q,t-1/3)}return[Math.round(255*r),Math.round(255*g),Math.round(255*b)]}function l(t){for(var e,r="#",i=0;i<t.length;i++)r+=(e=t[i].toString(16)).length<2?"0"+e:e;return r}},316:function(t,e,r){"use strict";r.d(e,"a",(function(){return h}));r(63);var o=r(25),n=(r(4),r(21)),l=r(36),c=r(313),h=function(){function t(canvas,e){Object(n.a)(this,t),this.canvas=canvas,this.ctx=this.canvas.getContext("2d"),this.pixelRatio=window.devicePixelRatio||1,this.canvas.width=this.pixelRatio*parseInt(getComputedStyle(this.canvas).width),this.canvas.height=this.pixelRatio*parseInt(getComputedStyle(this.canvas).height),this.oriWidth=this.canvas.width,this.oriHeight=this.canvas.height,this.colorsInfo=[],this.processInfo={colors:0,censusTime:0,kmeansIteration:0,kmeansTime:0,top5Count:0},this.mainColor=[],this.averageColor=[],this.clusterRes=[],this.score="",this.K=e||6}return Object(l.a)(t,[{key:"readFile",value:function(t){var e=this;if(t instanceof File){var r=new FileReader;return r.readAsDataURL(t),new Promise((function(t){r.onload=function(){var r=Object(o.a)(regeneratorRuntime.mark((function r(o){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.drawToCanvas(o.target.result);case 2:e.censusImage(),t();case 4:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}()}))}var n=new XMLHttpRequest;return new Promise((function(r){n.onload=function(){var n=Object(o.a)(regeneratorRuntime.mark((function o(n){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t=URL.createObjectURL(n.target.response),o.next=3,e.drawToCanvas(t);case 3:e.censusImage(),r();case 5:case"end":return o.stop()}}),o)})));return function(t){return n.apply(this,arguments)}}(),n.open("GET",t,!0),n.responseType="blob",n.send()}))}},{key:"drawToCanvas",value:function(t){var e=this,r=this.pixelRatio,canvas=this.canvas,o=this.ctx,img=new Image;return img.src=t,img.crossOrigin="anonymous",new Promise((function(t){img.onload=function(){o.clearRect(0,0,canvas.width,canvas.height);var n=0,l=0;img.width<img.height?(n=100*r,e.isHorizontal=!1):(l=100*r,e.isHorizontal=!0);var c=img.width>(canvas.width-n)/r?(canvas.width-n)/r:img.width,h=img.height>(canvas.height-l)/r?(canvas.height-l)/r:img.height,d=c/img.width<h/img.height?c/img.width:h/img.height;c=img.width*d,h=img.height*d,canvas.style.width=c+n/r+"px",canvas.style.height=h+l/r+"px",canvas.width=c*r+n,canvas.height=h*r+l,o.drawImage(img,0,0,img.width,img.height,0,0,c*r,h*r),t()}}))}},{key:"censusImage",value:function(){var canvas=this.canvas,t=this.ctx,e=this.pixelRatio,r=(new Date).getTime(),o=null;if(!(o=this.isHorizontal?t.getImageData(0,0,canvas.width,canvas.height-100*e):t.getImageData(0,0,canvas.width-100*e,canvas.height)))return"Can not read image data, maybe because of cross-domain limitation.";var n,g,b,l=[],h=0,d=o.height*o.width<36e4?1:2,f=Math.round(.1066*this.K*this.K-2.7463*this.K+17.2795);f=f<4?4:f;var v={colors:0,censusTime:0,kmeansIteration:0,kmeansTime:0,top5Count:0};v.colorStep=f;for(var C,m,w=[],x=1;x<o.height-1;){for(var col=1;col<o.width-1;)if(n=o.data[x*o.width*4+4*col],g=o.data[x*o.width*4+4*col+1],b=o.data[x*o.width*4+4*col+2],(C=Object(c.c)(n,g,b))[2]>97||C[2]>95&&C[1]<30)col+=d;else if(C[2]<3||C[2]<5&&C[1]<30)col+=d;else{h++,m=1e4*Math.floor(C[0]/10)+100*Math.floor(C[1]/5)+Math.floor(C[2]/5);var y=l.indexOf(m);y<0?(l.push(m),w.push({key:m,fre:1,r:n,g:g,b:b,h:C[0],s:C[1],l:C[2],category:-1})):w[y].fre++,col+=d}x+=d}v.pixelCount=h,v.censusTime=(new Date).getTime()-r,v.colors=w.length,r=(new Date).getTime(),w.sort((function(pre,t){return t.fre-pre.fre}));var k=w.length;w=w.filter((function(t){return!(t.fre<5-d&&k>400)})),this.mainColor=[w[0],w[1],w[2]];var _=this.chooseSeedColors(w,this.K);this.clusterRes=this.kMC(w,_,100),this.clusterColors=this.clusterRes[0],this.clusterColors=this.clusterColors.map((function(t){return Object(c.b)(Object(c.a)(t.h,t.s,t.l))}));var M=0,R=0,B=0,I=0;for(k=w.length;k--;)M+=w[k].r*w[k].fre,R+=w[k].g*w[k].fre,B+=w[k].b*w[k].fre,I+=w[k].fre;var j=Object(c.c)(Math.floor(M/I),Math.floor(R/I),Math.floor(B/I));this.averageColor={h:j[0],s:j[1],l:j[2]},v.kmeansTime=+new Date-r,v.kmeansIteration=this.clusterRes[1],this.info=this.countColor(w),v.top5Count=100*this.info.top5Count,this.colorsInfo=w,this.processInfo=v}},{key:"chooseSeedColors",value:function(t,e){for(var r=[],o=t.length,i=0;i<o;i++){var n=r.length,l=t[i];if(i){for(var c=0;c<n;c++){if(Math.abs(r[c].h-l.h)+Math.abs(r[c].s-l.s)+Math.abs(r[c].l-l.l)<45)break}if(c===n&&(l.category=r.length,r.push({h:l.h,s:l.s,l:l.l,category:l.category,fre:l.fre})),r.length>=e)break}else l.category=0,r.push({h:l.h,s:l.s,l:l.l,category:l.category,fre:l.fre})}return r}},{key:"kMC",value:function(t,e,r){for(var o=0;o++<r;){e=e.filter((function(t){return t}));for(var n=t.length,l=n/8^0,h=n%8;h--;)this.classifyColor(t[h],e);for(;l--;)this.classifyColor(t[--n],e),this.classifyColor(t[--n],e),this.classifyColor(t[--n],e),this.classifyColor(t[--n],e),this.classifyColor(t[--n],e),this.classifyColor(t[--n],e),this.classifyColor(t[--n],e),this.classifyColor(t[--n],e);n=t.length;for(var d=[],f=void 0;n--;)d[f=t[n].category]?d[f].freCount+=t[n].fre:(d[f]={},d[f].h=0,d[f].s=0,d[f].l=0,d[f].freCount=t[n].fre);for(n=t.length;n--;)d[f=t[n].category].h+=t[n].h*t[n].fre/d[f].freCount,d[f].s+=t[n].s*t[n].fre/d[f].freCount,d[f].l+=t[n].l*t[n].fre/d[f].freCount;var v=d.every((function(t,r){return Math.abs(t.h-e[r].h)<.5&&Math.abs(t.s-e[r].s)<.5&&Math.abs(t.l-e[r].l)<.5}));if(e=d.map((function(t,e){return{h:t.h,s:t.s,l:t.l,category:e,fre:t.freCount}})),v)break}return e.sort((function(pre,t){var e=Object(c.a)(pre.h,pre.s,pre.l);e=e[0]+e[1]+e[2];var r=Object(c.a)(t.h,t.s,t.l);return(r=r[0]+r[1]+r[2])-e})),[e,o]}},{key:"classifyColor",value:function(t,e){for(var r,o=e.length,n=1e4;o--;){var l=Math.abs(e[o].h-t.h)+Math.abs(e[o].s-t.s)+Math.abs(e[o].l-t.l);l<n&&(n=l,r=o)}t.category=r}},{key:"countColor",value:function(t){for(var e,r={top50Count:0,top20Count:0,top10Count:0,top5Count:0},o=0,n=0,l=0,c=0,h=0,d=t.length;d--;)o+=(e=t[d]).fre,d<50&&(n+=e.fre,d<20&&(l+=e.fre,d<10&&(c+=e.fre,d<5&&(h+=e.fre))));return d=t.length,r.top50Count=n/o,r.top20Count=l/o,r.top10Count=c/o,r.top5Count=h/o,r}},{key:"drawPalette",value:function(){var t=this.pixelRatio,canvas=this.canvas,e=this.ctx,r=this.isHorizontal?canvas.width:canvas.height,o=r*(this.K<10?.02:.01),p=(r-(this.K-1)*o)/this.K,n=this.clusterColors;if(0!==n.length){this.isHorizontal?e.clearRect(0,canvas.height-90*t,canvas.width,90*t):e.clearRect(canvas.width-90*t,0,90*t,canvas.height);for(var i=0;i<this.K;i++)e.fillStyle=n[i],this.isHorizontal?e.fillRect((p+o)*i,canvas.height-90*t,p,90*t):e.fillRect(canvas.width-90*t,(p+o)*i,90*t,p)}}},{key:"clearCanvas",value:function(){this.canvas.width=this.oriWidth,this.canvas.height=this.oriHeight}}]),t}()},318:function(t,e,r){var content=r(346);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(12).default)("1d4aeb3b",content,!0,{sourceMap:!1})},319:function(t,e,r){var content=r(366);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(12).default)("f551190a",content,!0,{sourceMap:!1})},320:function(t,e,r){var content=r(370);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(12).default)("60078d1f",content,!0,{sourceMap:!1})},321:function(t,e,r){var content=r(373);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(12).default)("0768e775",content,!0,{sourceMap:!1})},345:function(t,e,r){"use strict";var o=r(318);r.n(o).a},346:function(t,e,r){(e=r(11)(!1)).push([t.i,'.showcase{width:100%;max-width:1024px;height:460px;background-color:transparent}.showcase-wrap{position:relative;overflow:hidden;z-index:0;text-align:center;line-height:0}.showcase-wrap.censused{z-index:0}.showcase-wrap.censused:after{display:none;-webkit-animation:none;animation:none}.showcase-wrap:after{position:absolute;top:-100%;right:-100%;bottom:-100%;left:-100%;background:-webkit-linear-gradient(45deg,#fcc,#cfc,#ccf);background-position:0 0;background-size:100% 100%;content:"";transform:translate(30%,30%);-webkit-animation:bg 8s linear infinite alternate;animation:bg 8s linear infinite alternate;will-change:transform;z-index:-1}@-webkit-keyframes bg{33%{transform:translate(-30%,30%)}66%{transform:translate(-30%,-30%)}to{transform:translate(30%,-30%)}}@keyframes bg{33%{transform:translate(-30%,30%)}66%{transform:translate(-30%,-30%)}to{transform:translate(30%,-30%)}}',""]),t.exports=e},365:function(t,e,r){"use strict";var o=r(319);r.n(o).a},366:function(t,e,r){(e=r(11)(!1)).push([t.i,".color-box{display:inline-block;width:1rem;height:1rem;border-radius:2px;box-shadow:1px 1px 2px rgba(0,0,0,.3);margin-left:5px;margin-right:2px}.color-bar .color-wrap .color{height:80px;box-shadow:0 0 20px rgba(0,0,0,.4)}",""]),t.exports=e},369:function(t,e,r){"use strict";var o=r(320);r.n(o).a},370:function(t,e,r){(e=r(11)(!1)).push([t.i,".color-card[data-v-46316873]{min-height:100px}.color-text[data-v-46316873]{position:absolute;bottom:0;background-color:hsla(0,0%,100%,.9);width:100%;color:#000}",""]),t.exports=e},372:function(t,e,r){"use strict";var o=r(321);r.n(o).a},373:function(t,e,r){(e=r(11)(!1)).push([t.i,"#bubble-chart[data-v-a28a2350]{width:100%;max-width:600px;height:400px}",""]),t.exports=e},383:function(t,e,r){"use strict";r.r(e);var o=r(313),n=(r(63),r(25)),l=r(316),c={data:function(){return{colorDust:{},bgColor:"",file:null,K:6,snackbar:!1,message:""}},mounted:function(){var canvas=this.$refs.canvasShowcase;this.colorDust=new l.a(canvas)},methods:{censusImage:function(){this.file&&(this.colorDust.K=this.K,this.colorDust.censusImage(),this.colorDust.drawPalette())},handleClearClick:function(){this.colorDust.clearCanvas(),this.$store.dispatch("resetApp")},startProcess:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,o,n,l,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.file){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,t.colorDust.readFile(t.file);case 4:t.message=e.sent,t.message&&(t.snackbar=!0),r=t.colorDust.colorsInfo,o=t.colorDust.mainColor,n=r[0].r+","+r[0].g+","+r[0].b,t.bgColor="rgba("+n+",0.3)",l="rgba("+n+",0.8)",c="rgba("+o[2].r+","+o[2].g+","+o[2].b+",1)",t.$store.commit("setColorsInfo",r),t.$store.commit("setClusterColors",t.colorDust.clusterColors),t.$store.commit("setMainColor",o),t.$store.commit("setAverageColor",t.colorDust.averageColor),t.$store.commit("setProcessInfo",t.colorDust.processInfo),t.updateLoopColors(t.colorDust.mainColor,t.colorDust.clusterRes[0]),t.$store.commit("theme/setPrimaryColor",l),t.$store.commit("theme/setAccentColor",c),t.colorDust.drawPalette();case 21:case"end":return e.stop()}}),e)})))()},updateLoopColors:function(t,e){var r=1.1*t[0].r<255?Math.floor(1.1*t[0].r):255,n=1.1*t[0].g<255?Math.floor(1.1*t[0].g):255,l=1.1*t[0].b<255?Math.floor(1.1*t[0].b):255,c=1.1*r*1.1<255?Math.floor(1.1*r*1.1):255,h=1.1*n*1.1<255?Math.floor(1.1*n*1.1):255,d=1.1*l*1.1<255?Math.floor(1.1*l*1.1):255,f=Math.floor(e.length/3),v=Object(o.a)(e[0].h,e[0].s,e[0].l),C=Object(o.a)(e[f].h,e[f].s,e[f].l),m=Object(o.a)(e[2*f].h,e[2*f].s,e[2*f].l),w=[["rgb("+r+","+n+","+l+")","rgb("+c+","+h+","+d+")"],["rgba("+v[0]+","+v[1]+","+v[2]+",0.4)","rgba("+v[0]+","+v[1]+","+v[2]+",0.7)"],["rgba("+C[0]+","+C[1]+","+C[2]+",0.4)","rgba("+C[0]+","+C[1]+","+C[2]+",0.7)"],["rgba("+m[0]+","+m[1]+","+m[2]+",0.4)","rgba("+m[0]+","+m[1]+","+m[2]+",0.7)"]];this.$store.commit("setLoopColors",w)}}},h=(r(345),r(62)),d=r(87),f=r.n(d),v=r(387),C=r(138),m=r(325),w=r(385),x=r(380),y=r(381),component=Object(h.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-card",{staticClass:"showcase-wrap",class:{censused:t.bgColor},style:{backgroundColor:t.bgColor}},[r("canvas",{ref:"canvasShowcase",staticClass:"showcase"})]),t._v(" "),r("v-alert",{staticClass:"mt-4",attrs:{border:"left"}},[r("v-slider",{staticClass:"mt-5",attrs:{min:"3",max:"20","thumb-label":"always","prepend-icon":"color_lens",dense:"",hint:"How many colors?"},on:{end:t.censusImage},model:{value:t.K,callback:function(e){t.K=e},expression:"K"}}),t._v(" "),r("v-file-input",{attrs:{accept:"image/*",placeholder:"Upload image to parse.","prepend-icon":"photo","small-chips":"","show-size":"",outlined:"",dense:"","hide-details":""},on:{change:t.startProcess,"click:clear":t.handleClearClick},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}})],1),t._v(" "),r("v-snackbar",{model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n    "+t._s(t.message)+"\n    "),r("v-btn",{attrs:{text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\n      Close\n    ")])],1)],1)}),[],!1,null,null,null),k=component.exports;f()(component,{VAlert:v.a,VBtn:C.a,VCard:m.a,VFileInput:w.a,VSlider:x.a,VSnackbar:y.a});var _={props:{label:{type:String,default:"Color"},colorStart:{type:String,default:"#999999"},colorMiddle:{type:String,default:"#666666"},colorEnd:{type:String,default:"#333333"}},computed:{gradient:function(){return{background:"linear-gradient(to right,"+this.colorStart+","+this.colorMiddle+","+this.colorEnd+")"}}}},M=(r(365),r(382)),R=Object(h.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"color-bar"},[r("v-alert",{attrs:{border:"left","colored-border":"",elevation:"2"}},[r("h3",{staticClass:"title"},[r("span",{staticClass:"label text-capitalize"},[t._v(t._s(t.label))]),t._v(" "),r("span",{staticClass:"value font-weight-light text-uppercase ml-2"},[r("span",[r("i",{staticClass:"color-box",style:{backgroundColor:t.colorStart}}),t._v(" "),r("span",[t._v(t._s(t.colorStart))])]),t._v(" "),r("span",{style:{color:t.colorMiddle}},[r("i",{staticClass:"color-box",style:{backgroundColor:t.colorMiddle}}),r("span",[t._v(t._s(t.colorMiddle))])]),t._v(" "),r("span",{style:{color:t.colorEnd}},[r("i",{staticClass:"color-box",style:{backgroundColor:t.colorEnd}}),t._v(" "),r("span",[t._v(t._s(t.colorEnd))])])]),t._v(" "),r("v-divider",{staticClass:"mb-2"})],1),t._v(" "),r("div",{staticClass:"color-wrap"},[r("v-card",{style:t.gradient,attrs:{height:"80",ripple:""}})],1)])],1)}),[],!1,null,null,null),B=R.exports;f()(R,{VAlert:v.a,VCard:m.a,VDivider:M.a});var I=Object(h.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"info-wrap"},[r("v-alert",{attrs:{border:"left","colored-border":"",color:"success"}},[t._v("\n    Found about\n    "),r("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.$store.state.processInfo.colors))]),t._v("\n    colors in your image.\n  ")]),t._v(" "),r("v-alert",{attrs:{border:"left","colored-border":"",color:"info"}},[t._v("\n    Color Census Time is\n    "),r("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.$store.state.processInfo.censusTime))]),t._v("\n    ms.\n  ")]),t._v(" "),r("v-alert",{attrs:{border:"left","colored-border":"",color:"warning"}},[t._v("\n    K-Means iterated\n    "),r("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.$store.state.processInfo.kmeansIteration))]),t._v("\n    times with cost of\n    "),r("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.$store.state.processInfo.kmeansTime))]),t._v("\n    ms.\n  ")]),t._v(" "),r("v-alert",{attrs:{border:"left","colored-border":"",color:"error"}},[t._v("\n    The top5 colors account for\n    "),r("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.$store.state.processInfo.top5Count.toFixed(2))+"%")]),t._v("\n    of total.\n  ")])],1)}),[],!1,null,null,null),j=I.exports;f()(I,{VAlert:v.a});var O={props:{colors:{type:Array,default:function(){return[]}}},data:function(){return{snackbar:!1,curColor:""}},methods:{copyColorHex:function(t){var e=t.target.querySelector(".color-text")?t.target.querySelector(".color-text").textContent:t.target.textContent;navigator.clipboard.writeText(e.toUpperCase()),this.snackbar=!0,this.curColor=e.toUpperCase()}}},$=(r(369),r(312)),D=r(377),S=r(378),T=Object(h.a)(O,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-alert",{attrs:{border:"left","colored-border":"",elevation:"2"}},[r("h3",{staticClass:"title"},[t._v("Clustered Colors By K-Means")]),t._v(" "),r("v-divider",{staticClass:"mb-2"}),t._v(" "),r("v-row",{staticClass:"text-center justify-center",attrs:{dense:""}},t._l(t.colors,(function(e){return r("v-col",{key:e,attrs:{cols:"3",md:"1"}},[r("v-card",{staticClass:"color-card",attrs:{ripple:"",hover:"",color:e},on:{click:t.copyColorHex}},[r("v-card-title"),t._v(" "),r("h4",{staticClass:"pa-0 color-text subtitle-1 text-uppercase"},[t._v(t._s(e))])],1)],1)})),1),t._v(" "),r("v-snackbar",{attrs:{color:"success",timeout:1e3},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[r("div",{staticClass:"text-center",staticStyle:{width:"100%"}},[t._v("\n      Copy Hex Color "+t._s(t.curColor)+" successfully!\n    ")])])],1)}),[],!1,null,"46316873",null),V=T.exports;f()(T,{VAlert:v.a,VCard:m.a,VCardTitle:$.b,VCol:D.a,VDivider:M.a,VRow:S.a,VSnackbar:y.a});r(191),r(371);var P={props:{colors:{type:Array,default:function(){return[]}}},data:function(){return{selectColor:"#",bubbles:[],snackbar:!1}},watch:{colors:function(){if(this.colors.length>0){var t=this.processColors(this.colors);this.renderBubble(t)}else{var canvas=this.$refs.bubbleChart;this.ctx.clearRect(0,0,canvas.width,canvas.height)}}},mounted:function(){var canvas=this.$refs.bubbleChart,t=window.devicePixelRatio||1;this.pixelRatio=t,canvas.width=t*parseInt(getComputedStyle(canvas).width),canvas.height=t*parseInt(getComputedStyle(canvas).height),this.oriWidth=canvas.width,this.oriHeight=canvas.height,this.ctx=canvas.getContext("2d"),this.circleR=Math.min(canvas.width/2-15*t,canvas.height/2-15*t),this.iterations=2,this.time=400,this.density=.1,this.initBubbles(this.createDataset()),this.renderBubble(this.bubbles)},methods:{copyColorHex:function(){if(this.$refs.selectColor){var t=this.$refs.selectColor.textContent;navigator.clipboard.writeText(t.toUpperCase()),this.snackbar=!0,this.curColor=t.toUpperCase()}},initBubbles:function(t){var e=this.pixelRatio,canvas=this.$refs.bubbleChart,r=canvas.width,o=canvas.height,n=this.circleR,l=Math.log2(t[0].weight),c=n*this.density;this.K=c,this.bubbles=t.map((function(t){var h=r/2-n+2*Math.random()*n,d=o/2-n+2*Math.random()*n,f=Math.sqrt(Math.pow(r/2-h,2)+Math.pow(o/2-d,2)),v=c*(Math.log(t.weight)/l);return f>n-(v=(v=v<1.5*e?1.5*e:v)>c?c:v)&&(h+=(r/2-h)*(f-n+v)/f,d+=(o/2-d)*(f-n+v)/f),{weight:t.weight,color:t.color,radius:v,x:h,y:d}})),this.maxRadius=n*this.density,this.computePosition()},handleCanvasClick:function(t){for(var canvas=this.$refs.bubbleChart,e=this.windowTocanvas(canvas,t.clientX,t.clientY),r=canvas.width/2,o=canvas.height/2,n=e.x*this.pixelRatio,l=e.y*this.pixelRatio,c="",h=Math.sqrt((n-r)*(n-r)+(l-o)*(l-o))<this.circleR,d=this.bubbles,f=d.length;f--;){var v=d[f];if(Math.sqrt((n-v.x)*(n-v.x)+(l-v.y)*(l-v.y))<v.radius){c=v.color;break}}if(h)this.selectColor=c||"#";else if(this.colors.length){var C=this.processColors(this.colors);this.renderBubble(C)}else this.initBubbles(this.createDataset()),this.renderBubble(this.bubbles)},processColors:function(t){for(var e,r=[],n=t.length,l=n<360?1:Math.ceil(n/360),i=0;i<n;)e=t[i],r.push({weight:e.fre,color:Object(o.b)(Object(o.a)(e.h,e.s,e.l))}),i+=l;return r},renderBubble:function(t){t&&t.length>0&&this.initBubbles(t),this.beginTime=+new Date,this.speed=this.maxRadius/this.time,this.drawBubbles()},computePosition:function(){for(var t=this.iterations,e=0,r=this.bubbles,o=r.length;e<t;){e++;for(var n=o;n--;)this.traverseBubbles(r[n])}},traverseBubbles:function(t){for(var e=this.bubbles,r=e.length,o=r/8^0,n=r%8;n--;)this.divideBubbles(t,e[n]);for(;o--;)this.divideBubbles(t,e[--r]),this.divideBubbles(t,e[--r]),this.divideBubbles(t,e[--r]),this.divideBubbles(t,e[--r]),this.divideBubbles(t,e[--r]),this.divideBubbles(t,e[--r]),this.divideBubbles(t,e[--r]),this.divideBubbles(t,e[--r])},divideBubbles:function(t,e){if(!(t.color===e.color&&t.radius===e.radius&&Math.abs(t.x-e.x)<.001)){var r=this.collisionCheck(t,e);if(!(r>0)){r=Math.abs(r);var o=Math.atan(Math.abs(t.y-e.y)/Math.abs(t.x-e.x)),n=r*Math.cos(o)+.2,l=r*Math.sin(o)+.2;e.x>=t.x&&e.y>=t.y?(e.x+=n,e.y+=l):e.x<=t.x&&e.y>=t.y?(e.x-=n,e.y+=l):e.x<=t.x&&e.y<=t.y?(e.x-=n,e.y-=l):e.x>=t.x&&e.y<=t.y&&(e.x+=n,e.y-=l)}}},collisionCheck:function(t,e){var r=Math.abs(t.x-e.x),o=Math.abs(t.y-e.y),n=t.radius+e.radius;return Math.sqrt(r*r+o*o)-n},drawBubbles:function(){var t=+new Date,e=(t-this.beginTime)*this.speed,canvas=this.$refs.bubbleChart,r=this.ctx,o=this.bubbles,n=o.length;r.clearRect(0,0,canvas.width,canvas.height);for(var l=n/8^0,c=n%8;c--;)this.drawBubble(o[c],e);for(;l--;)this.drawBubble(o[--n],e),this.drawBubble(o[--n],e),this.drawBubble(o[--n],e),this.drawBubble(o[--n],e),this.drawBubble(o[--n],e),this.drawBubble(o[--n],e),this.drawBubble(o[--n],e),this.drawBubble(o[--n],e);t<this.beginTime+this.time?window.requestAnimationFrame(this.drawBubbles):0!==this.speed&&(this.speed=0,window.requestAnimationFrame(this.drawBubbles))},drawBubble:function(t,e){var r=this.ctx,o=t.radius;if(r.fillStyle=t.color,r.beginPath(),e<o&&0!==this.speed)r.arc(t.x,t.y,e,0,2*Math.PI);else{var n=0===this.speed?0:(e-o)/this.maxRadius,l=2*Math.exp(-8*n)*Math.sin(4*Math.PI*n);r.arc(t.x,t.y,o+l,0,2*Math.PI)}r.fill()},windowTocanvas:function(canvas,t,e){var r=canvas.getBoundingClientRect();return{x:t-r.left,y:e-r.top}},createDataset:function(){for(var t=[],i=0;i<100;i++)t.push({weight:Math.floor(100*Math.random()),color:"rgb("+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+")",opacity:Math.random()});return t}}},K=(r(372),r(379)),H=r(124),A=Object(h.a)(P,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"bubble-chart"},[r("v-alert",{attrs:{border:"left","colored-border":"",elevation:"2"}},[r("h2",{staticClass:"headline font-weight-light ml-2"},[t._v("\n      More Colors In Bubble Chart\n    ")]),t._v(" "),r("v-divider",{staticClass:"my-2"}),t._v(" "),r("v-card",{staticClass:"text-center",attrs:{elevation:0}},[r("canvas",{ref:"bubbleChart",attrs:{id:"bubble-chart"},on:{click:t.handleCanvasClick}}),t._v(" "),r("v-card-actions",{staticClass:"justify-center"},[r("v-chip",{staticClass:"text-uppercase",attrs:{color:"success"},on:{click:t.copyColorHex}},[r("v-icon",{attrs:{left:""}},[t._v("colorize")]),t._v(" "),r("span",{ref:"selectColor"},[t._v(t._s(t.selectColor))])],1)],1)],1)],1),t._v(" "),r("v-snackbar",{attrs:{color:"success",timeout:1e3,top:""},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[r("div",{staticClass:"text-center",staticStyle:{width:"100%"}},[t._v("\n      Copy Color "+t._s(t.selectColor)+" successfully!\n    ")])])],1)}),[],!1,null,"a28a2350",null),z=A.exports;f()(A,{VAlert:v.a,VCard:m.a,VCardActions:$.a,VChip:K.a,VDivider:M.a,VIcon:H.a,VSnackbar:y.a});var E={components:{ImageShowcase:k,ColorBar:B,ImageInfo:j,ColorCard:V,CanvasBubbleChart:z},computed:{mcProps:function(){return this.colorToProps(this.$store.state.mainColor)},acProps:function(){return this.colorToProps(this.$store.state.averageColor)}},methods:{colorToProps:function(t){if(!t||0===t.length)return{};var e="",r="",n="";return 3===t.length?(e=Object(o.b)(Object(o.a)(t[0].h,t[0].s,t[0].l)),r=Object(o.b)(Object(o.a)(t[1].h,t[1].s,t[1].l)),n=Object(o.b)(Object(o.a)(t[2].h,t[2].s,t[2].l))):(r=Object(o.b)(Object(o.a)(t.h,t.s,t.l)),e=Object(o.b)(Object(o.a)(t.h-30<0?0:t.h-30,t.s-20<0?0:t.s-20,t.l+20>100?100:t.l+20)),n=Object(o.b)(Object(o.a)(t.h+30>360?360:t.h+30,t.s+20>100?100:t.s+20,t.l-20<0?0:t.l-20))),{colorStart:e,colorMiddle:r,colorEnd:n}}},head:function(){return{title:"Welcome"}}},F=Object(h.a)(E,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-row",{attrs:{"no-gutters":""}},[r("v-col",{attrs:{cols:"12"}},[r("image-showcase")],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("color-card",{attrs:{colors:t.$store.state.clusterColors}})],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("color-bar",t._b({attrs:{label:"main color"}},"color-bar",t.mcProps,!1))],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("color-bar",t._b({attrs:{label:"average color"}},"color-bar",t.acProps,!1))],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("image-info")],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("canvas-bubble-chart",{attrs:{colors:t.$store.state.colorsInfo}})],1)],1)}),[],!1,null,null,null);e.default=F.exports;f()(F,{VCol:D.a,VRow:S.a})}}]);