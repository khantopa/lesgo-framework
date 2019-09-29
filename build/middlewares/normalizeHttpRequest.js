"use strict";var _logger=_interopRequireDefault(require("../utils/logger"));Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=exports.normalizeHttpRequestBeforeHandler=exports.normalizeRequest=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var normalizeRequest=function(a){var b=a.headers,c=a.qs,d=a.body,e=null;if(!b&&null===c)return e;null!==c&&(e=c);var f=b["Content-Type"]||b["content-type"];if(!f)return e;if(f.startsWith("application/json"))try{e=_objectSpread({},e,{},JSON.parse(d))}catch(a){throw new Error("Content type defined as JSON but an invalid JSON was provided")}return e};exports.normalizeRequest=normalizeRequest;var normalizeHttpRequestBeforeHandler=function(a,b){var c={headers:a.event.headers,qs:a.event.queryStringParameters,body:a.event.body};a.event.input=normalizeRequest(c),_logger["default"].withMeta=_logger["default"].child({queryStringParameters:c.qs,body:c.body,requestId:a.event.requestContext?a.event.requestContext.requestId:null,tags:{path:a.event.path,httpMethod:a.event.httpMethod}}),b()};exports.normalizeHttpRequestBeforeHandler=normalizeHttpRequestBeforeHandler;var normalizeHttpRequest=function(){return{before:function before(a,b){return normalizeHttpRequestBeforeHandler(a,b)}}},_default=normalizeHttpRequest;exports["default"]=_default;