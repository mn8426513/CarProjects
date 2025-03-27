"use strict";const e=require("../../../../common/vendor.js"),t=require("../../../../js_sdk/uni-stat/util.js"),a=require("./fieldsMap.js"),i={data:()=>({fieldsMap:a.fieldsMap,query:{appid:"",platform_id:"",uni_platform:"",version_id:"",channel_id:"",start_time:[]},loading:!1,currentDateTab:1,tableData:[],panelData:a.fieldsMap.filter((e=>e.hasOwnProperty("value"))),chartData:{},type:"visit_depth_data",types:[{_id:"visit_depth_data",name:"访问页数"},{_id:"duration_data",name:"访问时长"}],field:"visit_users",fields:[{_id:"visit_users",name:"访问人数"},{_id:"visit_times",name:"访问次数"}],options:{visit_depth_data:{prefix:"p",title:"页",value:[1,2,3,4,5,10]},duration_data:{prefix:"s",title:"秒",value:[0,3,6,11,21,31,51,100]}},channelData:[],errorMessage:""}),computed:{fieldName(){return this.fields.forEach((e=>{if(e._id===this.field)return e.name}))},channelQuery(){const e=this.query.platform_id;return t.stringifyQuery({platform_id:e})},versionQuery(){const{appid:e,uni_platform:a}=this.query;return t.stringifyQuery({appid:e,uni_platform:a})}},created(){this.debounceGet=t.debounce((()=>{this.getAllData(this.query)}),300),this.getChannelData()},watch:{query:{deep:!0,handler(e){this.debounceGet()}},type(){this.debounceGet()},field(){this.debounceGet()}},methods:{useDatetimePicker(){this.currentDateTab=-1},changeAppid(e){this.getChannelData(e,!1)},changePlatform(e,t,a,i){this.getChannelData(null,e),this.query.version_id=0,this.query.uni_platform=i.code},changeTimeRange(e,a){this.currentDateTab=a;const i=t.getTimeOfSomeDayAgo(e),s=t.getTimeOfSomeDayAgo(0)-1;this.query.start_time=[i,s]},createStr(e,t="visit_depth_data"){const a=e.length,i=this.options[t].prefix;return this.options[t].value.map((s=>e.map((e=>`sum(${t}.${e}.${i+"_"+s}) as ${a>1?e+"_"+i+"_"+s:i+"_"+s}`)))).join()},parseChars(e){e=e.split("_");const t=this.options[this.type];let a=t.title;return t.value.forEach(((i,s)=>{const r=t.value[s+1];i===Number(e[e.length-1])&&(a=r?i+1===r?i+a:i+"-"+(r-1)+a:i+"+"+a)})),a},getAllData(e){e.appid?(this.errorMessage="",this.getChartData(e,this.field,this.fieldName),this.getTabelData(e)):this.errorMessage="请先选择应用"},getChartData(a,i=this.field,s=this.fields.find((e=>e._id===this.field)).name){a=t.stringifyQuery(a,null,["uni_platform"]);const r=this.createStr([i],this.type);e.er.database().collection("uni-stat-loyalty-result").where(a).groupBy("appid").groupField(r).orderBy("start_time","asc").get({getCount:!0}).then((e=>{let{count:t,data:a}=e.result;a=a[0];const i={series:[{data:[]}]};for(const s in a)if("appid"!==s){const e=this.parseChars(s),t=a[s];i.series[0].data.push({name:e,value:t})}this.chartData=i})).catch((e=>{console.error(e)})).finally((()=>{this.loading=!1}))},getTabelData(i){i=t.stringifyQuery(i,null,["uni_platform"]);const s=this.createStr(["visit_users","visit_times"],this.type);this.fieldsMap[0].title=this.types.find((e=>e._id===this.type)).name,this.loading=!0;e.er.database().collection("uni-stat-loyalty-result").where(i).groupBy("appid").groupField(s).orderBy("start_time","asc").get({getCount:!0}).then((e=>{const{count:i,data:s}=e.result,r=this.type,n=[];let o=this.options[r].prefix;o=`_${o}_`;for(const t of s)for(const e in t)if("appid"!==e){const a={},i=e.split(o);a.name=i[1],a[i[0]]=t[e],n.push(a)}const l=[],d={},p=(e,t)=>e+t;let u=n.filter((e=>e.visit_users)).map((e=>e.visit_users));u=u.length?u.reduce(p):0;let c=n.filter((e=>e.visit_times)).map((e=>e.visit_times));c=c.length?c.reduce(p):0,d.visit_times=c,d.visit_users=u,this.options[r].value.forEach((e=>{const t={};t.name=e+"p",n.forEach((a=>{if(Number(a.name)===e)for(const e in a)e!==name&&(t[e]=a[e],t["total_"+e]=d[e])})),t.name=this.parseChars(String(e)),l.push(t)}));for(const h of l)t.mapfields(a.fieldsMap,h,h);this.tableData=[],this.tableData=l})).catch((e=>{console.error(e)})).finally((()=>{this.loading=!1}))},getChannelData(t,a){this.query.channel_id="";const i=e.er.database(),s={};(t=t||this.query.appid)&&(s.appid=t),(a=a||this.query.platform_id)&&(s.platform_id=a);let r=i.collection("uni-stat-app-platforms").field("_id, name").getTemp(),n=i.collection("uni-stat-app-channels").where(s).field("_id, channel_name, create_time, platform_id").getTemp();i.collection(n,r).orderBy("platform_id","asc").get().then((e=>{let t=e.result.data,a=[];if(t.length>0){let e;for(let i in t)e=t[i].channel_name?t[i].channel_name:"默认",t[i].platform_id.length>0&&(e=t[i].platform_id[0].name+"-"+e),a.push({value:t[i]._id,text:e})}this.channelData=a})).catch((e=>{console.error(e)})).finally((()=>{}))}}};if(!Array){(e.resolveComponent("uni-stat-breadcrumb")+e.resolveComponent("uni-data-select")+e.resolveComponent("uni-stat-tabs")+e.resolveComponent("uni-datetime-picker")+e.resolveComponent("qiun-data-charts")+e.resolveComponent("uni-stat-table")+e.resolveComponent("fix-window"))()}Math||((()=>"../../../../components/uni-stat-breadcrumb/uni-stat-breadcrumb.js")+(()=>"../../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js")+(()=>"../../../../components/uni-stat-tabs/uni-stat-tabs.js")+(()=>"../../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js")+(()=>"../../../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js")+(()=>"../../../../components/uni-stat-table/uni-stat-table.js")+(()=>"../../../../components/fix-window/fix-window.js"))();const s=e._export_sfc(i,[["render",function(t,a,i,s,r,n){return e.e({a:e.o(n.changeAppid),b:e.o((e=>r.query.appid=e)),c:e.p({collection:"opendb-app-list",field:"appid as value, name as text",orderby:"text asc",defItem:1,label:"应用选择",clear:!1,modelValue:r.query.appid}),d:e.o((e=>r.query.version_id=e)),e:e.p({collection:"opendb-app-versions",where:n.versionQuery,field:"_id as value, version as text, uni_platform as label, create_date as date",format:"{label} - {text}",orderby:"date desc",label:"版本选择",modelValue:r.query.version_id}),f:e.o(n.changeTimeRange),g:e.p({label:"日期选择",current:r.currentDateTab,mode:"date"}),h:r.currentDateTab<0&&r.query.start_time.length?1:"",i:e.o(n.useDatetimePicker),j:e.o((e=>r.query.start_time=e)),k:e.p({type:"datetimerange",end:(new Date).getTime(),returnType:"timestamp",clearIcon:!1,modelValue:r.query.start_time}),l:e.o(n.changePlatform),m:e.o((e=>r.query.platform_id=e)),n:e.p({label:"平台选择",type:"boldLine",mode:"platform",modelValue:r.query.platform_id}),o:r.query.platform_id&&-1===r.query.platform_id.indexOf("==")},r.query.platform_id&&-1===r.query.platform_id.indexOf("==")?{p:e.sr("version-select","1426950a-6"),q:e.o((e=>r.query.channel_id=e)),r:e.p({collection:"uni-stat-app-channels",where:n.channelQuery,field:"_id as value, channel_name as text",orderby:"text asc",label:"渠道/场景值选择",modelValue:r.query.channel_id})}:{},{s:e.o((e=>r.type=e)),t:e.p({type:"boldLine",tabs:r.types,modelValue:r.type}),v:e.p({type:"pie",chartData:r.chartData,echartsH5:!0,echartsApp:!0,errorMessage:r.errorMessage}),w:e.p({data:r.tableData,filedsMap:r.fieldsMap,loading:r.loading})})}]]);wx.createPage(s);
