"use strict";const i=require("./util.js"),e=require("./error.js"),r=require("./request.js"),t=require("./fetchMock.js"),s=require("./permission.js"),n=require("./interceptor.js"),u=require("../uni-id-pages/store.js"),o={install(o){i.initUtil(o),e.initError(o),u.initUniIdPageStore(o),r.initRequest(o),t.initFetch(o),s.initPermission(o),n.initInterceptor()}};exports.plugin=o;
