"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

define("ace/ext/linking", ["require", "exports", "module", "ace/editor", "ace/config"], function (require, exports, module) {
  var Editor = require("../editor").Editor;

  require("../config").defineOptions(Editor.prototype, "editor", {
    enableLinking: {
      set: function set(val) {
        if (val) {
          this.on("click", onClick);
          this.on("mousemove", onMouseMove);
        } else {
          this.off("click", onClick);
          this.off("mousemove", onMouseMove);
        }
      },
      value: false
    }
  });

  exports.previousLinkingHover = false;

  function onMouseMove(e) {
    var editor = e.editor;
    var ctrl = e.getAccelKey();

    if (ctrl) {
      var editor = e.editor;
      var docPos = e.getDocumentPosition();
      var session = editor.session;
      var token = session.getTokenAt(docPos.row, docPos.column);

      if (exports.previousLinkingHover && exports.previousLinkingHover != token) {
        editor._emit("linkHoverOut");
      }

      editor._emit("linkHover", {
        position: docPos,
        token: token
      });

      exports.previousLinkingHover = token;
    } else if (exports.previousLinkingHover) {
      editor._emit("linkHoverOut");

      exports.previousLinkingHover = false;
    }
  }

  function onClick(e) {
    var ctrl = e.getAccelKey();
    var button = e.getButton();

    if (button == 0 && ctrl) {
      var editor = e.editor;
      var docPos = e.getDocumentPosition();
      var session = editor.session;
      var token = session.getTokenAt(docPos.row, docPos.column);

      editor._emit("linkClick", {
        position: docPos,
        token: token
      });
    }
  }
});

(function () {
  window.require(["ace/ext/linking"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();