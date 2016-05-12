(function (console, $global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
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
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.random = function(x) {
	return x <= 0?0:Math.floor(Math.random() * x);
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
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
	,__class__: haxe_Timer
};
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af = f < 0?-f:f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av = v < 0?-v:v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var tmp;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		tmp = Math.round(v1);
		var sig = tmp;
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
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
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
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
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	this.offset = byteOffset == null?0:byteOffset;
	this.length = byteLength == null?buffer.byteLength - this.offset:byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		return v >= 128?v - 256:v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		return v >= 32768?v - 65536:v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		return littleEndian?this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8:this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		return littleEndian?a | b << 8 | c << 16 | d << 24:d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		return v < 0?v + 4294967296.:v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value < 0?value + 128 & 255:value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var partials_Partial = function() { };
partials_Partial.__name__ = true;
var snabbdom_Main = function() { };
snabbdom_Main.__name__ = true;
snabbdom_Main.click = function(e) {
};
snabbdom_Main.over = function(e) {
};
snabbdom_Main.out = function(e) {
};
snabbdom_Main.main = function() {
	var txt = "testo";
	var vnode = { sel : "div", data : { attrs : { id : "pippa"}}, children : [{ sel : "ul", data : { attrs : { }}, children : [{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "1"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "2"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "3"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "4"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "5"},{ sel : "li", data : { attrs : { }}, children : [{ sel : "span", data : { attrs : { }, on : { 'click' : snabbdom_Main.click}}, children : null, elm : null, key : null, text : txt}], elm : null, key : null, text : null}], elm : null, key : null, text : null}], elm : null, key : null, text : null};
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
		var max = 2;
		var list = (function($this) {
			var $r;
			var _g = [];
			{
				var _g1_min = 0;
				var _g1_max = max;
				while(_g1_min < _g1_max) {
					var x = _g1_min++;
					_g.push({ sel : "li", data : { attrs : { }}, children : [{ sel : "span", data : { attrs : { }}, children : null, elm : null, key : null, text : x}], elm : null, key : null, text : null});
				}
			}
			$r = _g;
			return $r;
		}(this));
		var vnode2 = { sel : "div", data : { attrs : { id : "pippa"}, on : { 'click' : snabbdom_Main.click, 'mouseout' : snabbdom_Main.out, 'mouseover' : snabbdom_Main.over}}, children : [{ sel : "span", data : { attrs : { }}, children : null, elm : null, key : null, text : max},{ sel : "ul", data : { attrs : { }, style : { fontSize : "30px", color : color, backgroundColor : bg}}, children : list, elm : null, key : null, text : null}], elm : null, key : null, text : null};
		if(last_node == null) snabbdom_engine_dom_PatchDom.patchDom(window.document.getElementById("container"),vnode2); else snabbdom_engine_dom_PatchDom.patch(last_node,vnode2);
		last_node = vnode2;
	};
	timer.run();
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
		elm = vnode.elm = data != undefined && (i = data.ns) != undefined?(function($this) {
			var $r;
			var ns = i;
			$r = window.document.createElementNS(ns,tag);
			return $r;
		}(this)):window.document.createElement(tag);
		if(hash < dot) {
			var value = sel.slice(hash + 1,dot);
			elm.id = value;
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
		if(on != { }) {
			var _g6 = 0;
			var _g15 = Object.keys(on);
			while(_g6 < _g15.length) {
				var name6 = _g15[_g6];
				++_g6;
				cur4 = on[name6];
				old2 = oldOn[name6];
				if(old2 == null) {
					var value4 = cur4;
					on[name6] = value4;
					var cb = cur4;
					elm5.addEventListener(name6,cb);
				} else {
					var value5 = cur4;
					on[name6] = value5;
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
	} else elm = vnode.elm = (function($this) {
		var $r;
		var nd = window.document.createTextNode(vnode.text);
		$r = nd;
		return $r;
	}(this));
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
		snabbdom_engine_dom_PatchDom.patchVnode(oldStartVnode,newStartVnode,insertedVnodeQueue);
		oldStartVnode = oldCh[++oldStartIdx];
		newStartVnode = newCh[++newStartIdx];
	} else if(oldEndVnode.key == newEndVnode.key && oldEndVnode.sel == newEndVnode.sel) {
		snabbdom_engine_dom_PatchDom.patchVnode(oldEndVnode,newEndVnode,insertedVnodeQueue);
		oldEndVnode = oldCh[--oldEndIdx];
		newEndVnode = newCh[--newEndIdx];
	} else if(oldStartVnode.key == newEndVnode.key && oldStartVnode.sel == newEndVnode.sel) {
		snabbdom_engine_dom_PatchDom.patchVnode(oldStartVnode,newEndVnode,insertedVnodeQueue);
		parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling);
		oldStartVnode = oldCh[++oldStartIdx];
		newEndVnode = newCh[--newEndIdx];
	} else if(oldEndVnode.key == newStartVnode.key && oldEndVnode.sel == newStartVnode.sel) {
		snabbdom_engine_dom_PatchDom.patchVnode(oldEndVnode,newStartVnode,insertedVnodeQueue);
		parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm);
		oldEndVnode = oldCh[--oldEndIdx];
		newStartVnode = newCh[++newStartIdx];
	} else {
		if(oldKeyToIdx == undefined) oldKeyToIdx = (function($this) {
			var $r;
			var i;
			var map = { };
			var key;
			{
				i = oldStartIdx;
				if(i <= oldEndIdx) do {
					key = oldCh[i].key;
					if(key != undefined) map[key] = i;
				} while((function($this) {
					var $r;
					++i;
					$r = i <= oldEndIdx;
					return $r;
				}($this)));
			}
			$r = map;
			return $r;
		}(this));
		idxInOld = oldKeyToIdx[newStartVnode.key];
		if(idxInOld == undefined) {
			var new_node1 = (function($this) {
				var $r;
				var vnode = newStartVnode;
				var i1;
				var data = vnode.data;
				if(data != undefined) {
					if((i1 = data.hook) != undefined && (i1 = i1.init) != undefined) i1(vnode);
					if((i1 = data.vnode) != undefined) vnode = i1;
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
					elm = vnode.elm = data != undefined && (i1 = data.ns) != undefined?(function($this) {
						var $r;
						var ns = i1;
						$r = window.document.createElementNS(ns,tag);
						return $r;
					}($this)):window.document.createElement(tag);
					if(hash < dot) {
						var value = sel.slice(hash + 1,dot);
						elm.id = value;
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
						}($this)));
					} else if(typeof vnode.text == "string" || typeof vnode.text == "number") {
						var element = window.document.createTextNode(vnode.text);
						elm.appendChild(element);
					}
					var oldVnode = snabbdom_engine_dom_PatchDom.emptyNode;
					var key1;
					var cur;
					var old;
					var elm1 = vnode.elm;
					var oldAttrs = oldVnode.data.attrs == null?{ }:oldVnode.data.attrs;
					var attrs = vnode.data.attrs == null?{ }:vnode.data.attrs;
					var _g = 0;
					var _g1 = Object.keys(attrs);
					while(_g < _g1.length) {
						var key2 = _g1[_g];
						++_g;
						cur = attrs[key2];
						old = oldAttrs[key2];
						if(old != cur) {
							if(!cur && snabbdom_engine_dom_plugins_Attributes.booleanAttrsDict[key2]) elm1.removeAttribute(key2); else {
								var value1 = cur;
								elm1.setAttribute(key2,value1);
							}
						}
					}
					var _g2 = 0;
					var _g11 = Object.keys(oldAttrs);
					while(_g2 < _g11.length) {
						var key3 = _g11[_g2];
						++_g2;
						if(!Object.prototype.hasOwnProperty.call(attrs,key3)) elm1.removeAttribute(key3);
					}
					var key4;
					var cur1;
					var old1;
					var elm2 = vnode.elm;
					var oldProps = oldVnode.data.props == null?{ }:oldVnode.data.props;
					var props = vnode.data.props == null?{ }:vnode.data.props;
					var _g3 = 0;
					var _g12 = Object.keys(props);
					while(_g3 < _g12.length) {
						var key5 = _g12[_g3];
						++_g3;
						cur1 = props[key5];
						old1 = oldProps[key5];
						if(old1 != cur1) {
							var value2 = cur1;
							elm2[key5] = value2;
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
					var elm5 = vnode.elm;
					var oldOn = oldVnode.data.on == null?{ }:oldVnode.data.on;
					var on = vnode.data.on == null?{ }:vnode.data.on;
					if(on != { }) {
						var _g6 = 0;
						var _g15 = Object.keys(on);
						while(_g6 < _g15.length) {
							var name6 = _g15[_g6];
							++_g6;
							cur4 = on[name6];
							old2 = oldOn[name6];
							if(old2 == null) {
								var value4 = cur4;
								on[name6] = value4;
								var cb = cur4;
								elm5.addEventListener(name6,cb);
							} else {
								var value5 = cur4;
								on[name6] = value5;
							}
						}
					}
					if(vnode.data != null) {
						i1 = vnode.data.hook;
						if(i1 != undefined) {
							if(i1.create) i1.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode);
							if(i1.insert) insertedVnodeQueue.push(vnode);
						}
					}
				} else elm = vnode.elm = (function($this) {
					var $r;
					var nd = window.document.createTextNode(vnode.text);
					$r = nd;
					return $r;
				}($this));
				$r = vnode.elm;
				return $r;
			}(this));
			parentElm.insertBefore(new_node1,oldStartVnode.elm);
			newStartVnode = newCh[++newStartIdx];
		} else {
			elmToMove = oldCh[idxInOld];
			snabbdom_engine_dom_PatchDom.patchVnode(elmToMove,newStartVnode,insertedVnodeQueue);
			oldCh[idxInOld] = null;
			parentElm.insertBefore(elmToMove.elm,oldStartVnode.elm);
			newStartVnode = newCh[++newStartIdx];
		}
	}
	if(oldStartIdx > oldEndIdx) {
		before = newCh[newEndIdx + 1] == undefined?null:newCh[newEndIdx + 1].elm;
		var startIdx = newStartIdx;
		var i4;
		var new_node2;
		i4 = 0;
		if(startIdx <= newEndIdx) do {
			new_node2 = (function($this) {
				var $r;
				var vnode1 = newCh[startIdx];
				var i5;
				var data1 = vnode1.data;
				if(data1 != undefined) {
					if((i5 = data1.hook) != undefined && (i5 = i5.init) != undefined) i5(vnode1);
					if((i5 = data1.vnode) != undefined) vnode1 = i5;
				}
				var elm6;
				var children1 = vnode1.children;
				var sel1 = vnode1.sel;
				if(sel1 != undefined) {
					var hashIdx1 = sel1.indexOf("#",0);
					var dotIdx1 = sel1.indexOf(".",hashIdx1);
					var hash1 = hashIdx1 > 0?hashIdx1:sel1.length;
					var dot1 = dotIdx1 > 0?dotIdx1:sel1.length;
					var tag1 = hashIdx1 != -1 || dotIdx1 != -1?sel1.slice(0,Math.min(hash1,dot1)):sel1;
					elm6 = vnode1.elm = data1 != undefined && (i5 = data1.ns) != undefined?(function($this) {
						var $r;
						var ns1 = i5;
						$r = window.document.createElementNS(ns1,tag1);
						return $r;
					}($this)):window.document.createElement(tag1);
					if(hash1 < dot1) {
						var value6 = sel1.slice(hash1 + 1,dot1);
						elm6.id = value6;
					}
					if(Array.isArray(children1)) {
						i5 = 0;
						if(i5 < children1.length) do {
							var new_node3 = snabbdom_engine_dom_PatchDom.createElm(children1[i5],insertedVnodeQueue);
							elm6.appendChild(new_node3);
						} while((function($this) {
							var $r;
							++i5;
							$r = i5 < children1.length;
							return $r;
						}($this)));
					} else if(typeof vnode1.text == "string" || typeof vnode1.text == "number") {
						var element1 = window.document.createTextNode(vnode1.text);
						elm6.appendChild(element1);
					}
					var oldVnode1 = snabbdom_engine_dom_PatchDom.emptyNode;
					var key6;
					var cur5;
					var old3;
					var elm7 = vnode1.elm;
					var oldAttrs1 = oldVnode1.data.attrs == null?{ }:oldVnode1.data.attrs;
					var attrs1 = vnode1.data.attrs == null?{ }:vnode1.data.attrs;
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
					var elm8 = vnode1.elm;
					var oldProps1 = oldVnode1.data.props == null?{ }:oldVnode1.data.props;
					var props1 = vnode1.data.props == null?{ }:vnode1.data.props;
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
							var _g22 = 0;
							var _g32 = Object.keys(delayed1);
							while(_g22 < _g32.length) {
								var name11 = _g32[_g22];
								++_g22;
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
					var elm11 = vnode1.elm;
					var oldOn1 = oldVnode1.data.on == null?{ }:oldVnode1.data.on;
					var on1 = vnode1.data.on == null?{ }:vnode1.data.on;
					if(on1 != { }) {
						var _g23 = 0;
						var _g111 = Object.keys(on1);
						while(_g23 < _g111.length) {
							var name13 = _g111[_g23];
							++_g23;
							cur9 = on1[name13];
							old5 = oldOn1[name13];
							if(old5 == null) {
								var value10 = cur9;
								on1[name13] = value10;
								var cb1 = cur9;
								elm11.addEventListener(name13,cb1);
							} else {
								var value11 = cur9;
								on1[name13] = value11;
							}
						}
					}
					if(vnode1.data != null) {
						i5 = vnode1.data.hook;
						if(i5 != undefined) {
							if(i5.create) i5.create(snabbdom_engine_dom_PatchDom.emptyNode,vnode1);
							if(i5.insert) insertedVnodeQueue.push(vnode1);
						}
					}
				} else elm6 = vnode1.elm = (function($this) {
					var $r;
					var nd1 = window.document.createTextNode(vnode1.text);
					$r = nd1;
					return $r;
				}($this));
				$r = vnode1.elm;
				return $r;
			}(this));
			parentElm.insertBefore(new_node2,before);
		} while((function($this) {
			var $r;
			++startIdx;
			$r = startIdx <= newEndIdx;
			return $r;
		}(this)));
	} else if(newStartIdx > newEndIdx) {
		var startIdx1 = oldStartIdx;
		var y;
		y = 0;
		if(startIdx1 <= oldEndIdx) do {
			var i8;
			var listeners;
			var rm = null;
			var ch = oldCh[startIdx1];
			if(ch != undefined) {
				if(ch.sel != undefined) {
					var vnode2 = ch;
					var i9 = vnode2.data;
					var j;
					if(i9 != undefined) {
						if((i9 = i9.hook) != undefined && (i9 = i9.destroy) != undefined) i9(vnode2);
						var style2 = null;
						var name14;
						var elm12 = vnode2.elm;
						var s = vnode2.data.style;
						if(s == null) null; else {
							style2 = s.destroy;
							if(style2 == null) null; else {
								var _g24 = 0;
								var _g112 = Object.keys(style2);
								while(_g24 < _g112.length) {
									var name15 = _g112[_g24];
									++_g24;
									elm12.style[name15] = style2[name15];
								}
							}
						}
						if((i9 = vnode2.children) != undefined) {
							j = 0;
							if(j < vnode2.children.length) do snabbdom_engine_dom_PatchDom.invokeDestroyHook(vnode2.children[j]); while((function($this) {
								var $r;
								++j;
								$r = j < vnode2.children.length;
								return $r;
							}(this)));
						}
					}
					var vnode3 = ch;
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
						var i10 = 0;
						var maxDur = 0;
						var compStyle;
						var style3 = s1.remove;
						var amount = [0];
						var applied = [];
						var _g25 = 0;
						var _g113 = Object.keys(style3);
						while(_g25 < _g113.length) {
							var name17 = _g113[_g25];
							++_g25;
							applied.push(name17);
							elm13[0].style[name17] = style3[name17];
						}
						compStyle = window.getComputedStyle(elm13[0]);
						var props2 = compStyle["transition-property"].split(", ");
						var i11;
						i11 = 0;
						if(i11 < props2.length) do if(HxOverrides.indexOf(applied,props2[i11],0) != -1) amount[0]++; while((function($this) {
							var $r;
							++i11;
							$r = i11 < props2.length;
							return $r;
						}(this)));
						elm13[0].addEventListener("transitionend",(function(amount,elm13,rm2) {
							return function(ev) {
								if(ev.target == elm13[0]) --amount[0];
								if(amount[0] == 0) rm2[0]();
							};
						})(amount,elm13,rm2));
					}
					if((i8 = ch.data) != undefined && (i8 = i8.hook) != undefined && (i8 = i8.remove) != undefined) i8(ch,rm); else {
						if(rm != null) rm();
						var element2 = ch.elm;
						parentElm.removeChild(element2);
					}
				} else {
					var element3 = ch.elm;
					parentElm.removeChild(element3);
				}
			}
		} while((function($this) {
			var $r;
			++startIdx1;
			$r = startIdx1 <= oldEndIdx;
			return $r;
		}(this)));
	}
};
snabbdom_engine_dom_PatchDom.patchVnode = function(oldVnode,vnode,insertedVnodeQueue) {
	var i;
	var hook;
	if((i = vnode.data) != undefined && (hook = i.hook) != undefined && (i = hook.prepatch) != undefined) i(oldVnode,vnode);
	if((i = oldVnode.data) != undefined && (i = i.vnode) != undefined) oldVnode = i;
	if((i = vnode.data) != undefined && (i = i.vnode) != undefined) vnode = i;
	var elm = vnode.elm = oldVnode.elm;
	var oldCh = oldVnode.children;
	var ch = vnode.children;
	if(oldVnode == vnode) return;
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
		if(on != { }) {
			var _g6 = 0;
			var _g15 = Object.keys(on);
			while(_g6 < _g15.length) {
				var name6 = _g15[_g6];
				++_g6;
				cur4 = on[name6];
				old2 = oldOn[name6];
				if(old2 == null) {
					var value3 = cur4;
					on[name6] = value3;
					var cb = cur4;
					elm5.addEventListener(name6,cb);
				} else {
					var value4 = cur4;
					on[name6] = value4;
				}
			}
		}
		i = vnode.data.hook;
		if(i != undefined && (i = i.update) != undefined) i(oldVnode,vnode);
	}
	if(vnode.text == undefined) {
		if(oldCh != undefined && ch != undefined) {
			if(oldCh != ch) snabbdom_engine_dom_PatchDom.updateChildren(elm,oldCh,ch,insertedVnodeQueue);
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
						elm6 = vnode1.elm = data != undefined && (i4 = data.ns) != undefined?(function($this) {
							var $r;
							var ns = i4;
							$r = window.document.createElementNS(ns,tag);
							return $r;
						}($this)):window.document.createElement(tag);
						if(hash < dot) {
							var value5 = sel.slice(hash + 1,dot);
							elm6.id = value5;
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
									var value6 = cur5;
									elm7.setAttribute(key6,value6);
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
								var value7 = cur6;
								elm8[key9] = value7;
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
								var _g22 = 0;
								var _g32 = Object.keys(delayed1);
								while(_g22 < _g32.length) {
									var name11 = _g32[_g22];
									++_g22;
									cur8 = delayed1[name11];
									if(!oldHasDel1 || cur8 != oldDelayed1[name11]) {
										var obj1 = [elm10.style];
										var prop1 = [name11];
										var val1 = [cur8];
										var fn1 = [(function(val1,prop1,obj1) {
											return function(i5) {
												var value8 = val1[0];
												obj1[0][prop1[0]] = value8;
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
						if(on1 != { }) {
							var _g23 = 0;
							var _g111 = Object.keys(on1);
							while(_g23 < _g111.length) {
								var name13 = _g111[_g23];
								++_g23;
								cur9 = on1[name13];
								old5 = oldOn1[name13];
								if(old5 == null) {
									var value9 = cur9;
									on1[name13] = value9;
									var cb1 = cur9;
									elm11.addEventListener(name13,cb1);
								} else {
									var value10 = cur9;
									on1[name13] = value10;
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
					} else elm6 = vnode1.elm = (function($this) {
						var $r;
						var nd = window.document.createTextNode(vnode1.text);
						$r = nd;
						return $r;
					}($this));
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
		} else if(oldCh != undefined) {
			var startIdx1 = 0;
			var endIdx1 = oldCh.length - 1;
			var y;
			y = 0;
			if(startIdx1 <= endIdx1) do {
				var i7;
				var listeners;
				var rm = null;
				var ch1 = oldCh[startIdx1];
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
									var _g24 = 0;
									var _g112 = Object.keys(style2);
									while(_g24 < _g112.length) {
										var name15 = _g112[_g24];
										++_g24;
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
							var _g25 = 0;
							var _g113 = Object.keys(style3);
							while(_g25 < _g113.length) {
								var name17 = _g113[_g25];
								++_g25;
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
								return function(ev) {
									if(ev.target == elm13[0]) --amount[0];
									if(amount[0] == 0) rm2[0]();
								};
							})(amount,elm13,rm2));
						}
						if((i7 = ch1.data) != undefined && (i7 = i7.hook) != undefined && (i7 = i7.remove) != undefined) i7(ch1,rm); else {
							if(rm != null) rm();
							var element1 = ch1.elm;
							elm.removeChild(element1);
						}
					} else {
						var element2 = ch1.elm;
						elm.removeChild(element2);
					}
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
			elm = vnode1.elm = data != undefined && (i1 = data.ns) != undefined?(function($this) {
				var $r;
				var ns = i1;
				$r = window.document.createElementNS(ns,tag);
				return $r;
			}(this)):window.document.createElement(tag);
			if(hash < dot) {
				var value = sel.slice(hash + 1,dot);
				elm.id = value;
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
			if(on != { }) {
				var _g6 = 0;
				var _g15 = Object.keys(on);
				while(_g6 < _g15.length) {
					var name6 = _g15[_g6];
					++_g6;
					cur4 = on[name6];
					old2 = oldOn[name6];
					if(old2 == null) {
						var value4 = cur4;
						on[name6] = value4;
						var cb = cur4;
						elm5.addEventListener(name6,cb);
					} else {
						var value5 = cur4;
						on[name6] = value5;
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
		} else elm = vnode1.elm = (function($this) {
			var $r;
			var nd = window.document.createTextNode(vnode1.text);
			$r = nd;
			return $r;
		}(this));
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
		snabbdom_engine_dom_PatchDom.patchVnode(oldVnode,vnode,insertedVnodeQueue);
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
	snabbdom_engine_dom_PatchDom.patchVnode(oldVnode,vnode,insertedVnodeQueue);
	i = 0;
	if(0 < insertedVnodeQueue.length) while(true) {
		insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
		var tmp;
		++i;
		tmp = i < insertedVnodeQueue.length;
		if(!tmp) break;
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
var thx_Either = { __ename__ : true, __constructs__ : ["Left","Right"] };
thx_Either.Left = function(value) { var $x = ["Left",0,value]; $x.__enum__ = thx_Either; $x.toString = $estr; return $x; };
thx_Either.Right = function(value) { var $x = ["Right",1,value]; $x.__enum__ = thx_Either; $x.toString = $estr; return $x; };
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
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;

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
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
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
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
