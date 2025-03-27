"use strict";const o=require("../../../../common/vendor.js"),e={mixins:[require("../../common/login-page.mixin.js").mixin],data:()=>({code:"",phone:"",captcha:"",logo:"/static/logo.png"}),computed:{tipText(){return"验证码已通过短信发送至"+this.phone}},onLoad({phoneNumber:o}){this.phone=o},onShow(){},methods:{submit(){const e=o.er.importObject("uni-id-co",{errorOptions:{type:"toast"}});if(6!=this.code.length)return this.$refs.smsCode.focusSmsCodeInput=!0,o.index.showToast({title:"验证码不能为空",icon:"none",duration:3e3});e.loginBySms({mobile:this.phone,code:this.code,captcha:this.captcha}).then((o=>{this.loginSuccess(o)})).catch((o=>{"uni-id-captcha-required"==o.errCode?this.$refs.popup.open():console.log(o.errMsg)})).finally((o=>{this.captcha=""}))}}};if(!Array){(o.resolveComponent("uni-id-pages-sms-form")+o.resolveComponent("uni-forms")+o.resolveComponent("uni-popup-captcha"))()}Math||((()=>"../../components/uni-id-pages-sms-form/uni-id-pages-sms-form.js")+(()=>"../../../uni-forms/components/uni-forms/uni-forms.js")+(()=>"../../../uni-captcha/components/uni-popup-captcha/uni-popup-captcha.js"))();const s=o._export_sfc(e,[["render",function(e,s,n,t,i,p){return{a:i.logo,b:o.sr("smsCode","b47b9f65-1,b47b9f65-0"),c:o.o((o=>i.code=o)),d:o.p({focusCaptchaInput:!0,type:"login-by-sms",phone:i.phone,modelValue:i.code}),e:o.o(((...o)=>p.submit&&p.submit(...o))),f:o.sr("popup","b47b9f65-2"),g:o.o(p.submit),h:o.o((o=>i.captcha=o)),i:o.p({scene:"login-by-sms",modelValue:i.captcha})}}],["__scopeId","data-v-b47b9f65"]]);wx.createPage(s);
