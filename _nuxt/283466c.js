(window.webpackJsonp=window.webpackJsonp||[]).push([[13,9],{358:function(t,e,n){"use strict";n.d(e,"c",(function(){return o})),n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return d}));var r=n(22);n(68),n(18),n(5);function o(t){return h.apply(this,arguments)}function h(){return(h=Object(r.a)(regeneratorRuntime.mark((function t(e){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e instanceof File)){t.next=5;break}return n=new FileReader,t.abrupt("return",new Promise((function(t){n.onload=function(e){var n;t(null===(n=e.target)||void 0===n?void 0:n.result)},n.readAsDataURL(e)})));case 5:if("string"!=typeof e){t.next=10;break}return t.next=8,fetch(new Request(e)).then((function(t){return t.blob()})).then((function(t){return URL.createObjectURL(t)}));case 8:return r=t.sent,t.abrupt("return",r);case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function c(image,canvas,t){t=Object.assign({hasPalette:!1},t);var e=window.devicePixelRatio||1,n=canvas.getContext("2d"),r={isHorizontal:!1};if(!n)return r;var img=new Image;return new Promise((function(o){img.onload=function(){var h=0,c=0;img.width<img.height?r.isHorizontal=!1:r.isHorizontal=!0,(null==t?void 0:t.hasPalette)&&(r.isHorizontal?c=100*e:h=100*e);var d=img.width>(canvas.width-h)/e?(canvas.width-h)/e:img.width,l=img.height>(canvas.height-c)/e?(canvas.height-c)/e:img.height,m=d/img.width,f=l/img.height,w=m<f?m:f;d=img.width*w,l=img.height*w,canvas.style.width=d+h/e+"px",canvas.style.height=l+c/e+"px",canvas.width=d*e+h,canvas.height=l*e+c,(null==t?void 0:t.blur)&&(n.filter="blur(".concat(t.blur,")")),n.drawImage(img,0,0,img.width,img.height,0,0,d*e,l*e),o(r)},img.src=image,img.crossOrigin="anonymous"}))}function d(canvas){var t=canvas.getContext("2d");t&&t.clearRect(0,0,canvas.width,canvas.height),canvas.height=480}},365:function(t,e,n){var content=n(380);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("3d6529d6",content,!0,{sourceMap:!1})},379:function(t,e,n){"use strict";n(365)},380:function(t,e,n){var r=n(11)(!1);r.push([t.i,"#inset{width:150px;height:150px;background-color:transparent;border:1px solid #000;margin:0;padding:0;position:absolute;left:20px;bottom:20px;z-index:100}",""]),t.exports=r},543:function(t,e,n){"use strict";n.r(e);var r=n(22),o=(n(396),n(68),n(378)),h=n(398),c=n(397),d=n.n(c),l=n(358),m={data:function(){return{camera:null,scene:null,renderer:null,points:null,stats:null,controls:null,group:null,displayStats:!1,colors:[],positions:[],scale:3,height:800,width:1200,rangeOfColor:256,inset:{camera:null,scene:null,renderer:null}}},head:function(){return{title:this.$t("links.cube")}},computed:{radius:function(){return this.rangeOfColor*this.scale/2}},mounted:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var image;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/color-dust/images/夹心酱.jpg",e.next=3,Object(l.c)("/color-dust/images/夹心酱.jpg");case 3:return image=e.sent,e.next=6,Object(l.b)(image,t.$refs.demo);case 6:t.getImageData(),t.init(),t.animate();case 9:case"end":return e.stop()}}),e)})))()},methods:{getImageData:function(){for(var canvas=this.$refs.demo,data=canvas.getContext("2d").getImageData(0,0,canvas.width,canvas.height).data,t=new o.f,i=0;i<data.length;i+=4){var e=data[i],g=data[i+1],b=data[i+2];this.positions.push(e*this.scale-this.radius,g*this.scale-this.radius,b*this.scale-this.radius),t.setRGB(e/255,g/255,b/255),this.colors.push(t.r,t.g,t.b)}},generateVirtualData:function(){this.colors=[],this.positions=[];for(var t=new o.f,e=this.rangeOfColor*this.scale,n=e/2,i=0;i<5e3;i++){var r=Math.random()*e-n,h=Math.random()*e-n,c=Math.random()*e-n;this.positions.push(r,h,c);var d=r/e+.5,l=h/e+.5,m=c/e+.5;t.setRGB(d,l,m),this.colors.push(t.r,t.g,t.b)}},animate:function(){requestAnimationFrame(this.animate),this.controls.update(),this.render(),this.displayStats&&this.stats.update()},initStats:function(){var t=document.getElementById("container");this.stats=new d.a,t.appendChild(this.stats.dom)},initGrid:function(){var t=new o.i(2e3,10);t.position.y=t.position.set(0,0,0),t.material.linewidth=10,this.scene.add(t)},initBox:function(){var t=this.rangeOfColor*this.scale,e=new o.d(new o.l(new o.c(t,t,t)));e.material.color.setHex(1052688),e.material.blending=o.a,e.material.transparent=!0,e.material.opacity=.8,this.group.add(e)},initAxes:function(){var t=document.getElementById("inset");t.width=150,t.height=150,this.inset.renderer=new o.v({alpha:!0});var e=this.inset.renderer;e.setClearColor(0,0),e.setSize(150,150),t.appendChild(e.domElement),this.inset.scene=new o.q,this.inset.camera=new o.m(50,1,1,1e3),this.inset.camera.up=this.camera.up;var n=new o.b(100);this.inset.scene.add(n)},init:function(){var t=document.getElementById("container");this.camera=new o.m(27,this.width/this.height,5,1e4),this.camera.position.z=2750,this.scene=new o.q,this.group=new o.j,this.scene.add(this.group);var e=new o.e;e.setAttribute("position",new o.h(this.positions,3)),e.setAttribute("color",new o.h(this.colors,3)),e.computeBoundingSphere();var n=new o.o({size:15,vertexColors:!0});this.points=new o.n(e,n),this.scene.add(this.points),this.renderer=new o.v({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(this.width,this.height),t.appendChild(this.renderer.domElement),this.controls=new h.a(this.camera,this.renderer.domElement),this.controls.enableZoom=!0,this.initBox(),this.initAxes(),this.displayStats&&this.initStats(),window.addEventListener("resize",this.onWindowResize,!1)},onWindowResize:function(){var t=this.camera,e=this.renderer;t.aspect=this.width/this.height,t.updateProjectionMatrix(),e.setSize(this.width,this.height)},render:function(){var t=this.camera;this.renderer.render(this.scene,t),this.inset.camera.position.copy(t.position),this.inset.camera.position.sub(this.controls.target),this.inset.camera.position.setLength(300),this.inset.camera.lookAt(this.inset.scene.position),this.inset.renderer.render(this.inset.scene,this.inset.camera)}}},f=(n(379),n(46)),w=n(58),v=n.n(w),x=n(146),component=Object(f.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text-center"},[n("v-card",{staticClass:"img-canvas-container"},[n("canvas",{ref:"demo",attrs:{height:"300"}})]),t._v(" "),n("div",{attrs:{id:"inset"}}),t._v(" "),n("div",{attrs:{id:"container"}})],1)}),[],!1,null,null,null);e.default=component.exports;v()(component,{VCard:x.a})},674:function(t,e,n){"use strict";n.r(e);var r=n(543).default,o=n(46),component=Object(o.a)(r,undefined,undefined,!1,null,null,null);e.default=component.exports}}]);