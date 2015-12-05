package snabbdom;

using thx.Arrays;
using snabbdom.Jsx;
import snabbdom.engine.dom.PatchDom.*;
import snabbdom.Jsx.jsx;
using snabbdom.engine.dom.PatchDom;
class Main {

  public static function click() {
    js.Browser.alert('click');
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
              <span onclick=${click}>${txt}</span>
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



    var timer = new haxe.Timer(1000);
    timer.run = function() {


      var rnd = Math.random();
      var color = ['red','yellow','green','black','white','grey'].shuffle().first();
      var bg = ['red','yellow','green','black','white','grey'].shuffle().first();


      var max = Std.int(Math.random() * 1000);
      var list = [for (x in (0...max)) jsx("<li><span>${x}</span></li>")  ];
      var vnode2 = jsx('
        <div id="pippa">
          <span>${max}</span>
          <ul style="font-size:30px;color:$color;background-color:$bg">
            #list
          </ul>
        </div>
      ');

      if (last_node == null) js.Browser.document.getElementById('container').patchDom(vnode2);   else  last_node.patch(untyped vnode2);
      last_node = vnode2;
    };

  }

}
