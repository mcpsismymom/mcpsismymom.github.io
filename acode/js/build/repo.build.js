"use strict";(self.webpackChunkcom_foxdebug_acode=self.webpackChunkcom_foxdebug_acode||[]).push([[150],{12603:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var r=n(7449),a=n(49673),i=n.n(a),s=n(89184),c=n.n(s),o=n(30011),l=n(87771),u=n(71530),d=n(23324),p=n(65586),f=n(57543),h=n(93101),g=n(64413),m=n(38972);function v(e,t){var a,s,v=(0,m.Z)("more_vert","toggle-menu"),b=c().parse("<div class='main' id='repo-tree'>\r\n  <div class='navigation'></div>\r\n</div>"),k=b.querySelector(".navigation"),x=f.Z.GitHub().getRepo(e,t),Z=c()("span",{className:"icon search",attr:{action:"search"}}),y={"/":{name:"/",sha:"/",list:[]}},w={list:[],name:"",sha:"",scroll:0},S=[],F={id:"from",placeholder:strings["use branch"],hints:function(e){e(S.slice(0,-1))},type:"text"},L={id:"branch",placeholder:strings["new branch"],type:"text",match:/^[a-z\-_0-9]+$/i},z=[],B=(0,h.Z)(o.Z.render("<li action='info'>\r\n  <span class='text'>{{info}}</span>\r\n  <span class='icon info'></span>\r\n</li>",strings),{toggle:v,top:"8px",right:"8px",transformOrigin:"top right"});function D(){p.Z.loader.create(t,strings.loading+"..."),x.getSha(s,"").then((function(e){var n=U(e.data);a=(0,u.Z)(t+" (".concat(s,")"),{lead:c()("span",{className:"icon clearclose",attr:{action:"close"}})}),y["/"].list=n,N("/","/"),actionStack.setMark(),actionStack.push({id:"repo",action:a.hide}),a.onhide=function(){B.removeEventListener("click",_),a.removeEventListener("click",_),actionStack.clearFromMark(),actionStack.remove("repo")},B.addEventListener("click",_),a.addEventListener("click",_),a.append(b),a.querySelector("header").append(Z,v),document.body.appendChild(a)})).catch((function(e){d.Z.error(e)})).finally((function(){p.Z.loader.destroy()}))}function _(c){var o=c.target,u=o.getAttribute("action");u&&("info"===u&&B.hide(),function(c,o){var u=o.getAttribute("sha"),f=o.getAttribute("name");switch(c){case"close":a.hide();break;case"navigate":N(f,u);break;case"file":!function(){p.Z.loader.create(f,strings.loading+"...");var n=d.Z.extname(f),c=l.lookup(n),o=/image/i.test(c)?"blob":null;x.getBlob(u,"blob").then(function(){var n=(0,r.Z)(i().mark((function n(r){var c,l;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(c=r.data,o){n.next=28;break}if(!(c instanceof Blob)){n.next=19;break}if(n.prev=3,!c.text){n.next=10;break}return n.next=7,c.text();case 7:c=n.sent,n.next=13;break;case 10:return n.next=12,d.Z.blob2text(c);case 12:c=n.sent;case 13:n.next=19;break;case 15:n.prev=15,n.t0=n.catch(3),console.error(n.t0),p.Z.alert(strings.error,strings["unable to open file"]);case 19:l=gitRecord.add({sha:u,data:c,name:f,branch:s,repo:t,path:z.slice(1).join("/"),owner:e}),editorManager.addNewFile(f,{type:"git",record:l,text:c,isUnsaved:!1}),a.hide(),window.freeze=!1,actionStack.pop(),actionStack.pop(),window.freeze=!0,n.next=29;break;case 28:"blob"===o?p.Z.box(f,"<img src='".concat(URL.createObjectURL(c),"'>")):alert(strings.error.toUpperCase(),strings["file not supported"]);case 29:case"end":return n.stop()}}),n,null,[[3,15]])})));return function(e){return n.apply(this,arguments)}}()).finally((function(){p.Z.loader.destroy()}))}();break;case"info":n.e(996).then(n.bind(n,5798)).then((function(n){n.default(t,e)}));break;case"search":(0,g.Z)(b.get(".list"))}}(u,o))}function C(e){var t=e.list,n=e.scroll,r=void 0===n?0:n,a=b.get(".list");a&&a.remove();var i=c().parse(o.Z.render('<div class="list" id="repo-list" empty-message="{{msg}}">{{#list}}{{#.}}\r\n  <div class="list-item" sha="{{sha}}" name="{{name}}"\r\n    action="{{#isDirectory}}navigate{{/isDirectory}}{{#isFile}}file{{/isFile}}">\r\n    <span class="icon {{icon}}"></span>\r\n    <span class="container">\r\n      <div class="text">\r\n        <span>{{name}}</span>\r\n      </div>\r\n      {{#isFile}}\r\n      <small class="value">{{size}}</small>\r\n      {{/isFile}}\r\n    </span>\r\n  </div>\r\n  {{/.}}{{/list}}\r\n</div>',{msg:strings["empty folder message"],list:t}));b.append(i),i.scrollTop=r}function N(e,t){return A.apply(this,arguments)}function A(){return(A=(0,r.Z)(i().mark((function e(t,n){var r,a,s,o,l,u,d,p,f,h;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r=k.get('[sha="'.concat(n,'"]')))){e.next=13;break}for(s=null;(a=k.lastChild)!==r;)o=a.getAttribute("sha"),actionStack.remove(o),a.remove(),z.pop(),s&&s in y&&delete y[s],s=o;return e.next=6,E(t,n);case 6:if(!(l=e.sent)){e.next=11;break}return C(l),w=l,e.abrupt("return");case 11:return C({list:[],scroll:0}),e.abrupt("return");case 13:return e.next=15,E(t,n);case 15:(u=e.sent)&&((d=b.get(".list"))&&(w.scroll=d.scrollTop),z.push(t),k.append(c()("span",{className:"nav",attr:{sha:n,action:"navigate",text:t,name:t}})),k.scrollLeft=k.scrollWidth,f=(p=w).sha,h=p.name,f&&h&&actionStack.push({id:n,action:function(){N(h,f)}}),C(u),y[n]=u,w=u);case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(e,t){return R.apply(this,arguments)}function R(){return(R=(0,r.Z)(i().mark((function e(n,r){var a,s,c;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r in y)){e.next=2;break}return e.abrupt("return",y[r]);case 2:return a=null,p.Z.loader.create(t,strings.loading+"..."),e.prev=4,e.next=7,x.getTree(r);case 7:s=e.sent,c=U(c=s.data.tree),a={list:c,name:n,sha:r,scroll:0},e.next=16;break;case 13:e.prev=13,e.t0=e.catch(4),M(e.t0);case 16:return p.Z.loader.destroy(),e.abrupt("return",a);case 18:case"end":return e.stop()}}),e,null,[[4,13]])})))).apply(this,arguments)}function U(e){return e.map((function(e){var t=e.size,n=e.type;e.size=(t/1024).toFixed(2)+"KB",!e.name&&e.path&&(e.name=e.path),e.isDirectory="dir"===n||"tree"===n,e.isFile=!e.isDirectory,e.type=e.isDirectory?"folder":d.Z.getIconForFile(e.name)})),d.Z.sortDir(e,{showHiddenFiles:"on",sortByName:"on"})}function M(e){console.error(e),actionStack.pop(),p.Z.alert(strings.error,e.toString())}p.Z.loader.create(t,strings.loading+"..."),x.listBranches().then((function(e){return p.Z.loader.destroy(),e.data.map((function(e){return S.push(e.name)})),S.push(["add",strings["new branch"],"add"]),p.Z.select(strings["select branch"],S)})).then((function(e){"add"===e?p.Z.multiPrompt(strings["create new branch"],[F,L]).then((function(e){var t=e.from;return s=e.branch,p.Z.loader.create("",strings.loading+"..."),x.createBranch(t,s)})).then(D).catch((function(e){d.Z.error(e)})).finally((function(){p.Z.loader.destroy()})):(s=e,D())})).catch((function(e){d.Z.error(e),p.Z.loader.destroy()}))}}}]);