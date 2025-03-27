"use strict";const e=require("../../../../common/vendor.js"),i=require("../../config.js");const n={mixins:[require("../../common/login-page.mixin.js").mixin],data:()=>({type:"",phone:"",focusPhone:!1,logo:"/static/logo.png"}),computed:{loginTypes:async()=>i.config.loginTypes,isPhone(){return/^1\d{10}$/.test(this.phone)},imgSrc(){return"weixin"==this.type?"/uni_modules/uni-id-pages/static/login/weixin.png":"/uni_modules/uni-id-pages/static/app-plus/apple.png"}},async onLoad(n){let o=n.type||i.config.loginTypes[0];this.type=o,"univerify"!=o&&(this.focusPhone=!0),this.$nextTick((()=>{["weixin","apple"].includes(o)&&(this.$refs.uniFabLogin.servicesList=this.$refs.uniFabLogin.servicesList.filter((e=>e.id!=o)))})),e.index.$on("uni-id-pages-setLoginType",(e=>{this.type=e}))},onShow(){},onUnload(){e.index.$off("uni-id-pages-setLoginType")},onReady(){},methods:{showCurrentWebview(){undefined.setStyle({top:0})},quickLogin(e){var i,n;let o={};(null==(i=e.detail)?void 0:i.code)&&(o.phoneNumberCode=e.detail.code),("weixinMobile"!==this.type||(null==(n=e.detail)?void 0:n.code))&&this.$refs.uniFabLogin.login_before(this.type,!0,o)},toSmsPage(){return this.isPhone?this.needAgreements&&!this.agree?this.$refs.agreements.popup(this.toSmsPage):void e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/login/login-smscode?phoneNumber="+this.phone}):(this.focusPhone=!0,e.index.showToast({title:"手机号码格式不正确",icon:"none",duration:3e3}))},toPwdLogin(){e.index.navigateTo({url:"../login/password"})},chooseArea(){e.index.showToast({title:"暂不支持其他国家",icon:"none",duration:3e3})}}};if(!Array){(e.resolveComponent("uni-id-pages-agreements")+e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-id-pages-fab-login"))()}Math||((()=>"../../components/uni-id-pages-agreements/uni-id-pages-agreements.js")+(()=>"../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../components/uni-id-pages-fab-login/uni-id-pages-fab-login.js"))();const o=e._export_sfc(n,[["render",function(i,n,o,s,t,p){return e.e({a:t.logo,b:["apple","weixin","weixinMobile"].includes(t.type)},["apple","weixin","weixinMobile"].includes(t.type)?e.e({c:"weixinMobile"!==t.type},"weixinMobile"!==t.type?{d:e.o(((...e)=>p.quickLogin&&p.quickLogin(...e))),e:p.imgSrc}:{f:e.o(((...e)=>p.quickLogin&&p.quickLogin(...e)))},{g:e.sr("agreements","e4bbf7c2-0"),h:e.p({scope:"register"})}):{i:e.o(((...e)=>p.chooseArea&&p.chooseArea(...e))),j:e.o((e=>t.focusPhone=!1)),k:e.o((e=>t.phone=e)),l:e.p({focus:t.focusPhone,type:"number",inputBorder:!1,maxlength:"11",placeholder:"请输入手机号",modelValue:t.phone}),m:e.sr("agreements","e4bbf7c2-2"),n:e.p({scope:"register"}),o:e.o(((...e)=>p.toSmsPage&&p.toSmsPage(...e)))},{p:e.sr("uniFabLogin","e4bbf7c2-3")})}],["__scopeId","data-v-e4bbf7c2"]]);wx.createPage(o);
