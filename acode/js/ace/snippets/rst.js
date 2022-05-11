"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

define("ace/snippets/rst", ["require", "exports", "module"], function (require, exports, module) {
  "use strict";

  exports.snippetText = "# rst\n\
\n\
snippet :\n\
	:${1:field name}: ${2:field body}\n\
snippet *\n\
	*${1:Emphasis}*\n\
snippet **\n\
	**${1:Strong emphasis}**\n\
snippet _\n\
	\\`${1:hyperlink-name}\\`_\n\
	.. _\\`$1\\`: ${2:link-block}\n\
snippet =\n\
	${1:Title}\n\
	=====${2:=}\n\
	${3}\n\
snippet -\n\
	${1:Title}\n\
	-----${2:-}\n\
	${3}\n\
snippet cont:\n\
	.. contents::\n\
	\n\
";
  exports.scope = "rst";
});

(function () {
  window.require(["ace/snippets/rst"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();