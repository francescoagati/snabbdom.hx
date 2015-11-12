import Main.*;

using thx.Arrays;
using VirtualNodeDataTools;
import Is.*;



@:build(ClassicFor.build())
class Styles {

  inline static function raf(fn) js.Browser.window.requestAnimationFrame(fn);

  inline static function nextFrame(fn) raf(function(i) { raf(fn); });

  inline static function setNextFrame(obj:DynamicObject<Dynamic>, prop:String, val:Dynamic) {
    nextFrame(function(i) { obj[prop] = val; });
  }

  inline static function updateStyle(oldVnode:VirtualNode, vnode:VirtualNode) {
    var cur, name, elm:Dynamic = vnode.elm;

    var oldStyle = oldVnode.data.get_style_or_empty();
    var style = vnode.data.get_style_or_empty();
    var oldHasDel = oldStyle.exists('delayed' );
    for (name in style.keys()) {
      cur = style[name];
      if (name == 'delayed') {
        var delayed:DynamicObject<Dynamic> = untyped style.delayed;
        var oldDelayed:DynamicObject<Dynamic> = untyped oldStyle.delayed;
        for (name in delayed.keys()) {
          cur = delayed[name];
          if (!oldHasDel || cur != oldDelayed[name]) {
            setNextFrame(elm.style, name, cur);
          }
        }
      } else if (name != 'remove' && cur != oldStyle[name]) {
        untyped elm.style[name] = cur;
      }
    }
  }

  inline static function applyDestroyStyle(vnode) {
    var style:DynamicObject<Dynamic> = null, name, elm = vnode.elm, s:Dynamic = vnode.data.style;
    if (s == null) return;
    style = untyped s.destroy;
    if ( style == null ) return;
    for (name in style.keys()) {
      untyped elm.style[name] = style[name];
    }
  }

  inline static function applyRemoveStyle(vnode, rm) {
    var s:Dynamic = vnode.data.style;
    if (!s || !s.remove) {
      rm();
      return;
    }
    var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
        compStyle:DynamicObject<String>, style:DynamicObject<Dynamic> = s.remove, amount = 0, applied = [];
    for (name in style.keys()) {
      applied.push(name);
      untyped elm.style[name] = style[name];
    }
    compStyle = untyped js.Browser.window.getComputedStyle(untyped elm);
    var props = compStyle['transition-property'].split(', ');
    var i ;
    @for(i = 0, i < props.length, ++i) {
      if(applied.indexOf(props[i]) != -1) amount++;
    }
    untyped elm.addEventListener('transitionend', function(ev) {
      if (ev.target == elm) --amount;
      if (amount == 0) rm();
    });
  }

inline public static function create(oldVnode:VirtualNode,vnode:VirtualNode) updateStyle(oldVnode,vnode);
inline public static function update(oldVnode,vnode) updateStyle(oldVnode,vnode);
inline public static function destroy(vnode) applyDestroyStyle(vnode);
inline public static function remove(vnode,rm) applyRemoveStyle(vnode,rm);


}


class CssClasses {

  inline static function updateClass(oldVnode:VirtualNode, vnode:VirtualNode) {
    var cur, name, elm:js.html.Element = vnode.elm,
        oldClass = oldVnode.data.get_classes_or_empty(),
        klass = vnode.data.get_classes_or_empty();


    for (name in klass.keys()) {
      cur = klass[name];
      if (cur != oldClass[name]) {
        if (cur == 'add') elm.classList.add(name);
        else if (cur == 'remove') elm.classList.remove(name);

      }
    }
  }

  inline public static function create(oldVnode,vnode) updateClass(oldVnode,vnode);
  inline public static function update(oldVnode,vnode) updateClass(oldVnode,vnode);

}


class Props {

