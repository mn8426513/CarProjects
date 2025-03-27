"use strict";const e=require("../../../common/vendor.js"),t={data:()=>({searchVal:"",tableData:[],pageSize:10,pageCurrent:1,total:0,loading:!1}),onLoad(){this.selectedIndexs=[],this.getData(1)},methods:{navigateTo(t,o){e.index.navigateTo({url:t,events:{refreshData:()=>{this.loadTags(),this.loadData(o)}}})},selectionChange(e){this.selectedIndexs=e.detail.index},batchDeleteTable(){let t=this.selectedItems();if(t&&t.length){const o=t.map((e=>e._id));e.index.showModal({title:"提示",content:"确定要删除选中的数据吗？",success:async t=>{t.confirm&&this.deleteBatchGoodsData({success:t=>{e.index.showToast({title:"删除成功"}),this.tableData=this.tableData.filter((e=>!o.includes(e._id)))},fail:t=>{e.index.showToast({title:t.result.message||"删除失败",icon:"error"})},_ids:o})}})}else e.index.showModal({content:"请选择需要删除的车",showCancel:!1})},selectedItems(){return this.selectedIndexs&&this.tableData?this.selectedIndexs.map((e=>this.tableData[e])):[]},deleteItem(t){e.index.showModal({title:"提示",content:"确定要删除本条数据吗？",success:async o=>{o.confirm&&this.deleteGoodsData({_id:t,success:o=>{e.index.showToast({title:"删除成功"}),this.tableData=this.tableData.filter((e=>e._id!==t))},fail:t=>{e.index.showToast({title:t.result.message||"删除失败",icon:"error"})}})}})},async deleteGoodsData(t){const{success:o,fail:s,_id:a}=t;try{const a={_id:t._id};console.log(a);const n=await e.er.callFunction({name:"deleteGoodsData",data:{action:"delete",tableName:"opendb-mall-goods",data:a}});console.log(n),console.log(n.header["x-serverless-http-status"]),console.log(n.result.code),console.log(n.success),console.log(n.result.message),n.success&&!n.result.code&&"200"==n.header["x-serverless-http-status"]?setTimeout((()=>{console.log("delete success"),o(n),"function"==typeof o&&o(n)}),500):"function"==typeof s&&s(n)}catch(n){"function"==typeof s&&s(result)}},async deleteBatchGoodsData(t){const{success:o,fail:s,_ids:a}=t;try{const a={_ids:t._ids};console.log(a);const n=await e.er.callFunction({name:"deleteGoodsData",data:{action:"deleteBatch",tableName:"opendb-mall-goods",data:a}});console.log(n),console.log(n.header["x-serverless-http-status"]),console.log(n.result.code),console.log(n.success),console.log(n.result.message),n.success&&!n.result.code&&"200"==n.header["x-serverless-http-status"]?setTimeout((()=>{console.log("deleteBatch success"),o(n),"function"==typeof o&&o(n)}),500):"function"==typeof s&&s(n)}catch(n){"function"==typeof s&&s(result)}},change(e){this.getData(e.current)},search(){this.getData(1,this.searchVal)},prviewImage(t,o){let s=[];s.push(t),console.log(s),e.index.previewImage({urls:s,current:0})},getData(e,t=""){this.loading=!0,this.pageCurrent=e,this.request({pageSize:this.pageSize,pageCurrent:e,value:t,success:e=>{this.tableData=e.data,this.total=e.total,this.loading=!1}})},request(t){const{pageSize:o,pageCurrent:s,success:a,value:n}=t;e.er.callFunction({name:"getGoodsData"}).then((e=>{if(e.result&&!e.result.errorCode){let t=e.result.length,l=e.result.filter(((e,t)=>{const a=t-(s-1)*o;return a<o&&a>=0}));n&&(l=[],e.result.forEach((e=>{-1!==e.goods_name.indexOf(n)&&l.push(e)})),t=l.length),setTimeout((()=>{"function"==typeof a&&a({data:l,total:t})}),500)}else console.error("获取数据失败：",e.result.errorMessage)})).catch((e=>{console.error("调用云函数失败：",e)}))}}};if(!Array){(e.resolveComponent("uni-th")+e.resolveComponent("uni-tr")+e.resolveComponent("uni-td")+e.resolveComponent("uni-table")+e.resolveComponent("uni-pagination")+e.resolveComponent("fix-window"))()}Math||((()=>"../../../uni_modules/uni-table/components/uni-th/uni-th.js")+(()=>"../../../uni_modules/uni-table/components/uni-tr/uni-tr.js")+(()=>"../../../uni_modules/uni-table/components/uni-td/uni-td.js")+(()=>"../../../uni_modules/uni-table/components/uni-table/uni-table.js")+(()=>"../../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js")+(()=>"../../../components/fix-window/fix-window.js"))();const o=e._export_sfc(t,[["render",function(t,o,s,a,n,l){return{a:e.t(t.$t("demo.table.title")),b:e.o(((...e)=>l.search&&l.search(...e))),c:t.$t("common.placeholder.query"),d:n.searchVal,e:e.o((e=>n.searchVal=e.detail.value)),f:e.t(t.$t("common.button.search")),g:e.o(((...e)=>l.search&&l.search(...e))),h:e.t(t.$t("common.button.add")),i:e.o((e=>l.navigateTo("./add"))),j:e.t(t.$t("common.button.batchDelete")),k:e.o(((...e)=>l.batchDeleteTable&&l.batchDeleteTable(...e))),l:e.p({width:"100",align:"center"}),m:e.p({width:"100",align:"center"}),n:e.p({width:"100",align:"center"}),o:e.p({width:"100",align:"center"}),p:e.p({width:"80",align:"center"}),q:e.p({width:"80",align:"center"}),r:e.p({width:"80",align:"center"}),s:e.p({width:"60",align:"center"}),t:e.p({width:"120",align:"center"}),v:e.f(n.tableData,((t,o,s)=>({a:e.t(t.add_date),b:"c2b3b460-12-"+s+",c2b3b460-11-"+s,c:e.t(t.goods_name),d:"c2b3b460-13-"+s+",c2b3b460-11-"+s,e:e.t(t.goods_brand),f:"c2b3b460-14-"+s+",c2b3b460-11-"+s,g:e.t(t.goods_pro_data),h:"c2b3b460-15-"+s+",c2b3b460-11-"+s,i:e.t(t.goods_alreadKilometer),j:"c2b3b460-16-"+s+",c2b3b460-11-"+s,k:"c2b3b460-17-"+s+",c2b3b460-11-"+s,l:e.t(t.shop_name),m:"c2b3b460-18-"+s+",c2b3b460-11-"+s,n:t.goods_thumb,o:e.o((e=>l.prviewImage(t.goods_thumb)),o),p:"c2b3b460-19-"+s+",c2b3b460-11-"+s,q:e.o((e=>l.deleteItem(t._id)),o),r:"c2b3b460-20-"+s+",c2b3b460-11-"+s,s:o,t:"c2b3b460-11-"+s+",c2b3b460-0"}))),w:e.t(t.$t("common.button.delete")),x:e.o(l.selectionChange),y:e.p({loading:n.loading,border:!0,stripe:!0,type:"selection",emptyText:t.$t("common.empty")}),z:e.o(l.change),A:e.p({"show-icon":!0,"page-size":n.pageSize,current:n.pageCurrent,total:n.total})}}]]);wx.createPage(o);
