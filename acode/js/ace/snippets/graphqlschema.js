"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

define("ace/snippets/graphqlschema", ["require", "exports", "module"], function (require, exports, module) {
  "use strict";

  exports.snippetText = "# Type Snippet\n\
trigger type\n\
snippet type\n\
	type ${1:type_name} {\n\
		${2:type_siblings}\n\
	}\n\
\n\
# Input Snippet\n\
trigger input\n\
snippet input\n\
	input ${1:input_name} {\n\
		${2:input_siblings}\n\
	}\n\
\n\
# Interface Snippet\n\
trigger interface\n\
snippet interface\n\
	interface ${1:interface_name} {\n\
		${2:interface_siblings}\n\
	}\n\
\n\
# Interface Snippet\n\
trigger union\n\
snippet union\n\
	union ${1:union_name} = ${2:type} | ${3: type}\n\
\n\
# Enum Snippet\n\
trigger enum\n\
snippet enum\n\
	enum ${1:enum_name} {\n\
		${2:enum_siblings}\n\
	}\n\
";
  exports.scope = "graphqlschema";
});

(function () {
  window.require(["ace/snippets/graphqlschema"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();