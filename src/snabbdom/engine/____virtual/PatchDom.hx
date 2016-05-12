package snabbdom.engine.virtual;
import snabbdom.engine.virtual.VirtualNodesDom as Vnodes;
import snabbdom.engine.virtual.VirtualNodeDom as Vnode;
import snabbdom.engine.virtual.NativeNode;
import snabbdom.engine.virtual.PatchDom.*;
import snabbdom.Is.*;
import snabbdom.engine.virtual.Hooks;
using snabbdom.VirtualNodeDataTools;
using snabbdom.VirtualNodeTools;
using StringTools;
using thx.Strings;
using snabbdom.engine.virtual.PatchDom.MyString;

class MyString {
  public static inline function slice(s:String,start:Dynamic,len:Dynamic)
    return s.substring(start,len);
}

@:build(ClassicFor.build())
@:partials(snabbdom.PatchTraits)
class PatchDom implements partials.Partial {



}
