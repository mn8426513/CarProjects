"use strict";const t=require("../../uni_modules/uni-dateformat/components/uni-dateformat/date-format.js");function o(t){const o=["B","KB","MB","GB","TB"];if(0==t)return"n/a";const e=parseInt(Math.floor(Math.log(t)/Math.log(1024)));return 0==e?t+" "+o[e]:(t/Math.pow(1024,e)).toFixed(1)+" "+o[e]}exports.initUtil=function(e){e.config.globalProperties.$formatDate=t.formatDate,e.config.globalProperties.$formatBytes=o};
