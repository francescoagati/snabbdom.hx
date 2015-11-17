package snabbdom.engine.dom.plugins;

class NativeWrapper {

  public static macro function createElement(tag) {
    return macro js.Browser.document.createElement($tag);
  }

  public static macro function createTextElement(text) {
    return macro js.Browser.document.createTextNode($text);
  }

  public static macro function createElementNS(ns,element) {
    return macro js.Browser.document.createElementNS($ns,$element);
  }

}
