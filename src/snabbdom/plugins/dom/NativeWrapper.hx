package snabbdom.plugins.dom;

class NativeWrapper {

  public static inline function createElement(tag) {
    return js.Browser.document.createElement(tag);
  }

  public static inline function createTextElement(text) {
    return js.Browser.document.createTextNode(text);
  }

  public static inline function createElementNS(ns,element) {
    return js.Browser.document.createElementNS(ns,element);
  }

}
