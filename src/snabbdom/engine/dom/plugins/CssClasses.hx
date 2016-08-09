package snabbdom.engine.dom.plugins;

import snabbdom.engine.dom.PatchDom.*;
import snabbdom.Is.*;
import snabbdom.engine.dom.plugins.Helpers.next_frame;
using snabbdom.VirtualNodeDataTools;

class CssClasses {

  inline static function updateClass(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) {
    var cur, name, elm:js.html.Element = vnode.elm,
        oldClass = oldVnode.data.get_classes_or_empty(),
        klass = vnode.data.get_classes_or_empty();

    if (vnode.data.skip_attributes == false) {
      for (name in klass.keys()) {
        cur = klass[name];
        if (cur != oldClass[name]) {
          if (cur == 'add') next_frame(elm.classList.add(name));
          else if (cur == 'remove') next_frame(elm.classList.remove(name));

        }
      }

    }
  }

  inline public static function create(oldVnode,vnode) updateClass(oldVnode,vnode);
  inline public static function update(oldVnode,vnode) updateClass(oldVnode,vnode);

}
