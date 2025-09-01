import"./index.DtoOFyvK.js";var l={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x;function v(){if(x)return n;x=1;var a=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function s(c,e,t){var u=null;if(t!==void 0&&(u=""+t),e.key!==void 0&&(u=""+e.key),"key"in e){t={};for(var _ in e)_!=="key"&&(t[_]=e[_])}else t=e;return e=t.ref,{$$typeof:a,type:c,key:u,ref:e!==void 0?e:null,props:t}}return n.Fragment=r,n.jsx=s,n.jsxs=s,n}var d;function h(){return d||(d=1,l.exports=v()),l.exports}var o=h();const m="_headerContainer_1uv49_1",R="_home_1uv49_49 _button_1uv49_19",p="_settings_1uv49_54 _button_1uv49_19",j="_title_1uv49_59",i={headerContainer:m,home:R,settings:p,title:j};function f({title:a,settingsClick:r}){const s=()=>{window.location.href="/"};return o.jsxs("header",{className:i.headerContainer,children:[r&&o.jsx("button",{className:i.home,onClick:s,children:"Home"}),o.jsx("span",{className:i.title,children:a}),r&&o.jsx("button",{className:i.settings,onClick:r,"aria-label":"Settings"})]})}export{f as H,o as j};
