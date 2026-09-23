(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function Jb(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Hp={exports:{}},Ki={},qp={exports:{}},U={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kr=Symbol.for("react.element"),Zb=Symbol.for("react.portal"),ew=Symbol.for("react.fragment"),tw=Symbol.for("react.strict_mode"),nw=Symbol.for("react.profiler"),sw=Symbol.for("react.provider"),rw=Symbol.for("react.context"),aw=Symbol.for("react.forward_ref"),iw=Symbol.for("react.suspense"),ow=Symbol.for("react.memo"),lw=Symbol.for("react.lazy"),_u=Symbol.iterator;function cw(e){return e===null||typeof e!="object"?null:(e=_u&&e[_u]||e["@@iterator"],typeof e=="function"?e:null)}var Yp={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Gp=Object.assign,Kp={};function Ws(e,t,n){this.props=e,this.context=t,this.refs=Kp,this.updater=n||Yp}Ws.prototype.isReactComponent={};Ws.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ws.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Qp(){}Qp.prototype=Ws.prototype;function Gc(e,t,n){this.props=e,this.context=t,this.refs=Kp,this.updater=n||Yp}var Kc=Gc.prototype=new Qp;Kc.constructor=Gc;Gp(Kc,Ws.prototype);Kc.isPureReactComponent=!0;var Ou=Array.isArray,Xp=Object.prototype.hasOwnProperty,Qc={current:null},Jp={key:!0,ref:!0,__self:!0,__source:!0};function Zp(e,t,n){var s,r={},i=null,o=null;if(t!=null)for(s in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)Xp.call(t,s)&&!Jp.hasOwnProperty(s)&&(r[s]=t[s]);var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];r.children=c}if(e&&e.defaultProps)for(s in l=e.defaultProps,l)r[s]===void 0&&(r[s]=l[s]);return{$$typeof:Kr,type:e,key:i,ref:o,props:r,_owner:Qc.current}}function dw(e,t){return{$$typeof:Kr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Xc(e){return typeof e=="object"&&e!==null&&e.$$typeof===Kr}function uw(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var zu=/\/+/g;function jo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?uw(""+e.key):t.toString(36)}function $a(e,t,n,s,r){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Kr:case Zb:o=!0}}if(o)return o=e,r=r(o),e=s===""?"."+jo(o,0):s,Ou(r)?(n="",e!=null&&(n=e.replace(zu,"$&/")+"/"),$a(r,t,n,"",function(d){return d})):r!=null&&(Xc(r)&&(r=dw(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(zu,"$&/")+"/")+e)),t.push(r)),1;if(o=0,s=s===""?".":s+":",Ou(e))for(var l=0;l<e.length;l++){i=e[l];var c=s+jo(i,l);o+=$a(i,t,n,c,r)}else if(c=cw(e),typeof c=="function")for(e=c.call(e),l=0;!(i=e.next()).done;)i=i.value,c=s+jo(i,l++),o+=$a(i,t,n,c,r);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function da(e,t,n){if(e==null)return e;var s=[],r=0;return $a(e,s,"","",function(i){return t.call(n,i,r++)}),s}function hw(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ue={current:null},_a={transition:null},mw={ReactCurrentDispatcher:Ue,ReactCurrentBatchConfig:_a,ReactCurrentOwner:Qc};function ef(){throw Error("act(...) is not supported in production builds of React.")}U.Children={map:da,forEach:function(e,t,n){da(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return da(e,function(){t++}),t},toArray:function(e){return da(e,function(t){return t})||[]},only:function(e){if(!Xc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};U.Component=Ws;U.Fragment=ew;U.Profiler=nw;U.PureComponent=Gc;U.StrictMode=tw;U.Suspense=iw;U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=mw;U.act=ef;U.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var s=Gp({},e.props),r=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=Qc.current),t.key!==void 0&&(r=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)Xp.call(t,c)&&!Jp.hasOwnProperty(c)&&(s[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)s.children=n;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];s.children=l}return{$$typeof:Kr,type:e.type,key:r,ref:i,props:s,_owner:o}};U.createContext=function(e){return e={$$typeof:rw,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:sw,_context:e},e.Consumer=e};U.createElement=Zp;U.createFactory=function(e){var t=Zp.bind(null,e);return t.type=e,t};U.createRef=function(){return{current:null}};U.forwardRef=function(e){return{$$typeof:aw,render:e}};U.isValidElement=Xc;U.lazy=function(e){return{$$typeof:lw,_payload:{_status:-1,_result:e},_init:hw}};U.memo=function(e,t){return{$$typeof:ow,type:e,compare:t===void 0?null:t}};U.startTransition=function(e){var t=_a.transition;_a.transition={};try{e()}finally{_a.transition=t}};U.unstable_act=ef;U.useCallback=function(e,t){return Ue.current.useCallback(e,t)};U.useContext=function(e){return Ue.current.useContext(e)};U.useDebugValue=function(){};U.useDeferredValue=function(e){return Ue.current.useDeferredValue(e)};U.useEffect=function(e,t){return Ue.current.useEffect(e,t)};U.useId=function(){return Ue.current.useId()};U.useImperativeHandle=function(e,t,n){return Ue.current.useImperativeHandle(e,t,n)};U.useInsertionEffect=function(e,t){return Ue.current.useInsertionEffect(e,t)};U.useLayoutEffect=function(e,t){return Ue.current.useLayoutEffect(e,t)};U.useMemo=function(e,t){return Ue.current.useMemo(e,t)};U.useReducer=function(e,t,n){return Ue.current.useReducer(e,t,n)};U.useRef=function(e){return Ue.current.useRef(e)};U.useState=function(e){return Ue.current.useState(e)};U.useSyncExternalStore=function(e,t,n){return Ue.current.useSyncExternalStore(e,t,n)};U.useTransition=function(){return Ue.current.useTransition()};U.version="18.3.1";qp.exports=U;var w=qp.exports;const re=Jb(w);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pw=w,fw=Symbol.for("react.element"),gw=Symbol.for("react.fragment"),yw=Object.prototype.hasOwnProperty,vw=pw.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,bw={key:!0,ref:!0,__self:!0,__source:!0};function tf(e,t,n){var s,r={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(s in t)yw.call(t,s)&&!bw.hasOwnProperty(s)&&(r[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)r[s]===void 0&&(r[s]=t[s]);return{$$typeof:fw,type:e,key:i,ref:o,props:r,_owner:vw.current}}Ki.Fragment=gw;Ki.jsx=tf;Ki.jsxs=tf;Hp.exports=Ki;var a=Hp.exports,nf={exports:{}},ot={},sf={exports:{}},rf={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(E,B){var M=E.length;E.push(B);e:for(;0<M;){var W=M-1>>>1,H=E[W];if(0<r(H,B))E[W]=B,E[M]=H,M=W;else break e}}function n(E){return E.length===0?null:E[0]}function s(E){if(E.length===0)return null;var B=E[0],M=E.pop();if(M!==B){E[0]=M;e:for(var W=0,H=E.length,Wt=H>>>1;W<Wt;){var he=2*(W+1)-1,Me=E[he],oe=he+1,rs=E[oe];if(0>r(Me,M))oe<H&&0>r(rs,Me)?(E[W]=rs,E[oe]=M,W=oe):(E[W]=Me,E[he]=M,W=he);else if(oe<H&&0>r(rs,M))E[W]=rs,E[oe]=M,W=oe;else break e}}return B}function r(E,B){var M=E.sortIndex-B.sortIndex;return M!==0?M:E.id-B.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();e.unstable_now=function(){return o.now()-l}}var c=[],d=[],u=1,h=null,m=3,y=!1,p=!1,b=!1,x=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(E){for(var B=n(d);B!==null;){if(B.callback===null)s(d);else if(B.startTime<=E)s(d),B.sortIndex=B.expirationTime,t(c,B);else break;B=n(d)}}function k(E){if(b=!1,v(E),!p)if(n(c)!==null)p=!0,C(N);else{var B=n(d);B!==null&&O(k,B.startTime-E)}}function N(E,B){p=!1,b&&(b=!1,f(S),S=-1),y=!0;var M=m;try{for(v(B),h=n(c);h!==null&&(!(h.expirationTime>B)||E&&!$());){var W=h.callback;if(typeof W=="function"){h.callback=null,m=h.priorityLevel;var H=W(h.expirationTime<=B);B=e.unstable_now(),typeof H=="function"?h.callback=H:h===n(c)&&s(c),v(B)}else s(c);h=n(c)}if(h!==null)var Wt=!0;else{var he=n(d);he!==null&&O(k,he.startTime-B),Wt=!1}return Wt}finally{h=null,m=M,y=!1}}var T=!1,j=null,S=-1,A=5,P=-1;function $(){return!(e.unstable_now()-P<A)}function Q(){if(j!==null){var E=e.unstable_now();P=E;var B=!0;try{B=j(!0,E)}finally{B?ie():(T=!1,j=null)}}else T=!1}var ie;if(typeof g=="function")ie=function(){g(Q)};else if(typeof MessageChannel<"u"){var D=new MessageChannel,Y=D.port2;D.port1.onmessage=Q,ie=function(){Y.postMessage(null)}}else ie=function(){x(Q,0)};function C(E){j=E,T||(T=!0,ie())}function O(E,B){S=x(function(){E(e.unstable_now())},B)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){p||y||(p=!0,C(N))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(E){switch(m){case 1:case 2:case 3:var B=3;break;default:B=m}var M=m;m=B;try{return E()}finally{m=M}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,B){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var M=m;m=E;try{return B()}finally{m=M}},e.unstable_scheduleCallback=function(E,B,M){var W=e.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?W+M:W):M=W,E){case 1:var H=-1;break;case 2:H=250;break;case 5:H=1073741823;break;case 4:H=1e4;break;default:H=5e3}return H=M+H,E={id:u++,callback:B,priorityLevel:E,startTime:M,expirationTime:H,sortIndex:-1},M>W?(E.sortIndex=M,t(d,E),n(c)===null&&E===n(d)&&(b?(f(S),S=-1):b=!0,O(k,M-W))):(E.sortIndex=H,t(c,E),p||y||(p=!0,C(N))),E},e.unstable_shouldYield=$,e.unstable_wrapCallback=function(E){var B=m;return function(){var M=m;m=B;try{return E.apply(this,arguments)}finally{m=M}}}})(rf);sf.exports=rf;var ww=sf.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xw=w,it=ww;function F(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var af=new Set,Nr={};function ns(e,t){Rs(e,t),Rs(e+"Capture",t)}function Rs(e,t){for(Nr[e]=t,e=0;e<t.length;e++)af.add(t[e])}var Xt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),xl=Object.prototype.hasOwnProperty,kw=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Wu={},Vu={};function jw(e){return xl.call(Vu,e)?!0:xl.call(Wu,e)?!1:kw.test(e)?Vu[e]=!0:(Wu[e]=!0,!1)}function Sw(e,t,n,s){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Nw(e,t,n,s){if(t===null||typeof t>"u"||Sw(e,t,n,s))return!0;if(s)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function He(e,t,n,s,r,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var De={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){De[e]=new He(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];De[t]=new He(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){De[e]=new He(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){De[e]=new He(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){De[e]=new He(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){De[e]=new He(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){De[e]=new He(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){De[e]=new He(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){De[e]=new He(e,5,!1,e.toLowerCase(),null,!1,!1)});var Jc=/[\-:]([a-z])/g;function Zc(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Jc,Zc);De[t]=new He(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Jc,Zc);De[t]=new He(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Jc,Zc);De[t]=new He(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){De[e]=new He(e,1,!1,e.toLowerCase(),null,!1,!1)});De.xlinkHref=new He("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){De[e]=new He(e,1,!1,e.toLowerCase(),null,!0,!0)});function ed(e,t,n,s){var r=De.hasOwnProperty(t)?De[t]:null;(r!==null?r.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Nw(t,n,r,s)&&(n=null),s||r===null?jw(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):r.mustUseProperty?e[r.propertyName]=n===null?r.type===3?!1:"":n:(t=r.attributeName,s=r.attributeNamespace,n===null?e.removeAttribute(t):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,s?e.setAttributeNS(s,t,n):e.setAttribute(t,n))))}var rn=xw.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ua=Symbol.for("react.element"),ls=Symbol.for("react.portal"),cs=Symbol.for("react.fragment"),td=Symbol.for("react.strict_mode"),kl=Symbol.for("react.profiler"),of=Symbol.for("react.provider"),lf=Symbol.for("react.context"),nd=Symbol.for("react.forward_ref"),jl=Symbol.for("react.suspense"),Sl=Symbol.for("react.suspense_list"),sd=Symbol.for("react.memo"),ln=Symbol.for("react.lazy"),cf=Symbol.for("react.offscreen"),Uu=Symbol.iterator;function Qs(e){return e===null||typeof e!="object"?null:(e=Uu&&e[Uu]||e["@@iterator"],typeof e=="function"?e:null)}var ue=Object.assign,So;function ir(e){if(So===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);So=t&&t[1]||""}return`
`+So+e}var No=!1;function To(e,t){if(!e||No)return"";No=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var s=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){s=d}e.call(t.prototype)}else{try{throw Error()}catch(d){s=d}e()}}catch(d){if(d&&s&&typeof d.stack=="string"){for(var r=d.stack.split(`
`),i=s.stack.split(`
`),o=r.length-1,l=i.length-1;1<=o&&0<=l&&r[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(r[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||r[o]!==i[l]){var c=`
`+r[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=l);break}}}finally{No=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?ir(e):""}function Tw(e){switch(e.tag){case 5:return ir(e.type);case 16:return ir("Lazy");case 13:return ir("Suspense");case 19:return ir("SuspenseList");case 0:case 2:case 15:return e=To(e.type,!1),e;case 11:return e=To(e.type.render,!1),e;case 1:return e=To(e.type,!0),e;default:return""}}function Nl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case cs:return"Fragment";case ls:return"Portal";case kl:return"Profiler";case td:return"StrictMode";case jl:return"Suspense";case Sl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case lf:return(e.displayName||"Context")+".Consumer";case of:return(e._context.displayName||"Context")+".Provider";case nd:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case sd:return t=e.displayName||null,t!==null?t:Nl(e.type)||"Memo";case ln:t=e._payload,e=e._init;try{return Nl(e(t))}catch{}}return null}function Cw(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Nl(t);case 8:return t===td?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function kn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function df(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Aw(e){var t=df(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(o){s=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return s},setValue:function(o){s=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ha(e){e._valueTracker||(e._valueTracker=Aw(e))}function uf(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),s="";return e&&(s=df(e)?e.checked?"true":"false":e.value),e=s,e!==n?(t.setValue(e),!0):!1}function ii(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Tl(e,t){var n=t.checked;return ue({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Hu(e,t){var n=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;n=kn(t.value!=null?t.value:n),e._wrapperState={initialChecked:s,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function hf(e,t){t=t.checked,t!=null&&ed(e,"checked",t,!1)}function Cl(e,t){hf(e,t);var n=kn(t.value),s=t.type;if(n!=null)s==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Al(e,t.type,n):t.hasOwnProperty("defaultValue")&&Al(e,t.type,kn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function qu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Al(e,t,n){(t!=="number"||ii(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var or=Array.isArray;function Ss(e,t,n,s){if(e=e.options,t){t={};for(var r=0;r<n.length;r++)t["$"+n[r]]=!0;for(n=0;n<e.length;n++)r=t.hasOwnProperty("$"+e[n].value),e[n].selected!==r&&(e[n].selected=r),r&&s&&(e[n].defaultSelected=!0)}else{for(n=""+kn(n),t=null,r=0;r<e.length;r++){if(e[r].value===n){e[r].selected=!0,s&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function El(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(F(91));return ue({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Yu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(F(92));if(or(n)){if(1<n.length)throw Error(F(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:kn(n)}}function mf(e,t){var n=kn(t.value),s=kn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),s!=null&&(e.defaultValue=""+s)}function Gu(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function pf(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Pl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?pf(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ma,ff=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,s,r){MSApp.execUnsafeLocalFunction(function(){return e(t,n,s,r)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ma=ma||document.createElement("div"),ma.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ma.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Tr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var hr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ew=["Webkit","ms","Moz","O"];Object.keys(hr).forEach(function(e){Ew.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),hr[t]=hr[e]})});function gf(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||hr.hasOwnProperty(e)&&hr[e]?(""+t).trim():t+"px"}function yf(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var s=n.indexOf("--")===0,r=gf(n,t[n],s);n==="float"&&(n="cssFloat"),s?e.setProperty(n,r):e[n]=r}}var Pw=ue({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Rl(e,t){if(t){if(Pw[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(F(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(F(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(F(61))}if(t.style!=null&&typeof t.style!="object")throw Error(F(62))}}function Fl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Dl=null;function rd(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ml=null,Ns=null,Ts=null;function Ku(e){if(e=Jr(e)){if(typeof Ml!="function")throw Error(F(280));var t=e.stateNode;t&&(t=eo(t),Ml(e.stateNode,e.type,t))}}function vf(e){Ns?Ts?Ts.push(e):Ts=[e]:Ns=e}function bf(){if(Ns){var e=Ns,t=Ts;if(Ts=Ns=null,Ku(e),t)for(e=0;e<t.length;e++)Ku(t[e])}}function wf(e,t){return e(t)}function xf(){}var Co=!1;function kf(e,t,n){if(Co)return e(t,n);Co=!0;try{return wf(e,t,n)}finally{Co=!1,(Ns!==null||Ts!==null)&&(xf(),bf())}}function Cr(e,t){var n=e.stateNode;if(n===null)return null;var s=eo(n);if(s===null)return null;n=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(F(231,t,typeof n));return n}var Bl=!1;if(Xt)try{var Xs={};Object.defineProperty(Xs,"passive",{get:function(){Bl=!0}}),window.addEventListener("test",Xs,Xs),window.removeEventListener("test",Xs,Xs)}catch{Bl=!1}function Rw(e,t,n,s,r,i,o,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(u){this.onError(u)}}var mr=!1,oi=null,li=!1,Il=null,Fw={onError:function(e){mr=!0,oi=e}};function Dw(e,t,n,s,r,i,o,l,c){mr=!1,oi=null,Rw.apply(Fw,arguments)}function Mw(e,t,n,s,r,i,o,l,c){if(Dw.apply(this,arguments),mr){if(mr){var d=oi;mr=!1,oi=null}else throw Error(F(198));li||(li=!0,Il=d)}}function ss(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function jf(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Qu(e){if(ss(e)!==e)throw Error(F(188))}function Bw(e){var t=e.alternate;if(!t){if(t=ss(e),t===null)throw Error(F(188));return t!==e?null:e}for(var n=e,s=t;;){var r=n.return;if(r===null)break;var i=r.alternate;if(i===null){if(s=r.return,s!==null){n=s;continue}break}if(r.child===i.child){for(i=r.child;i;){if(i===n)return Qu(r),e;if(i===s)return Qu(r),t;i=i.sibling}throw Error(F(188))}if(n.return!==s.return)n=r,s=i;else{for(var o=!1,l=r.child;l;){if(l===n){o=!0,n=r,s=i;break}if(l===s){o=!0,s=r,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,s=r;break}if(l===s){o=!0,s=i,n=r;break}l=l.sibling}if(!o)throw Error(F(189))}}if(n.alternate!==s)throw Error(F(190))}if(n.tag!==3)throw Error(F(188));return n.stateNode.current===n?e:t}function Sf(e){return e=Bw(e),e!==null?Nf(e):null}function Nf(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Nf(e);if(t!==null)return t;e=e.sibling}return null}var Tf=it.unstable_scheduleCallback,Xu=it.unstable_cancelCallback,Iw=it.unstable_shouldYield,Lw=it.unstable_requestPaint,ye=it.unstable_now,$w=it.unstable_getCurrentPriorityLevel,ad=it.unstable_ImmediatePriority,Cf=it.unstable_UserBlockingPriority,ci=it.unstable_NormalPriority,_w=it.unstable_LowPriority,Af=it.unstable_IdlePriority,Qi=null,Lt=null;function Ow(e){if(Lt&&typeof Lt.onCommitFiberRoot=="function")try{Lt.onCommitFiberRoot(Qi,e,void 0,(e.current.flags&128)===128)}catch{}}var St=Math.clz32?Math.clz32:Vw,zw=Math.log,Ww=Math.LN2;function Vw(e){return e>>>=0,e===0?32:31-(zw(e)/Ww|0)|0}var pa=64,fa=4194304;function lr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function di(e,t){var n=e.pendingLanes;if(n===0)return 0;var s=0,r=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var l=o&~r;l!==0?s=lr(l):(i&=o,i!==0&&(s=lr(i)))}else o=n&~r,o!==0?s=lr(o):i!==0&&(s=lr(i));if(s===0)return 0;if(t!==0&&t!==s&&!(t&r)&&(r=s&-s,i=t&-t,r>=i||r===16&&(i&4194240)!==0))return t;if(s&4&&(s|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)n=31-St(t),r=1<<n,s|=e[n],t&=~r;return s}function Uw(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Hw(e,t){for(var n=e.suspendedLanes,s=e.pingedLanes,r=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-St(i),l=1<<o,c=r[o];c===-1?(!(l&n)||l&s)&&(r[o]=Uw(l,t)):c<=t&&(e.expiredLanes|=l),i&=~l}}function Ll(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ef(){var e=pa;return pa<<=1,!(pa&4194240)&&(pa=64),e}function Ao(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Qr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-St(t),e[t]=n}function qw(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<n;){var r=31-St(n),i=1<<r;t[r]=0,s[r]=-1,e[r]=-1,n&=~i}}function id(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var s=31-St(n),r=1<<s;r&t|e[s]&t&&(e[s]|=t),n&=~r}}var X=0;function Pf(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Rf,od,Ff,Df,Mf,$l=!1,ga=[],pn=null,fn=null,gn=null,Ar=new Map,Er=new Map,dn=[],Yw="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ju(e,t){switch(e){case"focusin":case"focusout":pn=null;break;case"dragenter":case"dragleave":fn=null;break;case"mouseover":case"mouseout":gn=null;break;case"pointerover":case"pointerout":Ar.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Er.delete(t.pointerId)}}function Js(e,t,n,s,r,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:s,nativeEvent:i,targetContainers:[r]},t!==null&&(t=Jr(t),t!==null&&od(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function Gw(e,t,n,s,r){switch(t){case"focusin":return pn=Js(pn,e,t,n,s,r),!0;case"dragenter":return fn=Js(fn,e,t,n,s,r),!0;case"mouseover":return gn=Js(gn,e,t,n,s,r),!0;case"pointerover":var i=r.pointerId;return Ar.set(i,Js(Ar.get(i)||null,e,t,n,s,r)),!0;case"gotpointercapture":return i=r.pointerId,Er.set(i,Js(Er.get(i)||null,e,t,n,s,r)),!0}return!1}function Bf(e){var t=Bn(e.target);if(t!==null){var n=ss(t);if(n!==null){if(t=n.tag,t===13){if(t=jf(n),t!==null){e.blockedOn=t,Mf(e.priority,function(){Ff(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Oa(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=_l(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var s=new n.constructor(n.type,n);Dl=s,n.target.dispatchEvent(s),Dl=null}else return t=Jr(n),t!==null&&od(t),e.blockedOn=n,!1;t.shift()}return!0}function Zu(e,t,n){Oa(e)&&n.delete(t)}function Kw(){$l=!1,pn!==null&&Oa(pn)&&(pn=null),fn!==null&&Oa(fn)&&(fn=null),gn!==null&&Oa(gn)&&(gn=null),Ar.forEach(Zu),Er.forEach(Zu)}function Zs(e,t){e.blockedOn===t&&(e.blockedOn=null,$l||($l=!0,it.unstable_scheduleCallback(it.unstable_NormalPriority,Kw)))}function Pr(e){function t(r){return Zs(r,e)}if(0<ga.length){Zs(ga[0],e);for(var n=1;n<ga.length;n++){var s=ga[n];s.blockedOn===e&&(s.blockedOn=null)}}for(pn!==null&&Zs(pn,e),fn!==null&&Zs(fn,e),gn!==null&&Zs(gn,e),Ar.forEach(t),Er.forEach(t),n=0;n<dn.length;n++)s=dn[n],s.blockedOn===e&&(s.blockedOn=null);for(;0<dn.length&&(n=dn[0],n.blockedOn===null);)Bf(n),n.blockedOn===null&&dn.shift()}var Cs=rn.ReactCurrentBatchConfig,ui=!0;function Qw(e,t,n,s){var r=X,i=Cs.transition;Cs.transition=null;try{X=1,ld(e,t,n,s)}finally{X=r,Cs.transition=i}}function Xw(e,t,n,s){var r=X,i=Cs.transition;Cs.transition=null;try{X=4,ld(e,t,n,s)}finally{X=r,Cs.transition=i}}function ld(e,t,n,s){if(ui){var r=_l(e,t,n,s);if(r===null)$o(e,t,s,hi,n),Ju(e,s);else if(Gw(r,e,t,n,s))s.stopPropagation();else if(Ju(e,s),t&4&&-1<Yw.indexOf(e)){for(;r!==null;){var i=Jr(r);if(i!==null&&Rf(i),i=_l(e,t,n,s),i===null&&$o(e,t,s,hi,n),i===r)break;r=i}r!==null&&s.stopPropagation()}else $o(e,t,s,null,n)}}var hi=null;function _l(e,t,n,s){if(hi=null,e=rd(s),e=Bn(e),e!==null)if(t=ss(e),t===null)e=null;else if(n=t.tag,n===13){if(e=jf(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return hi=e,null}function If(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch($w()){case ad:return 1;case Cf:return 4;case ci:case _w:return 16;case Af:return 536870912;default:return 16}default:return 16}}var hn=null,cd=null,za=null;function Lf(){if(za)return za;var e,t=cd,n=t.length,s,r="value"in hn?hn.value:hn.textContent,i=r.length;for(e=0;e<n&&t[e]===r[e];e++);var o=n-e;for(s=1;s<=o&&t[n-s]===r[i-s];s++);return za=r.slice(e,1<s?1-s:void 0)}function Wa(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ya(){return!0}function eh(){return!1}function lt(e){function t(n,s,r,i,o){this._reactName=n,this._targetInst=r,this.type=s,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ya:eh,this.isPropagationStopped=eh,this}return ue(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ya)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ya)},persist:function(){},isPersistent:ya}),t}var Vs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},dd=lt(Vs),Xr=ue({},Vs,{view:0,detail:0}),Jw=lt(Xr),Eo,Po,er,Xi=ue({},Xr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ud,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==er&&(er&&e.type==="mousemove"?(Eo=e.screenX-er.screenX,Po=e.screenY-er.screenY):Po=Eo=0,er=e),Eo)},movementY:function(e){return"movementY"in e?e.movementY:Po}}),th=lt(Xi),Zw=ue({},Xi,{dataTransfer:0}),ex=lt(Zw),tx=ue({},Xr,{relatedTarget:0}),Ro=lt(tx),nx=ue({},Vs,{animationName:0,elapsedTime:0,pseudoElement:0}),sx=lt(nx),rx=ue({},Vs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ax=lt(rx),ix=ue({},Vs,{data:0}),nh=lt(ix),ox={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},lx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},cx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dx(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=cx[e])?!!t[e]:!1}function ud(){return dx}var ux=ue({},Xr,{key:function(e){if(e.key){var t=ox[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Wa(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?lx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ud,charCode:function(e){return e.type==="keypress"?Wa(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Wa(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),hx=lt(ux),mx=ue({},Xi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),sh=lt(mx),px=ue({},Xr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ud}),fx=lt(px),gx=ue({},Vs,{propertyName:0,elapsedTime:0,pseudoElement:0}),yx=lt(gx),vx=ue({},Xi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),bx=lt(vx),wx=[9,13,27,32],hd=Xt&&"CompositionEvent"in window,pr=null;Xt&&"documentMode"in document&&(pr=document.documentMode);var xx=Xt&&"TextEvent"in window&&!pr,$f=Xt&&(!hd||pr&&8<pr&&11>=pr),rh=" ",ah=!1;function _f(e,t){switch(e){case"keyup":return wx.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Of(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ds=!1;function kx(e,t){switch(e){case"compositionend":return Of(t);case"keypress":return t.which!==32?null:(ah=!0,rh);case"textInput":return e=t.data,e===rh&&ah?null:e;default:return null}}function jx(e,t){if(ds)return e==="compositionend"||!hd&&_f(e,t)?(e=Lf(),za=cd=hn=null,ds=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return $f&&t.locale!=="ko"?null:t.data;default:return null}}var Sx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ih(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Sx[e.type]:t==="textarea"}function zf(e,t,n,s){vf(s),t=mi(t,"onChange"),0<t.length&&(n=new dd("onChange","change",null,n,s),e.push({event:n,listeners:t}))}var fr=null,Rr=null;function Nx(e){Jf(e,0)}function Ji(e){var t=ms(e);if(uf(t))return e}function Tx(e,t){if(e==="change")return t}var Wf=!1;if(Xt){var Fo;if(Xt){var Do="oninput"in document;if(!Do){var oh=document.createElement("div");oh.setAttribute("oninput","return;"),Do=typeof oh.oninput=="function"}Fo=Do}else Fo=!1;Wf=Fo&&(!document.documentMode||9<document.documentMode)}function lh(){fr&&(fr.detachEvent("onpropertychange",Vf),Rr=fr=null)}function Vf(e){if(e.propertyName==="value"&&Ji(Rr)){var t=[];zf(t,Rr,e,rd(e)),kf(Nx,t)}}function Cx(e,t,n){e==="focusin"?(lh(),fr=t,Rr=n,fr.attachEvent("onpropertychange",Vf)):e==="focusout"&&lh()}function Ax(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ji(Rr)}function Ex(e,t){if(e==="click")return Ji(t)}function Px(e,t){if(e==="input"||e==="change")return Ji(t)}function Rx(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var At=typeof Object.is=="function"?Object.is:Rx;function Fr(e,t){if(At(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),s=Object.keys(t);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var r=n[s];if(!xl.call(t,r)||!At(e[r],t[r]))return!1}return!0}function ch(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function dh(e,t){var n=ch(e);e=0;for(var s;n;){if(n.nodeType===3){if(s=e+n.textContent.length,e<=t&&s>=t)return{node:n,offset:t-e};e=s}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ch(n)}}function Uf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Uf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Hf(){for(var e=window,t=ii();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ii(e.document)}return t}function md(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Fx(e){var t=Hf(),n=e.focusedElem,s=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Uf(n.ownerDocument.documentElement,n)){if(s!==null&&md(n)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var r=n.textContent.length,i=Math.min(s.start,r);s=s.end===void 0?i:Math.min(s.end,r),!e.extend&&i>s&&(r=s,s=i,i=r),r=dh(n,i);var o=dh(n,s);r&&o&&(e.rangeCount!==1||e.anchorNode!==r.node||e.anchorOffset!==r.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(r.node,r.offset),e.removeAllRanges(),i>s?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Dx=Xt&&"documentMode"in document&&11>=document.documentMode,us=null,Ol=null,gr=null,zl=!1;function uh(e,t,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;zl||us==null||us!==ii(s)||(s=us,"selectionStart"in s&&md(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),gr&&Fr(gr,s)||(gr=s,s=mi(Ol,"onSelect"),0<s.length&&(t=new dd("onSelect","select",null,t,n),e.push({event:t,listeners:s}),t.target=us)))}function va(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var hs={animationend:va("Animation","AnimationEnd"),animationiteration:va("Animation","AnimationIteration"),animationstart:va("Animation","AnimationStart"),transitionend:va("Transition","TransitionEnd")},Mo={},qf={};Xt&&(qf=document.createElement("div").style,"AnimationEvent"in window||(delete hs.animationend.animation,delete hs.animationiteration.animation,delete hs.animationstart.animation),"TransitionEvent"in window||delete hs.transitionend.transition);function Zi(e){if(Mo[e])return Mo[e];if(!hs[e])return e;var t=hs[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in qf)return Mo[e]=t[n];return e}var Yf=Zi("animationend"),Gf=Zi("animationiteration"),Kf=Zi("animationstart"),Qf=Zi("transitionend"),Xf=new Map,hh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Tn(e,t){Xf.set(e,t),ns(t,[e])}for(var Bo=0;Bo<hh.length;Bo++){var Io=hh[Bo],Mx=Io.toLowerCase(),Bx=Io[0].toUpperCase()+Io.slice(1);Tn(Mx,"on"+Bx)}Tn(Yf,"onAnimationEnd");Tn(Gf,"onAnimationIteration");Tn(Kf,"onAnimationStart");Tn("dblclick","onDoubleClick");Tn("focusin","onFocus");Tn("focusout","onBlur");Tn(Qf,"onTransitionEnd");Rs("onMouseEnter",["mouseout","mouseover"]);Rs("onMouseLeave",["mouseout","mouseover"]);Rs("onPointerEnter",["pointerout","pointerover"]);Rs("onPointerLeave",["pointerout","pointerover"]);ns("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ns("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ns("onBeforeInput",["compositionend","keypress","textInput","paste"]);ns("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ns("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ns("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var cr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ix=new Set("cancel close invalid load scroll toggle".split(" ").concat(cr));function mh(e,t,n){var s=e.type||"unknown-event";e.currentTarget=n,Mw(s,t,void 0,e),e.currentTarget=null}function Jf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var s=e[n],r=s.event;s=s.listeners;e:{var i=void 0;if(t)for(var o=s.length-1;0<=o;o--){var l=s[o],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==i&&r.isPropagationStopped())break e;mh(r,l,d),i=c}else for(o=0;o<s.length;o++){if(l=s[o],c=l.instance,d=l.currentTarget,l=l.listener,c!==i&&r.isPropagationStopped())break e;mh(r,l,d),i=c}}}if(li)throw e=Il,li=!1,Il=null,e}function ne(e,t){var n=t[ql];n===void 0&&(n=t[ql]=new Set);var s=e+"__bubble";n.has(s)||(Zf(t,e,2,!1),n.add(s))}function Lo(e,t,n){var s=0;t&&(s|=4),Zf(n,e,s,t)}var ba="_reactListening"+Math.random().toString(36).slice(2);function Dr(e){if(!e[ba]){e[ba]=!0,af.forEach(function(n){n!=="selectionchange"&&(Ix.has(n)||Lo(n,!1,e),Lo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ba]||(t[ba]=!0,Lo("selectionchange",!1,t))}}function Zf(e,t,n,s){switch(If(t)){case 1:var r=Qw;break;case 4:r=Xw;break;default:r=ld}n=r.bind(null,t,n,e),r=void 0,!Bl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),s?r!==void 0?e.addEventListener(t,n,{capture:!0,passive:r}):e.addEventListener(t,n,!0):r!==void 0?e.addEventListener(t,n,{passive:r}):e.addEventListener(t,n,!1)}function $o(e,t,n,s,r){var i=s;if(!(t&1)&&!(t&2)&&s!==null)e:for(;;){if(s===null)return;var o=s.tag;if(o===3||o===4){var l=s.stateNode.containerInfo;if(l===r||l.nodeType===8&&l.parentNode===r)break;if(o===4)for(o=s.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===r||c.nodeType===8&&c.parentNode===r))return;o=o.return}for(;l!==null;){if(o=Bn(l),o===null)return;if(c=o.tag,c===5||c===6){s=i=o;continue e}l=l.parentNode}}s=s.return}kf(function(){var d=i,u=rd(n),h=[];e:{var m=Xf.get(e);if(m!==void 0){var y=dd,p=e;switch(e){case"keypress":if(Wa(n)===0)break e;case"keydown":case"keyup":y=hx;break;case"focusin":p="focus",y=Ro;break;case"focusout":p="blur",y=Ro;break;case"beforeblur":case"afterblur":y=Ro;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=th;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=ex;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=fx;break;case Yf:case Gf:case Kf:y=sx;break;case Qf:y=yx;break;case"scroll":y=Jw;break;case"wheel":y=bx;break;case"copy":case"cut":case"paste":y=ax;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=sh}var b=(t&4)!==0,x=!b&&e==="scroll",f=b?m!==null?m+"Capture":null:m;b=[];for(var g=d,v;g!==null;){v=g;var k=v.stateNode;if(v.tag===5&&k!==null&&(v=k,f!==null&&(k=Cr(g,f),k!=null&&b.push(Mr(g,k,v)))),x)break;g=g.return}0<b.length&&(m=new y(m,p,null,n,u),h.push({event:m,listeners:b}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",m&&n!==Dl&&(p=n.relatedTarget||n.fromElement)&&(Bn(p)||p[Jt]))break e;if((y||m)&&(m=u.window===u?u:(m=u.ownerDocument)?m.defaultView||m.parentWindow:window,y?(p=n.relatedTarget||n.toElement,y=d,p=p?Bn(p):null,p!==null&&(x=ss(p),p!==x||p.tag!==5&&p.tag!==6)&&(p=null)):(y=null,p=d),y!==p)){if(b=th,k="onMouseLeave",f="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(b=sh,k="onPointerLeave",f="onPointerEnter",g="pointer"),x=y==null?m:ms(y),v=p==null?m:ms(p),m=new b(k,g+"leave",y,n,u),m.target=x,m.relatedTarget=v,k=null,Bn(u)===d&&(b=new b(f,g+"enter",p,n,u),b.target=v,b.relatedTarget=x,k=b),x=k,y&&p)t:{for(b=y,f=p,g=0,v=b;v;v=as(v))g++;for(v=0,k=f;k;k=as(k))v++;for(;0<g-v;)b=as(b),g--;for(;0<v-g;)f=as(f),v--;for(;g--;){if(b===f||f!==null&&b===f.alternate)break t;b=as(b),f=as(f)}b=null}else b=null;y!==null&&ph(h,m,y,b,!1),p!==null&&x!==null&&ph(h,x,p,b,!0)}}e:{if(m=d?ms(d):window,y=m.nodeName&&m.nodeName.toLowerCase(),y==="select"||y==="input"&&m.type==="file")var N=Tx;else if(ih(m))if(Wf)N=Px;else{N=Ax;var T=Cx}else(y=m.nodeName)&&y.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(N=Ex);if(N&&(N=N(e,d))){zf(h,N,n,u);break e}T&&T(e,m,d),e==="focusout"&&(T=m._wrapperState)&&T.controlled&&m.type==="number"&&Al(m,"number",m.value)}switch(T=d?ms(d):window,e){case"focusin":(ih(T)||T.contentEditable==="true")&&(us=T,Ol=d,gr=null);break;case"focusout":gr=Ol=us=null;break;case"mousedown":zl=!0;break;case"contextmenu":case"mouseup":case"dragend":zl=!1,uh(h,n,u);break;case"selectionchange":if(Dx)break;case"keydown":case"keyup":uh(h,n,u)}var j;if(hd)e:{switch(e){case"compositionstart":var S="onCompositionStart";break e;case"compositionend":S="onCompositionEnd";break e;case"compositionupdate":S="onCompositionUpdate";break e}S=void 0}else ds?_f(e,n)&&(S="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(S="onCompositionStart");S&&($f&&n.locale!=="ko"&&(ds||S!=="onCompositionStart"?S==="onCompositionEnd"&&ds&&(j=Lf()):(hn=u,cd="value"in hn?hn.value:hn.textContent,ds=!0)),T=mi(d,S),0<T.length&&(S=new nh(S,e,null,n,u),h.push({event:S,listeners:T}),j?S.data=j:(j=Of(n),j!==null&&(S.data=j)))),(j=xx?kx(e,n):jx(e,n))&&(d=mi(d,"onBeforeInput"),0<d.length&&(u=new nh("onBeforeInput","beforeinput",null,n,u),h.push({event:u,listeners:d}),u.data=j))}Jf(h,t)})}function Mr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function mi(e,t){for(var n=t+"Capture",s=[];e!==null;){var r=e,i=r.stateNode;r.tag===5&&i!==null&&(r=i,i=Cr(e,n),i!=null&&s.unshift(Mr(e,i,r)),i=Cr(e,t),i!=null&&s.push(Mr(e,i,r))),e=e.return}return s}function as(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ph(e,t,n,s,r){for(var i=t._reactName,o=[];n!==null&&n!==s;){var l=n,c=l.alternate,d=l.stateNode;if(c!==null&&c===s)break;l.tag===5&&d!==null&&(l=d,r?(c=Cr(n,i),c!=null&&o.unshift(Mr(n,c,l))):r||(c=Cr(n,i),c!=null&&o.push(Mr(n,c,l)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Lx=/\r\n?/g,$x=/\u0000|\uFFFD/g;function fh(e){return(typeof e=="string"?e:""+e).replace(Lx,`
`).replace($x,"")}function wa(e,t,n){if(t=fh(t),fh(e)!==t&&n)throw Error(F(425))}function pi(){}var Wl=null,Vl=null;function Ul(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Hl=typeof setTimeout=="function"?setTimeout:void 0,_x=typeof clearTimeout=="function"?clearTimeout:void 0,gh=typeof Promise=="function"?Promise:void 0,Ox=typeof queueMicrotask=="function"?queueMicrotask:typeof gh<"u"?function(e){return gh.resolve(null).then(e).catch(zx)}:Hl;function zx(e){setTimeout(function(){throw e})}function _o(e,t){var n=t,s=0;do{var r=n.nextSibling;if(e.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(s===0){e.removeChild(r),Pr(t);return}s--}else n!=="$"&&n!=="$?"&&n!=="$!"||s++;n=r}while(n);Pr(t)}function yn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function yh(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Us=Math.random().toString(36).slice(2),It="__reactFiber$"+Us,Br="__reactProps$"+Us,Jt="__reactContainer$"+Us,ql="__reactEvents$"+Us,Wx="__reactListeners$"+Us,Vx="__reactHandles$"+Us;function Bn(e){var t=e[It];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Jt]||n[It]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=yh(e);e!==null;){if(n=e[It])return n;e=yh(e)}return t}e=n,n=e.parentNode}return null}function Jr(e){return e=e[It]||e[Jt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ms(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(F(33))}function eo(e){return e[Br]||null}var Yl=[],ps=-1;function Cn(e){return{current:e}}function se(e){0>ps||(e.current=Yl[ps],Yl[ps]=null,ps--)}function te(e,t){ps++,Yl[ps]=e.current,e.current=t}var jn={},Oe=Cn(jn),Qe=Cn(!1),qn=jn;function Fs(e,t){var n=e.type.contextTypes;if(!n)return jn;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var r={},i;for(i in n)r[i]=t[i];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=r),r}function Xe(e){return e=e.childContextTypes,e!=null}function fi(){se(Qe),se(Oe)}function vh(e,t,n){if(Oe.current!==jn)throw Error(F(168));te(Oe,t),te(Qe,n)}function eg(e,t,n){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return n;s=s.getChildContext();for(var r in s)if(!(r in t))throw Error(F(108,Cw(e)||"Unknown",r));return ue({},n,s)}function gi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||jn,qn=Oe.current,te(Oe,e),te(Qe,Qe.current),!0}function bh(e,t,n){var s=e.stateNode;if(!s)throw Error(F(169));n?(e=eg(e,t,qn),s.__reactInternalMemoizedMergedChildContext=e,se(Qe),se(Oe),te(Oe,e)):se(Qe),te(Qe,n)}var Yt=null,to=!1,Oo=!1;function tg(e){Yt===null?Yt=[e]:Yt.push(e)}function Ux(e){to=!0,tg(e)}function An(){if(!Oo&&Yt!==null){Oo=!0;var e=0,t=X;try{var n=Yt;for(X=1;e<n.length;e++){var s=n[e];do s=s(!0);while(s!==null)}Yt=null,to=!1}catch(r){throw Yt!==null&&(Yt=Yt.slice(e+1)),Tf(ad,An),r}finally{X=t,Oo=!1}}return null}var fs=[],gs=0,yi=null,vi=0,dt=[],ut=0,Yn=null,Gt=1,Kt="";function Fn(e,t){fs[gs++]=vi,fs[gs++]=yi,yi=e,vi=t}function ng(e,t,n){dt[ut++]=Gt,dt[ut++]=Kt,dt[ut++]=Yn,Yn=e;var s=Gt;e=Kt;var r=32-St(s)-1;s&=~(1<<r),n+=1;var i=32-St(t)+r;if(30<i){var o=r-r%5;i=(s&(1<<o)-1).toString(32),s>>=o,r-=o,Gt=1<<32-St(t)+r|n<<r|s,Kt=i+e}else Gt=1<<i|n<<r|s,Kt=e}function pd(e){e.return!==null&&(Fn(e,1),ng(e,1,0))}function fd(e){for(;e===yi;)yi=fs[--gs],fs[gs]=null,vi=fs[--gs],fs[gs]=null;for(;e===Yn;)Yn=dt[--ut],dt[ut]=null,Kt=dt[--ut],dt[ut]=null,Gt=dt[--ut],dt[ut]=null}var rt=null,nt=null,ae=!1,jt=null;function sg(e,t){var n=ht(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function wh(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,rt=e,nt=yn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,rt=e,nt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Yn!==null?{id:Gt,overflow:Kt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=ht(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,rt=e,nt=null,!0):!1;default:return!1}}function Gl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Kl(e){if(ae){var t=nt;if(t){var n=t;if(!wh(e,t)){if(Gl(e))throw Error(F(418));t=yn(n.nextSibling);var s=rt;t&&wh(e,t)?sg(s,n):(e.flags=e.flags&-4097|2,ae=!1,rt=e)}}else{if(Gl(e))throw Error(F(418));e.flags=e.flags&-4097|2,ae=!1,rt=e}}}function xh(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;rt=e}function xa(e){if(e!==rt)return!1;if(!ae)return xh(e),ae=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ul(e.type,e.memoizedProps)),t&&(t=nt)){if(Gl(e))throw rg(),Error(F(418));for(;t;)sg(e,t),t=yn(t.nextSibling)}if(xh(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(F(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){nt=yn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}nt=null}}else nt=rt?yn(e.stateNode.nextSibling):null;return!0}function rg(){for(var e=nt;e;)e=yn(e.nextSibling)}function Ds(){nt=rt=null,ae=!1}function gd(e){jt===null?jt=[e]:jt.push(e)}var Hx=rn.ReactCurrentBatchConfig;function tr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(F(309));var s=n.stateNode}if(!s)throw Error(F(147,e));var r=s,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var l=r.refs;o===null?delete l[i]:l[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(F(284));if(!n._owner)throw Error(F(290,e))}return e}function ka(e,t){throw e=Object.prototype.toString.call(t),Error(F(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function kh(e){var t=e._init;return t(e._payload)}function ag(e){function t(f,g){if(e){var v=f.deletions;v===null?(f.deletions=[g],f.flags|=16):v.push(g)}}function n(f,g){if(!e)return null;for(;g!==null;)t(f,g),g=g.sibling;return null}function s(f,g){for(f=new Map;g!==null;)g.key!==null?f.set(g.key,g):f.set(g.index,g),g=g.sibling;return f}function r(f,g){return f=xn(f,g),f.index=0,f.sibling=null,f}function i(f,g,v){return f.index=v,e?(v=f.alternate,v!==null?(v=v.index,v<g?(f.flags|=2,g):v):(f.flags|=2,g)):(f.flags|=1048576,g)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function l(f,g,v,k){return g===null||g.tag!==6?(g=Yo(v,f.mode,k),g.return=f,g):(g=r(g,v),g.return=f,g)}function c(f,g,v,k){var N=v.type;return N===cs?u(f,g,v.props.children,k,v.key):g!==null&&(g.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===ln&&kh(N)===g.type)?(k=r(g,v.props),k.ref=tr(f,g,v),k.return=f,k):(k=Ka(v.type,v.key,v.props,null,f.mode,k),k.ref=tr(f,g,v),k.return=f,k)}function d(f,g,v,k){return g===null||g.tag!==4||g.stateNode.containerInfo!==v.containerInfo||g.stateNode.implementation!==v.implementation?(g=Go(v,f.mode,k),g.return=f,g):(g=r(g,v.children||[]),g.return=f,g)}function u(f,g,v,k,N){return g===null||g.tag!==7?(g=zn(v,f.mode,k,N),g.return=f,g):(g=r(g,v),g.return=f,g)}function h(f,g,v){if(typeof g=="string"&&g!==""||typeof g=="number")return g=Yo(""+g,f.mode,v),g.return=f,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ua:return v=Ka(g.type,g.key,g.props,null,f.mode,v),v.ref=tr(f,null,g),v.return=f,v;case ls:return g=Go(g,f.mode,v),g.return=f,g;case ln:var k=g._init;return h(f,k(g._payload),v)}if(or(g)||Qs(g))return g=zn(g,f.mode,v,null),g.return=f,g;ka(f,g)}return null}function m(f,g,v,k){var N=g!==null?g.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return N!==null?null:l(f,g,""+v,k);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ua:return v.key===N?c(f,g,v,k):null;case ls:return v.key===N?d(f,g,v,k):null;case ln:return N=v._init,m(f,g,N(v._payload),k)}if(or(v)||Qs(v))return N!==null?null:u(f,g,v,k,null);ka(f,v)}return null}function y(f,g,v,k,N){if(typeof k=="string"&&k!==""||typeof k=="number")return f=f.get(v)||null,l(g,f,""+k,N);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case ua:return f=f.get(k.key===null?v:k.key)||null,c(g,f,k,N);case ls:return f=f.get(k.key===null?v:k.key)||null,d(g,f,k,N);case ln:var T=k._init;return y(f,g,v,T(k._payload),N)}if(or(k)||Qs(k))return f=f.get(v)||null,u(g,f,k,N,null);ka(g,k)}return null}function p(f,g,v,k){for(var N=null,T=null,j=g,S=g=0,A=null;j!==null&&S<v.length;S++){j.index>S?(A=j,j=null):A=j.sibling;var P=m(f,j,v[S],k);if(P===null){j===null&&(j=A);break}e&&j&&P.alternate===null&&t(f,j),g=i(P,g,S),T===null?N=P:T.sibling=P,T=P,j=A}if(S===v.length)return n(f,j),ae&&Fn(f,S),N;if(j===null){for(;S<v.length;S++)j=h(f,v[S],k),j!==null&&(g=i(j,g,S),T===null?N=j:T.sibling=j,T=j);return ae&&Fn(f,S),N}for(j=s(f,j);S<v.length;S++)A=y(j,f,S,v[S],k),A!==null&&(e&&A.alternate!==null&&j.delete(A.key===null?S:A.key),g=i(A,g,S),T===null?N=A:T.sibling=A,T=A);return e&&j.forEach(function($){return t(f,$)}),ae&&Fn(f,S),N}function b(f,g,v,k){var N=Qs(v);if(typeof N!="function")throw Error(F(150));if(v=N.call(v),v==null)throw Error(F(151));for(var T=N=null,j=g,S=g=0,A=null,P=v.next();j!==null&&!P.done;S++,P=v.next()){j.index>S?(A=j,j=null):A=j.sibling;var $=m(f,j,P.value,k);if($===null){j===null&&(j=A);break}e&&j&&$.alternate===null&&t(f,j),g=i($,g,S),T===null?N=$:T.sibling=$,T=$,j=A}if(P.done)return n(f,j),ae&&Fn(f,S),N;if(j===null){for(;!P.done;S++,P=v.next())P=h(f,P.value,k),P!==null&&(g=i(P,g,S),T===null?N=P:T.sibling=P,T=P);return ae&&Fn(f,S),N}for(j=s(f,j);!P.done;S++,P=v.next())P=y(j,f,S,P.value,k),P!==null&&(e&&P.alternate!==null&&j.delete(P.key===null?S:P.key),g=i(P,g,S),T===null?N=P:T.sibling=P,T=P);return e&&j.forEach(function(Q){return t(f,Q)}),ae&&Fn(f,S),N}function x(f,g,v,k){if(typeof v=="object"&&v!==null&&v.type===cs&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case ua:e:{for(var N=v.key,T=g;T!==null;){if(T.key===N){if(N=v.type,N===cs){if(T.tag===7){n(f,T.sibling),g=r(T,v.props.children),g.return=f,f=g;break e}}else if(T.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===ln&&kh(N)===T.type){n(f,T.sibling),g=r(T,v.props),g.ref=tr(f,T,v),g.return=f,f=g;break e}n(f,T);break}else t(f,T);T=T.sibling}v.type===cs?(g=zn(v.props.children,f.mode,k,v.key),g.return=f,f=g):(k=Ka(v.type,v.key,v.props,null,f.mode,k),k.ref=tr(f,g,v),k.return=f,f=k)}return o(f);case ls:e:{for(T=v.key;g!==null;){if(g.key===T)if(g.tag===4&&g.stateNode.containerInfo===v.containerInfo&&g.stateNode.implementation===v.implementation){n(f,g.sibling),g=r(g,v.children||[]),g.return=f,f=g;break e}else{n(f,g);break}else t(f,g);g=g.sibling}g=Go(v,f.mode,k),g.return=f,f=g}return o(f);case ln:return T=v._init,x(f,g,T(v._payload),k)}if(or(v))return p(f,g,v,k);if(Qs(v))return b(f,g,v,k);ka(f,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,g!==null&&g.tag===6?(n(f,g.sibling),g=r(g,v),g.return=f,f=g):(n(f,g),g=Yo(v,f.mode,k),g.return=f,f=g),o(f)):n(f,g)}return x}var Ms=ag(!0),ig=ag(!1),bi=Cn(null),wi=null,ys=null,yd=null;function vd(){yd=ys=wi=null}function bd(e){var t=bi.current;se(bi),e._currentValue=t}function Ql(e,t,n){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===n)break;e=e.return}}function As(e,t){wi=e,yd=ys=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ke=!0),e.firstContext=null)}function ft(e){var t=e._currentValue;if(yd!==e)if(e={context:e,memoizedValue:t,next:null},ys===null){if(wi===null)throw Error(F(308));ys=e,wi.dependencies={lanes:0,firstContext:e}}else ys=ys.next=e;return t}var In=null;function wd(e){In===null?In=[e]:In.push(e)}function og(e,t,n,s){var r=t.interleaved;return r===null?(n.next=n,wd(t)):(n.next=r.next,r.next=n),t.interleaved=n,Zt(e,s)}function Zt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var cn=!1;function xd(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function lg(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Qt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function vn(e,t,n){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,K&2){var r=s.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),s.pending=t,Zt(e,n)}return r=s.interleaved,r===null?(t.next=t,wd(s)):(t.next=r.next,r.next=t),s.interleaved=t,Zt(e,n)}function Va(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,n|=s,t.lanes=n,id(e,n)}}function jh(e,t){var n=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var r=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?r=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?r=i=t:i=i.next=t}else r=i=t;n={baseState:s.baseState,firstBaseUpdate:r,lastBaseUpdate:i,shared:s.shared,effects:s.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function xi(e,t,n,s){var r=e.updateQueue;cn=!1;var i=r.firstBaseUpdate,o=r.lastBaseUpdate,l=r.shared.pending;if(l!==null){r.shared.pending=null;var c=l,d=c.next;c.next=null,o===null?i=d:o.next=d,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,l=u.lastBaseUpdate,l!==o&&(l===null?u.firstBaseUpdate=d:l.next=d,u.lastBaseUpdate=c))}if(i!==null){var h=r.baseState;o=0,u=d=c=null,l=i;do{var m=l.lane,y=l.eventTime;if((s&m)===m){u!==null&&(u=u.next={eventTime:y,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var p=e,b=l;switch(m=t,y=n,b.tag){case 1:if(p=b.payload,typeof p=="function"){h=p.call(y,h,m);break e}h=p;break e;case 3:p.flags=p.flags&-65537|128;case 0:if(p=b.payload,m=typeof p=="function"?p.call(y,h,m):p,m==null)break e;h=ue({},h,m);break e;case 2:cn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,m=r.effects,m===null?r.effects=[l]:m.push(l))}else y={eventTime:y,lane:m,tag:l.tag,payload:l.payload,callback:l.callback,next:null},u===null?(d=u=y,c=h):u=u.next=y,o|=m;if(l=l.next,l===null){if(l=r.shared.pending,l===null)break;m=l,l=m.next,m.next=null,r.lastBaseUpdate=m,r.shared.pending=null}}while(!0);if(u===null&&(c=h),r.baseState=c,r.firstBaseUpdate=d,r.lastBaseUpdate=u,t=r.shared.interleaved,t!==null){r=t;do o|=r.lane,r=r.next;while(r!==t)}else i===null&&(r.shared.lanes=0);Kn|=o,e.lanes=o,e.memoizedState=h}}function Sh(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],r=s.callback;if(r!==null){if(s.callback=null,s=n,typeof r!="function")throw Error(F(191,r));r.call(s)}}}var Zr={},$t=Cn(Zr),Ir=Cn(Zr),Lr=Cn(Zr);function Ln(e){if(e===Zr)throw Error(F(174));return e}function kd(e,t){switch(te(Lr,t),te(Ir,e),te($t,Zr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Pl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Pl(t,e)}se($t),te($t,t)}function Bs(){se($t),se(Ir),se(Lr)}function cg(e){Ln(Lr.current);var t=Ln($t.current),n=Pl(t,e.type);t!==n&&(te(Ir,e),te($t,n))}function jd(e){Ir.current===e&&(se($t),se(Ir))}var le=Cn(0);function ki(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var zo=[];function Sd(){for(var e=0;e<zo.length;e++)zo[e]._workInProgressVersionPrimary=null;zo.length=0}var Ua=rn.ReactCurrentDispatcher,Wo=rn.ReactCurrentBatchConfig,Gn=0,ce=null,Se=null,Ce=null,ji=!1,yr=!1,$r=0,qx=0;function Be(){throw Error(F(321))}function Nd(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!At(e[n],t[n]))return!1;return!0}function Td(e,t,n,s,r,i){if(Gn=i,ce=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ua.current=e===null||e.memoizedState===null?Qx:Xx,e=n(s,r),yr){i=0;do{if(yr=!1,$r=0,25<=i)throw Error(F(301));i+=1,Ce=Se=null,t.updateQueue=null,Ua.current=Jx,e=n(s,r)}while(yr)}if(Ua.current=Si,t=Se!==null&&Se.next!==null,Gn=0,Ce=Se=ce=null,ji=!1,t)throw Error(F(300));return e}function Cd(){var e=$r!==0;return $r=0,e}function Dt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ce===null?ce.memoizedState=Ce=e:Ce=Ce.next=e,Ce}function gt(){if(Se===null){var e=ce.alternate;e=e!==null?e.memoizedState:null}else e=Se.next;var t=Ce===null?ce.memoizedState:Ce.next;if(t!==null)Ce=t,Se=e;else{if(e===null)throw Error(F(310));Se=e,e={memoizedState:Se.memoizedState,baseState:Se.baseState,baseQueue:Se.baseQueue,queue:Se.queue,next:null},Ce===null?ce.memoizedState=Ce=e:Ce=Ce.next=e}return Ce}function _r(e,t){return typeof t=="function"?t(e):t}function Vo(e){var t=gt(),n=t.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=e;var s=Se,r=s.baseQueue,i=n.pending;if(i!==null){if(r!==null){var o=r.next;r.next=i.next,i.next=o}s.baseQueue=r=i,n.pending=null}if(r!==null){i=r.next,s=s.baseState;var l=o=null,c=null,d=i;do{var u=d.lane;if((Gn&u)===u)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),s=d.hasEagerState?d.eagerState:e(s,d.action);else{var h={lane:u,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=h,o=s):c=c.next=h,ce.lanes|=u,Kn|=u}d=d.next}while(d!==null&&d!==i);c===null?o=s:c.next=l,At(s,t.memoizedState)||(Ke=!0),t.memoizedState=s,t.baseState=o,t.baseQueue=c,n.lastRenderedState=s}if(e=n.interleaved,e!==null){r=e;do i=r.lane,ce.lanes|=i,Kn|=i,r=r.next;while(r!==e)}else r===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Uo(e){var t=gt(),n=t.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=e;var s=n.dispatch,r=n.pending,i=t.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do i=e(i,o.action),o=o.next;while(o!==r);At(i,t.memoizedState)||(Ke=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,s]}function dg(){}function ug(e,t){var n=ce,s=gt(),r=t(),i=!At(s.memoizedState,r);if(i&&(s.memoizedState=r,Ke=!0),s=s.queue,Ad(pg.bind(null,n,s,e),[e]),s.getSnapshot!==t||i||Ce!==null&&Ce.memoizedState.tag&1){if(n.flags|=2048,Or(9,mg.bind(null,n,s,r,t),void 0,null),Ae===null)throw Error(F(349));Gn&30||hg(n,t,r)}return r}function hg(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ce.updateQueue,t===null?(t={lastEffect:null,stores:null},ce.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function mg(e,t,n,s){t.value=n,t.getSnapshot=s,fg(t)&&gg(e)}function pg(e,t,n){return n(function(){fg(t)&&gg(e)})}function fg(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!At(e,n)}catch{return!0}}function gg(e){var t=Zt(e,1);t!==null&&Nt(t,e,1,-1)}function Nh(e){var t=Dt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:_r,lastRenderedState:e},t.queue=e,e=e.dispatch=Kx.bind(null,ce,e),[t.memoizedState,e]}function Or(e,t,n,s){return e={tag:e,create:t,destroy:n,deps:s,next:null},t=ce.updateQueue,t===null?(t={lastEffect:null,stores:null},ce.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(s=n.next,n.next=e,e.next=s,t.lastEffect=e)),e}function yg(){return gt().memoizedState}function Ha(e,t,n,s){var r=Dt();ce.flags|=e,r.memoizedState=Or(1|t,n,void 0,s===void 0?null:s)}function no(e,t,n,s){var r=gt();s=s===void 0?null:s;var i=void 0;if(Se!==null){var o=Se.memoizedState;if(i=o.destroy,s!==null&&Nd(s,o.deps)){r.memoizedState=Or(t,n,i,s);return}}ce.flags|=e,r.memoizedState=Or(1|t,n,i,s)}function Th(e,t){return Ha(8390656,8,e,t)}function Ad(e,t){return no(2048,8,e,t)}function vg(e,t){return no(4,2,e,t)}function bg(e,t){return no(4,4,e,t)}function wg(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function xg(e,t,n){return n=n!=null?n.concat([e]):null,no(4,4,wg.bind(null,t,e),n)}function Ed(){}function kg(e,t){var n=gt();t=t===void 0?null:t;var s=n.memoizedState;return s!==null&&t!==null&&Nd(t,s[1])?s[0]:(n.memoizedState=[e,t],e)}function jg(e,t){var n=gt();t=t===void 0?null:t;var s=n.memoizedState;return s!==null&&t!==null&&Nd(t,s[1])?s[0]:(e=e(),n.memoizedState=[e,t],e)}function Sg(e,t,n){return Gn&21?(At(n,t)||(n=Ef(),ce.lanes|=n,Kn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ke=!0),e.memoizedState=n)}function Yx(e,t){var n=X;X=n!==0&&4>n?n:4,e(!0);var s=Wo.transition;Wo.transition={};try{e(!1),t()}finally{X=n,Wo.transition=s}}function Ng(){return gt().memoizedState}function Gx(e,t,n){var s=wn(e);if(n={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null},Tg(e))Cg(t,n);else if(n=og(e,t,n,s),n!==null){var r=Ve();Nt(n,e,s,r),Ag(n,t,s)}}function Kx(e,t,n){var s=wn(e),r={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null};if(Tg(e))Cg(t,r);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,l=i(o,n);if(r.hasEagerState=!0,r.eagerState=l,At(l,o)){var c=t.interleaved;c===null?(r.next=r,wd(t)):(r.next=c.next,c.next=r),t.interleaved=r;return}}catch{}finally{}n=og(e,t,r,s),n!==null&&(r=Ve(),Nt(n,e,s,r),Ag(n,t,s))}}function Tg(e){var t=e.alternate;return e===ce||t!==null&&t===ce}function Cg(e,t){yr=ji=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ag(e,t,n){if(n&4194240){var s=t.lanes;s&=e.pendingLanes,n|=s,t.lanes=n,id(e,n)}}var Si={readContext:ft,useCallback:Be,useContext:Be,useEffect:Be,useImperativeHandle:Be,useInsertionEffect:Be,useLayoutEffect:Be,useMemo:Be,useReducer:Be,useRef:Be,useState:Be,useDebugValue:Be,useDeferredValue:Be,useTransition:Be,useMutableSource:Be,useSyncExternalStore:Be,useId:Be,unstable_isNewReconciler:!1},Qx={readContext:ft,useCallback:function(e,t){return Dt().memoizedState=[e,t===void 0?null:t],e},useContext:ft,useEffect:Th,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ha(4194308,4,wg.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ha(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ha(4,2,e,t)},useMemo:function(e,t){var n=Dt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var s=Dt();return t=n!==void 0?n(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=Gx.bind(null,ce,e),[s.memoizedState,e]},useRef:function(e){var t=Dt();return e={current:e},t.memoizedState=e},useState:Nh,useDebugValue:Ed,useDeferredValue:function(e){return Dt().memoizedState=e},useTransition:function(){var e=Nh(!1),t=e[0];return e=Yx.bind(null,e[1]),Dt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var s=ce,r=Dt();if(ae){if(n===void 0)throw Error(F(407));n=n()}else{if(n=t(),Ae===null)throw Error(F(349));Gn&30||hg(s,t,n)}r.memoizedState=n;var i={value:n,getSnapshot:t};return r.queue=i,Th(pg.bind(null,s,i,e),[e]),s.flags|=2048,Or(9,mg.bind(null,s,i,n,t),void 0,null),n},useId:function(){var e=Dt(),t=Ae.identifierPrefix;if(ae){var n=Kt,s=Gt;n=(s&~(1<<32-St(s)-1)).toString(32)+n,t=":"+t+"R"+n,n=$r++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=qx++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Xx={readContext:ft,useCallback:kg,useContext:ft,useEffect:Ad,useImperativeHandle:xg,useInsertionEffect:vg,useLayoutEffect:bg,useMemo:jg,useReducer:Vo,useRef:yg,useState:function(){return Vo(_r)},useDebugValue:Ed,useDeferredValue:function(e){var t=gt();return Sg(t,Se.memoizedState,e)},useTransition:function(){var e=Vo(_r)[0],t=gt().memoizedState;return[e,t]},useMutableSource:dg,useSyncExternalStore:ug,useId:Ng,unstable_isNewReconciler:!1},Jx={readContext:ft,useCallback:kg,useContext:ft,useEffect:Ad,useImperativeHandle:xg,useInsertionEffect:vg,useLayoutEffect:bg,useMemo:jg,useReducer:Uo,useRef:yg,useState:function(){return Uo(_r)},useDebugValue:Ed,useDeferredValue:function(e){var t=gt();return Se===null?t.memoizedState=e:Sg(t,Se.memoizedState,e)},useTransition:function(){var e=Uo(_r)[0],t=gt().memoizedState;return[e,t]},useMutableSource:dg,useSyncExternalStore:ug,useId:Ng,unstable_isNewReconciler:!1};function xt(e,t){if(e&&e.defaultProps){t=ue({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Xl(e,t,n,s){t=e.memoizedState,n=n(s,t),n=n==null?t:ue({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var so={isMounted:function(e){return(e=e._reactInternals)?ss(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var s=Ve(),r=wn(e),i=Qt(s,r);i.payload=t,n!=null&&(i.callback=n),t=vn(e,i,r),t!==null&&(Nt(t,e,r,s),Va(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var s=Ve(),r=wn(e),i=Qt(s,r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=vn(e,i,r),t!==null&&(Nt(t,e,r,s),Va(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ve(),s=wn(e),r=Qt(n,s);r.tag=2,t!=null&&(r.callback=t),t=vn(e,r,s),t!==null&&(Nt(t,e,s,n),Va(t,e,s))}};function Ch(e,t,n,s,r,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,i,o):t.prototype&&t.prototype.isPureReactComponent?!Fr(n,s)||!Fr(r,i):!0}function Eg(e,t,n){var s=!1,r=jn,i=t.contextType;return typeof i=="object"&&i!==null?i=ft(i):(r=Xe(t)?qn:Oe.current,s=t.contextTypes,i=(s=s!=null)?Fs(e,r):jn),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=so,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=i),t}function Ah(e,t,n,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,s),t.state!==e&&so.enqueueReplaceState(t,t.state,null)}function Jl(e,t,n,s){var r=e.stateNode;r.props=n,r.state=e.memoizedState,r.refs={},xd(e);var i=t.contextType;typeof i=="object"&&i!==null?r.context=ft(i):(i=Xe(t)?qn:Oe.current,r.context=Fs(e,i)),r.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Xl(e,t,i,n),r.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(t=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),t!==r.state&&so.enqueueReplaceState(r,r.state,null),xi(e,n,r,s),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308)}function Is(e,t){try{var n="",s=t;do n+=Tw(s),s=s.return;while(s);var r=n}catch(i){r=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:r,digest:null}}function Ho(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Zl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Zx=typeof WeakMap=="function"?WeakMap:Map;function Pg(e,t,n){n=Qt(-1,n),n.tag=3,n.payload={element:null};var s=t.value;return n.callback=function(){Ti||(Ti=!0,cc=s),Zl(e,t)},n}function Rg(e,t,n){n=Qt(-1,n),n.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var r=t.value;n.payload=function(){return s(r)},n.callback=function(){Zl(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Zl(e,t),typeof s!="function"&&(bn===null?bn=new Set([this]):bn.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Eh(e,t,n){var s=e.pingCache;if(s===null){s=e.pingCache=new Zx;var r=new Set;s.set(t,r)}else r=s.get(t),r===void 0&&(r=new Set,s.set(t,r));r.has(n)||(r.add(n),e=mk.bind(null,e,t,n),t.then(e,e))}function Ph(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Rh(e,t,n,s,r){return e.mode&1?(e.flags|=65536,e.lanes=r,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Qt(-1,1),t.tag=2,vn(n,t,1))),n.lanes|=1),e)}var ek=rn.ReactCurrentOwner,Ke=!1;function ze(e,t,n,s){t.child=e===null?ig(t,null,n,s):Ms(t,e.child,n,s)}function Fh(e,t,n,s,r){n=n.render;var i=t.ref;return As(t,r),s=Td(e,t,n,s,i,r),n=Cd(),e!==null&&!Ke?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,en(e,t,r)):(ae&&n&&pd(t),t.flags|=1,ze(e,t,s,r),t.child)}function Dh(e,t,n,s,r){if(e===null){var i=n.type;return typeof i=="function"&&!Ld(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Fg(e,t,i,s,r)):(e=Ka(n.type,null,s,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&r)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Fr,n(o,s)&&e.ref===t.ref)return en(e,t,r)}return t.flags|=1,e=xn(i,s),e.ref=t.ref,e.return=t,t.child=e}function Fg(e,t,n,s,r){if(e!==null){var i=e.memoizedProps;if(Fr(i,s)&&e.ref===t.ref)if(Ke=!1,t.pendingProps=s=i,(e.lanes&r)!==0)e.flags&131072&&(Ke=!0);else return t.lanes=e.lanes,en(e,t,r)}return ec(e,t,n,s,r)}function Dg(e,t,n){var s=t.pendingProps,r=s.children,i=e!==null?e.memoizedState:null;if(s.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},te(bs,tt),tt|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,te(bs,tt),tt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=i!==null?i.baseLanes:n,te(bs,tt),tt|=s}else i!==null?(s=i.baseLanes|n,t.memoizedState=null):s=n,te(bs,tt),tt|=s;return ze(e,t,r,n),t.child}function Mg(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ec(e,t,n,s,r){var i=Xe(n)?qn:Oe.current;return i=Fs(t,i),As(t,r),n=Td(e,t,n,s,i,r),s=Cd(),e!==null&&!Ke?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,en(e,t,r)):(ae&&s&&pd(t),t.flags|=1,ze(e,t,n,r),t.child)}function Mh(e,t,n,s,r){if(Xe(n)){var i=!0;gi(t)}else i=!1;if(As(t,r),t.stateNode===null)qa(e,t),Eg(t,n,s),Jl(t,n,s,r),s=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var c=o.context,d=n.contextType;typeof d=="object"&&d!==null?d=ft(d):(d=Xe(n)?qn:Oe.current,d=Fs(t,d));var u=n.getDerivedStateFromProps,h=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==s||c!==d)&&Ah(t,o,s,d),cn=!1;var m=t.memoizedState;o.state=m,xi(t,s,o,r),c=t.memoizedState,l!==s||m!==c||Qe.current||cn?(typeof u=="function"&&(Xl(t,n,u,s),c=t.memoizedState),(l=cn||Ch(t,n,l,s,m,c,d))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=c),o.props=s,o.state=c,o.context=d,s=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{o=t.stateNode,lg(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:xt(t.type,l),o.props=d,h=t.pendingProps,m=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=ft(c):(c=Xe(n)?qn:Oe.current,c=Fs(t,c));var y=n.getDerivedStateFromProps;(u=typeof y=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==h||m!==c)&&Ah(t,o,s,c),cn=!1,m=t.memoizedState,o.state=m,xi(t,s,o,r);var p=t.memoizedState;l!==h||m!==p||Qe.current||cn?(typeof y=="function"&&(Xl(t,n,y,s),p=t.memoizedState),(d=cn||Ch(t,n,d,s,m,p,c)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(s,p,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(s,p,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=p),o.props=s,o.state=p,o.context=c,s=d):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),s=!1)}return tc(e,t,n,s,i,r)}function tc(e,t,n,s,r,i){Mg(e,t);var o=(t.flags&128)!==0;if(!s&&!o)return r&&bh(t,n,!1),en(e,t,i);s=t.stateNode,ek.current=t;var l=o&&typeof n.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&o?(t.child=Ms(t,e.child,null,i),t.child=Ms(t,null,l,i)):ze(e,t,l,i),t.memoizedState=s.state,r&&bh(t,n,!0),t.child}function Bg(e){var t=e.stateNode;t.pendingContext?vh(e,t.pendingContext,t.pendingContext!==t.context):t.context&&vh(e,t.context,!1),kd(e,t.containerInfo)}function Bh(e,t,n,s,r){return Ds(),gd(r),t.flags|=256,ze(e,t,n,s),t.child}var nc={dehydrated:null,treeContext:null,retryLane:0};function sc(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ig(e,t,n){var s=t.pendingProps,r=le.current,i=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(r&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(r|=1),te(le,r&1),e===null)return Kl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=s.children,e=s.fallback,i?(s=t.mode,i=t.child,o={mode:"hidden",children:o},!(s&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=io(o,s,0,null),e=zn(e,s,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=sc(n),t.memoizedState=nc,e):Pd(t,o));if(r=e.memoizedState,r!==null&&(l=r.dehydrated,l!==null))return tk(e,t,o,s,l,r,n);if(i){i=s.fallback,o=t.mode,r=e.child,l=r.sibling;var c={mode:"hidden",children:s.children};return!(o&1)&&t.child!==r?(s=t.child,s.childLanes=0,s.pendingProps=c,t.deletions=null):(s=xn(r,c),s.subtreeFlags=r.subtreeFlags&14680064),l!==null?i=xn(l,i):(i=zn(i,o,n,null),i.flags|=2),i.return=t,s.return=t,s.sibling=i,t.child=s,s=i,i=t.child,o=e.child.memoizedState,o=o===null?sc(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=nc,s}return i=e.child,e=i.sibling,s=xn(i,{mode:"visible",children:s.children}),!(t.mode&1)&&(s.lanes=n),s.return=t,s.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=s,t.memoizedState=null,s}function Pd(e,t){return t=io({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ja(e,t,n,s){return s!==null&&gd(s),Ms(t,e.child,null,n),e=Pd(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function tk(e,t,n,s,r,i,o){if(n)return t.flags&256?(t.flags&=-257,s=Ho(Error(F(422))),ja(e,t,o,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=s.fallback,r=t.mode,s=io({mode:"visible",children:s.children},r,0,null),i=zn(i,r,o,null),i.flags|=2,s.return=t,i.return=t,s.sibling=i,t.child=s,t.mode&1&&Ms(t,e.child,null,o),t.child.memoizedState=sc(o),t.memoizedState=nc,i);if(!(t.mode&1))return ja(e,t,o,null);if(r.data==="$!"){if(s=r.nextSibling&&r.nextSibling.dataset,s)var l=s.dgst;return s=l,i=Error(F(419)),s=Ho(i,s,void 0),ja(e,t,o,s)}if(l=(o&e.childLanes)!==0,Ke||l){if(s=Ae,s!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(s.suspendedLanes|o)?0:r,r!==0&&r!==i.retryLane&&(i.retryLane=r,Zt(e,r),Nt(s,e,r,-1))}return Id(),s=Ho(Error(F(421))),ja(e,t,o,s)}return r.data==="$?"?(t.flags|=128,t.child=e.child,t=pk.bind(null,e),r._reactRetry=t,null):(e=i.treeContext,nt=yn(r.nextSibling),rt=t,ae=!0,jt=null,e!==null&&(dt[ut++]=Gt,dt[ut++]=Kt,dt[ut++]=Yn,Gt=e.id,Kt=e.overflow,Yn=t),t=Pd(t,s.children),t.flags|=4096,t)}function Ih(e,t,n){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),Ql(e.return,t,n)}function qo(e,t,n,s,r){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:r}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=s,i.tail=n,i.tailMode=r)}function Lg(e,t,n){var s=t.pendingProps,r=s.revealOrder,i=s.tail;if(ze(e,t,s.children,n),s=le.current,s&2)s=s&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ih(e,n,t);else if(e.tag===19)Ih(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(te(le,s),!(t.mode&1))t.memoizedState=null;else switch(r){case"forwards":for(n=t.child,r=null;n!==null;)e=n.alternate,e!==null&&ki(e)===null&&(r=n),n=n.sibling;n=r,n===null?(r=t.child,t.child=null):(r=n.sibling,n.sibling=null),qo(t,!1,r,n,i);break;case"backwards":for(n=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&ki(e)===null){t.child=r;break}e=r.sibling,r.sibling=n,n=r,r=e}qo(t,!0,n,null,i);break;case"together":qo(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function qa(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function en(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Kn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(F(153));if(t.child!==null){for(e=t.child,n=xn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=xn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function nk(e,t,n){switch(t.tag){case 3:Bg(t),Ds();break;case 5:cg(t);break;case 1:Xe(t.type)&&gi(t);break;case 4:kd(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,r=t.memoizedProps.value;te(bi,s._currentValue),s._currentValue=r;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(te(le,le.current&1),t.flags|=128,null):n&t.child.childLanes?Ig(e,t,n):(te(le,le.current&1),e=en(e,t,n),e!==null?e.sibling:null);te(le,le.current&1);break;case 19:if(s=(n&t.childLanes)!==0,e.flags&128){if(s)return Lg(e,t,n);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),te(le,le.current),s)break;return null;case 22:case 23:return t.lanes=0,Dg(e,t,n)}return en(e,t,n)}var $g,rc,_g,Og;$g=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};rc=function(){};_g=function(e,t,n,s){var r=e.memoizedProps;if(r!==s){e=t.stateNode,Ln($t.current);var i=null;switch(n){case"input":r=Tl(e,r),s=Tl(e,s),i=[];break;case"select":r=ue({},r,{value:void 0}),s=ue({},s,{value:void 0}),i=[];break;case"textarea":r=El(e,r),s=El(e,s),i=[];break;default:typeof r.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=pi)}Rl(n,s);var o;n=null;for(d in r)if(!s.hasOwnProperty(d)&&r.hasOwnProperty(d)&&r[d]!=null)if(d==="style"){var l=r[d];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Nr.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in s){var c=s[d];if(l=r!=null?r[d]:void 0,s.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(i||(i=[]),i.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(i=i||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Nr.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&ne("scroll",e),i||l===c||(i=[])):(i=i||[]).push(d,c))}n&&(i=i||[]).push("style",n);var d=i;(t.updateQueue=d)&&(t.flags|=4)}};Og=function(e,t,n,s){n!==s&&(t.flags|=4)};function nr(e,t){if(!ae)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function Ie(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,s=0;if(t)for(var r=e.child;r!==null;)n|=r.lanes|r.childLanes,s|=r.subtreeFlags&14680064,s|=r.flags&14680064,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)n|=r.lanes|r.childLanes,s|=r.subtreeFlags,s|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=s,e.childLanes=n,t}function sk(e,t,n){var s=t.pendingProps;switch(fd(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ie(t),null;case 1:return Xe(t.type)&&fi(),Ie(t),null;case 3:return s=t.stateNode,Bs(),se(Qe),se(Oe),Sd(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(xa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,jt!==null&&(hc(jt),jt=null))),rc(e,t),Ie(t),null;case 5:jd(t);var r=Ln(Lr.current);if(n=t.type,e!==null&&t.stateNode!=null)_g(e,t,n,s,r),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(F(166));return Ie(t),null}if(e=Ln($t.current),xa(t)){s=t.stateNode,n=t.type;var i=t.memoizedProps;switch(s[It]=t,s[Br]=i,e=(t.mode&1)!==0,n){case"dialog":ne("cancel",s),ne("close",s);break;case"iframe":case"object":case"embed":ne("load",s);break;case"video":case"audio":for(r=0;r<cr.length;r++)ne(cr[r],s);break;case"source":ne("error",s);break;case"img":case"image":case"link":ne("error",s),ne("load",s);break;case"details":ne("toggle",s);break;case"input":Hu(s,i),ne("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!i.multiple},ne("invalid",s);break;case"textarea":Yu(s,i),ne("invalid",s)}Rl(n,i),r=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?s.textContent!==l&&(i.suppressHydrationWarning!==!0&&wa(s.textContent,l,e),r=["children",l]):typeof l=="number"&&s.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&wa(s.textContent,l,e),r=["children",""+l]):Nr.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&ne("scroll",s)}switch(n){case"input":ha(s),qu(s,i,!0);break;case"textarea":ha(s),Gu(s);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(s.onclick=pi)}s=r,t.updateQueue=s,s!==null&&(t.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=pf(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=o.createElement(n,{is:s.is}):(e=o.createElement(n),n==="select"&&(o=e,s.multiple?o.multiple=!0:s.size&&(o.size=s.size))):e=o.createElementNS(e,n),e[It]=t,e[Br]=s,$g(e,t,!1,!1),t.stateNode=e;e:{switch(o=Fl(n,s),n){case"dialog":ne("cancel",e),ne("close",e),r=s;break;case"iframe":case"object":case"embed":ne("load",e),r=s;break;case"video":case"audio":for(r=0;r<cr.length;r++)ne(cr[r],e);r=s;break;case"source":ne("error",e),r=s;break;case"img":case"image":case"link":ne("error",e),ne("load",e),r=s;break;case"details":ne("toggle",e),r=s;break;case"input":Hu(e,s),r=Tl(e,s),ne("invalid",e);break;case"option":r=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},r=ue({},s,{value:void 0}),ne("invalid",e);break;case"textarea":Yu(e,s),r=El(e,s),ne("invalid",e);break;default:r=s}Rl(n,r),l=r;for(i in l)if(l.hasOwnProperty(i)){var c=l[i];i==="style"?yf(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&ff(e,c)):i==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Tr(e,c):typeof c=="number"&&Tr(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Nr.hasOwnProperty(i)?c!=null&&i==="onScroll"&&ne("scroll",e):c!=null&&ed(e,i,c,o))}switch(n){case"input":ha(e),qu(e,s,!1);break;case"textarea":ha(e),Gu(e);break;case"option":s.value!=null&&e.setAttribute("value",""+kn(s.value));break;case"select":e.multiple=!!s.multiple,i=s.value,i!=null?Ss(e,!!s.multiple,i,!1):s.defaultValue!=null&&Ss(e,!!s.multiple,s.defaultValue,!0);break;default:typeof r.onClick=="function"&&(e.onclick=pi)}switch(n){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ie(t),null;case 6:if(e&&t.stateNode!=null)Og(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(F(166));if(n=Ln(Lr.current),Ln($t.current),xa(t)){if(s=t.stateNode,n=t.memoizedProps,s[It]=t,(i=s.nodeValue!==n)&&(e=rt,e!==null))switch(e.tag){case 3:wa(s.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&wa(s.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else s=(n.nodeType===9?n:n.ownerDocument).createTextNode(s),s[It]=t,t.stateNode=s}return Ie(t),null;case 13:if(se(le),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ae&&nt!==null&&t.mode&1&&!(t.flags&128))rg(),Ds(),t.flags|=98560,i=!1;else if(i=xa(t),s!==null&&s.dehydrated!==null){if(e===null){if(!i)throw Error(F(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(F(317));i[It]=t}else Ds(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ie(t),i=!1}else jt!==null&&(hc(jt),jt=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,t.mode&1&&(e===null||le.current&1?Te===0&&(Te=3):Id())),t.updateQueue!==null&&(t.flags|=4),Ie(t),null);case 4:return Bs(),rc(e,t),e===null&&Dr(t.stateNode.containerInfo),Ie(t),null;case 10:return bd(t.type._context),Ie(t),null;case 17:return Xe(t.type)&&fi(),Ie(t),null;case 19:if(se(le),i=t.memoizedState,i===null)return Ie(t),null;if(s=(t.flags&128)!==0,o=i.rendering,o===null)if(s)nr(i,!1);else{if(Te!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=ki(e),o!==null){for(t.flags|=128,nr(i,!1),s=o.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=n,n=t.child;n!==null;)i=n,e=s,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return te(le,le.current&1|2),t.child}e=e.sibling}i.tail!==null&&ye()>Ls&&(t.flags|=128,s=!0,nr(i,!1),t.lanes=4194304)}else{if(!s)if(e=ki(o),e!==null){if(t.flags|=128,s=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),nr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!ae)return Ie(t),null}else 2*ye()-i.renderingStartTime>Ls&&n!==1073741824&&(t.flags|=128,s=!0,nr(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=ye(),t.sibling=null,n=le.current,te(le,s?n&1|2:n&1),t):(Ie(t),null);case 22:case 23:return Bd(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&t.mode&1?tt&1073741824&&(Ie(t),t.subtreeFlags&6&&(t.flags|=8192)):Ie(t),null;case 24:return null;case 25:return null}throw Error(F(156,t.tag))}function rk(e,t){switch(fd(t),t.tag){case 1:return Xe(t.type)&&fi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Bs(),se(Qe),se(Oe),Sd(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return jd(t),null;case 13:if(se(le),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(F(340));Ds()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return se(le),null;case 4:return Bs(),null;case 10:return bd(t.type._context),null;case 22:case 23:return Bd(),null;case 24:return null;default:return null}}var Sa=!1,$e=!1,ak=typeof WeakSet=="function"?WeakSet:Set,I=null;function vs(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(s){ge(e,t,s)}else n.current=null}function ac(e,t,n){try{n()}catch(s){ge(e,t,s)}}var Lh=!1;function ik(e,t){if(Wl=ui,e=Hf(),md(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var r=s.anchorOffset,i=s.focusNode;s=s.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,c=-1,d=0,u=0,h=e,m=null;t:for(;;){for(var y;h!==n||r!==0&&h.nodeType!==3||(l=o+r),h!==i||s!==0&&h.nodeType!==3||(c=o+s),h.nodeType===3&&(o+=h.nodeValue.length),(y=h.firstChild)!==null;)m=h,h=y;for(;;){if(h===e)break t;if(m===n&&++d===r&&(l=o),m===i&&++u===s&&(c=o),(y=h.nextSibling)!==null)break;h=m,m=h.parentNode}h=y}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Vl={focusedElem:e,selectionRange:n},ui=!1,I=t;I!==null;)if(t=I,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,I=e;else for(;I!==null;){t=I;try{var p=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(p!==null){var b=p.memoizedProps,x=p.memoizedState,f=t.stateNode,g=f.getSnapshotBeforeUpdate(t.elementType===t.type?b:xt(t.type,b),x);f.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var v=t.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(k){ge(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,I=e;break}I=t.return}return p=Lh,Lh=!1,p}function vr(e,t,n){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var r=s=s.next;do{if((r.tag&e)===e){var i=r.destroy;r.destroy=void 0,i!==void 0&&ac(t,n,i)}r=r.next}while(r!==s)}}function ro(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var s=n.create;n.destroy=s()}n=n.next}while(n!==t)}}function ic(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function zg(e){var t=e.alternate;t!==null&&(e.alternate=null,zg(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[It],delete t[Br],delete t[ql],delete t[Wx],delete t[Vx])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Wg(e){return e.tag===5||e.tag===3||e.tag===4}function $h(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Wg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function oc(e,t,n){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=pi));else if(s!==4&&(e=e.child,e!==null))for(oc(e,t,n),e=e.sibling;e!==null;)oc(e,t,n),e=e.sibling}function lc(e,t,n){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(lc(e,t,n),e=e.sibling;e!==null;)lc(e,t,n),e=e.sibling}var Pe=null,kt=!1;function an(e,t,n){for(n=n.child;n!==null;)Vg(e,t,n),n=n.sibling}function Vg(e,t,n){if(Lt&&typeof Lt.onCommitFiberUnmount=="function")try{Lt.onCommitFiberUnmount(Qi,n)}catch{}switch(n.tag){case 5:$e||vs(n,t);case 6:var s=Pe,r=kt;Pe=null,an(e,t,n),Pe=s,kt=r,Pe!==null&&(kt?(e=Pe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Pe.removeChild(n.stateNode));break;case 18:Pe!==null&&(kt?(e=Pe,n=n.stateNode,e.nodeType===8?_o(e.parentNode,n):e.nodeType===1&&_o(e,n),Pr(e)):_o(Pe,n.stateNode));break;case 4:s=Pe,r=kt,Pe=n.stateNode.containerInfo,kt=!0,an(e,t,n),Pe=s,kt=r;break;case 0:case 11:case 14:case 15:if(!$e&&(s=n.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){r=s=s.next;do{var i=r,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&ac(n,t,o),r=r.next}while(r!==s)}an(e,t,n);break;case 1:if(!$e&&(vs(n,t),s=n.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=n.memoizedProps,s.state=n.memoizedState,s.componentWillUnmount()}catch(l){ge(n,t,l)}an(e,t,n);break;case 21:an(e,t,n);break;case 22:n.mode&1?($e=(s=$e)||n.memoizedState!==null,an(e,t,n),$e=s):an(e,t,n);break;default:an(e,t,n)}}function _h(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new ak),t.forEach(function(s){var r=fk.bind(null,e,s);n.has(s)||(n.add(s),s.then(r,r))})}}function vt(e,t){var n=t.deletions;if(n!==null)for(var s=0;s<n.length;s++){var r=n[s];try{var i=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:Pe=l.stateNode,kt=!1;break e;case 3:Pe=l.stateNode.containerInfo,kt=!0;break e;case 4:Pe=l.stateNode.containerInfo,kt=!0;break e}l=l.return}if(Pe===null)throw Error(F(160));Vg(i,o,r),Pe=null,kt=!1;var c=r.alternate;c!==null&&(c.return=null),r.return=null}catch(d){ge(r,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Ug(t,e),t=t.sibling}function Ug(e,t){var n=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(vt(t,e),Rt(e),s&4){try{vr(3,e,e.return),ro(3,e)}catch(b){ge(e,e.return,b)}try{vr(5,e,e.return)}catch(b){ge(e,e.return,b)}}break;case 1:vt(t,e),Rt(e),s&512&&n!==null&&vs(n,n.return);break;case 5:if(vt(t,e),Rt(e),s&512&&n!==null&&vs(n,n.return),e.flags&32){var r=e.stateNode;try{Tr(r,"")}catch(b){ge(e,e.return,b)}}if(s&4&&(r=e.stateNode,r!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&hf(r,i),Fl(l,o);var d=Fl(l,i);for(o=0;o<c.length;o+=2){var u=c[o],h=c[o+1];u==="style"?yf(r,h):u==="dangerouslySetInnerHTML"?ff(r,h):u==="children"?Tr(r,h):ed(r,u,h,d)}switch(l){case"input":Cl(r,i);break;case"textarea":mf(r,i);break;case"select":var m=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!i.multiple;var y=i.value;y!=null?Ss(r,!!i.multiple,y,!1):m!==!!i.multiple&&(i.defaultValue!=null?Ss(r,!!i.multiple,i.defaultValue,!0):Ss(r,!!i.multiple,i.multiple?[]:"",!1))}r[Br]=i}catch(b){ge(e,e.return,b)}}break;case 6:if(vt(t,e),Rt(e),s&4){if(e.stateNode===null)throw Error(F(162));r=e.stateNode,i=e.memoizedProps;try{r.nodeValue=i}catch(b){ge(e,e.return,b)}}break;case 3:if(vt(t,e),Rt(e),s&4&&n!==null&&n.memoizedState.isDehydrated)try{Pr(t.containerInfo)}catch(b){ge(e,e.return,b)}break;case 4:vt(t,e),Rt(e);break;case 13:vt(t,e),Rt(e),r=e.child,r.flags&8192&&(i=r.memoizedState!==null,r.stateNode.isHidden=i,!i||r.alternate!==null&&r.alternate.memoizedState!==null||(Dd=ye())),s&4&&_h(e);break;case 22:if(u=n!==null&&n.memoizedState!==null,e.mode&1?($e=(d=$e)||u,vt(t,e),$e=d):vt(t,e),Rt(e),s&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!u&&e.mode&1)for(I=e,u=e.child;u!==null;){for(h=I=u;I!==null;){switch(m=I,y=m.child,m.tag){case 0:case 11:case 14:case 15:vr(4,m,m.return);break;case 1:vs(m,m.return);var p=m.stateNode;if(typeof p.componentWillUnmount=="function"){s=m,n=m.return;try{t=s,p.props=t.memoizedProps,p.state=t.memoizedState,p.componentWillUnmount()}catch(b){ge(s,n,b)}}break;case 5:vs(m,m.return);break;case 22:if(m.memoizedState!==null){zh(h);continue}}y!==null?(y.return=m,I=y):zh(h)}u=u.sibling}e:for(u=null,h=e;;){if(h.tag===5){if(u===null){u=h;try{r=h.stateNode,d?(i=r.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=h.stateNode,c=h.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=gf("display",o))}catch(b){ge(e,e.return,b)}}}else if(h.tag===6){if(u===null)try{h.stateNode.nodeValue=d?"":h.memoizedProps}catch(b){ge(e,e.return,b)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;u===h&&(u=null),h=h.return}u===h&&(u=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:vt(t,e),Rt(e),s&4&&_h(e);break;case 21:break;default:vt(t,e),Rt(e)}}function Rt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Wg(n)){var s=n;break e}n=n.return}throw Error(F(160))}switch(s.tag){case 5:var r=s.stateNode;s.flags&32&&(Tr(r,""),s.flags&=-33);var i=$h(e);lc(e,i,r);break;case 3:case 4:var o=s.stateNode.containerInfo,l=$h(e);oc(e,l,o);break;default:throw Error(F(161))}}catch(c){ge(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ok(e,t,n){I=e,Hg(e)}function Hg(e,t,n){for(var s=(e.mode&1)!==0;I!==null;){var r=I,i=r.child;if(r.tag===22&&s){var o=r.memoizedState!==null||Sa;if(!o){var l=r.alternate,c=l!==null&&l.memoizedState!==null||$e;l=Sa;var d=$e;if(Sa=o,($e=c)&&!d)for(I=r;I!==null;)o=I,c=o.child,o.tag===22&&o.memoizedState!==null?Wh(r):c!==null?(c.return=o,I=c):Wh(r);for(;i!==null;)I=i,Hg(i),i=i.sibling;I=r,Sa=l,$e=d}Oh(e)}else r.subtreeFlags&8772&&i!==null?(i.return=r,I=i):Oh(e)}}function Oh(e){for(;I!==null;){var t=I;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:$e||ro(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!$e)if(n===null)s.componentDidMount();else{var r=t.elementType===t.type?n.memoizedProps:xt(t.type,n.memoizedProps);s.componentDidUpdate(r,n.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Sh(t,i,s);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Sh(t,o,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var u=d.memoizedState;if(u!==null){var h=u.dehydrated;h!==null&&Pr(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}$e||t.flags&512&&ic(t)}catch(m){ge(t,t.return,m)}}if(t===e){I=null;break}if(n=t.sibling,n!==null){n.return=t.return,I=n;break}I=t.return}}function zh(e){for(;I!==null;){var t=I;if(t===e){I=null;break}var n=t.sibling;if(n!==null){n.return=t.return,I=n;break}I=t.return}}function Wh(e){for(;I!==null;){var t=I;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ro(4,t)}catch(c){ge(t,n,c)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var r=t.return;try{s.componentDidMount()}catch(c){ge(t,r,c)}}var i=t.return;try{ic(t)}catch(c){ge(t,i,c)}break;case 5:var o=t.return;try{ic(t)}catch(c){ge(t,o,c)}}}catch(c){ge(t,t.return,c)}if(t===e){I=null;break}var l=t.sibling;if(l!==null){l.return=t.return,I=l;break}I=t.return}}var lk=Math.ceil,Ni=rn.ReactCurrentDispatcher,Rd=rn.ReactCurrentOwner,mt=rn.ReactCurrentBatchConfig,K=0,Ae=null,we=null,Fe=0,tt=0,bs=Cn(0),Te=0,zr=null,Kn=0,ao=0,Fd=0,br=null,Ge=null,Dd=0,Ls=1/0,qt=null,Ti=!1,cc=null,bn=null,Na=!1,mn=null,Ci=0,wr=0,dc=null,Ya=-1,Ga=0;function Ve(){return K&6?ye():Ya!==-1?Ya:Ya=ye()}function wn(e){return e.mode&1?K&2&&Fe!==0?Fe&-Fe:Hx.transition!==null?(Ga===0&&(Ga=Ef()),Ga):(e=X,e!==0||(e=window.event,e=e===void 0?16:If(e.type)),e):1}function Nt(e,t,n,s){if(50<wr)throw wr=0,dc=null,Error(F(185));Qr(e,n,s),(!(K&2)||e!==Ae)&&(e===Ae&&(!(K&2)&&(ao|=n),Te===4&&un(e,Fe)),Je(e,s),n===1&&K===0&&!(t.mode&1)&&(Ls=ye()+500,to&&An()))}function Je(e,t){var n=e.callbackNode;Hw(e,t);var s=di(e,e===Ae?Fe:0);if(s===0)n!==null&&Xu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(n!=null&&Xu(n),t===1)e.tag===0?Ux(Vh.bind(null,e)):tg(Vh.bind(null,e)),Ox(function(){!(K&6)&&An()}),n=null;else{switch(Pf(s)){case 1:n=ad;break;case 4:n=Cf;break;case 16:n=ci;break;case 536870912:n=Af;break;default:n=ci}n=Zg(n,qg.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function qg(e,t){if(Ya=-1,Ga=0,K&6)throw Error(F(327));var n=e.callbackNode;if(Es()&&e.callbackNode!==n)return null;var s=di(e,e===Ae?Fe:0);if(s===0)return null;if(s&30||s&e.expiredLanes||t)t=Ai(e,s);else{t=s;var r=K;K|=2;var i=Gg();(Ae!==e||Fe!==t)&&(qt=null,Ls=ye()+500,On(e,t));do try{uk();break}catch(l){Yg(e,l)}while(!0);vd(),Ni.current=i,K=r,we!==null?t=0:(Ae=null,Fe=0,t=Te)}if(t!==0){if(t===2&&(r=Ll(e),r!==0&&(s=r,t=uc(e,r))),t===1)throw n=zr,On(e,0),un(e,s),Je(e,ye()),n;if(t===6)un(e,s);else{if(r=e.current.alternate,!(s&30)&&!ck(r)&&(t=Ai(e,s),t===2&&(i=Ll(e),i!==0&&(s=i,t=uc(e,i))),t===1))throw n=zr,On(e,0),un(e,s),Je(e,ye()),n;switch(e.finishedWork=r,e.finishedLanes=s,t){case 0:case 1:throw Error(F(345));case 2:Dn(e,Ge,qt);break;case 3:if(un(e,s),(s&130023424)===s&&(t=Dd+500-ye(),10<t)){if(di(e,0)!==0)break;if(r=e.suspendedLanes,(r&s)!==s){Ve(),e.pingedLanes|=e.suspendedLanes&r;break}e.timeoutHandle=Hl(Dn.bind(null,e,Ge,qt),t);break}Dn(e,Ge,qt);break;case 4:if(un(e,s),(s&4194240)===s)break;for(t=e.eventTimes,r=-1;0<s;){var o=31-St(s);i=1<<o,o=t[o],o>r&&(r=o),s&=~i}if(s=r,s=ye()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*lk(s/1960))-s,10<s){e.timeoutHandle=Hl(Dn.bind(null,e,Ge,qt),s);break}Dn(e,Ge,qt);break;case 5:Dn(e,Ge,qt);break;default:throw Error(F(329))}}}return Je(e,ye()),e.callbackNode===n?qg.bind(null,e):null}function uc(e,t){var n=br;return e.current.memoizedState.isDehydrated&&(On(e,t).flags|=256),e=Ai(e,t),e!==2&&(t=Ge,Ge=n,t!==null&&hc(t)),e}function hc(e){Ge===null?Ge=e:Ge.push.apply(Ge,e)}function ck(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var s=0;s<n.length;s++){var r=n[s],i=r.getSnapshot;r=r.value;try{if(!At(i(),r))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function un(e,t){for(t&=~Fd,t&=~ao,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-St(t),s=1<<n;e[n]=-1,t&=~s}}function Vh(e){if(K&6)throw Error(F(327));Es();var t=di(e,0);if(!(t&1))return Je(e,ye()),null;var n=Ai(e,t);if(e.tag!==0&&n===2){var s=Ll(e);s!==0&&(t=s,n=uc(e,s))}if(n===1)throw n=zr,On(e,0),un(e,t),Je(e,ye()),n;if(n===6)throw Error(F(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Dn(e,Ge,qt),Je(e,ye()),null}function Md(e,t){var n=K;K|=1;try{return e(t)}finally{K=n,K===0&&(Ls=ye()+500,to&&An())}}function Qn(e){mn!==null&&mn.tag===0&&!(K&6)&&Es();var t=K;K|=1;var n=mt.transition,s=X;try{if(mt.transition=null,X=1,e)return e()}finally{X=s,mt.transition=n,K=t,!(K&6)&&An()}}function Bd(){tt=bs.current,se(bs)}function On(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,_x(n)),we!==null)for(n=we.return;n!==null;){var s=n;switch(fd(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&fi();break;case 3:Bs(),se(Qe),se(Oe),Sd();break;case 5:jd(s);break;case 4:Bs();break;case 13:se(le);break;case 19:se(le);break;case 10:bd(s.type._context);break;case 22:case 23:Bd()}n=n.return}if(Ae=e,we=e=xn(e.current,null),Fe=tt=t,Te=0,zr=null,Fd=ao=Kn=0,Ge=br=null,In!==null){for(t=0;t<In.length;t++)if(n=In[t],s=n.interleaved,s!==null){n.interleaved=null;var r=s.next,i=n.pending;if(i!==null){var o=i.next;i.next=r,s.next=o}n.pending=s}In=null}return e}function Yg(e,t){do{var n=we;try{if(vd(),Ua.current=Si,ji){for(var s=ce.memoizedState;s!==null;){var r=s.queue;r!==null&&(r.pending=null),s=s.next}ji=!1}if(Gn=0,Ce=Se=ce=null,yr=!1,$r=0,Rd.current=null,n===null||n.return===null){Te=1,zr=t,we=null;break}e:{var i=e,o=n.return,l=n,c=t;if(t=Fe,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,u=l,h=u.tag;if(!(u.mode&1)&&(h===0||h===11||h===15)){var m=u.alternate;m?(u.updateQueue=m.updateQueue,u.memoizedState=m.memoizedState,u.lanes=m.lanes):(u.updateQueue=null,u.memoizedState=null)}var y=Ph(o);if(y!==null){y.flags&=-257,Rh(y,o,l,i,t),y.mode&1&&Eh(i,d,t),t=y,c=d;var p=t.updateQueue;if(p===null){var b=new Set;b.add(c),t.updateQueue=b}else p.add(c);break e}else{if(!(t&1)){Eh(i,d,t),Id();break e}c=Error(F(426))}}else if(ae&&l.mode&1){var x=Ph(o);if(x!==null){!(x.flags&65536)&&(x.flags|=256),Rh(x,o,l,i,t),gd(Is(c,l));break e}}i=c=Is(c,l),Te!==4&&(Te=2),br===null?br=[i]:br.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var f=Pg(i,c,t);jh(i,f);break e;case 1:l=c;var g=i.type,v=i.stateNode;if(!(i.flags&128)&&(typeof g.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(bn===null||!bn.has(v)))){i.flags|=65536,t&=-t,i.lanes|=t;var k=Rg(i,l,t);jh(i,k);break e}}i=i.return}while(i!==null)}Qg(n)}catch(N){t=N,we===n&&n!==null&&(we=n=n.return);continue}break}while(!0)}function Gg(){var e=Ni.current;return Ni.current=Si,e===null?Si:e}function Id(){(Te===0||Te===3||Te===2)&&(Te=4),Ae===null||!(Kn&268435455)&&!(ao&268435455)||un(Ae,Fe)}function Ai(e,t){var n=K;K|=2;var s=Gg();(Ae!==e||Fe!==t)&&(qt=null,On(e,t));do try{dk();break}catch(r){Yg(e,r)}while(!0);if(vd(),K=n,Ni.current=s,we!==null)throw Error(F(261));return Ae=null,Fe=0,Te}function dk(){for(;we!==null;)Kg(we)}function uk(){for(;we!==null&&!Iw();)Kg(we)}function Kg(e){var t=Jg(e.alternate,e,tt);e.memoizedProps=e.pendingProps,t===null?Qg(e):we=t,Rd.current=null}function Qg(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=rk(n,t),n!==null){n.flags&=32767,we=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Te=6,we=null;return}}else if(n=sk(n,t,tt),n!==null){we=n;return}if(t=t.sibling,t!==null){we=t;return}we=t=e}while(t!==null);Te===0&&(Te=5)}function Dn(e,t,n){var s=X,r=mt.transition;try{mt.transition=null,X=1,hk(e,t,n,s)}finally{mt.transition=r,X=s}return null}function hk(e,t,n,s){do Es();while(mn!==null);if(K&6)throw Error(F(327));n=e.finishedWork;var r=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(F(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(qw(e,i),e===Ae&&(we=Ae=null,Fe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Na||(Na=!0,Zg(ci,function(){return Es(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=mt.transition,mt.transition=null;var o=X;X=1;var l=K;K|=4,Rd.current=null,ik(e,n),Ug(n,e),Fx(Vl),ui=!!Wl,Vl=Wl=null,e.current=n,ok(n),Lw(),K=l,X=o,mt.transition=i}else e.current=n;if(Na&&(Na=!1,mn=e,Ci=r),i=e.pendingLanes,i===0&&(bn=null),Ow(n.stateNode),Je(e,ye()),t!==null)for(s=e.onRecoverableError,n=0;n<t.length;n++)r=t[n],s(r.value,{componentStack:r.stack,digest:r.digest});if(Ti)throw Ti=!1,e=cc,cc=null,e;return Ci&1&&e.tag!==0&&Es(),i=e.pendingLanes,i&1?e===dc?wr++:(wr=0,dc=e):wr=0,An(),null}function Es(){if(mn!==null){var e=Pf(Ci),t=mt.transition,n=X;try{if(mt.transition=null,X=16>e?16:e,mn===null)var s=!1;else{if(e=mn,mn=null,Ci=0,K&6)throw Error(F(331));var r=K;for(K|=4,I=e.current;I!==null;){var i=I,o=i.child;if(I.flags&16){var l=i.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(I=d;I!==null;){var u=I;switch(u.tag){case 0:case 11:case 15:vr(8,u,i)}var h=u.child;if(h!==null)h.return=u,I=h;else for(;I!==null;){u=I;var m=u.sibling,y=u.return;if(zg(u),u===d){I=null;break}if(m!==null){m.return=y,I=m;break}I=y}}}var p=i.alternate;if(p!==null){var b=p.child;if(b!==null){p.child=null;do{var x=b.sibling;b.sibling=null,b=x}while(b!==null)}}I=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,I=o;else e:for(;I!==null;){if(i=I,i.flags&2048)switch(i.tag){case 0:case 11:case 15:vr(9,i,i.return)}var f=i.sibling;if(f!==null){f.return=i.return,I=f;break e}I=i.return}}var g=e.current;for(I=g;I!==null;){o=I;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,I=v;else e:for(o=g;I!==null;){if(l=I,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:ro(9,l)}}catch(N){ge(l,l.return,N)}if(l===o){I=null;break e}var k=l.sibling;if(k!==null){k.return=l.return,I=k;break e}I=l.return}}if(K=r,An(),Lt&&typeof Lt.onPostCommitFiberRoot=="function")try{Lt.onPostCommitFiberRoot(Qi,e)}catch{}s=!0}return s}finally{X=n,mt.transition=t}}return!1}function Uh(e,t,n){t=Is(n,t),t=Pg(e,t,1),e=vn(e,t,1),t=Ve(),e!==null&&(Qr(e,1,t),Je(e,t))}function ge(e,t,n){if(e.tag===3)Uh(e,e,n);else for(;t!==null;){if(t.tag===3){Uh(t,e,n);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(bn===null||!bn.has(s))){e=Is(n,e),e=Rg(t,e,1),t=vn(t,e,1),e=Ve(),t!==null&&(Qr(t,1,e),Je(t,e));break}}t=t.return}}function mk(e,t,n){var s=e.pingCache;s!==null&&s.delete(t),t=Ve(),e.pingedLanes|=e.suspendedLanes&n,Ae===e&&(Fe&n)===n&&(Te===4||Te===3&&(Fe&130023424)===Fe&&500>ye()-Dd?On(e,0):Fd|=n),Je(e,t)}function Xg(e,t){t===0&&(e.mode&1?(t=fa,fa<<=1,!(fa&130023424)&&(fa=4194304)):t=1);var n=Ve();e=Zt(e,t),e!==null&&(Qr(e,t,n),Je(e,n))}function pk(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Xg(e,n)}function fk(e,t){var n=0;switch(e.tag){case 13:var s=e.stateNode,r=e.memoizedState;r!==null&&(n=r.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(F(314))}s!==null&&s.delete(t),Xg(e,n)}var Jg;Jg=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Qe.current)Ke=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Ke=!1,nk(e,t,n);Ke=!!(e.flags&131072)}else Ke=!1,ae&&t.flags&1048576&&ng(t,vi,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;qa(e,t),e=t.pendingProps;var r=Fs(t,Oe.current);As(t,n),r=Td(null,t,s,e,r,n);var i=Cd();return t.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Xe(s)?(i=!0,gi(t)):i=!1,t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,xd(t),r.updater=so,t.stateNode=r,r._reactInternals=t,Jl(t,s,e,n),t=tc(null,t,s,!0,i,n)):(t.tag=0,ae&&i&&pd(t),ze(null,t,r,n),t=t.child),t;case 16:s=t.elementType;e:{switch(qa(e,t),e=t.pendingProps,r=s._init,s=r(s._payload),t.type=s,r=t.tag=yk(s),e=xt(s,e),r){case 0:t=ec(null,t,s,e,n);break e;case 1:t=Mh(null,t,s,e,n);break e;case 11:t=Fh(null,t,s,e,n);break e;case 14:t=Dh(null,t,s,xt(s.type,e),n);break e}throw Error(F(306,s,""))}return t;case 0:return s=t.type,r=t.pendingProps,r=t.elementType===s?r:xt(s,r),ec(e,t,s,r,n);case 1:return s=t.type,r=t.pendingProps,r=t.elementType===s?r:xt(s,r),Mh(e,t,s,r,n);case 3:e:{if(Bg(t),e===null)throw Error(F(387));s=t.pendingProps,i=t.memoizedState,r=i.element,lg(e,t),xi(t,s,null,n);var o=t.memoizedState;if(s=o.element,i.isDehydrated)if(i={element:s,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){r=Is(Error(F(423)),t),t=Bh(e,t,s,n,r);break e}else if(s!==r){r=Is(Error(F(424)),t),t=Bh(e,t,s,n,r);break e}else for(nt=yn(t.stateNode.containerInfo.firstChild),rt=t,ae=!0,jt=null,n=ig(t,null,s,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ds(),s===r){t=en(e,t,n);break e}ze(e,t,s,n)}t=t.child}return t;case 5:return cg(t),e===null&&Kl(t),s=t.type,r=t.pendingProps,i=e!==null?e.memoizedProps:null,o=r.children,Ul(s,r)?o=null:i!==null&&Ul(s,i)&&(t.flags|=32),Mg(e,t),ze(e,t,o,n),t.child;case 6:return e===null&&Kl(t),null;case 13:return Ig(e,t,n);case 4:return kd(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=Ms(t,null,s,n):ze(e,t,s,n),t.child;case 11:return s=t.type,r=t.pendingProps,r=t.elementType===s?r:xt(s,r),Fh(e,t,s,r,n);case 7:return ze(e,t,t.pendingProps,n),t.child;case 8:return ze(e,t,t.pendingProps.children,n),t.child;case 12:return ze(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(s=t.type._context,r=t.pendingProps,i=t.memoizedProps,o=r.value,te(bi,s._currentValue),s._currentValue=o,i!==null)if(At(i.value,o)){if(i.children===r.children&&!Qe.current){t=en(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var c=l.firstContext;c!==null;){if(c.context===s){if(i.tag===1){c=Qt(-1,n&-n),c.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var u=d.pending;u===null?c.next=c:(c.next=u.next,u.next=c),d.pending=c}}i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),Ql(i.return,n,t),l.lanes|=n;break}c=c.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(F(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Ql(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ze(e,t,r.children,n),t=t.child}return t;case 9:return r=t.type,s=t.pendingProps.children,As(t,n),r=ft(r),s=s(r),t.flags|=1,ze(e,t,s,n),t.child;case 14:return s=t.type,r=xt(s,t.pendingProps),r=xt(s.type,r),Dh(e,t,s,r,n);case 15:return Fg(e,t,t.type,t.pendingProps,n);case 17:return s=t.type,r=t.pendingProps,r=t.elementType===s?r:xt(s,r),qa(e,t),t.tag=1,Xe(s)?(e=!0,gi(t)):e=!1,As(t,n),Eg(t,s,r),Jl(t,s,r,n),tc(null,t,s,!0,e,n);case 19:return Lg(e,t,n);case 22:return Dg(e,t,n)}throw Error(F(156,t.tag))};function Zg(e,t){return Tf(e,t)}function gk(e,t,n,s){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ht(e,t,n,s){return new gk(e,t,n,s)}function Ld(e){return e=e.prototype,!(!e||!e.isReactComponent)}function yk(e){if(typeof e=="function")return Ld(e)?1:0;if(e!=null){if(e=e.$$typeof,e===nd)return 11;if(e===sd)return 14}return 2}function xn(e,t){var n=e.alternate;return n===null?(n=ht(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ka(e,t,n,s,r,i){var o=2;if(s=e,typeof e=="function")Ld(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case cs:return zn(n.children,r,i,t);case td:o=8,r|=8;break;case kl:return e=ht(12,n,t,r|2),e.elementType=kl,e.lanes=i,e;case jl:return e=ht(13,n,t,r),e.elementType=jl,e.lanes=i,e;case Sl:return e=ht(19,n,t,r),e.elementType=Sl,e.lanes=i,e;case cf:return io(n,r,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case of:o=10;break e;case lf:o=9;break e;case nd:o=11;break e;case sd:o=14;break e;case ln:o=16,s=null;break e}throw Error(F(130,e==null?e:typeof e,""))}return t=ht(o,n,t,r),t.elementType=e,t.type=s,t.lanes=i,t}function zn(e,t,n,s){return e=ht(7,e,s,t),e.lanes=n,e}function io(e,t,n,s){return e=ht(22,e,s,t),e.elementType=cf,e.lanes=n,e.stateNode={isHidden:!1},e}function Yo(e,t,n){return e=ht(6,e,null,t),e.lanes=n,e}function Go(e,t,n){return t=ht(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function vk(e,t,n,s,r){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ao(0),this.expirationTimes=Ao(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ao(0),this.identifierPrefix=s,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function $d(e,t,n,s,r,i,o,l,c){return e=new vk(e,t,n,l,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=ht(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:s,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},xd(i),e}function bk(e,t,n){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ls,key:s==null?null:""+s,children:e,containerInfo:t,implementation:n}}function ey(e){if(!e)return jn;e=e._reactInternals;e:{if(ss(e)!==e||e.tag!==1)throw Error(F(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Xe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(F(171))}if(e.tag===1){var n=e.type;if(Xe(n))return eg(e,n,t)}return t}function ty(e,t,n,s,r,i,o,l,c){return e=$d(n,s,!0,e,r,i,o,l,c),e.context=ey(null),n=e.current,s=Ve(),r=wn(n),i=Qt(s,r),i.callback=t??null,vn(n,i,r),e.current.lanes=r,Qr(e,r,s),Je(e,s),e}function oo(e,t,n,s){var r=t.current,i=Ve(),o=wn(r);return n=ey(n),t.context===null?t.context=n:t.pendingContext=n,t=Qt(i,o),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=vn(r,t,o),e!==null&&(Nt(e,r,o,i),Va(e,r,o)),o}function Ei(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Hh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function _d(e,t){Hh(e,t),(e=e.alternate)&&Hh(e,t)}function wk(){return null}var ny=typeof reportError=="function"?reportError:function(e){console.error(e)};function Od(e){this._internalRoot=e}lo.prototype.render=Od.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(F(409));oo(e,t,null,null)};lo.prototype.unmount=Od.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Qn(function(){oo(null,e,null,null)}),t[Jt]=null}};function lo(e){this._internalRoot=e}lo.prototype.unstable_scheduleHydration=function(e){if(e){var t=Df();e={blockedOn:null,target:e,priority:t};for(var n=0;n<dn.length&&t!==0&&t<dn[n].priority;n++);dn.splice(n,0,e),n===0&&Bf(e)}};function zd(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function co(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function qh(){}function xk(e,t,n,s,r){if(r){if(typeof s=="function"){var i=s;s=function(){var d=Ei(o);i.call(d)}}var o=ty(t,s,e,0,null,!1,!1,"",qh);return e._reactRootContainer=o,e[Jt]=o.current,Dr(e.nodeType===8?e.parentNode:e),Qn(),o}for(;r=e.lastChild;)e.removeChild(r);if(typeof s=="function"){var l=s;s=function(){var d=Ei(c);l.call(d)}}var c=$d(e,0,!1,null,null,!1,!1,"",qh);return e._reactRootContainer=c,e[Jt]=c.current,Dr(e.nodeType===8?e.parentNode:e),Qn(function(){oo(t,c,n,s)}),c}function uo(e,t,n,s,r){var i=n._reactRootContainer;if(i){var o=i;if(typeof r=="function"){var l=r;r=function(){var c=Ei(o);l.call(c)}}oo(t,o,e,r)}else o=xk(n,t,e,r,s);return Ei(o)}Rf=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=lr(t.pendingLanes);n!==0&&(id(t,n|1),Je(t,ye()),!(K&6)&&(Ls=ye()+500,An()))}break;case 13:Qn(function(){var s=Zt(e,1);if(s!==null){var r=Ve();Nt(s,e,1,r)}}),_d(e,1)}};od=function(e){if(e.tag===13){var t=Zt(e,134217728);if(t!==null){var n=Ve();Nt(t,e,134217728,n)}_d(e,134217728)}};Ff=function(e){if(e.tag===13){var t=wn(e),n=Zt(e,t);if(n!==null){var s=Ve();Nt(n,e,t,s)}_d(e,t)}};Df=function(){return X};Mf=function(e,t){var n=X;try{return X=e,t()}finally{X=n}};Ml=function(e,t,n){switch(t){case"input":if(Cl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var s=n[t];if(s!==e&&s.form===e.form){var r=eo(s);if(!r)throw Error(F(90));uf(s),Cl(s,r)}}}break;case"textarea":mf(e,n);break;case"select":t=n.value,t!=null&&Ss(e,!!n.multiple,t,!1)}};wf=Md;xf=Qn;var kk={usingClientEntryPoint:!1,Events:[Jr,ms,eo,vf,bf,Md]},sr={findFiberByHostInstance:Bn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},jk={bundleType:sr.bundleType,version:sr.version,rendererPackageName:sr.rendererPackageName,rendererConfig:sr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:rn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Sf(e),e===null?null:e.stateNode},findFiberByHostInstance:sr.findFiberByHostInstance||wk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ta=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ta.isDisabled&&Ta.supportsFiber)try{Qi=Ta.inject(jk),Lt=Ta}catch{}}ot.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=kk;ot.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!zd(t))throw Error(F(200));return bk(e,t,null,n)};ot.createRoot=function(e,t){if(!zd(e))throw Error(F(299));var n=!1,s="",r=ny;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=$d(e,1,!1,null,null,n,!1,s,r),e[Jt]=t.current,Dr(e.nodeType===8?e.parentNode:e),new Od(t)};ot.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(F(188)):(e=Object.keys(e).join(","),Error(F(268,e)));return e=Sf(t),e=e===null?null:e.stateNode,e};ot.flushSync=function(e){return Qn(e)};ot.hydrate=function(e,t,n){if(!co(t))throw Error(F(200));return uo(null,e,t,!0,n)};ot.hydrateRoot=function(e,t,n){if(!zd(e))throw Error(F(405));var s=n!=null&&n.hydratedSources||null,r=!1,i="",o=ny;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=ty(t,null,e,1,n??null,r,!1,i,o),e[Jt]=t.current,Dr(e),s)for(e=0;e<s.length;e++)n=s[e],r=n._getVersion,r=r(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,r]:t.mutableSourceEagerHydrationData.push(n,r);return new lo(t)};ot.render=function(e,t,n){if(!co(t))throw Error(F(200));return uo(null,e,t,!1,n)};ot.unmountComponentAtNode=function(e){if(!co(e))throw Error(F(40));return e._reactRootContainer?(Qn(function(){uo(null,null,e,!1,function(){e._reactRootContainer=null,e[Jt]=null})}),!0):!1};ot.unstable_batchedUpdates=Md;ot.unstable_renderSubtreeIntoContainer=function(e,t,n,s){if(!co(n))throw Error(F(200));if(e==null||e._reactInternals===void 0)throw Error(F(38));return uo(e,t,n,!1,s)};ot.version="18.3.1-next-f1338f8080-20240426";function sy(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sy)}catch(e){console.error(e)}}sy(),nf.exports=ot;var Sk=nf.exports,ry,Yh=Sk;ry=Yh.createRoot,Yh.hydrateRoot;const Nk="modulepreload",Tk=function(e){return"/flexspot/"+e},Gh={},ay=function(t,n,s){let r=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));r=Promise.allSettled(n.map(c=>{if(c=Tk(c),c in Gh)return;Gh[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":Nk,d||(h.as="script"),h.crossOrigin="",h.href=c,l&&h.setAttribute("nonce",l),document.head.appendChild(h),d)return new Promise((m,y)=>{h.addEventListener("load",m),h.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return r.then(o=>{for(const l of o||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};/**
 * react-router v7.18.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Wd=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,iy=/^[\\/]{2}/;function Ck(e,t){return t+e.replace(/\\/g,"/")}var Kh="popstate";function Qh(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function Ak(e={}){function t(s,r){var d;let i=(d=r.state)==null?void 0:d.masked,{pathname:o,search:l,hash:c}=i||s.location;return mc("",{pathname:o,search:l,hash:c},r.state&&r.state.usr||null,r.state&&r.state.key||"default",i?{pathname:s.location.pathname,search:s.location.search,hash:s.location.hash}:void 0)}function n(s,r){return typeof r=="string"?r:$s(r)}return Pk(t,n,null,e)}function de(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Et(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Ek(){return Math.random().toString(36).substring(2,10)}function Xh(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function mc(e,t,n=null,s,r){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Hs(t):t,state:n,key:t&&t.key||s||Ek(),mask:r}}function $s({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function Hs(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let s=e.indexOf("?");s>=0&&(t.search=e.substring(s),e=e.substring(0,s)),e&&(t.pathname=e)}return t}function Pk(e,t,n,s={}){let{window:r=document.defaultView,v5Compat:i=!1}=s,o=r.history,l="POP",c=null,d=u();d==null&&(d=0,o.replaceState({...o.state,idx:d},""));function u(){return(o.state||{idx:null}).idx}function h(){l="POP";let x=u(),f=x==null?null:x-d;d=x,c&&c({action:l,location:b.location,delta:f})}function m(x,f){l="PUSH";let g=Qh(x)?x:mc(b.location,x,f);d=u()+1;let v=Xh(g,d),k=b.createHref(g.mask||g);try{o.pushState(v,"",k)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;r.location.assign(k)}i&&c&&c({action:l,location:b.location,delta:1})}function y(x,f){l="REPLACE";let g=Qh(x)?x:mc(b.location,x,f);d=u();let v=Xh(g,d),k=b.createHref(g.mask||g);o.replaceState(v,"",k),i&&c&&c({action:l,location:b.location,delta:0})}function p(x){return Rk(r,x)}let b={get action(){return l},get location(){return e(r,o)},listen(x){if(c)throw new Error("A history only accepts one active listener");return r.addEventListener(Kh,h),c=x,()=>{r.removeEventListener(Kh,h),c=null}},createHref(x){return t(r,x)},createURL:p,encodeLocation(x){let f=p(x);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:m,replace:y,go(x){return o.go(x)}};return b}function Rk(e,t,n=!1){let s="http://localhost";e&&(s=e.location.origin!=="null"?e.location.origin:e.location.href),de(s,"No window.location.(origin|href) available to create URL");let r=typeof t=="string"?t:$s(t);return r=r.replace(/ $/,"%20"),!n&&iy.test(r)&&(r=s+r),new URL(r,s)}function oy(e,t,n="/"){return Fk(e,t,n,!1)}function Fk(e,t,n,s,r){let i=typeof t=="string"?Hs(t):t,o=tn(i.pathname||"/",n);if(o==null)return null;let l=Dk(e),c=null,d=Uk(o);for(let u=0;c==null&&u<l.length;++u)c=Vk(l[u],d,s);return c}function Dk(e){let t=ly(e);return Mk(t),t}function ly(e,t=[],n=[],s="",r=!1){let i=(o,l,c=r,d)=>{let u={relativePath:d===void 0?o.path||"":d,caseSensitive:o.caseSensitive===!0,childrenIndex:l,route:o};if(u.relativePath.startsWith("/")){if(!u.relativePath.startsWith(s)&&c)return;de(u.relativePath.startsWith(s),`Absolute route path "${u.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),u.relativePath=u.relativePath.slice(s.length)}let h=Tt([s,u.relativePath]),m=n.concat(u);o.children&&o.children.length>0&&(de(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${h}".`),ly(o.children,t,m,h,c)),!(o.path==null&&!o.index)&&t.push({path:h,score:zk(h,o.index),routesMeta:m.map((y,p)=>{let[b,x]=uy(y.relativePath,y.caseSensitive,p===m.length-1);return{...y,matcher:b,compiledParams:x}})})};return e.forEach((o,l)=>{var c;if(o.path===""||!((c=o.path)!=null&&c.includes("?")))i(o,l);else for(let d of cy(o.path))i(o,l,!0,d)}),t}function cy(e){let t=e.split("/");if(t.length===0)return[];let[n,...s]=t,r=n.endsWith("?"),i=n.replace(/\?$/,"");if(s.length===0)return r?[i,""]:[i];let o=cy(s.join("/")),l=[];return l.push(...o.map(c=>c===""?i:[i,c].join("/"))),r&&l.push(...o),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Mk(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Wk(t.routesMeta.map(s=>s.childrenIndex),n.routesMeta.map(s=>s.childrenIndex)))}var Bk=/^:[\w-]+$/,Ik=3,Lk=2,$k=1,_k=10,Ok=-2,Jh=e=>e==="*";function zk(e,t){let n=e.split("/"),s=n.length;return n.some(Jh)&&(s+=Ok),t&&(s+=Lk),n.filter(r=>!Jh(r)).reduce((r,i)=>r+(Bk.test(i)?Ik:i===""?$k:_k),s)}function Wk(e,t){return e.length===t.length&&e.slice(0,-1).every((s,r)=>s===t[r])?e[e.length-1]-t[t.length-1]:0}function Vk(e,t,n=!1){let{routesMeta:s}=e,r={},i="/",o=[];for(let l=0;l<s.length;++l){let c=s[l],d=l===s.length-1,u=i==="/"?t:t.slice(i.length)||"/",h={path:c.relativePath,caseSensitive:c.caseSensitive,end:d},m=c.matcher&&c.compiledParams?dy(h,u,c.matcher,c.compiledParams):Pi(h,u),y=c.route;if(!m&&d&&n&&!s[s.length-1].route.index&&(m=Pi({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},u)),!m)return null;Object.assign(r,m.params),o.push({params:r,pathname:Tt([i,m.pathname]),pathnameBase:Yk(Tt([i,m.pathnameBase])),route:y}),m.pathnameBase!=="/"&&(i=Tt([i,m.pathnameBase]))}return o}function Pi(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,s]=uy(e.path,e.caseSensitive,e.end);return dy(e,t,n,s)}function dy(e,t,n,s){let r=t.match(n);if(!r)return null;let i=r[0],o=_s(i,1),l=r.slice(1);return{params:s.reduce((d,{paramName:u,isOptional:h},m)=>{if(u==="*"){let p=l[m]||"";o=_s(i.slice(0,i.length-p.length),1)}const y=l[m];return h&&!y?d[u]=void 0:d[u]=(y||"").replace(/%2F/g,"/"),d},{}),pathname:i,pathnameBase:o,pattern:e}}function uy(e,t=!1,n=!0){Et(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let s=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,c,d,u)=>{if(s.push({paramName:l,isOptional:c!=null}),c){let h=u.charAt(d+o.length);return h&&h!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(s.push({paramName:"*"}),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":e!==""&&e!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,t?void 0:"i"),s]}function Uk(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Et(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function tn(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,s=e.charAt(n);return s&&s!=="/"?null:e.slice(n)||"/"}function Hk(e,t="/"){let{pathname:n,search:s="",hash:r=""}=typeof e=="string"?Hs(e):e,i;return n?(n=my(n),n.startsWith("/")||n.startsWith("\\")?i=Zh(n.substring(1),"/"):i=Zh(n,t)):i=t,{pathname:i,search:Gk(s),hash:Kk(r)}}function Zh(e,t){let n=_s(t).split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function Ko(e,t,n,s){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function qk(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function hy(e){let t=qk(e);return t.map((n,s)=>s===t.length-1?n.pathname:n.pathnameBase)}function Vd(e,t,n,s=!1){let r;typeof e=="string"?r=Hs(e):(r={...e},de(!r.pathname||!r.pathname.includes("?"),Ko("?","pathname","search",r)),de(!r.pathname||!r.pathname.includes("#"),Ko("#","pathname","hash",r)),de(!r.search||!r.search.includes("#"),Ko("#","search","hash",r)));let i=e===""||r.pathname==="",o=i?"/":r.pathname,l;if(o==null)l=n;else{let h=t.length-1;if(!s&&o.startsWith("..")){let m=o.split("/");for(;m[0]==="..";)m.shift(),h-=1;r.pathname=m.join("/")}l=h>=0?t[h]:"/"}let c=Hk(r,l),d=o&&o!=="/"&&o.endsWith("/"),u=(i||o===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(d||u)&&(c.pathname+="/"),c}var my=e=>e.replace(/[\\/]{2,}/g,"/"),Tt=e=>my(e.join("/"));function _s(e,t=0){let n=e.length;for(;n>t&&e.charCodeAt(n-1)===47;)n--;return n===e.length?e:e.slice(0,n)}var Yk=e=>_s(e).replace(/^\/*/,"/"),Gk=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Kk=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,Qk=class{constructor(e,t,n,s=!1){this.status=e,this.statusText=t||"",this.internal=s,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Xk(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function Jk(e){let t=e.map(n=>n.route.path).filter(Boolean);return Tt(t)||"/"}var py=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function fy(e,t){let n=e;if(typeof n!="string"||!Wd.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let s=n,r=!1;if(py)try{let i=new URL(window.location.href),o=iy.test(n)?new URL(Ck(n,i.protocol)):new URL(n),l=tn(o.pathname,t);o.origin===i.origin&&l!=null?n=l+o.search+o.hash:r=!0}catch{Et(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:s,isExternal:r,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var em=new URL("http://localhost");function gy(e){if(e.createURL)return e.createURL("/");try{return new URL(e.createHref("/"),em)}catch{return em}}function Qo(e,t){return e.origin===t.origin&&(e.origin!=="null"||e.protocol===t.protocol&&e.host===t.host)}function Zk(e,t){if(e.startsWith("//"))return!0;let n=t.protocol.toLowerCase();return e.toLowerCase().startsWith(n)?t.host===""||e.slice(n.length).startsWith("//"):!1}function yy(e,t,n,s){let r=null;try{r=e==null?null:new URL(e,n)}catch{}let i=new URL(t,n),o=r!=null&&!Qo(r,n),l=!Qo(i,n);if(s==="reject"){if(o||l)throw new Error("External navigation is not allowed")}else if(l&&(r==null||!Zk(e,r)||!Qo(r,i)))throw new Error("External navigation is not allowed")}var vy=["POST","PUT","PATCH","DELETE"];new Set(vy);var e0=["GET",...vy];new Set(e0);var t0=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];function n0(e){try{return t0.includes(new URL(e).protocol)}catch{return!1}}var qs=w.createContext(null);qs.displayName="DataRouter";var ho=w.createContext(null);ho.displayName="DataRouterState";var by=w.createContext(!1);function s0(){return w.useContext(by)}var wy=w.createContext({isTransitioning:!1});wy.displayName="ViewTransition";var r0=w.createContext(new Map);r0.displayName="Fetchers";var a0=w.createContext(null);a0.displayName="Await";var yt=w.createContext(null);yt.displayName="Navigation";var ea=w.createContext(null);ea.displayName="Location";var zt=w.createContext({outlet:null,matches:[],isDataRoute:!1});zt.displayName="Route";var Ud=w.createContext(null);Ud.displayName="RouteError";var xy="REACT_ROUTER_ERROR",i0="REDIRECT",o0="ROUTE_ERROR_RESPONSE";function l0(e){if(e.startsWith(`${xy}:${i0}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function c0(e){if(e.startsWith(`${xy}:${o0}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new Qk(t.status,t.statusText,t.data)}catch{}}function d0(e,{relative:t}={}){de(ta(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:s}=w.useContext(yt),{hash:r,pathname:i,search:o}=na(e,{relative:t}),l=i;return n!=="/"&&(l=i==="/"?n:Tt([n,i])),s.createHref({pathname:l,search:o,hash:r})}function ta(){return w.useContext(ea)!=null}function Ze(){return de(ta(),"useLocation() may be used only in the context of a <Router> component."),w.useContext(ea).location}var ky="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function jy(e){w.useContext(yt).static||w.useLayoutEffect(e)}function Hd(){let{isDataRoute:e}=w.useContext(zt);return e?j0():u0()}function u0(){de(ta(),"useNavigate() may be used only in the context of a <Router> component.");let e=w.useContext(qs),{basename:t,navigator:n}=w.useContext(yt),{matches:s}=w.useContext(zt),{pathname:r}=Ze(),i=JSON.stringify(hy(s)),o=w.useRef(!1);return jy(()=>{o.current=!0}),w.useCallback((c,d={})=>{if(Et(o.current,ky),!o.current)return;if(typeof c=="number"){n.go(c);return}let u=Vd(c,JSON.parse(i),r,d.relative==="path");e==null&&t!=="/"&&(u.pathname=u.pathname==="/"?t:Tt([t,u.pathname])),yy(typeof c=="string"?c:$s(c),n.createHref(u),gy(n),"reject"),(d.replace?n.replace:n.push)(u,d.state,d)},[t,n,i,r,e])}w.createContext(null);function qd(){let{matches:e}=w.useContext(zt),t=e[e.length-1];return(t==null?void 0:t.params)??{}}function na(e,{relative:t}={}){let{matches:n}=w.useContext(zt),{pathname:s}=Ze(),r=JSON.stringify(hy(n));return w.useMemo(()=>Vd(e,JSON.parse(r),s,t==="path"),[e,r,s,t])}function h0(e,t){return Sy(e,t)}function Sy(e,t,n){var x;de(ta(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:s}=w.useContext(yt),{matches:r}=w.useContext(zt),i=r[r.length-1],o=i?i.params:{},l=i?i.pathname:"/",c=i?i.pathnameBase:"/",d=i&&i.route;{let f=d&&d.path||"";Ty(l,!d||f.endsWith("*")||f.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${f}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${f}"> to <Route path="${f==="/"?"*":`${f}/*`}">.`)}let u=Ze(),h;if(t){let f=typeof t=="string"?Hs(t):t;de(c==="/"||((x=f.pathname)==null?void 0:x.startsWith(c)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${f.pathname}" was given in the \`location\` prop.`),h=f}else h=u;let m=h.pathname||"/",y=m;if(c!=="/"){let f=c.replace(/^\//,"").split("/");y="/"+m.replace(/^\//,"").split("/").slice(f.length).join("/")}let p=n&&n.state.matches.length?n.state.matches.map(f=>Object.assign(f,{route:n.manifest[f.route.id]||f.route})):oy(e,{pathname:y});Et(d||p!=null,`No routes matched location "${h.pathname}${h.search}${h.hash}" `),Et(p==null||p[p.length-1].route.element!==void 0||p[p.length-1].route.Component!==void 0||p[p.length-1].route.lazy!==void 0,`Matched leaf route at location "${h.pathname}${h.search}${h.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let b=y0(p&&p.map(f=>Object.assign({},f,{params:Object.assign({},o,f.params),pathname:Tt([c,s.encodeLocation?s.encodeLocation(f.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:f.pathname]),pathnameBase:f.pathnameBase==="/"?c:Tt([c,s.encodeLocation?s.encodeLocation(f.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:f.pathnameBase])})),r,n);return t&&b?w.createElement(ea.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...h},navigationType:"POP"}},b):b}function m0(){let e=k0(),t=Xk(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,s="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:s},i={padding:"2px 4px",backgroundColor:s},o=null;return console.error("Error handled by React Router default ErrorBoundary:",e),o=w.createElement(w.Fragment,null,w.createElement("p",null,"💿 Hey developer 👋"),w.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",w.createElement("code",{style:i},"ErrorBoundary")," or"," ",w.createElement("code",{style:i},"errorElement")," prop on your route.")),w.createElement(w.Fragment,null,w.createElement("h2",null,"Unexpected Application Error!"),w.createElement("h3",{style:{fontStyle:"italic"}},t),n?w.createElement("pre",{style:r},n):null,o)}var p0=w.createElement(m0,null),Ny=class extends w.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=c0(e.digest);n&&(e=n)}let t=e!==void 0?w.createElement(zt.Provider,{value:this.props.routeContext},w.createElement(Ud.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?w.createElement(f0,{error:e},t):t}};Ny.contextType=by;var Xo=new WeakMap;function f0({children:e,error:t}){let{basename:n,navigator:s}=w.useContext(yt);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let r=l0(t.digest);if(r){let i=Xo.get(t);if(i)throw i;let o=fy(r.location,n),l=o.absoluteURL||o.to;if(yy(r.location,l,gy(s),"allow-explicit"),n0(l))throw new Error("Invalid redirect location");if(py&&!Xo.get(t))if(o.isExternal||r.reloadDocument)window.location.href=l;else{const c=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(o.to,{replace:r.replace}));throw Xo.set(t,c),c}return w.createElement("meta",{httpEquiv:"refresh",content:`0;url=${l}`})}}return e}function g0({routeContext:e,match:t,children:n}){let s=w.useContext(qs);return s&&s.static&&s.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=t.route.id),w.createElement(zt.Provider,{value:e},n)}function y0(e,t=[],n){let s=n==null?void 0:n.state;if(e==null){if(!s)return null;if(s.errors)e=s.matches;else if(t.length===0&&!s.initialized&&s.matches.length>0)e=s.matches;else return null}let r=e,i=s==null?void 0:s.errors;if(i!=null){let u=r.findIndex(h=>h.route.id&&(i==null?void 0:i[h.route.id])!==void 0);de(u>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),r=r.slice(0,Math.min(r.length,u+1))}let o=!1,l=-1;if(n&&s){o=s.renderFallback;for(let u=0;u<r.length;u++){let h=r[u];if((h.route.HydrateFallback||h.route.hydrateFallbackElement)&&(l=u),h.route.id){let{loaderData:m,errors:y}=s,p=h.route.loader&&!m.hasOwnProperty(h.route.id)&&(!y||y[h.route.id]===void 0);if(h.route.lazy||p){n.isStatic&&(o=!0),l>=0?r=r.slice(0,l+1):r=[r[0]];break}}}}let c=n==null?void 0:n.onError,d=s&&c?(u,h)=>{var m,y;c(u,{location:s.location,params:((y=(m=s.matches)==null?void 0:m[0])==null?void 0:y.params)??{},pattern:Jk(s.matches),errorInfo:h})}:void 0;return r.reduceRight((u,h,m)=>{let y,p=!1,b=null,x=null;s&&(y=i&&h.route.id?i[h.route.id]:void 0,b=h.route.errorElement||p0,o&&(l<0&&m===0?(Ty("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),p=!0,x=null):l===m&&(p=!0,x=h.route.hydrateFallbackElement||null)));let f=t.concat(r.slice(0,m+1)),g=()=>{let v;return y?v=b:p?v=x:h.route.Component?v=w.createElement(h.route.Component,null):h.route.element?v=h.route.element:v=u,w.createElement(g0,{match:h,routeContext:{outlet:u,matches:f,isDataRoute:s!=null},children:v})};return s&&(h.route.ErrorBoundary||h.route.errorElement||m===0)?w.createElement(Ny,{location:s.location,revalidation:s.revalidation,component:b,error:y,children:g(),routeContext:{outlet:null,matches:f,isDataRoute:!0},onError:d}):g()},null)}function Yd(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function v0(e){let t=w.useContext(qs);return de(t,Yd(e)),t}function b0(e){let t=w.useContext(ho);return de(t,Yd(e)),t}function w0(e){let t=w.useContext(zt);return de(t,Yd(e)),t}function Gd(e){let t=w0(e),n=t.matches[t.matches.length-1];return de(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function x0(){return Gd("useRouteId")}function k0(){var s;let e=w.useContext(Ud),t=b0("useRouteError"),n=Gd("useRouteError");return e!==void 0?e:(s=t.errors)==null?void 0:s[n]}function j0(){let{router:e}=v0("useNavigate"),t=Gd("useNavigate"),n=w.useRef(!1);return jy(()=>{n.current=!0}),w.useCallback(async(r,i={})=>{Et(n.current,ky),n.current&&(typeof r=="number"?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var tm={};function Ty(e,t,n){!t&&!tm[e]&&(tm[e]=!0,Et(!1,n))}w.memo(S0);function S0({routes:e,manifest:t,future:n,state:s,isStatic:r,onError:i}){return Sy(e,void 0,{manifest:t,state:s,isStatic:r,onError:i})}function me(e){de(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function N0({basename:e="/",children:t=null,location:n,navigationType:s="POP",navigator:r,static:i=!1,useTransitions:o}){de(!ta(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let l=e.replace(/^\/*/,"/"),c=w.useMemo(()=>({basename:l,navigator:r,static:i,useTransitions:o,future:{}}),[l,r,i,o]);typeof n=="string"&&(n=Hs(n));let{pathname:d="/",search:u="",hash:h="",state:m=null,key:y="default",mask:p}=n,b=w.useMemo(()=>{let x=tn(d,l);return x==null?null:{location:{pathname:x,search:u,hash:h,state:m,key:y,mask:p},navigationType:s}},[l,d,u,h,m,y,s,p]);return Et(b!=null,`<Router basename="${l}"> is not able to match the URL "${d}${u}${h}" because it does not start with the basename, so the <Router> won't render anything.`),b==null?null:w.createElement(yt.Provider,{value:c},w.createElement(ea.Provider,{children:t,value:b}))}function T0({children:e,location:t}){return h0(pc(e),t)}function pc(e,t=[]){let n=[];return w.Children.forEach(e,(s,r)=>{if(!w.isValidElement(s))return;let i=[...t,r];if(s.type===w.Fragment){n.push.apply(n,pc(s.props.children,i));return}de(s.type===me,`[${typeof s.type=="string"?s.type:s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),de(!s.props.index||!s.props.children,"An index route cannot have child routes.");let o={id:s.props.id||i.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,middleware:s.props.middleware,loader:s.props.loader,action:s.props.action,hydrateFallbackElement:s.props.hydrateFallbackElement,HydrateFallback:s.props.HydrateFallback,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.hasErrorBoundary===!0||s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(o.children=pc(s.props.children,i)),n.push(o)}),n}var Qa="get",Xa="application/x-www-form-urlencoded";function mo(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function C0(e){return mo(e)&&e.tagName.toLowerCase()==="button"}function A0(e){return mo(e)&&e.tagName.toLowerCase()==="form"}function E0(e){return mo(e)&&e.tagName.toLowerCase()==="input"}function P0(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function R0(e,t){return e.button===0&&(!t||t==="_self")&&!P0(e)}function fc(e=""){return new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let s=e[n];return t.concat(Array.isArray(s)?s.map(r=>[n,r]):[[n,s]])},[]))}function F0(e,t){let n=fc(e);return t&&t.forEach((s,r)=>{n.has(r)||t.getAll(r).forEach(i=>{n.append(r,i)})}),n}var Ca=null;function D0(){if(Ca===null)try{new FormData(document.createElement("form"),0),Ca=!1}catch{Ca=!0}return Ca}var M0=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Jo(e){return e!=null&&!M0.has(e)?(Et(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Xa}"`),null):e}function B0(e,t){let n,s,r,i,o;if(A0(e)){let l=e.getAttribute("action");s=l?tn(l,t):null,n=e.getAttribute("method")||Qa,r=Jo(e.getAttribute("enctype"))||Xa,i=new FormData(e)}else if(C0(e)||E0(e)&&(e.type==="submit"||e.type==="image")){let l=e.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||l.getAttribute("action");if(s=c?tn(c,t):null,n=e.getAttribute("formmethod")||l.getAttribute("method")||Qa,r=Jo(e.getAttribute("formenctype"))||Jo(l.getAttribute("enctype"))||Xa,i=new FormData(l,e),!D0()){let{name:d,type:u,value:h}=e;if(u==="image"){let m=d?`${d}.`:"";i.append(`${m}x`,"0"),i.append(`${m}y`,"0")}else d&&i.append(d,h)}}else{if(mo(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Qa,s=null,r=Xa,o=e}return i&&r==="text/plain"&&(o=i,i=void 0),{action:s,method:n.toLowerCase(),encType:r,formData:i,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Kd(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Cy(e,t,n,s){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?r.pathname.endsWith("/")?r.pathname=`${r.pathname}_.${s}`:r.pathname=`${r.pathname}.${s}`:r.pathname==="/"?r.pathname=`_root.${s}`:t&&tn(r.pathname,t)==="/"?r.pathname=`${_s(t)}/_root.${s}`:r.pathname=`${_s(r.pathname)}.${s}`,r}async function I0(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function L0(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function $0(e,t,n){let s=await Promise.all(e.map(async r=>{let i=t.routes[r.route.id];if(i){let o=await I0(i,n);return o.links?o.links():[]}return[]}));return W0(s.flat(1).filter(L0).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function nm(e,t,n,s,r,i){let o=(c,d)=>n[d]?c.route.id!==n[d].route.id:!0,l=(c,d)=>{var u;return n[d].pathname!==c.pathname||((u=n[d].route.path)==null?void 0:u.endsWith("*"))&&n[d].params["*"]!==c.params["*"]};return i==="assets"?t.filter((c,d)=>o(c,d)||l(c,d)):i==="data"?t.filter((c,d)=>{var h;let u=s.routes[c.route.id];if(!u||!u.hasLoader)return!1;if(o(c,d)||l(c,d))return!0;if(c.route.shouldRevalidate){let m=c.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:((h=n[0])==null?void 0:h.params)||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof m=="boolean")return m}return!0}):[]}function _0(e,t,{includeHydrateFallback:n}={}){return O0(e.map(s=>{let r=t.routes[s.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function O0(e){return[...new Set(e)]}function z0(e){let t={},n=Object.keys(e).sort();for(let s of n)t[s]=e[s];return t}function W0(e,t){let n=new Set;return new Set(t),e.reduce((s,r)=>{let i=JSON.stringify(z0(r));return n.has(i)||(n.add(i),s.push({key:i,link:r})),s},[])}function Qd(){let e=w.useContext(qs);return Kd(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function V0(){let e=w.useContext(ho);return Kd(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Xd=w.createContext(void 0);Xd.displayName="FrameworkContext";function po(){let e=w.useContext(Xd);return Kd(e,"You must render this element inside a <HydratedRouter> element"),e}function U0(e,t){let n=w.useContext(Xd),[s,r]=w.useState(!1),[i,o]=w.useState(!1),{onFocus:l,onBlur:c,onMouseEnter:d,onMouseLeave:u,onTouchStart:h}=t,m=w.useRef(null);w.useEffect(()=>{if(e==="render"&&o(!0),e==="viewport"){let b=f=>{f.forEach(g=>{o(g.isIntersecting)})},x=new IntersectionObserver(b,{threshold:.5});return m.current&&x.observe(m.current),()=>{x.disconnect()}}},[e]),w.useEffect(()=>{if(s){let b=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(b)}}},[s]);let y=()=>{r(!0)},p=()=>{r(!1),o(!1)};return n?e!=="intent"?[i,m,{}]:[i,m,{onFocus:rr(l,y),onBlur:rr(c,p),onMouseEnter:rr(d,y),onMouseLeave:rr(u,p),onTouchStart:rr(h,y)}]:[!1,m,{}]}function rr(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function H0({page:e,...t}){let n=s0(),{nonce:s}=po(),{router:r}=Qd(),i=w.useMemo(()=>oy(r.routes,e,r.basename),[r.routes,e,r.basename]);return i?(t.nonce==null&&s&&(t={...t,nonce:s}),n?w.createElement(Y0,{page:e,matches:i,...t}):w.createElement(G0,{page:e,matches:i,...t})):null}function q0(e){let{manifest:t,routeModules:n}=po(),[s,r]=w.useState([]);return w.useEffect(()=>{let i=!1;return $0(e,t,n).then(o=>{i||r(o)}),()=>{i=!0}},[e,t,n]),s}function Y0({page:e,matches:t,...n}){let s=Ze(),{future:r}=po(),{basename:i}=Qd(),o=w.useMemo(()=>{if(e===s.pathname+s.search+s.hash)return[];let l=Cy(e,i,r.v8_trailingSlashAwareDataRequests,"rsc"),c=!1,d=[];for(let u of t)typeof u.route.shouldRevalidate=="function"?c=!0:d.push(u.route.id);return c&&d.length>0&&l.searchParams.set("_routes",d.join(",")),[l.pathname+l.search]},[i,r.v8_trailingSlashAwareDataRequests,e,s,t]);return w.createElement(w.Fragment,null,o.map(l=>w.createElement("link",{key:l,rel:"prefetch",as:"fetch",href:l,...n})))}function G0({page:e,matches:t,...n}){let s=Ze(),{future:r,manifest:i,routeModules:o}=po(),{basename:l}=Qd(),{loaderData:c,matches:d}=V0(),u=w.useMemo(()=>nm(e,t,d,i,s,"data"),[e,t,d,i,s]),h=w.useMemo(()=>nm(e,t,d,i,s,"assets"),[e,t,d,i,s]),m=w.useMemo(()=>{if(e===s.pathname+s.search+s.hash)return[];let b=new Set,x=!1;if(t.forEach(g=>{var k;let v=i.routes[g.route.id];!v||!v.hasLoader||(!u.some(N=>N.route.id===g.route.id)&&g.route.id in c&&((k=o[g.route.id])!=null&&k.shouldRevalidate)||v.hasClientLoader?x=!0:b.add(g.route.id))}),b.size===0)return[];let f=Cy(e,l,r.v8_trailingSlashAwareDataRequests,"data");return x&&b.size>0&&f.searchParams.set("_routes",t.filter(g=>b.has(g.route.id)).map(g=>g.route.id).join(",")),[f.pathname+f.search]},[l,r.v8_trailingSlashAwareDataRequests,c,s,i,u,t,e,o]),y=w.useMemo(()=>_0(h,i),[h,i]),p=q0(h);return w.createElement(w.Fragment,null,m.map(b=>w.createElement("link",{key:b,rel:"prefetch",as:"fetch",href:b,...n})),y.map(b=>w.createElement("link",{key:b,rel:"modulepreload",href:b,...n})),p.map(({key:b,link:x})=>w.createElement("link",{key:b,nonce:n.nonce,...x,crossOrigin:x.crossOrigin??n.crossOrigin})))}function K0(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var Q0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Q0&&(window.__reactRouterVersion="7.18.4")}catch{}function X0({basename:e,children:t,useTransitions:n,window:s}){let r=w.useRef();r.current==null&&(r.current=Ak({window:s,v5Compat:!0}));let i=r.current,[o,l]=w.useState({action:i.action,location:i.location}),c=w.useCallback(d=>{n===!1?l(d):w.startTransition(()=>l(d))},[n]);return w.useLayoutEffect(()=>i.listen(c),[i,c]),w.createElement(N0,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:i,useTransitions:n})}var _=w.forwardRef(function({onClick:t,discover:n="render",prefetch:s="none",relative:r,reloadDocument:i,replace:o,mask:l,state:c,target:d,to:u,preventScrollReset:h,viewTransition:m,defaultShouldRevalidate:y,...p},b){let{basename:x,navigator:f,useTransitions:g}=w.useContext(yt),v=typeof u=="string"&&Wd.test(u),k=fy(u,x);u=k.to;let N=d0(u,{relative:r}),T=Ze(),j=null;if(l){let Y=Vd(l,[],T.mask?T.mask.pathname:"/",!0);x!=="/"&&(Y.pathname=Y.pathname==="/"?x:Tt([x,Y.pathname])),j=f.createHref(Y)}let[S,A,P]=U0(s,p),$=e1(u,{replace:o,mask:l,state:c,target:d,preventScrollReset:h,relative:r,viewTransition:m,defaultShouldRevalidate:y,useTransitions:g});function Q(Y){t&&t(Y),Y.defaultPrevented||$(Y)}let ie=!(k.isExternal||i),D=w.createElement("a",{...p,...P,href:(ie?j:void 0)||k.absoluteURL||N,onClick:ie?Q:t,ref:K0(b,A),target:d,"data-discover":!v&&n==="render"?"true":void 0});return S&&!v?w.createElement(w.Fragment,null,D,w.createElement(H0,{page:N})):D});_.displayName="Link";var Ri=w.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:s="",end:r=!1,style:i,to:o,viewTransition:l,children:c,...d},u){let h=na(o,{relative:d.relative}),m=Ze(),y=w.useContext(ho),{navigator:p,basename:b}=w.useContext(yt),x=y!=null&&a1(h)&&l===!0,f=p.encodeLocation?p.encodeLocation(h).pathname:h.pathname,g=m.pathname,v=y&&y.navigation&&y.navigation.location?y.navigation.location.pathname:null;n||(g=g.toLowerCase(),v=v?v.toLowerCase():null,f=f.toLowerCase()),v&&b&&(v=tn(v,b)||v);const k=f!=="/"&&f.endsWith("/")?f.length-1:f.length;let N=g===f||!r&&g.startsWith(f)&&g.charAt(k)==="/",T=v!=null&&(v===f||!r&&v.startsWith(f)&&v.charAt(f.length)==="/"),j={isActive:N,isPending:T,isTransitioning:x},S=N?t:void 0,A;typeof s=="function"?A=s(j):A=[s,N?"active":null,T?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let P=typeof i=="function"?i(j):i;return w.createElement(_,{...d,"aria-current":S,className:A,ref:u,style:P,to:o,viewTransition:l},typeof c=="function"?c(j):c)});Ri.displayName="NavLink";var J0=w.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:s,replace:r,state:i,method:o=Qa,action:l,onSubmit:c,relative:d,preventScrollReset:u,viewTransition:h,defaultShouldRevalidate:m,...y},p)=>{let{useTransitions:b}=w.useContext(yt),x=s1(),f=r1(l,{relative:d}),g=o.toLowerCase()==="get"?"get":"post",v=typeof l=="string"&&Wd.test(l),k=N=>{if(c&&c(N),N.defaultPrevented)return;N.preventDefault();let T=N.nativeEvent.submitter,j=(T==null?void 0:T.getAttribute("formmethod"))||o,S=()=>x(T||N.currentTarget,{fetcherKey:t,method:j,navigate:n,replace:r,state:i,relative:d,preventScrollReset:u,viewTransition:h,defaultShouldRevalidate:m});b&&n!==!1?w.startTransition(()=>S()):S()};return w.createElement("form",{ref:p,method:g,action:f,onSubmit:s?c:k,...y,"data-discover":!v&&e==="render"?"true":void 0})});J0.displayName="Form";function Z0(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Ay(e){let t=w.useContext(qs);return de(t,Z0(e)),t}function e1(e,{target:t,replace:n,mask:s,state:r,preventScrollReset:i,relative:o,viewTransition:l,defaultShouldRevalidate:c,useTransitions:d}={}){let u=Hd(),h=Ze(),m=na(e,{relative:o});return w.useCallback(y=>{if(R0(y,t)){y.preventDefault();let p=n!==void 0?n:$s(h)===$s(m),b=()=>u(e,{replace:p,mask:s,state:r,preventScrollReset:i,relative:o,viewTransition:l,defaultShouldRevalidate:c});d?w.startTransition(()=>b()):b()}},[h,u,m,n,s,r,t,e,i,o,l,c,d])}function Ey(e){Et(typeof URLSearchParams<"u","You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=w.useRef(fc(e)),n=w.useRef(!1),s=Ze(),r=w.useMemo(()=>F0(s.search,n.current?null:t.current),[s.search]),i=Hd(),o=w.useCallback((l,c)=>{const d=fc(typeof l=="function"?l(new URLSearchParams(r)):l);n.current=!0,i("?"+d,c)},[i,r]);return[r,o]}var t1=0,n1=()=>`__${String(++t1)}__`;function s1(){let{router:e}=Ay("useSubmit"),{basename:t}=w.useContext(yt),n=x0(),s=e.fetch,r=e.navigate;return w.useCallback(async(i,o={})=>{let{action:l,method:c,encType:d,formData:u,body:h}=B0(i,t);if(o.navigate===!1){let m=o.fetcherKey||n1();await s(m,n,o.action||l,{defaultShouldRevalidate:o.defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:u,body:h,formMethod:o.method||c,formEncType:o.encType||d,flushSync:o.flushSync})}else await r(o.action||l,{defaultShouldRevalidate:o.defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:u,body:h,formMethod:o.method||c,formEncType:o.encType||d,replace:o.replace,state:o.state,fromRouteId:n,flushSync:o.flushSync,viewTransition:o.viewTransition})},[s,r,t,n])}function r1(e,{relative:t}={}){let{basename:n}=w.useContext(yt),s=w.useContext(zt);de(s,"useFormAction must be used inside a RouteContext");let[r]=s.matches.slice(-1),i={...na(e||".",{relative:t})},o=Ze();if(e==null){i.search=o.search;let l=new URLSearchParams(i.search),c=l.getAll("index");if(c.some(u=>u==="")){l.delete("index"),c.filter(h=>h).forEach(h=>l.append("index",h));let u=l.toString();i.search=u?`?${u}`:""}}return(!e||e===".")&&r.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(i.pathname=i.pathname==="/"?n:Tt([n,i.pathname])),$s(i)}function a1(e,{relative:t}={}){let n=w.useContext(wy);de(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:s}=Ay("useViewTransitionState"),r=na(e,{relative:t});if(!n.isTransitioning)return!1;let i=tn(n.currentLocation.pathname,s)||n.currentLocation.pathname,o=tn(n.nextLocation.pathname,s)||n.nextLocation.pathname;return Pi(r.pathname,o)!=null||Pi(r.pathname,i)!=null}const Jd=w.createContext({});function Zd(e){const t=w.useRef(null);return t.current===null&&(t.current=e()),t.current}const i1=typeof window<"u",Fi=i1?w.useLayoutEffect:w.useEffect,fo=w.createContext(null);function eu(e,t){e.indexOf(t)===-1&&e.push(t)}function Di(e,t){const n=e.indexOf(t);n>-1&&e.splice(n,1)}const Pt=(e,t,n)=>n>t?t:n<e?e:n;let go=()=>{};const nn={},tu=e=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),Py=e=>typeof e=="object"&&e!==null,nu=e=>/^0[^.\s]+$/u.test(e);function Ry(e){let t;return()=>(t===void 0&&(t=e()),t)}const Ct=e=>e,sa=(...e)=>e.reduce((t,n)=>s=>n(t(s))),Wr=(e,t,n)=>{const s=t-e;return s?(n-e)/s:1};class Mi{constructor(){this.subscriptions=[]}add(t){return eu(this.subscriptions,t),()=>this.remove(t)}remove(t){Di(this.subscriptions,t)}notify(t,n,s){const r=this.subscriptions.length;if(r)if(r===1)this.subscriptions[0](t,n,s);else for(let i=0;i<r;i++){const o=this.subscriptions[i];o&&o(t,n,s)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const pt=e=>e*1e3,st=e=>e/1e3,Fy=(e,t)=>t?e*(1e3/t):0,Dy=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e,o1=1e-7,l1=12;function c1(e,t,n,s,r){let i,o,l=0;do o=t+(n-t)/2,i=Dy(o,s,r)-e,i>0?n=o:t=o;while(Math.abs(i)>o1&&++l<l1);return o}function ra(e,t,n,s){if(e===t&&n===s)return Ct;const r=i=>c1(i,0,1,e,n);return i=>i===0||i===1?i:Dy(r(i),t,s)}const My=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,By=e=>t=>1-e(1-t),Iy=ra(.33,1.53,.69,.99),su=By(Iy),Ly=My(su),$y=e=>e>=1?1:(e*=2)<1?.5*su(e):.5*(2-Math.pow(2,-10*(e-1))),ru=e=>1-Math.sin(Math.acos(e)),_y=By(ru),Oy=My(ru),d1=ra(.42,0,1,1),u1=ra(0,0,.58,1),zy=ra(.42,0,.58,1),h1=e=>Array.isArray(e)&&typeof e[0]!="number",Wy=e=>Array.isArray(e)&&typeof e[0]=="number",m1={linear:Ct,easeIn:d1,easeInOut:zy,easeOut:u1,circIn:ru,circInOut:Oy,circOut:_y,backIn:su,backInOut:Ly,backOut:Iy,anticipate:$y},p1=e=>typeof e=="string",sm=e=>{if(Wy(e)){go(e.length===4);const[t,n,s,r]=e;return ra(t,n,s,r)}else if(p1(e))return m1[e];return e},Aa=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function f1(e){let t=new Set,n=new Set,s=!1,r=!1;const i=new Set;let o={delta:0,timestamp:0,isProcessing:!1};function l(d){i.has(d)&&(n.add(d),e()),d(o)}const c={schedule:(d,u=!1,h=!1)=>{const y=h&&s?t:n;return u&&i.add(d),y.add(d),d},cancel:d=>{n.delete(d),i.delete(d)},process:d=>{if(o=d,s){r=!0;return}s=!0;const u=t;t=n,n=u,t.forEach(l),t.clear(),s=!1,r&&(r=!1,c.process(d))}};return c}const g1=40;function Vy(e,t){let n=!1,s=!0;const r={delta:0,timestamp:0,isProcessing:!1},i=()=>n=!0,o=Aa.reduce((v,k)=>(v[k]=f1(i),v),{}),{setup:l,read:c,resolveKeyframes:d,preUpdate:u,update:h,preRender:m,render:y,postRender:p}=o,b=()=>{const v=nn.useManualTiming,k=v?r.timestamp:performance.now();n=!1,v||(r.delta=s?1e3/60:Math.max(Math.min(k-r.timestamp,g1),1)),r.timestamp=k,r.isProcessing=!0,l.process(r),c.process(r),d.process(r),u.process(r),h.process(r),m.process(r),y.process(r),p.process(r),r.isProcessing=!1,n&&t&&(s=!1,e(b))},x=()=>{n=!0,s=!0,r.isProcessing||e(b)};return{schedule:Aa.reduce((v,k)=>{const N=o[k];return v[k]=(T,j=!1,S=!1)=>(n||x(),N.schedule(T,j,S)),v},{}),cancel:v=>{for(let k=0;k<Aa.length;k++)o[Aa[k]].cancel(v)},state:r,steps:o}}const{schedule:ee,cancel:Sn,state:ke,steps:Zo}=Vy(typeof requestAnimationFrame<"u"?requestAnimationFrame:Ct,!0);let Ja;function y1(){Ja=void 0}const _e={now:()=>(Ja===void 0&&_e.set(ke.isProcessing||nn.useManualTiming?ke.timestamp:performance.now()),Ja),set:e=>{Ja=e,queueMicrotask(y1)}},Ps=e=>Math.round(e*1e5)/1e5,Uy=e=>t=>typeof t=="string"&&t.startsWith(e),Hy=Uy("--"),v1=Uy("var(--"),au=e=>v1(e)?b1.test(e.split("/*")[0].trim()):!1,b1=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function rm(e){return typeof e!="string"?!1:e.split("/*")[0].includes("var(--")}const Ys={test:e=>typeof e=="number",parse:parseFloat,transform:e=>e},Vr={...Ys,transform:e=>Pt(0,1,e)},Ea={...Ys,default:1},iu=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function w1(e){return e==null}const x1=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,ou=(e,t)=>n=>!!(typeof n=="string"&&x1.test(n)&&n.startsWith(e)||t&&!w1(n)&&Object.prototype.hasOwnProperty.call(n,t)),qy=(e,t,n)=>s=>{if(typeof s!="string")return s;const[r,i,o,l]=s.match(iu);return{[e]:parseFloat(r),[t]:parseFloat(i),[n]:parseFloat(o),alpha:l!==void 0?parseFloat(l):1}},k1=e=>Pt(0,255,e),el={...Ys,transform:e=>Math.round(k1(e))},$n={test:ou("rgb","red"),parse:qy("red","green","blue"),transform:({red:e,green:t,blue:n,alpha:s=1})=>"rgba("+el.transform(e)+", "+el.transform(t)+", "+el.transform(n)+", "+Ps(Vr.transform(s))+")"};function j1(e){let t="",n="",s="",r="";return e.length>5?(t=e.substring(1,3),n=e.substring(3,5),s=e.substring(5,7),r=e.substring(7,9)):(t=e.substring(1,2),n=e.substring(2,3),s=e.substring(3,4),r=e.substring(4,5),t+=t,n+=n,s+=s,r+=r),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(s,16),alpha:r?parseInt(r,16)/255:1}}const gc={test:ou("#"),parse:j1,transform:$n.transform},aa=e=>({test:t=>typeof t=="string"&&t.endsWith(e)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${e}`}),Ht=aa("deg"),_t=aa("%"),L=aa("px"),S1=aa("vh"),N1=aa("vw"),am={..._t,parse:e=>_t.parse(e)/100,transform:e=>_t.transform(e*100)},ws={test:ou("hsl","hue"),parse:qy("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:n,alpha:s=1})=>"hsla("+Math.round(e)+", "+_t.transform(Ps(t))+", "+_t.transform(Ps(n))+", "+Ps(Vr.transform(s))+")"},je={test:e=>$n.test(e)||gc.test(e)||ws.test(e),parse:e=>$n.test(e)?$n.parse(e):ws.test(e)?ws.parse(e):gc.parse(e),transform:e=>typeof e=="string"?e:e.hasOwnProperty("red")?$n.transform(e):ws.transform(e),getAnimatableNone:e=>{const t=je.parse(e);return t.alpha=0,je.transform(t)}},T1=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,Yy=new RegExp(iu.source),Gy=new RegExp(T1.source,"i");function C1(e){return isNaN(e)&&typeof e=="string"&&(Yy.test(e)||Gy.test(e))}const Ky="number",Qy="color",A1="var",E1="var(",im="${}",P1=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function R1(e){const t=e.toString();return Yy.test(t)||Gy.test(t)}function Ur(e){const t=e.toString(),n=[],s={color:[],number:[],var:[]},r=[];let i=0;const l=t.replace(P1,c=>(je.test(c)?(s.color.push(i),r.push(Qy),n.push(je.parse(c))):c.startsWith(E1)?(s.var.push(i),r.push(A1),n.push(c)):(s.number.push(i),r.push(Ky),n.push(parseFloat(c))),++i,im)).split(im);return{values:n,split:l,indexes:s,types:r}}function F1(e){return Ur(e).values}function Xy({split:e,types:t}){const n=e.length;return s=>{let r="";for(let i=0;i<n;i++)if(r+=e[i],s[i]!==void 0){const o=t[i];o===Ky?r+=Ps(s[i]):o===Qy?r+=je.transform(s[i]):r+=s[i]}return r}}function D1(e){return Xy(Ur(e))}const M1=e=>typeof e=="number"?0:je.test(e)?je.getAnimatableNone(e):e,B1=(e,t)=>typeof e=="number"?t!=null&&t.trim().endsWith("/")?e:0:M1(e);function I1(e){const t=Ur(e);return Xy(t)(t.values.map((s,r)=>B1(s,t.split[r])))}const at={test:C1,parse:F1,createTransformer:D1,getAnimatableNone:I1};function tl(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function L1({hue:e,saturation:t,lightness:n,alpha:s}){e/=360,t/=100,n/=100;let r=0,i=0,o=0;if(!t)r=i=o=n;else{const l=n<.5?n*(1+t):n+t-n*t,c=2*n-l;r=tl(c,l,e+1/3),i=tl(c,l,e),o=tl(c,l,e-1/3)}return{red:Math.round(r*255),green:Math.round(i*255),blue:Math.round(o*255),alpha:s}}function Bi(e,t){return n=>n>0?t:e}const Z=(e,t,n)=>e+(t-e)*n,nl=(e,t,n)=>{const s=e*e,r=n*(t*t-s)+s;return r<0?0:Math.sqrt(r)},$1=[gc,$n,ws],_1=e=>$1.find(t=>t.test(e));function om(e){const t=_1(e);if(!t)return!1;let n=t.parse(e);return t===ws&&(n=L1(n)),n}const lm=(e,t)=>{const n=om(e),s=om(t);if(!n||!s)return Bi(e,t);const r={...n};return i=>(r.red=nl(n.red,s.red,i),r.green=nl(n.green,s.green,i),r.blue=nl(n.blue,s.blue,i),r.alpha=Z(n.alpha,s.alpha,i),$n.transform(r))},yc=new Set(["none","hidden"]);function O1(e,t){return yc.has(e)?n=>n<=0?e:t:n=>n>=1?t:e}function z1(e,t){return n=>Z(e,t,n)}function lu(e){return typeof e=="number"?z1:typeof e=="string"?au(e)?Bi:je.test(e)?lm:U1:Array.isArray(e)?Jy:typeof e=="object"?je.test(e)?lm:W1:Bi}function Jy(e,t){const n=[...e],s=n.length,r=e.map((i,o)=>lu(i)(i,t[o]));return i=>{for(let o=0;o<s;o++)n[o]=r[o](i);return n}}function W1(e,t){const n={...e,...t},s={};for(const r in n)e[r]!==void 0&&t[r]!==void 0&&(s[r]=lu(e[r])(e[r],t[r]));return r=>{for(const i in s)n[i]=s[i](r);return n}}function V1(e,t){const n=[],s={color:0,var:0,number:0};for(let r=0;r<t.values.length;r++){const i=t.types[r],o=e.indexes[i][s[i]],l=e.values[o]??0;n[r]=l,s[i]++}return n}const U1=(e,t)=>{const n=at.createTransformer(t),s=Ur(e),r=Ur(t);return s.indexes.var.length===r.indexes.var.length&&s.indexes.color.length===r.indexes.color.length&&s.indexes.number.length>=r.indexes.number.length?yc.has(e)&&!r.values.length||yc.has(t)&&!s.values.length?O1(e,t):sa(Jy(V1(s,r),r.values),n):Bi(e,t)},cm=/^(-?(?:\d+(?:\.\d*)?|\.\d+))([a-z%]*)$/iu;function H1(e,t){const n=cm.exec(e);if(!n)return;const s=cm.exec(t);if(!s||n[2]!==s[2])return;const r=n[2],i=parseFloat(n[1]),o=parseFloat(s[1]);return l=>Ps(Z(i,o,l))+r}function cu(e,t,n){if(typeof e=="number"&&typeof t=="number"&&typeof n=="number")return Z(e,t,n);if(typeof e=="string"&&typeof t=="string"){const r=H1(e,t);if(r)return r}return lu(e)(e,t)}const q1=e=>{const t=({timestamp:n})=>e(n);return{start:(n=!0)=>ee.update(t,n),stop:()=>Sn(t),now:()=>ke.isProcessing?ke.timestamp:_e.now()}},Zy=(e,t,n=10)=>{let s="";const r=Math.max(Math.round(t/n),2);for(let i=0;i<r;i++)s+=Math.round(e(i/(r-1))*1e4)/1e4+", ";return`linear(${s.substring(0,s.length-2)})`},du=2e4;function uu(e,t=50,n=du,s){let r=0,i=e.next(r);for(;!i.done&&r<n;)r+=t,i=e.next(r);return r>=n?1/0:r}function Y1(e,t=100,n){const s=n({...e,keyframes:[0,t]}),r=Math.min(uu(s),du);return{type:"keyframes",ease:i=>s.next(r*i).value/t,duration:st(r)}}const fe={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function vc(e,t){return e*Math.sqrt(1-t*t)}const G1=12;function K1(e,t,n){let s=n;for(let r=1;r<G1;r++)s=s-e(s)/t(s);return s}const sl=.001;function Q1({duration:e=fe.duration,bounce:t=fe.bounce,velocity:n=fe.velocity,mass:s=fe.mass}){let r,i,o=1-t;o=Pt(fe.minDamping,fe.maxDamping,o),e=Pt(fe.minDuration,fe.maxDuration,st(e)),o<1?(r=d=>{const u=d*o,h=u*e,m=u-n,y=vc(d,o),p=Math.exp(-h);return sl-m/y*p},i=d=>{const h=d*o*e,m=h*n+n,y=o*o*d*d*e,p=Math.exp(-h),b=vc(d*d,o);return(-r(d)+sl>0?-1:1)*((m-y)*p)/b}):(r=d=>{const u=Math.exp(-d*e),h=(d-n)*e+1;return-sl+u*h},i=d=>{const u=Math.exp(-d*e),h=(n-d)*(e*e);return u*h});const l=5/e,c=K1(r,i,l);if(e=pt(e),isNaN(c))return{stiffness:fe.stiffness,damping:fe.damping,duration:e};{const d=c*c*s;return{stiffness:d,damping:o*2*Math.sqrt(s*d),duration:e}}}const ev=["duration","bounce"],tv=["stiffness","damping","mass"];function Ii(e,t){return t.some(n=>e[n]!==void 0)}function X1(e){let t={velocity:fe.velocity,stiffness:fe.stiffness,damping:fe.damping,mass:fe.mass,isResolvedFromDuration:!1,...e};if(!Ii(e,tv)&&Ii(e,ev))if(t.velocity=0,e.visualDuration){const n=e.visualDuration,s=2*Math.PI/(n*1.2),r=s*s,i=2*Pt(.05,1,1-(e.bounce||0))*Math.sqrt(r);t={...t,mass:fe.mass,stiffness:r,damping:i}}else{const n=Q1({...e,velocity:0});t={...t,...n,mass:fe.mass},t.isResolvedFromDuration=!0}return t}function Li(e=fe.visualDuration,t=fe.bounce){const n=typeof e!="object"?{visualDuration:e,keyframes:[0,1],bounce:t}:e,s=n.keyframes[0],r=n.keyframes[n.keyframes.length-1],i={done:!1,value:s},{stiffness:o,damping:l,mass:c,duration:d,velocity:u,isResolvedFromDuration:h}=X1({...n,velocity:-st(n.velocity||0)}),m=l/(2*Math.sqrt(o*c)),y=st(Math.sqrt(o/c)),p=m*y,b={target:r,delta:r-s,velocity:u||0,restSpeed:0,restDelta:0},x=()=>{const j=Math.abs(b.delta)<5;b.restSpeed=n.restSpeed||(j?fe.restSpeed.granular:fe.restSpeed.default),b.restDelta=n.restDelta||(j?fe.restDelta.granular:fe.restDelta.default)};x();let f,g,v;if(m<1){const j=vc(y,m),S={A:0,sinC:0,cosC:0,t:-1,env:0,sin:0,cos:0};v=()=>{S.A=(b.velocity+p*b.delta)/j,S.sinC=p*S.A+b.delta*j,S.cosC=p*b.delta-S.A*j};const A=P=>{P!==S.t&&(S.t=P,S.env=Math.exp(-p*P),S.sin=Math.sin(j*P),S.cos=Math.cos(j*P))};f=P=>(A(P),b.target-S.env*(S.A*S.sin+b.delta*S.cos)),g=P=>(A(P),S.env*(S.sinC*S.sin+S.cosC*S.cos))}else if(m===1){f=S=>b.target-Math.exp(-y*S)*(b.delta+(b.velocity+y*b.delta)*S);const j={C:0};v=()=>{j.C=b.velocity+y*b.delta},g=S=>Math.exp(-y*S)*(y*j.C*S-b.velocity)}else{const j=y*Math.sqrt(m*m-1);f=A=>{const P=Math.exp(-p*A),$=Math.min(j*A,300);return b.target-P*((b.velocity+p*b.delta)*Math.sinh($)+j*b.delta*Math.cosh($))/j};const S={P:0,sinh:0,cosh:0};v=()=>{S.P=(b.velocity+p*b.delta)/j,S.sinh=p*S.P-b.delta*j,S.cosh=p*b.delta-S.P*j},g=A=>{const P=Math.exp(-p*A),$=Math.min(j*A,300);return P*(S.sinh*Math.sinh($)+S.cosh*Math.cosh($))}}v();const k=!Ii(n,tv)&&Ii(n,ev),N=h&&d||null,T={calculatedDuration:N,retarget:(j,S)=>{b.target=j[j.length-1],b.delta=b.target-j[0],b.velocity=k?0:-st(S),n.restSpeed&&n.restDelta||x(),T.calculatedDuration=N,i.done=!1,v()},velocity:j=>pt(g(j)),next:j=>{const S=f(j);if(h)i.done=j>=d;else{const A=pt(g(j));i.done=Math.abs(A)<=b.restSpeed&&Math.abs(b.target-S)<=b.restDelta}return i.value=i.done?b.target:S,i},toString:()=>{const j=Math.min(uu(T),du),S=Zy(A=>T.next(j*A).value,j,30);return j+"ms "+S},toTransition:()=>{}};return T}Li.applyToOptions=e=>{const t=Y1(e,100,Li);return e.ease=t.ease,e.duration=pt(t.duration),e.type="keyframes",e};function bc({keyframes:e,velocity:t=0,power:n=.8,timeConstant:s=325,bounceDamping:r=10,bounceStiffness:i=500,modifyTarget:o,min:l,max:c,restDelta:d=.5,restSpeed:u}){const h=e[0],m={done:!1,value:h},y=j=>j<l||j>c,p=j=>l===void 0?c:c===void 0||Math.abs(l-j)<Math.abs(c-j)?l:c;let b=n*t;const x=h+b,f=o===void 0?x:o(x);f!==x&&(b=f-h);const g=j=>-b*Math.exp(-j/s),v=j=>{const S=g(j);m.done=Math.abs(S)<=d,m.value=m.done?f:f+S};let k,N;const T=j=>{y(m.value)&&(k=j,N=Li({keyframes:[m.value,p(m.value)],velocity:-g(j)/s*1e3,damping:r,stiffness:i,restDelta:d,restSpeed:u}))};return T(0),{calculatedDuration:null,next:j=>{let S=!1;return!N&&k===void 0&&(S=!0,v(j),T(j)),k!==void 0&&j>=k?N.next(j-k):(!S&&v(j),m)}}}function J1(e,t,n){const s=[],r=n||nn.mix||cu,i=e.length-1;for(let o=0;o<i;o++){let l=r(e[o],e[o+1]);if(t){const c=Array.isArray(t)?t[o]||Ct:t;l=sa(c,l)}s.push(l)}return s}function Z1(e,t,{clamp:n=!0,ease:s,mixer:r}={}){const i=e.length;if(go(i===t.length),i===1)return()=>t[0];if(i===2&&t[0]===t[1])return()=>t[1];const o=e[0]===e[1];e[0]>e[i-1]&&(e=[...e].reverse(),t=[...t].reverse());const l=J1(t,s,r),c=l.length,d=u=>{if(o&&u<e[0])return t[0];let h=0;if(c>1)for(;h<e.length-2&&!(u<e[h+1]);h++);const m=Wr(e[h],e[h+1],u);return l[h](m)};return n?u=>d(Pt(e[0],e[i-1],u)):d}function ej(e,t){const n=e[e.length-1];for(let s=1;s<=t;s++){const r=Wr(0,t,s);e.push(Z(n,1,r))}}function tj(e){const t=[0];return ej(t,e.length-1),t}function nj(e,t){return e.map(n=>n*t)}function sj(e,t){return e.map(()=>t||zy).splice(0,e.length-1)}function xr({duration:e=300,keyframes:t,times:n,ease:s="easeInOut"}){const r=h1(s)?s.map(sm):sm(s),i={done:!1,value:t[0]};if(t.length===2&&!Array.isArray(r)&&(!n||n.length!==2||n[0]===0&&n[1]===1)){const[c,d]=t,u=c===d?void 0:(nn.mix||cu)(c,d);return{calculatedDuration:e,next:h=>(i.value=u?u(r(e>0?Pt(0,1,h/e):1)):d,i.done=h>=e,i)}}const o=nj(n&&n.length===t.length?n:tj(t),e),l=Z1(o,t,{ease:Array.isArray(r)?r:sj(t,r)});return{calculatedDuration:e,next:c=>(i.value=l(c),i.done=c>=e,i)}}const rj=5;function aj(e,t,n){const s=Math.max(t-rj,0);return Fy(n-e(s),t-s)}function ij(e,t,n=0){return t<=0?n:e.velocity?e.velocity(t):aj(s=>e.next(s).value,t,e.next(t).value)}const oj=e=>e!==null;function yo(e,{repeat:t,repeatType:n="loop"},s,r=1){const i=e.filter(oj),l=r<0||t&&n!=="loop"&&t%2===1?0:i.length-1;return!l||s===void 0?i[l]:s}const lj={decay:bc,inertia:bc,tween:xr,keyframes:xr,spring:Li};function nv(e){typeof e.type=="string"&&(e.type=lj[e.type])}function sv(e,t){return{kind:e,animation:t,timestamp:_e.now(),frameTimestamp:ke.timestamp,frameIsProcessing:ke.isProcessing}}function rv(e,t,n){const s=globalThis.__MOTION_INSPECT__;if(s)try{s({...sv("animation-start",e),options:n?{...t,...n}:t})}catch{}}function cj(e,t){const n=globalThis.__MOTION_INSPECT__;if(n)try{n({...sv("layout-animation-start",e),node:t})}catch{}}class hu{constructor(){this.isResolved=!1}get finished(){return this._finished||(this._finished=this.isResolved?Promise.resolve():new Promise(t=>{this._resolve=t})),this._finished}updateFinished(){this._finished=this._resolve=void 0,this.isResolved=!1}notifyFinished(){var t;this.isResolved=!0,(t=this._resolve)==null||t.call(this)}then(t,n){return this.finished.then(t,n)}}const dj=e=>e/100;class $i extends hu{constructor(t){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var s,r;const{motionValue:n}=this.options;n&&n.updatedAt!==_e.now()&&this.tick(_e.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(r=(s=this.options).onStop)==null||r.call(s))},this.options=t,this.initAnimation(),this.play(),t.autoplay===!1&&this.pause(),rv(this,this.options)}initAnimation(){const{options:t}=this;nv(t);const{type:n=xr,repeat:s=0,repeatDelay:r=0,repeatType:i,velocity:o=0}=t;let{keyframes:l}=t;const c=n||xr;c!==xr&&typeof l[0]!="number"&&(this.mixKeyframes=sa(dj,cu(l[0],l[1])),l=[0,100]);const d=c(l===t.keyframes?t:{...t,keyframes:l});i==="mirror"&&(this.mirroredGenerator=c({...t,keyframes:[...l].reverse(),velocity:-o})),d.calculatedDuration===null&&(d.calculatedDuration=uu(d));const{calculatedDuration:u}=d;this.calculatedDuration=u,this.resolvedDuration=u+r,this.totalDuration=this.resolvedDuration*(s+1)-r,this.generator=d}updateTime(t){const n=Math.round(t-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=n}tick(t,n=!1){const{generator:s,totalDuration:r,mixKeyframes:i,mirroredGenerator:o,resolvedDuration:l,calculatedDuration:c}=this;if(this.startTime===null)return s.next(0);const{delay:d=0,keyframes:u,repeat:h,repeatType:m,repeatDelay:y,type:p,onUpdate:b,finalKeyframe:x}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-r/this.speed,this.startTime)),n?this.currentTime=t:this.updateTime(t);const f=this.currentTime-d*(this.playbackSpeed>=0?1:-1),g=this.playbackSpeed>=0?f<0:f>r;this.currentTime=Math.max(f,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=r);let v=this.currentTime,k=s;if(h){const S=Math.min(this.currentTime,r)/l;let A=Math.floor(S),P=S%1;!P&&S>=1&&(P=1),P===1&&A--,A=Math.min(A,h+1),!!(A%2)&&(m==="reverse"?(P=1-P,y&&(P-=y/l)):m==="mirror"&&(k=o)),v=Pt(0,1,P)*l}let N;g?(this.delayState.value=u[0],N=this.delayState):N=k.next(v),i&&!g&&(N.value=i(N.value));let{done:T}=N;!g&&c!==null&&(T=this.playbackSpeed>=0?this.currentTime>=r:this.currentTime<=0);const j=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&T);return j&&p!==bc&&(N.value=yo(u,this.options,x,this.speed)),b&&b(N.value),j&&this.finish(),N}then(t,n){return this.finished.then(t,n)}get duration(){return st(this.calculatedDuration)}get iterationDuration(){const{delay:t=0}=this.options||{};return this.duration+st(t)}get time(){return st(this.currentTime)}set time(t){t=pt(t),this.currentTime=t,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=t,this.tick(t))}getGeneratorVelocity(){return ij(this.generator,this.currentTime,this.options.velocity)}get speed(){return this.playbackSpeed}set speed(t){const n=this.playbackSpeed!==t;n&&this.driver&&this.updateTime(_e.now()),this.playbackSpeed=t,n&&this.driver&&(this.time=st(this.currentTime))}play(){var r,i;if(this.isStopped)return;const{driver:t=q1,startTime:n}=this.options;this.driver||(this.driver=t(o=>this.tick(o))),(i=(r=this.options).onPlay)==null||i.call(r);const s=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=s):this.holdTime!==null?this.startTime=s-this.holdTime:this.startTime||(this.startTime=n??s),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(_e.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var t,n;this.notifyFinished(),this.teardown(),this.state="finished",(n=(t=this.options).onComplete)==null||n.call(t)}cancel(){var t,n;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(n=(t=this.options).onCancel)==null||n.call(t)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}attachTimeline(t){var n;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(n=this.driver)==null||n.stop(),t.observe(this)}}const uj=new Set(["brightness","contrast","saturate","opacity"]);function hj(e){const[t,n]=e.slice(0,-1).split("(");if(t==="drop-shadow")return e;const[s]=n.match(iu)||[];if(!s)return e;const r=n.replace(s,"");let i=uj.has(t)?1:0;return s!==n&&(i*=100),t+"("+i+r+")"}const mj=/\b([a-z-]*)\(.*?\)/gu,wc={...at,getAnimatableNone:e=>{const t=e.match(mj);return t?t.map(hj).join(" "):e}},xc={...at,getAnimatableNone:e=>{const t=at.parse(e);return at.createTransformer(e)(t.map(s=>typeof s=="number"?0:typeof s=="object"?{...s,alpha:1}:s))}},dm={...Ys,transform:Math.round},pj={rotate:Ht,pathRotation:Ht,rotateX:Ht,rotateY:Ht,rotateZ:Ht,scale:Ea,scaleX:Ea,scaleY:Ea,scaleZ:Ea,skew:Ht,skewX:Ht,skewY:Ht,distance:L,translateX:L,translateY:L,translateZ:L,x:L,y:L,z:L,perspective:L,transformPerspective:L,opacity:Vr,originX:am,originY:am,originZ:L},_i={borderWidth:L,borderTopWidth:L,borderRightWidth:L,borderBottomWidth:L,borderLeftWidth:L,borderRadius:L,borderTopLeftRadius:L,borderTopRightRadius:L,borderBottomRightRadius:L,borderBottomLeftRadius:L,width:L,maxWidth:L,height:L,maxHeight:L,top:L,right:L,bottom:L,left:L,inset:L,insetBlock:L,insetBlockStart:L,insetBlockEnd:L,insetInline:L,insetInlineStart:L,insetInlineEnd:L,padding:L,paddingTop:L,paddingRight:L,paddingBottom:L,paddingLeft:L,paddingBlock:L,paddingBlockStart:L,paddingBlockEnd:L,paddingInline:L,paddingInlineStart:L,paddingInlineEnd:L,margin:L,marginTop:L,marginRight:L,marginBottom:L,marginLeft:L,marginBlock:L,marginBlockStart:L,marginBlockEnd:L,marginInline:L,marginInlineStart:L,marginInlineEnd:L,fontSize:L,backgroundPositionX:L,backgroundPositionY:L,...pj,zIndex:dm,fillOpacity:Vr,strokeOpacity:Vr,numOctaves:dm},fj={..._i,color:je,backgroundColor:je,outlineColor:je,fill:je,stroke:je,borderColor:je,borderTopColor:je,borderRightColor:je,borderBottomColor:je,borderLeftColor:je,filter:wc,WebkitFilter:wc,mask:xc,WebkitMask:xc},av=e=>fj[e],gj=new Set([wc,xc]);function mu(e,t){let n=av(e);return gj.has(n)||(n=at),n.getAnimatableNone?n.getAnimatableNone(t):void 0}function yj(e){for(let t=1;t<e.length;t++)e[t]??(e[t]=e[t-1])}const _n=e=>e*180/Math.PI,kc=e=>{const t=_n(Math.atan2(e[1],e[0]));return jc(t)},vj={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:e=>(Math.abs(e[0])+Math.abs(e[3]))/2,rotate:kc,rotateZ:kc,skewX:e=>_n(Math.atan(e[1])),skewY:e=>_n(Math.atan(e[2])),skew:e=>(Math.abs(e[1])+Math.abs(e[2]))/2},jc=e=>(e=e%360,e<0&&(e+=360),e),um=kc,hm=e=>Math.sqrt(e[0]*e[0]+e[1]*e[1]),mm=e=>Math.sqrt(e[4]*e[4]+e[5]*e[5]),bj={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:hm,scaleY:mm,scale:e=>(hm(e)+mm(e))/2,rotateX:e=>jc(_n(Math.atan2(e[6],e[5]))),rotateY:e=>jc(_n(Math.atan2(-e[2],e[0]))),rotateZ:um,rotate:um,skewX:e=>_n(Math.atan(e[4])),skewY:e=>_n(Math.atan(e[1])),skew:e=>(Math.abs(e[1])+Math.abs(e[4]))/2};function Sc(e){return e.includes("scale")?1:0}function Nc(e,t){if(!e||e==="none")return Sc(t);const n=e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let s,r;if(n)s=bj,r=n;else{const l=e.match(/^matrix\(([-\d.e\s,]+)\)$/u);s=vj,r=l}if(!r)return Sc(t);const i=s[t],o=r[1].split(",").map(xj);return typeof i=="function"?i(o):o[i]}const wj=(e,t)=>{const{transform:n="none"}=getComputedStyle(e);return Nc(n,t)};function xj(e){return parseFloat(e.trim())}const Gs=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Ks=new Set([...Gs,"pathRotation"]),pm=e=>e===Ys||e===L,kj=new Set(["x","y","z"]),jj=Gs.filter(e=>!kj.has(e));function Sj(e){const t=[];return jj.forEach(n=>{const s=e.getValue(n);if(s!==void 0){const r=s.get(),i=n.startsWith("scale")?1:0;if(r===i)return;t.push([n,r]),s.set(i)}}),t}const Nj=new Set(["bottom","right"]);function fm(e,t,n,s,r,i){const o=parseFloat(e);if(!isNaN(o))return o;const{min:l,max:c}=t()[n],d=c-l;return i==="border-box"?d:d-parseFloat(s)-parseFloat(r)}const Wn={width:({width:e,paddingLeft:t="0",paddingRight:n="0",boxSizing:s},r)=>fm(e,r,"x",t,n,s),height:({height:e,paddingTop:t="0",paddingBottom:n="0",boxSizing:s},r)=>fm(e,r,"y",t,n,s),top:({top:e})=>parseFloat(e),left:({left:e})=>parseFloat(e),bottom:({top:e},t)=>{const{y:n}=t();return parseFloat(e)+(n.max-n.min)},right:({left:e},t)=>{const{x:n}=t();return parseFloat(e)+(n.max-n.min)},x:({transform:e})=>Nc(e,"x"),y:({transform:e})=>Nc(e,"y")};Wn.translateX=Wn.x;Wn.translateY=Wn.y;const Vn=new Set;let Tc=!1,Cc=!1,Ac=!1;function iv(){if(Cc){const e=[],t=new Set,n=new Set;Vn.forEach(r=>{r.needsMeasurement&&(e.push(r),t.add(r.element),Nj.has(r.name)&&n.add(r.element))});const s=new Map;n.forEach(r=>{const i=Sj(r);i.length&&(s.set(r,i),r.render())}),e.forEach(r=>r.measureInitialState()),t.forEach(r=>{r.render();const i=s.get(r);i&&i.forEach(([o,l])=>{var c;(c=r.getValue(o))==null||c.set(l)})}),e.forEach(r=>r.measureEndState()),e.forEach(r=>{r.suspendedScrollY!==void 0&&window.scrollTo(0,r.suspendedScrollY)})}Cc=!1,Tc=!1,Vn.forEach(e=>e.complete(Ac)),Vn.clear()}function ov(){Vn.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(Cc=!0)})}function Tj(){Ac=!0,ov(),iv(),Ac=!1}function Cj(e,t,n){if(typeof e=="string"){if(tu(e)||nu(e))return parseFloat(e);if(!at.test(e)&&at.test(n))return mu(t,n)}return e??void 0}class pu{constructor(t,n,s,r,i,o=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...t],this.onComplete=n,this.name=s,this.motionValue=r,this.element=i,this.isAsync=o}scheduleResolve(){this.state="scheduled",this.isAsync?(Vn.add(this),Tc||(Tc=!0,ee.read(ov),ee.resolveKeyframes(iv))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:t,name:n,element:s,motionValue:r}=this;if(t[0]===null){const i=r==null?void 0:r.get(),o=t[t.length-1];if(i!==void 0)t[0]=i;else if(s&&n){const l=Cj(s.readValue(n,o),n,o);l!==void 0&&(t[0]=l)}t[0]===void 0&&(t[0]=o),r&&i===void 0&&r.set(t[0])}yj(t)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(t=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,t),Vn.delete(this)}cancel(){this.state==="scheduled"&&(Vn.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const Aj=e=>e.startsWith("--");function lv(e,t,n){Aj(t)?e.style.setProperty(t,n):e.style[t]=n}const Ej={};function cv(e,t){const n=Ry(e);return()=>Ej[t]??n()}const Pj=cv(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),dv=cv(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),dr=([e,t,n,s])=>`cubic-bezier(${e}, ${t}, ${n}, ${s})`,gm={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:dr([0,.65,.55,1]),circOut:dr([.55,0,1,.45]),backIn:dr([.31,.01,.66,-.59]),backOut:dr([.33,1.53,.69,.99])};function uv(e,t){if(e)return typeof e=="function"?dv()?Zy(e,t):"ease-out":Wy(e)?dr(e):Array.isArray(e)?e.map(n=>uv(n,t)||gm.easeOut):gm[e]}function Rj(e,t,n,{delay:s=0,duration:r=300,repeat:i=0,repeatType:o="loop",ease:l="easeOut",times:c}={},d=void 0){const u={[t]:n};c&&(u.offset=c);const h=uv(l,r);Array.isArray(h)&&(u.easing=h);const m={delay:s,duration:r,easing:Array.isArray(h)?"linear":h,fill:"both",iterations:i+1,direction:o==="reverse"?"alternate":"normal"};return d&&(m.pseudoElement=d),e.animate(u,m)}function hv(e){return typeof e=="function"&&"applyToOptions"in e}function Fj({type:e,...t}){return hv(e)&&dv()?e.applyToOptions(t):(t.duration??(t.duration=300),t.ease??(t.ease="easeOut"),t)}class mv extends hu{constructor(t){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!t)return;const{element:n,name:s,keyframes:r,pseudoElement:i,allowFlatten:o=!1,finalKeyframe:l,onComplete:c}=t;this.isPseudoElement=!!i,this.allowFlatten=o,this.options=t,go(typeof t.type!="string");const d=Fj(t);this.animation=Rj(n,s,r,d,i),d.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!i){const u=yo(r,this.options,l,this.speed);this.updateMotionValue&&this.updateMotionValue(u),lv(n,s,u),this.animation.cancel()}c==null||c(),this.notifyFinished()},rv(this,t,d)}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var t,n;(n=(t=this.animation).finish)==null||n.call(t)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:t}=this;t==="idle"||t==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var n,s,r;const t=(n=this.options)==null?void 0:n.element;!this.isPseudoElement&&(t!=null&&t.isConnected)&&((r=(s=this.animation).commitStyles)==null||r.call(s))}get duration(){var n,s;const t=((s=(n=this.animation.effect)==null?void 0:n.getComputedTiming)==null?void 0:s.call(n).duration)||0;return st(Number(t))}get iterationDuration(){const{delay:t=0}=this.options||{};return this.duration+st(t)}get time(){return st(Number(this.animation.currentTime)||0)}set time(t){const n=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=pt(t),n&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(t){t<0&&(this.finishedTime=null),this.animation.playbackRate=t}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(t){this.manualStartTime=this.animation.startTime=t}attachTimeline({timeline:t,rangeStart:n,rangeEnd:s,observe:r}){var i;return this.allowFlatten&&((i=this.animation.effect)==null||i.updateTiming({easing:"linear"})),this.animation.onfinish=null,t&&Pj()?(this.animation.timeline=t,n&&(this.animation.rangeStart=n),s&&(this.animation.rangeEnd=s),Ct):r(this)}}const pv={anticipate:$y,backInOut:Ly,circInOut:Oy};function Dj(e){return e in pv}function Mj(e){typeof e.ease=="string"&&Dj(e.ease)&&(e.ease=pv[e.ease])}const rl=10;class Bj extends mv{constructor(t){Mj(t),nv(t),super(t),t.startTime!==void 0&&t.autoplay!==!1&&(this.startTime=t.startTime),this.options=t}updateMotionValue(t){const{motionValue:n,onUpdate:s,onComplete:r,element:i,...o}=this.options;if(!n)return;if(t!==void 0){n.set(t);return}const l=new $i({...o,autoplay:!1}),c=Math.max(rl,_e.now()-this.startTime),d=Pt(0,rl,c-rl),u=l.sample(c).value,{name:h}=this.options;i&&h&&lv(i,h,u),n.setWithVelocity(l.sample(Math.max(0,c-d)).value,u,d),l.stop()}}const ym=(e,t)=>t==="zIndex"?!1:!!(typeof e=="number"||Array.isArray(e)||typeof e=="string"&&(at.test(e)||e==="0")&&!e.startsWith("url("));function Ij(e){const t=e[0];if(e.length===1)return!0;for(let n=0;n<e.length;n++)if(e[n]!==t)return!0}function Lj(e,t,n,s){const r=e[0];if(r===null)return!1;if(t==="display"||t==="visibility")return!0;const i=e[e.length-1],o=ym(r,t),l=ym(i,t);return!o||!l?!1:Ij(e)||(n==="spring"||hv(n))&&s}function Ec(e){e.duration=0,e.type="keyframes"}const Pc=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),$j=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function _j(e){for(let t=0;t<e.length;t++)if(typeof e[t]=="string"&&$j.test(e[t]))return!0;return!1}const vm=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),Oj=Ry(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function zj(e){var h;const{motionValue:t,name:n,repeatDelay:s,repeatType:r,damping:i,type:o,keyframes:l}=e;if(!n||!(Pc.has(n)||vm.has(n)))return!1;const c=(h=t==null?void 0:t.owner)==null?void 0:h.current;if(!(c instanceof HTMLElement)&&!(c instanceof SVGElement))return!1;const{onUpdate:d,transformTemplate:u}=t.owner.getProps();return Oj()&&(Pc.has(n)||vm.has(n)&&_j(l))&&(n!=="transform"||!u)&&!d&&!s&&r!=="mirror"&&i!==0&&o!=="inertia"}const Wj=40;class Vj extends hu{constructor(t){var c;super(),this.stop=()=>{var d,u;this._animation&&(this._animation.stop(),(d=this.stopTimeline)==null||d.call(this)),(u=this.keyframeResolver)==null||u.cancel()},this.createdAt=_e.now();const{keyframes:n,name:s,motionValue:r,element:i}=t,o=t;o.autoplay??(o.autoplay=!0),o.delay??(o.delay=0),o.type??(o.type="keyframes"),o.repeat??(o.repeat=0),o.repeatDelay??(o.repeatDelay=0),o.repeatType??(o.repeatType="loop");const l=(i==null?void 0:i.KeyframeResolver)||pu;this.keyframeResolver=new l(n,(d,u,h)=>this.onKeyframesResolved(d,u,o,!h),s,r,i),(c=this.keyframeResolver)==null||c.scheduleResolve()}onKeyframesResolved(t,n,s,r){var x,f;this.keyframeResolver=void 0;const{name:i,type:o,velocity:l,delay:c,isHandoff:d,onUpdate:u}=s;this.resolvedAt=_e.now();let h=!0;Lj(t,i,o,l)||(h=!1,(nn.instantAnimations||!c)&&(u==null||u(yo(t,s,n))),t[0]=t[t.length-1],Ec(s),s.repeat=0);const m=r?this.resolvedAt?this.resolvedAt-this.createdAt>Wj?this.resolvedAt:this.createdAt:this.createdAt:void 0,{onComplete:y}=s;s.startTime??(s.startTime=m),s.finalKeyframe=n,s.keyframes=t,s.onComplete=()=>{y==null||y(),this.notifyFinished()};const p=h&&!d&&zj(s);let b;if(p){s.element=(f=(x=s.motionValue)==null?void 0:x.owner)==null?void 0:f.current;try{b=new Bj(s)}catch{b=new $i(s)}}else b=new $i(s);this.pendingTimeline&&(this.stopTimeline=b.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=b}get finished(){return this._animation?this._animation.finished:super.finished}then(t,n){return this.finished.finally(t).then(()=>{})}get animation(){var t;return this._animation||((t=this.keyframeResolver)==null||t.resume(),Tj()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(t){this.animation.time=t}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(t){this.animation.speed=t}get startTime(){return this.animation.startTime}attachTimeline(t){return this._animation?this.stopTimeline=this.animation.attachTimeline(t):this.pendingTimeline=t,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var t;this._animation&&this.animation.cancel(),(t=this.keyframeResolver)==null||t.cancel()}}function fv(e,t,n,s=0,r=1){const i=Array.from(e).sort((d,u)=>d.sortNodePosition(u)).indexOf(t),o=e.size,l=(o-1)*s;return typeof n=="function"?n(i,o):r===1?i*s:l-i*s}const bm=30,Uj=e=>!isNaN(parseFloat(e));class Hj{constructor(t,n={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=s=>{const r=_e.now();if(this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(s),this.current!==this.prev&&(this.notifyChange(),this.dependents))for(const i of this.dependents)i.dirty()},this.hasAnimated=!1,this.setCurrent(t),this.owner=n.owner}setCurrent(t){this.current=t,this.updatedAt=_e.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=Uj(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,n){var s;return t==="change"?this.onChangeSubscribe(n):((s=this.events)[t]||(s[t]=new Mi)).add(n)}onChangeSubscribe(t){const{events:n}=this;return!n.change&&!this.changeSubscriber?this.changeSubscriber=t:(n.change||(n.change=new Mi,n.change.add(this.changeSubscriber),this.changeSubscriber=void 0),n.change.add(t)),()=>{var s;this.changeSubscriber===t?this.changeSubscriber=void 0:(s=n.change)==null||s.remove(t),this.stopIfUnobserved()}}stopIfUnobserved(){ee.read(()=>{var t;!this.changeSubscriber&&!((t=this.events.change)!=null&&t.getSize())&&this.stop()})}clearListeners(){this.changeSubscriber=void 0;for(const t in this.events)this.events[t].clear()}attach(t,n){this.passiveEffect=t,this.stopPassiveEffect=n}set(t){this.passiveEffect?this.passiveEffect(t,this.updateAndNotify):this.updateAndNotify(t)}setWithVelocity(t,n,s){this.set(n),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-s}jump(t,n=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,n&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.notifyChange()}notifyChange(){var s;const{current:t,changeSubscriber:n}=this;n?n(t):(s=this.events.change)==null||s.notify(t)}addDependent(t){this.dependents||(this.dependents=new Set),this.dependents.add(t)}removeDependent(t){this.dependents&&this.dependents.delete(t)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const t=_e.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>bm)return 0;const n=Math.min(this.updatedAt-this.prevUpdatedAt,bm);return Fy(parseFloat(this.current)-parseFloat(this.prevFrameValue),n)}start(t){return this.stop(),new Promise(n=>{var i;this.hasAnimated=!0;let s=!1,r;r=t(()=>{var o;s=!0,(o=this.events.animationComplete)==null||o.notify(),this.animation===r&&this.clearAnimation(),n()}),s||(this.animation=r),(i=this.events.animationStart)==null||i.notify()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){this.animation=void 0}destroy(){var t,n;(t=this.dependents)==null||t.clear(),(n=this.events.destroy)==null||n.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Os(e,t){return new Hj(e,t)}function gv(e,t){if(e!=null&&e.inherit&&t){const{inherit:n,...s}=e;return{...t,...s}}return e}function fu(e,t){const n=(e==null?void 0:e[t])??(e==null?void 0:e.default)??e;return n!==e?gv(n,e):n}const qj={type:"spring",stiffness:500,damping:25,restSpeed:10},Yj=e=>({type:"spring",stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),Gj={type:"keyframes",duration:.8},Kj={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},Qj=(e,{keyframes:t})=>t.length>2?Gj:Ks.has(e)?e.startsWith("scale")?Yj(t[1]):qj:Kj,Xj=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function Jj(e){for(const t in e)if(!Xj.has(t))return!0;return!1}const gu=(e,t,n,s={},r,i)=>o=>{const l=fu(s,e)||{},c=l.delay||s.delay||0;let{elapsed:d=0}=s;d=d-pt(c);const u={keyframes:Array.isArray(n)?n:[null,n],ease:"easeOut",velocity:t.getVelocity(),...l,delay:-d,onUpdate:m=>{t.set(m),l.onUpdate&&l.onUpdate(m)},onComplete:()=>{o(),l.onComplete&&l.onComplete()},name:e,motionValue:t,element:i?void 0:r};Jj(l)||Object.assign(u,Qj(e,u)),u.duration&&(u.duration=pt(u.duration)),u.repeatDelay&&(u.repeatDelay=pt(u.repeatDelay)),u.from!==void 0&&(u.keyframes[0]=u.from);let h=!1;if((u.type===!1||u.duration===0&&!u.repeatDelay)&&(Ec(u),u.delay===0&&(h=!0)),(nn.instantAnimations||nn.skipAnimations||r!=null&&r.shouldSkipAnimations||l.skipAnimations)&&(h=!0,Ec(u),u.delay=0),u.allowFlatten=!l.type&&!l.ease,h&&!i&&t.get()!==void 0){const m=yo(u.keyframes,l);if(m!==void 0){ee.update(()=>{u.onUpdate(m),u.onComplete()});return}}return l.isSync?new $i(u):new Vj(u)},Zj=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function eS(e){const t=Zj.exec(e);if(!t)return[,];const[,n,s,r]=t;return[`--${n??s}`,r]}function yv(e,t,n=1){const[s,r]=eS(e);if(!s)return;const i=window.getComputedStyle(t).getPropertyValue(s);if(i){const o=i.trim();return tu(o)?parseFloat(o):o}return au(r)?yv(r,t,n+1):r}function wm(e){const t=[{},{}];return e==null||e.values.forEach((n,s)=>{t[0][s]=n.get(),t[1][s]=n.getVelocity()}),t}function yu(e,t,n,s){if(typeof t=="function"){const[r,i]=wm(s);t=t(n!==void 0?n:e.custom,r,i)}if(typeof t=="string"&&(t=e.variants&&e.variants[t]),typeof t=="function"){const[r,i]=wm(s);t=t(n!==void 0?n:e.custom,r,i)}return t}function Un(e,t,n){const s=e.getProps();return yu(s,t,n!==void 0?n:s.custom,e)}const vv=new Set(["width","height","top","left","right","bottom",...Gs]),Rc=e=>Array.isArray(e);function tS(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,Os(n))}function nS(e){return Rc(e)?e[e.length-1]||0:e}function sS(e,t){const n=Un(e,t);let{transitionEnd:s={},transition:r={},...i}=n||{};i={...i,...s};for(const o in i){const l=nS(i[o]);tS(e,o,l)}}const Re=e=>!!(e&&e.getVelocity);function rS(e){return!!(Re(e)&&e.add)}function Fc(e,t){const n=e.getValue("willChange");if(rS(n))return n.add(t);if(!n&&nn.WillChange){const s=new nn.WillChange("auto");e.addValue("willChange",s),s.add(t)}}function vu(e){return e.replace(/([A-Z])/g,t=>`-${t.toLowerCase()}`)}const aS="framerAppearId",bv="data-"+vu(aS);function wv(e){return e.props[bv]}const iS=typeof window<"u";function oS({protectedKeys:e,needsAnimating:t},n){const s=e.hasOwnProperty(n)&&t[n]!==!0;return t[n]=!1,s}function xv(e,t,{delay:n=0,transitionOverride:s,type:r}={}){let{transition:i,transitionEnd:o,...l}=t;const c=e.getDefaultTransition();i=i?gv(i,c):c;const d=i==null?void 0:i.reduceMotion,u=i==null?void 0:i.skipAnimations;s&&(i=s);const h=[],m=r&&e.animationState&&e.animationState.getState()[r],y=i==null?void 0:i.path;y&&y.animateVisualElement(e,l,i,n,h);for(const p in l){const b=e.getValue(p,e.latestValues[p]??null),x=l[p];if(x===void 0||m&&oS(m,p))continue;const f={delay:n,...fu(i||{},p)};u&&(f.skipAnimations=!0);const g=b.get();if(g!==void 0&&!b.isAnimating()&&!Array.isArray(x)&&x===g&&!f.velocity){ee.update(()=>b.set(x));continue}let v=!1;if(iS&&window.MotionHandoffAnimation){const T=wv(e);if(T){const j=window.MotionHandoffAnimation(T,p,ee);j!==null&&(f.startTime=j,v=!0)}}Fc(e,p);const k=d??e.shouldReduceMotion;b.start(gu(p,b,x,k&&vv.has(p)?{type:!1}:f,e,v));const N=b.animation;N&&h.push(N)}if(o){const p=()=>ee.update(()=>{o&&sS(e,o)});h.length?Promise.all(h).then(p):p()}return h}function Dc(e,t,n={}){var c;const s=Un(e,t,n.type==="exit"?(c=e.presenceContext)==null?void 0:c.custom:void 0);let{transition:r=e.getDefaultTransition()||{}}=s||{};n.transitionOverride&&(r=n.transitionOverride);const i=s?()=>Promise.all(xv(e,s,n)):()=>Promise.resolve(),o=e.variantChildren&&e.variantChildren.size?(d=0)=>{const{delayChildren:u=0,staggerChildren:h,staggerDirection:m}=r;return lS(e,t,d,u,h,m,n)}:()=>Promise.resolve(),{when:l}=r;if(l){const[d,u]=l==="beforeChildren"?[i,o]:[o,i];return d().then(()=>u())}else return Promise.all([i(),o(n.delay)])}function lS(e,t,n=0,s=0,r=0,i=1,o){const l=[];for(const c of e.variantChildren)c.notify("AnimationStart",t),l.push(Dc(c,t,{...o,delay:n+(typeof s=="function"?0:s)+fv(e.variantChildren,c,s,r,i)}).then(()=>c.notify("AnimationComplete",t)));return Promise.all(l)}function cS(e,t,n={}){e.notify("AnimationStart",t);let s;if(Array.isArray(t)){const r=t.map(i=>Dc(e,i,n));s=Promise.all(r)}else if(typeof t=="string")s=Dc(e,t,n);else{const r=typeof t=="function"?Un(e,t,n.custom):t;s=Promise.all(xv(e,r,n))}return s.then(()=>{e.notify("AnimationComplete",t)})}const dS={test:e=>e==="auto",parse:e=>e},uS=e=>t=>t.test(e),hS=[Ys,L,_t,Ht,N1,S1,dS],xm=e=>hS.find(uS(e));function mS(e){return typeof e=="number"?e===0:e!==null?e==="none"||e==="0"||nu(e):!0}const pS=new Set(["auto","none","0"]);function fS(e,t,n){let s=0,r;for(;s<e.length&&!r;){const i=e[s];typeof i=="string"&&!pS.has(i)&&R1(i)&&(r=e[s]),s++}if(r&&n)for(const i of t)e[i]!==r&&(e[i]=mu(n,r))}class gS extends pu{constructor(t,n,s,r,i){super(t,n,s,r,i,!0)}readKeyframes(){const{unresolvedKeyframes:t,element:n,name:s}=this;if(!n||!n.current)return;super.readKeyframes();for(let u=0;u<t.length;u++){let h=t[u];if(typeof h=="string"&&(h=h.trim(),au(h))){const m=yv(h,n.current);m!==void 0&&(t[u]=m),u===t.length-1&&(this.finalKeyframe=h)}}if(this.resolveNoneKeyframes(),!vv.has(s)||t.length!==2)return;const[r,i]=t;if(typeof r=="number"&&typeof i=="number")return;const o=xm(r),l=xm(i),c=rm(r),d=rm(i);if(c!==d&&Wn[s]){this.needsMeasurement=!0;return}if(o!==l)if(pm(o)&&pm(l))for(let u=0;u<t.length;u++){const h=t[u];typeof h=="string"&&(t[u]=parseFloat(h))}else Wn[s]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:t,name:n}=this,s=[];for(let r=0;r<t.length;r++)(t[r]===null||mS(t[r]))&&s.push(r);s.length&&fS(t,s,n)}measure(){const{element:t,name:n}=this;return Wn[n](window.getComputedStyle(t.current),()=>t.measureViewportBox())}measureInitialState(){var i;const{element:t,unresolvedKeyframes:n,name:s}=this;if(!t||!t.current)return;s==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=this.measure(),n[0]=this.measuredOrigin;const r=n[n.length-1];r!==void 0&&((i=this.motionValue)==null||i.jump(r,!1))}measureEndState(){var i,o;const{element:t,unresolvedKeyframes:n}=this;if(!t||!t.current)return;(i=this.motionValue)==null||i.jump(this.measuredOrigin,!1);const s=n.length-1,r=n[s];n[s]=this.measure(),r!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=r),(o=this.removedTransforms)!=null&&o.length&&this.removedTransforms.forEach(([l,c])=>{t.getValue(l).set(c)}),this.resolveNoneKeyframes()}}const bu=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function Za(e){return Py(e)&&"offsetHeight"in e&&!("ownerSVGElement"in e)}function wu(e){return Py(e)&&"ownerSVGElement"in e}const Mc=(e,t)=>t&&typeof e=="number"?t.transform(e):e;function kv(e,t,n){if(e==null)return[];if(e instanceof EventTarget)return[e];if(typeof e=="string"){let s=document;const r=(n==null?void 0:n[e])??s.querySelectorAll(e);return r?Array.from(r):[]}return Array.from(e).filter(s=>s!=null)}const yS={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},vS=Gs.length;function bS(e,t,n){let s="",r=!0;for(let o=0;o<vS;o++){const l=Gs[o],c=e[l];if(c===void 0)continue;let d=!0;if(typeof c=="number")d=c===(l.startsWith("scale")?1:0);else{const u=parseFloat(c);d=l.startsWith("scale")?u===1:u===0}if(!d||n){const u=Mc(c,_i[l]);if(!d){r=!1;const h=yS[l]||l;s+=`${h}(${u}) `}n&&(t[l]=u)}}const i=e.pathRotation;return i&&(r=!1,s+=`rotate(${Mc(i,_i.pathRotation)}) `),s=s.trim(),n?s=n(t,r?"":s):r&&(s="none"),s}function xu(e,t,n){const{style:s,vars:r,transformOrigin:i}=e;let o=!1,l=!1;for(const c in t){const d=t[c];if(Ks.has(c)){o=!0;continue}else if(Hy(c)){r[c]=d;continue}else{const u=Mc(d,_i[c]);c.startsWith("origin")?(l=!0,i[c]=u):s[c]=u}}if(t.transform||(o||n?s.transform=bS(t,e.transform,n):s.transform&&(s.transform="none")),l){const{originX:c="50%",originY:d="50%",originZ:u=0}=i;s.transformOrigin=`${c} ${d} ${u}`}}const wS={offset:"stroke-dashoffset",array:"stroke-dasharray"},xS={offset:"strokeDashoffset",array:"strokeDasharray"};function kS(e,t,n=1,s=0,r=!0){e.pathLength=1;const i=r?wS:xS;e[i.offset]=`${-s}`,e[i.array]=`${t} ${n}`}const jv=["transform","opacity","offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function Sv(e,{attrX:t,attrY:n,attrScale:s,pathLength:r,pathSpacing:i=1,pathOffset:o=0,...l},c,d,u){if(xu(e,l,d),c){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};const{attrs:h,style:m}=e;for(const y of jv)h[y]!==void 0&&(m[y]=h[y],delete h[y]);(m.transform||h.transformOrigin)&&(m.transformOrigin=h.transformOrigin??"50% 50%",delete h.transformOrigin),m.transform&&(m.transformBox=(u==null?void 0:u.transformBox)??"fill-box",delete h.transformBox),t!==void 0&&(h.x=t),n!==void 0&&(h.y=n),s!==void 0&&(h.scale=s),r!==void 0&&kS(h,r,i,o,!1)}function Nv({top:e,left:t,right:n,bottom:s}){return{x:{min:t,max:n},y:{min:e,max:s}}}function jS({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}function SS(e,t){if(!t)return e;const n=t({x:e.left,y:e.top}),s=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:s.y,right:s.x}}function al(e){return e===void 0||e===1}function Bc({scale:e,scaleX:t,scaleY:n}){return!al(e)||!al(t)||!al(n)}function Mn(e){return Bc(e)||Tv(e)||e.z||e.rotate||e.rotateX||e.rotateY||e.skewX||e.skewY}function Tv(e){return km(e.x)||km(e.y)}function km(e){return e&&e!=="0%"}function Oi(e,t,n){const s=e-n,r=t*s;return n+r}function jm(e,t,n,s,r){return r!==void 0&&(e=Oi(e,r,s)),Oi(e,n,s)+t}function Ic(e,t=0,n=1,s,r){e.min=jm(e.min,t,n,s,r),e.max=jm(e.max,t,n,s,r)}function Cv(e,{x:t,y:n}){Ic(e.x,t.translate,t.scale,t.originPoint),Ic(e.y,n.translate,n.scale,n.originPoint)}const Sm=.999999999999,Nm=1.0000000000001;function NS(e,t,n,s=!1){var l;const r=n.length;if(!r)return;t.x=t.y=1;let i,o;for(let c=0;c<r;c++){i=n[c],o=i.projectionDelta;const{visualElement:d}=i.options;d&&d.props.style&&d.props.style.display==="contents"||(s&&i.options.layoutScroll&&i.scroll&&i!==i.root&&(Bt(e.x,-i.scroll.offset.x),Bt(e.y,-i.scroll.offset.y)),o&&(t.x*=o.x.scale,t.y*=o.y.scale,Cv(e,o)),s&&Mn(i.latestValues)&&ei(e,i.latestValues,(l=i.layout)==null?void 0:l.layoutBox))}t.x<Nm&&t.x>Sm&&(t.x=1),t.y<Nm&&t.y>Sm&&(t.y=1)}function Bt(e,t){e.min+=t,e.max+=t}function Tm(e,t,n,s,r=.5){const i=Z(e.min,e.max,r);Ic(e,t,n,i,s)}function Cm(e,t){return typeof e=="string"?parseFloat(e)/100*(t.max-t.min):e}function ei(e,t,n){const s=n??e;Tm(e.x,Cm(t.x,s.x),t.scaleX,t.scale,t.originX),Tm(e.y,Cm(t.y,s.y),t.scaleY,t.scale,t.originY)}function Av(e,t){return Nv(SS(e.getBoundingClientRect(),t))}function TS(e,t,n){const s=Av(e,n),{scroll:r}=t;return r&&(Bt(s.x,r.offset.x),Bt(s.y,r.offset.y)),s}const{schedule:ku}=Vy(queueMicrotask,!1),wt={x:!1,y:!1};function Ev(){return wt.x||wt.y}function CS(e){return e==="x"||e==="y"?wt[e]?null:(wt[e]=!0,()=>{wt[e]=!1}):wt.x||wt.y?null:(wt.x=wt.y=!0,()=>{wt.x=wt.y=!1})}function Pv(e,t){const n=kv(e),s=new AbortController,r={passive:!0,...t,signal:s.signal};return[n,r,()=>s.abort()]}function AS(e){return!(e.pointerType==="touch"||Ev())}function ES(e,t,n={}){const[s,r,i]=Pv(e,n);return s.forEach(o=>{let l=!1,c=!1,d;const u=()=>{o.removeEventListener("pointerleave",p)},h=x=>{d&&(d(x),d=void 0),u()},m=x=>{l=!1,window.removeEventListener("pointerup",m),window.removeEventListener("pointercancel",m),c&&(c=!1,h(x))},y=()=>{l=!0,window.addEventListener("pointerup",m,r),window.addEventListener("pointercancel",m,r)},p=x=>{if(x.pointerType!=="touch"){if(l){c=!0;return}h(x)}},b=x=>{if(!AS(x))return;c=!1;const f=t(o,x);typeof f=="function"&&(d=f,o.addEventListener("pointerleave",p,r))};o.addEventListener("pointerenter",b,r),o.addEventListener("pointerdown",y,r)}),i}const Rv=(e,t)=>t?e===t?!0:Rv(e,t.parentElement):!1,ju=e=>e.pointerType==="mouse"?typeof e.button!="number"||e.button<=0:e.isPrimary!==!1,PS=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function RS(e){return PS.has(e.tagName)||e.isContentEditable===!0}const FS=new Set(["INPUT","SELECT","TEXTAREA"]);function DS(e){return FS.has(e.tagName)||e.isContentEditable===!0}const ti=new WeakSet;function Am(e){return t=>{t.key==="Enter"&&e(t)}}function il(e,t){e.dispatchEvent(new PointerEvent("pointer"+t,{isPrimary:!0,bubbles:!0}))}const MS=(e,t)=>{const n=e.currentTarget;if(!n)return;const s=Am(()=>{if(ti.has(n))return;il(n,"down");const r=Am(()=>{il(n,"up")}),i=()=>il(n,"cancel");n.addEventListener("keyup",r,t),n.addEventListener("blur",i,t)});n.addEventListener("keydown",s,t),n.addEventListener("blur",()=>n.removeEventListener("keydown",s),t)};function Em(e){return ju(e)&&!Ev()}const Pm=new WeakSet;function BS(e,t,n={}){const[s,r,i]=Pv(e,n),o=l=>{const c=l.currentTarget;if(!Em(l)||Pm.has(l))return;ti.add(c),n.stopPropagation&&Pm.add(l);const d=t(c,l),u={...r,capture:!0},h=(p,b)=>{window.removeEventListener("pointerup",m,u),window.removeEventListener("pointercancel",y,u),ti.has(c)&&ti.delete(c),Em(p)&&typeof d=="function"&&d(p,{success:b})},m=p=>{h(p,c===window||c===document||n.useGlobalTarget||Rv(c,p.target))},y=p=>{h(p,!1)};window.addEventListener("pointerup",m,u),window.addEventListener("pointercancel",y,u)};return s.forEach(l=>{(n.useGlobalTarget?window:l).addEventListener("pointerdown",o,r),Za(l)&&(l.addEventListener("focus",d=>MS(d,r)),!RS(l)&&!l.hasAttribute("tabindex")&&(l.tabIndex=0))}),i}const ni=new WeakMap;let on;const Fv=(e,t,n)=>(s,r)=>r&&r[0]?r[0][e+"Size"]:wu(s)&&"getBBox"in s?s.getBBox()[t]:s[n],IS=Fv("inline","width","offsetWidth"),LS=Fv("block","height","offsetHeight");function $S({target:e,borderBoxSize:t}){var n;(n=ni.get(e))==null||n.forEach(s=>{s(e,{get width(){return IS(e,t)},get height(){return LS(e,t)}})})}function _S(e){e.forEach($S)}function OS(){typeof ResizeObserver>"u"||(on=new ResizeObserver(_S))}function zS(e,t){on||OS();const n=kv(e);return n.forEach(s=>{let r=ni.get(s);r||(r=new Set,ni.set(s,r)),r.add(t),on==null||on.observe(s)}),()=>{n.forEach(s=>{const r=ni.get(s);r==null||r.delete(t),r!=null&&r.size||on==null||on.unobserve(s)})}}const si=new Set;let xs;function WS(){xs=()=>{const e={get width(){return window.innerWidth},get height(){return window.innerHeight}};si.forEach(t=>t(e))},window.addEventListener("resize",xs)}function VS(e){return si.add(e),xs||WS(),()=>{si.delete(e),!si.size&&typeof xs=="function"&&(window.removeEventListener("resize",xs),xs=void 0)}}function Rm(e,t){return typeof e=="function"?VS(e):zS(e,t)}function US(e){return wu(e)&&e.tagName==="svg"}const Fm=()=>({translate:0,scale:1,origin:0,originPoint:0}),ks=()=>({x:Fm(),y:Fm()}),Dm=()=>({min:0,max:0}),xe=()=>({x:Dm(),y:Dm()}),HS=new WeakMap;function vo(e){return e!==null&&typeof e=="object"&&typeof e.start=="function"}function Hr(e){return typeof e=="string"||Array.isArray(e)}const Su=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],zi=["initial",...Su];function bo(e){if(vo(e.animate))return!0;for(let t=0;t<zi.length;t++)if(Hr(e[zi[t]]))return!0;return!1}function Dv(e){return!!(bo(e)||e.variants)}function qS(e,t,n){for(const s in t){const r=t[s],i=n[s];if(Re(r))e.addValue(s,r);else if(Re(i))e.addValue(s,Os(r,{owner:e}));else if(i!==r)if(e.hasValue(s)){const o=e.getValue(s);o.liveStyle===!0?o.jump(r):o.hasAnimated||o.set(r)}else{const o=e.getStaticValue(s);e.addValue(s,Os(o!==void 0?o:r,{owner:e}))}}for(const s in n)t[s]===void 0&&e.removeValue(s);return t}const Lc={current:null},Mv={current:!1},YS=typeof window<"u";function GS(){if(Mv.current=!0,!!YS)if(window.matchMedia){const e=window.matchMedia("(prefers-reduced-motion)"),t=()=>Lc.current=e.matches;e.addEventListener("change",t),t()}else Lc.current=!1}const Mm=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let Wi={};function Bv(e){Wi=e}function KS(){return Wi}class QS{scrapeMotionValuesFromProps(t,n,s){return{}}constructor({parent:t,props:n,presenceContext:s,reducedMotionConfig:r,skipAnimations:i,blockInitialAnimation:o,visualState:l},c={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=pu,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const y=_e.now();this.renderScheduledAt<y&&(this.renderScheduledAt=y,ee.render(this.render,!1,!0))};const{latestValues:d,renderState:u}=l;this.latestValues=d,this.baseTarget={...d},this.initialValues=n.initial?{...d}:{},this.renderState=u,this.parent=t,this.props=n,this.presenceContext=s,this.depth=t?t.depth+1:0,this.reducedMotionConfig=r,this.skipAnimationsConfig=i,this.options=c,this.blockInitialAnimation=!!o,this.isControllingVariants=bo(n),this.isVariantNode=Dv(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);const{willChange:h,...m}=this.scrapeMotionValuesFromProps(n,{},this);for(const y in m){const p=m[y];d[y]!==void 0&&Re(p)&&p.set(d[y])}}mount(t){var n,s;if(this.hasBeenMounted)for(const r in this.initialValues)(n=this.values.get(r))==null||n.jump(this.initialValues[r]),this.latestValues[r]=this.initialValues[r];this.current=t,HS.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((r,i)=>this.bindToMotionValue(i,r)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(Mv.current||GS(),this.shouldReduceMotion=Lc.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(s=this.parent)==null||s.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var t;this.projection&&this.projection.unmount(),Sn(this.notifyUpdate),Sn(this.render),this.valueSubscriptions.forEach(n=>n()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(t=this.parent)==null||t.removeChild(this);for(const n in this.events)this.events[n].clear();for(const n in this.features){const s=this.features[n];s&&(s.unmount(),s.isMounted=!1)}this.current=null}addChild(t){this.children.add(t),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(t)}removeChild(t){this.children.delete(t),this.enteringChildren&&this.enteringChildren.delete(t)}bindToMotionValue(t,n){if(this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)(),n.accelerate&&Pc.has(t)&&this.current instanceof HTMLElement){const{factory:o,keyframes:l,times:c,ease:d,duration:u}=n.accelerate,h=new mv({element:this.current,name:t,keyframes:l,times:c,ease:d,duration:pt(u)}),m=o(h);this.valueSubscriptions.set(t,()=>{m(),h.cancel()});return}const s=Ks.has(t);s&&this.onBindTransform&&this.onBindTransform();const r=n.on("change",o=>{this.latestValues[t]=o,this.props.onUpdate&&ee.preRender(this.notifyUpdate),s&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let i;typeof window<"u"&&window.MotionCheckAppearSync&&(i=window.MotionCheckAppearSync(this,t,n)),this.valueSubscriptions.set(t,()=>{r(),i&&i()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in Wi){const n=Wi[t];if(!n)continue;const{isEnabled:s,Feature:r}=n;if(!this.features[t]&&r&&s(this.props)&&(this.features[t]=new r(this)),this.features[t]){const i=this.features[t];i.isMounted?i.update():(i.mount(),i.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):xe()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,n){this.latestValues[t]=n}update(t,n){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=n;for(let s=0;s<Mm.length;s++){const r=Mm[s];this.propEventSubscriptions[r]&&(this.propEventSubscriptions[r](),delete this.propEventSubscriptions[r]);const i="on"+r,o=t[i];o&&(this.propEventSubscriptions[r]=this.on(r,o))}this.prevMotionValues=qS(this,this.scrapeMotionValuesFromProps(t,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){const n=this.getClosestVariantNode();if(n)return n.variantChildren&&n.variantChildren.add(t),()=>n.variantChildren.delete(t)}addValue(t,n){const s=this.values.get(t);n!==s&&(s&&this.removeValue(t),this.bindToMotionValue(t,n),this.values.set(t,n),this.latestValues[t]=n.get())}removeValue(t){this.values.delete(t);const n=this.valueSubscriptions.get(t);n&&(n(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,n){if(this.props.values&&this.props.values[t])return this.props.values[t];let s=this.values.get(t);return s===void 0&&n!==void 0&&(s=Os(n===null?void 0:n,{owner:this}),this.addValue(t,s)),s}readValue(t,n){let s=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:this.getBaseTargetFromProps(this.props,t)??this.readValueFromInstance(this.current,t,this.options);return s!=null&&(typeof s=="string"&&(tu(s)||nu(s))?s=parseFloat(s):typeof s!="number"&&!at.test(s)&&at.test(n)&&(s=mu(t,n)),this.setBaseTarget(t,Re(s)?s.get():s)),Re(s)?s.get():s}setBaseTarget(t,n){this.baseTarget[t]=n}getBaseTarget(t){var i;const{initial:n}=this.props;let s;if(typeof n=="string"||typeof n=="object"){const o=yu(this.props,n,(i=this.presenceContext)==null?void 0:i.custom);o&&(s=o[t])}if(n&&s!==void 0)return s;const r=this.getBaseTargetFromProps(this.props,t);return r!==void 0&&!Re(r)?r:this.initialValues[t]!==void 0&&s===void 0?void 0:this.baseTarget[t]}on(t,n){return this.events[t]||(this.events[t]=new Mi),this.events[t].add(n)}notify(t,...n){this.events[t]&&this.events[t].notify(...n)}scheduleRenderMicrotask(){ku.render(this.render)}}class Iv extends QS{constructor(){super(...arguments),this.KeyframeResolver=gS}sortInstanceNodePosition(t,n){return t.compareDocumentPosition(n)&2?1:-1}getBaseTargetFromProps(t,n){const s=t.style;return s?s[n]:void 0}removeValueFromRenderState(t,{vars:n,style:s}){delete n[t],delete s[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:t}=this.props;Re(t)&&(this.childSubscription=t.on("change",n=>{this.current&&(this.current.textContent=`${n}`)}))}}class En{constructor(t){this.isMounted=!1,this.node=t}update(){}}function Lv(e,{style:t,vars:n},s,r){const i=e.style;let o;for(o in t)i[o]=t[o];r==null||r.applyProjectionStyles(i,s);for(o in n)i.setProperty(o,n[o])}function Bm(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}const ar={correct:(e,t)=>{if(!t.target)return e;if(typeof e=="string")if(L.test(e))e=parseFloat(e);else return e;const n=Bm(e,t.target.x),s=Bm(e,t.target.y);return`${n}% ${s}%`}},XS={correct:(e,{treeScale:t,projectionDelta:n})=>{const s=e,r=at.parse(e);if(r.length>5)return s;const i=at.createTransformer(e),o=typeof r[0]!="number"?1:0,l=n.x.scale*t.x,c=n.y.scale*t.y;r[0+o]/=l,r[1+o]/=c;const d=Z(l,c,.5);return typeof r[2+o]=="number"&&(r[2+o]/=d),typeof r[3+o]=="number"&&(r[3+o]/=d),i(r)}},$c={borderRadius:{...ar,applyTo:[...bu]},borderTopLeftRadius:ar,borderTopRightRadius:ar,borderBottomLeftRadius:ar,borderBottomRightRadius:ar,boxShadow:XS};function $v(e,{layout:t,layoutId:n}){return Ks.has(e)||e.startsWith("origin")||(t||n!==void 0)&&(!!$c[e]||e==="opacity")}function Nu(e,t,n){var o;const s=e.style,r=t==null?void 0:t.style,i={};if(!s)return i;for(const l in s)(Re(s[l])||r&&Re(r[l])||$v(l,e)||((o=n==null?void 0:n.getValue(l))==null?void 0:o.liveStyle)!==void 0)&&(i[l]=s[l]);return i}function JS(e){return window.getComputedStyle(e)}class ZS extends Iv{constructor(){super(...arguments),this.type="html",this.renderInstance=Lv}mount(t){go(!!t.style),super.mount(t)}readValueFromInstance(t,n){var s;if(Ks.has(n))return(s=this.projection)!=null&&s.isProjecting?Sc(n):wj(t,n);{const r=JS(t),i=(Hy(n)?r.getPropertyValue(n):r[n])||0;return typeof i=="string"?i.trim():i}}measureInstanceViewportBox(t,{transformPagePoint:n}){return Av(t,n)}build(t,n,s){xu(t,n,s.transformTemplate)}scrapeMotionValuesFromProps(t,n,s){return Nu(t,n,s)}}const _v=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),Ov=e=>typeof e=="string"&&e.toLowerCase()==="svg";function e2(e,t,n,s){Lv(e,t,void 0,s);for(const r in t.attrs)e.setAttribute(_v.has(r)?r:vu(r),t.attrs[r])}function zv(e,t,n){const s=Nu(e,t,n);for(const r in e)if(Re(e[r])||Re(t[r])){const i=Gs.indexOf(r)!==-1?"attr"+r.charAt(0).toUpperCase()+r.substring(1):r;s[i]=e[r]}return s}class t2 extends Iv{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=xe}getBaseTargetFromProps(t,n){return t[n]}readValueFromInstance(t,n){if(Ks.has(n)){const s=av(n);return s&&s.default||0}if(jv.includes(n)){const r=getComputedStyle(t)[n];if(typeof r=="string"&&r)return r.trim()}return n=_v.has(n)?n:vu(n),t.getAttribute(n)}scrapeMotionValuesFromProps(t,n,s){return zv(t,n,s)}build(t,n,s){Sv(t,n,this.isSVGTag,s.transformTemplate,s.style)}renderInstance(t,n,s,r){e2(t,n,s,r)}mount(t){this.isSVGTag=Ov(t.tagName),super.mount(t)}}const n2=zi.length;function Wv(e){if(!e)return;if(!e.isControllingVariants){const n=e.parent?Wv(e.parent)||{}:{};return e.props.initial!==void 0&&(n.initial=e.props.initial),n}const t={};for(let n=0;n<n2;n++){const s=zi[n],r=e.props[s];(Hr(r)||r===!1)&&(t[s]=r)}return t}function Vv(e,t){if(!Array.isArray(t))return!1;const n=t.length;if(n!==e.length)return!1;for(let s=0;s<n;s++)if(t[s]!==e[s])return!1;return!0}const s2=[...Su].reverse(),r2=Su.length;function a2(e){return t=>Promise.all(t.map(({animation:n,options:s})=>cS(e,n,s)))}function i2(e){let t=a2(e),n=Im(),s=!0,r=!1;const i=d=>(u,h)=>{var y;const m=Un(e,h,d==="exit"?(y=e.presenceContext)==null?void 0:y.custom:void 0);if(m){const{transition:p,transitionEnd:b,...x}=m;u={...u,...x,...b}}return u};function o(d){t=d(e)}function l(d){const{props:u}=e,h=Wv(e.parent)||{},m=[],y=new Set;let p={},b=1/0;for(let f=0;f<r2;f++){const g=s2[f],v=n[g],k=u[g]!==void 0?u[g]:h[g],N=Hr(k),T=g===d?v.isActive:null;T===!1&&(b=f);let j=k===h[g]&&k!==u[g]&&N;if(j&&(s||r)&&e.manuallyAnimateOnMount&&(j=!1),v.protectedKeys={...p},!v.isActive&&T===null||!k&&!v.prevProp||vo(k)||typeof k=="boolean")continue;if(g==="exit"&&v.isActive&&T!==!0){v.prevResolvedValues&&(p={...p,...v.prevResolvedValues});continue}const S=o2(v.prevProp,k);let A=S||g===d&&v.isActive&&!j&&N||f>b&&N,P=!1;const $=Array.isArray(k)?k:[k];let Q=$.reduce(i(g),{});T===!1&&(Q={});const{prevResolvedValues:ie={}}=v,D={...ie,...Q},Y=E=>{A=!0,y.has(E)&&(P=!0,y.delete(E)),v.needsAnimating[E]=!0;const B=e.getValue(E);B&&(B.liveStyle=!1)};for(const E in D){const B=Q[E],M=ie[E];if(p.hasOwnProperty(E))continue;let W=!1;Rc(B)&&Rc(M)?W=!Vv(B,M)||S:W=B!==M,W?B!=null?Y(E):y.add(E):B!==void 0&&y.has(E)?Y(E):v.protectedKeys[E]=!0}v.prevProp=k,v.prevResolvedValues=Q,v.isActive&&(p={...p,...Q}),(s||r)&&e.blockInitialAnimation&&(A=!1);const C=j&&S;A&&(!C||P)&&m.push(...$.map(E=>{const B={type:g};if(typeof E=="string"&&(s||r)&&!C&&e.manuallyAnimateOnMount&&e.parent){const{parent:M}=e,W=Un(M,E);if(M.enteringChildren&&W){const{delayChildren:H}=W.transition||{};B.delay=fv(M.enteringChildren,e,H)}}return{animation:E,options:B}}))}if(y.size){const f={};if(typeof u.initial!="boolean"){const g=Un(e,Array.isArray(u.initial)?u.initial[0]:u.initial);g&&g.transition&&(f.transition=g.transition)}y.forEach(g=>{const v=e.getBaseTarget(g),k=e.getValue(g);k&&(k.liveStyle=!0),f[g]=v??null}),m.push({animation:f})}let x=!!m.length;return s&&(u.initial===!1||u.initial===u.animate)&&!e.manuallyAnimateOnMount&&(x=!1),s=!1,r=!1,x?t(m):Promise.resolve()}function c(d,u){var m;if(n[d].isActive===u)return Promise.resolve();(m=e.variantChildren)==null||m.forEach(y=>{var p;return(p=y.animationState)==null?void 0:p.setActive(d,u)}),n[d].isActive=u;const h=l(d);for(const y in n)n[y].protectedKeys={};return h}return{animateChanges:l,setActive:c,setAnimateFunction:o,getState:()=>n,reset:()=>{n=Im(),r=!0}}}function o2(e,t){return typeof t=="string"?t!==e:Array.isArray(t)?!Vv(t,e):!1}function Rn(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Im(){return{animate:Rn(!0),whileInView:Rn(),whileHover:Rn(),whileTap:Rn(),whileDrag:Rn(),whileFocus:Rn(),exit:Rn()}}function _c(e,t){e.min=t.min,e.max=t.max}function bt(e,t){_c(e.x,t.x),_c(e.y,t.y)}function Lm(e,t){e.translate=t.translate,e.scale=t.scale,e.originPoint=t.originPoint,e.origin=t.origin}const Uv=1e-4,l2=1-Uv,c2=1+Uv,Hv=.01,d2=0-Hv,u2=0+Hv;function We(e){return e.max-e.min}function h2(e,t,n){return Math.abs(e-t)<=n}function $m(e,t,n,s=.5){e.origin=s,e.originPoint=Z(t.min,t.max,e.origin),e.scale=We(n)/We(t),e.translate=Z(n.min,n.max,e.origin)-e.originPoint,(e.scale>=l2&&e.scale<=c2||isNaN(e.scale))&&(e.scale=1),(e.translate>=d2&&e.translate<=u2||isNaN(e.translate))&&(e.translate=0)}function kr(e,t,n,s){$m(e.x,t.x,n.x,s?s.originX:void 0),$m(e.y,t.y,n.y,s?s.originY:void 0)}function _m(e,t,n,s=0){const r=s?Z(n.min,n.max,s):n.min;e.min=r+t.min,e.max=e.min+We(t)}function m2(e,t,n,s){_m(e.x,t.x,n.x,s==null?void 0:s.x),_m(e.y,t.y,n.y,s==null?void 0:s.y)}function Om(e,t,n,s=0){const r=s?Z(n.min,n.max,s):n.min;e.min=t.min-r,e.max=e.min+We(t)}function Vi(e,t,n,s){Om(e.x,t.x,n.x,s==null?void 0:s.x),Om(e.y,t.y,n.y,s==null?void 0:s.y)}function zm(e,t,n,s,r){return e-=t,e=Oi(e,1/n,s),r!==void 0&&(e=Oi(e,1/r,s)),e}function p2(e,t=0,n=1,s=.5,r,i=e,o=e){if(_t.test(t)&&(t=parseFloat(t),t=Z(o.min,o.max,t/100)-o.min),typeof t!="number")return;let l=Z(i.min,i.max,s);e===i&&(l-=t),e.min=zm(e.min,t,n,l,r),e.max=zm(e.max,t,n,l,r)}function Wm(e,t,[n,s,r],i,o){p2(e,t[n],t[s],t[r],t.scale,i,o)}const f2=["x","scaleX","originX"],g2=["y","scaleY","originY"];function Vm(e,t,n,s){Wm(e.x,t,f2,n?n.x:void 0,s?s.x:void 0),Wm(e.y,t,g2,n?n.y:void 0,s?s.y:void 0)}function Um(e){return e.translate===0&&e.scale===1}function qv(e){return Um(e.x)&&Um(e.y)}function Hm(e,t){return e.min===t.min&&e.max===t.max}function y2(e,t){return Hm(e.x,t.x)&&Hm(e.y,t.y)}function qm(e,t){return Math.round(e.min)===Math.round(t.min)&&Math.round(e.max)===Math.round(t.max)}function Yv(e,t){return qm(e.x,t.x)&&qm(e.y,t.y)}function Ym(e){return We(e.x)/We(e.y)}function Gm(e,t){return e.translate===t.translate&&e.scale===t.scale&&e.originPoint===t.originPoint}function Mt(e){return[e("x"),e("y")]}function v2(e,t,n){let s="";const r=e.x.translate/t.x,i=e.y.translate/t.y,o=(n==null?void 0:n.z)||0;if((r||i||o)&&(s=`translate3d(${r}px, ${i}px, ${o}px) `),(t.x!==1||t.y!==1)&&(s+=`scale(${1/t.x}, ${1/t.y}) `),n){const{transformPerspective:d,rotate:u,pathRotation:h,rotateX:m,rotateY:y,skewX:p,skewY:b}=n;d&&(s=`perspective(${d}px) ${s}`),u&&(s+=`rotate(${u}deg) `),h&&(s+=`rotate(${h}deg) `),m&&(s+=`rotateX(${m}deg) `),y&&(s+=`rotateY(${y}deg) `),p&&(s+=`skewX(${p}deg) `),b&&(s+=`skewY(${b}deg) `)}const l=e.x.scale*t.x,c=e.y.scale*t.y;return(l!==1||c!==1)&&(s+=`scale(${l}, ${c})`),s||"none"}const b2=bu.length,Km=e=>typeof e=="string"?parseFloat(e):e,Qm=e=>typeof e=="number"||L.test(e);function w2(e,t,n,s,r,i){r?(e.opacity=Z(0,n.opacity??1,x2(s)),e.opacityExit=Z(t.opacity??1,0,k2(s))):i&&(e.opacity=Z(t.opacity??1,n.opacity??1,s));for(let o=0;o<b2;o++){const l=bu[o];let c=Xm(t,l),d=Xm(n,l);if(c===void 0&&d===void 0)continue;c||(c=0),d||(d=0),c===0||d===0||Qm(c)===Qm(d)?(e[l]=Math.max(Z(Km(c),Km(d),s),0),(_t.test(d)||_t.test(c))&&(e[l]+="%")):e[l]=d}(t.rotate||n.rotate)&&(e.rotate=Z(t.rotate||0,n.rotate||0,s))}function Xm(e,t){return e[t]!==void 0?e[t]:e.borderRadius}const x2=Gv(0,.5,_y),k2=Gv(.5,.95,Ct);function Gv(e,t,n){return s=>s<e?0:s>t?1:n(Wr(e,t,s))}function j2(e,t,n){const s=Re(e)?e:Os(e);return s.start(gu("",s,t,n)),s.animation}function qr(e,t,n,s={passive:!0}){return e.addEventListener(t,n,s),()=>e.removeEventListener(t,n,s)}const S2=(e,t)=>e.depth-t.depth;class N2{constructor(){this.children=[],this.isDirty=!1}add(t){eu(this.children,t),this.isDirty=!0}remove(t){Di(this.children,t),this.isDirty=!0}forEach(t){this.isDirty&&this.children.sort(S2),this.isDirty=!1,this.children.forEach(t)}}function T2(e,t){const n=_e.now(),s=({timestamp:r})=>{const i=r-n;i>=t&&(Sn(s),e(i-t))};return ee.setup(s,!0),()=>Sn(s)}function ri(e){return Re(e)?e.get():e}class C2{constructor(){this.members=[]}add(t){eu(this.members,t);for(let n=this.members.length-1;n>=0;n--){const s=this.members[n];if(s===t||s===this.lead||s===this.prevLead)continue;const r=s.instance;(!r||r.isConnected===!1)&&!s.snapshot&&(Di(this.members,s),s.unmount())}t.scheduleRender()}remove(t){if(Di(this.members,t),t===this.prevLead&&(this.prevLead=void 0),t===this.lead){const n=this.members[this.members.length-1];n&&this.promote(n)}}relegate(t){var n;for(let s=this.members.indexOf(t)-1;s>=0;s--){const r=this.members[s];if(r.isPresent!==!1&&((n=r.instance)==null?void 0:n.isConnected)!==!1)return this.promote(r),!0}return!1}promote(t,n){var r;const s=this.lead;if(t!==s&&(this.prevLead=s,this.lead=t,t.show(),s)){s.updateSnapshot(),t.scheduleRender();const{layoutDependency:i}=s.options,{layoutDependency:o}=t.options;(i===void 0||i!==o)&&(t.resumeFrom=s,n&&(s.preserveOpacity=!0),s.snapshot&&(t.snapshot=s.snapshot,t.snapshot.latestValues=s.animationValues||s.latestValues),(r=t.root)!=null&&r.isUpdating&&(t.isLayoutDirty=!0)),t.options.crossfade===!1&&s.hide()}}exitAnimationComplete(){this.members.forEach(t=>{var n,s,r,i,o;(s=(n=t.options).onExitComplete)==null||s.call(n),(o=(r=t.resumingFrom)==null?void 0:(i=r.options).onExitComplete)==null||o.call(i)})}scheduleRender(){this.members.forEach(t=>t.instance&&t.scheduleRender(!1))}removeLeadSnapshot(){var t;(t=this.lead)!=null&&t.snapshot&&(this.lead.snapshot=void 0)}}const ai={hasAnimatedSinceResize:!0,hasEverUpdated:!1},ol=["","X","Y","Z"],A2=1e3;let E2=0;function ll(e,t,n,s){const{latestValues:r}=t;r[e]&&(n[e]=r[e],t.setStaticValue(e,0),s&&(s[e]=0))}function Kv(e){if(e.hasCheckedOptimisedAppear=!0,e.root===e)return;const{visualElement:t}=e.options;if(!t)return;const n=wv(t);if(window.MotionHasOptimisedAnimation(n,"transform")){const{layout:r,layoutId:i}=e.options;window.MotionCancelOptimisedAnimation(n,"transform",ee,!(r||i))}const{parent:s}=e;s&&!s.hasCheckedOptimisedAppear&&Kv(s)}function Qv({attachResizeListener:e,defaultParent:t,measureScroll:n,checkIsScrollRoot:s,resetTransform:r}){return class{constructor(o={},l=t==null?void 0:t()){this.id=E2++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(F2),this.nodes.forEach($2),this.nodes.forEach(_2),this.nodes.forEach(D2)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=o,this.root=l?l.root||l:this,this.path=l?[...l.path,l]:[],this.parent=l,this.depth=l?l.depth+1:0;for(let c=0;c<this.path.length;c++)this.path[c].shouldResetTransform=!0;this.root===this&&(this.nodes=new N2)}addEventListener(o,l){return this.eventHandlers.has(o)||this.eventHandlers.set(o,new Mi),this.eventHandlers.get(o).add(l)}notifyListeners(o,...l){const c=this.eventHandlers.get(o);c&&c.notify(...l)}hasListeners(o){return this.eventHandlers.has(o)}mount(o){if(this.instance)return;this.isSVG=wu(o)&&!US(o),this.instance=o;const{layoutId:l,layout:c,visualElement:d}=this.options;if(d&&!d.current&&d.mount(o),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(c||l)&&(this.isLayoutDirty=!0),e){let u,h=0;const m=()=>this.root.updateBlockedByResize=!1;ee.read(()=>{h=window.innerWidth}),e(o,()=>{const y=window.innerWidth;y!==h&&(h=y,this.root.updateBlockedByResize=!0,u&&u(),u=T2(m,250),ai.hasAnimatedSinceResize&&(ai.hasAnimatedSinceResize=!1,this.nodes.forEach(ep)))})}l&&this.root.registerSharedNode(l,this),this.options.animate!==!1&&d&&(l||c)&&this.addEventListener("didUpdate",({delta:u,hasLayoutChanged:h,hasRelativeLayoutChanged:m,layout:y})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const p=this.options.transition||d.getDefaultTransition()||U2,{onLayoutAnimationStart:b,onLayoutAnimationComplete:x}=d.getProps(),f=!this.targetLayout||!Yv(this.targetLayout,y),g=!h&&m;if(this.options.layoutRoot||this.resumeFrom||g||h&&(f||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const v={...fu(p,"layout"),onPlay:b,onComplete:x};(d.shouldReduceMotion||this.options.layoutRoot)&&(v.delay=0,v.type=!1),this.startAnimation(v),this.setAnimationOrigin(u,g,v.path)}else h||ep(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=y})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const o=this.getStack();o&&o.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),Sn(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(O2),this.animationId++)}getTransformTemplate(){const{visualElement:o}=this.options;return o&&o.getProps().transformTemplate}willUpdate(o=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Kv(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let u=0;u<this.path.length;u++){const h=this.path[u];h.shouldResetTransform=!0,(typeof h.latestValues.x=="string"||typeof h.latestValues.y=="string")&&(h.isLayoutDirty=!0),h.updateScroll("snapshot"),h.options.layoutRoot&&h.willUpdate(!1)}const{layoutId:l,layout:c}=this.options;if(l===void 0&&!c)return;const d=this.getTransformTemplate();this.prevTransformTemplateValue=d?d(this.latestValues,""):void 0,this.updateSnapshot(),o&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const c=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),c&&this.nodes.forEach(B2),this.nodes.forEach(Jm);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(Zm);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(I2),this.nodes.forEach(L2),this.nodes.forEach(P2),this.nodes.forEach(R2)):this.nodes.forEach(Zm),this.clearAllSnapshots();const l=_e.now();ke.delta=Pt(0,1e3/60,l-ke.timestamp),ke.timestamp=l,ke.isProcessing=!0,Zo.update.process(ke),Zo.preRender.process(ke),Zo.render.process(ke),ke.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,ku.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(M2),this.sharedNodes.forEach(z2)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,ee.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){ee.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!We(this.snapshot.measuredBox.x)&&!We(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let c=0;c<this.path.length;c++)this.path[c].updateScroll();const o=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=xe()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:l}=this.options;l&&l.notify("LayoutMeasure",this.layout.layoutBox,o?o.layoutBox:void 0)}updateScroll(o="measure"){let l=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===o&&(l=!1),l&&this.instance){const c=s(this.instance);this.scroll={animationId:this.root.animationId,phase:o,isRoot:c,offset:n(this.instance),wasRoot:this.scroll?this.scroll.isRoot:c}}}resetTransform(){if(!r)return;const o=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,l=this.projectionDelta&&!qv(this.projectionDelta),c=this.getTransformTemplate(),d=c?c(this.latestValues,""):void 0,u=d!==this.prevTransformTemplateValue;o&&this.instance&&(l||Mn(this.latestValues)||u)&&(r(this.instance,d),this.shouldResetTransform=!1,this.scheduleRender())}measure(o=!0){const l=this.measurePageBox();let c=this.removeElementScroll(l);return o&&(c=this.removeTransform(c)),H2(c),{animationId:this.root.animationId,measuredBox:l,layoutBox:c,latestValues:{},source:this.id}}measurePageBox(){var d;const{visualElement:o}=this.options;if(!o)return xe();const l=o.measureViewportBox();if(!(((d=this.scroll)==null?void 0:d.wasRoot)||this.path.some(q2))){const{scroll:u}=this.root;u&&(Bt(l.x,u.offset.x),Bt(l.y,u.offset.y))}return l}removeElementScroll(o){var c;const l=xe();if(bt(l,o),(c=this.scroll)!=null&&c.wasRoot)return l;for(let d=0;d<this.path.length;d++){const u=this.path[d],{scroll:h,options:m}=u;u!==this.root&&h&&m.layoutScroll&&(h.wasRoot&&bt(l,o),Bt(l.x,h.offset.x),Bt(l.y,h.offset.y))}return l}applyTransform(o,l=!1,c){var u,h;const d=c||xe();bt(d,o);for(let m=0;m<this.path.length;m++){const y=this.path[m];!l&&y.options.layoutScroll&&y.scroll&&y!==y.root&&(Bt(d.x,-y.scroll.offset.x),Bt(d.y,-y.scroll.offset.y)),Mn(y.latestValues)&&ei(d,y.latestValues,(u=y.layout)==null?void 0:u.layoutBox)}return Mn(this.latestValues)&&ei(d,this.latestValues,(h=this.layout)==null?void 0:h.layoutBox),d}removeTransform(o){var c;const l=xe();bt(l,o);for(let d=0;d<this.path.length;d++){const u=this.path[d];if(!Mn(u.latestValues))continue;let h;u.instance&&(Bc(u.latestValues)&&u.updateSnapshot(),h=xe(),bt(h,u.measurePageBox())),Vm(l,u.latestValues,(c=u.snapshot)==null?void 0:c.layoutBox,h)}return Mn(this.latestValues)&&Vm(l,this.latestValues),l}setTargetDelta(o){this.targetDelta=o,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(o){this.options={...this.options,...o,crossfade:o.crossfade!==void 0?o.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==ke.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(o=!1){var y;const l=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=l.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=l.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=l.isSharedProjectionDirty);const c=!!this.resumingFrom||this!==l;if(!(o||c&&this.isSharedProjectionDirty||this.isProjectionDirty||(y=this.parent)!=null&&y.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:u,layoutId:h}=this.options;if(!this.layout||!(u||h))return;this.resolvedRelativeTargetAt=ke.timestamp;const m=this.getClosestProjectingParent();m&&this.linkedParentVersion!==m.layoutVersion&&!m.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&m&&m.layout?this.createRelativeTarget(m,this.layout.layoutBox,m.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=xe(),this.targetWithTransforms=xe()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),m2(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):bt(this.target,this.layout.layoutBox),Cv(this.target,this.targetDelta)):bt(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&m&&!!m.resumingFrom==!!this.resumingFrom&&!m.options.layoutScroll&&m.target&&this.animationProgress!==1?this.createRelativeTarget(m,this.target,m.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Bc(this.parent.latestValues)||Tv(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(o,l,c){this.relativeParent=o,this.linkedParentVersion=o.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=xe(),this.relativeTargetOrigin=xe(),Vi(this.relativeTargetOrigin,l,c,this.options.layoutAnchor||void 0),bt(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var p;const o=this.getLead(),l=!!this.resumingFrom||this!==o;let c=!0;if((this.isProjectionDirty||(p=this.parent)!=null&&p.isProjectionDirty)&&(c=!1),l&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(c=!1),this.resolvedRelativeTargetAt===ke.timestamp&&(c=!1),c)return;const{layout:d,layoutId:u}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(d||u))return;bt(this.layoutCorrected,this.layout.layoutBox);const h=this.treeScale.x,m=this.treeScale.y;NS(this.layoutCorrected,this.treeScale,this.path,l),o.layout&&!o.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(o.target=o.layout.layoutBox,o.targetWithTransforms=xe());const{target:y}=o;if(!y){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Lm(this.prevProjectionDelta.x,this.projectionDelta.x),Lm(this.prevProjectionDelta.y,this.projectionDelta.y)),kr(this.projectionDelta,this.layoutCorrected,y,this.latestValues),(this.treeScale.x!==h||this.treeScale.y!==m||!Gm(this.projectionDelta.x,this.prevProjectionDelta.x)||!Gm(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",y))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(o=!0){var l;if((l=this.options.visualElement)==null||l.scheduleRender(),o){const c=this.getStack();c&&c.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=ks(),this.projectionDelta=ks(),this.projectionDeltaWithTransform=ks()}setAnimationOrigin(o,l=!1,c){const d=this.snapshot,u=d?d.latestValues:{},h={...this.latestValues},m=ks();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!l;const y=xe(),p=d?d.source:void 0,b=this.layout?this.layout.source:void 0,x=p!==b,f=this.getStack(),g=!f||f.members.length<=1,v=!!(x&&!g&&this.options.crossfade===!0&&!this.path.some(V2));this.animationProgress=0;let k;const N=c==null?void 0:c.interpolateProjection(o);this.mixTargetDelta=T=>{const j=T/1e3,S=N==null?void 0:N(j);S?(m.x.translate=S.x,m.x.scale=Z(o.x.scale,1,j),m.x.origin=o.x.origin,m.x.originPoint=o.x.originPoint,m.y.translate=S.y,m.y.scale=Z(o.y.scale,1,j),m.y.origin=o.y.origin,m.y.originPoint=o.y.originPoint):(tp(m.x,o.x,j),tp(m.y,o.y,j)),this.setTargetDelta(m),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Vi(y,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),W2(this.relativeTarget,this.relativeTargetOrigin,y,j),k&&y2(this.relativeTarget,k)&&(this.isProjectionDirty=!1),k||(k=xe()),bt(k,this.relativeTarget)),x&&(this.animationValues=h,w2(h,u,this.latestValues,j,v,g)),S&&S.rotate!==void 0&&(this.animationValues||(this.animationValues=h),this.animationValues.pathRotation=S.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=j},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(o){var l,c,d;this.notifyListeners("animationStart"),(l=this.currentAnimation)==null||l.stop(),(d=(c=this.resumingFrom)==null?void 0:c.currentAnimation)==null||d.stop(),this.pendingAnimation&&(Sn(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=ee.update(()=>{ai.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Os(0)),this.motionValue.jump(0,!1),this.currentAnimation=j2(this.motionValue,[0,1e3],{...o,velocity:0,isSync:!0,onUpdate:u=>{this.mixTargetDelta(u),o.onUpdate&&o.onUpdate(u)},onComplete:()=>{o.onComplete&&o.onComplete(),this.completeAnimation()}}),cj(this.currentAnimation,this),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const o=this.getStack();o&&o.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(A2),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const o=this.getLead(),{targetWithTransforms:l,layout:c,latestValues:d}=o;let{target:u}=o;if(!(!l||!u||!c)){if(this!==o&&this.layout&&c&&Xv(this.options.animationType,this.layout.layoutBox,c.layoutBox)){u=this.target||xe();const h=We(this.layout.layoutBox.x);u.x.min=o.target.x.min,u.x.max=u.x.min+h;const m=We(this.layout.layoutBox.y);u.y.min=o.target.y.min,u.y.max=u.y.min+m}bt(l,u),ei(l,d),kr(this.projectionDeltaWithTransform,this.layoutCorrected,l,d)}}registerSharedNode(o,l){this.sharedNodes.has(o)||this.sharedNodes.set(o,new C2),this.sharedNodes.get(o).add(l);const d=l.options.initialPromotionConfig;l.promote({transition:d?d.transition:void 0,preserveFollowOpacity:d&&d.shouldPreserveFollowOpacity?d.shouldPreserveFollowOpacity(l):void 0})}isLead(){const o=this.getStack();return o?o.lead===this:!0}getLead(){var l;const{layoutId:o}=this.options;return o?((l=this.getStack())==null?void 0:l.lead)||this:this}getPrevLead(){var l;const{layoutId:o}=this.options;return o?(l=this.getStack())==null?void 0:l.prevLead:void 0}getStack(){const{layoutId:o}=this.options;if(o)return this.root.sharedNodes.get(o)}promote({needsReset:o,transition:l,preserveFollowOpacity:c}={}){const d=this.getStack();d&&d.promote(this,c),o&&(this.projectionDelta=void 0,this.needsReset=!0),l&&this.setOptions({transition:l})}relegate(){const o=this.getStack();return o?o.relegate(this):!1}resetSkewAndRotation(){const{visualElement:o}=this.options;if(!o)return;let l=!1;const{latestValues:c}=o;if((c.z||c.rotate||c.rotateX||c.rotateY||c.rotateZ||c.skewX||c.skewY)&&(l=!0),!l)return;const d={};c.z&&ll("z",o,d,this.animationValues);for(let u=0;u<ol.length;u++)ll(`rotate${ol[u]}`,o,d,this.animationValues),ll(`skew${ol[u]}`,o,d,this.animationValues);o.render();for(const u in d)o.setStaticValue(u,d[u]),this.animationValues&&(this.animationValues[u]=d[u]);o.scheduleRender()}applyProjectionStyles(o,l){if(!this.instance||this.isSVG)return;if(!this.isVisible){o.visibility="hidden";return}const c=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,o.visibility="",o.opacity="",o.pointerEvents=ri(l==null?void 0:l.pointerEvents)||"",o.transform=c?c(this.latestValues,""):"none";return}const d=this.getLead();if(!this.projectionDelta||!this.layout||!d.target){this.options.layoutId&&(o.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,o.pointerEvents=ri(l==null?void 0:l.pointerEvents)||""),this.hasProjected&&!Mn(this.latestValues)&&(o.transform=c?c({},""):"none",this.hasProjected=!1);return}o.visibility="";const u=d.animationValues||d.latestValues;this.applyTransformsToTarget();let h=v2(this.projectionDeltaWithTransform,this.treeScale,u);c&&(h=c(u,h)),o.transform=h;const{x:m,y}=this.projectionDelta;o.transformOrigin=`${m.origin*100}% ${y.origin*100}% 0`,d.animationValues?o.opacity=d===this?u.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:u.opacityExit:o.opacity=d===this?u.opacity!==void 0?u.opacity:"":u.opacityExit!==void 0?u.opacityExit:0;for(const p in $c){if(u[p]===void 0)continue;const{correct:b,applyTo:x,isCSSVariable:f}=$c[p],g=h==="none"?u[p]:b(u[p],d);if(x){const v=x.length;for(let k=0;k<v;k++)o[x[k]]=g}else f?this.options.visualElement.renderState.vars[p]=g:o[p]=g}this.options.layoutId&&(o.pointerEvents=d===this?ri(l==null?void 0:l.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(o=>{var l;return(l=o.currentAnimation)==null?void 0:l.stop()}),this.root.nodes.forEach(Jm),this.root.sharedNodes.clear()}}}function P2(e){e.updateLayout()}function R2(e){var n;const t=((n=e.resumeFrom)==null?void 0:n.snapshot)||e.snapshot;if(e.isLead()&&e.layout&&t&&e.hasListeners("didUpdate")){const{layoutBox:s,measuredBox:r}=e.layout,{animationType:i}=e.options,o=t.source!==e.layout.source;if(i==="size")Mt(h=>{const m=o?t.measuredBox[h]:t.layoutBox[h],y=We(m);m.min=s[h].min,m.max=m.min+y});else if(i==="x"||i==="y"){const h=i==="x"?"y":"x";_c(o?t.measuredBox[h]:t.layoutBox[h],s[h])}else Xv(i,t.layoutBox,s)&&Mt(h=>{const m=o?t.measuredBox[h]:t.layoutBox[h],y=We(s[h]);m.max=m.min+y,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[h].max=e.relativeTarget[h].min+y)});const l=ks();kr(l,s,t.layoutBox);const c=ks();o?kr(c,e.applyTransform(r,!0),t.measuredBox):kr(c,s,t.layoutBox);const d=!qv(l);let u=!1;if(!e.resumeFrom){const h=e.getClosestProjectingParent();if(h&&!h.resumeFrom){const{snapshot:m,layout:y}=h;if(m&&y){const p=e.options.layoutAnchor||void 0,b=xe();Vi(b,t.layoutBox,m.layoutBox,p);const x=xe();Vi(x,s,y.layoutBox,p),Yv(b,x)||(u=!0),h.options.layoutRoot&&(e.relativeTarget=x,e.relativeTargetOrigin=b,e.relativeParent=h)}}}e.notifyListeners("didUpdate",{layout:s,snapshot:t,delta:c,layoutDelta:l,hasLayoutChanged:d,hasRelativeLayoutChanged:u})}else if(e.isLead()){const{onExitComplete:s}=e.options;s&&s()}e.options.transition=void 0}function F2(e){e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function D2(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function M2(e){e.clearSnapshot()}function Jm(e){e.clearMeasurements()}function B2(e){e.isLayoutDirty=!0,e.updateLayout()}function Zm(e){e.isLayoutDirty=!1}function I2(e){e.isAnimationBlocked&&e.layout&&!e.isLayoutDirty&&(e.snapshot=e.layout,e.isLayoutDirty=!0)}function L2(e){const{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify("BeforeLayoutMeasure"),e.resetTransform()}function ep(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function $2(e){e.resolveTargetDelta()}function _2(e){e.calcProjection()}function O2(e){e.resetSkewAndRotation()}function z2(e){e.removeLeadSnapshot()}function tp(e,t,n){e.translate=Z(t.translate,0,n),e.scale=Z(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function np(e,t,n,s){e.min=Z(t.min,n.min,s),e.max=Z(t.max,n.max,s)}function W2(e,t,n,s){np(e.x,t.x,n.x,s),np(e.y,t.y,n.y,s)}function V2(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}const U2={duration:.45,ease:[.4,0,.1,1]},sp=e=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(e),rp=sp("applewebkit/")&&!sp("chrome/")?Math.round:Ct;function ap(e){e.min=rp(e.min),e.max=rp(e.max)}function H2(e){ap(e.x),ap(e.y)}function Xv(e,t,n){return e==="position"||e==="preserve-aspect"&&!h2(Ym(t),Ym(n),.2)}function q2(e){var t;return e!==e.root&&((t=e.scroll)==null?void 0:t.wasRoot)}const Y2=Qv({attachResizeListener:(e,t)=>qr(e,"resize",t),measureScroll:()=>{var e,t;return{x:document.documentElement.scrollLeft||((e=document.body)==null?void 0:e.scrollLeft)||0,y:document.documentElement.scrollTop||((t=document.body)==null?void 0:t.scrollTop)||0}},checkIsScrollRoot:()=>!0}),cl={current:void 0},Jv=Qv({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!cl.current){const e=new Y2({});e.mount(window),e.setOptions({layoutScroll:!0}),cl.current=e}return cl.current},resetTransform:(e,t)=>{e.style.transform=t!==void 0?t:"none"},checkIsScrollRoot:e=>window.getComputedStyle(e).position==="fixed"}),Tu=w.createContext({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"});function ip(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function G2(...e){return t=>{let n=!1;const s=e.map(r=>{const i=ip(r,t);return!n&&typeof i=="function"&&(n=!0),i});if(n)return()=>{for(let r=0;r<s.length;r++){const i=s[r];typeof i=="function"?i():ip(e[r],null)}}}}function K2(...e){return w.useCallback(G2(...e),e)}class Q2 extends w.Component{getSnapshotBeforeUpdate(t){const n=this.props.childRef.current;if(Za(n)&&t.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const s=n.offsetParent,r=Za(s)&&s.offsetWidth||0,i=Za(s)&&s.offsetHeight||0,o=getComputedStyle(n),l=this.props.sizeRef.current;l.height=parseFloat(o.height),l.width=parseFloat(o.width),l.top=n.offsetTop,l.left=n.offsetLeft,l.right=r-l.width-l.left,l.bottom=i-l.height-l.top,l.direction=o.direction}return null}componentDidUpdate(){}render(){return this.props.children}}function X2({children:e,isPresent:t,anchorX:n,anchorY:s,root:r,pop:i}){var m;const o=w.useId(),l=w.useRef(null),c=w.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:"ltr"}),{nonce:d}=w.useContext(Tu),u=i!==!1?((m=e.props)==null?void 0:m.ref)??(e==null?void 0:e.ref):void 0,h=K2(l,u);return w.useInsertionEffect(()=>{const{width:y,height:p,top:b,left:x,right:f,bottom:g,direction:v}=c.current;if(t||i===!1||!l.current||!y||!p)return;const k=v==="rtl",N=n==="left"?k?`right: ${f}`:`left: ${x}`:k?`left: ${x}`:`right: ${f}`,T=s==="bottom"?`bottom: ${g}`:`top: ${b}`;l.current.dataset.motionPopId=o;const j=document.createElement("style");d&&(j.nonce=d);const S=r??document.head;return S.appendChild(j),j.sheet&&j.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${y}px !important;
            height: ${p}px !important;
            ${N}px !important;
            ${T}px !important;
          }
        `),()=>{var A;(A=l.current)==null||A.removeAttribute("data-motion-pop-id"),S.contains(j)&&S.removeChild(j)}},[t]),a.jsx(Q2,{isPresent:t,childRef:l,sizeRef:c,pop:i,children:i===!1?e:w.cloneElement(e,{ref:h})})}const J2=({children:e,initial:t,isPresent:n,onExitComplete:s,custom:r,presenceAffectsLayout:i,mode:o,anchorX:l,anchorY:c,root:d})=>{const u=Zd(Z2),h=w.useId(),m=w.useRef(n),y=w.useRef(s);Fi(()=>{m.current=n,y.current=s});let p=!0,b=w.useMemo(()=>(p=!1,{id:h,initial:t,isPresent:n,custom:r,onExitComplete:x=>{u.set(x,!0);for(const f of u.values())if(!f)return;s&&s()},register:x=>(u.set(x,!1),()=>{var f;u.delete(x),!m.current&&!u.size&&((f=y.current)==null||f.call(y))})}),[n,u,s]);return i&&p&&(b={...b}),w.useMemo(()=>{u.forEach((x,f)=>u.set(f,!1))},[n]),w.useEffect(()=>{!n&&!u.size&&s&&s()},[n]),e=a.jsx(X2,{pop:o==="popLayout",isPresent:n,anchorX:l,anchorY:c,root:d,children:e}),a.jsx(fo.Provider,{value:b,children:e})};function Z2(){return new Map}function Zv(e=!0){const t=w.useContext(fo);if(t===null)return[!0,null];const{isPresent:n,onExitComplete:s,register:r}=t,i=w.useId();w.useEffect(()=>{if(e)return r(i)},[e]);const o=w.useCallback(()=>e&&s&&s(i),[i,s,e]);return!n&&s?[!1,o]:[!0]}const Pa=e=>e.key||"";function op(e){const t=[];return w.Children.forEach(e,n=>{w.isValidElement(n)&&t.push(n)}),t}const ia=({children:e,custom:t,initial:n=!0,onExitComplete:s,presenceAffectsLayout:r=!0,mode:i="sync",propagate:o=!1,anchorX:l="left",anchorY:c="top",root:d})=>{const[u,h]=Zv(o),m=w.useMemo(()=>op(e),[e]),y=o&&!u?[]:m.map(Pa),p=w.useRef(!0),b=w.useRef(m),x=Zd(()=>new Map),f=w.useRef(new Set),[g,v]=w.useState(m),[k,N]=w.useState(m);Fi(()=>{o&&!u&&!k.length&&(h==null||h())},[u,o,k.length,h]),Fi(()=>{p.current=!1,b.current=m;for(let S=0;S<k.length;S++){const A=Pa(k[S]);y.includes(A)?(x.delete(A),f.current.delete(A)):x.get(A)!==!0&&x.set(A,!1)}},[k,y.length,y.join("-")]);const T=[];if(m!==g){let S=[...m],A=0;for(const P of k){const $=y.indexOf(Pa(P));$===-1?(S.splice(A++,0,P),T.push(P)):A=$+T.length+1}return i==="wait"&&T.length&&(S=T),N(op(S)),v(m),null}const{forceRender:j}=w.useContext(Jd);return a.jsx(a.Fragment,{children:k.map(S=>{const A=Pa(S),P=o&&!u?!1:m===k||y.includes(A),$=()=>{if(f.current.has(A))return;if(x.has(A))f.current.add(A),x.set(A,!0);else return;let Q=!0;x.forEach(ie=>{ie||(Q=!1)}),Q&&(j==null||j(),N(b.current),o&&(h==null||h()),s&&s())};return a.jsx(J2,{isPresent:P,initial:!p.current||n?void 0:!1,custom:t,presenceAffectsLayout:r,mode:i,root:d,onExitComplete:P?void 0:$,anchorX:l,anchorY:c,children:S},A)})})},eb=w.createContext({strict:!1}),lp={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let cp=!1;function eN(){if(cp)return;const e={};for(const t in lp)e[t]={isEnabled:n=>lp[t].some(s=>!!n[s])};Bv(e),cp=!0}function tb(){return eN(),KS()}function tN(e){const t=tb();for(const n in e)t[n]={...t[n],...e[n]};Bv(t)}const wo=w.createContext({});function nN(e,t){if(bo(e)){const{initial:n,animate:s}=e;return{initial:n===!1||Hr(n)?n:void 0,animate:Hr(s)?s:void 0}}return e.inherit!==!1?t:{}}function sN(e){const{initial:t,animate:n}=nN(e,w.useContext(wo));return w.useMemo(()=>({initial:t,animate:n}),[dp(t),dp(n)])}function dp(e){return Array.isArray(e)?e.join(" "):e}const Cu=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function nb(e,t,n){for(const s in t)!Re(t[s])&&!$v(s,n)&&(e[s]=t[s])}function rN({transformTemplate:e},t){return w.useMemo(()=>{const n=Cu();return xu(n,t,e),Object.assign({},n.vars,n.style)},[t])}function aN(e,t){const n=e.style||{},s={};return nb(s,n,e),Object.assign(s,rN(e,t)),s}function iN(e,t){const n={},s=aN(e,t);return e.drag&&e.dragListener!==!1&&(n.draggable=!1,s.userSelect=s.WebkitUserSelect=s.WebkitTouchCallout="none",s.touchAction=e.drag===!0?"none":`pan-${e.drag==="x"?"y":"x"}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(n.tabIndex=0),n.style=s,n}const sb=()=>({...Cu(),attrs:{}});function oN(e,t,n,s){const r=w.useMemo(()=>{const i=sb();return Sv(i,t,Ov(s),e.transformTemplate,e.style),{...i.attrs,style:{...i.style}}},[t]);if(e.style){const i={};nb(i,e.style,e),r.style={...i,...r.style}}return r}const lN=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function Ui(e){return e.startsWith("while")||e.startsWith("drag")&&e!=="draggable"||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||lN.has(e)}function cN(e,t){return e.startsWith("on")?!Ui(e):(t==null?void 0:t(e))??!Ui(e)}function dN(e,t,n,s){const r={};for(const i in e)i==="values"&&typeof e.values=="object"||Re(e[i])||(cN(i,s)||n===!0&&Ui(i)||!t&&!Ui(i)||e.draggable&&i.startsWith("onDrag"))&&(r[i]=e[i]);return r}const uN=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Au(e){return typeof e!="string"||e.includes("-")?!1:!!(uN.indexOf(e)>-1||/[A-Z]/u.test(e))}function hN(e,t,n,{latestValues:s},r,i=!1,o,l){const d=(o??Au(e)?oN:iN)(t,s,r,e),u=dN(t,typeof e=="string",i,l),h=e!==w.Fragment?{...u,...d,ref:n}:{},{children:m}=t,y=w.useMemo(()=>Re(m)?m.get():m,[m]);return w.createElement(e,{...h,children:y})}function mN({scrapeMotionValuesFromProps:e,createRenderState:t},n,s,r){return{latestValues:pN(n,s,r,e),renderState:t()}}function pN(e,t,n,s){const r={},i=s(e,{});for(const m in i)r[m]=ri(i[m]);let{initial:o,animate:l}=e;const c=bo(e),d=Dv(e);t&&d&&!c&&e.inherit!==!1&&(o===void 0&&(o=t.initial),l===void 0&&(l=t.animate));let u=n?n.initial===!1:!1;u=u||o===!1;const h=u?l:o;if(h&&typeof h!="boolean"&&!vo(h)){const m=Array.isArray(h)?h:[h];for(let y=0;y<m.length;y++){const p=yu(e,m[y]);if(p){const{transitionEnd:b,transition:x,...f}=p;for(const g in f){let v=f[g];if(Array.isArray(v)){const k=u?v.length-1:0;v=v[k]}v!==null&&(r[g]=v)}for(const g in b)r[g]=b[g]}}}return r}const rb=e=>(t,n)=>{const s=w.useContext(wo),r=w.useContext(fo),i=()=>mN(e,t,s,r);return n?i():Zd(i)},fN=rb({scrapeMotionValuesFromProps:Nu,createRenderState:Cu}),gN=rb({scrapeMotionValuesFromProps:zv,createRenderState:sb}),yN=Symbol.for("motionComponentSymbol");function vN(e,t,n){const s=w.useRef(n);w.useInsertionEffect(()=>{s.current=n});const r=w.useRef(null);return w.useCallback(i=>{var l;i&&((l=e.onMount)==null||l.call(e,i)),t&&(i?t.mount(i):t.unmount());const o=s.current;if(typeof o=="function")if(i){const c=o(i);typeof c=="function"&&(r.current=c)}else r.current?(r.current(),r.current=null):o(i);else o&&(o.current=i)},[t])}const ab=w.createContext({});function os(e){return e&&typeof e=="object"&&Object.prototype.hasOwnProperty.call(e,"current")}function bN(e,t,n,s,r,i){var v,k;const{visualElement:o}=w.useContext(wo),l=w.useContext(eb),c=w.useContext(fo),d=w.useContext(Tu),u=d.reducedMotion,h=d.skipAnimations,m=w.useRef(null),y=w.useRef(!1);s=s||l.renderer,!m.current&&s&&(m.current=s(e,{visualState:t,parent:o,props:n,presenceContext:c,blockInitialAnimation:c?c.initial===!1:!1,reducedMotionConfig:u,skipAnimations:h,isSVG:i}),y.current&&m.current&&(m.current.manuallyAnimateOnMount=!0));const p=m.current,b=w.useContext(ab);p&&!p.projection&&r&&(p.type==="html"||p.type==="svg")&&wN(m.current,n,r,b);const x=w.useRef(!1);w.useInsertionEffect(()=>{p&&x.current&&p.update(n,c)});const f=n[bv],g=w.useRef(!!f&&typeof window<"u"&&!((v=window.MotionHandoffIsComplete)!=null&&v.call(window,f))&&((k=window.MotionHasOptimisedAnimation)==null?void 0:k.call(window,f)));return Fi(()=>{y.current=!0,p&&(x.current=!0,window.MotionIsMounted=!0,p.updateFeatures(),p.scheduleRenderMicrotask(),g.current&&p.animationState&&p.animationState.animateChanges())}),w.useEffect(()=>{p&&(!g.current&&p.animationState&&p.animationState.animateChanges(),g.current&&(queueMicrotask(()=>{var N;(N=window.MotionHandoffMarkAsComplete)==null||N.call(window,f)}),g.current=!1),p.enteringChildren=void 0)}),p}function wN(e,t,n,s){const{layoutId:r,layout:i,drag:o,dragConstraints:l,layoutScroll:c,layoutRoot:d,layoutAnchor:u,layoutCrossfade:h}=t;e.projection=new n(e.latestValues,t["data-framer-portal-id"]?void 0:ib(e.parent)),e.projection.setOptions({layoutId:r,layout:i,alwaysMeasureLayout:!!o||l&&os(l),visualElement:e,animationType:typeof i=="string"?i:"both",initialPromotionConfig:s,crossfade:h,layoutScroll:c,layoutRoot:d,layoutAnchor:u})}function ib(e){if(e)return e.options.allowProjection!==!1?e.projection:ib(e.parent)}function dl(e,{forwardMotionProps:t=!1,type:n}={},s,r){s&&tN(s);const i=n?n==="svg":Au(e),o=i?gN:fN;function l(d,u){let h;const m={...w.useContext(Tu),...d,layoutId:xN(d)},{isStatic:y,isValidProp:p}=m,b=sN(d),x=o(d,y);if(!y&&typeof window<"u"){kN();const f=jN(m);h=f.MeasureLayout,b.visualElement=bN(e,x,m,r,f.ProjectionNode,i)}return a.jsxs(wo.Provider,{value:b,children:[h&&b.visualElement?a.jsx(h,{visualElement:b.visualElement,...m}):null,hN(e,d,vN(x,b.visualElement,u),x,y,t,i,p)]})}l.displayName=`motion.${typeof e=="string"?e:`create(${e.displayName??e.name??""})`}`;const c=w.forwardRef(l);return c[yN]=e,c}function xN({layoutId:e}){const t=w.useContext(Jd).id;return t&&e!==void 0?t+"-"+e:e}function kN(e,t){w.useContext(eb).strict}function jN(e){const t=tb(),{drag:n,layout:s}=t;if(!n&&!s)return{};const r={...n,...s};return{MeasureLayout:n!=null&&n.isEnabled(e)||s!=null&&s.isEnabled(e)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}function SN(e,t){if(typeof Proxy>"u")return dl;const n=new Map,s=(i,o)=>dl(i,o,e,t),r=(i,o)=>s(i,o);return new Proxy(r,{get:(i,o)=>o==="create"?s:(n.has(o)||n.set(o,dl(o,void 0,e,t)),n.get(o))})}const NN=(e,t)=>t.isSVG??Au(e)?new t2(t):new ZS(t,{allowProjection:e!==w.Fragment});class TN extends En{constructor(t){super(t),t.animationState||(t.animationState=i2(t))}updateAnimationControlsSubscription(){const{animate:t}=this.node.getProps();vo(t)&&(this.unmountControls=t.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:t}=this.node.getProps(),{animate:n}=this.node.prevProps||{};t!==n&&this.updateAnimationControlsSubscription()}unmount(){var t;this.node.animationState.reset(),(t=this.unmountControls)==null||t.call(this)}}let CN=0;class AN extends En{constructor(){super(...arguments),this.id=CN++,this.isExitComplete=!1}update(){var i;if(!this.node.presenceContext)return;const{isPresent:t,onExitComplete:n}=this.node.presenceContext,{isPresent:s}=this.node.prevPresenceContext||{};if(!this.node.animationState||t===s)return;if(t&&s===!1){if(this.isExitComplete){const{initial:o,custom:l}=this.node.getProps();if(typeof o=="string"||typeof o=="object"&&o!==null&&!Array.isArray(o)){const c=Un(this.node,o,l);if(c){const{transition:d,transitionEnd:u,...h}=c;for(const m in h)(i=this.node.getValue(m))==null||i.jump(h[m])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const r=this.node.animationState.setActive("exit",!t);n&&!t&&r.then(()=>{this.isExitComplete=!0,n(this.id)})}mount(){const{register:t,onExitComplete:n}=this.node.presenceContext||{};n&&n(this.id),t&&(this.unmount=t(this.id))}unmount(){}}const EN={animation:{Feature:TN},exit:{Feature:AN}};function oa(e){return{point:{x:e.pageX,y:e.pageY}}}const PN=e=>t=>ju(t)&&e(t,oa(t));function jr(e,t,n,s){return qr(e,t,PN(n),s)}const ob=({current:e})=>e?e.ownerDocument.defaultView:null,up=(e,t)=>Math.abs(e-t);function RN(e,t){const n=up(e.x,t.x),s=up(e.y,t.y);return Math.sqrt(n**2+s**2)}const hp=new Set(["auto","scroll"]);class lb{constructor(t,n,{transformPagePoint:s,contextWindow:r=window,dragSnapToOrigin:i=!1,distanceThreshold:o=3,element:l}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=p=>{this.handleScroll(p.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Ra(this.lastRawMoveEventInfo,this.transformPagePoint));const p=ul(this.lastMoveEventInfo,this.history),b=this.startEvent!==null,x=RN(p.offset,{x:0,y:0})>=this.distanceThreshold;if(!b&&!x)return;const{point:f}=p,{timestamp:g}=ke;this.history.push({...f,timestamp:g});const{onStart:v,onMove:k}=this.handlers;b||(v&&v(this.lastMoveEvent,p),this.startEvent=this.lastMoveEvent),k&&k(this.lastMoveEvent,p)},this.handlePointerMove=(p,b)=>{this.lastMoveEvent=p,this.lastRawMoveEventInfo=b,this.lastMoveEventInfo=Ra(b,this.transformPagePoint),ee.update(this.updatePoint,!0)},this.handlePointerUp=(p,b)=>{this.end();const{onEnd:x,onSessionEnd:f,resumeAnimation:g}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&g&&g(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const v=ul(p.type==="pointercancel"?this.lastMoveEventInfo:Ra(b,this.transformPagePoint),this.history);this.startEvent&&x&&x(p,v),f&&f(p,v)},!ju(t))return;this.dragSnapToOrigin=i,this.handlers=n,this.transformPagePoint=s,this.distanceThreshold=o,this.contextWindow=r||window;const c=oa(t),d=Ra(c,this.transformPagePoint),{point:u}=d,{timestamp:h}=ke;this.history=[{...u,timestamp:h}];const{onSessionStart:m}=n;m&&m(t,ul(d,this.history));const y={passive:!0,capture:!0};this.removeListeners=sa(jr(this.contextWindow,"pointermove",this.handlePointerMove,y),jr(this.contextWindow,"pointerup",this.handlePointerUp,y),jr(this.contextWindow,"pointercancel",this.handlePointerUp,y)),l&&this.startScrollTracking(l)}startScrollTracking(t){let n=t.parentElement;for(;n;){const s=getComputedStyle(n);(hp.has(s.overflowX)||hp.has(s.overflowY))&&this.scrollPositions.set(n,{x:n.scrollLeft,y:n.scrollTop}),n=n.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(t){const n=this.scrollPositions.get(t);if(!n)return;const s=t===window,r=s?{x:window.scrollX,y:window.scrollY}:{x:t.scrollLeft,y:t.scrollTop},i={x:r.x-n.x,y:r.y-n.y};i.x===0&&i.y===0||(s?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=i.x,this.lastMoveEventInfo.point.y+=i.y):this.history.length>0&&(this.history[0].x-=i.x,this.history[0].y-=i.y),this.scrollPositions.set(t,r),ee.update(this.updatePoint,!0))}updateHandlers(t){this.handlers=t}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),Sn(this.updatePoint)}}function Ra(e,t){return t?{point:t(e.point)}:e}function mp(e,t){return{x:e.x-t.x,y:e.y-t.y}}function ul({point:e},t){return{point:e,delta:mp(e,cb(t)),offset:mp(e,FN(t)),velocity:DN(t,.1)}}function FN(e){return e[0]}function cb(e){return e[e.length-1]}function DN(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,s=null;const r=cb(e);for(;n>=0&&(s=e[n],!(r.timestamp-s.timestamp>pt(t)));)n--;if(!s)return{x:0,y:0};s===e[0]&&e.length>2&&r.timestamp-s.timestamp>pt(t)*2&&(s=e[1]);const i=st(r.timestamp-s.timestamp);if(i===0)return{x:0,y:0};const o={x:(r.x-s.x)/i,y:(r.y-s.y)/i};return o.x===1/0&&(o.x=0),o.y===1/0&&(o.y=0),o}function MN(e,{min:t,max:n},s){return t!==void 0&&e<t?e=s?Z(t,e,s.min):Math.max(e,t):n!==void 0&&e>n&&(e=s?Z(n,e,s.max):Math.min(e,n)),e}function pp(e,t,n){return{min:t!==void 0?e.min+t:void 0,max:n!==void 0?e.max+n-(e.max-e.min):void 0}}function BN(e,{top:t,left:n,bottom:s,right:r}){return{x:pp(e.x,n,r),y:pp(e.y,t,s)}}function fp(e,t){let n=t.min-e.min,s=t.max-e.max;return t.max-t.min<e.max-e.min&&([n,s]=[s,n]),{min:n,max:s}}function IN(e,t){return{x:fp(e.x,t.x),y:fp(e.y,t.y)}}function LN(e,t){let n=.5;const s=We(e),r=We(t);return r>s?n=Wr(t.min,t.max-s,e.min):s>r&&(n=Wr(e.min,e.max-r,t.min)),Pt(0,1,n)}function $N(e,t){const n={};return t.min!==void 0&&(n.min=t.min-e.min),t.max!==void 0&&(n.max=t.max-e.min),n}const Oc=.35;function _N(e=Oc){return e===!1?e=0:e===!0&&(e=Oc),{x:gp(e,"left","right"),y:gp(e,"top","bottom")}}function gp(e,t,n){return{min:yp(e,t),max:yp(e,n)}}function yp(e,t){return typeof e=="number"?e:e[t]||0}const ON=new WeakMap;class zN{constructor(t){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=xe(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=t}start(t,{snapToCursor:n=!1,distanceThreshold:s}={}){const{presenceContext:r}=this.visualElement;if(r&&r.isPresent===!1)return;const i=h=>{n&&this.snapToCursor(oa(h).point),this.stopAnimation()},o=(h,m)=>{const{drag:y,dragPropagation:p,onDragStart:b}=this.getProps();if(y&&!p&&(this.openDragLock&&this.openDragLock(),this.openDragLock=CS(y),!this.openDragLock))return;this.latestPointerEvent=h,this.latestPanInfo=m,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),Mt(f=>{let g=this.getAxisMotionValue(f).get()||0;if(_t.test(g)){const{projection:v}=this.visualElement;if(v&&v.layout){const k=v.layout.layoutBox[f];k&&(g=We(k)*(parseFloat(g)/100))}}this.originPoint[f]=g}),b&&ee.update(()=>b(h,m),!1,!0),Fc(this.visualElement,"transform");const{animationState:x}=this.visualElement;x&&x.setActive("whileDrag",!0)},l=(h,m)=>{this.latestPointerEvent=h,this.latestPanInfo=m;const{dragPropagation:y,dragDirectionLock:p,onDirectionLock:b,onDrag:x}=this.getProps();if(!y&&!this.openDragLock)return;const{offset:f}=m;if(p&&this.currentDirection===null){this.currentDirection=VN(f),this.currentDirection!==null&&b&&b(this.currentDirection);return}this.updateAxis("x",m.point,f),this.updateAxis("y",m.point,f),this.visualElement.render(),x&&ee.update(()=>x(h,m),!1,!0)},c=(h,m)=>{this.latestPointerEvent=h,this.latestPanInfo=m,this.stop(h,m),this.latestPointerEvent=null,this.latestPanInfo=null},d=()=>{const{dragSnapToOrigin:h}=this.getProps();(h||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:u}=this.getProps();this.panSession=new lb(t,{onSessionStart:i,onStart:o,onMove:l,onSessionEnd:c,resumeAnimation:d},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:u,distanceThreshold:s,contextWindow:ob(this.visualElement),element:this.visualElement.current})}stop(t,n){const s=t||this.latestPointerEvent,r=n||this.latestPanInfo,i=this.isDragging;if(this.cancel(),!i||!r||!s)return;const{velocity:o}=r;this.startAnimation(o);const{onDragEnd:l}=this.getProps();l&&ee.postRender(()=>l(s,r))}cancel(){this.isDragging=!1;const{projection:t,animationState:n}=this.visualElement;t&&(t.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:s}=this.getProps();!s&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),n&&n.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(t,n,s){const{drag:r}=this.getProps();if(!s||!Fa(t,r,this.currentDirection))return;const i=this.getAxisMotionValue(t);let o=this.originPoint[t]+s[t];this.constraints&&this.constraints[t]&&(o=MN(o,this.constraints[t],this.elastic[t])),i.set(o)}resolveConstraints(){var i;const{dragConstraints:t,dragElastic:n}=this.getProps(),s=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(i=this.visualElement.projection)==null?void 0:i.layout,r=this.constraints;t&&os(t)?this.constraints||(this.constraints=this.resolveRefConstraints()):t&&s?this.constraints=BN(s.layoutBox,t):this.constraints=!1,this.elastic=_N(n),r!==this.constraints&&!os(t)&&s&&this.constraints&&!this.hasMutatedConstraints&&Mt(o=>{this.constraints!==!1&&this.getAxisMotionValue(o)&&(this.constraints[o]=$N(s.layoutBox[o],this.constraints[o]))})}resolveRefConstraints(){const{dragConstraints:t,onMeasureDragConstraints:n}=this.getProps();if(!t||!os(t))return!1;const s=t.current,{projection:r}=this.visualElement;if(!r||!r.layout)return!1;r.root&&(r.root.scroll=void 0,r.root.updateScroll());const i=TS(s,r.root,this.visualElement.getTransformPagePoint());let o=IN(r.layout.layoutBox,i);if(n){const l=n(jS(o));this.hasMutatedConstraints=!!l,l&&(o=Nv(l))}return o}startAnimation(t){const{drag:n,dragMomentum:s,dragElastic:r,dragTransition:i,dragSnapToOrigin:o,onDragTransitionEnd:l}=this.getProps(),c=this.constraints||{},d=Mt(u=>{if(!Fa(u,n,this.currentDirection))return;let h=c&&c[u]||{};(o===!0||o===u)&&(h={min:0,max:0});const m=r?200:1e6,y=r?40:1e7,p={type:"inertia",velocity:s?t[u]:0,bounceStiffness:m,bounceDamping:y,timeConstant:750,restDelta:1,restSpeed:10,...i,...h};return this.startAxisValueAnimation(u,p)});return Promise.all(d).then(l)}startAxisValueAnimation(t,n){const s=this.getAxisMotionValue(t);return Fc(this.visualElement,t),s.start(gu(t,s,0,n,this.visualElement,!1))}stopAnimation(){Mt(t=>this.getAxisMotionValue(t).stop())}getAxisMotionValue(t){const n=`_drag${t.toUpperCase()}`,r=this.visualElement.getProps()[n];return r||this.visualElement.getValue(t,this.visualElement.latestValues[t]??0)}snapToCursor(t){Mt(n=>{const{drag:s}=this.getProps();if(!Fa(n,s,this.currentDirection))return;const{projection:r}=this.visualElement,i=this.getAxisMotionValue(n);if(r&&r.layout){const{min:o,max:l}=r.layout.layoutBox[n],c=i.get()||0;i.set(t[n]-Z(o,l,.5)+c)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:t,dragConstraints:n}=this.getProps(),{projection:s}=this.visualElement;if(!os(n)||!s||!this.constraints)return;this.stopAnimation();const r={x:0,y:0};Mt(o=>{const l=this.getAxisMotionValue(o);if(l&&this.constraints!==!1){const c=l.get();r[o]=LN({min:c,max:c},this.constraints[o])}});const{transformTemplate:i}=this.visualElement.getProps();this.visualElement.current.style.transform=i?i({},""):"none",s.root&&s.root.updateScroll(),s.updateLayout(),this.constraints=!1,this.resolveConstraints(),Mt(o=>{if(!Fa(o,t,null))return;const l=this.getAxisMotionValue(o),{min:c,max:d}=this.constraints[o];l.set(Z(c,d,r[o]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;ON.set(this.visualElement,this);const t=this.visualElement.current,n=jr(t,"pointerdown",d=>{const{drag:u,dragListener:h=!0}=this.getProps(),m=d.target,y=m!==t&&DS(m);u&&h&&!y&&this.start(d)});let s;const r=()=>{const{dragConstraints:d}=this.getProps();os(d)&&d.current&&(this.constraints=this.resolveRefConstraints(),s||(s=WN(t,d.current,()=>this.scalePositionWithinConstraints())))},{projection:i}=this.visualElement,o=i.addEventListener("measure",r);i&&!i.layout&&(i.root&&i.root.updateScroll(),i.updateLayout()),ee.read(r);const l=qr(window,"resize",()=>this.scalePositionWithinConstraints()),c=i.addEventListener("didUpdate",({delta:d,hasLayoutChanged:u})=>{this.isDragging&&u&&(Mt(h=>{const m=this.getAxisMotionValue(h);m&&(this.originPoint[h]+=d[h].translate,m.set(m.get()+d[h].translate))}),this.visualElement.render())});return()=>{l(),n(),o(),c&&c(),s&&s()}}getProps(){const t=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:s=!1,dragPropagation:r=!1,dragConstraints:i=!1,dragElastic:o=Oc,dragMomentum:l=!0}=t;return{...t,drag:n,dragDirectionLock:s,dragPropagation:r,dragConstraints:i,dragElastic:o,dragMomentum:l}}}function vp(e){let t=!0;return()=>{if(t){t=!1;return}e()}}function WN(e,t,n){const s=Rm(e,vp(n)),r=Rm(t,vp(n));return()=>{s(),r()}}function Fa(e,t,n){return(t===!0||t===e)&&(n===null||n===e)}function VN(e,t=10){let n=null;return Math.abs(e.y)>t?n="y":Math.abs(e.x)>t&&(n="x"),n}class UN extends En{constructor(t){super(t),this.removeGroupControls=Ct,this.removeListeners=Ct,this.controls=new zN(t)}mount(){const{dragControls:t}=this.node.getProps();t&&(this.removeGroupControls=t.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||Ct}update(){const{dragControls:t}=this.node.getProps(),{dragControls:n}=this.node.prevProps||{};t!==n&&(this.removeGroupControls(),t&&(this.removeGroupControls=t.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const hl=e=>(t,n)=>{e&&ee.update(()=>e(t,n),!1,!0)};class HN extends En{constructor(){super(...arguments),this.removePointerDownListener=Ct}onPointerDown(t){this.session=new lb(t,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:ob(this.node)})}createPanHandlers(){const{onPanSessionStart:t,onPanStart:n,onPan:s,onPanEnd:r}=this.node.getProps();return{onSessionStart:hl(t),onStart:hl(n),onMove:hl(s),onEnd:(i,o)=>{delete this.session,r&&ee.postRender(()=>r(i,o))}}}mount(){this.removePointerDownListener=jr(this.node.current,"pointerdown",t=>this.onPointerDown(t))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let ml=!1;class qN extends w.Component{componentDidMount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:s,layoutId:r}=this.props,{projection:i}=t;i&&(n.group&&n.group.add(i),s&&s.register&&r&&s.register(i),ml&&i.root.didUpdate(),i.addEventListener("animationComplete",()=>{this.safeToRemove()}),i.setOptions({...i.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),ai.hasEverUpdated=!0}getSnapshotBeforeUpdate(t){const{layoutDependency:n,visualElement:s,drag:r,isPresent:i}=this.props,{projection:o}=s;return o&&(o.isPresent=i,t.layoutDependency!==n&&o.setOptions({...o.options,layoutDependency:n}),ml=!0,r||t.layoutDependency!==n||n===void 0||t.isPresent!==i?o.willUpdate():this.safeToRemove(),t.isPresent!==i&&(i?o.promote():o.relegate()||ee.postRender(()=>{const l=o.getStack();(!l||!l.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:t,layoutAnchor:n}=this.props,{projection:s}=t;s&&(s.options.layoutAnchor=n,s.root.didUpdate(),ku.postRender(()=>{!s.currentAnimation&&s.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:s}=this.props,{projection:r}=t;ml=!0,r&&(r.scheduleCheckAfterUnmount(),n&&n.group&&n.group.remove(r),s&&s.deregister&&s.deregister(r))}safeToRemove(){const{safeToRemove:t}=this.props;t&&t()}render(){return null}}function db(e){const[t,n]=Zv(),s=w.useContext(Jd);return a.jsx(qN,{...e,layoutGroup:s,switchLayoutGroup:w.useContext(ab),isPresent:t,safeToRemove:n})}const YN={pan:{Feature:HN},drag:{Feature:UN,ProjectionNode:Jv,MeasureLayout:db}};function bp(e,t,n){const{props:s}=e;e.animationState&&s.whileHover&&e.animationState.setActive("whileHover",n==="Start");const r="onHover"+n,i=s[r];i&&ee.postRender(()=>i(t,oa(t)))}class GN extends En{mount(){const{current:t}=this.node;t&&(this.unmount=ES(t,(n,s)=>(bp(this.node,s,"Start"),r=>bp(this.node,r,"End"))))}unmount(){}}class KN extends En{constructor(){super(...arguments),this.isActive=!1}onFocus(){let t=!1;try{t=this.node.current.matches(":focus-visible")}catch{t=!0}!t||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=sa(qr(this.node.current,"focus",()=>this.onFocus()),qr(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function wp(e,t,n){const{props:s}=e;if(e.current instanceof HTMLButtonElement&&e.current.disabled)return;e.animationState&&s.whileTap&&e.animationState.setActive("whileTap",n==="Start");const r="onTap"+(n==="End"?"":n),i=s[r];i&&ee.postRender(()=>i(t,oa(t)))}class QN extends En{mount(){const{current:t}=this.node;if(!t)return;const{globalTapTarget:n,propagate:s}=this.node.props;this.unmount=BS(t,(r,i)=>(wp(this.node,i,"Start"),(o,{success:l})=>wp(this.node,o,l?"End":"Cancel")),{useGlobalTarget:n,stopPropagation:(s==null?void 0:s.tap)===!1})}unmount(){}}const zc=new WeakMap,pl=new WeakMap,XN=e=>{const t=zc.get(e.target);t&&t(e)},JN=e=>{e.forEach(XN)};function ZN({root:e,...t}){const n=e||document;pl.has(n)||pl.set(n,{});const s=pl.get(n),r=JSON.stringify(t);return s[r]||(s[r]=new IntersectionObserver(JN,{root:e,...t})),s[r]}function eT(e,t,n){const s=ZN(t);return zc.set(e,n),s.observe(e),()=>{zc.delete(e),s.unobserve(e)}}const tT={some:0,all:1};class nT extends En{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var c;(c=this.stopObserver)==null||c.call(this);const{viewport:t={}}=this.node.getProps(),{root:n,margin:s,amount:r="some",once:i}=t,o={root:n?n.current:void 0,rootMargin:s,threshold:typeof r=="number"?r:tT[r]},l=d=>{const{isIntersecting:u}=d;if(this.isInView===u||(this.isInView=u,i&&!u&&this.hasEnteredView))return;u&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",u);const{onViewportEnter:h,onViewportLeave:m}=this.node.getProps(),y=u?h:m;y&&y(d)};this.stopObserver=eT(this.node.current,o,l)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:t,prevProps:n}=this.node;["amount","margin","root"].some(sT(t,n))&&this.startObserver()}unmount(){var t;(t=this.stopObserver)==null||t.call(this),this.hasEnteredView=!1,this.isInView=!1}}function sT({viewport:e={}},{viewport:t={}}={}){return n=>e[n]!==t[n]}const rT={inView:{Feature:nT},tap:{Feature:QN},focus:{Feature:KN},hover:{Feature:GN}},aT={layout:{ProjectionNode:Jv,MeasureLayout:db}},iT={...EN,...rT,...YN,...aT},G=SN(iT,NN),ub="flexspot-theme";function oT(){if(typeof window>"u")return"light";const e=localStorage.getItem(ub);return e==="light"||e==="dark"?e:"light"}function lT(){const[e,t]=w.useState(oT);w.useEffect(()=>{document.documentElement.setAttribute("data-theme",e),localStorage.setItem(ub,e)},[e]);const n=w.useCallback(()=>t(s=>s==="dark"?"light":"dark"),[]);return{theme:e,toggle:n}}function hb(){const[e,t]=w.useState(()=>120+Math.floor(Math.random()*80));return w.useEffect(()=>{const n=setInterval(()=>{t(s=>Math.max(60,s+Math.floor(Math.random()*21)-10))},6e3);return()=>clearInterval(n)},[]),e}const cT=[{to:"/",label:"Home",end:!0},{to:"/leaderboard",label:"Leaderboard"},{to:"/how-it-works",label:"How It Works"},{to:"/rewards",label:"Rewards"},{to:"/blog",label:"Blog"},{to:"/faq",label:"FAQ"}],dT="/flexspot/logo-crown-180.png";function mb({compact:e=!1}){return a.jsxs(_,{to:"/",className:"flex items-center gap-2.5 shrink-0 group","aria-label":"FlexSpot home",children:[a.jsx("img",{src:dT,alt:"FlexSpot crown logo",width:44,height:44,className:"w-11 h-11 rounded-[14px] object-cover shadow-[0_6px_16px_rgba(124,58,237,0.45)] ring-1 ring-white/20 group-hover:scale-[1.06] group-hover:rotate-[-3deg] transition-transform duration-300"}),!e&&a.jsx("span",{className:"leading-none hidden min-[380px]:block",children:a.jsxs("span",{className:"block font-display font-extrabold text-[22px] tracking-tight text-[var(--ink)]",children:["Flex",a.jsx("span",{className:"grad-text",children:"Spot"}),a.jsxs("span",{className:"lol-sticker","aria-hidden":"true",children:[a.jsx("span",{className:"lol-dot",children:"."}),a.jsx("span",{className:"lol-l",children:"L"}),a.jsx("span",{className:"lol-l",children:"O"}),a.jsx("span",{className:"lol-l",children:"L"})]})]})})]})}function uT({onClaim:e}){Ze();const{theme:t,toggle:n}=lT(),s=t==="dark";return a.jsx("header",{className:"fixed top-3 inset-x-3 sm:inset-x-6 z-40",children:a.jsx("div",{className:"header-glass max-w-7xl mx-auto bg-[var(--surface)]/80 backdrop-blur-2xl border border-[var(--line)] rounded-2xl shadow-[var(--shadow-lift)]",children:a.jsxs("div",{className:"px-4 sm:px-5 h-[68px] flex items-center justify-between gap-3",children:[a.jsx(mb,{}),a.jsx("nav",{className:"hidden lg:flex items-center gap-1","aria-label":"Primary",children:cT.map(r=>a.jsx(Ri,{to:r.to,end:r.end,className:({isActive:i})=>`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${i?"text-[var(--ink)] bg-[var(--surface-2)]":"text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--surface-2)]"}`,children:r.label},r.to))}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(_,{to:"/leaderboard",className:"hidden sm:grid place-items-center w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-2)] hover:text-[var(--ink)] hover:border-[var(--ink-3)] transition-colors",title:"Search brands","aria-label":"Search brands",children:a.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:[a.jsx("circle",{cx:"11",cy:"11",r:"7"}),a.jsx("path",{d:"m20 20-3.5-3.5"})]})}),a.jsx("button",{onClick:n,className:"grid place-items-center w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-2)] hover:text-[var(--ink)] hover:border-[var(--ink-3)] transition-colors",title:s?"Switch to light mode":"Switch to dark mode","aria-label":s?"Switch to light mode":"Switch to dark mode",children:s?a.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:[a.jsx("circle",{cx:"12",cy:"12",r:"4.5"}),a.jsx("path",{d:"M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8"})]}):a.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:a.jsx("path",{d:"M20 13.5A8.5 8.5 0 0 1 10.5 4 8.5 8.5 0 1 0 20 13.5Z"})})}),a.jsxs("button",{onClick:e,className:"btn-primary whitespace-nowrap px-4 sm:px-6 py-2.5 text-sm shrink-0",children:[a.jsx("span",{className:"hidden min-[420px]:inline",children:"Claim Your Spot From $1"}),a.jsx("span",{className:"min-[420px]:hidden",children:"Claim $1"})]})]})]})})})}const hT=110,mT=48,xp=.14;function q({children:e,className:t="",style:n,radius:s=hT,push:r=mT,label:i}){const o=w.useRef(null);return w.useEffect(()=>{var b;const l=o.current;if(!l||(b=window.matchMedia)!=null&&b.call(window,"(prefers-reduced-motion: reduce)").matches)return;let c=0,d=0,u=0,h=0,m=0;const y=x=>{const f=l.getBoundingClientRect(),g=f.left+f.width/2,v=f.top+f.height/2,k=g-x.clientX,N=v-x.clientY,T=Math.hypot(k,N)||1;if(T<s){const j=(1-T/s)*r;u=k/T*j,h=N/T*j}else u=0,h=0},p=()=>{c+=(u-c)*xp,d+=(h-d)*xp,Math.abs(c)>.05||Math.abs(d)>.05||u!==0||h!==0?l.style.transform=`translate3d(${c.toFixed(1)}px,${d.toFixed(1)}px,0)`:l.style.transform&&(l.style.transform=""),m=requestAnimationFrame(p)};return window.addEventListener("mousemove",y,{passive:!0}),m=requestAnimationFrame(p),()=>{window.removeEventListener("mousemove",y),cancelAnimationFrame(m)}},[s,r]),a.jsx("span",{ref:o,className:`pointer-events-none inline-block will-change-transform ${t}`,style:n,"aria-hidden":i?void 0:!0,role:i?"img":void 0,"aria-label":i,children:e})}const kp=[{to:"/",label:"Home",icon:e=>a.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:e?2.4:2,strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("path",{d:"M3 10.5 12 3l9 7.5"}),a.jsx("path",{d:"M5 9.5V21h14V9.5"}),a.jsx("path",{d:"M9.5 21v-6h5v6"})]})},{to:"/leaderboard",label:"Ranks",icon:e=>a.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:e?2.4:2,strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("path",{d:"M8 21h8"}),a.jsx("path",{d:"M12 17v4"}),a.jsx("path",{d:"M7 4h10v5a5 5 0 0 1-10 0V4Z"}),a.jsx("path",{d:"M7 6H4a1 1 0 0 0-1 1c0 2 1.5 3.5 4 3.5"}),a.jsx("path",{d:"M17 6h3a1 1 0 0 1 1 1c0 2-1.5 3.5-4 3.5"})]})},{to:"/explore",label:"Explore",icon:e=>a.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:e?2.4:2,strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("circle",{cx:"12",cy:"12",r:"9"}),a.jsx("path",{d:"m15.5 8.5-2 5-5 2 2-5 5-2Z"})]})},{to:"/winners",label:"Winners",icon:e=>a.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:e?2.4:2,strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("circle",{cx:"12",cy:"9",r:"6"}),a.jsx("path",{d:"m8.5 14-1.5 7 5-3 5 3-1.5-7"})]})}];function pT({onClaim:e}){return a.jsx("nav",{className:"lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] backdrop-blur-xl border-t border-[var(--line-soft)] pb-safe","aria-label":"Mobile",children:a.jsxs("div",{className:"grid grid-cols-5 items-end px-2 pt-1.5 pb-2",children:[kp.slice(0,2).map(t=>a.jsx(Ri,{to:t.to,end:t.to==="/",className:({isActive:n})=>`flex flex-col items-center gap-1 py-1.5 text-[10px] font-bold transition-colors ${n?"text-[var(--blaze)]":"text-[var(--ink-3)]"}`,children:({isActive:n})=>a.jsxs(a.Fragment,{children:[t.icon(n),t.label]})},t.to)),a.jsxs("button",{onClick:e,className:"flex flex-col items-center gap-1 -mt-6","aria-label":"Claim your spot",children:[a.jsx("span",{className:"grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-[var(--blaze)] to-[var(--gold)] text-white shadow-[var(--shadow-blaze)] border-4 border-[var(--bg)] active:scale-95 transition-transform",children:a.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:a.jsx("path",{d:"M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z",fill:"#fff"})})}),a.jsx("span",{className:"text-[10px] font-bold text-[var(--blaze)]",children:"Start $1"})]}),kp.slice(2).map(t=>a.jsx(Ri,{to:t.to,className:({isActive:n})=>`flex flex-col items-center gap-1 py-1.5 text-[10px] font-bold transition-colors ${n?"text-[var(--blaze)]":"text-[var(--ink-3)]"}`,children:({isActive:n})=>a.jsxs(a.Fragment,{children:[t.icon(n),t.label]})},t.to))]})})}const jp=120,fT=54,Sp=.14;function Eu({items:e}){const t=w.useRef(null),n=w.useRef([]),s=w.useRef(e);return s.current=e,w.useEffect(()=>{var h;const r=t.current;if(!r||(h=window.matchMedia)!=null&&h.call(window,"(prefers-reduced-motion: reduce)").matches)return;const i={mouse:null,spots:[]},o=()=>{const m=r.getBoundingClientRect();i.spots=s.current.map(y=>({x:parseFloat(y.left)/100*m.width,y:parseFloat(y.top)/100*m.height,ox:0,oy:0}))};o(),window.addEventListener("resize",o);const l=m=>{i.mouse={x:m.clientX,y:m.clientY}},c=()=>{i.mouse=null};window.addEventListener("mousemove",l,{passive:!0}),document.documentElement.addEventListener("mouseleave",c);let d=0;const u=()=>{const m=r.getBoundingClientRect();let y=null,p=null;if(i.mouse){const x=i.mouse.x-m.left,f=i.mouse.y-m.top;x>-90&&x<m.width+90&&f>-90&&f<m.height+90&&(y=x,p=f)}i.spots.forEach((b,x)=>{let f=0,g=0;if(y!==null){const k=b.x-y,N=b.y-p,T=Math.hypot(k,N)||1;if(T<jp){const j=(1-T/jp)*fT;f=k/T*j,g=N/T*j}}b.ox+=(f-b.ox)*Sp,b.oy+=(g-b.oy)*Sp;const v=n.current[x];v&&(v.style.transform=`translate3d(${b.ox.toFixed(1)}px,${b.oy.toFixed(1)}px,0)`)}),d=requestAnimationFrame(u)};return d=requestAnimationFrame(u),()=>{cancelAnimationFrame(d),window.removeEventListener("resize",o),window.removeEventListener("mousemove",l),document.documentElement.removeEventListener("mouseleave",c)}},[]),a.jsx("div",{ref:t,className:"pointer-events-none absolute inset-0 overflow-hidden","aria-hidden":"true",children:e.map((r,i)=>a.jsx("span",{ref:o=>{n.current[i]=o},className:`absolute ${r.cls||""}`,style:{left:r.left,top:r.top,willChange:"transform"},children:a.jsx("span",{className:"anim-floaty block",style:{fontSize:r.size||28,animationDelay:r.delay||`${-i*1.4}s`,opacity:r.opacity??.55,filter:"saturate(1.2)"},children:r.emoji})},i))})}const gT='# FlexSpot Blog — Post Format Contract\n\nPosts live in `src/content/blog/*.md`. **Filename (kebab-case) = slug**, e.g. `how-boosts-work.md` → `/blog/how-boosts-work`.\n`README.md` in this folder is the contract doc — the engine excludes it from posts.\n\n## Frontmatter (required, YAML between the `---` fences)\n\n```yaml\n---\ntitle: "Your Post Title (50–60 chars ideal)"\ndescription: "150–160 characters. This becomes the meta description and the card blurb."\ndate: 2026-09-23          # YYYY-MM-DD, used for sorting (newest first)\nauthor: "FlexSpot Team"    # or the author\'s name\ncategory: "Getting Started" # ONE of the categories below\nkeywords:                 # YAML list, used by on-site search\n  - flexspot\n  - brand visibility\npillar: false             # true = pillar guide (long, hub page), false = cluster post\nrelated:                  # optional: slugs of posts this one links to\n  - getting-started-with-flexspot\nsample: false             # content team: leave false. Posts with `sample: true`\n                          # are engine demos — visible in the index but excluded\n                          # from related-post picks and the sitemap.\nimage: "/og-cover.png"    # optional: social/OG image path\n---\n```\n\n### Allowed categories (exact spelling)\n\n- `Visibility Guides`\n- `Small Business Marketing`\n- `Viral Marketing`\n- `UAE & Dubai`\n- `Bidding Strategy`\n- `Getting Started`\n\n## Body format (required)\n\n1. **First block** MUST be a Key Takeaways callout, as a blockquote:\n   ```md\n   > **Key takeaways:**\n   > - First takeaway…\n   > - Second takeaway…\n   ```\n   3–5 bullets. The engine renders this as a styled callout box.\n\n2. Then standard markdown: `##` and `###` headings, paragraphs, `-` lists,\n   `1.` numbered lists, `**bold**`, `*italic*`, `` `inline code` ``, fenced\n   code blocks, `[links](https://…)`, and `![images](…)`.\n\n3. `##` headings become the article\'s table of contents (auto-linked by slug).\n\n## Content rules\n\n- **Original, substantive prose.** Write like a human expert, not filler.\n- **No fake claims or stats.** Never invent numbers ("10,000 brands"), rankings,\n  study results, or quotes. Only state what is verifiably true about FlexSpot.\n- Pillars (`pillar: true`) are the hub guides: long, evergreen, link out to\n  cluster posts via `related`. Clusters are shorter and link back to their pillar.\n- Internal links: prefer relative `/blog/<slug>` links so they stay correct on\n  preview and production.\n\n## How the engine consumes posts\n\n- `src/lib/blog.js` parses frontmatter with a tiny zero-dependency parser and\n  loads every post at build time via Vite\'s `import.meta.glob(\'../content/blog/*.md\', { query: \'?raw\', import: \'default\', eager: true })`.\n- Exposed helpers: `allPosts`, `getPost(slug)`, `postsByCategory`, `relatedPosts`,\n  `searchPosts`, `paginate`, `publicPosts` (samples excluded — for sitemap/related).\n- Routes: `/blog` (paginated index, 12/page, `?cat=` filter, search) and\n  `/blog/:slug` (article with TOC, share buttons, related, prev/next).\n- SEO: per-post title/meta/OG/Twitter/canonical + `BlogPosting` and\n  `BreadcrumbList` JSON-LD, wired through the existing `pageMeta.js` /\n  `<PageHead/>` system. Sample posts are excluded from sitemap tooling.\n',yT=`---
title: "How to Advertise in Dubai for Under AED 100"
description: "Cheapest way to advertise in Dubai on a micro budget: realistic sub-AED-100 tactics for small businesses, from community groups to a $1 leaderboard bid."
date: 2026-09-23
author: "FlexSpot Team"
category: "UAE & Dubai"
keywords:
  - cheapest way to advertise in Dubai
  - advertise in Dubai small budget
  - cheap advertising Dubai
  - advertise Dubai under 100 AED
pillar: false
related:
  - cheap-ways-to-advertise-a-small-business
  - small-business-advertising-ideas-under-50
  - where-can-i-advertise-my-business-for-free
sample: false
image: "/og-cover.png"
---

> **Key takeaways:**
> - At roughly AED 3.67 to the dollar, AED 100 is about $27 — enough to test several micro-tactics, but not enough for a real Google or Meta campaign.
> - Dubai's cheapest effective channels are community-driven: WhatsApp groups, Facebook communities, and classifieds.
> - Free foundations (Google Business Profile, TikTok organic) cost nothing and compound over time.
> - One paid anchor — like a $1 (~AED 3.67) public leaderboard bid — guarantees visibility while the free tactics ramp up.

## The AED 100 reality check

Dubai is an expensive ad market. Google Search and Meta campaigns that
actually move the needle here typically need monthly budgets in the
thousands of dirhams — the auction is crowded with real estate, automotive,
and e-commerce advertisers bidding aggressively. With AED 100 (about $27 at
the long-standing ~3.67 peg), you're not running a "campaign" on the big
platforms. You're running experiments.

That's fine. Experiments are how small budgets win — you just have to run
them where AED 100 is real money. Here's where it is.

## Free first: the foundations that cost nothing

### Claim your Google Business Profile

If you serve customers in a physical location — or even a service area —
this is the single highest-ROI free action in Dubai marketing. When someone
searches "salon near me" or "car wash JLT," the map pack decides. Complete
every field, add real photos, post weekly updates, and reply to every
review. It costs zero dirhams and it works in every city on earth, Dubai
included.

### Post where Dubai actually scrolls: TikTok and Instagram Reels

Organic short video remains the cheapest reach available in the UAE.
Behind-the-scenes clips, before-and-afters, price reveals, and "day in the
life" content from a real Dubai business travel far — the algorithm doesn't
care about your ad budget. One genuine, useful video a day beats a AED 500
boost of a boring one.

## The community channels (AED 0)

### Facebook and WhatsApp community groups

Dubai runs on groups: neighborhood groups (Marina, JLT, Deira, Mirdif…),
expat community groups, buy-and-sell groups, and industry groups. Most allow
business posts on specific days or in dedicated threads. Read the rules,
contribute genuinely, and post your offer where it's welcome. A single good
post in a 40,000-member community group can outperform a week of cheap ads.

### WhatsApp broadcast lists

If you have even a small customer list, a WhatsApp broadcast (not a spammy
group — a broadcast list people opted into) is the highest-open-rate channel
you own. Announce offers, new stock, and openings directly. Cost: nothing.
Just don't abuse it — one or two messages a week, always with something
worth opening.

## Classifieds and marketplaces (AED 0–50)

Dubizzle and OpenSooq remain heavily browsed in the UAE for services,
freelance work, and second-hand goods. Basic listings are free; small paid
bumps cost a few dozen dirhams and can be worth testing for a single
high-margin offer. Treat classifieds like a storefront: good photos, clear
pricing, fast replies.

## Micro-influencer barter (AED 0–100)

Dubai has thousands of micro-creators (a few thousand followers) in food,
beauty, fitness, and lifestyle niches. Many will post an honest review in
exchange for your product or service — no cash involved. A AED 80 meal or a
free haircut that reaches 5,000 local followers is advertising at a price no
ad platform can match. DM ten, expect three replies, do one well.

## Your one paid anchor: guaranteed visibility from ~AED 3.67

Free tactics ramp up slowly. If you want guaranteed eyes this week, you
need one paid placement — and at this budget it has to be cheap and certain,
not an auction where AED 100 vanishes by Tuesday.

A public leaderboard bid starts at $1 — about AED 3.67. You claim a visible
spot, your brand sits in front of everyone browsing the board, and you can
outbid competitors to climb higher. It's global visibility for less than a
karak tea, and the competition format gives people a reason to look twice.
For a Dubai micro-business that can't outspend the big advertisers, that's
the whole game: don't outspend them, out-position them.

## What NOT to spend AED 100 on

- **Boosting a random Instagram post** to a broad Dubai audience — you'll get
  likes from people who'll never buy.
- **Cheap "traffic packages" or bulk followers** — bots don't buy shawarma,
  book appointments, or download apps.
- **A Google Search campaign with AED 100** — in Dubai's auction, that's a
  handful of clicks and zero learnings.

If you want the fuller playbook these tactics come from, read
[cheap ways to advertise a small business](/blog/cheap-ways-to-advertise-a-small-business)
and [where to advertise your business for free](/blog/where-can-i-advertise-my-business-for-free).

## Frequently asked questions

**What is the cheapest way to advertise in Dubai?**
The cheapest effective channels are free: Google Business Profile, TikTok
and Reels organic content, Facebook/WhatsApp community groups, and
classifieds like Dubizzle. For paid, micro-influencer barter and a $1
(~AED 3.67) leaderboard bid are the lowest-cost options that deliver real
visibility.

**How much does it cost to advertise on Google in Dubai?**
Realistic Google Search campaigns in Dubai typically require monthly
budgets in the thousands of dirhams to compete, especially in real estate,
automotive, and e-commerce categories. Micro-businesses are usually better
off starting with the free and community channels in this guide.

**Is AED 100 enough for Facebook or Instagram ads in Dubai?**
AED 100 (about $27) can run a small test — a few days at a low daily
budget — but it's rarely enough to get statistically meaningful results in
Dubai's competitive auction. Use it to test creative, not to expect sales.

**Can a small Dubai business get noticed without paid ads?**
Yes. Community groups, WhatsApp broadcasts, Google Business Profile, and
consistent short video content have launched countless Dubai micro-businesses
with zero ad spend. Paid placements just speed up what the free channels
start.
`,vT=`---
title: "Affiliate Marketing for Small Businesses: Is It Worth It?"
description: "Affiliate marketing for small business, honestly explained: how it works, real costs, when it beats ads, and how to launch a lean program that pays for itself."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Small Business Marketing"
keywords:
  - affiliate marketing for small business
  - small business affiliate program
  - affiliate marketing worth it
  - start affiliate program
pillar: false
related:
  - referral-marketing
  - referral-program-ideas
  - how-to-start-a-referral-program
sample: false
---

> **Key takeaways:**
> - Affiliate marketing means paying partners a commission for sales they drive — you pay for results, not impressions.
> - For small businesses it's worth it when margins allow 10–30% commissions and affiliates can authentically reach your buyers.
> - Start lean: 5–20 hand-picked affiliates, simple terms, reliable tracking, and fast payouts.
> - The difference from referrals: affiliates are recruited partners, not existing customers — the relationship and rewards are professional, not personal.

## How affiliate marketing actually works

An affiliate promotes your product to their audience — a blog post, a video, a newsletter mention, a social post — using a tracked link or code. When someone buys through it, the affiliate earns a commission. You get a sale you wouldn't have had; they get paid for performance; the customer gets a recommendation from a voice they trust.

The model is simple and the economics are attractive: unlike ads, where you pay for clicks and hope, you pay only when revenue lands. For a small business watching every dollar, performance-based marketing deserves a serious look.

## Referrals vs. affiliates: know the difference

They're often lumped together, but the mechanics and relationships differ:

- **Referrals** come from existing customers recommending something they use. Rewards are modest, friendly, and often two-sided. The motivation is genuine enthusiasm plus a thank-you.
- **Affiliates** are recruited partners — creators, bloggers, niche sites — promoting professionally for commission. Commissions are larger, one-sided, and contractual. The motivation is business.

Most small businesses should start with referrals (your happy customers are already there) and add affiliates when they need reach beyond their customer base. The two programs can coexist with different terms — just keep them clearly separated so customers don't feel like salespeople and affiliates don't feel underpaid.

## The honest math: is it worth it?

Affiliate marketing is worth it when three conditions hold:

1. **Your margins can carry the commission.** If your product has healthy margins (typical for digital products, courses, SaaS, and high-margin physical goods), paying 10–30% per sale still leaves you profitable — especially since there's no upfront ad spend. If margins are razor-thin, the math breaks.
2. **Affiliates can authentically reach your buyers.** The channel works when affiliates genuinely serve your target audience — the fitness creator for your supplement, the business blogger for your tool. If no natural affiliate ecosystem exists in your niche, you'll spend more recruiting than you earn.
3. **Your funnel converts.** Affiliates send traffic; your site closes it. If your conversion rate is weak, affiliates will try you once, see no commissions, and leave. Fix the funnel first.

The costs people forget: tracking software or platform fees, time spent recruiting and supporting affiliates, commission payouts (obviously), and the management overhead of a growing partner list. It's performance-based, not free.

## Designing your program: the decisions

- **Commission structure:** Percentage of sale (standard for most), flat fee per sale (simpler for fixed-price products), or tiered (higher rates for top performers). Start competitive for your niche — affiliates compare programs.
- **Cookie / attribution window:** How long after the click a purchase still credits the affiliate. 30 days is common; longer windows attract better affiliates but cost more.
- **Payout terms:** Minimum threshold (keep it reachable — high minimums demotivate small affiliates), payout frequency (monthly is standard), and method. Fast, reliable payouts are a competitive advantage in recruiting.
- **What affiliates get:** Beyond the link — product access, brand assets, performance data, a real human to contact. Supported affiliates produce; abandoned ones don't.
- **Rules:** No bidding on your brand terms in ads (unless you allow it), no spam, no misleading claims, disclosure requirements. Write them down before the first signup.

## Launching lean: the first 90 days

**Days 1–14: Set up.** Choose tracking (affiliate platform, e-commerce plugin, or simple tracked codes at small scale), write your terms, build the affiliate signup page and asset kit.

**Days 15–45: Recruit your first 10.** Hand-pick them — creators and sites already serving your audience. Personal outreach, not mass email. Offer founding-affiliate terms (slightly better commission) to the first batch.

**Days 46–90: Support and learn.** Give your affiliates what converts — the angles, the assets, the data on what's selling. Watch which affiliates produce and why. Double down on what works, quietly part ways with what doesn't.

Resist the urge to recruit hundreds on day one. Ten engaged affiliates outperform a hundred dormant signups, and a small program lets you learn the economics before scaling.

## Red flags and how to avoid them

- **Coupon-site affiliates** who add no value but claim commission on customers who'd have bought anyway. Decide your policy on coupon sites upfront.
- **Brand-term bidding** by affiliates driving up your own ad costs. Prohibit it unless it's genuinely incremental.
- **Fake or incentivized traffic.** Affiliates who buy junk traffic to farm commissions. Monitor traffic quality, not just sales volume.
- **Disclosure failures.** Affiliates must disclose the commercial relationship — it's the law in most markets, and undisclosed shilling destroys trust when exposed. Require it in your terms.

## When affiliates beat ads (and when they don't)

Affiliates win when trust matters more than targeting — considered purchases, niche products, audiences that ignore ads. They lose when you need instant scale (affiliate programs ramp over months), when margins can't carry commissions, or when your niche has no natural affiliate ecosystem. The honest answer to "is it worth it" is: run the margin math, talk to five potential affiliates, and pilot with ten. Ninety days of real data beats any article — including this one.

One more consideration: affiliate relationships compound. A creator who promotes you this year, paid fairly and supported well, becomes a louder advocate next year. Treat affiliates as partners, pay them fast, and the channel grows itself.

## The affiliate starter kit: what to prepare before recruiting

Affiliates judge programs fast. Have these ready before your first outreach: a one-page program overview (commission, cookie window, payout terms — no fine-print surprises), a signup page that takes under three minutes, brand assets (logos, product images, approved copy angles), product access so affiliates can genuinely try what they promote, a swipe file of email/social copy they can adapt, and a named contact who answers questions within a day. Programs that look professional recruit professionals. Programs that look thrown together attract affiliates who'll treat you the same way. The kit doesn't need to be fancy — it needs to exist, be accurate, and make an affiliate's first promotion easy.

## How to evaluate affiliate platforms and tools

When you're ready to move beyond spreadsheets, evaluate tools on five criteria: **tracking reliability** (accurate attribution across devices and browsers — this is non-negotiable), **payout handling** (does it pay affiliates directly, or do you?), **fraud controls** (duplicate detection, suspicious-pattern flags), **affiliate experience** (a clean dashboard affiliates will actually log into), and **cost structure** (flat fee vs. percentage of commissions — model it against your expected volume). Most small businesses outgrow manual tracking somewhere between 30 and 100 active affiliates; before that, the tool is overhead. After that, it's infrastructure. Switch when the spreadsheet starts lying to you, not before.
`,bT=`---
title: "Banner Ads vs. Sponsored Placements: Which Gets More Attention?"
description: "Banner ads vs sponsored placements compared honestly: attention quality, cost, trust, and when small brands should choose each format — or combine both."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Bidding Strategy"
keywords:
  - banner ads vs sponsored placements
  - banner ads vs sponsorships
  - display ads vs featured placement
  - banner ad effectiveness
pillar: false
related:
  - homepage-sponsorships
  - featured-placement-advertising
  - what-is-bid-for-attention-marketing
sample: false
---

> **Key takeaways:**
> - Banner ads buy cheap, scalable reach; sponsored placements buy prominent, trusted visibility. They solve different problems.
> - Attention quality favors placements: fixed, prominent positions get noticed and remembered far more than rotating ad slots.
> - Cost efficiency favors banners at scale — but only if the impressions are real and the targeting is right.
> - Most small brands do best combining both: placements for presence and discovery, banners for retargeting and scale.

## The honest comparison

| | Banner / display ads | Sponsored placements |
|---|---|---|
| **What you buy** | Impressions across ad networks | A fixed, prominent position on a specific site |
| **Attention quality** | Low — rotating slots, ad blindness, blockers | High — prominent, persistent, part of the page |
| **Trust transfer** | None — clearly an ad | Real — association with the host site |
| **Targeting** | Precise (demographics, behavior, intent) | By site choice (audience fit, not micro-targeting) |
| **Scale** | Near-infinite | Limited to the site's inventory |
| **Cost structure** | CPM/CPC auction, scales with spend | Flat, bid-based, or negotiated per placement |
| **Best for** | Retargeting, scale, testing creative fast | Discovery, credibility, visible presence |
| **Biggest risk** | Bot traffic, fraud, invisibility | Wrong site choice, overpaying for weak placement |

Neither is "better" universally. The right choice depends on what you're buying: reach or attention.

## Why banner ads underperform (and when they don't)

The case against banners is well known: **banner blindness** (users unconsciously ignore ad-shaped rectangles), **ad blockers** (a large share of tech-savvy audiences never sees them), **accidental clicks** (fat-finger taps that cost you money), and **fraud** (bot traffic and fake impressions remain a real problem in programmatic). Click-through rates on standard display are tiny, and a meaningful share of impressions are never actually viewable.

But banners have genuine strengths: they're unmatched for **retargeting** (showing your brand to people who already visited your site is cheap and effective), for **testing creative** quickly across audiences, and for **scale** once you know what works. The mistake isn't using banner ads — it's using them as your *discovery* channel, where their weaknesses hurt most.

## Why sponsored placements win on attention

A sponsored placement — a homepage feature, a leaderboard spot, a newsletter mention — gets what banners structurally can't:

- **Prominence.** It's in the content flow, above the fold, impossible to miss. Position is guaranteed, not auctioned per impression.
- **Persistence.** It stays put for the whole sponsorship period. Repeat visitors see it repeatedly, which is how brand familiarity actually builds.
- **Context and trust.** It appears as part of a site the visitor chose to visit. The endorsement-by-association effect is real and measurable in brand-lift studies.
- **Ad-blocker immunity.** Sponsored placements are part of the page, not ad-network inventory. They reach the audiences banners can't.
- **Shareability.** Nobody screenshots a banner ad. People screenshot leaderboard positions, featured spots, and clever sponsorships — the placement itself becomes content.

The trade-off: you can't micro-target, you can't scale infinitely, and a bad site choice wastes the whole budget. Placement quality is everything.

## The cost question, answered honestly

Per impression, banners are cheaper — often dramatically so. Per *noticed* impression, the math flips: a large share of banner impressions are never seen, never viewable, or served to bots, while a sponsored placement's impressions are overwhelmingly real humans looking at the page. The honest metric is **cost per attentive human**, and on that basis quality placements frequently win — especially on niche sites where the audience matches your buyers.

The practical budgeting rule: don't compare CPM to sponsorship price directly. Compare what each channel delivers in attributable outcomes (leads, sales, branded-search lift) over the same period. Run both small, measure honestly, and let the numbers decide the split.

## When to choose each

**Choose banner ads when:** you're retargeting warm audiences, testing which creative resonates, scaling a proven message, or need precise demographic targeting.

**Choose sponsored placements when:** you need discovery and credibility, you're launching something new, your buyers gather on specific sites or in specific newsletters, or your audience skews ad-blocker-heavy.

**Combine them when:** you can afford both — placements create the awareness and familiarity, banners (especially retargeting) harvest the demand. This is the highest-performing setup for most small brands: be *seen* where it matters, then *follow up* everywhere else.

## The verdict

If the question is "which gets more attention," sponsored placements win — prominence, persistence, and trust beat rotating ad slots on attention quality every time. If the question is "which gets more reach per dollar," banners win — scale and targeting are what ad networks are for. The brands that grow fastest stop treating it as either/or: they buy attention where attention lives, and buy reach where reach is cheap. Start with one quality placement to establish presence, add retargeting banners to capture the interest it creates, and measure both against the same outcomes.

## A note on the emerging middle ground

The line between the two is blurring. Bid-for-attention marketplaces combine the placement's prominence with auction-style pricing; programmatic "premium" tiers sell guaranteed prominent positions through ad tech; sponsored content in feeds behaves like a placement but buys like an ad. As you evaluate options, worry less about the label and more about the properties that matter: Is the position prominent and guaranteed? Is the audience real and well-matched? Is the pricing transparent? Can you measure the outcome? Whatever the format is called, those four questions separate attention worth buying from money worth keeping.

## Running the comparison yourself: a 30-day test

Stop debating and run the experiment: pick one quality sponsored placement and one banner campaign (retargeting, to give banners their best shot) with equal budgets. Tag everything with UTMs, point both at equivalent landing pages, and let them run a full 30 days. Then compare on the metrics that matter — cost per lead or sale, branded-search lift, and assisted conversions, not just clicks. Most small brands are surprised by the result: placements usually win on attention quality and brand lift, banners on efficient follow-up. The test doesn't just settle the debate — it gives you the exact budget split for next quarter. And whatever wins, keep the loser in a supporting role: attention needs follow-up, and follow-up needs something worth following up on.

## Creative tips for each format

The format decides the creative: **banner ads** need brutal simplicity — five words, one image, one button — because they get a fraction of a second; test relentlessly, since creative fatigue sets in fast at scale. **Sponsored placements** can carry more substance — a real headline, a genuine proof point, a clear offer — because the visitor is actually looking at the page; match the host site's visual tone so the placement feels native rather than slapped on. **Bid-for-attention leaderboard spots** need personality above all: the brands that climb fastest pair a clear value proposition with a voice people enjoy rooting for, because spectators choose favorites. Whatever the format, one rule holds everywhere: clarity beats cleverness when attention is scarce, and personality wins when attention is abundant.
`,wT=`---
title: "Brand Awareness Strategies That Work Without a Big Budget"
description: "Brand awareness strategies for small budgets: content, community, partnerships, and PR tactics that make your brand memorable — no big ad spend. that compound."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Visibility Guides"
keywords:
  - brand awareness strategies
  - increase brand awareness
  - brand awareness small business
  - build brand awareness
pillar: false
related:
  - how-to-increase-brand-visibility
  - brand-visibility-vs-brand-awareness
  - ways-to-get-your-business-noticed-online
---

> **Key takeaways:**
> - Brand awareness = being remembered; it's built from repeated, distinctive encounters — not from one big campaign.
> - The budget-friendly awareness stack: sharp positioning, consistent identity, useful content, community presence, and borrowed credibility.
> - Measure awareness with branded search, direct traffic, and "how did you hear about us" — not follower counts.
> - Awareness compounds: every memorable encounter raises the value of the next one.
> - Avoid awareness theater — impressions without memory are just expensive noise.

## Awareness vs. visibility: the 30-second version

Visibility is being *seen*; awareness is being *remembered*. You can buy
visibility for a day, but awareness has to be earned through repeated,
distinctive encounters. (Full breakdown: [Brand Visibility vs. Brand
Awareness](/blog/brand-visibility-vs-brand-awareness).)

This matters for budgeting because the two need different tactics. Visibility
tactics maximize encounters; awareness tactics maximize *memory per
encounter*. This post is about the second — making the encounters you get
actually stick.

## Strategy 1: Sharpen the positioning until it's quotable

Nobody remembers "quality solutions for modern businesses." People remember
sharp, specific claims: the cheapest, the fastest, the one for left-handed
guitarists, the agency that answers in an hour.

Exercise: finish this sentence in under 10 words — "We're the ___ for ___."
If you can't, your awareness problem is actually a positioning problem, and no
tactic below will fix it. Test your line on five people; if they can repeat it
back a day later, it's working.

## Strategy 2: Build a consistent, distinctive identity

Memory runs on pattern recognition. Every touchpoint should look and sound
like the same brand:

- **One visual system:** same colors, same typography feel, same image style
  everywhere — website, social, packaging, signage, email.
- **One voice:** write down 3 adjectives for how you sound (e.g., "direct,
  warm, a bit cheeky") and check content against them.
- **One signature element:** a color, a mascot, a phrase, a format — something
  people recognize with the logo covered.

Small brands often think they need *more* creative variety. They need the
opposite: relentless consistency until recognition clicks.

## Strategy 3: Teach something (content as awareness)

Useful content builds awareness differently than ads do: instead of
interrupting, you're invited in. Someone who learned from you remembers you as
"the people who taught me X" — a durable, positive association.

- Answer your buyers' real questions weekly (blog, video, newsletter — pick
  your format).
- Share genuine process and results, not just tips. "Here's exactly how we
  did it" beats "5 tips for success."
- Give your frameworks names. Named concepts ("The 90-Day Visibility Sprint")
  get repeated; generic advice doesn't.

## Strategy 4: Be a real presence in real communities

Awareness grows fastest where people talk to each other. Pick 2–3 communities
where your buyers gather and become a known, helpful fixture:

- Answer questions thoroughly and regularly.
- Share wins, lessons, and honest takes — not pitches.
- Show up consistently for months. Familiarity is the mechanism; there's no
  shortcut.

Community-built awareness is unusually durable because it's attached to
relationships, not impressions.

## Strategy 5: Borrow credibility

People remember brands introduced by sources they trust:

- **Press and expert quotes:** one quote in a respected publication transfers
  its credibility to you — and lives in search results permanently.
- **Podcast appearances:** 30 minutes of conversation builds more familiarity
  than 30 ad impressions.
- **Partnerships:** co-created content, joint events, and endorsements from
  complementary brands.
- **Customer proof:** testimonials, case studies, and user-generated content.
  Prospects remember stories about people like them.

Each borrowed-credibility moment should be captured and reused: quote it on
your site, share it socially, reference it in pitches.

## Strategy 6: Create memorable moments

Awareness loves the remarkable — things worth talking about:

- A genuinely useful free tool or resource for your niche.
- A public challenge, build-in-public journey, or transparent experiment.
- Exceptional customer experiences that people *tell friends about* (the best
  awareness tactic has always been remarkable service).
- A strong, honest point of view on your industry's sacred cows.

You don't need stunts. You need one or two things per year that make people
say "did you see what they did?"

## Strategy 7: Stay in touch (the repetition layer)

Awareness decays without reinforcement. The cheapest reinforcement channels:

- **Email newsletter:** weekly or biweekly, genuinely useful. The inbox is the
  highest-attention free channel you own.
- **Retargeting:** tiny budgets keep you surfacing to past visitors — the
  warmest possible audience.
- **Consistent social cadence:** not viral attempts — a steady, recognizable
  presence.

The goal: your core audience encounters you weekly. That's the cadence where
"oh, them again" becomes "I know them."

## Measuring brand awareness (honestly)

Forget impressions and reach. Track:

- **Branded search trend** (Search Console): more people searching your name =
  growing awareness.
- **Direct traffic trend:** people coming to you unprompted.
- **"How did you hear about us?":** ask every new customer; tag responses.
  Rising "saw you around / a friend mentioned you" = awareness working.
- **Share of voice:** your mentions vs. competitors' in your niche's key
  spaces.
- **Recall tests:** show your content/ads to a sample without branding and ask
  who they think it's from. (Advanced, but brutally honest.)

Set a quarterly review. Awareness moves slowly — compare quarters, not weeks.

## The awareness traps

- **Awareness theater:** campaigns optimized for impressions that nobody
  remembers. If they can't name you afterward, it wasn't awareness.
- **Inconsistent identity across channels:** every rebrand-per-platform resets
  memory to zero.
- **Talking about yourself instead of being useful:** "we're excited to
  announce" builds no awareness; teaching, helping, and entertaining do.
- **Quitting at month two:** awareness is a 6–12 month compounding game. Most
  brands stop right before it starts working.

Build the full picture with the pillar [How to Increase Brand Visibility](/blog/how-to-increase-brand-visibility)
and the quick-win list in [15 Ways to Get Your Business Noticed](/blog/ways-to-get-your-business-noticed-online).

## Awareness on a shoestring: the $100/month plan

If your total awareness budget is $100 a month, here's where it goes:

- **$0 — the drumbeat (time):** weekly content, daily community presence,
  consistent social cadence. This is 80% of the plan and costs nothing but
  hours.
- **$30 — one micro-sponsorship:** a niche newsletter or podcast mention each
  month, rotating through your list of 12 target publications over the year.
- **$25 — retargeting:** keep your brand surfacing to past site visitors.
  Tiny spend, warm audience, constant reinforcement.
- **$20 — review/referral incentives:** small thank-yous that keep the
  word-of-mouth engine turning.
- **$25 — reserve:** save for opportunistic moments — a timely sponsorship, a
  relevant event, boosting a post that's already performing.

The plan works because it pairs free repetition (the drumbeat) with small paid
reinforcement at exactly the points where money multiplies effort. Awareness
doesn't require a big budget — it requires a consistent one, pointed at making
encounters memorable rather than merely numerous.

## Awareness and the long sales cycle

If your buyers take weeks or months to decide (B2B services, high-ticket
products, major life purchases), awareness isn't a nice-to-have — it's the
mechanism of the sale. Nobody buys a $10,000 service from a stranger; they buy
from the name that's been surfacing helpfully for months. For long-cycle
businesses, the highest-ROI awareness tactic is **staying usefully present
throughout the consideration period**: the newsletter they actually read, the
LinkedIn posts that demonstrate expertise, the timely check-in. Awareness here
isn't about fame — it's about being the familiar, trusted option when the
decision finally arrives.
`,xT=`---
title: "Brand Visibility vs. Brand Awareness: What's the Difference?"
description: "Brand visibility vs brand awareness: what each means, how they work together, which to fund first, and how to measure both correctly. — with real examples."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Visibility Guides"
keywords:
  - brand visibility vs brand awareness
  - visibility vs awareness marketing
  - difference brand visibility awareness
  - brand awareness definition
pillar: false
related:
  - how-to-increase-brand-visibility
  - brand-awareness-strategies
  - increase-online-visibility-small-business-90-days
---

> **Key takeaways:**
> - Visibility = being seen (the encounters). Awareness = being remembered (what sticks afterward).
> - Visibility is the input; awareness is the output. You need the first to get the second.
> - They need different tactics: visibility maximizes encounters; awareness maximizes memory per encounter.
> - Small brands should sequence them: get visible in your corner first, then make every encounter memorable.
> - Measure them separately — impressions for visibility, branded search and recall for awareness.

## The one-paragraph distinction

**Brand visibility** is how often your target customers encounter your brand —
in search results, feeds, inboxes, streets, and conversations. **Brand
awareness** is how readily they recognize and recall your brand afterward —
whether your name surfaces when they think of your category. Visibility is the
number of times you're seen; awareness is what remains after you're gone.

A billboard on a busy road buys visibility. A billboard so distinctive people
mention it at dinner builds awareness. Same encounter, different outcome — and
that difference is the whole subject of this post.

## Why the confusion exists

Marketers use the terms interchangeably because in practice they overlap: every
awareness-building activity creates visibility, and sustained visibility
eventually produces awareness. But treating them as one thing causes real
budget mistakes:

- Buying **visibility** (impressions, placements, reach) while expecting
  **awareness** (recall, preference, "I've heard of them") — then wondering
  why nobody remembers the campaign.
- Investing in **awareness** polish (brand films, identity redesigns) before
  you have the **visibility** to put them in front of anyone.

They're two stages of one funnel: **encounter → recognition → recall →
preference.** Visibility owns the first step; awareness owns the rest.

## Side-by-side comparison

| | Brand visibility | Brand awareness |
|---|---|---|
| Definition | Being encountered by the right people | Being recognized and recalled |
| Question it answers | "Are they seeing us?" | "Do they remember us?" |
| Time horizon | Immediate — each encounter counts now | Cumulative — builds over months |
| Core tactics | SEO, placements, ads, PR, social cadence, signage | Positioning, identity consistency, storytelling, remarkable experiences |
| Primary metrics | Impressions, reach, share of voice, traffic by channel | Branded search, direct traffic, recall, "how did you hear about us" |
| Can you buy it? | Yes — directly (ads, sponsorships, placements) | Only indirectly — you buy encounters; memory must be earned |
| Fails when | Encounters don't happen | Encounters happen but nothing sticks |

## How they work together: the encounter chain

Think of a customer's journey with your brand as a chain:

1. **Encounter (visibility):** they see your guest post, your leaderboard
   spot, your van driving past.
2. **Recognition (early awareness):** the third or fourth encounter — "oh,
   I've seen these guys."
3. **Recall (awareness):** they need what you sell and your name surfaces
   unprompted.
4. **Preference (deep awareness):** they choose you over alternatives because
   of what the name means to them.

Break any link and the chain fails. Great awareness creative with no
visibility reaches nobody. Massive visibility with forgettable creative
reaches everybody and converts nobody. **Budget for both links.**

## Which should a small brand invest in first?

**Visibility first — but never visibility alone.** Here's the sequence:

**Phase 1 (months 1–3): get visible in your corner.** Profiles, directories,
communities, partnerships, a content cadence, one paid placement test. Goal:
your target audience starts encountering you weekly. Don't over-invest in
polish yet — a decent message, consistently seen, beats a perfect message
nobody sees.

**Phase 2 (months 3–6): make encounters memorable.** Now sharpen the
positioning, lock the visual/verbal identity, start telling customer stories,
develop the signature element people recognize. Goal: encounters convert to
recognition — "I've seen them around."

**Phase 3 (months 6+): compound.** Keep the visibility drumbeat, keep the
identity consistent, add memorable moments (a remarkable launch, a strong
opinion, an exceptional experience). Goal: recall and preference — the name
surfaces unprompted when buyers decide.

The mistake to avoid in both phases: measuring the wrong thing. Don't judge
Phase 1 by recall (too early) or Phase 2 by raw impressions (wrong metric).

## Measuring each one

**Visibility metrics** (are we being seen?):

- Impressions and reach per channel
- Share of voice in your niche's key searches and conversations
- Referral traffic growth and press-mention volume
- Foot traffic / storefront impressions (for physical businesses)

**Awareness metrics** (are we being remembered?):

- Branded search volume trend (Search Console)
- Direct traffic trend
- "How did you hear about us?" responses — watch for "seen you around" and
  referrals rising
- Recall: unprompted ("name a brand in this category") vs. prompted ("have
  you heard of X?")
- Social mentions and backlink growth from people citing you unprompted

Review visibility monthly, awareness quarterly. They move at different speeds.

## Examples that make it click

- **High visibility, low awareness:** a generic banner ad seen a million times
  that nobody can name afterward. Money spent on encounters; nothing stored.
- **Low visibility, high awareness:** a beloved neighborhood shop everyone
  nearby knows and recommends — but nobody two streets over has heard of. Deep
  memory, narrow reach.
- **Both working:** the niche brand that keeps appearing in your feed, your
  inbox (via a friend's forward), and your search results — with the same
  sharp message and look every time. Encounters compound into recall.

Your goal is the third pattern, at the scale of your corner — not the whole
world.

## The takeaway for your budget

Split your thinking, not necessarily your budget: every visibility dollar
should pass the awareness test ("will they remember this encounter?"), and
every awareness investment should pass the visibility test ("will enough of
the right people see this?"). Brands that manage both deliberately outgrow
brands that chase either one blindly.

Go deeper: [How to Increase Brand Visibility](/blog/how-to-increase-brand-visibility) for the encounter-building playbook,
[Brand Awareness Strategies](/blog/brand-awareness-strategies) for the memory-building layer.

## Putting both to work: a worked example

Make it concrete. Imagine a small Dubai-based specialty coffee roastery
launching online sales:

**Visibility moves (months 1–3):** complete Google Business Profile with
photos; listed in food-delivery apps and local directories; weekly short
videos of the roasting process; answers in coffee enthusiast communities;
a small sponsorship in a UAE food newsletter; a $1-start featured spot on a
visibility leaderboard to test messaging in front of real browsers. Goal:
coffee lovers in the city encounter the brand weekly. Measured by:
impressions, referral traffic, share of voice in local coffee conversations.

**Awareness moves (months 3–6):** lock the visual identity (one bag design,
one color, one tone of voice everywhere); name the roast philosophy ("The
48-Hour Roast" — a named, repeatable idea); publish the sourcing stories from
origin trips; get customers' brewing setups featured; earn two press mentions.
Goal: encounters convert to recognition — "oh, the 48-hour roast people."
Measured by: branded search trend, direct traffic, "how did you hear about
us" responses.

**Compounding (months 6+):** keep the visibility drumbeat; add one remarkable
moment per quarter (a public cupping event, a limited origin release with a
story); systematize reviews and referrals. Goal: unprompted recall — when
someone thinks "specialty coffee Dubai," the name surfaces. Measured by:
recall in customer surveys, rising direct traffic, inbound partnership
requests.

Notice the sequencing: visibility first (be encountered), then awareness
craft (be remembered), then compounding (be chosen). Neither phase works
without the other — and the budget was never large, just deliberate.
`,kT=`---
title: "Can You Pay for Advertising With USDT? (2026 Guide)"
description: "Yes — several ad networks accept USDT for ad spend. Here's which ones publicly list USDT support, how the rails work, and where a $1 USDT bid fits in."
date: 2026-09-23
author: "FlexSpot Team"
category: "Getting Started"
keywords:
  - pay for advertising with USDT
  - USDT advertising
  - crypto ad payment
  - pay for ads with crypto
  - USDT ad network
pillar: false
related:
  - getting-started-with-flexspot
  - how-much-does-it-cost-to-advertise-a-small-business
  - what-is-bid-for-attention-marketing
sample: false
---

> **Key takeaways:**
> - Yes, you can pay for advertising with USDT — several crypto-focused ad networks publicly list USDT as an accepted payment method.
> - Most of them still expect meaningful deposits, so USDT support alone doesn't make a platform small-budget friendly — check the minimums, not just the coin.
> - USDT works for ad spend because it's dollar-pegged, moves fast on low-fee chains like Tron, and doesn't need a bank account or card.
> - FlexSpot lets you bid for homepage visibility from **$1 in USDT** (TRC-20, BEP-20, or Solana), which makes it one of the lowest USDT entry points anywhere.

## The short answer

Yes. USDT — Tether, the dollar-pegged stablecoin — is one of the most commonly accepted cryptocurrencies for buying advertising, and a number of ad networks and platforms list it publicly as a payment option. If your question is really *"can I fund an ad campaign with the USDT already sitting in my wallet?"*, the answer is yes, several doors are open.

The more useful question is what those doors *cost to walk through*. A network that accepts USDT but requires a large minimum deposit hasn't actually solved your problem if your budget is small. So let's look at both: who takes USDT, and what it takes to start.

## Which ad networks accept USDT?

The crypto advertising world runs on crypto payments — that's the whole point of the niche. These are networks that publicly list USDT among their accepted payment methods (always confirm on the network's current pricing page before you deposit; accepted coins and minimums change):

- **AADS (Anonymous Ads)** — a long-running crypto ad network built around anonymous, crypto-native buying. It publicly supports USDT and is known for having no meaningful minimum deposit, which makes it the classic low-budget crypto ad option.
- **Bitmedia** — a crypto-focused ad network that publicly lists USDT (along with other major cryptocurrencies) as a payment method for advertisers.
- **Coinzilla** — one of the better-known crypto display networks, publicly accepting USDT for campaign funding, generally aimed at advertisers with larger budgets.
- **DOT (formerly Cointraffic-style networks vary)** — several smaller crypto ad networks accept USDT; their terms shift often, so treat any specific figure you find as "published at the time of writing" and verify.

Outside pure crypto networks, there are workarounds: some advertisers convert USDT to fiat through exchanges or crypto-funded virtual cards to pay mainstream platforms like Meta or TikTok. That works, but every conversion step adds fees, delays, and complexity — and the platforms themselves still aren't "accepting USDT," you're just laundering it through a card.

**The honest pattern:** USDT acceptance is common in crypto ad networks. Low *minimums* are not. That's the gap worth paying attention to.

## Why USDT works well for ad spend

There are practical reasons advertisers like paying in USDT rather than, say, Bitcoin or a credit card:

- **Price stability.** A $100 USDT deposit is still worth $100 when your campaign starts. With volatile coins, your budget can shrink 10% between funding and launch.
- **Low-fee rails.** On the Tron network (TRC-20), moving USDT costs a fraction of a dollar. Compare that to wire fees or card processing percentages on small amounts.
- **No bank required.** If you earn in crypto, live somewhere with restrictive banking, or just don't want your ad spend tied to a personal card, USDT lets you pay from a wallet.
- **No chargebacks.** For the seller this is a feature; for you as the buyer it means choosing platforms you trust, since crypto payments can't be reversed.

## The catch: minimums, fees, and friction

Before you go all-in on USDT advertising, three reality checks:

1. **Published minimums change.** A network's deposit minimum today may not be its minimum next quarter. Treat every figure in every comparison article (including this one) as a snapshot, and verify on the checkout page before committing.
2. **Chain choice matters.** USDT exists on many blockchains. Sending TRC-20 USDT to an ERC-20 deposit address can mean lost funds. Always match the network the platform asks for — Tron, BSC, Ethereum, Solana, or whichever it specifies.
3. **Small budgets still lose on fees.** If a network takes a $50 minimum and you're spending $50, fine. But if you deposit $50 and the network's fee structure or campaign minimums eat a chunk of it, your effective budget shrinks fast. Low minimums beat "accepts crypto" every time for small advertisers.

## Where a $1 USDT bid fits

This is where the landscape gets interesting. Most USDT-accepting networks were built for crypto projects with real marketing budgets — their funnels assume you're spending hundreds or thousands. A freelancer, a tiny SaaS, or a creator with $20 in a wallet is technically *allowed* to advertise but practically priced out.

[FlexSpot](/blog/getting-started-with-flexspot) was designed around the opposite assumption: bidding for a public homepage leaderboard spot starts at **$1, paid in USDT** on TRC-20, BEP-20, or Solana. The mechanics are deliberately simple — claim a spot, boost it with bids, climb the public ranking, rally supporters through referral links that add to your total. There's no campaign dashboard to learn, no keyword auction to lose, and no minimum that turns your $20 into a rounding error.

It's a different *kind* of advertising — visibility through public competition rather than targeted impressions — so it's not a replacement for everything. But if you're holding USDT and wondering what actual visibility it can buy, $1 is a reasonable experiment. For context on what advertising normally costs small businesses, see our breakdown of [real small-business ad costs](/blog/how-much-does-it-cost-to-advertise-a-small-business).

## Frequently asked questions

**Is paying for ads with USDT legal?**
In most jurisdictions, paying for services with cryptocurrency is legal, though tax treatment varies — some countries treat crypto spending as a disposal event. This isn't legal advice; check your local rules.

**Which USDT network should I use for ad payments?**
Use whichever chain the platform specifies for its deposit address. TRC-20 (Tron) is popular for ad payments because fees are tiny; BEP-20 (BNB Chain) and Solana are also common. Never send across chains.

**Can I get a refund on a USDT ad payment?**
Generally no — crypto payments are irreversible. That's why it pays to start small: a $1 test bid tells you everything about a platform's legitimacy before you commit real money.

**Do mainstream platforms like Google Ads or Meta accept USDT?**
Not directly. Crypto advertisers typically use crypto-native networks, or convert USDT to fiat (via exchange or crypto-funded card) to pay mainstream platforms — with conversion fees at each step.
`,jT=`---
title: "Cheap Ways to Advertise a Small Business (That Actually Work)"
description: "Cheap ways to advertise a small business that actually work — 20+ tactics under $50, ranked by cost and payoff, plus the traps to avoid., starting today."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Small Business Marketing"
keywords:
  - cheap ways to advertise a small business
  - affordable small business advertising
  - low cost advertising ideas
  - advertise small business cheap
pillar: true
related:
  - how-to-advertise-your-small-business-online-for-free
  - small-business-advertising-ideas-under-50
  - how-much-does-it-cost-to-advertise-a-small-business
---

> **Key takeaways:**
> - "Cheap" advertising works when you buy underpriced attention — niche audiences, not cheap impressions.
> - The cheapest effective tactics are free listings, communities, partnerships, and referrals; the cheapest paid ones are micro-sponsorships and featured placements.
> - Every tactic below costs under $50 to test — most cost nothing but time.
> - Match the tactic to your customer: local businesses and online businesses need different cheap channels.
> - Track one conversion per tactic; kill what doesn't work in weeks, not months.

## What "cheap" should mean

Cheap advertising has two meanings, and only one of them works. The bad kind
is cheap *impressions* — bulk traffic packages, $5 "promotions" to bot
audiences, anyone selling you thousands of somethings for pocket change. The
good kind is cheap *attention from the right people* — a $20 newsletter
sponsorship to 2,000 perfect-fit readers, a free directory listing your buyers
actually browse, a partnership that costs a phone call.

The rule for this entire guide: **judge cost per buyer reached, not cost per
eyeball.** A $50 tactic that reaches 50 real prospects beats a $5 tactic that
reaches 5,000 bots. Every tactic below passes that filter.

## The free foundation (do these first)

Before spending a dollar, claim the free visibility that's sitting there:

- **Google Business Profile** (and Apple Maps / Bing Places). For any local
  business, this is the highest-ROI free listing on the internet. Complete
  every field, add photos, post updates, and respond to every review.
- **Niche directories and marketplaces.** Industry-specific directories,
  "best of" lists, software marketplaces, local business directories. An hour
  each; permanent trickle traffic.
- **Your own network.** Announce to contacts, past customers, and relevant
  group chats. Past customers are your cheapest "ad channel" — email them when
  you have something new.
- **Review platforms.** Google, Yelp/Tripadvisor (hospitality), Trustpilot or
  G2 (B2B/software), whichever your buyers check. Reviews are free advertising
  that compounds — and review *responses* are advertising too.
- **Social profiles done properly.** Not "posting consistently" yet — just
  complete, findable profiles with a clear one-line offer and a link that
  works.

These cost nothing and many businesses skip half of them. Don't be that
business.

## Cheap tactic 1: Micro-sponsorships ($5–$50)

Small newsletters, podcasts, and niche websites sell sponsorships directly —
and their rates are often shockingly low because they don't have media kits or
sales teams. A newsletter with 3,000 engaged readers in your exact niche might
charge $25 for a mention. Compare that to Google Ads, where a single click in
a competitive niche can cost more.

How to find them:

1. List the newsletters, podcasts, blogs, and communities your buyers already
   follow. (Ask your customers — they'll tell you.)
2. Check for a "sponsor," "advertise," or "partner" page; if none exists, email
   the owner directly with a short, specific pitch.
3. Start with one placement. Track it with a dedicated link or landing page.
4. If it converts, negotiate a recurring slot — regulars often get better
   rates.

The same logic applies to **featured placement marketplaces**: platforms where
brands buy prominent spots in front of browsing visitors. FlexSpot's
leaderboard, for example, lets brands claim homepage visibility spots starting
from $1 — you're buying placement where real visitors browse and compete for
attention, not impressions from an ad network. For a few dollars, it's one of
the cheapest real-audience tests a small brand can run.

## Cheap tactic 2: Community presence ($0 + time)

Wherever your buyers ask questions — Reddit, Facebook groups, LinkedIn groups,
niche forums, Discord servers — a genuinely helpful presence is free
advertising that builds trust while it drives traffic:

- Answer questions thoroughly, in your own expertise. Depth gets upvoted;
  drive-bys get ignored.
- Put your business in your profile, not in every post. Curious people click
  through on their own.
- Be consistent: 20–30 minutes daily for a few months beats a weekend blitz.

One detailed, well-placed answer can send customers for years. This is slow to
start and then suddenly durable.

## Cheap tactic 3: Partnerships and audience swaps ($0)

Find a business serving your same customers without competing with you, and
propose a swap: newsletter mentions, co-hosted webinars, bundled offers,
guest posts, shared events. Both sides get warm introductions to pre-qualified
buyers for the cost of an email.

Make it easy to say yes: propose the specific thing ("I'll write the draft, you
just approve it"), start small (one mention, not a joint venture), and lead
with what they get. Good partners become recurring channels.

## Cheap tactic 4: Referral and word-of-mouth systems ($0–$20)

Your cheapest advertisers are happy customers — if you make it easy:

- Ask for reviews at the moment of delight (right after a great result), with
  the direct link in hand.
- Create a simple refer-a-friend offer: a discount, a freebie, or early access
  for both the referrer and the friend.
- Feature customers publicly (with permission). People share things they're
  featured in — free distribution with built-in social proof.

Referral programs deserve their own guide — ours on referral marketing arrives
in Wave 2 — but even a simple, manual version starts compounding immediately.

## Cheap tactic 5: Content that earns its keep ($0 + time)

One genuinely useful piece per week: answer a buyer question, show a process,
share a result. Then repurpose it into a thread, a short video, quote graphics,
and a newsletter section. Content is slow — months, not days — but it's the
only advertising that keeps working after you stop paying.

If writing isn't your thing, short video (phone camera, real expertise, under
60 seconds) currently offers the cheapest reach per hour of effort of any
format.

## Cheap tactic 6: Local guerrilla ($10–$50)

For local businesses, the physical world is still underpriced:

- **Flyers and cards** in complementary local businesses (with permission):
  the café, the gym, the salon. Offer to return the favor.
- **Community boards** — physical and digital (neighborhood groups, local
  subreddits, WhatsApp community groups in markets like Dubai).
- **Sponsor something small and local:** a youth team, a community event, a
  charity raffle. $50 puts your name in front of the whole neighborhood, with
  goodwill attached.
- **Sidewalk and storefront creativity:** a great A-frame sign, window art, or
  an amusing sandwich board gets photographed and shared — free social reach
  from a one-time cost.

## Cheap tactic 7: Small, smart paid tests ($20–$50)

When you're ready to spend a little, spend it like a scientist:

- **One platform, one audience, one creative, one week.** Meta/TikTok for
  consumer, Google for intent-driven searches. Small daily budget.
- **Retargeting first** if you have any site traffic: showing ads to people who
  already visited is the cheapest paid conversion you'll ever buy.
- **Boost your best organic post** instead of creating an ad from scratch — the
  organic performance is free creative testing.
- Kill losers fast. A test that hasn't shown directional results in a week at
  small spend won't magically work at large spend.

## What cheap looks like by business type

- **Local service business** (plumber, salon, café): Google Business Profile +
  reviews + local partnerships + community boards. Paid: tiny geo-targeted
  social ads.
- **Online product/service:** niche communities + micro-sponsorships +
  content/repurposing + referral program. Paid: retargeting + one search or
  social test.
- **B2B:** LinkedIn presence + guest posts + podcast appearances + partner
  referrals. Paid: almost always search ads on buying-intent keywords, tested
  small.

## The cheap-advertising traps

- **Bulk traffic and "10,000 visitors for $10."** Bots. Zero buyers. Corrupts
  your analytics.
- **Boosting posts with no goal.** "Boost" buttons are designed to take money
  from people who don't set conversions. If you boost, boost to a specific
  offer with tracking.
- **Discount-only marketing.** Constant deals train customers to wait for
  sales and destroy margins. Use offers strategically, not permanently.
- **Spreading $50 across five channels.** One $50 test teaches you something;
  five $10 tests teach you nothing.

## Your $100 first-month plan

Week 1: free foundations (profiles, directories, reviews ask). Week 2: start
the community habit + pitch three micro-sponsorships. Week 3: launch the
referral ask + publish one strong content piece. Week 4: run one $30–$50 paid
test on the channel your customers actually use, with tracking. Review: keep
the one tactic that sent real prospects, cut the rest, repeat.

Deeper dives: [How to Advertise Your Small Business Online for Free](/blog/how-to-advertise-your-small-business-online-for-free), [30 Advertising Ideas Under $50](/blog/small-business-advertising-ideas-under-50), and the honest numbers in [How Much Does It Cost to Advertise a Small Business?](/blog/how-much-does-it-cost-to-advertise-a-small-business).

## The $1–$10 tier: nearly-free paid options

There's a tier of paid advertising most guides skip — amounts so small they
barely feel like spending, but placed where real audiences browse:

- **Bid-for-visibility spots.** Marketplaces where brands bid for homepage
  placement let you test with almost nothing. On FlexSpot, bidding starts from
  $1 — you claim a public leaderboard spot, and every boost moves you up where
  visitors actually browse. It's a genuine paid-visibility test for the price
  of a coffee, with public ranking so you can see exactly what your money
  bought.
- **Community sponsorships.** Many Discord servers, forums, and newsletters
  sell a month of sidebar or pinned placement for $5–$15. The audiences are
  small and precisely yours.
- **Micro-boosts.** $5–$10 behind your single best-performing organic post.
  You're not gambling on creative — the organic results already validated it.
- **Digital classifieds upgrades.** Featured placement on classified/marketplace
  sites (Dubizzle, Facebook Marketplace boosts) for a few dollars puts your
  listing above the free pile.

The point of this tier isn't scale — it's **learning**. For under $25 total you
discover which headlines, offers, and audiences get clicks. That knowledge
makes every bigger spend later dramatically more efficient.

## Seasonal and event-based cheap advertising

Timing multiplies cheap tactics:

- **Holidays and local events.** Ramadan, National Day, back-to-school, New
  Year — attention spikes around events, and small, well-timed offers ride
  the wave. Plan content and promotions around your market's calendar.
- **Newsjacking (tastefully).** When your industry has news, be the business
  with the useful take, the helpful guide, or the relevant offer. Speed beats
  budget here.
- **Your own micro-events.** A free workshop, a tasting, an open day, a live
  Q&A — events create content, press angles, social proof, and customers at
  once. Promote through free community channels and partner lists.
- **Slow-season offers.** When competitors go quiet, cheap ad inventory gets
  cheaper and inboxes get emptier. Advertising counter-cyclically often costs
  less and gets noticed more.

## Building your cheap-advertising playbook

After 2–3 months of testing, write down what you learned — this becomes your
playbook, and it's worth more than any tactic list:

1. **Your proven channels** — the 2–3 tactics that sent real prospects, with
   the cost and conversion numbers attached.
2. **Your messaging winners** — the headlines, offers, and angles that
   converted, reusable across channels.
3. **Your calendar** — seasonal moments, community rhythms, and partnership
   slots, planned quarterly.
4. **Your kill rules** — the criteria for cutting a tactic fast, so future
   experiments stay cheap.

Businesses with a playbook spend less every year while getting more — because
they stop re-learning the same lessons. Cheap advertising isn't about finding
one magic tactic; it's about building a system where small, smart bets
compound into a durable flow of customers.

## Cheap advertising for specific situations

**Launching something new:** concentrate spend into a 2-week burst — borrowed
audiences (announcement to partners, communities, your list) plus one small
paid placement test for data. Launches reward intensity over duration.

**Slow season:** competitors go quiet, which makes cheap inventory cheaper and
your message louder. Counter-cyclical advertising — maintaining presence while
others cut — is one of the highest-ROI moves a small business can make.

**Tight cash flow:** go all-free for a month (communities, partnerships,
referrals, content) and bank the learnings. Free channels don't just save
money — they teach you the messaging that makes future paid spend efficient.

**New market or location:** local directories, community groups, and
micro-sponsorships in that specific area first. National tactics waste money
when your buyers are all in one neighborhood.
`,ST=`---
title: "The Cheapest Ways to Advertise Online in 2026, Ranked"
description: "What is the cheapest way to advertise online? We ranked 10 tactics by real entry cost — from free methods to $1 bids — with honest pros and cons for each."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Small Business Marketing"
keywords:
  - cheapest way to advertise
  - cheapest way to advertise online
  - cheapest way to advertise a business
  - cheap online advertising
  - low budget advertising
pillar: true
related:
  - cheap-ways-to-advertise-a-small-business
  - how-much-does-it-cost-to-advertise-a-small-business
  - where-can-i-advertise-my-business-for-free
  - small-business-advertising-ideas-under-50
sample: false
---

> **Key takeaways:**
> - The cheapest entry point is free — but "free" costs your time, which is a real budget line for a small business.
> - The cheapest *paid* placement with real visibility starts at $1: a public leaderboard bid on FlexSpot.
> - Big ad platforms look cheap per click but have minimum budgets and learning curves that make small spends nearly invisible.
> - The winning formula for tiny budgets: one cheap paid placement for guaranteed visibility + free tactics that compound.

## The real question behind "what's cheapest"

When someone searches for the cheapest way to advertise, they're usually asking one of three things: *What's the absolute cheapest?* ($0), *What's the cheapest thing that actually works?* (a few dollars), or *What's the cheapest professional option?* (under $50–100/month). The honest answer depends on which question you mean — because the cheapest option in dollars is rarely the cheapest in time, and time is the one budget a small business can't borrow against.

This guide ranks ten tactics by **entry cost** — what you need to start — with an honest accounting of the hidden costs: time, skill, risk, and the minimums that turn "cheap" platforms expensive.

## How to read this ranking

Each tactic below is scored on three things: the cash to start, the time it demands, and how fast you'll see anything happen. A tactic that costs $0 but needs three months of daily work isn't "cheaper" than a $1 placement that works today — it's just priced in a different currency. Keep your own hourly reality in mind as you read.

## 1. Organic social content — $0 cash, high time cost

Posting consistently on the platforms where your customers already scroll. Zero cash outlay; the cost is hours of creation and the patience to survive the first months of low reach.

**Pros:** free, builds a real audience, compounds. **Cons:** slow, algorithm-dependent, demands constant output. Best for: founders who enjoy creating and have more time than money.

## 2. SEO basics — $0 cash, slow payoff

Claiming your profiles, writing clear page titles, answering customer questions in plain language on your site. Nobody pays you for it, but nobody charges you either.

**Pros:** free traffic that compounds for years. **Cons:** results take months; competitive keywords need real effort. Best for: businesses with a website and a long horizon. See [how to drive traffic to a new website](/blog/how-to-drive-traffic-to-a-new-website) for the practical starting steps.

## 3. Community marketing (Reddit, Quora, forums, groups) — $0 cash, reputation risk

Answering real questions in communities where your future customers hang out, with your expertise on display and your link in your profile — not in the answer.

**Pros:** free, high-trust, immediate. **Cons:** communities punish self-promotion ruthlessly; one spammy post can burn the account. Best for: founders with genuine expertise who can help first and sell never.

## 4. Referrals and word of mouth — $0 cash, needs something worth sharing

The cheapest customer is the one your customer brings you. Formalize it: a simple referral incentive, a shareable link, a reason to tell a friend.

**Pros:** highest trust, lowest cost per customer. **Cons:** requires a product people already like; slow to ignite from zero. Best for: businesses with happy customers. Our [referral marketing guide](/blog/referral-marketing) covers how to structure one.

## 5. A $1 public leaderboard bid — $1, minutes to launch

This is the cheapest *paid* placement with genuine public visibility we've found. On FlexSpot, $1 claims a real spot on a live, public leaderboard — your brand name, link, and branding displayed on a board that visitors browse, screenshot, and share on purpose.

**Pros:** the lowest real entry price in paid advertising; placement is public and persistent (not a fleeting impression); the competitive format generates shareable moments — rivalries, dethronings, comebacks — that act as bonus content. Payment in USDT means no bank or card needed. **Cons:** it's one placement on one board, not a full funnel; contested spots can tempt you to bid more (set a ceiling). Best for: any brand that wants guaranteed public visibility today for the price of a coffee. [Get started with FlexSpot here](/blog/getting-started-with-flexspot).

This is also the tactic that pairs best with everything above it: the free methods bring the story, the $1 bid gives the story a public stage. Read [what bid-for-attention marketing is](/blog/what-is-bid-for-attention-marketing) for the full mechanics.

## 6. Micro-creator shoutouts — roughly $5–50

Creators with small but loyal audiences will promote products for small fees or free product. You negotiate directly — no platform minimums.

**Pros:** trusted voice, negotiable, often includes content you can reuse. **Cons:** wildly variable quality; vetting takes time; fake followers are common at the bottom of the market. Best for: products that photograph or demo well.

## 7. Small newsletter sponsorships — roughly $10–50

Niche newsletters with a few thousand engaged readers sell classified-style mentions far cheaper than the big names. Reply rates from a trusted newsletter routinely beat cold display ads.

**Pros:** engaged audience, cheap testing. **Cons:** finding the right newsletters takes research; inventory is limited. Best for: B2B and hobby niches with strong newsletter culture.

## 8. Directory and classified listings — $0–20

Industry directories, local listings, and classified boards. Some are free; paid featured placements are usually cheap.

**Pros:** cheap, sometimes good for local SEO. **Cons:** low traffic on most; the free web is littered with dead directories. Best for: local businesses and anyone who can spare an hour to claim the obvious ones. Our [free advertising guide](/blog/where-can-i-advertise-my-business-for-free) lists where to start.

## 9. Budget display and native ad networks — roughly $10–50 to test

Second-tier ad networks sell remnant display inventory far below premium prices. You can run a real test for tens of dollars.

**Pros:** real scale available, cheap entry. **Cons:** quality varies enormously; bot traffic is a known problem on the cheapest networks — see [should you buy website traffic](/blog/should-you-buy-website-traffic) before spending here. Best for: advertisers who can read a traffic report skeptically.

## 10. Google and Meta ads at minimum budgets — $5–10/day practical floor

The giants of online advertising, run at the smallest budgets their systems tolerate. Technically you can set tiny daily budgets; practically, the auction needs enough volume to learn, and a few dollars a day buys negligible data and negligible reach.

**Pros:** unmatched targeting and intent (Google) / scale (Meta). **Cons:** the learning phase eats small budgets; competitive keywords price out beginners; you need conversion tracking to know if any of it worked. Best for: businesses ready to spend at least a few hundred a month and measure properly. For the full cost picture, read [how much it costs to advertise a small business](/blog/how-much-does-it-cost-to-advertise-a-small-business).

## The honest cost traps

Three things turn "cheap advertising" expensive:

1. **Platform minimums.** A network that advertises "$0.10 clicks" with a $50 minimum deposit and a $10/day floor isn't a $0.10-click network for you — it's a $300/month network.
2. **The learning tax.** Every new channel costs money while you figure out what works. Budget for the test, not just the winning version.
3. **Your time.** Ten hours a week on free tactics is a part-time job. Price it honestly against a $1–$10 placement that runs while you sleep.

## How to spend your first $30

If we had exactly $30 and a brand to promote, here's the allocation:

- **$1** — a FlexSpot leaderboard bid. Guaranteed public visibility on day one, plus a rank you can promote everywhere.
- **$0** — claim every free listing and directory worth having (one focused afternoon).
- **$0** — start the referral loop: one shareable incentive for existing customers.
- **$0** — ten genuinely helpful answers in two communities where your buyers ask questions.
- **~$29 held in reserve** — to defend or upgrade the leaderboard spot if it's sending traffic, or to test one micro-creator shoutout once you know your message converts.

Notice the pattern: one tiny paid placement buys *certainty* — something is live, public, and working today — while the free tactics build the compounding engine around it. Either half alone is weaker.

For more ideas at this budget level, see [small business advertising ideas under $50](/blog/small-business-advertising-ideas-under-50) and [cheap ways to advertise a small business](/blog/cheap-ways-to-advertise-a-small-business).

## Frequently asked questions

**What is the absolute cheapest way to advertise online?**
Free: organic social content, community marketing, SEO basics, and referrals cost $0 in cash. The cheapest *paid* option with real public visibility is a $1 bid on a public leaderboard like FlexSpot's.

**Can I advertise my business for $1?**
Yes — on FlexSpot, $1 claims a visible spot on a public bidding leaderboard. On major ad platforms, $1 is below practical minimums and buys effectively nothing.

**Is free advertising actually effective?**
It can be, but it trades cash for time: months of consistent effort before results compound. The fastest results come from pairing one cheap paid placement (for immediate visibility) with free tactics (for compounding growth).

**Why do cheap ad platforms end up costing more than expected?**
Minimum deposits, daily budget floors, learning-phase waste, and low-quality traffic turn headline-cheap prices into real bills. Always calculate the *test* budget — what you'll spend before you know if it works — not the advertised click price.
`,NT=`---
title: "Crypto Ad Networks Compared: Minimum Budgets, Honestly Listed"
description: "Minimum deposits at crypto ad networks range from $0 to thousands. We compare published entry points, then show where a $1 USDT bid lands you visibility."
date: 2026-09-23
author: "FlexSpot Team"
category: "Visibility Guides"
keywords:
  - crypto ad network minimum budget
  - crypto advertising cost
  - cheapest crypto ad network
  - AADS minimum deposit
  - Coinzilla minimum
pillar: false
related:
  - can-you-pay-for-advertising-with-usdt
  - how-much-does-it-cost-to-advertise-a-small-business
  - getting-started-with-flexspot
sample: false
---

> **Key takeaways:**
> - Published minimum deposits at crypto ad networks span roughly from "effectively nothing" to several thousand dollars — the range is enormous.
> - AADS is widely reported as the lowest-barrier option, with no meaningful minimum deposit; Coinzilla sits at the premium end with a high published entry point.
> - Minimums change: every figure below is a published snapshot — verify on the network's current pricing page before you budget.
> - FlexSpot's $1 USDT entry is the lowest fixed entry point in this comparison, aimed at advertisers the big networks price out.

## Why minimums matter more than features

Crypto ad networks love to compete on targeting options, publisher reach, and supported coins. But for a small advertiser, the only spec that really matters is the **minimum deposit**: the amount of money you must lock up before a single impression runs. A network with brilliant targeting and a four-figure minimum is, for you, a network you can't use.

So let's line up the well-known crypto ad networks by the one number that decides whether you're even allowed in. A critical note first: **these are published/industry-reported minimums, and they change.** Networks adjust pricing, run promos, and quietly update terms. Treat everything below as a snapshot and confirm the current figure before you spend.

## The comparison, low to high

### AADS — effectively $0

AADS (Anonymous Ads) is the veteran of low-barrier crypto advertising. It's widely reported as having no meaningful minimum deposit — you fund a wallet and start. That makes it the default answer to "what's the cheapest crypto ad network," and fairly so. The trade-off is a no-frills, privacy-first product: you're buying straightforward banner inventory, not a managed campaign with a dedicated rep.

### FlexSpot — $1 (USDT)

[FlexSpot](/blog/getting-started-with-flexspot) isn't a banner network — it's a public leaderboard where brands bid for homepage visibility spots. But on the metric that matters here, the entry point is fixed and tiny: **$1 in USDT** (TRC-20, BEP-20, or Solana) claims your spot, and every additional bid moves you up the public ranking. There's no separate "minimum campaign budget" because there are no campaigns in the traditional sense — your bid *is* the ad spend, and it's visible on the board.

### DOT / smaller networks — around $20 (reported)

Smaller crypto ad networks (DOT and its peers) are generally reported to sit in the tens-of-dollars range for minimum deposits. These networks come and go, rebrand, and change terms frequently, so "around $20" is a reported figure, not a promise. If you go this route, verify the current minimum and check how long the network has been operating.

### Bitmedia — mid-range (reported in the low hundreds)

Bitmedia is a more established crypto ad network with a fuller feature set — richer targeting, more premium publisher inventory. That comes with a reported minimum deposit in the low hundreds of dollars. You're paying for a more "serious advertiser" product: account support, better inventory, and reporting that goes beyond raw impressions.

### Coinzilla — premium (reported around $5,000)

Coinzilla is the premium end of the crypto display world: well-known crypto publishers, high-touch service, and a published minimum deposit reported in the thousands. It's built for funded crypto projects running real campaigns, not for a freelancer testing the waters with pocket change. Nothing wrong with that — it's just a different customer.

## What the spread tells you

Look at the shape of this market: there's a cluster at the bottom (AADS, FlexSpot) for tiny budgets, a middle tier for growing projects, and a premium tier for funded teams. What's missing is anything *between* roughly $1 and $20 that buys you something other than anonymous banner impressions.

That's the interesting gap. Banner impressions at micro-budgets are a lottery — your $5 buys a few thousand impressions nobody notices. A public, competitive format is different: even a $1 bid puts your brand on a visible board where the *competition itself* draws an audience. You're not buying impressions; you're buying a position in something people watch. Our guide to [bid-for-attention marketing](/blog/what-is-bid-for-attention-marketing) explains why that distinction matters.

## How to choose (a practical checklist)

1. **Match the minimum to your actual budget, not your aspirational one.** If you have $30, a $100-minimum network doesn't exist for you. Start where you're allowed in.
2. **Verify the current minimum.** Seriously. Published figures go stale; the checkout page is the truth.
3. **Check what the minimum buys.** A deposit minimum isn't spend — some networks require the deposit *and* have campaign minimums on top. Read the terms.
4. **Match the chain.** If you're paying in USDT, confirm which networks the platform accepts (TRC-20 vs ERC-20 vs others) before you send anything.
5. **Start embarrassingly small.** Whatever the minimum is, your first test should be the smallest amount that teaches you something. A $1 bid that shows you the mechanics beats a $100 deposit into a dashboard you don't understand.

## Frequently asked questions

**What's the cheapest crypto ad network?**
By published minimum deposit, AADS (effectively no minimum) and FlexSpot ($1 USDT entry) are the lowest-barrier options commonly cited. "Cheapest" depends on what you're buying, though — banner impressions and leaderboard visibility are different products.

**Why do crypto ad network minimums vary so much?**
Because they serve different customers. Premium networks sell managed service and premium publisher inventory to funded projects; low-barrier networks sell self-serve volume. The minimum is a filter for the customer the network wants.

**Can I advertise with $10 in crypto?**
Yes — on low-minimum networks. Your $10 won't buy a managed campaign, but it can buy banner impressions or, on FlexSpot, ten $1 bids on a public leaderboard.

**Do minimums include fees?**
Not always. Network fees, chain transaction fees, and campaign minimums can sit on top of the deposit minimum. Budget a little headroom, especially on chains with higher fees.
`,TT=`---
title: "$1-a-Day Advertising: What It Gets You Across Platforms"
description: "What does $1 a day in advertising actually buy? An honest platform-by-platform breakdown — and how to stretch a $30 monthly budget for real visibility."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Small Business Marketing"
keywords:
  - $1 a day advertising
  - advertising for $1 a day
  - dollar a day marketing
  - cheap daily advertising budget
  - small daily ad budget
pillar: false
related:
  - cheapest-way-to-advertise-online-ranked
  - cheap-ways-to-advertise-a-small-business
  - how-much-does-it-cost-to-advertise-a-small-business
sample: false
---

> **Key takeaways:**
> - On major ad platforms, $1/day is below the practical floor: campaigns can't gather enough data to optimize, so the spend mostly evaporates.
> - The same $1 buys a complete, visible placement on a public bidding leaderboard — no minimums, no learning phase.
> - A $30/month budget works when it's concentrated: one guaranteed placement plus free compounding tactics, not $1 scattered everywhere.
> - The mistake isn't the budget size — it's spending it where the platform's minimums quietly eat it.

## The $1/day dream vs. the $1/day reality

"$1 a day" sounds like the perfect small-business budget: painless, sustainable, thirty bucks a month. And every major ad platform will happily let you *set* a $1 daily budget. What they won't tell you on the signup page is what that dollar does once it enters the auction.

Here's the honest breakdown, platform by platform — stated qualitatively, because exact costs shift constantly, but the structural problem doesn't.

## Google Ads at $1/day: paying to be invisible

Google sells intent — people actively searching for what you offer — which is why it's the most expensive attention on the internet. At $1 a day, you're entering auctions where single clicks in competitive categories cost multiples of your entire daily budget. Your ad shows rarely, gathers almost no data, and the campaign never exits the learning phase — the period where the system is still figuring out who to show your ad to. A campaign that never learns never improves. The dollar is spent; nothing is learned.

The practical floor for Google Ads testing is far above $1/day, and that's before you factor in the skill needed to run it well. For the full picture, see [how much it costs to advertise a small business](/blog/how-much-does-it-cost-to-advertise-a-small-business).

## Meta (Facebook/Instagram) at $1/day: the algorithm needs lunch money

Meta's system is powerful precisely because it optimizes — but optimization needs volume. At $1 a day, your ad set reaches a trickle of people, the algorithm can't find patterns in the noise, and delivery stalls. You'll see impressions in your dashboard and wonder why nothing happens. What happened is that the system never got enough signal to do its job.

Small-budget advertisers sometimes see *some* delivery at $1/day, which makes it worse: just enough activity to feel like it's working, never enough to actually work.

## TikTok, X, and the rest: minimums and momentum

Every major platform has some version of the same structure: minimum budgets (daily or lifetime), auction dynamics that favor bigger spenders, and optimization systems that need data to function. A dollar a day sits below the useful threshold on all of them. The platforms aren't scamming you — their machinery was simply built for budgets with more zeros.

## Where $1/day actually works: the public leaderboard

There's exactly one paid channel where $1 isn't a rounding error: a public bidding leaderboard. On FlexSpot, **$1 isn't a daily budget — it's the whole price of a placement.** One dollar claims a visible spot on a live public board: your brand name, your link, your branding, displayed where visitors browse on purpose.

No minimums. No learning phase. No auction silently eating your budget while it "optimizes." The spot is either yours or it isn't, and while it's yours, it's public. And unlike an impression that vanishes in a feed, a leaderboard rank is *content*: you can screenshot it, post about it, and rally your audience around defending it — which is free distribution most ad formats can't offer. That's the mechanic behind [the $1 publicity stunt](/blog/one-dollar-publicity-stunt-leaderboards).

## How to stretch $30/month: the concentration strategy

Thirty dollars scattered across platforms is $1/day evaporating in five places. Thirty dollars *concentrated* is a campaign. Here's the allocation:

**Week 1: Establish the beachhead ($1–5)**
Claim your leaderboard spot for $1. Spend nothing else. Watch what it does: how many clicks, what kind of visitors, whether anyone mentions it. This is your baseline — the cheapest market research in advertising.

**Weeks 2–3: Feed it with free fuel ($0)**
Now run the free playbook around the paid placement: announce your rank to your audience, post the screenshot, ask supporters to visit through your referral link. Every free tactic in [cheap ways to advertise a small business](/blog/cheap-ways-to-advertise-a-small-business) compounds a placement that already exists. The $1 bought certainty; the free work buys scale.

**Week 4: Double down on what moved ($10–25)**
If the spot is sending real traffic, defend it or upgrade it — outbid for a higher rank, where visibility multiplies. If a rival is contesting your position, that's not a problem, it's content: document the rivalry. Only spend the reserve where you have evidence, not hope.

**The golden rule:** never spend the next dollar until the last dollar taught you something. A $30 budget managed this way outperforms a $300 budget spent on autopilot.

## What $1/day can and can't do: the honest summary

| Approach | $1/day reality |
|---|---|
| Google Ads | Below useful threshold; campaign never learns |
| Meta ads | Trickle of impressions; no optimization signal |
| TikTok/X ads | Minimums and auction dynamics work against you |
| FlexSpot leaderboard bid | A complete, visible, public placement — the full product, not a fraction |
| Free tactics (social, SEO, community) | $0/day; real but slow and time-intensive |

The takeaway isn't that small budgets are hopeless — it's that budget size and *platform fit* are different things. A dollar is a fortune where the minimum bid is a dollar, and pocket lint where the minimum is a hundred.

Our pillar guide [ranking the cheapest ways to advertise online](/blog/cheapest-way-to-advertise-online-ranked) puts this in the full context of all ten tactics by entry cost.

## Frequently asked questions

**Can I run ads for $1 a day?**
You can set a $1 daily budget on major platforms, but it sits below the threshold where their optimization systems work — the spend produces negligible reach and no useful data. On a public leaderboard like FlexSpot's, $1 buys a complete placement instead of a fraction of a campaign.

**What is the minimum budget for Google Ads?**
Google has no hard minimum, but the practical floor for a test that can actually learn and convert is far above $1/day — competitive clicks alone can exceed a tiny daily budget. Budget for the test, not the click price.

**How far can $30/month in advertising go?**
Far, if concentrated: one $1 leaderboard placement for guaranteed visibility, free tactics for compounding reach, and the remaining ~$25 reserved to defend or upgrade what's provably working. Scattered across platforms, $30/month mostly evaporates.

**Is $1-a-day advertising ever worth it on big platforms?**
Rarely as a growth strategy. It can serve as a cheap monitoring setup (keeping a pixel warm, testing creative), but for actual customer acquisition, concentrate the budget where $1 is a meaningful unit.
`,CT=`---
title: "Featured Placement Advertising: Costs, Formats, and ROI"
description: "Featured placement advertising costs, formats, and ROI: what premium homepage and category placements cost, how they're priced, and how to measure returns."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Bidding Strategy"
keywords:
  - featured placement advertising
  - featured placement cost
  - premium ad placement
  - sponsored featured listing
pillar: false
related:
  - homepage-sponsorships
  - what-is-bid-for-attention-marketing
  - banner-ads-vs-sponsored-placements
sample: false
---

> **Key takeaways:**
> - Featured placement advertising buys premium, high-visibility positions — homepage spots, top-of-category listings, leaderboard ranks — instead of remnant ad inventory.
> - Pricing runs from $1 bids on open marketplaces to five-figure monthly deals on major sites, driven by audience, prominence, and pricing model.
> - The formats that perform best combine visibility with context: the placement feels like part of the page, not an interruption.
> - Measure with UTM tracking, branded-search lift, and honest cost-per-outcome math — not vanity impressions.

## What "featured placement" means

Featured placement advertising is the practice of buying premium positions rather than standard ad inventory. Instead of your creative rotating through an ad slot with a dozen other advertisers, you occupy a *featured* position: the top of a category page, a spotlight block on a homepage, a ranked spot on a public leaderboard, a "featured partner" badge. The defining traits are **prominence** (visitors can't miss it), **persistence** (it stays put for the duration), and **context** (it appears as part of the experience, not as an interruption).

It's the difference between a billboard on the highway everyone drives past and a flyer on a community board. Both are advertising; only one is featured.

## The main formats

- **Homepage featured spots.** The premium tier: dedicated placement on a site's front door. Maximum visibility, maximum competition for the inventory.
- **Category / directory features.** "Featured" listings at the top of directories, marketplaces, and comparison pages — where buyers are actively browsing options. High intent, high conversion.
- **Leaderboard / ranked placements.** Public rankings ordered by bid, votes, or engagement. The competitive format draws spectators, multiplying exposure beyond the placement itself.
- **Sponsored content features.** Featured articles, guides, or resource blocks — prominence plus substance. Slower burn, deeper trust.
- **In-feed / in-app features.** Featured positions inside feeds, apps, and newsletters: "featured deal," "sponsored pick," "partner spotlight." Native-feeling and hard to ignore.

## How it's priced: the four models

1. **Flat-rate sponsorship.** A fixed price for a fixed period and position. Simple, predictable, negotiable. Common with independent sites and newsletters.
2. **Bid / auction.** You bid against others for the placement; the market sets the price. Transparent and accessible — entry can start very low — but competitive placements can escalate.
3. **Performance-based.** You pay per click, per lead, or per sale from the placement. Lower risk for the buyer; sellers only offer it when they're confident in their traffic.
4. **Hybrid.** A base fee plus performance bonuses, or tiered pricing by position. Increasingly common as both sides want predictability *and* alignment.

## What drives the cost

- **Audience size** — but more importantly, audience *fit*. A niche site with 10,000 of your exact buyers outperforms a general site with a million casual visitors, and is usually priced accordingly.
- **Prominence and exclusivity.** Above the fold, exclusive to your category, always visible — each step up in prominence steps up the price.
- **Duration.** Longer commitments usually discount the rate but lock you in; short tests cost more per day but limit risk.
- **The site's authority.** Placement on a trusted, well-known site carries endorsement value that raw traffic numbers don't capture.
- **Pricing model.** Auctions can be cheapest (when competition is low) or most expensive (when it's fierce). Flat rates reward negotiation.

Realistic ranges for small brands: bid-based marketplace spots from $1 to test the format; independent site sponsorships from tens to hundreds monthly; established media homepages from hundreds to thousands monthly; major portals, five figures and up. Start at the bottom, prove the return, climb only with evidence.

## Evaluating a featured placement: the checklist

1. **See it yourself.** Visit the page on desktop and mobile. Is the featured area genuinely prominent? Do you notice it as a visitor?
2. **Verify the audience.** Who visits, in what numbers, with what intent? Ask for data; look for engagement signals (comments, shares, activity).
3. **Confirm the traffic is human.** Bot-inflated numbers are the industry's open secret. Look for behavioral proof: real comments, social shares, return-visitor patterns.
4. **Get the terms in writing.** Position, duration, creative specs, refresh rights, link attributes, reporting commitments.
5. **Start small.** A trial period or minimum commitment first. Scale on evidence, not promises.

## Measuring ROI honestly

Featured placements often underperform in last-click attribution and overperform in reality — they build familiarity that converts later through other channels. Measure both:

- **Direct:** UTM-tagged clicks, dedicated landing pages, promo codes — the attributable pipeline.
- **Brand lift:** Branded search volume, direct traffic, and mention volume during the placement vs. your baseline.
- **Cost per outcome:** Total spend divided by leads, sales, or signups. Compare against your other channels with the same rigor.
- **Compounding:** Return visitors see the placement repeatedly. Value the repetition — familiarity is the mechanism, not a side effect.

Review after a full placement period. One week tells you nothing; one month tells you something; three months tells you whether it's a channel.

## Featured placement vs. standard display ads

The core trade: featured placements buy **depth** (prominence, persistence, context on one site's best real estate) while display ads buy **breadth** (reach across thousands of sites, precise targeting, easy scaling). Featured placements typically deliver higher attention quality and brand association per impression; display delivers more impressions per dollar and better targeting. For a small brand, the practical answer is usually sequencing: use featured placements to establish visible presence where your buyers actually gather, and display/retargeting to follow up at scale. Neither replaces the other — they do different jobs.

## Getting started on a small budget

You don't need a media-buying department. This month: identify three sites or platforms where your buyers gather that offer featured placements; start with the cheapest credible option (a bid-based spot or a short trial); run one clear creative with UTM tracking for 2–4 weeks; review honestly; then either scale, renegotiate, or move on. Featured placement advertising rewards the methodical — test small, measure honestly, and let evidence, not excitement, decide where your budget goes.

## Negotiating featured placements like a pro

Featured inventory is more negotiable than most buyers realize, especially with independent sites: **bundle positions** (homepage feature plus newsletter mention for one price), **trade creative flexibility** (offer to refresh creative monthly — owners love fresh-looking pages), **propose performance sweeteners** (a base fee plus a bonus per hundred clicks aligns everyone's incentives), **ask about remnant and off-peak inventory** (unsold featured slots near period-end often go cheap), and **always get the renewal option in writing** (if the placement works, you want first refusal before the price rises). The single most effective negotiation line for small brands: "We're testing three sites this quarter and will concentrate budget on whichever performs." It's true, it's professional, and it focuses every seller on earning the renewal.

## Red flags in featured placement deals

Not every "featured" offer deserves the name. Walk away from: **placements you can't preview** — if the seller won't show you exactly where your brand appears, you're buying a promise; **traffic numbers with no behavioral proof** — real sites have comments, shares, and return visitors, not just a big monthly number; **exclusivity promises that aren't in writing** — verbal "you'll be the only one" means nothing; **pressure tactics** — legitimate featured inventory doesn't need expiring-today discounts; and **packages stuffed with junk** — a "featured" bundle that's really one decent placement plus nine invisible ones. The featured placement market rewards buyers who verify before they pay. A thirty-minute diligence check — visit the page, check the engagement, ask for the data — filters out most bad deals before money changes hands.
`,AT=`---
title: "21 Free Ways to Get More Website Traffic That Actually Work"
description: "21 free ways to get website traffic that actually move the needle — SEO quick wins, community tactics, partnerships, and repurposing strategies for 2026."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Visibility Guides"
keywords:
  - free ways to get website traffic
  - how to get traffic to my website
  - free website traffic
  - increase website traffic free
pillar: false
related:
  - how-to-get-traffic-to-your-website
  - how-to-drive-traffic-to-a-new-website
  - where-can-i-advertise-my-business-for-free
---

> **Key takeaways:**
> - "Free" traffic costs time, not money — the winners pick 2–3 tactics and execute them for 90 days instead of dabbling in twenty.
> - Answering specific buyer questions is the highest-leverage free tactic for most sites.
> - Communities, directories, and partnerships send real visitors long before search kicks in.
> - Repurposing multiplies every piece of content you make across 3–4 platforms.
> - Skip link schemes, comment spam, and bulk traffic sellers — they're free in price and worthless in results.

## The rules of free traffic

Before the list, three rules that decide whether any of this works:

1. **Free means time, not magic.** Every tactic below costs hours. Budget 5–10
   hours a week to one primary tactic, or nothing will reach critical mass.
2. **Depth beats breadth.** Doing three tactics consistently for 90 days beats
   trying fifteen once each.
3. **Your site has to deserve the traffic.** Before driving visitors, make sure
   a first-time visitor understands what you offer in five seconds and has one
   clear next step. Traffic to a confusing site is wasted effort.

## Search & SEO (tactics 1–6)

**1. Answer the exact questions your customers ask.** Pull real phrasing from
support tickets, emails, sales calls, and DMs. One page per question, direct
answer up top. This is the single highest-leverage free tactic for most small
sites.

**2. Target long-tail keywords deliberately.** "CRM software" is a war zone;
"simple CRM for freelance photographers" is winnable. Longer, more specific
phrases convert better anyway, because the searcher knows what they want.

**3. Refresh and expand your best existing pages.** Find pages already getting
some search impressions (check Search Console), then make them genuinely more
complete than competing results: add examples, steps, FAQs, updated data. This
often beats writing new pages.

**4. Build internal links with intent.** Link your new pages from relevant older
pages using descriptive anchor text. Internal links spread ranking power and
keep visitors exploring — both help.

**5. Get listed in niche directories.** Industry directories, "best of" lists,
software marketplaces, local business directories. Each is an hour of work and
a small but permanent traffic stream. Prioritize directories your actual buyers
browse.

**6. Fix the basics: titles, speed, mobile.** Write title tags like ad headlines
(specific + benefit, under 60 characters), compress images, and check your
site on a real phone. These aren't glamorous, but a slow or broken mobile
experience silently kills every other tactic.

## Content & repurposing (tactics 7–10)

**7. Publish one genuinely useful piece per week.** Depth beats frequency — a
2,000-word guide that solves a real problem outperforms four thin posts. Cover
what you know cold; original experience is the one thing AI-generated content
can't replicate.

**8. Repurpose everything across formats.** One guide becomes: a thread on X, a
LinkedIn post, a short video script, three quote graphics, a newsletter
section. Most creators publish once and move on; repurposing multiplies reach
without multiplying work.

**9. Turn customer questions into content.** Every time someone asks you a
question twice, it's a blog post (or video, or FAQ page) waiting to happen. This
guarantees your content matches real demand.

**10. Create one free tool or template.** A calculator, checklist, spreadsheet
template, or quiz related to your niche attracts links and shares that plain
articles never earn. Tools get bookmarked; articles get skimmed.

## Communities & partnerships (tactics 11–16)

**11. Answer questions where your buyers gather.** Reddit, niche forums,
Facebook and LinkedIn groups, Discord servers, Quora. Be genuinely useful —
link only when it directly answers the question. Done right, a single detailed
answer can send traffic for years.

**12. Guest-post on mid-size blogs.** Mid-size site owners actually reply to
pitches, and their audiences are engaged. Pitch a specific headline with an
outline, not "can I write for you?"

**13. Appear on small podcasts and newsletters.** Hosts constantly need guests.
A 30-minute conversation reaches a trusting audience and usually comes with a
link. Start with shows in your exact niche, not the big names.

**14. Swap audiences with a peer.** Co-write a guide, co-host a webinar, or
mention each other in newsletters with a business serving the same audience but
not competing with you. Both sides win for zero cost.

**15. Get quoted as an expert.** Respond to journalist requests (services like
HARO/Connectively and #journorequest), or pitch data and opinions to writers
covering your space. One quote in a ranking article is a permanent link.

**16. Start or join a local meetup or online community.** Being the person who
organizes the room makes you the person everyone links to. Even a small monthly
virtual hangout builds the relationships that become backlinks and referrals.

## Social & email (tactics 17–21)

**17. Pick one social platform and go deep.** Study what gets shared in your
niche, post natively (not link-drops), engage daily for 30 minutes. Platform
algorithms reward consistency and native formats; they bury outbound links, so
use profile/bio links and pinned comments.

**18. Short video, consistently.** TikTok, Reels, Shorts: show the problem and
the result in under 30 seconds, post 3–5 times a week, and iterate on whatever
gets saves and shares. Video reach is still the cheapest attention online.

**19. Build an email list from day one.** Offer one genuinely useful freebie
(checklist, template, mini-guide) in exchange for an email. Email is the only
audience you own — algorithm changes can't take it away.

**20. Send a useful newsletter.** Weekly or biweekly, one sharp insight plus
links worth clicking. Newsletters turn one-time visitors into repeat traffic,
and subscribers share good ones.

**21. Ask happy customers to spread the word.** A simple, well-timed ask —
after a great result, not at random — earns reviews, testimonials, and social
mentions. Make it easy: send the direct link and suggest what to say. This
feeds your referral engine (see the pillar guide on referral marketing coming
in our next wave).

## What to avoid (the "free" traps)

- **Comment spam and forum link-dropping.** Gets deleted, damages your name,
  and search engines ignore it anyway.
- **Link-exchange schemes.** Artificial link networks get penalized; real links
  come from real relationships.
- **Buying bulk "traffic."** Bots and click-farms pollute your analytics and
  convert at zero. Paying for *placement* in front of real audiences is a
  different, legitimate thing.
- **Content mills and spun articles.** Thin, duplicated content wastes crawl
  budget and your reputation.

## Your 90-day free-traffic plan

Weeks 1–2: fix site basics (speed, mobile, titles), set up analytics, and list
your 30 customer questions. Weeks 3–6: publish answers to the best questions,
get listed in every relevant directory, and start one community habit daily.
Weeks 7–12: launch the email list, start repurposing each piece, pitch two
guest posts and three podcasts. Review monthly: double down on whichever
channel sent the most engaged visitors, cut the rest.

For the bigger picture — how free tactics combine with paid ones — see the
pillar: [How to Get Traffic to Your Website: The 2026 Playbook](/blog/how-to-get-traffic-to-your-website).

## Putting it together: the weekly free-traffic routine

Twenty-one tactics are useless without a routine. Here's a sustainable weekly
rhythm that combines the highest-leverage ones in about 6–8 hours:

- **Monday (90 min):** write and publish this week's answer-piece; submit it
  to one relevant community.
- **Tuesday–Thursday (30 min/day):** community presence — answer questions,
  engage genuinely, one standout answer per day.
- **Friday (60 min):** repurpose the week's piece (thread + short video script
  + newsletter section); send one partnership or pitch email.
- **Monthly (2 hrs):** refresh your best-performing page, review analytics by
  channel, and double down on whatever sent the most engaged visitors.

The compounding math: after 12 weeks you'll have 12 solid content pieces, ~60
community answers, a growing email list, and real data on what works. Almost
no small site that sustains this for a year stays invisible. The tactic matters
less than the streak — pick the ones you'll actually do, and do them until
they compound.
`,ET=`---
title: "Getting Started with FlexSpot: Claim Your First $1 Spot"
description: "New to FlexSpot? This step-by-step guide shows how to claim your first public leaderboard spot from $1, set it up right, and start climbing to the crown."
date: 2026-09-23
author: "FlexSpot Team"
category: "Getting Started"
keywords:
  - flexspot
  - getting started
  - claim a spot
  - leaderboard
  - brand visibility
pillar: true
related:
  - how-boosting-moves-you-up-the-leaderboard
sample: true
---

> **Key takeaways:**
> - FlexSpot is a public leaderboard where brands, creators, and meme pages compete for homepage visibility — starting from just $1.
> - Claiming a spot takes under a minute and requires no account.
> - Your rank is decided by total boosts: every dollar of buzz moves you up.
> - Referral links let every visitor add $1 to your total, once per day.
> - This guide walks the whole journey, from claim to crown.

## What is FlexSpot, exactly?

FlexSpot is the internet's public spotlight competition. Instead of paying a
social platform's ad auction and hoping someone scrolls past your creative, you
claim a **public spot on a live leaderboard** that visitors actually browse for
fun. The board is ranked by total boosts, so the more buzz behind your spot —
your own boosts, your fans' boosts, your referral visits — the higher you
climb, and the more eyes land on your brand.

It works for almost anything with a link: your startup, your creator page, your
restaurant, your event, your meme page, your portfolio. If people should know
about it, it deserves a spot.

## Step 1: Claim your spot (under a minute)

Hit **Claim Your Spot** anywhere on the site and fill in the short form:

- **Name** — your brand, project, or handle.
- **Link** — where visitors go when they click your spot.
- **Tagline** — one sharp line about what you are.
- **Category** — pick the closest match so browsers can find you.
- **Starting boost** — from $1. This is your opening bid for attention.

No account, no password, no onboarding drip emails. Payment is handled manually
in this phase: you complete it after claiming and the team verifies it, usually
within a few hours.

## Step 2: Make your spot page worth clicking

Every spot gets its own public profile page — your mini landing page on
FlexSpot. Treat it like a billboard on a busy highway:

1. **Say what you are in five seconds.** If a stranger can't get it from your
   tagline, rewrite the tagline.
2. **Use a link that converts.** Deep-link to the exact page you want visitors
   on, not your homepage's homepage.
3. **Look alive.** Spots with clear branding and an active rank get more boosts
   — nobody boosts a ghost.

## Step 3: Get your first boosts

Ranking is transparent: spots are ordered by **total verified boosts**. Every
dollar counts the same, so the strategy is simple — accumulate buzz:

- **Boost yourself** to set a floor and signal confidence.
- **Share your spot page** with your audience, customers, and group chats.
- **Create your referral link** (enter your name on your spot page). Every visit
  through it automatically adds $1 to your total — counted once per visitor per
  day, so it rewards real reach, not refreshing.
- **Ask fans to boost directly.** Anyone can contribute to any spot, and small
  boosts add up fast on the lower ranks.

Watch the **overtake meter** and rank deltas on the leaderboard: when you pass
someone, you take their rank live, in front of everyone. That's the fun.

## Step 4: Defend your rank (or take the crown)

Leaderboard positions are never safe — rivals boost back. The winners tend to
do three things:

1. **Keep a steady drumbeat** of small boosts instead of one big splash.
2. **Turn every launch, post, and announcement into referral traffic** through
   their link.
3. **Show up on the Top Supporters / Top Referrers boards** — social proof
   attracts more social proof.

## Common beginner mistakes

- **Boosting once and disappearing.** Visibility compounds; one-and-done
  entries sink.
- **Linking to a generic homepage.** Every extra click loses visitors.
- **Ignoring referrals.** The $1-per-visit referral engine is the cheapest
  ranking fuel on the platform — use it.
- **Chasing #1 on day one.** Climb a few ranks, learn what moves your audience,
  then make your run.

## What to read next

Ready for tactics? Read [How Boosting Moves You Up the
Leaderboard](/blog/how-boosting-moves-you-up-the-leaderboard) for the full
breakdown of ranking mechanics and bidding strategy. And if you haven't claimed
yet — [it takes a minute and starts at
$1](https://flexspot.lol/claim).
`,PT=`---
title: "Google Ads Too Expensive? 9 Cheaper Alternatives (2026)"
description: "Google Ads too expensive for your budget? These 9 cheaper alternatives to Google Ads work for tiny budgets — from Reddit and Quora ads to a $1 leaderboard bid."
date: 2026-09-23
author: "FlexSpot Team"
category: "Small Business Marketing"
keywords:
  - google ads too expensive
  - cheaper alternatives to google ads
  - google ads alternative small budget
  - cheap alternative to google ads
pillar: false
related:
  - how-much-does-it-cost-to-advertise-a-small-business
  - cheap-ways-to-advertise-a-small-business
  - website-traffic-sources-ranked
sample: false
image: "/og-cover.png"
---

> **Key takeaways:**
> - Google Ads is expensive because you're bidding against big companies for the same searches — smaller platforms mean cheaper auctions.
> - Microsoft Ads, Reddit, Quora, and TikTok all offer lower minimums and typically cheaper clicks than Google Search.
> - Non-PPC options — newsletter sponsorships, niche directories, launch platforms — can beat paid search on cost per buyer reached.
> - A public leaderboard bid starts at $1 and buys guaranteed placement, not an auction gamble.

## Why Google Ads drains small budgets

Google Ads isn't a scam — it converts. The problem is the auction. You're
bidding for the same keywords as companies with full-time media buyers and
five-figure monthly budgets, so popular searches clear at prices that only
make sense if your customer lifetime value is high. If you sell a $30
product, paying several dollars per click is a math problem, not a marketing
problem.

The fix isn't to quit advertising. It's to buy attention where the auction
is thinner, the audience is more concentrated, or the pricing isn't an
auction at all. Here are nine ways to do that, each with an honest tradeoff.

## 1. Microsoft Ads (Bing)

The closest thing to Google Ads without Google prices. It runs on Bing,
Yahoo, and partner sites, and you can import your Google Ads campaigns in a
few clicks. Clicks typically cost less than the same keywords on Google
because far fewer advertisers compete there.

**Who it's for:** anyone already running (or considering) search ads who
wants the same intent-driven traffic at a discount. B2B and older-skewing
audiences do especially well.

**Tradeoff:** much smaller volume. You'll spend less per click but you'll
run out of searches to buy sooner.

## 2. Reddit ads

Reddit lets you advertise inside communities (subreddits) built around
exactly what you sell — r/smallbusiness, r/startups, niche hobby subs. You
can start with a few dollars a day, and niche targeting keeps waste low.

**Who it's for:** products with a natural community — software, hobbies,
DTC brands, creators. If your customers hang out on Reddit, this is the
cheapest way to reach them at scale.

**Tradeoff:** Redditors punish bad ads publicly. Your creative has to feel
native, not corporate — budget for real creative, not just media spend.

## 3. Quora ads

Quora puts your ad next to questions people are actively asking about your
category — high intent, low competition. Minimum budgets are small and CPCs
are typically far below Google Search for the same topics.

**Who it's for:** B2B tools, courses, services, and anything people research
before buying. If there's a Quora question your product answers, you can buy
that exact moment.

**Tradeoff:** reach is modest, and the platform's ad tools are less polished
than Meta or Google. Works best as a supplement, not your only channel.

## 4. TikTok ads

TikTok's self-serve platform has low daily minimums and a massive,
attention-rich audience. For visual, fun, or creator-adjacent products,
short video creative can deliver cheap reach fast.

**Who it's for:** DTC brands, apps, creators, and anything that demos well
in 15 seconds.

**Tradeoff:** you need video creative that doesn't look like an ad, and
conversion tracking is weaker than Google or Meta. Test with a small budget
before scaling.

## 5. Newsletter sponsorships

A sponsorship in a niche newsletter — say, a startup or industry digest
with a few thousand engaged readers — can cost less than a day of Google
Ads and reach people who actually trust the sender. Many newsletters sell
classified-style slots cheaply.

**Who it's for:** B2B products, SaaS, books, courses, and local services
with a matching local newsletter.

**Tradeoff:** it's manual work — you find, pitch, and negotiate each
newsletter — and results vary wildly by list quality. Start with one small
test before committing.

## 6. Niche directories and "best of" lists

Getting listed on directories your buyers actually browse — review sites,
industry marketplaces, local business directories — is often free or a
small one-time fee. A good directory listing keeps sending traffic for years
after a single afternoon of work.

**Who it's for:** local services, agencies, SaaS tools, and anyone whose
buyers comparison-shop online.

**Tradeoff:** not instant. Listings compound over months, so this is a
foundation play, not a launch spike. See our guide to
[cheap ways to advertise a small business](/blog/cheap-ways-to-advertise-a-small-business)
for the free-listing playbook.

## 7. Launch on Product Hunt (and alternatives)

A Product Hunt launch costs nothing but preparation and can put you in front
of thousands of early adopters in a day. It's not paid advertising — it's a
visibility event — but for startups it's one of the highest-ROI "free"
channels that exists.

**Who it's for:** new products with a story, especially tech and tools.

**Tradeoff:** it's one day of fame, it's competitive, and results are
unpredictable. Don't build your whole plan on it — and have a look at
[Product Hunt alternatives](/blog/product-hunt-alternatives-launch-platforms)
so you're not betting everything on one launch.

## 8. A $1 public leaderboard bid

This one's different from everything above: instead of buying clicks in an
auction, you claim a visible spot on a public leaderboard — from $1 — and
everyone who visits the board sees your brand. Outbid rivals to climb, and
the competition itself becomes the publicity: leaderboards get shared,
screenshotted, and talked about.

**Who it's for:** brands that want guaranteed placement and a story, not
just impressions. Startups, creators, crypto projects, and small businesses
that can't outspend big advertisers but can out-play them.

**Tradeoff:** it's visibility, not intent — people see you because you're
winning, not because they searched for you. Pair it with a landing page
that converts curiosity.

If this model sounds interesting, read
[what bid-for-attention marketing is](/blog/what-is-bid-for-attention-marketing)
and [how boosting moves you up the leaderboard](/blog/how-boosting-moves-you-up-the-leaderboard).

## 9. Community marketing (the free heavyweight)

Posting genuinely useful answers in Facebook groups, Slack communities,
Discord servers, and forums where your customers gather costs nothing and
often outperforms paid ads for trust. The rule: contribute 90%, promote 10%.

**Who it's for:** founders and solo operators with more time than money —
which is most small businesses.

**Tradeoff:** it's slow and it doesn't scale on demand. But it compounds,
and it makes every paid channel work better because people have heard of
you.

## How to pick (a 60-second framework)

Ask three questions: **Where do my buyers already pay attention?**
(Go there, not where advertisers go.) **What can I afford to test for two
weeks?** (Only test channels whose minimums fit that number.) **Do I need
clicks today or credibility over time?** (PPC for today, directories and
communities for over time.)

Most small budgets do best with one cheap PPC test (Reddit, Quora, or
TikTok), one guaranteed-placement play (a leaderboard bid or newsletter
sponsorship), and one free compounder (communities or directories). That
combination is covered in detail in our
[small-budget advertising guide](/blog/small-business-advertising-ideas-under-50).

## Frequently asked questions

**What's the cheapest real alternative to Google Ads?**
For paid clicks, Microsoft Ads, Reddit, and Quora typically deliver the
lowest CPCs for small advertisers. For guaranteed visibility without an
auction, a $1 leaderboard bid or a niche newsletter sponsorship usually
costs less than a single day of Google Search ads.

**Can I advertise with just $5–$10?**
Yes — on Reddit, Quora, TikTok, and Microsoft Ads you can run real tests at
a few dollars a day, and a FlexSpot leaderboard spot starts at $1. Google
Search is the main platform where $10 disappears before you learn anything.

**Are cheaper ad platforms lower quality?**
Not necessarily — they're smaller and more specific. A click from a niche
subreddit or a niche newsletter can convert better than a generic Google
click because the audience is pre-filtered. Judge by cost per buyer, not
cost per click.

**Should I quit Google Ads entirely?**
No. If Google Ads is profitable for you, keep it and add cheaper channels
to lower your blended acquisition cost. If it's unprofitable, pause it,
test two or three alternatives from this list with small budgets, and only
return to Google with tighter targeting and better landing pages.
`,RT=`---
title: "Guerrilla Marketing Ideas for Brands With No Budget"
description: "Guerrilla marketing ideas that cost almost nothing: stunts, street tactics, meme-jacking, and surprise placements that earn attention creativity can't buy."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Viral Marketing"
keywords:
  - guerrilla marketing ideas
  - guerrilla marketing tactics
  - low budget marketing stunts
  - creative marketing on a budget
pillar: false
related:
  - how-to-make-your-brand-go-viral
  - viral-marketing-strategies
  - how-to-stand-out-from-competitors
sample: false
---

> **Key takeaways:**
> - Guerrilla marketing trades budget for creativity: surprise, spectacle, and wit in places people don't expect ads.
> - The best stunts are filmable in 15 seconds and understandable without context — they're designed for someone else's camera.
> - Always pair the stunt with a capture point and a share path, or the crowd disperses and the moment dies.
> - Stay legal and respectful: permission, safety, and cleanup are part of the plan, not afterthoughts.

## What guerrilla marketing actually is

Guerrilla marketing is unconventional promotion in unexpected places, designed to surprise people into paying attention — and then telling others. It trades media budget for imagination: instead of buying eyeballs, you earn them by doing something worth filming, photographing, or talking about.

The economics are the point. A small brand can't outspend a big one, but it can out-surprise them. One well-executed stunt can earn more attention than months of conventional ads — if it's genuinely remarkable and engineered to spread.

## The design rules of a good stunt

Before the ideas, the constraints that separate stunts that spread from stunts that flop:

1. **Filmable in 15 seconds.** Assume the audience experiences it through someone else's phone. If it needs three minutes of explanation, it won't travel.
2. **Understandable without context.** A stranger scrolling past the video should get the joke or the point immediately.
3. **Safe and legal.** Get permissions, don't block traffic, don't damage property, clean up after. A stunt that ends in a fine or an angry community is a net loss.
4. **On-brand.** The surprise should reinforce what you stand for, not just be weird for attention's sake. Random weirdness gets views; on-brand weirdness gets customers.
5. **Shareable by design.** Put your brand name on anything photographable, add a hashtag or QR code where natural, and make sure there's a page for the curious to land on.

## 12 guerrilla ideas, roughly free to cheap

**1. The sidewalk takeover.** Chalk art, stencils (temporary, washable), or cleverly placed stickers along a busy walking route. Costs almost nothing; works best with wit, not logos.

**2. The reverse shoplift.** Leave branded freebies — samples, discount cards, funny notes — in places your audience hangs out: coworking spaces, gyms, cafes (with permission). Surprise gifts get photographed.

**3. Flash mob, micro edition.** You don't need fifty dancers. Three people doing something delightful and synchronized in a public place is enough to stop foot traffic and start phones recording.

**4. The human billboard with a twist.** Not a person holding a sign — a person doing something worth watching while wearing your brand: a living statue, a speed painter, a street performer whose act is your message.

**5. Projection bombing.** A projector, a wall, after dark. Project your message, animation, or live leaderboard onto a building (get permission or choose carefully). Cheap, dramatic, and extremely filmable.

**6. The absurd delivery.** Deliver your product in the most over-the-top way possible — by costume, by parade, by drone (where legal). Film the reactions, not just the delivery.

**7. Restroom and elevator takeovers.** Captive audiences, zero competition. Clever creative in unexpected small spaces gets photographed precisely because it's unusual there.

**8. The public challenge board.** Set up in a busy spot: a whiteboard or screen where passersby vote, rank, or compete at something fun related to your niche. Participation plus spectacle.

**9. Meme-jack your storefront.** Turn your shop window, van, or market stall into a meme — the funnier and more current, the more photos. Physical memes bridge online humor and real-world foot traffic.

**10. The honest price stunt.** Publish your real costs, margins, or pricing breakdown on a giant sign or viral post. Radical transparency is inherently newsworthy and positions you against secretive competitors.

**11. Hijack the queue.** Long lines are bored audiences. Entertain a queue — free samples, a quick game, a live mini-ranking people can join from their phones — and every person in line is a potential filmer.

**12. The leaderboard in the wild.** Take a competitive format offline: a public scoreboard at an event or busy street where people compete live for a prize or just glory. Competition draws crowds; crowds draw cameras.

## Pairing stunts with digital capture

A stunt without a digital tail is a firework — bright, then gone. Every guerrilla play needs:

- **A hashtag or handle** visible in every photo of the stunt.
- **A landing page** for the curious — one page, one action, live before the stunt.
- **Your own camera crew.** Never rely on the crowd's footage alone. Film it properly, edit fast, and publish within hours while it's fresh.
- **A follow-up beat.** The behind-the-scenes, the reactions compilation, the "you asked for it, we're doing it again" — stunts have sequels, and sequels are easier than premieres.

## The 48-hour guerrilla sprint: a worked example

Theory is nice; here's how a small brand could actually run one. Say you run a local coffee subscription and want attention this weekend:

- **Friday evening:** Design one witty, on-brand chalk stencil and a QR code linking to a single landing page ("Free first bag — this weekend only"). Get permission from three busy cafes to place A-frame boards outside Saturday morning.
- **Saturday 8am:** Deploy. Two team members in branded aprons hand out free sample cups near the busiest foot traffic, with a simple ask: "Scan for a free first bag." A third films everything.
- **Saturday 2pm:** Post the best 20 seconds of footage — real reactions, the queue, the chalk art. Not an ad: a moment.
- **Sunday:** The "results" post — how many scans, the funniest reaction, the cafe that asked you to come back. Debrief content extends the tail and sets up the sequel.

Total cost: chalk, printing, coffee samples, and a weekend. Total assets: footage, photos, a landing page with real signups, and a story to tell. That's the guerrilla formula — a small, surprising, filmable intervention with a digital tail.

## What to avoid

Don't punch down, don't fake a grassroots movement (astroturfing gets exposed and the backlash is worse than obscurity), don't damage property or disrupt emergency services, and don't confuse "edgy" with "offensive" — offending people is easy and worthless; surprising them is hard and valuable. When in doubt, ask: would we be proud if this were on the evening news?

Guerrilla marketing rewards the bold but punishes the careless. Plan the stunt like a professional, execute it like an artist, and clean up like a good neighbor.

## Budget cheat sheet

For reference, what each idea above realistically costs a small brand: chalk/sticker runs and sidewalk art, pocket change; reverse shoplifting and sample drops, the cost of the samples; micro flash mobs and human billboards, a day's pay for a few performers (or pizza for friends); projection bombing, a rented projector for a night; absurd deliveries and queue entertainment, mostly time plus props; honest-price stunts and meme-jacked storefronts, printing costs. The pattern: attention comes from the idea, not the invoice. Spend your money on the camera work and the landing page — those are the parts that compound.
`,FT=`---
title: "Homepage Sponsorships: How to Buy Featured Placement on High-Traffic Sites"
description: "Homepage sponsorship explained: what featured placement costs, which formats get attention, how to evaluate sites, and how bid-for-attention marketplaces work."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Bidding Strategy"
keywords:
  - homepage sponsorship
  - featured placement
  - advertise on website homepage
  - homepage advertising
  - sponsored placement
pillar: true
related:
  - what-is-bid-for-attention-marketing
  - featured-placement-advertising
  - website-sponsorship-for-small-brands
  - banner-ads-vs-sponsored-placements
sample: false
---

> **Key takeaways:**
> - A homepage sponsorship puts your brand in the most visible real estate a website has — its front door — instead of hoping an ad auction shows your creative.
> - Formats range from sponsored leaderboard spots and featured listings to takeover banners and branded content blocks.
> - Evaluate any placement on real audience fit, visible prominence, and honest traffic — not just raw visitor numbers.
> - Bid-for-attention marketplaces let small brands buy this kind of placement competitively, often starting from a dollar.

## What a homepage sponsorship actually is

A homepage sponsorship is a paid placement on a website's homepage — the page every visitor passes through. Instead of buying impressions through an ad network and hoping the algorithm favors you, you buy a fixed, visible position: a featured spot, a sponsored listing, a leaderboard entry, a branded block. Your brand sits where the audience already looks.

It's one of the oldest ideas in advertising (think stadium naming rights and "brought to you by" TV spots) applied to the web's most valuable page. The homepage is the front door; a sponsorship there is a sign above it.

## Why homepages outperform inner pages

Attention concentrates at the entrance. The homepage typically gets the most visits, the longest dwell, and the most return traffic of any page on a site — it's where regulars land, where new visitors orient themselves, and where the site's identity lives. A placement there benefits from:

- **Maximum exposure.** More eyeballs per day than any other single page.
- **Context and trust.** Your brand appears as part of the site itself, not as an interruptive ad unit — the endorsement-by-association effect.
- **Return-visitor compounding.** Regulars see your placement repeatedly, which is how familiarity (and eventually preference) builds.
- **Shareability.** A distinctive homepage placement — a leaderboard position, a featured crown — is something people screenshot and talk about. Banner ads aren't.

## The main formats, compared

**Sponsored leaderboard / ranked spots.** Your brand holds a ranked position on a public board, usually ordered by bid or engagement. Competitive, visible, and inherently interesting to visitors. Best for: brands that want attention *and* the story of competing for it.

**Featured listings / spotlight blocks.** A dedicated card, banner, or section featuring your brand with logo, tagline, and link. Static but prominent. Best for: clear, always-on visibility.

**Takeover / hero placements.** Your creative dominates the homepage's main visual area for a period. Maximum impact, maximum cost. Best for: launches and big announcements.

**Sponsored content blocks.** A branded article, guide, or resource section on the homepage. Subtler, but builds authority alongside visibility. Best for: considered purchases where trust matters.

**Badge / "powered by" placements.** Small but persistent — a logo in the footer, a "sponsored by" line. Cheap, constant, low-attention. Best for: long-term association on a budget.

## What it costs (and what drives the price)

Homepage sponsorship pricing varies enormously — from a dollar on emerging marketplaces to five figures monthly on major media sites. The drivers:

- **Audience size and quality.** Raw traffic matters, but fit matters more: a thousand of your exact buyers beats a million random visitors.
- **Prominence.** Above the fold vs. below, exclusive vs. shared, static vs. rotating. Position is price.
- **Duration and exclusivity.** Longer commitments and category exclusivity cost more and deliver more.
- **The site's monetization model.** Fixed-price sponsorships, auction/bid-based placements, and performance-tied deals all price differently. Bid-based models let the market set the price — small brands can win premium-feeling placement for little when competition is low.

For small brands, the honest advice: start with bid-based or low-fixed-cost placements where you can test cheaply, measure what the visibility actually delivers, and scale what works.

## How to evaluate a homepage sponsorship opportunity

Before you pay, run this checklist:

1. **Who visits?** Ask for audience demographics or at least a clear description. A placement is only as good as its fit with your buyers.
2. **How visible is the placement, really?** Look at the homepage yourself, on mobile and desktop. Is the sponsored area prominent or buried? Do visitors actually engage with that part of the page?
3. **Is the traffic real?** This is the critical question. Ask how traffic is measured, look for signs of genuine engagement (comments, shares, return visitors), and be deeply skeptical of sites selling "traffic" that can't show human behavior. Bot traffic is worthless — worse, it poisons your analytics.
4. **What do you get, exactly?** Duration, position, creative specs, link terms (followed or nofollowed), reporting. Get it in writing.
5. **Can you test small?** The best opportunities let you start with a minimal commitment. If the minimum buy is huge and the site won't share data, walk away.

## Bid-for-attention: the marketplace model

A newer format worth understanding: **bid-for-attention marketplaces**, where homepage visibility spots are claimed and ranked by open bidding. Instead of negotiating with a sales team, you bid what the spot is worth to you — sometimes starting from as little as $1 — and the leaderboard ranks participants publicly by their total.

The model has a few properties traditional sponsorships don't: pricing is transparent (everyone sees the board), small brands compete on the same field as bigger ones, and the competitive format itself attracts visitors — people come to watch the race, which means the audience for your placement is engaged rather than incidental. Referral mechanics often stack on top: supporters sharing personal links can add to your total, turning your own audience into your bidding team.

FlexSpot is built on exactly this model: brands claim public spots on a homepage leaderboard, boost their position, and climb through a combination of their own bids and referral-driven support. If the idea of competing visibly for attention appeals to you more than quietly buying banner impressions, it's the natural place to try the format with minimal risk.

## Making the placement work: creative that earns the spot

Buying the position is half the job. The creative decides what it returns:

- **Say what you do in five words.** Homepage visitors scan; they don't study. Clarity beats cleverness.
- **One action.** The placement should drive one click to one page. Don't split the attention you just paid for.
- **Look native, not intrusive.** The best sponsored placements feel like part of the page. Match the site's visual language while keeping your identity.
- **Refresh regularly.** The same creative goes invisible to return visitors within weeks. Rotate the message, the visual, or the offer.
- **Track it.** UTM parameters on every link, a dedicated landing page where it matters. You can't optimize what you don't measure.

## Negotiating the deal: what to ask for

If you're buying from a site directly rather than through a bidding marketplace, negotiate like a buyer, not a supplicant:

- **Ask for a trial period.** A week or two at a reduced rate, with reporting. Serious sellers agree; evasive ones tell you everything.
- **Negotiate the creative terms.** How often can you swap creative? Who approves it? Can you A/B test? Flexibility is worth money.
- **Clarify the link.** Is it followed (passing SEO value) or nofollowed? Both are fine — just know which you're buying, because it changes the value calculation.
- **Get reporting in writing.** Impressions, clicks, and placement screenshots at minimum. "Trust us, it's performing" is not reporting.
- **Ask about category exclusivity.** If three direct competitors share the homepage with you, the placement is worth less. Exclusivity costs more but concentrates the value.

Small brands often assume sponsorship rates are fixed. They rarely are — especially with independent sites, where a confident, professional ask routinely moves the price.

## Red flags: sponsorship scams and junk inventory

The homepage-sponsorship world has its share of traps. Walk away when you see:

- **Traffic claims with no proof.** "500k monthly visitors" with no analytics access, no engagement signals, and a homepage that looks abandoned. Real sites show real data.
- **Prices wildly below market with no explanation.** Cheap can be legitimate (new marketplace, bid-based pricing) or a sign of bot traffic. The difference is verifiable human engagement.
- **No clear placement preview.** If the seller can't show you exactly where your brand will appear, you're not buying a placement — you're buying a promise.
- **Pressure tactics.** "This price expires today" for a sponsorship is nonsense. Legitimate inventory doesn't need countdown pressure.
- **Traffic guarantees.** Nobody can guarantee human attention. Sellers who promise specific visitor numbers are either naive or selling bots.

## Measuring ROI: did the sponsorship work?

Set the measurement up before the placement goes live:

1. **Direct response:** UTM-tagged links, dedicated landing pages, promo codes. Track clicks, signups, and sales attributable to the placement.
2. **Brand lift:** Branded search volume, direct traffic, and social mentions during the placement period vs. baseline. Sponsorships often show up here more than in last-click attribution.
3. **Cost per outcome:** Total spend divided by whatever you were buying — clicks, leads, sales. Compare against your other channels honestly.
4. **The intangible:** Screenshots of your brand on a respected homepage have PR and sales-deck value. Don't overcount it, but don't ignore it either.

Review after the first period, not after the first day. Sponsorships compound with repetition — the fifth time a regular sees your brand is worth more than the first.

## Homepage sponsorship vs. the alternatives

How does a homepage sponsorship compare to the other ways of buying attention? **Against display/banner ads:** sponsorships win on prominence and trust (you're part of the page, not an interruption) but lose on scale and targeting precision — ad networks reach millions across sites; a sponsorship reaches one site's audience deeply. **Against sponsored content and advertorials:** sponsorships win on visibility and simplicity; content wins on depth and SEO longevity. **Against influencer posts:** sponsorships win on persistence (your placement stays up; their post decays in a day) but lose on personal endorsement power. **Against paid search:** search wins on intent (the buyer is actively looking); sponsorships win on discovery (reaching people who didn't know they needed you). Smart small brands don't pick one — they use sponsorships for visible presence and discovery, and pair them with search or retargeting to capture the demand the sponsorship creates.

## The honest bottom line

Homepage sponsorships work when three things align: the right audience, genuine prominence, and real human traffic. They fail when any one is missing — the wrong audience ignores you, a buried placement wastes money, and fake traffic wastes everything. Start small, verify the traffic is human, measure the return, and scale what proves itself. The front door of the internet is for sale; just make sure you're buying the right door.

## First-timer's action plan

If you've never bought a homepage placement, here's the low-risk path: first, list three sites your buyers actually visit and check whether they sell sponsorships or run bid-based placements. Second, start with the cheapest credible option — a bid-based marketplace spot or a short trial — and set up UTM tracking before it goes live. Third, run for two to four weeks with one clear creative and one clear call to action. Fourth, review the numbers honestly against your other channels. If it works, negotiate a longer term or increase your bid; if it doesn't, you've learned cheaply what a five-figure media buy would have taught you expensively. The brands that win at sponsorships aren't the ones with the biggest budgets — they're the ones that test small, measure honestly, and scale what proves itself.

## Sponsorship formats for every budget tier

Not every brand needs the homepage hero slot. A quick menu by budget: **under $50** — bid-based leaderboard spots, newsletter classifieds, community sponsorships, and directory features; **$50–$500** — niche blog homepage features, newsletter dedicated sends, podcast mid-roll on small shows, local site takeovers; **$500–$5,000** — established niche publications, category sponsorships on directories, multi-week homepage features on mid-size sites; **$5,000+** — major media homepages, exclusivity deals, integrated campaigns. The key insight: attention quality doesn't scale linearly with price. A $50 placement on the exact right niche site routinely outperforms a $5,000 placement on the wrong big one. Buy fit first, fame second.
`,DT=`---
title: "How Boosting Moves You Up the FlexSpot Leaderboard"
description: "FlexSpot ranks spots by total boosts — every dollar moves you up. Learn how ranking, rank deltas, and the overtake meter work, plus bidding tactics that win."
date: 2026-09-22
author: "FlexSpot Team"
category: "Bidding Strategy"
keywords:
  - bidding strategy
  - boosts
  - leaderboard ranking
  - overtake
  - flexspot
pillar: false
related:
  - getting-started-with-flexspot
sample: true
---

> **Key takeaways:**
> - FlexSpot ranks every spot by total verified boosts — highest total sits at #1.
> - Every dollar counts the same; passing a rival takes their rank instantly.
> - Small, steady boosts usually beat one big splash.
> - Referral visits add $1 each (once per visitor per day) — free ranking fuel.
> - Watch the overtake meter to see exactly how far you are from the next rank.

## The one rule of ranking

Forget algorithms, engagement scores, and shadow metrics. FlexSpot ranking has
exactly one input: **total verified boosts** on your spot. The leaderboard
sorts every spot by that number, highest first. More total buzz = higher rank.
That's it — transparent, auditable, and the same for everyone.

This simplicity is the whole strategy game. You always know exactly where you
stand and exactly what it costs to move.

## How a rank change happens

When your total passes another spot's total, **you take their rank
immediately** — live, in front of everyone watching the board. The leaderboard
shows rank deltas (who climbed, who slipped) so every overtake is public. There
is no delay, no review queue, no "processing": pass the number, take the spot.

Because of this, the distance that matters is never your absolute total — it's
**the gap to the spot above you**. The overtake meter shows that gap: if you're
$6 behind #3, one $7 boost (or seven referral visits) puts you past them.

## Bidding tactics that actually work

### 1. Close the gap, don't overshoot

If the gap to the next rank is $4, a $4 boost does the job. Overshooting by $50
feels good for a minute, but that $50 could have defended you later. Precision
beats drama — except when it doesn't (see #4).

### 2. Steady beats splashy

Ten $2 boosts across a week keeps you visible on the live feed, triggers "just
boosted" toasts that other visitors see, and gives you ten chances to react to
rivals. One $20 boost gives you one. Momentum is a feature of the board's
design — use it.

### 3. Farm your referral link

Your personal referral link (create it with just your name on your spot page)
adds **$1 per visit, counted once per visitor per day**. A single tweet that
brings 30 real visitors is $30 of ranking power you didn't pay for. Put the
link in your bio, your newsletter, your launch posts — everywhere.

### 4. Know when to go big

Precision is the default, but there are moments for a statement boost: right
before a traffic spike you control (a launch, a viral post), or to take #1 when
the gap is small and the crown's social proof will pay you back in referral
visits. Big moves are marketing, not just math.

### 5. Defend from above

Rank defense is cheaper than rank recovery. If you're sitting pretty at #2,
small maintenance boosts keep the gap wide and discourage challengers. Letting
someone close the gap for free and then panic-boosting back is the most
expensive way to hold a rank.

## Reading the board like a trader

- **Rank deltas (▲/▼):** who moved in the last cycle. Fresh climbers are
  spending — expect them to keep going.
- **Live feed toasts:** "X just boosted" is intent data. A rival boosting at
  2am is committed; plan accordingly.
- **New entries:** fresh claims often come with opening boosts. Welcome them by
  staying ahead early — it's cheaper than catching up later.

## Mistakes that lose crowns

- **Boosting round numbers blindly** instead of checking the actual gap.
- **Ignoring the referral engine** — it's the only free input on the board.
- **Going dark after hitting #1.** The crown paints a target on you; winners
  keep a defense budget.
- **Boosting a spot with a dead link or vague tagline.** Rank gets you seen;
  your spot page has to convert the visit.

## Start with the basics

New here? [Getting Started with FlexSpot](/blog/getting-started-with-flexspot)
covers claiming your first $1 spot and setting up your page. Then come back and
make your run.
`,MT=`---
title: "How Much Does It Cost to Advertise a Small Business? (Real Numbers)"
description: "How much does advertising cost for a small business? Honest 2026 numbers for Google, Meta, sponsorships, and free channels — plus budgeting rules. Plan smarter."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Small Business Marketing"
keywords:
  - how much does advertising cost small business
  - small business advertising cost
  - advertising budget small business
  - cost of advertising 2026
pillar: false
related:
  - cheap-ways-to-advertise-a-small-business
  - small-business-advertising-ideas-under-50
  - how-to-advertise-your-small-business-online-for-free
---

> **Key takeaways:**
> - Small-business ad costs vary wildly by channel: free (directories, communities) to a few dollars (micro-sponsorships, $1 visibility spots) to $1–$5+ per click (Google/Meta).
> - The honest budgeting rule: 5–10% of revenue for growth-stage businesses, with a separate small test budget for experiments.
> - Cost-per-click is a vanity metric; cost-per-acquisition is the number that decides your budget.
> - Start with free and micro-paid channels to learn what converts before touching expensive auctions.
> - Revisit costs every 6 months — ad prices and platform effectiveness shift constantly.

## Why "it depends" is actually the answer

Ask ten sources what advertising costs and you'll get ten numbers, because the
real answer depends on channel, niche, geography, and — most of all — what
you're measuring. This post gives you honest ranges, what drives them, and how
to build a budget from them. Treat every number as an order-of-magnitude guide
for 2026, not a quote: ad auctions move constantly.

## The cost landscape: channel by channel

**Free channels ($0):** Google Business Profile, directories, review
platforms, communities, partnerships, organic social, content, email (free
tiers), PR outreach. Cost: your time — typically 5–10 hours/week to do one
channel well.

**Micro-paid ($1–$50/test):** newsletter sponsorships ($10–$50 per mention),
small podcast mentions ($15–$50), community sponsorships ($10–$25/month),
homepage visibility spots on placement marketplaces (FlexSpot bidding starts
from $1), boosted posts ($10–$25), flyers and local print ($15–$40 per batch).
These are the cheapest ways to put your brand in front of real, specific
audiences.

**Social ads ($0.50–$3 per click typical for SMBs):** Meta (Facebook/Instagram)
and TikTok. Consumer niches with broad appeal trend cheaper; narrow B2B
audiences trend pricier. Creative quality moves the needle more than budget at
small spend — one good video can halve your cost per click.

**Search ads ($1–$5+ per click typical; competitive niches much higher):**
Google Ads. You're bidding against everyone who wants the same keyword, so
legal, finance, and SaaS keywords can run far above these ranges. The golden
rule: bid only on buying-intent keywords. Paying $3 for "hire divorce lawyer
Dubai" can be profitable; paying $3 for "what is divorce law" is a donation.

**Traditional (highly variable):** local newspaper ads ($200–$1,000+), radio
spots ($200–$500+ per week locally), direct mail ($0.50–$2 per piece all-in),
event sponsorships ($100–$5,000+). Still viable for local businesses with local
customers — but test small first.

## The only cost metric that matters: cost per acquisition

Cost-per-click and cost-per-impression are interesting; **cost per acquisition
(CPA)** — what you pay for one customer, client, or sale — is the number that
runs your business.

The math is simple:

- CPA = total ad spend ÷ number of customers acquired.
- Your advertising is sustainable when CPA is comfortably below your gross
  profit per customer (many businesses target CPA at 20–30% of customer
  lifetime value).

Example: you spend $200 on ads, get 400 clicks ($0.50 CPC), 20 of them buy
($60 product, $30 gross profit each = $600 gross profit). Your CPA is $10
against $30 profit — healthy. The same $0.50 CPC with zero conversions is
$200 set on fire. **Same click cost, opposite businesses.** Always optimize to
CPA, not CPC.

## Budgeting rules that actually work

**The percentage rule.** Growth-stage small businesses commonly reinvest
5–10% of revenue into marketing (established, maintain-mode businesses often
less; aggressive growth phases more). If you do $10,000/month in revenue, that's
$500–$1,000/month. If you're pre-revenue, budget a fixed amount you can afford
to lose while learning — even $100–$200/month teaches you a lot if spent as
tracked tests.

**The 70/20/10 split.** 70% into the channel already working, 20% into
improving conversion (better pages, better offers, email follow-up), 10% into
experiments. Most small businesses invert this — 90% experiments, 10% what
works — and wonder why nothing compounds.

**The test-budget rule.** Every new channel gets a small, fixed test budget
you're willing to lose ("buying data, not customers"). Define the kill rule in
advance: no directional results in 2–4 weeks at test spend means cut it.

**The free-first rule.** Before spending on any channel, exhaust the free
version: organic social before social ads, SEO/content before search ads,
community presence before sponsorships. Free channels teach you messaging; paid
channels amplify it.

## What small businesses actually spend: three scenarios

**Scenario A — local service, $0–$100/month.** Google Business Profile +
reviews + community presence (free), one $30 newsletter or community
sponsorship, flyers in partner businesses. Realistic and effective.

**Scenario B — online startup, $200–$500/month.** Content + communities (free
labor), 2–3 micro-sponsorships ($75–$150), one $200 paid test per month with
strict tracking, retargeting once traffic exists.

**Scenario C — growing SMB, $1,000–$3,000/month.** 70% into the proven channel
(often search or social ads by this stage), 20% into conversion improvements
and email, 10% testing new channels like podcasts or placement marketplaces.

Notice the pattern: free and cheap channels dominate early budgets. Expensive
auctions are for later, when you know your numbers.

## Hidden costs people forget

- **Creative production.** Ads need images, video, copy. DIY is free but slow;
  freelancers run $25–$200 per asset.
- **Landing pages.** Sending paid traffic to a generic homepage wastes the
  spend. Budget time (or money) for dedicated pages.
- **Management time.** Even $200/month in ads needs weekly check-ins, or it
  drifts.
- **Learning curve.** Your first month on any platform is tuition. Budget for
  it mentally and financially.

## When to increase the budget

Scale spend only when three things are true: (1) you know your CPA and it's
profitable, (2) the channel still has headroom (audience isn't exhausted —
watch frequency and CPA trends), and (3) your operations can handle more
customers. Scaling unprofitable ads just loses money faster. The best
advertising budget is the one your numbers justify, reviewed monthly.

For the tactics behind these numbers, see [Cheap Ways to Advertise a Small Business](/blog/cheap-ways-to-advertise-a-small-business)
and [30 Ideas Under $50](/blog/small-business-advertising-ideas-under-50) — and if you're starting from zero,
[How to Advertise Online for Free](/blog/how-to-advertise-your-small-business-online-for-free).

## Cutting costs without cutting results

If the numbers above feel steep, these levers lower your costs without
lowering your standards:

- **Narrow the targeting.** Broad audiences waste spend on the uninterested.
  Every targeting refinement — geography, interests, keywords, placements —
  typically lowers cost per acquisition.
- **Improve the landing page first.** Doubling conversion rate halves your cost
  per acquisition at the same ad spend. Page improvements are the cheapest
  "ad cost reduction" available.
- **Use cheaper formats.** Video and UGC-style creative often outperform
  polished ads at lower production cost. User-generated content and phone-shot
  video are legitimate creative strategies, not compromises.
- **Buy underpriced attention.** Newer platforms, niche newsletters, small
  podcasts, and emerging placement marketplaces price attention below its
  value because they lack the auction competition of Google and Meta. This
  arbitrage closes over time — use it while it lasts.
- **Negotiate direct buys.** Anything sold directly (sponsorships, placements,
  local media) has a negotiable price. Longer commitments, off-peak timing,
  and bundled placements all earn discounts — just ask.
- **Reinvest profits, not hope.** Scale only the channels with proven,
  profitable CPAs. Every dollar of proven-channel spend is cheaper than a
  dollar of experimental spend, because the experimental dollar might return
  zero.

## Revisiting your costs every 6 months

Ad costs are not static. Platform auctions shift, new channels emerge, old
ones saturate, and your own conversion rates change as your site improves.
Twice a year, re-run the math: current CPA per channel, current budget split,
and one new experiment queued. Businesses that do this stay efficient;
businesses that "set and forget" slowly pay more for less. The cheapest
advertising budget is an actively managed one.
`,BT=`---
title: "How to Advertise Your Small Business Online for Free"
description: "How to advertise a small business online for free: directories, Google Business Profile, communities, partnerships, and content tactics at $0. Start this week."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Small Business Marketing"
keywords:
  - how to advertise a small business online for free
  - free online advertising small business
  - promote business free online
  - free advertising sites
pillar: false
related:
  - cheap-ways-to-advertise-a-small-business
  - where-can-i-advertise-my-business-for-free
  - free-ways-to-get-website-traffic
---

> **Key takeaways:**
> - Free online advertising is real — directories, profiles, communities, and partnerships cost time, not money.
> - Start with the assets you own: Google Business Profile, niche directories, and review platforms.
> - Communities and partnerships send your first real customers; content compounds for the long term.
> - "Free" tactics that are actually spam (comment links, fake reviews) will damage you — skip them.
> - Even a $0 budget benefits from one tiny paid test later to learn what messaging converts.

## Free advertising is a time budget, not a money budget

Let's be honest up front: nothing here costs money, but everything costs
hours. If you have more time than budget — the classic small-business
position — these tactics genuinely work. If you have neither time nor money,
no tactic will save you; that's a business-model problem, not a marketing
problem.

This guide is the $0 companion to our [cheap advertising pillar](/blog/cheap-ways-to-advertise-a-small-business).
That one covers tactics up to $50; this one stays at exactly zero.

## 1. Google Business Profile (local businesses: start here)

If customers can visit you — or you serve a local area — your Google Business
Profile is the single most valuable free advertising asset online. It puts you
on Google Maps and in local search results, often above websites.

Do it properly, not minimally:

- Fill in **every** field: categories, hours, services, description, attributes.
- Add real photos — storefront, team, work, products. Profiles with photos get
  dramatically more engagement.
- Post updates weekly (offers, events, news) — it signals an active business.
- Respond to every review, good and bad, professionally. Your responses are
  advertising to the next hundred readers.
- Add your products/services with descriptions — this is free keyword-rich
  real estate.

Also claim Apple Business Connect and Bing Places — ten minutes each for
coverage on iPhones and Bing.

## 2. Free directories and listing sites

Beyond Google, get listed anywhere your buyers browse:

- **Niche directories** in your industry (these often outrank general ones for
  buyer intent).
- **Local directories**: Yelp, Yellow Pages equivalents, chamber of commerce
  listings, city guides.
- **Product/service marketplaces**: Etsy, Amazon, app stores, software
  directories (G2, Capterra have free tiers), freelance platforms.
- **Classifieds**: Craigslist, Gumtree, Facebook Marketplace, Dubizzle (UAE) —
  free listings for suitable products and services.

Prioritize completeness over quantity: a fully filled-out profile with photos
and a clear offer beats ten bare listings.

## 3. Review platforms (free advertising that compounds)

Reviews are advertising written by your customers, for free, that shows up
exactly when buyers are deciding:

- Identify the 1–2 review sites your buyers actually check (Google for local,
  TripAdvisor for hospitality, G2/Capterra for software, Trustpilot for
  e-commerce).
- Ask at the moment of delight — right after a great outcome — with the direct
  link ready. "Would you mind leaving us a quick review? Here's the link"
  outperforms a generic plea every time.
- Respond to all of them. A thoughtful owner response turns even a 3-star
  review into a trust signal.

Never buy or fake reviews. Platforms detect it, competitors report it, and one
exposed fake-review scheme destroys more trust than a hundred real reviews
build.

## 4. Social media (organic)

You don't need ads to get value from social — but you do need a strategy
beyond "post and hope":

- **Pick one platform** where your buyers actually spend time. (B2B: LinkedIn.
  Visual/consumer: Instagram, TikTok. Local community: Facebook.)
- **Post natively and consistently**: 3–5 times a week, native formats, real
  engagement in comments. Algorithms reward consistency and punish link-drops.
- **Show the work**: behind-the-scenes, process videos, customer results,
  honest opinions. People follow people, not logos.
- **Use the free features**: stories, reels/shorts, live sessions, polls —
  platforms push their newest formats hardest.

Social rarely converts cold followers directly. Its free-advertising job is
awareness plus a path back to your email list or site.

## 5. Communities where your buyers gather

Reddit, Facebook and LinkedIn groups, niche forums, Discord servers, Quora:
free access to concentrated buyer attention.

- Lurk first. Learn the norms, the recurring questions, the trusted voices.
- Answer thoroughly from real expertise. The best answers get upvoted, saved,
  and linked — for years.
- Keep promotion in your profile and signature, not your posts. When your link
  directly answers a question, it's welcome; when it's shoehorned in, it's
  spam.

One genuinely excellent answer in the right community can outperform months of
social posting.

## 6. Content marketing (the slow compounder)

A blog, a YouTube channel, a newsletter — pick the format you can sustain and
answer your buyers' real questions in it:

- Mine your inbox: every repeated customer question is a content piece with
  guaranteed demand.
- Target specific questions, not broad topics. "How to price wedding
  photography in Dubai" beats "photography tips."
- Repurpose each piece across 2–3 formats to multiply reach without
  multiplying work.

Content takes months to compound. Start it now anyway — future you will be
grateful.

## 7. Partnerships and cross-promotion

Free, fast, and underused: partner with a non-competing business serving your
same customers.

- Newsletter swaps, guest posts, co-hosted webinars or live sessions, bundled
  offers, referral exchanges.
- Pitch with specifics and make saying yes easy ("I'll draft it, you approve").
- Local version: the café displays your cards, you display theirs; the gym
  recommends your physio practice, you recommend their classes.

One good partner can become a permanent free channel.

## 8. Email marketing (free tiers)

Email providers offer generous free tiers (typically up to hundreds or a few
thousand subscribers). Build the list from day one with one genuinely useful
lead magnet — a checklist, template, or mini-guide — and send a short, useful
newsletter regularly. Email converts better than any free channel because the
audience opted in.

## 9. PR and expert quotes (free credibility)

Journalists need expert quotes constantly. Respond to reporter requests
(HARO/Connectively, #journorequest, niche equivalents), or pitch a sharp
opinion or useful data point to writers covering your space. One quote in a
real publication is free advertising plus a backlink plus credibility you can
quote forever.

## 10. Referrals: turn customers into advertisers

The cheapest advertiser is a happy customer with an easy way to share:

- Ask for referrals at the right moment (after a win, not at random).
- Make it frictionless: a simple link, a pre-written message they can forward,
  a small thank-you for both sides.
- Feature customers publicly — people share what they're featured in.

## Free-advertising traps to avoid

- **Comment spam and link-dropping.** Deleted, ignored, brand-damaging.
- **Fake reviews or testimonials.** Detectable, reportable, trust-destroying.
- **"Free traffic" schemes** — bulk visitor packages, traffic exchanges. Bots
  that corrupt your analytics and convert at zero.
- **Doing everything at once.** Pick three tactics, run them 90 days, then
  expand. Dabbling is the most expensive "free" strategy there is.

## Your $0 30-day starter plan

Week 1: Google Business Profile + key directories + review-platform setup.
Week 2: join 3 communities, start answering; fix up one social profile properly.
Week 3: email three potential partners; ask five happy customers for reviews.
Week 4: publish your first answer-style content piece; set up email capture.
Then repeat monthly, doubling down on whatever sent real prospects.

When you're ready to add a small budget, the [cheap advertising pillar](/blog/cheap-ways-to-advertise-a-small-business)
picks up where this leaves off — and [25 free places to list your business](/blog/where-can-i-advertise-my-business-for-free)
gives you the directory hit-list.

## When free isn't enough: the $1 upgrade path

Free tactics build your foundation, but there comes a point where a tiny spend
unlocks disproportionate results — usually when you need speed (a launch, an
event) or data (which message converts?). The smart upgrade path:

1. **First $1–$10:** a bid-for-visibility spot or micro-sponsorship to test
   messaging in front of a real audience.
2. **First $25–$50:** boost your best organic content or run a one-week
   targeted ad test with strict tracking.
3. **Ongoing:** reinvest a fixed percentage of revenue (5–10% is the common
   growth-stage rule) into whatever the tests proved.

The key: free taught you the message; paid amplifies it. Spending before
you've learned the message is the most common way small budgets get wasted.
`,IT=`---
title: "How to Drive Traffic to a Brand-New Website (First 90 Days)"
description: "How to drive traffic to a new website from day one: the 90-day launch plan with weekly actions, quick wins, compounding tactics, and a launch checklist."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Visibility Guides"
keywords:
  - how to drive traffic to a new website
  - new website no traffic
  - launch website traffic
  - first 90 days website
pillar: false
related:
  - how-to-get-traffic-to-your-website
  - free-ways-to-get-website-traffic
  - how-to-make-your-brand-go-viral
---

> **Key takeaways:**
> - New sites get zero search traffic at first — plan for referrals, communities, and your existing network in month one.
> - A launch checklist (analytics, email capture, 5–10 core pages) comes before any promotion.
> - Borrowed audiences — partners, communities, directories, small creators — are the fastest legitimate traffic for new sites.
> - Start SEO on day one anyway; it compounds while your short-term tactics carry the load.
> - By day 90 you should know which one channel works — then double down on it.

## The new-website reality check

A brand-new website sits in a tough spot: search engines haven't learned to
trust it, you have no audience to announce to, and every tactic that compounds
takes months to kick in. That's normal. The 90-day plan below is built around
that reality — quick wins first, compounding assets from day one, and a clear
decision point at the end.

This post is different from our general traffic guide: it's a launch sequence,
not a menu. Follow it in order.

## Days 1–7: Build the foundation

Before promoting anything, make the site ready to receive visitors:

- **Install analytics** (and Search Console / Bing Webmaster Tools) on day one.
  You can't optimize what you don't measure, and search consoles need time to
  collect data.
- **Write 5–10 core pages** before launch: homepage, key service/product pages,
  about, contact, and 2–3 answer-style articles targeting specific buyer
  questions. Launching with one page and "coming soon" everywhere kills
  momentum.
- **Add email capture** — a simple form offering something genuinely useful (a
  checklist, a starter guide, early access). Your launch visitors are your most
  valuable; don't let them leave without a way back.
- **Check the fundamentals:** loads fast, works on a phone, titles read like
  headlines, one clear call-to-action per page.
- **Claim your profiles:** Google Business Profile (if local), plus the social
  handles you'll actually use. Link everything to the site.

## Days 8–30: Borrowed audiences (your fastest traffic)

New sites don't have audiences — so borrow them. These tactics work in week
two, not month six:

- **Announce to your existing network.** Email your contacts, post on your
  personal social accounts, tell relevant group chats. Ask for feedback, not
  just visits — feedback gets replies, and replies get reshares.
- **Post genuinely useful answers** in 2–3 communities where your buyers
  already hang out. Pick threads where your expertise directly applies; don't
  spam your link — let curious people find it in your profile or when it's
  genuinely the answer.
- **Get listed everywhere relevant, immediately.** Niche directories, product
  hunt-style launch sites, local directories, industry "best of" lists, app
  marketplaces. Each takes under an hour and starts a small permanent stream.
- **Pitch 5 small podcasts or newsletters** in your niche. Small hosts say yes;
  their audiences trust them. One appearance can outperform a month of posting
  into the void.
- **Find one peer for an audience swap.** A business serving your same buyers
  (non-competing) mentions you in their newsletter; you return the favor.
  Both sides get their best subscribers' attention for free.
- **Consider a tiny paid visibility test.** When organic channels are at zero,
  a small, honest paid placement — a niche newsletter sponsorship, or a
  low-cost featured spot on a site your buyers browse — buys you real
  visitors and, just as importantly, data on what messaging converts. Start
  small and treat it as buying information.

Set a modest goal for month one: your first 500–1,000 real visitors and your
first 50 email subscribers. That's a win for a new site.

## Days 31–60: Start the compounding engines

With foundation and first visitors in place, start the slow-burn tactics that
pay off in months 3–12:

- **Publish one strong answer-piece per week.** Target the specific,
  low-competition questions your buyers ask. New pages take months to rank —
  every week you delay is a week lost.
- **Begin a consistent social rhythm** on one platform: 3–5 posts a week,
  native format, real engagement in comments. Document the build — behind-the-
  scenes content performs well for new brands because people root for the
  underdog.
- **Turn early customers into content.** Testimonials, mini case studies,
  before/after stories. Social proof doubles as shareable content and
  conversion fuel.
- **Repurpose each piece** into a thread, a short video, and a newsletter
  section. You're still small — squeeze maximum reach from minimum output.
- **Keep pitching:** two guest posts, five more podcast/newsletter pitches.
  This is a pipeline; most replies come weeks after you send.

By day 60, your analytics should show the first trickle of search impressions
in Search Console — that's the compounding engine warming up, not failing.

## Days 61–90: Find your one channel

Now you have 60 days of data. Look at it honestly:

- Which channel sent the most visitors who actually stayed and converted?
- Which tactic felt sustainable — could you do it weekly for a year?
- Where did your email subscribers come from?

**Double down on the winner.** Shift 70% of your effort to the one channel
showing real traction. Keep the others on maintenance mode. Most new sites
fail by staying spread thin; the ones that break through go deep on one thing
that works.

Also at day 90: refresh your two best-performing pages to make them more
complete, and start planning your first bigger push (a launch event, a
partnership, a small campaign) around what's working.

## New-site mistakes that waste the first 90 days

- **Waiting for "perfect" before launching.** Ship with 5–10 good pages;
  perfection is procrastination.
- **Publishing into the void with no distribution.** Every piece needs a
  promotion plan — a community, a partner, a newsletter — or it's a diary.
- **Judging SEO at day 30.** Search traffic for new sites is a 3–6 month game.
  Day-30 search numbers mean nothing.
- **Buying bulk traffic to "look busy."** Bots don't buy, and they corrupt the
  analytics you need to make real decisions.
- **No email capture.** Launch traffic is a one-time gift; without capture,
  every visitor is gone forever.

## What success looks like at day 90

Realistic targets: 1,000–5,000 total visitors (heavily dependent on niche and
effort), 100–300 email subscribers, first search impressions turning into
clicks, and — most importantly — one channel you can name as "the thing that
works." From there, it's scaling, not searching.

Next reads: the full menu of tactics in [How to Get Traffic to Your Website](/blog/how-to-get-traffic-to-your-website), and the deep list of [21 Free Ways to Get More Website Traffic](/blog/free-ways-to-get-website-traffic).

## Launch-day checklist

When the site goes live, run this checklist in order — it's the difference
between a launch that fizzles and one that starts your traffic engine:

- [ ] Analytics, Search Console, and Bing Webmaster Tools installed and verified
- [ ] 5–10 core pages published (no "coming soon" pages)
- [ ] Email capture live with a real lead magnet
- [ ] Google Business Profile claimed (if local) + key directories submitted
- [ ] Social profiles complete with working links
- [ ] Announcement drafted for your network (email + personal social + group chats)
- [ ] 3 communities identified with your first genuinely useful posts ready
- [ ] 5 podcast/newsletter pitches sent
- [ ] 1 partner outreach email sent
- [ ] Sitemap submitted to search consoles; site submitted for indexing
- [ ] One small paid visibility test planned (even $10–$25 teaches you what converts)

Launch day isn't about traffic volume — it's about starting every engine at
once so data starts flowing. The visitors come in weeks 2–12; launch day buys
you the feedback to earn them.
`,LT=`---
title: "How to Get More Referrals for Your Business (Without Being Pushy)"
description: "How to get referrals for your business without awkward asks: timing, scripts, referral triggers, and systems that make customers want to spread the word."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Small Business Marketing"
keywords:
  - how to get referrals for my business
  - get more referrals
  - referral generation
  - ask for referrals
pillar: false
related:
  - referral-marketing
  - how-to-start-a-referral-program
  - word-of-mouth-marketing
sample: false
---

> **Key takeaways:**
> - Most businesses don't have a referral problem — they have an asking problem. The fix is timing and ease, not pressure.
> - Ask at peak satisfaction moments, give customers the exact words and link, and make sharing take seconds.
> - Build referral triggers into your process so asking happens automatically, not when you remember.
> - Track who refers and thank them every time — acknowledged advocates refer again.

## Why you're not getting referrals (it's not what you think)

When referrals don't come, owners usually blame the customers ("they're not loyal") or the offer ("we need a bigger incentive"). In practice, the cause is almost always simpler: **you never asked, or you asked badly.** Happy customers are busy; recommending you isn't on their to-do list unless you put it there at the right moment with zero friction.

The good news: this is the easiest growth problem to fix. You don't need a new product or a bigger budget — you need better timing, better words, and a system that asks for you.

## The golden moments: when to ask

Timing beats scripting. Ask when satisfaction peaks:

- **Right after a compliment.** "I'm so glad — would you be open to telling a friend?" This is the single highest-converting moment in referral generation.
- **At delivery or completion.** The project finished, the order arrived, the problem is solved — strike while the relief and delight are fresh.
- **When they get a result.** The first measurable win — money saved, time freed, problem gone — is when your value is most concrete in their mind.
- **During onboarding highs.** Early "wow" moments (the quick win in week one) are referral gold, because enthusiasm is highest before routine sets in.
- **After you go above and beyond.** The fixed mistake, the free upgrade, the personal favor — generosity creates a reciprocity itch that a referral scratches perfectly.

Build a list of your business's five golden moments and attach an ask to each one. That's your referral system.

## What to actually say (scripts that don't feel salesy)

The fear of sounding pushy comes from bad scripts. Good ones are short, specific, and give the customer an easy out:

- **The direct ask:** "If you know anyone dealing with [specific problem], I'd genuinely appreciate an intro — here's a link that makes it easy: [link]"
- **The helpful frame:** "A lot of our best customers came from friends. If someone comes to mind who'd benefit, feel free to forward this: [link]"
- **The specific ask:** Vague asks ("tell your friends!") fail. Specific asks ("know any restaurant owners struggling with bookings?") trigger actual names in people's heads.
- **The email version:** Subject: "Quick favor?" — Body: "Loved working with you on [project]. If anyone in your network needs [outcome], an intro would mean a lot. Here's my calendar link / referral link: [link]. Either way, thanks!"
- **The in-person version:** "Who's one person you know who'd love this as much as you do?" One person. Not "your friends." One person is answerable.

Key principle: you're asking for an introduction to help someone, not begging for business. Frame it as generosity and it feels like generosity.

## Make it effortless: the referral kit

Every "yes" dies in friction. Give willing referrers everything they need in one place:

- **Their personal link or code** — no generic homepage URLs.
- **A pre-written message** they can forward in one tap (two versions: casual for friends, professional for colleagues).
- **A one-liner about you** they can repeat: what you do and for whom, in plain words.
- **For in-person businesses:** a physical card or QR code they can hand over.

Test it yourself: can a customer go from "sure, I'll refer you" to "message sent" in under 30 seconds? If not, simplify.

## Systematize it: build referral triggers into your process

Willpower-based asking fails. System-based asking compounds. Install these triggers:

1. **Post-purchase email sequence.** Day 3: check-in. Day 14 (after they've experienced value): the referral ask with their link.
2. **CRM reminders.** Tag happy customers; when a compliment is logged, the follow-up task is the referral ask.
3. **The receipt/packaging ask.** A QR code and one line on receipts, packaging, or confirmation pages: "Love it? Share your link."
4. **The review-to-referral bridge.** After someone leaves a positive review, immediately follow with: "Thanks! Know someone who'd love the same? Here's your link."
5. **Quarterly advocate check-ins.** Personally message your top referrers: thank them, share what's new, and ask who else comes to mind.

## Thank every referrer, every time

This is the step everyone skips, and it's the one that determines whether referrals are a one-time event or a habit:

- **Immediate:** A personal thank-you within 24 hours. Not automated (or not *only* automated).
- **Visible:** With permission, spotlight referrers publicly — a thank-you post, a "top supporters" list. Recognition compounds.
- **Rewarded:** Deliver whatever you promised, fast. Late rewards teach people that referring you isn't worth it.
- **Updated:** Tell the referrer what happened — "Your friend signed up!" Closing the loop makes them feel effective, which makes them do it again.

People repeat behaviors that get acknowledged. Silence is how referral sources go cold.

## The referral mindset shift

Here's the reframe that makes all of this natural: stop thinking of referrals as asking for favors, and start thinking of them as **offering value to two people at once**. Your happy customer gets to look helpful and generous; their friend gets a solution to a real problem; you get a customer. When the experience is genuinely good, withholding the ask doesn't protect the relationship — it deprives the friend of something useful. The businesses that generate the most referrals aren't the pushiest. They're the ones whose customers feel *good* about sharing, because sharing genuinely helps someone they care about. Build that feeling into every step — the timing, the words, the reward, the thank-you — and referrals stop being a tactic and start being a reflex.

## What to do when referrals still don't come

If you've asked well, timed it right, removed friction, and thanked people — and referrals still trickle — the problem is upstream: the experience isn't remarkable enough yet. Go back to the product and service. Interview your happiest customers and ask what nearly stopped them from buying, what delighted them most, and what they'd change. Fix what you find. Referral generation is a diagnostic tool as much as a growth channel — when the engine is healthy, the referrals follow.

## Keep a referral swipe file

Every time you see a referral ask done well — a clever post-purchase email, a smooth in-app prompt, a referral card handed to you in a store — save it. Over months you'll build a swipe file of real-world examples matched to your industry, which beats any generic template when it's time to refresh your own asks. Pay special attention to the *moment* each example chose: the best referral generation isn't about the cleverest copy, it's about the ask arriving at the exact second the customer is happiest. Collect moments, not just messages, and your referral system will keep getting sharper.
`,$T=`---
title: "How to Get Traffic to Your Website: The 2026 Playbook (Free + Paid)"
description: "Learn how to get traffic to your website with this honest 2026 playbook — free tactics that compound, paid channels that convert, and mistakes to avoid."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Visibility Guides"
keywords:
  - how to get traffic to my website
  - website traffic
  - free website traffic
  - increase website visitors
pillar: true
related:
  - free-ways-to-get-website-traffic
  - how-to-drive-traffic-to-a-new-website
  - should-you-buy-website-traffic
---

> **Key takeaways:**
> - Traffic comes from four engines: search, social, referrals, and paid — most sites should pick one to master before adding a second.
> - Free traffic compounds but is slow; paid traffic is fast but stops the moment you stop paying. Healthy sites use both.
> - The single highest-leverage move for most small sites is answering specific questions searchers actually type, not broad topics.
> - Buying cheap bulk traffic is a trap — it adds zero real visitors and can hurt your analytics and ad accounts.
> - Measure channel-by-channel, keep what converts, and give every tactic a real time window (60–90 days) before judging it.

## Why most traffic advice doesn't work

Search "how to get traffic to my website" and you'll get the same list from
every article: start a blog, post on social media, run ads, do SEO. It's all
true and all useless, because it skips the two questions that actually decide
whether tactics work: **which one matches your situation**, and **how much
effort each one really takes before it pays off**.

A brand-new bakery website and a three-year-old SaaS blog do not need the same
plan. The bakery needs local foot traffic this month; the SaaS needs compounding
search traffic over a year. This guide sorts the tactics by what they cost, how
fast they work, and who they're for — so you can build a traffic plan instead
of a wishlist.

## The four traffic engines

Every visitor your site gets arrives through one of four channels:

1. **Search** — people typing questions into Google, Bing, or AI search tools.
2. **Social** — people clicking through from posts, videos, and communities.
3. **Referral** — people clicking links on other websites: directories, press,
   newsletters, partner sites, forums.
4. **Paid** — people arriving from ads you purchased.

A fifth category exists for most businesses: **direct and repeat visitors**
(email subscribers, bookmarkers, people who type your URL). These are your
most valuable visitors, but they're downstream of the other four — you earn
them by delivering for first-time visitors.

The practical takeaway: **pick one engine as your primary and get good at it**
before adding a second. Spreading thin effort across five channels is the most
common reason small sites stall.

## Free tactic 1: Answer specific questions (search)

Search traffic is the highest-quality free traffic because it captures intent:
the person typing "best invoicing app for freelancers in Dubai" already wants
what you sell. The mistake most sites make is targeting broad topics ("small
business accounting") instead of specific questions they can actually rank for.

How to do it concretely:

- List the 30–50 exact questions your customers ask you — in emails, calls,
  DMs, support tickets. Use their phrasing, not yours.
- Write one focused page or post per question. A page that tries to answer five
  questions answers none of them well.
- Put the direct answer in the first two paragraphs, then add the detail and
  examples below. This satisfies both impatient readers and search engines.
- Internal-link related pages together so a visitor who lands on one question
  naturally discovers three more.

Realistic timeline: brand-new pages often take 3–6 months to earn meaningful
search traffic. Pages on very specific, low-competition questions can rank in
weeks. If you can't wait 90 days, search shouldn't be your primary engine —
yet.

## Free tactic 2: Borrow other people's audiences (referrals)

Referral traffic is the most underrated free channel because it sounds
old-fashioned. It's not — it includes guest posts, podcast appearances,
newsletter mentions, directory listings, community answers, and press quotes.
The mechanism is simple: find pages that already reach your buyers, and earn a
place on them.

Where to start:

- **Directories and marketplaces** in your niche. These are free listings that
  take an hour and send trickle traffic for years.
- **Help-a-reporter style requests and expert roundups.** Journalists
  constantly need quotes; a good answer gets your link in an article that ranks.
- **Guest posts on mid-size blogs**, not giant ones — mid-size editors actually
  reply, and their audiences are more engaged.
- **Thoughtful answers** in communities where your buyers gather (Reddit, niche
  forums, Facebook/LinkedIn groups, Discord servers). The rule: be genuinely
  useful first; the profile or link comes along naturally.

The quality bar here is high and getting higher. One genuine, relevant link
from a site your buyers trust beats a hundred low-quality directory links —
and low-quality link schemes can get you penalized. Build links you'd want even
if search engines didn't exist.

## Free tactic 3: Publish where attention already flows (social)

Social traffic is fast and fickle. A post can send thousands of visitors today
and zero tomorrow. That makes it a poor foundation but an excellent amplifier
— especially for launches, promotions, and content that deserves an initial
push.

What actually works per platform pattern:

- **Short video** (TikTok, Reels, Shorts): show the problem and the outcome in
  under 30 seconds. Link in bio/Profile; pin a comment with the URL.
- **Long-form communities** (Reddit, X/Twitter threads, LinkedIn): one sharp
  insight per post, posted natively — not a link drop with "check out my blog."
- **Repurposing**: one solid piece of content should become a thread, a short
  video, three quote graphics, and a newsletter section. Most people publish
  once and move on; winners squeeze every drop.

Social rarely converts cold visitors directly — treat it as the top of your
funnel and give people a reason to come back (an email list, a useful tool, a
community).

## Paid traffic that isn't a money fire

Paid traffic fails for most small businesses for one reason: they buy clicks
before their page is ready to convert them. Sending paid visitors to a vague
homepage is burning money. Before spending anything, have a page that clearly
says what you offer, who it's for, and what to do next.

Paid channels worth knowing, roughly cheapest-to-most-expensive to test:

- **Niche sponsorships and featured placements.** Newsletters, podcasts, and
  websites in your niche often sell placement directly — sometimes for very
  little. Because the audience is pre-selected, small budgets can outperform
  big-platform ads. Marketplaces that let brands bid for homepage visibility
  spots (like FlexSpot's $1-start leaderboard) are a modern version of this:
  you pay for placement where real visitors browse, not for clicks that may
  never come.
- **Social ads with tight targeting** (Meta, TikTok): good for consumer offers
  with a clear visual hook. Start with a small daily budget, one audience, one
  creative — then scale only what beats your break-even cost per conversion.
- **Search ads** (Google Ads): the intent is gold but competition sets the
  price. Bid only on keywords close to a purchase decision ("hire X", "X
  pricing"), not research queries you'll pay for and never convert.

Set a test budget you're genuinely willing to lose — think in terms of "I'm
buying data, not customers" for the first run — and kill fast what doesn't
work.

## The traffic trap: buying cheap bulk visitors

If you search "buy website traffic," you'll find services selling thousands of
visitors for a few dollars. Here's the honest version: **those are bots or
incentivized click-farms, not buyers.** They don't read, don't subscribe, and
don't purchase. Worse, they pollute your analytics (so you can't tell what real
marketing is doing), and in some cases violate ad-platform policies.

There's a legitimate version of "paying for visitors" — it's called buying
*placement and visibility* in front of real audiences: sponsorships, featured
listings, paid newsletters. The difference is who the audience is. If you can't
name the humans who'll see your brand, you're buying numbers, not traffic. (We
break this down fully in [Should You Buy Website Traffic?](/blog/should-you-buy-website-traffic).)

## How to pick your traffic mix

Match the engine to your situation:

- **New site, no budget:** one search tactic (answer specific questions) + one
  referral tactic (communities/directories). Reinvest nothing because there's
  nothing to reinvest — reinvest time.
- **New site, small budget:** add one cheap paid test (a niche sponsorship or
  a small featured placement) to learn what messaging converts while organic
  builds.
- **Established site, steady revenue:** double down on the channel already
  working (check your analytics — most sites have one clear winner), add email
  capture everywhere, and only then experiment with a second channel.
- **Launch or event with a deadline:** paid + social + partner referrals. Long-
  term organic tactics can't hit a date.

A useful rule of thumb: **spend 70% of your effort on the channel already
working, 20% on improving conversion of that traffic, 10% on experiments.**
Most sites do the inverse and wonder why nothing compounds.

## Measuring what matters (and ignoring the rest)

Install basic analytics if you haven't, then look at three things per channel:

1. **Visitors** — is the channel actually sending people?
2. **Behavior** — do they stay, read, click? (Time on page and pages per
   session beat raw visitor counts.)
3. **Conversions** — do they do the thing your site exists for? Define one
   primary conversion (purchase, signup, contact form) and track it.

Vanity metrics to ignore: total pageviews without context, social follower
counts that don't click through, and "traffic" from any source you paid for by
the thousand without knowing the audience.

Review monthly, not daily. Traffic has noise; trends have signal. Give every
new tactic 60–90 days of real effort before you judge it — except paid tests,
which should show directional results within days.

## The compounding secret nobody sells

Here's the part the gurus skip: traffic compounds when visitors become
**repeat visitors and referrers**. An email list of 500 engaged subscribers
beats 50,000 one-time social visitors. A referral from one happy customer beats
a hundred cold clicks.

So whatever engine you choose, bolt on the retention layer early: capture
emails with something genuinely useful, make sharing easy, and give people a
reason to come back. That's how "how to get traffic to my website" stops being
a monthly panic and becomes an asset that grows while you sleep.

## Keep going

- 21 specific free tactics with step-by-steps: [Free Ways to Get Website Traffic](/blog/free-ways-to-get-website-traffic)
- Just launched? [How to Drive Traffic to a Brand-New Website (First 90 Days)](/blog/how-to-drive-traffic-to-a-new-website)
- Considering paid visitors? Read [Should You Buy Website Traffic?](/blog/should-you-buy-website-traffic) first.

## Traffic for local businesses: a special case

If your customers are local — a restaurant, clinic, salon, trades business —
your traffic plan looks different from an online business's. Most of your
buyers search with local intent ("near me," neighborhood names), and your
highest-converting traffic sources are:

1. **Google Business Profile and Maps.** For many local businesses this single
   listing drives more customers than the website itself. Treat it as your
   homepage: complete, photo-rich, review-generating, updated weekly.
2. **Local search rankings.** Location pages ("plumber in Deira"), local
   keywords in titles, and citations (consistent name/address/phone across
   directories) move you up in the map pack.
3. **Local communities.** Neighborhood Facebook groups, local subreddits,
   WhatsApp community groups — recommendations here convert at extraordinary
   rates because trust is pre-built.
4. **Local partnerships.** Cross-referrals with complementary nearby
   businesses; a café recommending your bakery (and vice versa) is free,
   warm, and ongoing.

Local traffic converts better than generic traffic because intent is immediate
— someone searching "emergency plumber near me" needs one today. Prioritize
being found at the moment of need over building a large general audience.

## Turning traffic into revenue: the conversion layer

Traffic without conversion is a hobby. Before scaling any channel, make sure
your site converts the visitors you already get:

- **One page, one job.** Every landing page should have a single clear action
  — buy, book, sign up, call. Pages that ask visitors to "explore" convert
  poorly.
- **Speed and mobile.** A large share of your visitors are on phones, often on
  mediocre connections. Every second of load time costs conversions.
- **Proof near the action.** Testimonials, reviews, guarantees, and real
  results placed next to your signup or buy button do more than any copy tweak.
- **Capture the almost-buyers.** Email capture, retargeting pixels, and
  abandoned-cart or follow-up sequences turn one-time visitors into future
  customers. The cheapest traffic you'll ever get is from people who already
  visited.

A useful discipline: for every hour you spend driving traffic, spend 20
minutes improving conversion. Doubling conversion doubles the value of every
channel at once — it's the highest-leverage work in this entire guide.

## Your next 30 days

Don't try to implement this whole playbook at once. Here's the starter
sequence:

1. **Days 1–7:** Install analytics and Search Console; fix site basics (speed,
   mobile, titles, one clear call-to-action); complete your Google Business
   Profile and top directories.
2. **Days 8–14:** Pick your primary engine (search, social, referral, or paid)
   based on your situation; list your 30 customer questions if search is the
   pick, or your 20 target communities/partners if referral is.
3. **Days 15–30:** Execute daily on the primary engine; publish the first
   pieces; start the email list. Add conversion capture (email form,
   retargeting) before you scale anything.

At day 30, review: which efforts produced engaged visitors? Double down there
for the next 60 days. Traffic is a system, not a trick — build the system,
and the visitors follow.
`,_T=`---
title: "How to Increase Brand Visibility: A Practical Guide for Small Brands"
description: "How to increase brand visibility without a big budget: the five channel families, a 90-day sprint, and honest ways to measure results. — the practical guide."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Visibility Guides"
keywords:
  - how to increase brand visibility
  - increase brand visibility
  - brand visibility small business
  - get brand seen
pillar: true
related:
  - brand-awareness-strategies
  - increase-online-visibility-small-business-90-days
  - brand-visibility-vs-brand-awareness
---

> **Key takeaways:**
> - Brand visibility = being seen by the right people, repeatedly, in places they already pay attention.
> - Visibility comes from five channel families: search presence, social presence, borrowed audiences, physical presence, and paid placements.
> - Small brands win visibility through specificity — owning a niche corner beats shouting into the mainstream.
> - Repetition matters more than reach: being seen 7 times by 1,000 right people beats once by 100,000 random ones.
> - Measure visibility with branded search volume, direct traffic, share of voice, and recall — not just impressions.

## What brand visibility actually is (and isn't)

Brand visibility is simple: **how often your target customers encounter your
brand in the course of their normal lives.** Not how many people have heard of
you in the abstract — how often the *right* people bump into you while
browsing, searching, scrolling, walking past, or talking to friends.

It's not the same as brand awareness (we untangle the two in [Brand Visibility
vs. Brand Awareness](/blog/brand-visibility-vs-brand-awareness)), but here's
the short version: visibility is the *input* — the encounters. Awareness is the
*output* — the memory those encounters build. You can't have awareness without
visibility, and visibility without memorability is just noise.

For a small brand, the goal isn't to be everywhere. It's to be **unavoidable in
your corner** — the name that keeps surfacing whenever your kind of buyer looks
around.

## The five visibility channel families

Every visibility tactic fits into one of five families. Audit yourself against
all five; most small brands are invisible in at least three.

### 1. Search presence: be there when they look

When someone searches for what you do, do you appear? This covers your
website's rankings, your Google Business Profile, review-site profiles, and
Q&A answers that rank. Search visibility is high-intent — the person is
actively looking — which makes it the most valuable kind per encounter.

Build it by: answering specific buyer questions in content, completing every
profile fully, earning reviews (they surface in local results), and getting
mentioned on sites that already rank for your keywords.

### 2. Social presence: be there where they scroll

Your buyers spend hours daily on a handful of platforms. Visibility here means
showing up in their feeds repeatedly with content worth stopping for — not
just existing with a dormant profile.

Build it by: picking one platform and posting natively 3–5x/week, engaging
genuinely in comments, using short video (still the cheapest reach online),
and collaborating with creators your audience already follows. Consistency
beats virality: one viral post is a spike; a steady presence is visibility.

### 3. Borrowed audiences: be there where they already gather

You don't have to build every audience from scratch. Newsletters, podcasts,
communities, events, partner brands, and press all have attention you can
borrow — through guest appearances, sponsorships, partnerships, and expert
quotes.

Build it by: listing the 20 publications, shows, and communities your buyers
trust; then systematically earning a place in them — a guest post here, a
podcast there, a small sponsorship where rates are low. Borrowed visibility
converts well because it arrives with trust attached.

### 4. Physical presence: be there in their world

For local businesses, the physical world is still a visibility channel: your
storefront and signage, vehicle branding, local sponsorships (teams, events,
causes), flyers in complementary businesses, and simply being visibly active
in the community.

Build it by: making your physical touchpoints impossible to ignore (great
signage is a one-time cost with permanent returns), sponsoring one local thing
well rather than five thinly, and showing up where your community gathers.

### 5. Paid placements: buy your way into view

Sometimes the fastest visibility is bought: ads, sponsorships, featured
listings, and homepage placements. The key insight for small budgets: **buy
placement where your buyers already browse, not impressions from an ad
network.** A niche newsletter mention, a podcast ad, or a featured spot on a
site your audience visits puts you in front of the right eyes for very little.

This is also where competitive visibility marketplaces fit: platforms like
FlexSpot let brands bid for prominent homepage spots starting from $1, with a
public leaderboard so your placement — and who's outranking you — is
transparent. It's a modern, low-cost version of buying the billboard on the
busy road: you pay for the spot, everyone sees who's there.

## The small-brand visibility strategy: own a corner

Big brands buy ubiquity. You can't — and shouldn't try. Your strategy is
**corner ownership**: pick the specific intersection of audience + place +
message, and become unavoidable there.

Concretely:

- **Audience:** not "small businesses" — "independent cafés in Dubai," or
  "freelance designers who hate admin."
- **Place:** the 3–5 channels where that audience actually pays attention.
  (Ask them. They'll tell you.)
- **Message:** one sharp, repeatable idea about what you are. If people can't
  repeat it after seeing you twice, it's not sharp enough.

Then show up in those places, with that message, relentlessly. When someone in
your corner thinks of your category, your name should surface — that's
visibility working.

## The repetition principle

Marketing research has long observed that people need multiple exposures
before a brand registers — the exact number varies, but the principle is
solid: **familiarity builds preference.** This is why one big splash
underperforms a steady drumbeat.

Practical implications:

- Prefer channels you can sustain weekly over one-off stunts.
- Repeat the same core message with varied creative — consistency of idea,
  freshness of execution.
- Retargeting (showing ads to past visitors) is repetition made efficient:
  cheap, because the audience already knows you.
- Email is repetition you own: a weekly useful newsletter keeps you surfacing
  in inboxes without paying per view.

A useful target: aim for your core audience to encounter you **weekly** in at
least one channel. That's the cadence where "I've seen them around" starts
forming.

## Making visibility memorable (not just frequent)

Being seen is half the job; being *remembered* is the other half. Frequency
without distinctiveness is wallpaper.

- **One visual signature.** A consistent color, style, or motif across every
  touchpoint. Recognition is built on repetition of the *same* look.
- **One verbal signature.** A tagline, a phrase, a way of talking that's
  unmistakably you.
- **One strong opinion.** Brands with a point of view get remembered and
  quoted; brands with generic messaging get scrolled past.
- **Show, don't claim.** Customer results, real numbers, behind-the-scenes —
  proof is more memorable than adjectives.

Audit your touchpoints: if you covered your logo, would people still recognize
it's you? If not, your visibility isn't building memory yet.

## Measuring visibility (without fooling yourself)

Vanity metrics (raw impressions, follower counts) feel good and mean little.
Track these instead:

- **Branded search volume:** are more people searching your brand name over
  time? (Search Console shows this.) Rising branded search is the purest
  visibility signal.
- **Direct traffic:** visitors typing your URL or using bookmarks — people who
  remembered you unprompted.
- **Share of voice:** in your corner (your niche's key searches, hashtags,
  conversations), how often is it you vs. competitors?
- **Recall:** ask new customers "how did you hear about us?" and "had you seen
  us before?" — qualitative, but honest.
- **Mention volume:** press, social mentions, backlinks over time.

Review quarterly. Visibility builds slowly — judge trends across months, not
spikes across days.

## The 90-day visibility sprint

**Days 1–30: foundations.** Complete every profile (Google Business, social,
directories). Define your corner (audience + 3–5 channels + one message).
Set up measurement (Search Console, analytics, a simple mention tracker).

**Days 31–60: drumbeat.** Start the weekly cadence: content, community
presence, newsletter. Earn your first 3 borrowed-audience placements (guest
post, podcast, small sponsorship). Launch the review/referral ask.

**Days 61–90: amplify.** Identify what's getting traction and double down.
Add one paid placement test in your best channel. Refresh your top-performing
content. By day 90, check branded search and direct traffic — the early
signals that visibility is compounding.

## Visibility mistakes that waste effort

- **Chasing viral spikes instead of steady presence.** Spikes fade; drumbeats
  compound.
- **Being everywhere thinly.** Five dead profiles are worse than one alive.
- **Inconsistent identity.** Different logos, tones, and messages per platform
  = no memory built.
- **Invisible differentiation.** If your visibility doesn't communicate *why
  you*, it's just noise for competitors to benefit from.
- **No capture.** Visibility without email capture or retargeting means every
  encounter starts from zero.

Keep building: [Brand Awareness Strategies](/blog/brand-awareness-strategies) for the memory-building layer,
the [90-Day Online Visibility Plan](/blog/increase-online-visibility-small-business-90-days) for a week-by-week version,
and [15 Ways to Get Your Business Noticed](/blog/ways-to-get-your-business-noticed-online) for quick wins.

## Visibility playbooks by business type

The five channel families apply to everyone, but the emphasis differs:

**Local businesses** (restaurant, clinic, salon, trades): search presence
means Google Business Profile + local rankings + reviews — this trio often
outperforms everything else combined. Physical presence (signage, local
sponsorships, community involvement) is your unfair advantage over online-only
competitors. Social should be visual and local (dishes, transformations,
before/afters). Paid: small geo-targeted tests only after the free foundations
are solid.

**Online businesses** (SaaS, e-commerce, digital services): search presence
means content that answers buyer questions + profiles on the marketplaces and
directories your buyers browse. Borrowed audiences (podcasts, newsletters,
communities, partnerships) are your fastest visibility — you have no
storefront, so borrow other people's foot traffic. Social: pick the platform
where your buyers actually spend time and go deep. Paid: test audience-access
options (niche sponsorships, featured placements) before expensive auctions.

**B2B and professional services**: visibility = credibility. Search presence
through genuinely expert content, LinkedIn presence with real opinions (not
corporate posts), podcast appearances, and strategic partnerships. Your buyers
choose based on trust, so every visibility tactic should demonstrate expertise,
not just existence. One sharp keynote or viral-LinkedIn-post moment can
outperform a year of ads — but only if the expertise is real.

## The annual visibility calendar

Visibility shouldn't be improvised month to month. Once a year, map the
rhythms that matter in your market:

- **Seasonal peaks** — when do your buyers pay most attention? (Retail:
  holidays. B2B: budget cycles. Local: tourist seasons, school terms.)
- **Industry moments** — conferences, awards, product launches, regulatory
  changes. Plan content and pitches around them.
- **Cultural calendar** — Ramadan, National Day, New Year, back-to-school —
  attention spikes you can ride with relevant offers or content.
- **Your own milestones** — anniversaries, launches, expansions. Manufacture
  newsworthy moments instead of waiting for them.

Then work backward: for each moment, decide the visibility plays (content,
partnership, PR pitch, paid placement, event) 4–6 weeks ahead. Brands that
plan around the calendar look "everywhere" — but it's just preparation meeting
predictable attention.

## Visibility as a moat

Here's the long game most small brands miss: visibility compounds into
**defensibility**. The brand that's unavoidable in its corner gets the
backlinks, the press calls, the partnership invitations, the word-of-mouth —
which creates more visibility, which creates more of all of it. Competitors
can copy your product and undercut your price; they can't easily copy being
the name everyone in the niche already knows.

That's why visibility deserves sustained investment even when attribution is
fuzzy. Not every encounter converts this quarter — but the brand that buyers
have "seen around" for a year wins the decision against the stranger every
time. Build the drumbeat, keep it consistent, and let compounding do the
heavy lifting.

## Visibility and pricing power

There's a business benefit to visibility that rarely gets mentioned: **visible
brands can charge more.** When buyers have seen you repeatedly — in search
results, in their feed, mentioned by peers — you arrive at the sales
conversation pre-validated. Unknown competitors have to compete on price;
known brands compete on preference. Every visibility encounter is a small
deposit against future discount pressure. Founders often treat visibility as a
marketing expense; it's better understood as pricing insurance.

## When to hire help vs. DIY

Do visibility yourself until you have a working channel and a clear message —
no agency can discover those for you. Bring in help (freelancer or agency) when
you need to **scale a proven playbook**, not to find one. The right hire
multiplies output on your winning channel; the wrong hire burns budget
"experimenting" with things you could have tested free. A useful rule: if you
can't explain your visibility strategy in two sentences, you're not ready to
outsource it.
`,OT=`---
title: "How to Make Your Brand Go Viral: Strategy, Not Luck"
description: "Learn how to make your brand go viral with engineered tactics: shareable hooks, participation loops, and visibility mechanics that turn viewers into promoters."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Viral Marketing"
keywords:
  - how to make your brand go viral
  - viral marketing strategy
  - brand virality
  - viral brand growth
  - word of mouth growth
pillar: true
related:
  - viral-marketing-strategies
  - word-of-mouth-marketing
  - guerrilla-marketing-ideas
sample: false
---

> **Key takeaways:**
> - Virality is engineered, not random: shareable hooks, low-friction participation, and visible scoreboards are the repeatable ingredients.
> - Give people a reason to share — status, identity, humor, or a reward — and remove every step between seeing and sharing.
> - Public, competitive formats (leaderboards, races, rankings) turn passive viewers into active promoters.
> - Most "viral" campaigns fail at the follow-through: capture the attention spike with a clear next step.

## Virality is a system, not a lottery ticket

When a brand "goes viral," it looks like lightning struck. In practice, almost every breakout had the same skeleton underneath: something worth sharing, a mechanism that made sharing effortless, and a moment that concentrated attention. Luck decides the scale; the system decides whether the door is open at all.

Think of it as three layers. The **content layer** is the hook — the thing people react to. The **mechanics layer** is how participation works — one click, one share, one tag. The **distribution layer** is where the audience already is and how the platform rewards the behavior you want. Brands that go viral repeatedly invest in all three. Brands that go viral once usually got lucky on layer one and never figured out the rest.

This guide covers the strategy behind all three layers, with tactics you can run on a small budget.

## What makes people share: the five sharing motives

People share things for their own reasons, not yours. If you want to know how to make your brand go viral, start by designing for one of these five motives:

1. **Status.** Sharing makes them look knowledgeable, funny, or first. Early-access drops, insider jokes, and "I found this before it blew up" moments all feed status.
2. **Identity.** The content says something about who they are. A brand stance, a meme about their profession, a cause they care about — sharing becomes self-expression.
3. **Usefulness.** Practical value travels fast: the free template, the honest price breakdown, the how-to nobody else wrote clearly. Utility is the most underrated viral fuel.
4. **Emotion.** Awe, humor, surprise, and even righteous anger drive shares. The key is high-arousal emotion; mild pleasantness doesn't move the needle.
5. **Belonging.** Joining a visible tribe — a challenge, a leaderboard, a team — and proving it publicly. Participation you can show off is participation that spreads.

The strongest campaigns stack two or three motives. A public leaderboard (belonging + status) with a funny brand voice (emotion) and a genuinely useful product (usefulness) gives people multiple reasons to hit share.

## Engineer the mechanics before you need them

Content without a sharing mechanism is a billboard in a desert. Before you launch anything, make sure these mechanics are in place:

- **One-click sharing.** Every share button, every referral link, every "tag a friend" prompt should work in under five seconds. Personal referral links — one per supporter, carrying their name — turn every visitor into a potential distribution node.
- **A visible scoreboard.** Public rankings change behavior. When people can see who's winning and by how much, they compete, and competition is inherently shareable. Leaderboards, countdowns, and live tallies convert passive attention into active promotion.
- **A reason to come back.** Virality spikes decay in days. Streaks, daily rankings, fresh rounds, and "new leader" moments give the spike a second and third wave.
- **A capture point.** The spike is worthless if it evaporates. A follow, an email signup, a claimed spot on your board — give the wave somewhere to land so you can reach those people again.

## The participation loop: watch → do → show off

The most reliable viral structure is a loop with three steps:

1. **Watch** something remarkable or funny (the hook).
2. **Do** something simple and public (vote, boost, share a personal link, join a race).
3. **Show off** the result (their rank, their referral count, their team's position).

Each cycle recruits the next participant, because step 3 is visible to step 1's audience. This is why races, challenges, and ranked competitions spread: the promotion is built into the participation. If your campaign's participants are invisible, you're paying for distribution. If they're visible, they're doing the distribution.

Design the loop so step 2 takes under a minute and step 3 is automatic. Friction kills loops.

## Timing and concentration: make a moment

Virality needs density — many people reacting at once. Spread-out attention doesn't feel like a moment, and platforms reward concentrated engagement. Tactics that create concentration:

- **Launch windows.** Announce a start time. Countdowns and "doors open" moments compress action into a spike the algorithm can see.
- **Live and real-time formats.** Anything happening *now* — a race, a live ranking, a limited drop — carries urgency that scheduled posts don't.
- **Piggybacking.** Tie your moment to something already getting attention: a trending topic, a big event, a cultural conversation. Newsjacking works when the connection is genuine and fast, not forced.
- **Seeding with micro-communities.** A hundred engaged people in the right community beat ten thousand passive impressions. Seed where your people already gather, then let the loop carry it outward.

## What to do when it works (the part everyone skips)

Going viral without a plan for the aftermath is like winning a lottery and losing the ticket. Before you launch, decide:

- **Where does the traffic go?** One clear destination, one clear action. Not five links — one.
- **How do you keep them?** A follow, a list signup, a claimed profile, a referral link of their own. Convert the spike into an audience.
- **What's the next beat?** Plan the follow-up while the first wave is still cresting: the "thank you" post, the behind-the-scenes, the next round. Attention has a half-life; spend it fast.

## Platform-by-platform notes: where virality actually happens

The mechanics are universal, but each platform rewards different behavior. A quick field guide:

- **TikTok / Reels / Shorts.** The algorithm is the distributor — you don't need followers to reach millions. Hooks in the first two seconds decide everything. Duets, stitches, and trends are built-in participation loops; joining a trend with your brand's twist is the lowest-effort viral attempt available.
- **X (Twitter).** Speed and wit win. Quote-posts and replies travel further than original posts for small accounts — be the funniest reply on a big account's post and you borrow their distribution. Threads that teach something specific still spread reliably.
- **Instagram.** Shares and saves outweigh likes for reach now. Carousel posts with genuinely useful slides (checklists, breakdowns, before/afters) get saved and shared into DMs, which is where a lot of "viral" actually happens — privately.
- **LinkedIn.** Contrarian-but-true professional takes and personal stories outperform company announcements. Comments from others in your industry act as endorsements that push the post into new feeds.
- **Reddit.** The toughest and most valuable audience: self-promotion is punished, genuine contribution is rewarded. Answer questions thoroughly, share real numbers and lessons, and let people discover your brand in your profile. One front-page post can outperform a month of ads.
- **WhatsApp / Telegram / DMs.** The invisible viral channel. Content designed for forwarding — short, visual, self-contained, funny or useful — spreads through group chats where no algorithm can see it. Always assume your best content will be screenshotted; make sure your brand name is on the image.

Don't try to win all six. Pick the two where your audience actually lives and go deep.

## A viral week: a day-by-day campaign plan

Here's how a small brand can run a concentrated virality push in seven days:

- **Day 1 — Seed the hook.** Publish your anchor content (the video, the meme, the useful breakdown). Share it with your micro-communities first: loyal customers, group chats, niche forums. Ask for honest reactions, not blind shares.
- **Day 2 — Open the loop.** Launch the participation mechanic: the challenge, the leaderboard, the referral link, the vote. Make joining take under a minute.
- **Day 3 — Recruit amplifiers.** Personally message 20–50 people who'd genuinely enjoy it — creators, customers, friends with audiences. Personal asks beat mass posts.
- **Day 4 — Feed the algorithm.** Post the best user-generated reactions and early results. "Look what's happening" content performs well because it's social proof, not self-promotion.
- **Day 5 — Escalate.** Announce a twist: a new prize, a surprise entrant, a stretch goal. Give the story a second act.
- **Day 6 — Capture.** While attention is high, push the capture point hard: follow, sign up, claim your spot. This is the day the spike converts into an audience.
- **Day 7 — Debrief publicly.** Share what happened — the numbers, the funny moments, the lessons. Debrief content extends the tail and sets up the next run.

Then rest, analyze which motive drove the most sharing, and run it again with what you learned.

## Common failure modes (and fixes)

- **The brilliant video with no next step.** Fix: every piece of content ends with one clear action — follow, share your link, join the board.
- **Asking for shares instead of earning them.** "Please share!" converts nobody. Give people a motive (status, identity, belonging) and the share happens on its own.
- **Launching to crickets.** You seeded to nobody. Fix: build the micro-community (even 50 true fans) before the campaign, not during it.
- **The spike with no capture.** Ten thousand visitors, zero followers gained. Fix: the capture point goes live before the campaign, not after.
- **One-hit thinking.** Treating virality as a single event instead of a repeatable loop. Fix: after every spike, document what worked and schedule the next run.

## Measuring a viral push: what to actually track

Vanity metrics will lie to you. Views without action are entertainment, not marketing. For a viral push, track the funnel in order:

1. **Reach** — how many people saw it (views, impressions). This is the top of the funnel, not the goal.
2. **Participation rate** — what percentage of viewers took the action (shared, joined, boosted, clicked the referral link). This tells you whether the loop works.
3. **Amplification ratio** — how many new viewers each participant brought in. A ratio above one means the loop is self-sustaining; below one means you're pushing, not compounding.
4. **Capture rate** — how many participants became followers, subscribers, or claimed spots. This is the durable asset the spike leaves behind.
5. **Cost per captured audience member** — total spend divided by captures. Compare it honestly against your other channels.

Run the numbers after every push. The brands that go viral repeatedly aren't luckier — they're the ones who measured which loop actually compounded and doubled down on it.

## Honest expectations

No tactic guarantees virality, and anyone promising it is selling something. What strategy does is raise your surface area: more shots on goal, better mechanics, clearer capture. Most brands that "suddenly" go viral had been shipping shareable, participation-friendly work for months. The overnight success was a system maturing, not a miracle.

Start with one loop — one hook, one participation step, one visible result — run it, watch what people actually share, and iterate. That's the whole game. The brands that seem to "always go viral" aren't luckier than you; they've just run the loop enough times to know exactly which hook their audience can't resist sharing.

## Where engineered visibility fits

Once you understand the mechanics, you'll notice that most small brands don't lack creativity — they lack a stage. A public, competitive visibility format gives your loop somewhere to run: your supporters can boost you, share their personal link, and watch you climb in real time. Platforms built around bid-for-attention mechanics, like FlexSpot's public leaderboard, exist precisely to give small brands that stage without an ad-platform budget. The tactics in this guide work anywhere; a visible arena just makes them work faster.
`,zT=`---
title: "How to Stand Out From Competitors When Everyone Looks the Same"
description: "How to stand out from competitors with real differentiation: positioning, visible proof, personality, and competitive formats that make the difference obvious."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Viral Marketing"
keywords:
  - how to stand out from competitors
  - differentiate from competitors
  - competitive differentiation
  - stand out in crowded market
pillar: false
related:
  - how-to-make-your-brand-go-viral
  - word-of-mouth-marketing
  - homepage-sponsorships
sample: false
---

> **Key takeaways:**
> - Differentiation is about being meaningfully different to a specific someone — not marginally better for everyone.
> - The fastest wins: a sharper position, visible proof, a real personality, and an experience competitors won't copy.
> - Make the difference impossible to miss — on your homepage, in your pricing, in how you show up publicly.
> - Competing visibly (rankings, comparisons, challenges) turns differentiation into a spectator sport.

## The real problem: "better" is invisible

Most businesses try to stand out by being slightly better — slightly cheaper, slightly faster, slightly nicer. The problem is that "slightly better" is invisible to a customer scanning ten options. Differentiation that can't be perceived in seconds doesn't exist.

Standing out means being **meaningfully different to a specific someone**. Not everyone. Someone. The narrower the "someone," the sharper the difference can be, and the more loudly they'll tell others about it.

## Step 1: Pick your difference (positioning)

You can't be different at everything. Pick one axis and own it:

- **Price position.** The cheapest (commit to it ruthlessly) or the premium option (and act like it). The muddy middle is where brands go to be ignored.
- **Speed or convenience.** The fastest, the easiest, the one that removes the most hassle. Convenience is a difference people feel daily.
- **Specialization.** "We do one thing for one kind of customer" beats "full-service solutions" every time for memorability.
- **Values and stance.** Standing for something specific — radical transparency, local sourcing, no dark patterns — gives customers an identity reason to choose you.
- **Experience.** The buying, unboxing, or using experience itself is the difference. When the product is similar, the experience is the product.

Write your positioning as a sentence a customer could repeat: "They're the ones who ___." If you can't fill the blank crisply, your positioning isn't done.

## Step 2: Make the difference visible

A difference nobody sees is a secret. Make yours impossible to miss:

- **Say it on the homepage.** Above the fold, in plain words. Not "innovative solutions" — the actual difference.
- **Show proof, not claims.** Side-by-side comparisons, real timelines, real prices, real customer stories with names. Proof is differentiation you can verify.
- **Price it honestly.** Your pricing page is a positioning document. Weird, transparent, or boldly simple pricing stands out more than another feature list.
- **Be findable where competitors aren't.** The comparison site they ignore, the community they don't serve, the public leaderboard they've never heard of. New arenas have no incumbents.

## Step 3: Give your brand a personality

In crowded markets, personality is a legitimate moat — it's the one thing competitors can't copy without looking like imitators. This doesn't mean being wacky; it means being recognizably *you*:

- A distinct voice in your copy (write like a human with opinions).
- Opinions about your industry, stated publicly.
- A founder or team that's visible, not hidden behind a logo.
- Consistency: the same personality everywhere, for years.

Customers remember personalities. They forget feature lists.

## Step 4: Compete in public

Nothing demonstrates difference like direct, visible competition. Consider:

- **Honest comparison pages.** "[You] vs. [Competitor]" pages that are genuinely fair convert high-intent searchers and signal confidence. (Keep them truthful — misleading comparisons backfire legally and reputationally.)
- **Public rankings and leaderboards.** Entering a visible competitive arena — a ranked marketplace, an industry award, a public challenge — puts your difference on display where customers are already watching.
- **The challenge.** Publicly challenge the status quo: a guarantee competitors won't match, a stunt they'd never attempt, a standard they can't meet. The contrast is the marketing.

## Step 5: Double down on what competitors won't copy

The most durable differentiation is the kind that's *inconvenient* for competitors to imitate: the generous guarantee, the obsessive customer service, the radical transparency, the community you actually nurture. If it's easy to copy, it's not differentiation — it's a feature with a short half-life. Build moats out of things that require ongoing effort and genuine conviction.

## When you're the underdog: asymmetry as strategy

If you're smaller than your competitors, don't play their game — change the game. Underdogs win by competing where scale doesn't help:

- **Speed.** Ship, respond, and decide faster than any big competitor can. Customers feel the difference immediately.
- **Personality.** A big brand can't be personal at scale; you can know your customers by name. That's not a consolation prize — it's the moat.
- **Niche depth.** Own a slice so specific that serving it well would bore a big competitor. Then expand the slice.
- **Public arenas.** Ranked leaderboards, open challenges, and community votes flatten the field — a $1 bid for attention puts you on the same board as brands with hundred-times your budget, and the audience decides who deserves the spotlight.

Asymmetry is the whole point: if you fight on their terms (budget, reach, headcount), you lose. Fight on yours.

## The differentiation audit (30 minutes)

1. List your five closest competitors and write each one's one-line positioning.
2. Write yours. If it could describe any of them, it's not positioning.
3. Ask three customers why they chose you. Their words are your real differentiation — use them verbatim.
4. Find one thing competitors would find annoying or expensive to copy. That's your moat — invest there.
5. Check your homepage: does a stranger see the difference in five seconds? If not, rewrite it this week.

Standing out isn't a campaign — it's a commitment to being specifically, visibly, inconveniently different, and then making sure nobody can miss it.

## Keep the edge: differentiation decays

One warning: every difference erodes. Competitors copy features, markets shift, and today's bold stance becomes tomorrow's table stakes. Treat differentiation as maintenance, not a milestone: re-run the audit every six months, keep one experiment always live (a new guarantee, a new format, a new arena), and listen to customers — they notice your edge dulling before you do. The brands that stay distinctive aren't the ones that found one difference; they're the ones that keep finding the next one.

## Differentiation on a zero budget

No money for rebrands or campaigns? The cheapest differentiators are behavioral: answer faster than anyone else in your market (speed is free), write your website like a human instead of a corporation (voice is free), publish your pricing when competitors hide theirs (transparency is free), and show up consistently in one community your competitors ignore (presence is free). None of these cost anything but discipline — and they're exactly the things big, comfortable competitors are too slow or too cautious to copy. Start there this week; the expensive differentiation can wait until the free kind is working.

## Steal this: the one-page differentiation brief

Put your differentiation on a single page the whole team can use: the one-sentence positioning ("We're the ___ for ___ who ___"), the three proof points (specific, verifiable), the personality notes (how we sound, what we'd never say), and the competitive contrasts (where we win, where we honestly don't — and why that trade-off serves our customer). Sales uses it in pitches, marketing uses it in copy, support uses it in conversations. Differentiation that lives in one person's head is a hope; differentiation on one page the whole company repeats is a strategy.
`,WT=`---
title: "How to Start a Referral Program: Step-by-Step"
description: "How to start a referral program from scratch: design rewards, set up tracking, write share messages, soft-launch, and scale — a practical step-by-step playbook."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Small Business Marketing"
keywords:
  - how to start a referral program
  - referral program setup
  - refer-a-friend program guide
  - launch referral program
pillar: false
related:
  - referral-marketing
  - referral-program-ideas
  - how-to-get-referrals-for-your-business
sample: false
---

> **Key takeaways:**
> - A referral program needs five pieces: personal links, a share path, a trigger action, a two-sided reward, and tracking.
> - Design on one page first, soft-launch to your happiest customers, fix friction, then go wide.
> - Two-sided rewards and instant-feeling payouts beat generous-but-complicated schemes.
> - Guard against gaming from day one: reward real actions, limit per-person credits, watch for self-referrals.

## Before you build: the three decisions

Every referral program is defined by three choices. Make them deliberately before touching any tooling:

1. **What counts?** The trigger action — a signup, a first purchase, a booked call, a visit. Pick the action that actually creates value for you, not the easiest one to track. Rewarding signups gets you signups; rewarding first purchases gets you customers.
2. **What's the reward?** For the referrer and for the friend. Two-sided beats one-sided — the sharer feels generous instead of mercenary. Match the reward to your margins and your customers' desires (discounts for repeat buyers, credit or cash for the price-sensitive, status or access for the identity-driven).
3. **How do people share?** The channels your customers actually use — WhatsApp, SMS, email, social, in-person QR. Meet them there instead of building a sharing flow they'll never open.

Write these on one page. If you can't explain the program in three sentences, it's too complicated to spread.

## Step 1: Design the program (one page)

Fill in this canvas:

- **Program name:** Give it an identity ("The Inner Circle," "Friends of [Brand]"). Named programs get remembered; "referral program" gets ignored.
- **Trigger action:** e.g., "friend makes their first purchase."
- **Referrer reward:** e.g., "$15 credit after the friend's first purchase."
- **Friend reward:** e.g., "20% off their first order."
- **Limits:** e.g., "one reward per referred friend; rewards never expire."
- **Payout timing:** e.g., "credit applied within 24 hours of the friend's purchase."
- **Exclusions:** e.g., "self-referrals and existing customers don't qualify."

Keep version one ruthlessly simple. You can add tiers and bonuses later; you can't un-confuse early adopters.

## Step 2: Set up tracking

You need to know who referred whom and whether the trigger action happened. Options by scale:

- **Manual (under ~50 referrals/month):** Unique codes per customer (even a spreadsheet of name → code), a "how did you hear about us" field at checkout, and manual reward fulfillment. Unsexy, fast, and fine.
- **Plugin/platform (50–500/month):** Referral features built into your e-commerce, membership, or CRM platform, or a dedicated referral tool. Automates links, tracking, and reward emails.
- **Custom (500+/month):** API-driven referral infrastructure with fraud detection. At this scale, attribution accuracy and anti-gaming are the real work.

Whatever you choose, test the full loop yourself twice — once as referrer, once as friend — before anyone else touches it. Broken tracking is the fastest way to kill trust in a new program.

## Step 3: Write the share assets

Don't make customers write your marketing. Provide:

- **Two pre-written messages** (casual + professional), each under three lines, each with the personal link already inserted.
- **Three social post options** (funny, helpful, straightforward) for the socially inclined.
- **A one-liner** describing what you do, for the in-person "tell them I sent you" moment.
- **Visuals:** a branded image or card for social sharing. Posts with images get shared more; make it easy.

## Step 4: Build the landing experience for the friend

The referred friend's first impression decides your conversion rate. Their landing page should:

- Greet them personally ("Your friend [Name] thinks you'll love this").
- State the reward immediately and clearly ("You get 20% off your first order").
- Ask for as little as possible — every field costs conversions.
- Look like *you*, not a generic referral widget. Trust transfers from the friend; don't waste it on a sketchy-looking page.

## Step 5: Soft-launch to your happiest customers

Don't blast your whole list on day one. Personally invite 20–50 of your best customers:

- Watch where they hesitate or get confused — that's your friction list. Fix it.
- Confirm rewards arrive correctly and on time.
- Ask them directly: "What would make you share this more?" Their answers beat any best-practice list.
- Let them feel like insiders ("you're in the founding group") — early status is a powerful motivator.

Run the soft launch for one to two weeks. If these people won't refer, the general list won't either — fix the program, not the promotion.

## Step 6: Launch wide and promote it like a product

Once the loop works, treat the program as a product launch:

- Announce to your full email list with a clear, benefit-led message.
- Add referral prompts to post-purchase flows, account pages, receipts, and packaging.
- Train your team to mention it at golden moments (after compliments, at delivery).
- Feature it on your site where customers already look — not buried in a footer link.

## Step 7: Measure and optimize

Track four numbers weekly in the early days:

- **Referral rate:** what percentage of customers make at least one referral. Low? The ask or the reward needs work.
- **Share-to-action rate:** what percentage of shared links convert to the trigger action. Low? The friend's landing experience needs work.
- **Cost per referred customer:** total rewards divided by converted referrals. Compare honestly against your other acquisition channels.
- **Fraud rate:** self-referrals, duplicate accounts, suspicious patterns. Rising? Tighten the rules before it trains bad behavior.

Improve the weakest number first. Small, steady optimization beats grand redesigns.

## Anti-gaming rules to set on day one

- Reward the meaningful action (purchase, booking), not the click or signup alone.
- Limit rewards per referred individual (one credit per person keeps farming uneconomical).
- Require the friend to be a genuinely new customer (check email, device, or payment signals where feasible).
- Reserve the right to withhold rewards for abuse — and state it plainly in the terms.
- Review patterns monthly; gaming evolves, so your rules must too.

A program people can farm teaches people to farm it. A program that rewards real advocacy trains real advocacy.

## The launch checklist

Before you announce: trigger action defined and tested; two-sided reward live; personal links working; share messages written; friend landing page live and fast; reward fulfillment tested end-to-end; terms published; soft-launch feedback incorporated; team briefed on golden moments; analytics tracking the four numbers. Check every box, then launch — and remember that launch day is the starting line, not the finish.

## After launch: the first 90 days

The launch checklist gets you live; the next three months decide whether the program thrives. In month one, watch the soft-launch cohort like a hawk — personal outreach to every early referrer teaches you more than any dashboard. In month two, promote the program to your full audience and start the weekly metrics review; this is when you'll spot whether the reward motivates or the share path confuses. In month three, run your first optimization cycle: fix the weakest of the four numbers, refresh anything that feels stale, and publicly celebrate your first referral milestones. Programs that get this 90-day attention become permanent growth channels. Programs that don't become another forgotten page on the website.
`,VT=`---
title: "How to Increase Your Company's Online Visibility in 90 Days"
description: "A 90-day plan to increase your company's online visibility: weekly actions for search, social, reviews, and partnerships, built for small teams. — start today."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Visibility Guides"
keywords:
  - increase online visibility small business
  - improve online visibility
  - online visibility plan
  - get company seen online
pillar: false
related:
  - how-to-increase-brand-visibility
  - brand-awareness-strategies
  - free-ways-to-get-website-traffic
---

> **Key takeaways:**
> - Online visibility in 90 days is realistic if you sequence it: foundations (days 1–30), momentum (31–60), amplification (61–90).
> - The highest-ROI weekly habits: one useful content piece, daily community presence, and systematic review collection.
> - Small teams should run this plan at 5–8 hours/week — depth on few channels beats dabbling.
> - Track branded search, direct traffic, and referral growth monthly; judge the plan at day 90, not day 30.
> - Every tactic here is free or near-free; paid amplification is optional in the final month.

## Before day 1: set up measurement

You can't run a 90-day plan without a starting line. In one sitting:

- Install analytics and connect Google Search Console + Bing Webmaster Tools.
- Record baselines: monthly visitors by channel, branded search impressions,
  direct traffic, review count and rating, email subscribers, social followers.
- Define your "corner": the specific audience, the 3–4 channels you'll focus
  on, and your one sharp message. (See the pillar [How to Increase Brand
  Visibility](/blog/how-to-increase-brand-visibility) if this isn't clear yet.)

Put the baselines in a simple doc. You'll thank yourself at day 90.

## Days 1–30: Foundations

**Week 1 — profiles and listings.** Complete Google Business Profile (every
field, photos, services), Apple Business Connect, Bing Places, and your top 3
niche directories. Fix your social bios: one-line offer, working link,
consistent visuals.

**Week 2 — site readiness.** Check mobile experience on a real phone, compress
images, write title tags like headlines, ensure one clear call-to-action per
key page. Add email capture with a genuinely useful lead magnet.

**Week 3 — review engine.** Identify your 1–2 key review platforms. Email or
message 20 happy customers with the direct review link. Set up a simple
ongoing process: every completed job or delivered order triggers a review ask.

**Week 4 — content system.** List 30 real customer questions. Publish the
first 2–4 answer-style pieces targeting the most specific ones. Set up the
repurposing habit: each piece becomes a social thread and a newsletter
section.

End-of-month check: all profiles complete, review count moving, first content
live, analytics collecting. No traffic miracles expected yet — you're building
the machine.

## Days 31–60: Momentum

**Weekly content cadence.** One solid piece per week — answer-style, specific,
genuinely useful. Refresh one older page per week too (expand it, update
examples, improve the title).

**Daily community presence.** 20–30 minutes in 2–3 communities where your
buyers gather. Answer thoroughly; let the profile carry the promotion. Aim for
2–3 standout answers per week.

**Borrowed audiences.** Pitch 2 guest posts, 3 podcast/newsletter appearances,
and 2 potential partners this month. Follow up once. Most "yes" replies land
in weeks 3–6 after pitching — this is a pipeline.

**Social rhythm.** 3–5 native posts per week on your one platform. Document,
teach, show results. Engage in comments — yours and others'.

**Email.** Send the newsletter every week or two. Short, useful, consistent.
Your list is small; treat every subscriber like gold.

End-of-month check: search impressions appearing in Search Console, referral
traffic from communities/partnerships, email list growing, first guest
content published or scheduled.

## Days 61–90: Amplification

**Double down on the winner.** Look at 60 days of data: which channel sent the
most engaged visitors? Shift 60–70% of effort there. Cut or maintenance-mode
the clear losers.

**Add one paid test (optional but recommended).** With 60 days of learning
about your messaging, a small paid test ($30–$100) now performs far better
than it would have at day 1. Options: boost your best organic post, sponsor
a niche newsletter, or claim a low-cost featured placement where your buyers
browse.

**Refresh and expand winners.** Take your 2–3 best-performing content pieces
and make them definitively better than competing results — more examples,
clearer steps, updated details.

**Systematize reviews and referrals.** By now you know what timing and wording
gets reviews. Bake it into your process so it runs without you thinking about
it.

**Plan the next 90 days** around your proven channel, with one new experiment
queued.

## The weekly operating rhythm (5–8 hrs/week)

- **Monday (1 hr):** publish/schedule this week's content piece.
- **Tue–Thu (30 min/day):** community presence + social engagement.
- **Friday (1 hr):** repurpose content, send newsletter, review-ask follow-ups.
- **Monthly (2 hrs):** metrics review, one partnership pitch batch, plan next
  month.

Small teams fail at visibility through inconsistency, not through picking the
wrong tactic. Protect the rhythm.

## What to expect at day 90 (honest version)

- Search: impressions clearly rising in Search Console; first real clicks on
  specific long-tail queries. Not floods — foundations.
- Referral: steady trickle from communities, directories, and any published
  guest content.
- Social: small but engaged following on one platform; occasional spikes.
- Reviews: meaningfully more reviews than day 1, with responses on all.
- Email: a real list (dozens to low hundreds) that opens and clicks.
- Most importantly: **you can name your best channel** and have data to prove
  it. That's the asset the next 90 days scales.

What you should *not* expect: viral fame, page-one rankings for competitive
terms, or a transformed business. Visibility compounds — day 90 is the end of
the beginning.

## Common ways this plan fails

- **Skipping measurement.** No baselines = no proof anything worked = you quit
  at day 45.
- **Channel-hopping.** Trying a new tactic every week instead of running the
  plan. The plan works through repetition.
- **Publishing without distribution.** Every piece needs its community post,
  partner share, or newsletter slot — or it's a diary entry.
- **Judging at day 30.** Search and compounding tactics are just warming up.
  The plan is 90 days for a reason.
- **No capture.** All this visibility with no email list means starting from
  zero every month.

For the strategy behind the plan: [How to Increase Brand Visibility](/blog/how-to-increase-brand-visibility).
For the memory-building layer: [Brand Awareness Strategies](/blog/brand-awareness-strategies).

## Troubleshooting: when the plan stalls

If you reach day 45–60 with little to show, diagnose before quitting. The
usual failure modes:

**"Nobody's finding my content."** Distribution problem, not content problem.
Every piece needs its promotion slot — community post, partner share,
newsletter feature, social thread. Content without distribution is a diary.
Fix: attach a distribution checklist to every publish.

**"Traffic comes but nobody converts."** Message-market mismatch or a weak
page. Check: does the page say what you offer in five seconds? Is there one
clear action? Is there proof near the button? Fix the page before buying more
traffic.

**"I'm doing everything and exhausted."** You're spread too thin — the classic
failure. Cut to the ONE channel with the best early signals and put 70% of
effort there for the remaining 30 days. Depth beats breadth, always.

**"Social gets likes but no site visits."** Platform-native content builds
platform audiences, not site traffic. Fix: every week, give followers one
compelling reason to click through (the full guide, the free tool, the
detailed breakdown) — and make the bio link impossible to miss.

**"Search shows nothing at day 60."** Normal for new sites — but check
Search Console for impressions (not clicks). Rising impressions mean you're on
the right track; flat zero means targeting too-competitive queries. Shift to
more specific, longer-tail questions.

The meta-rule: **a stalled plan is data, not failure.** Each symptom points to
a specific fix. The only real failure is quitting at day 45 without
diagnosing — which is exactly when most compounding is about to start paying.
`,UT=`---
title: "The $1 Publicity Stunt: How Rivalry Manufactures Virality"
description: "The cheapest publicity stunt isn't a flash mob — it's a public rivalry. How competitive leaderboards turn $1 bids into shareable, viral brand drama."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Viral Marketing"
keywords:
  - publicity stunt ideas
  - viral stunt marketing
  - leaderboard marketing
  - cheap publicity stunts
  - competitive marketing stunt
pillar: false
related:
  - how-to-make-your-brand-go-viral
  - guerrilla-marketing-ideas
  - viral-marketing-strategies
sample: false
---

> **Key takeaways:**
> - The classic publicity stunt is expensive, risky, and one-and-done. Public competition is cheap, safe, and self-renewing.
> - Rivalry is inherently shareable: people screenshot rankings, argue about them, and pick sides without being asked.
> - A $1 bid on a public leaderboard buys you entry into an ongoing public contest — the stunt never really ends.
> - The mechanic *is* the content: every outbid, dethroning, and comeback is a ready-made post.

## Why the classic publicity stunt is a bad deal for small brands

The textbook publicity stunt — the flash mob, the giant installation, the outrageous challenge — has three problems for anyone without a corporate budget. It costs real money to stage. It's a single moment: if nobody films it, it never happened. And it's risky: stunts that misfire become cautionary tales instead of case studies.

The underlying goal of a stunt was always the same: **manufacture a moment people can't help talking about.** But there's a cheaper way to manufacture that moment, one that doesn't require permits, props, or luck. Instead of staging an event, stage a contest — a public, ongoing, visible competition where your brand is a contestant.

## Competition is the oldest viral mechanic

Sports, elections, rap battles, reality TV finales: humans are wired to watch rankings change. A leaderboard does something no static ad can — it creates *narrative tension*. Who's on top? Who just got knocked down? Who's climbing? Every position change is a tiny plot twist, and plot twists are what people share.

This is why [viral marketing strategies](/blog/viral-marketing-strategies) keep coming back to participation loops. A leaderboard is a participation loop with the friction removed: you don't need to film a dance or learn a challenge. You just need to care who wins — and the board makes you care by showing you the score.

## The $1 stunt: bid, get noticed, start a rivalry

Here's the stunt, in its entirety:

1. **Claim a spot on a public bidding leaderboard for $1.** On FlexSpot, that puts your brand name, link, and branding on a live board that visitors browse, screenshot, and share. You're now a public contestant.
2. **Announce your position.** Post your rank everywhere your audience is: "We're #14 on the FlexSpot leaderboard — help us take the crown." You've just turned a $1 purchase into a campaign with a goal, a scoreboard, and a call to action.
3. **Let the board do the rest.** Other brands bid. Someone outbids you. You get dethroned — and that's *content*. "We just got knocked to #15 by a coffee brand. Unacceptable. Boost us back." Every shift is a post, a Short, a community update.

The genius of the format is that the stunt never ends. A flash mob is over in ten minutes. A leaderboard rivalry runs as long as you want it to — and every rival who bids against you is spending *their* money to generate *your* drama. Your competitor's marketing budget becomes your content calendar.

This is the same principle behind [guerrilla marketing ideas](/blog/guerrilla-marketing-ideas) that punch above their weight: spend the minimum that creates a story, then let the story spend itself.

## Why rivalry content spreads itself

When two brands publicly compete, three audiences show up without being invited:

- **Your fans**, who treat defending your rank as a team sport and share your posts to recruit help.
- **Their fans**, who do the same for the other side — doubling your reach for free.
- **Neutrals**, who just like watching a fight. They follow the board, screenshot the standings, and argue about it in comments. Neutrals are the audience money can't buy, because they showed up for the drama, not for you.

Nobody shares a banner ad. People absolutely share "look who just stole #1." The shareability isn't in the creative — it's in the *stakes*. Public stakes make private attention public, and public attention is what virality is made of.

## Running the stunt well: a short playbook

- **Pick a lane with rivals.** A board full of strangers is a ranking; a board with your actual competitors is a grudge match. Claim spots near brands your audience already knows.
- **Narrate everything.** Silence wastes the mechanic. Every climb, every dethroning, every comeback gets a post. Give the rivalry characters and a storyline — "the coffee wars," "the battle for #3."
- **Invite your audience in.** Referral links, share buttons, "boost us" calls to action — make your audience participants, not spectators. People promote what they feel part of.
- **Know when to escalate and when to bank it.** Defending #1 against a deep-pocketed rival can burn budget fast. Sometimes the smarter stunt is the underdog run: document the climb, not just the crown. For the mechanics of when to boost and when to hold, see [how boosts move you up the leaderboard](/blog/how-boosting-moves-you-up-the-leaderboard).
- **Screenshot the receipts.** Leaderboard positions are ephemeral; screenshots are forever. Archive every peak — they're testimonials, social proof, and future content.

## What this costs, honestly

The entry is $1. Defending a contested spot costs more — that's the nature of an auction, and you should go in with a budget ceiling the way you'd set one for any ad campaign. But compare it to the alternative: a single sponsored post from a mid-tier creator can cost hundreds and vanishes in 24 hours. A leaderboard rivalry at the same total spend can run for weeks, generate dozens of content moments, and leave you with an audience that watched the whole season.

The stunt isn't the dollar. The stunt is the *story the dollar starts*.

## Frequently asked questions

**What is a publicity stunt in marketing?**
A publicity stunt is an attention-grabbing action designed to earn media coverage and social sharing rather than paid impressions. The $1 leaderboard version replaces the staged event with public competition — cheaper, repeatable, and self-documenting.

**Do publicity stunts still work in 2026?**
The format evolved. One-off spectacles are harder to break through with than they used to be, but *ongoing public narratives* — rivalries, rankings, races — work better than ever because they fit how feeds reward serialized content.

**How can a small brand run a stunt with no budget?**
Enter a public competition instead of staging a private event. A $1 leaderboard bid gives you a rank to promote, rivals to feud with, and a storyline to serialize — the three ingredients of a stunt — for the price of a coffee.

**What's the risk of a competitive leaderboard stunt?**
The main risk is budget creep: auction dynamics can tempt you to overbid to defend a spot. Set a ceiling before you start, and remember the content value of the rivalry often exceeds the value of the rank itself.
`,HT=`---
title: "Beyond Product Hunt: 10+ Places to Launch Your Startup"
description: "Product Hunt alternatives for your 2026 launch: 10+ free and paid platforms where startups get featured, compared honestly, plus picking the right mix."
date: 2026-09-23
author: "FlexSpot Team"
category: "Getting Started"
keywords:
  - product hunt alternatives
  - where to launch startup 2026
  - startup launch platforms
  - alternatives to product hunt
pillar: false
related:
  - google-ads-too-expensive-cheaper-alternatives
  - guerrilla-marketing-ideas
  - getting-started-with-flexspot
sample: false
image: "/og-cover.png"
---

> **Key takeaways:**
> - Product Hunt is one launch channel, not the launch strategy — most successful launches stack several platforms.
> - Free launch platforms (BetaList, Show HN, Indie Hackers) trade time and preparation for visibility; paid ones trade money for guaranteed placement.
> - Paid placement is now normal across startup directories — the question isn't whether to pay, but what you get for it.
> - Match the platform to your audience: developers, indie hackers, and general consumers hang out in different places.

## Why you need more than one launch

A Product Hunt launch is a lottery ticket with good odds: free to enter, a
real shot at thousands of visitors in a day, and genuine credibility if you
rank. But it's one day, it's competitive, and an algorithm plus a fickle
crowd decide your fate. The startups that launch well treat launch day as
the *start* of a campaign, not the campaign itself.

Below are ten-plus places to get featured — free, paid, and competitive —
plus a framework for picking the right mix.

## Free launch platforms

### 1. BetaList

One of the oldest startup launch sites. You submit your startup pre-launch
or at launch, and if accepted you're featured to an audience of early
adopters who actively hunt new products. Listings are curated, so a sharp
one-liner and a clean landing page matter.

**Best for:** SaaS, apps, and tools with a clear value proposition.

### 2. Hacker News — Show HN

Posting to "Show HN" puts you in front of one of the most technically
influential audiences on the internet, free. The catch: the crowd is
brutally honest. Ship something real, write a plain-spoken post, and answer
every comment.

**Best for:** developer tools, open source, technical products.

### 3. Indie Hackers

Part community, part launch platform. Sharing your build journey and
launching to the Indie Hackers audience works especially well for bootstrapped
products — the community rewards transparency over polish.

**Best for:** indie/SaaS founders building in public.

### 4. Uneed

A launch platform in the Product Hunt family of alternatives, focused on
giving new products a clean spotlight. Submission is straightforward and the
audience skews toward product-curious early adopters.

**Best for:** consumer apps and tools that photograph well.

### 5. Tiny Startups

A newsletter-plus-directory that features small startups to an audience
that specifically wants to discover them. Small audience, but extremely
well-matched — these readers *want* to try new things.

**Best for:** tiny teams and solo founders who'd be invisible on bigger
platforms.

## Paid and featured-placement platforms

### 6. Fazier

A curated startup directory with featured placement options. Like most
modern launch directories, it offers paid tiers that put your listing in
front of more browsers.

**Best for:** startups that want a persistent listing, not just a launch day.

### 7. Launching Next / Betapage / MicroLaunch

A cluster of smaller launch sites (Launching Next, Betapage, MicroLaunch,
and similar) that accept submissions and offer varying levels of promotion.
They're individually small, but submitting to several takes an afternoon and
each one is another indexed page pointing at you — which helps with
discovery and SEO.

**Best for:** padding out launch week with multiple small wins.

### 8. 10words

A minimalist directory: describe your startup in ten words. The constraint
forces clarity, and the listings get browsed by people who enjoy discovering
products.

**Best for:** products with a genuinely simple pitch.

## The competitive angle: bid for the spotlight

### 9. FlexSpot — the paid leaderboard

Here's the one that's structurally different. Instead of hoping a crowd
votes you up or paying a flat fee for a static listing, you bid for a
visible rank on a public leaderboard — starting at $1. Outbid a rival and
you take their spotlight; the rivalry itself becomes content people share.

**Best for:** launches that need guaranteed visibility plus a story. If
your launch plan is "post and pray," a leaderboard bid is the paid anchor
that guarantees *someone* sees you on day one.

**Tradeoff:** it's a visibility play, not a directory listing — make sure
your site is ready to convert the attention. New here? Start with
[getting started with FlexSpot](/blog/getting-started-with-flexspot).

## How to pick your launch mix

Don't shotgun all of them. Use this filter:

1. **Audience match first.** Developer tool? Show HN and BetaList before
   anything else. Consumer app? Product Hunt, Uneed, Tiny Startups.
2. **One free spike + one paid anchor.** A free launch (Product Hunt, Show
   HN) gives you the spike; a paid placement (a directory feature or a
   leaderboard bid) guarantees a floor of visibility even if the spike fizzles.
3. **Sequence them.** Launch on one platform, collect feedback and
   testimonials, then launch on the next with a better pitch. Three small
   launches beat one big launch you weren't ready for.
4. **Prepare once, reuse everywhere.** Your one-liner, screenshots, and demo
   video work on every platform. The founders who launch everywhere cheaply
   are the ones who prepared once, thoroughly.

For the scrappy side of launch marketing, pair this with
[guerrilla marketing ideas](/blog/guerrilla-marketing-ideas) — and if paid
ads are also in your mix, our
[Google Ads alternatives guide](/blog/google-ads-too-expensive-cheaper-alternatives)
keeps the budget sane.

## Frequently asked questions

**Is Product Hunt still worth it in 2026?**
Yes, as one channel among several. It remains the highest-profile free
launch platform, but it's competitive and unpredictable — treat it as the
spike in a multi-platform launch, not the whole plan.

**What's the best free Product Hunt alternative?**
BetaList for curated early-adopter reach, Show HN for technical products,
and Indie Hackers for bootstrapped SaaS. All three are free and each
reaches an audience Product Hunt doesn't fully cover.

**Should I pay for a launch listing?**
Paid placement is now standard across startup directories — most of them
sell featured spots. Pay when the placement guarantees visibility to your
actual target audience (not just "more traffic"), and always pair it with
free launches so you're not dependent on one paid hit.

**How do I launch if I have zero audience?**
Stack small platforms: submit to BetaList, Tiny Startups, 10words, and a
few small directories in one week; post your build story on Indie Hackers;
and anchor it with one guaranteed-visibility play like a $1 leaderboard bid
so day one isn't silent. Audience is built launch by launch.
`,qT=`---
title: "How to Promote Your YouTube Channel With Just $1 in 2026"
description: "Promoting a YouTube channel for $1 is possible — just not the way most people think. Here's what one dollar actually buys, and the free tactics that pair with it."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Viral Marketing"
keywords:
  - how to promote youtube channel
  - promote youtube channel for $1
  - promote youtube channel cheap
  - cheap youtube promotion
  - grow youtube channel low budget
pillar: false
related:
  - how-to-make-your-brand-go-viral
  - viral-marketing-strategies
  - word-of-mouth-marketing
sample: false
---

> **Key takeaways:**
> - One dollar won't buy you real subscribers — anyone selling them that cheap is selling bots, which can hurt your channel.
> - What $1 *can* buy is a visible public placement (like a spot on FlexSpot's leaderboard) that puts your channel name in front of curious people.
> - The real promotion engine is still the content: Shorts, searchable titles, and consistent uploads do the heavy lifting.
> - Pair a $1 visibility bid with one strong video, and you get the thing ads can't buy: a story worth clicking.

## What $1 can't buy (let's be honest first)

Search "promote YouTube channel for $1" and you'll find sellers promising subscribers, views, and likes for pocket change. Avoid them. YouTube's systems detect inauthentic engagement, and channels caught using bot farms face shadow-limiting or termination. Even when the numbers go up, the watch time from fake views drags down your retention metrics — the exact metric the algorithm uses to decide whether to recommend you. A channel with 10,000 fake subscribers and 200 real viewers is worse off than a channel with 200 real subscribers.

So set the expectation correctly: **one dollar does not buy an audience. It buys a billboard.** The question is where that billboard stands, and whether anyone looking at it cares.

## What $1 *can* buy: a spot people actually notice

Most ad platforms can't do anything with a dollar. Their minimum budgets, auction floors, and campaign setup are built for businesses spending hundreds a month. A $1 campaign on a major platform is either impossible or invisible.

A public bidding leaderboard flips that logic. On FlexSpot, a $1 bid claims a real, visible spot on a public ranking board — your channel name, link, and branding shown alongside other brands competing for the same attention. That's not an ad buried in a feed; it's a placement people browse on purpose, because the board itself is the entertainment. Leaderboards get screenshotted, shared, and argued about. Your channel rides along with that attention.

The mechanics matter here: because spots are claimed by bidding and defended by outbidding, your placement has a story. "My channel is climbing the FlexSpot board" is a post you can share on your community tab, your Shorts comments, and your socials — and every bid war with a rival channel is free drama that pulls eyes back to the board, and to you.

If you want to understand how this mechanic works before you spend anything, read [what bid-for-attention marketing is](/blog/what-is-bid-for-attention-marketing) and [how boosts move you up the leaderboard](/blog/how-boosting-moves-you-up-the-leaderboard).

## The $1 promotion playbook: bid + one killer video

A dollar of visibility only works if there's something worth seeing at the other end. Before you place your bid, get these three things right:

1. **One standout video pinned or ready.** The bid drives curiosity clicks; your best recent video converts them into subscribers. Pick the one with the strongest first 30 seconds — curiosity clicks bounce fast, so the hook is everything.
2. **A channel page that closes the deal.** Clear banner, a trailer or featured video, and playlists that make the channel look alive. If someone clicks through from the leaderboard and lands on a channel with no clear identity, they're gone.
3. **Shorts running in parallel.** Shorts are the cheapest organic discovery surface YouTube offers. Post the bid, then post a Short about it — "I spent $1 to put my channel on a public leaderboard, here's what happened" — and you get two discovery channels feeding each other: the board brings the curious, the Short brings the subscribers.

This is the same pattern behind every [guerrilla marketing idea that works on a small budget](/blog/guerrilla-marketing-ideas): a tiny spend that creates a story, paired with free distribution of that story.

## Free tactics that do the heavy lifting

The $1 bid is the spark, not the engine. These cost nothing and compound:

- **Searchable titles.** Most small channels title for personality ("I did a thing!!") instead of search ("I rebuilt my setup for under $100"). Title for what a stranger would type.
- **Reply to every comment early.** The first 48 hours of engagement signal to the algorithm that the video has a pulse. Comments from you count, and they double as community building.
- **Collaborate sideways.** Channels your size are your best partners, not your competition. A collab with a channel at your level doubles both audiences' discovery surface.
- **Repurpose everything.** One video becomes three Shorts, five posts, and a community poll. Small channels die from under-distribution, not under-production.

## How to stretch the dollar further

Once your $1 spot is live, squeeze it:

- **Time the bid.** Place it when you're about to publish, not during a dead week. The board sends a trickle of clicks; you want them landing on fresh content.
- **Defend strategically.** If someone outbids you, decide whether the spot is worth defending based on the clicks it's sending, not ego. Sometimes dropping to a cheaper spot and rebidding later is the smarter play — see our [bidding strategy basics](/blog/how-boosting-moves-you-up-the-leaderboard).
- **Screenshot everything.** Your rank, your climbs, your rivalries. Every screenshot is content for Shorts, community posts, and tweets. The bid is $1; the content it generates is free.

## Frequently asked questions

**Can I really promote my YouTube channel with just $1?**
You can buy one genuine placement — a visible spot on a public leaderboard like FlexSpot's — for $1. You cannot buy real subscribers, real watch hours, or algorithmic favor for $1 anywhere legitimate. Treat the dollar as a billboard, not a growth hack.

**Is buying cheap subscribers or views ever worth it?**
No. Inauthentic engagement hurts retention metrics and risks channel penalties. Every dollar spent on fake growth would have performed better as a real placement or saved toward real content.

**What's the fastest free way to promote a new channel?**
Shorts with searchable titles, consistent uploads, and genuine community engagement (replying to comments, collaborating with similar-size channels). Paid visibility amplifies this — it doesn't replace it.

**How does a leaderboard spot help a YouTube channel specifically?**
It puts your channel name and link in front of people who are already browsing for things to click — a self-selected curious audience. Pair it with a strong featured video and it converts curiosity into subscriptions far better than a random ad impression.
`,YT=`---
title: "Referral Marketing: The Complete Guide for Small Businesses"
description: "Referral marketing for small businesses: how referral programs work, which rewards motivate sharing, and step-by-step setup that turns customers into promoters."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Small Business Marketing"
keywords:
  - referral marketing
  - referral program
  - customer referrals
  - refer-a-friend marketing
  - referral rewards
pillar: true
related:
  - how-to-get-referrals-for-your-business
  - how-to-start-a-referral-program
  - referral-program-ideas
  - affiliate-marketing-for-small-business
sample: false
---

> **Key takeaways:**
> - Referral marketing turns happy customers into a growth channel by rewarding them for bringing friends.
> - The core mechanics are simple: a personal link or code, a trackable action, and a reward worth sharing for.
> - The best programs reward both sides, ask at the peak moment, and make sharing take seconds.
> - Start small and manual, measure what converts, then automate and scale what works.

## What referral marketing is (and isn't)

Referral marketing is the systematic practice of encouraging and rewarding your existing customers for bringing you new ones. It's word-of-mouth with infrastructure: instead of hoping happy customers mention you, you give them a personal link or code, track the results, and thank them with rewards.

What it isn't: paying strangers for leads (that's affiliate marketing or paid acquisition), bribing people for fake reviews, or a "share this for 10% off" pop-up nobody uses. Real referral marketing is built on genuine satisfaction — the program just removes the friction between "I love this" and "you should try this."

For small businesses, it's one of the highest-leverage channels available: referred customers typically convert better, stay longer, and cost far less to acquire than ad-driven ones, because they arrive with borrowed trust.

## Why it works: the psychology of the referral

Three forces make referrals convert where ads don't:

1. **Borrowed trust.** The recommender's credibility transfers to you. A friend's "this worked for me" beats any testimonial on your site.
2. **Social proof in context.** The referral arrives at the right moment — when the friend actually needs what you sell — because the referrer knows both sides.
3. **Reciprocity.** When both sides get rewarded, the referrer feels generous rather than salesy, and the friend feels welcomed rather than pitched.

Your program design should protect all three: keep rewards feeling like a thank-you (not a commission), make the share personal (not a mass blast), and never reward fake or low-quality referrals in ways that train people to game the system.

## The anatomy of a referral program

Every working referral program has the same five components:

- **The identifier.** A personal referral link or code unique to each customer. This is the backbone — without it, you can't track, reward, or even know referrals are happening.
- **The share path.** How the customer sends it: pre-written messages for WhatsApp/SMS/email, social share buttons, a QR code for in-person businesses. One click, under five seconds.
- **The trigger action.** What counts as a successful referral? A signup, a first purchase, a visit? Define it clearly and make it the action that actually matters to your business — not a vanity metric.
- **The reward.** What the referrer gets (and ideally what the friend gets). Cash, credit, discounts, status, early access — matched to what your customers actually value.
- **The tracking.** Who referred whom, when, and whether the action completed. Even a spreadsheet works at small scale; the point is that rewards are prompt and accurate, because late or missing rewards kill programs fast.

## Reward structures that actually motivate

The most common failure in referral marketing is a reward nobody cares about. Design principles:

- **Reward both sides.** Two-sided rewards (friend gets $10, you get $10) consistently outperform referrer-only rewards — the sharer feels generous, not mercenary.
- **Match the reward to the customer.** Discounts work for repeat-purchase businesses; cash or credit works when the audience is price-sensitive; status and access work for identity-driven brands. Ask your best customers what they'd actually want.
- **Make the first reward easy.** If the first payout requires five referrals, most people never start. One referral, one reward — momentum beats generosity at the start.
- **Consider non-cash rewards seriously.** Early access, a featured spot, a personal thank-you from the founder, entry into something exclusive — these often motivate more than small cash amounts and cost you less.
- **Pay promptly.** The gap between the referral and the reward is where trust lives or dies. Automate payouts or set a strict schedule, and communicate it clearly.

Anti-gaming matters from day one: count meaningful actions (not raw clicks), limit rewards per referred person (e.g., one credit per visitor per day), and watch for patterns like self-referrals. A program people can farm is a program that trains the wrong behavior.

## Step-by-step: launching your first program

**Week 1 — Design.** Define the trigger action, pick a two-sided reward, and write the share messages. Keep it to one page: who, what, when, how much.

**Week 2 — Build.** Set up personal links or codes, the tracking (even a simple dashboard or spreadsheet), and the share buttons. Test the full flow yourself as both referrer and friend.

**Week 3 — Soft launch.** Invite your 20–50 happiest customers personally. Watch where they get confused, fix the friction, and confirm rewards arrive correctly.

**Week 4 — Go wide.** Announce to your full list, add the referral prompt to your post-purchase flow, and put the program where customers already are (account page, receipts, packaging).

**Ongoing — Optimize.** Track referral rate (what % of customers refer), conversion rate (what % of referred friends act), and cost per referred customer. Improve the weakest number first.

## Referral marketing vs. affiliate marketing

They're often confused. The distinction: **referrals come from customers recommending something they use; affiliates are partners promoting for commission.** Referral rewards are typically smaller, friendlier, and two-sided; affiliate commissions are larger, performance-based, and one-sided. Many businesses run both — referrals for the warm customer base, affiliates for reach. If your customers love you, start with referrals. If you need distribution beyond your customer base, add affiliates.

## B2B vs. B2C: the program changes with the buyer

The mechanics are the same, but the design shifts:

- **B2C (consumers):** Decisions are fast and emotional. Rewards should be instant and tangible — discounts, credit, cash. Share paths live in messaging apps and social. Volume matters more than any single referral.
- **B2B (businesses):** Decisions are slow and committee-based. A referral is really an introduction, and the reward is often relationship capital — a warm intro returned, a public thank-you, a case-study feature, or meaningful account credit. Personal outreach beats share buttons; the ask happens in calls and emails, not pop-ups.

Hybrid businesses need both tracks. Don't force consumer mechanics onto enterprise buyers — a $10 credit insults a buyer evaluating a $10,000 contract, while a founder-to-founder intro is priceless.

## Copy-paste referral messages that don't feel spammy

The share message does half the work. Give customers words they'd actually send:

- **The casual friend text:** "Been using [brand] for [thing] and it's genuinely great — here's my link, you get [reward] off your first [order/month]: [link]"
- **The problem-solver:** "You mentioned struggling with [problem] — I use [brand] for exactly that. Worth a look: [link] (gets you [reward])"
- **The in-person one-liner:** "Ask for [name/code] when you go — tell them I sent you and you'll get [reward]."
- **The post-purchase email:** "Enjoying [product]? Friends get [reward] when you share your link — and so do you: [link]"

Keep every message under three lines, lead with the personal endorsement, and put the reward second. Nobody forwards a paragraph.

## Scaling: from spreadsheet to system

Start manual — it's faster to launch and teaches you what actually converts. Graduate to tooling when volume demands it:

- **Under 50 referrals/month:** Personal links via a simple generator, tracking in a spreadsheet, manual reward fulfillment. Totally fine.
- **50–500/month:** A referral platform or plugin (most e-commerce and membership tools have one), automated reward emails, a basic dashboard.
- **500+/month:** Dedicated referral software with fraud detection, tiered rewards, and API integration into your billing. At this scale, anti-gaming and attribution accuracy are the job.

The mistake is buying enterprise software for ten referrals a month, or running a thousand referrals on a spreadsheet. Match the system to the volume, and re-evaluate twice a year.

## Common mistakes

- **Launching before you have happy customers.** Referral programs amplify satisfaction — and dissatisfaction. Fix the experience first.
- **Hiding the program.** A referral page nobody can find is decoration. Promote it like a product.
- **Overcomplicating.** Tiers, points, expiries, and fine print in version one. Start simple; add sophistication when volume demands it.
- **Forgetting the friend's experience.** The referred friend's first impression is your real conversion moment. Make their landing page welcoming and the reward obvious.
- **Setting and forgetting.** Programs decay: rewards go stale, links break, enthusiasm fades. Review quarterly.

## Keeping the program alive: the quarterly tune-up

Referral programs decay quietly. Rewards that excited people in January feel stale by July; share buttons break during site redesigns; enthusiasm fades when nobody mentions the program for months. Put a recurring 90-day review on the calendar:

1. **Check the numbers.** Referral rate, conversion rate, cost per referred customer — which one slipped, and why?
2. **Refresh the reward.** Rotate in a seasonal or limited-time bonus. Novelty re-activates dormant referrers.
3. **Spotlight advocates.** Feature top referrers publicly (with permission). Recognition is a reward that never gets old.
4. **Fix the friction.** Click through the whole flow as a new user. Every quarter, something has broken or gotten clunky.
5. **Ask churned referrers why.** The people who referred once and stopped will tell you exactly what's wrong — if you ask.

A referral program is a living channel, not a launch-day checkbox. The businesses famous for referral growth treat it as a product with its own roadmap.

## The honest truth about referral marketing

Referral marketing won't save a mediocre product — it amplifies what already exists. If customers aren't already recommending you unprompted, a program with rewards won't fix that; it will just pay people to do awkwardly what they wouldn't do naturally. The order of operations is non-negotiable: remarkable experience first, frictionless sharing second, rewards third. Get that order right, and referrals become the cheapest, most trusted growth channel you have. Get it backwards, and you have an expensive bribery scheme that trains customers to wait for payouts. Build the love first — then build the loop that spreads it.

## Referral marketing and AI search: the new visibility

One more reason referrals matter more than ever: as AI assistants and answer engines reshape how people discover businesses, the personal recommendation is becoming the discovery channel algorithms can't easily intermediize. When someone asks a friend "who do you use for X," no search ranking stands between the question and your name. Businesses with strong referral engines are building discovery that's immune to algorithm changes — an audience that arrives through trust rather than through a feed. That's a durable asset no platform update can take away.

## Quick-start checklist

If you want to launch a basic referral loop this week: define one trigger action and one two-sided reward; create personal links or codes for your 30 best customers; write two share messages (casual and professional); set up a simple tracking sheet; email those 30 customers personally with their link; fulfill the first rewards within 48 hours; then review what happened and decide whether to build it out. Done manually, that's a weekend of work — and it will teach you more about your customers' willingness to advocate than any amount of planning.

## Where referral mechanics shine brightest

Referral marketing works anywhere customers are happy, but it compounds fastest on platforms where advocacy is visible — where a supporter's referral link doesn't just earn them credit but visibly moves something: a ranking, a total, a leaderboard position. When referring a friend also climbs you toward a goal everyone can see, the social reward stacks on top of the material one. That's the dynamic behind referral-driven visibility platforms like FlexSpot, where every visit through a personal link adds to a public total. Whether you build your own program or plug into a competitive arena, the principle is the same: make advocacy visible, make it rewarding, and make it effortless.
`,GT=`---
title: "Referral Program Ideas: Rewards That Actually Motivate People"
description: "Referral program ideas beyond boring discounts: creative rewards, tiered incentives, contests, and two-sided offers that make customers eager to share."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Small Business Marketing"
keywords:
  - referral program ideas
  - referral rewards ideas
  - refer-a-friend rewards
  - creative referral incentives
pillar: false
related:
  - how-to-start-a-referral-program
  - referral-marketing
  - affiliate-marketing-for-small-business
sample: false
---

> **Key takeaways:**
> - The best referral rewards match what your specific customers value — not what a best-practice list says.
> - Two-sided rewards (both friend and referrer win) consistently outperform referrer-only schemes.
> - Non-cash rewards — status, access, exclusivity — often motivate more than small cash amounts.
> - Rotate and refresh rewards quarterly; stale incentives are why programs quietly die.

## Why most referral rewards fail

"We'll give you 10% off for every referral" sounds reasonable in a meeting and dies in the real world. Why? Because the reward is forgettable, the effort feels disproportionate, and the customer can't picture what they're getting. Referral rewards work when they're **vivid, valuable, and fast** — the customer can imagine the reward, wants it, and believes it'll actually arrive.

Before picking from the ideas below, ask your best customers one question: "What would make you excited to tell a friend about us?" Their answers will beat this list. Use the list to spark thinking, not to replace it.

## Cash and credit rewards (the classics, done right)

- **Two-sided cash:** Friend gets $10, you get $10. The gold standard for a reason — the sharer feels generous, the friend feels welcomed.
- **Escalating credit:** $5 for the first referral, $10 for the second, $25 for the fifth. Rewards momentum and turns casual sharers into habitual ones.
- **Wallet credit toward the next purchase:** Keeps the value inside your business while feeling like real money. Best for repeat-purchase businesses.
- **Charity donation option:** Let referrers donate their reward to a cause. A meaningful choice for values-driven brands — some customers prefer generosity over cash.
- **The "first one free" unlock:** One successful referral earns a free product or month. Simple, vivid, and easy to picture.

Rules that make cash work: pay fast (within days, not billing cycles), make the first reward achievable with a single referral, and never let rewards expire silently — expiry without warning breeds resentment.

## Discount-based rewards (and how to make them exciting)

Discounts are the most common referral reward and the most boring. Fix them:

- **Bigger for the friend:** Give the friend 25% and the referrer 10%. Counterintuitive, but the sharer cares more about looking generous than about their own cut.
- **Stackable perks:** Each referral adds a perk — free shipping, priority support, an extended warranty. The bundle grows visibly with each share.
- **Mystery rewards:** "Refer a friend, unlock a surprise." Curiosity is a powerful motivator when the brand voice supports playfulness. (Keep the surprises genuinely good — a bad mystery box kills trust.)
- **Tiered VIP discounts:** 3 referrals = Silver (15% off everything for a year), 10 = Gold (25%). Tiers add status to the savings.

## Status and access rewards (the underrated powerhouses)

For many audiences, recognition beats cash:

- **Founder's circle / insider group:** Early access to products, a private channel, input on what's built next. Costs you almost nothing; valued enormously by engaged customers.
- **Public leaderboard:** Top referrers featured visibly — on your site, in your emails, at events. Status is a renewable reward that never costs margin.
- **Skip-the-line privileges:** Priority support, early booking windows, first dibs on limited drops. Convenience as a reward.
- **Co-creation opportunities:** Top referrers help design the next product or vote on new features. Influence is the ultimate insider reward.
- **The personal touch:** A handwritten note or personal video from the founder for milestone referrals. Unscalable, unforgettable.

## Contest and event-based ideas

- **Monthly referral race:** Whoever refers the most in a month wins a headline prize. Competition energizes your existing advocates and gives everyone a reason to share *now*.
- **Milestone unlocks:** At 5/25/100 total referrals, the whole referrer community unlocks something — a party, a product drop, a donation. Collective goals create collective promotion.
- **Double-reward weekends:** Limited-time 2x rewards create urgency spikes. Use sparingly — permanent urgency is just noise.
- **Referral leaderboard with live totals:** When referrers can watch their count climb publicly, the game itself becomes the reward.

## Ideas by business type

- **E-commerce:** Store credit, free products, early access to drops, free shipping for a year.
- **SaaS / subscriptions:** Free months, feature unlocks, increased limits, priority support.
- **Local services:** Free service upgrades, priority booking, a "VIP client" experience.
- **Agencies / B2B:** Account credit, free strategy sessions, public case-study features, introductions in return.
- **Creators / communities:** Shoutouts, exclusive content, community roles, merch.

## Refreshing stale rewards

Even great rewards decay. Signs yours have: referral rate drifting down, advocates mentioning the reward less, competitors offering something shinier. The fix is rotation, not just increase — swap in a limited-time bonus, add a seasonal prize, introduce a new tier. Novelty re-activates dormant referrers better than a bigger number does. Review rewards quarterly and retire anything that no longer excites.

## Reward mistakes that backfire

A few ways well-intentioned rewards go wrong: **rewards that arrive late** teach people the program isn't serious — speed matters more than size. **Rewards with surprise conditions** ("oh, that only applies to annual plans") feel like bait-and-switch and generate resentment instead of referrals. **Rewards that cost the referrer social capital** — like spamming their contacts for pennies — make people feel used; the reward must always feel generous relative to the ask. **One-size-fits-all rewards** ignore that your marathon runners and your casual joggers want different things; segment if you can. And **copying a competitor's reward** without understanding your own customers' motivations usually misses — the right reward is the one *your* advocates get excited about, which is why asking them beats benchmarking.

The through-line: reward what your customers actually want, make it vivid and fast, recognize them publicly, and keep it fresh. Do that, and the program markets itself.

## Testing new reward ideas cheaply

Don't redesign the whole program to test an idea. Run a two-week experiment: pick one segment of advocates, offer the new reward alongside the old one, and watch which gets shared more. A simple A/B on the reward — same audience, same timing, different incentive — tells you within weeks what a quarter of debate never will. Kill what underperforms, keep what wins, and fold the winner into the permanent program. The best referral programs weren't designed perfectly on day one; they were iterated into excellence one small test at a time.

## Seasonal and moment-based reward ideas

The calendar is a free source of reward novelty: a holiday bonus round in December, a "summer referral sprint" with a themed prize, back-to-school bundles for family audiences, anniversary rewards on the program's birthday. Moment-based rewards work because urgency and novelty are built in — nobody needs to be convinced that a limited-time offer is limited. Tie the reward to the moment (gift cards in December, event tickets in summer, exclusive content at launch milestones) and even a modest prize feels special. Two or three seasonal beats a year keep the program feeling alive without constant reinvention.
`,KT=`---
title: "Should You Buy Website Traffic? An Honest Breakdown"
description: "Thinking about buying website traffic? This honest breakdown covers when it works, when it's a scam, and the legitimate alternatives that buy real attention."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Visibility Guides"
keywords:
  - buy website traffic
  - buying website traffic
  - buy targeted traffic
  - paid website visitors
pillar: false
related:
  - how-to-get-traffic-to-your-website
  - website-traffic-sources-ranked
  - cheap-ways-to-advertise-a-small-business
---

> **Key takeaways:**
> - "Buy website traffic" usually means cheap bulk visitors — bots or click-farms that never convert and pollute your analytics.
> - Legitimate paid traffic exists, but it's sold as ads, sponsorships, or featured placements — never as visitors-by-the-thousand.
> - The question to ask any vendor: "Who exactly are these humans, and why would they care about my site?"
> - Buying *visibility* in front of a real audience (sponsorships, placements, leaderboard spots) is honest paid marketing; buying raw visitor counts is not.
> - If you pay for traffic, protect yourself with a test budget, UTM tracking, and a conversion goal.

## What people mean by "buy website traffic"

Searchers typing "buy website traffic" usually want one of two things: a fast
way to get visitors without doing months of SEO, or social proof — bigger
numbers in their analytics. Vendors are happy to sell both. The problem is what
they're actually delivering.

There are two completely different products hiding behind that phrase, and
telling them apart is the whole game.

## The scam version: bulk visitors by the thousand

You've seen the offers: "10,000 targeted visitors for $29." Here's what those
visitors are:

- **Bots** — automated scripts that load your page and bounce. They show up in
  analytics as visitors but never scroll, click, or buy.
- **Click-farm workers** — real humans paid pennies to visit pages. They're
  real in the biological sense only; they have zero interest in your offer.
- **Pop-under and redirect traffic** — your site forced open in a hidden tab
  or after a misleading click. Technically a visit; practically an accident.

Why this is worse than useless:

1. **Zero conversions.** Nobody in this "audience" will ever buy from you.
2. **Corrupted analytics.** Once fake visitors mix with real ones, you can't
   tell what your actual marketing is doing. You're flying blind.
3. **Ad account risk.** If you're running Google or Meta ads, junk traffic
   patterns can trigger reviews and account issues.
4. **It trains bad habits.** Chasing visitor counts instead of buyers is how
   businesses burn years on vanity metrics.

Red flags that scream bulk-traffic scam: pricing by the thousand with no
audience description, "instant delivery" promises, no targeting beyond
country, no refunds, and testimonials that only mention visitor counts —
never sales, signups, or revenue.

## The legitimate version: buying attention, not counts

Real paid traffic is never sold as "visitors." It's sold as **access to an
audience**:

- **Search and social ads** — you buy placement in front of people with
  demonstrated intent or interests, and you pay per click or impression.
- **Newsletter and podcast sponsorships** — you buy a mention to a trusting,
  opted-in audience.
- **Featured placements and homepage spots** — you buy visibility where real
  visitors browse. This is the oldest model in advertising (it's what magazine
  covers and billboards were), and modern versions include marketplaces where
  brands bid for prominent placement — FlexSpot's leaderboard works this way,
  with spots starting from $1 and ranking that's public and verifiable.
- **Influencer and creator partnerships** — you buy a recommendation, not a
  click count.

The difference: with legitimate options, you can **name the humans** who will
see your brand and explain why they'd care. If a vendor can't do that, walk
away.

## Honest comparison: bulk traffic vs. real paid options

| | Bulk "traffic" sellers | Legit paid options |
|---|---|---|
| What you buy | Visitor counts | Audience access |
| Who visits | Bots / paid clickers | Real people with relevant interests |
| Conversion potential | Effectively zero | Varies — testable and improvable |
| Analytics impact | Corrupts your data | Clean, attributable with UTMs |
| Typical cost | Suspiciously cheap ($/thousands) | Higher, but tied to real outcomes |
| Risk | Account flags, bad decisions | Normal marketing risk |

## When buying traffic (the legitimate kind) makes sense

- **You have a page that already converts.** Paid traffic amplifies; it doesn't
  fix. If organic visitors convert, paid ones will too.
- **You need speed** — a launch, an event, a seasonal window. Organic can't hit
  a date.
- **You're buying data.** A small test budget tells you which messages and
  audiences convert, which then improves your organic and content work.
- **You've found an underpriced audience.** Niche newsletters, small podcasts,
  and new placement marketplaces often deliver attention far cheaper than
  Google/Meta auctions.

## When you should NOT buy traffic

- Your site doesn't clearly explain what you offer (fix the page first).
- You can't afford to lose the test budget.
- The vendor can't describe the audience in human terms.
- You're buying it to impress someone with analytics screenshots. (Don't.
  Investors and partners can spot junk traffic, and it destroys trust.)

## How to buy paid traffic safely: a checklist

1. **Define one conversion** before spending — a purchase, a signup, a booking.
   "More visitors" is not a goal.
2. **Start with a test budget** you're willing to lose. Think "buying data."
3. **Use UTM parameters** on every link so you can attribute results in
   analytics.
4. **Send traffic to a dedicated page**, not your homepage — match the message
   to the ad or placement.
5. **Watch behavior, not just counts:** time on page, scroll depth, conversion
   rate. Real audiences engage; fake ones bounce instantly.
6. **Kill fast, scale slow.** Cut losers within days; scale winners gradually.

## The bottom line

Should you buy website traffic? **Buy attention from real audiences — yes, when
you're ready. Buy visitor counts from bulk sellers — never.** The phrase sounds
like one market, but it's two: honest paid marketing and a numbers game that
only the seller wins. Spend your budget where humans with a reason to care will
actually see your brand, measure what happens, and let the data — not the
visitor counter — decide where the next dollar goes.

Related reading: [How to Get Traffic to Your Website](/blog/how-to-get-traffic-to-your-website) for the full free+paid playbook, and [Cheap Ways to Advertise a Small Business](/blog/cheap-ways-to-advertise-a-small-business) for budget-friendly paid options.

## Questions to ask any traffic vendor (before you pay)

Whether it's an ad platform, a sponsorship, or a placement marketplace, run
every paid traffic option through these questions:

1. **Who exactly will see my brand?** Vague answers ("targeted visitors,"
   "real human traffic") are red flags. You want specifics: newsletter
   subscribers in X niche, visitors browsing Y category, searchers typing Z.
2. **Why would they care?** What's the context of the encounter — are they
   browsing for solutions, reading trusted recommendations, or just existing
   near an ad?
3. **How is it measured?** Can you track with your own UTM parameters and
   analytics, or do you have to trust the vendor's dashboard alone?
4. **What's the smallest test?** Legitimate vendors let you start small. Anyone
   pushing a large minimum upfront is selling you risk, not traffic.
5. **Can I see examples?** Real placements, real advertisers, real creative —
   not just testimonials about visitor counts.
6. **What happens after the click?** Do visitors land on your page in a normal
   browser session (good), or through pop-unders, redirects, and forced tabs
   (walk away)?

A vendor who answers all six clearly is selling attention. One who dodges them
is selling numbers. The entire paid-traffic decision reduces to that
distinction.
`,QT=`---
title: "Small Business Advertising Ideas: 30 Tactics Under $50"
description: "30 small business advertising ideas under $50 — micro-sponsorships, guerrilla tactics, partnerships, and paid tests, each with cost notes., updated for 2026."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Small Business Marketing"
keywords:
  - small business advertising ideas
  - affordable advertising ideas
  - marketing ideas small business budget
  - cheap ad ideas
pillar: false
related:
  - cheap-ways-to-advertise-a-small-business
  - how-to-advertise-your-small-business-online-for-free
  - how-much-does-it-cost-to-advertise-a-small-business
---

> **Key takeaways:**
> - 30 concrete advertising ideas, every one testable for under $50 — organized by free, micro-paid, local, and partnership tactics.
> - The pattern behind the winners: underpriced attention from specific audiences, not cheap impressions from no one.
> - Pick 3 ideas matched to your customer type; run each as a tracked 2–4 week test.
> - Commercial-intent tactics (sponsorships, placements, retargeting) deserve your first dollars; awareness tactics earn their keep over time.
> - Track one conversion per idea — ideas without tracking are hobbies, not advertising.

## How to use this list

Don't try all 30. Read through, star the 3–5 that fit your customers and your
strengths, and run each as a small tracked test: one conversion goal, one
dedicated link or landing page, 2–4 weeks. Keep winners, kill losers, repeat.
The tactics are grouped so you can pick a balanced mix.

## Free ideas (1–10)

**1. Google Business Profile, fully completed.** Photos, posts, review
responses, services listed. The highest-ROI free listing for local businesses.

**2. Niche directory listings.** Industry directories your buyers actually
browse — an hour each, permanent trickle traffic.

**3. Review drive.** Ask 20 happy customers for reviews this month, with the
direct link. Reviews are free ads that show up at decision time.

**4. Community answers.** One genuinely excellent answer per week in the
Reddit/forum/Facebook group where your buyers ask questions.

**5. Partner newsletter swap.** One mention traded with a non-competing peer
serving your audience.

**6. Customer spotlight content.** Feature a customer's result (with
permission) — they'll share it, and their network is your lookalike audience.

**7. "How we did it" teardown.** Publish one honest behind-the-scenes post
about a real project. Process content earns trust and links.

**8. Free tool or template.** A calculator, checklist, or spreadsheet for your
niche — tools get bookmarked and linked in ways articles don't.

**9. Local press pitch.** One sharp, local-angle pitch to a community
publication or blogger. Local press is starved for good stories.

**10. Referral ask system.** A simple, timed ask after every successful outcome
— link ready, suggested wording included.

## Micro-paid ideas: $1–$25 (11–20)

**11. Micro-newsletter sponsorship.** Find a small newsletter your buyers read;
many charge $10–$25 for a mention. Email the owner directly if there's no rate
card.

**12. Niche podcast mention.** Small shows often trade a host-read mention for
$15–$25 or even a free product. Their audiences trust them deeply.

**13. Homepage visibility spot.** Marketplaces where brands bid for prominent
placement put you in front of real browsing visitors for very little —
FlexSpot's leaderboard spots start from $1, and the public ranking means your
placement is verifiable, not a black box.

**14. Community sponsorship.** Sponsor a Discord server, forum, or meetup in
your niche — often $10–$20 for a pinned mention or sidebar logo for a month.

**15. Flyers in complementary local businesses.** $15 of printing, placed with
permission in the café/gym/salon your customers already visit. Offer to return
the favor.

**16. Branded freebie with a QR code.** Stickers, bookmarks, or sample cards
($20 for a batch) handed out or slipped into orders — each one is a tiny
billboard with a trackable link.

**17. Boost your best organic post.** $10–$20 behind the post that already
performed — you're amplifying proven creative, not gambling on new creative.

**18. Retargeting starter.** If you have any site traffic, $25 of retargeting
ads to past visitors is the cheapest conversion in paid advertising.

**19. Local event micro-sponsorship.** A raffle prize or $20 toward a community
event gets your name announced to the whole room, with goodwill attached.

**20. Contest or giveaway with a partner.** Pool a small prize with a peer
business; both promote to both audiences. Entry via email builds your list.

## $25–$50 ideas (21–26)

**21. Targeted social ad test.** One platform, one audience, one creative,
$5/day for a week. You're buying data on what converts.

**22. Search ad test on buying-intent keywords.** Bid only on phrases close to
a purchase ("hire X", "X near me", "X pricing") — never research queries.

**23. Sponsored content in a niche publication.** Some mid-size blogs and
newsletters sell honest sponsored posts for $30–$50. Negotiate; many will deal.

**24. Direct mail to 50 dream clients.** A sharp, personal letter (not a
flyer) to 50 ideal prospects costs under $50 in printing and postage — and
almost nobody does it anymore, which is exactly why it gets opened.

**25. Sampling or free trial push.** The product *is* the ad: free samples,
trial periods, or "first session free" offers promoted to a targeted audience.

**26. Video ad test.** One simple phone-shot video as a social ad ($30–$50
spend). Video creative often outperforms static at small budgets.

## Partnership & guerrilla ideas (27–30)

**27. Co-hosted webinar or live session.** You bring the audience half, a peer
brings theirs; both get leads, neither pays.

**28. Bundle with a complement.** Pair your offer with a non-competitor's
("dinner + flowers" style) and promote jointly. Bundles raise perceived value
without discounting.

**29. Sidewalk creativity.** An A-frame sign, window art, or chalkboard with
genuine wit gets photographed and shared — one-time cost, ongoing social
reach.

**30. Challenge or stunt with a hashtag.** A 7-day challenge, a public bet, a
playful competition in your niche — engineered to be participated in and
shared, not just viewed.

## Matching ideas to your business

- **Local services:** 1, 3, 9, 15, 16, 19, 24, 29. Your customers are nearby —
  be physically and locally visible.
- **Online products:** 2, 4, 7, 8, 11, 12, 13, 17, 21. Your buyers live in
  niches — meet them there.
- **B2B services:** 2, 5, 9, 22, 24, 27. Trust and precision beat volume.
- **Creators/personal brands:** 4, 6, 7, 20, 30. Personality is the product —
  show it.

## Running your tests properly

For each idea you try: define **one** conversion (not "awareness"), use a
dedicated tracking link, set a time box (2–4 weeks), and decide the kill/scale
rule in advance ("if it sends 10+ qualified prospects, double it; otherwise
drop it"). Ideas without tracking feel productive and teach nothing.

And remember the compounding layer from our pillar guide: whichever ideas win,
bolt on email capture and referrals so one-time attention becomes a durable
audience. Cheap advertising that doesn't build an asset has to be re-bought
forever.

Related: [Cheap Ways to Advertise a Small Business](/blog/cheap-ways-to-advertise-a-small-business) for the strategy,
[How Much It Really Costs](/blog/how-much-does-it-cost-to-advertise-a-small-business) for the numbers.

## Tracking your $50 tests (so they actually teach you)

Cheap ideas only compound if you learn from them. For each idea you test,
spend five minutes on setup:

- **One conversion goal.** Not "awareness" — a signup, a booking, a purchase,
  a call. If you can't name it, you can't measure it.
- **One tracking link.** UTM parameters (free) on every link, or a dedicated
  landing page per idea. This separates "the newsletter sent 40 visitors" from
  "social sent 400" in your analytics.
- **One time box.** 2–4 weeks, decided in advance. Open-ended tests drift
  forever.
- **One kill/scale rule.** Written before you start: "10+ qualified prospects
  → double the spend; fewer → drop it." Decide with data, not hope.

Keep a one-page log: idea, cost, dates, visitors, conversions, verdict. After
ten ideas you'll have a personal playbook no competitor can copy — because
it's built from *your* numbers, not generic advice. The businesses that win at
cheap advertising aren't the ones with the best ideas; they're the ones with
the best notes.
`,XT=`---
title: "No Bank Account? Fund Ad Campaigns With Stablecoins Instead"
description: "Millions earn in crypto but cannot use banks for ads. Here is how stablecoins like USDT fund real campaigns, and exactly where just $1 is enough to start."
date: 2026-09-23
author: "FlexSpot Team"
category: "Small Business Marketing"
keywords:
  - advertise without bank account
  - stablecoin advertising
  - USDT marketing budget
  - crypto native advertising
  - fund ads with crypto
pillar: false
related:
  - can-you-pay-for-advertising-with-usdt
  - crypto-ad-networks-minimum-budgets-compared
  - getting-started-with-flexspot
sample: false
---

> **Key takeaways:**
> - Plenty of skilled freelancers, creators, and founders earn in crypto but can't easily use banks or cards — stablecoins close that gap for ad spend.
> - USDT on low-fee chains (TRC-20, BEP-20, Solana) moves fast and cheap, making even tiny ad budgets practical.
> - Crypto-native ad options exist at every budget level, but most assume you have hundreds to spend — the $1 tier is rare.
> - On FlexSpot, a crypto-native brand can go from wallet to a live public leaderboard spot with a single $1 USDT bid — no bank, no card, no paperwork.

## The advertiser the ad industry forgot

Picture a freelance designer in a country with strict capital controls. She gets paid in USDT by international clients — it's fast, it's stable, it works. Then she wants to promote her portfolio. Every mainstream ad platform asks for the same thing: a credit card or a bank account she either doesn't have or can't freely use for this.

She's not an edge case. Across freelancing platforms, creator economies, and crypto-native startups, there's a large population of people who *earn* in stablecoins and are functionally locked out of *spending* them on advertising through normal channels. The money exists. The on-ramp to ad platforms doesn't.

Stablecoins fix the second half of that equation — if you pick platforms built to receive them.

## Why stablecoins (and not just "crypto")

"Pay with crypto" could mean Bitcoin, but for ad budgets, stablecoins are the sane choice:

- **Your budget doesn't move.** A 0.5 SOL ad budget is a different dollar amount every hour. USDT is pegged to the dollar, so the $25 you set aside for ads is $25 when you spend it.
- **Fees are negligible on the right chain.** Moving USDT on Tron (TRC-20) or Solana typically costs well under a dollar. That matters enormously when your total budget is $10 — a $5 wire fee would eat half of it.
- **Settlement is fast.** Wallet-to-platform transfers confirm in minutes, not the days of international wires.
- **It's already your money.** If clients pay you in USDT, there's no conversion step, no exchange spread, no waiting for a bank transfer to clear. The distance from "earnings" to "ad spend" is one transaction.

## The practical playbook

If you're funding ads from a crypto wallet, here's how to do it without costly mistakes:

1. **Keep a dedicated "marketing" slice in USDT.** Don't budget in volatile coins. When a client pays you in something else, convert the marketing slice to USDT immediately so the amount is fixed.
2. **Learn the chain your platform wants.** This is where people lose money: USDT on Tron sent to an Ethereum deposit address can be unrecoverable. Before every payment, confirm the exact network — TRC-20, BEP-20, ERC-20, Solana — and send a tiny test amount first if the platform allows it.
3. **Favor low-minimum platforms.** Your advantage as a crypto-native advertiser is agility — small, fast tests. Platforms with high minimum deposits erase that advantage. Start where $5–$20 is a meaningful test, not a rounding error.
4. **Track spend in dollars, not coins.** It's easy to lose budget discipline when spending from a wallet. Decide the dollar amount first, then send that amount in USDT.
5. **Remember there's no chargeback.** Crypto payments are final. Only fund platforms you'd trust with cash — and prove that trust with the smallest possible first payment.

## End to end: a $1 bid on FlexSpot

Here's what the smallest possible version of this looks like, concretely. Say you're a crypto-native brand — a small trading community, a freelance dev shop, a new token project — with USDT in your wallet and no desire to touch a bank:

1. **Claim a spot.** On [FlexSpot](/blog/getting-started-with-flexspot), you claim a public position on the homepage leaderboard. Entry starts at $1.
2. **Pay $1 in USDT.** Choose your rail — TRC-20, BEP-20, or Solana — and send $1 to the deposit address. On Tron, the network fee is a fraction of a cent; the whole thing confirms in a minute or two.
3. **You're live.** Your brand is on the board: name, logo, link, visible to everyone who visits. No campaign setup, no keyword research, no approval queue.
4. **Boost to climb.** Every additional USDT bid moves you up the public ranking. Supporters can boost you too — personal referral links let your community add to your total, turning your audience into your ad budget.
5. **Watch the race.** The leaderboard is public and competitive, which means people visit to follow it. Your $1 didn't buy invisible impressions; it bought a position in something with spectators.

Is $1 going to transform your business? Of course not. But it answers the only question that matters before you spend more: *does this channel work for me?* — for the price of a rounding error, with money you already had, through rails you already use.

## What this unlocks beyond one platform

The bigger point isn't FlexSpot specifically. It's that a stablecoin wallet is now a complete advertising stack for a small operator: earnings in, USDT budget set aside, low-minimum platforms for testing, and no bank in the loop at any step. The freelancers and creators who figure this out first get something their banked competitors don't — the ability to test five channels for $25 total and double down on whatever actually moves.

For a broader look at what small budgets can do across both crypto and traditional options, see our comparison of [crypto ad network minimums](/blog/crypto-ad-networks-minimum-budgets-compared) and [real small-business ad costs](/blog/how-much-does-it-cost-to-advertise-a-small-business).

## Frequently asked questions

**Can I really run ads with no bank account at all?**
On crypto-native platforms that accept USDT directly, yes — wallet to platform, no bank involved. Mainstream platforms (Google, Meta) still require cards or bank-linked payment, though some advertisers bridge the gap with crypto-funded virtual cards.

**What's the cheapest chain for USDT ad payments?**
TRC-20 (Tron) and Solana typically have the lowest fees — usually well under a dollar per transfer. Always use the specific chain the platform asks for, regardless of fees.

**Is it safe to keep an advertising budget in USDT?**
USDT is a centralized stablecoin with its own counterparty considerations, but for short-term budgeting (money in, ads out within days or weeks) it's practical. Don't treat a hot wallet like a savings account.

**What if I only have $5 total?**
Then start where $5 matters. A $1 leaderboard bid leaves you $4 for four more tests or boosts. On high-minimum networks, $5 doesn't clear the door — choose the door it clears.
`,JT=`---
title: "Viral Marketing Strategies: 15 Tactics With Real Examples"
description: "15 viral marketing strategies small brands can actually run: referral loops, challenges, leaderboards, UGC contests, and more — with honest cost notes."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Viral Marketing"
keywords:
  - viral marketing strategies
  - viral marketing tactics
  - how to make content go viral
  - viral campaign ideas
pillar: false
related:
  - how-to-make-your-brand-go-viral
  - word-of-mouth-marketing
  - guerrilla-marketing-ideas
sample: false
---

> **Key takeaways:**
> - The best viral marketing strategies share a structure: a hook, a participation step, and visible results that recruit the next wave.
> - Tactics range from free (reply-guy strategy, newsjacking) to paid (creator seeding, prize pools) — match the tactic to your budget and audience.
> - Participation beats broadcast: challenges, leaderboards, and referral loops spread themselves.
> - Every tactic needs a capture point, or the attention evaporates.

## How to use this list

These fifteen viral marketing strategies are ordered roughly from lowest cost and effort to highest. Each includes what it is, why it spreads, what it realistically costs a small brand, and the catch to watch for. Pick one, run it well, measure it — then try the next.

## 1. The reply-guy strategy

**What:** Become the funniest, smartest, or most useful reply on big accounts' posts in your niche.
**Why it spreads:** You borrow someone else's distribution; great replies get thousands of likes and profile visits.
**Cost:** Free, plus 30 minutes a day.
**Catch:** It builds your personal/brand voice slowly. Keep replies genuinely good — spammy self-promo gets blocked.

## 2. Newsjacking

**What:** Publish your take on a trending story within hours, connecting it to your niche.
**Why it spreads:** You ride a wave of existing search and social interest.
**Cost:** Free.
**Catch:** Speed matters more than polish, and forced connections backfire. If the link to your brand isn't natural, skip it.

## 3. The useful carousel / thread

**What:** A genuinely practical breakdown — a checklist, a price comparison, a step-by-step — formatted for saves and shares.
**Why it spreads:** Utility is the most reliable sharing motive; saves signal quality to algorithms.
**Cost:** Free, plus a few hours of writing.
**Catch:** It must be better than what's already out there. "10 tips" nobody asked for won't move.

## 4. The public challenge

**What:** A 7-day, 30-day, or single-weekend challenge your audience can join and post about (fitness, building, saving, creating).
**Why it spreads:** Participation is visible; every entrant's post recruits more entrants.
**Cost:** Free to run; a small prize helps.
**Catch:** You need a simple hashtag or hub where entries gather, or the energy disperses.

## 5. Referral loops with personal links

**What:** Every supporter gets their own shareable link; visits or signups through it earn them credit, status, or rewards.
**Why it spreads:** Each participant becomes a distribution node with a personal incentive to promote.
**Cost:** Low — the infrastructure is the main work; rewards can be status-based rather than cash.
**Catch:** The reward must be worth the social capital of sharing. One credit per visitor per day (anti-gaming) keeps it honest.

## 6. The leaderboard / public ranking

**What:** A visible, ranked competition — brands, creators, or fans competing for the top spot.
**Why it spreads:** Competition is inherently watchable and shareable; leaders promote to stay ahead, challengers promote to catch up.
**Cost:** Low to medium — you need the board itself and someone to run it.
**Catch:** Rankings must feel fair and live. A stale or rigged-feeling board kills trust instantly.

## 7. UGC contests

**What:** Ask customers to create something — a video, a photo, a review, a meme — for a prize or feature.
**Why it spreads:** Entrants share their own entries with their networks; you get content and distribution in one.
**Cost:** The prize (can be product, not cash) plus promotion.
**Catch:** Entry must take under five minutes. Complicated rules kill participation.

## 8. Meme-jacking your own brand

**What:** Turn your brand into meme material — a funny mascot, a reaction image, a catchphrase — and let the internet remix it.
**Why it spreads:** Memes are the native language of group chats; remixability is the whole point.
**Cost:** Free, plus willingness to look silly.
**Catch:** You can't control where it goes. Brands that clutch their pearls shouldn't try this.

## 9. The stunt

**What:** A real-world spectacle — a pop-up, a flash mob, an absurd delivery, a giant installation — designed to be filmed.
**Why it spreads:** Spectacle earns coverage from people who'd never share an ad.
**Cost:** Medium to high, but creativity beats budget.
**Catch:** The stunt must be filmable in 15 seconds and understandable without context.

## 10. Creator seeding (micro, not mega)

**What:** Send product or access to 20–50 small creators (1k–50k followers) with no script — just "try it, post if you like it."
**Why it spreads:** Authentic posts from trusted small voices convert better than one polished mega-post.
**Cost:** Product cost × 50, plus outreach time.
**Catch:** Don't script them. Scripted "authentic" content reads as an ad and dies.

## 11. The race / live event

**What:** A real-time competition with a start, a finish, and a visible winner — a launch race, a build-off, a sales sprint.
**Why it spreads:** "Happening now" creates urgency; spectators share the drama.
**Cost:** Low to medium.
**Catch:** Needs a real audience at kickoff or the room feels empty. Seed the first wave personally.

## 12. Controversial-but-true takes

**What:** A genuinely held opinion that challenges your industry's conventional wisdom, argued well.
**Why it spreads:** Disagreement drives comments, and comments drive reach.
**Cost:** Free, plus courage.
**Catch:** It must be true and defensible. Manufactured outrage destroys trust; honest contrarianism builds it.

## 13. The free tool / calculator / template

**What:** A genuinely useful free resource — a calculator, a template, a mini-tool — with your branding on it.
**Why it spreads:** People share useful things to look helpful; the tool markets itself for years.
**Cost:** Medium (build time), near-zero marginal cost after.
**Catch:** It has to actually work and be better than a spreadsheet. Half-built tools embarrass you.

## 14. Partnership / collab drops

**What:** Team up with a complementary brand for a joint product, event, or content series.
**Why it spreads:** You each get the other's audience; the novelty of the pairing is the hook.
**Cost:** Low — the main cost is coordination.
**Catch:** Audiences must genuinely overlap. Random pairings confuse everyone.

## 15. The documentary / build-in-public arc

**What:** Document the journey — the launch, the numbers, the mistakes — as an ongoing story.
**Why it spreads:** People follow stories, not brands. Each episode recruits viewers for the next.
**Cost:** Free, plus consistency.
**Catch:** It's slow. This compounds over months, not days — but it's the most durable tactic on this list.

## Choosing your first tactic

Match the tactic to your situation: no audience yet? Start with reply-guy, newsjacking, and useful threads — they borrow distribution. Have a small loyal base? Challenges, referral loops, and leaderboards multiply it. Have some budget? Creator seeding and a free tool buy durable assets. Whatever you pick, define the capture point before you launch — the follow, the signup, the claimed spot — so the spike becomes an audience.

## A final honesty check before you launch

Run every tactic through three questions before committing time or money. First: **why would someone share this?** If the answer is "because we asked them to," rework it until the motive is status, identity, usefulness, emotion, or belonging. Second: **what happens at the peak?** Name the exact page, button, and action a visitor takes when attention is highest — if you can't, the spike will evaporate. Third: **can we run it again?** One-off stunts are fine, but the brands that grow through virality treat it as a repeatable loop: launch, measure the amplification ratio, keep what compounded, and run it again next month. That's the difference between a viral moment and a viral marketing strategy.
`,ZT=`---
title: "15 Ways to Get Your Business Noticed Online"
description: "How to get your business noticed online: 15 practical tactics — quick wins and compounding plays — that put small brands in front of buyers. this week."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Visibility Guides"
keywords:
  - how to get your business noticed
  - get business noticed online
  - make business stand out online
  - small business get noticed
pillar: false
related:
  - how-to-increase-brand-visibility
  - brand-awareness-strategies
  - cheap-ways-to-advertise-a-small-business
---

> **Key takeaways:**
> - Getting noticed is about showing up where buyers already look — with something worth stopping for.
> - The 15 tactics below mix quick wins (days) with compounding plays (months); do both.
> - Distinctiveness beats volume: one memorable presence outperforms ten generic ones.
> - Every tactic includes who it's for, so you can pick your five and ignore the rest.
> - Noticed is step one — pair every tactic with a way to capture the attention (email, follow, retargeting).

## The mindset: be findable, then be memorable

Getting noticed online has two halves. First, **show up where your buyers
already pay attention** — search results, feeds, inboxes, communities. Second,
**give them a reason to stop** — a sharp message, a distinctive look, genuine
usefulness. Most businesses do one half and wonder why the other doesn't
happen. These 15 tactics cover both.

## Quick wins (results in days to weeks)

**1. Complete your Google Business Profile.** Photos, posts, services, review
responses — the works. For local businesses, this is the fastest legitimate
visibility win online. *For: local businesses.*

**2. Run a review drive.** Message 20 happy customers with the direct review
link this week. Reviews surface in search and Maps, and each one is a tiny ad
written by someone buyers trust. *For: everyone.*

**3. Fix your social bios.** One-line offer, working link, consistent visuals,
pinned post showcasing your best proof. Most profiles are vague; a sharp one
stands out instantly. *For: everyone.*

**4. Answer 5 high-traffic questions.** Find where your buyers ask questions
(Reddit, Facebook groups, Quora, niche forums) and write genuinely excellent
answers to five of them. Good answers get upvoted and keep sending visitors.
*For: expertise businesses.*

**5. Pitch 3 micro-sponsorships.** Small newsletters, podcasts, or communities
in your niche often sell mentions for $10–$50 — or trade for product. One
email each; start this week. *For: online businesses with a defined niche.*

**6. Claim a featured visibility spot.** Placement marketplaces put your brand
where real visitors browse — FlexSpot's homepage leaderboard spots start from
$1, with public rankings, so a few dollars buys genuine, verifiable attention
rather than ad-network impressions. *For: any brand that benefits from being
seen.*

**7. Post one strong opinion.** A sharp, honest take on your industry's
conventional wisdom — posted natively on your main platform. Opinions get
shared; announcements get scrolled past. *For: founders and personal brands.*

## Compounding plays (results in months)

**8. Publish one useful piece weekly.** Answer a specific buyer question each
week. Not viral attempts — a library of genuinely helpful content that search
engines and humans both reward over time. *For: patient builders.*

**9. Build the email list.** One good lead magnet, one capture form, one
regular newsletter. Email is attention you own — every subscriber is someone
you can "get noticed by" on demand. *For: everyone.*

**10. Become a community fixture.** Pick 2–3 communities and show up helpfully
for months. Familiarity turns into recognition, recognition into referrals.
*For: niche and B2B businesses.*

**11. Start a review-and-referral system.** Not a one-time drive — a process:
every happy outcome triggers a review ask; every customer gets an easy way to
refer. This is how "noticed" becomes "recommended." *For: service businesses.*

**12. Create one link-worthy asset.** A free tool, calculator, template, or
original data study for your niche. Assets earn backlinks and shares that
articles never do — and backlinks are long-term visibility. *For: online
businesses.*

## Differentiation plays (be memorable, not just visible)

**13. Develop a visual signature.** One consistent look — colors, style, motif
— across every touchpoint. People can't notice what they can't recognize.
Audit: cover your logo; is it still you? *For: everyone.*

**14. Name your method.** Turn your process into a named framework ("The
___ Method"). Named things get repeated, quoted, and searched — generic advice
doesn't. *For: services, coaches, agencies.*

**15. Do one remarkable thing per quarter.** A public challenge, a generous
free resource, an exceptional customer story, a bold guarantee. Remarkable
gets talked about; competent gets ignored. *For: brands ready to be bold.*

## Picking your five

Don't do all 15. Score each tactic on two axes: **fit** (do my buyers hang out
there?) and **sustainability** (can I do this monthly for a year?). Pick the
five with the best combined score — ideally 2–3 quick wins and 2–3 compounding
plays. Run them 90 days, then review with real data.

## The capture rule

Every "get noticed" tactic leaks value unless you capture the attention:

- Quick-win traffic → email capture or retargeting pixel.
- Social spikes → follow + link in bio to the list.
- Press or community mentions → a landing page that converts the curious.

Attention you don't capture has to be re-earned. Attention you capture
compounds — and that's how "noticed once" becomes "known."

For the full strategy behind these tactics: [How to Increase Brand Visibility](/blog/how-to-increase-brand-visibility),
and for making the attention stick: [Brand Awareness Strategies](/blog/brand-awareness-strategies).

## Noticed in your niche: advanced plays

Once the basics are running, these deeper plays separate the noticed from the
unavoidable:

**Own a search corner.** Pick 10–20 specific questions your buyers ask and
make your pages the definitive answers. You won't outrank giants on broad
terms, but you can own the long-tail questions in your niche — and those
searchers convert best.

**Become the data source.** Publish one original finding per quarter — a
survey of your customers, an analysis of your own operations, a price
benchmark for your industry. Original data earns press, backlinks, and
citations that keep you visible for years. Nobody links to "10 tips"; everybody
links to numbers.

**Build in public.** Document the journey — revenue milestones, product
decisions, mistakes and fixes. Build-in-public content earns a loyal following
because people root for progress they watched happen. It turns customers into
an audience and an audience into amplifiers.

**Create a signature format.** A weekly teardown, a monthly ranking, a
recurring challenge — formats people anticipate. Anticipation is attention on
a schedule, and it's far more valuable than one-off virality.

**Engineer serendipity.** Show up where your buyers don't expect a brand:
sponsor the community event, answer the obscure forum thread, send the
handwritten note. Unexpected encounters are disproportionately memorable —
and memorability is what turns "noticed" into "known."

## Getting noticed without being annoying

There's a line between visible and spammy, and crossing it undoes the work.
The difference is **value symmetry** — every encounter should give the other
person something, not just take their attention:

- A community answer that genuinely helps: welcome. The same answer with a
  forced pitch: spam.
- A newsletter sponsorship in a publication the audience loves: welcome. A
  pop-up that hijacks their screen: spam.
- A remarkable stunt people choose to share: welcome. Automated DMs to
  strangers: spam.

The test is simple: **would the audience thank you for showing up?** If yes,
you're getting noticed. If they'd block you, you're just being loud. The most
noticed brands online aren't the loudest — they're the most generously useful
in the places their buyers already pay attention.

## The 30-day "get noticed" challenge

Pick any five tactics from the list above and run them as a 30-day challenge:
one review drive, one community habit, one content piece per week, one
micro-sponsorship or placement, one partnership pitch. Log what each one
sends. At day 30, keep the two winners and drop the rest — then repeat with
two new tactics. Three cycles of this and you'll have a proven, personal
visibility system built from your own data, not generic advice.
`,eC=`---
title: "Website Sponsorship for Small Brands: A Beginner's Guide"
description: "Website sponsorship for small brands: how to find sites to sponsor, what to pay, how to pitch owners, and how to turn a small sponsorship into real visibility."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Bidding Strategy"
keywords:
  - website sponsorship small business
  - sponsor a website
  - small brand sponsorship
  - website sponsor guide
pillar: false
related:
  - homepage-sponsorships
  - featured-placement-advertising
  - what-is-bid-for-attention-marketing
sample: false
---

> **Key takeaways:**
> - Website sponsorship lets small brands buy visible, trusted placement on sites their buyers already visit — often for far less than ad platforms cost.
> - Start with niche sites and newsletters in your market; their audiences are smaller but far better matched.
> - Pitch site owners directly with a short, professional proposal — most sponsorship inventory is never publicly listed.
> - Test with a small commitment, track everything, and scale only what proves itself.

## Why sponsorship makes sense for small brands

Big brands buy sponsorships for prestige. Small brands should buy them for something more practical: **efficient access to a pre-built, trusting audience.** A niche blog, a local news site, an industry newsletter, a community forum — these sites have something ad platforms can't sell you: an audience that trusts the site and pays attention to what's on it. Your brand appears with that trust attached.

The economics favor the small buyer. While big advertisers fight over major media kits, thousands of quality niche sites sell sponsorships cheaply — or haven't thought to sell them at all, which means a direct pitch can unlock placement at a fraction of its value.

## Where to find sponsorship opportunities

- **Niche blogs and publications in your market.** The closer the topic match, the better the conversion. A running-shoe brand on a marathon training blog beats the same brand on a general news site.
- **Newsletters.** Some of the best sponsorship value online right now: engaged readers, clear demographics, and inventory that's often underpriced relative to attention.
- **Local and community sites.** Neighborhood blogs, city guides, event calendars — cheap, trusted, and geographically perfect for local businesses.
- **Forums and communities.** Sponsored presence in active communities (done respectfully, with the moderators' blessing) reaches buyers mid-conversation.
- **Bid-for-attention marketplaces.** Platforms like FlexSpot where homepage visibility spots are claimed through open bidding — no pitch required, entry from $1, and the competitive leaderboard format draws its own audience.
- **Podcasts and YouTube channels.** Technically not websites, but the same logic: trusted host, engaged audience, underpriced relative to reach at small and mid sizes.

## How to pitch a site owner (template)

Most sponsorship inventory is never listed — you have to ask. Keep the pitch short and professional:

> Subject: Sponsorship inquiry — [your brand]
>
> Hi [name],
>
> I run [brand], [one-line description]. Your [site/newsletter] reaches exactly the audience we serve, and I'd like to explore a sponsorship — a [homepage feature / newsletter mention / sidebar placement] for [timeframe].
>
> A few details: [what you do, who your customers are, link]. Our budget for a trial is around [range] — happy to discuss what that could include on your end.
>
> Would you be open to a quick chat this week?
>
> [Your name]

Tips: personalize the first line (mention something specific about their site), name a budget range (it saves everyone time), propose a trial (lowers their risk of saying yes), and follow up once after a week. Site owners get vague "let's partner" emails constantly; specificity is what gets replies.

## What to pay: the beginner's framework

- **Start from their numbers.** Ask for traffic, subscriber counts, and engagement data. Price per thousand engaged readers, not raw pageviews.
- **Benchmark against alternatives.** What would reaching the same audience cost via ads? A sponsorship should beat that on a per-attention basis, or offer something ads can't (trust, persistence, exclusivity).
- **Propose a trial.** One month, or even two weeks, at a fair test price. Frame it as the start of a longer relationship if it works — owners prefer recurring sponsors to one-off buyers.
- **Typical small-brand ranges:** niche newsletters and blogs often price mentions from tens to low hundreds; local sites similarly; established niche publications from hundreds monthly. Bid-based marketplaces let the market decide, sometimes from $1.
- **Negotiate extras, not just price.** Creative refresh rights, a bonus social post, a longer run for the same fee — owners often concede extras more easily than discounts.

## Making the sponsorship perform

- **Match the creative to the site.** The closer your sponsorship feels like a natural part of the page, the better it performs. Adapt your visual language; don't just paste your banner everywhere.
- **One message, one action.** Sponsorship visitors are browsing, not searching. Give them one clear reason to click and one clear next step.
- **Use a dedicated landing page.** Greet visitors in the site's context ("Welcome, [newsletter] readers") and make the offer obvious. Generic homepages waste sponsored traffic.
- **Track separately.** UTM parameters, unique promo codes, a dedicated page — attribute cleanly or you'll never know what worked.
- **Refresh the creative.** Even the best placement goes invisible to regulars. Swap the message or visual mid-campaign.

## The sponsorship relationship: think long-term

The real value of website sponsorship compounds over time: the audience learns your name, the site owner becomes an advocate, the placement gets cheaper per unit of attention as familiarity builds. Treat site owners as partners, not vendors — pay on time, share your results, give testimonials, renew when it works. The small brands that win at sponsorships aren't the ones with the biggest budgets; they're the ones that find three to five right-fit sites and become fixtures there. Start with one trial this month, measure honestly, and build from what proves itself.

## Mistakes first-time sponsors make

- **Sponsoring for prestige instead of fit.** A big-name site impresses your friends; a niche site converts your buyers. Buyers pay the bills.
- **No tracking.** Running a sponsorship without UTM parameters or a dedicated landing page means you'll never know if it worked — and you'll either waste money renewing a dud or kill a winner.
- **Set-and-forget creative.** The same banner for six months becomes wallpaper. Calendar a creative refresh every 4–6 weeks.
- **Judging too early.** One week of data is noise. Give it a full placement period, and remember that sponsorship value compounds with repetition.
- **Treating the site owner as a vendor.** The owners who like you give you better placement, bonus mentions, and first refusal on prime inventory. Relationships are inventory.
- **Ignoring the SEO angle.** Ask whether links are followed or nofollowed, and factor it into what the placement is worth to you. A followed link from a respected niche site has standalone value beyond the traffic.

## Scaling what works: from one site to a portfolio

Once your first sponsorship proves itself, resist the urge to simply spend more on the same site — diminishing returns set in as the audience saturates. Instead, build a portfolio: replicate the winning formula (same creative approach, same landing page structure, same measurement) across three to five similar sites. Each new site diversifies your risk and compounds the familiarity effect — prospects who see you on two trusted sites assume you're everywhere. Review the portfolio quarterly: cut the weakest performer, test one new site, and renegotiate the winners into longer terms. A portfolio of small, well-chosen sponsorships routinely outperforms one big splashy buy, and it's far more resilient when any single site's traffic dips.
`,tC=`---
title: "Website Traffic Sources Ranked: Where Visitors Actually Come From"
description: "Website traffic sources ranked by quality, cost, and speed — search, social, referral, paid, and direct — so you can invest where visitors actually come from."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Visibility Guides"
keywords:
  - website traffic sources
  - sources of website traffic
  - types of web traffic
  - where does website traffic come from
pillar: false
related:
  - how-to-get-traffic-to-your-website
  - should-you-buy-website-traffic
  - free-ways-to-get-website-traffic
---

> **Key takeaways:**
> - The five traffic sources are search, social, referral, paid, and direct — each with a distinct speed, cost, and conversion profile.
> - Search wins on intent and compounding; social wins on speed and reach; referrals win on trust; paid wins on control; direct wins on loyalty.
> - Most small sites should rank their own sources by revenue-per-visitor, not visitor count.
> - One dominant source is normal — and risky. The goal is a primary plus a growing secondary.
> - Source quality beats source volume: 100 intent-matched visitors beat 10,000 accidental ones.

## The five sources, honestly ranked

"Ranked" needs a caveat: the best source depends on your business. A local
plumber and a global SaaS have different answers. So this ranking scores each
source on four dimensions — **speed** (how fast it works), **cost** (money and
time), **intent** (how ready visitors are to act), and **compounding** (whether
effort keeps paying off).

### 1. Organic search — the compounder

**Speed:** slow (3–6 months to meaningful volume). **Cost:** time-heavy, money-
light. **Intent:** highest of the free sources. **Compounding:** the best —
good pages keep sending visitors for years.

Search visitors typed a question and chose your page as the answer. That intent
is why search converts so well. The catch is the wait: new pages and new sites
need months to earn trust. But nothing else builds an asset quite like a
library of ranking pages.

Best for: businesses with an information-rich niche, patient timelines, and
questions buyers actually search for.

### 2. Referral — the trust transfer

**Speed:** fast (days to weeks). **Cost:** relationship-heavy. **Intent:**
high — someone they trust sent them. **Compounding:** moderate; good links and
partnerships keep sending trickles.

Referral covers guest posts, press mentions, podcast appearances, directory
listings, partner links, newsletter features, and community links. When a
trusted source recommends you, visitors arrive pre-sold. A single mention in
the right newsletter can outperform a month of social posting.

Best for: everyone, honestly — especially new sites that can't wait for search.
Referral is the bridge fuel between launch and organic momentum.

### 3. Direct & repeat — the loyalty loop

**Speed:** instant (they're yours already). **Cost:** nearly free. **Intent:**
highest of all — these people chose to come back. **Compounding:** extreme,
because each new subscriber raises the floor for everything you launch.

This is email subscribers, bookmarkers, app users, community members — people
who return without a search or a post. It's technically downstream of the other
sources, but it deserves its own slot because it's the source you *own*.
Algorithm changes can't take your list away.

Best for: any business past the "first 100 true fans" stage. If you're not
capturing emails yet, start today.

### 4. Social — the amplifier

**Speed:** fastest organic option (hours). **Cost:** consistency-heavy.
**Intent:** low to medium — people are browsing, not buying. **Compounding:**
poor; posts decay within days.

Social is unmatched for reach-per-hour when something catches, and excellent
for launches, personality-driven brands, and visual products. But the traffic
is fickle, platform-controlled, and converts cold visitors poorly. Treat social
as the top of the funnel and a distribution layer for your real assets —
never the asset itself.

Best for: launches, visual/consumer brands, creators, and anyone who can post
consistently for months.

### 5. Paid — the accelerator

**Speed:** instant. **Cost:** money, obviously — plus the skill to not waste
it. **Intent:** varies wildly by channel (search ads: high; display: low).
**Compounding:** zero — stop paying, stop receiving.

Paid traffic's superpower is control: precise targeting, instant scale,
testable messaging. Its weakness is that it amplifies whatever your site
already is — great pages convert, weak pages burn cash. Within paid, prefer
buying *audience access* (sponsorships, featured placements, well-targeted ads)
over buying raw visitor counts.

Best for: businesses with proven conversion, time-sensitive goals, and budgets
they can afford to test with.

## The ranking, summarized

For a typical small business building long-term:

1. **Organic search** — best risk-adjusted return over 12+ months.
2. **Referral** — best trust-per-effort, fastest legitimate start.
3. **Direct/repeat** — the asset you build from all the others.
4. **Social** — powerful amplifier, weak foundation.
5. **Paid** — best when you need speed or scale and can measure.

For a launch with a deadline, flip it: paid + social + referral first, search
building quietly in the background.

## How to read your own source mix

Open your analytics and look at the last 90 days per source:

- **Which source sends the most visitors?** That's your current primary —
  protect and feed it.
- **Which sends the most conversions per visitor?** That's your most *efficient*
  source — it deserves more investment even if it's smaller.
- **Which is growing?** Trends beat snapshots. A small but fast-growing source
  is your future primary.
- **What percentage is direct?** Growing direct traffic means your brand is
  becoming memorable — the ultimate goal.

A healthy small site typically has one dominant source (40–60%), a secondary
(20–30%), and long tails of the rest. One source at 90%+ is a risk — a single
algorithm change or price hike can halve your business. Diversify deliberately,
one new source at a time.

## Source quality beats source volume — always

100 visitors who searched for exactly what you sell will outperform 10,000
visitors from a viral post about something adjacent. When evaluating any
source, ask: *do these people have the problem I solve?* If yes, small numbers
are fine — they'll compound. If no, big numbers are a distraction.

This is also the lens for paid decisions: a niche newsletter sponsorship that
sends 200 perfect-fit visitors beats a bulk traffic package sending 20,000
bots. Judge sources by buyers, not browsers.

Keep exploring: the pillar [How to Get Traffic to Your Website](/blog/how-to-get-traffic-to-your-website) for the full playbook, or [Should You Buy Website Traffic?](/blog/should-you-buy-website-traffic) before spending on paid visitors.

## Building your source portfolio over 12 months

You don't need all five sources on day one. Here's a realistic sequencing:

**Months 1–3: referral + one more.** Referral (communities, directories,
partnerships) for immediate visitors, plus whichever of search-content or
social fits your strengths for the long game. Set up email capture from day
one so every source feeds the direct/repeat bucket.

**Months 4–6: deepen the winner.** By now the data shows which source pulls
its weight. Pour effort there; keep the other on maintenance. If you have
budget and a converting page, add a small paid test — it also teaches you
which messages work, improving everything else.

**Months 7–12: add the missing piece.** If you're organic-heavy, add paid for
speed and testing. If you're paid-heavy, invest in search content to reduce
dependence on ad spend. The goal by month 12: a primary source (40–60%), a
real secondary (20–30%), and a growing direct/repeat base from your email list.

The portfolio mindset matters because sources fail: algorithms change, ad
costs spike, platforms fade. A business with two working sources survives
shocks that kill a single-source business. Diversification isn't a luxury —
it's the difference between a traffic dip and a traffic disaster.

## A final note on "other" and "unknown" traffic

Your analytics will always show some traffic from sources you can't identify —
messaging apps, dark social (links shared in DMs and private groups), and
privacy-stripped referrals. Don't obsess over attributing every visit. What
matters is the trend per known source and, above all, the conversion trend.
Dark social is real and growing; the practical response is making sharing easy
(copyable links, share buttons, quotable snippets) rather than trying to track
the untrackable.
`,nC=`---
title: "What Is Bid-for-Attention Marketing? (And Why Brands Are Trying It)"
description: "Bid for attention marketing explained: how open bidding for homepage visibility spots works, why brands compete publicly, and when it beats traditional ads."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Bidding Strategy"
keywords:
  - bid for attention marketing
  - bid for attention
  - attention marketplace
  - bidding for visibility
pillar: false
related:
  - homepage-sponsorships
  - featured-placement-advertising
  - banner-ads-vs-sponsored-placements
sample: false
---

> **Key takeaways:**
> - Bid-for-attention marketing lets brands openly bid for visible homepage spots, with public rankings decided by total bids and support.
> - It replaces opaque ad auctions with transparent competition — everyone sees the board, the bids, and the leaders.
> - The competitive format itself attracts an audience: people come to watch the race, which multiplies the value of the placement.
> - It suits small brands best when entry starts low and referral mechanics let supporters boost a brand's position.

## The idea in one paragraph

In traditional online advertising, you bid in a black box: you set a budget, an algorithm decides who sees your ad, and you never really know why you won or lost. **Bid-for-attention marketing flips that inside out.** Brands openly bid for fixed, visible placements — typically spots on a homepage leaderboard — and the ranking is public. Everyone can see who's leading, what it takes to climb, and where their brand stands. The auction isn't hidden inside an ad platform; it *is* the product, and watching it is part of the entertainment.

## How it works, step by step

1. **Claim a spot.** A brand claims a public position on the homepage — a leaderboard entry with their name, logo, and link. Entry can start very low (on some platforms, from $1), which makes the format accessible to businesses that could never afford traditional sponsorships.
2. **Boost your position.** Brands increase their total through bids — each boost moves them up the public ranking. Higher rank means more prominent placement and more eyes.
3. **Rally supporters.** Many bid-for-attention platforms add referral mechanics: supporters get personal links, and visits through those links add to the brand's total. Your audience becomes your bidding team.
4. **Climb publicly.** The leaderboard updates live. Leaders get the spotlight; challengers get the story of the chase. The competition itself draws spectators — and spectators are the audience your placement reaches.
5. **Hold or advance.** Rankings are ongoing, not one-time. Staying visible means staying engaged, which keeps the platform lively and the audience returning.

## Why brands are trying it: the honest appeal

- **Transparency.** You see exactly what you're buying and what it costs to outrank competitors. No algorithmic black box, no mysterious "quality scores."
- **Low entry cost.** When bidding starts at a dollar, trying the format is nearly risk-free. Small brands can test homepage visibility for less than a coffee.
- **The audience is the event.** On a traditional site, your sponsorship reaches whoever happens to visit. On a competitive leaderboard, people visit *because* of the competition — the race is content, and your brand is in it.
- **Earned amplification.** Referral mechanics mean your marketing doesn't stop at your bid — every supporter with a link extends your reach, and the public totals make that support visible and rewarding.
- **It's fun.** This sounds frivolous, but it matters: marketing people enjoy is marketing that gets done consistently. A format with drama, comebacks, and a crown beats another spreadsheet of CPMs.

## Where the model fits — and where it doesn't

Bid-for-attention shines for **discovery and brand visibility**: getting noticed, building familiarity, launching something new, rallying a community. It's a top-of-funnel format — it makes people aware you exist and gives them a reason to care.

It's not a replacement for **intent capture**: when someone searches for exactly what you sell, paid search still wins. It's also not ideal for brands that need precise targeting — a public leaderboard reaches whoever's watching, not a demographic slice. And like any competitive format, it rewards participation: brands that engage (boosting, sharing referral links, rallying supporters) get more from it than brands that claim a spot and disappear.

The smart play is pairing: bid-for-attention for visible presence and community energy, search and retargeting to capture the demand it creates.

## What to look for in a bid-for-attention platform

- **Real, engaged traffic.** The leaderboard needs actual spectators. Look for signs of life: activity, sharing, return visits — not just a pretty board.
- **Fair, transparent rules.** How are totals calculated? What counts? Can the ranking be gamed? Transparent mechanics are the whole point of the model; opaque ones defeat it.
- **Low, honest entry.** The promise is accessibility. Watch for hidden fees, forced upsells, or minimums that contradict the pitch.
- **Referral mechanics that work.** Personal links, fair counting (e.g., one credit per visitor per day to prevent farming), visible supporter recognition.
- **A real destination for your link.** Your spot should drive visitors somewhere useful — your site, your profile, your offer. Check the click-through path before you bid.

## The bigger picture

Bid-for-attention is part of a broader shift: advertising moving from hidden auctions to visible marketplaces, from impressions bought in bulk to attention earned in public. Whether the format becomes a major channel or stays a clever niche, the underlying insight is durable — **transparency and participation beat opacity and interruption**. Brands that learn to compete for attention openly, with creativity and community, will have an edge wherever attention is sold.

## Trying it for the first time: a playbook

Convinced enough to test it? Here's the low-risk way in: claim a spot at the minimum entry and set up your destination link with tracking before you do anything else. Spend your first week observing — watch how the leaderboard moves, what the leaders do differently, when the audience is most active. Then make your first real push: a modest boost paired with sharing your personal referral link to your existing audience, so your supporters add to your total. Note what each action costs and what it returns in profile visits and clicks. After two weeks, you'll know whether the format fits your brand — and you'll have spent less than a single day of typical ad-platform budgets to find out. The platforms reward the engaged, so treat the first fortnight as learning, not as a campaign to win outright.

## Common beginner mistakes

First-timers in bid-for-attention tend to make the same three errors: **bidding without a destination** — driving leaderboard traffic to a generic homepage instead of a page built to convert the curious; **treating it as set-and-forget** — claiming a spot, never boosting or sharing, then concluding "it didn't work" (the format rewards participation, and passive entries sink); and **ignoring the referral lever** — bidding solo while competitors rally supporters through personal links, effectively bringing a knife to a team fight. Avoid those three and you're already ahead of most newcomers: link to a sharp landing page, stay active through the ranking period, and give your supporters their links on day one.

FlexSpot is the clearest live example of the model: a public homepage leaderboard where brands claim spots from $1, boost their way up the rankings, and rally supporters through personal referral links that add to their total. If the concept clicks for you, there's no cheaper way to try it than claiming a spot and entering the race.
`,sC=`---
title: "Where Can I Advertise My Business for Free? 25 Places"
description: "Where can you advertise your business for free? 25 places — directories, communities, marketplaces, and PR channels — with best-fit notes. Start listing today."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Small Business Marketing"
keywords:
  - where can i advertise my business for free
  - free places to advertise business
  - free advertising sites
  - advertise business free online
pillar: false
related:
  - how-to-advertise-your-small-business-online-for-free
  - cheap-ways-to-advertise-a-small-business
  - free-ways-to-get-website-traffic
---

> **Key takeaways:**
> - 25 free advertising places across directories, communities, marketplaces, social, and PR — each with a "best for" note.
> - Completeness beats quantity: five fully-built profiles outperform twenty bare listings.
> - Match the place to your buyer: local businesses, online sellers, and B2B need different lists.
> - Free listings compound — an hour of setup can send trickle traffic for years.
> - Skip anything that looks like a link farm; real places have real audiences you'd want even without SEO.

## How to use this list

Pick the 5–8 places that match your business type (each entry says who it's
for), build complete profiles — photos, full descriptions, clear offers —
and move on. A bare listing is nearly worthless; a complete one works while
you sleep. Revisit yearly to refresh photos and details.

## Directories & listings (1–7)

**1. Google Business Profile.** The king of free local advertising — Maps,
local search, reviews, posts. Best for: any business with a location or
service area.

**2. Apple Business Connect.** Puts you on Apple Maps — iPhone users navigating
to businesses. Best for: local businesses, especially in iPhone-heavy markets.

**3. Bing Places.** Same idea for Bing Maps and search. Ten minutes, permanent
coverage. Best for: everyone local.

**4. Yelp (and regional equivalents).** Still heavily used for restaurants,
services, and hospitality in many markets. Best for: consumer local services.

**5. Niche industry directories.** Whatever your trade's "find a pro" or "find
a vendor" directory is — these often carry the highest buyer intent of any
free listing. Best for: trades, agencies, B2B services.

**6. Chamber of commerce / business association listings.** Many offer free or
cheap member directories with local trust baked in. Best for: local B2B and
services.

**7. Startup/product directories.** Product Hunt, BetaList, startup directories,
and niche "new tools" lists. Best for: startups, apps, and digital products at
launch.

## Marketplaces & classifieds (8–11)

**8. Facebook Marketplace.** Free listings with massive local reach. Best for:
physical products, local services, second-hand and handmade goods.

**9. Craigslist / Gumtree / Dubizzle (UAE).** Old-school classifieds that
still move real volume in many markets. Best for: local goods and services.

**10. Etsy / Amazon / eBay (free listing tiers).** Marketplace presence where
buyers already shop. Best for: physical and digital products.

**11. App stores / software directories.** G2, Capterra, and app marketplaces
offer free listing tiers that rank well in search. Best for: software and apps.

## Communities (12–16)

**12. Reddit (relevant subreddits).** Genuinely useful participation — answers
and posts, not link drops. Best for: niche products with passionate buyers.

**13. Facebook Groups.** Niche and local groups where your buyers ask for
recommendations. Best for: local services, parent/family niches, hobby markets.

**14. LinkedIn (profile + groups).** A complete founder profile plus thoughtful
participation in industry groups. Best for: B2B, consultants, agencies.

**15. Niche forums and Discord servers.** Every industry has its watering
holes; find yours and contribute. Best for: hobbies, tech, gaming, specialized
trades.

**16. Quora / Q&A sites.** Detailed answers to buyer questions rank in Google
for years. Best for: expertise-driven businesses (finance, legal, health,
tech).

## Social & content (17–20)

**17. TikTok / Reels / Shorts.** Free organic reach still exists for short
video — show the work, the result, the personality. Best for: visual products,
food, fashion, creators, local businesses with character.

**18. YouTube.** Tutorials and "how it's done" videos compound for years and
rank in Google. Best for: anything teachable — which is almost everything.

**19. A simple blog on your own site.** Answer buyer questions; each post is a
permanent free ad in search results. Best for: businesses playing the long
game (start now).

**20. Newsletter swaps / guest content.** Trade mentions with peers; publish
guest posts on mid-size blogs. Best for: anyone with expertise and an email
list (even a tiny one).

## PR & credibility (21–23)

**21. HARO / Connectively / #journorequest.** Answer journalist requests; get
quoted with a link in real publications. Best for: founders with opinions or
data.

**22. Local press and bloggers.** One good local-angle pitch. Community media
is hungry for stories. Best for: local businesses with anything newsworthy.

**23. Podcast guest spots (small shows).** Hosts need guests; you need
audiences. Start niche. Best for: expertise businesses, authors, founders with
a story.

## Referral & word-of-mouth (24–25)

**24. Review platforms.** Google, TripAdvisor, Trustpilot, G2 — whichever your
buyers check. Systematically ask happy customers. Best for: everyone.

**25. Your own customers.** A timed, easy referral ask after every great
outcome — with the link and suggested wording ready. Best for: businesses with
happy repeat customers (which should be all of them).

## Places to skip

Not every "free advertising site" deserves your hour: generic link
directories with no real visitors, "free traffic exchange" schemes, FFA
(free-for-all) link pages, and any site that exists only to host listings no
human browses. The test: **would you want to be listed there even if search
engines didn't exist?** If no, skip it.

## The 80/20 of this list

If you only do five: Google Business Profile, your niche's #1 directory, one
community done well, a review-generation habit, and one content channel started
this month. Those five cover discovery, trust, and compounding — everything
else is optimization.

Pair this with the strategy in [How to Advertise Your Small Business Online for Free](/blog/how-to-advertise-your-small-business-online-for-free)
and the paid side in [Cheap Ways to Advertise a Small Business](/blog/cheap-ways-to-advertise-a-small-business).

## Making your free listings work harder

A listing is not advertising until someone acts on it. Most free listings fail
because they're bare — name, address, done. Here's how to make each one pull
its weight:

- **Write the description for buyers, not for you.** Lead with the outcome
  ("Same-day AC repair across Dubai") not the history ("Established in 2019,
  we are a leading provider of..."). Include the words buyers actually search.
- **Photos do the heavy lifting.** Real photos of your work, team, products,
  and premises outperform stock images enormously. Add 10+ where the platform
  allows; update seasonally.
- **One clear next step.** Every listing should tell the reader exactly what
  to do: call this number, book at this link, message on WhatsApp. Listings
  without a call-to-action are just business cards in a drawer.
- **Keep hours and details current.** Nothing kills trust like a "closed"
  listing on a business day or a disconnected number. Audit quarterly —
  stale details actively repel buyers.
- **Respond to everything.** Reviews, questions, messages — fast, human
  responses on free platforms signal a business that's alive and cares. Your
  response is visible to the next hundred readers; treat it as ad copy.
- **Track which listings send traffic.** UTM links where possible; otherwise
  ask new customers where they found you. After 90 days, you'll know which 5
  listings deserve ongoing attention and which were one-time setups.

Free advertising rewards completeness and maintenance, not just presence. An
hour setting up plus fifteen minutes a month maintaining beats ten abandoned
listings every time.

## Beyond the list: turning places into pipelines

Listings are starting points, not strategies. The businesses that win with
free advertising turn their best places into pipelines:

- **Double down on the top 3.** After 90 days, your tracking will show which
  places actually send prospects. Give those three ongoing attention — fresh
  photos, updated offers, active responses — and let the rest run on autopilot.
- **Repurpose wins.** A great review becomes a social post, a testimonial page
  entry, and sales collateral. A popular community answer becomes a blog post.
  Free advertising compounds when outputs feed each other.
- **Watch for new places.** New directories, communities, and marketplaces
  appear constantly; early listings on growing platforms are disproportionately
  valuable. Revisit this list yearly and add what's new in your niche.
`,rC=`---
title: "Word-of-Mouth Marketing: How to Get Customers Talking"
description: "Word of mouth marketing is the most trusted growth channel. Learn practical tactics to earn referrals, reviews, and customer conversations that spread."
date: 2026-09-23
author: "FlexSpot Editorial"
category: "Viral Marketing"
keywords:
  - word of mouth marketing
  - word of mouth advertising
  - customer referrals
  - get customers talking
pillar: false
related:
  - how-to-make-your-brand-go-viral
  - how-to-get-referrals-for-your-business
  - referral-marketing
sample: false
---

> **Key takeaways:**
> - Word-of-mouth is earned, not bought: remarkable experiences, easy sharing, and visible social proof are the levers.
> - The talk triggers are specific — surprising generosity, insider status, and story-worthy moments, not generic "great service."
> - Reviews, testimonials, and referral prompts turn private satisfaction into public conversation.
> - Measure it with referral tracking and review velocity, not vibes.

## Why word-of-mouth beats every ad channel

People trust people. A recommendation from a friend carries a credibility that no ad creative can buy, and it arrives pre-qualified — the recommender already knows what the recipient needs. That's why word-of-mouth marketing consistently delivers the highest-converting customers at the lowest acquisition cost: the "ad" is a genuine conversation, and the targeting is done by someone who knows both sides.

The catch is that you can't buy it directly. You can only create the conditions where talking about you becomes natural, easy, and rewarding. That's what this guide covers.

## The anatomy of a talk trigger

Nobody recommends a business for being "fine." Word-of-mouth starts with a **talk trigger** — something specific, surprising, and story-worthy. The patterns that work:

- **Surprising generosity.** The free upgrade, the handwritten note, the problem fixed without being asked. It doesn't have to be expensive — it has to be unexpected.
- **Insider status.** Early access, a members-only perk, being asked for input. People talk about things that make them feel like insiders.
- **Story-worthy moments.** The outrageous packaging, the funny confirmation email, the founder who personally delivers. If a customer would tell the story at dinner, it's a talk trigger.
- **Identity alignment.** Brands that stand for something specific give customers a way to express who they are by recommending them.

Audit your customer journey and ask: where is the moment they'd tell a friend about? If you can't find one, that's your first project — engineer one.

## Make sharing frictionless

Even delighted customers won't talk about you if sharing is hard. Remove every barrier:

- **Give them the words.** A short, quotable description of what you do — the one-liner they'd repeat. If customers can't explain you in a sentence, they won't try.
- **Give them the link.** A personal referral link, a shareable page, a QR code on the receipt. The easier the handoff, the more handoffs happen.
- **Give them the moment.** Ask at the peak of satisfaction — right after delivery, right after the compliment, right after the problem is solved. Timing beats scripts.
- **Give them the nudge.** A simple "know someone who'd love this?" at the right moment outperforms any incentive program for warm audiences.

## Turn satisfaction into public proof

Private delight is nice; public proof compounds. Systematically convert happy customers into visible advocates:

- **Reviews.** Ask directly, make it a one-click process, and respond to every review — responses show future customers you're listening. Never fake reviews; one exposed fabrication destroys years of trust.
- **Testimonials with specifics.** "Great service!" convinces nobody. Ask for the before-and-after: what was the problem, what changed, what would they tell a friend. Specific stories are shareable; generic praise isn't.
- **User-generated content.** Feature customer photos, videos, and stories prominently. Being featured is its own reward and motivates the next round of creators.
- **Visible community.** A leaderboard of top supporters, a wall of customer stories, a public "thank you" feed — when advocacy is visible, it becomes a status people want.

## The referral prompt: asking without being awkward

Most businesses never ask, and that's the biggest leak in word-of-mouth marketing. The fix isn't a pushy script — it's a natural ask at the right moment:

- **After a compliment:** "That means a lot — would you mind telling a friend who'd appreciate the same?"
- **After a great result:** "If you know anyone dealing with [problem], I'd love an intro — here's a link that makes it easy."
- **In the follow-up email:** One line, one link. "Enjoyed working together? Here's a quick way to refer a friend."
- **Through the product itself:** Referral links embedded in the experience — share buttons on results pages, "gift a friend" options at checkout — ask without asking.

The principle: ask when they're happiest, make it take seconds, and never make them feel like your sales team.

## What kills word-of-mouth

- **Inconsistency.** One remarkable experience followed by a mediocre one doesn't average out — the mediocre one becomes the story.
- **Friction in the product.** People don't recommend things that embarrassed them. Fix the onboarding, the support wait, the confusing checkout before you invest in advocacy.
- **Incentives that feel transactional.** Paying for "referrals" from strangers reads as a bribe. Rewards work when they feel like a thank-you between friends, not a commission scheme.
- **Ignoring the talkers.** The customer who refers five friends and never hears from you stops referring. Acknowledge advocates publicly and personally.

## Turning one talker into many: the advocacy ladder

Not every happy customer becomes an advocate on their own — most need a nudge up a ladder. Design yours deliberately:

1. **Satisfied** — they had a good experience. Your job: notice it and thank them personally.
2. **Reviewer** — they left a public review. Your job: respond warmly and feature the best reviews where new customers look.
3. **Referrer** — they sent a friend your way. Your job: make the referral dead simple (personal link, pre-written message they can forward) and acknowledge every single one.
4. **Creator** — they made content about you unprompted. Your job: amplify it, credit them loudly, and invite them into something bigger.
5. **Champion** — they defend and promote you habitually. Your job: give them insider access, early news, and real influence over what you build next.

Most businesses treat all customers the same and wonder why nobody advocates. Move people up one rung at a time, and the top of the ladder builds itself.

## Measuring word-of-mouth (without guessing)

Track what you can: referral link clicks and conversions per advocate, review velocity (new reviews per month) and rating trend, branded search volume over time, and the simple question in onboarding — "how did you hear about us?" — with referral as an option. You won't capture every conversation, but the trend lines tell you whether the talk is growing.

Word-of-mouth compounds slowly and then suddenly. The businesses famous for it usually spent a year engineering talk triggers and removing friction before the wave arrived. Start with one remarkable moment and one frictionless share path — the conversation does the rest.

## Your first 30 days: a starter plan

- **Week 1:** Identify your talk trigger. Survey ten recent customers: "What would you tell a friend about us?" Their answers reveal what’s actually remarkable — build on that.
- **Week 2:** Remove one sharing barrier. Add the referral link, simplify the review ask, or write the one-liner customers can repeat.
- **Week 3:** Ask systematically. Build the post-purchase or post-delivery prompt into your process so every happy customer gets asked at the peak moment.
- **Week 4:** Make advocacy visible. Publish the first customer story, feature the first reviews prominently, thank your first referrers publicly. Visibility invites imitation — and the ladder starts climbing itself.
`,aC=["Visibility Guides","Small Business Marketing","Viral Marketing","UAE & Dubai","Bidding Strategy","Getting Started"],iC=e=>String(e||"").toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");function Np(e){const t=e.trim();return/^(true|false)$/i.test(t)?t.toLowerCase()==="true":/^\d{4}-\d{2}-\d{2}$/.test(t)?t:!isNaN(Number(t))&&t!==""?Number(t):t.replace(/^["'](.*)["']$/,"$1")}function oC(e){const t=e.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);if(!t)return{data:{},body:e};const n={};let s=null;for(const r of t[1].split(/\r?\n/))if(/^\s*-\s+/.test(r)&&s)(n[s]=n[s]||[]).push(Np(r.replace(/^\s*-\s+/,"")));else if(/^[\w-]+:/.test(r)){const i=r.indexOf(":");s=r.slice(0,i).trim();const o=r.slice(i+1).trim();n[s]=o===""?[]:Np(o)}return{data:n,body:t[2]}}const pb=e=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function Sr(e){let t=pb(e);const n=[];return t=t.replace(/`([^`]+)`/g,(s,r)=>(n.push(`<code>${r}</code>`),`\0${n.length-1}\0`)),t=t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'<img src="$2" alt="$1" loading="lazy" class="blog-img" />'),t=t.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(/(^|[^*])\*([^*\n]+)\*/g,"$1<em>$2</em>"),t=t.replace(/\u0000(\d+)\u0000/g,(s,r)=>n[Number(r)]),t}const fb=e=>String(e).toLowerCase().replace(/<[^>]+>/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");function lC(e){const t=[];for(const n of String(e).split(`
`)){const s=n.match(/^(#{2,3})\s+(.*)$/);s&&t.push({level:s[1].length,text:s[2].trim(),id:fb(s[2].trim())})}return t}function cC(e){const n=e.map(u=>u.replace(/^>\s?/,"")).join(`
`).split(`
`).map(u=>u.trim()).filter(Boolean),s=n[0]||"",r=n.slice(1),i=/key takeaways/i.test(s),o=r.filter(u=>u.startsWith("- ")).map(u=>`<li>${Sr(u.slice(2))}</li>`),l=r.filter(u=>!u.startsWith("- ")).map(u=>`<p>${Sr(u)}</p>`),c=(o.length?`<ul>${o.join("")}</ul>`:"")+l.join("");return i?`<aside class="blog-takeaways"><p class="blog-takeaways-title">${i?"✅ Key takeaways":"💡 Note"}</p>${c}</aside>`:`<blockquote>${c}</blockquote>`}function dC(e){const t=String(e).replace(/\r\n?/g,`
`).split(`
`),n=[];let s=0;for(;s<t.length;){const r=t[s];if(/^```/.test(r)){const l=[];for(s++;s<t.length&&!/^```/.test(t[s]);)l.push(t[s++]);s++,n.push(`<pre><code>${pb(l.join(`
`))}</code></pre>`);continue}if(/^>/.test(r)){const l=[];for(;s<t.length&&/^>/.test(t[s]);)l.push(t[s++]);n.push(cC(l));continue}const i=r.match(/^(#{2,3})\s+(.*)$/);if(i){const l=i[1].length===2?"h2":"h3";n.push(`<${l} id="${fb(i[2])}">${Sr(i[2])}</${l}>`),s++;continue}if(/^\s*([-*]|\d+\.)\s+/.test(r)){const l=/^\s*\d+\./.test(r),c=[];for(;s<t.length&&/^\s*([-*]|\d+\.)\s+/.test(t[s]);)c.push(`<li>${Sr(t[s].replace(/^\s*([-*]|\d+\.)\s+/,""))}</li>`),s++;n.push(`<${l?"ol":"ul"}>${c.join("")}</${l?"ol":"ul"}>`);continue}if(/^\s*$/.test(r)){s++;continue}const o=[r];for(s++;s<t.length&&!/^\s*$/.test(t[s])&&!/^(#{2,3}\s|>\s?```|[-*]\s|\d+\.\s)/.test(t[s]);)o.push(t[s++]);n.push(`<p>${Sr(o.join(" "))}</p>`)}return n.join(`
`)}const uC=Object.assign({"../content/blog/README.md":gT,"../content/blog/advertise-in-dubai-under-100-aed.md":yT,"../content/blog/affiliate-marketing-for-small-business.md":vT,"../content/blog/banner-ads-vs-sponsored-placements.md":bT,"../content/blog/brand-awareness-strategies.md":wT,"../content/blog/brand-visibility-vs-brand-awareness.md":xT,"../content/blog/can-you-pay-for-advertising-with-usdt.md":kT,"../content/blog/cheap-ways-to-advertise-a-small-business.md":jT,"../content/blog/cheapest-way-to-advertise-online-ranked.md":ST,"../content/blog/crypto-ad-networks-minimum-budgets-compared.md":NT,"../content/blog/dollar-a-day-advertising-what-it-buys.md":TT,"../content/blog/featured-placement-advertising.md":CT,"../content/blog/free-ways-to-get-website-traffic.md":AT,"../content/blog/getting-started-with-flexspot.md":ET,"../content/blog/google-ads-too-expensive-cheaper-alternatives.md":PT,"../content/blog/guerrilla-marketing-ideas.md":RT,"../content/blog/homepage-sponsorships.md":FT,"../content/blog/how-boosting-moves-you-up-the-leaderboard.md":DT,"../content/blog/how-much-does-it-cost-to-advertise-a-small-business.md":MT,"../content/blog/how-to-advertise-your-small-business-online-for-free.md":BT,"../content/blog/how-to-drive-traffic-to-a-new-website.md":IT,"../content/blog/how-to-get-referrals-for-your-business.md":LT,"../content/blog/how-to-get-traffic-to-your-website.md":$T,"../content/blog/how-to-increase-brand-visibility.md":_T,"../content/blog/how-to-make-your-brand-go-viral.md":OT,"../content/blog/how-to-stand-out-from-competitors.md":zT,"../content/blog/how-to-start-a-referral-program.md":WT,"../content/blog/increase-online-visibility-small-business-90-days.md":VT,"../content/blog/one-dollar-publicity-stunt-leaderboards.md":UT,"../content/blog/product-hunt-alternatives-launch-platforms.md":HT,"../content/blog/promote-youtube-channel-for-1-dollar.md":qT,"../content/blog/referral-marketing.md":YT,"../content/blog/referral-program-ideas.md":GT,"../content/blog/should-you-buy-website-traffic.md":KT,"../content/blog/small-business-advertising-ideas-under-50.md":QT,"../content/blog/stablecoin-advertising-no-bank-account.md":XT,"../content/blog/viral-marketing-strategies.md":JT,"../content/blog/ways-to-get-your-business-noticed-online.md":ZT,"../content/blog/website-sponsorship-for-small-brands.md":eC,"../content/blog/website-traffic-sources-ranked.md":tC,"../content/blog/what-is-bid-for-attention-marketing.md":nC,"../content/blog/where-can-i-advertise-my-business-for-free.md":sC,"../content/blog/word-of-mouth-marketing.md":rC}),hC=e=>{const t=String(e).split(/\s+/).filter(Boolean).length;return Math.max(1,Math.ceil(t/200))},mC=e=>new Date(`${e}T12:00:00`).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});function pC(e,t){const{data:n,body:s}=oC(t);return{slug:e,title:n.title||e,description:n.description||"",date:n.date||"1970-01-01",author:n.author||"FlexSpot Team",category:n.category||"Getting Started",keywords:Array.isArray(n.keywords)?n.keywords:[],pillar:n.pillar===!0,related:Array.isArray(n.related)?n.related:[],sample:n.sample===!0,image:n.image||null,body:s.trim(),html:dC(s),headings:lC(s),readingTime:hC(s),url:`/blog/${e}`}}const Xn=Object.entries(uC).filter(([e])=>!/\/readme\.md$/i.test(e)).map(([e,t])=>{const n=e.split("/").pop().replace(/\.md$/,"");return pC(n,t)}).sort((e,t)=>t.date<e.date?-1:t.date>e.date?1:0),fC=Xn.filter(e=>!e.sample),gb=e=>Xn.find(t=>t.slug===e)||null;function wE(e,t=3){const n=[],s=new Set([e.slug]),r=fC.filter(o=>o.slug!==e.slug);for(const o of e.related||[]){const l=r.find(c=>c.slug===o);l&&!s.has(l.slug)&&(n.push(l),s.add(l.slug))}for(const o of r){if(n.length>=t)break;!s.has(o.slug)&&o.category===e.category&&(n.push(o),s.add(o.slug))}const i=new Set((e.keywords||[]).map(o=>String(o).toLowerCase()));for(const o of r){if(n.length>=t)break;if(s.has(o.slug))continue;(o.keywords||[]).some(c=>i.has(String(c).toLowerCase()))&&(n.push(o),s.add(o.slug))}for(const o of r){if(n.length>=t)break;s.has(o.slug)||(n.push(o),s.add(o.slug))}return n.slice(0,t)}function xE(e){const t=String(e||"").trim().toLowerCase();return t?Xn.filter(n=>[n.title,n.description,n.category,n.author,...n.keywords||[]].join(" ").toLowerCase().includes(t)):Xn}function kE(e,t=1,n=12){const s=e.length,r=Math.max(1,Math.ceil(s/n)),i=Math.min(Math.max(1,t),r),o=(i-1)*n;return{items:e.slice(o,o+n),page:i,totalPages:r,total:s,hasPrev:i>1,hasNext:i<r}}function gC({onClaim:e}){return a.jsxs("footer",{className:"relative overflow-hidden border-t border-[var(--line-soft)] bg-[var(--surface)] mt-20",children:[a.jsx(Eu,{items:[{emoji:"👑",left:"2%",top:"18%",size:26,cls:"hidden md:block",opacity:.35},{emoji:"⚡",left:"96%",top:"12%",size:24,cls:"hidden md:block",opacity:.35},{emoji:"🚀",left:"88%",top:"68%",size:26,cls:"hidden md:block",opacity:.3},{emoji:"💎",left:"6%",top:"72%",size:22,cls:"hidden md:block",opacity:.3},{emoji:"✨",left:"50%",top:"8%",size:20,cls:"hidden md:block",opacity:.3}]}),a.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-6 relative",children:[a.jsxs("div",{className:"md:col-span-2",children:[a.jsx(mb,{}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mt-4 max-w-sm leading-relaxed",children:"The internet's live spotlight competition. Claim your spot from $1, climb the leaderboard, and show the world what you're building."}),a.jsx("button",{onClick:e,className:"btn-primary px-5 py-2.5 text-sm mt-5",children:"⚡ Claim Your Spot"})]}),a.jsxs("div",{children:[a.jsx("h4",{className:"font-display font-bold text-sm tracking-wide mb-4 text-[var(--ink)]",children:"EXPLORE"}),a.jsxs("ul",{className:"space-y-2.5 text-sm text-[var(--ink-2)]",children:[a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/explore",children:"Explore"})}),a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/leaderboard",children:"Leaderboard"})}),a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/rewards",children:"Rewards"})}),a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/how-it-works",children:"How It Works"})}),a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/faq",children:"FAQ"})})]})]}),a.jsxs("div",{children:[a.jsx("h4",{className:"font-display font-bold text-sm tracking-wide mb-4 text-[var(--ink)]",children:"RESOURCES"}),a.jsxs("ul",{className:"space-y-2.5 text-sm text-[var(--ink-2)]",children:[a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/blog",children:"Blog"})}),aC.slice(0,4).map(t=>a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:`/blog?cat=${iC(t)}`,children:t})},t))]})]}),a.jsxs("div",{children:[a.jsx("h4",{className:"font-display font-bold text-sm tracking-wide mb-4 text-[var(--ink)]",children:"LEGAL"}),a.jsxs("ul",{className:"space-y-2.5 text-sm text-[var(--ink-2)]",children:[a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/privacy",children:"Privacy Policy"})}),a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/terms",children:"Terms of Service"})}),a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/disclaimers",children:"Disclaimers"})}),a.jsx("li",{children:a.jsx("a",{className:"hover:text-[var(--ink)] transition-colors",href:"mailto:support@flexspot.lol",children:"Contact"})})]})]}),a.jsxs("div",{children:[a.jsx("h4",{className:"font-display font-bold text-sm tracking-wide mb-4 text-[var(--ink)]",children:"SPOTLIGHT"}),a.jsxs("ul",{className:"space-y-2.5 text-sm text-[var(--ink-2)]",children:[a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/winners",children:"Top spot this week"})}),a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/trending",children:"Trending now"})}),a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/rising",children:"Rising fast"})}),a.jsx("li",{children:a.jsx(_,{className:"hover:text-[var(--ink)] transition-colors",to:"/new",children:"New to watch"})})]})]})]}),a.jsx("div",{className:"border-t border-[var(--line-soft)]",children:a.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--ink-2)]",children:[a.jsxs("span",{children:["© ",new Date().getFullYear()," FlexSpot.LOL — Everyone wants a spot on this page."]}),a.jsxs("span",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"live-dot"})," Live leaderboard"]})]})}),a.jsx("div",{className:"h-24 lg:hidden"})]})}function Hi({to:e,duration:t=1200,format:n=s=>Math.round(s).toLocaleString()}){const[s,r]=w.useState(0),i=w.useRef();return w.useEffect(()=>{const o=performance.now(),l=c=>{const d=Math.min(1,(c-o)/t),u=1-Math.pow(1-d,3);r(e*u),d<1&&(i.current=requestAnimationFrame(l))};return i.current=requestAnimationFrame(l),()=>cancelAnimationFrame(i.current)},[e,t]),a.jsx("span",{children:n(s)})}const yC=["👑 Who will steal the crown?","⚔️ Someone just entered the battlefield.","😬 Your competitor just moved above you.","💸 Only $1 away from beating #25.","✨ Your spot is waiting.","🔥 The board never sleeps."];function Pu({lines:e=yC,interval:t=4200,className:n=""}){const[s,r]=w.useState(0);return w.useEffect(()=>{const i=setInterval(()=>r(o=>(o+1)%e.length),t);return()=>clearInterval(i)},[e.length,t]),a.jsxs("div",{className:`flex items-center gap-2.5 text-sm min-h-[24px] max-w-full overflow-hidden ${n}`,children:[a.jsx("span",{className:"live-dot shrink-0"}),a.jsx(ia,{mode:"wait",children:a.jsx(G.span,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},transition:{duration:.3},className:"font-semibold text-snow/90 min-w-0 flex-1 truncate",children:e[s]},s)})]})}const Ne=e=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(e||0),qe=e=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(e||0),Ye=e=>new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(e||0),Hn=e=>{const t=Math.floor((Date.now()-new Date(e).getTime())/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:`${Math.floor(t/86400)}d ago`},vC=e=>String(e||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"").slice(0,40),Tp=[["#2E7CF6","#7A4DFF"],["#00C48C","#2E7CF6"],["#FF8A3D","#FF3D68"],["#FFC93C","#FF7A3D"],["#2BFF88","#00C48C"],["#7A4DFF","#FF3DC8"],["#3DC8FF","#2E7CF6"],["#FFD23F","#E8A90C"]],bC=e=>{let t=0;for(let n=0;n<String(e).length;n++)t=(t*31+String(e).charCodeAt(n))%997;return Tp[t%Tp.length]},wC=e=>String(e||"?").split(/\s+/).map(t=>t[0]).slice(0,2).join("").toUpperCase(),xC=()=>{const e="/flexspot/".replace(/\/+$/,"");return e===""?"":e},yb=(e,t)=>`${xC()}/s/${e}${t?`?ref=${encodeURIComponent(t)}`:""}`,kC=(e,t,n)=>{const s=`${t}${yb(e.slug,n)}`,r=`Help ${e.name} reach #1 on FlexSpot 🏆`;return{url:s,facebook:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(s)}`,x:`https://twitter.com/intent/tweet?text=${encodeURIComponent(r)}&url=${encodeURIComponent(s)}`,telegram:`https://t.me/share/url?url=${encodeURIComponent(s)}&text=${encodeURIComponent(r)}`}},vb=async e=>{try{return await navigator.clipboard.writeText(e),!0}catch{const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.select();try{return document.execCommand("copy"),!0}catch{return!1}finally{t.remove()}}};function Ot({spot:e,size:t=44,ring:n=!1}){const[s,r]=bC(e.slug||e.name);return a.jsx("span",{className:`relative grid place-items-center rounded-2xl font-display font-bold text-white shrink-0 overflow-hidden ${n?"ring-2 ring-[var(--gold)]":""}`,style:{width:t,height:t,fontSize:e.mark?t*.52:t*.38,background:`linear-gradient(135deg, ${s}, ${r})`},children:e.logo?a.jsx("img",{src:e.logo,alt:"",className:"w-full h-full object-cover"}):e.mark?a.jsx("span",{"aria-hidden":"true",style:{transform:"translateY(-2%)"},children:e.mark}):wC(e.name)})}function qi({rank:e,size:t="md"}){const s={1:"bg-gradient-to-br from-[var(--gold)] to-[var(--gold-deep)] text-white shadow-[var(--shadow-gold)]",2:"bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900",3:"bg-gradient-to-br from-amber-500 to-amber-700 text-white"}[e]||"bg-[var(--surface-2)] text-[var(--ink-2)] border border-[var(--line)]",r=t==="lg"?"w-12 h-12 text-xl":"w-9 h-9 text-sm";return a.jsx("span",{className:`grid place-items-center rounded-xl font-display font-bold ${r} ${s}`,children:e})}function bb({move:e}){return e?e>0?a.jsxs("span",{className:"text-[#0A8A4E] dark:text-[#34D399] text-xs font-bold",children:["▲ ",e]}):a.jsxs("span",{className:"text-[var(--blaze)] text-xs font-bold",children:["▼ ",Math.abs(e)]}):a.jsx("span",{className:"text-[var(--ink-3)] text-xs font-semibold",children:"–"})}const jC={4:{emoji:"🚀",title:"Rocket blasting off the line"},5:{emoji:"🐆",title:"Leopard chasing the rocket"},6:{emoji:"🦊",title:"Fox dashing up"},7:{emoji:"🏎️",title:"Race car speeding up"},8:{emoji:"🛹",title:"Skater rolling toward the top"},9:{emoji:"🐝",title:"Bee buzzing up the ranks"},10:{emoji:"🐌",title:"Snail… still trying"}},fl=e=>`${(2.2+(e-4)*.55).toFixed(2)}s`;function wb(){const[e,t]=w.useState({key:0,running:!1}),[n,s]=w.useState(null);return w.useEffect(()=>{const r=[],i=(u,h)=>r.push(setTimeout(u,h)),d=()=>{s(3),i(()=>s(2),750),i(()=>s(1),1500),i(()=>{s("GO"),t(u=>({key:u.key+1,running:!1})),i(()=>t(u=>({...u,running:!0})),60)},2300),i(()=>s(null),3100),i(d,10500)};return d(),()=>r.forEach(clearTimeout)},[]),{race:e,count:n}}const SC={key:0,running:!1};function la({spot:e,move:t,onBoost:n,highlight:s,race:r,count:i=null,overtake:o}){const l=jC[e.rank],c=r||SC,d=o!==void 0,u=o?o.amount-e.amount:null,h=o&&o.amount>0?Math.min(100,Math.max(4,e.amount/o.amount*100)):0,m=o?Math.max(.01,o.amount-e.amount+.01):null,y=o?u>0?`Only ${qe(m)} to steal #${o.rank}`:`Neck-and-neck with #${o.rank} — one boost takes it!`:"🌱 The underdog slot — every giant started at $1",p=o?u>0?`Only ${qe(m)} to #${o.rank}`:`Tied with #${o.rank} — one boost!`:"🌱 Every giant started at $1",b=`${(parseFloat(fl(e.rank))/5).toFixed(2)}s`,[x,f]=w.useState(!1);return w.useEffect(()=>{if(f(!1),!c.running)return;const g=setTimeout(()=>f(!0),parseFloat(fl(e.rank))*1e3);return()=>clearTimeout(g)},[c.key,c.running,e.rank]),a.jsx(G.div,{layout:!0,transition:{type:"spring",stiffness:320,damping:32},className:s?t>0?"flash-up rounded-2xl":t<0?"flash-down rounded-2xl":"":"",children:a.jsxs(_,{to:`/s/${e.slug}`,className:"card card-lift flex items-center gap-3 sm:gap-4 p-3 sm:p-4",children:[a.jsx(qi,{rank:e.rank}),a.jsx(Ot,{spot:e}),a.jsxs("div",{className:"min-w-0 flex-1 lg:flex-none lg:w-60 xl:w-72",children:[a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("h3",{className:"font-display font-bold text-[var(--ink)] truncate text-[15px]",children:e.name}),e.rank===1&&a.jsx("span",{className:"text-sm",children:"👑"}),e.pending&&a.jsx("span",{className:"shrink-0 text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-500/15 border border-amber-500/40 rounded-full px-2 py-0.5",title:"Payment under review",children:"⏳ Pending"}),e.gift&&a.jsx("span",{className:"text-sm",title:`Surprised by ${e.gift.from}`,children:"🎁"})]}),a.jsx("p",{className:"text-[var(--ink-2)] text-xs truncate",children:e.gift?`🎁 Surprised by ${e.gift.from}`:e.tagline}),a.jsxs("div",{className:"flex items-center gap-3 mt-1 text-[11px] text-[var(--ink-3)]",children:[a.jsxs("span",{children:["👁 ",Ye(e.views)]}),a.jsxs("span",{children:["🖱 ",Ye(e.clicks)]}),a.jsx("span",{className:"hidden sm:inline",children:a.jsx(bb,{move:t})})]}),d&&a.jsx("div",{className:"md:hidden mt-1.5",children:o?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"h-1 rounded-full bg-[var(--line)] overflow-hidden max-w-[220px]",children:a.jsx("div",{className:"h-full rounded-full bg-gradient-to-r from-[#B45309] via-[#F59E0B] to-[#FCD34D]",style:{width:`${h}%`}})}),a.jsx("div",{className:"text-[10px] text-[var(--ink-3)] font-semibold mt-1 truncate",children:p})]}):a.jsx("div",{className:"text-[10px] text-[var(--ink-3)] font-semibold truncate",children:p})})]}),l&&a.jsxs("div",{className:"race-lane hidden md:block",title:l.title,"aria-hidden":"true",children:[a.jsx("span",{className:"race-gate race-gate-finish"}),a.jsx("span",{className:"race-dashes"}),i!==null&&a.jsx("span",{className:"race-count",children:a.jsx("span",{className:"countdown-pop",children:i==="GO"?"GO!":i},`c-${c.key}-${i}`)}),a.jsx("span",{className:"race-gate race-gate-start"}),x&&a.jsxs("span",{className:"race-pos",children:["P",e.rank]}),a.jsx("span",{className:"race-runner",style:{left:c.running?"52px":"94%",transitionDuration:fl(e.rank)},children:a.jsx(q,{children:a.jsx("span",{className:"race-bob",style:{animationDuration:b},children:l.emoji})})},c.key)]}),d&&!l&&a.jsxs("div",{className:"hidden md:flex flex-1 min-w-0 max-w-[260px] mx-auto flex-col justify-center px-2",children:[o&&a.jsx("div",{className:"h-1.5 rounded-full bg-[var(--line)] overflow-hidden",children:a.jsx("div",{className:"h-full rounded-full bg-gradient-to-r from-[#B45309] via-[#F59E0B] to-[#FCD34D] shadow-[0_0_10px_rgba(245,158,11,0.45)]",style:{width:`${h}%`}})}),a.jsx("div",{className:`text-[11px] text-[var(--ink-3)] font-semibold truncate text-center ${o?"mt-1.5":""}`,children:y})]}),a.jsxs("div",{className:"text-right shrink-0",children:[a.jsxs("div",{className:"font-display font-black text-[var(--blaze-deep)] dark:text-[#FF8A66] text-xl sm:text-2xl tracking-tight whitespace-nowrap",children:["🏆 ",Ne(e.amount)]}),a.jsx("div",{className:"text-[10px] text-[var(--ink-3)] uppercase tracking-wider font-semibold",children:"spot value"})]}),a.jsx("button",{onClick:g=>{g.preventDefault(),n&&n(e)},className:"btn-primary hidden sm:inline-flex px-4 py-2 text-xs shrink-0",children:"Boost ⚡"}),a.jsx("button",{onClick:g=>{g.preventDefault(),n&&n(e)},"aria-label":`Boost ${e.name}`,title:`Boost ${e.name}`,className:"sm:hidden grid place-items-center w-11 h-11 rounded-2xl text-white text-lg shrink-0 active:scale-95 transition-transform bg-gradient-to-br from-[var(--blaze)] to-[#4F46E5] shadow-[var(--shadow-blaze)]",children:"⚡"})]})})}function Ru({spots:e,onBoost:t}){const[n,s,r]=e;if(!n)return null;const i=(o,l,c,d="")=>{if(!o)return null;const u=l===1;return a.jsxs(G.div,{layout:!0,className:`relative flex flex-col ${d}`,children:[u&&a.jsxs("div",{className:"absolute -top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none","aria-hidden":"true",children:[a.jsx("div",{className:"absolute inset-0 blur-xl bg-[#F59E0B]/60 rounded-full scale-110"}),a.jsx(q,{children:a.jsx("div",{className:"relative text-6xl sm:text-7xl crown-bob drop-shadow-[0_6px_16px_rgba(245,158,11,0.9)]",children:"👑"})}),a.jsx("span",{className:"rocket-launch absolute -right-9 top-2 text-3xl",children:"🚀"})]}),a.jsxs("div",{className:`relative rounded-3xl p-5 sm:p-6 text-center overflow-hidden border-2 transition-transform duration-300 hover:-translate-y-1.5 ${u?"border-[#FBBF24] podium-champion champion-aura":`bg-[var(--surface)] border-[var(--line)] ${l===2?"podium-glow-2":"podium-glow-3"}`}`,children:[u&&a.jsx("div",{className:"podium-shine","aria-hidden":"true"}),u&&a.jsxs("div",{className:"absolute inset-0 pointer-events-none","aria-hidden":"true",children:[a.jsx("span",{className:"twinkle absolute top-4 left-5 text-sm",children:"✨"}),a.jsx("span",{className:"twinkle absolute top-10 right-6 text-xs",style:{animationDelay:"-0.9s"},children:"✨"}),a.jsx("span",{className:"twinkle absolute bottom-24 left-8 text-xs",style:{animationDelay:"-1.7s"},children:"✨"}),a.jsx("span",{className:"twinkle absolute bottom-32 right-8 text-sm",style:{animationDelay:"-2.3s"},children:"✨"}),a.jsx("span",{className:"absolute",style:{top:"16%",left:"7%"},children:a.jsx(q,{children:a.jsx("span",{className:"coin-flip !static text-2xl",children:"🪙"})})}),a.jsx("span",{className:"absolute",style:{top:"7%",right:"11%"},children:a.jsx(q,{children:a.jsx("span",{className:"coin-flip !static text-xl",style:{animationDelay:"-1.2s"},children:"🪙"})})}),a.jsx("span",{className:"absolute",style:{bottom:"36%",right:"6%"},children:a.jsx(q,{children:a.jsx("span",{className:"coin-flip !static text-lg",style:{animationDelay:"-2.3s"},children:"🪙"})})})]}),u?a.jsx("div",{className:"flex items-center justify-center mb-3",children:a.jsx("span",{className:"text-xs sm:text-sm uppercase tracking-[0.22em] font-black px-5 py-2 rounded-full bg-[#F59E0B]/20 text-[#FCD34D] border border-[#F59E0B]/40",children:c})}):a.jsx("div",{className:"flex justify-center mb-4",children:a.jsxs("div",{className:`rank-medal ${l===2?"rank-medal-silver":"rank-medal-bronze"}`,children:[a.jsx("span",{className:"rank-medal-num",children:l}),a.jsxs("span",{className:"rank-medal-text",children:[a.jsx("span",{className:"rank-medal-word",children:l===2?"SECOND":"THIRD"}),a.jsx("span",{className:"rank-medal-sub",children:l===2?"SILVER":"BRONZE"})]})]})}),a.jsxs(_,{to:`/s/${o.slug}`,className:"block group",children:[a.jsx("div",{className:"flex justify-center",children:a.jsxs("div",{className:u?"relative":"",children:[u&&a.jsx("div",{className:"absolute -inset-2 rounded-full bg-[#F59E0B]/30 blur-lg","aria-hidden":"true"}),a.jsx(Ot,{spot:o,size:u?84:68,ring:u})]})}),a.jsx("div",{className:`font-display font-extrabold mt-3 truncate group-hover:underline ${u?"text-2xl text-white":"text-xl text-[var(--ink)]"}`,children:o.name}),a.jsx("p",{className:`text-sm mt-0.5 truncate font-medium ${u?"text-[#FCD34D]":"text-[var(--ink-2)]"}`,children:o.tagline}),o.pending&&a.jsx("span",{className:"inline-block mt-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/40 rounded-full px-2.5 py-0.5",title:"Payment under review",children:"⏳ Pending review"}),o.description&&a.jsx("p",{className:`text-xs mt-2 leading-relaxed line-clamp-2 max-w-[26rem] mx-auto ${u?"text-white/60":"text-[var(--ink-3)]"}`,children:o.description})]}),u?a.jsxs("div",{className:"mt-4 flex items-center justify-center gap-2",children:[a.jsxs("span",{className:"relative flex h-2.5 w-2.5",children:[a.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"}),a.jsx("span",{className:"relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FBBF24]"})]}),a.jsx("span",{className:"text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#FCD34D]",children:"🛡️ Defending the throne"})]}):a.jsxs("div",{className:"mt-4 rounded-xl bg-[var(--surface-2)] border border-[var(--line)] overflow-hidden",children:[a.jsxs("div",{className:"race-lane podium-lane","aria-hidden":"true",children:[a.jsx("span",{className:"race-gate race-gate-finish"}),a.jsx("span",{className:"race-dashes"}),a.jsx("span",{className:"race-gate race-gate-start"}),a.jsx("span",{className:"podium-runner",children:a.jsx(q,{children:a.jsx("span",{className:"race-bob",style:{animationDuration:l===2?"0.4s":"0.7s"},children:l===2?"🐇":"🐢"})})})]}),a.jsx("div",{className:"text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--ink-3)] py-1.5",children:l===2?"🐇 sprinting for #1":"🐢 crawling for #2"})]}),a.jsxs("div",{className:`flex items-center justify-center gap-3 sm:gap-4 mt-4 ${u?"text-white":""}`,children:[a.jsxs("div",{children:[a.jsx("div",{className:`font-display font-extrabold ${u?"text-3xl text-[#FCD34D]":"text-2xl text-[var(--blaze)]"}`,children:Ne(o.amount)}),a.jsx("div",{className:`text-[10px] uppercase tracking-widest font-bold ${u?"text-white/60":"text-[var(--ink-3)]"}`,children:"spot value"})]}),a.jsx("div",{className:`w-px h-10 ${u?"bg-white/20":"bg-[var(--line)]"}`}),a.jsxs("div",{children:[a.jsx("div",{className:`font-display font-extrabold ${u?"text-3xl":"text-2xl"}`,children:Ye(o.views)}),a.jsx("div",{className:`text-[10px] uppercase tracking-widest font-bold ${u?"text-white/60":"text-[var(--ink-3)]"}`,children:"views"})]}),o.move?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:`w-px h-10 ${u?"bg-white/20":"bg-[var(--line)]"}`}),a.jsxs("div",{children:[a.jsx("div",{className:"font-display font-extrabold text-xl",children:a.jsx(bb,{move:o.move})}),a.jsx("div",{className:`text-[10px] uppercase tracking-widest font-bold ${u?"text-white/60":"text-[var(--ink-3)]"}`,children:"today"})]})]}):null]}),a.jsx("button",{onClick:()=>t(o),className:`${u?"btn-gold":"btn-ghost"} w-full py-3 mt-5 text-sm`,children:u?"⚡ Defend the crown":`⚔️ Challenge for #${l-1}`})]}),a.jsxs("div",{className:"relative mx-8 sm:mx-10",style:{height:u?96:l===2?62:46},"aria-hidden":"true",children:[a.jsx("div",{className:`absolute -top-2 left-2 right-2 h-2 rounded-t-md ${CC(l)}`}),a.jsxs("div",{className:`absolute inset-0 rounded-b-2xl border-x border-b overflow-hidden ${TC(l)}`,children:[a.jsx("div",{className:"absolute top-0 inset-x-0 h-1 bg-white/50"}),a.jsx("div",{className:"absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/25 to-transparent"}),a.jsx("div",{className:"absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-white/25 to-transparent"})]}),a.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:a.jsx(NC,{rank:l})}),a.jsx("div",{className:"absolute -bottom-3 left-4 right-4 h-3 bg-black/20 blur-md rounded-full"})]})]},o.slug)};return a.jsxs("div",{className:"relative",children:[a.jsx("div",{className:"absolute inset-x-0 -top-8 bottom-0 pointer-events-none","aria-hidden":"true",children:a.jsx("div",{className:"absolute left-1/2 -translate-x-1/2 top-0 w-[560px] h-[280px] bg-[var(--gold)]/15 blur-[100px] rounded-full"})}),a.jsxs("div",{className:"relative grid sm:grid-cols-3 gap-4 sm:gap-5 items-end max-w-4xl mx-auto pt-10",children:[i(s,2,"2nd · Silver","order-2 sm:order-1"),i(n,1,"Champion","order-1 sm:order-2"),i(r,3,"3rd · Bronze","order-3 sm:order-3")]}),a.jsx("p",{className:"text-center text-xs text-[var(--ink-3)] mt-6",children:"One dollar more than your rival steals their step. Ties go to whoever got there first."})]})}function NC({rank:e}){const t=e===1?"gold":e===2?"silver":"bronze",n=e===1?92:e===2?68:58,s=`sml-${t}`,r={gold:{stops:["#FFF7D6","#FCD34D","#D97706"],stem:"#B45309",num:"#7C2D12",sub:"#A16207"},silver:{stops:["#FFFFFF","#CBD5E1","#64748B"],stem:"#64748B",num:"#334155",sub:"#64748B"},bronze:{stops:["#FDEBD3","#DE9A52","#8A5A2B"],stem:"#8A5A2B",num:"#57300C",sub:"#8A5A2B"}}[t],i=60,o=62,l=37,c=39,d=y=>{const p=y*Math.PI/180;return[i+l*Math.cos(p),o+c*Math.sin(p)]},u=[{from:82,to:-40,sweep:0},{from:98,to:220,sweep:1}],h=8,m=[];return u.forEach(({from:y,to:p})=>{const b=Math.sign(p-y);for(let x=0;x<h;x++){const f=x/(h-1),g=y+(p-y)*f,v=g*Math.PI/180,[k,N]=d(g),T=b*-l*Math.sin(v),j=b*c*Math.cos(v),A=Math.atan2(j,T)*180/Math.PI+(x%2===0?34:-34),P=1-.32*f,$=k+5.5*Math.cos(A*Math.PI/180),Q=N+5.5*Math.sin(A*Math.PI/180);m.push(a.jsx("ellipse",{cx:$,cy:Q,rx:8*P,ry:3.1*P,transform:`rotate(${A.toFixed(1)} ${$.toFixed(1)} ${Q.toFixed(1)})`,fill:`url(#${s})`,opacity:.95},`${y}-${x}`))}}),a.jsxs("svg",{width:n,height:n*.92,viewBox:"0 0 120 110",style:{filter:"drop-shadow(0 4px 10px rgba(0,0,0,.35))"},"aria-hidden":"true",children:[a.jsx("defs",{children:a.jsxs("linearGradient",{id:s,x1:"0",y1:"0",x2:"0",y2:"1",children:[a.jsx("stop",{offset:"0%",stopColor:r.stops[0]}),a.jsx("stop",{offset:"48%",stopColor:r.stops[1]}),a.jsx("stop",{offset:"100%",stopColor:r.stops[2]})]})}),u.map(({from:y,to:p,sweep:b})=>{const[x,f]=d(y),[g,v]=d(p);return a.jsx("path",{d:`M ${x.toFixed(1)} ${f.toFixed(1)} A ${l} ${c} 0 0 ${b} ${g.toFixed(1)} ${v.toFixed(1)}`,fill:"none",stroke:r.stem,strokeWidth:2.5,strokeLinecap:"round",opacity:.85},y)}),m,a.jsx("circle",{cx:60,cy:100,r:3.6,fill:`url(#${s})`,stroke:r.stem,strokeWidth:1}),a.jsxs("g",{children:[a.jsx("polygon",{points:"47,30 47,19 54,25 60,14 66,25 73,19 73,30",fill:`url(#${s})`,stroke:r.stem,strokeWidth:1,strokeLinejoin:"round"}),a.jsx("circle",{cx:47,cy:17.5,r:2.1,fill:r.stops[0],stroke:r.stem,strokeWidth:.8}),a.jsx("circle",{cx:60,cy:12.5,r:2.4,fill:r.stops[0],stroke:r.stem,strokeWidth:.8}),a.jsx("circle",{cx:73,cy:17.5,r:2.1,fill:r.stops[0],stroke:r.stem,strokeWidth:.8})]}),a.jsx("text",{x:60,y:52,textAnchor:"middle",fontSize:8.5,fontWeight:800,letterSpacing:2.5,fill:r.sub,fontFamily:"'Inter', system-ui, sans-serif",children:"RANK"}),a.jsx("text",{x:60,y:82,textAnchor:"middle",fontSize:37,fontWeight:900,fill:r.num,fontFamily:"'Bricolage Grotesque', 'Inter', system-ui, sans-serif",children:e})]})}function TC(e){return e===1?"bg-gradient-to-b from-[#FCD34D] via-[#F59E0B] to-[#B45309] border-[#92400E]/40 shadow-[0_18px_40px_-12px_rgba(245,158,11,0.55)]":e===2?"bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-slate-400/50 shadow-[0_14px_30px_-12px_rgba(100,116,139,0.5)]":"bg-gradient-to-b from-[#EFB27A] via-[#C47F3D] to-[#8A5A24] border-[#6B4218]/50 shadow-[0_14px_30px_-12px_rgba(180,120,50,0.5)]"}function CC(e){return e===1?"bg-[#FDE68A] border border-[#92400E]/30":e===2?"bg-slate-100 border border-slate-400/40":"bg-[#F2C894] border border-[#6B4218]/40"}function AC({children:e,className:t="",style:n,radius:s=130,maxRotate:r=14,swayPx:i=10,speed:o=.0011,label:l}){const c=w.useRef(null);return w.useEffect(()=>{var b;const d=c.current;if(!d||(b=window.matchMedia)!=null&&b.call(window,"(prefers-reduced-motion: reduce)").matches)return;let u=!1,h=0,m=0;const y=x=>{const f=d.getBoundingClientRect(),g=f.left+f.width/2,v=f.top+f.height/2;u=Math.hypot(g-x.clientX,v-x.clientY)<s},p=x=>{if(h+=((u?1:0)-h)*.06,h>.01){const f=x*o,g=Math.sin(f)*r*h,v=Math.sin(f*.7+1)*i*h;d.style.transform=`translate3d(${v.toFixed(2)}px,0,0) rotate(${g.toFixed(2)}deg)`}else d.style.transform&&(d.style.transform="");m=requestAnimationFrame(p)};return window.addEventListener("mousemove",y,{passive:!0}),m=requestAnimationFrame(p),()=>{window.removeEventListener("mousemove",y),cancelAnimationFrame(m)}},[s,r,i,o]),a.jsx("span",{ref:c,className:`pointer-events-none inline-block will-change-transform ${t}`,style:n,"aria-hidden":l?void 0:!0,role:l?"img":void 0,"aria-label":l,children:e})}const J=Date.now(),et=36e5,Le=24*et,zs=[{slug:"startups",name:"Startups",icon:"🚀",blurb:"New companies racing for attention."},{slug:"business",name:"Business",icon:"🏢",blurb:"Companies and local businesses."},{slug:"creators",name:"Creators",icon:"🎨",blurb:"Independent artists, labels and storytellers."},{slug:"social",name:"Social Media Account",icon:"📱",blurb:"Instagram, TikTok, X pages and channels."},{slug:"personal",name:"Personal Brand",icon:"🧑‍🎤",blurb:"Your name, your face, your spotlight."},{slug:"meme",name:"Meme / Fun",icon:"🤣",blurb:"Jokes, memes and glorious nonsense."},{slug:"food-drink",name:"Food & Drink",icon:"🍵",blurb:"Coffee, snacks and sips worth discovering."},{slug:"gaming",name:"Gaming",icon:"🎮",blurb:"Indie studios and play-driven brands."},{slug:"productivity",name:"Productivity",icon:"🛠️",blurb:"Tools that make work and life click."},{slug:"lifestyle",name:"Lifestyle",icon:"🌿",blurb:"Home, beauty, fitness and everyday upgrades."},{slug:"fintech",name:"Fintech",icon:"💸",blurb:"Money tools people actually enjoy."},{slug:"media",name:"Media",icon:"🎙️",blurb:"Podcasts, books and communities of readers."}],EC={brewline:"food-drink",pixelforge:"gaming",nomaddesk:"productivity",lumennotes:"productivity",voltathletics:"lifestyle",casaverde:"lifestyle",orbitpay:"fintech",fernandfable:"media",snapchef:"food-drink",driftaudio:"creators",terratrails:"lifestyle",bloombox:"lifestyle",kernelpanic:"media",wanderlens:"creators",motomoto:"lifestyle",sipsociety:"food-drink",neonnoodles:"food-drink",pixelpaws:"creators",hustlehoney:"business",codechai:"media",gymbroskis:"lifestyle",memevault:"meme",swiftship:"startups",auraaesthetics:"lifestyle",podsquad:"media",fitfuel:"lifestyle",clipcraft:"creators",dogedeals:"meme"},xb=e=>(e==null?void 0:e.category)||EC[e==null?void 0:e.slug]||"startups",PC=e=>zs.find(t=>t.slug===e)||{slug:e,name:"Startups",icon:"🚀",blurb:""},Cp=[{slug:"brewline",seedMove:0,mark:"☕",name:"Brewline Coffee",tagline:"Specialty coffee, roasted weekly.",description:"Small-batch specialty coffee roasted every week and shipped fresh. Built by two baristas who got tired of stale beans.",website:"https://brewline.co",socials:{x:"https://x.com/brewline",instagram:"https://instagram.com/brewline"},amount:1240,clicks:8214,views:48210,joinedAt:J-21*Le,trend:[820,880,940,1010,1090,1150,1240]},{slug:"pixelforge",seedMove:3,mark:"🎮",name:"PixelForge",tagline:"Indie games with soul.",description:"A three-person indie game studio crafting pixel-art adventures. Our next release drops this winter.",website:"https://pixelforge.gg",socials:{x:"https://x.com/pixelforge",instagram:"https://instagram.com/pixelforge"},amount:980,clicks:6930,views:39180,joinedAt:J-19*Le,trend:[700,760,810,860,910,950,980]},{slug:"nomaddesk",seedMove:-1,mark:"💼",name:"Nomad Desk",tagline:"Gear for remote workers.",description:"Ergonomic, packable desk gear designed for people who work from anywhere. 40,000+ happy nomads.",website:"https://nomaddesk.co",socials:{x:"https://x.com/nomaddesk",instagram:"https://instagram.com/nomaddesk"},amount:862,clicks:5418,views:31240,joinedAt:J-17*Le,trend:[520,600,660,720,780,830,862]},{slug:"lumennotes",seedMove:2,mark:"📝",name:"Lumen Notes",tagline:"Your second brain, minus the chaos.",description:"An AI note-taking app that organizes itself. Capture everything, find anything, in milliseconds.",website:"https://lumennotes.app",socials:{x:"https://x.com/lumennotes"},amount:718,clicks:4980,views:28930,joinedAt:J-15*Le,trend:[380,450,510,580,640,690,718]},{slug:"voltathletics",seedMove:5,mark:"⚡",name:"Volt Athletics",tagline:"Run club energy, daily.",description:"A run club app with live leaderboards, city chapters, and races that actually feel electric.",website:"https://voltathletics.com",socials:{instagram:"https://instagram.com/voltathletics"},amount:644,clicks:4210,views:24680,joinedAt:J-14*Le,trend:[410,460,510,560,600,625,644]},{slug:"casaverde",seedMove:-2,mark:"🌿",name:"Casa Verde",tagline:"Plants, delivered thriving.",description:"Rare and easy-care plants delivered to your door with care guides that keep them alive.",website:"https://casaverde.shop",socials:{instagram:"https://instagram.com/casaverde"},amount:522,clicks:3860,views:21340,joinedAt:J-12*Le,trend:[300,350,400,450,480,505,522]},{slug:"orbitpay",seedMove:1,mark:"💳",name:"Orbit Pay",tagline:"Invoices freelancers love.",description:"Send beautiful invoices and get paid 2x faster. Built for freelancers, by freelancers.",website:"https://orbitpay.io",socials:{x:"https://x.com/orbitpay"},amount:481,clicks:3420,views:19870,joinedAt:J-11*Le,trend:[260,310,360,410,440,465,481]},{slug:"fernandfable",seedMove:4,mark:"📚",name:"Fern & Fable",tagline:"An indie bookstore for dreamers.",description:"Curated indie bookstore with monthly book boxes and a community of 12,000 readers.",website:"https://fernandfable.com",socials:{instagram:"https://instagram.com/fernandfable"},amount:409,clicks:2980,views:17420,joinedAt:J-10*Le,trend:[220,260,300,340,370,395,409]},{slug:"snapchef",seedMove:-3,mark:"🍳",name:"Snapchef",tagline:"Meal plans in 30 seconds.",description:"Snap a photo of your fridge, get a week of meals. AI planning that respects your taste.",website:"https://snapchef.app",socials:{x:"https://x.com/snapchef"},amount:377,clicks:2640,views:15230,joinedAt:J-9*Le,trend:[180,220,260,300,330,360,377]},{slug:"driftaudio",seedMove:2,mark:"🎧",name:"Drift Audio",tagline:"Lo-fi label, global community.",description:"Independent lo-fi label with 200+ artists. Beats to build, study, and drift to.",website:"https://driftaudio.fm",socials:{x:"https://x.com/driftaudio",instagram:"https://instagram.com/driftaudio"},amount:341,clicks:2310,views:13980,joinedAt:J-8*Le,trend:[150,190,230,270,300,325,341]},{slug:"terratrails",seedMove:0,mark:"🥾",name:"Terra Trails",tagline:"Find your next trail.",description:"A hiking community mapping 50,000+ trails with real photos and difficulty ratings.",website:"https://terratrails.org",socials:{instagram:"https://instagram.com/terratrails"},amount:292,clicks:1980,views:11540,joinedAt:J-7*Le,trend:[120,150,190,230,255,278,292]},{slug:"bloombox",seedMove:1,mark:"💄",name:"Bloombox",tagline:"Skincare that keeps it simple.",description:"Five products. Zero fluff. Dermatologist-approved skincare shipped monthly.",website:"https://bloombox.skin",socials:{instagram:"https://instagram.com/bloombox"},amount:251,clicks:1740,views:10230,joinedAt:J-6*Le,trend:[90,120,150,190,215,238,251]},{slug:"kernelpanic",seedMove:-2,mark:"🎙️",name:"Kernel Panic",tagline:"A dev podcast with teeth.",description:"Weekly deep-dives into software engineering, startups, and the occasional rant.",website:"https://kernelpanic.fm",socials:{x:"https://x.com/kernelpanicfm"},amount:214,clicks:1420,views:8640,joinedAt:J-5*Le,trend:[70,100,130,160,185,200,214]},{slug:"wanderlens",seedMove:3,mark:"📷",name:"Wander Lens",tagline:"Travel stories, shot on film.",description:"A travel creator documenting hidden places across 40 countries — all on film.",website:"https://wanderlens.co",socials:{x:"https://x.com/wanderlens",instagram:"https://instagram.com/wanderlens"},amount:183,clicks:1210,views:7320,joinedAt:J-4*Le,trend:[50,80,110,140,160,175,183]},{slug:"motomoto",seedMove:0,mark:"🚲",name:"Moto Moto",tagline:"E-bikes for the city.",description:"Affordable e-bike rentals in 12 cities. Grab, ride, return — no strings attached.",website:"https://motomoto.bike",socials:{instagram:"https://instagram.com/motomoto"},amount:152,clicks:980,views:5980,joinedAt:J-3*Le,trend:[40,65,90,115,130,145,152]},{slug:"sipsociety",seedMove:1,mark:"🍸",name:"Sip Society",tagline:"Mocktails worth talking about.",description:"A zero-proof bar crafting mocktails that rival any cocktail. Now bottling for home.",website:"https://sipsociety.bar",socials:{instagram:"https://instagram.com/sipsociety"},amount:118,clicks:760,views:4210,joinedAt:J-2*Le,trend:[25,45,65,85,100,110,118]},{slug:"neonnoodles",seedMove:4,mark:"🍜",name:"Neon Noodles",tagline:"Ramen at 2am, delivered loud.",description:"A late-night ramen spot with a cult following. Bold broth, neon vibes, zero regrets.",website:"https://neonnoodles.shop",socials:{instagram:"https://instagram.com/neonnoodles"},amount:106,clicks:690,views:3890,joinedAt:J-36*et,trend:[20,38,55,72,88,98,106]},{slug:"pixelpaws",seedMove:6,mark:"🐾",name:"Pixel Paws",tagline:"Pet portraits, pixelated.",description:"We turn your pets into glorious pixel art. 20,000+ portraits and counting.",website:"https://pixelpaws.art",socials:{x:"https://x.com/pixelpaws",instagram:"https://instagram.com/pixelpaws"},amount:95,clicks:640,views:3540,joinedAt:J-30*et,trend:[15,30,48,62,76,88,95]},{slug:"hustlehoney",seedMove:-1,mark:"🍯",name:"Hustle Honey",tagline:"Raw honey, real hustle.",description:"Small-batch raw honey from urban rooftops. Sweet, sustainable, and straight from the hive.",website:"https://hustlehoney.co",socials:{instagram:"https://instagram.com/hustlehoney"},amount:84,clicks:580,views:3120,joinedAt:J-26*et,trend:[30,42,55,64,72,79,84]},{slug:"codechai",seedMove:3,mark:"☕",name:"Code & Chai",tagline:"A dev newsletter with flavor.",description:"Weekly coding wisdom served with desi chai energy. Read by 45,000 developers.",website:"https://codechai.dev",socials:{x:"https://x.com/codechai"},amount:73,clicks:510,views:2870,joinedAt:J-22*et,trend:[12,25,38,50,60,68,73]},{slug:"gymbroskis",seedMove:2,mark:"💪",name:"Gym Broskis",tagline:"Lift heavy, laugh harder.",description:"A fitness meme page turned coaching brand. 500K followers strong and growing.",website:"https://gymbroskis.fit",socials:{instagram:"https://instagram.com/gymbroskis"},amount:66,clicks:460,views:2540,joinedAt:J-20*et,trend:[10,22,34,46,55,61,66]},{slug:"memevault",seedMove:5,mark:"🗿",name:"Meme Vault",tagline:"Certified dank, daily.",description:"The internet’s freshest meme vault. New drops every day, zero stale memes.",website:"https://memevault.lol",socials:{x:"https://x.com/memevault",instagram:"https://instagram.com/memevault"},amount:58,clicks:410,views:2280,joinedAt:J-18*et,trend:[8,18,28,38,47,53,58]},{slug:"swiftship",seedMove:1,mark:"📦",name:"SwiftShip",tagline:"Ship it before lunch.",description:"Launch your MVP in a weekend with our starter kits. Loved by indie hackers.",website:"https://swiftship.dev",socials:{x:"https://x.com/swiftship"},amount:51,clicks:370,views:2010,joinedAt:J-16*et,trend:[10,18,27,35,42,47,51]},{slug:"auraaesthetics",seedMove:0,mark:"✨",name:"Aura Aesthetics",tagline:"Glow up, scientifically.",description:"Skin science made simple. Personalized routines backed by dermatologists.",website:"https://auraaesthetics.skin",socials:{instagram:"https://instagram.com/auraaesthetics"},amount:43,clicks:320,views:1780,joinedAt:J-14*et,trend:[6,14,22,30,36,40,43]},{slug:"podsquad",seedMove:2,mark:"🎙️",name:"PodSquad",tagline:"Podcasts for the group chat.",description:"Three friends, one mic, zero filter. Weekly episodes on culture and chaos.",website:"https://podsquad.fm",socials:{x:"https://x.com/podsquad",instagram:"https://instagram.com/podsquad"},amount:35,clicks:280,views:1520,joinedAt:J-12*et,trend:[5,11,17,24,29,32,35]},{slug:"fitfuel",seedMove:-2,mark:"🥤",name:"FitFuel",tagline:"Fuel your grind.",description:"Clean pre-workout without the jitters. Natural caffeine, real fruit flavors.",website:"https://fitfuel.nutrition",socials:{instagram:"https://instagram.com/fitfuel"},amount:27,clicks:230,views:1240,joinedAt:J-10*et,trend:[4,9,14,19,23,25,27]},{slug:"clipcraft",seedMove:3,mark:"🎬",name:"ClipCraft",tagline:"Viral clips in one tap.",description:"Turn long videos into viral shorts automatically. Creators grow 10x faster.",website:"https://clipcraft.ai",socials:{x:"https://x.com/clipcraft",instagram:"https://instagram.com/clipcraft"},amount:18,clicks:180,views:960,joinedAt:J-8*et,trend:[2,6,10,13,15,17,18]},{slug:"dogedeals",seedMove:7,mark:"🐶",name:"Doge Deals",tagline:"Much deals. Very wow.",description:"The meme-iest deals page on the internet. Discounts so good they should be illegal.",website:"https://dogedeals.lol",socials:{x:"https://x.com/dogedeals"},amount:9,clicks:140,views:720,joinedAt:J-5*et,trend:[1,2,4,6,7,8,9]}],ur=[{slug:"top-spot",name:"Top Spot Holder",desc:"Currently sitting at #1 on the leaderboard.",icon:"👑",check:e=>{var t;return(t=e[0])==null?void 0:t.slug}},{slug:"weekly-champion",name:"Weekly Champion",desc:"Top-ranked spot over the last 7 days.",icon:"🏆",check:e=>{var t;return(t=e[0])==null?void 0:t.slug}},{slug:"fastest-climber",name:"Fastest Climber",desc:"Biggest rank jump in the last 24 hours.",icon:"🚀",check:e=>{var t;return(t=e[3])==null?void 0:t.slug}},{slug:"most-shared",name:"Most Shared",desc:"Most referral clicks this week.",icon:"📣",check:e=>{var t;return(t=e[1])==null?void 0:t.slug}},{slug:"community-favorite",name:"Community Favorite",desc:"Most profile views in the last 7 days.",icon:"❤️",check:e=>{var t;return(t=e[2])==null?void 0:t.slug}},{slug:"early-adopter",name:"Early Adopter",desc:"One of the first 100 spots ever claimed.",icon:"⚡",check:()=>"brewline"},{slug:"meme-lord",name:"Meme Lord",desc:"The funniest spot on the board — crowned by the community.",icon:"😂",check:e=>{var t;return(t=e[4])==null?void 0:t.slug}},{slug:"comeback-king",name:"Comeback King",desc:"Stormed back into the top 10 after dropping out.",icon:"🔥",check:e=>{var t;return(t=e[5])==null?void 0:t.slug}},{slug:"crowd-puller",name:"Crowd Puller",desc:"Pulled the most new visitors in the last 24 hours.",icon:"👀",check:e=>{var t;return(t=e[6])==null?void 0:t.slug}},{slug:"diamond-hands",name:"Diamond Hands",desc:"Held a top-3 rank for 7 days straight. Unshakeable.",icon:"💎",check:e=>{var t;return(t=e[1])==null?void 0:t.slug}},{slug:"night-owl",name:"Night Owl",desc:"Biggest overnight climb while everyone was sleeping.",icon:"🦉",check:e=>{var t;return(t=e[7])==null?void 0:t.slug}}],kb=[{q:"What is FlexSpot.LOL?",blog:"what-is-bid-for-attention-marketing",a:"FlexSpot is the internet's public spotlight competition. Anyone can claim a public spot starting from $1, get a shareable profile page, and climb a live leaderboard. The more buzz your spot gets, the higher it ranks — and the more eyes land on you."},{q:"How does ranking work?",blog:"how-boosting-moves-you-up-the-leaderboard",a:"Ranking is simple and transparent: spots are ordered by total verified boosts. Every dollar of buzz moves you up. When you pass someone, you take their rank — live, in front of everyone."},{q:"What can I promote?",a:"Almost anything: your personal brand, company, website, social profile, startup, creator page, product, event, or community. If it has a link, it can have a spot."},{q:"Do I need an account to claim a spot?",blog:"getting-started-with-flexspot",a:"No. Claiming takes under a minute: enter your details, choose your boost starting at $1, and complete payment. To update your spot details later, contact our team at support@flexspot.lol."},{q:"How do payments work right now?",a:"We're in Phase 1: after claiming, you complete payment manually and our team verifies it — usually within a few hours. Automatic payment processing is coming soon."},{q:"How do referrals work?",blog:"referral-marketing",a:"Every spot has a personal referral link (flexspot.lol/s/your-brand?ref=YOUR-CODE) — create yours with just your name, no signup. Share it anywhere: Facebook, Telegram, WhatsApp. Every visit through your link automatically adds $1 to that brand’s total (counted once per friend per day), and your name climbs the Top Referrers board and the brand’s Top Supporters list."},{q:"Can I boost a spot I like?",blog:"how-boosting-moves-you-up-the-leaderboard",a:"Yes! Anyone can contribute to any spot to push it higher. It's the fastest way to help a friend — or a brand you love — reach #1."},{q:"Is there a fee?",a:"Claiming starts at $1 and 100% of your boost counts toward your ranking. There are no hidden fees to join or appear on the leaderboard."}],Yi=[["Nova Studio","just claimed a spot"],["Atlas Coffee","boosted to #4"],["Pixel Press","just claimed a spot"],["June Rivera","boosted to #7"],["Orbit Labs","just claimed a spot"],["Mango & Co","boosted to #3"],["Theo Marchetti","just claimed a spot"],["Lumen Studio","boosted to #9"]],Yr="flexspot_local_spots_v2",sn="flexspot_submissions_v2",Wc="flexspot_local_clicks",Ap="flexspot_local_refs",Jn="flexspot_local_boosts",jb="flexspot_rank_snapshot",Sb="flexspot_cms_v2",RC="flexspot_analytics_v2",Vc="flexspot_visits_v2",z=(e,t)=>{try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}},ve=(e,t)=>{try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}},FC=(e,t)=>{if(!ve(e,t))throw new Error("Could not save — your browser storage is full or blocked. Free up space and try again.")};async function DC(){const e=z(Yr,[]).filter(l=>!l.pending),t=z(Jn,{}),n=z(Wc,{}),s=l=>({...l,amount:l.amount+(t[l.slug]||0),clicks:l.clicks+(n[l.slug]||0)}),r=new Set([...Cp,...e].map(l=>l.slug)),i=[];for(const l of z(sn,[]))l.status!=="pending"||l.isBoost||!l.slug||r.has(l.slug)||(r.add(l.slug),i.push({id:"pending-"+l.id,slug:l.slug,name:l.brandName,tagline:l.tagline||"",description:l.description||"",logo:l.logo||null,website:l.website||"",socials:l.socials||{},amount:Number(l.amount)||0,category:l.category||"startups",clicks:0,views:0,joinedAt:l.createdAt||Date.now(),trend:[Number(l.amount)||0],pending:!0}));const o=[...Cp.map(s),...e.map(s),...i];return zC(ca(o))}function MC(){const t=z(sn,[]).filter(s=>s.status==="pending"),n=z("flexspot_local_spots",[]).filter(s=>s.pending);return[...t,...n]}function BC(){return z(sn,[])}function IC(e){const t={id:"sub-"+Date.now().toString(36),slug:e.slug,brandName:e.name,tagline:e.tagline||"",description:e.description||"",logo:e.logo||null,website:e.website||"",socials:e.socials||{},email:e.email||"",amount:Number(e.amount)||1,category:e.category||"startups",paymentMethod:e.paymentMethod||"",paymentTxId:e.paymentTxId||"",paymentScreenshot:e.paymentScreenshot||null,status:"pending",adminNotes:[],fraudFlags:[],history:[{at:Date.now(),event:"submitted"}],createdAt:Date.now(),reviewedAt:null,isBoost:!!e.isBoost,boostSlug:e.boostSlug||null,contributorName:e.contributorName||"",contributorHandle:e.contributorHandle||""},n=z(sn,[]);return FC(sn,[t,...n]),t}function Fu(e){return z(sn,[]).find(t=>t.id===e)}function Du(e,t){const s=z(sn,[]).map(r=>{if(r.id!==e)return r;const{history:i,...o}=t;return{...r,...o,history:i!==void 0?i:r.history||[]}});return ve(sn,s),s.find(r=>r.id===e)}function LC(e,t){if(!t)return;const n=Fu(e);n&&Du(e,{adminNotes:[...n.adminNotes||[],{at:Date.now(),text:t}]})}function $C(e,t){if(!t)return;const n=Fu(e);if(!n)return;const s=[...n.fraudFlags||[]];s.includes(t)||s.push(t),Du(e,{fraudFlags:s})}function _C(e,t,n){const s=Fu(e);if(!s)return null;const r=[...s.history||[],{at:Date.now(),event:"decision",decision:t,note:n||""}],i={status:t,reviewedAt:Date.now(),history:r};n&&(i.adminNotes=[...s.adminNotes||[],{at:Date.now(),text:n}]);const o=Du(e,i);if(t==="approved")if(s.isBoost&&s.boostSlug){const l=z(Jn,{});l[s.boostSlug]=(l[s.boostSlug]||0)+s.amount,ve(Jn,l)}else{const l=z(Yr,[]),c={id:"local-"+s.id,slug:s.slug,name:s.brandName,tagline:s.tagline,description:s.description,website:s.website,socials:s.socials,logo:s.logo,amount:s.amount,category:s.category||"startups",clicks:0,views:1,joinedAt:Date.now(),trend:[s.amount],pending:!1,email:s.email,approvedAt:Date.now()};l.some(d=>d.slug===s.slug)||ve(Yr,[c,...l])}return o}function ca(e){return[...e].sort((n,s)=>s.amount-n.amount||(n.joinedAt||0)-(s.joinedAt||0)).map((n,s)=>({...n,rank:s+1}))}function gl(e,t,n){const s=Math.max(0,Math.round(Number(n||0)*100)/100),r=(e||[]).map(l=>l.slug===t?{...l,amount:(l.amount||0)+s}:{...l}),i=ca(r),o=i.findIndex(l=>l.slug===t);return o<0?{rank:i.length+1,above:i[i.length-1]||null}:{rank:o+1,above:o>0?i[o-1]:null}}function OC({name:e,tagline:t,description:n,website:s,socials:r,logo:i,email:o,amount:l,category:c}){const d=slugify(e)+"-"+Math.random().toString(36).slice(2,6),u={id:"manual-"+Date.now().toString(36),slug:d,name:String(e||"Unnamed").trim().slice(0,60),tagline:String(t||"").trim().slice(0,100)||"On FlexSpot.LOL",description:String(n||"").trim().slice(0,1e3),website:s||"",socials:r||{},logo:i||null,email:o||"",amount:Math.max(1,Math.round(Number(l||1)*100)/100),category:c||"startups",clicks:0,views:1,joinedAt:Date.now(),trend:[Number(l||1)],pending:!1,manual:!0,approvedAt:Date.now()},h=z(Yr,[]);return ve(Yr,[u,...h]),u}function zC(e){let t={};try{t=JSON.parse(localStorage.getItem(jb))||{}}catch{}const n=Object.keys(t).length===0,s=e.map(r=>{let i=0;return n?i=r.seedMove||0:t[r.slug]!==void 0&&(i=t[r.slug]-r.rank),{...r,move:i}});return Nb(e),s}function Nb(e){try{const t={};e.forEach(n=>{t[n.slug]=n.rank}),localStorage.setItem(jb,JSON.stringify(t))}catch{}}function WC(e,t){return(t||[]).find(n=>n.slug===e)}function VC(e){const t=z(Wc,{});t[e]=(t[e]||0)+1,ve(Wc,t)}function Tb(e){const t=z(Ap,{});t[e]=t[e]||{clicks:0,joined:0},t[e].clicks+=1,ve(Ap,t)}const Zn="flexspot_ref_identities_v1",Nn="flexspot_ref_stats_v1",Ep="flexspot_ref_counted_v1",Uc="flexspot_my_refs_v1",Pp="flexspot_ref_seed_v1",Rp="flexspot_ref_events_v1",Fp=()=>Math.random().toString(36).slice(2,6).toUpperCase().replace(/[^A-Z0-9]/g,"X").padEnd(4,"X").slice(0,4);function UC(e,t){const n=String(t||"").trim().slice(0,30);if(!n||!e)return null;const s=z(Zn,{}),r=z(Uc,{});if(r[e]){const c=s[r[e]];if(c&&c.name.toLowerCase()===n.toLowerCase())return r[e]}const i=String(e).toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,4).padEnd(4,"X");let o=`FS-${i}-${Fp()}`;for(;s[o];)o=`FS-${i}-${Fp()}`;s[o]={name:n,spotSlug:e,createdAt:Date.now()},ve(Zn,s);const l=z(Nn,{});return l[o]=l[o]||{visits:0,earned:0},ve(Nn,l),r[e]=o,ve(Uc,r),o}function HC(e){return e&&z(Zn,{})[String(e).toUpperCase()]||null}function qC(e){return e&&z(Uc,{})[e]||null}function YC(e,t){const n=HC(e);if(!n||n.spotSlug!==t)return{ok:!1};const s=new Date,r=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`,i=z(Ep,{}),o=`${String(e).toUpperCase()}:${r}`;if(Tb(String(e).toUpperCase()),i[o])return{ok:!0,already:!0,name:n.name};i[o]=!0,ve(Ep,i);const l=z(Jn,{});l[t]=(l[t]||0)+1,ve(Jn,l);const c=z(Nn,{}),d=c[String(e).toUpperCase()]||{visits:0,earned:0};d.visits+=1,d.earned+=1,c[String(e).toUpperCase()]=d,ve(Nn,c);const u=z(Rp,[]);return u.push({code:String(e).toUpperCase(),spotSlug:t,at:Date.now(),amount:1,kind:"visit_reward"}),ve(Rp,u.slice(-300)),{ok:!0,name:n.name,earned:1}}function Dp(e,t=5){Mu();const n=z(Zn,{}),s=z(Nn,{});return Object.entries(n).filter(([,r])=>r.spotSlug===e).map(([r,i])=>({code:r,name:i.name,...s[r]||{visits:0,earned:0}})).sort((r,i)=>i.earned-r.earned||i.visits-r.visits).slice(0,t)}function GC(e=8){Mu();const t=z(Zn,{}),n=z(Nn,{});return Object.entries(t).map(([s,r])=>({code:s,name:r.name,spotSlug:r.spotSlug,...n[s]||{visits:0,earned:0}})).sort((s,r)=>r.earned-s.earned||r.visits-s.visits).slice(0,e)}const KC=[{name:"Ahmed R.",slug:"brewline",visits:14,earned:14},{name:"CryptoMama",slug:"brewline",visits:9,earned:9},{name:"DXB Hustle",slug:"pixelforge",visits:11,earned:11},{name:"Lena W.",slug:"nomaddesk",visits:7,earned:7},{name:"Sara K.",slug:"lumennotes",visits:6,earned:6},{name:"Omar F.",slug:"voltathletics",visits:5,earned:5}];function Mu(){try{if(localStorage.getItem(Pp)!==null)return;const e=z(Zn,{}),t=z(Nn,{}),n=z(Jn,{});KC.forEach((s,r)=>{const i=`FS-${s.slug.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,4).padEnd(4,"X")}-D${String(r).padStart(3,"0")}`;e[i]||(e[i]={name:s.name,spotSlug:s.slug,createdAt:Date.now()-(r+1)*864e5,demo:!0}),t[i]={visits:s.visits,earned:s.earned},n[s.slug]=(n[s.slug]||0)+s.earned}),ve(Zn,e),ve(Nn,t),ve(Jn,n),localStorage.setItem(Pp,"1")}catch{}}Mu();const Gr="flexspot_contributions_v2",QC={brewline:[{name:"Sara K.",handle:"@sara.brews",amount:50,at:Date.now()-2*36e5,demo:!0},{name:"Caffeine Club",handle:"caffeineclub.co",amount:25,at:Date.now()-26*36e5,demo:!0},{name:"Mike D.",handle:"@mike_dxb",amount:10,at:Date.now()-3*864e5,demo:!0}],pixelforge:[{name:"Aisha R.",handle:"@aisha.plays",amount:30,at:Date.now()-5*36e5,demo:!0},{name:"Retro Gamers",handle:"discord.gg/retro",amount:15,at:Date.now()-2*864e5,demo:!0}],lumennotes:[{name:"June Rivera",handle:"@june.rivera",amount:20,at:Date.now()-8*36e5,demo:!0},{name:"Note Nerds",handle:"@notenerds",amount:5,at:Date.now()-4*864e5,demo:!0}],voltathletics:[{name:"Omar F.",handle:"RunDXB crew",amount:12,at:Date.now()-12*36e5,demo:!0}],nomaddesk:[{name:"Lena W.",handle:"@lena.works",amount:18,at:Date.now()-30*36e5,demo:!0},{name:"Remote OK",handle:"remoteok.com",amount:8,at:Date.now()-5*864e5,demo:!0}]};function Cb(){try{if(localStorage.getItem(Gr)!==null)return;ve(Gr,QC)}catch{}}function XC(e){return Cb(),(z(Gr,{})[e]||[]).slice().sort((n,s)=>(s.at||0)-(n.at||0))}function JC(e,{name:t,handle:n,amount:s}){if(!e)return null;Cb();const r=z(Gr,{}),i={name:String(t).slice(0,40),handle:String(n||"").slice(0,40),amount:Math.max(1,Math.round(Number(s||1)*100)/100),at:Date.now()};return r[e]=[...r[e]||[],i].slice(-60),ve(Gr,r),i}const ZC={heroHeadline:"BIG BRAND VISIBILITY. START FROM JUST $1.",heroSub:"Claim your spotlight, climb the rankings, drive real traffic, and become part of a community that supports great brands.",announcement:"",rewardsText:"",minAmount:1,featuredSlugs:[],faq:[{q:"How does FlexSpot work?",a:"Claim a spot, land on the leaderboard instantly with a pending badge, then get verified as your payment clears and climb."},{q:"How long does approval take?",a:"Most submissions are reviewed within 24 hours."}]};function Ab(){return{...ZC,...z(Sb,{})}}function eA(e){const t={...Ab(),...e};return ve(Sb,t),t}function tA(e,{source:t="direct",country:n="—"}={}){if(typeof window>"u")return;const s=z(Vc,[]);s.push({at:Date.now(),path:e,source:t,country:n}),ve(Vc,s.slice(-2e3))}function nA(e){const t=z(Vc,[]),n=z(RC,{clicksBySlug:{},totalClicks:0}),s=z(sn,[]),r={},i={},o={};t.forEach(d=>{r[d.path]=(r[d.path]||0)+1,i[d.source]=(i[d.source]||0)+1,o[d.country]=(o[d.country]||0)+1});const l=[...e||[]].sort((d,u)=>(u.views||0)-(d.views||0)).slice(0,5).map(d=>({slug:d.slug,name:d.name,views:d.views||0,clicks:d.clicks||0})),c=(d,u=5)=>Object.entries(d).sort((h,m)=>m[1]-h[1]).slice(0,u).map(([h,m])=>({k:h,v:m}));return{preview:!0,totalVisits:t.length,totalClicks:n.totalClicks,claimedSpots:(e||[]).length,conversionRate:t.length?Math.round(s.length/t.length*1e3)/10:0,byPath:c(r),bySource:c(i),byCountry:c(o),topBrands:l}}function Eb(e){return e===0?"bg-[#F59E0B]/20 text-[#B45309] border-[#F59E0B]/50":e===1?"bg-slate-400/20 text-slate-500 border-slate-400/40":e===2?"bg-[#C47F3D]/20 text-[#9A5B22] border-[#C47F3D]/50":"bg-[var(--surface-2)] text-[var(--ink-2)] border-[var(--line)]"}function Mp({r:e,rank:t,spot:n,featured:s}){return a.jsxs("div",{className:`rounded-2xl border border-[var(--line)] bg-[var(--surface)] flex items-center gap-3 text-left ${s?"px-4 py-3.5 sm:px-5":"px-3.5 py-2.5"}`,children:[a.jsx("div",{className:`grid place-items-center w-8 h-8 rounded-xl font-black text-xs shrink-0 border ${Eb(t)}`,children:t+1}),a.jsxs("div",{className:"min-w-0 flex-1",children:[a.jsx("div",{className:`font-extrabold text-[var(--ink)] truncate ${s?"text-lg":"text-sm"}`,children:e.name}),a.jsxs("div",{className:"text-[11px] text-[var(--ink-3)] truncate",children:["backing ",n?a.jsx(_,{to:`/s/${n.slug}`,className:"font-bold text-[var(--ink-2)] hover:underline",children:n.name}):e.spotSlug]})]}),a.jsxs("div",{className:"text-right shrink-0",children:[a.jsxs("div",{className:`font-display font-black text-[#B45309] ${s?"text-xl":"text-sm"}`,children:["+",Ne(e.earned)]}),a.jsxs("div",{className:"text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]",children:[e.visits," visits"]})]})]})}function sA({spots:e}){const t=GC(10);if(!t.length)return null;const n=Object.fromEntries((e||[]).map(l=>[l.slug,l])),[s,...r]=t,i=[r.slice(0,2),r.slice(2,4)].filter(l=>l.length),o=r.slice(4);return a.jsxs("section",{className:"max-w-7xl mx-auto px-4 sm:px-6 pb-16",children:[a.jsxs("div",{className:"text-center mb-6",children:[a.jsx("h2",{className:"font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)]",children:"🏆 Top referrers"}),a.jsxs("p",{className:"text-[var(--ink-2)] mt-2 text-sm max-w-xl mx-auto",children:["They bring the crowd — every visit through their link adds"," ",a.jsx("b",{className:"text-[var(--ink)]",children:"$1"})," to the brand they back. No signup needed, just a visit."]})]}),a.jsxs("div",{className:"max-w-3xl mx-auto space-y-3",children:[a.jsx(Mp,{r:s,rank:0,spot:n[s.spotSlug],featured:!0}),i.map((l,c)=>a.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:l.map((d,u)=>a.jsx(Mp,{r:d,rank:1+c*2+u,spot:n[d.spotSlug]},d.code))},c)),o.length>0&&a.jsx("div",{className:"rounded-2xl border border-[var(--line)] bg-[var(--surface)] divide-y divide-[var(--line-soft)] overflow-hidden",children:o.map((l,c)=>{const d=n[l.spotSlug],u=5+c;return a.jsxs("div",{className:"flex items-center gap-3 px-3.5 py-2 text-left",children:[a.jsx("div",{className:`grid place-items-center w-7 h-7 rounded-lg font-black text-[11px] shrink-0 border ${Eb(u)}`,children:u+1}),a.jsxs("div",{className:"min-w-0 flex-1",children:[a.jsx("span",{className:"font-bold text-[13px] text-[var(--ink)] truncate",children:l.name}),a.jsxs("span",{className:"text-[11px] text-[var(--ink-3)] truncate",children:[" ","· backing ",d?a.jsx(_,{to:`/s/${d.slug}`,className:"font-bold text-[var(--ink-2)] hover:underline",children:d.name}):l.spotSlug]})]}),a.jsxs("div",{className:"text-[11px] font-bold text-[var(--ink-3)] shrink-0",children:[l.visits," visits"]}),a.jsxs("div",{className:"font-display font-black text-[13px] text-[#B45309] shrink-0 w-16 text-right",children:["+",Ne(l.earned)]})]},l.code)})})]})]})}function Pb({post:e}){return a.jsxs(_,{to:e.url,className:"card card-lift p-6 flex flex-col gap-3 group h-full",children:[a.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[a.jsx("span",{className:"text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--blaze)] bg-[var(--blaze)]/10 border border-[var(--blaze)]/25 rounded-full px-3 py-1",children:e.category}),e.pillar&&a.jsx("span",{className:"text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/25 rounded-full px-3 py-1",children:"📌 Pillar guide"}),e.sample&&a.jsx("span",{className:"text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--ink-3)] bg-[var(--surface-2)] border border-[var(--line)] rounded-full px-3 py-1",children:"Sample"})]}),a.jsx("h3",{className:"font-display font-bold text-lg text-[var(--ink)] leading-snug group-hover:text-[var(--blaze)] transition-colors",children:e.title}),a.jsx("p",{className:"text-sm text-[var(--ink-2)] leading-relaxed line-clamp-3 flex-1",children:e.description}),a.jsxs("div",{className:"flex items-center gap-3 text-xs text-[var(--ink-3)] font-semibold",children:[a.jsx("span",{children:mC(e.date)}),a.jsx("span",{"aria-hidden":"true",children:"·"}),a.jsxs("span",{children:[e.readingTime," min read"]}),a.jsx("span",{"aria-hidden":"true",children:"·"}),a.jsx("span",{className:"truncate",children:e.author})]})]})}const rA=1603;function aA({viewers:e,totalVolume:t,brandCount:n}){const s=[{icon:"🟢",value:a.jsx(Hi,{to:e??0,format:r=>Math.round(r).toString()}),label:"online now"},{icon:"💰",value:a.jsx(a.Fragment,{children:Ne(t)}),label:"total volume"},{icon:"⚡",value:a.jsx(Hi,{to:n,format:r=>Math.round(r).toString()}),label:"brands live"}];return a.jsxs("div",{className:"flex flex-col items-center px-4",children:[a.jsx("p",{className:"text-center text-[11px] font-bold tracking-[0.18em] uppercase text-[var(--ink-3)] mb-3",children:"Real brands. Real bids. Live now."}),a.jsx("div",{className:"inline-flex flex-wrap justify-center items-center gap-x-5 gap-y-2 sm:gap-8 bg-[var(--surface)]/90 backdrop-blur border border-[var(--line)] rounded-3xl min-[420px]:rounded-full px-4 min-[420px]:pl-5 min-[420px]:pr-6 sm:pl-6 sm:pr-8 py-2.5 shadow-[var(--shadow-card)] max-w-full",children:s.map((r,i)=>a.jsxs("div",{className:"flex items-center gap-2.5",children:[i>0&&a.jsx("span",{className:"w-px h-6 bg-[var(--line)] -ml-2.5 sm:-ml-4","aria-hidden":"true"}),a.jsx(q,{children:a.jsx("span",{className:"text-base block",children:r.icon})}),a.jsxs("div",{className:"leading-tight",children:[a.jsx("div",{className:"font-display font-extrabold text-[15px] text-[var(--ink)]",children:r.value}),a.jsx("div",{className:"text-[10px] font-semibold text-[var(--ink-3)] uppercase tracking-wider",children:r.label})]})]},r.label))})]})}function iA(){const[e,t]=w.useState(0);w.useEffect(()=>{const r=setInterval(()=>t(i=>(i+1)%Yi.length),4e3);return()=>clearInterval(r)},[]);const[n,s]=Yi[e];return a.jsxs("div",{className:"flex items-center gap-2.5 text-sm",children:[a.jsx("span",{className:"live-dot shrink-0"}),a.jsx(ia,{mode:"wait",children:a.jsxs(G.span,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},className:"text-[var(--ink-2)]",children:[a.jsx("b",{className:"text-[var(--ink)]",children:n})," ",s]},e)})]})}const oA="/flexspot/hero-king.jpg";function lA({leader:e,onClaim:t}){return a.jsxs("div",{className:"relative rounded-[32px] overflow-hidden champion-stage shadow-[var(--shadow-lift)]",children:[a.jsx("div",{className:"stage-rays","aria-hidden":"true"}),a.jsx("div",{className:"stage-particles","aria-hidden":"true",children:["12%","32%","58%","76%","88%"].map((n,s)=>a.jsx("span",{className:"stage-particle",style:{left:n,animationDelay:`${-s*1.7}s`,animationDuration:`${5+s}s`}},s))}),a.jsxs("div",{className:"relative",children:[a.jsx("img",{src:oA,alt:"The FlexSpot frog king defending his golden throne",className:"w-full h-52 min-[420px]:h-60 sm:h-72 object-cover",loading:"eager"}),a.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15","aria-hidden":"true"}),a.jsx("div",{className:"hero-dancer-wrap absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 pointer-events-none flex flex-col items-center",children:a.jsx(AC,{children:a.jsxs("span",{className:"flex flex-col items-center",children:[a.jsx("span",{className:"mb-1 inline-flex items-center gap-1 bg-[#12B76A]/25 backdrop-blur border border-[#12B76A]/50 rounded-full px-2.5 py-1 text-[9px] sm:text-[10px] font-extrabold text-[#34D399] uppercase tracking-wider shadow-[0_4px_14px_-4px_rgba(18,183,106,0.8)]",children:"▲ trending now"}),a.jsx("img",{src:"/flexspot/hero-dancer.webp",alt:"","aria-hidden":"true",className:"hero-dancer w-20 min-[420px]:w-24 sm:w-28 lg:w-32 drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]",loading:"eager"})]})})}),a.jsx("div",{className:"absolute top-4 left-4",children:a.jsxs("div",{className:"inline-flex items-center gap-2 bg-black/70 backdrop-blur-md text-[#FBBF24] border border-[#F59E0B]/60 font-black text-[11px] sm:text-xs uppercase tracking-[0.2em] rounded-full px-5 py-2 shadow-[0_8px_24px_-6px_rgba(245,158,11,0.7)]",children:[a.jsx("span",{children:"👑"})," Reigning champion ",a.jsx("span",{children:"👑"})]})}),a.jsxs("div",{className:"absolute bottom-3.5 left-4 bg-white/10 backdrop-blur border border-white/25 rounded-2xl px-3 py-2 text-center anim-floaty",children:[a.jsx("div",{className:"text-[10px] font-bold text-white/60 uppercase tracking-wider",children:"#1 spot"}),a.jsx("div",{className:"text-sm font-extrabold text-white truncate max-w-[130px]",children:(e==null?void 0:e.name)??"—"})]})]}),a.jsxs("div",{className:"relative p-6 sm:p-8 pt-5 pb-14 sm:pb-16",children:[e&&a.jsxs(_,{to:`/s/${e.slug}`,className:"group relative block rounded-3xl border-2 border-[#FBBF24] bg-gradient-to-br from-[#7C3AED]/30 via-white/[0.07] to-[#F59E0B]/20 backdrop-blur-md p-4 sm:p-5 overflow-hidden hover:border-[#FCD34D] transition-colors shadow-[0_0_44px_-8px_rgba(251,191,36,0.55)]",children:[a.jsx("div",{className:"podium-shine","aria-hidden":"true"}),a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsx(Ot,{spot:e,size:64,ring:!0}),a.jsxs("div",{className:"min-w-0 flex-1",children:[a.jsx("div",{className:"text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FCD34D]",children:"Champion of the internet"}),a.jsx("div",{className:"font-display font-extrabold text-xl sm:text-2xl text-white truncate group-hover:underline",children:e.name}),a.jsx("div",{className:"text-sm text-white/60 truncate",children:e.tagline})]}),a.jsxs("div",{className:"text-right shrink-0",children:[a.jsx("div",{className:"font-display font-black text-2xl sm:text-3xl text-[#FCD34D]",children:Ne(e.amount)}),a.jsx("div",{className:"text-[10px] uppercase tracking-widest text-white/50 font-bold",children:"spot value"}),a.jsxs("div",{className:"text-xs font-bold text-white/70 mt-1",children:["👁 ",Ye(e.views)," views"]})]})]})]}),a.jsxs("button",{onClick:t,className:"btn-gold w-full py-4 mt-4 text-base font-extrabold",children:[a.jsx("span",{"aria-hidden":"true",children:"⚔️"})," ",a.jsx("span",{className:"shine-text-btn",children:"Steal the crown — from just $1"})]}),a.jsx("p",{className:"text-center text-white/50 text-xs mt-2.5",children:"One dollar more than the champ takes their throne."})]})]})}function cA({leader:e,onClaim:t}){return a.jsxs("div",{className:"relative",children:[a.jsx(lA,{leader:e,onClaim:t}),a.jsxs("div",{className:"relative z-10 -mt-10 mx-4 sm:mx-10 bg-[var(--surface)]/95 backdrop-blur border border-[var(--line)] rounded-3xl shadow-[var(--shadow-lift)] p-5",children:[a.jsxs("div",{className:"flex items-center justify-between gap-3",children:[a.jsxs("div",{children:[a.jsx("div",{className:"text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink-3)]",children:"Manual approval · crypto only"}),a.jsx("div",{className:"font-display font-extrabold text-lg text-[var(--ink)] mt-0.5",children:a.jsx("span",{className:"sheen-light",children:"Claim Your Spot From $1"})})]}),a.jsx(q,{children:a.jsx("span",{className:"text-3xl shrink-0 block",children:"🎟️"})})]}),a.jsxs("ul",{className:"text-[13px] text-[var(--ink-2)] mt-3 grid grid-cols-1 sm:grid-cols-3 gap-1.5",children:[a.jsxs("li",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"text-[#12B76A]",children:"✓"})," Name, pic & story"]}),a.jsxs("li",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"text-[#12B76A]",children:"✓"})," USDT payment proof"]}),a.jsxs("li",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"text-[#12B76A]",children:"✓"})," Live after approval"]})]}),a.jsx("button",{onClick:t,className:"btn-primary w-full py-3 mt-4 text-sm",children:"Start From $1 →"})]})]})}const dA=[{id:"all",label:"All Brands"},{id:"gainers",label:"Top Gainers"},{id:"newest",label:"Newest"}];function uA({spots:e,onBoost:t,onClaim:n}){const[s,r]=w.useState("all"),{race:i,count:o}=wb(),c=w.useMemo(()=>{const d=[...e];return s==="gainers"?d.sort((u,h)=>(h.move||0)-(u.move||0)):s==="newest"?d.sort((u,h)=>(h.joinedAt||0)-(u.joinedAt||0)):d.sort((u,h)=>h.amount-u.amount||(u.joinedAt||0)-(h.joinedAt||0)),d},[e,s]).map((d,u)=>({...d,rank:u+1,displayRank:u+1}));return a.jsxs("section",{className:"relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20",children:[a.jsx(Eu,{items:[{emoji:"🏁",left:"1%",top:"6%",size:30,cls:"hidden lg:block",opacity:.5},{emoji:"🐇",left:"96%",top:"12%",size:28,cls:"hidden lg:block",opacity:.5},{emoji:"🐢",left:"2%",top:"48%",size:30,cls:"hidden lg:block",opacity:.45},{emoji:"⚡",left:"95%",top:"58%",size:26,cls:"hidden lg:block",opacity:.45},{emoji:"🍿",left:"3%",top:"86%",size:26,cls:"hidden lg:block",opacity:.4},{emoji:"🥇",left:"94%",top:"88%",size:28,cls:"hidden lg:block",opacity:.4}]}),a.jsxs("div",{className:"text-center mb-8 relative",children:[a.jsx("h2",{className:"font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)]",children:"🏆 Live Leaderboard"}),a.jsxs("p",{className:"text-[var(--ink-2)] mt-2 flex items-center justify-center gap-2 text-sm",children:[a.jsx("span",{className:"live-dot"})," Updates every few seconds · highest amount wins · ties go to whoever got there first"]}),a.jsx("div",{className:"flex justify-center gap-2 mt-6 flex-wrap",children:dA.map(d=>a.jsx("button",{onClick:()=>r(d.id),className:`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${s===d.id?"bg-[var(--ink)] text-[var(--bg)] shadow-[var(--shadow-card)]":"bg-[var(--surface)] text-[var(--ink-2)] border border-[var(--line)] hover:border-[var(--ink-3)]"}`,children:d.label},d.id))})]}),a.jsx(Ru,{spots:c.slice(0,3),onBoost:t}),a.jsxs("div",{className:"mt-8",children:[a.jsxs("div",{className:"flex items-center justify-between mb-3 px-1",children:[a.jsx("span",{className:"font-display font-bold text-xl text-[var(--ink)]",children:"🔥 The chase pack"}),a.jsx(_,{to:"/leaderboard",className:"text-sm font-bold text-[var(--blaze)] hover:underline",children:"Full board →"})]}),a.jsx("p",{className:"hidden md:block text-[11px] text-[var(--ink-3)] px-1 mb-2","aria-hidden":"true",children:"🎯 Psst — the racers are shy. Try catching one with your cursor."}),a.jsx("div",{className:"space-y-2.5",children:a.jsx(ia,{initial:!1,children:c.slice(3,10).map(d=>a.jsx(la,{spot:d,move:d.move,onBoost:t,race:i,count:o},d.slug))})})]}),a.jsx("div",{className:"text-center mt-8",children:a.jsx("button",{onClick:n,className:"btn-primary px-8 py-4 text-base",children:"⚡ Only $1 away from the board — claim yours"})})]})}function hA(){const e=[{icon:"👥",chip:"bg-[var(--blaze-soft)]",num:89,suffix:"K",decimals:0,label:"all-time visitors"},{icon:"👁️",chip:"bg-[var(--blue-soft)]",num:4.2,suffix:"M",decimals:1,label:"profile views"},{icon:"⚡",chip:"bg-[var(--gold-soft)]",num:100,suffix:"+",decimals:0,label:"brands featured"},{icon:"🌎",chip:"bg-[var(--green-soft)]",text:"Global",label:"community worldwide"}];return a.jsx("section",{className:"border-y border-[var(--line-soft)] bg-[var(--surface-2)]/60",children:a.jsx("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",children:e.map(t=>a.jsxs("div",{className:"card card-lift rounded-3xl p-5 flex items-center gap-4",children:[a.jsx("span",{className:`grid place-items-center w-13 h-13 sm:w-14 sm:h-14 rounded-2xl text-2xl sm:text-[28px] shrink-0 ${t.chip}`,style:{width:56,height:56},children:t.icon}),a.jsxs("div",{className:"leading-tight min-w-0",children:[a.jsxs("div",{className:"font-display font-black text-[26px] sm:text-3xl text-[var(--ink)] tracking-tight",children:[t.text??a.jsx(Hi,{to:t.num,format:n=>n.toFixed(t.decimals)}),!t.text&&a.jsx("span",{className:"grad-text",children:t.suffix})]}),a.jsx("div",{className:"text-[11px] font-bold text-[var(--ink-3)] uppercase tracking-[0.12em] mt-0.5",children:t.label})]})]},t.label))})})}const mA=[{icon:"⚡",label:"Live Leaderboard"},{icon:"👥",label:"Real People"},{icon:"📊",label:"Brand Exposure"},{icon:"🌎",label:"Open To Everyone"}];function pA({spots:e,onClaim:t,onBoost:n,viewers:s}){const r=w.useMemo(()=>rA+e.reduce((o,l)=>o+l.amount,0),[e]),i=w.useMemo(()=>[...e].sort((o,l)=>l.amount-o.amount||(o.joinedAt||0)-(l.joinedAt||0))[0],[e]);return a.jsxs("div",{className:"pt-[92px]",children:[a.jsxs("section",{className:"relative overflow-hidden",children:[a.jsx(Eu,{items:[{emoji:"🚀",left:"2%",top:"12%",size:30,cls:"hidden lg:block"},{emoji:"💰",left:"94%",top:"8%",size:26,cls:"hidden lg:block",opacity:.45},{emoji:"🔥",left:"46%",top:"4%",size:24,opacity:.4},{emoji:"👑",left:"90%",top:"72%",size:30,cls:"hidden lg:block",opacity:.4},{emoji:"😂",left:"3%",top:"78%",size:26,cls:"hidden lg:block",opacity:.35},{emoji:"💎",left:"52%",top:"88%",size:22,opacity:.4}]}),a.jsx("div",{className:"blob w-[420px] h-[420px] bg-[#F59E0B]/15 -top-20 -left-32"}),a.jsx("div",{className:"blob w-[380px] h-[380px] bg-[#F59E0B]/15 top-40 right-[-120px]",style:{animationDelay:"-6s"}}),a.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center relative",children:[a.jsxs("div",{children:[a.jsxs("div",{className:"inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--line)] rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[var(--ink-2)] mb-5 shadow-[var(--shadow-card)]",children:[a.jsx("span",{className:"live-dot"})," BRANDS COMPETE. THE INTERNET WINS."]}),a.jsxs("h1",{className:"font-display font-extrabold text-[38px] min-[400px]:text-[44px] sm:text-6xl lg:text-[72px] leading-[1.02] tracking-tight text-balance",children:[a.jsx("span",{className:"block sheen-light pb-1",children:"BIG BRAND VISIBILITY."}),a.jsx("span",{className:"block grad-text-anim pb-2",children:"START FROM JUST $1."})]}),a.jsxs("p",{className:"text-[var(--ink-2)] text-base sm:text-lg mt-4 max-w-lg leading-relaxed",children:["Anyone can boost any brand with ",a.jsx("b",{className:"text-[var(--ink)]",children:"$1"})," — your name lands on their page, and the highest total takes the crown. 👑"]}),a.jsxs("div",{className:"flex flex-col sm:flex-row gap-3 mt-7",children:[a.jsx("button",{onClick:t,className:"btn-primary px-8 py-4 text-base",children:"Start From $1 →"}),a.jsx(_,{to:"/how-it-works",className:"btn-ghost px-8 py-4 text-base text-center",children:"How It Works"})]}),a.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7 max-w-lg",children:mA.map(o=>a.jsxs("div",{className:"flex items-center gap-2 bg-[var(--surface)] border border-[var(--line)] rounded-2xl px-3 py-2.5 shadow-[var(--shadow-card)]",children:[a.jsx(q,{children:a.jsx("span",{className:"text-xl block",children:o.icon})}),a.jsx("span",{className:"text-xs font-bold text-[var(--ink)] leading-tight",children:o.label})]},o.label))}),a.jsxs("div",{className:"mt-7 max-w-md space-y-3",children:[a.jsx(Pu,{}),a.jsx(iA,{}),a.jsx("p",{className:"text-[11px] text-[var(--ink-3)]",children:"Preview data — demo brands shown for illustration only."})]})]}),a.jsx("div",{className:"pb-2",children:a.jsx(cA,{leader:i,onClaim:t})})]})]}),a.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 -mt-4 pb-2",children:a.jsx(aA,{viewers:s,totalVolume:r,brandCount:e.length})}),a.jsx(uA,{spots:e,onBoost:n,onClaim:t}),a.jsx(sA,{spots:e}),a.jsx(hA,{}),a.jsxs("section",{className:"max-w-7xl mx-auto px-4 sm:px-6 py-14",children:[a.jsxs("div",{className:"text-center mb-10",children:[a.jsxs("h2",{className:"font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)]",children:["From unknown to ",a.jsx("span",{className:"grad-text",children:"unmissable."})]}),a.jsx("p",{className:"text-[var(--ink-2)] mt-3 max-w-xl mx-auto",children:"Anyone can claim a public spotlight on FlexSpot. Four steps and your brand is on the board."})]}),a.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-4 gap-4",children:[{icon:"👁️",tint:"from-[#7C3AED] to-[#4F46E5]",t:"More Visibility",d:"Your brand sits on a public leaderboard the internet actually watches."},{icon:"🚀",tint:"from-[#2E7CF6] to-[#1B5FD0]",t:"More Traffic",d:"Real visitors click through to your website every day."},{icon:"🤝",tint:"from-[#12B76A] to-[#0E9F5D]",t:"Community Support",d:"Fans and customers boost the brands they love up the ranks."},{icon:"🏆",tint:"from-[#F59E0B] to-[#D97706]",t:"Public Recognition",d:"Winners get the crown, the spotlight, and the bragging rights."}].map(o=>a.jsxs("div",{className:"card card-lift p-6 text-center",children:[a.jsx("div",{className:`mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br ${o.tint} grid place-items-center text-[28px] shadow-[var(--shadow-lift)] mb-4`,children:o.icon}),a.jsx("h3",{className:"font-display font-bold text-lg text-[var(--ink)]",children:o.t}),a.jsx("p",{className:"text-sm text-[var(--ink-2)] mt-2 leading-relaxed",children:o.d})]},o.t))}),a.jsx("div",{className:"text-center mt-8",children:a.jsx("button",{onClick:t,className:"btn-primary px-8 py-4 text-base",children:"Start From $1 →"})})]}),Xn.length>0&&a.jsxs("section",{className:"max-w-7xl mx-auto px-4 sm:px-6 py-14",children:[a.jsxs("div",{className:"flex items-end justify-between gap-4 mb-8",children:[a.jsxs("div",{children:[a.jsxs("h2",{className:"font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)]",children:["From the ",a.jsx("span",{className:"grad-text",children:"blog"})]}),a.jsx("p",{className:"text-[var(--ink-2)] mt-2 max-w-xl",children:"Playbooks for getting seen — bidding tactics, marketing guides, and winner stories."})]}),a.jsx(_,{to:"/blog",className:"btn-ghost px-5 py-2.5 text-sm shrink-0 hidden sm:inline-block",children:"All articles →"})]}),a.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-3 gap-4",children:Xn.slice(0,3).map(o=>a.jsx(Pb,{post:o},o.slug))}),a.jsx("div",{className:"text-center mt-6 sm:hidden",children:a.jsx(_,{to:"/blog",className:"btn-ghost px-6 py-3 text-sm",children:"All articles →"})})]}),a.jsx("section",{className:"max-w-7xl mx-auto px-4 sm:px-6 pb-20",children:a.jsxs("div",{className:"relative overflow-hidden rounded-[32px] p-8 sm:p-14 text-center text-white shadow-[var(--shadow-blaze)]",style:{background:"radial-gradient(1200px 500px at 50% -10%, #7C3AED 0%, #4C1D95 45%, #1E1B4B 100%)"},children:[a.jsx("div",{className:"absolute inset-0 opacity-[0.15]","aria-hidden":"true",style:{backgroundImage:"radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",backgroundSize:"26px 26px"}}),a.jsx("div",{className:"absolute -top-24 left-1/4 w-72 h-72 bg-[#F59E0B]/25 rounded-full blur-3xl","aria-hidden":"true"}),a.jsx("div",{className:"absolute -bottom-24 right-1/4 w-72 h-72 bg-[#7C3AED]/40 rounded-full blur-3xl","aria-hidden":"true"}),a.jsxs("div",{className:"relative",children:[a.jsx(q,{className:"absolute left-[8%] top-6 hidden sm:block",children:a.jsx("span",{className:"anim-floaty block text-4xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]",children:"✨"})}),a.jsx(q,{className:"absolute right-[10%] top-16 hidden sm:block",children:a.jsx("span",{className:"anim-floaty block text-4xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]",style:{animationDelay:"-1.4s"},children:"👑"})}),a.jsx(q,{className:"absolute left-[14%] bottom-16 hidden sm:block",children:a.jsx("span",{className:"anim-floaty block text-4xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]",style:{animationDelay:"-2.2s"},children:"⚡"})}),a.jsx(q,{className:"absolute right-[7%] bottom-8 hidden sm:block",children:a.jsx("span",{className:"anim-floaty block text-4xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]",style:{animationDelay:"-0.8s"},children:"✨"})}),a.jsxs("div",{className:"relative inline-block mb-5",children:[a.jsx("div",{className:"absolute -inset-5 bg-[#F59E0B]/40 blur-2xl rounded-full","aria-hidden":"true"}),a.jsx(q,{children:a.jsx("div",{className:"relative text-7xl sm:text-8xl anim-floaty drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]",children:"👑"})})]}),a.jsxs("div",{className:"inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-[11px] font-extrabold tracking-[0.18em] text-[#FCD34D] mb-5",children:[a.jsx("span",{className:"live-dot"})," THE #1 SPOT IS UP FOR GRABS"]}),a.jsxs("h2",{className:"font-display font-extrabold text-3xl sm:text-5xl leading-tight",children:["The crown is waiting.",a.jsx("br",{}),a.jsx("span",{className:"shine-text",children:"Take the spotlight."})]}),a.jsx("p",{className:"text-white/85 mt-4 max-w-lg mx-auto",children:"Every day, thousands of visitors browse the FlexSpot leaderboard. Your brand could be the one they remember."}),a.jsx("button",{onClick:t,className:"btn-gold mt-8 px-10 py-4 rounded-full text-base font-extrabold shadow-[var(--shadow-gold)] hover:-translate-y-0.5 transition-transform",children:"⚡ Claim Your Spot From $1"}),a.jsxs("div",{className:"flex items-center justify-center gap-4 sm:gap-6 mt-5 text-[11px] font-bold text-white/70 uppercase tracking-wider flex-wrap",children:[a.jsx("span",{children:"✓ No account needed"}),a.jsx("span",{children:"✓ USDT · from $1"}),a.jsx("span",{children:"✓ Live after approval"})]})]})]})})]})}var fA=Object.defineProperty,Gi=Object.getOwnPropertySymbols,Rb=Object.prototype.hasOwnProperty,Fb=Object.prototype.propertyIsEnumerable,Bp=(e,t,n)=>t in e?fA(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Hc=(e,t)=>{for(var n in t||(t={}))Rb.call(t,n)&&Bp(e,n,t[n]);if(Gi)for(var n of Gi(t))Fb.call(t,n)&&Bp(e,n,t[n]);return e},qc=(e,t)=>{var n={};for(var s in e)Rb.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(e!=null&&Gi)for(var s of Gi(e))t.indexOf(s)<0&&Fb.call(e,s)&&(n[s]=e[s]);return n};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var es;(e=>{const t=class V{constructor(c,d,u,h){if(this.version=c,this.errorCorrectionLevel=d,this.modules=[],this.isFunction=[],c<V.MIN_VERSION||c>V.MAX_VERSION)throw new RangeError("Version value out of range");if(h<-1||h>7)throw new RangeError("Mask value out of range");this.size=c*4+17;let m=[];for(let p=0;p<this.size;p++)m.push(!1);for(let p=0;p<this.size;p++)this.modules.push(m.slice()),this.isFunction.push(m.slice());this.drawFunctionPatterns();const y=this.addEccAndInterleave(u);if(this.drawCodewords(y),h==-1){let p=1e9;for(let b=0;b<8;b++){this.applyMask(b),this.drawFormatBits(b);const x=this.getPenaltyScore();x<p&&(h=b,p=x),this.applyMask(b)}}r(0<=h&&h<=7),this.mask=h,this.applyMask(h),this.drawFormatBits(h),this.isFunction=[]}static encodeText(c,d){const u=e.QrSegment.makeSegments(c);return V.encodeSegments(u,d)}static encodeBinary(c,d){const u=e.QrSegment.makeBytes(c);return V.encodeSegments([u],d)}static encodeSegments(c,d,u=1,h=40,m=-1,y=!0){if(!(V.MIN_VERSION<=u&&u<=h&&h<=V.MAX_VERSION)||m<-1||m>7)throw new RangeError("Invalid value");let p,b;for(p=u;;p++){const v=V.getNumDataCodewords(p,d)*8,k=o.getTotalBits(c,p);if(k<=v){b=k;break}if(p>=h)throw new RangeError("Data too long")}for(const v of[V.Ecc.MEDIUM,V.Ecc.QUARTILE,V.Ecc.HIGH])y&&b<=V.getNumDataCodewords(p,v)*8&&(d=v);let x=[];for(const v of c){n(v.mode.modeBits,4,x),n(v.numChars,v.mode.numCharCountBits(p),x);for(const k of v.getData())x.push(k)}r(x.length==b);const f=V.getNumDataCodewords(p,d)*8;r(x.length<=f),n(0,Math.min(4,f-x.length),x),n(0,(8-x.length%8)%8,x),r(x.length%8==0);for(let v=236;x.length<f;v^=253)n(v,8,x);let g=[];for(;g.length*8<x.length;)g.push(0);return x.forEach((v,k)=>g[k>>>3]|=v<<7-(k&7)),new V(p,d,g,m)}getModule(c,d){return 0<=c&&c<this.size&&0<=d&&d<this.size&&this.modules[d][c]}getModules(){return this.modules}drawFunctionPatterns(){for(let u=0;u<this.size;u++)this.setFunctionModule(6,u,u%2==0),this.setFunctionModule(u,6,u%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const c=this.getAlignmentPatternPositions(),d=c.length;for(let u=0;u<d;u++)for(let h=0;h<d;h++)u==0&&h==0||u==0&&h==d-1||u==d-1&&h==0||this.drawAlignmentPattern(c[u],c[h]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(c){const d=this.errorCorrectionLevel.formatBits<<3|c;let u=d;for(let m=0;m<10;m++)u=u<<1^(u>>>9)*1335;const h=(d<<10|u)^21522;r(h>>>15==0);for(let m=0;m<=5;m++)this.setFunctionModule(8,m,s(h,m));this.setFunctionModule(8,7,s(h,6)),this.setFunctionModule(8,8,s(h,7)),this.setFunctionModule(7,8,s(h,8));for(let m=9;m<15;m++)this.setFunctionModule(14-m,8,s(h,m));for(let m=0;m<8;m++)this.setFunctionModule(this.size-1-m,8,s(h,m));for(let m=8;m<15;m++)this.setFunctionModule(8,this.size-15+m,s(h,m));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let c=this.version;for(let u=0;u<12;u++)c=c<<1^(c>>>11)*7973;const d=this.version<<12|c;r(d>>>18==0);for(let u=0;u<18;u++){const h=s(d,u),m=this.size-11+u%3,y=Math.floor(u/3);this.setFunctionModule(m,y,h),this.setFunctionModule(y,m,h)}}drawFinderPattern(c,d){for(let u=-4;u<=4;u++)for(let h=-4;h<=4;h++){const m=Math.max(Math.abs(h),Math.abs(u)),y=c+h,p=d+u;0<=y&&y<this.size&&0<=p&&p<this.size&&this.setFunctionModule(y,p,m!=2&&m!=4)}}drawAlignmentPattern(c,d){for(let u=-2;u<=2;u++)for(let h=-2;h<=2;h++)this.setFunctionModule(c+h,d+u,Math.max(Math.abs(h),Math.abs(u))!=1)}setFunctionModule(c,d,u){this.modules[d][c]=u,this.isFunction[d][c]=!0}addEccAndInterleave(c){const d=this.version,u=this.errorCorrectionLevel;if(c.length!=V.getNumDataCodewords(d,u))throw new RangeError("Invalid argument");const h=V.NUM_ERROR_CORRECTION_BLOCKS[u.ordinal][d],m=V.ECC_CODEWORDS_PER_BLOCK[u.ordinal][d],y=Math.floor(V.getNumRawDataModules(d)/8),p=h-y%h,b=Math.floor(y/h);let x=[];const f=V.reedSolomonComputeDivisor(m);for(let v=0,k=0;v<h;v++){let N=c.slice(k,k+b-m+(v<p?0:1));k+=N.length;const T=V.reedSolomonComputeRemainder(N,f);v<p&&N.push(0),x.push(N.concat(T))}let g=[];for(let v=0;v<x[0].length;v++)x.forEach((k,N)=>{(v!=b-m||N>=p)&&g.push(k[v])});return r(g.length==y),g}drawCodewords(c){if(c.length!=Math.floor(V.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let d=0;for(let u=this.size-1;u>=1;u-=2){u==6&&(u=5);for(let h=0;h<this.size;h++)for(let m=0;m<2;m++){const y=u-m,b=(u+1&2)==0?this.size-1-h:h;!this.isFunction[b][y]&&d<c.length*8&&(this.modules[b][y]=s(c[d>>>3],7-(d&7)),d++)}}r(d==c.length*8)}applyMask(c){if(c<0||c>7)throw new RangeError("Mask value out of range");for(let d=0;d<this.size;d++)for(let u=0;u<this.size;u++){let h;switch(c){case 0:h=(u+d)%2==0;break;case 1:h=d%2==0;break;case 2:h=u%3==0;break;case 3:h=(u+d)%3==0;break;case 4:h=(Math.floor(u/3)+Math.floor(d/2))%2==0;break;case 5:h=u*d%2+u*d%3==0;break;case 6:h=(u*d%2+u*d%3)%2==0;break;case 7:h=((u+d)%2+u*d%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[d][u]&&h&&(this.modules[d][u]=!this.modules[d][u])}}getPenaltyScore(){let c=0;for(let m=0;m<this.size;m++){let y=!1,p=0,b=[0,0,0,0,0,0,0];for(let x=0;x<this.size;x++)this.modules[m][x]==y?(p++,p==5?c+=V.PENALTY_N1:p>5&&c++):(this.finderPenaltyAddHistory(p,b),y||(c+=this.finderPenaltyCountPatterns(b)*V.PENALTY_N3),y=this.modules[m][x],p=1);c+=this.finderPenaltyTerminateAndCount(y,p,b)*V.PENALTY_N3}for(let m=0;m<this.size;m++){let y=!1,p=0,b=[0,0,0,0,0,0,0];for(let x=0;x<this.size;x++)this.modules[x][m]==y?(p++,p==5?c+=V.PENALTY_N1:p>5&&c++):(this.finderPenaltyAddHistory(p,b),y||(c+=this.finderPenaltyCountPatterns(b)*V.PENALTY_N3),y=this.modules[x][m],p=1);c+=this.finderPenaltyTerminateAndCount(y,p,b)*V.PENALTY_N3}for(let m=0;m<this.size-1;m++)for(let y=0;y<this.size-1;y++){const p=this.modules[m][y];p==this.modules[m][y+1]&&p==this.modules[m+1][y]&&p==this.modules[m+1][y+1]&&(c+=V.PENALTY_N2)}let d=0;for(const m of this.modules)d=m.reduce((y,p)=>y+(p?1:0),d);const u=this.size*this.size,h=Math.ceil(Math.abs(d*20-u*10)/u)-1;return r(0<=h&&h<=9),c+=h*V.PENALTY_N4,r(0<=c&&c<=2568888),c}getAlignmentPatternPositions(){if(this.version==1)return[];{const c=Math.floor(this.version/7)+2,d=this.version==32?26:Math.ceil((this.version*4+4)/(c*2-2))*2;let u=[6];for(let h=this.size-7;u.length<c;h-=d)u.splice(1,0,h);return u}}static getNumRawDataModules(c){if(c<V.MIN_VERSION||c>V.MAX_VERSION)throw new RangeError("Version number out of range");let d=(16*c+128)*c+64;if(c>=2){const u=Math.floor(c/7)+2;d-=(25*u-10)*u-55,c>=7&&(d-=36)}return r(208<=d&&d<=29648),d}static getNumDataCodewords(c,d){return Math.floor(V.getNumRawDataModules(c)/8)-V.ECC_CODEWORDS_PER_BLOCK[d.ordinal][c]*V.NUM_ERROR_CORRECTION_BLOCKS[d.ordinal][c]}static reedSolomonComputeDivisor(c){if(c<1||c>255)throw new RangeError("Degree out of range");let d=[];for(let h=0;h<c-1;h++)d.push(0);d.push(1);let u=1;for(let h=0;h<c;h++){for(let m=0;m<d.length;m++)d[m]=V.reedSolomonMultiply(d[m],u),m+1<d.length&&(d[m]^=d[m+1]);u=V.reedSolomonMultiply(u,2)}return d}static reedSolomonComputeRemainder(c,d){let u=d.map(h=>0);for(const h of c){const m=h^u.shift();u.push(0),d.forEach((y,p)=>u[p]^=V.reedSolomonMultiply(y,m))}return u}static reedSolomonMultiply(c,d){if(c>>>8||d>>>8)throw new RangeError("Byte out of range");let u=0;for(let h=7;h>=0;h--)u=u<<1^(u>>>7)*285,u^=(d>>>h&1)*c;return r(u>>>8==0),u}finderPenaltyCountPatterns(c){const d=c[1];r(d<=this.size*3);const u=d>0&&c[2]==d&&c[3]==d*3&&c[4]==d&&c[5]==d;return(u&&c[0]>=d*4&&c[6]>=d?1:0)+(u&&c[6]>=d*4&&c[0]>=d?1:0)}finderPenaltyTerminateAndCount(c,d,u){return c&&(this.finderPenaltyAddHistory(d,u),d=0),d+=this.size,this.finderPenaltyAddHistory(d,u),this.finderPenaltyCountPatterns(u)}finderPenaltyAddHistory(c,d){d[0]==0&&(c+=this.size),d.pop(),d.unshift(c)}};t.MIN_VERSION=1,t.MAX_VERSION=40,t.PENALTY_N1=3,t.PENALTY_N2=3,t.PENALTY_N3=40,t.PENALTY_N4=10,t.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],t.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],e.QrCode=t;function n(l,c,d){if(c<0||c>31||l>>>c)throw new RangeError("Value out of range");for(let u=c-1;u>=0;u--)d.push(l>>>u&1)}function s(l,c){return(l>>>c&1)!=0}function r(l){if(!l)throw new Error("Assertion error")}const i=class pe{constructor(c,d,u){if(this.mode=c,this.numChars=d,this.bitData=u,d<0)throw new RangeError("Invalid argument");this.bitData=u.slice()}static makeBytes(c){let d=[];for(const u of c)n(u,8,d);return new pe(pe.Mode.BYTE,c.length,d)}static makeNumeric(c){if(!pe.isNumeric(c))throw new RangeError("String contains non-numeric characters");let d=[];for(let u=0;u<c.length;){const h=Math.min(c.length-u,3);n(parseInt(c.substring(u,u+h),10),h*3+1,d),u+=h}return new pe(pe.Mode.NUMERIC,c.length,d)}static makeAlphanumeric(c){if(!pe.isAlphanumeric(c))throw new RangeError("String contains unencodable characters in alphanumeric mode");let d=[],u;for(u=0;u+2<=c.length;u+=2){let h=pe.ALPHANUMERIC_CHARSET.indexOf(c.charAt(u))*45;h+=pe.ALPHANUMERIC_CHARSET.indexOf(c.charAt(u+1)),n(h,11,d)}return u<c.length&&n(pe.ALPHANUMERIC_CHARSET.indexOf(c.charAt(u)),6,d),new pe(pe.Mode.ALPHANUMERIC,c.length,d)}static makeSegments(c){return c==""?[]:pe.isNumeric(c)?[pe.makeNumeric(c)]:pe.isAlphanumeric(c)?[pe.makeAlphanumeric(c)]:[pe.makeBytes(pe.toUtf8ByteArray(c))]}static makeEci(c){let d=[];if(c<0)throw new RangeError("ECI assignment value out of range");if(c<128)n(c,8,d);else if(c<16384)n(2,2,d),n(c,14,d);else if(c<1e6)n(6,3,d),n(c,21,d);else throw new RangeError("ECI assignment value out of range");return new pe(pe.Mode.ECI,0,d)}static isNumeric(c){return pe.NUMERIC_REGEX.test(c)}static isAlphanumeric(c){return pe.ALPHANUMERIC_REGEX.test(c)}getData(){return this.bitData.slice()}static getTotalBits(c,d){let u=0;for(const h of c){const m=h.mode.numCharCountBits(d);if(h.numChars>=1<<m)return 1/0;u+=4+m+h.bitData.length}return u}static toUtf8ByteArray(c){c=encodeURI(c);let d=[];for(let u=0;u<c.length;u++)c.charAt(u)!="%"?d.push(c.charCodeAt(u)):(d.push(parseInt(c.substring(u+1,u+3),16)),u+=2);return d}};i.NUMERIC_REGEX=/^[0-9]*$/,i.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,i.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let o=i;e.QrSegment=i})(es||(es={}));(e=>{(t=>{const n=class{constructor(r,i){this.ordinal=r,this.formatBits=i}};n.LOW=new n(0,1),n.MEDIUM=new n(1,0),n.QUARTILE=new n(2,3),n.HIGH=new n(3,2),t.Ecc=n})(e.QrCode||(e.QrCode={}))})(es||(es={}));(e=>{(t=>{const n=class{constructor(r,i){this.modeBits=r,this.numBitsCharCount=i}numCharCountBits(r){return this.numBitsCharCount[Math.floor((r+7)/17)]}};n.NUMERIC=new n(1,[10,12,14]),n.ALPHANUMERIC=new n(2,[9,11,13]),n.BYTE=new n(4,[8,16,16]),n.KANJI=new n(8,[8,10,12]),n.ECI=new n(7,[0,0,0]),t.Mode=n})(e.QrSegment||(e.QrSegment={}))})(es||(es={}));var js=es;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var gA={L:js.QrCode.Ecc.LOW,M:js.QrCode.Ecc.MEDIUM,Q:js.QrCode.Ecc.QUARTILE,H:js.QrCode.Ecc.HIGH},Db=128,Mb="L",Bb="#FFFFFF",Ib="#000000",Lb=!1,$b=1,yA=4,vA=0,bA=.1;function _b(e,t=0){const n=[];return e.forEach(function(s,r){let i=null;s.forEach(function(o,l){if(!o&&i!==null){n.push(`M${i+t} ${r+t}h${l-i}v1H${i+t}z`),i=null;return}if(l===s.length-1){if(!o)return;i===null?n.push(`M${l+t},${r+t} h1v1H${l+t}z`):n.push(`M${i+t},${r+t} h${l+1-i}v1H${i+t}z`);return}o&&i===null&&(i=l)})}),n.join("")}function Ob(e,t){return e.slice().map((n,s)=>s<t.y||s>=t.y+t.h?n:n.map((r,i)=>i<t.x||i>=t.x+t.w?r:!1))}function wA(e,t,n,s){if(s==null)return null;const r=e.length+n*2,i=Math.floor(t*bA),o=r/t,l=(s.width||i)*o,c=(s.height||i)*o,d=s.x==null?e.length/2-l/2:s.x*o,u=s.y==null?e.length/2-c/2:s.y*o,h=s.opacity==null?1:s.opacity;let m=null;if(s.excavate){let p=Math.floor(d),b=Math.floor(u),x=Math.ceil(l+d-p),f=Math.ceil(c+u-b);m={x:p,y:b,w:x,h:f}}const y=s.crossOrigin;return{x:d,y:u,h:c,w:l,excavation:m,opacity:h,crossOrigin:y}}function xA(e,t){return t!=null?Math.max(Math.floor(t),0):e?yA:vA}function zb({value:e,level:t,minVersion:n,includeMargin:s,marginSize:r,imageSettings:i,size:o,boostLevel:l}){let c=re.useMemo(()=>{const p=(Array.isArray(e)?e:[e]).reduce((b,x)=>(b.push(...js.QrSegment.makeSegments(x)),b),[]);return js.QrCode.encodeSegments(p,gA[t],n,void 0,void 0,l)},[e,t,n,l]);const{cells:d,margin:u,numCells:h,calculatedImageSettings:m}=re.useMemo(()=>{let y=c.getModules();const p=xA(s,r),b=y.length+p*2,x=wA(y,o,p,i);return{cells:y,margin:p,numCells:b,calculatedImageSettings:x}},[c,o,i,s,r]);return{qrcode:c,margin:u,cells:d,numCells:h,calculatedImageSettings:m}}var kA=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),jA=re.forwardRef(function(t,n){const s=t,{value:r,size:i=Db,level:o=Mb,bgColor:l=Bb,fgColor:c=Ib,includeMargin:d=Lb,minVersion:u=$b,boostLevel:h,marginSize:m,imageSettings:y}=s,b=qc(s,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:x}=b,f=qc(b,["style"]),g=y==null?void 0:y.src,v=re.useRef(null),k=re.useRef(null),N=re.useCallback(D=>{v.current=D,typeof n=="function"?n(D):n&&(n.current=D)},[n]),[T,j]=re.useState(!1),{margin:S,cells:A,numCells:P,calculatedImageSettings:$}=zb({value:r,level:o,minVersion:u,boostLevel:h,includeMargin:d,marginSize:m,imageSettings:y,size:i});re.useEffect(()=>{if(v.current!=null){const D=v.current,Y=D.getContext("2d");if(!Y)return;let C=A;const O=k.current,E=$!=null&&O!==null&&O.complete&&O.naturalHeight!==0&&O.naturalWidth!==0;E&&$.excavation!=null&&(C=Ob(A,$.excavation));const B=window.devicePixelRatio||1;D.height=D.width=i*B;const M=i/P*B;Y.scale(M,M),Y.fillStyle=l,Y.fillRect(0,0,P,P),Y.fillStyle=c,kA?Y.fill(new Path2D(_b(C,S))):A.forEach(function(W,H){W.forEach(function(Wt,he){Wt&&Y.fillRect(he+S,H+S,1,1)})}),$&&(Y.globalAlpha=$.opacity),E&&Y.drawImage(O,$.x+S,$.y+S,$.w,$.h)}}),re.useEffect(()=>{j(!1)},[g]);const Q=Hc({height:i,width:i},x);let ie=null;return g!=null&&(ie=re.createElement("img",{src:g,key:g,style:{display:"none"},onLoad:()=>{j(!0)},ref:k,crossOrigin:$==null?void 0:$.crossOrigin})),re.createElement(re.Fragment,null,re.createElement("canvas",Hc({style:Q,height:i,width:i,ref:N,role:"img"},f)),ie)});jA.displayName="QRCodeCanvas";var Wb=re.forwardRef(function(t,n){const s=t,{value:r,size:i=Db,level:o=Mb,bgColor:l=Bb,fgColor:c=Ib,includeMargin:d=Lb,minVersion:u=$b,boostLevel:h,title:m,marginSize:y,imageSettings:p}=s,b=qc(s,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:x,cells:f,numCells:g,calculatedImageSettings:v}=zb({value:r,level:o,minVersion:u,boostLevel:h,includeMargin:d,marginSize:y,imageSettings:p,size:i});let k=f,N=null;p!=null&&v!=null&&(v.excavation!=null&&(k=Ob(f,v.excavation)),N=re.createElement("image",{href:p.src,height:v.h,width:v.w,x:v.x+x,y:v.y+x,preserveAspectRatio:"none",opacity:v.opacity,crossOrigin:v.crossOrigin}));const T=_b(k,x);return re.createElement("svg",Hc({height:i,width:i,viewBox:`0 0 ${g} ${g}`,ref:n,role:"img"},b),!!m&&re.createElement("title",null,m),re.createElement("path",{fill:l,d:`M0,0 h${g}v${g}H0z`,shapeRendering:"crispEdges"}),re.createElement("path",{fill:c,d:T,shapeRendering:"crispEdges"}),N)});Wb.displayName="QRCodeSVG";const Da=[{id:"bsc",label:"BSC",name:"BNB Smart Chain (BEP20)",address:"0x65eed7da0004ac129a264376a061273dcbdc32e6",minDeposit:.01,note:"Send only USDT on BNB Smart Chain (BEP20) to this address."},{id:"sol",label:"SOL",name:"Solana",address:"3pUKQXYAEsV7jhEqHcvFLYuo8AXTsFnqR7fp9mB2Ar7G",minDeposit:.001,note:"Send only USDT on Solana to this address. SOL addresses are case sensitive."},{id:"trx",label:"TRX",name:"Tron (TRC20)",address:"TCtBCmDJFMxFEAbm4GfW8uBgwoAJT85JLr",minDeposit:.01,note:"Send only USDT on Tron (TRC20) to this address."}],Ma=1,Ba=["#F59E0B","#FBBF24","#FCD34D","#FFFFFF","#34D399","#F472B6"];function SA({duration:e=3500}){const t=w.useRef(null);return w.useEffect(()=>{var p;if((p=window.matchMedia)!=null&&p.call(window,"(prefers-reduced-motion: reduce)").matches)return;const n=t.current;if(!n)return;const s=n.getContext("2d");let r=0,i=0,o=0;const l=[],c=(b,x)=>b+Math.random()*(x-b),d=Date.now(),u=()=>{r=n.width=window.innerWidth,i=n.height=window.innerHeight};u(),window.addEventListener("resize",u);for(let b=0;b<110;b++)l.push({type:"confetti",x:c(0,r),y:c(-i,0),vx:c(-1,1),vy:c(2,5),s:c(4,8),r:c(0,Math.PI*2),vr:c(-.2,.2),c:Ba[b%Ba.length]});const h=(b,x,f)=>{for(let g=0;g<42;g++){const v=c(0,Math.PI*2),k=c(1.5,5.5);l.push({type:"spark",x:b,y:x,vx:Math.cos(v)*k,vy:Math.sin(v)*k,life:1,decay:c(.012,.028),s:c(1.5,3.5),c:f})}},m=()=>{const b=c(r*.12,r*.88);l.push({type:"rocket",x:b,y:i+10,vy:c(-11.5,-8.5),target:c(i*.12,i*.42),c:Ba[Math.floor(c(0,Ba.length))]}),Date.now()-d<e&&setTimeout(m,c(280,750))};m();const y=()=>{s.clearRect(0,0,r,i);for(let b=l.length-1;b>=0;b--){const x=l[b];if(x.type==="confetti"){if(x.x+=x.vx+Math.sin(x.y/30),x.y+=x.vy,x.r+=x.vr,x.y>i+20){l.splice(b,1);continue}s.save(),s.translate(x.x,x.y),s.rotate(x.r),s.fillStyle=x.c,s.fillRect(-x.s/2,-x.s/4,x.s,x.s/2),s.restore()}else if(x.type==="rocket")x.y+=x.vy,s.fillStyle=x.c,s.beginPath(),s.arc(x.x,x.y,2.5,0,Math.PI*2),s.fill(),x.y<=x.target&&(h(x.x,x.y,x.c),l.splice(b,1));else{if(x.x+=x.vx,x.y+=x.vy,x.vy+=.05,x.vx*=.99,x.life-=x.decay,x.life<=0){l.splice(b,1);continue}s.globalAlpha=Math.max(0,x.life),s.fillStyle=x.c,s.beginPath(),s.arc(x.x,x.y,x.s,0,Math.PI*2),s.fill(),s.globalAlpha=1}}Date.now()-d<e+2500&&l.length?o=requestAnimationFrame(y):s.clearRect(0,0,r,i)};return o=requestAnimationFrame(y),()=>{cancelAnimationFrame(o),window.removeEventListener("resize",u)}},[e]),a.jsx("canvas",{ref:t,className:"fixed inset-0 z-[90] pointer-events-none","aria-hidden":"true"})}const NA=["flexspot.lol","www.flexspot.lol","dawoodshah2232-svg.github.io"],TA=new Set(["localhost","127.0.0.1","[::1]"]);function Vb(){try{return window.location.hostname.toLowerCase()}catch{return""}}function Ub(e=Vb()){return!e||TA.has(e)?!0:NA.some(t=>e===t||e.endsWith("."+t))}function CA(){try{if(window.top!==window.self)try{window.top.location.href=window.self.location.href}catch{document.documentElement.style.display="none"}}catch{}}function AA(){const[e,t]=w.useState(!1);return w.useEffect(()=>{CA(),t(!Ub())},[]),e?a.jsxs("div",{role:"alert",className:"fixed top-0 inset-x-0 z-[100] bg-red-600 text-white text-center px-4 py-2.5 text-[13px] font-bold shadow-lg",children:["⚠️ This looks like a ",a.jsx("u",{children:"copy"})," of FlexSpot, not the official site. Never send crypto here — the real site is only ",a.jsx("b",{children:"flexspot.lol"}),". Payments on copies go to scammers."]}):null}function EA(){const[e,t]=w.useState(!1);return w.useEffect(()=>{t(!Ub())},[]),e}const yl=[1,5,10,25,50,100],PA=e=>new Promise((t,n)=>{const s=new FileReader;s.onload=()=>t(s.result),s.onerror=n,s.readAsDataURL(e)}),Ip=e=>{const t=(e||"").trim();return t?/^https?:\/\//i.test(t)?t:"https://"+t:""},RA={x:"https://x.com/",instagram:"https://instagram.com/",facebook:"https://facebook.com/",linkedin:"https://linkedin.com/in/"},Ia=(e,t)=>{const n=(t||"").trim();return n?/^https?:\/\//i.test(n)?n:n.startsWith("@")?RA[e]+encodeURIComponent(n.slice(1)):"https://"+n:""},Lp=e=>e===""?null:/^\d+(\.\d{1,2})?$/.test(e.trim())?Math.round(parseFloat(e)*100)/100:NaN;function FA({spots:e,onSubmitted:t}){const[n]=Ey(),s=n.get("boost"),r=s?WC(s,e):null,i=!!r,o=i?1:2,l=i?2:3,c=i?3:4,[d,u]=w.useState(1),[h,m]=w.useState(!1),[y,p]=w.useState(""),[b,x]=w.useState(null),[f,g]=w.useState({name:"",tagline:"",description:"",website:"",socialLink:"",x:"",instagram:"",facebook:"",linkedin:"",email:"",logo:"",category:"startups"}),[v,k]=w.useState(10),[N,T]=w.useState(""),[j,S]=w.useState(Da[0].id),[A,P]=w.useState(!1),$=EA(),[Q,ie]=w.useState(""),[D,Y]=w.useState(""),[C,O]=w.useState(!1),[E,B]=w.useState(""),[M,W]=w.useState(""),H=Da.find(R=>R.id===j)||Da[0],Wt=async()=>{try{await navigator.clipboard.writeText(H.address),P(!0),setTimeout(()=>P(!1),2e3)}catch{P(!1)}},he=(R,be)=>g(Vt=>({...Vt,[R]:be})),Me=()=>{const R=Lp(N);return R===null?v:Number.isFinite(R)?R:NaN},oe=w.useMemo(()=>{if(!e.length)return null;const R=Me();if(!Number.isFinite(R)||R<Ma)return null;if(i&&r)return gl(e,r.slug,R);const be=ca([...e,{slug:"__new__",amount:R,joinedAt:Date.now()}]),Vt=be.findIndex(Pn=>Pn.slug==="__new__");return{rank:Vt+1,above:Vt>0?be[Vt-1]:null}},[e,v,N,i,r]),rs=w.useMemo(()=>{if(!i||!r||!e.length)return{};const R={};for(const be of yl)R[be]=gl(e,r.slug,be).rank;return R},[e,i,r]),Lu=w.useMemo(()=>{if(!i||!r||N==="")return null;const R=Lp(N);return!Number.isFinite(R)||R<Ma?null:gl(e,r.slug,Math.round(R*100)/100).rank},[e,i,r,N]),Gb=()=>i?!0:f.name.trim().length<2?(p("Please enter a brand name (min 2 characters)."),!1):f.description.trim().length<10?(p("Please add a short description (min 10 characters) — it shows on your rank and profile."),!1):!f.website.trim()&&!f.socialLink.trim()?(p("Please add a website OR a social media link — one of them is required."),!1):f.email.trim()&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.trim())?(p("That email doesn't look valid — fix it or leave it empty."),!1):!0,Kb=()=>D?!0:(p("Please upload a screenshot of the payment — we can't verify without it."),!1),ko=(R,be)=>async Vt=>{var $u;const Pn=($u=Vt.target.files)==null?void 0:$u[0];if(Pn){if(Pn.size>be*1024){p(`Image must be under ${be>=1024?`${be/1024}MB`:`${be}KB`}.`);return}p(""),R(await PA(Pn))}},Qb=R=>Number.isFinite(R)&&R>=Ma&&Math.abs(R*100-Math.round(R*100))<1e-6,Xb=async()=>{p("");const R=Me();if(!Qb(R)){p(`Amount must be at least $${Ma}, with up to two decimal places.`);return}if(Kb()){m(!0);try{const be=i?r.slug:vC(f.name)+"-"+Math.random().toString(36).slice(2,6),Vt=Ip(f.website)||Ip(f.socialLink),Pn=IC({slug:be,name:i?r.name:f.name.trim(),tagline:i?r.tagline:f.tagline.trim().slice(0,100)||"On FlexSpot.LOL",description:i?r.description:f.description.trim().slice(0,1e3),website:i?r.website:Vt,socials:i?r.socials:{...f.x.trim()?{x:Ia("x",f.x)}:{},...f.instagram.trim()?{instagram:Ia("instagram",f.instagram)}:{},...f.facebook.trim()?{facebook:Ia("facebook",f.facebook)}:{},...f.linkedin.trim()?{linkedin:Ia("linkedin",f.linkedin)}:{}},email:i?"":f.email.trim(),logo:i?r.logo:f.logo||null,amount:R,category:i?r.category||"startups":f.category,paymentMethod:`USDT (${H.name})`,paymentTxId:Q.trim(),paymentScreenshot:D,...i?{isBoost:!0,boostSlug:r.slug,contributorName:E.trim(),contributorHandle:M.trim()}:{}});i&&JC(r.slug,{name:E.trim()||"Anonymous booster",handle:M.trim(),amount:R}),x({submission:Pn,amount:R,name:i?r.name:f.name.trim()}),u(c),t&&t()}catch(be){p(be.message||"Something went wrong. Try again.")}finally{m(!1)}}};return s&&!r?a.jsx("div",{className:"pt-[92px] min-h-screen grid place-items-center px-4",children:a.jsxs("div",{className:"card p-10 text-center max-w-sm",children:[a.jsx(q,{children:a.jsx("div",{className:"text-5xl mb-4",children:"🔍"})}),a.jsx("h1",{className:"font-display font-bold text-xl text-[var(--ink)] mb-2",children:"Spot not found"}),a.jsx("p",{className:"text-sm text-[var(--ink-2)] mb-6",children:"The brand you're trying to boost isn't on the board anymore."}),a.jsx(_,{to:"/leaderboard",className:"btn-primary px-6 py-3 text-sm",children:"Back to leaderboard"})]})}):d===c&&b?a.jsxs("div",{className:"pt-[92px] min-h-screen px-4",children:[a.jsx(SA,{}),a.jsx("div",{className:"max-w-lg mx-auto py-12",children:a.jsxs(G.div,{initial:{opacity:0,y:24},animate:{opacity:1,y:0},className:"card p-8 sm:p-10 text-center",children:[a.jsxs("div",{className:"inline-flex items-center gap-2 pill pill-gold mb-5",children:[a.jsx("span",{className:"w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse"}),"Pending Approval"]}),a.jsx(q,{children:a.jsx("div",{className:"text-6xl mb-4",children:"🎉"})}),a.jsx("h1",{className:"font-display font-extrabold text-3xl text-[var(--ink)] mb-3",children:i?"Boost received":"Spot submitted"}),a.jsxs("p",{className:"text-[var(--ink-2)] text-sm leading-relaxed mb-6",children:[a.jsx("b",{className:"text-[var(--ink)]",children:b.name})," · ",qe(b.amount)," ·"," ",i?"boost":"new spot",a.jsx("br",{}),i?"Your name is already showing in their Boost squad. The boost amount lands on the board once we verify your payment.":"Our team is reviewing your payment proof. Most submissions are reviewed within 24 hours.",!i&&" This is preview mode — approve it in the admin dashboard to see it go live."]}),a.jsx("div",{className:"rounded-2xl bg-[var(--surface-2)] border border-[var(--line)] p-5 text-left space-y-3 mb-6",children:[["Submitted","✓ Just now"],["Payment method",`USDT (${H.name})`],["Screenshot","✓ Received"],["Transaction ID",Q||"—"],["Review status","Awaiting review"]].map(([R,be])=>a.jsxs("div",{className:"flex justify-between text-sm",children:[a.jsx("span",{className:"text-[var(--ink-2)]",children:R}),a.jsx("span",{className:"font-semibold text-[var(--ink)] font-mono text-[13px]",children:be})]},R))}),a.jsx(_,{to:"/leaderboard",className:"btn-gold w-full py-3.5 text-sm font-extrabold",children:"Watch the leaderboard →"}),a.jsx("p",{className:"text-[11px] text-[var(--ink-3)] mt-5",children:"You're already on the leaderboard — marked pending until we verify your payment."})]})})]}):a.jsx("div",{className:"pt-[92px] min-h-screen",children:a.jsxs("div",{className:"max-w-2xl mx-auto px-4 sm:px-6 py-10",children:[a.jsxs("div",{className:"text-center mb-8",children:[a.jsx("div",{className:"text-[10px] font-bold tracking-[0.2em] text-[var(--blaze)] uppercase mb-2",children:i?"Boost a brand":"Claim your spot"}),a.jsx("h1",{className:"font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)]",children:i?a.jsxs(a.Fragment,{children:["Boost ",a.jsx("span",{className:"grad-text",children:r.name})]}):a.jsxs(a.Fragment,{children:["Your brand deserves ",a.jsx("span",{className:"grad-text",children:"a spot."})]})}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mt-3 max-w-md mx-auto",children:i?"Chip in $1+ to push them up the board — your name shows on their page instantly. 🚀":"Submit your brand, verify payment, and get approved onto the live leaderboard."})]}),a.jsx("div",{className:"flex gap-1.5 mb-2",children:(i?[1,2]:[1,2,3]).map(R=>a.jsx("div",{className:`h-1.5 flex-1 rounded-full transition-colors ${R<=d?"bg-[var(--blaze)]":"bg-[var(--line)]"}`},R))}),a.jsx("div",{className:"flex mb-8 text-[11px] font-bold uppercase tracking-wider",children:(i?["💰 Amount","💳 Payment"]:["🎯 Your brand","💰 Amount","💳 Payment"]).map((R,be)=>a.jsx("div",{className:`flex-1 text-center ${be+1<=d?"text-[var(--blaze)]":"text-[var(--ink-3)]"}`,children:R},R))}),y&&a.jsx("div",{className:"mb-5 text-sm bg-red-500/10 border border-red-500/30 text-red-600 rounded-2xl px-4 py-3",children:y}),d===1&&!i&&a.jsxs("div",{className:"card p-6 sm:p-8 space-y-5",children:[a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Brand name / your name *"}),a.jsx("input",{className:"field",placeholder:"e.g. Brewline Coffee",value:f.name,onChange:R=>he("name",R.target.value),maxLength:60})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"What is it? *"}),a.jsx("textarea",{className:"field",rows:3,placeholder:"One or two sentences — who is it for and why it's great. Shows under your name on the board.",value:f.description,onChange:R=>he("description",R.target.value),maxLength:1e3})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Category *"}),a.jsx("select",{className:"field",value:f.category,onChange:R=>he("category",R.target.value),children:zs.map(R=>a.jsxs("option",{value:R.slug,children:[R.icon," ",R.name]},R.slug))})]}),a.jsxs("div",{children:[a.jsxs("label",{className:"label",children:["Logo / profile picture ",a.jsx("span",{className:"font-normal text-[var(--ink-3)]",children:"(optional — makes you stand out)"})]}),a.jsxs("div",{className:"flex items-center gap-3",children:[f.logo&&a.jsx("img",{src:f.logo,alt:"",className:"w-14 h-14 rounded-2xl object-cover border border-[var(--line)]"}),a.jsxs("label",{className:"btn-ghost px-5 py-2.5 text-sm cursor-pointer",children:[f.logo?"Change picture":"Upload picture",a.jsx("input",{type:"file",accept:"image/*",className:"hidden",onChange:ko(R=>he("logo",R),5120)})]}),!f.logo&&a.jsx("span",{className:"text-xs text-[var(--ink-3)]",children:"Any image up to 5MB"})]})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Where can people find you? *"}),a.jsxs("div",{className:"grid sm:grid-cols-2 gap-3",children:[a.jsx("input",{className:"field",placeholder:"🌐  yoursite.com",value:f.website,onChange:R=>he("website",R.target.value)}),a.jsx("input",{className:"field",placeholder:"📱  instagram.com/you",value:f.socialLink,onChange:R=>he("socialLink",R.target.value)})]}),a.jsxs("p",{className:"text-xs text-[var(--ink-3)] mt-1.5",children:["Website ",a.jsx("b",{children:"or"})," a social link — at least one is required."]})]}),a.jsxs("div",{className:"rounded-2xl border border-[var(--line)] overflow-hidden",children:[a.jsxs("button",{type:"button",onClick:()=>O(R=>!R),className:"w-full flex items-center justify-between px-5 py-3.5 text-sm font-bold text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors",children:[a.jsxs("span",{children:["✨ Extras ",a.jsx("span",{className:"font-medium text-[var(--ink-3)]",children:"(optional — tagline, email, socials)"})]}),a.jsx("span",{className:`transition-transform ${C?"rotate-180":""}`,children:"▾"})]}),C&&a.jsxs("div",{className:"px-5 pb-5 pt-1 space-y-4 border-t border-[var(--line)]",children:[a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Tagline"}),a.jsx("input",{className:"field",placeholder:"One line that hooks people",value:f.tagline,onChange:R=>he("tagline",R.target.value),maxLength:100})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Email"}),a.jsx("input",{className:"field",placeholder:"you@email.com — only if you want updates",value:f.email,onChange:R=>he("email",R.target.value)})]}),a.jsxs("div",{children:[a.jsxs("label",{className:"label",children:["Social profiles ",a.jsx("span",{className:"font-normal text-[var(--ink-3)]",children:"(shown as icons on your page)"})]}),a.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[a.jsx("input",{className:"field",placeholder:"𝕏  @handle or link",value:f.x,onChange:R=>he("x",R.target.value)}),a.jsx("input",{className:"field",placeholder:"📸  Instagram",value:f.instagram,onChange:R=>he("instagram",R.target.value)}),a.jsx("input",{className:"field",placeholder:"📘  Facebook",value:f.facebook,onChange:R=>he("facebook",R.target.value)}),a.jsx("input",{className:"field",placeholder:"💼  LinkedIn",value:f.linkedin,onChange:R=>he("linkedin",R.target.value)})]})]})]})]}),a.jsx("button",{onClick:()=>{p(""),Gb()&&u(o)},className:"btn-primary w-full py-3.5 text-[15px]",children:"Continue → Choose amount"}),a.jsx("p",{className:"text-center text-xs text-[var(--ink-3)]",children:"No account needed. Takes under a minute."})]}),d===o&&a.jsxs("div",{className:"card p-6 sm:p-8",children:[i?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"rounded-2xl bg-[var(--surface-2)] border border-[var(--line)] p-4 mb-4 flex items-center justify-between",children:[a.jsxs("div",{className:"min-w-0",children:[a.jsx("div",{className:"font-bold text-[var(--ink)] truncate",children:r.name}),a.jsxs("div",{className:"text-sm text-[var(--ink-2)]",children:["💰 ",qe(r.amount)," already boosted"]})]}),a.jsxs("div",{className:"text-right shrink-0 pl-3",children:[a.jsx("div",{className:"text-[11px] uppercase tracking-wide text-[var(--ink-3)]",children:"Rank"}),a.jsxs("div",{className:"font-display font-black text-2xl text-[var(--gold-deep)]",children:["#",r.rank]})]})]}),a.jsxs("p",{className:"text-[var(--ink-2)] text-sm mb-4",children:["Tap an amount to see which place it takes ",a.jsx("b",{className:"text-[var(--ink)]",children:r.name})," to."]}),a.jsx("div",{className:"grid grid-cols-3 gap-2.5 mb-5",children:yl.map(R=>a.jsxs("button",{onClick:()=>{k(R),T("")},className:`rounded-2xl py-3 border transition-all flex flex-col items-center gap-0.5 ${v===R&&N===""?"bg-[var(--blaze-soft)] border-[var(--blaze)] text-[var(--blaze-deep)] shadow-[var(--shadow-blaze)]":"bg-[var(--surface)] border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--ink-3)]"}`,children:[a.jsxs("span",{className:"font-display font-bold text-lg",children:["$",R]}),a.jsxs("span",{className:`text-[11px] font-semibold ${v===R&&N===""?"":"text-[var(--ink-3)]"}`,children:["→ #",rs[R]??"–"]})]},R))}),a.jsxs("div",{className:"mb-5",children:[a.jsx("label",{className:"label",children:"Or custom amount (min $1)"}),a.jsxs("div",{className:"relative",children:[a.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)] font-bold",children:"$"}),a.jsx("input",{className:"field",style:{paddingLeft:"2.25rem"},inputMode:"decimal",placeholder:"25.50",value:N,onChange:R=>T(R.target.value.replace(/[^0-9.]/g,""))}),Lu&&a.jsxs("span",{className:"absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--gold-deep)]",children:["→ #",Lu]})]})]})]}):a.jsxs(a.Fragment,{children:[a.jsxs("p",{className:"text-[var(--ink-2)] text-sm mb-5",children:["Your amount ",a.jsx("b",{className:"text-[var(--ink)]",children:"is your ranking power"}),". More = higher on the board. Minimum $1 — no fees, what you pay is what counts."]}),a.jsx("div",{className:"grid grid-cols-3 gap-2.5 mb-5",children:yl.map(R=>a.jsxs("button",{onClick:()=>{k(R),T("")},className:`rounded-2xl py-4 font-display font-bold text-lg border transition-all ${v===R&&N===""?"bg-[var(--blaze-soft)] border-[var(--blaze)] text-[var(--blaze-deep)] shadow-[var(--shadow-blaze)]":"bg-[var(--surface)] border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--ink-3)]"}`,children:["$",R]},R))}),a.jsxs("div",{className:"mb-5",children:[a.jsx("label",{className:"label",children:"Or custom amount (min $1)"}),a.jsxs("div",{className:"relative",children:[a.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)] font-bold",children:"$"}),a.jsx("input",{className:"field",style:{paddingLeft:"2.25rem"},inputMode:"decimal",placeholder:"25.50",value:N,onChange:R=>T(R.target.value.replace(/[^0-9.]/g,""))})]})]})]}),a.jsxs("div",{className:"rounded-2xl bg-[var(--green-soft)] border border-[var(--green)]/25 p-4 flex items-center justify-between mb-4",children:[a.jsx("span",{className:"text-sm text-[var(--ink-2)]",children:"Your amount — no fees"}),a.jsx("span",{className:"font-display font-bold text-2xl text-[#0A8A4E]",children:qe(Me())})]}),oe&&a.jsx("div",{className:"rounded-2xl bg-[var(--gold-soft)] border border-[var(--gold)]/40 p-4 text-sm mb-6",children:i?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"font-bold text-[var(--ink)]",children:["⚡ Your ",qe(Me())," → ",r.name," lands at"," ",a.jsxs("span",{className:"text-[var(--gold-deep)]",children:["#",oe.rank]}),"."]}),a.jsxs("div",{className:"text-[var(--ink-2)] text-xs mt-1",children:["The full ",qe(Me())," goes to the brand — more dollars, higher place."]}),oe.above&&oe.rank>1&&a.jsxs("div",{className:"text-[var(--ink-2)] text-xs mt-1",children:["Just ",a.jsx("b",{className:"text-[var(--ink)]",children:qe(Math.max(.01,Math.round((oe.above.amount-(r.amount+Me())+.01)*100)/100))})," more to pass"," ",a.jsx("b",{className:"text-[var(--ink)]",children:oe.above.name})," at #",oe.rank-1,". 😬"]}),oe.rank===1&&a.jsxs("div",{className:"text-[var(--ink-2)] text-xs mt-1",children:["The crown would be ",r.name,"'s. 👑"]})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"font-bold text-[var(--ink)]",children:["💪 ",qe(Me())," would land you at"," ",a.jsxs("span",{className:"text-[var(--gold-deep)]",children:["#",oe.rank]})," right now."]}),oe.above&&oe.rank>1&&a.jsxs("div",{className:"text-[var(--ink-2)] text-xs mt-1",children:["Just ",a.jsx("b",{className:"text-[var(--ink)]",children:qe(Math.max(.01,Math.round((oe.above.amount-Me()+.01)*100)/100))})," more to pass"," ",a.jsx("b",{className:"text-[var(--ink)]",children:oe.above.name})," at #",oe.rank-1,". 😬"]}),oe.rank===1&&a.jsx("div",{className:"text-[var(--ink-2)] text-xs mt-1",children:"The crown would be yours. 👑 Defend it well."})]})}),a.jsxs("div",{className:"flex gap-2.5",children:[!i&&a.jsx("button",{onClick:()=>u(1),className:"btn-ghost px-5 py-3.5 text-sm",children:"← Back"}),a.jsx("button",{onClick:()=>u(l),className:"btn-primary flex-1 py-3.5 text-[15px]",children:"Continue → Payment proof"})]})]}),d===l&&a.jsxs("div",{className:"card p-6 sm:p-8 space-y-5",children:[i&&a.jsxs("div",{className:"rounded-2xl bg-[var(--gold-soft)] border border-[var(--gold)]/40 p-5",children:[a.jsx("h3",{className:"font-display font-bold text-[var(--ink)] mb-1",children:"📣 Get your name on their page"}),a.jsxs("p",{className:"text-xs text-[var(--ink-2)] mb-4",children:["Everyone who chips in shows up in ",r.name,"'s ",a.jsx("b",{children:"Boost squad"})," — like a public high-five. 💪"]}),a.jsxs("div",{className:"grid sm:grid-cols-2 gap-3",children:[a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Your name"}),a.jsx("input",{className:"field",placeholder:"e.g. Sara K.",value:E,onChange:R=>B(R.target.value),maxLength:40})]}),a.jsxs("div",{children:[a.jsxs("label",{className:"label",children:["Handle / company / ID ",a.jsx("span",{className:"font-normal text-[var(--ink-3)]",children:"(optional)"})]}),a.jsx("input",{className:"field",placeholder:"@instagram or company",value:M,onChange:R=>W(R.target.value),maxLength:40})]})]})]}),a.jsxs("div",{className:"rounded-2xl bg-[var(--surface-2)] border border-[var(--line)] p-5",children:[a.jsxs("div",{className:"flex justify-between text-sm mb-2",children:[a.jsx("span",{className:"text-[var(--ink-2)]",children:i?"Boosting":"New spot"}),a.jsx("span",{className:"font-semibold text-[var(--ink)]",children:i?r.name:f.name})]}),a.jsxs("div",{className:"flex justify-between font-display font-bold text-lg",children:[a.jsx("span",{children:"Total due"}),a.jsx("span",{className:"text-[var(--blaze)]",children:qe(Me())})]}),a.jsx("div",{className:"text-[11px] text-[var(--ink-3)] mt-1",children:"Crypto only · no fees · what you send is what counts"})]}),a.jsxs("div",{className:"rounded-2xl bg-[var(--blue-soft)] border border-[var(--blue)]/30 p-5",children:[a.jsx("h3",{className:"font-display font-bold text-[var(--ink)] mb-2",children:"💳 Pay with crypto — USDT only"}),a.jsxs("ol",{className:"text-sm text-[var(--ink-2)] space-y-2 list-decimal list-inside",children:[a.jsxs("li",{children:["Send ",a.jsx("b",{className:"text-[var(--ink)]",children:qe(Me())})," USDT to the address below."]}),a.jsxs("li",{children:["Upload a screenshot of the completed payment ",a.jsx("b",{className:"text-[var(--ink)]",children:"(required)"}),"."]}),a.jsx("li",{children:"Paste the transaction ID if you have it (optional)."}),a.jsx("li",{children:"Our team verifies — then your spot goes live. 🚀"})]})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Choose network *"}),a.jsx("div",{className:"chip-row",children:Da.map(R=>a.jsxs("button",{type:"button",onClick:()=>S(R.id),className:`chip ${j===R.id?"active":""}`,children:[R.label," · ",R.name]},R.id))})]}),a.jsx("div",{className:"rounded-2xl bg-[var(--surface-2)] border border-[var(--line)] p-5 text-center",children:$?a.jsxs("div",{className:"py-6",children:[a.jsx("div",{className:"text-4xl mb-3",children:"🛡️"}),a.jsx("div",{className:"font-display font-bold text-red-500 text-lg mb-2",children:"Payments disabled on this copy"}),a.jsxs("p",{className:"text-sm text-[var(--ink-2)] max-w-sm mx-auto",children:["This page is not running on the official FlexSpot domain, so payment details are hidden to protect you. Please continue only at ",a.jsx("b",{className:"text-[var(--ink)]",children:"flexspot.lol"}),"."]})]}):a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-500 mb-3",children:a.jsxs("span",{children:["🔒 You're on ",a.jsx("b",{children:Vb()})," — always confirm the address bar before sending"]})}),a.jsxs("div",{className:"text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-3",children:["Scan to pay ",qe(Me())," USDT (",H.name,")"]}),a.jsx("div",{className:"inline-block bg-white p-3 rounded-2xl border border-[var(--line)]",children:a.jsx(Wb,{value:H.address,size:200,level:"M"})}),a.jsxs("div",{className:"mt-4",children:[a.jsx("div",{className:"text-xs text-[var(--ink-3)] mb-1.5",children:"Deposit address — tap to copy · verify the first & last characters"}),a.jsxs("button",{type:"button",onClick:Wt,className:"w-full font-mono text-[13px] break-all bg-[#101223] rounded-xl px-4 py-3.5 border border-[#2A2D4A] hover:border-[var(--blaze)] transition-colors",title:"Tap to copy",children:[a.jsx("span",{className:"text-white font-bold",children:H.address.slice(0,10)}),a.jsx("span",{className:"text-white/45",children:H.address.slice(10,-10)}),a.jsx("span",{className:"text-white font-bold",children:H.address.slice(-10)})]}),a.jsx("button",{type:"button",onClick:Wt,className:"btn-primary px-5 py-2.5 text-xs mt-3",children:A?"✓ Copied!":"⧉ Copy address"})]}),a.jsxs("p",{className:"text-xs text-[var(--ink-3)] mt-3",children:["⚠️ ",H.note]})]})}),a.jsxs("div",{children:[a.jsxs("label",{className:"label",children:["Transaction ID / payment reference ",a.jsx("span",{className:"font-normal text-[var(--ink-3)]",children:"(optional)"})]}),a.jsx("input",{className:"field font-mono",placeholder:"Paste it if you have it",value:Q,onChange:R=>ie(R.target.value)})]}),a.jsxs("div",{children:[a.jsxs("label",{className:"label",children:["Payment screenshot * ",a.jsx("span",{className:"font-normal text-[var(--ink-3)]",children:"(required — this is how we verify you)"})]}),a.jsx("div",{className:"rounded-2xl border-2 border-dashed border-[var(--line)] p-6 text-center",children:D?a.jsxs("div",{children:[a.jsx("img",{src:D,alt:"Payment proof",className:"max-h-48 mx-auto rounded-xl border border-[var(--line)] mb-3"}),a.jsxs("label",{className:"btn-ghost px-4 py-2 text-xs cursor-pointer",children:["Replace screenshot",a.jsx("input",{type:"file",accept:"image/*",className:"hidden",onChange:ko(Y,2e3)})]})]}):a.jsxs("label",{className:"cursor-pointer block",children:[a.jsx("div",{className:"text-4xl mb-2",children:"🧾"}),a.jsx("div",{className:"font-semibold text-sm text-[var(--ink)]",children:"Upload payment screenshot"}),a.jsx("div",{className:"text-xs text-[var(--ink-3)] mt-1",children:"PNG/JPG under 2MB — must show the amount and date"}),a.jsx("input",{type:"file",accept:"image/*",className:"hidden",onChange:ko(Y,2e3)})]})})]}),a.jsxs("p",{className:"text-xs text-[var(--ink-3)] leading-relaxed text-center",children:["⚠️ By submitting, you agree to our"," ",a.jsx(_,{to:"/terms",className:"text-[var(--blaze)] hover:underline font-semibold",children:"Terms of Service"})," ","and ",a.jsx(_,{to:"/disclaimers",className:"text-[var(--blaze)] hover:underline font-semibold",children:"Disclaimers"}),". All sales are final once published. Crypto transfers are irreversible — double-check the wallet address and network before sending."]}),a.jsxs("div",{className:"flex gap-2.5",children:[a.jsx("button",{onClick:()=>u(o),className:"btn-ghost px-5 py-3.5 text-sm",children:"← Back"}),a.jsx("button",{onClick:Xb,disabled:h,className:"btn-gold flex-1 py-3.5 text-[15px]",children:h?"Submitting…":`Submit for review — ${qe(Me())}`})]})]})]})})}function DA({onClaim:e}){return a.jsxs("div",{className:"relative overflow-hidden rounded-2xl text-white",style:{background:"radial-gradient(700px 320px at 50% -20%, #7C3AED 0%, #4C1D95 55%, #1E1B4B 100%)"},children:[a.jsx("div",{className:"absolute -top-12 left-1/4 w-48 h-48 bg-[#F59E0B]/25 rounded-full blur-3xl","aria-hidden":"true"}),a.jsx("div",{className:"absolute inset-0 opacity-[0.12]","aria-hidden":"true",style:{backgroundImage:"radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",backgroundSize:"24px 24px"}}),a.jsxs("div",{className:"relative flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-5 py-5 sm:px-8 text-center sm:text-left",children:[a.jsx(q,{className:"shrink-0",children:a.jsx("span",{className:"anim-floaty block text-4xl sm:text-5xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]",children:"👑"})}),a.jsxs("div",{className:"flex-1 min-w-0",children:[a.jsxs("div",{className:"inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] text-[#FCD34D]",children:[a.jsx("span",{className:"live-dot"})," THE #1 SPOT IS UP FOR GRABS"]}),a.jsxs("h3",{className:"font-display font-extrabold text-xl sm:text-2xl mt-2 leading-tight",children:["Not on the board yet? ",a.jsx(q,{className:"inline-block",children:a.jsx("span",{className:"inline-block",children:"✨"})})]}),a.jsx("p",{className:"text-white/75 text-xs sm:text-sm mt-1",children:"The top 10 gets 80% of all clicks. Your spot is one claim away — from just $1."})]}),a.jsx("button",{onClick:e,className:"btn-gold px-6 py-3 text-sm font-extrabold shrink-0 w-full sm:w-auto",children:"⚡ Claim Your Spot From $1"})]})]})}const vl=20;function MA({spots:e,moves:t,onBoost:n,onClaim:s}){const[r,i]=w.useState(()=>{try{return new URLSearchParams(window.location.search).get("q")||""}catch{return""}}),[o,l]=w.useState(vl),[c,d]=w.useState(!1),[u,h]=w.useState(!1),m=w.useRef(null),y=w.useRef(null),{race:p,count:b}=wb(),x=w.useMemo(()=>{const j=r.trim().toLowerCase();return j?e.filter(S=>S.name.toLowerCase().includes(j)||S.tagline.toLowerCase().includes(j)):e},[e,r]),f=x.slice(0,3).map(j=>({...j,move:t[j.slug]??j.move})),g=r.trim().length>0,v=g?x:x.slice(3),k=v.slice(0,o);w.useEffect(()=>{l(vl)},[r]),w.useEffect(()=>{const j=m.current;if(!j||rest.length===0)return;const S=new IntersectionObserver(([A])=>{A.isIntersecting&&l(P=>P<rest.length?Math.min(P+vl,rest.length):P)},{rootMargin:"500px"});return S.observe(j),()=>S.disconnect()},[v.length]),w.useEffect(()=>{const j=()=>d(window.scrollY>600);return j(),window.addEventListener("scroll",j,{passive:!0}),()=>window.removeEventListener("scroll",j)},[]);const N=()=>{l(v.length),h(!0)};w.useEffect(()=>{if(!u)return;const j=requestAnimationFrame(()=>{var S;(S=y.current)==null||S.scrollIntoView({behavior:"smooth",block:"end"})});return h(!1),()=>cancelAnimationFrame(j)},[u,o]);const T=[];return k.forEach((j,S)=>{const A=S===0?g?null:f[f.length-1]:k[S-1];T.push(a.jsx(la,{spot:j,move:t[j.slug]??j.move,highlight:!0,onBoost:n,race:p,count:b,overtake:g?void 0:A?{amount:A.amount,rank:A.rank}:null},j.slug)),(S+1)%30===0&&T.push(a.jsx(DA,{onClaim:s},`claim-${j.slug}`))}),a.jsx("div",{className:"pt-[92px]",children:a.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14",children:[a.jsxs("div",{className:"text-center max-w-2xl mx-auto",children:[a.jsxs("div",{className:"inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--line)] rounded-full px-4 py-1.5 text-xs font-bold text-[var(--ink-2)] mb-5 shadow-[var(--shadow-card)]",children:[a.jsx("span",{className:"live-dot"})," Updated live — every boost re-ranks instantly"]}),a.jsxs("h1",{className:"font-display font-extrabold text-4xl sm:text-6xl text-[var(--ink)] tracking-tight",children:["The ",a.jsx("span",{className:"grad-gold",children:"Leaderboard"})]}),a.jsx("p",{className:"text-[var(--ink-2)] mt-4",children:"The most competitive page on the internet. More buzz = higher spot. Where do you rank?"}),a.jsx("div",{className:"flex justify-center mt-4 max-w-md mx-auto",children:a.jsx(Pu,{className:"w-full"})}),a.jsx("div",{className:"grid grid-cols-3 gap-2.5 mt-6 max-w-md mx-auto",children:[{icon:"💰",v:Ne(e.reduce((j,S)=>j+S.amount,0)),l:"total buzz"},{icon:"⚡",v:String(e.length),l:"spots competing"},{icon:"👁️",v:Ye(e.reduce((j,S)=>j+(S.views||0),0)),l:"profile views"}].map(j=>a.jsxs("div",{className:"rounded-2xl bg-[var(--surface)] border border-[var(--line)] px-3 py-3 shadow-[var(--shadow-card)]",children:[a.jsx(q,{children:a.jsx("div",{className:"text-lg leading-none mb-1",children:j.icon})}),a.jsx("div",{className:"font-display font-extrabold text-base sm:text-lg text-[var(--ink)] leading-tight truncate",children:j.v}),a.jsx("div",{className:"text-[10px] font-bold text-[var(--ink-3)] uppercase tracking-wider",children:j.l})]},j.l))}),a.jsx("div",{className:"flex flex-col sm:flex-row gap-3 justify-center mt-7",children:a.jsx("button",{onClick:s,className:"btn-primary px-8 py-3.5",children:"⚡ Claim Your Spot — $1"})}),a.jsxs("div",{className:"relative max-w-md mx-auto mt-8",children:[a.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-mist",children:"🔍"}),a.jsx("input",{className:"field py-3.5 rounded-2xl",style:{paddingLeft:"2.75rem"},placeholder:"Search brands, creators, startups…",value:r,onChange:j=>i(j.target.value)})]})]}),!g&&f.length>0&&a.jsxs("div",{className:"mt-12",children:[a.jsx("div",{className:"text-center mb-2",children:a.jsx("span",{className:"inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--gold-deep)] bg-[var(--gold-soft)] border border-[var(--gold)]/30 rounded-full px-4 py-1.5",children:"👑 The podium — top 3 take the glory"})}),a.jsx(Ru,{spots:f,onBoost:n})]}),a.jsxs("div",{className:"mt-10",children:[a.jsxs("div",{className:"flex items-center justify-between mb-3",children:[a.jsxs("h2",{className:"font-display font-bold text-2xl text-snow",children:[g?a.jsxs(a.Fragment,{children:["Results for ",a.jsxs("span",{className:"grad-gold",children:["“",r.trim(),"”"]})]}):"All spots"," ",a.jsxs("span",{className:"text-mist text-base font-sans font-medium",children:["(",x.length," competing)"]})]}),a.jsxs("span",{className:"text-xs text-mist font-semibold",children:["Total buzz: ",a.jsx("b",{className:"text-[var(--blaze)]",children:Ne(e.reduce((j,S)=>j+S.amount,0))})]})]}),a.jsx("p",{className:"hidden md:block text-[11px] text-mist mt-1 mb-2","aria-hidden":"true",children:"🎯 Psst — the racers are shy. Try catching one with your cursor."}),x.length===0?a.jsxs("div",{className:"text-center py-16 text-mist",children:[a.jsx("div",{className:"text-5xl mb-4",children:"🔍"}),a.jsxs("p",{className:"font-semibold text-snow",children:['No spots match "',r,'"']}),a.jsx("p",{className:"text-sm mt-1",children:"Be the first with that name — claim it now."}),a.jsxs("button",{onClick:s,className:"btn-primary px-6 py-3 mt-5 text-sm",children:['⚡ Claim "',r,'"']})]}):a.jsxs(G.div,{layout:!0,className:"space-y-2.5",children:[T,o<rest.length&&a.jsxs("div",{className:"card p-4 flex items-center gap-3 animate-pulse","aria-hidden":"true",children:[a.jsx("div",{className:"w-9 h-9 rounded-xl bg-[var(--line)] shrink-0"}),a.jsxs("div",{className:"flex-1 min-w-0",children:[a.jsx("div",{className:"h-3 rounded-full bg-[var(--line)] w-1/3 mb-2"}),a.jsx("div",{className:"h-2 rounded-full bg-[var(--line)] w-1/2"})]}),a.jsx("div",{className:"text-xs font-bold text-[var(--ink-3)] whitespace-nowrap",children:"✨ Loading more spots…"})]}),a.jsx("div",{ref:m,"aria-hidden":"true"}),a.jsx("div",{ref:y,"aria-hidden":"true"})]})]}),a.jsxs("div",{className:"mt-12 relative overflow-hidden rounded-[32px] p-8 sm:p-10 text-center text-white shadow-[var(--shadow-blaze)]",style:{background:"radial-gradient(900px 380px at 50% -10%, #7C3AED 0%, #4C1D95 50%, #1E1B4B 100%)"},children:[a.jsx("div",{className:"absolute -top-16 left-1/4 w-64 h-64 bg-[#F59E0B]/25 rounded-full blur-3xl","aria-hidden":"true"}),a.jsxs("div",{className:"relative",children:[a.jsx(q,{children:a.jsx("div",{className:"text-5xl mb-3 anim-floaty",children:"👑"})}),a.jsx("h3",{className:"font-display font-extrabold text-2xl sm:text-3xl",children:"Not on the board yet?"}),a.jsx("p",{className:"text-white/80 text-sm mt-2 max-w-md mx-auto",children:"The top 10 gets 80% of all clicks. Your spot is one claim away — from just $1."}),a.jsx("button",{onClick:s,className:"btn-gold px-8 py-3.5 mt-6 font-extrabold",children:"⚡ Claim My Spot From $1"})]})]}),a.jsxs("button",{onClick:N,"aria-label":"Jump to the last spot",title:"Jump to the last spot",className:`fixed z-50 bottom-20 sm:bottom-8 right-4 sm:right-6 rounded-full pl-4 pr-5 py-3 font-display font-extrabold text-sm text-[var(--gold-deep)] dark:text-[#FCD34D] bg-[var(--surface)]/90 backdrop-blur-xl border border-[var(--gold)]/50 shadow-[0_8px_30px_rgba(245,158,11,0.25)] transition-all duration-300 hover:border-[var(--gold)] active:scale-95 ${c?"opacity-100 translate-y-0":"opacity-0 translate-y-4 pointer-events-none"}`,children:["↓ ",x.length]})]})})}const BA=[{icon:"⚡",tag:"STEP 01",time:"60 seconds",accent:"blaze",t:"Claim your spot",s:"Tell us who you are — no signup, no friction. From $1 you own a public page at flexspot.lol/your-name.",bullets:["Name, picture, story + links — done in a minute","Your brand is officially in the game"]},{icon:"💳",tag:"STEP 02",time:"crypto",accent:"green",t:"Fuel it with USDT",s:"Send USDT on BSC, Solana or Tron, upload the payment screenshot, and join the review queue.",bullets:["Zero fees — every cent counts toward your rank","Approval usually lands within hours"]},{icon:"🚀",tag:"STEP 03",time:"the climb",accent:"blue",t:"Outrank your rivals",s:"Highest amount wins the crown. Tie? Whoever got there FIRST takes it — even $0.01 more puts you above.",bullets:["Pass a rival and you steal their rank live","It all happens in front of everyone 😬"]},{icon:"📣",tag:"STEP 04",time:"go viral",accent:"gold",t:"Rally your crowd",s:"Share your page everywhere — X, Instagram, Telegram. Fans boost the brands they love, and every boost pushes you higher.",bullets:["Referral joins grow your stats","Unlock rewards as your crowd spreads the word"]},{icon:"👑",tag:"STEP 05",time:"glory",accent:"blaze",t:"Take the crown",s:"Hit #1 and you get the golden spotlight card, the homepage feature, and the most-clicked spot on the page.",bullets:["Maximum eyeballs on your brand","But sleep on it and a challenger takes it all — defend it 👑"]}],IA={blaze:{soft:"bg-[var(--blaze-soft)]",text:"text-[var(--blaze)]",ring:"border-[var(--blaze)]/30",dot:"bg-[var(--blaze)]"},green:{soft:"bg-[var(--green-soft)]",text:"text-[#0A8A4E]",ring:"border-[var(--green)]/30",dot:"bg-[var(--green)]"},blue:{soft:"bg-[var(--blue-soft)]",text:"text-[#1D5FC4]",ring:"border-[var(--blue)]/30",dot:"bg-[var(--blue)]"},gold:{soft:"bg-[var(--gold-soft)]",text:"text-[var(--gold-deep)]",ring:"border-[var(--gold)]/40",dot:"bg-[var(--gold)]"}},LA=[{icon:"🥊",kick:"DRAMA",t:"Call out a rival",d:"Tag a competitor. Dare them to out-boost you. The internet loves a fight — and both of you get the traffic."},{icon:"🎪",kick:"TIMING",t:"Make it an event",d:"Launch day? Drop day? Birthday? Turn any moment into a leaderboard war and let your crowd carry you to #1."},{icon:"🤣",kick:"MEMES",t:"Memes welcome",d:"Funny pages climb fast. A joke brand with a crowd can dethrone a serious company. That's the whole point."},{icon:"🌍",kick:"OPEN",t:"Anyone, anywhere",d:"Business, creator, social account, personal brand, pure meme — $1 and something to show is all it takes."}];function $A({onClaim:e}){return a.jsxs("div",{className:"pt-[92px]",children:[a.jsxs("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 text-center",children:[a.jsxs(G.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},className:"inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--line)] rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[var(--ink-2)] mb-5 shadow-[var(--shadow-card)]",children:[a.jsx("span",{className:"live-dot"})," THE INTERNET'S LIVE BRAND BATTLE"]}),a.jsxs(G.h1,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{delay:.05},className:"font-display font-extrabold text-4xl sm:text-6xl text-[var(--ink)] tracking-tight",children:["Five steps to ",a.jsx("span",{className:"grad-text",children:"internet fame."})]}),a.jsx(G.p,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{delay:.1},className:"text-[var(--ink-2)] mt-4 max-w-xl mx-auto text-base sm:text-lg",children:"No ads account. No marketing degree. Just $1, a little nerve, and the guts to outrank everyone else."}),a.jsxs(G.p,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{delay:.15},className:"text-[var(--ink-3)] mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed",children:[a.jsx("strong",{className:"text-[var(--ink-2)]",children:"What is FlexSpot?"})," FlexSpot is the internet's public spotlight competition: anyone can claim a public leaderboard spot for their brand, creator page, or meme — starting at $1 — and fans boost it to climb the live rankings. The highest total takes the crown."]}),a.jsxs(G.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{delay:.15},className:"mt-7 flex flex-col sm:flex-row items-center justify-center gap-3",children:[a.jsx("button",{onClick:e,className:"btn-primary px-8 py-4 text-base",children:"⚡ I'm in — claim my spot"}),a.jsx(_,{to:"/leaderboard",className:"text-[var(--ink-2)] font-bold text-sm hover:text-[var(--ink)] transition-colors",children:"Watch the battle live →"})]})]}),a.jsx("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20",children:a.jsx("div",{className:"grid md:grid-cols-2 gap-5 sm:gap-6 items-start",children:BA.map((t,n)=>{const s=IA[t.accent];return a.jsx(G.div,{initial:{opacity:0,y:32},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-70px"},transition:{duration:.45,ease:"easeOut",delay:n%2*.08},className:n%2===1?"md:mt-12":"",children:a.jsxs("div",{className:`card card-lift rounded-3xl p-6 sm:p-7 relative overflow-hidden border-t-4 ${s.ring}`,children:[a.jsx("span",{className:"absolute -top-3 right-4 font-display font-black text-[92px] leading-none text-[var(--ink)] opacity-[0.06] select-none","aria-hidden":"true",children:String(n+1).padStart(2,"0")}),a.jsxs("div",{className:"flex items-center gap-3 mb-4 relative",children:[a.jsx("div",{className:`shrink-0 w-14 h-14 rounded-2xl ${s.soft} border ${s.ring} grid place-items-center text-3xl shadow-sm`,children:a.jsx(q,{children:a.jsx("span",{className:"inline-block",children:t.icon})})}),a.jsxs("div",{children:[a.jsxs("div",{className:`inline-flex items-center gap-1.5 text-[11px] font-extrabold ${s.text} uppercase tracking-[0.18em]`,children:[a.jsx("span",{className:`${s.soft} border ${s.ring} rounded-full px-2.5 py-0.5`,children:t.tag}),a.jsxs("span",{className:"text-[var(--ink-3)] font-semibold normal-case tracking-normal",children:["· ",t.time]})]}),a.jsx("h3",{className:"font-display font-extrabold text-2xl text-[var(--ink)] tracking-tight mt-1",children:t.t})]})]}),a.jsx("p",{className:"text-[var(--ink-2)] text-[15px] leading-relaxed relative",children:t.s}),a.jsx("ul",{className:"mt-4 space-y-2 relative",children:t.bullets.map(r=>a.jsxs("li",{className:"flex items-start gap-2.5 text-sm text-[var(--ink)] font-medium",children:[a.jsx("span",{className:`mt-0.5 shrink-0 w-5 h-5 rounded-full ${s.soft} grid place-items-center text-[11px] ${s.text} font-bold`,children:"✓"}),r]},r))})]})},t.t)})})}),a.jsxs("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24",children:[a.jsxs(G.h2,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-60px"},className:"font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)] text-center tracking-tight",children:["How the viral ones ",a.jsx("span",{className:"grad-text",children:"play it"})," 🔥"]}),a.jsx(G.p,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-60px"},transition:{delay:.05},className:"text-[var(--ink-2)] text-center mt-3 text-sm sm:text-base",children:"The leaderboard rewards drama. Use it."}),a.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8",children:LA.map((t,n)=>a.jsxs(G.div,{initial:{opacity:0,y:28,rotate:n%2===0?-1.5:1.5},whileInView:{opacity:1,y:0,rotate:0},viewport:{once:!0,margin:"-60px"},transition:{delay:n*.06,duration:.4},className:"card card-lift rounded-3xl p-6 relative overflow-hidden",children:[a.jsx("div",{className:"text-[11px] font-extrabold tracking-[0.2em] text-[var(--blaze)] mb-3",children:t.kick}),a.jsx(q,{children:a.jsx("div",{className:"text-6xl mb-4 drop-shadow-sm",children:t.icon})}),a.jsx("h3",{className:"font-display font-extrabold text-lg text-[var(--ink)] mb-1.5 tracking-tight",children:t.t}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm leading-relaxed",children:t.d})]},t.t))})]}),a.jsx("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 mt-14 sm:mt-20 pb-20",children:a.jsxs(G.div,{initial:{opacity:0,y:28},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-60px"},transition:{duration:.5},className:"relative overflow-hidden rounded-[32px] p-8 sm:p-12 text-center text-white shadow-[var(--shadow-blaze)]",style:{background:"radial-gradient(1000px 420px at 50% -10%, #7C3AED 0%, #4C1D95 45%, #1E1B4B 100%)"},children:[a.jsx("div",{className:"absolute inset-0 opacity-[0.15]","aria-hidden":"true",style:{backgroundImage:"radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",backgroundSize:"26px 26px"}}),a.jsx(G.div,{className:"absolute top-8 left-10 text-2xl","aria-hidden":"true",animate:{y:[0,-10,0],rotate:[0,12,0]},transition:{duration:4,repeat:1/0,ease:"easeInOut"},children:"✨"}),a.jsx(G.div,{className:"absolute bottom-10 right-12 text-2xl","aria-hidden":"true",animate:{y:[0,10,0],rotate:[0,-12,0]},transition:{duration:5,repeat:1/0,ease:"easeInOut",delay:1},children:"⚡"}),a.jsxs("div",{className:"relative",children:[a.jsx(q,{children:a.jsx(G.div,{animate:{y:[0,-8,0]},transition:{duration:3,repeat:1/0,ease:"easeInOut"},className:"text-6xl mb-4",children:"👑"})}),a.jsx("h2",{className:"font-display font-extrabold text-3xl sm:text-4xl tracking-tight",children:"Your rivals are already climbing."}),a.jsx("p",{className:"text-white/85 mt-3 max-w-md mx-auto",children:"Every minute you wait, someone else takes the spot that should be yours."}),a.jsx("div",{className:"mt-7 flex flex-col sm:flex-row items-center justify-center gap-3",children:a.jsx("button",{onClick:e,className:"bg-white text-[#5B21B6] font-extrabold px-10 py-4 rounded-full text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all",children:"⚡ Claim My Spot From $1"})}),a.jsxs("div",{className:"mt-5 flex items-center justify-center gap-4 text-sm",children:[a.jsx(_,{to:"/faq",className:"text-white/80 font-semibold hover:underline",children:"Still curious? Read the FAQ →"}),a.jsx("span",{className:"text-white/40",children:"·"}),a.jsx(_,{to:"/leaderboard",className:"text-white/80 font-semibold hover:underline",children:"See the leaderboard →"})]})]})]})})]})}const $p=new Set(["top-spot","weekly-champion","diamond-hands"]),_A=[{icon:"🖼️",name:"Custom icon frame",desc:"A gold or animated border wrapped around your avatar, everywhere you appear.",price:"from $5"},{icon:"✨",name:"Animated avatar glow",desc:"Make your logo pulse, shimmer and steal every eye on the leaderboard.",price:"from $8"},{icon:"🚩",name:"Spotlight banner",desc:"A full-width banner pinned across the top of your public profile.",price:"from $10"},{icon:"🎭",name:"Custom emoji mark",desc:"Swap the default avatar for your own emoji — your vibe, your mark.",price:"from $5"},{icon:"💫",name:"Name flair",desc:"Sparkles, gradients and animated effects on your brand name on the board.",price:"from $7"}],OA=[{n:1,icon:"🎯",t:"Claim your spot",d:"Grab a place on the board from just $1. One cent more overtakes your rival."},{n:2,icon:"📈",t:"Climb & get seen",d:"Boost your amount, stack views and referral visits. Rankings update live."},{n:3,icon:"🔗",t:"Refer & earn $1",d:"Share your personal link anywhere — every visit through it adds $1 to the brand and your name hits the Top Referrers board."},{n:4,icon:"🏅",t:"Earn badges",d:"Hit the criteria and the badge lands on your profile, the homepage and share cards."},{n:5,icon:"🛡️",t:"Defend the crown",d:"Badges are re-evaluated weekly — keep your rank or watch someone steal it."}];function _p({holder:e,compact:t=!1}){return e?a.jsxs(_,{to:`/s/${e.slug}`,className:`flex items-center gap-3 bg-[var(--surface-2)] border border-[var(--line)] rounded-2xl ${t?"p-2.5":"p-3"} hover:border-[var(--gold)] transition-colors group`,children:[a.jsx(Ot,{spot:e,size:t?34:40}),a.jsxs("div",{className:"min-w-0 text-left",children:[a.jsx("div",{className:"text-[10px] uppercase tracking-widest text-[var(--gold-deep)] font-bold",children:"Current holder"}),a.jsxs("div",{className:"font-bold text-[var(--ink)] text-sm truncate group-hover:text-[var(--blaze)] transition-colors",children:[e.name," ",a.jsxs("span",{className:"text-[var(--ink-3)] font-medium",children:["#",e.rank]})]})]})]}):a.jsx("div",{className:`text-xs font-bold text-[var(--ink-3)] bg-[var(--surface-2)] rounded-2xl ${t?"p-2.5":"p-3"}`,children:"⏳ Awaiting first champion"})}function zA(){return a.jsx(G.div,{className:"pointer-events-none absolute inset-y-0 left-0 w-1/2",initial:{x:"-150%"},animate:{x:"350%"},transition:{duration:2.2,repeat:1/0,repeatDelay:3.4,ease:"easeInOut"},style:{background:"linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)"}})}function Op({tier:e}){return e==="S"?a.jsx("span",{className:"inline-flex items-center gap-1 text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-[#3A2200] bg-gradient-to-r from-[#FFD97A] via-[#F5B301] to-[#FFD97A] shadow-[0_4px_14px_-4px_rgba(245,158,11,0.7)]",children:"★ S-tier"}):a.jsx("span",{className:"inline-flex items-center text-[11px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full text-[var(--blaze)] bg-[var(--blaze)]/10 border border-[var(--blaze)]/25",children:"A-tier"})}function WA({spots:e,onClaim:t}){const n=Object.fromEntries(ur.map(i=>{try{return[i.slug,e.find(o=>o.slug===i.check(e))]}catch{return[i.slug,null]}})),s=ur.filter(i=>$p.has(i.slug)),r=ur.filter(i=>!$p.has(i.slug));return a.jsxs("div",{className:"pt-[92px]",children:[a.jsx("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 text-center",children:a.jsxs(G.div,{initial:{opacity:0,y:18},animate:{opacity:1,y:0},transition:{duration:.5},children:[a.jsxs("span",{className:"inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--gold-deep)] bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-full px-4 py-1.5",children:["🏆 ",ur.length," badges live"]}),a.jsxs("h1",{className:"font-display font-bold text-4xl sm:text-6xl text-[var(--ink)] tracking-tight mt-4",children:["Rewards worth ",a.jsx("span",{className:"grad-gold",children:"fighting for"})]}),a.jsx("p",{className:"text-[var(--ink-2)] mt-4 max-w-xl mx-auto",children:"Badges, titles and eternal glory. Earned on the leaderboard — shown off everywhere."}),a.jsx("button",{onClick:t,className:"btn-gold px-8 py-3.5 mt-7",children:"⚡ Start earning — claim your spot"})]})}),a.jsxs("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 mt-14",children:[a.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[a.jsx("h2",{className:"font-display font-bold text-2xl text-[var(--ink)]",children:"The crown jewels"}),a.jsx("span",{className:"text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-[#3A2200] bg-gradient-to-r from-[#FFD97A] via-[#F5B301] to-[#FFD97A]",children:"S-tier"}),a.jsx("div",{className:"flex-1 h-px bg-gradient-to-r from-[var(--gold)]/60 to-transparent"})]}),a.jsx("div",{className:"grid sm:grid-cols-3 gap-5",children:s.map((i,o)=>a.jsx(G.div,{initial:{opacity:0,y:24},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-40px"},transition:{duration:.45,delay:o*.1},className:"relative rounded-[28px] p-[2px] bg-gradient-to-br from-[#FFE9A8] via-[#F5B301] to-[#B87700] shadow-[0_16px_48px_-16px_rgba(245,158,11,0.55)]",children:a.jsxs("div",{className:"card-lift relative overflow-hidden rounded-[26px] bg-[var(--surface)] p-7 h-full",children:[a.jsx(zA,{}),a.jsx("div",{className:"absolute top-0 right-0 w-40 h-40 bg-[var(--gold)]/15 blur-3xl rounded-full"}),a.jsxs("div",{className:"flex items-start justify-between",children:[a.jsx(q,{children:a.jsx(G.div,{className:"text-7xl drop-shadow-lg",animate:{y:[0,-8,0],rotate:[0,-4,4,0]},transition:{duration:4,repeat:1/0,ease:"easeInOut",delay:o*.6},children:i.icon})}),a.jsx(Op,{tier:"S"})]}),a.jsx("h3",{className:"font-display font-bold text-2xl text-[var(--ink)] mt-5",children:i.name}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mt-2 mb-6",children:i.desc}),a.jsx(_p,{holder:n[i.slug]})]})},i.slug))})]}),a.jsxs("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 mt-14",children:[a.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[a.jsx("h2",{className:"font-display font-bold text-2xl text-[var(--ink)]",children:"Battle honors"}),a.jsx("span",{className:"text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-[var(--blaze)] bg-[var(--blaze)]/10 border border-[var(--blaze)]/25",children:"A-tier"}),a.jsx("div",{className:"flex-1 h-px bg-[var(--line)]"})]}),a.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-4 gap-4",children:r.map((i,o)=>a.jsxs(G.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-40px"},transition:{duration:.4,delay:o%4*.07},className:"card-lift relative overflow-hidden rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-5",children:[a.jsxs("div",{className:"flex items-start justify-between mb-3",children:[a.jsx(q,{children:a.jsx("div",{className:"text-5xl",children:i.icon})}),a.jsx(Op,{tier:"A"})]}),a.jsx("h3",{className:"font-display font-bold text-lg text-[var(--ink)]",children:i.name}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mt-1 mb-4",children:i.desc}),a.jsx(_p,{holder:n[i.slug],compact:!0})]},i.slug))})]}),a.jsx("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 mt-16",children:a.jsxs("div",{className:"relative overflow-hidden rounded-[32px] border border-[var(--blaze)]/30 bg-gradient-to-br from-[var(--blaze)]/[0.07] via-[var(--surface)] to-[var(--surface)] p-8 sm:p-10",children:[a.jsx("div",{className:"absolute -top-20 -right-20 w-72 h-72 bg-[var(--blaze)]/15 blur-3xl rounded-full"}),a.jsxs("div",{className:"text-center relative",children:[a.jsx("span",{className:"inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--blaze)] bg-[var(--blaze)]/10 border border-[var(--blaze)]/25 rounded-full px-4 py-1.5",children:"🔜 Coming soon"}),a.jsx("h2",{className:"font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mt-3",children:"Spot Perks"}),a.jsx("p",{className:"text-[var(--ink-2)] mt-2 max-w-lg mx-auto",children:"Purchasable upgrades to make your spot impossible to ignore. We're building the shop — claim your spot now and you'll be first in line when perks go live."})]}),a.jsxs("div",{className:"grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 relative",children:[_A.map((i,o)=>a.jsxs(G.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-40px"},transition:{duration:.4,delay:o%3*.08},className:"card-lift relative overflow-hidden rounded-3xl bg-[var(--surface-2)] border border-[var(--line)] p-6 flex flex-col",children:[a.jsx("div",{className:"absolute top-0 right-0 w-24 h-24 bg-[var(--blaze)]/10 blur-2xl rounded-full"}),a.jsxs("div",{className:"flex items-start justify-between",children:[a.jsx(q,{children:a.jsx("div",{className:"text-5xl",children:i.icon})}),a.jsx("span",{className:"text-xs font-bold text-[var(--ink-3)] bg-[var(--surface)] border border-[var(--line)] rounded-full px-3 py-1",children:i.price})]}),a.jsx("h3",{className:"font-display font-bold text-lg text-[var(--ink)] mt-4",children:i.name}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mt-1.5 mb-5 flex-1",children:i.desc}),a.jsx("button",{onClick:t,className:"w-full py-2.5 rounded-2xl font-bold text-sm text-[var(--blaze)] bg-[var(--blaze)]/10 border border-[var(--blaze)]/30 hover:bg-[var(--blaze)]/20 transition-colors",children:"⚡ Claim a spot for early access"})]},i.name)),a.jsxs("div",{className:"rounded-3xl border-2 border-dashed border-[var(--line)] p-6 flex flex-col items-center justify-center text-center min-h-[220px]",children:[a.jsx("div",{className:"text-4xl mb-3",children:"🤫"}),a.jsx("h3",{className:"font-display font-bold text-lg text-[var(--ink)]",children:"More perks brewing"}),a.jsx("p",{className:"text-[var(--ink-3)] text-sm mt-1.5",children:"Secret upgrades the community votes for."})]})]})]})}),a.jsxs("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 mt-14 mb-16",children:[a.jsx("h2",{className:"font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] text-center",children:"How rewards unlock"}),a.jsx("p",{className:"text-[var(--ink-2)] text-center mt-2 mb-8",children:"Five steps between you and eternal glory."}),a.jsxs("div",{className:"relative",children:[a.jsx("div",{className:"absolute left-[27px] sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[var(--gold)] via-[var(--blaze)] to-[var(--green)] opacity-40 sm:-translate-x-1/2","aria-hidden":!0}),OA.map((i,o)=>a.jsxs(G.div,{initial:{opacity:0,x:o%2?24:-24},whileInView:{opacity:1,x:0},viewport:{once:!0,margin:"-40px"},transition:{duration:.4},className:`relative flex gap-5 mb-6 last:mb-0 sm:w-1/2 ${o%2?"sm:ml-auto sm:pl-10":"sm:pr-10 sm:flex-row-reverse sm:text-right"}`,children:[a.jsxs("div",{className:"relative z-10 shrink-0 w-14 h-14 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-[var(--shadow-card)] flex items-center justify-center text-2xl",children:[i.icon,a.jsx("span",{className:"absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-deep)] text-white text-[11px] font-black flex items-center justify-center",children:i.n})]}),a.jsxs("div",{className:`bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 shadow-[var(--shadow-card)] flex-1 ${o%2?"":"sm:text-right"}`,children:[a.jsx("h3",{className:"font-display font-bold text-[var(--ink)] mb-1",children:i.t}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm",children:i.d})]})]},i.t))]}),a.jsx("div",{className:"text-center mt-10",children:a.jsx("button",{onClick:t,className:"btn-gold px-8 py-3.5",children:"⚡ Claim your spot — from $1"})})]})]})}function VA({f:e,open:t,onToggle:n}){const s=e.blog?gb(e.blog):null;return a.jsxs("div",{className:`bg-card border rounded-2xl overflow-hidden transition-colors ${t?"border-[var(--blaze)]":"border-line/5"}`,children:[a.jsxs("button",{onClick:n,className:"w-full flex items-center justify-between gap-4 px-5 py-4 text-left",children:[a.jsx("span",{className:"font-display font-bold text-snow text-[15px]",children:e.q}),a.jsx("span",{className:`text-[var(--blaze)] text-xl shrink-0 transition-transform ${t?"rotate-45":""}`,children:"＋"})]}),a.jsx("div",{className:`acc-body ${t?"acc-open":""}`,children:a.jsxs("div",{className:"acc-inner",children:[a.jsx("p",{className:"px-5 pb-5 text-mist text-sm leading-relaxed",children:e.a}),s&&a.jsx("div",{className:"px-5 pb-5",children:a.jsxs(_,{to:s.url,className:"inline-flex items-center gap-2 text-sm font-bold text-[var(--blaze)] hover:underline",children:["📖 Read the full guide: ",s.title," →"]})})]})})]})}function UA({onClaim:e}){const[t,n]=w.useState(0);return a.jsx("div",{className:"pt-[92px]",children:a.jsxs("div",{className:"max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16",children:[a.jsxs("h1",{className:"font-display font-bold text-4xl sm:text-5xl text-snow tracking-tight text-center",children:["Frequently asked ",a.jsx("span",{className:"grad-text",children:"questions"})]}),a.jsx("p",{className:"text-mist text-center mt-3 mb-10",children:"Everything you need to know before you claim the spotlight."}),a.jsx("div",{className:"space-y-3",children:kb.map((s,r)=>a.jsx(VA,{f:s,open:t===r,onToggle:()=>n(t===r?-1:r)},s.q))}),a.jsxs("div",{className:"mt-12 rounded-3xl bg-card border border-line/5 p-8 text-center",children:[a.jsx("h2",{className:"font-display font-bold text-2xl text-snow",children:"Still have questions?"}),a.jsx("p",{className:"text-mist text-sm mt-2 mb-5",children:"Or are you ready to stop reading and start climbing?"}),a.jsxs("div",{className:"flex flex-col sm:flex-row gap-3 justify-center",children:[a.jsx("button",{onClick:e,className:"btn-primary px-8 py-3.5",children:"⚡ Claim My Spot — $1"}),a.jsx(_,{to:"/leaderboard",className:"btn-ghost px-8 py-3.5 text-center",children:"See the leaderboard"})]})]})]})})}function ct({title:e,children:t}){return a.jsxs("section",{className:"mb-9 scroll-mt-28",id:e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),children:[a.jsx("h2",{className:"font-display font-bold text-xl sm:text-2xl text-[var(--ink)] tracking-tight mb-3",children:e}),a.jsx("div",{className:"text-[var(--ink-2)] text-[15px] leading-relaxed space-y-3",children:t})]})}function HA(){return a.jsx("div",{className:"pt-[92px]",children:a.jsxs("div",{className:"max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10",children:[a.jsxs(G.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.45},children:[a.jsx("p",{className:"inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--blaze)] bg-[var(--blaze)]/10 rounded-full px-4 py-1.5 mb-5",children:"🔒 Privacy Policy"}),a.jsxs("h1",{className:"font-display font-bold text-4xl sm:text-5xl text-[var(--ink)] tracking-tight",children:["Your data, ",a.jsx("span",{className:"grad-text",children:"our promise"})]}),a.jsx("p",{className:"text-[var(--ink-2)] mt-3 text-sm",children:"Effective date: September 1, 2026 · Last updated: September 2026"}),a.jsx("p",{className:"text-[var(--ink-2)] mt-4 leading-relaxed",children:'FlexSpot.LOL ("FlexSpot", "we", "us", "our") operates the live spotlight leaderboard at flexspot.lol. This Privacy Policy explains what information we collect when you browse, claim a spot, boost a brand, or use referral links — how we use it, who we share it with, and the choices you have. Short version: we collect only what the competition needs to run, most of it is shown publicly by design, and we never sell your personal information.'}),a.jsxs("p",{className:"text-[var(--ink-2)] mt-3 leading-relaxed",children:["By using FlexSpot, you agree to the practices described here. If you do not agree, please do not use the service. This policy should be read together with our"," ",a.jsx(_,{to:"/terms",className:"text-[var(--blaze)] hover:underline font-semibold",children:"Terms of Service"}),"."]})]}),a.jsxs("div",{className:"mt-10 rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-9",children:[a.jsx(ct,{title:"1. Definitions",children:a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:'"Personal data"'})," means information that identifies or can be reasonably linked to you as an individual (for example, your email address or a payment screenshot containing your wallet details)."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:'"Public spot data"'})," means brand name, tagline, description, website, social links, logo, contribution amounts, and referral supporter names that you choose to publish on the public leaderboard."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:'"Service"'})," means the FlexSpot.LOL website, leaderboard, claim and boost flows, referral program, and admin review systems."]})]})}),a.jsxs(ct,{title:"2. Data we collect",children:[a.jsx("p",{children:"We collect the following categories of information:"}),a.jsx("p",{children:a.jsx("strong",{className:"text-[var(--ink)]",children:"A. Information you give us directly"})}),a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Brand / display name, tagline, and description"})," — shown publicly on the leaderboard and your spot profile page."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Website and social links"})," (X, Instagram, Facebook, LinkedIn) — shown publicly."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Logo / profile image"})," — optional, shown publicly."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Email address"})," — optional; used only to contact you about your spot (approval status, disputes, important service notices). Never displayed publicly."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Payment screenshot"})," — required to manually verify your USDT payment. Kept private and never displayed publicly."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Transaction ID (TxID)"})," — optional; used only to help verify a payment. Kept private."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Referral information"})," — which referral code brought a visitor, and the display name you enter to create a personal referral link. Supporter names are shown publicly on spot profiles and referral boards."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Contributor name / handle"}),` — when you boost a brand, the name you enter is shown publicly on that brand's page (defaults to "Anonymous booster" if left blank).`]})]}),a.jsx("p",{children:a.jsx("strong",{className:"text-[var(--ink)]",children:"B. Data collected automatically"})}),a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Usage data"})," — page views on spots, leaderboard visits, and interaction counts, so the site can display live counters and trends. Collected in aggregated or pseudonymous form."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Device and browser information"})," — such as browser type and approximate region, used for abuse prevention and to improve the service. We do not run behavioral advertising trackers."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Referral visit records"})," — when someone visits through a referral link, we record the referral code and the time of visit so the $1-per-visit credit can be applied (limited to one credit per visitor per day)."]})]}),a.jsx("p",{children:a.jsx("strong",{className:"text-[var(--ink)]",children:"C. Data stored in your browser (local storage)"})}),a.jsx("p",{children:"The site stores small amounts of data locally in your own browser — for example theme preference, draft claim details, and referral-visit flags used to enforce the one-credit-per-day rule. This data stays on your device and is not transmitted to our servers; clearing your browser data removes it. We do not use third-party tracking cookies or cross-site advertising identifiers."})]}),a.jsxs(ct,{title:"3. Purpose and legal basis",children:[a.jsx("p",{children:"We process your information only for these purposes:"}),a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Operating the competition"})," — displaying your brand on the public leaderboard and spot profile pages (based on your agreement to the Terms when you submit)."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Verifying payments"})," — reviewing uploaded screenshots and TxIDs to confirm genuine USDT transfers (necessary to provide the paid service)."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Communication"})," — contacting you about approvals, disputes, or important service changes, only if you provided an email (your consent; you may withdraw it by asking us to delete it)."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Referral rewards"})," — crediting the correct spot and referrer for referral-driven visits (based on your agreement to the referral program terms)."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Fraud and abuse prevention"})," — detecting fake payment proofs, spam, impersonation, and referral farming (our legitimate interest in keeping the competition fair)."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Improvement and analytics"})," — using aggregated, anonymous statistics to improve the service (our legitimate interest; no individual profiling)."]})]}),a.jsx("p",{children:"We will never use your personal data for purposes materially different from those above without first telling you and, where required, obtaining your consent."})]}),a.jsx(ct,{title:"4. What is public by design",children:a.jsxs("p",{children:["FlexSpot is a public leaderboard. Anything you enter as brand name, tagline, description, website, social links, logo, contribution amount, referral supporter name, or boost contributor name is ",a.jsx("strong",{className:"text-[var(--ink)]",children:"published publicly"})," on the leaderboard and spot profile pages, and may be indexed by search engines. Email addresses, payment screenshots, and transaction IDs are ",a.jsx("strong",{className:"text-[var(--ink)]",children:"never published"})," and are visible only to our review team. Only share brand information you are comfortable showing to the whole internet."]})}),a.jsxs(ct,{title:"5. Third parties and data sharing",children:[a.jsx("p",{children:"We do not sell, rent, or trade your personal information. We share data only as follows:"}),a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Supabase (database hosting)"})," — when the service runs on live infrastructure, your submissions and account records are stored on Supabase-hosted databases. Supabase processes this data only on our instructions as a service provider."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Blockchain networks"})," — USDT payments are verified against public blockchain records (BNB Smart Chain, Solana, Tron). Transaction details on public blockchains are inherently public; we cannot control or delete them."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Legal compliance"})," — we may disclose information if required by law, court order, or to protect against fraud, abuse, or harm to others."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Business transfer"})," — if FlexSpot is acquired or merged, user data may transfer to the new operator, who will be bound by this policy or a materially equivalent one."]})]}),a.jsx("p",{children:"We do not currently share data with advertising networks or data brokers, and we do not use third-party analytics that build cross-site profiles of you."})]}),a.jsxs(ct,{title:"6. Data retention",children:[a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Public spot data"})," (brand name, links, amounts, referral supporter names) is kept as long as your spot remains on the leaderboard — the public leaderboard is the product you purchased."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Payment screenshots and transaction IDs"})," are kept for up to 24 months after your submission, for verification and dispute handling, then deleted."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Email addresses"})," are kept until you ask us to delete them or your spot is removed."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Rejected submissions"})," and their payment proofs are deleted within 90 days of rejection, unless a dispute is open."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Aggregated analytics"})," contain no personal identifiers and may be retained indefinitely."]})]}),a.jsx("p",{children:"If you would like your spot removed from the leaderboard or your private details deleted, contact us (see section 9). Removal from the public leaderboard takes effect promptly; please note that cached copies and search-engine indexes may take time to update."})]}),a.jsx(ct,{title:"7. Data security",children:a.jsx("p",{children:"We protect your information with reasonable technical and organizational measures: encrypted connections (HTTPS) for all traffic, access-limited review dashboards for payment proofs, and strict separation between public spot data and private verification data. No method of transmission or storage is completely secure, so we cannot guarantee absolute security — but we treat your payment proofs and contact details as confidential and limit access to the small team that performs verification."})}),a.jsxs(ct,{title:"8. Your rights",children:[a.jsx("p",{children:"You have the following rights over your personal data. To exercise any of them, contact us (section 9):"}),a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Access"})," — ask for a copy of the personal data we hold about you."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Correction"})," — ask us to fix inaccurate or incomplete information (for example, a wrong link on your spot)."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Deletion"})," — ask us to delete your private details (email, payment proof, TxID) or remove your spot from the leaderboard."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Restriction and objection"})," — ask us to limit or stop certain processing, such as promotional contact."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Portability"})," — receive your submitted data in a commonly used format."]})]}),a.jsx("p",{children:"We will respond to requests within 30 days. Where the data you ask to delete is public spot data tied to a paid placement, deletion removes the spot from the leaderboard; it does not entitle you to a refund (see the Terms of Service, section 4)."})]}),a.jsx(ct,{title:"9. Contact us",children:a.jsxs("p",{children:["For privacy questions, data requests, or complaints, contact us at"," ",a.jsx("a",{href:"mailto:support@flexspot.lol",className:"text-[var(--blaze)] hover:underline font-semibold",children:"support@flexspot.lol"})," ",'with the subject line "Privacy". We aim to respond within 7 business days. If you are not satisfied with our response, you may contact your local data protection authority.']})}),a.jsx(ct,{title:"10. Minors",children:a.jsxs("p",{children:["FlexSpot is not directed at children under 13, and payments require you to be 18 or older (or to have a parent/guardian's consent). We do not knowingly collect personal data from children under 13. If we learn that we have collected such data, we will delete it promptly. If you believe a child has provided us with personal data, contact us at"," ",a.jsx("a",{href:"mailto:support@flexspot.lol",className:"text-[var(--blaze)] hover:underline font-semibold",children:"support@flexspot.lol"}),"."]})}),a.jsx(ct,{title:"11. International transfers",children:a.jsx("p",{children:"FlexSpot is operated from the United Arab Emirates. Your data may be stored or processed in the UAE or in the regions where our infrastructure providers (such as Supabase) host data. By using the service, you consent to this transfer. Where required, we apply appropriate safeguards for cross-border transfers."})}),a.jsx(ct,{title:"12. Changes to this policy",children:a.jsx("p",{children:'We may update this policy as FlexSpot evolves. We will update the "Last updated" date above and, for material changes, highlight them on the site (for example, a notice on the homepage or claim page) before they take effect. Continued use of FlexSpot after changes take effect means you accept the updated policy.'})})]}),a.jsxs("div",{className:"mt-8 flex flex-col sm:flex-row gap-3 justify-center",children:[a.jsx(_,{to:"/terms",className:"btn-ghost px-6 py-3 text-center text-sm",children:"Read the Terms of Service"}),a.jsx(_,{to:"/claim",className:"btn-primary px-6 py-3 text-center text-sm",children:"⚡ Claim Your Spot"})]})]})})}function Ee({title:e,children:t,anchor:n}){const s=n||e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");return a.jsxs("section",{className:"mb-9 scroll-mt-28",id:s,children:[a.jsx("h2",{className:"font-display font-bold text-xl sm:text-2xl text-[var(--ink)] tracking-tight mb-3",children:e}),a.jsx("div",{className:"text-[var(--ink-2)] text-[15px] leading-relaxed space-y-3",children:t})]})}function qA(){const{hash:e}=Ze();return w.useEffect(()=>{if(e){const t=document.getElementById(e.replace("#",""));t&&setTimeout(()=>t.scrollIntoView({behavior:"smooth",block:"start"}),120)}},[e]),a.jsx("div",{className:"pt-[92px]",children:a.jsxs("div",{className:"max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10",children:[a.jsxs(G.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.45},children:[a.jsx("p",{className:"inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--gold)] bg-[var(--gold)]/10 rounded-full px-4 py-1.5 mb-5",children:"📜 Terms of Service"}),a.jsxs("h1",{className:"font-display font-bold text-4xl sm:text-5xl text-[var(--ink)] tracking-tight",children:["The rules of ",a.jsx("span",{className:"grad-text",children:"the game"})]}),a.jsx("p",{className:"text-[var(--ink-2)] mt-3 text-sm",children:"Effective date: September 1, 2026 · Last updated: September 2026"}),a.jsxs("p",{className:"text-[var(--ink-2)] mt-4 leading-relaxed",children:['These Terms of Service ("Terms") form a legally binding agreement between you and the operator of FlexSpot.LOL ("FlexSpot", "we", "us", "our"). By browsing the site, claiming a spot, boosting a brand, using a referral link, or otherwise using the service, you agree to these Terms and to our'," ",a.jsx(_,{to:"/privacy",className:"text-[var(--blaze)] hover:underline font-semibold",children:"Privacy Policy"}),". If you do not agree, do not use FlexSpot."]})]}),a.jsxs("div",{className:"mt-10 rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-9",children:[a.jsxs(Ee,{title:"1. What FlexSpot is",children:[a.jsx("p",{children:'FlexSpot is a public, internet-wide leaderboard competition. Users purchase public visibility placements ("spots") for brands, projects, or themselves. Spots are ranked on a live public leaderboard, and brands can be boosted with additional contributions to climb the rankings. A referral program credits spots for visits made through personal referral links.'}),a.jsxs("p",{children:["FlexSpot sells ",a.jsx("strong",{className:"text-[var(--ink)]",children:"public exposure on a leaderboard"}),". It is an entertainment and visibility service — not an investment product, not a securities offering, not a gambling service, and not financial advice. Nothing on this site constitutes an offer to invest, a promise of returns, or a recommendation to buy any asset."]})]}),a.jsx(Ee,{title:"2. Eligibility",children:a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:["You must be ",a.jsx("strong",{className:"text-[var(--ink)]",children:"18 years or older"}),", or have the consent of a parent or legal guardian, to make a payment on FlexSpot. By paying, you represent that you meet this requirement."]}),a.jsx("li",{children:"You must have the legal capacity to enter into a binding agreement in your jurisdiction."}),a.jsx("li",{children:"You are responsible for ensuring that using FlexSpot and sending cryptocurrency payments is lawful where you live. We do not offer the service where it is prohibited by law."}),a.jsx("li",{children:"No account registration is required to claim a spot; submissions are tied to the brand details and payment proof you provide."})]})}),a.jsx(Ee,{title:"3. Claiming a spot and boost purchases",children:a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Minimum $1"})," to claim a spot or boost a brand. Any amount from $1 up is accepted, to two decimal places."]}),a.jsxs("li",{children:["Payments are made in ",a.jsx("strong",{className:"text-[var(--ink)]",children:"USDT (Tether)"})," only, sent manually by you to the wallet address shown for the network you choose (BNB Smart Chain / BEP20, Solana, or Tron / TRC20)."]}),a.jsxs("li",{children:["To complete a submission you must upload a ",a.jsx("strong",{className:"text-[var(--ink)]",children:"screenshot of the completed payment"})," (required). A transaction ID (TxID) is optional but helps us verify faster."]}),a.jsxs("li",{children:["Every claim and boost is reviewed by our team before it takes effect — ",a.jsx("strong",{className:"text-[var(--ink)]",children:"admin approval is required"}),'. New spots show as "Pending Approval" until verified; boost amounts land on the board only after verification.']}),a.jsxs("li",{children:["The amount you select is the total you pay — ",a.jsx("strong",{className:"text-[var(--ink)]",children:"we add no fees"}),". (Your wallet or the blockchain network may charge its own transfer fees; those are between you and your provider.)"]}),a.jsx("li",{children:"We may reject any submission that fails verification, violates these Terms, or appears fraudulent. Rejected submissions are not published, and genuine but unverifiable payments are handled under section 4."})]})}),a.jsx(Ee,{title:"4. USDT payment terms and refunds",children:a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"All sales are final."})," Once your spot or boost has been approved and published on the leaderboard, the payment is ",a.jsx("strong",{className:"text-[var(--ink)]",children:"non-refundable"})," — the public exposure you purchased begins immediately upon publication."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"You are responsible for the transfer."})," Cryptocurrency transfers are irreversible. You must send USDT on the correct network to the exact address shown. We are not responsible for funds sent to the wrong address, on the wrong network, in the wrong token, or in the wrong amount."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Rejected claims."})," If your submission is rejected during review (for example, invalid or unverifiable proof), we will first work with you to resolve it. For verified genuine payments that cannot be approved, we will arrange a refund of the received amount to a wallet address you provide, minus any network transfer fees. Refunds, where offered, are at our sole discretion and processed in USDT."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Duplicate or overpaid transfers"})," may be credited as a boost to the same spot or refunded at our discretion; contact us promptly at ",a.jsx("a",{href:"mailto:support@flexspot.lol",className:"text-[var(--blaze)] hover:underline font-semibold",children:"support@flexspot.lol"}),"."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Fraudulent payments"})," (fake, reused, or manipulated proofs) are never refunded and result in a permanent ban under section 6."]})]})}),a.jsx(Ee,{title:"5. Leaderboard ranking mechanics",children:a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Rank is decided by total contribution amount, highest first."})," The spot with the highest verified total holds the #1 position."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Ties are broken by claim time"})," — the spot that was claimed first ranks higher."]}),a.jsx("li",{children:"Any increase in a spot's total — a boost, a referral credit, or a new contribution — immediately re-ranks the board. Rankings update as payments are verified."}),a.jsxs("li",{children:["View counts, leaderboard movement indicators, and activity feeds are engagement features; they ",a.jsx("strong",{className:"text-[var(--ink)]",children:"do not determine rank"}),". Rank follows verified contribution amounts only."]}),a.jsx("li",{children:"Pending (unverified) submissions do not affect rankings until approved."})]})}),a.jsxs(Ee,{title:"6. Prohibited conduct",children:[a.jsx("p",{children:"You agree not to, and not to allow others to:"}),a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:["Submit ",a.jsx("strong",{className:"text-[var(--ink)]",children:"fake, forged, reused, or manipulated payment proofs"})," — this leads to rejection and a permanent ban."]}),a.jsx("li",{children:"Impersonate another brand, person, or entity, or submit logos, names, or content you do not have the right to use."}),a.jsx("li",{children:"Submit content that is illegal, defamatory, hateful, sexually explicit involving minors, or that promotes violence or wrongdoing."}),a.jsx("li",{children:"Use bots, scripts, click farms, fake views, or any automated means to inflate counters, referral credits, or activity feeds."}),a.jsx("li",{children:"Farm referral credits through self-visits, VPN/proxy rotation, or other artificial traffic — credits earned this way will be reversed and accounts banned."}),a.jsx("li",{children:"Attempt to access the admin dashboard or other users' data, interfere with the site's operation, or probe its security."}),a.jsx("li",{children:"Use the service for money laundering, sanctions evasion, or any other unlawful purpose."})]}),a.jsx("p",{children:"We may, at our sole discretion and without prior notice, edit, demote, suspend, or permanently remove any spot or submission that violates these Terms, and ban the responsible party from future participation. No refunds are owed for removals caused by violations."})]}),a.jsx(Ee,{title:"7. Your content — rights and license",children:a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsx("li",{children:"You retain ownership of the brand materials you submit (names, taglines, descriptions, logos, links)."}),a.jsxs("li",{children:["By submitting content to FlexSpot, you grant us a ",a.jsx("strong",{className:"text-[var(--ink)]",children:"worldwide, non-exclusive, royalty-free license"})," to display, reproduce, and distribute that content on the leaderboard, spot profile pages, social channels, and marketing materials for the service, for as long as your spot is active."]}),a.jsx("li",{children:"You represent and warrant that you own or have the rights to everything you submit, and that it does not infringe any third party's intellectual property, privacy, or other rights."}),a.jsxs("li",{children:["If you believe content on FlexSpot infringes your rights, contact us at ",a.jsx("a",{href:"mailto:support@flexspot.lol",className:"text-[var(--blaze)] hover:underline font-semibold",children:"support@flexspot.lol"})," with details, and we will review it promptly."]})]})}),a.jsx(Ee,{title:"8. Referral program terms",children:a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:["Each spot can generate personal referral links. Every genuine visit through a referral link credits ",a.jsx("strong",{className:"text-[var(--ink)]",children:"$1"})," to that spot's total contribution amount."]}),a.jsxs("li",{children:["Credits are limited to ",a.jsx("strong",{className:"text-[var(--ink)]",children:"one per visitor per day"})," per spot. Repeat visits from the same visitor within the same day do not earn additional credits."]}),a.jsx("li",{children:"Only genuine human visits count. Self-referrals, bot traffic, incentivized click schemes, and other artificial visits are fraud: credits will be reversed and the spot may be removed under section 6."}),a.jsx("li",{children:"Referral credits increase a spot's total and therefore its rank, exactly like paid boosts."}),a.jsx("li",{children:"The referral reward amount, crediting rules, and program availability may be adjusted as the program evolves. Material changes will be announced on the site before they take effect and will apply going forward, not retroactively to already-credited visits."}),a.jsx("li",{children:"Referral earnings shown on the site are informational records of credits applied to spots; they are not a currency, not withdrawable unless a future wallet feature is launched, and have no cash value outside the competition."})]})}),a.jsx(Ee,{title:"9. Admin approval and the admin dashboard",children:a.jsx("p",{children:"All claims and boosts require manual review before going live. We aim to review submissions within 24 hours but make no guarantee of review times. The admin dashboard is protected by PIN authentication and is for the FlexSpot operations team only; unauthorized access attempts are prohibited and may be reported."})}),a.jsx(Ee,{title:"10. Service availability — no SLA",children:a.jsxs("p",{children:["We work hard to keep FlexSpot fast and available, but the service is provided on an",a.jsx("strong",{className:"text-[var(--ink)]",children:' "as is" and "as available"'})," basis. We do not guarantee uninterrupted, error-free, or secure operation, and we offer no service-level agreement (SLA). We may perform maintenance, modify features, or suspend the service temporarily at any time, with or without notice. Rankings, counters, and displayed figures are computed from our records; in the event of a technical error, our corrected records prevail."]})}),a.jsx(Ee,{title:"11. Disclaimers",anchor:"disclaimers",children:a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Preview / demo data."})," While the site operates in preview mode, the leaderboard may include illustrative demo entries used to demonstrate how FlexSpot works. Demo entries are labelled as such, represent no real payment or endorsement, and will be cleared when the live competition opens."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Cryptocurrency risk."})," USDT is a digital asset whose value can fluctuate and whose transfers are irreversible. Blockchain networks can experience delays, congestion, or failures outside our control. You are solely responsible for entering the correct wallet address and network; lost or misdirected transfers cannot be recovered by us."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"No guarantees."})," We make no promise, guarantee, or representation regarding the amount of traffic, views, clicks, sales, leads, or any other outcome your spot will receive. Rankings reflect contribution amounts, not commercial performance. Nothing on FlexSpot is financial, investment, or legal advice."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Third-party brands."})," Brand names, logos, and trademarks appearing on the leaderboard belong to their respective owners. Their appearance does not imply endorsement of, or affiliation with, FlexSpot, and FlexSpot's display of user-submitted brand content does not imply our endorsement of those brands."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Not a regulated entity."})," FlexSpot is an entertainment and visibility service. We are not a bank, broker, exchange, investment adviser, or other regulated financial institution, and the service does not offer regulated financial products."]})]})}),a.jsxs(Ee,{title:"12. Limitation of liability",children:[a.jsx("p",{children:"To the maximum extent permitted by applicable law, FlexSpot and its operators, officers, and team members will not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, revenue, data, or goodwill — arising from your use of (or inability to use) the service, even if advised of the possibility of such damages."}),a.jsxs("p",{children:["Our total aggregate liability for any claim arising out of or relating to these Terms or the service will not exceed the ",a.jsx("strong",{className:"text-[var(--ink)]",children:"total amount you paid to FlexSpot in the 12 months"})," preceding the claim, or USD 100, whichever is greater. Some jurisdictions do not allow certain limitations; in those cases our liability is limited to the greatest extent permitted by law."]})]}),a.jsx(Ee,{title:"13. Indemnification",children:a.jsx("p",{children:"You agree to indemnify, defend, and hold harmless FlexSpot and its operators, officers, and team members from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from: (a) your use of the service; (b) your violation of these Terms; (c) content you submit, including any claim that it infringes third-party rights; or (d) your violation of any law or regulation."})}),a.jsx(Ee,{title:"14. Termination",children:a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsx("li",{children:"We may suspend or terminate your access to the service, and remove your spots, at any time for violation of these Terms, suspected fraud, or to comply with legal obligations — with or without notice."}),a.jsxs("li",{children:["You may stop using FlexSpot at any time. You may request removal of your spot and deletion of your private data by contacting ",a.jsx("a",{href:"mailto:support@flexspot.lol",className:"text-[var(--blaze)] hover:underline font-semibold",children:"support@flexspot.lol"}),"."]}),a.jsx("li",{children:"Termination does not entitle you to a refund for published placements (see section 4). Sections 4, 6, 7, 11, 12, 13, 15, and 16 survive termination."})]})}),a.jsx(Ee,{title:"15. Dispute resolution and governing law",children:a.jsxs("p",{children:["These Terms are governed by the ",a.jsx("strong",{className:"text-[var(--ink)]",children:"laws of the United Arab Emirates"}),". If a dispute arises, you agree to first contact us at"," ",a.jsx("a",{href:"mailto:support@flexspot.lol",className:"text-[var(--blaze)] hover:underline font-semibold",children:"support@flexspot.lol"})," ","and attempt to resolve it informally for 30 days. If the dispute is not resolved, it will be subject to the ",a.jsx("strong",{className:"text-[var(--ink)]",children:"exclusive jurisdiction of the courts of Dubai, United Arab Emirates"}),". You consent to that jurisdiction and waive any objection to venue."]})}),a.jsx(Ee,{title:"16. Changes to these terms",children:a.jsx("p",{children:'We may update these Terms as FlexSpot grows. Material changes will be highlighted on the site (for example, a notice on the homepage) before they take effect, and the "Last updated" date above will always reflect the current version. Continued use of FlexSpot after changes take effect constitutes acceptance of the updated Terms. If you do not agree to updated Terms, you must stop using the service.'})}),a.jsx(Ee,{title:"17. General provisions",children:a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Entire agreement."})," These Terms and the Privacy Policy constitute the entire agreement between you and FlexSpot regarding the service."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Severability."})," If any provision is found unenforceable, the remaining provisions continue in full force."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"No waiver."})," Our failure to enforce any provision is not a waiver of our right to do so later."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Assignment."})," You may not assign your rights under these Terms; we may assign ours in connection with a merger, acquisition, or sale of assets."]}),a.jsxs("li",{children:[a.jsx("strong",{className:"text-[var(--ink)]",children:"Contact."})," Questions about these Terms: ",a.jsx("a",{href:"mailto:support@flexspot.lol",className:"text-[var(--blaze)] hover:underline font-semibold",children:"support@flexspot.lol"}),"."]})]})})]}),a.jsxs("div",{className:"mt-8 flex flex-col sm:flex-row gap-3 justify-center",children:[a.jsx(_,{to:"/privacy",className:"btn-ghost px-6 py-3 text-center text-sm",children:"Read the Privacy Policy"}),a.jsx(_,{to:"/claim",className:"btn-primary px-6 py-3 text-center text-sm",children:"⚡ Claim Your Spot — $1"})]})]})})}function is({title:e,children:t}){return a.jsxs("section",{className:"mb-9",children:[a.jsx("h2",{className:"font-display font-bold text-xl sm:text-2xl text-[var(--ink)] tracking-tight mb-3",children:e}),a.jsx("div",{className:"text-[var(--ink-2)] text-[15px] leading-relaxed space-y-3",children:t})]})}function YA(){return a.jsx("div",{className:"pt-[92px]",children:a.jsxs("div",{className:"max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10",children:[a.jsxs(G.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.45},children:[a.jsx("p",{className:"inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--blaze)] bg-[var(--blaze)]/10 rounded-full px-4 py-1.5 mb-5",children:"Disclaimers"}),a.jsxs("h1",{className:"font-display font-bold text-4xl sm:text-5xl text-[var(--ink)] tracking-tight",children:["Read this ",a.jsx("span",{className:"grad-text",children:"before you pay"})]}),a.jsx("p",{className:"text-[var(--ink-2)] mt-3 text-sm",children:"Last updated: September 23, 2026"}),a.jsxs("p",{className:"text-[var(--ink-2)] mt-4 leading-relaxed",children:['FlexSpot.LOL ("FlexSpot", "we", "us", "our") is a public spotlight leaderboard at flexspot.lol, operated by Dawood Shah, Dubai, United Arab Emirates. This page sets out the important limitations of the service in plain language. It forms part of our',a.jsx(_,{to:"/terms",className:"text-[var(--blaze)] hover:underline font-semibold",children:" Terms of Service"}),"."]})]}),a.jsxs("div",{className:"mt-10 rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-9",children:[a.jsxs(is,{title:"1. Visibility and earnings disclaimer",children:[a.jsxs("p",{children:["Paying for a spot on the FlexSpot leaderboard buys ",a.jsx("strong",{className:"text-[var(--ink)]",children:"visibility placement only"})," — a public position on the leaderboard and a public spot profile page for your brand. We make ",a.jsx("strong",{className:"text-[var(--ink)]",children:"no guarantee"}),"of any traffic, page views, clicks, leads, sales, revenue, or earnings resulting from a paid spot. A high leaderboard position is determined transparently by total contributed amounts, but it is ",a.jsx("strong",{className:"text-[var(--ink)]",children:"not an endorsement"}),"of the brand by FlexSpot, and it does not imply that the brand is vetted, verified, or recommended by us."]}),a.jsx("p",{children:"FlexSpot sells public exposure on a leaderboard. It is not an investment product, not an advertising network with guaranteed impressions, and not financial advice of any kind."})]}),a.jsx(is,{title:"2. Referral rewards disclaimer",children:a.jsxs("p",{children:["Referral credits earned through personal referral links are ",a.jsx("strong",{className:"text-[var(--ink)]",children:"promotional ledger entries only"}),". They increase a spot's visible total on the leaderboard and currently have ",a.jsx("strong",{className:"text-[var(--ink)]",children:"no cash value"}),": they cannot be redeemed, transferred, converted, or withdrawn. A user login, wallet, and withdrawal feature is planned for a future phase of the service but is",a.jsx("strong",{className:"text-[var(--ink)]",children:" not yet available"}),". Nothing on this site should be read as a promise that referral credits will ever acquire monetary value or become withdrawable."]})}),a.jsx(is,{title:"3. Crypto and payment disclaimer",children:a.jsxs("ul",{className:"list-disc pl-5 space-y-1.5",children:[a.jsxs("li",{children:["Payments are made ",a.jsx("strong",{className:"text-[var(--ink)]",children:"manually in USDT"})," to wallet addresses displayed on our claim page for the network you select (BSC, Solana, or Tron)."]}),a.jsxs("li",{children:["Always ",a.jsx("strong",{className:"text-[var(--ink)]",children:"verify the wallet address and network"})," before sending. Cryptocurrency transactions are ",a.jsx("strong",{className:"text-[var(--ink)]",children:"irreversible"})," once confirmed on-chain — we cannot reverse or recover funds sent to the wrong address or network."]}),a.jsx("li",{children:"We will never ask for your private keys, seed phrases, or wallet passwords. Anyone asking for them is not us."}),a.jsxs("li",{children:["All claims and boosts require manual review and ",a.jsx("strong",{className:"text-[var(--ink)]",children:"admin approval"})," before going live; verification times may vary."]})]})}),a.jsx(is,{title:"4. Demo and preview data disclaimer",children:a.jsxs("p",{children:["FlexSpot currently runs in ",a.jsx("strong",{className:"text-[var(--ink)]",children:"preview/demo mode"}),". Some leaderboard listings may be ",a.jsx("strong",{className:"text-[var(--ink)]",children:"illustrative demo or preview entries"})," used to demonstrate how the service works. Demo entries represent no real brand, no real payment, and no endorsement. Rankings, amounts, and activity shown during preview mode are illustrative and do not reflect live competition results. Demo entries will be cleared when the live competition opens."]})}),a.jsx(is,{title:'5. General "as is" disclaimer',children:a.jsxs("p",{children:["The FlexSpot service is provided ",a.jsx("strong",{className:"text-[var(--ink)]",children:'"as is" and "as available"'}),", without warranties of any kind, express or implied. While we aim for high uptime, fair rankings, and accurate counters, we cannot guarantee uninterrupted availability, error-free operation, or the accuracy of displayed data at all times. Use of the service is at your own risk. For the full limitation of our liability, see section 12 of our ",a.jsx(_,{to:"/terms",className:"text-[var(--blaze)] hover:underline font-semibold",children:"Terms of Service"}),"."]})}),a.jsx(is,{title:"6. Contact",children:a.jsx("p",{children:"Questions about these disclaimers? Contact the site operator — Dawood Shah, Dubai, UAE — via the Contact link in the footer of this site."})})]}),a.jsxs("div",{className:"mt-8 flex flex-col sm:flex-row gap-3 justify-center",children:[a.jsx(_,{to:"/terms",className:"btn-ghost px-6 py-3 text-center text-sm",children:"Read the Terms of Service"}),a.jsx(_,{to:"/privacy",className:"btn-ghost px-6 py-3 text-center text-sm",children:"Read the Privacy Policy"})]})]})})}function GA({spot:e,compact:t=!1,refCode:n=null}){const[s,r]=w.useState(!1),i=window.location.origin,o=kC(e,i,n),l=async()=>{await vb(o.url)&&(r(!0),setTimeout(()=>r(!1),1800))},c="flex items-center justify-center gap-2 rounded-xl font-semibold transition-all hover:-translate-y-0.5 text-sm",d=t?"px-3 py-2":"px-4 py-2.5";return a.jsxs("div",{className:"flex flex-wrap gap-2 ",children:[a.jsxs("a",{href:o.facebook,target:"_blank",rel:"noopener noreferrer",className:`${c} ${d} bg-[#1877F2]/15 text-[#5b9dff] border border-[#1877F2]/30 hover:bg-[#1877F2]/25`,children:[a.jsx("span",{children:"📘"})," Facebook"]}),a.jsxs("a",{href:o.x,target:"_blank",rel:"noopener noreferrer",className:`${c} ${d} bg-line/10 text-snow border border-line/15 hover:bg-line/15`,children:[a.jsx("span",{children:"𝕏"})," Post"]}),a.jsxs("a",{href:o.telegram,target:"_blank",rel:"noopener noreferrer",className:`${c} ${d} bg-[#229ED9]/15 text-[#5cc8f5] border border-[#229ED9]/30 hover:bg-[#229ED9]/25`,children:[a.jsx("span",{children:"✈️"})," Telegram"]}),a.jsx("button",{onClick:l,className:`${c} ${d} ${s?"bg-[var(--green-soft)] text-[var(--green)] border border-[var(--green)]":"bg-line/5 text-mist border border-line/10 hover:text-snow"}`,children:s?"✓ Copied!":"🔗 Copy link"})]})}const KA=8e3;function QA({rank:e}){const t=w.useMemo(()=>{var i;return typeof window<"u"&&((i=window.matchMedia)==null?void 0:i.call(window,"(prefers-reduced-motion: reduce)").matches)},[]),[n,s]=w.useState(0);w.useEffect(()=>{if(t)return;const i=setInterval(()=>s(o=>o+1),KA);return()=>clearInterval(i)},[t]);const r=w.useMemo(()=>{const i=e===1?88:e===2?26:15,o=["✨","⭐","🎉","💫","🌟","🎊"];return Array.from({length:i},()=>({left:Math.random()*100,delay:Math.random()*.7,dur:2.2+Math.random()*1.8,size:11+Math.random()*(e===1?22:14),glyph:o[Math.random()*o.length|0],drift:(Math.random()-.5)*260}))},[e,n]);return t||e>3?null:a.jsx("div",{"aria-hidden":"true",children:r.map((i,o)=>a.jsx("span",{className:"celebrate-particle",style:{left:`${i.left}%`,fontSize:i.size,animationDelay:`${i.delay}s`,animationDuration:`${i.dur}s`,"--drift":`${i.drift}px`},children:i.glyph},`${n}-${o}`))})}function XA({data:e}){if(!e||e.length<2)return null;const t=220,n=56,s=Math.max(...e),r=Math.min(...e),i=e.map((o,l)=>{const c=l/(e.length-1)*t,d=n-6-(o-r)/(s-r||1)*(n-12);return`${c},${d}`}).join(" ");return a.jsxs("svg",{viewBox:`0 0 ${t} ${n}`,className:"w-full h-14",children:[a.jsx("defs",{children:a.jsxs("linearGradient",{id:"spark",x1:"0",y1:"0",x2:"0",y2:"1",children:[a.jsx("stop",{offset:"0%",stopColor:"#2BFF88",stopOpacity:"0.5"}),a.jsx("stop",{offset:"100%",stopColor:"#2BFF88",stopOpacity:"0"})]})}),a.jsx("polygon",{points:`0,${n} ${i} ${t},${n}`,fill:"url(#spark)"}),a.jsx("polyline",{points:i,fill:"none",stroke:"#2BFF88",strokeWidth:"2.5",strokeLinecap:"round"})]})}function Hb({spots:e,onClaim:t,onBoost:n,refresh:s}){var A,P,$,Q,ie;const{slug:r}=qd(),[i]=Ey(),[o,l]=w.useState(!1),[c,d]=w.useState(""),[u,h]=w.useState(null),[m,y]=w.useState(null),p=e.find(D=>D.slug===r),b=i.get("ref");w.useEffect(()=>{if(h(p?qC(p.slug):null),y(null),!p||!b)return;const D=YC(b,p.slug);D.ok&&!D.already?(y({name:D.name}),s&&s()):D.ok||Tb(b)},[p==null?void 0:p.slug,b]),w.useEffect(()=>{p&&tA(`/s/${p.slug}`,{source:document.referrer?"referral":"direct"})},[p==null?void 0:p.slug]),w.useEffect(()=>(p&&(document.title=`${p.name} — #${p.rank} on FlexSpot.LOL`),()=>{document.title="FlexSpot.LOL — Claim Your Spot On The Internet"}),[p]);const x=w.useMemo(()=>p?Dp(p.slug,5):[],[p==null?void 0:p.slug,m,u]),f=w.useMemo(()=>!p||!u?{visits:0,earned:0}:Dp(p.slug,1e3).find(D=>D.code===u)||{visits:0,earned:0},[p==null?void 0:p.slug,m,u]),g=w.useMemo(()=>p?XC(p.slug):[],[p,e]),v=w.useMemo(()=>ur.filter(D=>{try{return D.check(e)===(p==null?void 0:p.slug)}catch{return!1}}),[e,p]),k=w.useMemo(()=>p?e.filter(D=>D.slug!==p.slug).slice(0,4):[],[e,p]);if(!p)return a.jsxs("div",{className:"pt-[92px] max-w-2xl mx-auto px-4 py-24 text-center",children:[a.jsx(q,{children:a.jsx("div",{className:"text-6xl mb-4",children:"🕳️"})}),a.jsx("h1",{className:"font-display font-bold text-3xl text-snow",children:"This spot is unclaimed"}),a.jsxs("p",{className:"text-mist mt-3",children:["Nobody owns ",a.jsxs("b",{className:"text-snow",children:["/",r]})," yet. Take it before someone else does."]}),a.jsx("button",{onClick:t,className:"btn-primary px-8 py-3.5 mt-6",children:"⚡ Claim this spot — $1"})]});const N=D=>{/^https?:\/\//i.test(D||"")&&(VC(p.slug),window.open(D,"_blank","noopener,noreferrer"))},T=u?`${window.location.origin}${yb(p.slug,u)}`:"",j=async()=>{if(!T)return;await vb(T)&&(l(!0),setTimeout(()=>l(!1),1800))},S=()=>{if(!p)return;const D=UC(p.slug,c);D&&(h(D),d(""))};return a.jsxs("div",{className:"pt-[92px]",children:[p.rank<=3&&a.jsx(QA,{rank:p.rank}),a.jsxs("div",{className:"relative overflow-hidden",children:[a.jsx("div",{className:"blob w-[500px] h-[280px] bg-[var(--blaze-soft)] -top-24 left-1/3"}),a.jsxs("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-8 relative",children:[a.jsx(_,{to:"/leaderboard",className:"text-mist text-sm hover:text-snow",children:"← Back to leaderboard"}),a.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-5 mt-6",children:[a.jsx(Ot,{spot:p,size:96,ring:p.rank===1}),a.jsxs("div",{className:"flex-1 min-w-0",children:[a.jsxs("div",{className:"flex items-center gap-3 flex-wrap",children:[a.jsx(qi,{rank:p.rank,size:"lg"}),a.jsx("h1",{className:"font-display font-bold text-3xl sm:text-4xl text-snow",children:p.name}),p.rank===1&&a.jsx(q,{children:a.jsx("span",{className:"text-3xl crown-bob inline-block",children:"👑"})})]}),a.jsx("p",{className:"text-mist mt-1.5 text-[15px]",children:p.tagline}),v.length>0&&a.jsx("div",{className:"flex gap-2 mt-3 flex-wrap",children:v.map(D=>a.jsxs("span",{className:"text-xs font-bold bg-gold/15 border border-gold/40 text-[var(--gold-deep)] rounded-full px-3 py-1",children:[D.icon," ",D.name]},D.slug))})]}),a.jsxs("div",{className:"flex sm:flex-col gap-2.5",children:[a.jsx("button",{onClick:()=>n(p),className:"btn-primary px-6 py-3 text-sm flex-1 sm:flex-none",children:"⚡ Boost this spot"}),p.website&&a.jsx("button",{onClick:()=>N(p.website),className:"btn-ghost px-6 py-3 text-sm flex-1 sm:flex-none",children:"Visit ↗"})]})]}),p.pending&&a.jsxs("div",{className:"mt-6 rounded-2xl bg-amber-500/10 border border-amber-500/40 p-4 sm:p-5 flex items-start gap-3",children:[a.jsx("span",{className:"text-2xl",children:"⏳"}),a.jsxs("div",{children:[a.jsx("div",{className:"font-bold text-snow text-sm",children:"Payment under review"}),a.jsx("p",{className:"text-mist text-sm mt-1 leading-relaxed",children:"This spot is live on the leaderboard with its pledged amount. The badge clears once our team verifies the payment — usually within 24 hours."})]})]}),((A=p.gift)==null?void 0:A.from)&&a.jsxs(G.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},className:"mt-6 rounded-2xl bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/40 p-4 sm:p-5 flex items-start gap-3",children:[a.jsx("span",{className:"text-2xl",children:"🎁"}),a.jsxs("div",{children:[a.jsxs("div",{className:"font-bold text-snow text-sm",children:["Surprise gift from ",p.gift.from]}),p.gift.message&&a.jsxs("p",{className:"text-mist text-sm mt-1 leading-relaxed",children:["“",p.gift.message,"”"]})]})]}),m&&a.jsxs(G.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},className:"mt-6 rounded-2xl bg-gradient-to-r from-[#F59E0B]/25 via-[#F59E0B]/10 to-transparent border border-[#F59E0B]/50 p-4 sm:p-5 flex items-start gap-3",children:[a.jsx("span",{className:"text-2xl",children:"🎉"}),a.jsxs("div",{children:[a.jsxs("div",{className:"font-bold text-snow text-sm",children:["You arrived through ",m.name,"'s link!"]}),a.jsxs("p",{className:"text-mist text-sm mt-1 leading-relaxed",children:[m.name," just earned ",a.jsx("b",{className:"text-[#FCD34D]",children:"$1"})," for ",p.name," — every visit through a referral link adds $1 to the total."]})]})]}),(p.move||0)>0&&a.jsxs("div",{className:"mt-4 rounded-2xl bg-[var(--green-soft)] border border-[var(--green)] p-4 flex items-center gap-3",children:[a.jsx("span",{className:"text-2xl",children:"🔥"}),a.jsxs("p",{className:"text-sm text-snow font-semibold",children:["Climbed ",p.move," spot",p.move>1?"s":""," recently — momentum is on your side. Keep it going."]})]}),(p.move||0)<0&&a.jsxs("div",{className:"mt-4 rounded-2xl bg-red-500/10 border border-red-500/30 p-4 flex items-center justify-between gap-3",children:[a.jsxs("div",{className:"flex items-center gap-3",children:[a.jsx("span",{className:"text-2xl",children:"😬"}),a.jsxs("p",{className:"text-sm text-snow font-semibold",children:["Someone just passed you — slipped ",Math.abs(p.move)," spot",p.move<-1?"s":"",". A small boost takes it back."]})]}),a.jsx("button",{onClick:()=>n(p),className:"btn-primary px-4 py-2 text-xs shrink-0",children:"⚡ Fight back"})]})]})]}),a.jsxs("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-5 pb-4",children:[a.jsxs("div",{className:"lg:col-span-2 space-y-5",children:[a.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3",children:[{l:"Total buzz",v:Ne(p.amount),c:"text-[var(--blaze)]"},{l:"Views",v:Ye(p.views),c:"text-snow"},{l:"Outbound clicks",v:Ye(p.clicks),c:"text-snow"},{l:"Claimed",v:Hn(p.joinedAt),c:"text-snow"}].map(D=>a.jsxs("div",{className:"bg-card border border-line/5 rounded-2xl p-4",children:[a.jsx("div",{className:`font-display font-bold text-xl ${D.c}`,children:a.jsx(Hi,{to:parseFloat(String(D.v).replace(/[^0-9.]/g,""))||0,format:()=>D.v})}),a.jsx("div",{className:"text-[11px] text-mist uppercase tracking-wider font-semibold mt-1",children:D.l})]},D.l))}),a.jsxs("div",{className:"bg-card border border-line/5 rounded-3xl p-6",children:[a.jsx("h2",{className:"font-display font-bold text-lg text-snow mb-2",children:"About"}),a.jsx("p",{className:"text-mist text-sm leading-relaxed",children:p.description||p.tagline}),a.jsxs("div",{className:"flex gap-2 mt-4 flex-wrap",children:[p.website&&a.jsx("button",{onClick:()=>N(p.website),className:"btn-ghost px-4 py-2 text-xs",children:"🌐 Website"}),((P=p.socials)==null?void 0:P.x)&&a.jsx("button",{onClick:()=>N(p.socials.x),className:"btn-ghost px-4 py-2 text-xs",children:"𝕏 Twitter"}),(($=p.socials)==null?void 0:$.instagram)&&a.jsx("button",{onClick:()=>N(p.socials.instagram),className:"btn-ghost px-4 py-2 text-xs",children:"📸 Instagram"}),((Q=p.socials)==null?void 0:Q.facebook)&&a.jsx("button",{onClick:()=>N(p.socials.facebook),className:"btn-ghost px-4 py-2 text-xs",children:"📘 Facebook"}),((ie=p.socials)==null?void 0:ie.linkedin)&&a.jsx("button",{onClick:()=>N(p.socials.linkedin),className:"btn-ghost px-4 py-2 text-xs",children:"💼 LinkedIn"})]})]}),a.jsxs("div",{className:"bg-card border border-line/5 rounded-3xl p-6",children:[a.jsxs("div",{className:"flex items-center justify-between mb-2",children:[a.jsx("h2",{className:"font-display font-bold text-lg text-snow",children:"Spotlight momentum"}),a.jsx("span",{className:"text-xs font-bold text-[var(--green)]",children:"▲ climbing"})]}),a.jsx(XA,{data:p.trend&&p.trend.length>1?p.trend:[p.amount*.6,p.amount*.8,p.amount]}),a.jsx("p",{className:"text-xs text-mist mt-2",children:"Last 7 days of verified visibility for this spot."})]}),a.jsxs("div",{className:"bg-card border border-line/5 rounded-3xl p-6",children:[a.jsxs("div",{className:"flex items-center justify-between mb-1",children:[a.jsx("h2",{className:"font-display font-bold text-lg text-snow",children:"💪 Boost squad"}),g.length>0&&a.jsxs("span",{className:"text-[11px] font-bold text-[var(--ink-3)] uppercase tracking-wider",children:[g.length," booster",g.length>1?"s":""]})]}),a.jsxs("p",{className:"text-mist text-sm mb-4",children:["Real people chipping in $1+ to push ",a.jsx("b",{className:"text-snow",children:p.name})," up. Your name could be right here. 👇"]}),g.length>0?a.jsx("div",{className:"space-y-2 max-h-72 overflow-y-auto pr-1",children:g.map((D,Y)=>a.jsxs(G.div,{initial:{opacity:0,x:-12},animate:{opacity:1,x:0},transition:{delay:Math.min(Y*.05,.4)},className:"flex items-center gap-3 rounded-2xl bg-[var(--surface-2)] border border-[var(--line)] px-3.5 py-2.5",children:[a.jsx("span",{className:"grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-[var(--blaze)] to-[var(--gold)] text-white font-display font-bold text-sm shrink-0",children:(D.name||"?").trim().charAt(0).toUpperCase()}),a.jsxs("div",{className:"flex-1 min-w-0",children:[a.jsx("div",{className:"text-sm font-bold text-snow truncate",children:D.name}),D.handle&&a.jsx("div",{className:"text-[11px] text-mist truncate",children:D.handle})]}),a.jsxs("div",{className:"text-right shrink-0",children:[a.jsxs("div",{className:"text-sm font-extrabold text-[#0A8A4E] dark:text-[#34D399]",children:["+",Ne(D.amount)]}),a.jsx("div",{className:"text-[10px] text-mist",children:Hn(D.at)})]})]},`${D.at}-${Y}`))}):a.jsxs("div",{className:"rounded-2xl border-2 border-dashed border-[var(--line)] p-5 text-center",children:[a.jsx("div",{className:"text-3xl mb-1.5",children:"🏟️"}),a.jsx("p",{className:"text-sm text-mist",children:"No boosters yet — be the first legend."})]}),a.jsx("button",{onClick:()=>n(p),className:"btn-primary w-full py-3.5 mt-4 text-sm",children:"⚡ Chip in $1 — get your name here"})]}),a.jsxs("div",{className:"bg-card border border-line/5 rounded-3xl p-6",children:[a.jsxs("h2",{className:"font-display font-bold text-lg text-snow mb-1",children:["📣 Help ",p.name," reach #1"]}),a.jsx("p",{className:"text-mist text-sm mb-4",children:"Share this page — every visit and boost pushes them higher."}),a.jsx(GA,{spot:p,refCode:u})]}),a.jsxs("div",{className:"rounded-3xl bg-gradient-to-br from-[var(--blaze-soft)] to-card border border-[var(--blaze)] p-6",children:[a.jsx("h2",{className:"font-display font-bold text-lg text-snow mb-1",children:"🔗 Refer & earn $1 per visit"}),a.jsxs("p",{className:"text-mist text-sm mb-4",children:["Create your personal link and share it anywhere — Facebook, Telegram, WhatsApp. Every visit through it adds ",a.jsx("b",{className:"text-snow",children:"$1"})," to ",p.name,"'s total and puts your name on the supporters board. Counts once per friend per day."]}),u?a.jsxs(a.Fragment,{children:[a.jsx("button",{onClick:j,className:"w-full font-mono text-sm bg-ink/60 border border-line/10 rounded-xl px-4 py-3 text-[var(--blaze)] hover:border-[var(--blaze)] transition-colors break-all",children:T}),a.jsx("div",{className:"text-xs text-mist mt-2 mb-4",children:o?"✓ Referral link copied!":"Tap to copy your referral link"}),a.jsx("div",{className:"grid grid-cols-3 gap-3",children:[{l:"Visits brought",v:f.visits},{l:"$ earned",v:"$"+f.earned},{l:"Rank right now",v:"#"+p.rank}].map(D=>a.jsxs("div",{className:"bg-ink/50 rounded-2xl p-3 text-center",children:[a.jsx("div",{className:"font-display font-bold text-xl text-snow",children:D.v}),a.jsx("div",{className:"text-[10px] text-mist uppercase tracking-wider font-semibold mt-0.5",children:D.l})]},D.l))})]}):a.jsxs("div",{className:"flex flex-col sm:flex-row gap-2",children:[a.jsx("input",{value:c,onChange:D=>d(D.target.value),onKeyDown:D=>{D.key==="Enter"&&S()},placeholder:"Your name — shown on the board",maxLength:30,className:"flex-1 bg-ink/60 border border-line/10 rounded-xl px-4 py-3 text-sm text-snow placeholder:text-mist/60 outline-none focus:border-[var(--blaze)]"}),a.jsx("button",{onClick:S,disabled:!c.trim(),className:"btn-gold px-6 py-3 text-sm disabled:opacity-40",children:"Get my link"})]})]})]}),a.jsxs("div",{className:"space-y-5",children:[a.jsxs("div",{className:"rounded-3xl bg-gold/[0.06] border border-gold/25 p-6 text-center",children:[a.jsx("div",{className:"text-4xl mb-2",children:a.jsx(q,{children:a.jsx("span",{className:"inline-block",children:"👑"})})}),a.jsx("h3",{className:"font-display font-bold text-snow",children:"Want the crown?"}),a.jsxs("p",{className:"text-mist text-sm mt-1 mb-4",children:["Claim your own spot and challenge #",p.rank,"."]}),a.jsx("button",{onClick:t,className:"btn-gold w-full py-3 text-sm",children:"⚡ Claim your spot"})]}),a.jsxs("div",{className:"bg-card border border-line/5 rounded-3xl p-5",children:[a.jsx("h3",{className:"font-display font-bold text-snow mb-1",children:"⭐ Top supporters"}),a.jsx("p",{className:"text-mist text-xs mb-3",children:"Their links brought visitors — each visit added $1."}),x.length?a.jsx("div",{className:"space-y-2",children:x.map((D,Y)=>a.jsxs("div",{className:"flex items-center gap-3 p-2 rounded-xl bg-line/5",children:[a.jsx("span",{className:`grid place-items-center w-7 h-7 rounded-lg text-xs font-black shrink-0 ${Y===0?"bg-[#F59E0B]/20 text-[#FCD34D]":"bg-line/10 text-mist"}`,children:Y+1}),a.jsxs("div",{className:"flex-1 min-w-0",children:[a.jsx("div",{className:"text-sm font-bold text-snow truncate",children:D.name}),a.jsxs("div",{className:"text-[11px] text-mist",children:[D.visits," visit",D.visits===1?"":"s"," brought"]})]}),a.jsxs("div",{className:"font-black text-[#FCD34D] text-sm shrink-0",children:["+$",D.earned]})]},D.code))}):a.jsx("p",{className:"text-mist text-sm",children:"No supporters yet — share your link and be the first."})]}),a.jsxs("div",{className:"bg-card border border-line/5 rounded-3xl p-5",children:[a.jsx("h3",{className:"font-display font-bold text-snow mb-3",children:"🔥 Also trending"}),a.jsx("div",{className:"space-y-2",children:k.map(D=>a.jsxs(_,{to:`/s/${D.slug}`,className:"flex items-center gap-3 p-2 rounded-xl hover:bg-line/5 transition-colors",children:[a.jsx(qi,{rank:D.rank}),a.jsx(Ot,{spot:D,size:36}),a.jsxs("div",{className:"flex-1 min-w-0",children:[a.jsx("div",{className:"text-sm font-bold text-snow truncate",children:D.name}),a.jsx("div",{className:"text-[11px] text-mist",children:Ne(D.amount)})]})]},D.slug))})]})]})]})]})}const zp="1234",JA=[{id:"overview",label:"Overview"},{id:"submissions",label:"Submissions"},{id:"payments",label:"Payments"},{id:"manual",label:"Manual entry"},{id:"analytics",label:"Analytics"},{id:"content",label:"Content"},{id:"fraud",label:"Fraud"}];function Yc({status:e}){const t={pending:{bg:"#FEF3C7",fg:"#92400E",bd:"#FCD34D",t:"Pending"},approved:{bg:"#D1FAE5",fg:"#065F46",bd:"#6EE7B7",t:"Approved"},rejected:{bg:"#FEE2E2",fg:"#991B1B",bd:"#FCA5A5",t:"Rejected"},"changes-requested":{bg:"#DBEAFE",fg:"#1E40AF",bd:"#93C5FD",t:"Changes requested"}},n=t[e]||t.pending;return a.jsx("span",{className:"text-[10px] font-bold rounded-full px-2.5 py-1 whitespace-nowrap",style:{background:n.bg,color:n.fg,border:`1px solid ${n.bd}`},children:n.t})}function Ft({icon:e,label:t,value:n,sub:s}){return a.jsxs("div",{className:"card p-5",children:[a.jsx("div",{className:"text-2xl mb-2",children:e}),a.jsx("div",{className:"font-display font-bold text-2xl text-[var(--ink)]",children:n}),a.jsx("div",{className:"text-[11px] text-[var(--ink-3)] uppercase tracking-wider font-semibold mt-1",children:t}),s&&a.jsx("div",{className:"text-[11px] text-[var(--ink-3)] mt-1",children:s})]})}function bl({icon:e,text:t}){return a.jsxs("div",{className:"text-center py-14 text-[var(--ink-2)] card",children:[a.jsx("div",{className:"text-5xl mb-3",children:e}),a.jsx("p",{className:"text-sm",children:t})]})}function qb({text:e,label:t}){const[n,s]=w.useState(!1);return a.jsx("button",{type:"button",onClick:async()=>{try{await navigator.clipboard.writeText(e),s(!0),setTimeout(()=>s(!1),1500)}catch{}},className:"text-[11px] font-bold text-[var(--ink-2)] hover:text-[var(--ink)] underline underline-offset-2",children:n?"Copied ✓":t||"Copy"})}function ZA({spots:e,refresh:t}){const[n,s]=w.useState(""),[r,i]=w.useState(!1),[o,l]=w.useState("overview"),[c,d]=w.useState(""),[u,h]=w.useState([]),[m,y]=w.useState({}),[p,b]=w.useState(null),[x,f]=w.useState(null),[g,v]=w.useState(""),k=hb(),N=()=>h(BC());w.useEffect(()=>{N()},[]);const T=C=>{d(C),setTimeout(()=>d(""),3e3)},j=w.useMemo(()=>u.filter(C=>C.status==="pending"),[u]),S=w.useMemo(()=>u.filter(C=>C.status!=="pending"),[u]),A=(C,O)=>{const E=(m[C]||"").trim();if(O!=="approved"&&!E){T("Add a note explaining the decision first.");return}O==="rejected"&&!confirm("Reject this submission?")||(_C(C,O,E),y(B=>({...B,[C]:""})),N(),t&&t(),T(O==="approved"?"✓ Approved — spot is now live on the leaderboard.":O==="rejected"?"Submission rejected.":"Changes requested — saved on this submission (no email sent in preview)."))},P=C=>{const O=(m[C]||"").trim();O&&(LC(C,O),y(E=>({...E,[C]:""})),N(),T("Note saved."))},$=w.useMemo(()=>nA(e),[e,u]),Q=w.useMemo(()=>{const C=[],O={},E={};return[...e||[],...u.map(M=>({slug:M.slug,name:M.brandName,website:M.website}))].forEach(M=>{const W=(M.website||"").toLowerCase().replace(/\/$/,"");W&&(O[W]?C.push({type:"Duplicate URL",detail:`"${M.name}" shares a link with "${O[W]}"`,id:M.id}):O[W]=M.name);const H=(M.name||"").toLowerCase().trim();H&&(E[H]?C.push({type:"Duplicate name",detail:`"${M.name}" appears more than once`,id:M.id}):E[H]=!0)}),u.filter(M=>M.status==="pending").forEach(M=>{M.paymentScreenshot||C.push({type:"Missing payment screenshot",detail:`${M.brandName} — no screenshot uploaded`,id:M.id}),M.amount>=500&&C.push({type:"High-value claim",detail:`${M.brandName} — ${Ne(M.amount)} deserves a manual check`,id:M.id})}),C},[e,u]);w.useEffect(()=>{o==="content"&&!x&&f(Ab())},[o,x]);const ie=()=>{eA(x),v("Saved to this browser's preview data (applies here only)."),setTimeout(()=>v(""),2500)};if(!r)return a.jsx("div",{className:"pt-[92px] min-h-screen grid place-items-center px-4",children:a.jsxs("div",{className:"w-full max-w-sm card p-8 text-center",children:[a.jsx("div",{className:"text-5xl mb-4",children:"🔐"}),a.jsx("h1",{className:"font-display font-bold text-2xl text-[var(--ink)] mb-2",children:"Admin access"}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mb-6",children:"Enter the admin PIN to manage FlexSpot."}),a.jsx("input",{type:"password",maxLength:64,autoComplete:"current-password",className:"field text-center text-2xl tracking-[0.4em] mb-4",placeholder:"••••",value:n,onChange:C=>s(C.target.value),onKeyDown:C=>C.key==="Enter"&&(n===zp?i(!0):T("Wrong PIN."))}),a.jsx("button",{onClick:()=>n===zp?i(!0):T("Wrong PIN."),className:"btn-primary w-full py-3",children:"Unlock dashboard"}),c&&a.jsx("p",{className:"text-red-500 text-sm mt-3",children:c}),a.jsx("p",{className:"text-[11px] text-[var(--ink-3)] mt-4",children:"Client-side gate only — not real authentication. Set VITE_ADMIN_PIN before any production use."})]})});const D=(e||[]).filter(C=>!C.pending),Y=u.filter(C=>C.status==="approved").reduce((C,O)=>C+(Number(O.amount)||0),0);return a.jsxs("div",{className:"pt-[92px] pb-24",children:[a.jsxs("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 py-10",children:[a.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-3 mb-2",children:[a.jsxs("div",{children:[a.jsx("h1",{className:"font-display font-bold text-3xl text-[var(--ink)]",children:"Admin dashboard"}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mt-1",children:"Preview mode — local demo data 🟡"})]}),a.jsx("button",{onClick:()=>{N(),t&&t(),T("Refreshed.")},className:"btn-ghost px-4 py-2 text-sm",children:"↻ Refresh"})]}),a.jsx("p",{className:"text-[11px] text-[var(--ink-3)] mb-8",children:"Admin auth is a client-side preview PIN. Analytics, viewer counts and emails are simulated/preview-only."}),c&&a.jsx("div",{className:"mb-5 text-sm rounded-xl px-4 py-3 border",style:{background:"#D1FAE5",borderColor:"#6EE7B7",color:"#065F46"},children:c}),a.jsx("div",{className:"flex gap-2 mb-8 overflow-x-auto no-scrollbar",children:JA.map(C=>a.jsxs("button",{onClick:()=>l(C.id),className:`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${o===C.id?"btn-primary":"btn-ghost"}`,children:[C.label,C.id==="submissions"&&j.length>0&&` (${j.length})`]},C.id))}),o==="overview"&&a.jsxs("div",{children:[a.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8",children:[a.jsx(Ft,{icon:"👁️",label:"Visitors online",value:k,sub:"Simulated — preview only"}),a.jsx(Ft,{icon:"📈",label:"Total visitors",value:Ye($.totalVisits),sub:"Preview analytics"}),a.jsx(Ft,{icon:"⚡",label:"Claimed spots",value:D.length}),a.jsx(Ft,{icon:"📥",label:"Pending approvals",value:j.length}),a.jsx(Ft,{icon:"✅",label:"Approved listings",value:u.filter(C=>C.status==="approved").length}),a.jsx(Ft,{icon:"💰",label:"Revenue (preview)",value:Ne(Y),sub:"Manual USDT — preview only, not verified"})]}),a.jsx("h2",{className:"font-display font-bold text-xl text-[var(--ink)] mb-4",children:"Top brands right now"}),a.jsx("div",{className:"space-y-2",children:D.slice(0,5).map(C=>a.jsxs("div",{className:"flex items-center gap-3 card p-3",children:[a.jsx(qi,{rank:C.rank}),a.jsx(Ot,{spot:C,size:38}),a.jsxs("div",{className:"flex-1 min-w-0",children:[a.jsx("div",{className:"font-bold text-[var(--ink)] text-sm truncate",children:C.name}),a.jsxs("div",{className:"text-xs text-[var(--ink-3)]",children:[Ye(C.views)," views · ",Ye(C.clicks)," clicks"]})]}),a.jsx("div",{className:"font-display font-bold text-[var(--ink)]",children:Ne(C.amount)})]},C.slug))}),a.jsxs("div",{className:"card p-5 mt-8",children:[a.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[a.jsx("h3",{className:"font-bold text-[var(--ink)]",children:"📧 Email confirmations"}),a.jsx("span",{className:"pill-gray text-[10px] font-bold px-2 py-0.5 rounded-full",children:"PREVIEW ONLY"})]}),a.jsx("p",{className:"text-sm text-[var(--ink-2)]",children:"No email provider is connected, so no emails are actually sent. When a provider is added, approved submitters will receive:"}),a.jsxs("div",{className:"mt-3 rounded-xl border border-[var(--line)] p-4 text-sm text-[var(--ink-2)] bg-[var(--surface-2)]",children:[a.jsx("b",{className:"text-[var(--ink)]",children:"Subject:"})," Your FlexSpot is live! 🎉",a.jsx("br",{}),a.jsxs("span",{className:"text-[var(--ink-3)]",children:["Hi ","{brand}",", your spot is approved and ranking on the FlexSpot leaderboard…"]})]})]})]}),o==="submissions"&&a.jsxs("div",{children:[a.jsxs("h2",{className:"font-display font-bold text-xl text-[var(--ink)] mb-4",children:["Pending review (",j.length,")"]}),j.length===0?a.jsx(bl,{icon:"✅",text:"All clear — no submissions waiting."}):a.jsx("div",{className:"space-y-4",children:j.map(C=>a.jsx(eE,{s:C,notes:m,setNotes:y,onDecide:A,onAddNote:P,setShotView:b},C.id))}),S.length>0&&a.jsxs("div",{className:"mt-10",children:[a.jsxs("h2",{className:"font-display font-bold text-xl text-[var(--ink)] mb-4",children:["Decided (",S.length,")"]}),a.jsx("div",{className:"space-y-2",children:S.map(C=>a.jsxs("div",{className:"card p-4 flex items-center gap-3",children:[a.jsx(Ot,{spot:{name:C.brandName,logo:C.logo},size:36}),a.jsxs("div",{className:"flex-1 min-w-0",children:[a.jsx("div",{className:"font-bold text-[var(--ink)] text-sm truncate",children:C.brandName}),a.jsxs("div",{className:"text-xs text-[var(--ink-3)]",children:[Ne(C.amount)," · ",C.paymentMethod||"—"," · ",Hn(C.reviewedAt||C.createdAt)]})]}),a.jsx(Yc,{status:C.status})]},C.id))})]})]}),o==="payments"&&a.jsxs("div",{children:[a.jsx("h2",{className:"font-display font-bold text-xl text-[var(--ink)] mb-2",children:"Payment verification"}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mb-5",children:"Phase 1: manual USDT verification. Confirm each payment arrived in the wallet before approving the spot."}),j.length===0?a.jsx(bl,{icon:"💳",text:"No payments awaiting verification."}):a.jsx("div",{className:"space-y-4",children:j.map(C=>a.jsxs("div",{className:"card p-5",children:[a.jsxs("div",{className:"flex items-start gap-4 flex-wrap",children:[a.jsx(Ot,{spot:{name:C.brandName,logo:C.logo},size:48}),a.jsxs("div",{className:"flex-1 min-w-[220px]",children:[a.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[a.jsx("h3",{className:"font-bold text-[var(--ink)]",children:C.brandName}),a.jsx(Yc,{status:C.status})]}),a.jsxs("div",{className:"text-xs text-[var(--ink-2)] mt-1",children:["👤 ",C.email||"no email"]}),a.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs",children:[a.jsxs("div",{children:[a.jsx("div",{className:"label !mb-1",children:"Amount"}),a.jsx("div",{className:"font-bold text-[var(--ink)] text-sm",children:Ne(C.amount)})]}),a.jsxs("div",{children:[a.jsx("div",{className:"label !mb-1",children:"Network"}),a.jsx("div",{className:"font-bold text-[var(--ink)] text-sm",children:C.paymentMethod||"—"})]}),a.jsxs("div",{children:[a.jsx("div",{className:"label !mb-1",children:"Submitted"}),a.jsx("div",{className:"text-[var(--ink-2)]",children:Hn(C.createdAt)})]}),a.jsxs("div",{children:[a.jsx("div",{className:"label !mb-1",children:"Type"}),a.jsx("div",{className:"text-[var(--ink-2)]",children:C.isBoost?`Boost → ${C.boostSlug}`:"New spot"})]})]}),a.jsxs("div",{className:"mt-3",children:[a.jsx("div",{className:"label !mb-1",children:"Transaction ID"}),C.paymentTxId?a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("code",{className:"text-xs bg-[var(--surface-2)] border border-[var(--line)] rounded-lg px-2 py-1 break-all text-[var(--ink)]",children:C.paymentTxId}),a.jsx(qb,{text:C.paymentTxId})]}):a.jsx("span",{className:"text-xs text-red-500 font-bold",children:"Missing — flag before approving"})]})]}),C.paymentScreenshot&&a.jsxs("button",{onClick:()=>b(C.paymentScreenshot),className:"shrink-0",children:[a.jsx("img",{src:C.paymentScreenshot,alt:"Payment proof",className:"w-28 h-28 object-cover rounded-xl border border-[var(--line)] hover:opacity-90"}),a.jsx("div",{className:"text-[11px] text-[var(--ink-3)] mt-1 text-center",children:"Tap to enlarge"})]})]}),a.jsx("textarea",{className:"field mt-4 text-sm",rows:2,placeholder:"Admin note (required to reject or request changes)…",value:m[C.id]||"",onChange:O=>y(E=>({...E,[C.id]:O.target.value}))}),a.jsx(nE,{sub:C,allSubs:u}),a.jsxs("div",{className:"flex gap-2.5 mt-3 flex-wrap",children:[a.jsx("button",{onClick:()=>A(C.id,"approved"),className:"btn-primary px-5 py-2.5 text-sm",children:"✓ Verify & approve"}),a.jsx("button",{onClick:()=>A(C.id,"changes-requested"),className:"btn-ghost px-5 py-2.5 text-sm",children:"✎ Request changes"}),a.jsx("button",{onClick:()=>A(C.id,"rejected"),className:"px-5 py-2.5 text-sm rounded-[14px] border border-red-400/60 text-red-600 hover:bg-red-500/10 font-bold",children:"✕ Reject"})]})]},C.id))})]}),o==="manual"&&a.jsx(sE,{spots:e,onAdded:()=>{N(),t&&t()}}),o==="analytics"&&a.jsxs("div",{children:[a.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[a.jsx("h2",{className:"font-display font-bold text-xl text-[var(--ink)]",children:"Analytics"}),a.jsx("span",{className:"pill-gray text-[10px] font-bold px-2 py-0.5 rounded-full",children:"PREVIEW DATA — SIMULATED"})]}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mb-5",children:"Local preview storage only. Never presented as live traffic."}),a.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8",children:[a.jsx(Ft,{icon:"📈",label:"Total visitors",value:Ye($.totalVisits)}),a.jsx(Ft,{icon:"🖱️",label:"Total clicks",value:Ye($.totalClicks)}),a.jsx(Ft,{icon:"🎯",label:"Conversion rate",value:`${$.conversionRate}%`,sub:"visits → claims"}),a.jsx(Ft,{icon:"⚡",label:"Claimed spots",value:$.claimedSpots})]}),a.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[a.jsx(wl,{title:"Top pages",rows:$.byPath}),a.jsx(wl,{title:"Top sources",rows:$.bySource}),a.jsx(wl,{title:"Countries",rows:$.byCountry}),a.jsxs("div",{className:"card p-5",children:[a.jsx("h3",{className:"font-bold text-[var(--ink)] mb-3",children:"Top brands by views"}),a.jsx("div",{className:"space-y-2",children:$.topBrands.map(C=>a.jsxs("div",{className:"flex items-center justify-between text-sm",children:[a.jsx("span",{className:"text-[var(--ink)] font-semibold truncate",children:C.name}),a.jsxs("span",{className:"text-[var(--ink-3)] text-xs",children:[Ye(C.views)," views · ",Ye(C.clicks)," clicks"]})]},C.slug))})]})]})]}),o==="content"&&x&&a.jsxs("div",{children:[a.jsx("h2",{className:"font-display font-bold text-xl text-[var(--ink)] mb-2",children:"Content"}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mb-5",children:"Edits apply to this local preview. Connect the CMS backend before production."}),a.jsxs("div",{className:"card p-5 space-y-4 mb-4",children:[a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Homepage headline"}),a.jsx("input",{className:"field",value:x.heroHeadline,onChange:C=>f({...x,heroHeadline:C.target.value})})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Homepage subheadline"}),a.jsx("textarea",{className:"field",rows:2,value:x.heroSub,onChange:C=>f({...x,heroSub:C.target.value})})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Announcement banner (empty = hidden)"}),a.jsx("input",{className:"field",value:x.announcement,onChange:C=>f({...x,announcement:C.target.value})})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Rewards page text"}),a.jsx("textarea",{className:"field",rows:2,value:x.rewardsText,onChange:C=>f({...x,rewardsText:C.target.value})})]})]}),a.jsxs("div",{className:"card p-5 mb-4",children:[a.jsx("h3",{className:"font-bold text-[var(--ink)] mb-3",children:"FAQ"}),a.jsx("div",{className:"space-y-3",children:x.faq.map((C,O)=>a.jsxs("div",{className:"rounded-xl border border-[var(--line)] p-3 space-y-2",children:[a.jsx("input",{className:"field text-sm font-bold",value:C.q,onChange:E=>{const B=[...x.faq];B[O]={...B[O],q:E.target.value},f({...x,faq:B})},placeholder:"Question"}),a.jsx("textarea",{className:"field text-sm",rows:2,value:C.a,onChange:E=>{const B=[...x.faq];B[O]={...B[O],a:E.target.value},f({...x,faq:B})},placeholder:"Answer"}),a.jsx("button",{onClick:()=>f({...x,faq:x.faq.filter((E,B)=>B!==O)}),className:"text-xs text-red-600 font-bold",children:"Remove"})]},O))}),a.jsx("button",{onClick:()=>f({...x,faq:[...x.faq,{q:"",a:""}]}),className:"btn-ghost px-4 py-2 text-sm mt-3",children:"+ Add FAQ"})]}),a.jsx("button",{onClick:ie,className:"btn-primary px-6 py-3 text-sm",children:"Save content"}),g&&a.jsx("span",{className:"ml-3 text-sm text-green-700 font-semibold",children:g})]}),o==="fraud"&&a.jsxs("div",{children:[a.jsx("h2",{className:"font-display font-bold text-xl text-[var(--ink)] mb-2",children:"Fraud monitoring"}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mb-5",children:"Preview-only heuristics: duplicates, missing payment proof, high-value claims. Spam protection ships with the production backend."}),Q.length===0?a.jsx(bl,{icon:"🛡️",text:"No flags. The board looks clean."}):a.jsx("div",{className:"space-y-3",children:Q.map((C,O)=>a.jsxs("div",{className:"fraud-card flex items-center gap-4 rounded-2xl p-4",children:[a.jsx("span",{className:"text-2xl",children:"⚠️"}),a.jsxs("div",{className:"flex-1",children:[a.jsx("div",{className:"font-bold text-[var(--ink)] text-sm",children:C.type}),a.jsx("div",{className:"text-xs text-[var(--ink-2)]",children:C.detail})]}),C.id&&a.jsx("button",{onClick:()=>{$C(C.id,C.type),N(),T("Flagged for review.")},className:"px-4 py-2 text-xs rounded-xl border border-red-400/60 text-red-600 hover:bg-red-500/10 font-bold",children:"Flag"})]},O))}),a.jsx("h3",{className:"font-bold text-[var(--ink)] mt-8 mb-3",children:"Admin notes"}),u.filter(C=>(C.adminNotes||[]).length>0).length===0?a.jsx("p",{className:"text-sm text-[var(--ink-3)]",children:"No notes yet."}):a.jsx("div",{className:"space-y-2",children:u.filter(C=>(C.adminNotes||[]).length>0).map(C=>a.jsxs("div",{className:"card p-4",children:[a.jsx("div",{className:"font-bold text-sm text-[var(--ink)] mb-2",children:C.brandName}),(C.adminNotes||[]).map((O,E)=>a.jsxs("div",{className:"text-xs text-[var(--ink-2)] border-l-2 border-[var(--line)] pl-3 py-1 mb-1",children:[O.text," ",a.jsxs("span",{className:"text-[var(--ink-3)]",children:["· ",Hn(O.at)]})]},E))]},C.id))})]})]}),p&&a.jsx("div",{className:"fixed inset-0 z-[100] bg-black/70 grid place-items-center p-4",onClick:()=>b(null),children:a.jsx("img",{src:p,alt:"Payment proof full size",className:"max-w-full max-h-[90vh] rounded-2xl",onClick:C=>C.stopPropagation()})})]})}function eE({s:e,notes:t,setNotes:n,onDecide:s,onAddNote:r,setShotView:i}){return a.jsxs("div",{className:"card p-5 border-l-4",style:{borderLeftColor:"#F59E0B"},children:[a.jsxs("div",{className:"flex items-start gap-4",children:[a.jsx(Ot,{spot:{name:e.brandName,logo:e.logo},size:52}),a.jsxs("div",{className:"flex-1 min-w-0",children:[a.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[a.jsx("h3",{className:"font-display font-bold text-lg text-[var(--ink)]",children:e.brandName}),a.jsx(Yc,{status:e.status}),e.isBoost&&a.jsxs("span",{className:"pill-blue text-[10px] font-bold px-2 py-0.5 rounded-full",children:["BOOST → ",e.boostSlug]})]}),e.tagline&&a.jsx("p",{className:"text-[var(--ink-2)] text-sm mt-1",children:e.tagline}),e.description&&a.jsx("p",{className:"text-[var(--ink-3)] text-xs mt-1",children:e.description}),a.jsxs("div",{className:"flex gap-4 mt-2 text-xs text-[var(--ink-2)] flex-wrap",children:[e.website&&a.jsxs("span",{children:["🌐 ",e.website]}),a.jsxs("span",{children:["💰 ",Ne(e.amount)]}),a.jsxs("span",{children:["💳 ",e.paymentMethod||"—"]}),a.jsxs("span",{children:["🕐 ",Hn(e.createdAt)]})]}),e.email&&a.jsxs("div",{className:"text-xs text-[var(--ink-2)] mt-1",children:["✉️ ",e.email]}),e.paymentTxId&&a.jsxs("div",{className:"text-xs mt-1 flex items-center gap-2",children:[a.jsx("span",{className:"text-[var(--ink-3)]",children:"TxID:"}),a.jsx("code",{className:"bg-[var(--surface-2)] border border-[var(--line)] rounded px-1.5 py-0.5 break-all",children:e.paymentTxId}),a.jsx(qb,{text:e.paymentTxId})]}),a.jsxs("div",{className:"flex gap-2 mt-2 items-center",children:[e.paymentScreenshot&&a.jsx("button",{onClick:()=>i(e.paymentScreenshot),children:a.jsx("img",{src:e.paymentScreenshot,alt:"proof",className:"w-16 h-16 object-cover rounded-lg border border-[var(--line)]"})}),(e.fraudFlags||[]).length>0&&a.jsxs("span",{className:"text-[11px] font-bold text-red-600",children:["⚠️ ",e.fraudFlags.join(", ")]})]}),(e.history||[]).length>0&&a.jsx("div",{className:"mt-2 text-[11px] text-[var(--ink-3)]",children:e.history.map((o,l)=>a.jsxs("div",{children:["· ",o.event,o.decision?`: ${o.decision}`:""," — ",Hn(o.at)]},l))})]})]}),a.jsx("textarea",{className:"field mt-4 text-sm",rows:2,placeholder:"Admin note (required to reject or request changes)…",value:t[e.id]||"",onChange:o=>n(l=>({...l,[e.id]:o.target.value}))}),a.jsxs("div",{className:"flex gap-2.5 mt-3 flex-wrap",children:[a.jsx("button",{onClick:()=>s(e.id,"approved"),className:"btn-primary px-5 py-2.5 text-sm",children:"✓ Approve & publish"}),a.jsx("button",{onClick:()=>s(e.id,"changes-requested"),className:"btn-ghost px-5 py-2.5 text-sm",children:"✎ Request changes"}),a.jsx("button",{onClick:()=>s(e.id,"rejected"),className:"px-5 py-2.5 text-sm rounded-[14px] border border-red-400/60 text-red-600 hover:bg-red-500/10 font-bold",children:"✕ Reject"}),a.jsx("button",{onClick:()=>r(e.id),className:"px-4 py-2.5 text-xs text-[var(--ink-3)] hover:text-[var(--ink)] font-bold",children:"+ Save note only"})]})]})}function wl({title:e,rows:t}){return a.jsxs("div",{className:"card p-5",children:[a.jsx("h3",{className:"font-bold text-[var(--ink)] mb-3",children:e}),t.length===0?a.jsx("p",{className:"text-xs text-[var(--ink-3)]",children:"No data yet."}):a.jsx("div",{className:"space-y-2",children:t.map(n=>a.jsxs("div",{className:"flex items-center justify-between text-sm",children:[a.jsx("span",{className:"text-[var(--ink-2)] truncate",children:n.k}),a.jsx("span",{className:"font-bold text-[var(--ink)]",children:n.v})]},n.k))})]})}function tE(e,t){const n=[],s=(o,l,c)=>n.push({label:o,pass:l,detail:c});s("Payment screenshot uploaded",!!e.paymentScreenshot,e.paymentScreenshot?"Image present — review it visually":"Missing — cannot verify payment"),s("Transaction ID plausible",!e.paymentTxId||e.paymentTxId.trim().length>=6,e.paymentTxId?`"${e.paymentTxId.slice(0,24)}${e.paymentTxId.length>24?"…":""}"`:"Not provided (optional)"),s("Amount sane",Number(e.amount)>=1,`${Ne(e.amount)} claimed`);const r=e.paymentTxId&&t.some(o=>o.id!==e.id&&o.paymentTxId&&o.paymentTxId.trim()===e.paymentTxId.trim());s("Transaction ID unique",!r,r?"Same TxID used on another submission!":"No reuse detected");const i=t.some(o=>o.id!==e.id&&(o.brandName||"").toLowerCase().trim()===(e.brandName||"").toLowerCase().trim());return s("Brand name unique",!i,i?"Same brand name submitted before":"No duplicate brand"),s("High-value manual review",Number(e.amount)<500,Number(e.amount)>=500?`${Ne(e.amount)} — verify carefully`:"Below manual-review threshold"),n}function nE({sub:e,allSubs:t}){const[n,s]=w.useState(null),[r,i]=w.useState(!1),o=()=>{i(!0),setTimeout(()=>{s(tE(e,t)),i(!1)},900)},l=n&&n.every(c=>c.pass);return a.jsxs("div",{className:"mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4",children:[a.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-2",children:[a.jsx("div",{className:"text-sm font-bold text-[var(--ink)]",children:"🤖 AI cross-check"}),a.jsx("button",{onClick:o,disabled:r,className:"btn-ghost px-4 py-2 text-xs disabled:opacity-60",children:r?"Checking…":n?"Re-run check":"Run check"})]}),n&&a.jsxs("div",{className:"mt-3 space-y-1.5",children:[n.map((c,d)=>a.jsxs("div",{className:"flex items-start gap-2 text-xs",children:[a.jsx("span",{className:c.pass?"text-green-600":"text-red-500",children:c.pass?"✓":"✕"}),a.jsx("span",{className:"font-semibold text-[var(--ink)]",children:c.label}),a.jsxs("span",{className:"text-[var(--ink-3)]",children:["— ",c.detail]})]},d)),a.jsx("div",{className:`text-xs font-bold mt-2 ${l?"text-green-700":"text-amber-700"}`,children:l?"✓ Looks clean — still verify the screenshot before approving.":"⚠️ Needs attention — review the flagged items."}),a.jsx("p",{className:"text-[10px] text-[var(--ink-3)]",children:"Heuristic pre-check (preview). Real on-chain verification ships with the production backend."})]})]})}function sE({spots:e,onAdded:t}){const[n,s]=w.useState({name:"",tagline:"",description:"",website:"",email:"",x:"",instagram:"",facebook:"",linkedin:"",logo:"",category:"startups",amount:"10"}),[r,i]=w.useState(""),o=(u,h)=>s(m=>({...m,[u]:h})),l=w.useMemo(()=>{const u=Math.max(1,Math.round((parseFloat(n.amount)||1)*100)/100);return ca([...e||[],{slug:"__new__",amount:u,joinedAt:Date.now()}]).findIndex(m=>m.slug==="__new__")+1},[n.amount,e]),c=async u=>{var y;const h=(y=u.target.files)==null?void 0:y[0];if(!h)return;if(h.size>350*1024){i("Logo must be under 350KB.");return}const m=new FileReader;m.onload=()=>o("logo",m.result),m.readAsDataURL(h)},d=()=>{if(i(""),n.name.trim().length<2){i("Enter a brand name.");return}const u=parseFloat(n.amount);if(!Number.isFinite(u)||u<1){i("Amount must be at least $1.");return}const h={};n.x.trim()&&(h.x=n.x.trim()),n.instagram.trim()&&(h.instagram=n.instagram.trim()),n.facebook.trim()&&(h.facebook=n.facebook.trim()),n.linkedin.trim()&&(h.linkedin=n.linkedin.trim());const m=OC({name:n.name.trim(),tagline:n.tagline.trim(),description:n.description.trim(),website:n.website.trim(),email:n.email.trim(),socials:h,logo:n.logo||null,category:n.category,amount:u});s({name:"",tagline:"",description:"",website:"",email:"",x:"",instagram:"",facebook:"",linkedin:"",logo:"",category:"startups",amount:"10"}),i(`✓ "${m.name}" added — projected rank #${l}.`),t&&t()};return a.jsxs("div",{children:[a.jsx("h2",{className:"font-display font-bold text-xl text-[var(--ink)] mb-2",children:"Manual entry"}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mb-5",children:"Add a brand directly to the leaderboard — e.g. someone paid you cash off-platform. Rank is computed by the same rule as everyone else."}),a.jsxs("div",{className:"card p-6 sm:p-8 space-y-5 max-w-2xl",children:[r&&a.jsx("div",{className:"text-sm rounded-xl px-4 py-3 border",style:{background:"#D1FAE5",borderColor:"#6EE7B7",color:"#065F46"},children:r}),a.jsxs("div",{className:"grid sm:grid-cols-2 gap-4",children:[a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Brand name *"}),a.jsx("input",{className:"field",value:n.name,onChange:u=>o("name",u.target.value),placeholder:"e.g. Ahmed's Bakery",maxLength:60})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Amount (USD) *"}),a.jsx("input",{className:"field",inputMode:"decimal",value:n.amount,onChange:u=>o("amount",u.target.value.replace(/[^0-9.]/g,"")),placeholder:"10"})]})]}),a.jsxs("div",{className:"rounded-2xl bg-[var(--gold-soft)] border border-[var(--gold)]/40 p-4 text-sm",children:[a.jsx("span",{className:"text-[var(--ink-2)]",children:"Projected rank with "}),a.jsxs("b",{className:"text-[var(--ink)]",children:["$",n.amount||"0"]}),a.jsx("span",{className:"text-[var(--ink-2)]",children:" → "}),a.jsxs("b",{className:"text-[var(--gold-deep)] font-display text-lg",children:["#",l]})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Tagline"}),a.jsx("input",{className:"field",value:n.tagline,onChange:u=>o("tagline",u.target.value),placeholder:"One line that hooks people",maxLength:100})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Category"}),a.jsx("select",{className:"field",value:n.category,onChange:u=>o("category",u.target.value),children:zs.map(u=>a.jsxs("option",{value:u.slug,children:[u.icon," ",u.name]},u.slug))})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Short description"}),a.jsx("textarea",{className:"field",rows:3,value:n.description,onChange:u=>o("description",u.target.value),placeholder:"What is this brand about?",maxLength:1e3})]}),a.jsxs("div",{className:"grid sm:grid-cols-2 gap-4",children:[a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Website"}),a.jsx("input",{className:"field",value:n.website,onChange:u=>o("website",u.target.value),placeholder:"yoursite.com"})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Email (optional)"}),a.jsx("input",{className:"field",value:n.email,onChange:u=>o("email",u.target.value),placeholder:"you@email.com"})]})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Social profiles (optional)"}),a.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[a.jsx("input",{className:"field",placeholder:"𝕏  @handle or link",value:n.x,onChange:u=>o("x",u.target.value)}),a.jsx("input",{className:"field",placeholder:"📸  Instagram",value:n.instagram,onChange:u=>o("instagram",u.target.value)}),a.jsx("input",{className:"field",placeholder:"📘  Facebook",value:n.facebook,onChange:u=>o("facebook",u.target.value)}),a.jsx("input",{className:"field",placeholder:"💼  LinkedIn",value:n.linkedin,onChange:u=>o("linkedin",u.target.value)})]})]}),a.jsxs("div",{children:[a.jsx("label",{className:"label",children:"Logo / picture (optional)"}),a.jsxs("div",{className:"flex items-center gap-3",children:[n.logo&&a.jsx("img",{src:n.logo,alt:"",className:"w-14 h-14 rounded-2xl object-cover border border-[var(--line)]"}),a.jsxs("label",{className:"btn-ghost px-5 py-2.5 text-sm cursor-pointer",children:[n.logo?"Change picture":"Upload picture",a.jsx("input",{type:"file",accept:"image/*",className:"hidden",onChange:c})]})]})]}),a.jsx("button",{onClick:d,className:"btn-primary w-full py-3.5 text-[15px]",children:"➕ Add to leaderboard"})]})]})}const Wp={trending:{title:"Trending now",seoTitle:"Trending Brands & Creators — FlexSpot.LOL",desc:"The spots getting the most eyeballs right now. Attention is moving — follow it.",icon:"🔥",pick:e=>[...e].sort((t,n)=>n.views+n.clicks*12-(t.views+t.clicks*12)).slice(0,12)},rising:{title:"Rising fast",seoTitle:"Fastest Rising Brands & Creators — FlexSpot.LOL",desc:"The biggest climbers on the board. These names are moving up — hype them before they blow up.",icon:"🚀",pick:e=>{const t=[...e].filter(s=>(s.move||0)>0).sort((s,r)=>(r.move||0)-(s.move||0)),n=[...e].filter(s=>!((s.move||0)>0)).slice(0,Math.max(0,12-t.length));return[...t,...n].slice(0,12)}},winners:{title:"This week's winners",seoTitle:"This Week's Winners — FlexSpot.LOL",desc:"The current kings of the spotlight. 👑 Who will steal the crown next?",icon:"🏆",hero:!0,pick:e=>e.slice(0,12)},new:{title:"New to watch",seoTitle:"New Brands & Creators to Watch — FlexSpot.LOL",desc:"Fresh spots that just entered the battlefield. Early movers take the spotlight.",icon:"✨",pick:e=>[...e].sort((t,n)=>(n.joinedAt||0)-(t.joinedAt||0)).slice(0,12)}};function La({mode:e,spots:t,moves:n,onBoost:s,onClaim:r}){const i=Wp[e]||Wp.trending,o=w.useMemo(()=>i.pick(t||[]),[t,e]);return w.useEffect(()=>(document.title=i.seoTitle,()=>{document.title="FlexSpot.LOL — Claim Your Spot On The Internet"}),[i.seoTitle]),a.jsx("div",{className:"pt-[92px]",children:a.jsxs("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-16",children:[a.jsx(_,{to:"/leaderboard",className:"text-mist text-sm hover:text-snow",children:"← Back to leaderboard"}),a.jsx(q,{children:a.jsx("div",{className:"text-5xl mt-6 mb-3",children:i.icon})}),a.jsx("h1",{className:"font-display font-bold text-4xl sm:text-5xl text-snow",children:i.title}),a.jsx("p",{className:"text-mist mt-3 max-w-xl leading-relaxed",children:i.desc}),a.jsx("div",{className:"mt-4 max-w-md",children:a.jsx(Pu,{})}),i.hero&&o.length>=3&&a.jsx("div",{className:"mt-10",children:a.jsx(Ru,{spots:o.slice(0,3),onBoost:s})}),a.jsx("div",{className:"mt-8 space-y-2",children:a.jsx(ia,{initial:!1,children:(i.hero?o.slice(3):o).map(l=>a.jsx(la,{spot:l,move:n[l.slug]??l.move,onBoost:s,highlight:!0},l.slug))})}),a.jsxs("div",{className:"mt-10 rounded-3xl bg-gradient-to-br from-[var(--blaze-soft)] via-card to-card border border-[var(--blaze)] p-8 text-center",children:[a.jsx("div",{className:"text-4xl mb-3",children:a.jsx(q,{children:a.jsx("span",{className:"inline-block",children:"⚡"})})}),a.jsx("h2",{className:"font-display font-bold text-2xl text-snow",children:"Your brand belongs on this list."}),a.jsx("p",{className:"text-mist text-sm mt-2",children:"Claim your spot from $1 and start climbing."}),a.jsx("button",{onClick:r,className:"btn-primary px-8 py-3.5 mt-5",children:"Claim my spot — $1"})]})]})})}function rE({spots:e,onBoost:t,onClaim:n}){const s=w.useMemo(()=>{const i={};return(e||[]).forEach(o=>{const l=xb(o);i[l]=(i[l]||0)+1}),i},[e]),r=w.useMemo(()=>[...e||[]].sort((i,o)=>o.views+o.clicks*12-(i.views+i.clicks*12)).slice(0,5),[e]);return w.useEffect(()=>(document.title="Explore — FlexSpot.LOL",()=>{document.title="FlexSpot.LOL — Claim Your Spot On The Internet"}),[]),a.jsx("div",{className:"pt-[92px]",children:a.jsxs("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-16",children:[a.jsx(q,{children:a.jsx("div",{className:"text-5xl mb-3",children:"🧭"})}),a.jsx("h1",{className:"font-display font-extrabold text-4xl sm:text-5xl text-[var(--ink)]",children:"Explore the spotlight"}),a.jsxs("p",{className:"text-[var(--ink-2)] mt-3 max-w-xl leading-relaxed",children:["Browse brands by category, or chase the lists everyone's watching."," Preview data shown."]}),a.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8",children:[{to:"/trending",icon:"🔥",label:"Trending"},{to:"/rising",icon:"🚀",label:"Rising fast"},{to:"/winners",icon:"🏆",label:"Winners"},{to:"/new",icon:"✨",label:"New to watch"}].map(i=>a.jsxs(_,{to:i.to,className:"card p-5 text-center hover:-translate-y-1 transition-transform",children:[a.jsx("div",{className:"text-3xl mb-2",children:i.icon}),a.jsx("div",{className:"font-bold text-[var(--ink)] text-sm",children:i.label})]},i.to))}),a.jsx("h2",{className:"font-display font-bold text-2xl text-[var(--ink)] mt-12 mb-4",children:"Browse by category"}),a.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-4 gap-3",children:zs.map(i=>a.jsxs(_,{to:`/explore/${i.slug}`,className:"card p-5 hover:-translate-y-1 transition-transform group",children:[a.jsx("div",{className:"text-3xl mb-2",children:i.icon}),a.jsx("div",{className:"font-bold text-[var(--ink)] group-hover:text-[var(--blaze)] transition-colors",children:i.name}),a.jsx("p",{className:"text-xs text-[var(--ink-2)] mt-1 leading-relaxed",children:i.blurb}),a.jsxs("div",{className:"mt-3 text-xs font-bold text-[var(--ink-3)]",children:[s[i.slug]||0," spot",(s[i.slug]||0)===1?"":"s"]})]},i.slug))}),a.jsx("h2",{className:"font-display font-bold text-2xl text-[var(--ink)] mt-12 mb-4",children:"🔥 Hot right now"}),a.jsx("div",{className:"space-y-2",children:r.map(i=>a.jsx(la,{spot:i,move:i.move,onBoost:t,highlight:!0},i.slug))}),a.jsxs("div",{className:"mt-12 mb-2 flex items-end justify-between gap-4",children:[a.jsx("h2",{className:"font-display font-bold text-2xl text-[var(--ink)]",children:"📖 Guides worth reading"}),a.jsx(_,{to:"/blog",className:"text-sm font-bold text-[var(--blaze)] hover:underline shrink-0",children:"All articles →"})]}),a.jsx("div",{className:"grid sm:grid-cols-2 gap-4 mb-4",children:Xn.slice(0,2).map(i=>a.jsx(Pb,{post:i},i.slug))}),a.jsxs("div",{className:"card mt-10 p-8 text-center",children:[a.jsx("div",{className:"text-4xl mb-3",children:a.jsx(q,{children:a.jsx("span",{className:"inline-block",children:"⚡"})})}),a.jsx("h2",{className:"font-display font-bold text-2xl text-[var(--ink)]",children:"Your brand belongs on this list."}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm mt-2",children:"Claim your spot from $1 and start climbing."}),a.jsx("button",{onClick:n,className:"btn-primary px-8 py-3.5 mt-5",children:"Claim my spot — $1"})]})]})})}function Bu({onClaim:e}){return a.jsx("div",{className:"pt-[92px] min-h-screen grid place-items-center px-4",children:a.jsxs("div",{className:"text-center max-w-md py-16",children:[a.jsx("div",{className:"text-7xl mb-6",children:a.jsx(q,{children:a.jsx("span",{className:"inline-block",children:"🕳️"})})}),a.jsx("h1",{className:"font-display font-extrabold text-4xl text-[var(--ink)] mb-3",children:"Lost in the spotlight?"}),a.jsx("p",{className:"text-[var(--ink-2)] text-sm leading-relaxed mb-8",children:"That page doesn't exist. The internet is big — but the leaderboard is right here."}),a.jsxs("div",{className:"flex flex-col sm:flex-row gap-3 justify-center",children:[a.jsx(_,{to:"/",className:"btn-primary px-8 py-3.5 text-sm",children:"🏠 Back home"}),a.jsx(_,{to:"/leaderboard",className:"btn-ghost px-8 py-3.5 text-sm",children:"📊 Leaderboard"})]}),e&&a.jsx("button",{onClick:e,className:"mt-6 text-sm font-bold text-[var(--blaze)] hover:underline",children:"⚡ Claim your spot instead — from $1"})]})})}function aE({spots:e,moves:t,onBoost:n,onClaim:s}){const{category:r}=qd(),i=w.useMemo(()=>zs.find(c=>c.slug===r),[r]),o=w.useMemo(()=>(e||[]).filter(c=>xb(c)===r),[e,r]);if(w.useEffect(()=>(i&&(document.title=`${i.name} — FlexSpot.LOL`),()=>{document.title="FlexSpot.LOL — Claim Your Spot On The Internet"}),[i]),!i)return a.jsx(Bu,{onClaim:s});const l=zs.filter(c=>c.slug!==r);return a.jsx("div",{className:"pt-[92px]",children:a.jsxs("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-16",children:[a.jsx(_,{to:"/explore",className:"text-sm text-[var(--ink-2)] hover:text-[var(--ink)]",children:"← All categories"}),a.jsx("div",{className:"text-5xl mt-6 mb-3",children:i.icon}),a.jsx("h1",{className:"font-display font-extrabold text-4xl sm:text-5xl text-[var(--ink)]",children:i.name}),a.jsx("p",{className:"text-[var(--ink-2)] mt-3 max-w-xl leading-relaxed",children:i.blurb}),a.jsx("p",{className:"text-xs text-[var(--ink-3)] mt-2",children:"Preview data — live spots appear after approval."}),a.jsxs("div",{className:"mt-8 space-y-2",children:[o.map(c=>a.jsx(la,{spot:c,move:t[c.slug]??c.move,onBoost:n,highlight:!0},c.slug)),o.length===0&&a.jsxs("div",{className:"card p-10 text-center",children:[a.jsx("div",{className:"text-5xl mb-4",children:"🌱"}),a.jsxs("h2",{className:"font-display font-bold text-xl text-[var(--ink)] mb-2",children:["No spots in ",i.name," yet"]}),a.jsx("p",{className:"text-sm text-[var(--ink-2)] mb-5",children:"Be the first to claim this category — and own the spotlight."}),a.jsxs("button",{onClick:s,className:"btn-primary px-8 py-3 text-sm",children:["⚡ Claim a ",i.name," spot — $1"]})]})]}),a.jsx("h2",{className:"font-display font-bold text-xl text-[var(--ink)] mt-12 mb-4",children:"Other categories"}),a.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3",children:l.slice(0,4).map(c=>a.jsxs(_,{to:`/explore/${c.slug}`,className:"card p-4 text-center hover:-translate-y-1 transition-transform",children:[a.jsx("div",{className:"text-2xl mb-1",children:c.icon}),a.jsx("div",{className:"font-bold text-[var(--ink)] text-sm",children:c.name})]},c.slug))})]})})}function iE(e){const{slug:t}=qd();return(e.spots||[]).find(s=>s.slug===t)?a.jsx(Hb,{...e}):a.jsx(Bu,{onClaim:e.onClaim})}const Iu="https://dawoodshah2232-svg.github.io/flexspot".replace(/\/+$/,""),Yb=`${Iu}/og-cover.png`,ts=e=>`${Iu}${e}`,oE=e=>ts(e),Vp={"/":{title:"FlexSpot.LOL — Bid for Attention | Live Brand Leaderboard",description:"FlexSpot.LOL — the internet's live spotlight competition. Claim a public leaderboard spot from just $1, pay in USDT crypto, and outbid rivals to take the crown."},"/claim":{title:"Claim Your Spot — From Just $1 | FlexSpot.LOL",description:"Claim your public FlexSpot leaderboard spot in under a minute. Enter your brand details, boost from $1, and start climbing to #1."},"/leaderboard":{title:"Live Leaderboard — Who Rules the Spotlight | FlexSpot.LOL",description:"The live FlexSpot leaderboard: brands, creators, and meme pages ranked by total boosts. Watch the battle in real time and boost your favorite."},"/explore":{title:"Explore All Categories | FlexSpot.LOL",description:"Browse FlexSpot spots by category — startups, creators, gaming, food & drink, fintech, memes, and more. Find a brand to boost or a niche to conquer."},"/trending":{title:"Trending Spots Right Now | FlexSpot.LOL",description:"What's hot on FlexSpot: the spots gaining the most buzz this week. Jump on a rising star or reclaim the crown."},"/rising":{title:"Rising Stars — Fastest Climbers | FlexSpot.LOL",description:"The fastest-climbing FlexSpot spots. These brands are gaining momentum — boost one before they hit #1."},"/winners":{title:"Winners — Hall of Fame | FlexSpot.LOL",description:"The FlexSpot hall of fame: past and present champions who held the crown. This is what $1 of glory looks like."},"/new":{title:"Newest Spots — Fresh Claims | FlexSpot.LOL",description:"The freshest FlexSpot claims. Be the first to boost a brand-new spot and get in before the crowd."},"/how-it-works":{title:"How It Works — Claim, Boost, Win | FlexSpot.LOL",description:"How FlexSpot works: claim a public spot from $1, get boosted by fans and referrals, and climb the live leaderboard to take the crown."},"/rewards":{title:"Rewards — Boosts, Referrals & Crowns | FlexSpot.LOL",description:"FlexSpot rewards: earn your place with boosts, referral links that add $1 per visit, and the champion crown for the top spot."},"/faq":{title:"FAQ — Frequently Asked Questions | FlexSpot.LOL",description:"Everything about FlexSpot: how ranking works, what you can promote, payments, referrals, and whether there are any fees.",jsonLd:()=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:kb.map(e=>({"@type":"Question",name:e.q,acceptedAnswer:{"@type":"Answer",text:e.a}}))})},"/blog":{title:"The Spotlight Blog — Visibility Guides & Bidding Tactics | FlexSpot.LOL",description:"The FlexSpot blog: guides on brand visibility, bidding strategy, small-business marketing, viral growth, and winning the spotlight — from $1.",jsonLd:e=>xo([{name:"Home",path:"/"},{name:"Blog",path:e}])},"/privacy":{title:"Privacy Policy | FlexSpot.LOL",description:"FlexSpot privacy policy: what data we collect, how we use it, and your rights. Short, plain-English, no surprises."},"/disclaimers":{title:"Disclaimers | FlexSpot.LOL",description:"FlexSpot disclaimers: preview-mode data, rankings, payments, and general “as is” terms of the spotlight competition."},"/terms":{title:"Terms of Service | FlexSpot.LOL",description:"FlexSpot terms of service: the rules of the spotlight competition — claiming, boosting, referrals, and acceptable use."},"/admin":{title:"Admin | FlexSpot.LOL",description:"FlexSpot admin dashboard.",robots:"noindex, nofollow"}};function xo(e){return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:e.map((t,n)=>({"@type":"ListItem",position:n+1,name:t.name,item:oE(t.path)}))}}function lE(e){const t=(e==null?void 0:e.name)||"Category",n=(e==null?void 0:e.blurb)||`Explore ${t} spots on FlexSpot.`;return{title:`${t} Spots — ${(e==null?void 0:e.icon)||""} Explore ${t} | FlexSpot.LOL`.replace("  "," ").trim(),description:`${t} on FlexSpot: ${n} Claim a ${t.toLowerCase()} spot from $1 and climb the live leaderboard.`,jsonLd:s=>xo([{name:"Home",path:"/"},{name:"Explore",path:"/explore"},{name:t,path:s}])}}function cE(e,t){const n=(e==null?void 0:e.name)||"Spot",s=(e==null?void 0:e.tagline)||"",r=(e==null?void 0:e.description)||s,i=e==null?void 0:e.rank,o=i?` Currently ranked #${i} on the live leaderboard.`:"",l=s?`${n} — ${s} | FlexSpot.LOL`:`${n} | FlexSpot.LOL`;return{title:l,description:`${n}: ${r}${o} Boost it from $1 on FlexSpot and push it toward the crown.`.slice(0,300),canonicalPath:`/s/${e.slug}`,jsonLd:()=>({"@context":"https://schema.org","@type":"ItemPage",name:l,description:r,url:ts(`/s/${e.slug}`),mainEntity:{"@type":"Product",name:n,description:r,url:ts(`/s/${e.slug}`),category:(e==null?void 0:e.category)||void 0},breadcrumb:xo([{name:"Home",path:"/"},{name:"Leaderboard",path:"/leaderboard"},{name:n,path:`/s/${e.slug}`}])})}}function dE(e){const t=`/blog/${e.slug}`,n=e.image?ts(e.image.startsWith("/")?e.image:`/${e.image}`):Yb;return{title:`${e.title} | FlexSpot.LOL Blog`,description:e.description,canonicalPath:t,ogImage:n,robots:e.sample?"noindex, follow":void 0,jsonLd:()=>[{"@context":"https://schema.org","@type":"BlogPosting",headline:e.title,description:e.description,datePublished:e.date,author:{"@type":"Person",name:e.author},image:n,mainEntityOfPage:{"@type":"WebPage","@id":ts(t)},publisher:{"@type":"Organization",name:"FlexSpot.LOL",logo:{"@type":"ImageObject",url:`${Iu}/logo-crown-180.png`}}},xo([{name:"Home",path:"/"},{name:"Blog",path:"/blog"},{name:e.title,path:t}])]}}function uE(e,{spots:t=[],categoryOf:n}={}){const s=e.split("?")[0].replace(/\/+$/,"")||"/";if(Vp[s])return{...Vp[s],path:s};const r=s.match(/^\/blog\/([^/]+)$/);if(r){const d=gb(r[1]);if(d)return{...dE(d),path:s}}const i=s.match(/^\/explore\/([^/]+)$/);if(i&&n){const d=n(i[1]);if(d)return{...lE(d),path:s}}const o=s.match(/^\/s\/([^/]+)$/),l=s.match(/^\/([^/]+)$/),c=o?o[1]:l?l[1]:null;if(c){const d=t.find(u=>u.slug===c);if(d)return{...cE(d,o?s:`/s/${d.slug}`),path:o?s:`/s/${d.slug}`}}return{title:"Page Not Found | FlexSpot.LOL",description:"This page doesn't exist on FlexSpot.LOL. Head back to the live leaderboard or claim your own spot from $1.",path:s,robots:"noindex, follow"}}const hE=(e,t)=>({pageUrl:ts(e||"/"),canonicalUrl:ts(t||e||"/")});function Ut(e,t,n,s=document.head){let r=s.querySelector(e);if(!r){r=document.createElement("meta");const i=e.match(/\[(name|property)="([^"]+)"\]/);r.setAttribute(i[1],i[2]),s.appendChild(r)}r.setAttribute(t,n)}function mE({spots:e=[]}){const{pathname:t,search:n}=Ze();return w.useEffect(()=>{const s=uE(t,{spots:e,categoryOf:PC}),{pageUrl:r,canonicalUrl:i}=hE(s.path,s.canonicalPath),o=typeof s.jsonLd=="function"?s.jsonLd(s.path):null,l=s.ogImage||Yb;document.title=s.title,Ut('meta[name="description"]',"content",s.description),Ut('meta[property="og:title"]',"content",s.title),Ut('meta[property="og:description"]',"content",s.description),Ut('meta[property="og:url"]',"content",r),Ut('meta[property="og:image"]',"content",l),Ut('meta[name="twitter:title"]',"content",s.title),Ut('meta[name="twitter:description"]',"content",s.description),Ut('meta[name="twitter:image"]',"content",l);let c=document.querySelector('link[rel="canonical"]');c||(c=document.createElement("link"),c.setAttribute("rel","canonical"),document.head.appendChild(c)),c.setAttribute("href",i);const d=document.querySelector('meta[name="robots"]');s.robots?Ut('meta[name="robots"]',"content",s.robots):d&&d.setAttribute("content","index, follow, max-image-preview:large");const u=document.getElementById("page-jsonld");if(u&&u.remove(),o){const h=document.createElement("script");h.type="application/ld+json",h.id="page-jsonld",h.textContent=JSON.stringify(o),document.head.appendChild(h)}},[t,n,e]),null}const pE=re.lazy(()=>ay(()=>import("./Blog-DubJZvCM.js"),[])),fE=re.lazy(()=>ay(()=>import("./BlogPost-XrnlV6DW.js"),[]));function Up(){return a.jsx("div",{className:"pt-[92px]",children:a.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 text-center",children:[a.jsx("div",{className:"text-5xl mb-4 anim-floaty",children:"📝"}),a.jsx("div",{className:"font-display font-bold text-[var(--ink)] text-lg",children:"Loading the article…"})]})})}function gE(){const{pathname:e}=Ze();return w.useEffect(()=>{window.scrollTo(0,0)},[e]),null}function yE(){const[e,t]=w.useState([]),[n,s]=w.useState([]),[r,i]=w.useState({}),[o,l]=w.useState([]),[c,d]=w.useState(!0),u=hb(),h=Hd(),m=w.useCallback(async()=>{const f=await DC();s(MC());const g={};f.forEach(v=>{v.move&&(g[v.slug]=v.move)}),Object.keys(g).length&&(i(g),setTimeout(()=>i({}),2600)),t(f),d(!1)},[]);w.useEffect(()=>{m()},[m]);const y=w.useCallback(f=>{const g=Date.now()+Math.random();l(v=>[...v.slice(-2),{id:g,msg:f}]),setTimeout(()=>l(v=>v.filter(k=>k.id!==g)),4200)},[]);w.useEffect(()=>{if(c)return;const g=setInterval(()=>{t(v=>{if(!v.length)return v;const k={};v.forEach(A=>{k[A.slug]=A.rank});const N=v.map(A=>({...A}));if(Math.random()<.7){const A=Math.floor(Math.random()*N.length),P=[.5,1,2,5][Math.floor(Math.random()*4)];N[A]={...N[A],amount:N[A].amount+P},Math.random()<.5&&y(`⚡ ${N[A].name} just got a $${P} boost`)}else{const[A,P]=Yi[Math.floor(Math.random()*Yi.length)];y(`🔥 ${A} ${P}`)}const j=ca(N),S={};return j.forEach(A=>{const P=(k[A.slug]??A.rank)-A.rank;P!==0&&(S[A.slug]=P)}),Object.keys(S).length&&(i(S),setTimeout(()=>i({}),2600)),Nb(j),j.map(A=>({...A,move:S[A.slug]||0}))})},22e3);return()=>clearInterval(g)},[c,y]);const p=w.useCallback(()=>{h("/claim")},[h]),b=w.useCallback(f=>{h(`/claim?boost=${f.slug}`)},[h]),x=w.useCallback(()=>{m()},[m]);return c?a.jsx("div",{className:"min-h-screen grid place-items-center bg-[var(--bg)]",children:a.jsxs("div",{className:"text-center",children:[a.jsx(q,{children:a.jsx("div",{className:"text-5xl mb-4 anim-floaty",children:"⚡"})}),a.jsx("div",{className:"font-display font-bold text-[var(--ink)] text-lg",children:"Loading the spotlight…"})]})}):a.jsxs("div",{className:"min-h-screen bg-[var(--bg)] text-[var(--ink)]",children:[a.jsx(gE,{}),a.jsx(mE,{spots:e}),a.jsx(AA,{}),a.jsx(uT,{onClaim:p}),a.jsx("main",{children:a.jsxs(T0,{children:[a.jsx(me,{path:"/",element:a.jsx(pA,{spots:e,onClaim:p,onBoost:b,viewers:u})}),a.jsx(me,{path:"/claim",element:a.jsx(FA,{spots:e,onSubmitted:x})}),a.jsx(me,{path:"/leaderboard",element:a.jsx(MA,{spots:e,moves:r,onBoost:b,onClaim:p})}),a.jsx(me,{path:"/explore",element:a.jsx(rE,{spots:e,onBoost:b,onClaim:p})}),a.jsx(me,{path:"/explore/:category",element:a.jsx(aE,{spots:e,moves:r,onBoost:b,onClaim:p})}),a.jsx(me,{path:"/trending",element:a.jsx(La,{mode:"trending",spots:e,moves:r,onBoost:b,onClaim:p})}),a.jsx(me,{path:"/rising",element:a.jsx(La,{mode:"rising",spots:e,moves:r,onBoost:b,onClaim:p})}),a.jsx(me,{path:"/winners",element:a.jsx(La,{mode:"winners",spots:e,moves:r,onBoost:b,onClaim:p})}),a.jsx(me,{path:"/new",element:a.jsx(La,{mode:"new",spots:e,moves:r,onBoost:b,onClaim:p})}),a.jsx(me,{path:"/how-it-works",element:a.jsx($A,{onClaim:p})}),a.jsx(me,{path:"/rewards",element:a.jsx(WA,{spots:e,onClaim:p})}),a.jsx(me,{path:"/faq",element:a.jsx(UA,{onClaim:p})}),a.jsx(me,{path:"/blog",element:a.jsx(re.Suspense,{fallback:a.jsx(Up,{}),children:a.jsx(pE,{})})}),a.jsx(me,{path:"/blog/:slug",element:a.jsx(re.Suspense,{fallback:a.jsx(Up,{}),children:a.jsx(fE,{})})}),a.jsx(me,{path:"/privacy",element:a.jsx(HA,{})}),a.jsx(me,{path:"/terms",element:a.jsx(qA,{})}),a.jsx(me,{path:"/disclaimers",element:a.jsx(YA,{})}),a.jsx(me,{path:"/s/:slug",element:a.jsx(Hb,{spots:e,onClaim:p,onBoost:b,refresh:m})}),a.jsx(me,{path:"/admin",element:a.jsx(ZA,{spots:e,pending:n,refresh:m})}),a.jsx(me,{path:"/:slug",element:a.jsx(iE,{spots:e,onClaim:p,onBoost:b})}),a.jsx(me,{path:"*",element:a.jsx(Bu,{onClaim:p})})]})}),a.jsx(gC,{onClaim:p}),a.jsx(pT,{onClaim:p}),a.jsx("div",{className:"fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none w-full px-4",children:a.jsx(ia,{children:o.map(f=>a.jsx(G.div,{initial:{opacity:0,y:16,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:8,scale:.95},className:"toast-pop rounded-2xl px-5 py-3 text-sm font-semibold whitespace-nowrap max-w-full overflow-hidden text-ellipsis bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] shadow-[var(--shadow-card)]",children:f.msg},f.id))})})]})}function vE(){return a.jsx(X0,{basename:"/flexspot/",children:a.jsx(yE,{})})}ry(document.getElementById("root")).render(a.jsx(re.StrictMode,{children:a.jsx(vE,{})}));export{aC as B,_ as L,Pb as a,qd as b,iC as c,Xn as d,wE as e,mC as f,gb as g,xC as h,vb as i,a as j,kE as p,w as r,xE as s,Ey as u};
