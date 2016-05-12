package snabbdom.engine.virtual.plugins;

import snabbdom.engine.virtual.PatchDom.*;
import snabbdom.Is.*;
using snabbdom.VirtualNodeDataTools;

@:build(ClassicFor.build())
class Attributes {

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
        //if(!cur && booleanAttrsDict[key])
        //  elm.removeAttribute(key);
        //else
        elm.setAttribute(key, cur);
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
