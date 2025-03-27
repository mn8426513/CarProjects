"use strict";const o=require("../../../../../common/vendor.js"),e=require("../../../common/store.js"),t={data:()=>({formData:{mobile:"",code:"",captcha:""},focusMobile:!0,logo:"/static/logo.png"}),computed:{tipText(){return`验证码已通过短信发送至 ${this.formData.mobile}。密码为6 - 20位`}},onLoad(o){},onReady(){},methods:{submit(){if(!/^1\d{10}$/.test(this.formData.mobile))return this.focusMobile=!0,o.index.showToast({title:"手机号码格式不正确",icon:"none",duration:3e3});if(!/^\d{6}$/.test(this.formData.code))return this.$refs.smsForm.focusSmsCodeInput=!0,o.index.showToast({title:"验证码格式不正确",icon:"none",duration:3e3});o.er.importObject("uni-id-co").bindMobileBySms(this.formData).then((t=>{o.index.showToast({title:t.errMsg,icon:"none",duration:3e3}),this.getOpenerEventChannel(),e.mutations.setUserInfo(this.formData),o.index.navigateBack()})).catch((o=>{console.log(o),"uni-id-captcha-required"==o.errCode&&this.$refs.popup.open()})).finally((o=>{this.formData.captcha=""}))}}};if(!Array){(o.resolveComponent("uni-easyinput")+o.resolveComponent("uni-id-pages-sms-form")+o.resolveComponent("uni-popup-captcha"))()}Math||((()=>"../../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../../components/uni-id-pages-sms-form/uni-id-pages-sms-form.js")+(()=>"../../../../uni-captcha/components/uni-popup-captcha/uni-popup-captcha.js"))();const a=o._export_sfc(t,[["render",function(e,t,a,i,n,s){return{a:n.logo,b:o.o((o=>n.focusMobile=!1)),c:o.o((o=>n.formData.mobile=o)),d:o.p({clearable:!0,focus:n.focusMobile,type:"number",inputBorder:!1,maxlength:"11",placeholder:"请输入手机号",modelValue:n.formData.mobile}),e:o.sr("smsForm","5af9d1ff-1"),f:o.o((o=>n.formData.code=o)),g:o.p({type:"bind-mobile-by-sms",phone:n.formData.mobile,modelValue:n.formData.code}),h:o.o(((...o)=>s.submit&&s.submit(...o))),i:o.sr("popup","5af9d1ff-2"),j:o.o(s.submit),k:o.o((o=>n.formData.captcha=o)),l:o.p({scene:"bind-mobile-by-sms",modelValue:n.formData.captcha})}}]]);wx.createPage(a);
