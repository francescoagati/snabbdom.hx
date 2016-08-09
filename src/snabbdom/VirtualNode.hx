package snabbdom;


typedef VirtualNode<T> =  {
  ?sel: String,
  ?data: VirtualNodeData,
  ?children: VirtualNodes<T>,
  ?text: String,
  ?elm: T,
  ?key: String,
  ?skip_styles:Bool,
  ?skip_attributes:Bool
}
