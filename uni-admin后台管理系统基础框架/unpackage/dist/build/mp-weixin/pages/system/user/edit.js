"use strict";const e=require("../../../common/vendor.js"),a=require("../../../js_sdk/validator/uni-id-users.js"),t=e.er.database();t.command;function o(e){let t={};for(let o in a.validator)e.includes(o)&&(t[o]=a.validator[o]);return t}const s={data:()=>({showPassword:!1,formData:{username:"",nickname:"",password:void 0,role:[],tags:[],authorizedApp:[],mobile:void 0,email:void 0,status:!1},rules:{...o(["username","password","role","mobile","email"]),status:{rules:[{format:"bool"}]}},roles:[],userId:"",appList:[],unknownAppids:[]}),onLoad(a){const t=a.id;this.formDataId=t;let o=e.index.getStorageSync("uni-id-pages-userInfo")||{};this.userId=o._id,this.getDetail(t),this.loadroles()},methods:{gotoAppList(){e.index.navigateTo({url:"../app/list"})},gotoTagList(){e.index.navigateTo({url:"../tag/list"})},gotoTagAdd(){e.index.navigateTo({url:"../tag/add",events:{refreshCheckboxData:()=>{this.$refs.checkboxTags.loadData()}}})},trigger(){this.showPassword=!this.showPassword},submitForm(e){this.$refs.form.submit()},submit(a){const{value:t,errors:o}=a.detail;o||(e.index.showLoading({title:"修改中...",mask:!0}),"boolean"==typeof t.status&&(t.status=Number(!t.status)),t.uid=this.formDataId,this.$request("updateUser",t).then((()=>{e.index.showToast({title:"修改成功"});const a=this.getOpenerEventChannel();a.emit&&a.emit("refreshData"),setTimeout((()=>e.index.navigateBack()),500)})).catch((a=>{e.index.showModal({content:a.message||"请求服务失败",showCancel:!1})})).finally((a=>{e.index.hideLoading()})))},resetPWd(a){this.$request("system/user/resetPwd",a).then().catch((a=>{e.index.showModal({content:a.message||"请求服务失败",showCancel:!1})})).finally()},getDetail(a){e.index.showLoading({mask:!0}),t.collection("uni-id-users").doc(a).field("username,nickname,role,dcloud_appid as authorizedApp,tags,mobile,email,status").get().then((e=>{const a=e.result.data[0];a&&(void 0===a.status&&(a.status=!0),0===a.status&&(a.status=!0),1===a.status&&(a.status=!1),this.formData=Object.assign(this.formData,a),this.loadAppList(this.formData.authorizedApp))})).catch((a=>{e.index.showModal({content:a.message||"请求服务失败",showCancel:!1})})).finally((()=>{e.index.hideLoading()}))},loadroles(){t.collection("uni-id-roles").limit(500).get().then((e=>{const a=[];this.roles=e.result.data.map((e=>(a.push(e.role_id),{value:e.role_id,text:e.role_name}))),-1===a.indexOf("admin")&&this.roles.unshift({value:"admin",text:"超级管理员"})})).catch((a=>{e.index.showModal({title:"提示",content:a.message,showCancel:!1})}))},loadAppList(a){t.collection("opendb-app-list").limit(500).get().then((e=>{let t=e.result.data.map(((e,a)=>({value:e.appid,text:e.name})));t||(t=[]),a.map((e=>{t.find((a=>a.value===e))||(this.unknownAppids.push(e),t.push({value:e,text:`未知应用${e}`}))})),this.appList=t})).catch((a=>{e.index.showModal({title:"提示",content:a.message,showCancel:!1})}))},parseUserStatus:e=>0===e?"启用":1===e?"禁用":2===e?"审核中":3===e?"审核拒绝":4===e?"已注销":void 0!==e?"未知":"启用"},computed:{unknownAppidsCom(){let e="";return this.unknownAppids.map(((a,t)=>{e+=a,t!==this.unknownAppids.length-1&&(e+="、")})),e}}};if(!Array){(e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-data-checkbox")+e.resolveComponent("uni-forms"))()}Math||((()=>"../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js")+(()=>"../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"))();const i=e._export_sfc(s,[["render",function(a,t,o,s,i,n){return e.e({a:e.o((e=>i.formData.username=e)),b:e.p({clearable:!1,placeholder:"请输入用户名",modelValue:i.formData.username}),c:e.p({name:"username",label:"用户名",required:!0}),d:e.o((e=>i.formData.nickname=e)),e:e.p({clearable:!1,placeholder:"请输入用户昵称",modelValue:i.formData.nickname}),f:e.p({name:"nickname",label:"用户昵称",required:!0}),g:i.showPassword},i.showPassword?{h:e.o(((...e)=>n.trigger&&n.trigger(...e))),i:e.o((e=>i.formData.password=e)),j:e.p({clearable:!1,placeholder:"请输入重置密码",modelValue:i.formData.password}),k:e.p({name:"password",label:"重置密码"})}:{l:e.o(((...e)=>n.trigger&&n.trigger(...e))),m:e.p({label:"重置密码"})},{n:e.o((e=>i.formData.role=e)),o:e.p({multiple:!0,localdata:i.roles,modelValue:i.formData.role}),p:e.p({name:"role",label:"角色列表"}),q:e.sr("checkboxTags","5b03311d-11,5b03311d-10"),r:e.o((e=>i.formData.tags=e)),s:e.p({multiple:!0,collection:"uni-id-tag",field:"tagid as value, name as text",modelValue:i.formData.tags}),t:e.o(((...e)=>n.gotoTagAdd&&n.gotoTagAdd(...e))),v:e.o(((...e)=>n.gotoTagList&&n.gotoTagList(...e))),w:e.p({name:"tags",label:"用户标签",labelWidth:"100"}),x:e.o((e=>i.formData.authorizedApp=e)),y:e.p({multiple:!0,localdata:i.appList,modelValue:i.formData.authorizedApp}),z:e.o(((...e)=>n.gotoAppList&&n.gotoAppList(...e))),A:a.formDataId===i.userId},a.formDataId===i.userId?{B:e.t(n.unknownAppidsCom)}:{},{C:e.p({name:"authorizedApp",label:"可登录应用"}),D:e.o((e=>i.formData.mobile=e)),E:e.p({clearable:!1,placeholder:"请输入手机号",modelValue:i.formData.mobile}),F:e.p({name:"mobile",label:"手机号"}),G:e.o((e=>i.formData.email=e)),H:e.p({clearable:!1,placeholder:"请输入邮箱",modelValue:i.formData.email}),I:e.p({name:"email",label:"邮箱"}),J:Number(i.formData.status)<2},Number(i.formData.status)<2?{K:e.o((e=>a.binddata("status",e.detail.value))),L:i.formData.status,M:a.formDataId===i.userId}:{N:e.t(n.parseUserStatus(i.formData.status))},{O:a.formDataId===i.userId},(a.formDataId,i.userId,{}),{P:e.p({name:"status",label:"用户状态"}),Q:e.t(a.$t("common.button.submit")),R:e.o(((...e)=>n.submitForm&&n.submitForm(...e))),S:e.t(a.$t("common.button.back")),T:e.sr("form","5b03311d-0"),U:e.o(n.submit),V:e.o((e=>i.formData=e)),W:e.p({rules:i.rules,validateTrigger:"bind",modelValue:i.formData})})}]]);wx.createPage(i);
