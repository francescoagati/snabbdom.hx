package snabbdom;


typedef VirtualNode<T> =  {
  sel: String,
  data: VirtualNodeData,
  children: VirtualNodes<T>,
  text: String,
  elm: T,
  key: String
}
