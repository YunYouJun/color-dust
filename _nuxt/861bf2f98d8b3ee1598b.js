(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{313:function(t,e,r){"use strict";r.d(e,"c",(function(){return o})),r.d(e,"a",(function(){return n})),r.d(e,"b",(function(){return h}));r(15),r(16),r(4);function o(t,g,b){t/=255,g/=255,b/=255;var e,s,r=Math.max(t,g,b),o=Math.min(t,g,b),n=(r+o)/2;if(r===o)e=s=0;else{var h=r-o;switch(s=n>.5?h/(2-r-o):h/(r+o),r){case t:e=(g-b)/h+(g<b?6:0);break;case g:e=(b-t)/h+2;break;case b:e=(t-g)/h+4}e*=60}return[e,100*s,100*n]}function n(t,s,e){var r,g,b;if(t/=360,e/=100,0===(s/=100))r=g=b=e;else{var o=function(p,q,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?p+6*(q-p)*t:t<.5?q:t<2/3?p+(q-p)*(2/3-t)*6:p},q=e<.5?e*(1+s):e+s-e*s,p=2*e-q;r=o(p,q,t+1/3),g=o(p,q,t),b=o(p,q,t-1/3)}return[Math.round(255*r),Math.round(255*g),Math.round(255*b)]}function h(t){for(var e,r="#",i=0;i<t.length;i++)r+=(e=t[i].toString(16)).length<2?"0"+e:e;return r}},316:function(t,e,r){"use strict";r.d(e,"a",(function(){return l}));r(63);var o=r(25),n=(r(4),r(21)),h=r(36),c=r(313),l=function(){function t(canvas,e){Object(n.a)(this,t),this.canvas=canvas,this.ctx=this.canvas.getContext("2d"),this.pixelRatio=window.devicePixelRatio||1,this.canvas.width=this.pixelRatio*parseInt(getComputedStyle(this.canvas).width),this.canvas.height=this.pixelRatio*parseInt(getComputedStyle(this.canvas).height),this.oriWidth=this.canvas.width,this.oriHeight=this.canvas.height,this.colorsInfo=[],this.processInfo={colors:0,censusTime:0,kmeansIteration:0,kmeansTime:0,top5Count:0},this.mainColor=[],this.averageColor=[],this.clusterRes=[],this.score="",this.K=e||6}return Object(h.a)(t,[{key:"readFile",value:function(t){var e=this;if(t instanceof File){var r=new FileReader;return r.readAsDataURL(t),new Promise((function(t){r.onload=function(){var r=Object(o.a)(regeneratorRuntime.mark((function r(o){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.drawToCanvas(o.target.result);case 2:e.censusImage(),t();case 4:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}()}))}var n=new XMLHttpRequest;return new Promise((function(r){n.onload=function(){var n=Object(o.a)(regeneratorRuntime.mark((function o(n){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t=URL.createObjectURL(n.target.response),o.next=3,e.drawToCanvas(t);case 3:e.censusImage(),r();case 5:case"end":return o.stop()}}),o)})));return function(t){return n.apply(this,arguments)}}(),n.open("GET",t,!0),n.responseType="blob",n.send()}))}},{key:"drawToCanvas",value:function(t){var e=this,r=this.pixelRatio,canvas=this.canvas,o=this.ctx,img=new Image;return img.src=t,img.crossOrigin="anonymous",new Promise((function(t){img.onload=function(){o.clearRect(0,0,canvas.width,canvas.height);var n=0,h=0;img.width<img.height?(n=100*r,e.isHorizontal=!1):(h=100*r,e.isHorizontal=!0);var c=img.width>(canvas.width-n)/r?(canvas.width-n)/r:img.width,l=img.height>(canvas.height-h)/r?(canvas.height-h)/r:img.height,f=c/img.width<l/img.height?c/img.width:l/img.height;c=img.width*f,l=img.height*f,canvas.style.width=c+n/r+"px",canvas.style.height=l+h/r+"px",canvas.width=c*r+n,canvas.height=l*r+h,o.drawImage(img,0,0,img.width,img.height,0,0,c*r,l*r),t()}}))}},{key:"censusImage",value:function(){var canvas=this.canvas,t=this.ctx,e=this.pixelRatio,r=(new Date).getTime(),o=null;if(!(o=this.isHorizontal?t.getImageData(0,0,canvas.width,canvas.height-100*e):t.getImageData(0,0,canvas.width-100*e,canvas.height)))return"Can not read image data, maybe because of cross-domain limitation.";var n,g,b,h=[],l=0,f=o.height*o.width<36e4?1:2,d=Math.round(.1066*this.K*this.K-2.7463*this.K+17.2795);d=d<4?4:d;var v={colors:0,censusTime:0,kmeansIteration:0,kmeansTime:0,top5Count:0};v.colorStep=d;for(var m,C,w=[],y=1;y<o.height-1;){for(var col=1;col<o.width-1;)if(n=o.data[y*o.width*4+4*col],g=o.data[y*o.width*4+4*col+1],b=o.data[y*o.width*4+4*col+2],(m=Object(c.c)(n,g,b))[2]>97||m[2]>95&&m[1]<30)col+=f;else if(m[2]<3||m[2]<5&&m[1]<30)col+=f;else{l++,C=1e4*Math.floor(m[0]/10)+100*Math.floor(m[1]/5)+Math.floor(m[2]/5);var k=h.indexOf(C);k<0?(h.push(C),w.push({key:C,fre:1,r:n,g:g,b:b,h:m[0],s:m[1],l:m[2],category:-1})):w[k].fre++,col+=f}y+=f}v.pixelCount=l,v.censusTime=(new Date).getTime()-r,v.colors=w.length,r=(new Date).getTime(),w.sort((function(pre,t){return t.fre-pre.fre}));var x=w.length;w=w.filter((function(t){return!(t.fre<5-f&&x>400)})),this.mainColor=[w[0],w[1],w[2]];var R=this.chooseSeedColors(w,this.K);this.clusterRes=this.kMC(w,R,100),this.clusterColors=this.clusterRes[0],this.clusterColors=this.clusterColors.map((function(t){return Object(c.b)(Object(c.a)(t.h,t.s,t.l))}));var M=0,I=0,j=0,O=0;for(x=w.length;x--;)M+=w[x].r*w[x].fre,I+=w[x].g*w[x].fre,j+=w[x].b*w[x].fre,O+=w[x].fre;var T=Object(c.c)(Math.floor(M/O),Math.floor(I/O),Math.floor(j/O));this.averageColor={h:T[0],s:T[1],l:T[2]},v.kmeansTime=+new Date-r,v.kmeansIteration=this.clusterRes[1],this.info=this.countColor(w),v.top5Count=100*this.info.top5Count,this.colorsInfo=w,this.processInfo=v}},{key:"chooseSeedColors",value:function(t,e){for(var r=[],o=t.length,i=0;i<o;i++){var n=r.length,h=t[i];if(i){for(var c=0;c<n;c++){if(Math.abs(r[c].h-h.h)+Math.abs(r[c].s-h.s)+Math.abs(r[c].l-h.l)<45)break}if(c===n&&(h.category=r.length,r.push({h:h.h,s:h.s,l:h.l,category:h.category,fre:h.fre})),r.length>=e)break}else h.category=0,r.push({h:h.h,s:h.s,l:h.l,category:h.category,fre:h.fre})}return r}},{key:"kMC",value:function(t,e,r){for(var o=0;o++<r;){e=e.filter((function(t){return t}));for(var n=t.length,h=n/8^0,l=n%8;l--;)this.classifyColor(t[l],e);for(;h--;)this.classifyColor(t[--n],e),this.classifyColor(t[--n],e),this.classifyColor(t[--n],e),this.classifyColor(t[--n],e),this.classifyColor(t[--n],e),this.classifyColor(t[--n],e),this.classifyColor(t[--n],e),this.classifyColor(t[--n],e);n=t.length;for(var f=[],d=void 0;n--;)f[d=t[n].category]?f[d].freCount+=t[n].fre:(f[d]={},f[d].h=0,f[d].s=0,f[d].l=0,f[d].freCount=t[n].fre);for(n=t.length;n--;)f[d=t[n].category].h+=t[n].h*t[n].fre/f[d].freCount,f[d].s+=t[n].s*t[n].fre/f[d].freCount,f[d].l+=t[n].l*t[n].fre/f[d].freCount;var v=f.every((function(t,r){return Math.abs(t.h-e[r].h)<.5&&Math.abs(t.s-e[r].s)<.5&&Math.abs(t.l-e[r].l)<.5}));if(e=f.map((function(t,e){return{h:t.h,s:t.s,l:t.l,category:e,fre:t.freCount}})),v)break}return e.sort((function(pre,t){var e=Object(c.a)(pre.h,pre.s,pre.l);e=e[0]+e[1]+e[2];var r=Object(c.a)(t.h,t.s,t.l);return(r=r[0]+r[1]+r[2])-e})),[e,o]}},{key:"classifyColor",value:function(t,e){for(var r,o=e.length,n=1e4;o--;){var h=Math.abs(e[o].h-t.h)+Math.abs(e[o].s-t.s)+Math.abs(e[o].l-t.l);h<n&&(n=h,r=o)}t.category=r}},{key:"countColor",value:function(t){for(var e,r={top50Count:0,top20Count:0,top10Count:0,top5Count:0},o=0,n=0,h=0,c=0,l=0,f=t.length;f--;)o+=(e=t[f]).fre,f<50&&(n+=e.fre,f<20&&(h+=e.fre,f<10&&(c+=e.fre,f<5&&(l+=e.fre))));return f=t.length,r.top50Count=n/o,r.top20Count=h/o,r.top10Count=c/o,r.top5Count=l/o,r}},{key:"drawPalette",value:function(){var t=this.pixelRatio,canvas=this.canvas,e=this.ctx,r=this.isHorizontal?canvas.width:canvas.height,o=r*(this.K<10?.02:.01),p=(r-(this.K-1)*o)/this.K,n=this.clusterColors;if(0!==n.length){this.isHorizontal?e.clearRect(0,canvas.height-90*t,canvas.width,90*t):e.clearRect(canvas.width-90*t,0,90*t,canvas.height);for(var i=0;i<this.K;i++)e.fillStyle=n[i],this.isHorizontal?e.fillRect((p+o)*i,canvas.height-90*t,p,90*t):e.fillRect(canvas.width-90*t,(p+o)*i,90*t,p)}}},{key:"clearCanvas",value:function(){this.canvas.width=this.oriWidth,this.canvas.height=this.oriHeight}}]),t}()},317:function(t,e,r){var content=r(336);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(12).default)("70a1b3a4",content,!0,{sourceMap:!1})},335:function(t,e,r){"use strict";var o=r(317);r.n(o).a},336:function(t,e,r){(e=r(11)(!1)).push([t.i,".album-canvas{position:fixed;opacity:0;z-index:-1;width:300;height:300}",""]),t.exports=e},386:function(t,e,r){"use strict";r.r(e);r(63);var o=r(25),n=r(316),h={mounted:function(){this.colorDust=new n.a(this.$refs.albumDemo)},methods:{handleCardClick:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var img,o,n,h,c,l,f;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(img=t.target.previousElementSibling.style.backgroundImage){r.next=3;break}return r.abrupt("return");case 3:return o=img.slice(5,-2),r.next=6,e.colorDust.readFile(o);case 6:n=e.colorDust.colorsInfo,h=e.colorDust.mainColor,c=n[0].r+","+n[0].g+","+n[0].b,l="rgba("+c+",0.8)",f="rgba("+h[2].r+","+h[2].g+","+h[2].b+",1)",e.$store.commit("theme/setPrimaryColor",l),e.$store.commit("theme/setAccentColor",f);case 13:case"end":return r.stop()}}),r)})))()}},head:function(){return{title:"Image Test"}}},c=(r(335),r(62)),l=r(87),f=r.n(l),d=r(387),v=r(325),m=r(377),C=r(112),w=r(123),y=r(378),component=Object(c.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("v-row",[t._l(8,(function(e){return r("v-col",{key:e,attrs:{cols:"6",md:"3"}},[r("v-card",{staticClass:"d-flex",on:{click:t.handleCardClick}},[r("v-img",{staticClass:"grey lighten-2",attrs:{src:"https://i.picsum.photos/id/"+e+"00/200/200.jpg","aspect-ratio":"1"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[r("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[r("v-progress-circular",{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}],null,!0)})],1)],1)})),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("v-alert",{attrs:{border:"left","colored-border":"",elevation:"2"}},[r("p",{staticClass:"ml-2 my-0 headline font-weight-light"},[t._v("\n            You can click the card to switch to a theme similar to the\n            picture. "),r("br"),t._v("Just need some time to load image.\n          ")]),t._v(" "),r("canvas",{ref:"albumDemo",staticClass:"album-canvas"})])],1)],2)],1)],1)}),[],!1,null,null,null);e.default=component.exports;f()(component,{VAlert:d.a,VCard:v.a,VCol:m.a,VImg:C.a,VProgressCircular:w.a,VRow:y.a})}}]);