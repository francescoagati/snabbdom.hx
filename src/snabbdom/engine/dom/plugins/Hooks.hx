package snabbdom.engine.dom.plugins;

import snabbdom.engine.dom.PatchDom.*;
import snabbdom.Is.*;

import snabbdom.engine.dom.plugins.Events;
import snabbdom.PatchHelper.*;

using snabbdom.VirtualNodeDataTools;


class Hooks {
  public static function create(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) {
    cps({
    Styles.create(oldVnode,vnode);
    @await wait(0);
    Attributes.create(oldVnode, vnode);
    @await wait(0);
    Props.create(oldVnode,vnode);
    @await wait(0);
    CssClasses.create(oldVnode,vnode);
    @await wait(0);
    Events.create(oldVnode,vnode);
    });
  }

  public static function update(p_oldVnode:VirtualNodeDom, p_vnode:VirtualNodeDom) {

    var oldVnode = p_oldVnode;
    var vnode = p_vnode;

    cps({
    Styles.update(oldVnode,vnode);
    @await wait(0);
    Attributes.update(oldVnode, vnode);
    @await wait(0);
    Props.update(oldVnode,vnode);
    @await wait(0);
    CssClasses.update(oldVnode,vnode);
    @await wait(0);
    Events.update(oldVnode,vnode);
    });
  }



   public static function destroy(vnode) {
    cps({
      @await wait(0);
      Styles.destroy(vnode);
    });
  }


   public static function remove(vnode,rm) {
    cps({
      @await wait(0);
      Styles.remove(vnode,rm);
    });
  }

}
