"use strict";(self.webpackChunkcom_foxdebug_acode=self.webpackChunkcom_foxdebug_acode||[]).push([[443],{32361:function(n,s,a){a.r(s),a.d(s,{default:function(){return v}});var t=a(64922),e=a(89184),c=a.n(e),i=a(30011),o=a(71530),l=a(75770),p=a(59661);function r(n,s){var a=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);s&&(t=t.filter((function(s){return Object.getOwnPropertyDescriptor(n,s).enumerable}))),a.push.apply(a,t)}return a}function d(n){for(var s=1;s<arguments.length;s++){var a=null!=arguments[s]?arguments[s]:{};s%2?r(Object(a),!0).forEach((function(s){(0,t.Z)(n,s,a[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(s){Object.defineProperty(n,s,Object.getOwnPropertyDescriptor(a,s))}))}return n}function v(){var n=(0,o.Z)(strings.about.capitalize());function s(s){var a=c().parse(i.Z.render("<div id='about-page' class='main scroll'>\n  <span class='logo' style='background-image: url(./res/logo/logo.png);'></span>\n  <div class='list'>\n    <span class='list-item'>\n      <span class='icon no-icon'></span>\n      <div class='container'>\n        <h2 class='text'>Acode editor {{version}}</h2>\n      </div>\n    </span>\n    {{#webview}}\n      <a\n        class='list-item no-transform'\n        href='https://play.google.com/store/apps/details?id={{packageName}}'\n      >\n        <span class='icon googlechrome'></span>\n        <div class='container'>\n          <span class='text'>Webview {{versionName}}</span>\n          <span class='value'>{{packageName}}</span>\n        </div>\n      </a>\n    {{/webview}}\n    <a class='list-item' href='https://acode.foxdebug.com'>\n      <span class='icon acode'></span>\n      <div class='container'>\n        <span class='text'>Official webpage</span>\n      </div>\n    </a>\n    <a\n      class='list-item'\n      href='https://telegram.me/joinchat/LbomMBLApFc6fvvdPQMm6w'\n    >\n      <span class='icon telegram'></span>\n      <div class='container'>\n        <span class='text'>Telegram</span>\n      </div>\n    </a>\n    <a class='list-item' href='mailto:{{PERSONAL_EMAIL}}'>\n      <span class='icon gmail'></span>\n      <div class='container'>\n        <span class='text'>Mail</span>\n      </div>\n    </a>\n    <a class='list-item' href='https://twitter.com/foxdebug'>\n      <span class='icon twitter'></span>\n      <div class='container'>\n        <span class='text'>Twitter</span>\n      </div>\n    </a>\n    <a class='list-item' href='https://www.instagram.com/foxdebug_com/'>\n      <span class='icon instagram'></span>\n      <div class='container'>\n        <span class='text'>Instagram</span>\n      </div>\n    </a>\n    <a class='list-item' href='https://github.com/deadlyjack/acode'>\n      <span class='icon github'></span>\n      <div class='container'>\n        <span class='text'>GitHub</span>\n      </div>\n    </a>\n    <a class='list-item' href='https://stackoverflow.com/users/9921464'>\n      <span class='icon stackoverflow'></span>\n      <div class='container'>\n        <span class='text'>Stackoverflow</span>\n      </div>\n    </a>\n    <a\n      class='list-item'\n      href='https://www.youtube.com/channel/UCJuxHnNkBfpilsTyT-rsN2w'\n    >\n      <span class='icon youtube'></span>\n      <div class='container'>\n        <span class='text'>YouTube</span>\n      </div>\n    </a>\n    <a class='list-item' href='https://foxdebug.com'>\n      <span class='icon foxdebug'></span>\n      <div class='container'>\n        <span class='text'>foxdebug.com</span>\n      </div>\n    </a>\n    <a href='https://ace.c9.io' class='list-item'>\n      <span class='icon no-icon'></span>\n      <div class='container'><span class='text'>Ace Editor</span></div>\n    </a>\n    <a href='https://www.jacklmoore.com/autosize/' class='list-item'>\n      <span class='icon no-icon'></span>\n      <div class='container'><span class='text'>Autosize</span></div>\n    </a>\n    <a href='https://cordova.apache.org' class='list-item'>\n      <span class='icon no-icon'></span>\n      <div class='container'><span class='text'>Apache Cordova</span></div>\n    </a>\n    <a href='https://babeljs.io' class='list-item'>\n      <span class='icon no-icon'></span>\n      <div class='container'><span class='text'>Babel js</span></div>\n    </a>\n    <a href='https://webpack.js.org' class='list-item'>\n      <span class='icon no-icon'></span>\n      <div class='container'><span class='text'>Webpack</span></div>\n    </a>\n    <a href='https://github.com/janl/mustache.js/' class='list-item'>\n      <span class='icon no-icon'></span>\n      <div class='container'><span class='text'>Mustache.js</span></div>\n    </a>\n    <a href='https://github.com/markedjs/marked' class='list-item'>\n      <span class='icon no-icon'></span>\n      <div class='container'><span class='text'>Marked</span></div>\n    </a>\n  </div>\n\n  <div style='height: 30vh; width: 10vw'></div>\n</div>",d(d({},BuildInfo),{},{webview:s,PERSONAL_EMAIL:p.Z.PERSONAL_EMAIL})));actionStack.push({id:"about",action:n.hide}),a.onclick=function(n){var s=n.target;if(s instanceof HTMLElement){var a=s.getAttribute("action");a&&(n.preventDefault(),"rate-box"===a)&&(0,l.Z)()}},n.onhide=function(){actionStack.remove("about")},n.classList.add("about-us"),n.append(a)}system.getWebviewInfo((function(n){return s(n)}),(function(n){return s()})),document.body.append(n)}}}]);