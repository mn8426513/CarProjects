"use strict";const e=require("../../common/vendor.js"),t=require("../../js_sdk/uni-stat/util.js"),i=require("./fieldsMap.js"),a={data:()=>({query:{platform_id:"",start_time:[t.getTimeOfSomeDayAgo(1),(new Date).getTime()]},deviceTableData:[],userTableData:[],pageSize:10,pageCurrent:1,total:0,loading:!1,complete:!1,statSetting:{mode:"",day:7},statModeList:[{value:"open",text:"开启"},{value:"close",text:"关闭"},{value:"auto",text:"节能"}],showAddAppId:!1,showdbInit:!1}),onReady(){this.debounceGet=t.debounce((()=>{this.getAllData(this.queryStr)}),300),this.debounceGet(),this.checkAppId(),this.checkdbInit()},watch:{query:{deep:!0,handler(e){this.debounceGet(this.queryStr)}}},computed:{queryStr(){return t.stringifyQuery(this.query)+' && (dimension == "hour" || dimension == "day")'},deviceTableFields(){return this.tableFieldsMap(i.deviceFeildsMap)},userTableFields(){return this.tableFieldsMap(i.userFeildsMap)}},methods:{getAllData(e){this.getApps(this.queryStr,i.deviceFeildsMap,"device"),this.getApps(this.queryStr,i.userFeildsMap,"user")},tableFieldsMap(e){let t=[];const i=[],a=[],d=[];for(const o of e)if(o.field)if(o.hasOwnProperty("value")){const e=JSON.parse(JSON.stringify(o)),t=JSON.parse(JSON.stringify(o));"total_users"!==o.field&&"total_devices"!==o.field?(e.title="今日"+o.title,e.field=o.field+"_value",t.title="昨日"+o.title,t.field=o.field+"_contrast",i.push(e),a.push(t)):(e.field=o.field+"_value",d.push(e))}else t.push(o);return t=[...t,...i,...a,...d],t},getApps(i,a,d="device"){this.loading=!0;const o=e.er.database(),n=o.collection("uni-stat-result").where(i).getTemp(),s=o.collection("opendb-app-list").getTemp();o.collection(n,s).field(`${t.stringifyField(a,"","value")},stat_date,appid,dimension`).groupBy("appid,dimension,stat_date").groupField(t.stringifyGroupField(a,"","value")).orderBy("appid","desc").get().then((e=>{let{data:i}=e.result;if(this[`${d}TableData`]=[],!i.length)return;let o=[],n=[],s=[],l=t.parseDateTime(t.getTimeOfSomeDayAgo(0),"",""),p=t.parseDateTime(t.getTimeOfSomeDayAgo(1),"","");for(const t of i){const{appid:e,name:i}=t.appid&&t.appid[0]||{};t.appid=e,t.name=i,o.indexOf(t.appid)<0&&o.push(t.appid),"hour"===t.dimension&&t.stat_date===l&&n.push(t),"day"===t.dimension&&t.stat_date===p&&s.push(t)}const r=a.map((e=>e.field)).filter(Boolean);for(const a of o){const e={},i=n.find((e=>e.appid===a)),o=s.find((e=>e.appid===a));for(const a of r)if("appid"===a||"name"===a)e[a]=i&&i[a];else{const d=i&&i[a],n=o&&o[a];e[a+"_value"]=t.format(d),e[a+"_contrast"]=t.format(n)}if(a&&(e[`total_${d}s_value`]="获取中..."),this[`${d}TableData`].push(e),a){i[`total_${d}s`]=0;const e=JSON.parse(JSON.stringify(this.query));e.start_time=[t.getTimeOfSomeDayAgo(0),(new Date).getTime()],e.appid=a,t.getFieldTotal.call(this,e,`total_${d}s`).then((e=>{this[`${d}TableData`].find((e=>e.appid===a))[`total_${d}s_value`]=e}))}}})).catch((e=>{console.error(e)})).finally((()=>{this.loading=!1,this.complete=!0}))},navTo(t,i){t.indexOf("http")>-1?window.open(t):(i&&(t=`${t}?appid=${i}`),e.index.navigateTo({url:t}))},toUrl(e){},toAddAppId(){this.showAddAppId=!1,e.index.navigateTo({url:"/pages/system/app/list",events:{refreshData:()=>{this.checkAppId()}}})},async checkAppId(){const t=e.er.database();let i=await t.collection("opendb-app-list").count();this.showAddAppId=!i.result||0===i.result.total},async checkdbInit(){const t=e.er.database();let i=await t.collection("opendb-admin-menus").count();this.showdbInit=!i.result||0===i.result.total,this.showdbInit&&e.index.showModal({title:"重要提示",content:"检测到您未初始化数据库，请先右键uni-admin项目根目下的 uniCloud/database 目录，执行初始化云数据库，否则左侧无法显示菜单等数据",showCancel:!1,confirmText:"我知道了"})}}};if(!Array){(e.resolveComponent("uni-stat-breadcrumb")+e.resolveComponent("uni-notice-bar")+e.resolveComponent("uni-stat-tabs")+e.resolveComponent("uni-th")+e.resolveComponent("uni-tr")+e.resolveComponent("uni-td")+e.resolveComponent("uni-table")+e.resolveComponent("fix-window"))()}Math||((()=>"../../components/uni-stat-breadcrumb/uni-stat-breadcrumb.js")+(()=>"../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js")+(()=>"../../components/uni-stat-tabs/uni-stat-tabs.js")+(()=>"../../uni_modules/uni-table/components/uni-th/uni-th.js")+(()=>"../../uni_modules/uni-table/components/uni-tr/uni-tr.js")+(()=>"../../uni_modules/uni-table/components/uni-td/uni-td.js")+(()=>"../../uni_modules/uni-table/components/uni-table/uni-table.js")+(()=>"../../components/fix-window/fix-window.js"))();const d=e._export_sfc(a,[["render",function(t,i,a,d,o,n){return e.e({a:o.showdbInit},o.showdbInit?{b:e.o(n.toAddAppId),c:e.p({showGetMore:!0,showIcon:!0,text:"检测到您未初始化db_init.json，请先右键uniCloud/database/db_init.json文件，执行初始化云数据库，否则左侧无法显示菜单等数据","background-color":"#fef0f0",color:"#f56c6c"})}:{},{d:o.showAddAppId},o.showAddAppId?{e:e.o(n.toAddAppId),f:e.p({showGetMore:!0,showIcon:!0,text:"检测到您还未添加应用，点击前往应用管理添加"})}:{},{g:!o.deviceTableData.length&&!o.userTableData.length&&!o.query.platform_id&&o.complete},o.deviceTableData.length||o.userTableData.length||o.query.platform_id||!o.complete?{}:{h:e.o((e=>n.navTo("https://uniapp.dcloud.io/uni-stat-v2.html"))),i:e.p({showGetMore:!0,showIcon:!0,text:"暂无数据, 统计相关功能需开通 uni 统计后才能使用, 如未开通, 点击查看具体流程"})},{j:e.o((e=>o.query.platform_id=e)),k:e.p({label:"平台选择",type:"boldLine",mode:"platform",modelValue:o.query.platform_id}),l:e.f(n.deviceTableFields,((t,i,a)=>e.e({a:t.title},t.title?{b:e.t(t.title),c:i,d:"bd5d2914-7-"+a+",bd5d2914-6",e:e.p({align:"center"})}:{},{f:i}))),m:e.f(o.deviceTableData,((t,i,a)=>({a:e.f(n.deviceTableFields,((i,d,o)=>e.e({a:"appid"===i.field},"appid"===i.field?e.e({b:t.appid},t.appid?{c:e.t(void 0!==t[i.field]?t[i.field]:"-"),d:e.o((e=>n.navTo("/pages/uni-stat/device/overview/overview",t.appid)),d)}:{e:e.o((e=>n.navTo("/pages/system/app/add")),d)},{f:"bd5d2914-9-"+a+"-"+o+",bd5d2914-8-"+a,g:e.p({align:"center"})}):{h:e.t(void 0!==t[i.field]?t[i.field]:"-"),i:d,j:"bd5d2914-10-"+a+"-"+o+",bd5d2914-8-"+a,k:e.p({align:"center"})},{l:d}))),b:i,c:"bd5d2914-8-"+a+",bd5d2914-5"}))),n:e.p({loading:o.loading,border:!0,stripe:!0,emptyText:"暂无数据"}),o:e.f(n.userTableFields,((t,i,a)=>e.e({a:t.title},t.title?{b:e.t(t.title),c:i,d:"bd5d2914-13-"+a+",bd5d2914-12",e:e.p({align:"center"})}:{},{f:i}))),p:e.f(o.userTableData,((t,i,a)=>({a:e.f(n.userTableFields,((i,d,o)=>e.e({a:"appid"===i.field},"appid"===i.field?e.e({b:t.appid},t.appid?{c:e.t(void 0!==t[i.field]?t[i.field]:"-"),d:e.o((e=>n.navTo("/pages/uni-stat/user/overview/overview",t.appid)),d)}:{e:e.o((e=>n.navTo("/pages/system/app/add")),d)},{f:"bd5d2914-15-"+a+"-"+o+",bd5d2914-14-"+a,g:e.p({align:"center"})}):{h:e.t(void 0!==t[i.field]?t[i.field]:"-"),i:d,j:"bd5d2914-16-"+a+"-"+o+",bd5d2914-14-"+a,k:e.p({align:"center"})},{l:d}))),b:i,c:"bd5d2914-14-"+a+",bd5d2914-11"}))),q:e.p({loading:o.loading,border:!0,stripe:!0,emptyText:"暂无数据"})})}]]);wx.createPage(d);
