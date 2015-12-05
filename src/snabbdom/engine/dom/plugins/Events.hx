package snabbdom.engine.dom.plugins;

import js.Browser.alert;
import snabbdom.engine.dom.PatchDom.*;
import snabbdom.Is.*;
using snabbdom.VirtualNodeDataTools;

class Events {



  static inline function arrInvoker(arr:Dynamic) {
    return function(ev) {
      // Special case when length is two, for performance
      untyped {
        arr.length == 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
      };
    };
  }



  static inline function fnInvoker(o:Dynamic) {
    return function(ev) { o.fn(ev); };
  }



  inline static function updateEventListeners(oldVnode:VirtualNodeDom, vnode:VirtualNodeDom) {
    var name, cur, old, elm = vnode.elm,
        oldOn = oldVnode.data.get_events_or_empty(),
        on = vnode.data.get_events_or_empty();


    alert(oldVnode);
    if (on != null) {
      for (name in on.keys()) {
        js.Browser.alert(name);
        cur = on[name];
        old = oldOn[name];

        if (old == null) {
          if (Is.is_array(cur)) {

            elm.addEventListener(name, arrInvoker(cur));
          } else {

            cur = {fn: cur};
            on[name] = cur;
            elm.addEventListener(name, fnInvoker(cur));
          }
        } else if (Is.is_array(old)) {
          // Deliberately modify old array since it's captured in closure created with `arrInvoker`
          var o:Array<Dynamic> = untyped old;
          untyped o.length = (cur:Array<Dynamic>).length;
          for (el in o) old[el] = cur[el];
          //for (var i = 0; i < old.length; ++i) old[i] = cur[i];
          on[name]  = old;
        } else {
          old.fn = cur;
          on[name] = old;
        }
      }



    }
  }



   inline public static function create(oldVnode,vnode) updateEventListeners(oldVnode,vnode);
   inline public static function update(oldVnode,vnode) updateEventListeners(oldVnode,vnode);

}


/*
var is = require('../is');

function arrInvoker(arr) {
  return function() {
    // Special case when length is two, for performance
    arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
  };
}




module.exports = {create: updateEventListeners, update: updateEventListeners};
*/
