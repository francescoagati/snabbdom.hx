package snabbdom.engine.virtual;

typedef Obj = {
  parent:Obj,
  children:Array<Obj>,
  element:Dynamic,
  type:String,
  ?id:String,
  ?content:String
}
