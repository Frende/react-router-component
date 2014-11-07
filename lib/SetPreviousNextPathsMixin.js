"use strict";

var SetPreviousNextPathsMixin = {
    setPreviousAndNext: function() {
      if (typeof this.props.setPreviousNext === "undefined" || !this.props.setPreviousNext) {
        return
      }

      if (typeof this.state.match.route === "undefined" || this.state.match.route == null) {
        return
      }

      var currentPath = this.state.match.route.path
      var previousHandler = {}
      var currentHandler
      var nextHandler
      for (var i = 0; i < this.props.children.length; i++) {
          var currentHandler = this.props.children[i]
          if (currentHandler.path !== currentPath) {
              continue
          }

          if (typeof this.props.children[i-1] !== "undefined") {
              this.state.handler.props["previousPath"] = this.cleanPath(this.props.children[i-1].path)
          }

          this.state.handler.props["currentPath"] = this.cleanPath(this.props.children[i].path)

          if (typeof this.props.children[i+1] !== "undefined") {
              this.state.handler.props["nextPath"] = this.cleanPath(this.props.children[i+1].path)
          }
          return
      }
    },

    cleanPath: function(path) {
        if (path === null) {
            return undefined
        }
        if (path.indexOf("(/?*)") == -1) {
            return path
        }
        return path.split("(/?*)")[0]
    },

    getFirstPath: function() {
      for (var i = 0; i < this.props.children.length; i++) {
          var currentHandler = this.props.children[i]
          if (typeof currentHandler.path === "undefined" || currentHandler.path == null) {
              continue
          }
          return currentHandler.path
      }
    },

    getLastPath: function() {
      for (var i = this.props.children.length - 1; i >= 0; i--) {
          var currentHandler = this.props.children[i]
          if (typeof currentHandler.path === "undefined" || currentHandler.path == null) {
              continue
          }
          return currentHandler.path
      }
    }
};


module.exports = SetPreviousNextPathsMixin;