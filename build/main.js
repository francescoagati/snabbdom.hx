(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.random = function(x) {
	return x <= 0?0:Math.floor(Math.random() * x);
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.prototype = {
	run: function() {
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.alert = function(v) {
	window.alert(js_Boot.__string_rec(v,""));
};
var partials_Partial = function() { };
partials_Partial.__name__ = true;
var snabbdom_Main = function() { };
snabbdom_Main.__name__ = true;
snabbdom_Main.click = function() {
	js_Browser.alert("click");
};
snabbdom_Main.main = function() {
	var txt = "testo";
	var vnode = { sel : "div", data : { attrs : { id : "pippa"}}, children : [{ sel : "ul", data : { attrs : { }}, children : [{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "1"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "2"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "3"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "4"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "5"},{ sel : "li", data : { attrs : { }}, children : [{ sel : "span", data : { attrs : { onclick : snabbdom_Main.click}, on : { 'click' : snabbdom_Main.click}}, children : null, elm : null, key : null, text : txt}], elm : null, key : null, text : null}], elm : null, key : null, text : null}], elm : null, key : null, text : null};
	var last_node = null;
	var timer = new haxe_Timer(1000);
	timer.run = function() {
		var rnd = Math.random();
		var color = (function($this) {
			var $r;
			var array = thx_Arrays.shuffle(["red","yellow","green","black","white","grey"]);
			$r = array[0];
			return $r;
		}(this));
		var bg = (function($this) {
			var $r;
			var array1 = thx_Arrays.shuffle(["red","yellow","green","black","white","grey"]);
			$r = array1[0];
			return $r;
		}(this));
		var max = (function($this) {
			var $r;
			var x = Math.random() * 1000;
			$r = x | 0;
			return $r;
		}(this));
		var list = (function($this) {
			var $r;
			var _g = [];
			{
				var _g1_min = 0;
				var _g1_max = max;
				while(_g1_min < _g1_max) {
					var x1 = _g1_min++;
					_g.push({ sel : "li", data : { attrs : { }}, children : [{ sel : "span", data : { attrs : { }}, children : null, elm : null, key : null, text : x1}], elm : null, key : null, text : null});
				}
			}
			$r = _g;
			return $r;
		}(this));
		var vnode2 = { sel : "div", data : { attrs : { id : "pippa"}}, children : [{ sel : "span", data : { attrs : { }}, children : null, elm : null, key : null, text : max},{ sel : "ul", data : { attrs : { }, style : { fontSize : "30px", color : color, backgroundColor : bg}}, children : list, elm : null, key : null, text : null}], elm : null, key : null, text : null};
		if(last_node == null) snabbdom_engine_dom_PatchDom.patchDom(window.document.getElementById("container"),vnode2); else snabbdom_engine_dom_PatchDom.patch(last_node,vnode2);
		last_node = vnode2;
	};
};
var snabbdom_engine_dom_PatchDom = function() { };
snabbdom_engine_dom_PatchDom.__name__ = true;
snabbdom_engine_dom_PatchDom.__interfaces__ = [partials_Partial];
snabbdom_engine_dom_PatchDom.createElm = function(vnode,insertedVnodeQueue) {
	var i;
	var data = vnode.data;
	if(data != undefined) {
		if((i = data.hook) != undefined && (i = i.init) != undefined) i(vnode);
		if((i = data.vnode) != undefined) vnode = i;
	}
	var elm;
	var children = vnode.children;
	var sel = vnode.sel;
	if(sel != undefined) {
		var hashIdx = sel.indexOf("#",0);
		var dotIdx = sel.indexOf(".",hashIdx);
		var hash = hashIdx > 0?hashIdx:sel.length;
		var dot = dotIdx > 0?dotIdx:sel.length;
		var tag = hashIdx != -1 || dotIdx != -1?sel.slice(0,Math.min(hash,dot)):sel;
		elm = vnode.elm = data != undefined && (i = data.ns) != undefined?window.document.createElementNS(i,tag):window.document.createElement(tag);
		if(hash < dot) {
			var value = sel.slice(hash + 1,dot);
			elm.id = value;
		}
		if(dotIdx > 0) {
			elm.className = sel.slice(dot+1).replace(snabbdom_engine_dom_PatchDom.rg, " ");;
		}
		if(Array.isArray(children)) {
			i = 0;
			if(i < children.length) do {
				var new_node = snabbdom_engine_dom_PatchDom.createElm(children[i],insertedVnodeQueue);
				elm.appendChild(new_node);
			} while((function($this) {
				var $r;
				++i;
				$r = i < children.length;
				return $r;
			}(this)));
		} else if(typeof vnode.text == "string" || typeof vnode.text == "number") {
			var element = window.document.createTextNode(vnode.text);
			elm.appendChild(element);
		}
		var oldVnode = snabbdom_engine_dom_PatchDom.emptyNode;
		var key;
		var cur;
		var old;
		var elm1 = vnode.elm;
		var oldAttrs = oldVnode.data.attrs == null?{ }:oldVnode.data.attrs;
		var attrs = vnode.data.attrs == null?{ }:vnode.data.attrs;
		var _g = 0;
		var _g1 = Object.keys(attrs);
		while(_g < _g1.length) {
			var key1 = _g1[_g];
			++_g;
			cur = attrs[key1];
			old = oldAttrs[key1];
			if(old != cur) {
				if(!cur && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key1]) elm1.removeAttribute(key1); else {
					var value1 = cur;
					elm1.setAttribute(key1,value1);
				}
			}
		}
		var _g2 = 0;
		var _g11 = Object.keys(oldAttrs);
		while(_g2 < _g11.length) {
			var key2 = _g11[_g2];
			++_g2;
			if(!Object.prototype.hasOwnProperty.call(attrs,key2)) elm1.removeAttribute(key2);
		}
		var key3;
		var cur1;
		var old1;
		var elm2 = vnode.elm;
		var oldProps = oldVnode.data.props == null?{ }:oldVnode.data.props;
		var props = vnode.data.props == null?{ }:vnode.data.props;
		var _g3 = 0;
		var _g12 = Object.keys(props);
		while(_g3 < _g12.length) {
			var key4 = _g12[_g3];
			++_g3;
			cur1 = props[key4];
			old1 = oldProps[key4];
			if(old1 != cur1) {
				var value2 = cur1;
				elm2[key4] = value2;
			}
		}
		var cur2;
		var name;
		var elm3 = vnode.elm;
		var oldClass = oldVnode.data.classes == null?{ }:oldVnode.data.classes;
		var klass = vnode.data.classes == null?{ }:vnode.data.classes;
		var _g4 = 0;
		var _g13 = Object.keys(klass);
		while(_g4 < _g13.length) {
			var name1 = _g13[_g4];
			++_g4;
			cur2 = klass[name1];
			if(cur2 != oldClass[name1]) {
				if(cur2 == "add") elm3.classList.add(name1); else if(cur2 == "remove") elm3.classList.remove(name1);
			}
		}
		var cur3;
		var name2;
		var elm4 = vnode.elm;
		var oldStyle = oldVnode.data.style == null?{ }:oldVnode.data.style;
		var style = vnode.data.style == null?{ }:vnode.data.style;
		var oldHasDel = Object.prototype.hasOwnProperty.call(oldStyle,"delayed");
		var _g5 = 0;
		var _g14 = Object.keys(style);
		while(_g5 < _g14.length) {
			var name3 = _g14[_g5];
			++_g5;
			cur3 = style[name3];
			if(name3 == "delayed") {
				var delayed = style.delayed;
				var oldDelayed = oldStyle.delayed;
				var _g21 = 0;
				var _g31 = Object.keys(delayed);
				while(_g21 < _g31.length) {
					var name4 = _g31[_g21];
					++_g21;
					cur3 = delayed[name4];
					if(!oldHasDel || cur3 != oldDelayed[name4]) {
						var obj = [elm4.style];
						var prop = [name4];
						var val = [cur3];
						var fn = [(function(val,prop,obj) {
							return function(i1) {
								var value3 = val[0];
								obj[0][prop[0]] = value3;
							};
						})(val,prop,obj)];
						window.requestAnimationFrame((function(fn) {
							return function(i2) {
								window.requestAnimationFrame(fn[0]);
							};
						})(fn));
					}
				}
			} else if(name3 != "remove" && cur3 != oldStyle[name3]) elm4.style[name3] = cur3;
		}
		var name5;
		var cur4;
		var old2;
		var elm5 = vnode.elm;
		var oldOn = oldVnode.data.on == null?{ }:oldVnode.data.on;
		var on = vnode.data.on == null?{ }:vnode.data.on;
		js_Browser.alert(oldVnode);
		if(on != null) {
			var _g6 = 0;
			var _g15 = Object.keys(on);
			while(_g6 < _g15.length) {
				var name6 = _g15[_g6];
				++_g6;
				js_Browser.alert(name6);
				cur4 = on[name6];
				old2 = oldOn[name6];
				if(old2 == null) {
					if(Array.isArray(cur4)) elm5.addEventListener(name6,(function($this) {
						var $r;
						var arr = [cur4];
						$r = (function(arr) {
							return function(ev) {
								if(arr[0].length == 2) arr[0][0](arr[0][1]); else arr[0][0].apply(undefined,arr[0].slice(1));
							};
						})(arr);
						return $r;
					}(this))); else {
						cur4 = { fn : cur4};
						var value4 = cur4;
						on[name6] = value4;
						elm5.addEventListener(name6,(function($this) {
							var $r;
							var o = [cur4];
							$r = (function(o) {
								return function(ev1) {
									o[0].fn(ev1);
								};
							})(o);
							return $r;
						}(this)));
					}
				} else if(Array.isArray(old2)) {
					var o1 = old2;
					o1.length = cur4.length;
					var _g22 = 0;
					while(_g22 < o1.length) {
						var el = o1[_g22];
						++_g22;
						old2[el] = cur4[el];
					}
					var value5 = old2;
					on[name6] = value5;
				} else {
					old2.fn = cur4;
					var value6 = old2;
					on[name6] = value6;
				}
			}
		}
		if(vnode.data != null) {
			i = vnode.data.hook;
			if(i != undefined) {
				if(i.create) i.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode);
				if(i.insert) insertedVnodeQueue.push(vnode);
			}
		}
	} else elm = vnode.elm = window.document.createTextNode(vnode.text);
	return vnode.elm;
};
snabbdom_engine_dom_PatchDom.invokeDestroyHook = function(vnode) {
	var i = vnode.data;
	var j;
	if(i != undefined) {
		if((i = i.hook) != undefined && (i = i.destroy) != undefined) i(vnode);
		var style = null;
		var name;
		var elm = vnode.elm;
		var s = vnode.data.style;
		if(s == null) null; else {
			style = s.destroy;
			if(style == null) null; else {
				var _g = 0;
				var _g1 = Object.keys(style);
				while(_g < _g1.length) {
					var name1 = _g1[_g];
					++_g;
					elm.style[name1] = style[name1];
				}
			}
		}
		if((i = vnode.children) != undefined) {
			j = 0;
			if(j < vnode.children.length) do snabbdom_engine_dom_PatchDom.invokeDestroyHook(vnode.children[j]); while((function($this) {
				var $r;
				++j;
				$r = j < vnode.children.length;
				return $r;
			}(this)));
		}
	}
};
snabbdom_engine_dom_PatchDom.updateChildren = function(parentElm,oldCh,newCh,insertedVnodeQueue) {
	var oldStartIdx = 0;
	var newStartIdx = 0;
	var oldEndIdx = oldCh.length - 1;
	var oldStartVnode = oldCh[0];
	var oldEndVnode = oldCh[oldEndIdx];
	var newEndIdx = newCh.length - 1;
	var newStartVnode = newCh[0];
	var newEndVnode = newCh[newEndIdx];
	var oldKeyToIdx = null;
	var idxInOld;
	var elmToMove;
	var before;
	while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) if(oldStartVnode == undefined) oldStartVnode = oldCh[++oldStartIdx]; else if(oldEndVnode == undefined) oldEndVnode = oldCh[--oldEndIdx]; else if(oldStartVnode.key == newStartVnode.key && oldStartVnode.sel == newStartVnode.sel) {
		var oldVnode = oldStartVnode;
		var vnode = newStartVnode;
		var i;
		var hook;
		if((i = vnode.data) != undefined && (hook = i.hook) != undefined && (i = hook.prepatch) != undefined) i(oldVnode,vnode);
		if((i = oldVnode.data) != undefined && (i = i.vnode) != undefined) oldVnode = i;
		if((i = vnode.data) != undefined && (i = i.vnode) != undefined) vnode = i;
		var elm = vnode.elm = oldVnode.elm;
		var oldCh1 = oldVnode.children;
		var ch = vnode.children;
		if(oldVnode == vnode) null; else {
			if(vnode.data != undefined) {
				var key;
				var cur;
				var old;
				var elm1 = vnode.elm;
				var oldAttrs = oldVnode.data.attrs == null?{ }:oldVnode.data.attrs;
				var attrs = vnode.data.attrs == null?{ }:vnode.data.attrs;
				var _g = 0;
				var _g1 = Object.keys(attrs);
				while(_g < _g1.length) {
					var key1 = _g1[_g];
					++_g;
					cur = attrs[key1];
					old = oldAttrs[key1];
					if(old != cur) {
						if(!cur && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key1]) elm1.removeAttribute(key1); else {
							var value = cur;
							elm1.setAttribute(key1,value);
						}
					}
				}
				var _g2 = 0;
				var _g11 = Object.keys(oldAttrs);
				while(_g2 < _g11.length) {
					var key2 = _g11[_g2];
					++_g2;
					if(!Object.prototype.hasOwnProperty.call(attrs,key2)) elm1.removeAttribute(key2);
				}
				var key3;
				var cur1;
				var old1;
				var elm2 = vnode.elm;
				var oldProps = oldVnode.data.props == null?{ }:oldVnode.data.props;
				var props = vnode.data.props == null?{ }:vnode.data.props;
				var _g3 = 0;
				var _g12 = Object.keys(props);
				while(_g3 < _g12.length) {
					var key4 = _g12[_g3];
					++_g3;
					cur1 = props[key4];
					old1 = oldProps[key4];
					if(old1 != cur1) {
						var value1 = cur1;
						elm2[key4] = value1;
					}
				}
				var cur2;
				var name;
				var elm3 = vnode.elm;
				var oldClass = oldVnode.data.classes == null?{ }:oldVnode.data.classes;
				var klass = vnode.data.classes == null?{ }:vnode.data.classes;
				var _g4 = 0;
				var _g13 = Object.keys(klass);
				while(_g4 < _g13.length) {
					var name1 = _g13[_g4];
					++_g4;
					cur2 = klass[name1];
					if(cur2 != oldClass[name1]) {
						if(cur2 == "add") elm3.classList.add(name1); else if(cur2 == "remove") elm3.classList.remove(name1);
					}
				}
				var cur3;
				var name2;
				var elm4 = vnode.elm;
				var oldStyle = oldVnode.data.style == null?{ }:oldVnode.data.style;
				var style = vnode.data.style == null?{ }:vnode.data.style;
				var oldHasDel = Object.prototype.hasOwnProperty.call(oldStyle,"delayed");
				var _g5 = 0;
				var _g14 = Object.keys(style);
				while(_g5 < _g14.length) {
					var name3 = _g14[_g5];
					++_g5;
					cur3 = style[name3];
					if(name3 == "delayed") {
						var delayed = style.delayed;
						var oldDelayed = oldStyle.delayed;
						var _g21 = 0;
						var _g31 = Object.keys(delayed);
						while(_g21 < _g31.length) {
							var name4 = _g31[_g21];
							++_g21;
							cur3 = delayed[name4];
							if(!oldHasDel || cur3 != oldDelayed[name4]) {
								var obj = [elm4.style];
								var prop = [name4];
								var val = [cur3];
								var fn = [(function(val,prop,obj) {
									return function(i1) {
										var value2 = val[0];
										obj[0][prop[0]] = value2;
									};
								})(val,prop,obj)];
								window.requestAnimationFrame((function(fn) {
									return function(i2) {
										window.requestAnimationFrame(fn[0]);
									};
								})(fn));
							}
						}
					} else if(name3 != "remove" && cur3 != oldStyle[name3]) elm4.style[name3] = cur3;
				}
				var name5;
				var cur4;
				var old2;
				var elm5 = vnode.elm;
				var oldOn = oldVnode.data.on == null?{ }:oldVnode.data.on;
				var on = vnode.data.on == null?{ }:vnode.data.on;
				js_Browser.alert(oldVnode);
				if(on != null) {
					var _g6 = 0;
					var _g15 = Object.keys(on);
					while(_g6 < _g15.length) {
						var name6 = _g15[_g6];
						++_g6;
						js_Browser.alert(name6);
						cur4 = on[name6];
						old2 = oldOn[name6];
						if(old2 == null) {
							if(Array.isArray(cur4)) elm5.addEventListener(name6,(function($this) {
								var $r;
								var arr = [cur4];
								$r = (function(arr) {
									return function(ev) {
										if(arr[0].length == 2) arr[0][0](arr[0][1]); else arr[0][0].apply(undefined,arr[0].slice(1));
									};
								})(arr);
								return $r;
							}(this))); else {
								cur4 = { fn : cur4};
								var value3 = cur4;
								on[name6] = value3;
								elm5.addEventListener(name6,(function($this) {
									var $r;
									var o = [cur4];
									$r = (function(o) {
										return function(ev1) {
											o[0].fn(ev1);
										};
									})(o);
									return $r;
								}(this)));
							}
						} else if(Array.isArray(old2)) {
							var o1 = old2;
							o1.length = cur4.length;
							var _g22 = 0;
							while(_g22 < o1.length) {
								var el = o1[_g22];
								++_g22;
								old2[el] = cur4[el];
							}
							var value4 = old2;
							on[name6] = value4;
						} else {
							old2.fn = cur4;
							var value5 = old2;
							on[name6] = value5;
						}
					}
				}
				i = vnode.data.hook;
				if(i != undefined && (i = i.update) != undefined) i(oldVnode,vnode);
			}
			if(vnode.text == undefined) {
				if(oldCh1 != undefined && ch != undefined) {
					if(oldCh1 != ch) snabbdom_engine_dom_PatchDom.updateChildren(elm,oldCh1,ch,insertedVnodeQueue);
				} else if(ch != undefined) {
					var startIdx = 0;
					var endIdx = ch.length - 1;
					var i3;
					var new_node;
					i3 = 0;
					if(startIdx <= endIdx) do {
						new_node = (function($this) {
							var $r;
							var vnode1 = ch[startIdx];
							var i4;
							var data = vnode1.data;
							if(data != undefined) {
								if((i4 = data.hook) != undefined && (i4 = i4.init) != undefined) i4(vnode1);
								if((i4 = data.vnode) != undefined) vnode1 = i4;
							}
							var elm6;
							var children = vnode1.children;
							var sel = vnode1.sel;
							if(sel != undefined) {
								var hashIdx = sel.indexOf("#",0);
								var dotIdx = sel.indexOf(".",hashIdx);
								var hash = hashIdx > 0?hashIdx:sel.length;
								var dot = dotIdx > 0?dotIdx:sel.length;
								var tag = hashIdx != -1 || dotIdx != -1?sel.slice(0,Math.min(hash,dot)):sel;
								elm6 = vnode1.elm = data != undefined && (i4 = data.ns) != undefined?window.document.createElementNS(i4,tag):window.document.createElement(tag);
								if(hash < dot) {
									var value6 = sel.slice(hash + 1,dot);
									elm6.id = value6;
								}
								if(dotIdx > 0) {
									elm.className = sel.slice(dot+1).replace(snabbdom_engine_dom_PatchDom.rg, " ");;
								}
								if(Array.isArray(children)) {
									i4 = 0;
									if(i4 < children.length) do {
										var new_node1 = snabbdom_engine_dom_PatchDom.createElm(children[i4],insertedVnodeQueue);
										elm6.appendChild(new_node1);
									} while((function($this) {
										var $r;
										++i4;
										$r = i4 < children.length;
										return $r;
									}($this)));
								} else if(typeof vnode1.text == "string" || typeof vnode1.text == "number") {
									var element = window.document.createTextNode(vnode1.text);
									elm6.appendChild(element);
								}
								var oldVnode1 = snabbdom_engine_dom_PatchDom.emptyNode;
								var key5;
								var cur5;
								var old3;
								var elm7 = vnode1.elm;
								var oldAttrs1 = oldVnode1.data.attrs == null?{ }:oldVnode1.data.attrs;
								var attrs1 = vnode1.data.attrs == null?{ }:vnode1.data.attrs;
								var _g7 = 0;
								var _g16 = Object.keys(attrs1);
								while(_g7 < _g16.length) {
									var key6 = _g16[_g7];
									++_g7;
									cur5 = attrs1[key6];
									old3 = oldAttrs1[key6];
									if(old3 != cur5) {
										if(!cur5 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key6]) elm7.removeAttribute(key6); else {
											var value7 = cur5;
											elm7.setAttribute(key6,value7);
										}
									}
								}
								var _g8 = 0;
								var _g17 = Object.keys(oldAttrs1);
								while(_g8 < _g17.length) {
									var key7 = _g17[_g8];
									++_g8;
									if(!Object.prototype.hasOwnProperty.call(attrs1,key7)) elm7.removeAttribute(key7);
								}
								var key8;
								var cur6;
								var old4;
								var elm8 = vnode1.elm;
								var oldProps1 = oldVnode1.data.props == null?{ }:oldVnode1.data.props;
								var props1 = vnode1.data.props == null?{ }:vnode1.data.props;
								var _g9 = 0;
								var _g18 = Object.keys(props1);
								while(_g9 < _g18.length) {
									var key9 = _g18[_g9];
									++_g9;
									cur6 = props1[key9];
									old4 = oldProps1[key9];
									if(old4 != cur6) {
										var value8 = cur6;
										elm8[key9] = value8;
									}
								}
								var cur7;
								var name7;
								var elm9 = vnode1.elm;
								var oldClass1 = oldVnode1.data.classes == null?{ }:oldVnode1.data.classes;
								var klass1 = vnode1.data.classes == null?{ }:vnode1.data.classes;
								var _g10 = 0;
								var _g19 = Object.keys(klass1);
								while(_g10 < _g19.length) {
									var name8 = _g19[_g10];
									++_g10;
									cur7 = klass1[name8];
									if(cur7 != oldClass1[name8]) {
										if(cur7 == "add") elm9.classList.add(name8); else if(cur7 == "remove") elm9.classList.remove(name8);
									}
								}
								var cur8;
								var name9;
								var elm10 = vnode1.elm;
								var oldStyle1 = oldVnode1.data.style == null?{ }:oldVnode1.data.style;
								var style1 = vnode1.data.style == null?{ }:vnode1.data.style;
								var oldHasDel1 = Object.prototype.hasOwnProperty.call(oldStyle1,"delayed");
								var _g20 = 0;
								var _g110 = Object.keys(style1);
								while(_g20 < _g110.length) {
									var name10 = _g110[_g20];
									++_g20;
									cur8 = style1[name10];
									if(name10 == "delayed") {
										var delayed1 = style1.delayed;
										var oldDelayed1 = oldStyle1.delayed;
										var _g23 = 0;
										var _g32 = Object.keys(delayed1);
										while(_g23 < _g32.length) {
											var name11 = _g32[_g23];
											++_g23;
											cur8 = delayed1[name11];
											if(!oldHasDel1 || cur8 != oldDelayed1[name11]) {
												var obj1 = [elm10.style];
												var prop1 = [name11];
												var val1 = [cur8];
												var fn1 = [(function(val1,prop1,obj1) {
													return function(i5) {
														var value9 = val1[0];
														obj1[0][prop1[0]] = value9;
													};
												})(val1,prop1,obj1)];
												window.requestAnimationFrame((function(fn1) {
													return function(i6) {
														window.requestAnimationFrame(fn1[0]);
													};
												})(fn1));
											}
										}
									} else if(name10 != "remove" && cur8 != oldStyle1[name10]) elm10.style[name10] = cur8;
								}
								var name12;
								var cur9;
								var old5;
								var elm11 = vnode1.elm;
								var oldOn1 = oldVnode1.data.on == null?{ }:oldVnode1.data.on;
								var on1 = vnode1.data.on == null?{ }:vnode1.data.on;
								js_Browser.alert(oldVnode1);
								if(on1 != null) {
									var _g24 = 0;
									var _g111 = Object.keys(on1);
									while(_g24 < _g111.length) {
										var name13 = _g111[_g24];
										++_g24;
										js_Browser.alert(name13);
										cur9 = on1[name13];
										old5 = oldOn1[name13];
										if(old5 == null) {
											if(Array.isArray(cur9)) elm11.addEventListener(name13,(function($this) {
												var $r;
												var arr1 = [cur9];
												$r = (function(arr1) {
													return function(ev2) {
														if(arr1[0].length == 2) arr1[0][0](arr1[0][1]); else arr1[0][0].apply(undefined,arr1[0].slice(1));
													};
												})(arr1);
												return $r;
											}($this))); else {
												cur9 = { fn : cur9};
												var value10 = cur9;
												on1[name13] = value10;
												elm11.addEventListener(name13,(function($this) {
													var $r;
													var o2 = [cur9];
													$r = (function(o2) {
														return function(ev3) {
															o2[0].fn(ev3);
														};
													})(o2);
													return $r;
												}($this)));
											}
										} else if(Array.isArray(old5)) {
											var o3 = old5;
											o3.length = cur9.length;
											var _g25 = 0;
											while(_g25 < o3.length) {
												var el1 = o3[_g25];
												++_g25;
												old5[el1] = cur9[el1];
											}
											var value11 = old5;
											on1[name13] = value11;
										} else {
											old5.fn = cur9;
											var value12 = old5;
											on1[name13] = value12;
										}
									}
								}
								if(vnode1.data != null) {
									i4 = vnode1.data.hook;
									if(i4 != undefined) {
										if(i4.create) i4.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode1);
										if(i4.insert) insertedVnodeQueue.push(vnode1);
									}
								}
							} else elm6 = vnode1.elm = window.document.createTextNode(vnode1.text);
							$r = vnode1.elm;
							return $r;
						}(this));
						elm.insertBefore(new_node,null);
					} while((function($this) {
						var $r;
						++startIdx;
						$r = startIdx <= endIdx;
						return $r;
					}(this)));
				} else if(oldCh1 != undefined) {
					var startIdx1 = 0;
					var endIdx1 = oldCh1.length - 1;
					var y;
					y = 0;
					if(startIdx1 <= endIdx1) do {
						var i7;
						var listeners;
						var rm = null;
						var ch1 = oldCh1[startIdx1];
						if(ch1 != undefined) {
							if(ch1.sel != undefined) {
								var vnode2 = ch1;
								var i8 = vnode2.data;
								var j;
								if(i8 != undefined) {
									if((i8 = i8.hook) != undefined && (i8 = i8.destroy) != undefined) i8(vnode2);
									var style2 = null;
									var name14;
									var elm12 = vnode2.elm;
									var s = vnode2.data.style;
									if(s == null) null; else {
										style2 = s.destroy;
										if(style2 == null) null; else {
											var _g26 = 0;
											var _g112 = Object.keys(style2);
											while(_g26 < _g112.length) {
												var name15 = _g112[_g26];
												++_g26;
												elm12.style[name15] = style2[name15];
											}
										}
									}
									if((i8 = vnode2.children) != undefined) {
										j = 0;
										if(j < vnode2.children.length) do snabbdom_engine_dom_PatchDom.invokeDestroyHook(vnode2.children[j]); while((function($this) {
											var $r;
											++j;
											$r = j < vnode2.children.length;
											return $r;
										}(this)));
									}
								}
								var vnode3 = ch1;
								var rm1 = rm;
								var rm2 = [rm1];
								var s1 = vnode3.data.style;
								if(!s1 || !s1.remove) {
									if(rm2[0] != null) rm2[0]();
									null;
								} else {
									var name16;
									var elm13 = [vnode3.elm];
									var idx;
									var i9 = 0;
									var maxDur = 0;
									var compStyle;
									var style3 = s1.remove;
									var amount = [0];
									var applied = [];
									var _g27 = 0;
									var _g113 = Object.keys(style3);
									while(_g27 < _g113.length) {
										var name17 = _g113[_g27];
										++_g27;
										applied.push(name17);
										elm13[0].style[name17] = style3[name17];
									}
									compStyle = window.getComputedStyle(elm13[0]);
									var props2 = compStyle["transition-property"].split(", ");
									var i10;
									i10 = 0;
									if(i10 < props2.length) do if(HxOverrides.indexOf(applied,props2[i10],0) != -1) amount[0]++; while((function($this) {
										var $r;
										++i10;
										$r = i10 < props2.length;
										return $r;
									}(this)));
									elm13[0].addEventListener("transitionend",(function(amount,elm13,rm2) {
										return function(ev4) {
											if(ev4.target == elm13[0]) --amount[0];
											if(amount[0] == 0) rm2[0]();
										};
									})(amount,elm13,rm2));
								}
								if((i7 = ch1.data) != undefined && (i7 = i7.hook) != undefined && (i7 = i7.remove) != undefined) i7(ch1,rm); else {
									console.log("remove");
									if(rm != null) rm();
									elm.removeChild(ch1.elm);
								}
							} else elm.removeChild(ch1.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx1;
						$r = startIdx1 <= endIdx1;
						return $r;
					}(this)));
				}
			} else if(oldVnode.text != vnode.text) elm.textContent = vnode.text;
			if(hook != undefined && (i = hook.postpatch) != undefined) i(oldVnode,vnode);
		}
		oldStartVnode = oldCh[++oldStartIdx];
		newStartVnode = newCh[++newStartIdx];
	} else if(oldEndVnode.key == newEndVnode.key && oldEndVnode.sel == newEndVnode.sel) {
		var oldVnode2 = oldEndVnode;
		var vnode4 = newEndVnode;
		var i11;
		var hook1;
		if((i11 = vnode4.data) != undefined && (hook1 = i11.hook) != undefined && (i11 = hook1.prepatch) != undefined) i11(oldVnode2,vnode4);
		if((i11 = oldVnode2.data) != undefined && (i11 = i11.vnode) != undefined) oldVnode2 = i11;
		if((i11 = vnode4.data) != undefined && (i11 = i11.vnode) != undefined) vnode4 = i11;
		var elm14 = vnode4.elm = oldVnode2.elm;
		var oldCh2 = oldVnode2.children;
		var ch2 = vnode4.children;
		if(oldVnode2 == vnode4) null; else {
			if(vnode4.data != undefined) {
				var key10;
				var cur10;
				var old6;
				var elm15 = vnode4.elm;
				var oldAttrs2 = oldVnode2.data.attrs == null?{ }:oldVnode2.data.attrs;
				var attrs2 = vnode4.data.attrs == null?{ }:vnode4.data.attrs;
				var _g28 = 0;
				var _g114 = Object.keys(attrs2);
				while(_g28 < _g114.length) {
					var key11 = _g114[_g28];
					++_g28;
					cur10 = attrs2[key11];
					old6 = oldAttrs2[key11];
					if(old6 != cur10) {
						if(!cur10 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key11]) elm15.removeAttribute(key11); else {
							var value13 = cur10;
							elm15.setAttribute(key11,value13);
						}
					}
				}
				var _g29 = 0;
				var _g115 = Object.keys(oldAttrs2);
				while(_g29 < _g115.length) {
					var key12 = _g115[_g29];
					++_g29;
					if(!Object.prototype.hasOwnProperty.call(attrs2,key12)) elm15.removeAttribute(key12);
				}
				var key13;
				var cur11;
				var old7;
				var elm16 = vnode4.elm;
				var oldProps2 = oldVnode2.data.props == null?{ }:oldVnode2.data.props;
				var props3 = vnode4.data.props == null?{ }:vnode4.data.props;
				var _g30 = 0;
				var _g116 = Object.keys(props3);
				while(_g30 < _g116.length) {
					var key14 = _g116[_g30];
					++_g30;
					cur11 = props3[key14];
					old7 = oldProps2[key14];
					if(old7 != cur11) {
						var value14 = cur11;
						elm16[key14] = value14;
					}
				}
				var cur12;
				var name18;
				var elm17 = vnode4.elm;
				var oldClass2 = oldVnode2.data.classes == null?{ }:oldVnode2.data.classes;
				var klass2 = vnode4.data.classes == null?{ }:vnode4.data.classes;
				var _g33 = 0;
				var _g117 = Object.keys(klass2);
				while(_g33 < _g117.length) {
					var name19 = _g117[_g33];
					++_g33;
					cur12 = klass2[name19];
					if(cur12 != oldClass2[name19]) {
						if(cur12 == "add") elm17.classList.add(name19); else if(cur12 == "remove") elm17.classList.remove(name19);
					}
				}
				var cur13;
				var name20;
				var elm18 = vnode4.elm;
				var oldStyle2 = oldVnode2.data.style == null?{ }:oldVnode2.data.style;
				var style4 = vnode4.data.style == null?{ }:vnode4.data.style;
				var oldHasDel2 = Object.prototype.hasOwnProperty.call(oldStyle2,"delayed");
				var _g34 = 0;
				var _g118 = Object.keys(style4);
				while(_g34 < _g118.length) {
					var name21 = _g118[_g34];
					++_g34;
					cur13 = style4[name21];
					if(name21 == "delayed") {
						var delayed2 = style4.delayed;
						var oldDelayed2 = oldStyle2.delayed;
						var _g210 = 0;
						var _g35 = Object.keys(delayed2);
						while(_g210 < _g35.length) {
							var name22 = _g35[_g210];
							++_g210;
							cur13 = delayed2[name22];
							if(!oldHasDel2 || cur13 != oldDelayed2[name22]) {
								var obj2 = [elm18.style];
								var prop2 = [name22];
								var val2 = [cur13];
								var fn2 = [(function(val2,prop2,obj2) {
									return function(i12) {
										var value15 = val2[0];
										obj2[0][prop2[0]] = value15;
									};
								})(val2,prop2,obj2)];
								window.requestAnimationFrame((function(fn2) {
									return function(i13) {
										window.requestAnimationFrame(fn2[0]);
									};
								})(fn2));
							}
						}
					} else if(name21 != "remove" && cur13 != oldStyle2[name21]) elm18.style[name21] = cur13;
				}
				var name23;
				var cur14;
				var old8;
				var elm19 = vnode4.elm;
				var oldOn2 = oldVnode2.data.on == null?{ }:oldVnode2.data.on;
				var on2 = vnode4.data.on == null?{ }:vnode4.data.on;
				js_Browser.alert(oldVnode2);
				if(on2 != null) {
					var _g36 = 0;
					var _g119 = Object.keys(on2);
					while(_g36 < _g119.length) {
						var name24 = _g119[_g36];
						++_g36;
						js_Browser.alert(name24);
						cur14 = on2[name24];
						old8 = oldOn2[name24];
						if(old8 == null) {
							if(Array.isArray(cur14)) elm19.addEventListener(name24,(function($this) {
								var $r;
								var arr2 = [cur14];
								$r = (function(arr2) {
									return function(ev5) {
										if(arr2[0].length == 2) arr2[0][0](arr2[0][1]); else arr2[0][0].apply(undefined,arr2[0].slice(1));
									};
								})(arr2);
								return $r;
							}(this))); else {
								cur14 = { fn : cur14};
								var value16 = cur14;
								on2[name24] = value16;
								elm19.addEventListener(name24,(function($this) {
									var $r;
									var o4 = [cur14];
									$r = (function(o4) {
										return function(ev6) {
											o4[0].fn(ev6);
										};
									})(o4);
									return $r;
								}(this)));
							}
						} else if(Array.isArray(old8)) {
							var o5 = old8;
							o5.length = cur14.length;
							var _g211 = 0;
							while(_g211 < o5.length) {
								var el2 = o5[_g211];
								++_g211;
								old8[el2] = cur14[el2];
							}
							var value17 = old8;
							on2[name24] = value17;
						} else {
							old8.fn = cur14;
							var value18 = old8;
							on2[name24] = value18;
						}
					}
				}
				i11 = vnode4.data.hook;
				if(i11 != undefined && (i11 = i11.update) != undefined) i11(oldVnode2,vnode4);
			}
			if(vnode4.text == undefined) {
				if(oldCh2 != undefined && ch2 != undefined) {
					if(oldCh2 != ch2) snabbdom_engine_dom_PatchDom.updateChildren(elm14,oldCh2,ch2,insertedVnodeQueue);
				} else if(ch2 != undefined) {
					var startIdx2 = 0;
					var endIdx2 = ch2.length - 1;
					var i14;
					var new_node2;
					i14 = 0;
					if(startIdx2 <= endIdx2) do {
						new_node2 = (function($this) {
							var $r;
							var vnode5 = ch2[startIdx2];
							var i15;
							var data1 = vnode5.data;
							if(data1 != undefined) {
								if((i15 = data1.hook) != undefined && (i15 = i15.init) != undefined) i15(vnode5);
								if((i15 = data1.vnode) != undefined) vnode5 = i15;
							}
							var elm20;
							var children1 = vnode5.children;
							var sel1 = vnode5.sel;
							if(sel1 != undefined) {
								var hashIdx1 = sel1.indexOf("#",0);
								var dotIdx1 = sel1.indexOf(".",hashIdx1);
								var hash1 = hashIdx1 > 0?hashIdx1:sel1.length;
								var dot1 = dotIdx1 > 0?dotIdx1:sel1.length;
								var tag1 = hashIdx1 != -1 || dotIdx1 != -1?sel1.slice(0,Math.min(hash1,dot1)):sel1;
								elm20 = vnode5.elm = data1 != undefined && (i15 = data1.ns) != undefined?window.document.createElementNS(i15,tag1):window.document.createElement(tag1);
								if(hash1 < dot1) {
									var value19 = sel1.slice(hash1 + 1,dot1);
									elm20.id = value19;
								}
								if(dotIdx1 > 0) {
									elm.className = sel.slice(dot+1).replace(snabbdom_engine_dom_PatchDom.rg, " ");;
								}
								if(Array.isArray(children1)) {
									i15 = 0;
									if(i15 < children1.length) do {
										var new_node3 = snabbdom_engine_dom_PatchDom.createElm(children1[i15],insertedVnodeQueue);
										elm20.appendChild(new_node3);
									} while((function($this) {
										var $r;
										++i15;
										$r = i15 < children1.length;
										return $r;
									}($this)));
								} else if(typeof vnode5.text == "string" || typeof vnode5.text == "number") {
									var element1 = window.document.createTextNode(vnode5.text);
									elm20.appendChild(element1);
								}
								var oldVnode3 = snabbdom_engine_dom_PatchDom.emptyNode;
								var key15;
								var cur15;
								var old9;
								var elm21 = vnode5.elm;
								var oldAttrs3 = oldVnode3.data.attrs == null?{ }:oldVnode3.data.attrs;
								var attrs3 = vnode5.data.attrs == null?{ }:vnode5.data.attrs;
								var _g37 = 0;
								var _g120 = Object.keys(attrs3);
								while(_g37 < _g120.length) {
									var key16 = _g120[_g37];
									++_g37;
									cur15 = attrs3[key16];
									old9 = oldAttrs3[key16];
									if(old9 != cur15) {
										if(!cur15 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key16]) elm21.removeAttribute(key16); else {
											var value20 = cur15;
											elm21.setAttribute(key16,value20);
										}
									}
								}
								var _g38 = 0;
								var _g121 = Object.keys(oldAttrs3);
								while(_g38 < _g121.length) {
									var key17 = _g121[_g38];
									++_g38;
									if(!Object.prototype.hasOwnProperty.call(attrs3,key17)) elm21.removeAttribute(key17);
								}
								var key18;
								var cur16;
								var old10;
								var elm22 = vnode5.elm;
								var oldProps3 = oldVnode3.data.props == null?{ }:oldVnode3.data.props;
								var props4 = vnode5.data.props == null?{ }:vnode5.data.props;
								var _g39 = 0;
								var _g122 = Object.keys(props4);
								while(_g39 < _g122.length) {
									var key19 = _g122[_g39];
									++_g39;
									cur16 = props4[key19];
									old10 = oldProps3[key19];
									if(old10 != cur16) {
										var value21 = cur16;
										elm22[key19] = value21;
									}
								}
								var cur17;
								var name25;
								var elm23 = vnode5.elm;
								var oldClass3 = oldVnode3.data.classes == null?{ }:oldVnode3.data.classes;
								var klass3 = vnode5.data.classes == null?{ }:vnode5.data.classes;
								var _g40 = 0;
								var _g123 = Object.keys(klass3);
								while(_g40 < _g123.length) {
									var name26 = _g123[_g40];
									++_g40;
									cur17 = klass3[name26];
									if(cur17 != oldClass3[name26]) {
										if(cur17 == "add") elm23.classList.add(name26); else if(cur17 == "remove") elm23.classList.remove(name26);
									}
								}
								var cur18;
								var name27;
								var elm24 = vnode5.elm;
								var oldStyle3 = oldVnode3.data.style == null?{ }:oldVnode3.data.style;
								var style5 = vnode5.data.style == null?{ }:vnode5.data.style;
								var oldHasDel3 = Object.prototype.hasOwnProperty.call(oldStyle3,"delayed");
								var _g41 = 0;
								var _g124 = Object.keys(style5);
								while(_g41 < _g124.length) {
									var name28 = _g124[_g41];
									++_g41;
									cur18 = style5[name28];
									if(name28 == "delayed") {
										var delayed3 = style5.delayed;
										var oldDelayed3 = oldStyle3.delayed;
										var _g212 = 0;
										var _g310 = Object.keys(delayed3);
										while(_g212 < _g310.length) {
											var name29 = _g310[_g212];
											++_g212;
											cur18 = delayed3[name29];
											if(!oldHasDel3 || cur18 != oldDelayed3[name29]) {
												var obj3 = [elm24.style];
												var prop3 = [name29];
												var val3 = [cur18];
												var fn3 = [(function(val3,prop3,obj3) {
													return function(i16) {
														var value22 = val3[0];
														obj3[0][prop3[0]] = value22;
													};
												})(val3,prop3,obj3)];
												window.requestAnimationFrame((function(fn3) {
													return function(i17) {
														window.requestAnimationFrame(fn3[0]);
													};
												})(fn3));
											}
										}
									} else if(name28 != "remove" && cur18 != oldStyle3[name28]) elm24.style[name28] = cur18;
								}
								var name30;
								var cur19;
								var old11;
								var elm25 = vnode5.elm;
								var oldOn3 = oldVnode3.data.on == null?{ }:oldVnode3.data.on;
								var on3 = vnode5.data.on == null?{ }:vnode5.data.on;
								js_Browser.alert(oldVnode3);
								if(on3 != null) {
									var _g42 = 0;
									var _g125 = Object.keys(on3);
									while(_g42 < _g125.length) {
										var name31 = _g125[_g42];
										++_g42;
										js_Browser.alert(name31);
										cur19 = on3[name31];
										old11 = oldOn3[name31];
										if(old11 == null) {
											if(Array.isArray(cur19)) elm25.addEventListener(name31,(function($this) {
												var $r;
												var arr3 = [cur19];
												$r = (function(arr3) {
													return function(ev7) {
														if(arr3[0].length == 2) arr3[0][0](arr3[0][1]); else arr3[0][0].apply(undefined,arr3[0].slice(1));
													};
												})(arr3);
												return $r;
											}($this))); else {
												cur19 = { fn : cur19};
												var value23 = cur19;
												on3[name31] = value23;
												elm25.addEventListener(name31,(function($this) {
													var $r;
													var o6 = [cur19];
													$r = (function(o6) {
														return function(ev8) {
															o6[0].fn(ev8);
														};
													})(o6);
													return $r;
												}($this)));
											}
										} else if(Array.isArray(old11)) {
											var o7 = old11;
											o7.length = cur19.length;
											var _g213 = 0;
											while(_g213 < o7.length) {
												var el3 = o7[_g213];
												++_g213;
												old11[el3] = cur19[el3];
											}
											var value24 = old11;
											on3[name31] = value24;
										} else {
											old11.fn = cur19;
											var value25 = old11;
											on3[name31] = value25;
										}
									}
								}
								if(vnode5.data != null) {
									i15 = vnode5.data.hook;
									if(i15 != undefined) {
										if(i15.create) i15.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode5);
										if(i15.insert) insertedVnodeQueue.push(vnode5);
									}
								}
							} else elm20 = vnode5.elm = window.document.createTextNode(vnode5.text);
							$r = vnode5.elm;
							return $r;
						}(this));
						elm14.insertBefore(new_node2,null);
					} while((function($this) {
						var $r;
						++startIdx2;
						$r = startIdx2 <= endIdx2;
						return $r;
					}(this)));
				} else if(oldCh2 != undefined) {
					var startIdx3 = 0;
					var endIdx3 = oldCh2.length - 1;
					var y1;
					y1 = 0;
					if(startIdx3 <= endIdx3) do {
						var i18;
						var listeners1;
						var rm3 = null;
						var ch3 = oldCh2[startIdx3];
						if(ch3 != undefined) {
							if(ch3.sel != undefined) {
								var vnode6 = ch3;
								var i19 = vnode6.data;
								var j1;
								if(i19 != undefined) {
									if((i19 = i19.hook) != undefined && (i19 = i19.destroy) != undefined) i19(vnode6);
									var style6 = null;
									var name32;
									var elm26 = vnode6.elm;
									var s2 = vnode6.data.style;
									if(s2 == null) null; else {
										style6 = s2.destroy;
										if(style6 == null) null; else {
											var _g43 = 0;
											var _g126 = Object.keys(style6);
											while(_g43 < _g126.length) {
												var name33 = _g126[_g43];
												++_g43;
												elm26.style[name33] = style6[name33];
											}
										}
									}
									if((i19 = vnode6.children) != undefined) {
										j1 = 0;
										if(j1 < vnode6.children.length) do snabbdom_engine_dom_PatchDom.invokeDestroyHook(vnode6.children[j1]); while((function($this) {
											var $r;
											++j1;
											$r = j1 < vnode6.children.length;
											return $r;
										}(this)));
									}
								}
								var vnode7 = ch3;
								var rm4 = rm3;
								var rm5 = [rm4];
								var s3 = vnode7.data.style;
								if(!s3 || !s3.remove) {
									if(rm5[0] != null) rm5[0]();
									null;
								} else {
									var name34;
									var elm27 = [vnode7.elm];
									var idx1;
									var i20 = 0;
									var maxDur1 = 0;
									var compStyle1;
									var style7 = s3.remove;
									var amount1 = [0];
									var applied1 = [];
									var _g44 = 0;
									var _g127 = Object.keys(style7);
									while(_g44 < _g127.length) {
										var name35 = _g127[_g44];
										++_g44;
										applied1.push(name35);
										elm27[0].style[name35] = style7[name35];
									}
									compStyle1 = window.getComputedStyle(elm27[0]);
									var props5 = compStyle1["transition-property"].split(", ");
									var i21;
									i21 = 0;
									if(i21 < props5.length) do if(HxOverrides.indexOf(applied1,props5[i21],0) != -1) amount1[0]++; while((function($this) {
										var $r;
										++i21;
										$r = i21 < props5.length;
										return $r;
									}(this)));
									elm27[0].addEventListener("transitionend",(function(amount1,elm27,rm5) {
										return function(ev9) {
											if(ev9.target == elm27[0]) --amount1[0];
											if(amount1[0] == 0) rm5[0]();
										};
									})(amount1,elm27,rm5));
								}
								if((i18 = ch3.data) != undefined && (i18 = i18.hook) != undefined && (i18 = i18.remove) != undefined) i18(ch3,rm3); else {
									console.log("remove");
									if(rm3 != null) rm3();
									elm14.removeChild(ch3.elm);
								}
							} else elm14.removeChild(ch3.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx3;
						$r = startIdx3 <= endIdx3;
						return $r;
					}(this)));
				}
			} else if(oldVnode2.text != vnode4.text) elm14.textContent = vnode4.text;
			if(hook1 != undefined && (i11 = hook1.postpatch) != undefined) i11(oldVnode2,vnode4);
		}
		oldEndVnode = oldCh[--oldEndIdx];
		newEndVnode = newCh[--newEndIdx];
	} else if(oldStartVnode.key == newEndVnode.key && oldStartVnode.sel == newEndVnode.sel) {
		var oldVnode4 = oldStartVnode;
		var vnode8 = newEndVnode;
		var i22;
		var hook2;
		if((i22 = vnode8.data) != undefined && (hook2 = i22.hook) != undefined && (i22 = hook2.prepatch) != undefined) i22(oldVnode4,vnode8);
		if((i22 = oldVnode4.data) != undefined && (i22 = i22.vnode) != undefined) oldVnode4 = i22;
		if((i22 = vnode8.data) != undefined && (i22 = i22.vnode) != undefined) vnode8 = i22;
		var elm28 = vnode8.elm = oldVnode4.elm;
		var oldCh3 = oldVnode4.children;
		var ch4 = vnode8.children;
		if(oldVnode4 == vnode8) null; else {
			if(vnode8.data != undefined) {
				var key20;
				var cur20;
				var old12;
				var elm29 = vnode8.elm;
				var oldAttrs4 = oldVnode4.data.attrs == null?{ }:oldVnode4.data.attrs;
				var attrs4 = vnode8.data.attrs == null?{ }:vnode8.data.attrs;
				var _g45 = 0;
				var _g128 = Object.keys(attrs4);
				while(_g45 < _g128.length) {
					var key21 = _g128[_g45];
					++_g45;
					cur20 = attrs4[key21];
					old12 = oldAttrs4[key21];
					if(old12 != cur20) {
						if(!cur20 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key21]) elm29.removeAttribute(key21); else {
							var value26 = cur20;
							elm29.setAttribute(key21,value26);
						}
					}
				}
				var _g46 = 0;
				var _g129 = Object.keys(oldAttrs4);
				while(_g46 < _g129.length) {
					var key22 = _g129[_g46];
					++_g46;
					if(!Object.prototype.hasOwnProperty.call(attrs4,key22)) elm29.removeAttribute(key22);
				}
				var key23;
				var cur21;
				var old13;
				var elm30 = vnode8.elm;
				var oldProps4 = oldVnode4.data.props == null?{ }:oldVnode4.data.props;
				var props6 = vnode8.data.props == null?{ }:vnode8.data.props;
				var _g47 = 0;
				var _g130 = Object.keys(props6);
				while(_g47 < _g130.length) {
					var key24 = _g130[_g47];
					++_g47;
					cur21 = props6[key24];
					old13 = oldProps4[key24];
					if(old13 != cur21) {
						var value27 = cur21;
						elm30[key24] = value27;
					}
				}
				var cur22;
				var name36;
				var elm31 = vnode8.elm;
				var oldClass4 = oldVnode4.data.classes == null?{ }:oldVnode4.data.classes;
				var klass4 = vnode8.data.classes == null?{ }:vnode8.data.classes;
				var _g48 = 0;
				var _g131 = Object.keys(klass4);
				while(_g48 < _g131.length) {
					var name37 = _g131[_g48];
					++_g48;
					cur22 = klass4[name37];
					if(cur22 != oldClass4[name37]) {
						if(cur22 == "add") elm31.classList.add(name37); else if(cur22 == "remove") elm31.classList.remove(name37);
					}
				}
				var cur23;
				var name38;
				var elm32 = vnode8.elm;
				var oldStyle4 = oldVnode4.data.style == null?{ }:oldVnode4.data.style;
				var style8 = vnode8.data.style == null?{ }:vnode8.data.style;
				var oldHasDel4 = Object.prototype.hasOwnProperty.call(oldStyle4,"delayed");
				var _g49 = 0;
				var _g132 = Object.keys(style8);
				while(_g49 < _g132.length) {
					var name39 = _g132[_g49];
					++_g49;
					cur23 = style8[name39];
					if(name39 == "delayed") {
						var delayed4 = style8.delayed;
						var oldDelayed4 = oldStyle4.delayed;
						var _g214 = 0;
						var _g311 = Object.keys(delayed4);
						while(_g214 < _g311.length) {
							var name40 = _g311[_g214];
							++_g214;
							cur23 = delayed4[name40];
							if(!oldHasDel4 || cur23 != oldDelayed4[name40]) {
								var obj4 = [elm32.style];
								var prop4 = [name40];
								var val4 = [cur23];
								var fn4 = [(function(val4,prop4,obj4) {
									return function(i23) {
										var value28 = val4[0];
										obj4[0][prop4[0]] = value28;
									};
								})(val4,prop4,obj4)];
								window.requestAnimationFrame((function(fn4) {
									return function(i24) {
										window.requestAnimationFrame(fn4[0]);
									};
								})(fn4));
							}
						}
					} else if(name39 != "remove" && cur23 != oldStyle4[name39]) elm32.style[name39] = cur23;
				}
				var name41;
				var cur24;
				var old14;
				var elm33 = vnode8.elm;
				var oldOn4 = oldVnode4.data.on == null?{ }:oldVnode4.data.on;
				var on4 = vnode8.data.on == null?{ }:vnode8.data.on;
				js_Browser.alert(oldVnode4);
				if(on4 != null) {
					var _g50 = 0;
					var _g133 = Object.keys(on4);
					while(_g50 < _g133.length) {
						var name42 = _g133[_g50];
						++_g50;
						js_Browser.alert(name42);
						cur24 = on4[name42];
						old14 = oldOn4[name42];
						if(old14 == null) {
							if(Array.isArray(cur24)) elm33.addEventListener(name42,(function($this) {
								var $r;
								var arr4 = [cur24];
								$r = (function(arr4) {
									return function(ev10) {
										if(arr4[0].length == 2) arr4[0][0](arr4[0][1]); else arr4[0][0].apply(undefined,arr4[0].slice(1));
									};
								})(arr4);
								return $r;
							}(this))); else {
								cur24 = { fn : cur24};
								var value29 = cur24;
								on4[name42] = value29;
								elm33.addEventListener(name42,(function($this) {
									var $r;
									var o8 = [cur24];
									$r = (function(o8) {
										return function(ev11) {
											o8[0].fn(ev11);
										};
									})(o8);
									return $r;
								}(this)));
							}
						} else if(Array.isArray(old14)) {
							var o9 = old14;
							o9.length = cur24.length;
							var _g215 = 0;
							while(_g215 < o9.length) {
								var el4 = o9[_g215];
								++_g215;
								old14[el4] = cur24[el4];
							}
							var value30 = old14;
							on4[name42] = value30;
						} else {
							old14.fn = cur24;
							var value31 = old14;
							on4[name42] = value31;
						}
					}
				}
				i22 = vnode8.data.hook;
				if(i22 != undefined && (i22 = i22.update) != undefined) i22(oldVnode4,vnode8);
			}
			if(vnode8.text == undefined) {
				if(oldCh3 != undefined && ch4 != undefined) {
					if(oldCh3 != ch4) snabbdom_engine_dom_PatchDom.updateChildren(elm28,oldCh3,ch4,insertedVnodeQueue);
				} else if(ch4 != undefined) {
					var startIdx4 = 0;
					var endIdx4 = ch4.length - 1;
					var i25;
					var new_node4;
					i25 = 0;
					if(startIdx4 <= endIdx4) do {
						new_node4 = (function($this) {
							var $r;
							var vnode9 = ch4[startIdx4];
							var i26;
							var data2 = vnode9.data;
							if(data2 != undefined) {
								if((i26 = data2.hook) != undefined && (i26 = i26.init) != undefined) i26(vnode9);
								if((i26 = data2.vnode) != undefined) vnode9 = i26;
							}
							var elm34;
							var children2 = vnode9.children;
							var sel2 = vnode9.sel;
							if(sel2 != undefined) {
								var hashIdx2 = sel2.indexOf("#",0);
								var dotIdx2 = sel2.indexOf(".",hashIdx2);
								var hash2 = hashIdx2 > 0?hashIdx2:sel2.length;
								var dot2 = dotIdx2 > 0?dotIdx2:sel2.length;
								var tag2 = hashIdx2 != -1 || dotIdx2 != -1?sel2.slice(0,Math.min(hash2,dot2)):sel2;
								elm34 = vnode9.elm = data2 != undefined && (i26 = data2.ns) != undefined?window.document.createElementNS(i26,tag2):window.document.createElement(tag2);
								if(hash2 < dot2) {
									var value32 = sel2.slice(hash2 + 1,dot2);
									elm34.id = value32;
								}
								if(dotIdx2 > 0) {
									elm.className = sel.slice(dot+1).replace(snabbdom_engine_dom_PatchDom.rg, " ");;
								}
								if(Array.isArray(children2)) {
									i26 = 0;
									if(i26 < children2.length) do {
										var new_node5 = snabbdom_engine_dom_PatchDom.createElm(children2[i26],insertedVnodeQueue);
										elm34.appendChild(new_node5);
									} while((function($this) {
										var $r;
										++i26;
										$r = i26 < children2.length;
										return $r;
									}($this)));
								} else if(typeof vnode9.text == "string" || typeof vnode9.text == "number") {
									var element2 = window.document.createTextNode(vnode9.text);
									elm34.appendChild(element2);
								}
								var oldVnode5 = snabbdom_engine_dom_PatchDom.emptyNode;
								var key25;
								var cur25;
								var old15;
								var elm35 = vnode9.elm;
								var oldAttrs5 = oldVnode5.data.attrs == null?{ }:oldVnode5.data.attrs;
								var attrs5 = vnode9.data.attrs == null?{ }:vnode9.data.attrs;
								var _g51 = 0;
								var _g134 = Object.keys(attrs5);
								while(_g51 < _g134.length) {
									var key26 = _g134[_g51];
									++_g51;
									cur25 = attrs5[key26];
									old15 = oldAttrs5[key26];
									if(old15 != cur25) {
										if(!cur25 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key26]) elm35.removeAttribute(key26); else {
											var value33 = cur25;
											elm35.setAttribute(key26,value33);
										}
									}
								}
								var _g52 = 0;
								var _g135 = Object.keys(oldAttrs5);
								while(_g52 < _g135.length) {
									var key27 = _g135[_g52];
									++_g52;
									if(!Object.prototype.hasOwnProperty.call(attrs5,key27)) elm35.removeAttribute(key27);
								}
								var key28;
								var cur26;
								var old16;
								var elm36 = vnode9.elm;
								var oldProps5 = oldVnode5.data.props == null?{ }:oldVnode5.data.props;
								var props7 = vnode9.data.props == null?{ }:vnode9.data.props;
								var _g53 = 0;
								var _g136 = Object.keys(props7);
								while(_g53 < _g136.length) {
									var key29 = _g136[_g53];
									++_g53;
									cur26 = props7[key29];
									old16 = oldProps5[key29];
									if(old16 != cur26) {
										var value34 = cur26;
										elm36[key29] = value34;
									}
								}
								var cur27;
								var name43;
								var elm37 = vnode9.elm;
								var oldClass5 = oldVnode5.data.classes == null?{ }:oldVnode5.data.classes;
								var klass5 = vnode9.data.classes == null?{ }:vnode9.data.classes;
								var _g54 = 0;
								var _g137 = Object.keys(klass5);
								while(_g54 < _g137.length) {
									var name44 = _g137[_g54];
									++_g54;
									cur27 = klass5[name44];
									if(cur27 != oldClass5[name44]) {
										if(cur27 == "add") elm37.classList.add(name44); else if(cur27 == "remove") elm37.classList.remove(name44);
									}
								}
								var cur28;
								var name45;
								var elm38 = vnode9.elm;
								var oldStyle5 = oldVnode5.data.style == null?{ }:oldVnode5.data.style;
								var style9 = vnode9.data.style == null?{ }:vnode9.data.style;
								var oldHasDel5 = Object.prototype.hasOwnProperty.call(oldStyle5,"delayed");
								var _g55 = 0;
								var _g138 = Object.keys(style9);
								while(_g55 < _g138.length) {
									var name46 = _g138[_g55];
									++_g55;
									cur28 = style9[name46];
									if(name46 == "delayed") {
										var delayed5 = style9.delayed;
										var oldDelayed5 = oldStyle5.delayed;
										var _g216 = 0;
										var _g312 = Object.keys(delayed5);
										while(_g216 < _g312.length) {
											var name47 = _g312[_g216];
											++_g216;
											cur28 = delayed5[name47];
											if(!oldHasDel5 || cur28 != oldDelayed5[name47]) {
												var obj5 = [elm38.style];
												var prop5 = [name47];
												var val5 = [cur28];
												var fn5 = [(function(val5,prop5,obj5) {
													return function(i27) {
														var value35 = val5[0];
														obj5[0][prop5[0]] = value35;
													};
												})(val5,prop5,obj5)];
												window.requestAnimationFrame((function(fn5) {
													return function(i28) {
														window.requestAnimationFrame(fn5[0]);
													};
												})(fn5));
											}
										}
									} else if(name46 != "remove" && cur28 != oldStyle5[name46]) elm38.style[name46] = cur28;
								}
								var name48;
								var cur29;
								var old17;
								var elm39 = vnode9.elm;
								var oldOn5 = oldVnode5.data.on == null?{ }:oldVnode5.data.on;
								var on5 = vnode9.data.on == null?{ }:vnode9.data.on;
								js_Browser.alert(oldVnode5);
								if(on5 != null) {
									var _g56 = 0;
									var _g139 = Object.keys(on5);
									while(_g56 < _g139.length) {
										var name49 = _g139[_g56];
										++_g56;
										js_Browser.alert(name49);
										cur29 = on5[name49];
										old17 = oldOn5[name49];
										if(old17 == null) {
											if(Array.isArray(cur29)) elm39.addEventListener(name49,(function($this) {
												var $r;
												var arr5 = [cur29];
												$r = (function(arr5) {
													return function(ev12) {
														if(arr5[0].length == 2) arr5[0][0](arr5[0][1]); else arr5[0][0].apply(undefined,arr5[0].slice(1));
													};
												})(arr5);
												return $r;
											}($this))); else {
												cur29 = { fn : cur29};
												var value36 = cur29;
												on5[name49] = value36;
												elm39.addEventListener(name49,(function($this) {
													var $r;
													var o10 = [cur29];
													$r = (function(o10) {
														return function(ev13) {
															o10[0].fn(ev13);
														};
													})(o10);
													return $r;
												}($this)));
											}
										} else if(Array.isArray(old17)) {
											var o11 = old17;
											o11.length = cur29.length;
											var _g217 = 0;
											while(_g217 < o11.length) {
												var el5 = o11[_g217];
												++_g217;
												old17[el5] = cur29[el5];
											}
											var value37 = old17;
											on5[name49] = value37;
										} else {
											old17.fn = cur29;
											var value38 = old17;
											on5[name49] = value38;
										}
									}
								}
								if(vnode9.data != null) {
									i26 = vnode9.data.hook;
									if(i26 != undefined) {
										if(i26.create) i26.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode9);
										if(i26.insert) insertedVnodeQueue.push(vnode9);
									}
								}
							} else elm34 = vnode9.elm = window.document.createTextNode(vnode9.text);
							$r = vnode9.elm;
							return $r;
						}(this));
						elm28.insertBefore(new_node4,null);
					} while((function($this) {
						var $r;
						++startIdx4;
						$r = startIdx4 <= endIdx4;
						return $r;
					}(this)));
				} else if(oldCh3 != undefined) {
					var startIdx5 = 0;
					var endIdx5 = oldCh3.length - 1;
					var y2;
					y2 = 0;
					if(startIdx5 <= endIdx5) do {
						var i29;
						var listeners2;
						var rm6 = null;
						var ch5 = oldCh3[startIdx5];
						if(ch5 != undefined) {
							if(ch5.sel != undefined) {
								var vnode10 = ch5;
								var i30 = vnode10.data;
								var j2;
								if(i30 != undefined) {
									if((i30 = i30.hook) != undefined && (i30 = i30.destroy) != undefined) i30(vnode10);
									var style10 = null;
									var name50;
									var elm40 = vnode10.elm;
									var s4 = vnode10.data.style;
									if(s4 == null) null; else {
										style10 = s4.destroy;
										if(style10 == null) null; else {
											var _g57 = 0;
											var _g140 = Object.keys(style10);
											while(_g57 < _g140.length) {
												var name51 = _g140[_g57];
												++_g57;
												elm40.style[name51] = style10[name51];
											}
										}
									}
									if((i30 = vnode10.children) != undefined) {
										j2 = 0;
										if(j2 < vnode10.children.length) do snabbdom_engine_dom_PatchDom.invokeDestroyHook(vnode10.children[j2]); while((function($this) {
											var $r;
											++j2;
											$r = j2 < vnode10.children.length;
											return $r;
										}(this)));
									}
								}
								var vnode11 = ch5;
								var rm7 = rm6;
								var rm8 = [rm7];
								var s5 = vnode11.data.style;
								if(!s5 || !s5.remove) {
									if(rm8[0] != null) rm8[0]();
									null;
								} else {
									var name52;
									var elm41 = [vnode11.elm];
									var idx2;
									var i31 = 0;
									var maxDur2 = 0;
									var compStyle2;
									var style11 = s5.remove;
									var amount2 = [0];
									var applied2 = [];
									var _g58 = 0;
									var _g141 = Object.keys(style11);
									while(_g58 < _g141.length) {
										var name53 = _g141[_g58];
										++_g58;
										applied2.push(name53);
										elm41[0].style[name53] = style11[name53];
									}
									compStyle2 = window.getComputedStyle(elm41[0]);
									var props8 = compStyle2["transition-property"].split(", ");
									var i32;
									i32 = 0;
									if(i32 < props8.length) do if(HxOverrides.indexOf(applied2,props8[i32],0) != -1) amount2[0]++; while((function($this) {
										var $r;
										++i32;
										$r = i32 < props8.length;
										return $r;
									}(this)));
									elm41[0].addEventListener("transitionend",(function(amount2,elm41,rm8) {
										return function(ev14) {
											if(ev14.target == elm41[0]) --amount2[0];
											if(amount2[0] == 0) rm8[0]();
										};
									})(amount2,elm41,rm8));
								}
								if((i29 = ch5.data) != undefined && (i29 = i29.hook) != undefined && (i29 = i29.remove) != undefined) i29(ch5,rm6); else {
									console.log("remove");
									if(rm6 != null) rm6();
									elm28.removeChild(ch5.elm);
								}
							} else elm28.removeChild(ch5.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx5;
						$r = startIdx5 <= endIdx5;
						return $r;
					}(this)));
				}
			} else if(oldVnode4.text != vnode8.text) elm28.textContent = vnode8.text;
			if(hook2 != undefined && (i22 = hook2.postpatch) != undefined) i22(oldVnode4,vnode8);
		}
		parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling);
		oldStartVnode = oldCh[++oldStartIdx];
		newEndVnode = newCh[--newEndIdx];
	} else if(oldEndVnode.key == newStartVnode.key && oldEndVnode.sel == newStartVnode.sel) {
		var oldVnode6 = oldEndVnode;
		var vnode12 = newStartVnode;
		var i33;
		var hook3;
		if((i33 = vnode12.data) != undefined && (hook3 = i33.hook) != undefined && (i33 = hook3.prepatch) != undefined) i33(oldVnode6,vnode12);
		if((i33 = oldVnode6.data) != undefined && (i33 = i33.vnode) != undefined) oldVnode6 = i33;
		if((i33 = vnode12.data) != undefined && (i33 = i33.vnode) != undefined) vnode12 = i33;
		var elm42 = vnode12.elm = oldVnode6.elm;
		var oldCh4 = oldVnode6.children;
		var ch6 = vnode12.children;
		if(oldVnode6 == vnode12) null; else {
			if(vnode12.data != undefined) {
				var key30;
				var cur30;
				var old18;
				var elm43 = vnode12.elm;
				var oldAttrs6 = oldVnode6.data.attrs == null?{ }:oldVnode6.data.attrs;
				var attrs6 = vnode12.data.attrs == null?{ }:vnode12.data.attrs;
				var _g59 = 0;
				var _g142 = Object.keys(attrs6);
				while(_g59 < _g142.length) {
					var key31 = _g142[_g59];
					++_g59;
					cur30 = attrs6[key31];
					old18 = oldAttrs6[key31];
					if(old18 != cur30) {
						if(!cur30 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key31]) elm43.removeAttribute(key31); else {
							var value39 = cur30;
							elm43.setAttribute(key31,value39);
						}
					}
				}
				var _g60 = 0;
				var _g143 = Object.keys(oldAttrs6);
				while(_g60 < _g143.length) {
					var key32 = _g143[_g60];
					++_g60;
					if(!Object.prototype.hasOwnProperty.call(attrs6,key32)) elm43.removeAttribute(key32);
				}
				var key33;
				var cur31;
				var old19;
				var elm44 = vnode12.elm;
				var oldProps6 = oldVnode6.data.props == null?{ }:oldVnode6.data.props;
				var props9 = vnode12.data.props == null?{ }:vnode12.data.props;
				var _g61 = 0;
				var _g144 = Object.keys(props9);
				while(_g61 < _g144.length) {
					var key34 = _g144[_g61];
					++_g61;
					cur31 = props9[key34];
					old19 = oldProps6[key34];
					if(old19 != cur31) {
						var value40 = cur31;
						elm44[key34] = value40;
					}
				}
				var cur32;
				var name54;
				var elm45 = vnode12.elm;
				var oldClass6 = oldVnode6.data.classes == null?{ }:oldVnode6.data.classes;
				var klass6 = vnode12.data.classes == null?{ }:vnode12.data.classes;
				var _g62 = 0;
				var _g145 = Object.keys(klass6);
				while(_g62 < _g145.length) {
					var name55 = _g145[_g62];
					++_g62;
					cur32 = klass6[name55];
					if(cur32 != oldClass6[name55]) {
						if(cur32 == "add") elm45.classList.add(name55); else if(cur32 == "remove") elm45.classList.remove(name55);
					}
				}
				var cur33;
				var name56;
				var elm46 = vnode12.elm;
				var oldStyle6 = oldVnode6.data.style == null?{ }:oldVnode6.data.style;
				var style12 = vnode12.data.style == null?{ }:vnode12.data.style;
				var oldHasDel6 = Object.prototype.hasOwnProperty.call(oldStyle6,"delayed");
				var _g63 = 0;
				var _g146 = Object.keys(style12);
				while(_g63 < _g146.length) {
					var name57 = _g146[_g63];
					++_g63;
					cur33 = style12[name57];
					if(name57 == "delayed") {
						var delayed6 = style12.delayed;
						var oldDelayed6 = oldStyle6.delayed;
						var _g218 = 0;
						var _g313 = Object.keys(delayed6);
						while(_g218 < _g313.length) {
							var name58 = _g313[_g218];
							++_g218;
							cur33 = delayed6[name58];
							if(!oldHasDel6 || cur33 != oldDelayed6[name58]) {
								var obj6 = [elm46.style];
								var prop6 = [name58];
								var val6 = [cur33];
								var fn6 = [(function(val6,prop6,obj6) {
									return function(i34) {
										var value41 = val6[0];
										obj6[0][prop6[0]] = value41;
									};
								})(val6,prop6,obj6)];
								window.requestAnimationFrame((function(fn6) {
									return function(i35) {
										window.requestAnimationFrame(fn6[0]);
									};
								})(fn6));
							}
						}
					} else if(name57 != "remove" && cur33 != oldStyle6[name57]) elm46.style[name57] = cur33;
				}
				var name59;
				var cur34;
				var old20;
				var elm47 = vnode12.elm;
				var oldOn6 = oldVnode6.data.on == null?{ }:oldVnode6.data.on;
				var on6 = vnode12.data.on == null?{ }:vnode12.data.on;
				js_Browser.alert(oldVnode6);
				if(on6 != null) {
					var _g64 = 0;
					var _g147 = Object.keys(on6);
					while(_g64 < _g147.length) {
						var name60 = _g147[_g64];
						++_g64;
						js_Browser.alert(name60);
						cur34 = on6[name60];
						old20 = oldOn6[name60];
						if(old20 == null) {
							if(Array.isArray(cur34)) elm47.addEventListener(name60,(function($this) {
								var $r;
								var arr6 = [cur34];
								$r = (function(arr6) {
									return function(ev15) {
										if(arr6[0].length == 2) arr6[0][0](arr6[0][1]); else arr6[0][0].apply(undefined,arr6[0].slice(1));
									};
								})(arr6);
								return $r;
							}(this))); else {
								cur34 = { fn : cur34};
								var value42 = cur34;
								on6[name60] = value42;
								elm47.addEventListener(name60,(function($this) {
									var $r;
									var o12 = [cur34];
									$r = (function(o12) {
										return function(ev16) {
											o12[0].fn(ev16);
										};
									})(o12);
									return $r;
								}(this)));
							}
						} else if(Array.isArray(old20)) {
							var o13 = old20;
							o13.length = cur34.length;
							var _g219 = 0;
							while(_g219 < o13.length) {
								var el6 = o13[_g219];
								++_g219;
								old20[el6] = cur34[el6];
							}
							var value43 = old20;
							on6[name60] = value43;
						} else {
							old20.fn = cur34;
							var value44 = old20;
							on6[name60] = value44;
						}
					}
				}
				i33 = vnode12.data.hook;
				if(i33 != undefined && (i33 = i33.update) != undefined) i33(oldVnode6,vnode12);
			}
			if(vnode12.text == undefined) {
				if(oldCh4 != undefined && ch6 != undefined) {
					if(oldCh4 != ch6) snabbdom_engine_dom_PatchDom.updateChildren(elm42,oldCh4,ch6,insertedVnodeQueue);
				} else if(ch6 != undefined) {
					var startIdx6 = 0;
					var endIdx6 = ch6.length - 1;
					var i36;
					var new_node6;
					i36 = 0;
					if(startIdx6 <= endIdx6) do {
						new_node6 = (function($this) {
							var $r;
							var vnode13 = ch6[startIdx6];
							var i37;
							var data3 = vnode13.data;
							if(data3 != undefined) {
								if((i37 = data3.hook) != undefined && (i37 = i37.init) != undefined) i37(vnode13);
								if((i37 = data3.vnode) != undefined) vnode13 = i37;
							}
							var elm48;
							var children3 = vnode13.children;
							var sel3 = vnode13.sel;
							if(sel3 != undefined) {
								var hashIdx3 = sel3.indexOf("#",0);
								var dotIdx3 = sel3.indexOf(".",hashIdx3);
								var hash3 = hashIdx3 > 0?hashIdx3:sel3.length;
								var dot3 = dotIdx3 > 0?dotIdx3:sel3.length;
								var tag3 = hashIdx3 != -1 || dotIdx3 != -1?sel3.slice(0,Math.min(hash3,dot3)):sel3;
								elm48 = vnode13.elm = data3 != undefined && (i37 = data3.ns) != undefined?window.document.createElementNS(i37,tag3):window.document.createElement(tag3);
								if(hash3 < dot3) {
									var value45 = sel3.slice(hash3 + 1,dot3);
									elm48.id = value45;
								}
								if(dotIdx3 > 0) {
									elm.className = sel.slice(dot+1).replace(snabbdom_engine_dom_PatchDom.rg, " ");;
								}
								if(Array.isArray(children3)) {
									i37 = 0;
									if(i37 < children3.length) do {
										var new_node7 = snabbdom_engine_dom_PatchDom.createElm(children3[i37],insertedVnodeQueue);
										elm48.appendChild(new_node7);
									} while((function($this) {
										var $r;
										++i37;
										$r = i37 < children3.length;
										return $r;
									}($this)));
								} else if(typeof vnode13.text == "string" || typeof vnode13.text == "number") {
									var element3 = window.document.createTextNode(vnode13.text);
									elm48.appendChild(element3);
								}
								var oldVnode7 = snabbdom_engine_dom_PatchDom.emptyNode;
								var key35;
								var cur35;
								var old21;
								var elm49 = vnode13.elm;
								var oldAttrs7 = oldVnode7.data.attrs == null?{ }:oldVnode7.data.attrs;
								var attrs7 = vnode13.data.attrs == null?{ }:vnode13.data.attrs;
								var _g65 = 0;
								var _g148 = Object.keys(attrs7);
								while(_g65 < _g148.length) {
									var key36 = _g148[_g65];
									++_g65;
									cur35 = attrs7[key36];
									old21 = oldAttrs7[key36];
									if(old21 != cur35) {
										if(!cur35 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key36]) elm49.removeAttribute(key36); else {
											var value46 = cur35;
											elm49.setAttribute(key36,value46);
										}
									}
								}
								var _g66 = 0;
								var _g149 = Object.keys(oldAttrs7);
								while(_g66 < _g149.length) {
									var key37 = _g149[_g66];
									++_g66;
									if(!Object.prototype.hasOwnProperty.call(attrs7,key37)) elm49.removeAttribute(key37);
								}
								var key38;
								var cur36;
								var old22;
								var elm50 = vnode13.elm;
								var oldProps7 = oldVnode7.data.props == null?{ }:oldVnode7.data.props;
								var props10 = vnode13.data.props == null?{ }:vnode13.data.props;
								var _g67 = 0;
								var _g150 = Object.keys(props10);
								while(_g67 < _g150.length) {
									var key39 = _g150[_g67];
									++_g67;
									cur36 = props10[key39];
									old22 = oldProps7[key39];
									if(old22 != cur36) {
										var value47 = cur36;
										elm50[key39] = value47;
									}
								}
								var cur37;
								var name61;
								var elm51 = vnode13.elm;
								var oldClass7 = oldVnode7.data.classes == null?{ }:oldVnode7.data.classes;
								var klass7 = vnode13.data.classes == null?{ }:vnode13.data.classes;
								var _g68 = 0;
								var _g151 = Object.keys(klass7);
								while(_g68 < _g151.length) {
									var name62 = _g151[_g68];
									++_g68;
									cur37 = klass7[name62];
									if(cur37 != oldClass7[name62]) {
										if(cur37 == "add") elm51.classList.add(name62); else if(cur37 == "remove") elm51.classList.remove(name62);
									}
								}
								var cur38;
								var name63;
								var elm52 = vnode13.elm;
								var oldStyle7 = oldVnode7.data.style == null?{ }:oldVnode7.data.style;
								var style13 = vnode13.data.style == null?{ }:vnode13.data.style;
								var oldHasDel7 = Object.prototype.hasOwnProperty.call(oldStyle7,"delayed");
								var _g69 = 0;
								var _g152 = Object.keys(style13);
								while(_g69 < _g152.length) {
									var name64 = _g152[_g69];
									++_g69;
									cur38 = style13[name64];
									if(name64 == "delayed") {
										var delayed7 = style13.delayed;
										var oldDelayed7 = oldStyle7.delayed;
										var _g220 = 0;
										var _g314 = Object.keys(delayed7);
										while(_g220 < _g314.length) {
											var name65 = _g314[_g220];
											++_g220;
											cur38 = delayed7[name65];
											if(!oldHasDel7 || cur38 != oldDelayed7[name65]) {
												var obj7 = [elm52.style];
												var prop7 = [name65];
												var val7 = [cur38];
												var fn7 = [(function(val7,prop7,obj7) {
													return function(i38) {
														var value48 = val7[0];
														obj7[0][prop7[0]] = value48;
													};
												})(val7,prop7,obj7)];
												window.requestAnimationFrame((function(fn7) {
													return function(i39) {
														window.requestAnimationFrame(fn7[0]);
													};
												})(fn7));
											}
										}
									} else if(name64 != "remove" && cur38 != oldStyle7[name64]) elm52.style[name64] = cur38;
								}
								var name66;
								var cur39;
								var old23;
								var elm53 = vnode13.elm;
								var oldOn7 = oldVnode7.data.on == null?{ }:oldVnode7.data.on;
								var on7 = vnode13.data.on == null?{ }:vnode13.data.on;
								js_Browser.alert(oldVnode7);
								if(on7 != null) {
									var _g70 = 0;
									var _g153 = Object.keys(on7);
									while(_g70 < _g153.length) {
										var name67 = _g153[_g70];
										++_g70;
										js_Browser.alert(name67);
										cur39 = on7[name67];
										old23 = oldOn7[name67];
										if(old23 == null) {
											if(Array.isArray(cur39)) elm53.addEventListener(name67,(function($this) {
												var $r;
												var arr7 = [cur39];
												$r = (function(arr7) {
													return function(ev17) {
														if(arr7[0].length == 2) arr7[0][0](arr7[0][1]); else arr7[0][0].apply(undefined,arr7[0].slice(1));
													};
												})(arr7);
												return $r;
											}($this))); else {
												cur39 = { fn : cur39};
												var value49 = cur39;
												on7[name67] = value49;
												elm53.addEventListener(name67,(function($this) {
													var $r;
													var o14 = [cur39];
													$r = (function(o14) {
														return function(ev18) {
															o14[0].fn(ev18);
														};
													})(o14);
													return $r;
												}($this)));
											}
										} else if(Array.isArray(old23)) {
											var o15 = old23;
											o15.length = cur39.length;
											var _g221 = 0;
											while(_g221 < o15.length) {
												var el7 = o15[_g221];
												++_g221;
												old23[el7] = cur39[el7];
											}
											var value50 = old23;
											on7[name67] = value50;
										} else {
											old23.fn = cur39;
											var value51 = old23;
											on7[name67] = value51;
										}
									}
								}
								if(vnode13.data != null) {
									i37 = vnode13.data.hook;
									if(i37 != undefined) {
										if(i37.create) i37.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode13);
										if(i37.insert) insertedVnodeQueue.push(vnode13);
									}
								}
							} else elm48 = vnode13.elm = window.document.createTextNode(vnode13.text);
							$r = vnode13.elm;
							return $r;
						}(this));
						elm42.insertBefore(new_node6,null);
					} while((function($this) {
						var $r;
						++startIdx6;
						$r = startIdx6 <= endIdx6;
						return $r;
					}(this)));
				} else if(oldCh4 != undefined) {
					var startIdx7 = 0;
					var endIdx7 = oldCh4.length - 1;
					var y3;
					y3 = 0;
					if(startIdx7 <= endIdx7) do {
						var i40;
						var listeners3;
						var rm9 = null;
						var ch7 = oldCh4[startIdx7];
						if(ch7 != undefined) {
							if(ch7.sel != undefined) {
								var vnode14 = ch7;
								var i41 = vnode14.data;
								var j3;
								if(i41 != undefined) {
									if((i41 = i41.hook) != undefined && (i41 = i41.destroy) != undefined) i41(vnode14);
									var style14 = null;
									var name68;
									var elm54 = vnode14.elm;
									var s6 = vnode14.data.style;
									if(s6 == null) null; else {
										style14 = s6.destroy;
										if(style14 == null) null; else {
											var _g71 = 0;
											var _g154 = Object.keys(style14);
											while(_g71 < _g154.length) {
												var name69 = _g154[_g71];
												++_g71;
												elm54.style[name69] = style14[name69];
											}
										}
									}
									if((i41 = vnode14.children) != undefined) {
										j3 = 0;
										if(j3 < vnode14.children.length) do snabbdom_engine_dom_PatchDom.invokeDestroyHook(vnode14.children[j3]); while((function($this) {
											var $r;
											++j3;
											$r = j3 < vnode14.children.length;
											return $r;
										}(this)));
									}
								}
								var vnode15 = ch7;
								var rm10 = rm9;
								var rm11 = [rm10];
								var s7 = vnode15.data.style;
								if(!s7 || !s7.remove) {
									if(rm11[0] != null) rm11[0]();
									null;
								} else {
									var name70;
									var elm55 = [vnode15.elm];
									var idx3;
									var i42 = 0;
									var maxDur3 = 0;
									var compStyle3;
									var style15 = s7.remove;
									var amount3 = [0];
									var applied3 = [];
									var _g72 = 0;
									var _g155 = Object.keys(style15);
									while(_g72 < _g155.length) {
										var name71 = _g155[_g72];
										++_g72;
										applied3.push(name71);
										elm55[0].style[name71] = style15[name71];
									}
									compStyle3 = window.getComputedStyle(elm55[0]);
									var props11 = compStyle3["transition-property"].split(", ");
									var i43;
									i43 = 0;
									if(i43 < props11.length) do if(HxOverrides.indexOf(applied3,props11[i43],0) != -1) amount3[0]++; while((function($this) {
										var $r;
										++i43;
										$r = i43 < props11.length;
										return $r;
									}(this)));
									elm55[0].addEventListener("transitionend",(function(amount3,elm55,rm11) {
										return function(ev19) {
											if(ev19.target == elm55[0]) --amount3[0];
											if(amount3[0] == 0) rm11[0]();
										};
									})(amount3,elm55,rm11));
								}
								if((i40 = ch7.data) != undefined && (i40 = i40.hook) != undefined && (i40 = i40.remove) != undefined) i40(ch7,rm9); else {
									console.log("remove");
									if(rm9 != null) rm9();
									elm42.removeChild(ch7.elm);
								}
							} else elm42.removeChild(ch7.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx7;
						$r = startIdx7 <= endIdx7;
						return $r;
					}(this)));
				}
			} else if(oldVnode6.text != vnode12.text) elm42.textContent = vnode12.text;
			if(hook3 != undefined && (i33 = hook3.postpatch) != undefined) i33(oldVnode6,vnode12);
		}
		parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm);
		oldEndVnode = oldCh[--oldEndIdx];
		newStartVnode = newCh[++newStartIdx];
	} else {
		if(oldKeyToIdx == undefined) oldKeyToIdx = (function($this) {
			var $r;
			var children4 = oldCh;
			var i44;
			var map = { };
			var key40;
			{
				i44 = oldStartIdx;
				if(i44 <= oldEndIdx) do {
					key40 = children4[i44].key;
					if(key40 != undefined) map[key40] = i44;
				} while((function($this) {
					var $r;
					++i44;
					$r = i44 <= oldEndIdx;
					return $r;
				}($this)));
			}
			$r = map;
			return $r;
		}(this));
		idxInOld = oldKeyToIdx[newStartVnode.key];
		if(idxInOld == undefined) {
			var new_node9 = (function($this) {
				var $r;
				var vnode16 = newStartVnode;
				var i45;
				var data4 = vnode16.data;
				if(data4 != undefined) {
					if((i45 = data4.hook) != undefined && (i45 = i45.init) != undefined) i45(vnode16);
					if((i45 = data4.vnode) != undefined) vnode16 = i45;
				}
				var elm56;
				var children5 = vnode16.children;
				var sel4 = vnode16.sel;
				if(sel4 != undefined) {
					var hashIdx4 = sel4.indexOf("#",0);
					var dotIdx4 = sel4.indexOf(".",hashIdx4);
					var hash4 = hashIdx4 > 0?hashIdx4:sel4.length;
					var dot4 = dotIdx4 > 0?dotIdx4:sel4.length;
					var tag4 = hashIdx4 != -1 || dotIdx4 != -1?sel4.slice(0,Math.min(hash4,dot4)):sel4;
					elm56 = vnode16.elm = data4 != undefined && (i45 = data4.ns) != undefined?window.document.createElementNS(i45,tag4):window.document.createElement(tag4);
					if(hash4 < dot4) {
						var value52 = sel4.slice(hash4 + 1,dot4);
						elm56.id = value52;
					}
					if(dotIdx4 > 0) {
						elm.className = sel.slice(dot+1).replace(snabbdom_engine_dom_PatchDom.rg, " ");;
					}
					if(Array.isArray(children5)) {
						i45 = 0;
						if(i45 < children5.length) do {
							var new_node8 = snabbdom_engine_dom_PatchDom.createElm(children5[i45],insertedVnodeQueue);
							elm56.appendChild(new_node8);
						} while((function($this) {
							var $r;
							++i45;
							$r = i45 < children5.length;
							return $r;
						}($this)));
					} else if(typeof vnode16.text == "string" || typeof vnode16.text == "number") {
						var element4 = window.document.createTextNode(vnode16.text);
						elm56.appendChild(element4);
					}
					var oldVnode8 = snabbdom_engine_dom_PatchDom.emptyNode;
					var key41;
					var cur40;
					var old24;
					var elm57 = vnode16.elm;
					var oldAttrs8 = oldVnode8.data.attrs == null?{ }:oldVnode8.data.attrs;
					var attrs8 = vnode16.data.attrs == null?{ }:vnode16.data.attrs;
					var _g73 = 0;
					var _g156 = Object.keys(attrs8);
					while(_g73 < _g156.length) {
						var key42 = _g156[_g73];
						++_g73;
						cur40 = attrs8[key42];
						old24 = oldAttrs8[key42];
						if(old24 != cur40) {
							if(!cur40 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key42]) elm57.removeAttribute(key42); else {
								var value53 = cur40;
								elm57.setAttribute(key42,value53);
							}
						}
					}
					var _g74 = 0;
					var _g157 = Object.keys(oldAttrs8);
					while(_g74 < _g157.length) {
						var key43 = _g157[_g74];
						++_g74;
						if(!Object.prototype.hasOwnProperty.call(attrs8,key43)) elm57.removeAttribute(key43);
					}
					var key44;
					var cur41;
					var old25;
					var elm58 = vnode16.elm;
					var oldProps8 = oldVnode8.data.props == null?{ }:oldVnode8.data.props;
					var props12 = vnode16.data.props == null?{ }:vnode16.data.props;
					var _g75 = 0;
					var _g158 = Object.keys(props12);
					while(_g75 < _g158.length) {
						var key45 = _g158[_g75];
						++_g75;
						cur41 = props12[key45];
						old25 = oldProps8[key45];
						if(old25 != cur41) {
							var value54 = cur41;
							elm58[key45] = value54;
						}
					}
					var cur42;
					var name72;
					var elm59 = vnode16.elm;
					var oldClass8 = oldVnode8.data.classes == null?{ }:oldVnode8.data.classes;
					var klass8 = vnode16.data.classes == null?{ }:vnode16.data.classes;
					var _g76 = 0;
					var _g159 = Object.keys(klass8);
					while(_g76 < _g159.length) {
						var name73 = _g159[_g76];
						++_g76;
						cur42 = klass8[name73];
						if(cur42 != oldClass8[name73]) {
							if(cur42 == "add") elm59.classList.add(name73); else if(cur42 == "remove") elm59.classList.remove(name73);
						}
					}
					var cur43;
					var name74;
					var elm60 = vnode16.elm;
					var oldStyle8 = oldVnode8.data.style == null?{ }:oldVnode8.data.style;
					var style16 = vnode16.data.style == null?{ }:vnode16.data.style;
					var oldHasDel8 = Object.prototype.hasOwnProperty.call(oldStyle8,"delayed");
					var _g77 = 0;
					var _g160 = Object.keys(style16);
					while(_g77 < _g160.length) {
						var name75 = _g160[_g77];
						++_g77;
						cur43 = style16[name75];
						if(name75 == "delayed") {
							var delayed8 = style16.delayed;
							var oldDelayed8 = oldStyle8.delayed;
							var _g222 = 0;
							var _g315 = Object.keys(delayed8);
							while(_g222 < _g315.length) {
								var name76 = _g315[_g222];
								++_g222;
								cur43 = delayed8[name76];
								if(!oldHasDel8 || cur43 != oldDelayed8[name76]) {
									var obj8 = [elm60.style];
									var prop8 = [name76];
									var val8 = [cur43];
									var fn8 = [(function(val8,prop8,obj8) {
										return function(i46) {
											var value55 = val8[0];
											obj8[0][prop8[0]] = value55;
										};
									})(val8,prop8,obj8)];
									window.requestAnimationFrame((function(fn8) {
										return function(i47) {
											window.requestAnimationFrame(fn8[0]);
										};
									})(fn8));
								}
							}
						} else if(name75 != "remove" && cur43 != oldStyle8[name75]) elm60.style[name75] = cur43;
					}
					var name77;
					var cur44;
					var old26;
					var elm61 = vnode16.elm;
					var oldOn8 = oldVnode8.data.on == null?{ }:oldVnode8.data.on;
					var on8 = vnode16.data.on == null?{ }:vnode16.data.on;
					js_Browser.alert(oldVnode8);
					if(on8 != null) {
						var _g78 = 0;
						var _g161 = Object.keys(on8);
						while(_g78 < _g161.length) {
							var name78 = _g161[_g78];
							++_g78;
							js_Browser.alert(name78);
							cur44 = on8[name78];
							old26 = oldOn8[name78];
							if(old26 == null) {
								if(Array.isArray(cur44)) elm61.addEventListener(name78,(function($this) {
									var $r;
									var arr8 = [cur44];
									$r = (function(arr8) {
										return function(ev20) {
											if(arr8[0].length == 2) arr8[0][0](arr8[0][1]); else arr8[0][0].apply(undefined,arr8[0].slice(1));
										};
									})(arr8);
									return $r;
								}($this))); else {
									cur44 = { fn : cur44};
									var value56 = cur44;
									on8[name78] = value56;
									elm61.addEventListener(name78,(function($this) {
										var $r;
										var o16 = [cur44];
										$r = (function(o16) {
											return function(ev21) {
												o16[0].fn(ev21);
											};
										})(o16);
										return $r;
									}($this)));
								}
							} else if(Array.isArray(old26)) {
								var o17 = old26;
								o17.length = cur44.length;
								var _g223 = 0;
								while(_g223 < o17.length) {
									var el8 = o17[_g223];
									++_g223;
									old26[el8] = cur44[el8];
								}
								var value57 = old26;
								on8[name78] = value57;
							} else {
								old26.fn = cur44;
								var value58 = old26;
								on8[name78] = value58;
							}
						}
					}
					if(vnode16.data != null) {
						i45 = vnode16.data.hook;
						if(i45 != undefined) {
							if(i45.create) i45.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode16);
							if(i45.insert) insertedVnodeQueue.push(vnode16);
						}
					}
				} else elm56 = vnode16.elm = window.document.createTextNode(vnode16.text);
				$r = vnode16.elm;
				return $r;
			}(this));
			parentElm.insertBefore(new_node9,oldStartVnode.elm);
			newStartVnode = newCh[++newStartIdx];
		} else {
			elmToMove = oldCh[idxInOld];
			var oldVnode9 = elmToMove;
			var vnode17 = newStartVnode;
			var i48;
			var hook4;
			if((i48 = vnode17.data) != undefined && (hook4 = i48.hook) != undefined && (i48 = hook4.prepatch) != undefined) i48(oldVnode9,vnode17);
			if((i48 = oldVnode9.data) != undefined && (i48 = i48.vnode) != undefined) oldVnode9 = i48;
			if((i48 = vnode17.data) != undefined && (i48 = i48.vnode) != undefined) vnode17 = i48;
			var elm62 = vnode17.elm = oldVnode9.elm;
			var oldCh5 = oldVnode9.children;
			var ch8 = vnode17.children;
			if(oldVnode9 == vnode17) null; else {
				if(vnode17.data != undefined) {
					var key46;
					var cur45;
					var old27;
					var elm63 = vnode17.elm;
					var oldAttrs9 = oldVnode9.data.attrs == null?{ }:oldVnode9.data.attrs;
					var attrs9 = vnode17.data.attrs == null?{ }:vnode17.data.attrs;
					var _g79 = 0;
					var _g162 = Object.keys(attrs9);
					while(_g79 < _g162.length) {
						var key47 = _g162[_g79];
						++_g79;
						cur45 = attrs9[key47];
						old27 = oldAttrs9[key47];
						if(old27 != cur45) {
							if(!cur45 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key47]) elm63.removeAttribute(key47); else {
								var value59 = cur45;
								elm63.setAttribute(key47,value59);
							}
						}
					}
					var _g80 = 0;
					var _g163 = Object.keys(oldAttrs9);
					while(_g80 < _g163.length) {
						var key48 = _g163[_g80];
						++_g80;
						if(!Object.prototype.hasOwnProperty.call(attrs9,key48)) elm63.removeAttribute(key48);
					}
					var key49;
					var cur46;
					var old28;
					var elm64 = vnode17.elm;
					var oldProps9 = oldVnode9.data.props == null?{ }:oldVnode9.data.props;
					var props13 = vnode17.data.props == null?{ }:vnode17.data.props;
					var _g81 = 0;
					var _g164 = Object.keys(props13);
					while(_g81 < _g164.length) {
						var key50 = _g164[_g81];
						++_g81;
						cur46 = props13[key50];
						old28 = oldProps9[key50];
						if(old28 != cur46) {
							var value60 = cur46;
							elm64[key50] = value60;
						}
					}
					var cur47;
					var name79;
					var elm65 = vnode17.elm;
					var oldClass9 = oldVnode9.data.classes == null?{ }:oldVnode9.data.classes;
					var klass9 = vnode17.data.classes == null?{ }:vnode17.data.classes;
					var _g82 = 0;
					var _g165 = Object.keys(klass9);
					while(_g82 < _g165.length) {
						var name80 = _g165[_g82];
						++_g82;
						cur47 = klass9[name80];
						if(cur47 != oldClass9[name80]) {
							if(cur47 == "add") elm65.classList.add(name80); else if(cur47 == "remove") elm65.classList.remove(name80);
						}
					}
					var cur48;
					var name81;
					var elm66 = vnode17.elm;
					var oldStyle9 = oldVnode9.data.style == null?{ }:oldVnode9.data.style;
					var style17 = vnode17.data.style == null?{ }:vnode17.data.style;
					var oldHasDel9 = Object.prototype.hasOwnProperty.call(oldStyle9,"delayed");
					var _g83 = 0;
					var _g166 = Object.keys(style17);
					while(_g83 < _g166.length) {
						var name82 = _g166[_g83];
						++_g83;
						cur48 = style17[name82];
						if(name82 == "delayed") {
							var delayed9 = style17.delayed;
							var oldDelayed9 = oldStyle9.delayed;
							var _g224 = 0;
							var _g316 = Object.keys(delayed9);
							while(_g224 < _g316.length) {
								var name83 = _g316[_g224];
								++_g224;
								cur48 = delayed9[name83];
								if(!oldHasDel9 || cur48 != oldDelayed9[name83]) {
									var obj9 = [elm66.style];
									var prop9 = [name83];
									var val9 = [cur48];
									var fn9 = [(function(val9,prop9,obj9) {
										return function(i49) {
											var value61 = val9[0];
											obj9[0][prop9[0]] = value61;
										};
									})(val9,prop9,obj9)];
									window.requestAnimationFrame((function(fn9) {
										return function(i50) {
											window.requestAnimationFrame(fn9[0]);
										};
									})(fn9));
								}
							}
						} else if(name82 != "remove" && cur48 != oldStyle9[name82]) elm66.style[name82] = cur48;
					}
					var name84;
					var cur49;
					var old29;
					var elm67 = vnode17.elm;
					var oldOn9 = oldVnode9.data.on == null?{ }:oldVnode9.data.on;
					var on9 = vnode17.data.on == null?{ }:vnode17.data.on;
					js_Browser.alert(oldVnode9);
					if(on9 != null) {
						var _g84 = 0;
						var _g167 = Object.keys(on9);
						while(_g84 < _g167.length) {
							var name85 = _g167[_g84];
							++_g84;
							js_Browser.alert(name85);
							cur49 = on9[name85];
							old29 = oldOn9[name85];
							if(old29 == null) {
								if(Array.isArray(cur49)) elm67.addEventListener(name85,(function($this) {
									var $r;
									var arr9 = [cur49];
									$r = (function(arr9) {
										return function(ev22) {
											if(arr9[0].length == 2) arr9[0][0](arr9[0][1]); else arr9[0][0].apply(undefined,arr9[0].slice(1));
										};
									})(arr9);
									return $r;
								}(this))); else {
									cur49 = { fn : cur49};
									var value62 = cur49;
									on9[name85] = value62;
									elm67.addEventListener(name85,(function($this) {
										var $r;
										var o18 = [cur49];
										$r = (function(o18) {
											return function(ev23) {
												o18[0].fn(ev23);
											};
										})(o18);
										return $r;
									}(this)));
								}
							} else if(Array.isArray(old29)) {
								var o19 = old29;
								o19.length = cur49.length;
								var _g225 = 0;
								while(_g225 < o19.length) {
									var el9 = o19[_g225];
									++_g225;
									old29[el9] = cur49[el9];
								}
								var value63 = old29;
								on9[name85] = value63;
							} else {
								old29.fn = cur49;
								var value64 = old29;
								on9[name85] = value64;
							}
						}
					}
					i48 = vnode17.data.hook;
					if(i48 != undefined && (i48 = i48.update) != undefined) i48(oldVnode9,vnode17);
				}
				if(vnode17.text == undefined) {
					if(oldCh5 != undefined && ch8 != undefined) {
						if(oldCh5 != ch8) snabbdom_engine_dom_PatchDom.updateChildren(elm62,oldCh5,ch8,insertedVnodeQueue);
					} else if(ch8 != undefined) {
						var startIdx8 = 0;
						var endIdx8 = ch8.length - 1;
						var i51;
						var new_node10;
						i51 = 0;
						if(startIdx8 <= endIdx8) do {
							new_node10 = (function($this) {
								var $r;
								var vnode18 = ch8[startIdx8];
								var i52;
								var data5 = vnode18.data;
								if(data5 != undefined) {
									if((i52 = data5.hook) != undefined && (i52 = i52.init) != undefined) i52(vnode18);
									if((i52 = data5.vnode) != undefined) vnode18 = i52;
								}
								var elm68;
								var children6 = vnode18.children;
								var sel5 = vnode18.sel;
								if(sel5 != undefined) {
									var hashIdx5 = sel5.indexOf("#",0);
									var dotIdx5 = sel5.indexOf(".",hashIdx5);
									var hash5 = hashIdx5 > 0?hashIdx5:sel5.length;
									var dot5 = dotIdx5 > 0?dotIdx5:sel5.length;
									var tag5 = hashIdx5 != -1 || dotIdx5 != -1?sel5.slice(0,Math.min(hash5,dot5)):sel5;
									elm68 = vnode18.elm = data5 != undefined && (i52 = data5.ns) != undefined?window.document.createElementNS(i52,tag5):window.document.createElement(tag5);
									if(hash5 < dot5) {
										var value65 = sel5.slice(hash5 + 1,dot5);
										elm68.id = value65;
									}
									if(dotIdx5 > 0) {
										elm.className = sel.slice(dot+1).replace(snabbdom_engine_dom_PatchDom.rg, " ");;
									}
									if(Array.isArray(children6)) {
										i52 = 0;
										if(i52 < children6.length) do {
											var new_node11 = snabbdom_engine_dom_PatchDom.createElm(children6[i52],insertedVnodeQueue);
											elm68.appendChild(new_node11);
										} while((function($this) {
											var $r;
											++i52;
											$r = i52 < children6.length;
											return $r;
										}($this)));
									} else if(typeof vnode18.text == "string" || typeof vnode18.text == "number") {
										var element5 = window.document.createTextNode(vnode18.text);
										elm68.appendChild(element5);
									}
									var oldVnode10 = snabbdom_engine_dom_PatchDom.emptyNode;
									var key51;
									var cur50;
									var old30;
									var elm69 = vnode18.elm;
									var oldAttrs10 = oldVnode10.data.attrs == null?{ }:oldVnode10.data.attrs;
									var attrs10 = vnode18.data.attrs == null?{ }:vnode18.data.attrs;
									var _g85 = 0;
									var _g168 = Object.keys(attrs10);
									while(_g85 < _g168.length) {
										var key52 = _g168[_g85];
										++_g85;
										cur50 = attrs10[key52];
										old30 = oldAttrs10[key52];
										if(old30 != cur50) {
											if(!cur50 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key52]) elm69.removeAttribute(key52); else {
												var value66 = cur50;
												elm69.setAttribute(key52,value66);
											}
										}
									}
									var _g86 = 0;
									var _g169 = Object.keys(oldAttrs10);
									while(_g86 < _g169.length) {
										var key53 = _g169[_g86];
										++_g86;
										if(!Object.prototype.hasOwnProperty.call(attrs10,key53)) elm69.removeAttribute(key53);
									}
									var key54;
									var cur51;
									var old31;
									var elm70 = vnode18.elm;
									var oldProps10 = oldVnode10.data.props == null?{ }:oldVnode10.data.props;
									var props14 = vnode18.data.props == null?{ }:vnode18.data.props;
									var _g87 = 0;
									var _g170 = Object.keys(props14);
									while(_g87 < _g170.length) {
										var key55 = _g170[_g87];
										++_g87;
										cur51 = props14[key55];
										old31 = oldProps10[key55];
										if(old31 != cur51) {
											var value67 = cur51;
											elm70[key55] = value67;
										}
									}
									var cur52;
									var name86;
									var elm71 = vnode18.elm;
									var oldClass10 = oldVnode10.data.classes == null?{ }:oldVnode10.data.classes;
									var klass10 = vnode18.data.classes == null?{ }:vnode18.data.classes;
									var _g88 = 0;
									var _g171 = Object.keys(klass10);
									while(_g88 < _g171.length) {
										var name87 = _g171[_g88];
										++_g88;
										cur52 = klass10[name87];
										if(cur52 != oldClass10[name87]) {
											if(cur52 == "add") elm71.classList.add(name87); else if(cur52 == "remove") elm71.classList.remove(name87);
										}
									}
									var cur53;
									var name88;
									var elm72 = vnode18.elm;
									var oldStyle10 = oldVnode10.data.style == null?{ }:oldVnode10.data.style;
									var style18 = vnode18.data.style == null?{ }:vnode18.data.style;
									var oldHasDel10 = Object.prototype.hasOwnProperty.call(oldStyle10,"delayed");
									var _g89 = 0;
									var _g172 = Object.keys(style18);
									while(_g89 < _g172.length) {
										var name89 = _g172[_g89];
										++_g89;
										cur53 = style18[name89];
										if(name89 == "delayed") {
											var delayed10 = style18.delayed;
											var oldDelayed10 = oldStyle10.delayed;
											var _g226 = 0;
											var _g317 = Object.keys(delayed10);
											while(_g226 < _g317.length) {
												var name90 = _g317[_g226];
												++_g226;
												cur53 = delayed10[name90];
												if(!oldHasDel10 || cur53 != oldDelayed10[name90]) {
													var obj10 = [elm72.style];
													var prop10 = [name90];
													var val10 = [cur53];
													var fn10 = [(function(val10,prop10,obj10) {
														return function(i53) {
															var value68 = val10[0];
															obj10[0][prop10[0]] = value68;
														};
													})(val10,prop10,obj10)];
													window.requestAnimationFrame((function(fn10) {
														return function(i54) {
															window.requestAnimationFrame(fn10[0]);
														};
													})(fn10));
												}
											}
										} else if(name89 != "remove" && cur53 != oldStyle10[name89]) elm72.style[name89] = cur53;
									}
									var name91;
									var cur54;
									var old32;
									var elm73 = vnode18.elm;
									var oldOn10 = oldVnode10.data.on == null?{ }:oldVnode10.data.on;
									var on10 = vnode18.data.on == null?{ }:vnode18.data.on;
									js_Browser.alert(oldVnode10);
									if(on10 != null) {
										var _g90 = 0;
										var _g173 = Object.keys(on10);
										while(_g90 < _g173.length) {
											var name92 = _g173[_g90];
											++_g90;
											js_Browser.alert(name92);
											cur54 = on10[name92];
											old32 = oldOn10[name92];
											if(old32 == null) {
												if(Array.isArray(cur54)) elm73.addEventListener(name92,(function($this) {
													var $r;
													var arr10 = [cur54];
													$r = (function(arr10) {
														return function(ev24) {
															if(arr10[0].length == 2) arr10[0][0](arr10[0][1]); else arr10[0][0].apply(undefined,arr10[0].slice(1));
														};
													})(arr10);
													return $r;
												}($this))); else {
													cur54 = { fn : cur54};
													var value69 = cur54;
													on10[name92] = value69;
													elm73.addEventListener(name92,(function($this) {
														var $r;
														var o20 = [cur54];
														$r = (function(o20) {
															return function(ev25) {
																o20[0].fn(ev25);
															};
														})(o20);
														return $r;
													}($this)));
												}
											} else if(Array.isArray(old32)) {
												var o21 = old32;
												o21.length = cur54.length;
												var _g227 = 0;
												while(_g227 < o21.length) {
													var el10 = o21[_g227];
													++_g227;
													old32[el10] = cur54[el10];
												}
												var value70 = old32;
												on10[name92] = value70;
											} else {
												old32.fn = cur54;
												var value71 = old32;
												on10[name92] = value71;
											}
										}
									}
									if(vnode18.data != null) {
										i52 = vnode18.data.hook;
										if(i52 != undefined) {
											if(i52.create) i52.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode18);
											if(i52.insert) insertedVnodeQueue.push(vnode18);
										}
									}
								} else elm68 = vnode18.elm = window.document.createTextNode(vnode18.text);
								$r = vnode18.elm;
								return $r;
							}(this));
							elm62.insertBefore(new_node10,null);
						} while((function($this) {
							var $r;
							++startIdx8;
							$r = startIdx8 <= endIdx8;
							return $r;
						}(this)));
					} else if(oldCh5 != undefined) {
						var startIdx9 = 0;
						var endIdx9 = oldCh5.length - 1;
						var y4;
						y4 = 0;
						if(startIdx9 <= endIdx9) do {
							var i55;
							var listeners4;
							var rm12 = null;
							var ch9 = oldCh5[startIdx9];
							if(ch9 != undefined) {
								if(ch9.sel != undefined) {
									var vnode19 = ch9;
									var i56 = vnode19.data;
									var j4;
									if(i56 != undefined) {
										if((i56 = i56.hook) != undefined && (i56 = i56.destroy) != undefined) i56(vnode19);
										var style19 = null;
										var name93;
										var elm74 = vnode19.elm;
										var s8 = vnode19.data.style;
										if(s8 == null) null; else {
											style19 = s8.destroy;
											if(style19 == null) null; else {
												var _g91 = 0;
												var _g174 = Object.keys(style19);
												while(_g91 < _g174.length) {
													var name94 = _g174[_g91];
													++_g91;
													elm74.style[name94] = style19[name94];
												}
											}
										}
										if((i56 = vnode19.children) != undefined) {
											j4 = 0;
											if(j4 < vnode19.children.length) do snabbdom_engine_dom_PatchDom.invokeDestroyHook(vnode19.children[j4]); while((function($this) {
												var $r;
												++j4;
												$r = j4 < vnode19.children.length;
												return $r;
											}(this)));
										}
									}
									var vnode20 = ch9;
									var rm13 = rm12;
									var rm14 = [rm13];
									var s9 = vnode20.data.style;
									if(!s9 || !s9.remove) {
										if(rm14[0] != null) rm14[0]();
										null;
									} else {
										var name95;
										var elm75 = [vnode20.elm];
										var idx4;
										var i57 = 0;
										var maxDur4 = 0;
										var compStyle4;
										var style20 = s9.remove;
										var amount4 = [0];
										var applied4 = [];
										var _g92 = 0;
										var _g175 = Object.keys(style20);
										while(_g92 < _g175.length) {
											var name96 = _g175[_g92];
											++_g92;
											applied4.push(name96);
											elm75[0].style[name96] = style20[name96];
										}
										compStyle4 = window.getComputedStyle(elm75[0]);
										var props15 = compStyle4["transition-property"].split(", ");
										var i58;
										i58 = 0;
										if(i58 < props15.length) do if(HxOverrides.indexOf(applied4,props15[i58],0) != -1) amount4[0]++; while((function($this) {
											var $r;
											++i58;
											$r = i58 < props15.length;
											return $r;
										}(this)));
										elm75[0].addEventListener("transitionend",(function(amount4,elm75,rm14) {
											return function(ev26) {
												if(ev26.target == elm75[0]) --amount4[0];
												if(amount4[0] == 0) rm14[0]();
											};
										})(amount4,elm75,rm14));
									}
									if((i55 = ch9.data) != undefined && (i55 = i55.hook) != undefined && (i55 = i55.remove) != undefined) i55(ch9,rm12); else {
										console.log("remove");
										if(rm12 != null) rm12();
										elm62.removeChild(ch9.elm);
									}
								} else elm62.removeChild(ch9.elm);
							}
						} while((function($this) {
							var $r;
							++startIdx9;
							$r = startIdx9 <= endIdx9;
							return $r;
						}(this)));
					}
				} else if(oldVnode9.text != vnode17.text) elm62.textContent = vnode17.text;
				if(hook4 != undefined && (i48 = hook4.postpatch) != undefined) i48(oldVnode9,vnode17);
			}
			oldCh[idxInOld] = null;
			parentElm.insertBefore(elmToMove.elm,oldStartVnode.elm);
			newStartVnode = newCh[++newStartIdx];
		}
	}
	if(oldStartIdx > oldEndIdx) {
		before = newCh[newEndIdx + 1] == undefined?null:newCh[newEndIdx + 1].elm;
		var vnodes = newCh;
		var startIdx10 = newStartIdx;
		var i59;
		var new_node12;
		i59 = 0;
		if(startIdx10 <= newEndIdx) do {
			new_node12 = (function($this) {
				var $r;
				var vnode21 = vnodes[startIdx10];
				var i60;
				var data6 = vnode21.data;
				if(data6 != undefined) {
					if((i60 = data6.hook) != undefined && (i60 = i60.init) != undefined) i60(vnode21);
					if((i60 = data6.vnode) != undefined) vnode21 = i60;
				}
				var elm76;
				var children7 = vnode21.children;
				var sel6 = vnode21.sel;
				if(sel6 != undefined) {
					var hashIdx6 = sel6.indexOf("#",0);
					var dotIdx6 = sel6.indexOf(".",hashIdx6);
					var hash6 = hashIdx6 > 0?hashIdx6:sel6.length;
					var dot6 = dotIdx6 > 0?dotIdx6:sel6.length;
					var tag6 = hashIdx6 != -1 || dotIdx6 != -1?sel6.slice(0,Math.min(hash6,dot6)):sel6;
					elm76 = vnode21.elm = data6 != undefined && (i60 = data6.ns) != undefined?window.document.createElementNS(i60,tag6):window.document.createElement(tag6);
					if(hash6 < dot6) {
						var value72 = sel6.slice(hash6 + 1,dot6);
						elm76.id = value72;
					}
					if(dotIdx6 > 0) {
						elm.className = sel.slice(dot+1).replace(snabbdom_engine_dom_PatchDom.rg, " ");;
					}
					if(Array.isArray(children7)) {
						i60 = 0;
						if(i60 < children7.length) do {
							var new_node13 = snabbdom_engine_dom_PatchDom.createElm(children7[i60],insertedVnodeQueue);
							elm76.appendChild(new_node13);
						} while((function($this) {
							var $r;
							++i60;
							$r = i60 < children7.length;
							return $r;
						}($this)));
					} else if(typeof vnode21.text == "string" || typeof vnode21.text == "number") {
						var element6 = window.document.createTextNode(vnode21.text);
						elm76.appendChild(element6);
					}
					var oldVnode11 = snabbdom_engine_dom_PatchDom.emptyNode;
					var key56;
					var cur55;
					var old33;
					var elm77 = vnode21.elm;
					var oldAttrs11 = oldVnode11.data.attrs == null?{ }:oldVnode11.data.attrs;
					var attrs11 = vnode21.data.attrs == null?{ }:vnode21.data.attrs;
					var _g93 = 0;
					var _g176 = Object.keys(attrs11);
					while(_g93 < _g176.length) {
						var key57 = _g176[_g93];
						++_g93;
						cur55 = attrs11[key57];
						old33 = oldAttrs11[key57];
						if(old33 != cur55) {
							if(!cur55 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key57]) elm77.removeAttribute(key57); else {
								var value73 = cur55;
								elm77.setAttribute(key57,value73);
							}
						}
					}
					var _g94 = 0;
					var _g177 = Object.keys(oldAttrs11);
					while(_g94 < _g177.length) {
						var key58 = _g177[_g94];
						++_g94;
						if(!Object.prototype.hasOwnProperty.call(attrs11,key58)) elm77.removeAttribute(key58);
					}
					var key59;
					var cur56;
					var old34;
					var elm78 = vnode21.elm;
					var oldProps11 = oldVnode11.data.props == null?{ }:oldVnode11.data.props;
					var props16 = vnode21.data.props == null?{ }:vnode21.data.props;
					var _g95 = 0;
					var _g178 = Object.keys(props16);
					while(_g95 < _g178.length) {
						var key60 = _g178[_g95];
						++_g95;
						cur56 = props16[key60];
						old34 = oldProps11[key60];
						if(old34 != cur56) {
							var value74 = cur56;
							elm78[key60] = value74;
						}
					}
					var cur57;
					var name97;
					var elm79 = vnode21.elm;
					var oldClass11 = oldVnode11.data.classes == null?{ }:oldVnode11.data.classes;
					var klass11 = vnode21.data.classes == null?{ }:vnode21.data.classes;
					var _g96 = 0;
					var _g179 = Object.keys(klass11);
					while(_g96 < _g179.length) {
						var name98 = _g179[_g96];
						++_g96;
						cur57 = klass11[name98];
						if(cur57 != oldClass11[name98]) {
							if(cur57 == "add") elm79.classList.add(name98); else if(cur57 == "remove") elm79.classList.remove(name98);
						}
					}
					var cur58;
					var name99;
					var elm80 = vnode21.elm;
					var oldStyle11 = oldVnode11.data.style == null?{ }:oldVnode11.data.style;
					var style21 = vnode21.data.style == null?{ }:vnode21.data.style;
					var oldHasDel11 = Object.prototype.hasOwnProperty.call(oldStyle11,"delayed");
					var _g97 = 0;
					var _g180 = Object.keys(style21);
					while(_g97 < _g180.length) {
						var name100 = _g180[_g97];
						++_g97;
						cur58 = style21[name100];
						if(name100 == "delayed") {
							var delayed11 = style21.delayed;
							var oldDelayed11 = oldStyle11.delayed;
							var _g228 = 0;
							var _g318 = Object.keys(delayed11);
							while(_g228 < _g318.length) {
								var name101 = _g318[_g228];
								++_g228;
								cur58 = delayed11[name101];
								if(!oldHasDel11 || cur58 != oldDelayed11[name101]) {
									var obj11 = [elm80.style];
									var prop11 = [name101];
									var val11 = [cur58];
									var fn11 = [(function(val11,prop11,obj11) {
										return function(i61) {
											var value75 = val11[0];
											obj11[0][prop11[0]] = value75;
										};
									})(val11,prop11,obj11)];
									window.requestAnimationFrame((function(fn11) {
										return function(i62) {
											window.requestAnimationFrame(fn11[0]);
										};
									})(fn11));
								}
							}
						} else if(name100 != "remove" && cur58 != oldStyle11[name100]) elm80.style[name100] = cur58;
					}
					var name102;
					var cur59;
					var old35;
					var elm81 = vnode21.elm;
					var oldOn11 = oldVnode11.data.on == null?{ }:oldVnode11.data.on;
					var on11 = vnode21.data.on == null?{ }:vnode21.data.on;
					js_Browser.alert(oldVnode11);
					if(on11 != null) {
						var _g98 = 0;
						var _g181 = Object.keys(on11);
						while(_g98 < _g181.length) {
							var name103 = _g181[_g98];
							++_g98;
							js_Browser.alert(name103);
							cur59 = on11[name103];
							old35 = oldOn11[name103];
							if(old35 == null) {
								if(Array.isArray(cur59)) elm81.addEventListener(name103,(function($this) {
									var $r;
									var arr11 = [cur59];
									$r = (function(arr11) {
										return function(ev27) {
											if(arr11[0].length == 2) arr11[0][0](arr11[0][1]); else arr11[0][0].apply(undefined,arr11[0].slice(1));
										};
									})(arr11);
									return $r;
								}($this))); else {
									cur59 = { fn : cur59};
									var value76 = cur59;
									on11[name103] = value76;
									elm81.addEventListener(name103,(function($this) {
										var $r;
										var o22 = [cur59];
										$r = (function(o22) {
											return function(ev28) {
												o22[0].fn(ev28);
											};
										})(o22);
										return $r;
									}($this)));
								}
							} else if(Array.isArray(old35)) {
								var o23 = old35;
								o23.length = cur59.length;
								var _g229 = 0;
								while(_g229 < o23.length) {
									var el11 = o23[_g229];
									++_g229;
									old35[el11] = cur59[el11];
								}
								var value77 = old35;
								on11[name103] = value77;
							} else {
								old35.fn = cur59;
								var value78 = old35;
								on11[name103] = value78;
							}
						}
					}
					if(vnode21.data != null) {
						i60 = vnode21.data.hook;
						if(i60 != undefined) {
							if(i60.create) i60.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode21);
							if(i60.insert) insertedVnodeQueue.push(vnode21);
						}
					}
				} else elm76 = vnode21.elm = window.document.createTextNode(vnode21.text);
				$r = vnode21.elm;
				return $r;
			}(this));
			parentElm.insertBefore(new_node12,before);
		} while((function($this) {
			var $r;
			++startIdx10;
			$r = startIdx10 <= newEndIdx;
			return $r;
		}(this)));
	} else if(newStartIdx > newEndIdx) {
		var vnodes1 = oldCh;
		var startIdx11 = oldStartIdx;
		var y5;
		y5 = 0;
		if(startIdx11 <= oldEndIdx) do {
			var i63;
			var listeners5;
			var rm15 = null;
			var ch10 = vnodes1[startIdx11];
			if(ch10 != undefined) {
				if(ch10.sel != undefined) {
					var vnode22 = ch10;
					var i64 = vnode22.data;
					var j5;
					if(i64 != undefined) {
						if((i64 = i64.hook) != undefined && (i64 = i64.destroy) != undefined) i64(vnode22);
						var style22 = null;
						var name104;
						var elm82 = vnode22.elm;
						var s10 = vnode22.data.style;
						if(s10 == null) null; else {
							style22 = s10.destroy;
							if(style22 == null) null; else {
								var _g99 = 0;
								var _g182 = Object.keys(style22);
								while(_g99 < _g182.length) {
									var name105 = _g182[_g99];
									++_g99;
									elm82.style[name105] = style22[name105];
								}
							}
						}
						if((i64 = vnode22.children) != undefined) {
							j5 = 0;
							if(j5 < vnode22.children.length) do snabbdom_engine_dom_PatchDom.invokeDestroyHook(vnode22.children[j5]); while((function($this) {
								var $r;
								++j5;
								$r = j5 < vnode22.children.length;
								return $r;
							}(this)));
						}
					}
					var vnode23 = ch10;
					var rm16 = rm15;
					var rm17 = [rm16];
					var s11 = vnode23.data.style;
					if(!s11 || !s11.remove) {
						if(rm17[0] != null) rm17[0]();
						null;
					} else {
						var name106;
						var elm83 = [vnode23.elm];
						var idx5;
						var i65 = 0;
						var maxDur5 = 0;
						var compStyle5;
						var style23 = s11.remove;
						var amount5 = [0];
						var applied5 = [];
						var _g100 = 0;
						var _g183 = Object.keys(style23);
						while(_g100 < _g183.length) {
							var name107 = _g183[_g100];
							++_g100;
							applied5.push(name107);
							elm83[0].style[name107] = style23[name107];
						}
						compStyle5 = window.getComputedStyle(elm83[0]);
						var props17 = compStyle5["transition-property"].split(", ");
						var i66;
						i66 = 0;
						if(i66 < props17.length) do if(HxOverrides.indexOf(applied5,props17[i66],0) != -1) amount5[0]++; while((function($this) {
							var $r;
							++i66;
							$r = i66 < props17.length;
							return $r;
						}(this)));
						elm83[0].addEventListener("transitionend",(function(amount5,elm83,rm17) {
							return function(ev29) {
								if(ev29.target == elm83[0]) --amount5[0];
								if(amount5[0] == 0) rm17[0]();
							};
						})(amount5,elm83,rm17));
					}
					if((i63 = ch10.data) != undefined && (i63 = i63.hook) != undefined && (i63 = i63.remove) != undefined) i63(ch10,rm15); else {
						console.log("remove");
						if(rm15 != null) rm15();
						parentElm.removeChild(ch10.elm);
					}
				} else parentElm.removeChild(ch10.elm);
			}
		} while((function($this) {
			var $r;
			++startIdx11;
			$r = startIdx11 <= oldEndIdx;
			return $r;
		}(this)));
	}
};
snabbdom_engine_dom_PatchDom.patchDom = function(oldVnode,vnode) {
	var i;
	var insertedVnodeQueue = [];
	if(oldVnode.parentElement != null) {
		var vnode1 = vnode;
		var i1;
		var data = vnode1.data;
		if(data != undefined) {
			if((i1 = data.hook) != undefined && (i1 = i1.init) != undefined) i1(vnode1);
			if((i1 = data.vnode) != undefined) vnode1 = i1;
		}
		var elm;
		var children = vnode1.children;
		var sel = vnode1.sel;
		if(sel != undefined) {
			var hashIdx = sel.indexOf("#",0);
			var dotIdx = sel.indexOf(".",hashIdx);
			var hash = hashIdx > 0?hashIdx:sel.length;
			var dot = dotIdx > 0?dotIdx:sel.length;
			var tag = hashIdx != -1 || dotIdx != -1?sel.slice(0,Math.min(hash,dot)):sel;
			elm = vnode1.elm = data != undefined && (i1 = data.ns) != undefined?window.document.createElementNS(i1,tag):window.document.createElement(tag);
			if(hash < dot) {
				var value = sel.slice(hash + 1,dot);
				elm.id = value;
			}
			if(dotIdx > 0) {
				elm.className = sel.slice(dot+1).replace(snabbdom_engine_dom_PatchDom.rg, " ");;
			}
			if(Array.isArray(children)) {
				i1 = 0;
				if(i1 < children.length) do {
					var new_node = snabbdom_engine_dom_PatchDom.createElm(children[i1],insertedVnodeQueue);
					elm.appendChild(new_node);
				} while((function($this) {
					var $r;
					++i1;
					$r = i1 < children.length;
					return $r;
				}(this)));
			} else if(typeof vnode1.text == "string" || typeof vnode1.text == "number") {
				var element = window.document.createTextNode(vnode1.text);
				elm.appendChild(element);
			}
			var oldVnode1 = snabbdom_engine_dom_PatchDom.emptyNode;
			var key;
			var cur;
			var old;
			var elm1 = vnode1.elm;
			var oldAttrs = oldVnode1.data.attrs == null?{ }:oldVnode1.data.attrs;
			var attrs = vnode1.data.attrs == null?{ }:vnode1.data.attrs;
			var _g = 0;
			var _g1 = Object.keys(attrs);
			while(_g < _g1.length) {
				var key1 = _g1[_g];
				++_g;
				cur = attrs[key1];
				old = oldAttrs[key1];
				if(old != cur) {
					if(!cur && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key1]) elm1.removeAttribute(key1); else {
						var value1 = cur;
						elm1.setAttribute(key1,value1);
					}
				}
			}
			var _g2 = 0;
			var _g11 = Object.keys(oldAttrs);
			while(_g2 < _g11.length) {
				var key2 = _g11[_g2];
				++_g2;
				if(!Object.prototype.hasOwnProperty.call(attrs,key2)) elm1.removeAttribute(key2);
			}
			var key3;
			var cur1;
			var old1;
			var elm2 = vnode1.elm;
			var oldProps = oldVnode1.data.props == null?{ }:oldVnode1.data.props;
			var props = vnode1.data.props == null?{ }:vnode1.data.props;
			var _g3 = 0;
			var _g12 = Object.keys(props);
			while(_g3 < _g12.length) {
				var key4 = _g12[_g3];
				++_g3;
				cur1 = props[key4];
				old1 = oldProps[key4];
				if(old1 != cur1) {
					var value2 = cur1;
					elm2[key4] = value2;
				}
			}
			var cur2;
			var name;
			var elm3 = vnode1.elm;
			var oldClass = oldVnode1.data.classes == null?{ }:oldVnode1.data.classes;
			var klass = vnode1.data.classes == null?{ }:vnode1.data.classes;
			var _g4 = 0;
			var _g13 = Object.keys(klass);
			while(_g4 < _g13.length) {
				var name1 = _g13[_g4];
				++_g4;
				cur2 = klass[name1];
				if(cur2 != oldClass[name1]) {
					if(cur2 == "add") elm3.classList.add(name1); else if(cur2 == "remove") elm3.classList.remove(name1);
				}
			}
			var cur3;
			var name2;
			var elm4 = vnode1.elm;
			var oldStyle = oldVnode1.data.style == null?{ }:oldVnode1.data.style;
			var style = vnode1.data.style == null?{ }:vnode1.data.style;
			var oldHasDel = Object.prototype.hasOwnProperty.call(oldStyle,"delayed");
			var _g5 = 0;
			var _g14 = Object.keys(style);
			while(_g5 < _g14.length) {
				var name3 = _g14[_g5];
				++_g5;
				cur3 = style[name3];
				if(name3 == "delayed") {
					var delayed = style.delayed;
					var oldDelayed = oldStyle.delayed;
					var _g21 = 0;
					var _g31 = Object.keys(delayed);
					while(_g21 < _g31.length) {
						var name4 = _g31[_g21];
						++_g21;
						cur3 = delayed[name4];
						if(!oldHasDel || cur3 != oldDelayed[name4]) {
							var obj = [elm4.style];
							var prop = [name4];
							var val = [cur3];
							var fn = [(function(val,prop,obj) {
								return function(i2) {
									var value3 = val[0];
									obj[0][prop[0]] = value3;
								};
							})(val,prop,obj)];
							window.requestAnimationFrame((function(fn) {
								return function(i3) {
									window.requestAnimationFrame(fn[0]);
								};
							})(fn));
						}
					}
				} else if(name3 != "remove" && cur3 != oldStyle[name3]) elm4.style[name3] = cur3;
			}
			var name5;
			var cur4;
			var old2;
			var elm5 = vnode1.elm;
			var oldOn = oldVnode1.data.on == null?{ }:oldVnode1.data.on;
			var on = vnode1.data.on == null?{ }:vnode1.data.on;
			js_Browser.alert(oldVnode1);
			if(on != null) {
				var _g6 = 0;
				var _g15 = Object.keys(on);
				while(_g6 < _g15.length) {
					var name6 = _g15[_g6];
					++_g6;
					js_Browser.alert(name6);
					cur4 = on[name6];
					old2 = oldOn[name6];
					if(old2 == null) {
						if(Array.isArray(cur4)) elm5.addEventListener(name6,(function($this) {
							var $r;
							var arr = [cur4];
							$r = (function(arr) {
								return function(ev) {
									if(arr[0].length == 2) arr[0][0](arr[0][1]); else arr[0][0].apply(undefined,arr[0].slice(1));
								};
							})(arr);
							return $r;
						}(this))); else {
							cur4 = { fn : cur4};
							var value4 = cur4;
							on[name6] = value4;
							elm5.addEventListener(name6,(function($this) {
								var $r;
								var o = [cur4];
								$r = (function(o) {
									return function(ev1) {
										o[0].fn(ev1);
									};
								})(o);
								return $r;
							}(this)));
						}
					} else if(Array.isArray(old2)) {
						var o1 = old2;
						o1.length = cur4.length;
						var _g22 = 0;
						while(_g22 < o1.length) {
							var el = o1[_g22];
							++_g22;
							old2[el] = cur4[el];
						}
						var value5 = old2;
						on[name6] = value5;
					} else {
						old2.fn = cur4;
						var value6 = old2;
						on[name6] = value6;
					}
				}
			}
			if(vnode1.data != null) {
				i1 = vnode1.data.hook;
				if(i1 != undefined) {
					if(i1.create) i1.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode1);
					if(i1.insert) insertedVnodeQueue.push(vnode1);
				}
			}
		} else elm = vnode1.elm = window.document.createTextNode(vnode1.text);
		vnode1.elm;
		oldVnode.parentElement.replaceChild(vnode.elm,oldVnode);
	} else {
		oldVnode = (function($this) {
			var $r;
			var data1 = { };
			var key5 = data1 == null?null:data1.key;
			$r = { sel : oldVnode.tagName, data : data1, children : [], text : null, elm : oldVnode, key : key5};
			return $r;
		}(this));
		var oldVnode2 = oldVnode;
		var vnode2 = vnode;
		var i4;
		var hook;
		if((i4 = vnode2.data) != undefined && (hook = i4.hook) != undefined && (i4 = hook.prepatch) != undefined) i4(oldVnode2,vnode2);
		if((i4 = oldVnode2.data) != undefined && (i4 = i4.vnode) != undefined) oldVnode2 = i4;
		if((i4 = vnode2.data) != undefined && (i4 = i4.vnode) != undefined) vnode2 = i4;
		var elm6 = vnode2.elm = oldVnode2.elm;
		var oldCh = oldVnode2.children;
		var ch = vnode2.children;
		if(oldVnode2 == vnode2) null; else {
			if(vnode2.data != undefined) {
				var key6;
				var cur5;
				var old3;
				var elm7 = vnode2.elm;
				var oldAttrs1 = oldVnode2.data.attrs == null?{ }:oldVnode2.data.attrs;
				var attrs1 = vnode2.data.attrs == null?{ }:vnode2.data.attrs;
				var _g7 = 0;
				var _g16 = Object.keys(attrs1);
				while(_g7 < _g16.length) {
					var key7 = _g16[_g7];
					++_g7;
					cur5 = attrs1[key7];
					old3 = oldAttrs1[key7];
					if(old3 != cur5) {
						if(!cur5 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key7]) elm7.removeAttribute(key7); else {
							var value7 = cur5;
							elm7.setAttribute(key7,value7);
						}
					}
				}
				var _g8 = 0;
				var _g17 = Object.keys(oldAttrs1);
				while(_g8 < _g17.length) {
					var key8 = _g17[_g8];
					++_g8;
					if(!Object.prototype.hasOwnProperty.call(attrs1,key8)) elm7.removeAttribute(key8);
				}
				var key9;
				var cur6;
				var old4;
				var elm8 = vnode2.elm;
				var oldProps1 = oldVnode2.data.props == null?{ }:oldVnode2.data.props;
				var props1 = vnode2.data.props == null?{ }:vnode2.data.props;
				var _g9 = 0;
				var _g18 = Object.keys(props1);
				while(_g9 < _g18.length) {
					var key10 = _g18[_g9];
					++_g9;
					cur6 = props1[key10];
					old4 = oldProps1[key10];
					if(old4 != cur6) {
						var value8 = cur6;
						elm8[key10] = value8;
					}
				}
				var cur7;
				var name7;
				var elm9 = vnode2.elm;
				var oldClass1 = oldVnode2.data.classes == null?{ }:oldVnode2.data.classes;
				var klass1 = vnode2.data.classes == null?{ }:vnode2.data.classes;
				var _g10 = 0;
				var _g19 = Object.keys(klass1);
				while(_g10 < _g19.length) {
					var name8 = _g19[_g10];
					++_g10;
					cur7 = klass1[name8];
					if(cur7 != oldClass1[name8]) {
						if(cur7 == "add") elm9.classList.add(name8); else if(cur7 == "remove") elm9.classList.remove(name8);
					}
				}
				var cur8;
				var name9;
				var elm10 = vnode2.elm;
				var oldStyle1 = oldVnode2.data.style == null?{ }:oldVnode2.data.style;
				var style1 = vnode2.data.style == null?{ }:vnode2.data.style;
				var oldHasDel1 = Object.prototype.hasOwnProperty.call(oldStyle1,"delayed");
				var _g20 = 0;
				var _g110 = Object.keys(style1);
				while(_g20 < _g110.length) {
					var name10 = _g110[_g20];
					++_g20;
					cur8 = style1[name10];
					if(name10 == "delayed") {
						var delayed1 = style1.delayed;
						var oldDelayed1 = oldStyle1.delayed;
						var _g23 = 0;
						var _g32 = Object.keys(delayed1);
						while(_g23 < _g32.length) {
							var name11 = _g32[_g23];
							++_g23;
							cur8 = delayed1[name11];
							if(!oldHasDel1 || cur8 != oldDelayed1[name11]) {
								var obj1 = [elm10.style];
								var prop1 = [name11];
								var val1 = [cur8];
								var fn1 = [(function(val1,prop1,obj1) {
									return function(i5) {
										var value9 = val1[0];
										obj1[0][prop1[0]] = value9;
									};
								})(val1,prop1,obj1)];
								window.requestAnimationFrame((function(fn1) {
									return function(i6) {
										window.requestAnimationFrame(fn1[0]);
									};
								})(fn1));
							}
						}
					} else if(name10 != "remove" && cur8 != oldStyle1[name10]) elm10.style[name10] = cur8;
				}
				var name12;
				var cur9;
				var old5;
				var elm11 = vnode2.elm;
				var oldOn1 = oldVnode2.data.on == null?{ }:oldVnode2.data.on;
				var on1 = vnode2.data.on == null?{ }:vnode2.data.on;
				js_Browser.alert(oldVnode2);
				if(on1 != null) {
					var _g24 = 0;
					var _g111 = Object.keys(on1);
					while(_g24 < _g111.length) {
						var name13 = _g111[_g24];
						++_g24;
						js_Browser.alert(name13);
						cur9 = on1[name13];
						old5 = oldOn1[name13];
						if(old5 == null) {
							if(Array.isArray(cur9)) elm11.addEventListener(name13,(function($this) {
								var $r;
								var arr1 = [cur9];
								$r = (function(arr1) {
									return function(ev2) {
										if(arr1[0].length == 2) arr1[0][0](arr1[0][1]); else arr1[0][0].apply(undefined,arr1[0].slice(1));
									};
								})(arr1);
								return $r;
							}(this))); else {
								cur9 = { fn : cur9};
								var value10 = cur9;
								on1[name13] = value10;
								elm11.addEventListener(name13,(function($this) {
									var $r;
									var o2 = [cur9];
									$r = (function(o2) {
										return function(ev3) {
											o2[0].fn(ev3);
										};
									})(o2);
									return $r;
								}(this)));
							}
						} else if(Array.isArray(old5)) {
							var o3 = old5;
							o3.length = cur9.length;
							var _g25 = 0;
							while(_g25 < o3.length) {
								var el1 = o3[_g25];
								++_g25;
								old5[el1] = cur9[el1];
							}
							var value11 = old5;
							on1[name13] = value11;
						} else {
							old5.fn = cur9;
							var value12 = old5;
							on1[name13] = value12;
						}
					}
				}
				i4 = vnode2.data.hook;
				if(i4 != undefined && (i4 = i4.update) != undefined) i4(oldVnode2,vnode2);
			}
			if(vnode2.text == undefined) {
				if(oldCh != undefined && ch != undefined) {
					if(oldCh != ch) snabbdom_engine_dom_PatchDom.updateChildren(elm6,oldCh,ch,insertedVnodeQueue);
				} else if(ch != undefined) {
					var startIdx = 0;
					var endIdx = ch.length - 1;
					var i7;
					var new_node1;
					i7 = 0;
					if(startIdx <= endIdx) do {
						new_node1 = (function($this) {
							var $r;
							var vnode3 = ch[startIdx];
							var i8;
							var data2 = vnode3.data;
							if(data2 != undefined) {
								if((i8 = data2.hook) != undefined && (i8 = i8.init) != undefined) i8(vnode3);
								if((i8 = data2.vnode) != undefined) vnode3 = i8;
							}
							var elm12;
							var children1 = vnode3.children;
							var sel1 = vnode3.sel;
							if(sel1 != undefined) {
								var hashIdx1 = sel1.indexOf("#",0);
								var dotIdx1 = sel1.indexOf(".",hashIdx1);
								var hash1 = hashIdx1 > 0?hashIdx1:sel1.length;
								var dot1 = dotIdx1 > 0?dotIdx1:sel1.length;
								var tag1 = hashIdx1 != -1 || dotIdx1 != -1?sel1.slice(0,Math.min(hash1,dot1)):sel1;
								elm12 = vnode3.elm = data2 != undefined && (i8 = data2.ns) != undefined?window.document.createElementNS(i8,tag1):window.document.createElement(tag1);
								if(hash1 < dot1) {
									var value13 = sel1.slice(hash1 + 1,dot1);
									elm12.id = value13;
								}
								if(dotIdx1 > 0) {
									elm.className = sel.slice(dot+1).replace(snabbdom_engine_dom_PatchDom.rg, " ");;
								}
								if(Array.isArray(children1)) {
									i8 = 0;
									if(i8 < children1.length) do {
										var new_node2 = snabbdom_engine_dom_PatchDom.createElm(children1[i8],insertedVnodeQueue);
										elm12.appendChild(new_node2);
									} while((function($this) {
										var $r;
										++i8;
										$r = i8 < children1.length;
										return $r;
									}($this)));
								} else if(typeof vnode3.text == "string" || typeof vnode3.text == "number") {
									var element1 = window.document.createTextNode(vnode3.text);
									elm12.appendChild(element1);
								}
								var oldVnode3 = snabbdom_engine_dom_PatchDom.emptyNode;
								var key11;
								var cur10;
								var old6;
								var elm13 = vnode3.elm;
								var oldAttrs2 = oldVnode3.data.attrs == null?{ }:oldVnode3.data.attrs;
								var attrs2 = vnode3.data.attrs == null?{ }:vnode3.data.attrs;
								var _g26 = 0;
								var _g112 = Object.keys(attrs2);
								while(_g26 < _g112.length) {
									var key12 = _g112[_g26];
									++_g26;
									cur10 = attrs2[key12];
									old6 = oldAttrs2[key12];
									if(old6 != cur10) {
										if(!cur10 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key12]) elm13.removeAttribute(key12); else {
											var value14 = cur10;
											elm13.setAttribute(key12,value14);
										}
									}
								}
								var _g27 = 0;
								var _g113 = Object.keys(oldAttrs2);
								while(_g27 < _g113.length) {
									var key13 = _g113[_g27];
									++_g27;
									if(!Object.prototype.hasOwnProperty.call(attrs2,key13)) elm13.removeAttribute(key13);
								}
								var key14;
								var cur11;
								var old7;
								var elm14 = vnode3.elm;
								var oldProps2 = oldVnode3.data.props == null?{ }:oldVnode3.data.props;
								var props2 = vnode3.data.props == null?{ }:vnode3.data.props;
								var _g28 = 0;
								var _g114 = Object.keys(props2);
								while(_g28 < _g114.length) {
									var key15 = _g114[_g28];
									++_g28;
									cur11 = props2[key15];
									old7 = oldProps2[key15];
									if(old7 != cur11) {
										var value15 = cur11;
										elm14[key15] = value15;
									}
								}
								var cur12;
								var name14;
								var elm15 = vnode3.elm;
								var oldClass2 = oldVnode3.data.classes == null?{ }:oldVnode3.data.classes;
								var klass2 = vnode3.data.classes == null?{ }:vnode3.data.classes;
								var _g29 = 0;
								var _g115 = Object.keys(klass2);
								while(_g29 < _g115.length) {
									var name15 = _g115[_g29];
									++_g29;
									cur12 = klass2[name15];
									if(cur12 != oldClass2[name15]) {
										if(cur12 == "add") elm15.classList.add(name15); else if(cur12 == "remove") elm15.classList.remove(name15);
									}
								}
								var cur13;
								var name16;
								var elm16 = vnode3.elm;
								var oldStyle2 = oldVnode3.data.style == null?{ }:oldVnode3.data.style;
								var style2 = vnode3.data.style == null?{ }:vnode3.data.style;
								var oldHasDel2 = Object.prototype.hasOwnProperty.call(oldStyle2,"delayed");
								var _g30 = 0;
								var _g116 = Object.keys(style2);
								while(_g30 < _g116.length) {
									var name17 = _g116[_g30];
									++_g30;
									cur13 = style2[name17];
									if(name17 == "delayed") {
										var delayed2 = style2.delayed;
										var oldDelayed2 = oldStyle2.delayed;
										var _g210 = 0;
										var _g33 = Object.keys(delayed2);
										while(_g210 < _g33.length) {
											var name18 = _g33[_g210];
											++_g210;
											cur13 = delayed2[name18];
											if(!oldHasDel2 || cur13 != oldDelayed2[name18]) {
												var obj2 = [elm16.style];
												var prop2 = [name18];
												var val2 = [cur13];
												var fn2 = [(function(val2,prop2,obj2) {
													return function(i9) {
														var value16 = val2[0];
														obj2[0][prop2[0]] = value16;
													};
												})(val2,prop2,obj2)];
												window.requestAnimationFrame((function(fn2) {
													return function(i10) {
														window.requestAnimationFrame(fn2[0]);
													};
												})(fn2));
											}
										}
									} else if(name17 != "remove" && cur13 != oldStyle2[name17]) elm16.style[name17] = cur13;
								}
								var name19;
								var cur14;
								var old8;
								var elm17 = vnode3.elm;
								var oldOn2 = oldVnode3.data.on == null?{ }:oldVnode3.data.on;
								var on2 = vnode3.data.on == null?{ }:vnode3.data.on;
								js_Browser.alert(oldVnode3);
								if(on2 != null) {
									var _g34 = 0;
									var _g117 = Object.keys(on2);
									while(_g34 < _g117.length) {
										var name20 = _g117[_g34];
										++_g34;
										js_Browser.alert(name20);
										cur14 = on2[name20];
										old8 = oldOn2[name20];
										if(old8 == null) {
											if(Array.isArray(cur14)) elm17.addEventListener(name20,(function($this) {
												var $r;
												var arr2 = [cur14];
												$r = (function(arr2) {
													return function(ev4) {
														if(arr2[0].length == 2) arr2[0][0](arr2[0][1]); else arr2[0][0].apply(undefined,arr2[0].slice(1));
													};
												})(arr2);
												return $r;
											}($this))); else {
												cur14 = { fn : cur14};
												var value17 = cur14;
												on2[name20] = value17;
												elm17.addEventListener(name20,(function($this) {
													var $r;
													var o4 = [cur14];
													$r = (function(o4) {
														return function(ev5) {
															o4[0].fn(ev5);
														};
													})(o4);
													return $r;
												}($this)));
											}
										} else if(Array.isArray(old8)) {
											var o5 = old8;
											o5.length = cur14.length;
											var _g211 = 0;
											while(_g211 < o5.length) {
												var el2 = o5[_g211];
												++_g211;
												old8[el2] = cur14[el2];
											}
											var value18 = old8;
											on2[name20] = value18;
										} else {
											old8.fn = cur14;
											var value19 = old8;
											on2[name20] = value19;
										}
									}
								}
								if(vnode3.data != null) {
									i8 = vnode3.data.hook;
									if(i8 != undefined) {
										if(i8.create) i8.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode3);
										if(i8.insert) insertedVnodeQueue.push(vnode3);
									}
								}
							} else elm12 = vnode3.elm = window.document.createTextNode(vnode3.text);
							$r = vnode3.elm;
							return $r;
						}(this));
						elm6.insertBefore(new_node1,null);
					} while((function($this) {
						var $r;
						++startIdx;
						$r = startIdx <= endIdx;
						return $r;
					}(this)));
				} else if(oldCh != undefined) {
					var startIdx1 = 0;
					var endIdx1 = oldCh.length - 1;
					var y;
					y = 0;
					if(startIdx1 <= endIdx1) do {
						var i11;
						var listeners;
						var rm = null;
						var ch1 = oldCh[startIdx1];
						if(ch1 != undefined) {
							if(ch1.sel != undefined) {
								var vnode4 = ch1;
								var i12 = vnode4.data;
								var j;
								if(i12 != undefined) {
									if((i12 = i12.hook) != undefined && (i12 = i12.destroy) != undefined) i12(vnode4);
									var style3 = null;
									var name21;
									var elm18 = vnode4.elm;
									var s = vnode4.data.style;
									if(s == null) null; else {
										style3 = s.destroy;
										if(style3 == null) null; else {
											var _g35 = 0;
											var _g118 = Object.keys(style3);
											while(_g35 < _g118.length) {
												var name22 = _g118[_g35];
												++_g35;
												elm18.style[name22] = style3[name22];
											}
										}
									}
									if((i12 = vnode4.children) != undefined) {
										j = 0;
										if(j < vnode4.children.length) do snabbdom_engine_dom_PatchDom.invokeDestroyHook(vnode4.children[j]); while((function($this) {
											var $r;
											++j;
											$r = j < vnode4.children.length;
											return $r;
										}(this)));
									}
								}
								var vnode5 = ch1;
								var rm1 = rm;
								var rm2 = [rm1];
								var s1 = vnode5.data.style;
								if(!s1 || !s1.remove) {
									if(rm2[0] != null) rm2[0]();
									null;
								} else {
									var name23;
									var elm19 = [vnode5.elm];
									var idx;
									var i13 = 0;
									var maxDur = 0;
									var compStyle;
									var style4 = s1.remove;
									var amount = [0];
									var applied = [];
									var _g36 = 0;
									var _g119 = Object.keys(style4);
									while(_g36 < _g119.length) {
										var name24 = _g119[_g36];
										++_g36;
										applied.push(name24);
										elm19[0].style[name24] = style4[name24];
									}
									compStyle = window.getComputedStyle(elm19[0]);
									var props3 = compStyle["transition-property"].split(", ");
									var i14;
									i14 = 0;
									if(i14 < props3.length) do if(HxOverrides.indexOf(applied,props3[i14],0) != -1) amount[0]++; while((function($this) {
										var $r;
										++i14;
										$r = i14 < props3.length;
										return $r;
									}(this)));
									elm19[0].addEventListener("transitionend",(function(amount,elm19,rm2) {
										return function(ev6) {
											if(ev6.target == elm19[0]) --amount[0];
											if(amount[0] == 0) rm2[0]();
										};
									})(amount,elm19,rm2));
								}
								if((i11 = ch1.data) != undefined && (i11 = i11.hook) != undefined && (i11 = i11.remove) != undefined) i11(ch1,rm); else {
									console.log("remove");
									if(rm != null) rm();
									elm6.removeChild(ch1.elm);
								}
							} else elm6.removeChild(ch1.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx1;
						$r = startIdx1 <= endIdx1;
						return $r;
					}(this)));
				}
			} else if(oldVnode2.text != vnode2.text) elm6.textContent = vnode2.text;
			if(hook != undefined && (i4 = hook.postpatch) != undefined) i4(oldVnode2,vnode2);
		}
	}
	i = 0;
	if(i < insertedVnodeQueue.length) do insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]); while((function($this) {
		var $r;
		++i;
		$r = i < insertedVnodeQueue.length;
		return $r;
	}(this)));
	return vnode;
};
snabbdom_engine_dom_PatchDom.patch = function(oldVnode,vnode) {
	var i;
	var insertedVnodeQueue = [];
	var oldVnode1 = oldVnode;
	var vnode1 = vnode;
	var i1;
	var hook;
	if((i1 = vnode1.data) != undefined && (hook = i1.hook) != undefined && (i1 = hook.prepatch) != undefined) i1(oldVnode1,vnode1);
	if((i1 = oldVnode1.data) != undefined && (i1 = i1.vnode) != undefined) oldVnode1 = i1;
	if((i1 = vnode1.data) != undefined && (i1 = i1.vnode) != undefined) vnode1 = i1;
	var elm = vnode1.elm = oldVnode1.elm;
	var oldCh = oldVnode1.children;
	var ch = vnode1.children;
	if(oldVnode1 == vnode1) null; else {
		if(vnode1.data != undefined) {
			var key;
			var cur;
			var old;
			var elm1 = vnode1.elm;
			var oldAttrs = oldVnode1.data.attrs == null?{ }:oldVnode1.data.attrs;
			var attrs = vnode1.data.attrs == null?{ }:vnode1.data.attrs;
			var _g = 0;
			var _g1 = Object.keys(attrs);
			while(_g < _g1.length) {
				var key1 = _g1[_g];
				++_g;
				cur = attrs[key1];
				old = oldAttrs[key1];
				if(old != cur) {
					if(!cur && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key1]) elm1.removeAttribute(key1); else {
						var value = cur;
						elm1.setAttribute(key1,value);
					}
				}
			}
			var _g2 = 0;
			var _g11 = Object.keys(oldAttrs);
			while(_g2 < _g11.length) {
				var key2 = _g11[_g2];
				++_g2;
				if(!Object.prototype.hasOwnProperty.call(attrs,key2)) elm1.removeAttribute(key2);
			}
			var key3;
			var cur1;
			var old1;
			var elm2 = vnode1.elm;
			var oldProps = oldVnode1.data.props == null?{ }:oldVnode1.data.props;
			var props = vnode1.data.props == null?{ }:vnode1.data.props;
			var _g3 = 0;
			var _g12 = Object.keys(props);
			while(_g3 < _g12.length) {
				var key4 = _g12[_g3];
				++_g3;
				cur1 = props[key4];
				old1 = oldProps[key4];
				if(old1 != cur1) {
					var value1 = cur1;
					elm2[key4] = value1;
				}
			}
			var cur2;
			var name;
			var elm3 = vnode1.elm;
			var oldClass = oldVnode1.data.classes == null?{ }:oldVnode1.data.classes;
			var klass = vnode1.data.classes == null?{ }:vnode1.data.classes;
			var _g4 = 0;
			var _g13 = Object.keys(klass);
			while(_g4 < _g13.length) {
				var name1 = _g13[_g4];
				++_g4;
				cur2 = klass[name1];
				if(cur2 != oldClass[name1]) {
					if(cur2 == "add") elm3.classList.add(name1); else if(cur2 == "remove") elm3.classList.remove(name1);
				}
			}
			var cur3;
			var name2;
			var elm4 = vnode1.elm;
			var oldStyle = oldVnode1.data.style == null?{ }:oldVnode1.data.style;
			var style = vnode1.data.style == null?{ }:vnode1.data.style;
			var oldHasDel = Object.prototype.hasOwnProperty.call(oldStyle,"delayed");
			var _g5 = 0;
			var _g14 = Object.keys(style);
			while(_g5 < _g14.length) {
				var name3 = _g14[_g5];
				++_g5;
				cur3 = style[name3];
				if(name3 == "delayed") {
					var delayed = style.delayed;
					var oldDelayed = oldStyle.delayed;
					var _g21 = 0;
					var _g31 = Object.keys(delayed);
					while(_g21 < _g31.length) {
						var name4 = _g31[_g21];
						++_g21;
						cur3 = delayed[name4];
						if(!oldHasDel || cur3 != oldDelayed[name4]) {
							var obj = [elm4.style];
							var prop = [name4];
							var val = [cur3];
							var fn = [(function(val,prop,obj) {
								return function(i2) {
									var value2 = val[0];
									obj[0][prop[0]] = value2;
								};
							})(val,prop,obj)];
							window.requestAnimationFrame((function(fn) {
								return function(i3) {
									window.requestAnimationFrame(fn[0]);
								};
							})(fn));
						}
					}
				} else if(name3 != "remove" && cur3 != oldStyle[name3]) elm4.style[name3] = cur3;
			}
			var name5;
			var cur4;
			var old2;
			var elm5 = vnode1.elm;
			var oldOn = oldVnode1.data.on == null?{ }:oldVnode1.data.on;
			var on = vnode1.data.on == null?{ }:vnode1.data.on;
			js_Browser.alert(oldVnode1);
			if(on != null) {
				var _g6 = 0;
				var _g15 = Object.keys(on);
				while(_g6 < _g15.length) {
					var name6 = _g15[_g6];
					++_g6;
					js_Browser.alert(name6);
					cur4 = on[name6];
					old2 = oldOn[name6];
					if(old2 == null) {
						if(Array.isArray(cur4)) {
							var tmp;
							var arr = [cur4];
							tmp = (function(arr) {
								return function(ev) {
									if(arr[0].length == 2) arr[0][0](arr[0][1]); else arr[0][0].apply(undefined,arr[0].slice(1));
								};
							})(arr);
							elm5.addEventListener(name6,tmp);
						} else {
							cur4 = { fn : cur4};
							var value3 = cur4;
							on[name6] = value3;
							var tmp1;
							var o = [cur4];
							tmp1 = (function(o) {
								return function(ev1) {
									o[0].fn(ev1);
								};
							})(o);
							elm5.addEventListener(name6,tmp1);
						}
					} else if(Array.isArray(old2)) {
						var o1 = old2;
						o1.length = cur4.length;
						var _g22 = 0;
						while(_g22 < o1.length) {
							var el = o1[_g22];
							++_g22;
							old2[el] = cur4[el];
						}
						var value4 = old2;
						on[name6] = value4;
					} else {
						old2.fn = cur4;
						var value5 = old2;
						on[name6] = value5;
					}
				}
			}
			i1 = vnode1.data.hook;
			if(i1 != undefined && (i1 = i1.update) != undefined) i1(oldVnode1,vnode1);
		}
		if(vnode1.text == undefined) {
			if(oldCh != undefined && ch != undefined) {
				if(oldCh != ch) snabbdom_engine_dom_PatchDom.updateChildren(elm,oldCh,ch,insertedVnodeQueue);
			} else if(ch != undefined) {
				var startIdx = 0;
				var endIdx = ch.length - 1;
				var i4;
				var new_node;
				i4 = 0;
				if(startIdx <= endIdx) while(true) {
					var tmp2;
					var vnode2 = ch[startIdx];
					var i5;
					var data = vnode2.data;
					if(data != undefined) {
						if((i5 = data.hook) != undefined && (i5 = i5.init) != undefined) i5(vnode2);
						if((i5 = data.vnode) != undefined) vnode2 = i5;
					}
					var elm6;
					var children = vnode2.children;
					var sel = vnode2.sel;
					if(sel != undefined) {
						var hashIdx = sel.indexOf("#",0);
						var dotIdx = sel.indexOf(".",hashIdx);
						var hash = hashIdx > 0?hashIdx:sel.length;
						var dot = dotIdx > 0?dotIdx:sel.length;
						var tag = hashIdx != -1 || dotIdx != -1?sel.slice(0,Math.min(hash,dot)):sel;
						elm6 = vnode2.elm = data != undefined && (i5 = data.ns) != undefined?window.document.createElementNS(i5,tag):window.document.createElement(tag);
						if(hash < dot) {
							var value6 = sel.slice(hash + 1,dot);
							elm6.id = value6;
						}
						if(dotIdx > 0) {
							elm.className = sel.slice(dot+1).replace(snabbdom_engine_dom_PatchDom.rg, " ");;
						}
						if(Array.isArray(children)) {
							i5 = 0;
							if(i5 < children.length) while(true) {
								var new_node1 = snabbdom_engine_dom_PatchDom.createElm(children[i5],insertedVnodeQueue);
								elm6.appendChild(new_node1);
								var tmp4;
								++i5;
								tmp4 = i5 < children.length;
								if(!tmp4) break;
							}
						} else if(typeof vnode2.text == "string" || typeof vnode2.text == "number") {
							var element = window.document.createTextNode(vnode2.text);
							elm6.appendChild(element);
						}
						var oldVnode2 = snabbdom_engine_dom_PatchDom.emptyNode;
						var key5;
						var cur5;
						var old3;
						var elm7 = vnode2.elm;
						var oldAttrs1 = oldVnode2.data.attrs == null?{ }:oldVnode2.data.attrs;
						var attrs1 = vnode2.data.attrs == null?{ }:vnode2.data.attrs;
						var _g7 = 0;
						var _g16 = Object.keys(attrs1);
						while(_g7 < _g16.length) {
							var key6 = _g16[_g7];
							++_g7;
							cur5 = attrs1[key6];
							old3 = oldAttrs1[key6];
							if(old3 != cur5) {
								if(!cur5 && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key6]) elm7.removeAttribute(key6); else {
									var value7 = cur5;
									elm7.setAttribute(key6,value7);
								}
							}
						}
						var _g8 = 0;
						var _g17 = Object.keys(oldAttrs1);
						while(_g8 < _g17.length) {
							var key7 = _g17[_g8];
							++_g8;
							if(!Object.prototype.hasOwnProperty.call(attrs1,key7)) elm7.removeAttribute(key7);
						}
						var key8;
						var cur6;
						var old4;
						var elm8 = vnode2.elm;
						var oldProps1 = oldVnode2.data.props == null?{ }:oldVnode2.data.props;
						var props1 = vnode2.data.props == null?{ }:vnode2.data.props;
						var _g9 = 0;
						var _g18 = Object.keys(props1);
						while(_g9 < _g18.length) {
							var key9 = _g18[_g9];
							++_g9;
							cur6 = props1[key9];
							old4 = oldProps1[key9];
							if(old4 != cur6) {
								var value8 = cur6;
								elm8[key9] = value8;
							}
						}
						var cur7;
						var name7;
						var elm9 = vnode2.elm;
						var oldClass1 = oldVnode2.data.classes == null?{ }:oldVnode2.data.classes;
						var klass1 = vnode2.data.classes == null?{ }:vnode2.data.classes;
						var _g10 = 0;
						var _g19 = Object.keys(klass1);
						while(_g10 < _g19.length) {
							var name8 = _g19[_g10];
							++_g10;
							cur7 = klass1[name8];
							if(cur7 != oldClass1[name8]) {
								if(cur7 == "add") elm9.classList.add(name8); else if(cur7 == "remove") elm9.classList.remove(name8);
							}
						}
						var cur8;
						var name9;
						var elm10 = vnode2.elm;
						var oldStyle1 = oldVnode2.data.style == null?{ }:oldVnode2.data.style;
						var style1 = vnode2.data.style == null?{ }:vnode2.data.style;
						var oldHasDel1 = Object.prototype.hasOwnProperty.call(oldStyle1,"delayed");
						var _g20 = 0;
						var _g110 = Object.keys(style1);
						while(_g20 < _g110.length) {
							var name10 = _g110[_g20];
							++_g20;
							cur8 = style1[name10];
							if(name10 == "delayed") {
								var delayed1 = style1.delayed;
								var oldDelayed1 = oldStyle1.delayed;
								var _g23 = 0;
								var _g32 = Object.keys(delayed1);
								while(_g23 < _g32.length) {
									var name11 = _g32[_g23];
									++_g23;
									cur8 = delayed1[name11];
									if(!oldHasDel1 || cur8 != oldDelayed1[name11]) {
										var obj1 = [elm10.style];
										var prop1 = [name11];
										var val1 = [cur8];
										var fn1 = [(function(val1,prop1,obj1) {
											return function(i6) {
												var value9 = val1[0];
												obj1[0][prop1[0]] = value9;
											};
										})(val1,prop1,obj1)];
										window.requestAnimationFrame((function(fn1) {
											return function(i7) {
												window.requestAnimationFrame(fn1[0]);
											};
										})(fn1));
									}
								}
							} else if(name10 != "remove" && cur8 != oldStyle1[name10]) elm10.style[name10] = cur8;
						}
						var name12;
						var cur9;
						var old5;
						var elm11 = vnode2.elm;
						var oldOn1 = oldVnode2.data.on == null?{ }:oldVnode2.data.on;
						var on1 = vnode2.data.on == null?{ }:vnode2.data.on;
						js_Browser.alert(oldVnode2);
						if(on1 != null) {
							var _g24 = 0;
							var _g111 = Object.keys(on1);
							while(_g24 < _g111.length) {
								var name13 = _g111[_g24];
								++_g24;
								js_Browser.alert(name13);
								cur9 = on1[name13];
								old5 = oldOn1[name13];
								if(old5 == null) {
									if(Array.isArray(cur9)) {
										var tmp5;
										var arr1 = [cur9];
										tmp5 = (function(arr1) {
											return function(ev2) {
												if(arr1[0].length == 2) arr1[0][0](arr1[0][1]); else arr1[0][0].apply(undefined,arr1[0].slice(1));
											};
										})(arr1);
										elm11.addEventListener(name13,tmp5);
									} else {
										cur9 = { fn : cur9};
										var value10 = cur9;
										on1[name13] = value10;
										var tmp6;
										var o2 = [cur9];
										tmp6 = (function(o2) {
											return function(ev3) {
												o2[0].fn(ev3);
											};
										})(o2);
										elm11.addEventListener(name13,tmp6);
									}
								} else if(Array.isArray(old5)) {
									var o3 = old5;
									o3.length = cur9.length;
									var _g25 = 0;
									while(_g25 < o3.length) {
										var el1 = o3[_g25];
										++_g25;
										old5[el1] = cur9[el1];
									}
									var value11 = old5;
									on1[name13] = value11;
								} else {
									old5.fn = cur9;
									var value12 = old5;
									on1[name13] = value12;
								}
							}
						}
						if(vnode2.data != null) {
							i5 = vnode2.data.hook;
							if(i5 != undefined) {
								if(i5.create) i5.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode2);
								if(i5.insert) insertedVnodeQueue.push(vnode2);
							}
						}
					} else elm6 = vnode2.elm = window.document.createTextNode(vnode2.text);
					tmp2 = vnode2.elm;
					new_node = tmp2;
					elm.insertBefore(new_node,null);
					var tmp3;
					++startIdx;
					tmp3 = startIdx <= endIdx;
					if(!tmp3) break;
				}
			} else if(oldCh != undefined) {
				var startIdx1 = 0;
				var endIdx1 = oldCh.length - 1;
				var y;
				y = 0;
				if(startIdx1 <= endIdx1) while(true) {
					var i8;
					var listeners;
					var rm = null;
					var ch1 = oldCh[startIdx1];
					if(ch1 != undefined) {
						if(ch1.sel != undefined) {
							var vnode3 = ch1;
							var i9 = vnode3.data;
							var j;
							if(i9 != undefined) {
								if((i9 = i9.hook) != undefined && (i9 = i9.destroy) != undefined) i9(vnode3);
								var style2 = null;
								var name14;
								var elm12 = vnode3.elm;
								var s = vnode3.data.style;
								if(s == null) null; else {
									style2 = s.destroy;
									if(style2 == null) null; else {
										var _g26 = 0;
										var _g112 = Object.keys(style2);
										while(_g26 < _g112.length) {
											var name15 = _g112[_g26];
											++_g26;
											elm12.style[name15] = style2[name15];
										}
									}
								}
								if((i9 = vnode3.children) != undefined) {
									j = 0;
									if(j < vnode3.children.length) while(true) {
										snabbdom_engine_dom_PatchDom.invokeDestroyHook(vnode3.children[j]);
										var tmp8;
										++j;
										tmp8 = j < vnode3.children.length;
										if(!tmp8) break;
									}
								}
							}
							var vnode4 = ch1;
							var rm1 = rm;
							var rm2 = [rm1];
							var s1 = vnode4.data.style;
							if(!s1 || !s1.remove) {
								if(rm2[0] != null) rm2[0]();
								null;
							} else {
								var name16;
								var elm13 = [vnode4.elm];
								var idx;
								var i10 = 0;
								var maxDur = 0;
								var compStyle;
								var style3 = s1.remove;
								var amount = [0];
								var applied = [];
								var _g27 = 0;
								var _g113 = Object.keys(style3);
								while(_g27 < _g113.length) {
									var name17 = _g113[_g27];
									++_g27;
									applied.push(name17);
									elm13[0].style[name17] = style3[name17];
								}
								compStyle = window.getComputedStyle(elm13[0]);
								var props2 = compStyle["transition-property"].split(", ");
								var i11;
								i11 = 0;
								if(i11 < props2.length) while(true) {
									if(HxOverrides.indexOf(applied,props2[i11],0) != -1) amount[0]++;
									var tmp9;
									++i11;
									tmp9 = i11 < props2.length;
									if(!tmp9) break;
								}
								elm13[0].addEventListener("transitionend",(function(amount,elm13,rm2) {
									return function(ev4) {
										if(ev4.target == elm13[0]) --amount[0];
										if(amount[0] == 0) rm2[0]();
									};
								})(amount,elm13,rm2));
							}
							if((i8 = ch1.data) != undefined && (i8 = i8.hook) != undefined && (i8 = i8.remove) != undefined) i8(ch1,rm); else {
								console.log("remove");
								if(rm != null) rm();
								elm.removeChild(ch1.elm);
							}
						} else elm.removeChild(ch1.elm);
					}
					var tmp7;
					++startIdx1;
					tmp7 = startIdx1 <= endIdx1;
					if(!tmp7) break;
				}
			}
		} else if(oldVnode1.text != vnode1.text) elm.textContent = vnode1.text;
		if(hook != undefined && (i1 = hook.postpatch) != undefined) i1(oldVnode1,vnode1);
	}
	i = 0;
	if(i < insertedVnodeQueue.length) while(true) {
		insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
		var tmp10;
		++i;
		tmp10 = i < insertedVnodeQueue.length;
		if(!tmp10) break;
	}
	return vnode;
};
var snabbdom_engine_dom_plugins_Attributes = function() { };
snabbdom_engine_dom_plugins_Attributes.__name__ = true;
var thx_Arrays = function() { };
thx_Arrays.__name__ = true;
thx_Arrays.shuffle = function(a) {
	var t = thx_Ints.range(a.length);
	var array = [];
	while(t.length > 0) {
		var pos = Std.random(t.length);
		var index = t[pos];
		t.splice(pos,1);
		array.push(a[index]);
	}
	return array;
};
var thx_Ints = function() { };
thx_Ints.__name__ = true;
thx_Ints.range = function(start,stop,step) {
	if(step == null) step = 1;
	if(null == stop) {
		stop = start;
		start = 0;
	}
	if((stop - start) / step == Infinity) throw new js__$Boot_HaxeError("infinite range");
	var range = [];
	var i = -1;
	var j;
	if(step < 0) while((j = start + step * ++i) > stop) range.push(j); else while((j = start + step * ++i) < stop) range.push(j);
	return range;
};
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.__name__ = true;
Array.__name__ = true;

      // Production steps of ECMA-262, Edition 5, 15.4.4.21
      // Reference: http://es5.github.io/#x15.4.4.21
      if (!Array.prototype.reduce) {
        Array.prototype.reduce = function(callback /*, initialValue*/) {
          'use strict';
          if (this == null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
          }
          if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
          }
          var t = Object(this), len = t.length >>> 0, k = 0, value;
          if (arguments.length == 2) {
            value = arguments[1];
          } else {
            while (k < len && ! k in t) {
              k++;
            }
            if (k >= len) {
              throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
          }
          for (; k < len; k++) {
            if (k in t) {
              value = callback(value, t[k], k, t);
            }
          }
          return value;
        };
      }
    ;
