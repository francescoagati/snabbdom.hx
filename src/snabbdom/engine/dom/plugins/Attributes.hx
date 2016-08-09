package snabbdom.engine.dom.plugins;

import snabbdom.engine.dom.PatchDom.*;
import snabbdom.Is.*;
import snabbdom.engine.dom.plugins.Helpers.next_frame;
using snabbdom.VirtualNodeDataTools;

@:build(ClassicFor.build())
class Attributes {


  static var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare",
                  "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable",
                  "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple",
                  "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly",
                  "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate",
                  "truespeed", "typemustmatch", "visible"];

  static var booleanAttrsDict = (function() {
    var hash:DynamicObject<Dynamic> = {};
    var len = booleanAttrs.length;
    var i = 0;
    @for(i=0,  i < len, i++) {
      untyped hash[untyped booleanAttrs[i]] = true;
    }
    return hash;
  })();

   inline static function updateAttrs(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) {
    var key, cur, old, elm = vnode.elm,
        oldAttrs = oldVnode.data.get_attrs_or_empty(),
        attrs = vnode.data.get_attrs_or_empty();



    // update modified attributes, add new attributes
    for (key in attrs.keys()) {
      cur = attrs[key];
      old = oldAttrs[key];
      if (old != cur) {
        // TODO: add support to namespaced attributes (setAttributeNS)
        if(!cur && booleanAttrsDict[key])
          next_frame(elm.removeAttribute(key));
        else
          next_frame(elm.setAttribute(key, cur));
      }
    }
    //remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    for (key in oldAttrs.keys()) {
      if (!(attrs.exists(key))) {
        elm.removeAttribute(key);
      }
    }
  }


  inline public static function create(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) updateAttrs(oldVnode, vnode);
  inline  public static function update(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) updateAttrs(oldVnode, vnode);

  //module.exports = {create: updateAttrs, update: updateAttrs};



}
