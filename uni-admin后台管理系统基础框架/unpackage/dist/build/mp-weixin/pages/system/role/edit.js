"use strict";const e=require("../../../common/vendor.js"),o=require("../../../js_sdk/validator/uni-id-roles.js"),t=e.er.database();t.command;function i(e){let t={};for(let i in o.validator)e.includes(i)&&(t[i]=o.validator[i]);return t}const n={data(){let e={role_id:"",role_name:"",permission:[],comment:"",create_date:null};return{formData:e,formOptions:{},rules:{...i(Object.keys(e))}}},onLoad(e){if(e.id){const o=e.id;this.formDataId=o,this.getDetail(o)}},onReady(){this.$refs.form.setRules(this.rules)},methods:{submit(){e.index.showLoading({mask:!0}),this.$refs.form.validate().then((e=>{this.submitForm(e)})).catch((()=>{e.index.hideLoading()}))},submitForm(o){t.collection("uni-id-roles").doc(this.formDataId).update(o).then((o=>{e.index.showToast({title:"修改成功"}),this.getOpenerEventChannel().emit("refreshData"),setTimeout((()=>e.index.navigateBack()),500)})).catch((o=>{e.index.showModal({content:o.message||"请求服务失败",showCancel:!1})})).finally((()=>{e.index.hideLoading()}))},getDetail(o){e.index.showLoading({mask:!0}),t.collection("uni-id-roles").doc(o).field("role_id,role_name,permission,comment,create_date").get().then((e=>{const o=e.result.data[0];o&&(this.formData=o)})).catch((o=>{e.index.showModal({content:o.message||"请求服务失败",showCancel:!1})})).finally((()=>{e.index.hideLoading()}))}}};if(!Array){(e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-data-checkbox")+e.resolveComponent("uni-forms"))()}Math||((()=>"../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js")+(()=>"../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"))();const a=e._export_sfc(n,[["render",function(o,t,i,n,a,s){return{a:e.o((e=>a.formData.role_id=e)),b:e.p({placeholder:"角色唯一标识，不可修改，不允许重复",trim:"both",disabled:!0,modelValue:a.formData.role_id}),c:e.p({name:"role_id",label:"唯一ID",required:!0}),d:e.o((e=>a.formData.role_name=e)),e:e.p({placeholder:"角色名称",trim:"both",modelValue:a.formData.role_name}),f:e.p({name:"role_name",label:"名称",required:!0}),g:e.o((e=>a.formData.permission=e)),h:e.p({multiple:!0,collection:"uni-id-permissions","page-size":500,field:"permission_name as text, permission_id as value",modelValue:a.formData.permission}),i:e.p({name:"permission",label:"权限"}),j:e.o((e=>a.formData.comment=e)),k:e.p({type:"textarea",placeholder:"备注",trim:"both",modelValue:a.formData.comment}),l:e.p({name:"comment",label:"备注"}),m:e.t(o.$t("common.button.submit")),n:e.o(((...e)=>s.submit&&s.submit(...e))),o:e.t(o.$t("common.button.back")),p:e.sr("form","1b39acd2-0"),q:e.p({value:a.formData,validateTrigger:"bind"})}}]]);wx.createPage(a);
