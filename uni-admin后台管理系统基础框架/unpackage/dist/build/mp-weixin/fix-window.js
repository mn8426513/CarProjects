"use strict";const o=require("./common/vendor.js"),i={components:{topWindow:()=>"./windows/topWindow.js",leftWindow:()=>"./windows/leftWindow.js"},data:()=>({visible:!1}),methods:{tiggerWindow(){this.visible=!this.visible}}};if(!Array){(o.resolveComponent("top-window")+o.resolveComponent("left-window"))()}const e=o._export_sfc(i,[["render",function(i,e,n,t,s,r){return{a:o.o(((...o)=>r.tiggerWindow&&r.tiggerWindow(...o))),b:s.visible,c:o.o(((...o)=>r.tiggerWindow&&r.tiggerWindow(...o))),d:s.visible}}]]);exports.Component=e;
