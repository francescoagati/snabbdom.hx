package snabbdom.engine.dom;

import snabbdom.engine.dom.PatchDom.*;
import snabbdom.Is.*;
import snabbdom.engine.dom.plugins.*;
import snabbdom.PatchHelper.*;
using snabbdom.VirtualNodeDataTools;

class Hooks {
   inline public static function create(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) {

     var elm:Dynamic = vnode.elm;
     var apply_hooks = if (vnode.data.___cache.contains(cacheAll) == false) {
       true;
     } else {
       if (elm.___cache == null) {
         elm.___cache = true;
         true;
       } else {
         if (elm.___cache == true) {
           false;
         } else {
           true;
         }
       }
     };

     cps({
       if (apply_hooks) {
         @await wait(0);
         Attributes.create(oldVnode, vnode);
         @await wait(0);
         Props.create(oldVnode,vnode);
         @await wait(0);
         CssClasses.create(oldVnode,vnode);
         @await wait(0);
         Styles.create(oldVnode,vnode);
         @await wait(0);
         Events.create(oldVnode,vnode);
         @await wait(0);
       }
     });
  }

   inline public static function update(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) {

     var elm:Dynamic = vnode.elm;
     var apply_hooks = if (vnode.data.___cache.contains(cacheAll) == false) {
       true;
     } else {
       if (elm.___cache == null) {
         elm.___cache = true;
         true;
       } else {
         if (elm.___cache == true) {
           false;
         } else {
           true;
         }
       }
     };


    cps({
      if (apply_hooks) {
        @await wait(0);
        Attributes.update(oldVnode, vnode);
        @await wait(0);
        Props.update(oldVnode,vnode);
        @await wait(0);
        CssClasses.update(oldVnode,vnode);
        @await wait(0);
        Styles.update(oldVnode,vnode);
        @await wait(0);
        Events.update(oldVnode,vnode);
        @await wait(0);
      }
    });
  }



  inline public static function destroy(vnode:VirtualNodeDom) {
      //Styles.destroy(vnode);
  }


  inline public static function remove(vnode,rm) {
    cps({
      @await wait(0);
      Styles.remove(vnode,rm);

    });

  }

}
