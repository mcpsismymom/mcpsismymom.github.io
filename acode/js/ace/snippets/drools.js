"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

define("ace/snippets/drools", ["require", "exports", "module"], function (require, exports, module) {
  "use strict";

  exports.snippetText = "\n\
snippet rule\n\
	rule \"${1?:rule_name}\"\n\
	when\n\
		${2:// when...} \n\
	then\n\
		${3:// then...}\n\
	end\n\
\n\
snippet query\n\
	query ${1?:query_name}\n\
		${2:// find} \n\
	end\n\
	\n\
snippet declare\n\
	declare ${1?:type_name}\n\
		${2:// attributes} \n\
	end\n\
\n\
";
  exports.scope = "drools";
});

(function () {
  window.require(["ace/snippets/drools"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();