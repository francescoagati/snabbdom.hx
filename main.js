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
var Attributes = function() { };
var Main = function() { };
Main.main = function() {
	var vnode = Main.h("div#conta.two.classes",{ on : { click : function() {
	}}},[Main.h("span",{ style : { fontWeight : "bold"}},"This is bold")," and this is just normal text",Main.h("a",{ props : { href : "/foo"}},"I'll take you places!")]);
	var container = window.document.getElementById("container");
	Main.patch(container,vnode);
	var timer = new haxe_Timer(1000);
	var last_node = vnode;
	timer.run = function() {
		var rnd = Math.random();
		var color = thx_Arrays.shuffle(["red","green","yellow","gray"])[0];
		var bg = thx_Arrays.shuffle(["red","green","yellow","gray"])[0];
		var vnode2 = Main.h("div#conta.two.classes",{ on : { click : function() {
		}}},[Main.h("span",{ },"This is bold")," and this is just normal text 222",Main.h("a",{ },"I'll take you places1!"),Main.h("span",{ attrs : { pippa : 123}},"I'll take you places2!"),Main.h("a",{ style : { 'backgroundColor' : bg, 'color' : color}, classes : { 'random' : "add"}, attrs : { random : rnd}},"I'll take you places" + rnd + "!")]);
		Main.patch(last_node,vnode2);
		last_node = vnode2;
	};
};
Main.h = function(sel,b,c) {
	var data = { };
	var children = null;
	var text = null;
	var i;
	var $arguments = arguments;
	if($arguments.length == 3) {
		data = b;
		if((function($this) {
			var $r;
			var obj = c;
			$r = Array.isArray(obj);
			return $r;
		}(this))) children = c; else if((function($this) {
			var $r;
			var s = c;
			$r = typeof s == "string" || typeof s == "number";
			return $r;
		}(this))) text = c;
	} else if($arguments.length == 2) {
		if((function($this) {
			var $r;
			var obj1 = b;
			$r = Array.isArray(obj1);
			return $r;
		}(this))) children = b; else if((function($this) {
			var $r;
			var s1 = b;
			$r = typeof s1 == "string" || typeof s1 == "number";
			return $r;
		}(this))) text = b; else data = b;
	}
	if(Array.isArray(children)) {
		i = 0;
		if(i < children.length) do if((function($this) {
			var $r;
			var s2 = children[i];
			$r = typeof s2 == "string" || typeof s2 == "number";
			return $r;
		}(this))) children[i] = (function($this) {
			var $r;
			var text1 = children[i];
			var elm = null;
			var key = null;
			$r = { sel : null, data : null, children : null, text : text1, elm : elm, key : key};
			return $r;
		}(this)); while((function($this) {
			var $r;
			++i;
			$r = i < children.length;
			return $r;
		}(this)));
	}
	return (function($this) {
		var $r;
		var elm1 = undefined;
		var key1 = data == null?null:data.key;
		$r = { sel : sel, data : data, children : children, text : text, elm : elm1, key : key1};
		return $r;
	}(this));
};
Main.createElm = function(vnode,insertedVnodeQueue) {
	var i;
	var data = vnode.data;
	if(data != undefined) {
		if((function($this) {
			var $r;
			var s = i = data.hook;
			$r = s != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s1 = i = i.init;
			$r = s1 != undefined;
			return $r;
		}(this))) i(vnode);
		if((function($this) {
			var $r;
			var s2 = i = data.vnode;
			$r = s2 != undefined;
			return $r;
		}(this))) vnode = i;
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
		elm = vnode.elm = data != undefined && (function($this) {
			var $r;
			var s3 = i = data.ns;
			$r = s3 != undefined;
			return $r;
		}(this))?document.createElementNS(i,tag):document.createElement(tag);
		if(hash < dot) elm.id = sel.slice(hash + 1,dot);
		if(dotIdx > 0) {
			elm.className = sel.slice(dot+1).replace(Main.rg, " ");;
		}
		if(Array.isArray(children)) {
			i = 0;
			if(i < children.length) do elm.appendChild(Main.createElm(children[i],insertedVnodeQueue)); while((function($this) {
				var $r;
				++i;
				$r = i < children.length;
				return $r;
			}(this)));
		} else if(typeof vnode.text == "string" || typeof vnode.text == "number") elm.appendChild(document.createTextNode(vnode.text));
		var oldVnode = Main.emptyNode;
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
				if(!cur && Attributes.booleanAttrsDict[key1]) elm1.removeAttribute(key1); else elm1.setAttribute(key1,cur);
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
				if(i.create) i.create(Main.emptyNode,vnode);
				if(i.insert) insertedVnodeQueue.push(vnode);
			}
		}
	} else elm = vnode.elm = document.createTextNode(vnode.text);
	return vnode.elm;
};
Main.invokeDestroyHook = function(vnode) {
	var i = vnode.data;
	var j;
	if(i != undefined) {
		if((function($this) {
			var $r;
			var s = i = i.hook;
			$r = s != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s1 = i = i.destroy;
			$r = s1 != undefined;
			return $r;
		}(this))) i(vnode);
		var style = null;
		var name;
		var elm = vnode.elm;
		var s2 = vnode.data.style;
		if(s2 == null) null; else {
			style = s2.destroy;
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
		if((function($this) {
			var $r;
			var s3 = i = vnode.children;
			$r = s3 != undefined;
			return $r;
		}(this))) {
			j = 0;
			if(j < vnode.children.length) do Main.invokeDestroyHook(vnode.children[j]); while((function($this) {
				var $r;
				++j;
				$r = j < vnode.children.length;
				return $r;
			}(this)));
		}
	}
};
Main.patchVnode = function(oldVnode,vnode,insertedVnodeQueue) {
	var i;
	var hook;
	if((function($this) {
		var $r;
		var s = i = vnode.data;
		$r = s != undefined;
		return $r;
	}(this)) && (function($this) {
		var $r;
		var s1 = hook = i.hook;
		$r = s1 != undefined;
		return $r;
	}(this)) && (function($this) {
		var $r;
		var s2 = i = hook.prepatch;
		$r = s2 != undefined;
		return $r;
	}(this))) i(oldVnode,vnode);
	if((function($this) {
		var $r;
		var s3 = i = oldVnode.data;
		$r = s3 != undefined;
		return $r;
	}(this)) && (function($this) {
		var $r;
		var s4 = i = i.vnode;
		$r = s4 != undefined;
		return $r;
	}(this))) oldVnode = i;
	if((function($this) {
		var $r;
		var s5 = i = vnode.data;
		$r = s5 != undefined;
		return $r;
	}(this)) && (function($this) {
		var $r;
		var s6 = i = i.vnode;
		$r = s6 != undefined;
		return $r;
	}(this))) vnode = i;
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
				if(!cur && Attributes.booleanAttrsDict[key1]) elm1.removeAttribute(key1); else elm1.setAttribute(key1,cur);
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
		if(i != undefined && (function($this) {
			var $r;
			var s7 = i = i.update;
			$r = s7 != undefined;
			return $r;
		}(this))) i(oldVnode,vnode);
	}
	if(vnode.text == undefined) {
		if(oldCh != undefined && ch != undefined) {
			if(oldCh != ch) {
				var oldStartIdx = 0;
				var newStartIdx = 0;
				var oldEndIdx = oldCh.length - 1;
				var oldStartVnode = oldCh[0];
				var oldEndVnode = oldCh[oldEndIdx];
				var newEndIdx = ch.length - 1;
				var newStartVnode = ch[0];
				var newEndVnode = ch[newEndIdx];
				var oldKeyToIdx = null;
				var idxInOld;
				var elmToMove;
				var before;
				while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) if(oldStartVnode == undefined) oldStartVnode = oldCh[++oldStartIdx]; else if(oldEndVnode == undefined) oldEndVnode = oldCh[--oldEndIdx]; else if(oldStartVnode.key == newStartVnode.key && oldStartVnode.sel == newStartVnode.sel) {
					Main.patchVnode(oldStartVnode,newStartVnode,insertedVnodeQueue);
					oldStartVnode = oldCh[++oldStartIdx];
					newStartVnode = ch[++newStartIdx];
				} else if(oldEndVnode.key == newEndVnode.key && oldEndVnode.sel == newEndVnode.sel) {
					Main.patchVnode(oldEndVnode,newEndVnode,insertedVnodeQueue);
					oldEndVnode = oldCh[--oldEndIdx];
					newEndVnode = ch[--newEndIdx];
				} else if(oldStartVnode.key == newEndVnode.key && oldStartVnode.sel == newEndVnode.sel) {
					Main.patchVnode(oldStartVnode,newEndVnode,insertedVnodeQueue);
					elm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling);
					oldStartVnode = oldCh[++oldStartIdx];
					newEndVnode = ch[--newEndIdx];
				} else if(oldEndVnode.key == newStartVnode.key && oldEndVnode.sel == newStartVnode.sel) {
					Main.patchVnode(oldEndVnode,newStartVnode,insertedVnodeQueue);
					elm.insertBefore(oldEndVnode.elm,oldStartVnode.elm);
					oldEndVnode = oldCh[--oldEndIdx];
					newStartVnode = ch[++newStartIdx];
				} else {
					if(oldKeyToIdx == undefined) oldKeyToIdx = (function($this) {
						var $r;
						var children = oldCh;
						var i3;
						var map = { };
						var key5;
						{
							i3 = oldStartIdx;
							if(i3 <= oldEndIdx) do {
								key5 = children[i3].key;
								if(key5 != undefined) map[key5] = i3;
							} while((function($this) {
								var $r;
								++i3;
								$r = i3 <= oldEndIdx;
								return $r;
							}($this)));
						}
						$r = map;
						return $r;
					}(this));
					idxInOld = oldKeyToIdx[newStartVnode.key];
					if(idxInOld == undefined) {
						elm.insertBefore((function($this) {
							var $r;
							var vnode1 = newStartVnode;
							var i4;
							var data = vnode1.data;
							if(data != undefined) {
								if((function($this) {
									var $r;
									var s8 = i4 = data.hook;
									$r = s8 != undefined;
									return $r;
								}($this)) && (function($this) {
									var $r;
									var s9 = i4 = i4.init;
									$r = s9 != undefined;
									return $r;
								}($this))) i4(vnode1);
								if((function($this) {
									var $r;
									var s10 = i4 = data.vnode;
									$r = s10 != undefined;
									return $r;
								}($this))) vnode1 = i4;
							}
							var elm5;
							var children1 = vnode1.children;
							var sel = vnode1.sel;
							if(sel != undefined) {
								var hashIdx = sel.indexOf("#",0);
								var dotIdx = sel.indexOf(".",hashIdx);
								var hash = hashIdx > 0?hashIdx:sel.length;
								var dot = dotIdx > 0?dotIdx:sel.length;
								var tag = hashIdx != -1 || dotIdx != -1?sel.slice(0,Math.min(hash,dot)):sel;
								elm5 = vnode1.elm = data != undefined && (function($this) {
									var $r;
									var s11 = i4 = data.ns;
									$r = s11 != undefined;
									return $r;
								}($this))?document.createElementNS(i4,tag):document.createElement(tag);
								if(hash < dot) elm5.id = sel.slice(hash + 1,dot);
								if(dotIdx > 0) {
									elm.className = sel.slice(dot+1).replace(Main.rg, " ");;
								}
								if(Array.isArray(children1)) {
									i4 = 0;
									if(i4 < children1.length) do elm5.appendChild(Main.createElm(children1[i4],insertedVnodeQueue)); while((function($this) {
										var $r;
										++i4;
										$r = i4 < children1.length;
										return $r;
									}($this)));
								} else if(typeof vnode1.text == "string" || typeof vnode1.text == "number") elm5.appendChild(document.createTextNode(vnode1.text));
								var oldVnode1 = Main.emptyNode;
								var key6;
								var cur4;
								var old2;
								var elm6 = vnode1.elm;
								var oldAttrs1 = oldVnode1.data.attrs == null?{ }:oldVnode1.data.attrs;
								var attrs1 = vnode1.data.attrs == null?{ }:vnode1.data.attrs;
								var _g6 = 0;
								var _g15 = Object.keys(attrs1);
								while(_g6 < _g15.length) {
									var key7 = _g15[_g6];
									++_g6;
									cur4 = attrs1[key7];
									old2 = oldAttrs1[key7];
									if(old2 != cur4) {
										if(!cur4 && Attributes.booleanAttrsDict[key7]) elm6.removeAttribute(key7); else elm6.setAttribute(key7,cur4);
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
								var elm7 = vnode1.elm;
								var oldProps1 = oldVnode1.data.props == null?{ }:oldVnode1.data.props;
								var props1 = vnode1.data.props == null?{ }:vnode1.data.props;
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
										if(i4.create) i4.create(Main.emptyNode,vnode1);
										if(i4.insert) insertedVnodeQueue.push(vnode1);
									}
								}
							} else elm5 = vnode1.elm = document.createTextNode(vnode1.text);
							$r = vnode1.elm;
							return $r;
						}(this)),oldStartVnode.elm);
						newStartVnode = ch[++newStartIdx];
					} else {
						elmToMove = oldCh[idxInOld];
						Main.patchVnode(elmToMove,newStartVnode,insertedVnodeQueue);
						oldCh[idxInOld] = null;
						elm.insertBefore(elmToMove.elm,oldStartVnode.elm);
						newStartVnode = ch[++newStartIdx];
					}
				}
				if(oldStartIdx > oldEndIdx) {
					before = ch[newEndIdx + 1] == undefined?null:ch[newEndIdx + 1].elm;
					var vnodes = ch;
					var startIdx = newStartIdx;
					var i7;
					i7 = 0;
					if(startIdx <= newEndIdx) do elm.insertBefore((function($this) {
						var $r;
						var vnode2 = vnodes[startIdx];
						var i8;
						var data1 = vnode2.data;
						if(data1 != undefined) {
							if((function($this) {
								var $r;
								var s12 = i8 = data1.hook;
								$r = s12 != undefined;
								return $r;
							}($this)) && (function($this) {
								var $r;
								var s13 = i8 = i8.init;
								$r = s13 != undefined;
								return $r;
							}($this))) i8(vnode2);
							if((function($this) {
								var $r;
								var s14 = i8 = data1.vnode;
								$r = s14 != undefined;
								return $r;
							}($this))) vnode2 = i8;
						}
						var elm10;
						var children2 = vnode2.children;
						var sel1 = vnode2.sel;
						if(sel1 != undefined) {
							var hashIdx1 = sel1.indexOf("#",0);
							var dotIdx1 = sel1.indexOf(".",hashIdx1);
							var hash1 = hashIdx1 > 0?hashIdx1:sel1.length;
							var dot1 = dotIdx1 > 0?dotIdx1:sel1.length;
							var tag1 = hashIdx1 != -1 || dotIdx1 != -1?sel1.slice(0,Math.min(hash1,dot1)):sel1;
							elm10 = vnode2.elm = data1 != undefined && (function($this) {
								var $r;
								var s15 = i8 = data1.ns;
								$r = s15 != undefined;
								return $r;
							}($this))?document.createElementNS(i8,tag1):document.createElement(tag1);
							if(hash1 < dot1) elm10.id = sel1.slice(hash1 + 1,dot1);
							if(dotIdx1 > 0) {
								elm.className = sel.slice(dot+1).replace(Main.rg, " ");;
							}
							if(Array.isArray(children2)) {
								i8 = 0;
								if(i8 < children2.length) do elm10.appendChild(Main.createElm(children2[i8],insertedVnodeQueue)); while((function($this) {
									var $r;
									++i8;
									$r = i8 < children2.length;
									return $r;
								}($this)));
							} else if(typeof vnode2.text == "string" || typeof vnode2.text == "number") elm10.appendChild(document.createTextNode(vnode2.text));
							var oldVnode2 = Main.emptyNode;
							var key11;
							var cur8;
							var old4;
							var elm11 = vnode2.elm;
							var oldAttrs2 = oldVnode2.data.attrs == null?{ }:oldVnode2.data.attrs;
							var attrs2 = vnode2.data.attrs == null?{ }:vnode2.data.attrs;
							var _g20 = 0;
							var _g110 = Object.keys(attrs2);
							while(_g20 < _g110.length) {
								var key12 = _g110[_g20];
								++_g20;
								cur8 = attrs2[key12];
								old4 = oldAttrs2[key12];
								if(old4 != cur8) {
									if(!cur8 && Attributes.booleanAttrsDict[key12]) elm11.removeAttribute(key12); else elm11.setAttribute(key12,cur8);
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
							var elm12 = vnode2.elm;
							var oldProps2 = oldVnode2.data.props == null?{ }:oldVnode2.data.props;
							var props2 = vnode2.data.props == null?{ }:vnode2.data.props;
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
							var elm13 = vnode2.elm;
							var oldClass2 = oldVnode2.data.classes == null?{ }:oldVnode2.data.classes;
							var klass2 = vnode2.data.classes == null?{ }:vnode2.data.classes;
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
							var elm14 = vnode2.elm;
							var oldStyle2 = oldVnode2.data.style == null?{ }:oldVnode2.data.style;
							var style2 = vnode2.data.style == null?{ }:vnode2.data.style;
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
							if(vnode2.data != null) {
								i8 = vnode2.data.hook;
								if(i8 != undefined) {
									if(i8.create) i8.create(Main.emptyNode,vnode2);
									if(i8.insert) insertedVnodeQueue.push(vnode2);
								}
							}
						} else elm10 = vnode2.elm = document.createTextNode(vnode2.text);
						$r = vnode2.elm;
						return $r;
					}(this)),before); while((function($this) {
						var $r;
						++startIdx;
						$r = startIdx <= newEndIdx;
						return $r;
					}(this)));
				} else if(newStartIdx > newEndIdx) {
					var vnodes1 = oldCh;
					var startIdx1 = oldStartIdx;
					var y;
					y = 0;
					if(startIdx1 <= oldEndIdx) do {
						var i11;
						var listeners;
						var rm = null;
						var ch1 = vnodes1[startIdx1];
						if(ch1 != undefined) {
							if(ch1.sel != undefined) {
								var vnode3 = ch1;
								var i12 = vnode3.data;
								var j;
								if(i12 != undefined) {
									if((function($this) {
										var $r;
										var s16 = i12 = i12.hook;
										$r = s16 != undefined;
										return $r;
									}(this)) && (function($this) {
										var $r;
										var s17 = i12 = i12.destroy;
										$r = s17 != undefined;
										return $r;
									}(this))) i12(vnode3);
									var style3 = null;
									var name15;
									var elm15 = vnode3.elm;
									var s18 = vnode3.data.style;
									if(s18 == null) null; else {
										style3 = s18.destroy;
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
									if((function($this) {
										var $r;
										var s19 = i12 = vnode3.children;
										$r = s19 != undefined;
										return $r;
									}(this))) {
										j = 0;
										if(j < vnode3.children.length) do Main.invokeDestroyHook(vnode3.children[j]); while((function($this) {
											var $r;
											++j;
											$r = j < vnode3.children.length;
											return $r;
										}(this)));
									}
								}
								var vnode4 = ch1;
								var rm1 = rm;
								var rm2 = [rm1];
								var s20 = vnode4.data.style;
								if(!s20 || !s20.remove) {
									rm2[0]();
									null;
								} else {
									var name17;
									var elm16 = [vnode4.elm];
									var idx;
									var i13 = 0;
									var maxDur = 0;
									var compStyle;
									var style4 = s20.remove;
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
								if((function($this) {
									var $r;
									var s21 = i11 = ch1.data;
									$r = s21 != undefined;
									return $r;
								}(this)) && (function($this) {
									var $r;
									var s22 = i11 = i11.hook;
									$r = s22 != undefined;
									return $r;
								}(this)) && (function($this) {
									var $r;
									var s23 = i11 = i11.remove;
									$r = s23 != undefined;
									return $r;
								}(this))) i11(ch1,rm); else rm();
							} else elm.removeChild(ch1.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx1;
						$r = startIdx1 <= oldEndIdx;
						return $r;
					}(this)));
				}
			}
		} else if(ch != undefined) {
			var vnodes2 = ch;
			var startIdx2 = 0;
			var endIdx = ch.length - 1;
			var i15;
			i15 = 0;
			if(startIdx2 <= endIdx) do elm.insertBefore((function($this) {
				var $r;
				var vnode5 = vnodes2[startIdx2];
				var i16;
				var data2 = vnode5.data;
				if(data2 != undefined) {
					if((function($this) {
						var $r;
						var s24 = i16 = data2.hook;
						$r = s24 != undefined;
						return $r;
					}($this)) && (function($this) {
						var $r;
						var s25 = i16 = i16.init;
						$r = s25 != undefined;
						return $r;
					}($this))) i16(vnode5);
					if((function($this) {
						var $r;
						var s26 = i16 = data2.vnode;
						$r = s26 != undefined;
						return $r;
					}($this))) vnode5 = i16;
				}
				var elm17;
				var children3 = vnode5.children;
				var sel2 = vnode5.sel;
				if(sel2 != undefined) {
					var hashIdx2 = sel2.indexOf("#",0);
					var dotIdx2 = sel2.indexOf(".",hashIdx2);
					var hash2 = hashIdx2 > 0?hashIdx2:sel2.length;
					var dot2 = dotIdx2 > 0?dotIdx2:sel2.length;
					var tag2 = hashIdx2 != -1 || dotIdx2 != -1?sel2.slice(0,Math.min(hash2,dot2)):sel2;
					elm17 = vnode5.elm = data2 != undefined && (function($this) {
						var $r;
						var s27 = i16 = data2.ns;
						$r = s27 != undefined;
						return $r;
					}($this))?document.createElementNS(i16,tag2):document.createElement(tag2);
					if(hash2 < dot2) elm17.id = sel2.slice(hash2 + 1,dot2);
					if(dotIdx2 > 0) {
						elm.className = sel.slice(dot+1).replace(Main.rg, " ");;
					}
					if(Array.isArray(children3)) {
						i16 = 0;
						if(i16 < children3.length) do elm17.appendChild(Main.createElm(children3[i16],insertedVnodeQueue)); while((function($this) {
							var $r;
							++i16;
							$r = i16 < children3.length;
							return $r;
						}($this)));
					} else if(typeof vnode5.text == "string" || typeof vnode5.text == "number") elm17.appendChild(document.createTextNode(vnode5.text));
					var oldVnode3 = Main.emptyNode;
					var key16;
					var cur12;
					var old6;
					var elm18 = vnode5.elm;
					var oldAttrs3 = oldVnode3.data.attrs == null?{ }:oldVnode3.data.attrs;
					var attrs3 = vnode5.data.attrs == null?{ }:vnode5.data.attrs;
					var _g30 = 0;
					var _g117 = Object.keys(attrs3);
					while(_g30 < _g117.length) {
						var key17 = _g117[_g30];
						++_g30;
						cur12 = attrs3[key17];
						old6 = oldAttrs3[key17];
						if(old6 != cur12) {
							if(!cur12 && Attributes.booleanAttrsDict[key17]) elm18.removeAttribute(key17); else elm18.setAttribute(key17,cur12);
						}
					}
					var _g34 = 0;
					var _g118 = Object.keys(oldAttrs3);
					while(_g34 < _g118.length) {
						var key18 = _g118[_g34];
						++_g34;
						if(!Object.prototype.hasOwnProperty.call(attrs3,key18)) elm18.removeAttribute(key18);
					}
					var key19;
					var cur13;
					var old7;
					var elm19 = vnode5.elm;
					var oldProps3 = oldVnode3.data.props == null?{ }:oldVnode3.data.props;
					var props4 = vnode5.data.props == null?{ }:vnode5.data.props;
					var _g35 = 0;
					var _g119 = Object.keys(props4);
					while(_g35 < _g119.length) {
						var key20 = _g119[_g35];
						++_g35;
						cur13 = props4[key20];
						old7 = oldProps3[key20];
						if(old7 != cur13) {
							var value6 = cur13;
							elm19[key20] = value6;
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
										return function(i17) {
											var value7 = val3[0];
											obj3[0][prop3[0]] = value7;
										};
									})(val3,prop3,obj3)];
									window.requestAnimationFrame((function(fn3) {
										return function(i18) {
											window.requestAnimationFrame(fn3[0]);
										};
									})(fn3));
								}
							}
						} else if(name22 != "remove" && cur15 != oldStyle3[name22]) elm21.style[name22] = cur15;
					}
					if(vnode5.data != null) {
						i16 = vnode5.data.hook;
						if(i16 != undefined) {
							if(i16.create) i16.create(Main.emptyNode,vnode5);
							if(i16.insert) insertedVnodeQueue.push(vnode5);
						}
					}
				} else elm17 = vnode5.elm = document.createTextNode(vnode5.text);
				$r = vnode5.elm;
				return $r;
			}(this)),null); while((function($this) {
				var $r;
				++startIdx2;
				$r = startIdx2 <= endIdx;
				return $r;
			}(this)));
		} else if(oldCh != undefined) {
			var vnodes3 = oldCh;
			var startIdx3 = 0;
			var endIdx1 = oldCh.length - 1;
			var y1;
			y1 = 0;
			if(startIdx3 <= endIdx1) do {
				var i19;
				var listeners1;
				var rm3 = null;
				var ch2 = vnodes3[startIdx3];
				if(ch2 != undefined) {
					if(ch2.sel != undefined) {
						var vnode6 = ch2;
						var i20 = vnode6.data;
						var j1;
						if(i20 != undefined) {
							if((function($this) {
								var $r;
								var s28 = i20 = i20.hook;
								$r = s28 != undefined;
								return $r;
							}(this)) && (function($this) {
								var $r;
								var s29 = i20 = i20.destroy;
								$r = s29 != undefined;
								return $r;
							}(this))) i20(vnode6);
							var style6 = null;
							var name24;
							var elm22 = vnode6.elm;
							var s30 = vnode6.data.style;
							if(s30 == null) null; else {
								style6 = s30.destroy;
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
							if((function($this) {
								var $r;
								var s31 = i20 = vnode6.children;
								$r = s31 != undefined;
								return $r;
							}(this))) {
								j1 = 0;
								if(j1 < vnode6.children.length) do Main.invokeDestroyHook(vnode6.children[j1]); while((function($this) {
									var $r;
									++j1;
									$r = j1 < vnode6.children.length;
									return $r;
								}(this)));
							}
						}
						var vnode7 = ch2;
						var rm4 = rm3;
						var rm5 = [rm4];
						var s32 = vnode7.data.style;
						if(!s32 || !s32.remove) {
							rm5[0]();
							null;
						} else {
							var name26;
							var elm23 = [vnode7.elm];
							var idx1;
							var i21 = 0;
							var maxDur1 = 0;
							var compStyle1;
							var style7 = s32.remove;
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
							var i22;
							i22 = 0;
							if(i22 < props5.length) do if(HxOverrides.indexOf(applied1,props5[i22],0) != -1) amount1[0]++; while((function($this) {
								var $r;
								++i22;
								$r = i22 < props5.length;
								return $r;
							}(this)));
							elm23[0].addEventListener("transitionend",(function(amount1,elm23,rm5) {
								return function(ev1) {
									if(ev1.target == elm23[0]) --amount1[0];
									if(amount1[0] == 0) rm5[0]();
								};
							})(amount1,elm23,rm5));
						}
						if((function($this) {
							var $r;
							var s33 = i19 = ch2.data;
							$r = s33 != undefined;
							return $r;
						}(this)) && (function($this) {
							var $r;
							var s34 = i19 = i19.hook;
							$r = s34 != undefined;
							return $r;
						}(this)) && (function($this) {
							var $r;
							var s35 = i19 = i19.remove;
							$r = s35 != undefined;
							return $r;
						}(this))) i19(ch2,rm3); else rm3();
					} else elm.removeChild(ch2.elm);
				}
			} while((function($this) {
				var $r;
				++startIdx3;
				$r = startIdx3 <= endIdx1;
				return $r;
			}(this)));
		}
	} else if(oldVnode.text != vnode.text) elm.textContent = vnode.text;
	if(hook != undefined && (function($this) {
		var $r;
		var s36 = i = hook.postpatch;
		$r = s36 != undefined;
		return $r;
	}(this))) i(oldVnode,vnode);
};
Main.patch = function(oldVnode,vnode) {
	var i;
	var insertedVnodeQueue = [];
	if(oldVnode instanceof Element) {
		if(oldVnode.parentElement != null) {
			var vnode1 = vnode;
			var i1;
			var data = vnode1.data;
			if(data != undefined) {
				if((function($this) {
					var $r;
					var s = i1 = data.hook;
					$r = s != undefined;
					return $r;
				}(this)) && (function($this) {
					var $r;
					var s1 = i1 = i1.init;
					$r = s1 != undefined;
					return $r;
				}(this))) i1(vnode1);
				if((function($this) {
					var $r;
					var s2 = i1 = data.vnode;
					$r = s2 != undefined;
					return $r;
				}(this))) vnode1 = i1;
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
				elm = vnode1.elm = data != undefined && (function($this) {
					var $r;
					var s3 = i1 = data.ns;
					$r = s3 != undefined;
					return $r;
				}(this))?document.createElementNS(i1,tag):document.createElement(tag);
				if(hash < dot) elm.id = sel.slice(hash + 1,dot);
				if(dotIdx > 0) {
					elm.className = sel.slice(dot+1).replace(Main.rg, " ");;
				}
				if(Array.isArray(children)) {
					i1 = 0;
					if(i1 < children.length) do elm.appendChild(Main.createElm(children[i1],insertedVnodeQueue)); while((function($this) {
						var $r;
						++i1;
						$r = i1 < children.length;
						return $r;
					}(this)));
				} else if(typeof vnode1.text == "string" || typeof vnode1.text == "number") elm.appendChild(document.createTextNode(vnode1.text));
				var oldVnode1 = Main.emptyNode;
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
						if(!cur && Attributes.booleanAttrsDict[key1]) elm1.removeAttribute(key1); else elm1.setAttribute(key1,cur);
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
						if(i1.create) i1.create(Main.emptyNode,vnode1);
						if(i1.insert) insertedVnodeQueue.push(vnode1);
					}
				}
			} else elm = vnode1.elm = document.createTextNode(vnode1.text);
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
			if((function($this) {
				var $r;
				var s4 = i4 = vnode2.data;
				$r = s4 != undefined;
				return $r;
			}(this)) && (function($this) {
				var $r;
				var s5 = hook = i4.hook;
				$r = s5 != undefined;
				return $r;
			}(this)) && (function($this) {
				var $r;
				var s6 = i4 = hook.prepatch;
				$r = s6 != undefined;
				return $r;
			}(this))) i4(oldVnode2,vnode2);
			if((function($this) {
				var $r;
				var s7 = i4 = oldVnode2.data;
				$r = s7 != undefined;
				return $r;
			}(this)) && (function($this) {
				var $r;
				var s8 = i4 = i4.vnode;
				$r = s8 != undefined;
				return $r;
			}(this))) oldVnode2 = i4;
			if((function($this) {
				var $r;
				var s9 = i4 = vnode2.data;
				$r = s9 != undefined;
				return $r;
			}(this)) && (function($this) {
				var $r;
				var s10 = i4 = i4.vnode;
				$r = s10 != undefined;
				return $r;
			}(this))) vnode2 = i4;
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
							if(!cur4 && Attributes.booleanAttrsDict[key7]) elm6.removeAttribute(key7); else elm6.setAttribute(key7,cur4);
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
					if(i4 != undefined && (function($this) {
						var $r;
						var s11 = i4 = i4.update;
						$r = s11 != undefined;
						return $r;
					}(this))) i4(oldVnode2,vnode2);
				}
				if(vnode2.text == undefined) {
					if(oldCh != undefined && ch != undefined) {
						if(oldCh != ch) {
							var oldStartIdx = 0;
							var newStartIdx = 0;
							var oldEndIdx = oldCh.length - 1;
							var oldStartVnode = oldCh[0];
							var oldEndVnode = oldCh[oldEndIdx];
							var newEndIdx = ch.length - 1;
							var newStartVnode = ch[0];
							var newEndVnode = ch[newEndIdx];
							var oldKeyToIdx = null;
							var idxInOld;
							var elmToMove;
							var before;
							while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) if(oldStartVnode == undefined) oldStartVnode = oldCh[++oldStartIdx]; else if(oldEndVnode == undefined) oldEndVnode = oldCh[--oldEndIdx]; else if(oldStartVnode.key == newStartVnode.key && oldStartVnode.sel == newStartVnode.sel) {
								Main.patchVnode(oldStartVnode,newStartVnode,insertedVnodeQueue);
								oldStartVnode = oldCh[++oldStartIdx];
								newStartVnode = ch[++newStartIdx];
							} else if(oldEndVnode.key == newEndVnode.key && oldEndVnode.sel == newEndVnode.sel) {
								Main.patchVnode(oldEndVnode,newEndVnode,insertedVnodeQueue);
								oldEndVnode = oldCh[--oldEndIdx];
								newEndVnode = ch[--newEndIdx];
							} else if(oldStartVnode.key == newEndVnode.key && oldStartVnode.sel == newEndVnode.sel) {
								Main.patchVnode(oldStartVnode,newEndVnode,insertedVnodeQueue);
								elm5.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling);
								oldStartVnode = oldCh[++oldStartIdx];
								newEndVnode = ch[--newEndIdx];
							} else if(oldEndVnode.key == newStartVnode.key && oldEndVnode.sel == newStartVnode.sel) {
								Main.patchVnode(oldEndVnode,newStartVnode,insertedVnodeQueue);
								elm5.insertBefore(oldEndVnode.elm,oldStartVnode.elm);
								oldEndVnode = oldCh[--oldEndIdx];
								newStartVnode = ch[++newStartIdx];
							} else {
								if(oldKeyToIdx == undefined) oldKeyToIdx = (function($this) {
									var $r;
									var children1 = oldCh;
									var i7;
									var map = { };
									var key11;
									{
										i7 = oldStartIdx;
										if(i7 <= oldEndIdx) do {
											key11 = children1[i7].key;
											if(key11 != undefined) map[key11] = i7;
										} while((function($this) {
											var $r;
											++i7;
											$r = i7 <= oldEndIdx;
											return $r;
										}($this)));
									}
									$r = map;
									return $r;
								}(this));
								idxInOld = oldKeyToIdx[newStartVnode.key];
								if(idxInOld == undefined) {
									elm5.insertBefore((function($this) {
										var $r;
										var vnode3 = newStartVnode;
										var i8;
										var data2 = vnode3.data;
										if(data2 != undefined) {
											if((function($this) {
												var $r;
												var s12 = i8 = data2.hook;
												$r = s12 != undefined;
												return $r;
											}($this)) && (function($this) {
												var $r;
												var s13 = i8 = i8.init;
												$r = s13 != undefined;
												return $r;
											}($this))) i8(vnode3);
											if((function($this) {
												var $r;
												var s14 = i8 = data2.vnode;
												$r = s14 != undefined;
												return $r;
											}($this))) vnode3 = i8;
										}
										var elm10;
										var children2 = vnode3.children;
										var sel1 = vnode3.sel;
										if(sel1 != undefined) {
											var hashIdx1 = sel1.indexOf("#",0);
											var dotIdx1 = sel1.indexOf(".",hashIdx1);
											var hash1 = hashIdx1 > 0?hashIdx1:sel1.length;
											var dot1 = dotIdx1 > 0?dotIdx1:sel1.length;
											var tag1 = hashIdx1 != -1 || dotIdx1 != -1?sel1.slice(0,Math.min(hash1,dot1)):sel1;
											elm10 = vnode3.elm = data2 != undefined && (function($this) {
												var $r;
												var s15 = i8 = data2.ns;
												$r = s15 != undefined;
												return $r;
											}($this))?document.createElementNS(i8,tag1):document.createElement(tag1);
											if(hash1 < dot1) elm10.id = sel1.slice(hash1 + 1,dot1);
											if(dotIdx1 > 0) {
												elm.className = sel.slice(dot+1).replace(Main.rg, " ");;
											}
											if(Array.isArray(children2)) {
												i8 = 0;
												if(i8 < children2.length) do elm10.appendChild(Main.createElm(children2[i8],insertedVnodeQueue)); while((function($this) {
													var $r;
													++i8;
													$r = i8 < children2.length;
													return $r;
												}($this)));
											} else if(typeof vnode3.text == "string" || typeof vnode3.text == "number") elm10.appendChild(document.createTextNode(vnode3.text));
											var oldVnode3 = Main.emptyNode;
											var key12;
											var cur8;
											var old4;
											var elm11 = vnode3.elm;
											var oldAttrs2 = oldVnode3.data.attrs == null?{ }:oldVnode3.data.attrs;
											var attrs2 = vnode3.data.attrs == null?{ }:vnode3.data.attrs;
											var _g20 = 0;
											var _g110 = Object.keys(attrs2);
											while(_g20 < _g110.length) {
												var key13 = _g110[_g20];
												++_g20;
												cur8 = attrs2[key13];
												old4 = oldAttrs2[key13];
												if(old4 != cur8) {
													if(!cur8 && Attributes.booleanAttrsDict[key13]) elm11.removeAttribute(key13); else elm11.setAttribute(key13,cur8);
												}
											}
											var _g23 = 0;
											var _g111 = Object.keys(oldAttrs2);
											while(_g23 < _g111.length) {
												var key14 = _g111[_g23];
												++_g23;
												if(!Object.prototype.hasOwnProperty.call(attrs2,key14)) elm11.removeAttribute(key14);
											}
											var key15;
											var cur9;
											var old5;
											var elm12 = vnode3.elm;
											var oldProps2 = oldVnode3.data.props == null?{ }:oldVnode3.data.props;
											var props2 = vnode3.data.props == null?{ }:vnode3.data.props;
											var _g24 = 0;
											var _g112 = Object.keys(props2);
											while(_g24 < _g112.length) {
												var key16 = _g112[_g24];
												++_g24;
												cur9 = props2[key16];
												old5 = oldProps2[key16];
												if(old5 != cur9) {
													var value4 = cur9;
													elm12[key16] = value4;
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
													if(i8.create) i8.create(Main.emptyNode,vnode3);
													if(i8.insert) insertedVnodeQueue.push(vnode3);
												}
											}
										} else elm10 = vnode3.elm = document.createTextNode(vnode3.text);
										$r = vnode3.elm;
										return $r;
									}(this)),oldStartVnode.elm);
									newStartVnode = ch[++newStartIdx];
								} else {
									elmToMove = oldCh[idxInOld];
									Main.patchVnode(elmToMove,newStartVnode,insertedVnodeQueue);
									oldCh[idxInOld] = null;
									elm5.insertBefore(elmToMove.elm,oldStartVnode.elm);
									newStartVnode = ch[++newStartIdx];
								}
							}
							if(oldStartIdx > oldEndIdx) {
								before = ch[newEndIdx + 1] == undefined?null:ch[newEndIdx + 1].elm;
								var vnodes = ch;
								var startIdx = newStartIdx;
								var i11;
								i11 = 0;
								if(startIdx <= newEndIdx) do elm5.insertBefore((function($this) {
									var $r;
									var vnode4 = vnodes[startIdx];
									var i12;
									var data3 = vnode4.data;
									if(data3 != undefined) {
										if((function($this) {
											var $r;
											var s16 = i12 = data3.hook;
											$r = s16 != undefined;
											return $r;
										}($this)) && (function($this) {
											var $r;
											var s17 = i12 = i12.init;
											$r = s17 != undefined;
											return $r;
										}($this))) i12(vnode4);
										if((function($this) {
											var $r;
											var s18 = i12 = data3.vnode;
											$r = s18 != undefined;
											return $r;
										}($this))) vnode4 = i12;
									}
									var elm15;
									var children3 = vnode4.children;
									var sel2 = vnode4.sel;
									if(sel2 != undefined) {
										var hashIdx2 = sel2.indexOf("#",0);
										var dotIdx2 = sel2.indexOf(".",hashIdx2);
										var hash2 = hashIdx2 > 0?hashIdx2:sel2.length;
										var dot2 = dotIdx2 > 0?dotIdx2:sel2.length;
										var tag2 = hashIdx2 != -1 || dotIdx2 != -1?sel2.slice(0,Math.min(hash2,dot2)):sel2;
										elm15 = vnode4.elm = data3 != undefined && (function($this) {
											var $r;
											var s19 = i12 = data3.ns;
											$r = s19 != undefined;
											return $r;
										}($this))?document.createElementNS(i12,tag2):document.createElement(tag2);
										if(hash2 < dot2) elm15.id = sel2.slice(hash2 + 1,dot2);
										if(dotIdx2 > 0) {
											elm.className = sel.slice(dot+1).replace(Main.rg, " ");;
										}
										if(Array.isArray(children3)) {
											i12 = 0;
											if(i12 < children3.length) do elm15.appendChild(Main.createElm(children3[i12],insertedVnodeQueue)); while((function($this) {
												var $r;
												++i12;
												$r = i12 < children3.length;
												return $r;
											}($this)));
										} else if(typeof vnode4.text == "string" || typeof vnode4.text == "number") elm15.appendChild(document.createTextNode(vnode4.text));
										var oldVnode4 = Main.emptyNode;
										var key17;
										var cur12;
										var old6;
										var elm16 = vnode4.elm;
										var oldAttrs3 = oldVnode4.data.attrs == null?{ }:oldVnode4.data.attrs;
										var attrs3 = vnode4.data.attrs == null?{ }:vnode4.data.attrs;
										var _g28 = 0;
										var _g115 = Object.keys(attrs3);
										while(_g28 < _g115.length) {
											var key18 = _g115[_g28];
											++_g28;
											cur12 = attrs3[key18];
											old6 = oldAttrs3[key18];
											if(old6 != cur12) {
												if(!cur12 && Attributes.booleanAttrsDict[key18]) elm16.removeAttribute(key18); else elm16.setAttribute(key18,cur12);
											}
										}
										var _g29 = 0;
										var _g116 = Object.keys(oldAttrs3);
										while(_g29 < _g116.length) {
											var key19 = _g116[_g29];
											++_g29;
											if(!Object.prototype.hasOwnProperty.call(attrs3,key19)) elm16.removeAttribute(key19);
										}
										var key20;
										var cur13;
										var old7;
										var elm17 = vnode4.elm;
										var oldProps3 = oldVnode4.data.props == null?{ }:oldVnode4.data.props;
										var props3 = vnode4.data.props == null?{ }:vnode4.data.props;
										var _g30 = 0;
										var _g117 = Object.keys(props3);
										while(_g30 < _g117.length) {
											var key21 = _g117[_g30];
											++_g30;
											cur13 = props3[key21];
											old7 = oldProps3[key21];
											if(old7 != cur13) {
												var value6 = cur13;
												elm17[key21] = value6;
											}
										}
										var cur14;
										var name15;
										var elm18 = vnode4.elm;
										var oldClass3 = oldVnode4.data.classes == null?{ }:oldVnode4.data.classes;
										var klass3 = vnode4.data.classes == null?{ }:vnode4.data.classes;
										var _g34 = 0;
										var _g118 = Object.keys(klass3);
										while(_g34 < _g118.length) {
											var name16 = _g118[_g34];
											++_g34;
											cur14 = klass3[name16];
											if(cur14 != oldClass3[name16]) {
												if(cur14 == "add") elm18.classList.add(name16); else if(cur14 == "remove") elm18.classList.remove(name16);
											}
										}
										var cur15;
										var name17;
										var elm19 = vnode4.elm;
										var oldStyle3 = oldVnode4.data.style == null?{ }:oldVnode4.data.style;
										var style3 = vnode4.data.style == null?{ }:vnode4.data.style;
										var oldHasDel3 = Object.prototype.hasOwnProperty.call(oldStyle3,"delayed");
										var _g35 = 0;
										var _g119 = Object.keys(style3);
										while(_g35 < _g119.length) {
											var name18 = _g119[_g35];
											++_g35;
											cur15 = style3[name18];
											if(name18 == "delayed") {
												var delayed3 = style3.delayed;
												var oldDelayed3 = oldStyle3.delayed;
												var _g210 = 0;
												var _g36 = Object.keys(delayed3);
												while(_g210 < _g36.length) {
													var name19 = _g36[_g210];
													++_g210;
													cur15 = delayed3[name19];
													if(!oldHasDel3 || cur15 != oldDelayed3[name19]) {
														var obj3 = [elm19.style];
														var prop3 = [name19];
														var val3 = [cur15];
														var fn3 = [(function(val3,prop3,obj3) {
															return function(i13) {
																var value7 = val3[0];
																obj3[0][prop3[0]] = value7;
															};
														})(val3,prop3,obj3)];
														window.requestAnimationFrame((function(fn3) {
															return function(i14) {
																window.requestAnimationFrame(fn3[0]);
															};
														})(fn3));
													}
												}
											} else if(name18 != "remove" && cur15 != oldStyle3[name18]) elm19.style[name18] = cur15;
										}
										if(vnode4.data != null) {
											i12 = vnode4.data.hook;
											if(i12 != undefined) {
												if(i12.create) i12.create(Main.emptyNode,vnode4);
												if(i12.insert) insertedVnodeQueue.push(vnode4);
											}
										}
									} else elm15 = vnode4.elm = document.createTextNode(vnode4.text);
									$r = vnode4.elm;
									return $r;
								}(this)),before); while((function($this) {
									var $r;
									++startIdx;
									$r = startIdx <= newEndIdx;
									return $r;
								}(this)));
							} else if(newStartIdx > newEndIdx) {
								var vnodes1 = oldCh;
								var startIdx1 = oldStartIdx;
								var y;
								y = 0;
								if(startIdx1 <= oldEndIdx) do {
									var i15;
									var listeners;
									var rm = null;
									var ch1 = vnodes1[startIdx1];
									if(ch1 != undefined) {
										if(ch1.sel != undefined) {
											var vnode5 = ch1;
											var i16 = vnode5.data;
											var j;
											if(i16 != undefined) {
												if((function($this) {
													var $r;
													var s20 = i16 = i16.hook;
													$r = s20 != undefined;
													return $r;
												}(this)) && (function($this) {
													var $r;
													var s21 = i16 = i16.destroy;
													$r = s21 != undefined;
													return $r;
												}(this))) i16(vnode5);
												var style4 = null;
												var name20;
												var elm20 = vnode5.elm;
												var s22 = vnode5.data.style;
												if(s22 == null) null; else {
													style4 = s22.destroy;
													if(style4 == null) null; else {
														var _g37 = 0;
														var _g120 = Object.keys(style4);
														while(_g37 < _g120.length) {
															var name21 = _g120[_g37];
															++_g37;
															elm20.style[name21] = style4[name21];
														}
													}
												}
												if((function($this) {
													var $r;
													var s23 = i16 = vnode5.children;
													$r = s23 != undefined;
													return $r;
												}(this))) {
													j = 0;
													if(j < vnode5.children.length) do Main.invokeDestroyHook(vnode5.children[j]); while((function($this) {
														var $r;
														++j;
														$r = j < vnode5.children.length;
														return $r;
													}(this)));
												}
											}
											var vnode6 = ch1;
											var rm1 = rm;
											var rm2 = [rm1];
											var s24 = vnode6.data.style;
											if(!s24 || !s24.remove) {
												rm2[0]();
												null;
											} else {
												var name22;
												var elm21 = [vnode6.elm];
												var idx;
												var i17 = 0;
												var maxDur = 0;
												var compStyle;
												var style5 = s24.remove;
												var amount = [0];
												var applied = [];
												var _g38 = 0;
												var _g121 = Object.keys(style5);
												while(_g38 < _g121.length) {
													var name23 = _g121[_g38];
													++_g38;
													applied.push(name23);
													elm21[0].style[name23] = style5[name23];
												}
												compStyle = window.getComputedStyle(elm21[0]);
												var props4 = compStyle["transition-property"].split(", ");
												var i18;
												i18 = 0;
												if(i18 < props4.length) do if(HxOverrides.indexOf(applied,props4[i18],0) != -1) amount[0]++; while((function($this) {
													var $r;
													++i18;
													$r = i18 < props4.length;
													return $r;
												}(this)));
												elm21[0].addEventListener("transitionend",(function(amount,elm21,rm2) {
													return function(ev) {
														if(ev.target == elm21[0]) --amount[0];
														if(amount[0] == 0) rm2[0]();
													};
												})(amount,elm21,rm2));
											}
											if((function($this) {
												var $r;
												var s25 = i15 = ch1.data;
												$r = s25 != undefined;
												return $r;
											}(this)) && (function($this) {
												var $r;
												var s26 = i15 = i15.hook;
												$r = s26 != undefined;
												return $r;
											}(this)) && (function($this) {
												var $r;
												var s27 = i15 = i15.remove;
												$r = s27 != undefined;
												return $r;
											}(this))) i15(ch1,rm); else rm();
										} else elm5.removeChild(ch1.elm);
									}
								} while((function($this) {
									var $r;
									++startIdx1;
									$r = startIdx1 <= oldEndIdx;
									return $r;
								}(this)));
							}
						}
					} else if(ch != undefined) {
						var vnodes2 = ch;
						var startIdx2 = 0;
						var endIdx = ch.length - 1;
						var i19;
						i19 = 0;
						if(startIdx2 <= endIdx) do elm5.insertBefore((function($this) {
							var $r;
							var vnode7 = vnodes2[startIdx2];
							var i20;
							var data4 = vnode7.data;
							if(data4 != undefined) {
								if((function($this) {
									var $r;
									var s28 = i20 = data4.hook;
									$r = s28 != undefined;
									return $r;
								}($this)) && (function($this) {
									var $r;
									var s29 = i20 = i20.init;
									$r = s29 != undefined;
									return $r;
								}($this))) i20(vnode7);
								if((function($this) {
									var $r;
									var s30 = i20 = data4.vnode;
									$r = s30 != undefined;
									return $r;
								}($this))) vnode7 = i20;
							}
							var elm22;
							var children4 = vnode7.children;
							var sel3 = vnode7.sel;
							if(sel3 != undefined) {
								var hashIdx3 = sel3.indexOf("#",0);
								var dotIdx3 = sel3.indexOf(".",hashIdx3);
								var hash3 = hashIdx3 > 0?hashIdx3:sel3.length;
								var dot3 = dotIdx3 > 0?dotIdx3:sel3.length;
								var tag3 = hashIdx3 != -1 || dotIdx3 != -1?sel3.slice(0,Math.min(hash3,dot3)):sel3;
								elm22 = vnode7.elm = data4 != undefined && (function($this) {
									var $r;
									var s31 = i20 = data4.ns;
									$r = s31 != undefined;
									return $r;
								}($this))?document.createElementNS(i20,tag3):document.createElement(tag3);
								if(hash3 < dot3) elm22.id = sel3.slice(hash3 + 1,dot3);
								if(dotIdx3 > 0) {
									elm.className = sel.slice(dot+1).replace(Main.rg, " ");;
								}
								if(Array.isArray(children4)) {
									i20 = 0;
									if(i20 < children4.length) do elm22.appendChild(Main.createElm(children4[i20],insertedVnodeQueue)); while((function($this) {
										var $r;
										++i20;
										$r = i20 < children4.length;
										return $r;
									}($this)));
								} else if(typeof vnode7.text == "string" || typeof vnode7.text == "number") elm22.appendChild(document.createTextNode(vnode7.text));
								var oldVnode5 = Main.emptyNode;
								var key22;
								var cur16;
								var old8;
								var elm23 = vnode7.elm;
								var oldAttrs4 = oldVnode5.data.attrs == null?{ }:oldVnode5.data.attrs;
								var attrs4 = vnode7.data.attrs == null?{ }:vnode7.data.attrs;
								var _g39 = 0;
								var _g122 = Object.keys(attrs4);
								while(_g39 < _g122.length) {
									var key23 = _g122[_g39];
									++_g39;
									cur16 = attrs4[key23];
									old8 = oldAttrs4[key23];
									if(old8 != cur16) {
										if(!cur16 && Attributes.booleanAttrsDict[key23]) elm23.removeAttribute(key23); else elm23.setAttribute(key23,cur16);
									}
								}
								var _g40 = 0;
								var _g123 = Object.keys(oldAttrs4);
								while(_g40 < _g123.length) {
									var key24 = _g123[_g40];
									++_g40;
									if(!Object.prototype.hasOwnProperty.call(attrs4,key24)) elm23.removeAttribute(key24);
								}
								var key25;
								var cur17;
								var old9;
								var elm24 = vnode7.elm;
								var oldProps4 = oldVnode5.data.props == null?{ }:oldVnode5.data.props;
								var props5 = vnode7.data.props == null?{ }:vnode7.data.props;
								var _g41 = 0;
								var _g124 = Object.keys(props5);
								while(_g41 < _g124.length) {
									var key26 = _g124[_g41];
									++_g41;
									cur17 = props5[key26];
									old9 = oldProps4[key26];
									if(old9 != cur17) {
										var value8 = cur17;
										elm24[key26] = value8;
									}
								}
								var cur18;
								var name24;
								var elm25 = vnode7.elm;
								var oldClass4 = oldVnode5.data.classes == null?{ }:oldVnode5.data.classes;
								var klass4 = vnode7.data.classes == null?{ }:vnode7.data.classes;
								var _g42 = 0;
								var _g125 = Object.keys(klass4);
								while(_g42 < _g125.length) {
									var name25 = _g125[_g42];
									++_g42;
									cur18 = klass4[name25];
									if(cur18 != oldClass4[name25]) {
										if(cur18 == "add") elm25.classList.add(name25); else if(cur18 == "remove") elm25.classList.remove(name25);
									}
								}
								var cur19;
								var name26;
								var elm26 = vnode7.elm;
								var oldStyle4 = oldVnode5.data.style == null?{ }:oldVnode5.data.style;
								var style6 = vnode7.data.style == null?{ }:vnode7.data.style;
								var oldHasDel4 = Object.prototype.hasOwnProperty.call(oldStyle4,"delayed");
								var _g43 = 0;
								var _g126 = Object.keys(style6);
								while(_g43 < _g126.length) {
									var name27 = _g126[_g43];
									++_g43;
									cur19 = style6[name27];
									if(name27 == "delayed") {
										var delayed4 = style6.delayed;
										var oldDelayed4 = oldStyle4.delayed;
										var _g211 = 0;
										var _g310 = Object.keys(delayed4);
										while(_g211 < _g310.length) {
											var name28 = _g310[_g211];
											++_g211;
											cur19 = delayed4[name28];
											if(!oldHasDel4 || cur19 != oldDelayed4[name28]) {
												var obj4 = [elm26.style];
												var prop4 = [name28];
												var val4 = [cur19];
												var fn4 = [(function(val4,prop4,obj4) {
													return function(i21) {
														var value9 = val4[0];
														obj4[0][prop4[0]] = value9;
													};
												})(val4,prop4,obj4)];
												window.requestAnimationFrame((function(fn4) {
													return function(i22) {
														window.requestAnimationFrame(fn4[0]);
													};
												})(fn4));
											}
										}
									} else if(name27 != "remove" && cur19 != oldStyle4[name27]) elm26.style[name27] = cur19;
								}
								if(vnode7.data != null) {
									i20 = vnode7.data.hook;
									if(i20 != undefined) {
										if(i20.create) i20.create(Main.emptyNode,vnode7);
										if(i20.insert) insertedVnodeQueue.push(vnode7);
									}
								}
							} else elm22 = vnode7.elm = document.createTextNode(vnode7.text);
							$r = vnode7.elm;
							return $r;
						}(this)),null); while((function($this) {
							var $r;
							++startIdx2;
							$r = startIdx2 <= endIdx;
							return $r;
						}(this)));
					} else if(oldCh != undefined) {
						var vnodes3 = oldCh;
						var startIdx3 = 0;
						var endIdx1 = oldCh.length - 1;
						var y1;
						y1 = 0;
						if(startIdx3 <= endIdx1) do {
							var i23;
							var listeners1;
							var rm3 = null;
							var ch2 = vnodes3[startIdx3];
							if(ch2 != undefined) {
								if(ch2.sel != undefined) {
									var vnode8 = ch2;
									var i24 = vnode8.data;
									var j1;
									if(i24 != undefined) {
										if((function($this) {
											var $r;
											var s32 = i24 = i24.hook;
											$r = s32 != undefined;
											return $r;
										}(this)) && (function($this) {
											var $r;
											var s33 = i24 = i24.destroy;
											$r = s33 != undefined;
											return $r;
										}(this))) i24(vnode8);
										var style7 = null;
										var name29;
										var elm27 = vnode8.elm;
										var s34 = vnode8.data.style;
										if(s34 == null) null; else {
											style7 = s34.destroy;
											if(style7 == null) null; else {
												var _g44 = 0;
												var _g127 = Object.keys(style7);
												while(_g44 < _g127.length) {
													var name30 = _g127[_g44];
													++_g44;
													elm27.style[name30] = style7[name30];
												}
											}
										}
										if((function($this) {
											var $r;
											var s35 = i24 = vnode8.children;
											$r = s35 != undefined;
											return $r;
										}(this))) {
											j1 = 0;
											if(j1 < vnode8.children.length) do Main.invokeDestroyHook(vnode8.children[j1]); while((function($this) {
												var $r;
												++j1;
												$r = j1 < vnode8.children.length;
												return $r;
											}(this)));
										}
									}
									var vnode9 = ch2;
									var rm4 = rm3;
									var rm5 = [rm4];
									var s36 = vnode9.data.style;
									if(!s36 || !s36.remove) {
										rm5[0]();
										null;
									} else {
										var name31;
										var elm28 = [vnode9.elm];
										var idx1;
										var i25 = 0;
										var maxDur1 = 0;
										var compStyle1;
										var style8 = s36.remove;
										var amount1 = [0];
										var applied1 = [];
										var _g45 = 0;
										var _g128 = Object.keys(style8);
										while(_g45 < _g128.length) {
											var name32 = _g128[_g45];
											++_g45;
											applied1.push(name32);
											elm28[0].style[name32] = style8[name32];
										}
										compStyle1 = window.getComputedStyle(elm28[0]);
										var props6 = compStyle1["transition-property"].split(", ");
										var i26;
										i26 = 0;
										if(i26 < props6.length) do if(HxOverrides.indexOf(applied1,props6[i26],0) != -1) amount1[0]++; while((function($this) {
											var $r;
											++i26;
											$r = i26 < props6.length;
											return $r;
										}(this)));
										elm28[0].addEventListener("transitionend",(function(amount1,elm28,rm5) {
											return function(ev1) {
												if(ev1.target == elm28[0]) --amount1[0];
												if(amount1[0] == 0) rm5[0]();
											};
										})(amount1,elm28,rm5));
									}
									if((function($this) {
										var $r;
										var s37 = i23 = ch2.data;
										$r = s37 != undefined;
										return $r;
									}(this)) && (function($this) {
										var $r;
										var s38 = i23 = i23.hook;
										$r = s38 != undefined;
										return $r;
									}(this)) && (function($this) {
										var $r;
										var s39 = i23 = i23.remove;
										$r = s39 != undefined;
										return $r;
									}(this))) i23(ch2,rm3); else rm3();
								} else elm5.removeChild(ch2.elm);
							}
						} while((function($this) {
							var $r;
							++startIdx3;
							$r = startIdx3 <= endIdx1;
							return $r;
						}(this)));
					}
				} else if(oldVnode2.text != vnode2.text) elm5.textContent = vnode2.text;
				if(hook != undefined && (function($this) {
					var $r;
					var s40 = i4 = hook.postpatch;
					$r = s40 != undefined;
					return $r;
				}(this))) i4(oldVnode2,vnode2);
			}
		}
	} else {
		var oldVnode6 = oldVnode;
		var vnode10 = vnode;
		var i27;
		var hook1;
		if((function($this) {
			var $r;
			var s41 = i27 = vnode10.data;
			$r = s41 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s42 = hook1 = i27.hook;
			$r = s42 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s43 = i27 = hook1.prepatch;
			$r = s43 != undefined;
			return $r;
		}(this))) i27(oldVnode6,vnode10);
		if((function($this) {
			var $r;
			var s44 = i27 = oldVnode6.data;
			$r = s44 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s45 = i27 = i27.vnode;
			$r = s45 != undefined;
			return $r;
		}(this))) oldVnode6 = i27;
		if((function($this) {
			var $r;
			var s46 = i27 = vnode10.data;
			$r = s46 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s47 = i27 = i27.vnode;
			$r = s47 != undefined;
			return $r;
		}(this))) vnode10 = i27;
		var elm29 = vnode10.elm = oldVnode6.elm;
		var oldCh1 = oldVnode6.children;
		var ch3 = vnode10.children;
		if(oldVnode6 == vnode10) null; else {
			if(vnode10.data != undefined) {
				var key27;
				var cur20;
				var old10;
				var elm30 = vnode10.elm;
				var oldAttrs5 = oldVnode6.data.attrs == null?{ }:oldVnode6.data.attrs;
				var attrs5 = vnode10.data.attrs == null?{ }:vnode10.data.attrs;
				var _g46 = 0;
				var _g129 = Object.keys(attrs5);
				while(_g46 < _g129.length) {
					var key28 = _g129[_g46];
					++_g46;
					cur20 = attrs5[key28];
					old10 = oldAttrs5[key28];
					if(old10 != cur20) {
						if(!cur20 && Attributes.booleanAttrsDict[key28]) elm30.removeAttribute(key28); else elm30.setAttribute(key28,cur20);
					}
				}
				var _g47 = 0;
				var _g130 = Object.keys(oldAttrs5);
				while(_g47 < _g130.length) {
					var key29 = _g130[_g47];
					++_g47;
					if(!Object.prototype.hasOwnProperty.call(attrs5,key29)) elm30.removeAttribute(key29);
				}
				var key30;
				var cur21;
				var old11;
				var elm31 = vnode10.elm;
				var oldProps5 = oldVnode6.data.props == null?{ }:oldVnode6.data.props;
				var props7 = vnode10.data.props == null?{ }:vnode10.data.props;
				var _g48 = 0;
				var _g131 = Object.keys(props7);
				while(_g48 < _g131.length) {
					var key31 = _g131[_g48];
					++_g48;
					cur21 = props7[key31];
					old11 = oldProps5[key31];
					if(old11 != cur21) {
						var value10 = cur21;
						elm31[key31] = value10;
					}
				}
				var cur22;
				var name33;
				var elm32 = vnode10.elm;
				var oldClass5 = oldVnode6.data.classes == null?{ }:oldVnode6.data.classes;
				var klass5 = vnode10.data.classes == null?{ }:vnode10.data.classes;
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
				var elm33 = vnode10.elm;
				var oldStyle5 = oldVnode6.data.style == null?{ }:oldVnode6.data.style;
				var style9 = vnode10.data.style == null?{ }:vnode10.data.style;
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
									return function(i28) {
										var value11 = val5[0];
										obj5[0][prop5[0]] = value11;
									};
								})(val5,prop5,obj5)];
								window.requestAnimationFrame((function(fn5) {
									return function(i29) {
										window.requestAnimationFrame(fn5[0]);
									};
								})(fn5));
							}
						}
					} else if(name36 != "remove" && cur23 != oldStyle5[name36]) elm33.style[name36] = cur23;
				}
				i27 = vnode10.data.hook;
				if(i27 != undefined && (function($this) {
					var $r;
					var s48 = i27 = i27.update;
					$r = s48 != undefined;
					return $r;
				}(this))) i27(oldVnode6,vnode10);
			}
			if(vnode10.text == undefined) {
				if(oldCh1 != undefined && ch3 != undefined) {
					if(oldCh1 != ch3) {
						var oldStartIdx1 = 0;
						var newStartIdx1 = 0;
						var oldEndIdx1 = oldCh1.length - 1;
						var oldStartVnode1 = oldCh1[0];
						var oldEndVnode1 = oldCh1[oldEndIdx1];
						var newEndIdx1 = ch3.length - 1;
						var newStartVnode1 = ch3[0];
						var newEndVnode1 = ch3[newEndIdx1];
						var oldKeyToIdx1 = null;
						var idxInOld1;
						var elmToMove1;
						var before1;
						while(oldStartIdx1 <= oldEndIdx1 && newStartIdx1 <= newEndIdx1) if(oldStartVnode1 == undefined) oldStartVnode1 = oldCh1[++oldStartIdx1]; else if(oldEndVnode1 == undefined) oldEndVnode1 = oldCh1[--oldEndIdx1]; else if(oldStartVnode1.key == newStartVnode1.key && oldStartVnode1.sel == newStartVnode1.sel) {
							Main.patchVnode(oldStartVnode1,newStartVnode1,insertedVnodeQueue);
							oldStartVnode1 = oldCh1[++oldStartIdx1];
							newStartVnode1 = ch3[++newStartIdx1];
						} else if(oldEndVnode1.key == newEndVnode1.key && oldEndVnode1.sel == newEndVnode1.sel) {
							Main.patchVnode(oldEndVnode1,newEndVnode1,insertedVnodeQueue);
							oldEndVnode1 = oldCh1[--oldEndIdx1];
							newEndVnode1 = ch3[--newEndIdx1];
						} else if(oldStartVnode1.key == newEndVnode1.key && oldStartVnode1.sel == newEndVnode1.sel) {
							Main.patchVnode(oldStartVnode1,newEndVnode1,insertedVnodeQueue);
							elm29.insertBefore(oldStartVnode1.elm,oldEndVnode1.elm.nextSibling);
							oldStartVnode1 = oldCh1[++oldStartIdx1];
							newEndVnode1 = ch3[--newEndIdx1];
						} else if(oldEndVnode1.key == newStartVnode1.key && oldEndVnode1.sel == newStartVnode1.sel) {
							Main.patchVnode(oldEndVnode1,newStartVnode1,insertedVnodeQueue);
							elm29.insertBefore(oldEndVnode1.elm,oldStartVnode1.elm);
							oldEndVnode1 = oldCh1[--oldEndIdx1];
							newStartVnode1 = ch3[++newStartIdx1];
						} else {
							if(oldKeyToIdx1 == undefined) oldKeyToIdx1 = (function($this) {
								var $r;
								var children5 = oldCh1;
								var i30;
								var map1 = { };
								var key32;
								{
									i30 = oldStartIdx1;
									if(i30 <= oldEndIdx1) do {
										key32 = children5[i30].key;
										if(key32 != undefined) map1[key32] = i30;
									} while((function($this) {
										var $r;
										++i30;
										$r = i30 <= oldEndIdx1;
										return $r;
									}($this)));
								}
								$r = map1;
								return $r;
							}(this));
							idxInOld1 = oldKeyToIdx1[newStartVnode1.key];
							if(idxInOld1 == undefined) {
								elm29.insertBefore((function($this) {
									var $r;
									var vnode11 = newStartVnode1;
									var i31;
									var data5 = vnode11.data;
									if(data5 != undefined) {
										if((function($this) {
											var $r;
											var s49 = i31 = data5.hook;
											$r = s49 != undefined;
											return $r;
										}($this)) && (function($this) {
											var $r;
											var s50 = i31 = i31.init;
											$r = s50 != undefined;
											return $r;
										}($this))) i31(vnode11);
										if((function($this) {
											var $r;
											var s51 = i31 = data5.vnode;
											$r = s51 != undefined;
											return $r;
										}($this))) vnode11 = i31;
									}
									var elm34;
									var children6 = vnode11.children;
									var sel4 = vnode11.sel;
									if(sel4 != undefined) {
										var hashIdx4 = sel4.indexOf("#",0);
										var dotIdx4 = sel4.indexOf(".",hashIdx4);
										var hash4 = hashIdx4 > 0?hashIdx4:sel4.length;
										var dot4 = dotIdx4 > 0?dotIdx4:sel4.length;
										var tag4 = hashIdx4 != -1 || dotIdx4 != -1?sel4.slice(0,Math.min(hash4,dot4)):sel4;
										elm34 = vnode11.elm = data5 != undefined && (function($this) {
											var $r;
											var s52 = i31 = data5.ns;
											$r = s52 != undefined;
											return $r;
										}($this))?document.createElementNS(i31,tag4):document.createElement(tag4);
										if(hash4 < dot4) elm34.id = sel4.slice(hash4 + 1,dot4);
										if(dotIdx4 > 0) {
											elm.className = sel.slice(dot+1).replace(Main.rg, " ");;
										}
										if(Array.isArray(children6)) {
											i31 = 0;
											if(i31 < children6.length) do elm34.appendChild(Main.createElm(children6[i31],insertedVnodeQueue)); while((function($this) {
												var $r;
												++i31;
												$r = i31 < children6.length;
												return $r;
											}($this)));
										} else if(typeof vnode11.text == "string" || typeof vnode11.text == "number") elm34.appendChild(document.createTextNode(vnode11.text));
										var oldVnode7 = Main.emptyNode;
										var key33;
										var cur24;
										var old12;
										var elm35 = vnode11.elm;
										var oldAttrs6 = oldVnode7.data.attrs == null?{ }:oldVnode7.data.attrs;
										var attrs6 = vnode11.data.attrs == null?{ }:vnode11.data.attrs;
										var _g51 = 0;
										var _g134 = Object.keys(attrs6);
										while(_g51 < _g134.length) {
											var key34 = _g134[_g51];
											++_g51;
											cur24 = attrs6[key34];
											old12 = oldAttrs6[key34];
											if(old12 != cur24) {
												if(!cur24 && Attributes.booleanAttrsDict[key34]) elm35.removeAttribute(key34); else elm35.setAttribute(key34,cur24);
											}
										}
										var _g52 = 0;
										var _g135 = Object.keys(oldAttrs6);
										while(_g52 < _g135.length) {
											var key35 = _g135[_g52];
											++_g52;
											if(!Object.prototype.hasOwnProperty.call(attrs6,key35)) elm35.removeAttribute(key35);
										}
										var key36;
										var cur25;
										var old13;
										var elm36 = vnode11.elm;
										var oldProps6 = oldVnode7.data.props == null?{ }:oldVnode7.data.props;
										var props8 = vnode11.data.props == null?{ }:vnode11.data.props;
										var _g53 = 0;
										var _g136 = Object.keys(props8);
										while(_g53 < _g136.length) {
											var key37 = _g136[_g53];
											++_g53;
											cur25 = props8[key37];
											old13 = oldProps6[key37];
											if(old13 != cur25) {
												var value12 = cur25;
												elm36[key37] = value12;
											}
										}
										var cur26;
										var name38;
										var elm37 = vnode11.elm;
										var oldClass6 = oldVnode7.data.classes == null?{ }:oldVnode7.data.classes;
										var klass6 = vnode11.data.classes == null?{ }:vnode11.data.classes;
										var _g54 = 0;
										var _g137 = Object.keys(klass6);
										while(_g54 < _g137.length) {
											var name39 = _g137[_g54];
											++_g54;
											cur26 = klass6[name39];
											if(cur26 != oldClass6[name39]) {
												if(cur26 == "add") elm37.classList.add(name39); else if(cur26 == "remove") elm37.classList.remove(name39);
											}
										}
										var cur27;
										var name40;
										var elm38 = vnode11.elm;
										var oldStyle6 = oldVnode7.data.style == null?{ }:oldVnode7.data.style;
										var style10 = vnode11.data.style == null?{ }:vnode11.data.style;
										var oldHasDel6 = Object.prototype.hasOwnProperty.call(oldStyle6,"delayed");
										var _g55 = 0;
										var _g138 = Object.keys(style10);
										while(_g55 < _g138.length) {
											var name41 = _g138[_g55];
											++_g55;
											cur27 = style10[name41];
											if(name41 == "delayed") {
												var delayed6 = style10.delayed;
												var oldDelayed6 = oldStyle6.delayed;
												var _g213 = 0;
												var _g312 = Object.keys(delayed6);
												while(_g213 < _g312.length) {
													var name42 = _g312[_g213];
													++_g213;
													cur27 = delayed6[name42];
													if(!oldHasDel6 || cur27 != oldDelayed6[name42]) {
														var obj6 = [elm38.style];
														var prop6 = [name42];
														var val6 = [cur27];
														var fn6 = [(function(val6,prop6,obj6) {
															return function(i32) {
																var value13 = val6[0];
																obj6[0][prop6[0]] = value13;
															};
														})(val6,prop6,obj6)];
														window.requestAnimationFrame((function(fn6) {
															return function(i33) {
																window.requestAnimationFrame(fn6[0]);
															};
														})(fn6));
													}
												}
											} else if(name41 != "remove" && cur27 != oldStyle6[name41]) elm38.style[name41] = cur27;
										}
										if(vnode11.data != null) {
											i31 = vnode11.data.hook;
											if(i31 != undefined) {
												if(i31.create) i31.create(Main.emptyNode,vnode11);
												if(i31.insert) insertedVnodeQueue.push(vnode11);
											}
										}
									} else elm34 = vnode11.elm = document.createTextNode(vnode11.text);
									$r = vnode11.elm;
									return $r;
								}(this)),oldStartVnode1.elm);
								newStartVnode1 = ch3[++newStartIdx1];
							} else {
								elmToMove1 = oldCh1[idxInOld1];
								Main.patchVnode(elmToMove1,newStartVnode1,insertedVnodeQueue);
								oldCh1[idxInOld1] = null;
								elm29.insertBefore(elmToMove1.elm,oldStartVnode1.elm);
								newStartVnode1 = ch3[++newStartIdx1];
							}
						}
						if(oldStartIdx1 > oldEndIdx1) {
							before1 = ch3[newEndIdx1 + 1] == undefined?null:ch3[newEndIdx1 + 1].elm;
							var vnodes4 = ch3;
							var startIdx4 = newStartIdx1;
							var i34;
							i34 = 0;
							if(startIdx4 <= newEndIdx1) do elm29.insertBefore((function($this) {
								var $r;
								var vnode12 = vnodes4[startIdx4];
								var i35;
								var data6 = vnode12.data;
								if(data6 != undefined) {
									if((function($this) {
										var $r;
										var s53 = i35 = data6.hook;
										$r = s53 != undefined;
										return $r;
									}($this)) && (function($this) {
										var $r;
										var s54 = i35 = i35.init;
										$r = s54 != undefined;
										return $r;
									}($this))) i35(vnode12);
									if((function($this) {
										var $r;
										var s55 = i35 = data6.vnode;
										$r = s55 != undefined;
										return $r;
									}($this))) vnode12 = i35;
								}
								var elm39;
								var children7 = vnode12.children;
								var sel5 = vnode12.sel;
								if(sel5 != undefined) {
									var hashIdx5 = sel5.indexOf("#",0);
									var dotIdx5 = sel5.indexOf(".",hashIdx5);
									var hash5 = hashIdx5 > 0?hashIdx5:sel5.length;
									var dot5 = dotIdx5 > 0?dotIdx5:sel5.length;
									var tag5 = hashIdx5 != -1 || dotIdx5 != -1?sel5.slice(0,Math.min(hash5,dot5)):sel5;
									elm39 = vnode12.elm = data6 != undefined && (function($this) {
										var $r;
										var s56 = i35 = data6.ns;
										$r = s56 != undefined;
										return $r;
									}($this))?document.createElementNS(i35,tag5):document.createElement(tag5);
									if(hash5 < dot5) elm39.id = sel5.slice(hash5 + 1,dot5);
									if(dotIdx5 > 0) {
										elm.className = sel.slice(dot+1).replace(Main.rg, " ");;
									}
									if(Array.isArray(children7)) {
										i35 = 0;
										if(i35 < children7.length) do elm39.appendChild(Main.createElm(children7[i35],insertedVnodeQueue)); while((function($this) {
											var $r;
											++i35;
											$r = i35 < children7.length;
											return $r;
										}($this)));
									} else if(typeof vnode12.text == "string" || typeof vnode12.text == "number") elm39.appendChild(document.createTextNode(vnode12.text));
									var oldVnode8 = Main.emptyNode;
									var key38;
									var cur28;
									var old14;
									var elm40 = vnode12.elm;
									var oldAttrs7 = oldVnode8.data.attrs == null?{ }:oldVnode8.data.attrs;
									var attrs7 = vnode12.data.attrs == null?{ }:vnode12.data.attrs;
									var _g56 = 0;
									var _g139 = Object.keys(attrs7);
									while(_g56 < _g139.length) {
										var key39 = _g139[_g56];
										++_g56;
										cur28 = attrs7[key39];
										old14 = oldAttrs7[key39];
										if(old14 != cur28) {
											if(!cur28 && Attributes.booleanAttrsDict[key39]) elm40.removeAttribute(key39); else elm40.setAttribute(key39,cur28);
										}
									}
									var _g57 = 0;
									var _g140 = Object.keys(oldAttrs7);
									while(_g57 < _g140.length) {
										var key40 = _g140[_g57];
										++_g57;
										if(!Object.prototype.hasOwnProperty.call(attrs7,key40)) elm40.removeAttribute(key40);
									}
									var key41;
									var cur29;
									var old15;
									var elm41 = vnode12.elm;
									var oldProps7 = oldVnode8.data.props == null?{ }:oldVnode8.data.props;
									var props9 = vnode12.data.props == null?{ }:vnode12.data.props;
									var _g58 = 0;
									var _g141 = Object.keys(props9);
									while(_g58 < _g141.length) {
										var key42 = _g141[_g58];
										++_g58;
										cur29 = props9[key42];
										old15 = oldProps7[key42];
										if(old15 != cur29) {
											var value14 = cur29;
											elm41[key42] = value14;
										}
									}
									var cur30;
									var name43;
									var elm42 = vnode12.elm;
									var oldClass7 = oldVnode8.data.classes == null?{ }:oldVnode8.data.classes;
									var klass7 = vnode12.data.classes == null?{ }:vnode12.data.classes;
									var _g59 = 0;
									var _g142 = Object.keys(klass7);
									while(_g59 < _g142.length) {
										var name44 = _g142[_g59];
										++_g59;
										cur30 = klass7[name44];
										if(cur30 != oldClass7[name44]) {
											if(cur30 == "add") elm42.classList.add(name44); else if(cur30 == "remove") elm42.classList.remove(name44);
										}
									}
									var cur31;
									var name45;
									var elm43 = vnode12.elm;
									var oldStyle7 = oldVnode8.data.style == null?{ }:oldVnode8.data.style;
									var style11 = vnode12.data.style == null?{ }:vnode12.data.style;
									var oldHasDel7 = Object.prototype.hasOwnProperty.call(oldStyle7,"delayed");
									var _g60 = 0;
									var _g143 = Object.keys(style11);
									while(_g60 < _g143.length) {
										var name46 = _g143[_g60];
										++_g60;
										cur31 = style11[name46];
										if(name46 == "delayed") {
											var delayed7 = style11.delayed;
											var oldDelayed7 = oldStyle7.delayed;
											var _g214 = 0;
											var _g313 = Object.keys(delayed7);
											while(_g214 < _g313.length) {
												var name47 = _g313[_g214];
												++_g214;
												cur31 = delayed7[name47];
												if(!oldHasDel7 || cur31 != oldDelayed7[name47]) {
													var obj7 = [elm43.style];
													var prop7 = [name47];
													var val7 = [cur31];
													var fn7 = [(function(val7,prop7,obj7) {
														return function(i36) {
															var value15 = val7[0];
															obj7[0][prop7[0]] = value15;
														};
													})(val7,prop7,obj7)];
													window.requestAnimationFrame((function(fn7) {
														return function(i37) {
															window.requestAnimationFrame(fn7[0]);
														};
													})(fn7));
												}
											}
										} else if(name46 != "remove" && cur31 != oldStyle7[name46]) elm43.style[name46] = cur31;
									}
									if(vnode12.data != null) {
										i35 = vnode12.data.hook;
										if(i35 != undefined) {
											if(i35.create) i35.create(Main.emptyNode,vnode12);
											if(i35.insert) insertedVnodeQueue.push(vnode12);
										}
									}
								} else elm39 = vnode12.elm = document.createTextNode(vnode12.text);
								$r = vnode12.elm;
								return $r;
							}(this)),before1); while((function($this) {
								var $r;
								++startIdx4;
								$r = startIdx4 <= newEndIdx1;
								return $r;
							}(this)));
						} else if(newStartIdx1 > newEndIdx1) {
							var vnodes5 = oldCh1;
							var startIdx5 = oldStartIdx1;
							var y2;
							y2 = 0;
							if(startIdx5 <= oldEndIdx1) do {
								var i38;
								var listeners2;
								var rm6 = null;
								var ch4 = vnodes5[startIdx5];
								if(ch4 != undefined) {
									if(ch4.sel != undefined) {
										var vnode13 = ch4;
										var i39 = vnode13.data;
										var j2;
										if(i39 != undefined) {
											if((function($this) {
												var $r;
												var s57 = i39 = i39.hook;
												$r = s57 != undefined;
												return $r;
											}(this)) && (function($this) {
												var $r;
												var s58 = i39 = i39.destroy;
												$r = s58 != undefined;
												return $r;
											}(this))) i39(vnode13);
											var style12 = null;
											var name48;
											var elm44 = vnode13.elm;
											var s59 = vnode13.data.style;
											if(s59 == null) null; else {
												style12 = s59.destroy;
												if(style12 == null) null; else {
													var _g61 = 0;
													var _g144 = Object.keys(style12);
													while(_g61 < _g144.length) {
														var name49 = _g144[_g61];
														++_g61;
														elm44.style[name49] = style12[name49];
													}
												}
											}
											if((function($this) {
												var $r;
												var s60 = i39 = vnode13.children;
												$r = s60 != undefined;
												return $r;
											}(this))) {
												j2 = 0;
												if(j2 < vnode13.children.length) do Main.invokeDestroyHook(vnode13.children[j2]); while((function($this) {
													var $r;
													++j2;
													$r = j2 < vnode13.children.length;
													return $r;
												}(this)));
											}
										}
										var vnode14 = ch4;
										var rm7 = rm6;
										var rm8 = [rm7];
										var s61 = vnode14.data.style;
										if(!s61 || !s61.remove) {
											rm8[0]();
											null;
										} else {
											var name50;
											var elm45 = [vnode14.elm];
											var idx2;
											var i40 = 0;
											var maxDur2 = 0;
											var compStyle2;
											var style13 = s61.remove;
											var amount2 = [0];
											var applied2 = [];
											var _g62 = 0;
											var _g145 = Object.keys(style13);
											while(_g62 < _g145.length) {
												var name51 = _g145[_g62];
												++_g62;
												applied2.push(name51);
												elm45[0].style[name51] = style13[name51];
											}
											compStyle2 = window.getComputedStyle(elm45[0]);
											var props10 = compStyle2["transition-property"].split(", ");
											var i41;
											i41 = 0;
											if(i41 < props10.length) do if(HxOverrides.indexOf(applied2,props10[i41],0) != -1) amount2[0]++; while((function($this) {
												var $r;
												++i41;
												$r = i41 < props10.length;
												return $r;
											}(this)));
											elm45[0].addEventListener("transitionend",(function(amount2,elm45,rm8) {
												return function(ev2) {
													if(ev2.target == elm45[0]) --amount2[0];
													if(amount2[0] == 0) rm8[0]();
												};
											})(amount2,elm45,rm8));
										}
										if((function($this) {
											var $r;
											var s62 = i38 = ch4.data;
											$r = s62 != undefined;
											return $r;
										}(this)) && (function($this) {
											var $r;
											var s63 = i38 = i38.hook;
											$r = s63 != undefined;
											return $r;
										}(this)) && (function($this) {
											var $r;
											var s64 = i38 = i38.remove;
											$r = s64 != undefined;
											return $r;
										}(this))) i38(ch4,rm6); else rm6();
									} else elm29.removeChild(ch4.elm);
								}
							} while((function($this) {
								var $r;
								++startIdx5;
								$r = startIdx5 <= oldEndIdx1;
								return $r;
							}(this)));
						}
					}
				} else if(ch3 != undefined) {
					var vnodes6 = ch3;
					var startIdx6 = 0;
					var endIdx2 = ch3.length - 1;
					var i42;
					i42 = 0;
					if(startIdx6 <= endIdx2) do elm29.insertBefore((function($this) {
						var $r;
						var vnode15 = vnodes6[startIdx6];
						var i43;
						var data7 = vnode15.data;
						if(data7 != undefined) {
							if((function($this) {
								var $r;
								var s65 = i43 = data7.hook;
								$r = s65 != undefined;
								return $r;
							}($this)) && (function($this) {
								var $r;
								var s66 = i43 = i43.init;
								$r = s66 != undefined;
								return $r;
							}($this))) i43(vnode15);
							if((function($this) {
								var $r;
								var s67 = i43 = data7.vnode;
								$r = s67 != undefined;
								return $r;
							}($this))) vnode15 = i43;
						}
						var elm46;
						var children8 = vnode15.children;
						var sel6 = vnode15.sel;
						if(sel6 != undefined) {
							var hashIdx6 = sel6.indexOf("#",0);
							var dotIdx6 = sel6.indexOf(".",hashIdx6);
							var hash6 = hashIdx6 > 0?hashIdx6:sel6.length;
							var dot6 = dotIdx6 > 0?dotIdx6:sel6.length;
							var tag6 = hashIdx6 != -1 || dotIdx6 != -1?sel6.slice(0,Math.min(hash6,dot6)):sel6;
							elm46 = vnode15.elm = data7 != undefined && (function($this) {
								var $r;
								var s68 = i43 = data7.ns;
								$r = s68 != undefined;
								return $r;
							}($this))?document.createElementNS(i43,tag6):document.createElement(tag6);
							if(hash6 < dot6) elm46.id = sel6.slice(hash6 + 1,dot6);
							if(dotIdx6 > 0) {
								elm.className = sel.slice(dot+1).replace(Main.rg, " ");;
							}
							if(Array.isArray(children8)) {
								i43 = 0;
								if(i43 < children8.length) do elm46.appendChild(Main.createElm(children8[i43],insertedVnodeQueue)); while((function($this) {
									var $r;
									++i43;
									$r = i43 < children8.length;
									return $r;
								}($this)));
							} else if(typeof vnode15.text == "string" || typeof vnode15.text == "number") elm46.appendChild(document.createTextNode(vnode15.text));
							var oldVnode9 = Main.emptyNode;
							var key43;
							var cur32;
							var old16;
							var elm47 = vnode15.elm;
							var oldAttrs8 = oldVnode9.data.attrs == null?{ }:oldVnode9.data.attrs;
							var attrs8 = vnode15.data.attrs == null?{ }:vnode15.data.attrs;
							var _g63 = 0;
							var _g146 = Object.keys(attrs8);
							while(_g63 < _g146.length) {
								var key44 = _g146[_g63];
								++_g63;
								cur32 = attrs8[key44];
								old16 = oldAttrs8[key44];
								if(old16 != cur32) {
									if(!cur32 && Attributes.booleanAttrsDict[key44]) elm47.removeAttribute(key44); else elm47.setAttribute(key44,cur32);
								}
							}
							var _g64 = 0;
							var _g147 = Object.keys(oldAttrs8);
							while(_g64 < _g147.length) {
								var key45 = _g147[_g64];
								++_g64;
								if(!Object.prototype.hasOwnProperty.call(attrs8,key45)) elm47.removeAttribute(key45);
							}
							var key46;
							var cur33;
							var old17;
							var elm48 = vnode15.elm;
							var oldProps8 = oldVnode9.data.props == null?{ }:oldVnode9.data.props;
							var props11 = vnode15.data.props == null?{ }:vnode15.data.props;
							var _g65 = 0;
							var _g148 = Object.keys(props11);
							while(_g65 < _g148.length) {
								var key47 = _g148[_g65];
								++_g65;
								cur33 = props11[key47];
								old17 = oldProps8[key47];
								if(old17 != cur33) {
									var value16 = cur33;
									elm48[key47] = value16;
								}
							}
							var cur34;
							var name52;
							var elm49 = vnode15.elm;
							var oldClass8 = oldVnode9.data.classes == null?{ }:oldVnode9.data.classes;
							var klass8 = vnode15.data.classes == null?{ }:vnode15.data.classes;
							var _g66 = 0;
							var _g149 = Object.keys(klass8);
							while(_g66 < _g149.length) {
								var name53 = _g149[_g66];
								++_g66;
								cur34 = klass8[name53];
								if(cur34 != oldClass8[name53]) {
									if(cur34 == "add") elm49.classList.add(name53); else if(cur34 == "remove") elm49.classList.remove(name53);
								}
							}
							var cur35;
							var name54;
							var elm50 = vnode15.elm;
							var oldStyle8 = oldVnode9.data.style == null?{ }:oldVnode9.data.style;
							var style14 = vnode15.data.style == null?{ }:vnode15.data.style;
							var oldHasDel8 = Object.prototype.hasOwnProperty.call(oldStyle8,"delayed");
							var _g67 = 0;
							var _g150 = Object.keys(style14);
							while(_g67 < _g150.length) {
								var name55 = _g150[_g67];
								++_g67;
								cur35 = style14[name55];
								if(name55 == "delayed") {
									var delayed8 = style14.delayed;
									var oldDelayed8 = oldStyle8.delayed;
									var _g215 = 0;
									var _g314 = Object.keys(delayed8);
									while(_g215 < _g314.length) {
										var name56 = _g314[_g215];
										++_g215;
										cur35 = delayed8[name56];
										if(!oldHasDel8 || cur35 != oldDelayed8[name56]) {
											var obj8 = [elm50.style];
											var prop8 = [name56];
											var val8 = [cur35];
											var fn8 = [(function(val8,prop8,obj8) {
												return function(i44) {
													var value17 = val8[0];
													obj8[0][prop8[0]] = value17;
												};
											})(val8,prop8,obj8)];
											window.requestAnimationFrame((function(fn8) {
												return function(i45) {
													window.requestAnimationFrame(fn8[0]);
												};
											})(fn8));
										}
									}
								} else if(name55 != "remove" && cur35 != oldStyle8[name55]) elm50.style[name55] = cur35;
							}
							if(vnode15.data != null) {
								i43 = vnode15.data.hook;
								if(i43 != undefined) {
									if(i43.create) i43.create(Main.emptyNode,vnode15);
									if(i43.insert) insertedVnodeQueue.push(vnode15);
								}
							}
						} else elm46 = vnode15.elm = document.createTextNode(vnode15.text);
						$r = vnode15.elm;
						return $r;
					}(this)),null); while((function($this) {
						var $r;
						++startIdx6;
						$r = startIdx6 <= endIdx2;
						return $r;
					}(this)));
				} else if(oldCh1 != undefined) {
					var vnodes7 = oldCh1;
					var startIdx7 = 0;
					var endIdx3 = oldCh1.length - 1;
					var y3;
					y3 = 0;
					if(startIdx7 <= endIdx3) do {
						var i46;
						var listeners3;
						var rm9 = null;
						var ch5 = vnodes7[startIdx7];
						if(ch5 != undefined) {
							if(ch5.sel != undefined) {
								var vnode16 = ch5;
								var i47 = vnode16.data;
								var j3;
								if(i47 != undefined) {
									if((function($this) {
										var $r;
										var s69 = i47 = i47.hook;
										$r = s69 != undefined;
										return $r;
									}(this)) && (function($this) {
										var $r;
										var s70 = i47 = i47.destroy;
										$r = s70 != undefined;
										return $r;
									}(this))) i47(vnode16);
									var style15 = null;
									var name57;
									var elm51 = vnode16.elm;
									var s71 = vnode16.data.style;
									if(s71 == null) null; else {
										style15 = s71.destroy;
										if(style15 == null) null; else {
											var _g68 = 0;
											var _g151 = Object.keys(style15);
											while(_g68 < _g151.length) {
												var name58 = _g151[_g68];
												++_g68;
												elm51.style[name58] = style15[name58];
											}
										}
									}
									if((function($this) {
										var $r;
										var s72 = i47 = vnode16.children;
										$r = s72 != undefined;
										return $r;
									}(this))) {
										j3 = 0;
										if(j3 < vnode16.children.length) do Main.invokeDestroyHook(vnode16.children[j3]); while((function($this) {
											var $r;
											++j3;
											$r = j3 < vnode16.children.length;
											return $r;
										}(this)));
									}
								}
								var vnode17 = ch5;
								var rm10 = rm9;
								var rm11 = [rm10];
								var s73 = vnode17.data.style;
								if(!s73 || !s73.remove) {
									rm11[0]();
									null;
								} else {
									var name59;
									var elm52 = [vnode17.elm];
									var idx3;
									var i48 = 0;
									var maxDur3 = 0;
									var compStyle3;
									var style16 = s73.remove;
									var amount3 = [0];
									var applied3 = [];
									var _g69 = 0;
									var _g152 = Object.keys(style16);
									while(_g69 < _g152.length) {
										var name60 = _g152[_g69];
										++_g69;
										applied3.push(name60);
										elm52[0].style[name60] = style16[name60];
									}
									compStyle3 = window.getComputedStyle(elm52[0]);
									var props12 = compStyle3["transition-property"].split(", ");
									var i49;
									i49 = 0;
									if(i49 < props12.length) do if(HxOverrides.indexOf(applied3,props12[i49],0) != -1) amount3[0]++; while((function($this) {
										var $r;
										++i49;
										$r = i49 < props12.length;
										return $r;
									}(this)));
									elm52[0].addEventListener("transitionend",(function(amount3,elm52,rm11) {
										return function(ev3) {
											if(ev3.target == elm52[0]) --amount3[0];
											if(amount3[0] == 0) rm11[0]();
										};
									})(amount3,elm52,rm11));
								}
								if((function($this) {
									var $r;
									var s74 = i46 = ch5.data;
									$r = s74 != undefined;
									return $r;
								}(this)) && (function($this) {
									var $r;
									var s75 = i46 = i46.hook;
									$r = s75 != undefined;
									return $r;
								}(this)) && (function($this) {
									var $r;
									var s76 = i46 = i46.remove;
									$r = s76 != undefined;
									return $r;
								}(this))) i46(ch5,rm9); else rm9();
							} else elm29.removeChild(ch5.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx7;
						$r = startIdx7 <= endIdx3;
						return $r;
					}(this)));
				}
			} else if(oldVnode6.text != vnode10.text) elm29.textContent = vnode10.text;
			if(hook1 != undefined && (function($this) {
				var $r;
				var s77 = i27 = hook1.postpatch;
				$r = s77 != undefined;
				return $r;
			}(this))) i27(oldVnode6,vnode10);
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
Attributes.booleanAttrs = ["allowfullscreen","async","autofocus","autoplay","checked","compact","controls","declare","default","defaultchecked","defaultmuted","defaultselected","defer","disabled","draggable","enabled","formnovalidate","hidden","indeterminate","inert","ismap","itemscope","loop","multiple","muted","nohref","noresize","noshade","novalidate","nowrap","open","pauseonexit","readonly","required","reversed","scoped","seamless","selected","sortable","spellcheck","translate","truespeed","typemustmatch","visible"];
Attributes.booleanAttrsDict = (function($this) {
	var $r;
	var hash = { };
	var len = Attributes.booleanAttrs.length;
	var i = 0;
	{
		i = 0;
		if(i < len) do hash[Attributes.booleanAttrs[i]] = true; while((function($this) {
			var $r;
			i++;
			$r = i < len;
			return $r;
		}($this)));
	}
	$r = hash;
	return $r;
}(this));
Main.rg = new RegExp("\\.","g");
Main.emptyNode = (function($this) {
	var $r;
	var data = { };
	var elm = null;
	var key = data == null?null:data.key;
	$r = { sel : "", data : data, children : [], text : null, elm : elm, key : key};
	return $r;
}(this));
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
