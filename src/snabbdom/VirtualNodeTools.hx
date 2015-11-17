package snabbdom;

class VirtualNodeTools {

  public inline static function to_virtual_node(sel:String) {

    // Parse selector
    var hashIdx = untyped sel.indexOf('#',0);
    var dotIdx = untyped sel.indexOf('.', hashIdx);
    var hash = hashIdx > 0 ? hashIdx : untyped sel.length;
    var dot = dotIdx > 0 ? dotIdx : untyped sel.length;
    var tag = hashIdx != -1 || dotIdx != -1 ? untyped sel.slice(0, Math.min(hash, dot)) : sel;
    elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? untyped document.createElementNS(i, tag)
                                                        : untyped document.createElement(tag);
    if (hash < dot) elm.id = untyped sel.slice(hash + 1, dot);
    
  }

  
}