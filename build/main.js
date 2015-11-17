(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
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
var Std = function() { };
Std.random = function(x) {
	return x <= 0?0:Math.floor(Math.random() * x);
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
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
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var snabbdom_Main = function() { };
snabbdom_Main.main = function() {
	var txt = "testo";
	var vnode = { sel : "div", data : { attrs : { id : "pippa"}}, children : [{ sel : "ul", data : { attrs : { }}, children : [{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "1"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "2"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "3"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "4"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "5"},{ sel : "li", data : { attrs : { }}, children : [{ sel : "span", data : { attrs : { }}, children : null, elm : null, key : null, text : txt}], elm : null, key : null, text : null}], elm : null, key : null, text : null}], elm : null, key : null, text : null};
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
			var x = Math.random() * 10;
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
					_g.push({ sel : "span", data : { attrs : { }}, children : null, elm : null, key : null, text : x1});
				}
			}
			$r = _g;
			return $r;
		}(this));
		var vnode2 = { sel : "div", data : { attrs : { id : "pippa"}}, children : [{ sel : "ul", data : { attrs : { }, style : { fontSize : "30px", color : color, backgroundColor : bg}}, children : [{ sel : "li", data : { attrs : { }}, children : list, elm : null, key : null, text : null},{ sel : "li", data : { attrs : { }}, children : [{ sel : "span", data : { attrs : { }}, children : null, elm : null, key : null, text : max}], elm : null, key : null, text : null}], elm : null, key : null, text : null}], elm : null, key : null, text : null};
		if(last_node == null) snabbdom_Patch.patchDom(window.document.getElementById("container"),vnode2); else snabbdom_Patch.patch(last_node,vnode2);
		last_node = vnode2;
	};
};
var snabbdom_Patch = function() { };
snabbdom_Patch.createElm = function(vnode,insertedVnodeQueue) {
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
		if(hash < dot) elm.id = sel.slice(hash + 1,dot);
		if(dotIdx > 0) {
			elm.className = sel.slice(dot+1).replace(snabbdom_Patch.rg, " ");;
		}
		if(Array.isArray(children)) {
			i = 0;
			if(i < children.length) do {
				var new_node = snabbdom_Patch.createElm(children[i],insertedVnodeQueue);
				elm.appendChild(new_node);
			} while((function($this) {
				var $r;
				++i;
				$r = i < children.length;
				return $r;
			}(this)));
		} else if(typeof vnode.text == "string" || typeof vnode.text == "number") elm.appendChild(window.document.createTextNode(vnode.text));
		var oldVnode = snabbdom_Patch.emptyNode;
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
				if(!cur && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key1]) elm1.removeAttribute(key1); else elm1.setAttribute(key1,cur);
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
				var value = cur1;
				elm2[key4] = value;
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
								var value1 = val[0];
								obj[0][prop[0]] = value1;
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
		if(vnode.data != null) {
			i = vnode.data.hook;
			if(i != undefined) {
				if(i.create) i.create(snabbdom_Patch.emptyNode,vnode);
				if(i.insert) insertedVnodeQueue.push(vnode);
			}
		}
	} else elm = vnode.elm = window.document.createTextNode(vnode.text);
	return vnode.elm;
};
snabbdom_Patch.invokeDestroyHook = function(vnode) {
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
			if(j < vnode.children.length) do snabbdom_Patch.invokeDestroyHook(vnode.children[j]); while((function($this) {
				var $r;
				++j;
				$r = j < vnode.children.length;
				return $r;
			}(this)));
		}
	}
};
snabbdom_Patch.updateChildren = function(parentElm,oldCh,newCh,insertedVnodeQueue) {
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
						if(!cur && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key1]) elm1.removeAttribute(key1); else elm1.setAttribute(key1,cur);
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
						var value = cur1;
						elm2[key4] = value;
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
										var value1 = val[0];
										obj[0][prop[0]] = value1;
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
				i = vnode.data.hook;
				if(i != undefined && (i = i.update) != undefined) i(oldVnode,vnode);
			}
			if(vnode.text == undefined) {
				if(oldCh1 != undefined && ch != undefined) {
					if(oldCh1 != ch) snabbdom_Patch.updateChildren(elm,oldCh1,ch,insertedVnodeQueue);
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
							var elm5;
							var children = vnode1.children;
							var sel = vnode1.sel;
							if(sel != undefined) {
								var hashIdx = sel.indexOf("#",0);
								var dotIdx = sel.indexOf(".",hashIdx);
								var hash = hashIdx > 0?hashIdx:sel.length;
								var dot = dotIdx > 0?dotIdx:sel.length;
								var tag = hashIdx != -1 || dotIdx != -1?sel.slice(0,Math.min(hash,dot)):sel;
								elm5 = vnode1.elm = data != undefined && (i4 = data.ns) != undefined?(function($this) {
									var $r;
									var ns = i4;
									$r = window.document.createElementNS(ns,tag);
									return $r;
								}($this)):window.document.createElement(tag);
								if(hash < dot) elm5.id = sel.slice(hash + 1,dot);
								if(dotIdx > 0) {
									elm.className = sel.slice(dot+1).replace(snabbdom_Patch.rg, " ");;
								}
								if(Array.isArray(children)) {
									i4 = 0;
									if(i4 < children.length) do {
										var new_node1 = snabbdom_Patch.createElm(children[i4],insertedVnodeQueue);
										elm5.appendChild(new_node1);
									} while((function($this) {
										var $r;
										++i4;
										$r = i4 < children.length;
										return $r;
									}($this)));
								} else if(typeof vnode1.text == "string" || typeof vnode1.text == "number") elm5.appendChild(window.document.createTextNode(vnode1.text));
								var oldVnode1 = snabbdom_Patch.emptyNode;
								var key5;
								var cur4;
								var old2;
								var elm6 = vnode1.elm;
								var oldAttrs1 = oldVnode1.data.attrs == null?{ }:oldVnode1.data.attrs;
								var attrs1 = vnode1.data.attrs == null?{ }:vnode1.data.attrs;
								var _g6 = 0;
								var _g15 = Object.keys(attrs1);
								while(_g6 < _g15.length) {
									var key6 = _g15[_g6];
									++_g6;
									cur4 = attrs1[key6];
									old2 = oldAttrs1[key6];
									if(old2 != cur4) {
										if(!cur4 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key6]) elm6.removeAttribute(key6); else elm6.setAttribute(key6,cur4);
									}
								}
								var _g7 = 0;
								var _g16 = Object.keys(oldAttrs1);
								while(_g7 < _g16.length) {
									var key7 = _g16[_g7];
									++_g7;
									if(!Object.prototype.hasOwnProperty.call(attrs1,key7)) elm6.removeAttribute(key7);
								}
								var key8;
								var cur5;
								var old3;
								var elm7 = vnode1.elm;
								var oldProps1 = oldVnode1.data.props == null?{ }:oldVnode1.data.props;
								var props1 = vnode1.data.props == null?{ }:vnode1.data.props;
								var _g8 = 0;
								var _g17 = Object.keys(props1);
								while(_g8 < _g17.length) {
									var key9 = _g17[_g8];
									++_g8;
									cur5 = props1[key9];
									old3 = oldProps1[key9];
									if(old3 != cur5) {
										var value2 = cur5;
										elm7[key9] = value2;
									}
								}
								var cur6;
								var name5;
								var elm8 = vnode1.elm;
								var oldClass1 = oldVnode1.data.classes == null?{ }:oldVnode1.data.classes;
								var klass1 = vnode1.data.classes == null?{ }:vnode1.data.classes;
								var _g9 = 0;
								var _g18 = Object.keys(klass1);
								while(_g9 < _g18.length) {
									var name6 = _g18[_g9];
									++_g9;
									cur6 = klass1[name6];
									if(cur6 != oldClass1[name6]) {
										if(cur6 == "add") elm8.classList.add(name6); else if(cur6 == "remove") elm8.classList.remove(name6);
									}
								}
								var cur7;
								var name7;
								var elm9 = vnode1.elm;
								var oldStyle1 = oldVnode1.data.style == null?{ }:oldVnode1.data.style;
								var style1 = vnode1.data.style == null?{ }:vnode1.data.style;
								var oldHasDel1 = Object.prototype.hasOwnProperty.call(oldStyle1,"delayed");
								var _g10 = 0;
								var _g19 = Object.keys(style1);
								while(_g10 < _g19.length) {
									var name8 = _g19[_g10];
									++_g10;
									cur7 = style1[name8];
									if(name8 == "delayed") {
										var delayed1 = style1.delayed;
										var oldDelayed1 = oldStyle1.delayed;
										var _g22 = 0;
										var _g32 = Object.keys(delayed1);
										while(_g22 < _g32.length) {
											var name9 = _g32[_g22];
											++_g22;
											cur7 = delayed1[name9];
											if(!oldHasDel1 || cur7 != oldDelayed1[name9]) {
												var obj1 = [elm9.style];
												var prop1 = [name9];
												var val1 = [cur7];
												var fn1 = [(function(val1,prop1,obj1) {
													return function(i5) {
														var value3 = val1[0];
														obj1[0][prop1[0]] = value3;
													};
												})(val1,prop1,obj1)];
												window.requestAnimationFrame((function(fn1) {
													return function(i6) {
														window.requestAnimationFrame(fn1[0]);
													};
												})(fn1));
											}
										}
									} else if(name8 != "remove" && cur7 != oldStyle1[name8]) elm9.style[name8] = cur7;
								}
								if(vnode1.data != null) {
									i4 = vnode1.data.hook;
									if(i4 != undefined) {
										if(i4.create) i4.create(snabbdom_Patch.emptyNode,vnode1);
										if(i4.insert) insertedVnodeQueue.push(vnode1);
									}
								}
							} else elm5 = vnode1.elm = window.document.createTextNode(vnode1.text);
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
									var name10;
									var elm10 = vnode2.elm;
									var s = vnode2.data.style;
									if(s == null) null; else {
										style2 = s.destroy;
										if(style2 == null) null; else {
											var _g20 = 0;
											var _g110 = Object.keys(style2);
											while(_g20 < _g110.length) {
												var name11 = _g110[_g20];
												++_g20;
												elm10.style[name11] = style2[name11];
											}
										}
									}
									if((i8 = vnode2.children) != undefined) {
										j = 0;
										if(j < vnode2.children.length) do snabbdom_Patch.invokeDestroyHook(vnode2.children[j]); while((function($this) {
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
									var name12;
									var elm11 = [vnode3.elm];
									var idx;
									var i9 = 0;
									var maxDur = 0;
									var compStyle;
									var style3 = s1.remove;
									var amount = [0];
									var applied = [];
									var _g23 = 0;
									var _g111 = Object.keys(style3);
									while(_g23 < _g111.length) {
										var name13 = _g111[_g23];
										++_g23;
										applied.push(name13);
										elm11[0].style[name13] = style3[name13];
									}
									compStyle = window.getComputedStyle(elm11[0]);
									var props2 = compStyle["transition-property"].split(", ");
									var i10;
									i10 = 0;
									if(i10 < props2.length) do if(HxOverrides.indexOf(applied,props2[i10],0) != -1) amount[0]++; while((function($this) {
										var $r;
										++i10;
										$r = i10 < props2.length;
										return $r;
									}(this)));
									elm11[0].addEventListener("transitionend",(function(amount,elm11,rm2) {
										return function(ev) {
											if(ev.target == elm11[0]) --amount[0];
											if(amount[0] == 0) rm2[0]();
										};
									})(amount,elm11,rm2));
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
		var elm12 = vnode4.elm = oldVnode2.elm;
		var oldCh2 = oldVnode2.children;
		var ch2 = vnode4.children;
		if(oldVnode2 == vnode4) null; else {
			if(vnode4.data != undefined) {
				var key10;
				var cur8;
				var old4;
				var elm13 = vnode4.elm;
				var oldAttrs2 = oldVnode2.data.attrs == null?{ }:oldVnode2.data.attrs;
				var attrs2 = vnode4.data.attrs == null?{ }:vnode4.data.attrs;
				var _g24 = 0;
				var _g112 = Object.keys(attrs2);
				while(_g24 < _g112.length) {
					var key11 = _g112[_g24];
					++_g24;
					cur8 = attrs2[key11];
					old4 = oldAttrs2[key11];
					if(old4 != cur8) {
						if(!cur8 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key11]) elm13.removeAttribute(key11); else elm13.setAttribute(key11,cur8);
					}
				}
				var _g25 = 0;
				var _g113 = Object.keys(oldAttrs2);
				while(_g25 < _g113.length) {
					var key12 = _g113[_g25];
					++_g25;
					if(!Object.prototype.hasOwnProperty.call(attrs2,key12)) elm13.removeAttribute(key12);
				}
				var key13;
				var cur9;
				var old5;
				var elm14 = vnode4.elm;
				var oldProps2 = oldVnode2.data.props == null?{ }:oldVnode2.data.props;
				var props3 = vnode4.data.props == null?{ }:vnode4.data.props;
				var _g26 = 0;
				var _g114 = Object.keys(props3);
				while(_g26 < _g114.length) {
					var key14 = _g114[_g26];
					++_g26;
					cur9 = props3[key14];
					old5 = oldProps2[key14];
					if(old5 != cur9) {
						var value4 = cur9;
						elm14[key14] = value4;
					}
				}
				var cur10;
				var name14;
				var elm15 = vnode4.elm;
				var oldClass2 = oldVnode2.data.classes == null?{ }:oldVnode2.data.classes;
				var klass2 = vnode4.data.classes == null?{ }:vnode4.data.classes;
				var _g27 = 0;
				var _g115 = Object.keys(klass2);
				while(_g27 < _g115.length) {
					var name15 = _g115[_g27];
					++_g27;
					cur10 = klass2[name15];
					if(cur10 != oldClass2[name15]) {
						if(cur10 == "add") elm15.classList.add(name15); else if(cur10 == "remove") elm15.classList.remove(name15);
					}
				}
				var cur11;
				var name16;
				var elm16 = vnode4.elm;
				var oldStyle2 = oldVnode2.data.style == null?{ }:oldVnode2.data.style;
				var style4 = vnode4.data.style == null?{ }:vnode4.data.style;
				var oldHasDel2 = Object.prototype.hasOwnProperty.call(oldStyle2,"delayed");
				var _g28 = 0;
				var _g116 = Object.keys(style4);
				while(_g28 < _g116.length) {
					var name17 = _g116[_g28];
					++_g28;
					cur11 = style4[name17];
					if(name17 == "delayed") {
						var delayed2 = style4.delayed;
						var oldDelayed2 = oldStyle2.delayed;
						var _g29 = 0;
						var _g33 = Object.keys(delayed2);
						while(_g29 < _g33.length) {
							var name18 = _g33[_g29];
							++_g29;
							cur11 = delayed2[name18];
							if(!oldHasDel2 || cur11 != oldDelayed2[name18]) {
								var obj2 = [elm16.style];
								var prop2 = [name18];
								var val2 = [cur11];
								var fn2 = [(function(val2,prop2,obj2) {
									return function(i12) {
										var value5 = val2[0];
										obj2[0][prop2[0]] = value5;
									};
								})(val2,prop2,obj2)];
								window.requestAnimationFrame((function(fn2) {
									return function(i13) {
										window.requestAnimationFrame(fn2[0]);
									};
								})(fn2));
							}
						}
					} else if(name17 != "remove" && cur11 != oldStyle2[name17]) elm16.style[name17] = cur11;
				}
				i11 = vnode4.data.hook;
				if(i11 != undefined && (i11 = i11.update) != undefined) i11(oldVnode2,vnode4);
			}
			if(vnode4.text == undefined) {
				if(oldCh2 != undefined && ch2 != undefined) {
					if(oldCh2 != ch2) snabbdom_Patch.updateChildren(elm12,oldCh2,ch2,insertedVnodeQueue);
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
							var elm17;
							var children1 = vnode5.children;
							var sel1 = vnode5.sel;
							if(sel1 != undefined) {
								var hashIdx1 = sel1.indexOf("#",0);
								var dotIdx1 = sel1.indexOf(".",hashIdx1);
								var hash1 = hashIdx1 > 0?hashIdx1:sel1.length;
								var dot1 = dotIdx1 > 0?dotIdx1:sel1.length;
								var tag1 = hashIdx1 != -1 || dotIdx1 != -1?sel1.slice(0,Math.min(hash1,dot1)):sel1;
								elm17 = vnode5.elm = data1 != undefined && (i15 = data1.ns) != undefined?(function($this) {
									var $r;
									var ns1 = i15;
									$r = window.document.createElementNS(ns1,tag1);
									return $r;
								}($this)):window.document.createElement(tag1);
								if(hash1 < dot1) elm17.id = sel1.slice(hash1 + 1,dot1);
								if(dotIdx1 > 0) {
									elm.className = sel.slice(dot+1).replace(snabbdom_Patch.rg, " ");;
								}
								if(Array.isArray(children1)) {
									i15 = 0;
									if(i15 < children1.length) do {
										var new_node3 = snabbdom_Patch.createElm(children1[i15],insertedVnodeQueue);
										elm17.appendChild(new_node3);
									} while((function($this) {
										var $r;
										++i15;
										$r = i15 < children1.length;
										return $r;
									}($this)));
								} else if(typeof vnode5.text == "string" || typeof vnode5.text == "number") elm17.appendChild(window.document.createTextNode(vnode5.text));
								var oldVnode3 = snabbdom_Patch.emptyNode;
								var key15;
								var cur12;
								var old6;
								var elm18 = vnode5.elm;
								var oldAttrs3 = oldVnode3.data.attrs == null?{ }:oldVnode3.data.attrs;
								var attrs3 = vnode5.data.attrs == null?{ }:vnode5.data.attrs;
								var _g30 = 0;
								var _g117 = Object.keys(attrs3);
								while(_g30 < _g117.length) {
									var key16 = _g117[_g30];
									++_g30;
									cur12 = attrs3[key16];
									old6 = oldAttrs3[key16];
									if(old6 != cur12) {
										if(!cur12 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key16]) elm18.removeAttribute(key16); else elm18.setAttribute(key16,cur12);
									}
								}
								var _g34 = 0;
								var _g118 = Object.keys(oldAttrs3);
								while(_g34 < _g118.length) {
									var key17 = _g118[_g34];
									++_g34;
									if(!Object.prototype.hasOwnProperty.call(attrs3,key17)) elm18.removeAttribute(key17);
								}
								var key18;
								var cur13;
								var old7;
								var elm19 = vnode5.elm;
								var oldProps3 = oldVnode3.data.props == null?{ }:oldVnode3.data.props;
								var props4 = vnode5.data.props == null?{ }:vnode5.data.props;
								var _g35 = 0;
								var _g119 = Object.keys(props4);
								while(_g35 < _g119.length) {
									var key19 = _g119[_g35];
									++_g35;
									cur13 = props4[key19];
									old7 = oldProps3[key19];
									if(old7 != cur13) {
										var value6 = cur13;
										elm19[key19] = value6;
									}
								}
								var cur14;
								var name19;
								var elm20 = vnode5.elm;
								var oldClass3 = oldVnode3.data.classes == null?{ }:oldVnode3.data.classes;
								var klass3 = vnode5.data.classes == null?{ }:vnode5.data.classes;
								var _g36 = 0;
								var _g120 = Object.keys(klass3);
								while(_g36 < _g120.length) {
									var name20 = _g120[_g36];
									++_g36;
									cur14 = klass3[name20];
									if(cur14 != oldClass3[name20]) {
										if(cur14 == "add") elm20.classList.add(name20); else if(cur14 == "remove") elm20.classList.remove(name20);
									}
								}
								var cur15;
								var name21;
								var elm21 = vnode5.elm;
								var oldStyle3 = oldVnode3.data.style == null?{ }:oldVnode3.data.style;
								var style5 = vnode5.data.style == null?{ }:vnode5.data.style;
								var oldHasDel3 = Object.prototype.hasOwnProperty.call(oldStyle3,"delayed");
								var _g37 = 0;
								var _g121 = Object.keys(style5);
								while(_g37 < _g121.length) {
									var name22 = _g121[_g37];
									++_g37;
									cur15 = style5[name22];
									if(name22 == "delayed") {
										var delayed3 = style5.delayed;
										var oldDelayed3 = oldStyle3.delayed;
										var _g210 = 0;
										var _g38 = Object.keys(delayed3);
										while(_g210 < _g38.length) {
											var name23 = _g38[_g210];
											++_g210;
											cur15 = delayed3[name23];
											if(!oldHasDel3 || cur15 != oldDelayed3[name23]) {
												var obj3 = [elm21.style];
												var prop3 = [name23];
												var val3 = [cur15];
												var fn3 = [(function(val3,prop3,obj3) {
													return function(i16) {
														var value7 = val3[0];
														obj3[0][prop3[0]] = value7;
													};
												})(val3,prop3,obj3)];
												window.requestAnimationFrame((function(fn3) {
													return function(i17) {
														window.requestAnimationFrame(fn3[0]);
													};
												})(fn3));
											}
										}
									} else if(name22 != "remove" && cur15 != oldStyle3[name22]) elm21.style[name22] = cur15;
								}
								if(vnode5.data != null) {
									i15 = vnode5.data.hook;
									if(i15 != undefined) {
										if(i15.create) i15.create(snabbdom_Patch.emptyNode,vnode5);
										if(i15.insert) insertedVnodeQueue.push(vnode5);
									}
								}
							} else elm17 = vnode5.elm = window.document.createTextNode(vnode5.text);
							$r = vnode5.elm;
							return $r;
						}(this));
						elm12.insertBefore(new_node2,null);
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
									var name24;
									var elm22 = vnode6.elm;
									var s2 = vnode6.data.style;
									if(s2 == null) null; else {
										style6 = s2.destroy;
										if(style6 == null) null; else {
											var _g39 = 0;
											var _g122 = Object.keys(style6);
											while(_g39 < _g122.length) {
												var name25 = _g122[_g39];
												++_g39;
												elm22.style[name25] = style6[name25];
											}
										}
									}
									if((i19 = vnode6.children) != undefined) {
										j1 = 0;
										if(j1 < vnode6.children.length) do snabbdom_Patch.invokeDestroyHook(vnode6.children[j1]); while((function($this) {
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
									var name26;
									var elm23 = [vnode7.elm];
									var idx1;
									var i20 = 0;
									var maxDur1 = 0;
									var compStyle1;
									var style7 = s3.remove;
									var amount1 = [0];
									var applied1 = [];
									var _g40 = 0;
									var _g123 = Object.keys(style7);
									while(_g40 < _g123.length) {
										var name27 = _g123[_g40];
										++_g40;
										applied1.push(name27);
										elm23[0].style[name27] = style7[name27];
									}
									compStyle1 = window.getComputedStyle(elm23[0]);
									var props5 = compStyle1["transition-property"].split(", ");
									var i21;
									i21 = 0;
									if(i21 < props5.length) do if(HxOverrides.indexOf(applied1,props5[i21],0) != -1) amount1[0]++; while((function($this) {
										var $r;
										++i21;
										$r = i21 < props5.length;
										return $r;
									}(this)));
									elm23[0].addEventListener("transitionend",(function(amount1,elm23,rm5) {
										return function(ev1) {
											if(ev1.target == elm23[0]) --amount1[0];
											if(amount1[0] == 0) rm5[0]();
										};
									})(amount1,elm23,rm5));
								}
								if((i18 = ch3.data) != undefined && (i18 = i18.hook) != undefined && (i18 = i18.remove) != undefined) i18(ch3,rm3); else {
									console.log("remove");
									if(rm3 != null) rm3();
									elm12.removeChild(ch3.elm);
								}
							} else elm12.removeChild(ch3.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx3;
						$r = startIdx3 <= endIdx3;
						return $r;
					}(this)));
				}
			} else if(oldVnode2.text != vnode4.text) elm12.textContent = vnode4.text;
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
		var elm24 = vnode8.elm = oldVnode4.elm;
		var oldCh3 = oldVnode4.children;
		var ch4 = vnode8.children;
		if(oldVnode4 == vnode8) null; else {
			if(vnode8.data != undefined) {
				var key20;
				var cur16;
				var old8;
				var elm25 = vnode8.elm;
				var oldAttrs4 = oldVnode4.data.attrs == null?{ }:oldVnode4.data.attrs;
				var attrs4 = vnode8.data.attrs == null?{ }:vnode8.data.attrs;
				var _g41 = 0;
				var _g124 = Object.keys(attrs4);
				while(_g41 < _g124.length) {
					var key21 = _g124[_g41];
					++_g41;
					cur16 = attrs4[key21];
					old8 = oldAttrs4[key21];
					if(old8 != cur16) {
						if(!cur16 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key21]) elm25.removeAttribute(key21); else elm25.setAttribute(key21,cur16);
					}
				}
				var _g42 = 0;
				var _g125 = Object.keys(oldAttrs4);
				while(_g42 < _g125.length) {
					var key22 = _g125[_g42];
					++_g42;
					if(!Object.prototype.hasOwnProperty.call(attrs4,key22)) elm25.removeAttribute(key22);
				}
				var key23;
				var cur17;
				var old9;
				var elm26 = vnode8.elm;
				var oldProps4 = oldVnode4.data.props == null?{ }:oldVnode4.data.props;
				var props6 = vnode8.data.props == null?{ }:vnode8.data.props;
				var _g43 = 0;
				var _g126 = Object.keys(props6);
				while(_g43 < _g126.length) {
					var key24 = _g126[_g43];
					++_g43;
					cur17 = props6[key24];
					old9 = oldProps4[key24];
					if(old9 != cur17) {
						var value8 = cur17;
						elm26[key24] = value8;
					}
				}
				var cur18;
				var name28;
				var elm27 = vnode8.elm;
				var oldClass4 = oldVnode4.data.classes == null?{ }:oldVnode4.data.classes;
				var klass4 = vnode8.data.classes == null?{ }:vnode8.data.classes;
				var _g44 = 0;
				var _g127 = Object.keys(klass4);
				while(_g44 < _g127.length) {
					var name29 = _g127[_g44];
					++_g44;
					cur18 = klass4[name29];
					if(cur18 != oldClass4[name29]) {
						if(cur18 == "add") elm27.classList.add(name29); else if(cur18 == "remove") elm27.classList.remove(name29);
					}
				}
				var cur19;
				var name30;
				var elm28 = vnode8.elm;
				var oldStyle4 = oldVnode4.data.style == null?{ }:oldVnode4.data.style;
				var style8 = vnode8.data.style == null?{ }:vnode8.data.style;
				var oldHasDel4 = Object.prototype.hasOwnProperty.call(oldStyle4,"delayed");
				var _g45 = 0;
				var _g128 = Object.keys(style8);
				while(_g45 < _g128.length) {
					var name31 = _g128[_g45];
					++_g45;
					cur19 = style8[name31];
					if(name31 == "delayed") {
						var delayed4 = style8.delayed;
						var oldDelayed4 = oldStyle4.delayed;
						var _g211 = 0;
						var _g310 = Object.keys(delayed4);
						while(_g211 < _g310.length) {
							var name32 = _g310[_g211];
							++_g211;
							cur19 = delayed4[name32];
							if(!oldHasDel4 || cur19 != oldDelayed4[name32]) {
								var obj4 = [elm28.style];
								var prop4 = [name32];
								var val4 = [cur19];
								var fn4 = [(function(val4,prop4,obj4) {
									return function(i23) {
										var value9 = val4[0];
										obj4[0][prop4[0]] = value9;
									};
								})(val4,prop4,obj4)];
								window.requestAnimationFrame((function(fn4) {
									return function(i24) {
										window.requestAnimationFrame(fn4[0]);
									};
								})(fn4));
							}
						}
					} else if(name31 != "remove" && cur19 != oldStyle4[name31]) elm28.style[name31] = cur19;
				}
				i22 = vnode8.data.hook;
				if(i22 != undefined && (i22 = i22.update) != undefined) i22(oldVnode4,vnode8);
			}
			if(vnode8.text == undefined) {
				if(oldCh3 != undefined && ch4 != undefined) {
					if(oldCh3 != ch4) snabbdom_Patch.updateChildren(elm24,oldCh3,ch4,insertedVnodeQueue);
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
							var elm29;
							var children2 = vnode9.children;
							var sel2 = vnode9.sel;
							if(sel2 != undefined) {
								var hashIdx2 = sel2.indexOf("#",0);
								var dotIdx2 = sel2.indexOf(".",hashIdx2);
								var hash2 = hashIdx2 > 0?hashIdx2:sel2.length;
								var dot2 = dotIdx2 > 0?dotIdx2:sel2.length;
								var tag2 = hashIdx2 != -1 || dotIdx2 != -1?sel2.slice(0,Math.min(hash2,dot2)):sel2;
								elm29 = vnode9.elm = data2 != undefined && (i26 = data2.ns) != undefined?(function($this) {
									var $r;
									var ns2 = i26;
									$r = window.document.createElementNS(ns2,tag2);
									return $r;
								}($this)):window.document.createElement(tag2);
								if(hash2 < dot2) elm29.id = sel2.slice(hash2 + 1,dot2);
								if(dotIdx2 > 0) {
									elm.className = sel.slice(dot+1).replace(snabbdom_Patch.rg, " ");;
								}
								if(Array.isArray(children2)) {
									i26 = 0;
									if(i26 < children2.length) do {
										var new_node5 = snabbdom_Patch.createElm(children2[i26],insertedVnodeQueue);
										elm29.appendChild(new_node5);
									} while((function($this) {
										var $r;
										++i26;
										$r = i26 < children2.length;
										return $r;
									}($this)));
								} else if(typeof vnode9.text == "string" || typeof vnode9.text == "number") elm29.appendChild(window.document.createTextNode(vnode9.text));
								var oldVnode5 = snabbdom_Patch.emptyNode;
								var key25;
								var cur20;
								var old10;
								var elm30 = vnode9.elm;
								var oldAttrs5 = oldVnode5.data.attrs == null?{ }:oldVnode5.data.attrs;
								var attrs5 = vnode9.data.attrs == null?{ }:vnode9.data.attrs;
								var _g46 = 0;
								var _g129 = Object.keys(attrs5);
								while(_g46 < _g129.length) {
									var key26 = _g129[_g46];
									++_g46;
									cur20 = attrs5[key26];
									old10 = oldAttrs5[key26];
									if(old10 != cur20) {
										if(!cur20 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key26]) elm30.removeAttribute(key26); else elm30.setAttribute(key26,cur20);
									}
								}
								var _g47 = 0;
								var _g130 = Object.keys(oldAttrs5);
								while(_g47 < _g130.length) {
									var key27 = _g130[_g47];
									++_g47;
									if(!Object.prototype.hasOwnProperty.call(attrs5,key27)) elm30.removeAttribute(key27);
								}
								var key28;
								var cur21;
								var old11;
								var elm31 = vnode9.elm;
								var oldProps5 = oldVnode5.data.props == null?{ }:oldVnode5.data.props;
								var props7 = vnode9.data.props == null?{ }:vnode9.data.props;
								var _g48 = 0;
								var _g131 = Object.keys(props7);
								while(_g48 < _g131.length) {
									var key29 = _g131[_g48];
									++_g48;
									cur21 = props7[key29];
									old11 = oldProps5[key29];
									if(old11 != cur21) {
										var value10 = cur21;
										elm31[key29] = value10;
									}
								}
								var cur22;
								var name33;
								var elm32 = vnode9.elm;
								var oldClass5 = oldVnode5.data.classes == null?{ }:oldVnode5.data.classes;
								var klass5 = vnode9.data.classes == null?{ }:vnode9.data.classes;
								var _g49 = 0;
								var _g132 = Object.keys(klass5);
								while(_g49 < _g132.length) {
									var name34 = _g132[_g49];
									++_g49;
									cur22 = klass5[name34];
									if(cur22 != oldClass5[name34]) {
										if(cur22 == "add") elm32.classList.add(name34); else if(cur22 == "remove") elm32.classList.remove(name34);
									}
								}
								var cur23;
								var name35;
								var elm33 = vnode9.elm;
								var oldStyle5 = oldVnode5.data.style == null?{ }:oldVnode5.data.style;
								var style9 = vnode9.data.style == null?{ }:vnode9.data.style;
								var oldHasDel5 = Object.prototype.hasOwnProperty.call(oldStyle5,"delayed");
								var _g50 = 0;
								var _g133 = Object.keys(style9);
								while(_g50 < _g133.length) {
									var name36 = _g133[_g50];
									++_g50;
									cur23 = style9[name36];
									if(name36 == "delayed") {
										var delayed5 = style9.delayed;
										var oldDelayed5 = oldStyle5.delayed;
										var _g212 = 0;
										var _g311 = Object.keys(delayed5);
										while(_g212 < _g311.length) {
											var name37 = _g311[_g212];
											++_g212;
											cur23 = delayed5[name37];
											if(!oldHasDel5 || cur23 != oldDelayed5[name37]) {
												var obj5 = [elm33.style];
												var prop5 = [name37];
												var val5 = [cur23];
												var fn5 = [(function(val5,prop5,obj5) {
													return function(i27) {
														var value11 = val5[0];
														obj5[0][prop5[0]] = value11;
													};
												})(val5,prop5,obj5)];
												window.requestAnimationFrame((function(fn5) {
													return function(i28) {
														window.requestAnimationFrame(fn5[0]);
													};
												})(fn5));
											}
										}
									} else if(name36 != "remove" && cur23 != oldStyle5[name36]) elm33.style[name36] = cur23;
								}
								if(vnode9.data != null) {
									i26 = vnode9.data.hook;
									if(i26 != undefined) {
										if(i26.create) i26.create(snabbdom_Patch.emptyNode,vnode9);
										if(i26.insert) insertedVnodeQueue.push(vnode9);
									}
								}
							} else elm29 = vnode9.elm = window.document.createTextNode(vnode9.text);
							$r = vnode9.elm;
							return $r;
						}(this));
						elm24.insertBefore(new_node4,null);
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
									var name38;
									var elm34 = vnode10.elm;
									var s4 = vnode10.data.style;
									if(s4 == null) null; else {
										style10 = s4.destroy;
										if(style10 == null) null; else {
											var _g51 = 0;
											var _g134 = Object.keys(style10);
											while(_g51 < _g134.length) {
												var name39 = _g134[_g51];
												++_g51;
												elm34.style[name39] = style10[name39];
											}
										}
									}
									if((i30 = vnode10.children) != undefined) {
										j2 = 0;
										if(j2 < vnode10.children.length) do snabbdom_Patch.invokeDestroyHook(vnode10.children[j2]); while((function($this) {
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
									var name40;
									var elm35 = [vnode11.elm];
									var idx2;
									var i31 = 0;
									var maxDur2 = 0;
									var compStyle2;
									var style11 = s5.remove;
									var amount2 = [0];
									var applied2 = [];
									var _g52 = 0;
									var _g135 = Object.keys(style11);
									while(_g52 < _g135.length) {
										var name41 = _g135[_g52];
										++_g52;
										applied2.push(name41);
										elm35[0].style[name41] = style11[name41];
									}
									compStyle2 = window.getComputedStyle(elm35[0]);
									var props8 = compStyle2["transition-property"].split(", ");
									var i32;
									i32 = 0;
									if(i32 < props8.length) do if(HxOverrides.indexOf(applied2,props8[i32],0) != -1) amount2[0]++; while((function($this) {
										var $r;
										++i32;
										$r = i32 < props8.length;
										return $r;
									}(this)));
									elm35[0].addEventListener("transitionend",(function(amount2,elm35,rm8) {
										return function(ev2) {
											if(ev2.target == elm35[0]) --amount2[0];
											if(amount2[0] == 0) rm8[0]();
										};
									})(amount2,elm35,rm8));
								}
								if((i29 = ch5.data) != undefined && (i29 = i29.hook) != undefined && (i29 = i29.remove) != undefined) i29(ch5,rm6); else {
									console.log("remove");
									if(rm6 != null) rm6();
									elm24.removeChild(ch5.elm);
								}
							} else elm24.removeChild(ch5.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx5;
						$r = startIdx5 <= endIdx5;
						return $r;
					}(this)));
				}
			} else if(oldVnode4.text != vnode8.text) elm24.textContent = vnode8.text;
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
		var elm36 = vnode12.elm = oldVnode6.elm;
		var oldCh4 = oldVnode6.children;
		var ch6 = vnode12.children;
		if(oldVnode6 == vnode12) null; else {
			if(vnode12.data != undefined) {
				var key30;
				var cur24;
				var old12;
				var elm37 = vnode12.elm;
				var oldAttrs6 = oldVnode6.data.attrs == null?{ }:oldVnode6.data.attrs;
				var attrs6 = vnode12.data.attrs == null?{ }:vnode12.data.attrs;
				var _g53 = 0;
				var _g136 = Object.keys(attrs6);
				while(_g53 < _g136.length) {
					var key31 = _g136[_g53];
					++_g53;
					cur24 = attrs6[key31];
					old12 = oldAttrs6[key31];
					if(old12 != cur24) {
						if(!cur24 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key31]) elm37.removeAttribute(key31); else elm37.setAttribute(key31,cur24);
					}
				}
				var _g54 = 0;
				var _g137 = Object.keys(oldAttrs6);
				while(_g54 < _g137.length) {
					var key32 = _g137[_g54];
					++_g54;
					if(!Object.prototype.hasOwnProperty.call(attrs6,key32)) elm37.removeAttribute(key32);
				}
				var key33;
				var cur25;
				var old13;
				var elm38 = vnode12.elm;
				var oldProps6 = oldVnode6.data.props == null?{ }:oldVnode6.data.props;
				var props9 = vnode12.data.props == null?{ }:vnode12.data.props;
				var _g55 = 0;
				var _g138 = Object.keys(props9);
				while(_g55 < _g138.length) {
					var key34 = _g138[_g55];
					++_g55;
					cur25 = props9[key34];
					old13 = oldProps6[key34];
					if(old13 != cur25) {
						var value12 = cur25;
						elm38[key34] = value12;
					}
				}
				var cur26;
				var name42;
				var elm39 = vnode12.elm;
				var oldClass6 = oldVnode6.data.classes == null?{ }:oldVnode6.data.classes;
				var klass6 = vnode12.data.classes == null?{ }:vnode12.data.classes;
				var _g56 = 0;
				var _g139 = Object.keys(klass6);
				while(_g56 < _g139.length) {
					var name43 = _g139[_g56];
					++_g56;
					cur26 = klass6[name43];
					if(cur26 != oldClass6[name43]) {
						if(cur26 == "add") elm39.classList.add(name43); else if(cur26 == "remove") elm39.classList.remove(name43);
					}
				}
				var cur27;
				var name44;
				var elm40 = vnode12.elm;
				var oldStyle6 = oldVnode6.data.style == null?{ }:oldVnode6.data.style;
				var style12 = vnode12.data.style == null?{ }:vnode12.data.style;
				var oldHasDel6 = Object.prototype.hasOwnProperty.call(oldStyle6,"delayed");
				var _g57 = 0;
				var _g140 = Object.keys(style12);
				while(_g57 < _g140.length) {
					var name45 = _g140[_g57];
					++_g57;
					cur27 = style12[name45];
					if(name45 == "delayed") {
						var delayed6 = style12.delayed;
						var oldDelayed6 = oldStyle6.delayed;
						var _g213 = 0;
						var _g312 = Object.keys(delayed6);
						while(_g213 < _g312.length) {
							var name46 = _g312[_g213];
							++_g213;
							cur27 = delayed6[name46];
							if(!oldHasDel6 || cur27 != oldDelayed6[name46]) {
								var obj6 = [elm40.style];
								var prop6 = [name46];
								var val6 = [cur27];
								var fn6 = [(function(val6,prop6,obj6) {
									return function(i34) {
										var value13 = val6[0];
										obj6[0][prop6[0]] = value13;
									};
								})(val6,prop6,obj6)];
								window.requestAnimationFrame((function(fn6) {
									return function(i35) {
										window.requestAnimationFrame(fn6[0]);
									};
								})(fn6));
							}
						}
					} else if(name45 != "remove" && cur27 != oldStyle6[name45]) elm40.style[name45] = cur27;
				}
				i33 = vnode12.data.hook;
				if(i33 != undefined && (i33 = i33.update) != undefined) i33(oldVnode6,vnode12);
			}
			if(vnode12.text == undefined) {
				if(oldCh4 != undefined && ch6 != undefined) {
					if(oldCh4 != ch6) snabbdom_Patch.updateChildren(elm36,oldCh4,ch6,insertedVnodeQueue);
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
							var elm41;
							var children3 = vnode13.children;
							var sel3 = vnode13.sel;
							if(sel3 != undefined) {
								var hashIdx3 = sel3.indexOf("#",0);
								var dotIdx3 = sel3.indexOf(".",hashIdx3);
								var hash3 = hashIdx3 > 0?hashIdx3:sel3.length;
								var dot3 = dotIdx3 > 0?dotIdx3:sel3.length;
								var tag3 = hashIdx3 != -1 || dotIdx3 != -1?sel3.slice(0,Math.min(hash3,dot3)):sel3;
								elm41 = vnode13.elm = data3 != undefined && (i37 = data3.ns) != undefined?(function($this) {
									var $r;
									var ns3 = i37;
									$r = window.document.createElementNS(ns3,tag3);
									return $r;
								}($this)):window.document.createElement(tag3);
								if(hash3 < dot3) elm41.id = sel3.slice(hash3 + 1,dot3);
								if(dotIdx3 > 0) {
									elm.className = sel.slice(dot+1).replace(snabbdom_Patch.rg, " ");;
								}
								if(Array.isArray(children3)) {
									i37 = 0;
									if(i37 < children3.length) do {
										var new_node7 = snabbdom_Patch.createElm(children3[i37],insertedVnodeQueue);
										elm41.appendChild(new_node7);
									} while((function($this) {
										var $r;
										++i37;
										$r = i37 < children3.length;
										return $r;
									}($this)));
								} else if(typeof vnode13.text == "string" || typeof vnode13.text == "number") elm41.appendChild(window.document.createTextNode(vnode13.text));
								var oldVnode7 = snabbdom_Patch.emptyNode;
								var key35;
								var cur28;
								var old14;
								var elm42 = vnode13.elm;
								var oldAttrs7 = oldVnode7.data.attrs == null?{ }:oldVnode7.data.attrs;
								var attrs7 = vnode13.data.attrs == null?{ }:vnode13.data.attrs;
								var _g58 = 0;
								var _g141 = Object.keys(attrs7);
								while(_g58 < _g141.length) {
									var key36 = _g141[_g58];
									++_g58;
									cur28 = attrs7[key36];
									old14 = oldAttrs7[key36];
									if(old14 != cur28) {
										if(!cur28 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key36]) elm42.removeAttribute(key36); else elm42.setAttribute(key36,cur28);
									}
								}
								var _g59 = 0;
								var _g142 = Object.keys(oldAttrs7);
								while(_g59 < _g142.length) {
									var key37 = _g142[_g59];
									++_g59;
									if(!Object.prototype.hasOwnProperty.call(attrs7,key37)) elm42.removeAttribute(key37);
								}
								var key38;
								var cur29;
								var old15;
								var elm43 = vnode13.elm;
								var oldProps7 = oldVnode7.data.props == null?{ }:oldVnode7.data.props;
								var props10 = vnode13.data.props == null?{ }:vnode13.data.props;
								var _g60 = 0;
								var _g143 = Object.keys(props10);
								while(_g60 < _g143.length) {
									var key39 = _g143[_g60];
									++_g60;
									cur29 = props10[key39];
									old15 = oldProps7[key39];
									if(old15 != cur29) {
										var value14 = cur29;
										elm43[key39] = value14;
									}
								}
								var cur30;
								var name47;
								var elm44 = vnode13.elm;
								var oldClass7 = oldVnode7.data.classes == null?{ }:oldVnode7.data.classes;
								var klass7 = vnode13.data.classes == null?{ }:vnode13.data.classes;
								var _g61 = 0;
								var _g144 = Object.keys(klass7);
								while(_g61 < _g144.length) {
									var name48 = _g144[_g61];
									++_g61;
									cur30 = klass7[name48];
									if(cur30 != oldClass7[name48]) {
										if(cur30 == "add") elm44.classList.add(name48); else if(cur30 == "remove") elm44.classList.remove(name48);
									}
								}
								var cur31;
								var name49;
								var elm45 = vnode13.elm;
								var oldStyle7 = oldVnode7.data.style == null?{ }:oldVnode7.data.style;
								var style13 = vnode13.data.style == null?{ }:vnode13.data.style;
								var oldHasDel7 = Object.prototype.hasOwnProperty.call(oldStyle7,"delayed");
								var _g62 = 0;
								var _g145 = Object.keys(style13);
								while(_g62 < _g145.length) {
									var name50 = _g145[_g62];
									++_g62;
									cur31 = style13[name50];
									if(name50 == "delayed") {
										var delayed7 = style13.delayed;
										var oldDelayed7 = oldStyle7.delayed;
										var _g214 = 0;
										var _g313 = Object.keys(delayed7);
										while(_g214 < _g313.length) {
											var name51 = _g313[_g214];
											++_g214;
											cur31 = delayed7[name51];
											if(!oldHasDel7 || cur31 != oldDelayed7[name51]) {
												var obj7 = [elm45.style];
												var prop7 = [name51];
												var val7 = [cur31];
												var fn7 = [(function(val7,prop7,obj7) {
													return function(i38) {
														var value15 = val7[0];
														obj7[0][prop7[0]] = value15;
													};
												})(val7,prop7,obj7)];
												window.requestAnimationFrame((function(fn7) {
													return function(i39) {
														window.requestAnimationFrame(fn7[0]);
													};
												})(fn7));
											}
										}
									} else if(name50 != "remove" && cur31 != oldStyle7[name50]) elm45.style[name50] = cur31;
								}
								if(vnode13.data != null) {
									i37 = vnode13.data.hook;
									if(i37 != undefined) {
										if(i37.create) i37.create(snabbdom_Patch.emptyNode,vnode13);
										if(i37.insert) insertedVnodeQueue.push(vnode13);
									}
								}
							} else elm41 = vnode13.elm = window.document.createTextNode(vnode13.text);
							$r = vnode13.elm;
							return $r;
						}(this));
						elm36.insertBefore(new_node6,null);
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
									var name52;
									var elm46 = vnode14.elm;
									var s6 = vnode14.data.style;
									if(s6 == null) null; else {
										style14 = s6.destroy;
										if(style14 == null) null; else {
											var _g63 = 0;
											var _g146 = Object.keys(style14);
											while(_g63 < _g146.length) {
												var name53 = _g146[_g63];
												++_g63;
												elm46.style[name53] = style14[name53];
											}
										}
									}
									if((i41 = vnode14.children) != undefined) {
										j3 = 0;
										if(j3 < vnode14.children.length) do snabbdom_Patch.invokeDestroyHook(vnode14.children[j3]); while((function($this) {
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
									var name54;
									var elm47 = [vnode15.elm];
									var idx3;
									var i42 = 0;
									var maxDur3 = 0;
									var compStyle3;
									var style15 = s7.remove;
									var amount3 = [0];
									var applied3 = [];
									var _g64 = 0;
									var _g147 = Object.keys(style15);
									while(_g64 < _g147.length) {
										var name55 = _g147[_g64];
										++_g64;
										applied3.push(name55);
										elm47[0].style[name55] = style15[name55];
									}
									compStyle3 = window.getComputedStyle(elm47[0]);
									var props11 = compStyle3["transition-property"].split(", ");
									var i43;
									i43 = 0;
									if(i43 < props11.length) do if(HxOverrides.indexOf(applied3,props11[i43],0) != -1) amount3[0]++; while((function($this) {
										var $r;
										++i43;
										$r = i43 < props11.length;
										return $r;
									}(this)));
									elm47[0].addEventListener("transitionend",(function(amount3,elm47,rm11) {
										return function(ev3) {
											if(ev3.target == elm47[0]) --amount3[0];
											if(amount3[0] == 0) rm11[0]();
										};
									})(amount3,elm47,rm11));
								}
								if((i40 = ch7.data) != undefined && (i40 = i40.hook) != undefined && (i40 = i40.remove) != undefined) i40(ch7,rm9); else {
									console.log("remove");
									if(rm9 != null) rm9();
									elm36.removeChild(ch7.elm);
								}
							} else elm36.removeChild(ch7.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx7;
						$r = startIdx7 <= endIdx7;
						return $r;
					}(this)));
				}
			} else if(oldVnode6.text != vnode12.text) elm36.textContent = vnode12.text;
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
				var elm48;
				var children5 = vnode16.children;
				var sel4 = vnode16.sel;
				if(sel4 != undefined) {
					var hashIdx4 = sel4.indexOf("#",0);
					var dotIdx4 = sel4.indexOf(".",hashIdx4);
					var hash4 = hashIdx4 > 0?hashIdx4:sel4.length;
					var dot4 = dotIdx4 > 0?dotIdx4:sel4.length;
					var tag4 = hashIdx4 != -1 || dotIdx4 != -1?sel4.slice(0,Math.min(hash4,dot4)):sel4;
					elm48 = vnode16.elm = data4 != undefined && (i45 = data4.ns) != undefined?(function($this) {
						var $r;
						var ns4 = i45;
						$r = window.document.createElementNS(ns4,tag4);
						return $r;
					}($this)):window.document.createElement(tag4);
					if(hash4 < dot4) elm48.id = sel4.slice(hash4 + 1,dot4);
					if(dotIdx4 > 0) {
						elm.className = sel.slice(dot+1).replace(snabbdom_Patch.rg, " ");;
					}
					if(Array.isArray(children5)) {
						i45 = 0;
						if(i45 < children5.length) do {
							var new_node8 = snabbdom_Patch.createElm(children5[i45],insertedVnodeQueue);
							elm48.appendChild(new_node8);
						} while((function($this) {
							var $r;
							++i45;
							$r = i45 < children5.length;
							return $r;
						}($this)));
					} else if(typeof vnode16.text == "string" || typeof vnode16.text == "number") elm48.appendChild(window.document.createTextNode(vnode16.text));
					var oldVnode8 = snabbdom_Patch.emptyNode;
					var key41;
					var cur32;
					var old16;
					var elm49 = vnode16.elm;
					var oldAttrs8 = oldVnode8.data.attrs == null?{ }:oldVnode8.data.attrs;
					var attrs8 = vnode16.data.attrs == null?{ }:vnode16.data.attrs;
					var _g65 = 0;
					var _g148 = Object.keys(attrs8);
					while(_g65 < _g148.length) {
						var key42 = _g148[_g65];
						++_g65;
						cur32 = attrs8[key42];
						old16 = oldAttrs8[key42];
						if(old16 != cur32) {
							if(!cur32 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key42]) elm49.removeAttribute(key42); else elm49.setAttribute(key42,cur32);
						}
					}
					var _g66 = 0;
					var _g149 = Object.keys(oldAttrs8);
					while(_g66 < _g149.length) {
						var key43 = _g149[_g66];
						++_g66;
						if(!Object.prototype.hasOwnProperty.call(attrs8,key43)) elm49.removeAttribute(key43);
					}
					var key44;
					var cur33;
					var old17;
					var elm50 = vnode16.elm;
					var oldProps8 = oldVnode8.data.props == null?{ }:oldVnode8.data.props;
					var props12 = vnode16.data.props == null?{ }:vnode16.data.props;
					var _g67 = 0;
					var _g150 = Object.keys(props12);
					while(_g67 < _g150.length) {
						var key45 = _g150[_g67];
						++_g67;
						cur33 = props12[key45];
						old17 = oldProps8[key45];
						if(old17 != cur33) {
							var value16 = cur33;
							elm50[key45] = value16;
						}
					}
					var cur34;
					var name56;
					var elm51 = vnode16.elm;
					var oldClass8 = oldVnode8.data.classes == null?{ }:oldVnode8.data.classes;
					var klass8 = vnode16.data.classes == null?{ }:vnode16.data.classes;
					var _g68 = 0;
					var _g151 = Object.keys(klass8);
					while(_g68 < _g151.length) {
						var name57 = _g151[_g68];
						++_g68;
						cur34 = klass8[name57];
						if(cur34 != oldClass8[name57]) {
							if(cur34 == "add") elm51.classList.add(name57); else if(cur34 == "remove") elm51.classList.remove(name57);
						}
					}
					var cur35;
					var name58;
					var elm52 = vnode16.elm;
					var oldStyle8 = oldVnode8.data.style == null?{ }:oldVnode8.data.style;
					var style16 = vnode16.data.style == null?{ }:vnode16.data.style;
					var oldHasDel8 = Object.prototype.hasOwnProperty.call(oldStyle8,"delayed");
					var _g69 = 0;
					var _g152 = Object.keys(style16);
					while(_g69 < _g152.length) {
						var name59 = _g152[_g69];
						++_g69;
						cur35 = style16[name59];
						if(name59 == "delayed") {
							var delayed8 = style16.delayed;
							var oldDelayed8 = oldStyle8.delayed;
							var _g215 = 0;
							var _g314 = Object.keys(delayed8);
							while(_g215 < _g314.length) {
								var name60 = _g314[_g215];
								++_g215;
								cur35 = delayed8[name60];
								if(!oldHasDel8 || cur35 != oldDelayed8[name60]) {
									var obj8 = [elm52.style];
									var prop8 = [name60];
									var val8 = [cur35];
									var fn8 = [(function(val8,prop8,obj8) {
										return function(i46) {
											var value17 = val8[0];
											obj8[0][prop8[0]] = value17;
										};
									})(val8,prop8,obj8)];
									window.requestAnimationFrame((function(fn8) {
										return function(i47) {
											window.requestAnimationFrame(fn8[0]);
										};
									})(fn8));
								}
							}
						} else if(name59 != "remove" && cur35 != oldStyle8[name59]) elm52.style[name59] = cur35;
					}
					if(vnode16.data != null) {
						i45 = vnode16.data.hook;
						if(i45 != undefined) {
							if(i45.create) i45.create(snabbdom_Patch.emptyNode,vnode16);
							if(i45.insert) insertedVnodeQueue.push(vnode16);
						}
					}
				} else elm48 = vnode16.elm = window.document.createTextNode(vnode16.text);
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
			var elm53 = vnode17.elm = oldVnode9.elm;
			var oldCh5 = oldVnode9.children;
			var ch8 = vnode17.children;
			if(oldVnode9 == vnode17) null; else {
				if(vnode17.data != undefined) {
					var key46;
					var cur36;
					var old18;
					var elm54 = vnode17.elm;
					var oldAttrs9 = oldVnode9.data.attrs == null?{ }:oldVnode9.data.attrs;
					var attrs9 = vnode17.data.attrs == null?{ }:vnode17.data.attrs;
					var _g70 = 0;
					var _g153 = Object.keys(attrs9);
					while(_g70 < _g153.length) {
						var key47 = _g153[_g70];
						++_g70;
						cur36 = attrs9[key47];
						old18 = oldAttrs9[key47];
						if(old18 != cur36) {
							if(!cur36 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key47]) elm54.removeAttribute(key47); else elm54.setAttribute(key47,cur36);
						}
					}
					var _g71 = 0;
					var _g154 = Object.keys(oldAttrs9);
					while(_g71 < _g154.length) {
						var key48 = _g154[_g71];
						++_g71;
						if(!Object.prototype.hasOwnProperty.call(attrs9,key48)) elm54.removeAttribute(key48);
					}
					var key49;
					var cur37;
					var old19;
					var elm55 = vnode17.elm;
					var oldProps9 = oldVnode9.data.props == null?{ }:oldVnode9.data.props;
					var props13 = vnode17.data.props == null?{ }:vnode17.data.props;
					var _g72 = 0;
					var _g155 = Object.keys(props13);
					while(_g72 < _g155.length) {
						var key50 = _g155[_g72];
						++_g72;
						cur37 = props13[key50];
						old19 = oldProps9[key50];
						if(old19 != cur37) {
							var value18 = cur37;
							elm55[key50] = value18;
						}
					}
					var cur38;
					var name61;
					var elm56 = vnode17.elm;
					var oldClass9 = oldVnode9.data.classes == null?{ }:oldVnode9.data.classes;
					var klass9 = vnode17.data.classes == null?{ }:vnode17.data.classes;
					var _g73 = 0;
					var _g156 = Object.keys(klass9);
					while(_g73 < _g156.length) {
						var name62 = _g156[_g73];
						++_g73;
						cur38 = klass9[name62];
						if(cur38 != oldClass9[name62]) {
							if(cur38 == "add") elm56.classList.add(name62); else if(cur38 == "remove") elm56.classList.remove(name62);
						}
					}
					var cur39;
					var name63;
					var elm57 = vnode17.elm;
					var oldStyle9 = oldVnode9.data.style == null?{ }:oldVnode9.data.style;
					var style17 = vnode17.data.style == null?{ }:vnode17.data.style;
					var oldHasDel9 = Object.prototype.hasOwnProperty.call(oldStyle9,"delayed");
					var _g74 = 0;
					var _g157 = Object.keys(style17);
					while(_g74 < _g157.length) {
						var name64 = _g157[_g74];
						++_g74;
						cur39 = style17[name64];
						if(name64 == "delayed") {
							var delayed9 = style17.delayed;
							var oldDelayed9 = oldStyle9.delayed;
							var _g216 = 0;
							var _g315 = Object.keys(delayed9);
							while(_g216 < _g315.length) {
								var name65 = _g315[_g216];
								++_g216;
								cur39 = delayed9[name65];
								if(!oldHasDel9 || cur39 != oldDelayed9[name65]) {
									var obj9 = [elm57.style];
									var prop9 = [name65];
									var val9 = [cur39];
									var fn9 = [(function(val9,prop9,obj9) {
										return function(i49) {
											var value19 = val9[0];
											obj9[0][prop9[0]] = value19;
										};
									})(val9,prop9,obj9)];
									window.requestAnimationFrame((function(fn9) {
										return function(i50) {
											window.requestAnimationFrame(fn9[0]);
										};
									})(fn9));
								}
							}
						} else if(name64 != "remove" && cur39 != oldStyle9[name64]) elm57.style[name64] = cur39;
					}
					i48 = vnode17.data.hook;
					if(i48 != undefined && (i48 = i48.update) != undefined) i48(oldVnode9,vnode17);
				}
				if(vnode17.text == undefined) {
					if(oldCh5 != undefined && ch8 != undefined) {
						if(oldCh5 != ch8) snabbdom_Patch.updateChildren(elm53,oldCh5,ch8,insertedVnodeQueue);
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
								var elm58;
								var children6 = vnode18.children;
								var sel5 = vnode18.sel;
								if(sel5 != undefined) {
									var hashIdx5 = sel5.indexOf("#",0);
									var dotIdx5 = sel5.indexOf(".",hashIdx5);
									var hash5 = hashIdx5 > 0?hashIdx5:sel5.length;
									var dot5 = dotIdx5 > 0?dotIdx5:sel5.length;
									var tag5 = hashIdx5 != -1 || dotIdx5 != -1?sel5.slice(0,Math.min(hash5,dot5)):sel5;
									elm58 = vnode18.elm = data5 != undefined && (i52 = data5.ns) != undefined?(function($this) {
										var $r;
										var ns5 = i52;
										$r = window.document.createElementNS(ns5,tag5);
										return $r;
									}($this)):window.document.createElement(tag5);
									if(hash5 < dot5) elm58.id = sel5.slice(hash5 + 1,dot5);
									if(dotIdx5 > 0) {
										elm.className = sel.slice(dot+1).replace(snabbdom_Patch.rg, " ");;
									}
									if(Array.isArray(children6)) {
										i52 = 0;
										if(i52 < children6.length) do {
											var new_node11 = snabbdom_Patch.createElm(children6[i52],insertedVnodeQueue);
											elm58.appendChild(new_node11);
										} while((function($this) {
											var $r;
											++i52;
											$r = i52 < children6.length;
											return $r;
										}($this)));
									} else if(typeof vnode18.text == "string" || typeof vnode18.text == "number") elm58.appendChild(window.document.createTextNode(vnode18.text));
									var oldVnode10 = snabbdom_Patch.emptyNode;
									var key51;
									var cur40;
									var old20;
									var elm59 = vnode18.elm;
									var oldAttrs10 = oldVnode10.data.attrs == null?{ }:oldVnode10.data.attrs;
									var attrs10 = vnode18.data.attrs == null?{ }:vnode18.data.attrs;
									var _g75 = 0;
									var _g158 = Object.keys(attrs10);
									while(_g75 < _g158.length) {
										var key52 = _g158[_g75];
										++_g75;
										cur40 = attrs10[key52];
										old20 = oldAttrs10[key52];
										if(old20 != cur40) {
											if(!cur40 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key52]) elm59.removeAttribute(key52); else elm59.setAttribute(key52,cur40);
										}
									}
									var _g76 = 0;
									var _g159 = Object.keys(oldAttrs10);
									while(_g76 < _g159.length) {
										var key53 = _g159[_g76];
										++_g76;
										if(!Object.prototype.hasOwnProperty.call(attrs10,key53)) elm59.removeAttribute(key53);
									}
									var key54;
									var cur41;
									var old21;
									var elm60 = vnode18.elm;
									var oldProps10 = oldVnode10.data.props == null?{ }:oldVnode10.data.props;
									var props14 = vnode18.data.props == null?{ }:vnode18.data.props;
									var _g77 = 0;
									var _g160 = Object.keys(props14);
									while(_g77 < _g160.length) {
										var key55 = _g160[_g77];
										++_g77;
										cur41 = props14[key55];
										old21 = oldProps10[key55];
										if(old21 != cur41) {
											var value20 = cur41;
											elm60[key55] = value20;
										}
									}
									var cur42;
									var name66;
									var elm61 = vnode18.elm;
									var oldClass10 = oldVnode10.data.classes == null?{ }:oldVnode10.data.classes;
									var klass10 = vnode18.data.classes == null?{ }:vnode18.data.classes;
									var _g78 = 0;
									var _g161 = Object.keys(klass10);
									while(_g78 < _g161.length) {
										var name67 = _g161[_g78];
										++_g78;
										cur42 = klass10[name67];
										if(cur42 != oldClass10[name67]) {
											if(cur42 == "add") elm61.classList.add(name67); else if(cur42 == "remove") elm61.classList.remove(name67);
										}
									}
									var cur43;
									var name68;
									var elm62 = vnode18.elm;
									var oldStyle10 = oldVnode10.data.style == null?{ }:oldVnode10.data.style;
									var style18 = vnode18.data.style == null?{ }:vnode18.data.style;
									var oldHasDel10 = Object.prototype.hasOwnProperty.call(oldStyle10,"delayed");
									var _g79 = 0;
									var _g162 = Object.keys(style18);
									while(_g79 < _g162.length) {
										var name69 = _g162[_g79];
										++_g79;
										cur43 = style18[name69];
										if(name69 == "delayed") {
											var delayed10 = style18.delayed;
											var oldDelayed10 = oldStyle10.delayed;
											var _g217 = 0;
											var _g316 = Object.keys(delayed10);
											while(_g217 < _g316.length) {
												var name70 = _g316[_g217];
												++_g217;
												cur43 = delayed10[name70];
												if(!oldHasDel10 || cur43 != oldDelayed10[name70]) {
													var obj10 = [elm62.style];
													var prop10 = [name70];
													var val10 = [cur43];
													var fn10 = [(function(val10,prop10,obj10) {
														return function(i53) {
															var value21 = val10[0];
															obj10[0][prop10[0]] = value21;
														};
													})(val10,prop10,obj10)];
													window.requestAnimationFrame((function(fn10) {
														return function(i54) {
															window.requestAnimationFrame(fn10[0]);
														};
													})(fn10));
												}
											}
										} else if(name69 != "remove" && cur43 != oldStyle10[name69]) elm62.style[name69] = cur43;
									}
									if(vnode18.data != null) {
										i52 = vnode18.data.hook;
										if(i52 != undefined) {
											if(i52.create) i52.create(snabbdom_Patch.emptyNode,vnode18);
											if(i52.insert) insertedVnodeQueue.push(vnode18);
										}
									}
								} else elm58 = vnode18.elm = window.document.createTextNode(vnode18.text);
								$r = vnode18.elm;
								return $r;
							}(this));
							elm53.insertBefore(new_node10,null);
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
										var name71;
										var elm63 = vnode19.elm;
										var s8 = vnode19.data.style;
										if(s8 == null) null; else {
											style19 = s8.destroy;
											if(style19 == null) null; else {
												var _g80 = 0;
												var _g163 = Object.keys(style19);
												while(_g80 < _g163.length) {
													var name72 = _g163[_g80];
													++_g80;
													elm63.style[name72] = style19[name72];
												}
											}
										}
										if((i56 = vnode19.children) != undefined) {
											j4 = 0;
											if(j4 < vnode19.children.length) do snabbdom_Patch.invokeDestroyHook(vnode19.children[j4]); while((function($this) {
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
										var name73;
										var elm64 = [vnode20.elm];
										var idx4;
										var i57 = 0;
										var maxDur4 = 0;
										var compStyle4;
										var style20 = s9.remove;
										var amount4 = [0];
										var applied4 = [];
										var _g81 = 0;
										var _g164 = Object.keys(style20);
										while(_g81 < _g164.length) {
											var name74 = _g164[_g81];
											++_g81;
											applied4.push(name74);
											elm64[0].style[name74] = style20[name74];
										}
										compStyle4 = window.getComputedStyle(elm64[0]);
										var props15 = compStyle4["transition-property"].split(", ");
										var i58;
										i58 = 0;
										if(i58 < props15.length) do if(HxOverrides.indexOf(applied4,props15[i58],0) != -1) amount4[0]++; while((function($this) {
											var $r;
											++i58;
											$r = i58 < props15.length;
											return $r;
										}(this)));
										elm64[0].addEventListener("transitionend",(function(amount4,elm64,rm14) {
											return function(ev4) {
												if(ev4.target == elm64[0]) --amount4[0];
												if(amount4[0] == 0) rm14[0]();
											};
										})(amount4,elm64,rm14));
									}
									if((i55 = ch9.data) != undefined && (i55 = i55.hook) != undefined && (i55 = i55.remove) != undefined) i55(ch9,rm12); else {
										console.log("remove");
										if(rm12 != null) rm12();
										elm53.removeChild(ch9.elm);
									}
								} else elm53.removeChild(ch9.elm);
							}
						} while((function($this) {
							var $r;
							++startIdx9;
							$r = startIdx9 <= endIdx9;
							return $r;
						}(this)));
					}
				} else if(oldVnode9.text != vnode17.text) elm53.textContent = vnode17.text;
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
				var elm65;
				var children7 = vnode21.children;
				var sel6 = vnode21.sel;
				if(sel6 != undefined) {
					var hashIdx6 = sel6.indexOf("#",0);
					var dotIdx6 = sel6.indexOf(".",hashIdx6);
					var hash6 = hashIdx6 > 0?hashIdx6:sel6.length;
					var dot6 = dotIdx6 > 0?dotIdx6:sel6.length;
					var tag6 = hashIdx6 != -1 || dotIdx6 != -1?sel6.slice(0,Math.min(hash6,dot6)):sel6;
					elm65 = vnode21.elm = data6 != undefined && (i60 = data6.ns) != undefined?(function($this) {
						var $r;
						var ns6 = i60;
						$r = window.document.createElementNS(ns6,tag6);
						return $r;
					}($this)):window.document.createElement(tag6);
					if(hash6 < dot6) elm65.id = sel6.slice(hash6 + 1,dot6);
					if(dotIdx6 > 0) {
						elm.className = sel.slice(dot+1).replace(snabbdom_Patch.rg, " ");;
					}
					if(Array.isArray(children7)) {
						i60 = 0;
						if(i60 < children7.length) do {
							var new_node13 = snabbdom_Patch.createElm(children7[i60],insertedVnodeQueue);
							elm65.appendChild(new_node13);
						} while((function($this) {
							var $r;
							++i60;
							$r = i60 < children7.length;
							return $r;
						}($this)));
					} else if(typeof vnode21.text == "string" || typeof vnode21.text == "number") elm65.appendChild(window.document.createTextNode(vnode21.text));
					var oldVnode11 = snabbdom_Patch.emptyNode;
					var key56;
					var cur44;
					var old22;
					var elm66 = vnode21.elm;
					var oldAttrs11 = oldVnode11.data.attrs == null?{ }:oldVnode11.data.attrs;
					var attrs11 = vnode21.data.attrs == null?{ }:vnode21.data.attrs;
					var _g82 = 0;
					var _g165 = Object.keys(attrs11);
					while(_g82 < _g165.length) {
						var key57 = _g165[_g82];
						++_g82;
						cur44 = attrs11[key57];
						old22 = oldAttrs11[key57];
						if(old22 != cur44) {
							if(!cur44 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key57]) elm66.removeAttribute(key57); else elm66.setAttribute(key57,cur44);
						}
					}
					var _g83 = 0;
					var _g166 = Object.keys(oldAttrs11);
					while(_g83 < _g166.length) {
						var key58 = _g166[_g83];
						++_g83;
						if(!Object.prototype.hasOwnProperty.call(attrs11,key58)) elm66.removeAttribute(key58);
					}
					var key59;
					var cur45;
					var old23;
					var elm67 = vnode21.elm;
					var oldProps11 = oldVnode11.data.props == null?{ }:oldVnode11.data.props;
					var props16 = vnode21.data.props == null?{ }:vnode21.data.props;
					var _g84 = 0;
					var _g167 = Object.keys(props16);
					while(_g84 < _g167.length) {
						var key60 = _g167[_g84];
						++_g84;
						cur45 = props16[key60];
						old23 = oldProps11[key60];
						if(old23 != cur45) {
							var value22 = cur45;
							elm67[key60] = value22;
						}
					}
					var cur46;
					var name75;
					var elm68 = vnode21.elm;
					var oldClass11 = oldVnode11.data.classes == null?{ }:oldVnode11.data.classes;
					var klass11 = vnode21.data.classes == null?{ }:vnode21.data.classes;
					var _g85 = 0;
					var _g168 = Object.keys(klass11);
					while(_g85 < _g168.length) {
						var name76 = _g168[_g85];
						++_g85;
						cur46 = klass11[name76];
						if(cur46 != oldClass11[name76]) {
							if(cur46 == "add") elm68.classList.add(name76); else if(cur46 == "remove") elm68.classList.remove(name76);
						}
					}
					var cur47;
					var name77;
					var elm69 = vnode21.elm;
					var oldStyle11 = oldVnode11.data.style == null?{ }:oldVnode11.data.style;
					var style21 = vnode21.data.style == null?{ }:vnode21.data.style;
					var oldHasDel11 = Object.prototype.hasOwnProperty.call(oldStyle11,"delayed");
					var _g86 = 0;
					var _g169 = Object.keys(style21);
					while(_g86 < _g169.length) {
						var name78 = _g169[_g86];
						++_g86;
						cur47 = style21[name78];
						if(name78 == "delayed") {
							var delayed11 = style21.delayed;
							var oldDelayed11 = oldStyle11.delayed;
							var _g218 = 0;
							var _g317 = Object.keys(delayed11);
							while(_g218 < _g317.length) {
								var name79 = _g317[_g218];
								++_g218;
								cur47 = delayed11[name79];
								if(!oldHasDel11 || cur47 != oldDelayed11[name79]) {
									var obj11 = [elm69.style];
									var prop11 = [name79];
									var val11 = [cur47];
									var fn11 = [(function(val11,prop11,obj11) {
										return function(i61) {
											var value23 = val11[0];
											obj11[0][prop11[0]] = value23;
										};
									})(val11,prop11,obj11)];
									window.requestAnimationFrame((function(fn11) {
										return function(i62) {
											window.requestAnimationFrame(fn11[0]);
										};
									})(fn11));
								}
							}
						} else if(name78 != "remove" && cur47 != oldStyle11[name78]) elm69.style[name78] = cur47;
					}
					if(vnode21.data != null) {
						i60 = vnode21.data.hook;
						if(i60 != undefined) {
							if(i60.create) i60.create(snabbdom_Patch.emptyNode,vnode21);
							if(i60.insert) insertedVnodeQueue.push(vnode21);
						}
					}
				} else elm65 = vnode21.elm = window.document.createTextNode(vnode21.text);
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
						var name80;
						var elm70 = vnode22.elm;
						var s10 = vnode22.data.style;
						if(s10 == null) null; else {
							style22 = s10.destroy;
							if(style22 == null) null; else {
								var _g87 = 0;
								var _g170 = Object.keys(style22);
								while(_g87 < _g170.length) {
									var name81 = _g170[_g87];
									++_g87;
									elm70.style[name81] = style22[name81];
								}
							}
						}
						if((i64 = vnode22.children) != undefined) {
							j5 = 0;
							if(j5 < vnode22.children.length) do snabbdom_Patch.invokeDestroyHook(vnode22.children[j5]); while((function($this) {
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
						var name82;
						var elm71 = [vnode23.elm];
						var idx5;
						var i65 = 0;
						var maxDur5 = 0;
						var compStyle5;
						var style23 = s11.remove;
						var amount5 = [0];
						var applied5 = [];
						var _g88 = 0;
						var _g171 = Object.keys(style23);
						while(_g88 < _g171.length) {
							var name83 = _g171[_g88];
							++_g88;
							applied5.push(name83);
							elm71[0].style[name83] = style23[name83];
						}
						compStyle5 = window.getComputedStyle(elm71[0]);
						var props17 = compStyle5["transition-property"].split(", ");
						var i66;
						i66 = 0;
						if(i66 < props17.length) do if(HxOverrides.indexOf(applied5,props17[i66],0) != -1) amount5[0]++; while((function($this) {
							var $r;
							++i66;
							$r = i66 < props17.length;
							return $r;
						}(this)));
						elm71[0].addEventListener("transitionend",(function(amount5,elm71,rm17) {
							return function(ev5) {
								if(ev5.target == elm71[0]) --amount5[0];
								if(amount5[0] == 0) rm17[0]();
							};
						})(amount5,elm71,rm17));
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
snabbdom_Patch.patchDom = function(oldVnode,vnode) {
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
			if(hash < dot) elm.id = sel.slice(hash + 1,dot);
			if(dotIdx > 0) {
				elm.className = sel.slice(dot+1).replace(snabbdom_Patch.rg, " ");;
			}
			if(Array.isArray(children)) {
				i1 = 0;
				if(i1 < children.length) do {
					var new_node = snabbdom_Patch.createElm(children[i1],insertedVnodeQueue);
					elm.appendChild(new_node);
				} while((function($this) {
					var $r;
					++i1;
					$r = i1 < children.length;
					return $r;
				}(this)));
			} else if(typeof vnode1.text == "string" || typeof vnode1.text == "number") elm.appendChild(window.document.createTextNode(vnode1.text));
			var oldVnode1 = snabbdom_Patch.emptyNode;
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
					if(!cur && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key1]) elm1.removeAttribute(key1); else elm1.setAttribute(key1,cur);
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
					var value = cur1;
					elm2[key4] = value;
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
									var value1 = val[0];
									obj[0][prop[0]] = value1;
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
			if(vnode1.data != null) {
				i1 = vnode1.data.hook;
				if(i1 != undefined) {
					if(i1.create) i1.create(snabbdom_Patch.emptyNode,vnode1);
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
		var elm5 = vnode2.elm = oldVnode2.elm;
		var oldCh = oldVnode2.children;
		var ch = vnode2.children;
		if(oldVnode2 == vnode2) null; else {
			if(vnode2.data != undefined) {
				var key6;
				var cur4;
				var old2;
				var elm6 = vnode2.elm;
				var oldAttrs1 = oldVnode2.data.attrs == null?{ }:oldVnode2.data.attrs;
				var attrs1 = vnode2.data.attrs == null?{ }:vnode2.data.attrs;
				var _g6 = 0;
				var _g15 = Object.keys(attrs1);
				while(_g6 < _g15.length) {
					var key7 = _g15[_g6];
					++_g6;
					cur4 = attrs1[key7];
					old2 = oldAttrs1[key7];
					if(old2 != cur4) {
						if(!cur4 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key7]) elm6.removeAttribute(key7); else elm6.setAttribute(key7,cur4);
					}
				}
				var _g7 = 0;
				var _g16 = Object.keys(oldAttrs1);
				while(_g7 < _g16.length) {
					var key8 = _g16[_g7];
					++_g7;
					if(!Object.prototype.hasOwnProperty.call(attrs1,key8)) elm6.removeAttribute(key8);
				}
				var key9;
				var cur5;
				var old3;
				var elm7 = vnode2.elm;
				var oldProps1 = oldVnode2.data.props == null?{ }:oldVnode2.data.props;
				var props1 = vnode2.data.props == null?{ }:vnode2.data.props;
				var _g8 = 0;
				var _g17 = Object.keys(props1);
				while(_g8 < _g17.length) {
					var key10 = _g17[_g8];
					++_g8;
					cur5 = props1[key10];
					old3 = oldProps1[key10];
					if(old3 != cur5) {
						var value2 = cur5;
						elm7[key10] = value2;
					}
				}
				var cur6;
				var name5;
				var elm8 = vnode2.elm;
				var oldClass1 = oldVnode2.data.classes == null?{ }:oldVnode2.data.classes;
				var klass1 = vnode2.data.classes == null?{ }:vnode2.data.classes;
				var _g9 = 0;
				var _g18 = Object.keys(klass1);
				while(_g9 < _g18.length) {
					var name6 = _g18[_g9];
					++_g9;
					cur6 = klass1[name6];
					if(cur6 != oldClass1[name6]) {
						if(cur6 == "add") elm8.classList.add(name6); else if(cur6 == "remove") elm8.classList.remove(name6);
					}
				}
				var cur7;
				var name7;
				var elm9 = vnode2.elm;
				var oldStyle1 = oldVnode2.data.style == null?{ }:oldVnode2.data.style;
				var style1 = vnode2.data.style == null?{ }:vnode2.data.style;
				var oldHasDel1 = Object.prototype.hasOwnProperty.call(oldStyle1,"delayed");
				var _g10 = 0;
				var _g19 = Object.keys(style1);
				while(_g10 < _g19.length) {
					var name8 = _g19[_g10];
					++_g10;
					cur7 = style1[name8];
					if(name8 == "delayed") {
						var delayed1 = style1.delayed;
						var oldDelayed1 = oldStyle1.delayed;
						var _g22 = 0;
						var _g32 = Object.keys(delayed1);
						while(_g22 < _g32.length) {
							var name9 = _g32[_g22];
							++_g22;
							cur7 = delayed1[name9];
							if(!oldHasDel1 || cur7 != oldDelayed1[name9]) {
								var obj1 = [elm9.style];
								var prop1 = [name9];
								var val1 = [cur7];
								var fn1 = [(function(val1,prop1,obj1) {
									return function(i5) {
										var value3 = val1[0];
										obj1[0][prop1[0]] = value3;
									};
								})(val1,prop1,obj1)];
								window.requestAnimationFrame((function(fn1) {
									return function(i6) {
										window.requestAnimationFrame(fn1[0]);
									};
								})(fn1));
							}
						}
					} else if(name8 != "remove" && cur7 != oldStyle1[name8]) elm9.style[name8] = cur7;
				}
				i4 = vnode2.data.hook;
				if(i4 != undefined && (i4 = i4.update) != undefined) i4(oldVnode2,vnode2);
			}
			if(vnode2.text == undefined) {
				if(oldCh != undefined && ch != undefined) {
					if(oldCh != ch) snabbdom_Patch.updateChildren(elm5,oldCh,ch,insertedVnodeQueue);
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
							var elm10;
							var children1 = vnode3.children;
							var sel1 = vnode3.sel;
							if(sel1 != undefined) {
								var hashIdx1 = sel1.indexOf("#",0);
								var dotIdx1 = sel1.indexOf(".",hashIdx1);
								var hash1 = hashIdx1 > 0?hashIdx1:sel1.length;
								var dot1 = dotIdx1 > 0?dotIdx1:sel1.length;
								var tag1 = hashIdx1 != -1 || dotIdx1 != -1?sel1.slice(0,Math.min(hash1,dot1)):sel1;
								elm10 = vnode3.elm = data2 != undefined && (i8 = data2.ns) != undefined?(function($this) {
									var $r;
									var ns1 = i8;
									$r = window.document.createElementNS(ns1,tag1);
									return $r;
								}($this)):window.document.createElement(tag1);
								if(hash1 < dot1) elm10.id = sel1.slice(hash1 + 1,dot1);
								if(dotIdx1 > 0) {
									elm.className = sel.slice(dot+1).replace(snabbdom_Patch.rg, " ");;
								}
								if(Array.isArray(children1)) {
									i8 = 0;
									if(i8 < children1.length) do {
										var new_node2 = snabbdom_Patch.createElm(children1[i8],insertedVnodeQueue);
										elm10.appendChild(new_node2);
									} while((function($this) {
										var $r;
										++i8;
										$r = i8 < children1.length;
										return $r;
									}($this)));
								} else if(typeof vnode3.text == "string" || typeof vnode3.text == "number") elm10.appendChild(window.document.createTextNode(vnode3.text));
								var oldVnode3 = snabbdom_Patch.emptyNode;
								var key11;
								var cur8;
								var old4;
								var elm11 = vnode3.elm;
								var oldAttrs2 = oldVnode3.data.attrs == null?{ }:oldVnode3.data.attrs;
								var attrs2 = vnode3.data.attrs == null?{ }:vnode3.data.attrs;
								var _g20 = 0;
								var _g110 = Object.keys(attrs2);
								while(_g20 < _g110.length) {
									var key12 = _g110[_g20];
									++_g20;
									cur8 = attrs2[key12];
									old4 = oldAttrs2[key12];
									if(old4 != cur8) {
										if(!cur8 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key12]) elm11.removeAttribute(key12); else elm11.setAttribute(key12,cur8);
									}
								}
								var _g23 = 0;
								var _g111 = Object.keys(oldAttrs2);
								while(_g23 < _g111.length) {
									var key13 = _g111[_g23];
									++_g23;
									if(!Object.prototype.hasOwnProperty.call(attrs2,key13)) elm11.removeAttribute(key13);
								}
								var key14;
								var cur9;
								var old5;
								var elm12 = vnode3.elm;
								var oldProps2 = oldVnode3.data.props == null?{ }:oldVnode3.data.props;
								var props2 = vnode3.data.props == null?{ }:vnode3.data.props;
								var _g24 = 0;
								var _g112 = Object.keys(props2);
								while(_g24 < _g112.length) {
									var key15 = _g112[_g24];
									++_g24;
									cur9 = props2[key15];
									old5 = oldProps2[key15];
									if(old5 != cur9) {
										var value4 = cur9;
										elm12[key15] = value4;
									}
								}
								var cur10;
								var name10;
								var elm13 = vnode3.elm;
								var oldClass2 = oldVnode3.data.classes == null?{ }:oldVnode3.data.classes;
								var klass2 = vnode3.data.classes == null?{ }:vnode3.data.classes;
								var _g25 = 0;
								var _g113 = Object.keys(klass2);
								while(_g25 < _g113.length) {
									var name11 = _g113[_g25];
									++_g25;
									cur10 = klass2[name11];
									if(cur10 != oldClass2[name11]) {
										if(cur10 == "add") elm13.classList.add(name11); else if(cur10 == "remove") elm13.classList.remove(name11);
									}
								}
								var cur11;
								var name12;
								var elm14 = vnode3.elm;
								var oldStyle2 = oldVnode3.data.style == null?{ }:oldVnode3.data.style;
								var style2 = vnode3.data.style == null?{ }:vnode3.data.style;
								var oldHasDel2 = Object.prototype.hasOwnProperty.call(oldStyle2,"delayed");
								var _g26 = 0;
								var _g114 = Object.keys(style2);
								while(_g26 < _g114.length) {
									var name13 = _g114[_g26];
									++_g26;
									cur11 = style2[name13];
									if(name13 == "delayed") {
										var delayed2 = style2.delayed;
										var oldDelayed2 = oldStyle2.delayed;
										var _g27 = 0;
										var _g33 = Object.keys(delayed2);
										while(_g27 < _g33.length) {
											var name14 = _g33[_g27];
											++_g27;
											cur11 = delayed2[name14];
											if(!oldHasDel2 || cur11 != oldDelayed2[name14]) {
												var obj2 = [elm14.style];
												var prop2 = [name14];
												var val2 = [cur11];
												var fn2 = [(function(val2,prop2,obj2) {
													return function(i9) {
														var value5 = val2[0];
														obj2[0][prop2[0]] = value5;
													};
												})(val2,prop2,obj2)];
												window.requestAnimationFrame((function(fn2) {
													return function(i10) {
														window.requestAnimationFrame(fn2[0]);
													};
												})(fn2));
											}
										}
									} else if(name13 != "remove" && cur11 != oldStyle2[name13]) elm14.style[name13] = cur11;
								}
								if(vnode3.data != null) {
									i8 = vnode3.data.hook;
									if(i8 != undefined) {
										if(i8.create) i8.create(snabbdom_Patch.emptyNode,vnode3);
										if(i8.insert) insertedVnodeQueue.push(vnode3);
									}
								}
							} else elm10 = vnode3.elm = window.document.createTextNode(vnode3.text);
							$r = vnode3.elm;
							return $r;
						}(this));
						elm5.insertBefore(new_node1,null);
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
									var name15;
									var elm15 = vnode4.elm;
									var s = vnode4.data.style;
									if(s == null) null; else {
										style3 = s.destroy;
										if(style3 == null) null; else {
											var _g28 = 0;
											var _g115 = Object.keys(style3);
											while(_g28 < _g115.length) {
												var name16 = _g115[_g28];
												++_g28;
												elm15.style[name16] = style3[name16];
											}
										}
									}
									if((i12 = vnode4.children) != undefined) {
										j = 0;
										if(j < vnode4.children.length) do snabbdom_Patch.invokeDestroyHook(vnode4.children[j]); while((function($this) {
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
									var name17;
									var elm16 = [vnode5.elm];
									var idx;
									var i13 = 0;
									var maxDur = 0;
									var compStyle;
									var style4 = s1.remove;
									var amount = [0];
									var applied = [];
									var _g29 = 0;
									var _g116 = Object.keys(style4);
									while(_g29 < _g116.length) {
										var name18 = _g116[_g29];
										++_g29;
										applied.push(name18);
										elm16[0].style[name18] = style4[name18];
									}
									compStyle = window.getComputedStyle(elm16[0]);
									var props3 = compStyle["transition-property"].split(", ");
									var i14;
									i14 = 0;
									if(i14 < props3.length) do if(HxOverrides.indexOf(applied,props3[i14],0) != -1) amount[0]++; while((function($this) {
										var $r;
										++i14;
										$r = i14 < props3.length;
										return $r;
									}(this)));
									elm16[0].addEventListener("transitionend",(function(amount,elm16,rm2) {
										return function(ev) {
											if(ev.target == elm16[0]) --amount[0];
											if(amount[0] == 0) rm2[0]();
										};
									})(amount,elm16,rm2));
								}
								if((i11 = ch1.data) != undefined && (i11 = i11.hook) != undefined && (i11 = i11.remove) != undefined) i11(ch1,rm); else {
									console.log("remove");
									if(rm != null) rm();
									elm5.removeChild(ch1.elm);
								}
							} else elm5.removeChild(ch1.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx1;
						$r = startIdx1 <= endIdx1;
						return $r;
					}(this)));
				}
			} else if(oldVnode2.text != vnode2.text) elm5.textContent = vnode2.text;
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
snabbdom_Patch.patch = function(oldVnode,vnode) {
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
					if(!cur && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key1]) elm1.removeAttribute(key1); else elm1.setAttribute(key1,cur);
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
					var value = cur1;
					elm2[key4] = value;
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
									var value1 = val[0];
									obj[0][prop[0]] = value1;
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
			i1 = vnode1.data.hook;
			if(i1 != undefined && (i1 = i1.update) != undefined) i1(oldVnode1,vnode1);
		}
		if(vnode1.text == undefined) {
			if(oldCh != undefined && ch != undefined) {
				if(oldCh != ch) snabbdom_Patch.updateChildren(elm,oldCh,ch,insertedVnodeQueue);
			} else if(ch != undefined) {
				var startIdx = 0;
				var endIdx = ch.length - 1;
				var i4;
				var new_node;
				i4 = 0;
				if(startIdx <= endIdx) while(true) {
					var tmp;
					var vnode2 = ch[startIdx];
					var i5;
					var data = vnode2.data;
					if(data != undefined) {
						if((i5 = data.hook) != undefined && (i5 = i5.init) != undefined) i5(vnode2);
						if((i5 = data.vnode) != undefined) vnode2 = i5;
					}
					var elm5;
					var children = vnode2.children;
					var sel = vnode2.sel;
					if(sel != undefined) {
						var hashIdx = sel.indexOf("#",0);
						var dotIdx = sel.indexOf(".",hashIdx);
						var hash = hashIdx > 0?hashIdx:sel.length;
						var dot = dotIdx > 0?dotIdx:sel.length;
						var tag = hashIdx != -1 || dotIdx != -1?sel.slice(0,Math.min(hash,dot)):sel;
						var tmp2;
						if(data != undefined && (i5 = data.ns) != undefined) {
							var ns = i5;
							tmp2 = window.document.createElementNS(ns,tag);
						} else tmp2 = window.document.createElement(tag);
						elm5 = vnode2.elm = tmp2;
						if(hash < dot) elm5.id = sel.slice(hash + 1,dot);
						if(dotIdx > 0) {
							elm.className = sel.slice(dot+1).replace(snabbdom_Patch.rg, " ");;
						}
						if(Array.isArray(children)) {
							i5 = 0;
							if(i5 < children.length) while(true) {
								var new_node1 = snabbdom_Patch.createElm(children[i5],insertedVnodeQueue);
								elm5.appendChild(new_node1);
								var tmp3;
								++i5;
								tmp3 = i5 < children.length;
								if(!tmp3) break;
							}
						} else if(typeof vnode2.text == "string" || typeof vnode2.text == "number") elm5.appendChild(window.document.createTextNode(vnode2.text));
						var oldVnode2 = snabbdom_Patch.emptyNode;
						var key5;
						var cur4;
						var old2;
						var elm6 = vnode2.elm;
						var oldAttrs1 = oldVnode2.data.attrs == null?{ }:oldVnode2.data.attrs;
						var attrs1 = vnode2.data.attrs == null?{ }:vnode2.data.attrs;
						var _g6 = 0;
						var _g15 = Object.keys(attrs1);
						while(_g6 < _g15.length) {
							var key6 = _g15[_g6];
							++_g6;
							cur4 = attrs1[key6];
							old2 = oldAttrs1[key6];
							if(old2 != cur4) {
								if(!cur4 && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key6]) elm6.removeAttribute(key6); else elm6.setAttribute(key6,cur4);
							}
						}
						var _g7 = 0;
						var _g16 = Object.keys(oldAttrs1);
						while(_g7 < _g16.length) {
							var key7 = _g16[_g7];
							++_g7;
							if(!Object.prototype.hasOwnProperty.call(attrs1,key7)) elm6.removeAttribute(key7);
						}
						var key8;
						var cur5;
						var old3;
						var elm7 = vnode2.elm;
						var oldProps1 = oldVnode2.data.props == null?{ }:oldVnode2.data.props;
						var props1 = vnode2.data.props == null?{ }:vnode2.data.props;
						var _g8 = 0;
						var _g17 = Object.keys(props1);
						while(_g8 < _g17.length) {
							var key9 = _g17[_g8];
							++_g8;
							cur5 = props1[key9];
							old3 = oldProps1[key9];
							if(old3 != cur5) {
								var value2 = cur5;
								elm7[key9] = value2;
							}
						}
						var cur6;
						var name5;
						var elm8 = vnode2.elm;
						var oldClass1 = oldVnode2.data.classes == null?{ }:oldVnode2.data.classes;
						var klass1 = vnode2.data.classes == null?{ }:vnode2.data.classes;
						var _g9 = 0;
						var _g18 = Object.keys(klass1);
						while(_g9 < _g18.length) {
							var name6 = _g18[_g9];
							++_g9;
							cur6 = klass1[name6];
							if(cur6 != oldClass1[name6]) {
								if(cur6 == "add") elm8.classList.add(name6); else if(cur6 == "remove") elm8.classList.remove(name6);
							}
						}
						var cur7;
						var name7;
						var elm9 = vnode2.elm;
						var oldStyle1 = oldVnode2.data.style == null?{ }:oldVnode2.data.style;
						var style1 = vnode2.data.style == null?{ }:vnode2.data.style;
						var oldHasDel1 = Object.prototype.hasOwnProperty.call(oldStyle1,"delayed");
						var _g10 = 0;
						var _g19 = Object.keys(style1);
						while(_g10 < _g19.length) {
							var name8 = _g19[_g10];
							++_g10;
							cur7 = style1[name8];
							if(name8 == "delayed") {
								var delayed1 = style1.delayed;
								var oldDelayed1 = oldStyle1.delayed;
								var _g22 = 0;
								var _g32 = Object.keys(delayed1);
								while(_g22 < _g32.length) {
									var name9 = _g32[_g22];
									++_g22;
									cur7 = delayed1[name9];
									if(!oldHasDel1 || cur7 != oldDelayed1[name9]) {
										var obj1 = [elm9.style];
										var prop1 = [name9];
										var val1 = [cur7];
										var fn1 = [(function(val1,prop1,obj1) {
											return function(i6) {
												var value3 = val1[0];
												obj1[0][prop1[0]] = value3;
											};
										})(val1,prop1,obj1)];
										window.requestAnimationFrame((function(fn1) {
											return function(i7) {
												window.requestAnimationFrame(fn1[0]);
											};
										})(fn1));
									}
								}
							} else if(name8 != "remove" && cur7 != oldStyle1[name8]) elm9.style[name8] = cur7;
						}
						if(vnode2.data != null) {
							i5 = vnode2.data.hook;
							if(i5 != undefined) {
								if(i5.create) i5.create(snabbdom_Patch.emptyNode,vnode2);
								if(i5.insert) insertedVnodeQueue.push(vnode2);
							}
						}
					} else elm5 = vnode2.elm = window.document.createTextNode(vnode2.text);
					tmp = vnode2.elm;
					new_node = tmp;
					elm.insertBefore(new_node,null);
					var tmp1;
					++startIdx;
					tmp1 = startIdx <= endIdx;
					if(!tmp1) break;
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
								var name10;
								var elm10 = vnode3.elm;
								var s = vnode3.data.style;
								if(s == null) null; else {
									style2 = s.destroy;
									if(style2 == null) null; else {
										var _g20 = 0;
										var _g110 = Object.keys(style2);
										while(_g20 < _g110.length) {
											var name11 = _g110[_g20];
											++_g20;
											elm10.style[name11] = style2[name11];
										}
									}
								}
								if((i9 = vnode3.children) != undefined) {
									j = 0;
									if(j < vnode3.children.length) while(true) {
										snabbdom_Patch.invokeDestroyHook(vnode3.children[j]);
										var tmp5;
										++j;
										tmp5 = j < vnode3.children.length;
										if(!tmp5) break;
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
								var name12;
								var elm11 = [vnode4.elm];
								var idx;
								var i10 = 0;
								var maxDur = 0;
								var compStyle;
								var style3 = s1.remove;
								var amount = [0];
								var applied = [];
								var _g23 = 0;
								var _g111 = Object.keys(style3);
								while(_g23 < _g111.length) {
									var name13 = _g111[_g23];
									++_g23;
									applied.push(name13);
									elm11[0].style[name13] = style3[name13];
								}
								compStyle = window.getComputedStyle(elm11[0]);
								var props2 = compStyle["transition-property"].split(", ");
								var i11;
								i11 = 0;
								if(i11 < props2.length) while(true) {
									if(HxOverrides.indexOf(applied,props2[i11],0) != -1) amount[0]++;
									var tmp6;
									++i11;
									tmp6 = i11 < props2.length;
									if(!tmp6) break;
								}
								elm11[0].addEventListener("transitionend",(function(amount,elm11,rm2) {
									return function(ev) {
										if(ev.target == elm11[0]) --amount[0];
										if(amount[0] == 0) rm2[0]();
									};
								})(amount,elm11,rm2));
							}
							if((i8 = ch1.data) != undefined && (i8 = i8.hook) != undefined && (i8 = i8.remove) != undefined) i8(ch1,rm); else {
								console.log("remove");
								if(rm != null) rm();
								elm.removeChild(ch1.elm);
							}
						} else elm.removeChild(ch1.elm);
					}
					var tmp4;
					++startIdx1;
					tmp4 = startIdx1 <= endIdx1;
					if(!tmp4) break;
				}
			}
		} else if(oldVnode1.text != vnode1.text) elm.textContent = vnode1.text;
		if(hook != undefined && (i1 = hook.postpatch) != undefined) i1(oldVnode1,vnode1);
	}
	i = 0;
	if(i < insertedVnodeQueue.length) while(true) {
		insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
		var tmp7;
		++i;
		tmp7 = i < insertedVnodeQueue.length;
		if(!tmp7) break;
	}
	return vnode;
};
var snabbdom_plugins_dom_Attributes = function() { };
var thx_Arrays = function() { };
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
snabbdom_Patch.rg = new RegExp("\\.","g");
snabbdom_Patch.emptyNode = (function($this) {
	var $r;
	var data = { };
	var elm = null;
	var key = data == null?null:data.key;
	$r = { sel : "", data : data, children : [], text : null, elm : elm, key : key};
	return $r;
}(this));
snabbdom_plugins_dom_Attributes.booleanAttrs = ["allowfullscreen","async","autofocus","autoplay","checked","compact","controls","declare","default","defaultchecked","defaultmuted","defaultselected","defer","disabled","draggable","enabled","formnovalidate","hidden","indeterminate","inert","ismap","itemscope","loop","multiple","muted","nohref","noresize","noshade","novalidate","nowrap","open","pauseonexit","readonly","required","reversed","scoped","seamless","selected","sortable","spellcheck","translate","truespeed","typemustmatch","visible"];
snabbdom_plugins_dom_Attributes.booleanAttrsDict = (function($this) {
	var $r;
	var hash = { };
	var len = snabbdom_plugins_dom_Attributes.booleanAttrs.length;
	var i = 0;
	{
		i = 0;
		if(i < len) do hash[snabbdom_plugins_dom_Attributes.booleanAttrs[i]] = true; while((function($this) {
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