   inline static function updateProps(oldVnode:VirtualNode, vnode:VirtualNode) {
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

   inline static function updateAttrs(oldVnode:VirtualNode, vnode:VirtualNode) {
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
          elm.removeAttribute(key);
        else
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


  inline public static function create(oldVnode:VirtualNode, vnode:VirtualNode) updateAttrs(oldVnode, vnode);
  inline  public static function update(oldVnode:VirtualNode, vnode:VirtualNode) updateAttrs(oldVnode, vnode);

  //module.exports = {create: updateAttrs, update: updateAttrs};



}


class Hooks {
   inline public static function create(oldVnode:VirtualNode, vnode:VirtualNode) {
    Attributes.create(oldVnode, vnode);
    Props.create(oldVnode,vnode);
    CssClasses.create(oldVnode,vnode);
    Styles.create(oldVnode,vnode);
  }

   inline public static function update(oldVnode:VirtualNode, vnode:VirtualNode) {
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








@:build(ClassicFor.build())
class Main {

  static var rg = untyped  __js__('new RegExp({0},"g")',"\\.");


  public static function main() {

    var vnode = untyped h('div#conta.two.classes', {on: {click: function() {}}}, [
      h('span', {style: {fontWeight: 'bold'}}, 'This is bold'),
      ' and this is just normal text',
      h('a', {props: {href: '/foo'}}, 'I\'ll take you places!')
    ]);

    var container = untyped js.Browser.document.getElementById('container');



    patch(untyped container,untyped vnode);

    var timer = new haxe.Timer(1000);

    var last_node = vnode;
    timer.run = function() {

      var rnd = Math.random();

      var color = ['red','green','yellow','gray'].shuffle()[0];
      var bg = ['red','green','yellow','gray'].shuffle()[0];


      var vnode2 = untyped h('div#conta.two.classes', {on: {click: function() {}}}, [
        h('span', {}, 'This is bold'),
        ' and this is just normal text 222',
        h('a', {}, 'I\'ll take you places1!'),
        h('span', {attrs:{pippa:123}}, 'I\'ll take you places2!'),
        h('a', {style:{'backgroundColor':bg,'color':color},classes:{'random':'add'},attrs:{random:rnd}}, 'I\'ll take you places$rnd!')
      ]);

      patch(last_node,untyped vnode2);
      last_node = vnode2;
    };
  }


   static function h(sel, b:Dynamic, c:Dynamic) {
    var data = {}, children:VirtualNodes= null, text = null, i;
    var arguments:Array<Dynamic> = untyped __js__('arguments');
    if (arguments.length == 3) {
      data = b;
      if (is_array(c)) { children = c; }
      else if (is_primitive(c)) { text = c; }
    } else if (arguments.length == 2) {
      if (is_array(b)) { children = b; }
      else if (is_primitive(b)) { text = b; }
      else { data = b; }
    }
    if (is_array(children)) {
      @for(i = 0, i < children.length, ++i) {
        if (is_primitive(children[i])) children[i] = untyped vnode(null, null, null, children[i]);
      }
    }
    return untyped vnode(sel, data, untyped children, text, undefined);
  }



  inline static function vnode(sel:Dynamic, data:Dynamic, children, ?text, ?elm:Dynamic):VirtualNode {
  var key = data == null ? null : data.key;
  return {sel: sel, data: data, children: children,
          text: text, elm: elm, key: key};
  }


   
  inline static function emptyNodeAt(elm) {
    return vnode(elm.tagName, {}, [], null, elm);
  }

  static var emptyNode = vnode('', {}, [], null, null);


   inline static function sameVnode(vnode1:VirtualNode, vnode2:VirtualNode) {
    return vnode1.key == vnode2.key && vnode1.sel == vnode2.sel;
  }

   inline static function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map:Dynamic = {}, key;
    @for(i = beginIdx, i <= endIdx, ++i) {
      key = children[i].key;
      if (isDef(key)) untyped map[key] = i;
    }
    return map;
  }

   inline static function createRmCb(childElm:Dynamic, listeners) {
    return function() {
      if (--listeners == 0) childElm.parentElement.removeChild(childElm);
    };
  }


   inline static function createElm(vnode:VirtualNode, insertedVnodeQueue:VirtualNodes) {
    var i:Dynamic, data:Dynamic = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
      if (isDef(i = data.vnode)) vnode = i;
    }
    var elm, children = vnode.children, sel = vnode.sel;
    if (isDef(sel)) {
      // Parse selector
      var hashIdx = untyped sel.indexOf('#',0);
      var dotIdx = untyped sel.indexOf('.', hashIdx);
      var hash = hashIdx > 0 ? hashIdx : untyped sel.length;
      var dot = dotIdx > 0 ? dotIdx : untyped sel.length;
      var tag = hashIdx != -1 || dotIdx != -1 ? untyped sel.slice(0, Math.min(hash, dot)) : sel;
      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? untyped document.createElementNS(i, tag)
                                                          : untyped document.createElement(tag);
      if (hash < dot) elm.id = untyped sel.slice(hash + 1, dot);
      //if (dotIdx > 0) elm.className = untyped sel.slice(dot+1,0).replace('.', ' ');
      //var s = "\\.";
      //var rg = untyped  __js__('new RegExp({0},"g")',s);

      if (dotIdx > 0)  untyped __js__('elm.className = sel.slice(dot+1).replace({0}, " ");',rg);
      if (is_array(children)) {
        @for(i = 0,i < children.length, ++i) {
          elm.appendChild(createElm(children[i], insertedVnodeQueue));
        }
      } else if (is_primitive(untyped vnode.text)) {

        elm.appendChild(untyped document.createTextNode(vnode.text));
      }

      Hooks.create(emptyNode,vnode);
      //for (i = 0, i < cbs.create.length, ++i) cbs.create[i](emptyNode, vnode);

      if (vnode.data != null) {
        i = vnode.data.hook; // Reuse variable
        if (isDef(i)) {
          if (i.create) i.create(emptyNode, vnode);
          if (i.insert) insertedVnodeQueue.push(vnode);
        }

      }
    } else {
      elm = vnode.elm = untyped  document.createTextNode(vnode.text);
    }
    return vnode.elm;
  }

   inline static function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    var i;
    @for( i=0 , startIdx <= endIdx, ++startIdx) {
      parentElm.insertBefore(createElm(vnodes[startIdx], insertedVnodeQueue), before);
    }
  }


   inline static function invokeDestroyHook(vnode:VirtualNode) {
    var i:Dynamic = vnode.data, j;
    if (isDef(i)) {
      if (isDef(i = i.hook) && isDef(i = i.destroy)) i(vnode);
      //for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
      Hooks.destroy(untyped vnode);
      if (isDef(i = vnode.children)) {
        @for(j = 0, j < vnode.children.length, ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }
  }


   inline static function removeVnodes(parentElm, vnodes:VirtualNodes, startIdx, endIdx) {
    var y;
    @for(y = 0,startIdx <= endIdx, ++startIdx) {
      var i:Dynamic, listeners, rm:Dynamic = null, ch:Dynamic = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          //listeners = cbs.remove.length + 1;
          //rm = createRmCb(ch.elm, listeners);
          //@for(i = 0, i < cbs.remove.length, ++i) cbs.remove[i](ch, rm);
          Hooks.remove(ch,rm);

          if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
            i(ch, rm);
          } else {
            rm();
          }
        } else { // Text node
          parentElm.removeChild(ch.elm);
        }
      }
    }
  }



