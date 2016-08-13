package snabbdom.engine.dom;

@:enum
@:forward
abstract CacheDom(Int) from Int to Int {

  var cacheNone = value(0);
  var cacheAll = value(1);
  var cacheStyle = value(2);
  var cacheAttributes = value(3);
  var cacheEvents = value(4);
  var cacheHooks = value(5);
  var cacheContent = value(6);

  static inline function value(i:Int) return 1 << i;

  public inline function remove(mask:CacheDom) return this & ~mask;
  public inline function add(mask:CacheDom) return (this:Int) | mask;

  public inline function contains(mask:CacheDom) return this & mask == mask;
}
