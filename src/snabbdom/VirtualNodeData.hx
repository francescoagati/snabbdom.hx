package snabbdom;

typedef VirtualNodeData = {
  ?attrs:DynamicObject<Dynamic>,
  ?props:DynamicObject<Dynamic>,
  ?classes:DynamicObject<Dynamic>,
  ?style:DynamicObject<Dynamic>,
  ?on:DynamicObject<Dynamic>,
  ?hook:Dynamic
}
