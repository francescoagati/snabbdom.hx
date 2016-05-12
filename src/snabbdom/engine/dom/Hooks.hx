package snabbdom.engine.dom;

import snabbdom.engine.dom.PatchDom.*;
import snabbdom.Is.*;
using snabbdom.VirtualNodeDataTools;

import snabbdom.engine.dom.plugins.*;

class Hooks {
   inline public static function create(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) {
    Attributes.create(oldVnode, vnode);
    Props.create(oldVnode,vnode);
    CssClasses.create(oldVnode,vnode);
    Styles.create(oldVnode,vnode);
    Events.create(oldVnode,vnode);
  }

   inline public static function update(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) {
    Attributes.update(oldVnode, vnode);
    Props.update(oldVnode,vnode);
    CssClasses.update(oldVnode,vnode);
    Styles.update(oldVnode,vnode);
    Events.update(oldVnode,vnode);
  }



  inline public static function destroy(vnode:VirtualNodeDom) {
      //Styles.destroy(vnode);
  }


  inline public static function remove(vnode,rm) {
    Styles.remove(vnode,rm);
  }

}
