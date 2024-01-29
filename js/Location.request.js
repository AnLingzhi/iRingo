(()=>{"use strict";var e,t,s={},a={};function r(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={exports:{}};return s[e](n,n.exports,r),n.exports}t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,r.t=function(s,a){if(1&a&&(s=this(s)),8&a)return s;if("object"==typeof s&&s){if(4&a&&s.__esModule)return s;if(16&a&&"function"==typeof s.then)return s}var n=Object.create(null);r.r(n);var o={};e=e||[null,t({}),t([]),t(t)];for(var i=2&a&&s;"object"==typeof i&&!~e.indexOf(i);i=t(i))Object.getOwnPropertyNames(i).forEach((e=>o[e]=()=>s[e]));return o.default=()=>s,r.d(n,o),n},r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};class n{constructor(e,t){this.name=`${e}, ENV v1.0.0`,this.http=new o(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,t),this.log("",`🏁 ${this.name}, 开始!`)}platform(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.platform()}isQuanX(){return"Quantumult X"===this.platform()}isSurge(){return"Surge"===this.platform()}isLoon(){return"Loon"===this.platform()}isShadowrocket(){return"Shadowrocket"===this.platform()}isStash(){return"Stash"===this.platform()}toObj(e,t=null){try{return JSON.parse(e)}catch{return t}}toStr(e,t=null){try{return JSON.stringify(e)}catch{return t}}getjson(e,t){let s=t;if(this.getdata(e))try{s=JSON.parse(this.getdata(e))}catch{}return s}setjson(e,t){try{return this.setdata(JSON.stringify(e),t)}catch{return!1}}getScript(e){return new Promise((t=>{this.get({url:e},((e,s,a)=>t(a)))}))}runScript(e,t){return new Promise((s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=t&&t.timeout?t.timeout:r;const[n,o]=a.split("@"),i={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:e,mock_type:"cron",timeout:r},headers:{"X-Key":n,Accept:"*/*"},timeout:r};this.post(i,((e,t,a)=>s(a)))})).catch((e=>this.logErr(e)))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const e=this.path.resolve(this.dataFile),t=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(e),a=!s&&this.fs.existsSync(t);if(!s&&!a)return{};{const a=s?e:t;try{return JSON.parse(this.fs.readFileSync(a))}catch(e){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const e=this.path.resolve(this.dataFile),t=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(e),a=!s&&this.fs.existsSync(t),r=JSON.stringify(this.data);s?this.fs.writeFileSync(e,r):a?this.fs.writeFileSync(t,r):this.fs.writeFileSync(e,r)}}lodash_get(e,t,s=void 0){const a=t.replace(/\[(\d+)\]/g,".$1").split(".");let r=e;for(const e of a)if(r=Object(r)[e],void 0===r)return s;return r}lodash_set(e,t,s){return Object(e)!==e||(Array.isArray(t)||(t=t.toString().match(/[^.[\]]+/g)||[]),t.slice(0,-1).reduce(((e,s,a)=>Object(e[s])===e[s]?e[s]:e[s]=Math.abs(t[a+1])>>0==+t[a+1]?[]:{}),e)[t[t.length-1]]=s),e}getdata(e){let t=this.getval(e);if(/^@/.test(e)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(e),r=s?this.getval(s):"";if(r)try{const e=JSON.parse(r);t=e?this.lodash_get(e,a,""):t}catch(e){t=""}}return t}setdata(e,t){let s=!1;if(/^@/.test(t)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(t),n=this.getval(a),o=a?"null"===n?null:n||"{}":"{}";try{const t=JSON.parse(o);this.lodash_set(t,r,e),s=this.setval(JSON.stringify(t),a)}catch(t){const n={};this.lodash_set(n,r,e),s=this.setval(JSON.stringify(n),a)}}else s=this.setval(e,t);return s}getval(e){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(e);case"Quantumult X":return $prefs.valueForKey(e);case"Node.js":return this.data=this.loaddata(),this.data[e];default:return this.data&&this.data[e]||null}}setval(e,t){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(e,t);case"Quantumult X":return $prefs.setValueForKey(e,t);case"Node.js":return this.data=this.loaddata(),this.data[t]=e,this.writedata(),!0;default:return this.data&&this.data[t]||null}}initGotEnv(e){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,e&&(e.headers=e.headers?e.headers:{},void 0===e.headers.Cookie&&void 0===e.cookieJar&&(e.cookieJar=this.ckjar))}get(e,t=(()=>{})){switch(delete e?.headers?.["Content-Length"],delete e?.headers?.["content-length"],this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&this.lodash_set(e,"headers.X-Surge-Skip-Scripting",!1),$httpClient.get(e,((e,s,a)=>{!e&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),t(e,s,a)}));break;case"Quantumult X":this.isNeedRewrite&&this.lodash_set(e,"opts.hints",!1),$task.fetch(e).then((e=>{const{statusCode:s,statusCode:a,headers:r,body:n,bodyBytes:o}=e;t(null,{status:s,statusCode:a,headers:r,body:n,bodyBytes:o},n,o)}),(e=>t(e&&e.error||"UndefinedError")));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(e),this.got(e).on("redirect",((e,t)=>{try{if(e.headers["set-cookie"]){const s=e.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),t.cookieJar=this.ckjar}}catch(e){this.logErr(e)}})).then((e=>{const{statusCode:a,statusCode:r,headers:n,rawBody:o}=e,i=s.decode(o,this.encoding);t(null,{status:a,statusCode:r,headers:n,rawBody:o,body:i},i)}),(e=>{const{message:a,response:r}=e;t(a,r,r&&s.decode(r.rawBody,this.encoding))}))}}post(e,t=(()=>{})){const s=e.method?e.method.toLocaleLowerCase():"post";switch(e.body&&e.headers&&!e.headers["Content-Type"]&&!e.headers["content-type"]&&(e.headers["content-type"]="application/x-www-form-urlencoded"),delete e?.headers?.["Content-Length"],delete e?.headers?.["content-length"],this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&this.lodash_set(e,"headers.X-Surge-Skip-Scripting",!1),$httpClient[s](e,((e,s,a)=>{!e&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),t(e,s,a)}));break;case"Quantumult X":e.method=s,this.isNeedRewrite&&this.lodash_set(e,"opts.hints",!1),$task.fetch(e).then((e=>{const{statusCode:s,statusCode:a,headers:r,body:n,bodyBytes:o}=e;t(null,{status:s,statusCode:a,headers:r,body:n,bodyBytes:o},n,o)}),(e=>t(e&&e.error||"UndefinedError")));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(e);const{url:r,...n}=e;this.got[s](r,n).then((e=>{const{statusCode:s,statusCode:r,headers:n,rawBody:o}=e,i=a.decode(o,this.encoding);t(null,{status:s,statusCode:r,headers:n,rawBody:o,body:i},i)}),(e=>{const{message:s,response:r}=e;t(s,r,r&&a.decode(r.rawBody,this.encoding))}))}}time(e,t=null){const s=t?new Date(t):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let t in a)new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[t]:("00"+a[t]).substr((""+a[t]).length)));return e}msg(e=name,t="",s="",a){const r=e=>{switch(typeof e){case void 0:return e;case"string":switch(this.platform()){case"Surge":case"Stash":default:return{url:e};case"Loon":case"Shadowrocket":return e;case"Quantumult X":return{"open-url":e};case"Node.js":return}case"object":switch(this.platform()){case"Surge":case"Stash":case"Shadowrocket":default:return{url:e.url||e.openUrl||e["open-url"]};case"Loon":return{openUrl:e.openUrl||e.url||e["open-url"],mediaUrl:e.mediaUrl||e["media-url"]};case"Quantumult X":return{"open-url":e["open-url"]||e.url||e.openUrl,"media-url":e["media-url"]||e.mediaUrl,"update-pasteboard":e["update-pasteboard"]||e.updatePasteboard};case"Node.js":return}default:return}};if(!this.isMute)switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,t,s,r(a));break;case"Quantumult X":$notify(e,t,s,r(a));case"Node.js":}if(!this.isMuteLog){let a=["","==============📣系统通知📣=============="];a.push(e),t&&a.push(t),s&&a.push(s),console.log(a.join("\n")),this.logs=this.logs.concat(a)}}log(...e){e.length>0&&(this.logs=[...this.logs,...e]),console.log(e.join(this.logSeparator))}logErr(e){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️ ${this.name}, 错误!`,e);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e.stack)}}wait(e){return new Promise((t=>setTimeout(t,e)))}done(e={}){const t=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🚩 ${this.name}, 结束! 🕛 ${t} 秒`),this.log(),this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(e);break;case"Node.js":process.exit(1)}}getENV(e,t,s){let a=this.getjson(e,s),r={};if("undefined"!=typeof $argument&&Boolean($argument)){let e=Object.fromEntries($argument.split("&").map((e=>e.split("=").map((e=>e.replace(/\"/g,""))))));for(let t in e)this.setPath(r,t,e[t])}const n={Settings:s?.Default?.Settings||{},Configs:s?.Default?.Configs||{},Caches:{}};Array.isArray(t)||(t=[t]);for(let e of t)n.Settings={...n.Settings,...s?.[e]?.Settings,...r,...a?.[e]?.Settings},n.Configs={...n.Configs,...s?.[e]?.Configs},a?.[e]?.Caches&&"string"==typeof a?.[e]?.Caches&&(a[e].Caches=JSON.parse(a?.[e]?.Caches)),n.Caches={...n.Caches,...a?.[e]?.Caches};return this.traverseObject(n.Settings,((e,t)=>("true"===t||"false"===t?t=JSON.parse(t):"string"==typeof t&&(t=t.includes(",")?t.split(",").map((e=>this.string2number(e))):this.string2number(t)),t))),n}setPath(e,t,s){t.split(".").reduce(((e,a,r)=>e[a]=t.split(".").length===++r?s:e[a]||{}),e)}traverseObject(e,t){for(var s in e){var a=e[s];e[s]="object"==typeof a&&null!==a?this.traverseObject(a,t):t(s,a)}return e}string2number(e){return e&&!isNaN(e)&&(e=parseInt(e,10)),e}}class o{constructor(e){this.env=e}send(e,t="GET"){e="string"==typeof e?{url:e}:e;let s=this.get;return"POST"===t&&(s=this.post),new Promise(((t,a)=>{s.call(this,e,((e,s,r)=>{e?a(e):t(s)}))}))}get(e){return this.send.call(this.env,e)}post(e){return this.send.call(this.env,e,"POST")}}const i=new n(" iRingo: Set Environment Variables"),c=JSON.parse('{"Settings":{"Switch":true},"Configs":{"Storefront":[["AE","143481"],["AF","143610"],["AG","143540"],["AI","143538"],["AL","143575"],["AM","143524"],["AO","143564"],["AR","143505"],["AT","143445"],["AU","143460"],["AZ","143568"],["BA","143612"],["BB","143541"],["BD","143490"],["BE","143446"],["BF","143578"],["BG","143526"],["BH","143559"],["BJ","143576"],["BM","143542"],["BN","143560"],["BO","143556"],["BR","143503"],["BS","143539"],["BT","143577"],["BW","143525"],["BY","143565"],["BZ","143555"],["CA","143455"],["CD","143613"],["CG","143582"],["CH","143459"],["CI","143527"],["CL","143483"],["CM","143574"],["CN","143465"],["CO","143501"],["CR","143495"],["CV","143580"],["CY","143557"],["CZ","143489"],["DE","143443"],["DK","143458"],["DM","143545"],["DO","143508"],["DZ","143563"],["EC","143509"],["EE","143518"],["EG","143516"],["ES","143454"],["FI","143447"],["FJ","143583"],["FM","143591"],["FR","143442"],["GA","143614"],["GB","143444"],["GD","143546"],["GF","143615"],["GH","143573"],["GM","143584"],["GR","143448"],["GT","143504"],["GW","143585"],["GY","143553"],["HK","143463"],["HN","143510"],["HR","143494"],["HU","143482"],["ID","143476"],["IE","143449"],["IL","143491"],["IN","143467"],["IQ","143617"],["IS","143558"],["IT","143450"],["JM","143511"],["JO","143528"],["JP","143462"],["KE","143529"],["KG","143586"],["KH","143579"],["KN","143548"],["KP","143466"],["KR","143466"],["KW","143493"],["KY","143544"],["KZ","143517"],["TC","143552"],["TD","143581"],["TJ","143603"],["TH","143475"],["TM","143604"],["TN","143536"],["TO","143608"],["TR","143480"],["TT","143551"],["TW","143470"],["TZ","143572"],["LA","143587"],["LB","143497"],["LC","143549"],["LI","143522"],["LK","143486"],["LR","143588"],["LT","143520"],["LU","143451"],["LV","143519"],["LY","143567"],["MA","143620"],["MD","143523"],["ME","143619"],["MG","143531"],["MK","143530"],["ML","143532"],["MM","143570"],["MN","143592"],["MO","143515"],["MR","143590"],["MS","143547"],["MT","143521"],["MU","143533"],["MV","143488"],["MW","143589"],["MX","143468"],["MY","143473"],["MZ","143593"],["NA","143594"],["NE","143534"],["NG","143561"],["NI","143512"],["NL","143452"],["NO","143457"],["NP","143484"],["NR","143606"],["NZ","143461"],["OM","143562"],["PA","143485"],["PE","143507"],["PG","143597"],["PH","143474"],["PK","143477"],["PL","143478"],["PT","143453"],["PW","143595"],["PY","143513"],["QA","143498"],["RO","143487"],["RS","143500"],["RU","143469"],["RW","143621"],["SA","143479"],["SB","143601"],["SC","143599"],["SE","143456"],["SG","143464"],["SI","143499"],["SK","143496"],["SL","143600"],["SN","143535"],["SR","143554"],["ST","143598"],["SV","143506"],["SZ","143602"],["UA","143492"],["UG","143537"],["US","143441"],["UY","143514"],["UZ","143566"],["VC","143550"],["VE","143502"],["VG","143543"],["VN","143471"],["VU","143609"],["XK","143624"],["YE","143571"],["ZA","143472"],["ZM","143622"],["ZW","143605"]]}}');var h=r.t(c,2);const l=JSON.parse('{"Settings":{"Switch":true,"PEP":{"GCC":"US"},"Services":{"PlaceData":"CN","Directions":"AUTO","Traffic":"AUTO","RAP":"XX","Tiles":"AUTO"},"Geo_manifest":{"Dynamic":{"Config":{"Country_code":{"default":"AUTO","iOS":"CN","iPadOS":"CN","watchOS":"US","macOS":"CN"}}}},"Config":{"Announcements":{"Environment:":{"default":"AUTO","iOS":"CN","iPadOS":"CN","watchOS":"XX","macOS":"CN"}},"Defaults":{"LagunaBeach":true,"DrivingMultiWaypointRoutesEnabled":true,"GEOAddressCorrection":true,"LookupMaxParametersCount":true,"LocalitiesAndLandmarks":true,"POIBusyness":true,"PedestrianAR":true,"6694982d2b14e95815e44e970235e230":true,"OpticalHeading":true,"UseCLPedestrianMapMatchedLocations":true,"TransitPayEnabled":true,"SupportsOffline":true,"SupportsCarIntegration":true,"WiFiQualityNetworkDisabled":false,"WiFiQualityTileDisabled":false}}}}');var u=r.t(l,2);const p=JSON.parse('{"Settings":{"Switch":true,"CountryCode":"US","newsPlusUser":true}}');var d=r.t(p,2);const g=JSON.parse('{"Settings":{"Switch":true,"CountryCode":"US","canUse":true}}');var f=r.t(g,2);const S=JSON.parse('{"Settings":{"Switch":true,"CountryCode":"SG","Domains":["web","itunes","app_store","movies","restaurants","maps"],"Functions":["flightutilities","lookup","mail","messages","news","safari","siri","spotlight","visualintelligence"],"Safari_Smart_History":true},"Configs":{"VisualIntelligence":{"enabled_domains":["pets","media","books","art","nature","landmarks"],"supported_domains":["ART","BOOK","MEDIA","LANDMARK","ANIMALS","BIRDS","FOOD","SIGN_SYMBOL","AUTO_SYMBOL","DOGS","NATURE","NATURAL_LANDMARK","INSECTS","REPTILES","ALBUM","STOREFRONT","LAUNDRY_CARE_SYMBOL","CATS","OBJECT_2D","SCULPTURE","SKYLINE","MAMMALS"]}}}');var m=r.t(S,2);const y=JSON.parse('{"Settings":{"Switch":"true","CountryCode":"US","MultiAccount":"false","Universal":"true"}}');var b=r.t(y,2);const v=JSON.parse('{"Settings":{"Switch":true,"Third-Party":false,"HLSUrl":"play-edge.itunes.apple.com","ServerUrl":"play.itunes.apple.com","Tabs":["WatchNow","Originals","MLS","Sports","Kids","Store","Movies","TV","ChannelsAndApps","Library","Search"],"CountryCode":{"Configs":"AUTO","Settings":"AUTO","View":["SG","TW"],"WatchNow":"AUTO","Channels":"AUTO","Originals":"AUTO","Sports":"US","Kids":"US","Store":"AUTO","Movies":"AUTO","TV":"AUTO","Persons":"SG","Search":"AUTO","Others":"AUTO"}},"Configs":{"Locale":[["AU","en-AU"],["CA","en-CA"],["GB","en-GB"],["KR","ko-KR"],["HK","yue-Hant"],["JP","ja-JP"],["MO","zh-Hant"],["TW","zh-Hant"],["US","en-US"],["SG","zh-Hans"]],"Tabs":[{"title":"主页","type":"WatchNow","universalLinks":["https://tv.apple.com/watch-now","https://tv.apple.com/home"],"destinationType":"Target","target":{"id":"tahoma_watchnow","type":"Root","url":"https://tv.apple.com/watch-now"},"isSelected":true},{"title":"Apple TV+","type":"Originals","universalLinks":["https://tv.apple.com/channel/tvs.sbd.4000","https://tv.apple.com/atv"],"destinationType":"Target","target":{"id":"tvs.sbd.4000","type":"Brand","url":"https://tv.apple.com/us/channel/tvs.sbd.4000"}},{"title":"MLS Season Pass","type":"MLS","universalLinks":["https://tv.apple.com/mls"],"destinationType":"Target","target":{"id":"tvs.sbd.7000","type":"Brand","url":"https://tv.apple.com/us/channel/tvs.sbd.7000"}},{"title":"体育节目","type":"Sports","universalLinks":["https://tv.apple.com/sports"],"destinationType":"Target","target":{"id":"tahoma_sports","type":"Root","url":"https://tv.apple.com/sports"}},{"title":"儿童","type":"Kids","universalLinks":["https://tv.apple.com/kids"],"destinationType":"Target","target":{"id":"tahoma_kids","type":"Root","url":"https://tv.apple.com/kids"}},{"title":"电影","type":"Movies","universalLinks":["https://tv.apple.com/movies"],"destinationType":"Target","target":{"id":"tahoma_movies","type":"Root","url":"https://tv.apple.com/movies"}},{"title":"电视节目","type":"TV","universalLinks":["https://tv.apple.com/tv-shows"],"destinationType":"Target","target":{"id":"tahoma_tvshows","type":"Root","url":"https://tv.apple.com/tv-shows"}},{"title":"商店","type":"Store","universalLinks":["https://tv.apple.com/store"],"destinationType":"SubTabs","subTabs":[{"title":"电影","type":"Movies","universalLinks":["https://tv.apple.com/movies"],"destinationType":"Target","target":{"id":"tahoma_movies","type":"Root","url":"https://tv.apple.com/movies"}},{"title":"电视节目","type":"TV","universalLinks":["https://tv.apple.com/tv-shows"],"destinationType":"Target","target":{"id":"tahoma_tvshows","type":"Root","url":"https://tv.apple.com/tv-shows"}}]},{"title":"频道和 App","destinationType":"SubTabs","subTabsPlacementType":"ExpandedList","type":"ChannelsAndApps","subTabs":[]},{"title":"资料库","type":"Library","destinationType":"Client"},{"title":"搜索","type":"Search","universalLinks":["https://tv.apple.com/search"],"destinationType":"Target","target":{"id":"tahoma_search","type":"Root","url":"https://tv.apple.com/search"}}],"i18n":{"WatchNow":[["en","Home"],["zh","主页"],["zh-Hans","主頁"],["zh-Hant","主頁"]],"Movies":[["en","Movies"],["zh","电影"],["zh-Hans","电影"],["zh-Hant","電影"]],"TV":[["en","TV"],["zh","电视节目"],["zh-Hans","电视节目"],["zh-Hant","電視節目"]],"Store":[["en","Store"],["zh","商店"],["zh-Hans","商店"],["zh-Hant","商店"]],"Sports":[["en","Sports"],["zh","体育节目"],["zh-Hans","体育节目"],["zh-Hant","體育節目"]],"Kids":[["en","Kids"],["zh","儿童"],["zh-Hans","儿童"],["zh-Hant","兒童"]],"Library":[["en","Library"],["zh","资料库"],["zh-Hans","资料库"],["zh-Hant","資料庫"]],"Search":[["en","Search"],["zh","搜索"],["zh-Hans","搜索"],["zh-Hant","蒐索"]]}}}');var T=r.t(v,2);const C=new n(" iRingo: 📍 Location v3.0.5(1) request"),w=new class{constructor(e=[]){this.name="URI v1.2.6",this.opts=e,this.json={scheme:"",host:"",path:"",query:{}}}parse(e){let t=e.match(/(?:(?<scheme>.+):\/\/(?<host>[^/]+))?\/?(?<path>[^?]+)?\??(?<query>[^?]+)?/)?.groups??null;if(t?.path?t.paths=t.path.split("/"):t.path="",t?.paths){const e=t.paths[t.paths.length-1];if(e?.includes(".")){const s=e.split(".");t.format=s[s.length-1]}}return t?.query&&(t.query=Object.fromEntries(t.query.split("&").map((e=>e.split("="))))),t}stringify(e=this.json){let t="";return e?.scheme&&e?.host&&(t+=e.scheme+"://"+e.host),e?.path&&(t+=e?.host?"/"+e.path:e.path),e?.query&&(t+="?"+Object.entries(e.query).map((e=>e.join("="))).join("&")),t}},O=(new class{#e="@";#t="#";#s={"&amp;":"&","&lt;":"<","&gt;":">","&apos;":"'","&quot;":'"'};#a={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"};constructor(e){this.name="XML v0.4.0-2",this.opts=e,BigInt.prototype.toJSON=()=>this.toString()}parse(e=new String,t=""){const s=this.#s,a=this.#e,r=this.#t;let n=function e(t,s){let n;switch(typeof t){case"string":case"undefined":n=t;break;case"object":const h=t.raw,l=t.name,u=t.tag,p=t.children;n=h||(u?function(e,t){if(!e)return;const s=e.split(/([^\s='"]+(?:\s*=\s*(?:'[\S\s]*?'|"[\S\s]*?"|[^\s'"]*))?)/),r=s.length;let n,o;for(let e=0;e<r;e++){let r=h(s[e]);if(!r)continue;n||(n={});const l=r.indexOf("=");if(l<0)r=a+r,o=null;else{o=r.substr(l+1).replace(/^\s+/,""),r=a+r.substr(0,l).replace(/\s+$/,"");const e=o[0];e!==o[o.length-1]||"'"!==e&&'"'!==e||(o=o.substr(1,o.length-2)),o=i(o)}t&&(o=t(r,o)),c(n,r,o)}return n;function h(e){return e?.trim?.()}}(u,s):p?{}:{[l]:void 0}),"plist"===l?n=Object.assign(n,o(p[0],s)):p?.forEach?.(((t,a)=>{"string"==typeof t?c(n,r,e(t,s),void 0):t.tag||t.children||t.raw?c(n,t.name,e(t,s),void 0):c(n,t.name,e(t,s),p?.[a-1]?.name)})),p&&0===p.length&&c(n,r,null,void 0),s&&(n=s(l||"",n))}return n;function c(e,t,s,a=t){if(void 0!==s){const r=e[a];Array.isArray(r)?r.push(s):r?e[a]=[r,s]:e[t]=s}}}(function(e){const t=e.replace(/^[ \t]+/gm,"").split(/<([^!<>?](?:'[\S\s]*?'|"[\S\s]*?"|[^'"<>])*|!(?:--[\S\s]*?--|\[[^\[\]'"<>]+\[[\S\s]*?]]|DOCTYPE[^\[<>]*?\[[\S\s]*?]|(?:ENTITY[^"<>]*?"[\S\s]*?")?[\S\s]*?)|\?[\S\s]*?\?)>/),s=t.length,a={children:[]};let r=a;const n=[];for(let e=0;e<s;){const s=t[e++];s&&c(s);const a=t[e++];a&&o(a)}return a;function o(e){const t=e.split(" "),s=t.shift(),a=t.length;let o={};switch(s[0]){case"/":const i=e.replace(/^\/|[\s\/].*$/g,"").toLowerCase();for(;n.length;){const e=r?.name?.toLowerCase?.();if(r=n.pop(),e===i)break}break;case"?":o.name=s,o.raw=t.join(" "),h(o);break;case"!":/!\[CDATA\[(.+)\]\]/.test(e)?(o.name="!CDATA",o.raw=e.match(/!\[CDATA\[(.+)\]\]/)):(o.name=s,o.raw=t.join(" ")),h(o);break;default:o=function(e){const t={children:[]},s=(e=e.replace(/\s*\/?$/,"")).search(/[\s='"\/]/);return s<0?t.name=e:(t.name=e.substr(0,s),t.tag=e.substr(s)),t}(e),h(o),"/"===(t?.[a-1]??s).slice(-1)||"link"===s?delete o.children:(n.push(r),r=o)}}function c(e){(e=function(e){return e?.replace?.(/^(\r\n|\r|\n|\t)+|(\r\n|\r|\n|\t)+$/g,"")}(e))&&h(i(e))}function h(e){r.children.push(e)}}(e),t);return n;function o(e,t){let s;switch(typeof e){case"string":case"undefined":s=e;break;case"object":const a=e.name,r=e.children;switch(s={},a){case"plist":let e=o(r[0],t);s=Object.assign(s,e);break;case"dict":let n=r.map((e=>o(e,t)));n=function(e,t){for(var s=0,a=[];s<e.length;)a.push(e.slice(s,s+=2));return a}(n),s=Object.fromEntries(n);break;case"array":Array.isArray(s)||(s=[]),s=r.map((e=>o(e,t)));break;case"key":case"string":s=r[0];break;case"true":case"false":const i=a;s=JSON.parse(i);break;case"integer":const c=r[0];s=BigInt(c);break;case"real":const h=r[0];s=parseFloat(h)}t&&(s=t(a||"",s))}return s}function i(e){return e.replace(/(&(?:lt|gt|amp|apos|quot|#(?:\d{1,6}|x[0-9a-fA-F]{1,5}));)/g,(function(e){if("#"===e[1]){const t="x"===e[2]?parseInt(e.substr(3),16):parseInt(e.substr(2),10);if(t>-1)return String.fromCharCode(t)}return s[e]||e}))}}stringify(e=new Object,t=""){this.#a;const s=this.#e,a=this.#t;let r="";for(let t in e)r+=n(e[t],t,"");return r=t?r.replace(/\t/g,t):r.replace(/\t|\n/g,""),r;function n(e,t,r){let i="";switch(typeof e){case"object":if(Array.isArray(e))i=e.reduce(((e,s)=>e+`${r}${n(s,t,`${r}\t`)}\n`),"");else{let c="",h=!1;for(let a in e)a[0]===s?(c+=` ${a.substring(1)}="${e[a].toString()}"`,delete e[a]):void 0===e[a]?t=a:h=!0;if(i+=`${r}<${t}${c}${h||"link"===t?"":"/"}>`,h){if("plist"===t)i+=o(e,t,`${r}\t`);else for(let t in e)i+=t===a?e[t]??"":n(e[t],t,`${r}\t`);i+=("\n"===i.slice(-1)?r:"")+`</${t}>`}}break;case"string":switch(t){case"?xml":i+=`${r}<${t} ${e.toString()}>`;break;case"?":i+=`${r}<${t}${e.toString()}${t}>`;break;case"!":i+=`${r}\x3c!--${e.toString()}--\x3e`;break;case"!DOCTYPE":i+=`${r}<${t} ${e.toString()}>`;break;case"!CDATA":i+=`${r}<![CDATA[${e.toString()}]]>`;break;case a:i+=e;break;default:i+=`${r}<${t}>${e.toString()}</${t}>`}break;case"undefined":i+=r+`<${t.toString()}/>`}return i}function o(e,t,s){let a="";switch(typeof e){case"boolean":a=`${s}<${e.toString()}/>`;break;case"number":a=`${s}<real>${e.toString()}</real>`;break;case"bigint":a=`${s}<integer>${e.toString()}</integer>`;break;case"string":a=`${s}<string>${e.toString()}</string>`;break;case"object":let i="";if(Array.isArray(e)){for(var r=0,n=e.length;r<n;r++)i+=`${s}${o(e[r],t,`${s}\t`)}`;a=`${s}<array>${i}${s}</array>`}else{let t="";Object.entries(e).forEach((([e,a])=>{t+=`${s}<key>${e}</key>`,t+=o(a,e,s)})),a=`${s}<dict>${t}${s}</dict>`}}return a}}},{Default:h,Location:u,News:d,PrivateRelay:f,Siri:m,TestFlight:b,TV:T});const $=w.parse($request.url);C.log(`⚠ ${C.name}`,`URL: ${JSON.stringify($)}`,"");const k=$request.method,A=$.host,N=$.path;$.paths,C.log(`⚠ ${C.name}`,`METHOD: ${k}`,"");const E=($request.headers?.["Content-Type"]??$request.headers?.["content-type"])?.split(";")?.[0];function L(e,t){return C.log(`☑️ ${C.name}, Set ETag`,`If-None-Match: ${e}`,`ETag: ${t}`,""),e!==t&&(t=e,delete $request?.headers?.["If-None-Match"],delete $request?.headers?.["if-none-match"]),C.log(`✅ ${C.name}, Set ETag`,""),t}C.log(`⚠ ${C.name}`,`FORMAT: ${E}`,""),(async()=>{const{Settings:e,Caches:t,Configs:s}=function(e,t,s){i.log(`☑️ ${i.name}`,"");let{Settings:a,Caches:r,Configs:n}=i.getENV("iRingo","Location",s);if(a?.Tabs&&!Array.isArray(a?.Tabs)&&i.lodash_set(a,"Tabs",a?.Tabs?[a.Tabs.toString()]:[]),a?.Domains&&!Array.isArray(a?.Domains)&&i.lodash_set(a,"Domains",a?.Domains?[a.Domains.toString()]:[]),a?.Functions&&!Array.isArray(a?.Functions)&&i.lodash_set(a,"Functions",a?.Functions?[a.Functions.toString()]:[]),i.log(`✅ ${i.name}`,"Settings: "+typeof a,`Settings内容: ${JSON.stringify(a)}`,""),n.Storefront=new Map(n.Storefront),n.Locale&&(n.Locale=new Map(n.Locale)),n.i18n)for(let e in n.i18n)n.i18n[e]=new Map(n.i18n[e]);return{Settings:a,Caches:r,Configs:n}}(0,0,O);switch(C.log(`⚠ ${C.name}`,`Settings.Switch: ${e?.Switch}`,""),e.Switch){case!0:default:switch(k){case"POST":case"PUT":case"PATCH":case"DELETE":case"GET":case"HEAD":case"OPTIONS":case void 0:default:switch(A){case"configuration.ls.apple.com":"config/defaults"===N&&(C.lodash_set(t,"Defaults.ETag",L($request?.headers?.["If-None-Match"]??$request?.headers?.["if-none-match"],t?.Defaults?.ETag)),C.setjson(t,"@iRingo.Location.Caches"));break;case"gspe1-ssl.ls.apple.com":break;case"gsp-ssl.ls.apple.com":case"dispatcher.is.autonavi.com":case"direction2.is.autonavi.com":switch(N){case"dispatcher.arpc":case"dispatcher":switch(e?.Services?.PlaceData){case"AUTO":default:break;case"CN":$.host="dispatcher.is.autonavi.com",$.path="dispatcher";break;case"XX":$.host="gsp-ssl.ls.apple.com",$.path="dispatcher.arpc"}break;case"directions.arpc":case"direction":switch(e?.Services?.Directions){case"AUTO":default:break;case"CN":$.host="direction2.is.autonavi.com",$.path="direction";break;case"XX":$.host="gsp-ssl.ls.apple.com",$.path="directions.arpc"}}break;case"sundew.ls.apple.com":case"rap.is.autonavi.com":switch(N){case"v1/feedback/submission.arpc":case"rap":switch(e?.Services?.RAP){case"AUTO":default:break;case"CN":$.host="rap.is.autonavi.com",$.path="rap";break;case"XX":$.host="sundew.ls.apple.com",$.path="v1/feedback/submission.arpc"}break;case"grp/st":case"rapstatus":switch(e?.Services?.RAP){case"AUTO":default:break;case"CN":$.host="rap.is.autonavi.com",$.path="rapstatus";break;case"XX":$.host="sundew.ls.apple.com",$.path="grp/st"}}break;case"gspe12-ssl.ls.apple.com":case"gspe12-cn-ssl.ls.apple.com":if("traffic"===N)switch(e?.Services?.Traffic){case"AUTO":default:break;case"CN":$.host="gspe12-cn-ssl.ls.apple.com";break;case"XX":$.host="gspe12-ssl.ls.apple.com"}break;case"gspe19-ssl.ls.apple.com":case"gspe19-cn-ssl.ls.apple.com":switch(N){case"tile.vf":case"tiles":switch(e?.Services?.Tiles){case"AUTO":default:break;case"CN":$.host="gspe19-cn-ssl.ls.apple.com",$.path="tiles";break;case"XX":$.host="gspe19-ssl.ls.apple.com",$.path="tile.vf"}}break;case"gspe35-ssl.ls.apple.com":case"gspe35-ssl.ls.apple.cn":switch(N){case"config/announcements":switch($.query?.os){case"ios":case"ipados":case"macos":default:switch(e?.Config?.Announcements?.Environment?.default){case"AUTO":switch(t?.pep?.gcc){default:$.query.environment="prod";break;case"CN":case void 0:$.query.environment="prod-cn"}break;case"CN":default:$.query.environment="prod-cn";break;case"XX":$.query.environment="prod"}break;case"watchos":switch(e?.Config?.Announcements?.Environment?.watchOS){case"AUTO":switch(t?.pep?.gcc){default:$.query.environment="prod";break;case"CN":case void 0:$.query.environment="prod-cn"}break;case"XX":default:$.query.environment="prod";break;case"CN":$.query.environment="prod-cn"}}C.lodash_set(t,"Announcements.ETag",L($request.headers?.["If-None-Match"]??$request.headers?.["if-none-match"],t?.Announcements?.ETag)),C.setjson(t,"@iRingo.Location.Caches");break;case"geo_manifest/dynamic/config":switch($.query?.os){case"ios":case"ipados":case"macos":default:if("AUTO"===e?.Geo_manifest?.Dynamic?.Config?.Country_code?.default)switch(t?.pep?.gcc){default:$.query.country_code=t?.pep?.gcc??"US";break;case"CN":case void 0:$.query.country_code="CN"}else $.query.country_code=e?.Geo_manifest?.Dynamic?.Config?.Country_code?.default??"CN";break;case"watchos":if("AUTO"===e?.Geo_manifest?.Dynamic?.Config?.Country_code?.watchOS)switch(t?.pep?.gcc){default:$.query.country_code=t?.pep?.gcc??"US";break;case"CN":case void 0:$.query.country_code="CN"}else $.query.country_code=e?.Geo_manifest?.Dynamic?.Config?.Country_code?.watchOS??"US"}C.lodash_set(t,"Dynamic.ETag",L($request?.headers?.["If-None-Match"]??$request?.headers?.["if-none-match"],t?.Dynamic?.ETag)),C.setjson(t,"@iRingo.Location.Caches")}}case"CONNECT":case"TRACE":}$request.headers?.Host&&($request.headers.Host=$.host),$request.url=w.stringify($);case!1:}})().catch((e=>C.logErr(e))).finally((()=>{if(C.log(`🎉 ${C.name}, finally`,"$request",`FORMAT: ${E}`,""),C.isQuanX())switch(E){case void 0:C.done({url:$request.url,headers:$request.headers});break;default:C.done({url:$request.url,headers:$request.headers,body:$request.body});break;case"application/protobuf":case"application/x-protobuf":case"application/vnd.google.protobuf":case"application/grpc":case"application/grpc+proto":case"applecation/octet-stream":C.done({url:$request.url,headers:$request.headers,bodyBytes:$request.bodyBytes.buffer.slice($request.bodyBytes.byteOffset,$request.bodyBytes.byteLength+$request.bodyBytes.byteOffset)})}else C.done($request)}))})();