snabbdom_engine_dom_PatchDom.rg = new RegExp("\\.","g");
snabbdom_engine_dom_PatchDom.emptyNode = (function($this) {
	var $r;
	var data = { };
	var elm = null;
	var key = data == null?null:data.key;
	$r = { sel : "", data : data, children : [], text : null, elm : elm, key : key};
	return $r;
}(this));
snabbdom_engine_dom_plugins_Attributes.booleanAttrs = ["allowfullscreen","async","autofocus","autoplay","checked","compact","controls","declare","default","defaultchecked","defaultmuted","defaultselected","defer","disabled","draggable","enabled","formnovalidate","hidden","indeterminate","inert","ismap","itemscope","loop","multiple","muted","nohref","noresize","noshade","novalidate","nowrap","open","pauseonexit","readonly","required","reversed","scoped","seamless","selected","sortable","spellcheck","translate","truespeed","typemustmatch","visible"];
snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict = (function($this) {
	var $r;
	var hash = { };
	var len = snabbdom_engine_dom_plugins_Attributes.booleanAttrs.length;
	var i = 0;
	{
		i = 0;
		if(i < len) do hash[snabbdom_engine_dom_plugins_Attributes.booleanAttrs[i]] = true; while((function($this) {
			var $r;
			i++;
			$r = i < len;
			return $r;
		}($this)));
	}
	$r = hash;
	return $r;
}(this));
snabbdom_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
