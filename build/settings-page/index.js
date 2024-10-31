(()=>{var e={694:(e,s,t)=>{"use strict";var r=t(925);function n(){}function o(){}o.resetWarningCache=n,e.exports=function(){function e(e,s,t,n,o,i){if(i!==r){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function s(){return e}e.isRequired=e;var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:s,element:e,elementType:e,instanceOf:s,node:e,objectOf:s,oneOf:s,oneOfType:s,shape:s,exact:s,checkPropTypes:o,resetWarningCache:n};return t.PropTypes=t,t}},556:(e,s,t)=>{e.exports=t(694)()},925:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},s={};function t(r){var n=s[r];if(void 0!==n)return n.exports;var o=s[r]={exports:{}};return e[r](o,o.exports,t),o.exports}t.n=e=>{var s=e&&e.__esModule?()=>e.default:()=>e;return t.d(s,{a:s}),s},t.d=(e,s)=>{for(var r in s)t.o(s,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:s[r]})},t.o=(e,s)=>Object.prototype.hasOwnProperty.call(e,s),(()=>{"use strict";var e=t(556),s=t.n(e);const r=window.wp.components,n=window.wp.i18n,o=window.ReactJSXRuntime,i=({plugins:e})=>{const s=[];for(const t of e){const{url:e,name:r,description:n}=t;s.push((0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:(0,o.jsx)("a",{href:e,rel:"noopener noreferrer",target:"_blank",children:r})})," - ",n]}))}return 0===s.length?null:(0,o.jsx)(r.PanelBody,{title:(0,n.__)("Our other WordPress plugins","password-reset-enforcement"),initialOpen:!0,children:s})};i.propTypes={plugins:e.shape({url:e.string.isRequired,name:e.string.isRequired,description:e.string.isRequired}).isRequired};const a=window.wp.element,c=window.wp.hooks,l=window.wp.primitives,d=({plugin:e})=>{const{slug:s}=window.teydeaStudio[e].plugin,t=`ts-plugin-icon-${s}`;switch(e){case"hiringHub":return(0,o.jsx)("div",{className:"tsc-plugin-icon",children:(0,o.jsxs)(l.SVG,{fill:"none",height:"256",viewBox:"0 0 256 256",width:"256",xmlns:"http://www.w3.org/2000/svg",children:[(0,o.jsx)("mask",{height:"256",id:(0,n.sprintf)("%s-a",t),maskUnits:"userSpaceOnUse",style:{maskType:"alpha"},width:"256",x:"0",y:"0",children:(0,o.jsx)(l.Path,{fill:"#fff",d:"M0 0h256v256H0z"})}),(0,o.jsxs)(l.G,{mask:(0,n.sprintf)("url(#%s-a)",t),children:[(0,o.jsx)(l.Path,{fill:"#111",d:"M-.296 10.24C-.296 4.585 4.29 0 9.944 0h235.52c5.656 0 10.24 4.585 10.24 10.24v235.52c0 5.655-4.584 10.24-10.24 10.24H9.944c-5.655 0-10.24-4.585-10.24-10.24V10.24Z"}),(0,o.jsx)(l.Path,{fill:"#fcebd8",d:"m279.269 249.611-44.688-44.688a15.895 15.895 0 0 0-12.186-4.598l-18.774-18.773a90.092 90.092 0 0 0 16.326-51.76c0-49.995-40.672-90.672-90.672-90.672s-90.662 40.677-90.662 90.677c0 50 40.672 90.672 90.672 90.672a90.13 90.13 0 0 0 51.76-16.325l18.774 18.773a15.884 15.884 0 0 0 4.597 12.182l44.688 44.688a15.947 15.947 0 0 0 11.317 4.677c4.102 0 8.192-1.557 11.312-4.677l7.542-7.542a16.015 16.015 0 0 0 0-22.629l-.006-.005ZM49.279 129.797c0-44.112 35.889-80 80.001-80s80 35.888 80 80-35.888 80-80 80-80-35.888-80-80Zm147.66 60.155 14.992 14.992-7.499 7.499-14.992-14.992a90.554 90.554 0 0 0 7.499-7.499Zm74.784 74.741-7.542 7.542a5.354 5.354 0 0 1-7.546 0l-44.688-44.688a5.345 5.345 0 0 1 0-7.547l7.541-7.541a5.347 5.347 0 0 1 7.547 0l44.688 44.688a5.343 5.343 0 0 1 0 7.546Z"}),(0,o.jsx)(l.Path,{fill:"#fcebd8",d:"M129.28 60.459c-38.23 0-69.333 31.104-69.333 69.333s31.104 69.333 69.333 69.333 69.333-31.104 69.333-69.333c0-38.23-31.104-69.333-69.333-69.333Zm-32 118.442v-6.442c0-14.704 11.963-26.667 26.667-26.667h10.666c14.704 0 26.667 11.963 26.667 26.667v6.442c-9.211 6.027-20.192 9.558-32 9.558s-22.789-3.536-32-9.558Zm32-49.109c-8.821 0-16-7.179-16-16s7.179-16 16-16 16 7.179 16 16-7.179 16-16 16Zm42.544 40.277a37.354 37.354 0 0 0-28.288-33.818 26.618 26.618 0 0 0 12.411-22.454c0-14.704-11.963-26.666-26.667-26.666-14.704 0-26.667 11.962-26.667 26.666a26.608 26.608 0 0 0 3.322 12.821 26.607 26.607 0 0 0 9.089 9.633 37.348 37.348 0 0 0-28.288 33.818 58.399 58.399 0 0 1-16.123-40.277c0-32.347 26.32-58.667 58.667-58.667s58.667 26.32 58.667 58.667c0 15.595-6.16 29.755-16.123 40.277Z"})]})]})});case"passwordRequirements":return(0,o.jsx)("div",{className:"tsc-plugin-icon",children:(0,o.jsxs)(l.SVG,{fill:"none",height:"256",viewBox:"0 0 256 256",width:"256",xmlns:"http://www.w3.org/2000/svg",children:[(0,o.jsx)("clipPath",{id:(0,n.sprintf)("%s-a",t),children:(0,o.jsx)(l.Path,{d:"M0 0h256v256H0z"})}),(0,o.jsx)("mask",{height:"256",id:(0,n.sprintf)("%s-b",t),maskUnits:"userSpaceOnUse",width:"256",x:"0",y:"0",children:(0,o.jsx)(l.Path,{fill:"#fff",d:"M0 0h256v256H0z"})}),(0,o.jsxs)(l.G,{clipPath:(0,n.sprintf)("url(#%s-a)",t),mask:(0,n.sprintf)("url(#%s-b)",t),children:[(0,o.jsx)(l.Rect,{fill:"#111",height:"256",rx:"10.24",width:"256",x:"-.296"}),(0,o.jsxs)(l.G,{fill:"#fcebd8",children:[(0,o.jsx)(l.Path,{d:"M126.607 223.812a3.574 3.574 0 0 0 2.32 0c72.851-25.235 76.539-86.466 76.539-87.231V59.717a3.482 3.482 0 0 0-2.737-3.41c-54.946-12.06-72.828-24.074-72.99-24.19a3.483 3.483 0 0 0-3.99 0c-.185.116-17.673 12.107-72.967 24.19a3.48 3.48 0 0 0-2.737 3.41v77.026c.024.603 3.711 61.834 76.562 87.069zM57.027 62.5c45.042-10.066 64.942-19.992 70.74-23.448 5.914 3.456 25.699 13.382 70.741 23.448v73.918c0 2.32-3.595 56.57-70.741 80.413-67.169-23.843-70.648-78.116-70.764-80.25z"}),(0,o.jsx)(l.Path,{d:"M126.561 206.881a3.46 3.46 0 0 0 2.32 0c57.357-20.875 60.303-71.251 60.303-71.901v-62.9a3.457 3.457 0 0 0-2.714-3.387c-42.653-9.764-56.569-19.552-56.685-19.645a3.48 3.48 0 0 0-4.105 0c-.139.116-14.056 9.904-56.709 19.668a3.455 3.455 0 0 0-2.69 3.363v63.041c.023.51 2.922 50.979 60.28 71.761zM73.239 74.863c33.793-7.956 49.333-15.819 54.505-18.88 5.172 3.061 20.712 10.924 54.505 18.88v59.955c0 1.856-2.783 45.715-54.505 65.104-51.722-19.389-54.412-63.248-54.505-64.942z"}),(0,o.jsx)(l.Path,{d:"M105.014 167.428h45.46a9.761 9.761 0 0 0 9.741-9.741v-35.278a9.745 9.745 0 0 0-6.013-8.999 9.736 9.736 0 0 0-3.728-.742h-1.856V98.752a20.873 20.873 0 1 0-41.748 0v13.916h-1.856a9.736 9.736 0 0 0-6.888 2.853 9.748 9.748 0 0 0-2.853 6.888v35.278a9.762 9.762 0 0 0 9.741 9.741zm-2.783-45.019a2.784 2.784 0 0 1 2.783-2.783h45.46a2.784 2.784 0 0 1 2.783 2.783v35.278a2.784 2.784 0 0 1-2.783 2.783h-45.46a2.784 2.784 0 0 1-2.783-2.783zm11.597-23.657a13.915 13.915 0 1 1 27.832 0v13.916h-27.832z"}),(0,o.jsx)(l.Path,{d:"M124.265 147.319v4.082a3.48 3.48 0 1 0 6.958 0v-4.082a11.408 11.408 0 0 0 7.795-12.628 11.41 11.41 0 1 0-14.753 12.628zm3.479-15.238a4.457 4.457 0 0 1 4.116 2.755 4.453 4.453 0 1 1-4.116-2.755z"})]})]})]})});case"passwordResetEnforcement":return(0,o.jsx)("div",{className:"tsc-plugin-icon",children:(0,o.jsxs)(l.SVG,{fill:"none",height:"256",viewBox:"0 0 256 256",width:"256",xmlns:"http://www.w3.org/2000/svg",children:[(0,o.jsx)("clipPath",{id:(0,n.sprintf)("%s-b",t),children:(0,o.jsx)(l.Path,{d:"M31.744 31.744h192.512v192.512H31.744z"})}),(0,o.jsx)("mask",{height:"256",id:(0,n.sprintf)("%s-a",t),maskUnits:"userSpaceOnUse",width:"256",x:"0",y:"0",children:(0,o.jsx)(l.Path,{d:"M0 0h256v256H0z",fill:"#fff"})}),(0,o.jsx)("mask",{height:"194",id:(0,n.sprintf)("%s-c",t),maskUnits:"userSpaceOnUse",width:"194",x:"31",y:"31",children:(0,o.jsx)(l.Path,{d:"M31.744 31.744h192.512v192.512H31.744z",fill:"#fff"})}),(0,o.jsxs)(l.G,{mask:(0,n.sprintf)("url(#%s-a)",t),children:[(0,o.jsx)(l.Rect,{fill:"#111",height:"256",rx:"10.24",width:"256",x:"-.296"}),(0,o.jsxs)(l.G,{clipPath:(0,n.sprintf)("url(#%s-b)",t),mask:(0,n.sprintf)("url(#%s-c)",t),children:[(0,o.jsx)(l.Path,{d:"m215.503 116.44 4.907-29.664-7.994 3.432c-9.869-22.07-27.615-39.125-50.118-48.11-22.945-9.161-48.085-8.839-70.788.908-22.702 9.747-40.25 27.751-49.412 50.696l13.968 5.577c7.672-19.214 22.366-34.291 41.377-42.452 19.012-8.163 40.064-8.433 59.278-.761 18.773 7.495 33.592 21.697 41.875 40.076l-7.979 3.426zM40.497 139.56l-4.907 29.664 7.994-3.432c9.87 22.069 27.615 39.125 50.119 48.11 22.945 9.161 48.085 8.839 70.787-.908 22.703-9.747 40.251-27.751 49.412-50.696l-13.967-5.577c-7.672 19.214-22.367 34.291-41.378 42.452-19.011 8.163-40.063 8.433-59.277.761-18.773-7.495-33.593-21.697-41.876-40.076l7.98-3.426z",stroke:"#fcebd8",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",strokeWidth:"7.52"}),(0,o.jsx)(l.Path,{d:"M92.526 101.467a6.31 6.31 0 0 1 0-8.928 6.317 6.317 0 0 1 8.931 0 6.312 6.312 0 0 1 0 8.928 6.316 6.316 0 0 1-8.931 0z",fill:"#fcebd8"}),(0,o.jsxs)(l.G,{stroke:"#fcebd8",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",strokeWidth:"7.52",children:[(0,o.jsx)(l.Path,{d:"m131.753 116.968 40.931 40.916-1.055 13.724-13.729 1.056-4.755-4.753-2.357-7.497-3.52-3.519-7.03-1.886-4.577-4.575-1.417-6.558-4.107-4.106-7.148-2.004-6.021-6.018"}),(0,o.jsx)(l.Path,{d:"M84.693 125.302c-11.214-11.209-11.214-29.383 0-40.593 11.213-11.209 29.394-11.209 40.607 0 11.214 11.21 11.214 29.384 0 40.593-11.213 11.209-29.394 11.209-40.607 0z"})]})]})]})]})})}return null};d.propTypes={plugin:e.string.isRequired};const p=({plugin:e,actions:s,children:t})=>{const{pageTitle:r}=window.teydeaStudio[e].settingsPage;return(0,o.jsxs)("div",{className:"tsc-settings-container",children:[(0,o.jsxs)("div",{className:"tsc-settings-container__header",children:[(0,o.jsx)(d,{plugin:e}),(0,o.jsx)("h1",{children:r}),(0,o.jsx)("div",{className:"tsc-settings-container__actions",children:s})]}),(0,o.jsx)("div",{className:"tsc-settings-container__container",children:t})]})};p.propTypes={plugin:e.string.isRequired,actions:e.element.isRequired,children:e.element.isRequired};const u=({plugin:e})=>{const{helpLinks:s}=window.teydeaStudio[e].settingsPage,{slug:t}=window.teydeaStudio[e].plugin;return(0,o.jsx)("div",{className:"tsc-settings-sidebar",children:(0,o.jsxs)(r.Panel,{children:[0<s.length&&(0,o.jsx)(r.PanelBody,{title:(0,n.__)("Help & support","password-reset-enforcement"),initialOpen:!0,className:"tsc-settings-sidebar__panel",children:(0,o.jsx)("ul",{children:s.map((({url:e,title:s},t)=>(0,o.jsx)("li",{children:(0,o.jsx)("a",{href:e,target:"_blank",rel:"noreferrer noopener",children:s})},t)))})}),(0,c.applyFilters)("password_reset_enforcement__upsell_panel",(0,o.jsx)(a.Fragment,{})),(0,c.applyFilters)("password_reset_enforcement__promoted_plugins_panel",(0,o.jsx)(a.Fragment,{})),(0,o.jsxs)(r.PanelBody,{title:(0,n.__)("Write a review","password-reset-enforcement"),initialOpen:!1,className:"tsc-settings-sidebar__panel",children:[(0,o.jsx)("p",{children:(0,n.__)("If you like this plugin, share it with your network and write a review on WordPress.org to help others find it. Thank you!","password-reset-enforcement")}),(0,o.jsx)("a",{className:"components-button is-secondary is-compact",href:`https://wordpress.org/support/plugin/${t}/reviews/#new-post`,rel:"noopener noreferrer",target:"_blank",children:(0,n.__)("Write a review","password-reset-enforcement")})]}),(0,o.jsxs)(r.PanelBody,{title:(0,n.__)("Share your feedback","password-reset-enforcement"),initialOpen:!1,className:"tsc-settings-sidebar__panel",children:[(0,o.jsx)("p",{children:(0,n.__)("We're eager to hear your feedback, feature requests, suggestions for improvements etc; we're waiting for a message from you!","password-reset-enforcement")}),(0,o.jsx)("a",{className:"components-button is-secondary is-compact",href:"mailto:hello@teydeastudio.com",rel:"noopener noreferrer",target:"_blank",children:(0,n.__)("Contact us","password-reset-enforcement")})]})]})})};u.propTypes={plugin:e.string.isRequired};const h=window.wp.data,g=window.wp.coreData,f=({plugin:e,values:s,onChange:t})=>{const{slug:i}=window.teydeaStudio[e].plugin;(0,h.dispatch)("core").addEntities([{name:"user-roles",kind:`${i}/v1`,baseURL:`/${i}/v1/user-roles`}]);const a=(0,h.useSelect)((e=>{const{getEntityRecords:s}=e(g.store);return s(`${i}/v1`,"user-roles",{})}),[]);if(!a)return null;const c=a.map((e=>e.title)),l=s.map((e=>{for(const s of a)if(e===s.value)return s.title;return null})).filter((e=>e));return(0,o.jsx)(r.FormTokenField,{label:(0,n.__)("Apply to users with role","password-reset-enforcement"),value:l,suggestions:c,onChange:e=>{const s=e.map((e=>{for(const s of a)if(e===s.title)return s.value;return null})).filter((e=>e));t(s)},__experimentalShowHowTo:!1})};f.propTypes={plugin:e.string.isRequired,values:e.arrayOf(e.string).isRequired,onChange:e.func.isRequired};const m=window.wp.apiFetch;var w=t.n(m);const _=window.wp.compose;(0,h.dispatch)("core").addEntities([{name:"users",kind:"password-reset-enforcement/v1",baseURL:"/password-reset-enforcement/v1/users"}]);const x=({values:e,onChange:s})=>{const[t,i]=(0,a.useState)(""),[c,l]=(0,a.useState)([]),d=(0,_.useDebounce)(i,500),{searchResults:p,searchHasResolved:u}=(0,h.useSelect)((e=>{if(!t)return{searchResults:[],searchHasResolved:!0};const{getEntityRecords:s,hasFinishedResolution:r}=e(g.store),n=["password-reset-enforcement/v1","users",{search:t,limit:50}];return{searchResults:s(...n),searchHasResolved:r("getEntityRecords",n)}}),[t]);return(0,a.useEffect)((()=>{u&&l(p?.length?p.map((e=>({value:e.title,title:e.title,id:e.id}))):[])}),[p,u]),(0,o.jsx)(r.FormTokenField,{label:(0,n.__)("Apply to specific users","password-reset-enforcement"),value:e,suggestions:c.map((e=>e.title)),onChange:e=>{const t=e.map((e=>{if("object"==typeof e)return e;for(const s of c)if(e===s.title)return s;return null})).filter((e=>"object"==typeof e));s(t)},onInputChange:d,__experimentalShowHowTo:!1})};x.propTypes={values:s().arrayOf(s().string).isRequired,onChange:s().func.isRequired};const y=(e,s)=>{switch(s.type){case"processAction":return{...e,isActioning:!0,pages:Math.ceil(e.affectedUsersCount/100),pagesProcessed:0,processErrors:[]};case"pageProcessed":return{...e,pagesProcessed:s.paged};case"pageProcessErrored":return{...e,pagesProcessed:s.paged,processErrors:[...e.processErrors,s.error]};case"actionProcessed":return{...e,isActioning:!1};case"updateConfiguration":return{...e,...s.changes};case"updateUserCoverageData":return{...e,userCoverageNotice:s.notice,affectedUsersCount:s.count}}return e},j=(e,s)=>(0,n.sprintf)("%1$s%%",(100*s/e).toFixed(0)),v=()=>{const e="passwordResetEnforcement",s=(0,n.__)("Note: your account is always excluded from the processing.","password-reset-enforcement"),{isNetworkEnabled:t,nonce:i}=window.teydeaStudio[e].settingsPage,[c,l]=(0,a.useReducer)(y,{toAll:!0,toRoles:[],toUsers:[],applicability:"immediately",sendEmail:!0,allowProcessInitiatedWithCurrentPassword:!0,userCoverageNotice:s,affectedUsersCount:0,isActioning:!1,pages:0,pagesProcessed:0,processErrors:[]});(0,a.useEffect)((()=>{w()({path:`/password-reset-enforcement/v1/user-coverage?to_all=${c.toAll}&to_roles=${JSON.stringify(c.toRoles)}&to_users=${JSON.stringify(c.toUsers.map((e=>e.id)))}`,method:"GET"}).then((e=>(l({type:"updateUserCoverageData",count:e.count,notice:(0,n.sprintf)(
// Translators: %1$s - base user coveage notice, %2$d - number of users affected, %3$s - users word (singular or plural), %4$s - percentage coverage, %5$s - passwords word (singular or plural).
// Translators: %1$s - base user coveage notice, %2$d - number of users affected, %3$s - users word (singular or plural), %4$s - percentage coverage, %5$s - passwords word (singular or plural).
(0,n.__)("%1$s This operation will force %2$d %3$s (%4$s of your users) to change their %5$s.","password-reset-enforcement"),s,e.count,(0,n._n)("user","users",e.count,"password-reset-enforcement"),(0,n.sprintf)("%1$s%%",(100*e.coverage).toFixed(2)),(0,n._n)("password","passwords",e.count,"password-reset-enforcement"))}),null))).catch((e=>{console.error(e),l({type:"updateUserCoverageNotice",notice:(0,n.sprintf)(
// Translators: %s - base user coveage notice.
// Translators: %s - base user coveage notice.
(0,n.__)("%s Couldn't calculate users coverage.","password-reset-enforcement"),s)})}))}),[c.toAll,c.toRoles,c.toUsers]),(0,a.useEffect)((()=>{c.isActioning&&(async()=>{for(let e=0;e<c.pages;e++){const s=e+1;await w()({path:"/password-reset-enforcement/v1/action",method:"POST",data:{to_all:c.toAll,to_roles:JSON.stringify(c.toRoles),to_users:JSON.stringify(c.toUsers.map((e=>e.id))),applicability:c.applicability,with_email:c.sendEmail,with_current_password_allowed:c.allowProcessInitiatedWithCurrentPassword,limit:100,paged:s,nonce:i}}).then((()=>(l({type:"pageProcessed",paged:s}),null))).catch((e=>{l({type:"pageProcessErrored",paged:s,error:e})}))}})()}),[c.isActioning]),(0,a.useEffect)((()=>{c.isActioning&&0<c.pages&&c.pages===c.pagesProcessed&&l({type:"actionProcessed"})}),[c.isActioning,c.pages,c.pagesProcessed]);let d=(0,o.jsxs)(r.Panel,{children:[(0,o.jsxs)(r.PanelBody,{title:(0,n.__)("Choose users to reset passwords for","password-reset-enforcement"),initialOpen:!0,children:[(0,o.jsx)(r.PanelRow,{children:(0,o.jsxs)("div",{children:[(0,o.jsx)(r.ToggleControl,{label:(0,n.__)("All users","password-reset-enforcement"),help:t?(0,n.__)("Enable this plugin on a site level to access more detailed user coverage settings. At the network level, you can only execute this action for all users.","password-reset-enforcement"):(0,n.__)("Turn this option off to define more detailed user coverage.","password-reset-enforcement"),checked:c.toAll,disabled:!0===t,onChange:()=>{l({type:"updateConfiguration",changes:{toAll:!c.toAll}})}}),(0,o.jsx)(r.Notice,{status:"info",isDismissible:!1,children:c.userCoverageNotice})]})}),!c.toAll&&(0,o.jsxs)(a.Fragment,{children:[(0,o.jsx)(r.PanelRow,{children:(0,o.jsx)(f,{plugin:e,values:c.toRoles,onChange:e=>{l({type:"updateConfiguration",changes:{toRoles:e}})}})}),(0,o.jsx)(r.PanelRow,{children:(0,o.jsx)(x,{values:c.toUsers,onChange:e=>{l({type:"updateConfiguration",changes:{toUsers:e}})}})})]})]}),(0,o.jsxs)(r.PanelBody,{title:(0,n.__)("Options","password-reset-enforcement"),initialOpen:!0,children:[(0,o.jsx)(r.PanelRow,{children:(0,o.jsx)(r.CheckboxControl,{label:(0,n.__)("Email password reset link to users","password-reset-enforcement"),help:(0,n.__)("Specifies whether users should be notified when their passwords are reset (checked) or not (unchecked).","password-reset-enforcement"),checked:c.sendEmail,onChange:()=>{l({type:"updateConfiguration",changes:{sendEmail:!c.sendEmail}})}})}),(0,o.jsx)(r.PanelRow,{children:(0,o.jsx)(r.CheckboxControl,{label:(0,n.__)("Allow users to initiate the password reset process using their current passwords","password-reset-enforcement"),help:(0,n.__)('If checked, users will be able to log in (using their current passwords) and will be redirected to the "set new password" form immediately after successful login and logged-out (so that the only action they can take is to set the new password). If unchecked, users will not be able to log in using their current password - they will be logged out immediately, and redirected to the "reset password" form, where they will have to provide their user name or email, and initiate the "full" password reset process.',"password-reset-enforcement"),checked:c.allowProcessInitiatedWithCurrentPassword,onChange:()=>{l({type:"updateConfiguration",changes:{allowProcessInitiatedWithCurrentPassword:!c.allowProcessInitiatedWithCurrentPassword}})}})}),(0,o.jsx)(r.PanelRow,{children:(0,o.jsx)(r.RadioControl,{label:(0,n.__)("When should the password be reset?","password-reset-enforcement"),selected:c.applicability,options:[{label:(0,n.__)("Immediately","password-reset-enforcement"),value:"immediately"},{label:(0,n.__)("After the current session expiry","password-reset-enforcement"),value:"after_session_expiry"}],help:(0,n.__)('Choose "After current session expiry" to force users to reset their passwords after their current session expires. Choose "Immediately" to force logout of chosen users.',"password-reset-enforcement"),onChange:e=>{l({type:"updateConfiguration",changes:{applicability:e}})}})})]})]});return c.isActioning&&(d=(0,o.jsx)(r.Disabled,{children:d})),(0,o.jsx)(p,{plugin:e,actions:(0,o.jsx)(r.Button,{variant:"primary",disabled:0===c.affectedUsersCount||c.isActioning,isBusy:c.isActioning,onClick:()=>{l({type:"processAction"})},children:c.isActioning?(0,n.__)("Actioning…","password-reset-enforcement"):(0,n.__)("Process action","password-reset-enforcement")}),children:(0,o.jsxs)("div",{className:"password-reset-enforcement-settings-container",children:[(0,o.jsxs)("div",{children:[d,(c.isActioning||0<c.pagesProcessed)&&(0,o.jsxs)("div",{className:"password-reset-enforcement-settings-container__action-logs",children:[(0,o.jsxs)("h2",{children:[(0,n.__)("Action progress:","password-reset-enforcement"),(0,o.jsx)("span",{children:j(c.pages,c.pagesProcessed)})]}),(0,o.jsx)("div",{className:"password-reset-enforcement-settings-container__progress-bar",children:(0,o.jsx)("div",{className:"password-reset-enforcement-settings-container__progress-bar-value",style:{width:j(c.pages,c.pagesProcessed)}})}),c.processErrors.map((({message:e},s)=>(0,o.jsx)(r.Notice,{status:"error",isDismissible:!1,children:e},s)))]})]}),(0,o.jsx)(u,{plugin:e})]})})};var P,b;v.propTypes={},(0,c.addFilter)("password_reset_enforcement__promoted_plugins_panel","teydeastudio/password-reset-enforcement/settings-page",(()=>(0,o.jsx)(i,{plugins:[{url:"https://teydeastudio.com/products/password-policy-and-complexity-requirements/?utm_source=Password+Reset+Enforcement&utm_medium=Plugin&utm_campaign=Plugin+cross-reference&utm_content=Settings+sidebar",name:(0,n.__)("Password Policy & Complexity Requirements","password-reset-enforcement"),description:(0,n.__)("Set up the password policy and complexity requirements for the users of your WordPress website.","password-reset-enforcement")}]}))),P=(0,o.jsx)(v,{}),b=document.querySelector("div#password-reset-enforcement-settings-page"),(0,a.createRoot)(b).render(P)})()})();