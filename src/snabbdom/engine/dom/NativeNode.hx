package snabbdom.engine.dom;
import snabbdom.engine.dom.plugins.Helpers.*;
import snabbdom.PatchHelper.*;

class DomPool {

  static var nodes_div = (function() {
    return [ for (i in (0...20)) js.Browser.document.createElement('div') ];
  })();

  static var nodes_li = (function() {
    return [ for (i in (0...20)) js.Browser.document.createElement('li') ];
  })();

  static var nodes_span = (function() {
    return [ for (i in (0...20)) js.Browser.document.createElement('span') ];
  })();


  static inline function check_nodes(nodes:Array<js.html.Element>,node_name:String) {
    if (nodes.length == 0) nodes.push(js.Browser.document.createElement(node_name));
    return nodes.shift();
  }

  public static inline function get_div() return check_nodes(nodes_div,'div');
  public static inline function get_li() return check_nodes(nodes_li,'li');
  public static inline function get_span() return check_nodes(nodes_span,'span');

  public static inline function dispose(element:js.html.Element) {

      cps({
        @await wait(0);
        element.textContent = "";
        switch(element.nodeName) {
          case 'LI':nodes_li.unshift(element);
          case 'DIV':nodes_div.unshift(element);
          case 'SPAN':nodes_span.unshift(element);
          case _:null;
        }

      });


  }


}

abstract NativeNode(js.html.Element) from js.html.Element to js.html.Element {

  public static inline function createElement(tag) {
    //return js.Browser.document.createElement(tag);
    return switch(tag) {
      case 'div':DomPool.get_div();
      case 'li':DomPool.get_li();
      case 'span':DomPool.get_span();
      case _:js.Browser.document.createElement(tag);
    }
    //return js.Browser.document.createElement(tag);
  }

  public static inline function createTextElement(text) {
    return  js.Browser.document.createTextNode(text);
  }

  public static inline function createElementNS(ns,element) {
    return js.Browser.document.createElementNS(ns,element);
  }

  @:from
  public static inline function fromNode(nd:js.html.Node)
    return new NativeNode(untyped nd);

   public inline function new(el) this = el;

   public var id(get, set):String;
   public var parentElm(get, never):NativeNode;
   public var parentElement(get, never):NativeNode;
   public var textContent(get, set):String;
   public var nextSibling(get, never):NativeNode;

   public inline function get_id() return this.id;
   public inline function set_id(value) return this.id = value;

   public inline function get_parentElement() return new NativeNode(this.parentElement);
   public inline function get_parentElm() return new NativeNode(this.parentElement);
   public inline function get_nextSibling() return new NativeNode(untyped this.nextSibling);
   //public inline function set_parentElm(node) return this.parentElement = node;

   public inline function get_textContent() return this.textContent;
   public inline function set_textContent(value) {
     next_frame(this.textContent = value);
     return value;
   }

   public inline function addEventListener(name:String,cb:Dynamic->Void) this.addEventListener(name,cb);

   public inline function appendChild(element) next_frame(this.appendChild(element));
   public inline function removeAttribute(attr) next_frame(this.removeAttribute(attr));
   public inline function setAttribute(key,value) next_frame(this.setAttribute(key,value));
   public inline function insertBefore(new_node,ref_node) next_frame(this.insertBefore(new_node,ref_node));
   public inline function removeChild(element)  {
     trace('remove-child');
     next_frame({
       this.removeChild(element);
       DomPool.dispose(untyped element);
     });
   }
   public inline function replaceChild(e1,e2)   next_frame(this.replaceChild(e1,e2));
/*
  rc/snabbdom/PatchTraits.hx:83: characters 22-28 : Null<{ }> has no field id
  src/snabbdom/engine/dom/PatchDom.hx:14: lines 14-18 : Defined in this class
  src/snabbdom/PatchTraits.hx:92: characters 10-25 : Null<{ }> has no field appendChild
  src/snabbdom/PatchTraits.hx:96: characters 8-23 : Null<{ }> has no field appendChild
  src/snabbdom/engine/dom/plugins/Attributes.hx:42: characters 10-29 : Null<{ }> has no field removeAttribute
  src/snabbdom/engine/dom/plugins/Attributes.hx:44: characters 10-26 : Null<{ }> has no field setAttribute
  src/snabbdom/PatchTraits.hx:246: characters 20-23 : { } has no field insertBefore
  src/snabbdom/PatchTraits.hx:246: characters 20-23 : For function argument 'parentElm'
  src/snabbdom/PatchTraits.hx:248: characters 23-26 : { } has no field removeChild
  src/snabbdom/PatchTraits.hx:251: characters 8-23 : Null<{ }> has no field textContent
  src/snabbdom/PatchTraits.hx:194: characters 52-79 : Null<{ }> has no field nextSibling
*/




}
