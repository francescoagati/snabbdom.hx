package snabbdom;

#if macro
  import haxe.macro.Expr;
#end
class Is {

    public macro  static function is_array(obj:ExprOf<Dynamic>) {
      return macro untyped Array.isArray($obj);
    }
    public macro static function is_primitive(obj:ExprOf<Dynamic>) {
      return macro untyped __js__('typeof {0} == "string" || typeof {0} == "number"',$obj);
    }


    public macro static function isUndef(obj:ExprOf<Dynamic>) { return macro untyped $obj == undefined; }
    public macro static function isDef(obj:ExprOf<Dynamic>) { return macro untyped $obj != undefined; }


}
