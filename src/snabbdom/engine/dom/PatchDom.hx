package snabbdom.engine.dom;
import snabbdom.engine.dom.VirtualNodesDom as Vnodes;
import snabbdom.engine.dom.VirtualNodeDom as Vnode;
import snabbdom.engine.dom.NativeNode;
import snabbdom.engine.dom.PatchDom.*;
import snabbdom.Is.*;
import snabbdom.PatchHelper.*;
import snabbdom.engine.dom.plugins.Hooks;
import snabbdom.engine.dom.CacheDom;
using snabbdom.VirtualNodeDataTools;



//@:partials(snabbdom.PatchTraits)
@:build(com.dongxiguo.continuation.Continuation.cpsByMeta(":async"))
@:build(ClassicFor.build())
class PatchDom {


    inline static function vnode(sel:Dynamic, data:Dynamic, children, ?text, ?elm:Dynamic):Vnode {
    var key = data == null ? null : data.key;
    return {sel: sel, data: data, children: children,
            text: text, elm: elm};
    }


    inline static function emptyNodeAt(elm) {
      return vnode(elm.tagName, {}, [], null, elm);
    }

    static var emptyNode = vnode('', {}, [], null, null);

     inline static function sameVnode(vnode1:Vnode, vnode2:Vnode) {
      return vnode1.data.key == vnode2.data.key && vnode1.sel == vnode2.sel;
    }

     inline static function createKeyToOldIdx(children:Vnodes, beginIdx, endIdx) {
      var i, map:haxe.DynamicAccess<Dynamic> = {}, key;
      @for(i = beginIdx, i <= endIdx, ++i) {
        key = children[i].data.key;
        if (isDef(key))  map[key] = i;
      }
      return map;
    }

     inline static function createRmCb(childElm:NativeNode, listeners) {
      return function() {
        if (--listeners == 0) childElm.parentElement.removeChild(childElm);
      };
    }


     inline static function createElm(vnode:Vnode, insertedVnodeQueue:Vnodes) {
      var i:Dynamic, data:Dynamic = vnode.data;
      //if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
        if (isDef(i = data.vnode)) vnode = i;
      //}
      var elm, children = vnode.children, sel = vnode.sel;
      if (isDef(sel)) {
        var tag = sel;
        elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? NativeNode.createElementNS(i, tag)
                                                            : NativeNode.createElement(tag);
        if (is_array(children)) {
          @for(i = 0,i < children.length, ++i) {
            var new_node = createElm(children[i], insertedVnodeQueue);
            elm.appendChild(new_node);
          }
        } else if (is_primitive( vnode.text)) {
          elm.appendChild(NativeNode.createTextElement(vnode.text));
        }

        Hooks.create(emptyNode,vnode);

        //if (vnode.data != null) {
          i = vnode.data.hook; // Reuse variable
          if (isDef(i)) {
            if (i.create) i.create(emptyNode, vnode);
            if (i.insert) insertedVnodeQueue.push(vnode);
          }

        //}
      } else {
        vnode.elm =  NativeNode.createTextElement(vnode.text);
      }
      return vnode.elm;
    }

