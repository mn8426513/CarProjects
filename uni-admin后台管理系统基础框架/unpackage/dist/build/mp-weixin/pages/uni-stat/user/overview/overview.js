"use strict";const e=require("../../../../common/vendor.js"),t=require("../../../../js_sdk/uni-stat/util.js"),a=require("./fieldsMap.js"),r=a.fieldsMap.filter((e=>e.hasOwnProperty("value"))),i={data:()=>({tableName:"uni-stat-result",fieldsMap:a.fieldsMap,resFieldsMap:a.resFieldsMap,entFieldsMap:a.entFieldsMap,query:{dimension:"hour",appid:"",platform_id:"",uni_platform:"",version_id:"",start_time:[]},options:{pageCurrent:1,total:0,pageSizeIndex:0,pageSizeRange:[10,20,50,100]},loading:!1,currentDateTab:2,chartTab:"new_user_count",tableData:[],resTableData:[],entTableData:[],panelData:r,chartData:{},eopts:{seriesTemplate:[{itemStyle:{borderWidth:2,borderColor:"#1890FF",color:"#1890FF"},areaStyle:{color:{colorStops:[{offset:0,color:"#1890FF"},{offset:1,color:"#FFFFFF"}]}}},{lineStyle:{color:"#ea7ccc",width:2,type:"dashed"},itemStyle:{borderWidth:1,borderColor:"#ea7ccc",color:"#ea7ccc"},areaStyle:null}]},tabIndex:0,errorMessage:""}),onLoad(e){const{appid:t}=e;t&&(this.query.appid=t)},computed:{pageSize(){const{pageSizeRange:e,pageSizeIndex:t}=this.options;return e[t]},chartTabs(){const e=[];return a.fieldsMap.forEach((t=>{const a=t.field,r=t.title;a&&r&&e.push({_id:a,name:r})})),e},versionQuery(){const{appid:e,uni_platform:a}=this.query;return t.stringifyQuery({appid:e,uni_platform:a})},channelQuery(){const{appid:e,platform_id:a}=this.query;return t.stringifyQuery({appid:e,platform_id:a})}},created(){this.debounceGet=t.debounce((()=>{this.getAllData(this.query)}),300)},watch:{query:{deep:!0,handler(e){this.options.pageCurrent=1,this.debounceGet()}}},methods:{useDatetimePicker(){this.currentDateTab=null},changePlatform(e,t,a,r){this.query.version_id=0,this.query.uni_platform=r.code},changeTimeRange(e,a){this.currentDateTab=a;let r,i;r=t.getTimeOfSomeDayAgo(e),i=e?t.getTimeOfSomeDayAgo(0)-1:t.getTimeOfSomeDayAgo(0)+864e5-1,this.query.start_time=[r,i]},changePageCurrent(e){this.options.pageCurrent=e.current,this.getChartData(this.query)},changePageSize(e){const{value:t}=e.detail;this.options.pageCurrent=1,this.options.pageSizeIndex=t,this.getChartData(this.query)},changeChartTab(e,t,a){this.tabIndex=t,this.getChartData(this.query,e,a)},getAllData(e){e.appid?(this.errorMessage="",this.getPanelData(),this.getChartData(e)):this.errorMessage="请先选择应用"},getDays(){if(!this.query.start_time.length)return!0;const[e,t]=this.query.start_time;return t-e>=864e5},getPanelData(){const{appid:r,platform_id:i,version_id:s}=this.query,o=t.stringifyQuery({appid:r,platform_id:i,version_id:s,start_time:[t.getTimeOfSomeDayAgo(1),(new Date).getTime()]});e.er.database().collection(this.tableName).where(o).field(`${t.stringifyField(a.fieldsMap)},dimension,stat_date`).groupBy("stat_date, dimension").groupField(t.stringifyGroupField(a.fieldsMap)).orderBy("stat_date","desc").get().then((e=>{const r=e.result.data,i=r.find((e=>e.stat_date===t.parseDateTime(t.getTimeOfSomeDayAgo(0),"","")))||{};i.total_users=0;const s=r.find((e=>"day"===e.dimension&&e.stat_date===t.parseDateTime(t.getTimeOfSomeDayAgo(1),"","")));this.panelData=[],this.panelData=t.mapfields(a.fieldsMap,i),this.panelData.map((e=>{t.mapfields(a.fieldsMap,s,e,"","contrast")})),t.getFieldTotal.call(this,o,"total_users")}))},getChartData(r,i=this.chartTabs[this.tabIndex]._id,s=this.chartTabs[this.tabIndex].name){this.options;const o=this.currentDateTab,n=t.getTimeOfSomeDayAgo(o),l=864e5;let d;if(!this.getDays()){const e=n-l,t=n+l-1;r=JSON.parse(JSON.stringify(r)),d=r.start_time=[e,t]}r=t.stringifyQuery(r,!0,["uni_platform"]);e.er.database().collection(this.tableName).where(r).field(`${t.stringifyField(a.fieldsMap,i)}, start_time`).groupBy("start_time").groupField(t.stringifyGroupField(a.fieldsMap,i)).orderBy("start_time","asc").get({getCount:!0}).then((e=>{const{count:r,data:o}=e.result,l={categories:[],series:[{name:s,data:[]}]};let p=a.fieldsMap.filter((e=>e.field===i));if(p=JSON.parse(JSON.stringify(p)),delete p[0].value,p[0].formatter="",this.getDays())for(const a of o){t.mapfields(p,a,a);const e=t.formatDate(a.start_time,"day");let r=Number(a[i]);l.series[0].data.push(r),l.categories.push(e)}else{const[e,a]=d,r=l.series[1]={name:t.formatDate(e),data:[]},s=l.series[0]={name:t.formatDate(a),data:[]};for(let d=0;d<24;++d){const e=d<10?"0"+d:d,a=`${e}:00 ~ ${e}:59`;l.categories.push(a),r.data[d]=0,s.data[d]=0,o.forEach((e=>{t.mapfields(p,e,e);let a=Number(e[i]);const o=new Date(e.start_time);e.start_time<n?o.getHours()===d&&(r.data[d]=a):o.getHours()===d&&(s.data[d]=a)}))}}this.chartData=l})).catch((e=>{console.error(e)})).finally((()=>{}))},getAppAccessTimes(t){return e.er.database().collection(this.tableName).where(t).groupBy("appid").groupField("sum(page_visit_count) as total_app_access").get()},navTo(t){t&&e.index.navigateTo({url:t})}}};if(!Array){(e.resolveComponent("uni-stat-breadcrumb")+e.resolveComponent("uni-data-select")+e.resolveComponent("uni-stat-tabs")+e.resolveComponent("uni-datetime-picker")+e.resolveComponent("uni-stat-panel")+e.resolveComponent("qiun-data-charts")+e.resolveComponent("fix-window"))()}Math||((()=>"../../../../components/uni-stat-breadcrumb/uni-stat-breadcrumb.js")+(()=>"../../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js")+(()=>"../../../../components/uni-stat-tabs/uni-stat-tabs.js")+(()=>"../../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js")+(()=>"../../../../components/uni-stat-panel/uni-stat-panel.js")+(()=>"../../../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js")+(()=>"../../../../components/fix-window/fix-window.js"))();const s=e._export_sfc(i,[["render",function(t,a,r,i,s,o){return e.e({a:e.o((e=>s.query.appid=e)),b:e.p({collection:"opendb-app-list",field:"appid as value, name as text",orderby:"text asc",defItem:1,label:"应用选择",clear:!1,modelValue:s.query.appid}),c:e.o((e=>s.query.version_id=e)),d:e.p({collection:"opendb-app-versions",where:o.versionQuery,field:"_id as value, version as text, uni_platform as label, create_date as date",format:"{label} - {text}",orderby:"date desc",label:"版本选择",modelValue:s.query.version_id}),e:e.o(o.changeTimeRange),f:e.p({label:"日期选择",current:s.currentDateTab,mode:"date",today:!0}),g:s.currentDateTab<0&&s.query.start_time.length?1:"",h:e.o(o.useDatetimePicker),i:e.o((e=>s.query.start_time=e)),j:e.p({type:"datetimerange",end:(new Date).getTime(),returnType:"timestamp",clearIcon:!1,modelValue:s.query.start_time}),k:e.o(o.changePlatform),l:e.o((e=>s.query.platform_id=e)),m:e.p({label:"平台选择",type:"boldLine",mode:"platform",modelValue:s.query.platform_id}),n:s.query.platform_id&&-1===s.query.platform_id.indexOf("==")},s.query.platform_id&&-1===s.query.platform_id.indexOf("==")?{o:e.sr("version-select","e898972c-6"),p:e.o((e=>s.query.channel_id=e)),q:e.p({collection:"uni-stat-app-channels",where:o.channelQuery,field:"_id as value, channel_name as text",orderby:"text asc",label:"渠道/场景值选择",modelValue:s.query.channel_id})}:{},{r:e.p({items:s.panelData,contrast:!0}),s:e.o(o.changeChartTab),t:e.o((e=>s.chartTab=e)),v:e.p({type:"box",tabs:o.chartTabs,modelValue:s.chartTab}),w:e.p({type:"area",chartData:s.chartData,eopts:s.eopts,echartsH5:!0,echartsApp:!0,tooltipFormat:"tooltipCustom",errorMessage:s.errorMessage})})}]]);wx.createPage(s);
