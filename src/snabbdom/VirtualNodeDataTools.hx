package snabbdom;

#if macro
 import haxe.macro.Expr;
#end

class VirtualNodeDataTools {
    public macro static function get_style_or_empty(vdata:ExprOf<VirtualNodeData>):ExprOf<DynamicObject<Dynamic>> {
      return macro if ($vdata.style == null)  {}; else $vdata.style;

    }
    public macro static function get_attrs_or_empty(vdata:ExprOf<VirtualNodeData>):ExprOf<DynamicObject<Dynamic>>
      return macro $vdata.attrs == null ? {} : $vdata.attrs;

    public macro static function get_props_or_empty(vdata:ExprOf<VirtualNodeData>):ExprOf<DynamicObject<Dynamic>>
      return macro $vdata.props == null ? {} : $vdata.props;

    public macro static function get_events_or_empty(vdata:ExprOf<VirtualNodeData>):ExprOf<DynamicObject<Dynamic>>
      return macro $vdata.on == null ? {} : $vdata.on;


    public macro static function get_classes_or_empty(vdata:ExprOf<VirtualNodeData>):ExprOf<DynamicObject<Dynamic>>
      return macro $vdata.classes == null ? {} : $vdata.classes;


  }