  inline  static  function updateChildren(parentElm, oldCh:Dynamic, newCh:Dynamic, insertedVnodeQueue:VirtualNodes) {
      var oldStartIdx = 0, newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = untyped oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = untyped  newCh[newEndIdx];
      var oldKeyToIdx = null, idxInOld, elmToMove, before;

      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
        } else if (isUndef(oldEndVnode)) {
          oldEndVnode = untyped oldCh[--oldEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
          oldStartVnode = untyped oldCh[++oldStartIdx];
          newStartVnode = untyped newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
          oldEndVnode = untyped oldCh[--oldEndIdx];
          newEndVnode =  untyped newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
          parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = untyped newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
          parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = untyped oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (isUndef(oldKeyToIdx)) oldKeyToIdx =  createKeyToOldIdx(oldCh, oldStartIdx, untyped oldEndIdx);
          idxInOld =untyped  oldKeyToIdx[newStartVnode.key];
          if (isUndef(idxInOld)) { // New element
            parentElm.insertBefore(untyped createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            elmToMove = untyped oldCh[idxInOld];
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            untyped oldCh[idxInOld] = null;
            parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
      if (oldStartIdx > oldEndIdx) {
        before = isUndef(untyped newCh[newEndIdx+1]) ? null : untyped newCh[newEndIdx+1].elm;
        addVnodes(untyped parentElm, before, newCh, newStartIdx, untyped newEndIdx, insertedVnodeQueue);
      } else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, untyped oldEndIdx);
      }
    }


     inline static function patchVnode(oldVnode:VirtualNode, vnode:VirtualNode, insertedVnodeQueue:VirtualNodes) {
      var i:Dynamic, hook;
      if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = untyped hook.prepatch)) {
        i(oldVnode, vnode);
      }
      if (isDef(i = oldVnode.data) && isDef(i = i.vnode)) oldVnode = i;
      if (isDef(i = vnode.data) && isDef(i = i.vnode)) vnode = i;
      var elm = vnode.elm = oldVnode.elm, oldCh:Dynamic = oldVnode.children, ch:Dynamic = vnode.children;
      if (oldVnode == vnode) return;
      if (isDef(vnode.data)) {
        Hooks.update(oldVnode,vnode);
        //@for(i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
        i = vnode.data.hook;
        if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
      }
      if (isUndef(untyped vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh != ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
        } else if (isDef(ch)) {
          addVnodes(elm, null, ch, 0, untyped ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(elm, oldCh, 0, untyped  oldCh.length - 1);
        }
      } else if (oldVnode.text != vnode.text) {
        elm.textContent = vnode.text;
      }
      if (isDef(hook) && isDef(i = untyped hook.postpatch)) {
        i(oldVnode, vnode);
      }
    }


    static function patch(oldVnode:VirtualNode, vnode:VirtualNode) {
      var i;
      var insertedVnodeQueue = [];
      //@for(i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
      if (untyped __js__('oldVnode instanceof Element')) {
        if (untyped oldVnode.parentElement != null) {
          createElm(vnode, insertedVnodeQueue);
          untyped oldVnode.parentElement.replaceChild(vnode.elm, oldVnode);
        } else {
          oldVnode = untyped  emptyNodeAt(untyped oldVnode);
          patchVnode(oldVnode, vnode, insertedVnodeQueue);
        }
      } else {
        patchVnode(oldVnode, vnode, insertedVnodeQueue);
      }
      @for(i = 0, i < insertedVnodeQueue.length,++i) {
        insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
      }
      //for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
      return vnode;
    };




}
