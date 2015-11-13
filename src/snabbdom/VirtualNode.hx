package snabbdom;


typedef VirtualNode =  {
  ?sel: String,
  ?data: VirtualNodeData,
  ?children: VirtualNodes,
  ?text: String,
  ?elm: Element,
  ?key: String
}
