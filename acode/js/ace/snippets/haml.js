"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

define("ace/snippets/haml", ["require", "exports", "module"], function (require, exports, module) {
  "use strict";

  exports.snippetText = "snippet t\n\
	%table\n\
		%tr\n\
			%th\n\
				${1:headers}\n\
		%tr\n\
			%td\n\
				${2:headers}\n\
snippet ul\n\
	%ul\n\
		%li\n\
			${1:item}\n\
		%li\n\
snippet =rp\n\
	= render :partial => '${1:partial}'\n\
snippet =rpl\n\
	= render :partial => '${1:partial}', :locals => {}\n\
snippet =rpc\n\
	= render :partial => '${1:partial}', :collection => @$1\n\
\n\
";
  exports.scope = "haml";
});

(function () {
  window.require(["ace/snippets/haml"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();