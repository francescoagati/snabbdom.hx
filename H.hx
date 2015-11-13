import haxe.macro.Expr;
import haxe.macro.Context;
using haxe.macro.ComplexTypeTools;
using haxe.macro.MacroStringTools;
using haxe.macro.ExprTools;
using Lambda;

class H {


  static function get_key_value(expr,?key,?value) {

    return switch(expr.expr) {
      case EObjectDecl(fields):[for (field in fields) [field.field,field.expr.toString()] ];
      case _:[];
    }


  }

  public macro static function h(exprs:Array<Expr>):ExprOf<VirtualNode> {


    var sel = exprs[0];
    var data = exprs[1];

    var s = data.toString();

    var y = haxe.macro.Context.parse(s,haxe.macro.Context.currentPos());
    var fields = get_key_value(data);


    var structure = 'attrs:untyped {' + [ for (field in fields) if (field[0] != 'style') '${field[0]}:${field[1]}'   ].join(",") + '}';


    for (field in fields) {
      if (field[0] == 'style')  structure = structure + ',style:untyped ${field[1]}';
    }


    var data = Context.parse('{' + structure + '}',Context.currentPos());
    var rest = exprs.slice(2);

    var text = if (rest[0].toString().indexOf('H.h') == 0) {
      null;
    } else {
      rest[0];
    }



    var rt_expr =  if (text == null) {
      macro {
        {sel:$sel,data:$data,children:untyped $a{rest},elm:null,key:null,text:null};
      }
    }  else {
      macro {
        {sel:$sel,data:$data,children:null,elm:null,key:null,text:$e{text}};
      }
    };

    return rt_expr;

  }

}
