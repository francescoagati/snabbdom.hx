package snabbdom.engine.virtual.plugins;

import snabbdom.engine.virtual.PatchDom.*;
import snabbdom.Is.*;
using snabbdom.VirtualNodeDataTools;

class Props {

   inline static function updateProps(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) {
    var key, cur, old, elm:DynamicObject<Dynamic> = untyped vnode.elm,
        oldProps = oldVnode.data.get_props_or_empty(),
        props = vnode.data.get_props_or_empty();
    for (key in props.keys()) {
      cur = props[key];
      old = oldProps[key];
      if (old != cur) {
        elm[key] = cur;
      }
    }
  }

   inline public static function create(oldVnode,vnode) updateProps(oldVnode,vnode);
   inline public static function update(oldVnode,vnode) updateProps(oldVnode,vnode);

}
