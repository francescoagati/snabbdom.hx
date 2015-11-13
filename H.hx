import haxe.macro.Expr;
using haxe.macro.ComplexTypeTools;
using haxe.macro.MacroStringTools;
using haxe.macro.ExprTools;
using Lambda;

class H {

  public macro static function h(exprs:Array<Expr>) {
    var sel = exprs[0];
    var data = exprs[1];

    var rest = exprs.slice(2);

    return macro {
      {sel:$sel,data:$data,children:untyped $a{rest}};
    };

  }

}
