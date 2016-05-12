package snabbdom.engine.virtual;
import snabbdom.engine.virtual.Obj;

class NativeWrapper {

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
