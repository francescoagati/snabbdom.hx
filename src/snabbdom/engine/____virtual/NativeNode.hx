package snabbdom.engine.virtual;
using Reflect;

abstract NativeNode(Obj)  from Obj to Obj {
  public inline function new(el:Obj) this = el;

   public var id(get, set):String;
   public var parentElm(get, never):NativeNode;
   public var textContent(get, set):String;
   public var nextSibling(get, never):NativeNode;

   public inline function get_id() return this.getProperty('id');
   public inline function set_id(value) {
     this.setProperty('id',value);
      return null;
   }
   public inline function get_parentElm() return new NativeNode(this.parent);
   public inline function get_nextSibling() {
     var children = this.parent.children;
     var i = children.indexOf(this);
     return children[i+1];
   }
   //public inline function set_parentElm(node) return this.parentElement = node;

   public inline function get_textContent() return this.content;
   public inline function set_textContent(value) return this.content = value;

   public inline function addEventListener(name:String,cb:Dynamic->Void) null;

   public inline function appendChild(element) {
     trace("ciaone");
     this.children.push(element);
     element.parent = this;
   }
   public inline function removeAttribute(attr) this.setProperty(attr,null);
   public inline function setAttribute(key,value) this.setProperty(key,value);
   public inline function insertBefore(new_node:NativeNode,ref_node:NativeNode) {
     trace(2);
     var i = this.children.indexOf(ref_node);
     this.children.insert(i-1,new_node);
   }
   public inline function removeChild(element:NativeNode)  this.children.remove(element);

   public static inline function createElement(tag:String):NativeNode {
     return {
       type:tag,
       content:null,
       children:[],
       parent:null,
       id:null,
       element:null
     };
     //var node = Xml.createElement(tag);
     //return new NativeNode(node);
   }

   public static inline function createTextElement(text:String):NativeNode {
     var node = NativeWrapper.createElement('text');
     node.set_textContent(text);
     return node;
     //var node:Xml =  Xml.createElement('div');
     //node.nodeValue = text;
     //return new NativeNode(node);
   }

   public static inline function createElementNS(ns,element:String):NativeNode {
     return NativeWrapper.createElement(element);
   }


}
