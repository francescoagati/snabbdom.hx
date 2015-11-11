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
var Styles = function() { };
Styles.raf = function(fn) {
	window.requestAnimationFrame(fn);
};
Styles.nextFrame = function(fn) {
	Styles.raf(function(i) {
		Styles.raf(fn);
	});
};
Styles.setNextFrame = function(obj,prop,val) {
	Styles.nextFrame(function(i) {
		var value = val;
		obj[prop] = value;
	});
};
Styles.updateStyle = function(oldVnode,vnode) {
	var cur;
	var name;
	var elm = vnode.elm;
	var oldStyle = oldVnode.data.style == null?{ }:oldVnode.data.style;
	var style = vnode.data.style == null?{ }:vnode.data.style;
	var oldHasDel = Object.prototype.hasOwnProperty.call(oldStyle,"delayed");
	var _g = 0;
	var _g1 = Reflect.fields(style);
	while(_g < _g1.length) {
		var name1 = _g1[_g];
		++_g;
		cur = style[name1];
		if(name1 == "delayed") {
			var delayed = style.delayed;
			var oldDelayed = oldStyle.delayed;
			var _g2 = 0;
			var _g3 = Reflect.fields(delayed);
			while(_g2 < _g3.length) {
				var name2 = _g3[_g2];
				++_g2;
				cur = delayed[name2];
				if(!oldHasDel || cur != oldDelayed[name2]) Styles.setNextFrame(elm.style,name2,cur);
			}
		} else if(name1 != "remove" && cur != oldStyle[name1]) elm.style[name1] = cur;
	}
};
Styles.applyDestroyStyle = function(vnode) {
	var style = null;
	var name;
	var elm = vnode.elm;
	var s = vnode.data.style;
	if(s == null) return;
	style = s.destroy;
	if(style == null) return;
	var _g = 0;
	var _g1 = Reflect.fields(style);
	while(_g < _g1.length) {
		var name1 = _g1[_g];
		++_g;
		elm.style[name1] = style[name1];
	}
};
Styles.applyRemoveStyle = function(vnode,rm) {
	var s = vnode.data.style;
	if(!s || !s.remove) {
		rm();
		return;
	}
	var name;
	var elm = vnode.elm;
	var idx;
	var i = 0;
	var maxDur = 0;
	var compStyle;
	var style = s.remove;
	var amount = 0;
	var applied = [];
	var _g = 0;
	var _g1 = Reflect.fields(style);
	while(_g < _g1.length) {
		var name1 = _g1[_g];
		++_g;
		applied.push(name1);
		elm.style[name1] = style[name1];
	}
	compStyle = window.getComputedStyle(elm);
	var props = compStyle["transition-property"].split(", ");
	var i1;
	i1 = 0;
	if(i1 < props.length) do if(HxOverrides.indexOf(applied,props[i1],0) != -1) amount++; while((function($this) {
		var $r;
		++i1;
		$r = i1 < props.length;
		return $r;
	}(this)));
	elm.addEventListener("transitionend",function(ev) {
		if(ev.target == elm) --amount;
		if(amount == 0) rm();
	});
};
var CssClasses = function() { };
CssClasses.updateClass = function(oldVnode,vnode) {
	var cur;
	var elm = vnode.elm;
	var oldClass = oldVnode.data.classes == null?{ }:oldVnode.data.classes;
	var klass = vnode.data.classes == null?{ }:vnode.data.classes;
	var _g = 0;
	var _g1 = Reflect.fields(klass);
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		cur = klass[name];
		if(cur != oldClass[name]) {
			if(cur == "add") elm.classList.add(name); else if(cur == "remove") elm.classList.remove(name);
		}
	}
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
		if(Main["is"].array(c)) children = c; else if(Main["is"].primitive(c)) text = c;
	} else if($arguments.length == 2) {
		if(Main["is"].array(b)) children = b; else if(Main["is"].primitive(b)) text = b; else data = b;
	}
	if(Main["is"].array(children)) {
		i = 0;
		if(i < children.length) do if(Main["is"].primitive(children[i])) children[i] = Main.vnode(null,null,null,children[i]); while((function($this) {
			var $r;
			++i;
			$r = i < children.length;
			return $r;
		}(this)));
	}
	return Main.vnode(sel,data,children,text,undefined);
};
Main.vnode = function(sel,data,children,text,elm) {
	var key = data == null?null:data.key;
	return { sel : sel, data : data, children : children, text : text, elm : elm, key : key};
};
Main.emptyNodeAt = function(elm) {
	return Main.vnode(elm.tagName,{ },[],null,elm);
};
Main.createElm = function(vnode,insertedVnodeQueue) {
	var i;
	var data = vnode.data;
	if((function($this) {
		var $r;
		var s = data;
		$r = s != undefined;
		return $r;
	}(this))) {
		if((function($this) {
			var $r;
			var s1 = i = data.hook;
			$r = s1 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s2 = i = i.init;
			$r = s2 != undefined;
			return $r;
		}(this))) i(vnode);
		if((function($this) {
			var $r;
			var s3 = i = data.vnode;
			$r = s3 != undefined;
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
		elm = vnode.elm = (function($this) {
			var $r;
			var s5 = data;
			$r = s5 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s6 = i = data.ns;
			$r = s6 != undefined;
			return $r;
		}(this))?document.createElementNS(i,tag):document.createElement(tag);
		if(hash < dot) elm.id = sel.slice(hash + 1,dot);
		var s4 = "\\.";
		var rg = new RegExp(s4,"g");
		if(dotIdx > 0) {
			elm.className = sel.slice(dot+1).replace(rg, " ");;
		}
		if(Main["is"].array(children)) {
			i = 0;
			if(i < children.length) do elm.appendChild(Main.createElm(children[i],insertedVnodeQueue)); while((function($this) {
				var $r;
				++i;
				$r = i < children.length;
				return $r;
			}(this)));
		} else if(Main["is"].primitive(vnode.text)) elm.appendChild(document.createTextNode(vnode.text));
		var oldVnode = Main.emptyNode;
		var key;
		var cur;
		var old;
		var elm1 = vnode.elm;
		var oldAttrs = oldVnode.data.attrs == null?{ }:oldVnode.data.attrs;
		var attrs = vnode.data.attrs == null?{ }:vnode.data.attrs;
		var _g = 0;
		var _g1 = Reflect.fields(attrs);
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
		var _g11 = Reflect.fields(oldAttrs);
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
		var _g12 = Reflect.fields(props);
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
		CssClasses.updateClass(oldVnode,vnode);
		Styles.updateStyle(oldVnode,vnode);
		if(vnode.data != null) {
			i = vnode.data.hook;
			if((function($this) {
				var $r;
				var s7 = i;
				$r = s7 != undefined;
				return $r;
			}(this))) {
				if(i.create) i.create(Main.emptyNode,vnode);
				if(i.insert) insertedVnodeQueue.push(vnode);
			}
		}
	} else elm = vnode.elm = document.createTextNode(vnode.text);
	return vnode.elm;
};
Main.addVnodes = function(parentElm,before,vnodes,startIdx,endIdx,insertedVnodeQueue) {
	var i;
	i = 0;
	if(startIdx <= endIdx) while(true) {
		var tmp;
		var vnode = vnodes[startIdx];
		var i1;
		var data = vnode.data;
		var tmp2;
		var s = data;
		tmp2 = s != undefined;
		if(tmp2) {
			var tmp3;
			var s1 = i1 = data.hook;
			tmp3 = s1 != undefined;
			var tmp4;
			if(tmp3) {
				var s2 = i1 = i1.init;
				tmp4 = s2 != undefined;
			} else tmp4 = false;
			if(tmp4) i1(vnode);
			var tmp5;
			var s3 = i1 = data.vnode;
			tmp5 = s3 != undefined;
			if(tmp5) vnode = i1;
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
			var tmp6;
			var s5 = data;
			tmp6 = s5 != undefined;
			var tmp7;
			if(tmp6) {
				var s6 = i1 = data.ns;
				tmp7 = s6 != undefined;
			} else tmp7 = false;
			elm = vnode.elm = tmp7?document.createElementNS(i1,tag):document.createElement(tag);
			if(hash < dot) elm.id = sel.slice(hash + 1,dot);
			var s4 = "\\.";
			var rg = new RegExp(s4,"g");
			if(dotIdx > 0) {
				elm.className = sel.slice(dot+1).replace(rg, " ");;
			}
			if(Main["is"].array(children)) {
				i1 = 0;
				if(i1 < children.length) while(true) {
					elm.appendChild(Main.createElm(children[i1],insertedVnodeQueue));
					var tmp8;
					++i1;
					tmp8 = i1 < children.length;
					if(!tmp8) break;
				}
			} else if(Main["is"].primitive(vnode.text)) elm.appendChild(document.createTextNode(vnode.text));
			var oldVnode = Main.emptyNode;
			var key;
			var cur;
			var old;
			var elm1 = vnode.elm;
			var oldAttrs = oldVnode.data.attrs == null?{ }:oldVnode.data.attrs;
			var attrs = vnode.data.attrs == null?{ }:vnode.data.attrs;
			var _g = 0;
			var _g1 = Reflect.fields(attrs);
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
			var _g11 = Reflect.fields(oldAttrs);
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
			var _g12 = Reflect.fields(props);
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
			CssClasses.updateClass(oldVnode,vnode);
			Styles.updateStyle(oldVnode,vnode);
			if(vnode.data != null) {
				i1 = vnode.data.hook;
				var tmp9;
				var s7 = i1;
				tmp9 = s7 != undefined;
				if(tmp9) {
					if(i1.create) i1.create(Main.emptyNode,vnode);
					if(i1.insert) insertedVnodeQueue.push(vnode);
				}
			}
		} else elm = vnode.elm = document.createTextNode(vnode.text);
		tmp = vnode.elm;
		parentElm.insertBefore(tmp,before);
		var tmp1;
		++startIdx;
		tmp1 = startIdx <= endIdx;
		if(!tmp1) break;
	}
};
Main.invokeDestroyHook = function(vnode) {
	var i = vnode.data;
	var j;
	if((function($this) {
		var $r;
		var s = i;
		$r = s != undefined;
		return $r;
	}(this))) {
		if((function($this) {
			var $r;
			var s1 = i = i.hook;
			$r = s1 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s2 = i = i.destroy;
			$r = s2 != undefined;
			return $r;
		}(this))) i(vnode);
		Styles.applyDestroyStyle(vnode);
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
	if((function($this) {
		var $r;
		var s7 = vnode.data;
		$r = s7 != undefined;
		return $r;
	}(this))) {
		var key;
		var cur;
		var old;
		var elm1 = vnode.elm;
		var oldAttrs = oldVnode.data.attrs == null?{ }:oldVnode.data.attrs;
		var attrs = vnode.data.attrs == null?{ }:vnode.data.attrs;
		var _g = 0;
		var _g1 = Reflect.fields(attrs);
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
		var _g11 = Reflect.fields(oldAttrs);
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
		var _g12 = Reflect.fields(props);
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
		CssClasses.updateClass(oldVnode,vnode);
		Styles.updateStyle(oldVnode,vnode);
		i = vnode.data.hook;
		if((function($this) {
			var $r;
			var s8 = i;
			$r = s8 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s9 = i = i.update;
			$r = s9 != undefined;
			return $r;
		}(this))) i(oldVnode,vnode);
	}
	if(vnode.text == undefined) {
		if((function($this) {
			var $r;
			var s10 = oldCh;
			$r = s10 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s11 = ch;
			$r = s11 != undefined;
			return $r;
		}(this))) {
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
						var i1;
						var map = { };
						var key5;
						{
							i1 = oldStartIdx;
							if(i1 <= oldEndIdx) do {
								key5 = children[i1].key;
								if(key5 != undefined) map[key5] = i1;
							} while((function($this) {
								var $r;
								++i1;
								$r = i1 <= oldEndIdx;
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
							var i2;
							var data = vnode1.data;
							if((function($this) {
								var $r;
								var s12 = data;
								$r = s12 != undefined;
								return $r;
							}($this))) {
								if((function($this) {
									var $r;
									var s13 = i2 = data.hook;
									$r = s13 != undefined;
									return $r;
								}($this)) && (function($this) {
									var $r;
									var s14 = i2 = i2.init;
									$r = s14 != undefined;
									return $r;
								}($this))) i2(vnode1);
								if((function($this) {
									var $r;
									var s15 = i2 = data.vnode;
									$r = s15 != undefined;
									return $r;
								}($this))) vnode1 = i2;
							}
							var elm3;
							var children1 = vnode1.children;
							var sel = vnode1.sel;
							if(sel != undefined) {
								var hashIdx = sel.indexOf("#",0);
								var dotIdx = sel.indexOf(".",hashIdx);
								var hash = hashIdx > 0?hashIdx:sel.length;
								var dot = dotIdx > 0?dotIdx:sel.length;
								var tag = hashIdx != -1 || dotIdx != -1?sel.slice(0,Math.min(hash,dot)):sel;
								elm3 = vnode1.elm = (function($this) {
									var $r;
									var s17 = data;
									$r = s17 != undefined;
									return $r;
								}($this)) && (function($this) {
									var $r;
									var s18 = i2 = data.ns;
									$r = s18 != undefined;
									return $r;
								}($this))?document.createElementNS(i2,tag):document.createElement(tag);
								if(hash < dot) elm3.id = sel.slice(hash + 1,dot);
								var s16 = "\\.";
								var rg = new RegExp(s16,"g");
								if(dotIdx > 0) {
									elm.className = sel.slice(dot+1).replace(rg, " ");;
								}
								if(Main["is"].array(children1)) {
									i2 = 0;
									if(i2 < children1.length) do elm3.appendChild(Main.createElm(children1[i2],insertedVnodeQueue)); while((function($this) {
										var $r;
										++i2;
										$r = i2 < children1.length;
										return $r;
									}($this)));
								} else if(Main["is"].primitive(vnode1.text)) elm3.appendChild(document.createTextNode(vnode1.text));
								var oldVnode1 = Main.emptyNode;
								var key6;
								var cur2;
								var old2;
								var elm4 = vnode1.elm;
								var oldAttrs1 = oldVnode1.data.attrs == null?{ }:oldVnode1.data.attrs;
								var attrs1 = vnode1.data.attrs == null?{ }:vnode1.data.attrs;
								var _g4 = 0;
								var _g13 = Reflect.fields(attrs1);
								while(_g4 < _g13.length) {
									var key7 = _g13[_g4];
									++_g4;
									cur2 = attrs1[key7];
									old2 = oldAttrs1[key7];
									if(old2 != cur2) {
										if(!cur2 && Attributes.booleanAttrsDict[key7]) elm4.removeAttribute(key7); else elm4.setAttribute(key7,cur2);
									}
								}
								var _g5 = 0;
								var _g14 = Reflect.fields(oldAttrs1);
								while(_g5 < _g14.length) {
									var key8 = _g14[_g5];
									++_g5;
									if(!Object.prototype.hasOwnProperty.call(attrs1,key8)) elm4.removeAttribute(key8);
								}
								var key9;
								var cur3;
								var old3;
								var elm5 = vnode1.elm;
								var oldProps1 = oldVnode1.data.props == null?{ }:oldVnode1.data.props;
								var props1 = vnode1.data.props == null?{ }:vnode1.data.props;
								var _g6 = 0;
								var _g15 = Reflect.fields(props1);
								while(_g6 < _g15.length) {
									var key10 = _g15[_g6];
									++_g6;
									cur3 = props1[key10];
									old3 = oldProps1[key10];
									if(old3 != cur3) {
										var value1 = cur3;
										elm5[key10] = value1;
									}
								}
								CssClasses.updateClass(oldVnode1,vnode1);
								Styles.updateStyle(oldVnode1,vnode1);
								if(vnode1.data != null) {
									i2 = vnode1.data.hook;
									if((function($this) {
										var $r;
										var s19 = i2;
										$r = s19 != undefined;
										return $r;
									}($this))) {
										if(i2.create) i2.create(Main.emptyNode,vnode1);
										if(i2.insert) insertedVnodeQueue.push(vnode1);
									}
								}
							} else elm3 = vnode1.elm = document.createTextNode(vnode1.text);
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
					Main.addVnodes(elm,before,ch,newStartIdx,newEndIdx,insertedVnodeQueue);
				} else if(newStartIdx > newEndIdx) {
					var vnodes = oldCh;
					var startIdx = oldStartIdx;
					var y;
					y = 0;
					if(startIdx <= oldEndIdx) do {
						var i3;
						var listeners;
						var rm = null;
						var ch1 = vnodes[startIdx];
						if((function($this) {
							var $r;
							var s20 = ch1;
							$r = s20 != undefined;
							return $r;
						}(this))) {
							if((function($this) {
								var $r;
								var s21 = ch1.sel;
								$r = s21 != undefined;
								return $r;
							}(this))) {
								var vnode2 = ch1;
								var i4 = vnode2.data;
								var j;
								if((function($this) {
									var $r;
									var s22 = i4;
									$r = s22 != undefined;
									return $r;
								}(this))) {
									if((function($this) {
										var $r;
										var s23 = i4 = i4.hook;
										$r = s23 != undefined;
										return $r;
									}(this)) && (function($this) {
										var $r;
										var s24 = i4 = i4.destroy;
										$r = s24 != undefined;
										return $r;
									}(this))) i4(vnode2);
									Styles.applyDestroyStyle(vnode2);
									if((function($this) {
										var $r;
										var s25 = i4 = vnode2.children;
										$r = s25 != undefined;
										return $r;
									}(this))) {
										j = 0;
										if(j < vnode2.children.length) do Main.invokeDestroyHook(vnode2.children[j]); while((function($this) {
											var $r;
											++j;
											$r = j < vnode2.children.length;
											return $r;
										}(this)));
									}
								}
								var vnode3 = ch1;
								var rm1 = rm;
								Styles.applyRemoveStyle(vnode3,rm1);
								if((function($this) {
									var $r;
									var s26 = i3 = ch1.data;
									$r = s26 != undefined;
									return $r;
								}(this)) && (function($this) {
									var $r;
									var s27 = i3 = i3.hook;
									$r = s27 != undefined;
									return $r;
								}(this)) && (function($this) {
									var $r;
									var s28 = i3 = i3.remove;
									$r = s28 != undefined;
									return $r;
								}(this))) i3(ch1,rm); else rm();
							} else elm.removeChild(ch1.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx;
						$r = startIdx <= oldEndIdx;
						return $r;
					}(this)));
				}
			}
		} else if((function($this) {
			var $r;
			var s29 = ch;
			$r = s29 != undefined;
			return $r;
		}(this))) Main.addVnodes(elm,null,ch,0,ch.length - 1,insertedVnodeQueue); else if((function($this) {
			var $r;
			var s30 = oldCh;
			$r = s30 != undefined;
			return $r;
		}(this))) {
			var vnodes1 = oldCh;
			var startIdx1 = 0;
			var endIdx = oldCh.length - 1;
			var y1;
			y1 = 0;
			if(startIdx1 <= endIdx) do {
				var i5;
				var listeners1;
				var rm2 = null;
				var ch2 = vnodes1[startIdx1];
				if((function($this) {
					var $r;
					var s31 = ch2;
					$r = s31 != undefined;
					return $r;
				}(this))) {
					if((function($this) {
						var $r;
						var s32 = ch2.sel;
						$r = s32 != undefined;
						return $r;
					}(this))) {
						var vnode4 = ch2;
						var i6 = vnode4.data;
						var j1;
						if((function($this) {
							var $r;
							var s33 = i6;
							$r = s33 != undefined;
							return $r;
						}(this))) {
							if((function($this) {
								var $r;
								var s34 = i6 = i6.hook;
								$r = s34 != undefined;
								return $r;
							}(this)) && (function($this) {
								var $r;
								var s35 = i6 = i6.destroy;
								$r = s35 != undefined;
								return $r;
							}(this))) i6(vnode4);
							Styles.applyDestroyStyle(vnode4);
							if((function($this) {
								var $r;
								var s36 = i6 = vnode4.children;
								$r = s36 != undefined;
								return $r;
							}(this))) {
								j1 = 0;
								if(j1 < vnode4.children.length) do Main.invokeDestroyHook(vnode4.children[j1]); while((function($this) {
									var $r;
									++j1;
									$r = j1 < vnode4.children.length;
									return $r;
								}(this)));
							}
						}
						var vnode5 = ch2;
						var rm3 = rm2;
						Styles.applyRemoveStyle(vnode5,rm3);
						if((function($this) {
							var $r;
							var s37 = i5 = ch2.data;
							$r = s37 != undefined;
							return $r;
						}(this)) && (function($this) {
							var $r;
							var s38 = i5 = i5.hook;
							$r = s38 != undefined;
							return $r;
						}(this)) && (function($this) {
							var $r;
							var s39 = i5 = i5.remove;
							$r = s39 != undefined;
							return $r;
						}(this))) i5(ch2,rm2); else rm2();
					} else elm.removeChild(ch2.elm);
				}
			} while((function($this) {
				var $r;
				++startIdx1;
				$r = startIdx1 <= endIdx;
				return $r;
			}(this)));
		}
	} else if(oldVnode.text != vnode.text) elm.textContent = vnode.text;
	if(hook != undefined && (function($this) {
		var $r;
		var s40 = i = hook.postpatch;
		$r = s40 != undefined;
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
			if((function($this) {
				var $r;
				var s = data;
				$r = s != undefined;
				return $r;
			}(this))) {
				if((function($this) {
					var $r;
					var s1 = i1 = data.hook;
					$r = s1 != undefined;
					return $r;
				}(this)) && (function($this) {
					var $r;
					var s2 = i1 = i1.init;
					$r = s2 != undefined;
					return $r;
				}(this))) i1(vnode1);
				if((function($this) {
					var $r;
					var s3 = i1 = data.vnode;
					$r = s3 != undefined;
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
				elm = vnode1.elm = (function($this) {
					var $r;
					var s5 = data;
					$r = s5 != undefined;
					return $r;
				}(this)) && (function($this) {
					var $r;
					var s6 = i1 = data.ns;
					$r = s6 != undefined;
					return $r;
				}(this))?document.createElementNS(i1,tag):document.createElement(tag);
				if(hash < dot) elm.id = sel.slice(hash + 1,dot);
				var s4 = "\\.";
				var rg = new RegExp(s4,"g");
				if(dotIdx > 0) {
					elm.className = sel.slice(dot+1).replace(rg, " ");;
				}
				if(Main["is"].array(children)) {
					i1 = 0;
					if(i1 < children.length) do elm.appendChild(Main.createElm(children[i1],insertedVnodeQueue)); while((function($this) {
						var $r;
						++i1;
						$r = i1 < children.length;
						return $r;
					}(this)));
				} else if(Main["is"].primitive(vnode1.text)) elm.appendChild(document.createTextNode(vnode1.text));
				var oldVnode1 = Main.emptyNode;
				var key;
				var cur;
				var old;
				var elm1 = vnode1.elm;
				var oldAttrs = oldVnode1.data.attrs == null?{ }:oldVnode1.data.attrs;
				var attrs = vnode1.data.attrs == null?{ }:vnode1.data.attrs;
				var _g = 0;
				var _g1 = Reflect.fields(attrs);
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
				var _g11 = Reflect.fields(oldAttrs);
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
				var _g12 = Reflect.fields(props);
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
				CssClasses.updateClass(oldVnode1,vnode1);
				Styles.updateStyle(oldVnode1,vnode1);
				if(vnode1.data != null) {
					i1 = vnode1.data.hook;
					if((function($this) {
						var $r;
						var s7 = i1;
						$r = s7 != undefined;
						return $r;
					}(this))) {
						if(i1.create) i1.create(Main.emptyNode,vnode1);
						if(i1.insert) insertedVnodeQueue.push(vnode1);
					}
				}
			} else elm = vnode1.elm = document.createTextNode(vnode1.text);
			vnode1.elm;
			oldVnode.parentElement.replaceChild(vnode.elm,oldVnode);
		} else {
			oldVnode = Main.emptyNodeAt(oldVnode);
			var oldVnode2 = oldVnode;
			var vnode2 = vnode;
			var i2;
			var hook;
			if((function($this) {
				var $r;
				var s8 = i2 = vnode2.data;
				$r = s8 != undefined;
				return $r;
			}(this)) && (function($this) {
				var $r;
				var s9 = hook = i2.hook;
				$r = s9 != undefined;
				return $r;
			}(this)) && (function($this) {
				var $r;
				var s10 = i2 = hook.prepatch;
				$r = s10 != undefined;
				return $r;
			}(this))) i2(oldVnode2,vnode2);
			if((function($this) {
				var $r;
				var s11 = i2 = oldVnode2.data;
				$r = s11 != undefined;
				return $r;
			}(this)) && (function($this) {
				var $r;
				var s12 = i2 = i2.vnode;
				$r = s12 != undefined;
				return $r;
			}(this))) oldVnode2 = i2;
			if((function($this) {
				var $r;
				var s13 = i2 = vnode2.data;
				$r = s13 != undefined;
				return $r;
			}(this)) && (function($this) {
				var $r;
				var s14 = i2 = i2.vnode;
				$r = s14 != undefined;
				return $r;
			}(this))) vnode2 = i2;
			var elm3 = vnode2.elm = oldVnode2.elm;
			var oldCh = oldVnode2.children;
			var ch = vnode2.children;
			if(oldVnode2 == vnode2) null; else {
				if((function($this) {
					var $r;
					var s15 = vnode2.data;
					$r = s15 != undefined;
					return $r;
				}(this))) {
					var key5;
					var cur2;
					var old2;
					var elm4 = vnode2.elm;
					var oldAttrs1 = oldVnode2.data.attrs == null?{ }:oldVnode2.data.attrs;
					var attrs1 = vnode2.data.attrs == null?{ }:vnode2.data.attrs;
					var _g4 = 0;
					var _g13 = Reflect.fields(attrs1);
					while(_g4 < _g13.length) {
						var key6 = _g13[_g4];
						++_g4;
						cur2 = attrs1[key6];
						old2 = oldAttrs1[key6];
						if(old2 != cur2) {
							if(!cur2 && Attributes.booleanAttrsDict[key6]) elm4.removeAttribute(key6); else elm4.setAttribute(key6,cur2);
						}
					}
					var _g5 = 0;
					var _g14 = Reflect.fields(oldAttrs1);
					while(_g5 < _g14.length) {
						var key7 = _g14[_g5];
						++_g5;
						if(!Object.prototype.hasOwnProperty.call(attrs1,key7)) elm4.removeAttribute(key7);
					}
					var key8;
					var cur3;
					var old3;
					var elm5 = vnode2.elm;
					var oldProps1 = oldVnode2.data.props == null?{ }:oldVnode2.data.props;
					var props1 = vnode2.data.props == null?{ }:vnode2.data.props;
					var _g6 = 0;
					var _g15 = Reflect.fields(props1);
					while(_g6 < _g15.length) {
						var key9 = _g15[_g6];
						++_g6;
						cur3 = props1[key9];
						old3 = oldProps1[key9];
						if(old3 != cur3) {
							var value1 = cur3;
							elm5[key9] = value1;
						}
					}
					CssClasses.updateClass(oldVnode2,vnode2);
					Styles.updateStyle(oldVnode2,vnode2);
					i2 = vnode2.data.hook;
					if((function($this) {
						var $r;
						var s16 = i2;
						$r = s16 != undefined;
						return $r;
					}(this)) && (function($this) {
						var $r;
						var s17 = i2 = i2.update;
						$r = s17 != undefined;
						return $r;
					}(this))) i2(oldVnode2,vnode2);
				}
				if(vnode2.text == undefined) {
					if((function($this) {
						var $r;
						var s18 = oldCh;
						$r = s18 != undefined;
						return $r;
					}(this)) && (function($this) {
						var $r;
						var s19 = ch;
						$r = s19 != undefined;
						return $r;
					}(this))) {
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
								elm3.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling);
								oldStartVnode = oldCh[++oldStartIdx];
								newEndVnode = ch[--newEndIdx];
							} else if(oldEndVnode.key == newStartVnode.key && oldEndVnode.sel == newStartVnode.sel) {
								Main.patchVnode(oldEndVnode,newStartVnode,insertedVnodeQueue);
								elm3.insertBefore(oldEndVnode.elm,oldStartVnode.elm);
								oldEndVnode = oldCh[--oldEndIdx];
								newStartVnode = ch[++newStartIdx];
							} else {
								if(oldKeyToIdx == undefined) oldKeyToIdx = (function($this) {
									var $r;
									var children1 = oldCh;
									var i3;
									var map = { };
									var key10;
									{
										i3 = oldStartIdx;
										if(i3 <= oldEndIdx) do {
											key10 = children1[i3].key;
											if(key10 != undefined) map[key10] = i3;
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
									elm3.insertBefore((function($this) {
										var $r;
										var vnode3 = newStartVnode;
										var i4;
										var data1 = vnode3.data;
										if((function($this) {
											var $r;
											var s20 = data1;
											$r = s20 != undefined;
											return $r;
										}($this))) {
											if((function($this) {
												var $r;
												var s21 = i4 = data1.hook;
												$r = s21 != undefined;
												return $r;
											}($this)) && (function($this) {
												var $r;
												var s22 = i4 = i4.init;
												$r = s22 != undefined;
												return $r;
											}($this))) i4(vnode3);
											if((function($this) {
												var $r;
												var s23 = i4 = data1.vnode;
												$r = s23 != undefined;
												return $r;
											}($this))) vnode3 = i4;
										}
										var elm6;
										var children2 = vnode3.children;
										var sel1 = vnode3.sel;
										if(sel1 != undefined) {
											var hashIdx1 = sel1.indexOf("#",0);
											var dotIdx1 = sel1.indexOf(".",hashIdx1);
											var hash1 = hashIdx1 > 0?hashIdx1:sel1.length;
											var dot1 = dotIdx1 > 0?dotIdx1:sel1.length;
											var tag1 = hashIdx1 != -1 || dotIdx1 != -1?sel1.slice(0,Math.min(hash1,dot1)):sel1;
											elm6 = vnode3.elm = (function($this) {
												var $r;
												var s25 = data1;
												$r = s25 != undefined;
												return $r;
											}($this)) && (function($this) {
												var $r;
												var s26 = i4 = data1.ns;
												$r = s26 != undefined;
												return $r;
											}($this))?document.createElementNS(i4,tag1):document.createElement(tag1);
											if(hash1 < dot1) elm6.id = sel1.slice(hash1 + 1,dot1);
											var s24 = "\\.";
											var rg1 = new RegExp(s24,"g");
											if(dotIdx1 > 0) {
												elm.className = sel.slice(dot+1).replace(rg, " ");;
											}
											if(Main["is"].array(children2)) {
												i4 = 0;
												if(i4 < children2.length) do elm6.appendChild(Main.createElm(children2[i4],insertedVnodeQueue)); while((function($this) {
													var $r;
													++i4;
													$r = i4 < children2.length;
													return $r;
												}($this)));
											} else if(Main["is"].primitive(vnode3.text)) elm6.appendChild(document.createTextNode(vnode3.text));
											var oldVnode3 = Main.emptyNode;
											var key11;
											var cur4;
											var old4;
											var elm7 = vnode3.elm;
											var oldAttrs2 = oldVnode3.data.attrs == null?{ }:oldVnode3.data.attrs;
											var attrs2 = vnode3.data.attrs == null?{ }:vnode3.data.attrs;
											var _g7 = 0;
											var _g16 = Reflect.fields(attrs2);
											while(_g7 < _g16.length) {
												var key12 = _g16[_g7];
												++_g7;
												cur4 = attrs2[key12];
												old4 = oldAttrs2[key12];
												if(old4 != cur4) {
													if(!cur4 && Attributes.booleanAttrsDict[key12]) elm7.removeAttribute(key12); else elm7.setAttribute(key12,cur4);
												}
											}
											var _g8 = 0;
											var _g17 = Reflect.fields(oldAttrs2);
											while(_g8 < _g17.length) {
												var key13 = _g17[_g8];
												++_g8;
												if(!Object.prototype.hasOwnProperty.call(attrs2,key13)) elm7.removeAttribute(key13);
											}
											var key14;
											var cur5;
											var old5;
											var elm8 = vnode3.elm;
											var oldProps2 = oldVnode3.data.props == null?{ }:oldVnode3.data.props;
											var props2 = vnode3.data.props == null?{ }:vnode3.data.props;
											var _g9 = 0;
											var _g18 = Reflect.fields(props2);
											while(_g9 < _g18.length) {
												var key15 = _g18[_g9];
												++_g9;
												cur5 = props2[key15];
												old5 = oldProps2[key15];
												if(old5 != cur5) {
													var value2 = cur5;
													elm8[key15] = value2;
												}
											}
											CssClasses.updateClass(oldVnode3,vnode3);
											Styles.updateStyle(oldVnode3,vnode3);
											if(vnode3.data != null) {
												i4 = vnode3.data.hook;
												if((function($this) {
													var $r;
													var s27 = i4;
													$r = s27 != undefined;
													return $r;
												}($this))) {
													if(i4.create) i4.create(Main.emptyNode,vnode3);
													if(i4.insert) insertedVnodeQueue.push(vnode3);
												}
											}
										} else elm6 = vnode3.elm = document.createTextNode(vnode3.text);
										$r = vnode3.elm;
										return $r;
									}(this)),oldStartVnode.elm);
									newStartVnode = ch[++newStartIdx];
								} else {
									elmToMove = oldCh[idxInOld];
									Main.patchVnode(elmToMove,newStartVnode,insertedVnodeQueue);
									oldCh[idxInOld] = null;
									elm3.insertBefore(elmToMove.elm,oldStartVnode.elm);
									newStartVnode = ch[++newStartIdx];
								}
							}
							if(oldStartIdx > oldEndIdx) {
								before = ch[newEndIdx + 1] == undefined?null:ch[newEndIdx + 1].elm;
								Main.addVnodes(elm3,before,ch,newStartIdx,newEndIdx,insertedVnodeQueue);
							} else if(newStartIdx > newEndIdx) {
								var vnodes = oldCh;
								var startIdx = oldStartIdx;
								var y;
								y = 0;
								if(startIdx <= oldEndIdx) do {
									var i5;
									var listeners;
									var rm = null;
									var ch1 = vnodes[startIdx];
									if((function($this) {
										var $r;
										var s28 = ch1;
										$r = s28 != undefined;
										return $r;
									}(this))) {
										if((function($this) {
											var $r;
											var s29 = ch1.sel;
											$r = s29 != undefined;
											return $r;
										}(this))) {
											var vnode4 = ch1;
											var i6 = vnode4.data;
											var j;
											if((function($this) {
												var $r;
												var s30 = i6;
												$r = s30 != undefined;
												return $r;
											}(this))) {
												if((function($this) {
													var $r;
													var s31 = i6 = i6.hook;
													$r = s31 != undefined;
													return $r;
												}(this)) && (function($this) {
													var $r;
													var s32 = i6 = i6.destroy;
													$r = s32 != undefined;
													return $r;
												}(this))) i6(vnode4);
												Styles.applyDestroyStyle(vnode4);
												if((function($this) {
													var $r;
													var s33 = i6 = vnode4.children;
													$r = s33 != undefined;
													return $r;
												}(this))) {
													j = 0;
													if(j < vnode4.children.length) do Main.invokeDestroyHook(vnode4.children[j]); while((function($this) {
														var $r;
														++j;
														$r = j < vnode4.children.length;
														return $r;
													}(this)));
												}
											}
											var vnode5 = ch1;
											var rm1 = rm;
											Styles.applyRemoveStyle(vnode5,rm1);
											if((function($this) {
												var $r;
												var s34 = i5 = ch1.data;
												$r = s34 != undefined;
												return $r;
											}(this)) && (function($this) {
												var $r;
												var s35 = i5 = i5.hook;
												$r = s35 != undefined;
												return $r;
											}(this)) && (function($this) {
												var $r;
												var s36 = i5 = i5.remove;
												$r = s36 != undefined;
												return $r;
											}(this))) i5(ch1,rm); else rm();
										} else elm3.removeChild(ch1.elm);
									}
								} while((function($this) {
									var $r;
									++startIdx;
									$r = startIdx <= oldEndIdx;
									return $r;
								}(this)));
							}
						}
					} else if((function($this) {
						var $r;
						var s37 = ch;
						$r = s37 != undefined;
						return $r;
					}(this))) Main.addVnodes(elm3,null,ch,0,ch.length - 1,insertedVnodeQueue); else if((function($this) {
						var $r;
						var s38 = oldCh;
						$r = s38 != undefined;
						return $r;
					}(this))) {
						var vnodes1 = oldCh;
						var startIdx1 = 0;
						var endIdx = oldCh.length - 1;
						var y1;
						y1 = 0;
						if(startIdx1 <= endIdx) do {
							var i7;
							var listeners1;
							var rm2 = null;
							var ch2 = vnodes1[startIdx1];
							if((function($this) {
								var $r;
								var s39 = ch2;
								$r = s39 != undefined;
								return $r;
							}(this))) {
								if((function($this) {
									var $r;
									var s40 = ch2.sel;
									$r = s40 != undefined;
									return $r;
								}(this))) {
									var vnode6 = ch2;
									var i8 = vnode6.data;
									var j1;
									if((function($this) {
										var $r;
										var s41 = i8;
										$r = s41 != undefined;
										return $r;
									}(this))) {
										if((function($this) {
											var $r;
											var s42 = i8 = i8.hook;
											$r = s42 != undefined;
											return $r;
										}(this)) && (function($this) {
											var $r;
											var s43 = i8 = i8.destroy;
											$r = s43 != undefined;
											return $r;
										}(this))) i8(vnode6);
										Styles.applyDestroyStyle(vnode6);
										if((function($this) {
											var $r;
											var s44 = i8 = vnode6.children;
											$r = s44 != undefined;
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
									var rm3 = rm2;
									Styles.applyRemoveStyle(vnode7,rm3);
									if((function($this) {
										var $r;
										var s45 = i7 = ch2.data;
										$r = s45 != undefined;
										return $r;
									}(this)) && (function($this) {
										var $r;
										var s46 = i7 = i7.hook;
										$r = s46 != undefined;
										return $r;
									}(this)) && (function($this) {
										var $r;
										var s47 = i7 = i7.remove;
										$r = s47 != undefined;
										return $r;
									}(this))) i7(ch2,rm2); else rm2();
								} else elm3.removeChild(ch2.elm);
							}
						} while((function($this) {
							var $r;
							++startIdx1;
							$r = startIdx1 <= endIdx;
							return $r;
						}(this)));
					}
				} else if(oldVnode2.text != vnode2.text) elm3.textContent = vnode2.text;
				if(hook != undefined && (function($this) {
					var $r;
					var s48 = i2 = hook.postpatch;
					$r = s48 != undefined;
					return $r;
				}(this))) i2(oldVnode2,vnode2);
			}
		}
	} else {
		var oldVnode4 = oldVnode;
		var vnode8 = vnode;
		var i9;
		var hook1;
		if((function($this) {
			var $r;
			var s49 = i9 = vnode8.data;
			$r = s49 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s50 = hook1 = i9.hook;
			$r = s50 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s51 = i9 = hook1.prepatch;
			$r = s51 != undefined;
			return $r;
		}(this))) i9(oldVnode4,vnode8);
		if((function($this) {
			var $r;
			var s52 = i9 = oldVnode4.data;
			$r = s52 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s53 = i9 = i9.vnode;
			$r = s53 != undefined;
			return $r;
		}(this))) oldVnode4 = i9;
		if((function($this) {
			var $r;
			var s54 = i9 = vnode8.data;
			$r = s54 != undefined;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var s55 = i9 = i9.vnode;
			$r = s55 != undefined;
			return $r;
		}(this))) vnode8 = i9;
		var elm9 = vnode8.elm = oldVnode4.elm;
		var oldCh1 = oldVnode4.children;
		var ch3 = vnode8.children;
		if(oldVnode4 == vnode8) null; else {
			if((function($this) {
				var $r;
				var s56 = vnode8.data;
				$r = s56 != undefined;
				return $r;
			}(this))) {
				var key16;
				var cur6;
				var old6;
				var elm10 = vnode8.elm;
				var oldAttrs3 = oldVnode4.data.attrs == null?{ }:oldVnode4.data.attrs;
				var attrs3 = vnode8.data.attrs == null?{ }:vnode8.data.attrs;
				var _g10 = 0;
				var _g19 = Reflect.fields(attrs3);
				while(_g10 < _g19.length) {
					var key17 = _g19[_g10];
					++_g10;
					cur6 = attrs3[key17];
					old6 = oldAttrs3[key17];
					if(old6 != cur6) {
						if(!cur6 && Attributes.booleanAttrsDict[key17]) elm10.removeAttribute(key17); else elm10.setAttribute(key17,cur6);
					}
				}
				var _g20 = 0;
				var _g110 = Reflect.fields(oldAttrs3);
				while(_g20 < _g110.length) {
					var key18 = _g110[_g20];
					++_g20;
					if(!Object.prototype.hasOwnProperty.call(attrs3,key18)) elm10.removeAttribute(key18);
				}
				var key19;
				var cur7;
				var old7;
				var elm11 = vnode8.elm;
				var oldProps3 = oldVnode4.data.props == null?{ }:oldVnode4.data.props;
				var props3 = vnode8.data.props == null?{ }:vnode8.data.props;
				var _g21 = 0;
				var _g111 = Reflect.fields(props3);
				while(_g21 < _g111.length) {
					var key20 = _g111[_g21];
					++_g21;
					cur7 = props3[key20];
					old7 = oldProps3[key20];
					if(old7 != cur7) {
						var value3 = cur7;
						elm11[key20] = value3;
					}
				}
				CssClasses.updateClass(oldVnode4,vnode8);
				Styles.updateStyle(oldVnode4,vnode8);
				i9 = vnode8.data.hook;
				if((function($this) {
					var $r;
					var s57 = i9;
					$r = s57 != undefined;
					return $r;
				}(this)) && (function($this) {
					var $r;
					var s58 = i9 = i9.update;
					$r = s58 != undefined;
					return $r;
				}(this))) i9(oldVnode4,vnode8);
			}
			if(vnode8.text == undefined) {
				if((function($this) {
					var $r;
					var s59 = oldCh1;
					$r = s59 != undefined;
					return $r;
				}(this)) && (function($this) {
					var $r;
					var s60 = ch3;
					$r = s60 != undefined;
					return $r;
				}(this))) {
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
							elm9.insertBefore(oldStartVnode1.elm,oldEndVnode1.elm.nextSibling);
							oldStartVnode1 = oldCh1[++oldStartIdx1];
							newEndVnode1 = ch3[--newEndIdx1];
						} else if(oldEndVnode1.key == newStartVnode1.key && oldEndVnode1.sel == newStartVnode1.sel) {
							Main.patchVnode(oldEndVnode1,newStartVnode1,insertedVnodeQueue);
							elm9.insertBefore(oldEndVnode1.elm,oldStartVnode1.elm);
							oldEndVnode1 = oldCh1[--oldEndIdx1];
							newStartVnode1 = ch3[++newStartIdx1];
						} else {
							if(oldKeyToIdx1 == undefined) oldKeyToIdx1 = (function($this) {
								var $r;
								var children3 = oldCh1;
								var i10;
								var map1 = { };
								var key21;
								{
									i10 = oldStartIdx1;
									if(i10 <= oldEndIdx1) do {
										key21 = children3[i10].key;
										if(key21 != undefined) map1[key21] = i10;
									} while((function($this) {
										var $r;
										++i10;
										$r = i10 <= oldEndIdx1;
										return $r;
									}($this)));
								}
								$r = map1;
								return $r;
							}(this));
							idxInOld1 = oldKeyToIdx1[newStartVnode1.key];
							if(idxInOld1 == undefined) {
								elm9.insertBefore((function($this) {
									var $r;
									var vnode9 = newStartVnode1;
									var i11;
									var data2 = vnode9.data;
									if((function($this) {
										var $r;
										var s61 = data2;
										$r = s61 != undefined;
										return $r;
									}($this))) {
										if((function($this) {
											var $r;
											var s62 = i11 = data2.hook;
											$r = s62 != undefined;
											return $r;
										}($this)) && (function($this) {
											var $r;
											var s63 = i11 = i11.init;
											$r = s63 != undefined;
											return $r;
										}($this))) i11(vnode9);
										if((function($this) {
											var $r;
											var s64 = i11 = data2.vnode;
											$r = s64 != undefined;
											return $r;
										}($this))) vnode9 = i11;
									}
									var elm12;
									var children4 = vnode9.children;
									var sel2 = vnode9.sel;
									if(sel2 != undefined) {
										var hashIdx2 = sel2.indexOf("#",0);
										var dotIdx2 = sel2.indexOf(".",hashIdx2);
										var hash2 = hashIdx2 > 0?hashIdx2:sel2.length;
										var dot2 = dotIdx2 > 0?dotIdx2:sel2.length;
										var tag2 = hashIdx2 != -1 || dotIdx2 != -1?sel2.slice(0,Math.min(hash2,dot2)):sel2;
										elm12 = vnode9.elm = (function($this) {
											var $r;
											var s66 = data2;
											$r = s66 != undefined;
											return $r;
										}($this)) && (function($this) {
											var $r;
											var s67 = i11 = data2.ns;
											$r = s67 != undefined;
											return $r;
										}($this))?document.createElementNS(i11,tag2):document.createElement(tag2);
										if(hash2 < dot2) elm12.id = sel2.slice(hash2 + 1,dot2);
										var s65 = "\\.";
										var rg2 = new RegExp(s65,"g");
										if(dotIdx2 > 0) {
											elm.className = sel.slice(dot+1).replace(rg, " ");;
										}
										if(Main["is"].array(children4)) {
											i11 = 0;
											if(i11 < children4.length) do elm12.appendChild(Main.createElm(children4[i11],insertedVnodeQueue)); while((function($this) {
												var $r;
												++i11;
												$r = i11 < children4.length;
												return $r;
											}($this)));
										} else if(Main["is"].primitive(vnode9.text)) elm12.appendChild(document.createTextNode(vnode9.text));
										var oldVnode5 = Main.emptyNode;
										var key22;
										var cur8;
										var old8;
										var elm13 = vnode9.elm;
										var oldAttrs4 = oldVnode5.data.attrs == null?{ }:oldVnode5.data.attrs;
										var attrs4 = vnode9.data.attrs == null?{ }:vnode9.data.attrs;
										var _g22 = 0;
										var _g112 = Reflect.fields(attrs4);
										while(_g22 < _g112.length) {
											var key23 = _g112[_g22];
											++_g22;
											cur8 = attrs4[key23];
											old8 = oldAttrs4[key23];
											if(old8 != cur8) {
												if(!cur8 && Attributes.booleanAttrsDict[key23]) elm13.removeAttribute(key23); else elm13.setAttribute(key23,cur8);
											}
										}
										var _g23 = 0;
										var _g113 = Reflect.fields(oldAttrs4);
										while(_g23 < _g113.length) {
											var key24 = _g113[_g23];
											++_g23;
											if(!Object.prototype.hasOwnProperty.call(attrs4,key24)) elm13.removeAttribute(key24);
										}
										var key25;
										var cur9;
										var old9;
										var elm14 = vnode9.elm;
										var oldProps4 = oldVnode5.data.props == null?{ }:oldVnode5.data.props;
										var props4 = vnode9.data.props == null?{ }:vnode9.data.props;
										var _g24 = 0;
										var _g114 = Reflect.fields(props4);
										while(_g24 < _g114.length) {
											var key26 = _g114[_g24];
											++_g24;
											cur9 = props4[key26];
											old9 = oldProps4[key26];
											if(old9 != cur9) {
												var value4 = cur9;
												elm14[key26] = value4;
											}
										}
										CssClasses.updateClass(oldVnode5,vnode9);
										Styles.updateStyle(oldVnode5,vnode9);
										if(vnode9.data != null) {
											i11 = vnode9.data.hook;
											if((function($this) {
												var $r;
												var s68 = i11;
												$r = s68 != undefined;
												return $r;
											}($this))) {
												if(i11.create) i11.create(Main.emptyNode,vnode9);
												if(i11.insert) insertedVnodeQueue.push(vnode9);
											}
										}
									} else elm12 = vnode9.elm = document.createTextNode(vnode9.text);
									$r = vnode9.elm;
									return $r;
								}(this)),oldStartVnode1.elm);
								newStartVnode1 = ch3[++newStartIdx1];
							} else {
								elmToMove1 = oldCh1[idxInOld1];
								Main.patchVnode(elmToMove1,newStartVnode1,insertedVnodeQueue);
								oldCh1[idxInOld1] = null;
								elm9.insertBefore(elmToMove1.elm,oldStartVnode1.elm);
								newStartVnode1 = ch3[++newStartIdx1];
							}
						}
						if(oldStartIdx1 > oldEndIdx1) {
							before1 = ch3[newEndIdx1 + 1] == undefined?null:ch3[newEndIdx1 + 1].elm;
							Main.addVnodes(elm9,before1,ch3,newStartIdx1,newEndIdx1,insertedVnodeQueue);
						} else if(newStartIdx1 > newEndIdx1) {
							var vnodes2 = oldCh1;
							var startIdx2 = oldStartIdx1;
							var y2;
							y2 = 0;
							if(startIdx2 <= oldEndIdx1) do {
								var i12;
								var listeners2;
								var rm4 = null;
								var ch4 = vnodes2[startIdx2];
								if((function($this) {
									var $r;
									var s69 = ch4;
									$r = s69 != undefined;
									return $r;
								}(this))) {
									if((function($this) {
										var $r;
										var s70 = ch4.sel;
										$r = s70 != undefined;
										return $r;
									}(this))) {
										var vnode10 = ch4;
										var i13 = vnode10.data;
										var j2;
										if((function($this) {
											var $r;
											var s71 = i13;
											$r = s71 != undefined;
											return $r;
										}(this))) {
											if((function($this) {
												var $r;
												var s72 = i13 = i13.hook;
												$r = s72 != undefined;
												return $r;
											}(this)) && (function($this) {
												var $r;
												var s73 = i13 = i13.destroy;
												$r = s73 != undefined;
												return $r;
											}(this))) i13(vnode10);
											Styles.applyDestroyStyle(vnode10);
											if((function($this) {
												var $r;
												var s74 = i13 = vnode10.children;
												$r = s74 != undefined;
												return $r;
											}(this))) {
												j2 = 0;
												if(j2 < vnode10.children.length) do Main.invokeDestroyHook(vnode10.children[j2]); while((function($this) {
													var $r;
													++j2;
													$r = j2 < vnode10.children.length;
													return $r;
												}(this)));
											}
										}
										var vnode11 = ch4;
										var rm5 = rm4;
										Styles.applyRemoveStyle(vnode11,rm5);
										if((function($this) {
											var $r;
											var s75 = i12 = ch4.data;
											$r = s75 != undefined;
											return $r;
										}(this)) && (function($this) {
											var $r;
											var s76 = i12 = i12.hook;
											$r = s76 != undefined;
											return $r;
										}(this)) && (function($this) {
											var $r;
											var s77 = i12 = i12.remove;
											$r = s77 != undefined;
											return $r;
										}(this))) i12(ch4,rm4); else rm4();
									} else elm9.removeChild(ch4.elm);
								}
							} while((function($this) {
								var $r;
								++startIdx2;
								$r = startIdx2 <= oldEndIdx1;
								return $r;
							}(this)));
						}
					}
				} else if((function($this) {
					var $r;
					var s78 = ch3;
					$r = s78 != undefined;
					return $r;
				}(this))) Main.addVnodes(elm9,null,ch3,0,ch3.length - 1,insertedVnodeQueue); else if((function($this) {
					var $r;
					var s79 = oldCh1;
					$r = s79 != undefined;
					return $r;
				}(this))) {
					var vnodes3 = oldCh1;
					var startIdx3 = 0;
					var endIdx1 = oldCh1.length - 1;
					var y3;
					y3 = 0;
					if(startIdx3 <= endIdx1) do {
						var i14;
						var listeners3;
						var rm6 = null;
						var ch5 = vnodes3[startIdx3];
						if((function($this) {
							var $r;
							var s80 = ch5;
							$r = s80 != undefined;
							return $r;
						}(this))) {
							if((function($this) {
								var $r;
								var s81 = ch5.sel;
								$r = s81 != undefined;
								return $r;
							}(this))) {
								var vnode12 = ch5;
								var i15 = vnode12.data;
								var j3;
								if((function($this) {
									var $r;
									var s82 = i15;
									$r = s82 != undefined;
									return $r;
								}(this))) {
									if((function($this) {
										var $r;
										var s83 = i15 = i15.hook;
										$r = s83 != undefined;
										return $r;
									}(this)) && (function($this) {
										var $r;
										var s84 = i15 = i15.destroy;
										$r = s84 != undefined;
										return $r;
									}(this))) i15(vnode12);
									Styles.applyDestroyStyle(vnode12);
									if((function($this) {
										var $r;
										var s85 = i15 = vnode12.children;
										$r = s85 != undefined;
										return $r;
									}(this))) {
										j3 = 0;
										if(j3 < vnode12.children.length) do Main.invokeDestroyHook(vnode12.children[j3]); while((function($this) {
											var $r;
											++j3;
											$r = j3 < vnode12.children.length;
											return $r;
										}(this)));
									}
								}
								var vnode13 = ch5;
								var rm7 = rm6;
								Styles.applyRemoveStyle(vnode13,rm7);
								if((function($this) {
									var $r;
									var s86 = i14 = ch5.data;
									$r = s86 != undefined;
									return $r;
								}(this)) && (function($this) {
									var $r;
									var s87 = i14 = i14.hook;
									$r = s87 != undefined;
									return $r;
								}(this)) && (function($this) {
									var $r;
									var s88 = i14 = i14.remove;
									$r = s88 != undefined;
									return $r;
								}(this))) i14(ch5,rm6); else rm6();
							} else elm9.removeChild(ch5.elm);
						}
					} while((function($this) {
						var $r;
						++startIdx3;
						$r = startIdx3 <= endIdx1;
						return $r;
					}(this)));
				}
			} else if(oldVnode4.text != vnode8.text) elm9.textContent = vnode8.text;
			if(hook1 != undefined && (function($this) {
				var $r;
				var s89 = i9 = hook1.postpatch;
				$r = s89 != undefined;
				return $r;
			}(this))) i9(oldVnode4,vnode8);
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
var Reflect = function() { };
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
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
Main["is"] = { array : Array.isArray, primitive : function(s) {
	return typeof s == "string" || typeof s == "number";
}};
Main.emptyNode = Main.vnode("",{ },[],null,null);
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
