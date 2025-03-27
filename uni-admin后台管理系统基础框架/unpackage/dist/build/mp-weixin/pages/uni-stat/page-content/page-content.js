"use strict";const e=require("../../../common/vendor.js"),t=require("../../../js_sdk/uni-stat/util.js"),i=require("./fieldsMap.js"),a={data:()=>({fieldsMap:i.fieldsMap,query:{dimension:"day",appid:"",platform_id:"",uni_platform:"",version_id:"",channel_id:"",start_time:[]},options:{pageSize:20,pageCurrent:1,total:0},loading:!1,currentDateTab:1,tableData:[],panelData:i.fieldsMap.filter((e=>e.hasOwnProperty("value"))),queryId:"",updateValue:"",channelData:[],errorMessage:""}),computed:{channelQuery(){const e=this.query.platform_id;return t.stringifyQuery({platform_id:e})},versionQuery(){const{appid:e,uni_platform:i}=this.query;return t.stringifyQuery({appid:e,uni_platform:i})}},created(){this.debounceGet=t.debounce((()=>this.getAllData())),this.getChannelData()},watch:{query:{deep:!0,handler(e){this.options.pageCurrent=1,this.debounceGet()}}},methods:{pageTo(t){e.index.redirectTo({url:t})},useDatetimePicker(){this.currentDateTab=-1},changeAppid(e){this.getChannelData(e,!1)},changePlatform(e,t,i,a){this.getChannelData(null,e),this.query.version_id=0,this.query.uni_platform=a.code},changeTimeRange(e,i){this.currentDateTab=i;const a=t.getTimeOfSomeDayAgo(e),n=t.getTimeOfSomeDayAgo(0)-1;this.query.start_time=[a,n]},changePageCurrent(e){this.options.pageCurrent=e.current,this.getTableData(this.query)},changePageSize(e){this.options.pageSize=e,this.options.pageCurrent=1,this.getTableData()},getAllData(){this.getPanelData(),this.getTableData()},getTableData(a){if(!this.query.appid)return void(this.errorMessage="请先选择应用");this.errorMessage="",a=t.stringifyQuery(this.query,null,["uni_platform"]);const{pageCurrent:n}=this.options;this.loading=!0;const o=e.er.database(),s=t.stringifyQuery({appid:this.query.appid}),l=o.collection("uni-stat-page-details").where(s).getTemp(),r=o.collection("uni-stat-page-detail-result").where(a).getTemp();o.collection(r,l).field(`${t.stringifyField(i.fieldsMap)}, stat_date, page_detail_id`).groupBy("page_detail_id").groupField(t.stringifyGroupField(i.fieldsMap)).orderBy("visit_times desc").skip((n-1)*this.options.pageSize).limit(this.options.pageSize).get({getCount:!0}).then((e=>{const{count:a,data:n}=e.result;this.options.total=a,this.tableData=[];for(const o of n){const e=o.page_detail_id;if(Array.isArray(e)){delete o.page_detail_id;const t=e[0];if(t&&Object.keys(t).length)for(const e in t)"_id"!==e&&(o[e]=t[e])}t.mapfields(i.fieldsMap,o,o),this.tableData.push(o)}})).catch((e=>{console.error(e)})).finally((()=>{this.loading=!1}))},getPanelData(a=t.stringifyQuery(this.query,null,["uni_platform"])){let n=JSON.parse(JSON.stringify(i.fieldsMap));n=n.filter((e=>"visit_devices"!==e.field));e.er.database().collection("uni-stat-page-detail-result").where(a).field(t.stringifyField(n)).groupBy("appid").groupField(t.stringifyGroupField(n)).orderBy("start_time desc").get().then((e=>{const i=e.result.data[0];this.panelData=[],this.panelData=t.mapfields(n,i)}))},inputDialogToggle(e,t){this.queryId=e,this.updateValue=t,this.$refs.inputDialog.open()},editName(t=""){const i=e.er.database();e.index.showLoading({title:"请求中..."}),i.collection("uni-stat-page-details").where({page_link:this.queryId}).update({page_title:t.trim()}).then((t=>{t.result.updated?(e.index.showToast({title:"修改成功"}),this.getTableData()):e.index.showToast({title:"修改失败",icon:"none"})})).catch((t=>{e.index.showModal({content:t.message||"请求服务失败",showCancel:!1})})).finally((()=>{e.index.hideLoading()}))},getChannelData(t,i){this.query.channel_id="";const a=e.er.database(),n={};(t=t||this.query.appid)&&(n.appid=t),(i=i||this.query.platform_id)&&(n.platform_id=i);let o=a.collection("uni-stat-app-platforms").field("_id, name").getTemp(),s=a.collection("uni-stat-app-channels").where(n).field("_id, channel_name, create_time, platform_id").getTemp();a.collection(s,o).orderBy("platform_id asc").get().then((e=>{let t=e.result.data,i=[];if(t.length>0){let e;for(let a in t)e=t[a].channel_name?t[a].channel_name:"默认",t[a].platform_id.length>0&&(e=t[a].platform_id[0].name+"-"+e),i.push({value:t[a]._id,text:e})}this.channelData=i})).catch((e=>{console.error(e)})).finally((()=>{}))}}};if(!Array){(e.resolveComponent("uni-stat-breadcrumb")+e.resolveComponent("uni-data-select")+e.resolveComponent("uni-stat-tabs")+e.resolveComponent("uni-datetime-picker")+e.resolveComponent("uni-stat-panel")+e.resolveComponent("uni-th")+e.resolveComponent("uni-tr")+e.resolveComponent("uni-icons")+e.resolveComponent("uni-td")+e.resolveComponent("uni-table")+e.resolveComponent("uni-pagination")+e.resolveComponent("uni-popup-dialog")+e.resolveComponent("uni-popup")+e.resolveComponent("fix-window"))()}Math||((()=>"../../../components/uni-stat-breadcrumb/uni-stat-breadcrumb.js")+(()=>"../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js")+(()=>"../../../components/uni-stat-tabs/uni-stat-tabs.js")+(()=>"../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js")+(()=>"../../../components/uni-stat-panel/uni-stat-panel.js")+(()=>"../../../uni_modules/uni-table/components/uni-th/uni-th.js")+(()=>"../../../uni_modules/uni-table/components/uni-tr/uni-tr.js")+(()=>"../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js")+(()=>"../../../uni_modules/uni-table/components/uni-td/uni-td.js")+(()=>"../../../uni_modules/uni-table/components/uni-table/uni-table.js")+(()=>"../../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js")+(()=>"../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js")+(()=>"../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js")+(()=>"../../../components/fix-window/fix-window.js"))();const n=e._export_sfc(a,[["render",function(t,i,a,n,o,s){return e.e({a:e.o((e=>o.query.appid=e)),b:e.p({collection:"opendb-app-list",field:"appid as value, name as text",orderby:"text asc",defItem:1,label:"应用选择",clear:!1,modelValue:o.query.appid}),c:e.o((e=>o.query.version_id=e)),d:e.p({collection:"opendb-app-versions",where:s.versionQuery,field:"_id as value, version as text, uni_platform as label, create_date as date",format:"{label} - {text}",orderby:"date desc",label:"版本选择",modelValue:o.query.version_id}),e:e.o(s.changeTimeRange),f:e.p({label:"日期选择",current:o.currentDateTab,mode:"date"}),g:o.currentDateTab<0&&o.query.start_time.length?1:"",h:e.o(s.useDatetimePicker),i:e.o((e=>o.query.start_time=e)),j:e.p({type:"datetimerange",end:(new Date).getTime(),returnType:"timestamp",clearIcon:!1,modelValue:o.query.start_time}),k:e.o(s.changePlatform),l:e.o((e=>o.query.platform_id=e)),m:e.p({label:"平台选择",type:"boldLine",mode:"platform",modelValue:o.query.platform_id}),n:o.query.platform_id&&-1===o.query.platform_id.indexOf("==")},o.query.platform_id&&-1===o.query.platform_id.indexOf("==")?{o:e.sr("version-select","568ff000-6"),p:e.o((e=>o.query.channel_id=e)),q:e.p({collection:"uni-stat-app-channels",where:s.channelQuery,field:"_id as value, channel_name as text",orderby:"text asc",label:"渠道/场景值选择",modelValue:o.query.channel_id})}:{},{r:e.p({items:o.panelData}),s:e.o((e=>s.pageTo("/pages/uni-stat/page-rule/page-rule"))),t:e.f(o.fieldsMap,((t,i,a)=>e.e({a:t.title},t.title?{b:e.t(t.title),c:i,d:"568ff000-10-"+a+",568ff000-9",e:e.p({align:"center"})}:{},{f:i}))),v:e.f(o.tableData,((t,i,a)=>({a:e.f(o.fieldsMap,((i,n,o)=>e.e({a:1===n},1===n?{b:e.t(void 0!==t[i.field]?t[i.field]:"-"),c:e.o((e=>s.inputDialogToggle(t.page_link,t.page_title)),n),d:"568ff000-13-"+a+"-"+o+",568ff000-12-"+a+"-"+o,e:e.p({type:"compose",color:"#2979ff",size:"25"}),f:i.field,g:"568ff000-12-"+a+"-"+o+",568ff000-11-"+a}:{h:e.t(void 0!==t[i.field]?t[i.field]:"-"),i:i.field,j:"568ff000-14-"+a+"-"+o+",568ff000-11-"+a,k:e.p({align:0===n?"left":"center"})},{l:n}))),b:i,c:"568ff000-11-"+a+",568ff000-8"}))),w:e.p({loading:o.loading,border:!0,stripe:!0,emptyText:o.errorMessage||t.$t("common.empty")}),x:e.o(s.changePageCurrent),y:e.o(s.changePageSize),z:e.p({"show-icon":!0,"show-page-size":!0,"page-size":o.options.pageSize,current:o.options.pageCurrent,total:o.options.total}),A:e.sr("inputClose","568ff000-17,568ff000-16"),B:e.o(s.editName),C:e.o((e=>o.updateValue=e)),D:e.p({mode:"input",title:"请编辑名称",placeholder:"请输入内容",modelValue:o.updateValue}),E:e.sr("inputDialog","568ff000-16"),F:e.p({type:"dialog",maskClick:!0})})}]]);wx.createPage(n);