     inline static function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      var i;
      var new_node;
      @for( i=0 , startIdx <= endIdx, ++startIdx) {
        new_node = createElm(vnodes[startIdx], insertedVnodeQueue);
        parentElm.insertBefore(new_node, before);
      }
    }


     inline static function invokeDestroyHook(vnode:Vnode) {
      var i:Dynamic = vnode.data, j;
      if (isDef(i)) {
        if (isDef(i = i.hook) && isDef(i = i.destroy)) i(vnode);
        //for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
        Hooks.destroy(vnode);
        if (isDef(i = vnode.children)) {
          @for(j = 0, j < vnode.children.length, ++j) {
            invokeDestroyHook(vnode.children[j]);
          }
        }
      }
    }


     inline static function removeVnodes(parentElm:NativeNode, vnodes:Vnodes, startIdx, endIdx) {
      var y;
      @for(y = 0,startIdx <= endIdx, ++startIdx) {
        var i:Dynamic, listeners, rm:Dynamic = null, ch:Dynamic = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.sel)) {
            invokeDestroyHook(ch);
            Hooks.remove(ch,rm);

            if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
              i(ch, rm);
            } else {
              trace('remove');
              if (rm != null) rm();
              parentElm.removeChild(ch.elm);
            }
          } else { // Text node
            parentElm.removeChild(ch.elm);
          }
        }
      }
    }



    static  function updateChildren(parentElm, oldCh:Vnodes, newCh:Vnodes, insertedVnodeQueue:Vnodes) {

          var oldStartIdx = 0;
          var newStartIdx = 0;
          var oldEndIdx = oldCh.length - 1;
          var oldStartVnode = oldCh[0];
          var oldEndVnode =  oldCh[oldEndIdx];
          var newEndIdx = newCh.length - 1;
          var newStartVnode = newCh[0];
          var newEndVnode =   newCh[newEndIdx];
          var oldKeyToIdx = null;
          var idxInOld = null;
          var elmToMove = null;
          var before = null;

         while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (isUndef(oldStartVnode)) {
              oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
            } else if (isUndef(oldEndVnode)) {
              oldEndVnode =  oldCh[--oldEndIdx];
            } else if (sameVnode(oldStartVnode, newStartVnode)) {
              patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
              oldStartVnode =  oldCh[++oldStartIdx];
              newStartVnode =  newCh[++newStartIdx];
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
              patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
              oldEndVnode =  oldCh[--oldEndIdx];
              newEndVnode =   newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
              patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
              parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
              oldStartVnode = oldCh[++oldStartIdx];
              newEndVnode =  newCh[--newEndIdx];
            } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
              patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
              parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
              oldEndVnode =  oldCh[--oldEndIdx];
              newStartVnode = newCh[++newStartIdx];
            } else {
              if (isUndef(oldKeyToIdx)) oldKeyToIdx = untyped createKeyToOldIdx(oldCh, oldStartIdx,  oldEndIdx);
              idxInOld = untyped oldKeyToIdx[newStartVnode.key];
              if (isUndef(idxInOld)) { // New element
                var new_node = createElm(newStartVnode, insertedVnodeQueue);
                parentElm.insertBefore( new_node, oldStartVnode.elm);
                newStartVnode = newCh[++newStartIdx];
              } else {
                elmToMove =  oldCh[idxInOld];
                patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                 oldCh[idxInOld] = null;
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
                newStartVnode = newCh[++newStartIdx];
              }
            }
         }

          if (oldStartIdx > oldEndIdx) {
            before = isUndef( newCh[newEndIdx+1]) ? null :  newCh[newEndIdx+1].elm;
            addVnodes( parentElm, before, newCh, newStartIdx,  newEndIdx, insertedVnodeQueue);
          } else if (newStartIdx > newEndIdx) {
            removeVnodes(untyped parentElm, oldCh, oldStartIdx,  oldEndIdx);
          }


      }


      static function patchVnode(oldVnode:Vnode, vnode:Vnode, insertedVnodeQueue:Vnodes) {

        var i:Dynamic = vnode.data;
        var hook = i.hook;

        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i =  hook.prepatch)) {
          i(oldVnode, vnode);
        }
        if (isDef(i = oldVnode.data) && isDef(i = i.vnode)) oldVnode = i;
        if (isDef(i = vnode.data) && isDef(i = i.vnode)) vnode = i;
        var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
        if (oldVnode == vnode) return;
        //if (isDef(vnode.data)) {
          Hooks.update(oldVnode,vnode);
          //@for(i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
          i = vnode.data.hook;
          if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
        //}
        if (isUndef( vnode.text)) {
          if (isDef(oldCh) && isDef(ch)) {
            if (oldCh != ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
          } else if (isDef(ch)) {
            addVnodes(elm, null, ch, 0,  ch.length - 1, insertedVnodeQueue);
          } else if (isDef(oldCh)) {
            removeVnodes(elm, oldCh, 0,   oldCh.length - 1);
          }
        } else if (oldVnode.text != vnode.text) {
          elm.textContent = vnode.text;
        }
        if (isDef(hook) && isDef(i =  hook.postpatch)) {
          i(oldVnode, vnode);
        }

      }

      public static function patchDom(oldVnode:NativeNode,vnode:Vnode) {

        var i = 0;
        var insertedVnodeQueue:Vnodes = [];
        if (untyped oldVnode.parentElement != null) {
          createElm(vnode, insertedVnodeQueue);
          oldVnode.parentElement.replaceChild(vnode.elm, oldVnode);
        } else {
          oldVnode = untyped  emptyNodeAt(untyped oldVnode);
            patchVnode(untyped oldVnode, vnode, insertedVnodeQueue);
        }

        cps({
          @await wait(0);
          @for(i = 0, i < insertedVnodeQueue.length,++i) {
            untyped insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
          }
        });

        return vnode;

      }


      public static function patch(oldVnode:Vnode, vnode:Vnode) {
        var i = 0;
        var insertedVnodeQueue:Vnodes = [];

        patchVnode(oldVnode, vnode, insertedVnodeQueue);

        cps({
          @await wait(0);
          @for(i = 0, i < insertedVnodeQueue.length,++i) {
            untyped insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
          }
        });

        return vnode;
      };

}
