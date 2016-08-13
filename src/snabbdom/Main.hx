package snabbdom;

import snabbdom.engine.dom.PatchDom.*;
import snabbdom.Jsx.jsx;
import snabbdom.PatchHelper.*;
using snabbdom.engine.dom.PatchDom;
using thx.Arrays;
using snabbdom.Jsx;

class Main {

  public static function click(e) {
    trace('click');
  }

  public static function over(e) {
    trace('over');
  }

  public static function out(e) {
    trace('out');
  }

  public static function main() {

/*
    var  x = H.h('ul',{},
        H.h('li',{}),
        H.h('li',{}),
        H.h('li',{}),
        H.h('li',{}),
        H.h('li',{}),
        H.h('li',{},H.h('span',{}))
      );
      untyped ddd(x);
*/


      var txt = 'testo';

      var vnode = jsx('
        <div id="pippa" >
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>
              <span  onclick=${click}>${txt}</span>
            </li>
          </ul>
        </div>
      ');

/*
    var vnode = untyped h('div#conta.two.classes', {on: {click: function() {}}}, [
      h('span', {style: {fontWeight: 'bold'}}, 'This is bold'),
      ' and this is just normal text',
      h('a', {props: {href: '/foo'}}, 'I\'ll take you places!')
    ]);
*/


    var last_node:snabbdom.engine.dom.VirtualNodeDom = null;
    var last_node2:snabbdom.engine.dom.VirtualNodeDom = null;

    var cache:snabbdom.engine.dom.CacheDom = 0;
    cache = cache.add(cacheAll);
    cache = cache.add(cacheStyle);


    var init:Int = null;
    var timer = new haxe.Timer(50);

    timer.run = function() {



      var rnd = Math.random();
      var color = ['red','yellow','green','black','white','grey'].shuffle().first();
      var bg = ['red','yellow','green','black','white','grey'].shuffle().first();

      var max = 50; //Std.int((Math.random() * 200));
      if (max <=3) max = 4;
      init = if (init == null) 0; else 3;
      var list = [for (x in (init...max)) {
        var key = 'key - $x';
        var random = Math.random() * 5000;
        jsx('<li cippalippa="ciaone" key="${key}" style="border:10px solid green"><span style="color:white">${random}</span></li>');
      }];
      var vnode2 = jsx('
        <div id="pippa" style="color:black" onmouseout=$out onclick=$click onmouseover=${over}>
          <span>${max}</span>
          <ul style="font-size:30px;color:white;background-color:$bg">
            #list
          </ul>
        </div>
      ');


      if (last_node == null)
        js.Browser.document.getElementById('container').patchDom(untyped vnode2);
      else
        last_node.patch(untyped vnode2);

      untyped last_node = vnode2;

    };

  }

}
