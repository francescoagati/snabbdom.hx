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
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIterator.prototype = {
	hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
};
var Reflect = function() { };
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
var Std = function() { };
Std["int"] = function(x) {
	return x | 0;
};
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
var js_Browser = function() { };
js_Browser.get_window = function() {
	return window;
};
js_Browser.get_document = function() {
	return window.document;
};
var snabbdom_Main = function() { };
snabbdom_Main.main = function() {
	var txt = "testo";
	var vnode = { sel : "div", data : { attrs : { id : "pippa"}}, children : [{ sel : "ul", data : { attrs : { }}, children : [{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "1"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "2"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "3"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "4"},{ sel : "li", data : { attrs : { }}, children : null, elm : null, key : null, text : "5"},{ sel : "li", data : { attrs : { }}, children : [{ sel : "span", data : { attrs : { }}, children : null, elm : null, key : null, text : txt}], elm : null, key : null, text : null}], elm : null, key : null, text : null}], elm : null, key : null, text : null};
	var last_node = js_Browser.get_document().getElementById("container");
	var timer = new haxe_Timer(3000);
	timer.run = function() {
		var rnd = Math.random();
		var color = thx_Arrays.first(thx_Arrays.shuffle(["red","yellow","green","black","white","grey"]));
		var bg = thx_Arrays.first(thx_Arrays.shuffle(["red","yellow","green","black","white","grey"]));
		var max = Std["int"](Math.random() * 10);
		var list = (function($this) {
			var $r;
			var _g = [];
			var $it0 = new IntIterator(0,max);
			while( $it0.hasNext() ) {
				var x = $it0.next();
				_g.push({ sel : "span", data : { attrs : { }}, children : null, elm : null, key : null, text : x});
			}
			$r = _g;
			return $r;
		}(this));
		var vnode2 = { sel : "div", data : { attrs : { id : "pippa"}}, children : [{ sel : "ul", data : { attrs : { }, style : { fontSize : "30px", color : color, backgroundColor : bg}}, children : [{ sel : "li", data : { attrs : { }}, children : list, elm : null, key : null, text : null},{ sel : "li", data : { attrs : { }}, children : [{ sel : "span", data : { attrs : { }}, children : null, elm : null, key : null, text : max}], elm : null, key : null, text : null}], elm : null, key : null, text : null}], elm : null, key : null, text : null};
		console.log(vnode2);
		snabbdom_Patch.patch(last_node,vnode2);
		last_node = vnode2;
	};
};
var snabbdom_Patch = function() { };
snabbdom_Patch.vnode = function(sel,data,children,text,elm) {
	var key = data == null?null:data.key;
	return { sel : sel, data : data, children : children, text : text, elm : elm, key : key};
};
snabbdom_Patch.emptyNodeAt = function(elm) {
	return snabbdom_Patch.vnode(elm.tagName,{ },[],null,elm);
};
snabbdom_Patch.sameVnode = function(vnode1,vnode2) {
	return vnode1.key == vnode2.key && vnode1.sel == vnode2.sel;
};
snabbdom_Patch.createKeyToOldIdx = function(children,beginIdx,endIdx) {
	var i;
	var map = { };
	var key;
	i = beginIdx;
	if(i <= endIdx) do {
		key = children[i].key;
		if(key != undefined) map[key] = i;
	} while((function($this) {
		var $r;
		++i;
		$r = i <= endIdx;
		return $r;
	}(this)));
	return map;
};
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
		elm = vnode.elm = data != undefined && (i = data.ns) != undefined?document.createElementNS(i,tag):document.createElement(tag);
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
		} else if(typeof vnode.text == "string" || typeof vnode.text == "number") elm.appendChild(document.createTextNode(vnode.text));
		snabbdom_plugins_dom_Hooks.create(snabbdom_Patch.emptyNode,vnode);
		if(vnode.data != null) {
			i = vnode.data.hook;
			if(i != undefined) {
				if(i.create) i.create(snabbdom_Patch.emptyNode,vnode);
				if(i.insert) insertedVnodeQueue.push(vnode);
			}
		}
	} else elm = vnode.elm = document.createTextNode(vnode.text);
	return vnode.elm;
};
snabbdom_Patch.addVnodes = function(parentElm,before,vnodes,startIdx,endIdx,insertedVnodeQueue) {
	var new_node;
	if(startIdx <= endIdx) while(true) {
		new_node = snabbdom_Patch.createElm(vnodes[startIdx],insertedVnodeQueue);
		parentElm.insertBefore(new_node,before);
		var tmp;
		++startIdx;
		tmp = startIdx <= endIdx;
		if(!tmp) break;
	}
};
snabbdom_Patch.invokeDestroyHook = function(vnode) {
	var i = vnode.data;
	var j;
	if(i != undefined) {
		if((i = i.hook) != undefined && (i = i.destroy) != undefined) i(vnode);
		snabbdom_plugins_dom_Hooks.destroy(vnode);
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
snabbdom_Patch.removeVnodes = function(parentElm,vnodes,startIdx,endIdx) {
	var y;
	y = 0;
	if(startIdx <= endIdx) do {
		var i;
		var listeners;
		var rm = null;
		var ch = vnodes[startIdx];
		if(ch != undefined) {
			if(ch.sel != undefined) {
				snabbdom_Patch.invokeDestroyHook(ch);
				snabbdom_plugins_dom_Hooks.remove(ch,rm);
				if((i = ch.data) != undefined && (i = i.hook) != undefined && (i = i.remove) != undefined) i(ch,rm); else {
					console.log("remove");
					if(rm != null) rm();
					parentElm.removeChild(ch.elm);
				}
			} else parentElm.removeChild(ch.elm);
		}
	} while((function($this) {
		var $r;
		++startIdx;
		$r = startIdx <= endIdx;
		return $r;
	}(this)));
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
	while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) if(oldStartVnode == undefined) oldStartVnode = oldCh[++oldStartIdx]; else if(oldEndVnode == undefined) oldEndVnode = oldCh[--oldEndIdx]; else if(snabbdom_Patch.sameVnode(oldStartVnode,newStartVnode)) {
		snabbdom_Patch.patchVnode(oldStartVnode,newStartVnode,insertedVnodeQueue);
		oldStartVnode = oldCh[++oldStartIdx];
		newStartVnode = newCh[++newStartIdx];
	} else if(snabbdom_Patch.sameVnode(oldEndVnode,newEndVnode)) {
		snabbdom_Patch.patchVnode(oldEndVnode,newEndVnode,insertedVnodeQueue);
		oldEndVnode = oldCh[--oldEndIdx];
		newEndVnode = newCh[--newEndIdx];
	} else if(snabbdom_Patch.sameVnode(oldStartVnode,newEndVnode)) {
		snabbdom_Patch.patchVnode(oldStartVnode,newEndVnode,insertedVnodeQueue);
		parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling);
		oldStartVnode = oldCh[++oldStartIdx];
		newEndVnode = newCh[--newEndIdx];
	} else if(snabbdom_Patch.sameVnode(oldEndVnode,newStartVnode)) {
		snabbdom_Patch.patchVnode(oldEndVnode,newStartVnode,insertedVnodeQueue);
		parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm);
		oldEndVnode = oldCh[--oldEndIdx];
		newStartVnode = newCh[++newStartIdx];
	} else {
		if(oldKeyToIdx == undefined) oldKeyToIdx = snabbdom_Patch.createKeyToOldIdx(oldCh,oldStartIdx,oldEndIdx);
		idxInOld = oldKeyToIdx[newStartVnode.key];
		if(idxInOld == undefined) {
			var new_node = snabbdom_Patch.createElm(newStartVnode,insertedVnodeQueue);
			parentElm.insertBefore(new_node,oldStartVnode.elm);
			newStartVnode = newCh[++newStartIdx];
		} else {
			elmToMove = oldCh[idxInOld];
			snabbdom_Patch.patchVnode(elmToMove,newStartVnode,insertedVnodeQueue);
			oldCh[idxInOld] = null;
			parentElm.insertBefore(elmToMove.elm,oldStartVnode.elm);
			newStartVnode = newCh[++newStartIdx];
		}
	}
	if(oldStartIdx > oldEndIdx) {
		before = newCh[newEndIdx + 1] == undefined?null:newCh[newEndIdx + 1].elm;
		snabbdom_Patch.addVnodes(parentElm,before,newCh,newStartIdx,newEndIdx,insertedVnodeQueue);
	} else if(newStartIdx > newEndIdx) snabbdom_Patch.removeVnodes(parentElm,oldCh,oldStartIdx,oldEndIdx);
};
snabbdom_Patch.patchVnode = function(oldVnode,vnode,insertedVnodeQueue) {
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
		snabbdom_plugins_dom_Hooks.update(oldVnode,vnode);
		i = vnode.data.hook;
		if(i != undefined && (i = i.update) != undefined) i(oldVnode,vnode);
	}
	if(vnode.text == undefined) {
		if(oldCh != undefined && ch != undefined) {
			if(oldCh != ch) snabbdom_Patch.updateChildren(elm,oldCh,ch,insertedVnodeQueue);
		} else if(ch != undefined) snabbdom_Patch.addVnodes(elm,null,ch,0,ch.length - 1,insertedVnodeQueue); else if(oldCh != undefined) snabbdom_Patch.removeVnodes(elm,oldCh,0,oldCh.length - 1);
	} else if(oldVnode.text != vnode.text) elm.textContent = vnode.text;
	if(hook != undefined && (i = hook.postpatch) != undefined) i(oldVnode,vnode);
};
snabbdom_Patch.patch = function(oldVnode,vnode) {
	var i;
	var insertedVnodeQueue = [];
	if(oldVnode instanceof Element) {
		if(oldVnode.parentElement != null) {
			snabbdom_Patch.createElm(vnode,insertedVnodeQueue);
			oldVnode.parentElement.replaceChild(vnode.elm,oldVnode);
		} else {
			oldVnode = snabbdom_Patch.emptyNodeAt(oldVnode);
			snabbdom_Patch.patchVnode(oldVnode,vnode,insertedVnodeQueue);
		}
	} else snabbdom_Patch.patchVnode(oldVnode,vnode,insertedVnodeQueue);
	i = 0;
	if(i < insertedVnodeQueue.length) do insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]); while((function($this) {
		var $r;
		++i;
		$r = i < insertedVnodeQueue.length;
		return $r;
	}(this)));
	return vnode;
};
var snabbdom_plugins_dom_Attributes = function() { };
snabbdom_plugins_dom_Attributes.updateAttrs = function(oldVnode,vnode) {
	var key;
	var cur;
	var old;
	var elm = vnode.elm;
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
			if(!cur && snabbdom_plugins_dom_Attributes.booleanAttrsDict[key1]) elm.removeAttribute(key1); else elm.setAttribute(key1,cur);
		}
	}
	var _g2 = 0;
	var _g11 = Object.keys(oldAttrs);
	while(_g2 < _g11.length) {
		var key2 = _g11[_g2];
		++_g2;
		if(!Reflect.hasField(attrs,key2)) elm.removeAttribute(key2);
	}
};
snabbdom_plugins_dom_Attributes.create = function(oldVnode,vnode) {
	snabbdom_plugins_dom_Attributes.updateAttrs(oldVnode,vnode);
};
snabbdom_plugins_dom_Attributes.update = function(oldVnode,vnode) {
	snabbdom_plugins_dom_Attributes.updateAttrs(oldVnode,vnode);
};
var snabbdom_plugins_dom_CssClasses = function() { };
snabbdom_plugins_dom_CssClasses.updateClass = function(oldVnode,vnode) {
	var cur;
	var name;
	var elm = vnode.elm;
	var oldClass = oldVnode.data.classes == null?{ }:oldVnode.data.classes;
	var klass = vnode.data.classes == null?{ }:vnode.data.classes;
	var _g = 0;
	var _g1 = Object.keys(klass);
	while(_g < _g1.length) {
		var name1 = _g1[_g];
		++_g;
		cur = klass[name1];
		if(cur != oldClass[name1]) {
			if(cur == "add") elm.classList.add(name1); else if(cur == "remove") elm.classList.remove(name1);
		}
	}
};
snabbdom_plugins_dom_CssClasses.create = function(oldVnode,vnode) {
	snabbdom_plugins_dom_CssClasses.updateClass(oldVnode,vnode);
};
snabbdom_plugins_dom_CssClasses.update = function(oldVnode,vnode) {
	snabbdom_plugins_dom_CssClasses.updateClass(oldVnode,vnode);
};
var snabbdom_plugins_dom_Hooks = function() { };
snabbdom_plugins_dom_Hooks.create = function(oldVnode,vnode) {
	snabbdom_plugins_dom_Attributes.create(oldVnode,vnode);
	snabbdom_plugins_dom_Props.create(oldVnode,vnode);
	snabbdom_plugins_dom_CssClasses.create(oldVnode,vnode);
	snabbdom_plugins_dom_Styles.create(oldVnode,vnode);
};
snabbdom_plugins_dom_Hooks.update = function(oldVnode,vnode) {
	snabbdom_plugins_dom_Attributes.update(oldVnode,vnode);
	snabbdom_plugins_dom_Props.update(oldVnode,vnode);
	snabbdom_plugins_dom_CssClasses.update(oldVnode,vnode);
	snabbdom_plugins_dom_Styles.update(oldVnode,vnode);
};
snabbdom_plugins_dom_Hooks.destroy = function(vnode) {
	snabbdom_plugins_dom_Styles.destroy(vnode);
};
snabbdom_plugins_dom_Hooks.remove = function(vnode,rm) {
	snabbdom_plugins_dom_Styles.remove(vnode,rm);
};
var snabbdom_plugins_dom_Props = function() { };
snabbdom_plugins_dom_Props.updateProps = function(oldVnode,vnode) {
	var key;
	var cur;
	var old;
	var elm = vnode.elm;
	var oldProps = oldVnode.data.props == null?{ }:oldVnode.data.props;
	var props = vnode.data.props == null?{ }:vnode.data.props;
	var _g = 0;
	var _g1 = Object.keys(props);
	while(_g < _g1.length) {
		var key1 = _g1[_g];
		++_g;
		cur = props[key1];
		old = oldProps[key1];
		if(old != cur) {
			var value = cur;
			Reflect.setField(elm,key1,value);
		}
	}
};
snabbdom_plugins_dom_Props.create = function(oldVnode,vnode) {
	snabbdom_plugins_dom_Props.updateProps(oldVnode,vnode);
};
snabbdom_plugins_dom_Props.update = function(oldVnode,vnode) {
	snabbdom_plugins_dom_Props.updateProps(oldVnode,vnode);
};
var snabbdom_plugins_dom_Styles = function() { };
snabbdom_plugins_dom_Styles.raf = function(fn) {
	js_Browser.get_window().requestAnimationFrame(fn);
};
snabbdom_plugins_dom_Styles.nextFrame = function(fn) {
	snabbdom_plugins_dom_Styles.raf(function(i) {
		snabbdom_plugins_dom_Styles.raf(fn);
	});
};
snabbdom_plugins_dom_Styles.setNextFrame = function(obj,prop,val) {
	snabbdom_plugins_dom_Styles.nextFrame(function(i) {
		var value = val;
		Reflect.setField(obj,prop,value);
	});
};
snabbdom_plugins_dom_Styles.updateStyle = function(oldVnode,vnode) {
	var cur;
	var name;
	var elm = vnode.elm;
	var oldStyle = oldVnode.data.style == null?{ }:oldVnode.data.style;
	var style = vnode.data.style == null?{ }:vnode.data.style;
	var oldHasDel = Reflect.hasField(oldStyle,"delayed");
	var _g = 0;
	var _g1 = Object.keys(style);
	while(_g < _g1.length) {
		var name1 = _g1[_g];
		++_g;
		cur = style[name1];
		if(name1 == "delayed") {
			var delayed = style.delayed;
			var oldDelayed = oldStyle.delayed;
			var _g2 = 0;
			var _g3 = Object.keys(delayed);
			while(_g2 < _g3.length) {
				var name2 = _g3[_g2];
				++_g2;
				cur = delayed[name2];
				if(!oldHasDel || cur != oldDelayed[name2]) snabbdom_plugins_dom_Styles.setNextFrame(elm.style,name2,cur);
			}
		} else if(name1 != "remove" && cur != oldStyle[name1]) elm.style[name1] = cur;
	}
};
snabbdom_plugins_dom_Styles.applyDestroyStyle = function(vnode) {
	var style = null;
	var name;
	var elm = vnode.elm;
	var s = vnode.data.style;
	if(s == null) return;
	style = s.destroy;
	if(style == null) return;
	var _g = 0;
	var _g1 = Object.keys(style);
	while(_g < _g1.length) {
		var name1 = _g1[_g];
		++_g;
		elm.style[name1] = style[name1];
	}
};
snabbdom_plugins_dom_Styles.applyRemoveStyle = function(vnode,rm) {
	var s = vnode.data.style;
	if(!s || !s.remove) {
		if(rm != null) rm();
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
	var _g1 = Object.keys(style);
	while(_g < _g1.length) {
		var name1 = _g1[_g];
		++_g;
		applied.push(name1);
		elm.style[name1] = style[name1];
	}
	compStyle = js_Browser.get_window().getComputedStyle(elm);
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
snabbdom_plugins_dom_Styles.create = function(oldVnode,vnode) {
	snabbdom_plugins_dom_Styles.updateStyle(oldVnode,vnode);
};
snabbdom_plugins_dom_Styles.update = function(oldVnode,vnode) {
	snabbdom_plugins_dom_Styles.updateStyle(oldVnode,vnode);
};
snabbdom_plugins_dom_Styles.destroy = function(vnode) {
	snabbdom_plugins_dom_Styles.applyDestroyStyle(vnode);
};
snabbdom_plugins_dom_Styles.remove = function(vnode,rm) {
	snabbdom_plugins_dom_Styles.applyRemoveStyle(vnode,rm);
};
var thx_Arrays = function() { };
thx_Arrays.first = function(array) {
	return array[0];
};
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
snabbdom_Patch.emptyNode = snabbdom_Patch.vnode("",{ },[],null,null);
snabbdom_plugins_dom_Attributes.booleanAttrs = ["allowfullscreen","async","autofocus","autoplay","checked","compact","controls","declare","default","defaultchecked","defaultmuted","defaultselected","defer","disabled","draggable","enabled","formnovalidate","hidden","indeterminate","inert","ismap","itemscope","loop","multiple","muted","nohref","noresize","noshade","novalidate","nowrap","open","pauseonexit","readonly","required","reversed","scoped","seamless","selected","sortable","spellcheck","translate","truespeed","typemustmatch","visible"];
snabbdom_plugins_dom_Attributes.booleanAttrsDict = (function($this) {
	var $r;
	var hash = { };
	var len = snabbdom_plugins_dom_Attributes.booleanAttrs.length;
	var i = 0;
	{
		i = 0;
		if(i < len) do Reflect.setField(hash,snabbdom_plugins_dom_Attributes.booleanAttrs[i],true); while((function($this) {
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
