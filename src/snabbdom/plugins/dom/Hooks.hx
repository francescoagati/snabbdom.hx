package snabbdom.plugins.dom;

import snabbdom.Patch.*;
import snabbdom.Is.*;
using snabbdom.VirtualNodeDataTools;

class Hooks {
   inline public static function create(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) {
    Attributes.create(oldVnode, vnode);
    Props.create(oldVnode,vnode);
    CssClasses.create(oldVnode,vnode);
    Styles.create(oldVnode,vnode);
  }

   inline public static function update(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) {
    Attributes.update(oldVnode, vnode);
    Props.update(oldVnode,vnode);
    CssClasses.update(oldVnode,vnode);
    Styles.update(oldVnode,vnode);
  }



  inline public static function destroy(vnode) {
      Styles.destroy(vnode);
  }


  inline public static function remove(vnode,rm) {
    Styles.remove(vnode,rm);
  }

}
