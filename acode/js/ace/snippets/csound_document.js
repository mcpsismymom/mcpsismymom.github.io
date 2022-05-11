"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

define("ace/snippets/csound_document", ["require", "exports", "module"], function (require, exports, module) {
  "use strict";

  exports.snippetText = "# <CsoundSynthesizer>\n\
snippet synth\n\
	<CsoundSynthesizer>\n\
	<CsInstruments>\n\
	${1}\n\
	</CsInstruments>\n\
	<CsScore>\n\
	e\n\
	</CsScore>\n\
	</CsoundSynthesizer>\n\
";
  exports.scope = "csound_document";
});

(function () {
  window.require(["ace/snippets/csound_document"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();