"use strict";const e=require("../../../../common/vendor.js"),t=require("../../../../js_sdk/uni-stat/util.js"),a=require("./fieldsMap.js"),i=a.fieldsMap.filter((e=>e.hasOwnProperty("value"))),s={data:()=>({tableName:"uni-stat-result",fieldsMap:a.fieldsMap,resFieldsMap:a.resFieldsMap,entFieldsMap:a.entFieldsMap,query:{dimension:"hour",appid:"",version_id:"",platform_id:"",uni_platform:"",start_time:[],channel_id:""},options:{pageCurrent:1,total:0,pageSizeIndex:0,pageSizeRange:[10,20,50,100]},errorMessage:"",loading:!1,currentDateTab:2,chartTab:"new_user_count",tableData:[],resTableData:[],entTableData:[],panelData:i,chartData:{},eopts:{seriesTemplate:[{itemStyle:{borderWidth:2,borderColor:"#1890FF",color:"#1890FF"},areaStyle:{color:{colorStops:[{offset:0,color:"#1890FF"},{offset:1,color:"#FFFFFF"}]}}},{lineStyle:{color:"#ea7ccc",width:2,type:"dashed"},itemStyle:{borderWidth:1,borderColor:"#ea7ccc",color:"#ea7ccc"},areaStyle:null}]},tabIndex:0,tabName:"新增设备"}),onLoad(e){const{appid:t}=e;t&&(this.query.appid=t)},computed:{pageSize(){const{pageSizeRange:e,pageSizeIndex:t}=this.options;return e[t]},chartTabs(){const e=[];return a.fieldsMap.forEach((t=>{const a=t.field,i=t.title;a&&i&&e.push({_id:a,name:i})})),e},versionQuery(){const{appid:e,uni_platform:a}=this.query;return t.stringifyQuery({appid:e,uni_platform:a})},channelQuery(){const{appid:e,platform_id:a}=this.query;return t.stringifyQuery({appid:e,platform_id:a})}},created(){this.debounceGet=t.debounce((()=>{this.getAllData(this.query)}),300)},watch:{query:{deep:!0,handler(e){this.options.pageCurrent=1,this.debounceGet()}}},methods:{useDatetimePicker(){this.currentDateTab=null},changePlatform(e,t,a,i){this.query.version_id=0,this.query.uni_platform=i.code},changeTimeRange(e,a){this.currentDateTab=a;let i,s;i=t.getTimeOfSomeDayAgo(e),s=e?t.getTimeOfSomeDayAgo(0)-1:t.getTimeOfSomeDayAgo(0)+864e5-1,this.query.start_time=[i,s]},changePageCurrent(e){this.options.pageCurrent=e.current,this.getChartData(this.query)},changePageSize(e){const{value:t}=e.detail;this.options.pageCurrent=1,this.options.pageSizeIndex=t,this.getChartData(this.query)},changeChartTab(e,t,a){this.tabIndex=t,this.tabName=a,this.getChartData(this.query,e,a)},getAllData(e){e.appid?(this.errorMessage="",this.getPanelData(),this.getChartData(e),this.getPageData(e,"res"),this.getPageData(e,"ent")):this.errorMessage="请先选择应用"},getDays(){if(!this.query.start_time.length)return!0;const[e,t]=this.query.start_time;return t-e>=864e5},getPanelData(){const{appid:i,platform_id:s,version_id:r,channel_id:n}=this.query;let o=t.stringifyQuery({appid:i,platform_id:s,version_id:r,channel_id:n,start_time:[t.getTimeOfSomeDayAgo(1),(new Date).getTime()]});e.er.database().collection(this.tableName).where(o).field(`${t.stringifyField(a.fieldsMap)},dimension,stat_date`).groupBy("stat_date, dimension").groupField(t.stringifyGroupField(a.fieldsMap)).orderBy("stat_date","desc").get().then((e=>{const i=e.result.data,s=i.find((e=>e.stat_date===t.parseDateTime(t.getTimeOfSomeDayAgo(0),"","")))||{};s.total_devices=0;const r=i.find((e=>"day"===e.dimension&&e.stat_date===t.parseDateTime(t.getTimeOfSomeDayAgo(1),"","")));this.panelData=[],this.panelData=t.mapfields(a.fieldsMap,s),this.panelData.map((e=>{t.mapfields(a.fieldsMap,r,e,"","contrast")})),t.getFieldTotal.call(this,o)}))},getChartData(i,s=this.chartTabs[this.tabIndex]._id,r=this.chartTabs[this.tabIndex].name){this.options;const n=this.currentDateTab,o=t.getTimeOfSomeDayAgo(n),l=864e5;let d;if(!this.getDays()){const e=o-l,t=o+l-1;i=JSON.parse(JSON.stringify(i)),d=i.start_time=[e,t]}i=t.stringifyQuery(i,!0,["uni_platform"]);e.er.database().collection(this.tableName).where(i).field(`${t.stringifyField(a.fieldsMap,s)}, start_time`).groupBy("start_time").groupField(t.stringifyGroupField(a.fieldsMap,s)).orderBy("start_time","asc").get({getCount:!0}).then((e=>{const{count:i,data:n}=e.result,l={categories:[],series:[{name:r,data:[]}]};let p=a.fieldsMap.filter((e=>e.field===s));if(p=JSON.parse(JSON.stringify(p)),delete p[0].value,p[0].formatter="",this.getDays())for(const a of n){t.mapfields(p,a,a);const e=t.formatDate(a.start_time,"day");let i=Number(a[s]);l.series[0].data.push(i),l.categories.push(e)}else{const[e,a]=d,i=l.series[1]={name:t.formatDate(e),data:[]},r=l.series[0]={name:t.formatDate(a),data:[]};for(let d=0;d<24;++d){const e=d<10?"0"+d:d,a=`${e}:00 ~ ${e}:59`;l.categories.push(a),i.data[d]=0,r.data[d]=0,n.forEach((e=>{t.mapfields(p,e,e);let a=Number(e[s]);const n=new Date(e.start_time);e.start_time<o?n.getHours()===d&&(i.data[d]=a):n.getHours()===d&&(r.data[d]=a)}))}}this.chartData=l})).catch((e=>{console.error(e)})).finally((()=>{}))},getAppAccessTimes(t){return e.er.database().collection(this.tableName).where(t).groupBy("appid").groupField("sum(page_visit_count) as total_app_access").get()},getPageData(a,i){(a=JSON.parse(JSON.stringify(a))).dimension="day",a=t.stringifyQuery(a,!1,["uni_platform"]),this.options;const s=this[`${i}FieldsMap`],r=s[1].field;this.loading=!0;const n=e.er.database(),o=t.stringifyQuery({appid:this.query.appid}),l=n.collection("uni-stat-pages").where(o).field("_id, title, path").getTemp(),d=n.collection("uni-stat-page-result").where(`${a} && ${r} > 0`).getTemp();n.collection(d,l).field(`${t.stringifyField(s,r)}, stat_date, page_id`).groupBy("page_id").groupField(t.stringifyGroupField(s,r)).orderBy(r,"desc").limit(10).get({getCount:!0}).then((e=>{const{count:r,data:n}=e.result;let o;this.getAppAccessTimes(a).then((e=>{const t=e.result.data[0];o=t&&t.total_app_access})).finally((()=>{this[`${i}TableData`]=[];for(const e of n){e.total_app_access=o;const a=e.page_id;if(Array.isArray(a)){delete e.page_id;const t=a[0];if(t&&Object.keys(t).length)for(const a in t)"_id"!==a&&(e[a]=t[a])}t.mapfields(s,e,e),this[`${i}TableData`].push(e)}this.loading=!1}))})).catch((e=>{console.error(e)})).finally((()=>{}))},navTo(t){t&&e.index.navigateTo({url:t})}}};if(!Array){(e.resolveComponent("uni-stat-breadcrumb")+e.resolveComponent("uni-data-select")+e.resolveComponent("uni-stat-tabs")+e.resolveComponent("uni-datetime-picker")+e.resolveComponent("uni-stat-panel")+e.resolveComponent("qiun-data-charts")+e.resolveComponent("uni-th")+e.resolveComponent("uni-tr")+e.resolveComponent("uni-td")+e.resolveComponent("uni-table")+e.resolveComponent("fix-window"))()}Math||((()=>"../../../../components/uni-stat-breadcrumb/uni-stat-breadcrumb.js")+(()=>"../../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js")+(()=>"../../../../components/uni-stat-tabs/uni-stat-tabs.js")+(()=>"../../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js")+(()=>"../../../../components/uni-stat-panel/uni-stat-panel.js")+(()=>"../../../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js")+(()=>"../../../../uni_modules/uni-table/components/uni-th/uni-th.js")+(()=>"../../../../uni_modules/uni-table/components/uni-tr/uni-tr.js")+(()=>"../../../../uni_modules/uni-table/components/uni-td/uni-td.js")+(()=>"../../../../uni_modules/uni-table/components/uni-table/uni-table.js")+(()=>"../../../../components/fix-window/fix-window.js"))();const r=e._export_sfc(s,[["render",function(t,a,i,s,r,n){return e.e({a:e.o((e=>r.query.appid=e)),b:e.p({collection:"opendb-app-list",field:"appid as value, name as text",orderby:"text asc",defItem:1,label:"应用选择",clear:!1,modelValue:r.query.appid}),c:e.o((e=>r.query.version_id=e)),d:e.p({collection:"opendb-app-versions",where:n.versionQuery,field:"_id as value, version as text, uni_platform as label, create_date as date",format:"{label} - {text}",orderby:"date desc",label:"版本选择",modelValue:r.query.version_id}),e:e.o(n.changeTimeRange),f:e.p({label:"日期选择",current:r.currentDateTab,mode:"date",today:!0}),g:r.currentDateTab<0&&r.query.start_time.length?1:"",h:e.o(n.useDatetimePicker),i:e.o((e=>r.query.start_time=e)),j:e.p({type:"datetimerange",end:(new Date).getTime(),returnType:"timestamp",clearIcon:!1,modelValue:r.query.start_time}),k:e.o(n.changePlatform),l:e.o((e=>r.query.platform_id=e)),m:e.p({label:"平台选择",type:"boldLine",mode:"platform",modelValue:r.query.platform_id}),n:r.query.platform_id&&-1===r.query.platform_id.indexOf("==")},r.query.platform_id&&-1===r.query.platform_id.indexOf("==")?{o:e.o((e=>r.query.channel_id=e)),p:e.p({collection:"uni-stat-app-channels",where:n.channelQuery,field:"_id as value, channel_name as text",orderby:"text asc",label:"渠道/场景值选择",modelValue:r.query.channel_id})}:{},{q:e.p({items:r.panelData,contrast:!0}),r:e.o(n.changeChartTab),s:e.o((e=>r.chartTab=e)),t:e.p({type:"box",tabs:n.chartTabs,modelValue:r.chartTab}),v:e.p({type:"area",chartData:r.chartData,eopts:r.eopts,echartsH5:!0,echartsApp:!0,tooltipFormat:"tooltipCustom",errorMessage:r.errorMessage}),w:e.o((e=>n.navTo("/pages/uni-stat/page-res/page-res"))),x:e.f(r.resFieldsMap,((t,a,i)=>e.e({a:t.title},t.title?{b:e.t(t.title),c:a,d:"02063216-12-"+i+",02063216-11",e:e.p({align:"center"})}:{},{f:a}))),y:e.f(r.resTableData,((t,a,i)=>({a:e.f(r.resFieldsMap,((a,s,r)=>e.e({a:a.title},a.title?{b:e.t(void 0!==t[a.field]?t[a.field]:"-"),c:s,d:"02063216-14-"+i+"-"+r+",02063216-13-"+i,e:e.p({align:0===s?"left":"center"})}:{},{f:s}))),b:a,c:"02063216-13-"+i+",02063216-10"}))),z:e.p({loading:r.loading,border:!0,stripe:!0,emptyText:"暂无数据"}),A:e.o((e=>n.navTo("/pages/uni-stat/page-ent/page-ent"))),B:e.f(r.entFieldsMap,((t,a,i)=>e.e({a:t.title},t.title?{b:e.t(t.title),c:a,d:"02063216-17-"+i+",02063216-16",e:e.p({align:"center"})}:{},{f:a}))),C:e.f(r.entTableData,((t,a,i)=>({a:e.f(r.entFieldsMap,((a,s,r)=>e.e({a:a.title},a.title?{b:e.t(void 0!==t[a.field]?t[a.field]:"-"),c:s,d:"02063216-19-"+i+"-"+r+",02063216-18-"+i,e:e.p({align:0===s?"left":"center"})}:{},{f:s}))),b:a,c:"02063216-18-"+i+",02063216-15"}))),D:e.p({loading:r.loading,border:!0,stripe:!0,emptyText:"暂无数据"})})}]]);wx.createPage(r);
