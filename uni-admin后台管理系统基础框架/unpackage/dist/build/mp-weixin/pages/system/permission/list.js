"use strict";const e=require("../../../common/vendor.js"),t=require("../../../js_sdk/validator/uni-id-permissions.js"),n=e.er.database(),a=["permission_id","permission_name"],i={ascending:"asc",descending:"desc"},o={data:()=>({query:"",where:"",orderby:"create_date desc",orderByFieldName:"",selectedIndexs:[],options:{pageSize:20,pageCurrent:1,filterData:{},...t.enumConverter},imageStyles:{width:64,height:64},exportExcel:{filename:"uni-id-permissions.xls",type:"xls",fields:{"权限ID":"permission_id","权限名称":"permission_name","备注":"comment"}},exportExcelData:[]}),onLoad(){this._filter={}},onReady(){this.$refs.udb.loadData()},methods:{onqueryload(e){this.exportExcelData=e},changeSize(e){this.options.pageSize=e,this.options.pageCurrent=1,this.$nextTick((()=>{this.loadData()}))},getWhere(){const e=this.query.trim();if(!e)return"";const t=new RegExp(e,"i");return a.map((e=>t+".test("+e+")")).join(" || ")},search(){const e=this.getWhere();this.where=e,this.$nextTick((()=>{this.loadData()}))},loadData(e=!0){this.$refs.udb.loadData({clear:e})},onPageChanged(e){this.selectedIndexs.length=0,this.$refs.table.clearSelection(),this.$refs.udb.loadData({current:e.current})},navigateTo(t,n){e.index.navigateTo({url:t,events:{refreshData:()=>{this.loadData(n)}}})},selectedItems(){let e=this.$refs.udb.dataList;return this.selectedIndexs.map((t=>e[t]._id))},delTable(){this.$refs.udb.remove(this.selectedItems(),{success:e=>{this.$refs.table.clearSelection()}})},selectionChange(e){this.selectedIndexs=e.detail.index},confirmDelete(e){this.$refs.udb.remove(e,{success:e=>{this.$refs.table.clearSelection()}})},sortChange(e,t){this.orderByFieldName=t,e.order?this.orderby=t+" "+i[e.order]:this.orderby="",this.$refs.table.clearSelection(),this.$nextTick((()=>{this.$refs.udb.loadData()}))},filterChange(e,a){this._filter[a]={type:e.filterType,value:e.filter};let i=t.filterToWhere(this._filter,n.command);Object.keys(i).length?this.where=i:this.where="",this.$nextTick((()=>{this.$refs.udb.loadData()}))}}};if(!Array){(e.resolveComponent("uni-stat-breadcrumb")+e.resolveComponent("uni-th")+e.resolveComponent("uni-tr")+e.resolveComponent("uni-td")+e.resolveComponent("uni-dateformat")+e.resolveComponent("uni-table")+e.resolveComponent("uni-pagination")+e.resolveComponent("unicloud-db")+e.resolveComponent("fix-window"))()}Math||((()=>"../../../components/uni-stat-breadcrumb/uni-stat-breadcrumb.js")+(()=>"../../../uni_modules/uni-table/components/uni-th/uni-th.js")+(()=>"../../../uni_modules/uni-table/components/uni-tr/uni-tr.js")+(()=>"../../../uni_modules/uni-table/components/uni-td/uni-td.js")+(()=>"../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js")+(()=>"../../../uni_modules/uni-table/components/uni-table/uni-table.js")+(()=>"../../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js")+(()=>"../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js")+(()=>"../../../components/fix-window/fix-window.js"))();const s=e._export_sfc(o,[["render",function(t,n,a,i,o,s){return{a:e.o(((...e)=>s.search&&s.search(...e))),b:t.$t("common.placeholder.query"),c:o.query,d:e.o((e=>o.query=e.detail.value)),e:e.t(t.$t("common.button.search")),f:e.o(((...e)=>s.search&&s.search(...e))),g:e.t(t.$t("common.button.add")),h:e.o((e=>s.navigateTo("./add"))),i:e.t(t.$t("common.button.batchDelete")),j:!o.selectedIndexs.length,k:e.o(((...e)=>s.delTable&&s.delTable(...e))),l:e.w((({data:n,pagination:a,loading:i,error:o,options:r},d,l)=>({a:"7a7b4eed-4-"+l+",7a7b4eed-3-"+l,b:"7a7b4eed-5-"+l+",7a7b4eed-3-"+l,c:"7a7b4eed-6-"+l+",7a7b4eed-3-"+l,d:"7a7b4eed-7-"+l+",7a7b4eed-3-"+l,e:"7a7b4eed-8-"+l+",7a7b4eed-3-"+l,f:"7a7b4eed-3-"+l+",7a7b4eed-2-"+l,g:e.f(n,((t,n,a)=>({a:e.t(t.permission_id),b:"7a7b4eed-10-"+l+"-"+a+",7a7b4eed-9-"+l+"-"+a,c:e.t(t.permission_name),d:"7a7b4eed-11-"+l+"-"+a+",7a7b4eed-9-"+l+"-"+a,e:e.t(t.comment),f:"7a7b4eed-12-"+l+"-"+a+",7a7b4eed-9-"+l+"-"+a,g:"7a7b4eed-14-"+l+"-"+a+",7a7b4eed-13-"+l+"-"+a,h:e.p({threshold:[0,0],date:t.create_date}),i:"7a7b4eed-13-"+l+"-"+a+",7a7b4eed-9-"+l+"-"+a,j:e.o((e=>s.navigateTo("./edit?id="+t._id,!1)),n),k:e.o((e=>s.confirmDelete(t._id)),n),l:"7a7b4eed-15-"+l+"-"+a+",7a7b4eed-9-"+l+"-"+a,m:n,n:"7a7b4eed-9-"+l+"-"+a+",7a7b4eed-2-"+l}))),h:e.sr("table","7a7b4eed-2-"+l+",7a7b4eed-1"),i:"7a7b4eed-2-"+l+",7a7b4eed-1",j:e.p({loading:i,emptyText:o.message||t.$t("common.empty"),border:!0,stripe:!0,type:"selection"}),k:"7a7b4eed-16-"+l+",7a7b4eed-1",l:e.o((e=>a.current=e)),m:e.p({"show-icon":!0,"show-page-size":!0,"page-size":a.size,total:a.count,modelValue:a.current}),n:l,o:d})),{name:"d",path:"l",vueId:"7a7b4eed-1"}),m:e.o((e=>s.filterChange(e,"permission_id"))),n:e.o((e=>s.sortChange(e,"permission_id"))),o:e.p({align:"center","filter-type":"search",sortable:!0}),p:e.o((e=>s.filterChange(e,"permission_name"))),q:e.o((e=>s.sortChange(e,"permission_name"))),r:e.p({align:"center","filter-type":"search",sortable:!0}),s:e.o((e=>s.filterChange(e,"comment"))),t:e.o((e=>s.sortChange(e,"comment"))),v:e.p({align:"center","filter-type":"search",sortable:!0}),w:e.o((e=>s.filterChange(e,"create_date"))),x:e.o((e=>s.sortChange(e,"create_date"))),y:e.p({align:"center","filter-type":"timestamp",sortable:!0}),z:e.p({align:"center"}),A:e.p({align:"center"}),B:e.p({align:"center"}),C:e.p({align:"center"}),D:e.p({align:"center"}),E:e.t(t.$t("common.button.edit")),F:e.t(t.$t("common.button.delete")),G:e.p({align:"center"}),H:e.o(s.selectionChange),I:e.o(s.onPageChanged),J:e.o(s.changeSize),K:e.sr("udb","7a7b4eed-1"),L:e.o(s.onqueryload),M:e.p({collection:"uni-id-permissions",field:"permission_id,permission_name,comment,create_date",where:o.where,"page-data":"replace",orderby:o.orderby,getcount:!0,"page-size":o.options.pageSize,"page-current":o.options.pageCurrent,options:o.options,loadtime:"manual"})}}]]);wx.createPage(s);
