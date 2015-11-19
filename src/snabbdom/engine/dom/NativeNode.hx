package snabbdom.engine.dom;

abstract NativeNode(js.html.Element) from js.html.Element to js.html.Element {
  public inline function new(el) this = el;

   public var id(get, set):String;
   public var parentElm(get, never):NativeNode;
   public var textContent(get, set):String;
   public var nextSibling(get, never):NativeNode;

   public inline function get_id() return this.id;
   public inline function set_id(value) return this.id = value;

   public inline function get_parentElm() return new NativeNode(this.parentElement);
   public inline function get_nextSibling() return new NativeNode(untyped this.nextSibling);
   //public inline function set_parentElm(node) return this.parentElement = node;

   public inline function get_textContent() return this.textContent;
   public inline function set_textContent(value) return this.textContent = value;


   public inline function appendChild(element) this.appendChild(element);
   public inline function removeAttribute(attr) this.removeAttribute(attr);
   public inline function setAttribute(key,value) this.setAttribute(key,value);
   public inline function insertBefore(new_node,ref_node) this.insertBefore(new_node,ref_node);
   public inline function removeChild(element)  this.removeChild(element);

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
