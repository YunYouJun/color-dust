(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{142:function(t,e,o){"use strict";var r=o(1),n=o(143);r.a.use(n.a),e.a=function(t){var e=t.app,r=t.store;e.i18n=new n.a({locale:r.state.locale,fallbackLocale:"en",messages:{en:o(330),zh:o(331)}}),e.i18n.path=function(link){return e.i18n.locale===e.i18n.fallbackLocale?"/".concat(link):"/".concat(e.i18n.locale,"/").concat(link)}}},174:function(t,e,o){var content=o(243);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(12).default)("2a9c821a",content,!0,{sourceMap:!1})},184:function(t,e,o){var content=o(298);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(12).default)("84455a9e",content,!0,{sourceMap:!1})},197:function(t,e,o){"use strict";o.r(e);var r=o(18);o.d(e,"mdiHome",(function(){return r.i})),o.d(e,"mdiImageMultiple",(function(){return r.k})),o.d(e,"mdiInformation",(function(){return r.l})),o.d(e,"mdiInvertColors",(function(){return r.m})),o.d(e,"mdiToggleSwitch",(function(){return r.r})),o.d(e,"mdiToggleSwitchOff",(function(){return r.s})),o.d(e,"mdiPalette",(function(){return r.o})),o.d(e,"mdiImage",(function(){return r.j})),o.d(e,"mdiEyedropper",(function(){return r.g})),o.d(e,"mdiTools",(function(){return r.t})),o.d(e,"mdiGithub",(function(){return r.h})),o.d(e,"mdiCloud",(function(){return r.d})),o.d(e,"mdiEarth",(function(){return r.f})),o.d(e,"mdiTranslate",(function(){return r.u})),o.d(e,"mdiChartBar",(function(){return r.a})),o.d(e,"mdiPlus",(function(){return r.p})),o.d(e,"mdiChartPie",(function(){return r.c})),o.d(e,"mdiRelationManyToMany",(function(){return r.q})),o.d(e,"mdiLink",(function(){return r.n})),o.d(e,"mdiCube",(function(){return r.e})),o.d(e,"mdiChartBubble",(function(){return r.b}))},205:function(t,e,o){"use strict";o(10),o(6),o(5),o(4),o(9);var r=o(2),n=o(52),c={props:{color:{type:String,default:""}},data:function(){return{items:[{icon:"$vuetify.icons.mdiHome",title:this.$t("links.home"),to:""},{icon:"$vuetify.icons.mdiImageMultiple",title:this.$t("links.album"),to:"album"},{icon:"$vuetify.icons.mdiTools",title:"Tools",to:"tools"},{icon:"$vuetify.icons.mdiCube",title:"Cube",to:"cube"},{icon:"$vuetify.icons.mdiInformation",title:this.$t("links.about"),to:"about"}]}},computed:{drawer:{get:function(){return this.$store.state.app.drawer},set:function(t){this.$store.commit("app/setDrawer",t)}}}},l=o(46),f=o(54),d=o.n(f),m=o(134),h=o(135),v=o(94),C=o(136),y=o(72),w=o(345),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-navigation-drawer",{attrs:{clipped:"",app:"","mini-variant":"",color:t.color},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[o("v-list",t._l(t.items,(function(e,i){return o("v-list-item",{key:i,attrs:{to:t.$i18n.path(e.to),router:"",exact:""}},[o("v-list-item-action",{attrs:{title:e.title}},[o("v-icon",[t._v(t._s(e.icon))])],1),t._v(" "),o("v-list-item-content",[o("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1)],1)})),1)],1)}),[],!1,null,null,null),O=component.exports;d()(component,{VIcon:m.a,VList:h.a,VListItem:v.a,VListItemAction:C.a,VListItemContent:y.a,VListItemTitle:y.b,VNavigationDrawer:w.a});function x(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var k={data:function(){return{items:[{href:"https://github.com/YunYouJun/color-dust",icon:"$vuetify.icons.mdiGithub",color:"black"},{href:"https://github.com/YunYouJun",icon:"$vuetify.icons.mdiCloud",color:"blue"},{href:"https://www.yunyoujun.cn",icon:"$vuetify.icons.mdiEarth",color:"purple"}]}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?x(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):x(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(n.b)("theme",["getFgColor"]))},P=o(151),_=o(138),j=o(122),$=o(341),T=Object(l.a)(k,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-footer",{attrs:{padless:""}},[o("v-card",{staticClass:"text-center",attrs:{flat:"",tile:"",color:t.getFgColor,width:"100%"}},[o("v-card-text",t._l(t.items,(function(e,i){return o("v-btn",{key:i,attrs:{icon:"",href:e.href,target:"_blank",color:e.color}},[o("v-icon",[t._v(t._s(e.icon))])],1)})),1)],1)],1)}),[],!1,null,null,null),I=T.exports;function E(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function S(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?E(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):E(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}d()(T,{VBtn:P.a,VCard:_.a,VCardText:j.b,VFooter:$.a,VIcon:m.a});var V={components:{NavDrawer:O,BaseFooter:I},computed:S(S({},Object(n.b)("theme",["getBgColor","getFgColor"])),{},{drawer:{get:function(){return this.$store.state.app.drawer},set:function(t){this.$store.commit("app/setDrawer",t)}}}),watch:{getFgColor:function(t){document.documentElement.style.setProperty("--theme-color",t)}}},F=(o(297),o(340)),A=o(346),D=o(342),L=o(343),M=o(347),B=o(344),N=o(196),H=Object(l.a)(V,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",{style:{backgroundColor:t.getBgColor}},[o("nav-drawer",{attrs:{color:t.getFgColor}}),t._v(" "),o("v-app-bar",{attrs:{app:"","clipped-left":"",fixed:"",color:t.getFgColor,elevation:1}},[o("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),o("v-toolbar-title",{domProps:{textContent:t._s(t.$t("title"))}}),t._v(" "),o("v-spacer"),t._v(" "),o("v-btn",{attrs:{icon:"",to:"en"===t.$i18n.locale?"/zh"+t.$route.fullPath:t.$route.fullPath.replace(/^\/[^\/]+/,""),exact:"",nuxt:""}},[o("v-icon",[t._v("$vuetify.icons.mdiTranslate")])],1),t._v(" "),o("v-btn",{attrs:{icon:""},on:{click:function(e){return e.stopPropagation(),t.$store.commit("theme/exchange")}}},[t.$store.state.theme.isExchanged?o("v-icon",[t._v("$vuetify.icons.mdiToggleSwitch")]):o("v-icon",[t._v("$vuetify.icons.mdiToggleSwitchOff")])],1),t._v(" "),o("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.$vuetify.theme.dark=!t.$vuetify.theme.dark}}},[o("v-icon",[t._v("$vuetify.icons.mdiInvertColors")])],1)],1),t._v(" "),o("v-content",[o("v-container",{attrs:{fluid:""}},[o("nuxt")],1)],1),t._v(" "),o("base-footer")],1)}),[],!1,null,null,null);e.a=H.exports;d()(H,{VApp:F.a,VAppBar:A.a,VAppBarNavIcon:D.a,VBtn:P.a,VContainer:L.a,VContent:M.a,VIcon:m.a,VSpacer:B.a,VToolbarTitle:N.a})},217:function(t,e,o){t.exports=o(218)},234:function(t,e,o){"use strict";o.r(e);o(50),o(172),o(34),o(38);e.default=function(t){var e=t.isHMR,o=t.app,r=t.store,n=t.route,c=t.params,l=t.error,f=t.redirect,d=o.i18n.fallbackLocale;if(!e){var m=c.lang||d;if(!r.state.locales.includes(m))return l({message:"This page could not be found.",statusCode:404});if(r.commit("SET_LANG",m),o.i18n.locale=r.state.locale,m===d&&0===n.fullPath.indexOf("/"+d)){var h="^/"+d+(0===n.fullPath.indexOf("/"+d+"/")?"/":""),v=new RegExp(h);return f(n.fullPath.replace(v,"/"))}}}},242:function(t,e,o){"use strict";o(174)},243:function(t,e,o){(e=o(11)(!1)).push([t.i,"h1[data-v-5c09efde]{font-size:20px}",""]),t.exports=e},297:function(t,e,o){"use strict";o(184)},298:function(t,e,o){(e=o(11)(!1)).push([t.i,"::-webkit-scrollbar{width:.8rem;background-color:transparent}::-webkit-scrollbar-track{box-shadow:inset 0 0 5px rgba(0,0,0,.3);background-color:transparent}::-webkit-scrollbar-thumb{box-shadow:inset 0 0 5px rgba(0,0,0,.3);background-color:grey;background-color:var(--theme-color,grey)}",""]),t.exports=e},307:function(t,e,o){"use strict";o.r(e),o.d(e,"state",(function(){return n})),o.d(e,"mutations",(function(){return c})),o.d(e,"actions",(function(){return l}));o(34),o(38);var r=o(73),n=function(){return{locales:["en","zh"],locale:"zh",clusterColors:[],colorsInfo:[{count:1e3,color:new r.a("#66CCFF")},{count:500,color:new r.a("#000000")},{count:200,color:new r.a("#999999")}],loopColors:[["rgb(222,244,255)","rgb(183,189,255)"],["rgba(27,72,177,0.3)","rgba(27,72,177,0.7)"],["rgba(74,192,223,0.3)","rgba(74,192,223,0.7)"],["rgba(140,114,192,0.3)","rgba(140,114,192,0.7)"]],score:"",processInfo:{colors:0,censusTime:0,kmeansIteration:0,kmeansTime:0,top5Count:0},mainColor:[new r.a("#000000"),new r.a("#333333"),new r.a("#666666")],averageColor:new r.a("#000000")}},c={SET_LANG:function(t,e){t.locales.includes(e)&&(t.locale=e)},setScore:function(t,e){t.score=e},setLoopColors:function(t,e){t.loopColors=e},setMainColor:function(t,e){t.mainColor=e},setAverageColor:function(t,e){t.averageColor=e},setClusterColors:function(t,e){t.clusterColors=e},setProcessInfo:function(t,e){t.processInfo=e},setColorsInfo:function(t,e){t.colorsInfo=e}},l={resetApp:function(t){var e=t.commit;e("setClusterColors",[]),e("setLoopColors",[["rgb(222,244,255)","rgb(183,189,255)"],["rgba(27,72,177,0.3)","rgba(27,72,177,0.7)"],["rgba(74,192,223,0.3)","rgba(74,192,223,0.7)"],["rgba(140,114,192,0.3)","rgba(140,114,192,0.7)"]]),e("setScore",""),e("setProcessInfo",{colors:0,censusTime:0,kmeansIteration:0,kmeansTime:0,top5Count:0}),e("setMainColor",[]),e("setAverageColor",null),e("theme/setPrimaryColor",null),e("theme/setAccentColor",null)}}},308:function(t,e,o){"use strict";o.r(e),o.d(e,"state",(function(){return r})),o.d(e,"mutations",(function(){return n}));var r=function(){return{drawer:!1}},n={setDrawer:function(t,e){t.drawer=e}}},309:function(t,e,o){"use strict";o.r(e),o.d(e,"state",(function(){return r})),o.d(e,"mutations",(function(){return n}));var r=function(){return{total:0,initSeed:[]}},n={setTotal:function(t,e){t.total=e},setInitSeed:function(t,e){t.initSeed=e}}},310:function(t,e,o){"use strict";o.r(e),o.d(e,"state",(function(){return r})),o.d(e,"mutations",(function(){return n}));var r=function(){return{display:{barChart:!1,pieChart:!1,relationChart:!1,wordCloud:!1,bubbleChart:!1}}},n={setDisplayChart:function(t,e){t.display[e.type]=e.display}}},311:function(t,e,o){"use strict";o.r(e),o.d(e,"state",(function(){return r})),o.d(e,"mutations",(function(){return n})),o.d(e,"getters",(function(){return c}));var r=function(){return{isExchanged:!1,primaryColor:null,accentColor:null}},n={setPrimaryColor:function(t,e){t.primaryColor=e},setAccentColor:function(t,e){t.accentColor=e},exchange:function(t){t.isExchanged=!t.isExchanged}},c={getBgColor:function(t){return t.isExchanged?t.accentColor?t.accentColor.toHexString():"":t.primaryColor?t.primaryColor.toHexString():""},getFgColor:function(t){return t.isExchanged?t.primaryColor?t.primaryColor.toHexString():"":t.accentColor?t.accentColor.toHexString():""}}},330:function(t){t.exports=JSON.parse('{"title":"Color Dust","links":{"home":"Home","album":"Album","about":"About","cube":"Color Cube"},"color":{"clustered":"Clustered Colors By K-Means","main":"Main Color","average":"Average Color","bubble-chart":"More Colors In Bubble Chart","info":{"amount":"Found about {amount} colors in your image.","time":"Color Census Time is {time} ms.","kmeans":"K-Means iterated {iteration} times with cost of {time} ms.","top5":"The top5 colors account for {percent}% of total."}},"home":{"url":{"label":"Url For Picture","error":"Please input image url!"},"blur":{"label":"Blur (px)"},"upload":{"placeholder":"Upload Image To Parse","error":"Please upload image to parse!"},"palette":{"hint":"How many colors? (0 to hide Palette)"},"pie":{"top":"Top Colors"}},"album":{"tooltip":"You can click the card to switch to a theme similar to the picture. (Just need some time to load image.)"},"about":{"description":"Color dust, Buddhist language. One of \\"Six Dust\\". That is the dust environment touched by the root of the eye (vision).","quote":{"content":"The dust is known, and the robbery is not young.","from":"——Tang Lishen \\"Tifa Hua Temple\\""}},"tooltip":{"finish":"Process completely."}}')},331:function(t){t.exports=JSON.parse('{"title":"色尘","links":{"home":"主页","album":"相册","about":"关于","cube":"色彩方块"},"color":{"clustered":"K-Means 生成的簇色彩","main":"主色","average":"平均色","bubble-chart":"更多的色彩（气泡图）","info":{"amount":"在您的图片中发现了 {amount} 种色彩。","time":"提取颜色花了 {time} 毫秒。","kmeans":"K-Means 用 {time} 毫秒迭代了 {iteration} 次。","top5":"前五的色彩占总色彩的 {percent}%。"}},"home":{"url":{"label":"图片链接","error":"请输入图片链接！"},"blur":{"label":"模糊度（px）"},"upload":{"placeholder":"上传图片以提取色彩","error":"请先上传图片！"},"palette":{"hint":"想要多少种色彩？（设置为 0 以不显示调色盘）"},"pie":{"top":"前几种色彩"}},"album":{"tooltip":"你可以通过点击卡片来切换至一个和图片相似的颜色主题。（可能需要点时间加载图片）"},"about":{"description":"色尘，佛教语。“六尘”之一。 即眼根（视觉）所触及的尘境。","quote":{"content":"色尘知有数，劫烬岂无年。","from":"—— 唐·李绅《题法华寺》"}},"tooltip":{"finish":"处理完成！"}}')},62:function(t,e,o){"use strict";var r={layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},n=(o(242),o(46)),c=o(54),l=o.n(c),f=o(340),component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[404===t.error.statusCode?o("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):o("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),o("NuxtLink",{attrs:{to:"/"}},[t._v(" Home page ")])],1)}),[],!1,null,"5c09efde",null);e.a=component.exports;l()(component,{VApp:f.a})}},[[217,16,6,17]]]);