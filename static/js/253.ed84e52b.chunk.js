"use strict";(self.webpackChunkmy_react_app=self.webpackChunkmy_react_app||[]).push([[253],{5774:function(e,i,t){t(2791),t(9434),t(6904),t(763);var n=t(184);i.Z=function(e){var i=e.img,t=e.index,l=e.size,r=e.temp,c=e.reversal,o=16*l,s=-(1+17*parseInt(t/5))*l,a=-(1+17*(t%5))*l;return(0,n.jsx)("div",{className:"tile",style:{width:o,height:o,opacity:r?.5:1,transform:"scaleX(".concat(c?-1:1,")")},children:(0,n.jsx)("img",{style:{top:s,left:a,width:90*l,height:130*l},src:"/img/tile/".concat(i,".png")})})}},9857:function(e,i,t){t(2791),t(9434),t(6904),t(763);var n=t(184);i.Z=function(e){var i,t,l,r,c,o=e.img,s=e.imgSize,a=e.tileSize,d=e.point,u=e.offset,h=e.size,f=e.temp,m=e.reversal,v=16/a.width,g=16/a.height,p=s.width*v,x=s.height*g,j=a.width*v,y=a.height*g,w=null!==(i=null===d||void 0===d?void 0:d.x)&&void 0!==i?i:0,z=null!==(t=null===d||void 0===d?void 0:d.y)&&void 0!==t?t:0,b=(null!==(l=null===h||void 0===h?void 0:h.width)&&void 0!==l?l:1)*j,_=(null!==(r=null===h||void 0===h?void 0:h.height)&&void 0!==r?r:1)*y,k=-w*j-u.x*v,C=-z*y-u.y*g,N=null!==(c=null===u||void 0===u?void 0:u.rotate)&&void 0!==c?c:0;return(0,n.jsx)("div",{className:"tile",style:{width:b,height:_,opacity:f?.5:1,transform:"scaleX(".concat(m?-1:1,") rotate(").concat(N,"deg)")},children:(0,n.jsx)("img",{style:{top:C,left:k,width:p,height:x},src:"/img/object/".concat(o,".png")})})}},253:function(e,i,t){t.r(i);var n=t(2791),l=t(9434),r=t(6904),c=(t(763),t(5774)),o=t(9857),s=t(6161),a=t(2917),d=t(184);i.default=function(){var e=(0,n.useRef)(null),i=(0,l.I0)(),t=(0,l.v9)((function(e){return e.MapList.selectedMap})),u=(0,l.v9)((function(e){return e.TilePallet.tiles})),h=(0,l.v9)((function(e){return e.TilePallet.objects})),f=(0,l.v9)((function(e){return e.TilePallet.selected})),m=(0,l.v9)((function(e){return e.MapList.selectedGridType}));return(0,d.jsxs)("div",{className:"tile_content",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("input",{ref:e,className:"input",type:"file",accept:"application/json",onChange:function(e){var t=e.target.files[0],n=new FileReader;n.onload=function(){i((0,s.FU)({map:n.result}))},n.readAsText(t,"utf-8")}}),(0,d.jsx)("button",{className:"tile_button",onClick:function(){return e&&e.current&&e.current.click()},children:"\ubd88\ub7ec\uc624\uae30"}),(0,d.jsx)("button",{className:"tile_button",onClick:function(){return(0,r.Qt)("export",t)},children:"\ub0b4\ubcf4\ub0b4\uae30"})]}),(0,d.jsx)("div",{className:"tile_grid",children:0===m?u&&u.map((function(e,t){return(0,d.jsx)("div",{className:"tile_tile",title:e.name||e.img,style:f&&f.id===e.id?{borderColor:"#f0e10c"}:{},onClick:function(){return i((0,a.a)({tile:e}))},children:"tile"===e.type?(0,d.jsx)(c.Z,{img:e.img,index:0,size:2}):(0,d.jsx)(o.Z,{img:e.img,imgSize:{width:32,height:32},tileSize:{width:16,height:16},offset:{x:0,y:0,rotate:e.rotate},point:{x:0,y:0},size:{width:2,height:2}})},t)})):[1,5,6].includes(m)?h&&h.map((function(e,t){return(0,d.jsx)("div",{className:"tile_tile",title:e.name||e.img,style:f&&f.id===e.id?{borderColor:"#f0e10c"}:{},onClick:function(){return i((0,a.a)({tile:e}))},children:(0,d.jsx)(o.Z,{img:e.img,imgSize:e.imgSize,tileSize:e.tileSize,offset:e.offset,size:e.size})},t)})):""})]})}}}]);
//# sourceMappingURL=253.ed84e52b.chunk.js.map