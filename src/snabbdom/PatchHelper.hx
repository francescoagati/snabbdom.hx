package snabbdom;
using StringTools;

class PatchHelper {

    public static macro function cps(expr:haxe.macro.Expr) {
      var uuid = thx.Uuid.create().replace('-','_');
      var dt = Std.string(Date.now().getTime()).replace(".","").replace("+","");
      var fn_name = 'tmp_${uuid}_${dt}';
      return macro com.dongxiguo.continuation.Continuation.cpsFunction(function $fn_name() {
        $expr;
      });
    }

    #if !macro
    public static inline function wait(ms:Int,cb:Void->Void) {
      js.Browser.window.setTimeout(function() {
        cb();
      },ms);
    }
    #end
}
