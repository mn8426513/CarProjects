"use strict";const e=require("../../../../common/vendor.js"),t={props:{localdata:{type:[Array,Object],default:()=>[]},spaceInfo:{type:Object,default:()=>({})},collection:{type:String,default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:500},getcount:{type:[Boolean,String],default:!1},getone:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String],default:!1},manual:{type:Boolean,default:!1},value:{type:[Array,String,Number],default:()=>[]},modelValue:{type:[Array,String,Number],default:()=>[]},preload:{type:Boolean,default:!1},stepSearh:{type:Boolean,default:!0},selfField:{type:String,default:""},parentField:{type:String,default:""},multiple:{type:Boolean,default:!1},map:{type:Object,default:()=>({text:"text",value:"value"})}},data(){return{loading:!1,errorMessage:"",loadMore:{contentdown:"",contentrefresh:"",contentnomore:""},dataList:[],selected:[],selectedIndex:0,page:{current:this.pageCurrent,size:this.pageSize,count:0}}},computed:{isLocalData(){return!this.collection.length},isCloudData(){return this.collection.length>0},isCloudDataList(){return this.isCloudData&&!this.parentField&&!this.selfField},isCloudDataTree(){return this.isCloudData&&this.parentField&&this.selfField},dataValue(){return(Array.isArray(this.modelValue)?this.modelValue.length>0:null!==this.modelValue||void 0!==this.modelValue)?this.modelValue:this.value},hasValue(){return"number"==typeof this.dataValue||null!=this.dataValue&&this.dataValue.length>0}},created(){this.$watch((()=>{var e=[];return["pageCurrent","pageSize","spaceInfo","value","modelValue","localdata","collection","action","field","orderby","where","getont","getcount","gettree"].forEach((t=>{e.push(this[t])})),e}),((e,t)=>{for(let a=2;a<e.length&&e[a]==t[a];a++);e[0]!=t[0]&&(this.page.current=this.pageCurrent),this.page.size=this.pageSize,this.onPropsChange()})),this._treeData=[]},methods:{onPropsChange(){this._treeData=[]},async loadData(){this.isLocalData?this.loadLocalData():this.isCloudDataList?this.loadCloudDataList():this.isCloudDataTree&&this.loadCloudDataTree()},async loadLocalData(){this._treeData=[],this._extractTree(this.localdata,this._treeData);let e=this.dataValue;void 0!==e&&(Array.isArray(e)&&(e=e[e.length-1],"object"==typeof e&&e[this.map.value]&&(e=e[this.map.value])),this.selected=this._findNodePath(e,this.localdata))},async loadCloudDataList(){if(!this.loading){this.loading=!0;try{let e=(await this.getCommand()).result.data;this._treeData=e,this._updateBindData(),this._updateSelected(),this.onDataChange()}catch(e){this.errorMessage=e}finally{this.loading=!1}}},async loadCloudDataTree(){if(!this.loading){this.loading=!0;try{let e={field:this._cloudDataPostField(),where:this._cloudDataTreeWhere()};this.gettree&&(e.startwith=`${this.selfField}=='${this.dataValue}'`);let t=(await this.getCommand(e)).result.data;this._treeData=t,this._updateBindData(),this._updateSelected(),this.onDataChange()}catch(e){this.errorMessage=e}finally{this.loading=!1}}},async loadCloudDataNode(e){if(!this.loading){this.loading=!0;try{let t={field:this._cloudDataPostField(),where:this._cloudDataNodeWhere()};e((await this.getCommand(t)).result.data)}catch(t){this.errorMessage=t}finally{this.loading=!1}}},getCloudDataValue(){return this.isCloudDataList?this.getCloudDataListValue():this.isCloudDataTree?this.getCloudDataTreeValue():void 0},getCloudDataListValue(){let e=[],t=this._getForeignKeyByField();return t&&e.push(`${t} == '${this.dataValue}'`),e=e.join(" || "),this.where&&(e=`(${this.where}) && (${e})`),this.getCommand({field:this._cloudDataPostField(),where:e}).then((e=>(this.selected=e.result.data,e.result.data)))},getCloudDataTreeValue(){return this.getCommand({field:this._cloudDataPostField(),getTreePath:{startWith:`${this.selfField}=='${this.dataValue}'`}}).then((e=>{let t=[];return this._extractTreePath(e.result.data,t),this.selected=t,t}))},getCommand(t={}){let a=e.er.database(this.spaceInfo);const l=t.action||this.action;l&&(a=a.action(l));const i=t.collection||this.collection;a=a.collection(i);const s=t.where||this.where;s&&Object.keys(s).length&&(a=a.where(s));const r=t.field||this.field;r&&(a=a.field(r));const h=t.orderby||this.orderby;h&&(a=a.orderBy(h));const d=void 0!==t.pageCurrent?t.pageCurrent:this.page.current,n=void 0!==t.pageSize?t.pageSize:this.page.size,o={getCount:void 0!==t.getcount?t.getcount:this.getcount,getTree:void 0!==t.gettree?t.gettree:this.gettree};return t.getTreePath&&(o.getTreePath=t.getTreePath),a=a.skip(n*(d-1)).limit(n).get(o),a},_cloudDataPostField(){let e=[this.field];return this.parentField&&e.push(`${this.parentField} as parent_value`),e.join(",")},_cloudDataTreeWhere(){let e=[],t=this.selected,a=this.parentField;if(a&&e.push(`${a} == null || ${a} == ""`),t.length)for(var l=0;l<t.length-1;l++)e.push(`${a} == '${t[l].value}'`);let i=[];return this.where&&i.push(`(${this.where})`),e.length&&i.push(`(${e.join(" || ")})`),i.join(" && ")},_cloudDataNodeWhere(){let e=[],t=this.selected;return t.length&&e.push(`${this.parentField} == '${t[t.length-1].value}'`),e=e.join(" || "),this.where?`(${this.where}) && (${e})`:e},_getWhereByForeignKey(){let e=[],t=this._getForeignKeyByField();return t&&e.push(`${t} == '${this.dataValue}'`),this.where?`(${this.where}) && (${e.join(" || ")})`:e.join(" || ")},_getForeignKeyByField(){let e=this.field.split(","),t=null;for(let a=0;a<e.length;a++){const l=e[a].split("as");if(!(l.length<2)&&"value"===l[1].trim()){t=l[0].trim();break}}return t},_updateBindData(e){const{dataList:t,hasNodes:a}=this._filterData(this._treeData,this.selected);let l=!1===this._stepSearh&&!a;return e&&(e.isleaf=l),this.dataList=t,this.selectedIndex=t.length-1,!l&&this.selected.length<t.length&&this.selected.push({value:null,text:"请选择"}),{isleaf:l,hasNodes:a}},_updateSelected(){let e=this.dataList,t=this.selected,a=this.map.text,l=this.map.value;for(let i=0;i<t.length;i++){let s=t[i].value,r=e[i];for(let e=0;e<r.length;e++){let h=r[e];if(h[l]===s){t[i].text=h[a];break}}}},_filterData(e,t){let a=[],l=!0;a.push(e.filter((e=>null===e.parent_value||void 0===e.parent_value||""===e.parent_value)));for(let i=0;i<t.length;i++){let s=t[i].value,r=e.filter((e=>e.parent_value===s));r.length?a.push(r):l=!1}return{dataList:a,hasNodes:l}},_extractTree(e,t,a){let l=this.map.value;for(let i=0;i<e.length;i++){let s=e[i],r={};for(let e in s)"children"!==e&&(r[e]=s[e]);null!=a&&""!==a&&(r.parent_value=a),t.push(r);let h=s.children;h&&this._extractTree(h,t,s[l])}},_extractTreePath(e,t){for(let a=0;a<e.length;a++){let l=e[a],i={};for(let e in l)"children"!==e&&(i[e]=l[e]);t.push(i);let s=l.children;s&&this._extractTreePath(s,t)}},_findNodePath(e,t,a=[]){let l=this.map.text,i=this.map.value;for(let s=0;s<t.length;s++){let r=t[s],h=r.children,d=r[l],n=r[i];if(a.push({value:n,text:d}),n===e)return a;if(h){const t=this._findNodePath(e,h,a);if(t.length)return t}a.pop()}return[]}}};exports.dataPicker=t;
