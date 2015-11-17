package snabbdom;

import haxe.macro.Expr;
import haxe.macro.Context;
#if !macro
  import snabbdom.engine.dom.VirtualNodeDom;
#end
using haxe.macro.ComplexTypeTools;
using haxe.macro.MacroStringTools;
using haxe.macro.ExprTools;
using Lambda;
using StringTools;
using thx.Strings;

class H {


  inline static function get_key_value(expr,?key,?value) {

    return switch(expr.expr) {
      case EObjectDecl(fields):[for (field in fields) [field.field,field.expr.toString()] ];
      case _:[];
    }

  }

  inline static function style_to_property(style:String) {
    var els = style.split("-");
    return els[0] + els.slice(1).map(function(s) { return s.capitalize(); }).join("");
  }


  inline static function parse_style_string(s:String,context) {

    var styles = s.replace('\"',"").split(";");

    var json = [for (style in styles) {
      var pair = style.split(":");

      pair[0] = style_to_property(pair[0]);
      [pair[0],pair[1]];

    }];

    var props = [];
    for (el in json) {
      var key = el[0];
      var value = if (el[1].indexOf("{") == 0) el[1].replace("{","").replace("}","");
      else '"${el[1]}"';
      props.push('$key:$value');
    }

    var style = '{' + props.join(",") + '}';


    //var expr = context.parse(style,context.currentPos());
    return style;

  }

  public macro static function h(exprs:Array<Expr>):ExprOf<VirtualNodeDom> {


    var sel = exprs[0];
    var data = exprs[1];

    var s = data.toString();

    var y = haxe.macro.Context.parse(s,haxe.macro.Context.currentPos());
    var fields = get_key_value(data);


    var structure = 'attrs:untyped {' + [ for (field in fields) if (field[0] != 'style') '${field[0]}:${field[1]}'   ].join(",") + '}';


    for (field in fields) {
      if (field[0] == 'style')  {

        var style = parse_style_string(field[1],Context);

        structure = structure + ',style:untyped ${style}';
      }
    }


    var data = Context.parse('{' + structure + '}',Context.currentPos());
    var rest = exprs.slice(2);



    var text = null;
    text = if (rest[0].toString().indexOf('H.h') == 0) {
      null;
    } else {
      rest[0];
    }

    var rt_expr = null;
    rt_expr =  if (text == null) {
      macro {
        {sel:$sel,data:$data,children:untyped $a{rest},elm:null,key:null,text:null};
      }
    }  else {
      macro {
        {sel:$sel,data:$data,children:null,elm:null,key:null,text:$e{text}};
      }
    };

    if (rest[0].toString().indexOf('"#') == 0) {
      rest[0] = Context.parse(rest[0].toString().replace("#","").replace('\"',""),Context.currentPos());
      var element = rest[0];
      rt_expr =  macro {
          {sel:$sel,data:$data,children:untyped $e{element},elm:null,key:null,text:null};
        }
    }


    return rt_expr;

  }

}
