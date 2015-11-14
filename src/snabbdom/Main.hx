package snabbdom;

using thx.Arrays;
import snabbdom.Patch.*;
import snabbdom.Jsx.jsx;

class Main {


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
        <div id="pippa">
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>
              <span>${txt}</span>
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


    var last_node = untyped js.Browser.document.getElementById('container');



    var timer = new haxe.Timer(30);
    timer.run = function() {


      var rnd = Math.random();
      var color = ['red','yellow','green','black','white','grey'].shuffle().first();
      var bg = ['red','yellow','green','black','white','grey'].shuffle().first();


      var max = Std.int(Math.random() * 10);
      var list = [for (x in (0...max)) jsx("<span>${x}</span>")  ];
      var vnode2 = jsx('
        <div id="pippa">
          <ul style="font-size:30px;color:$color;background-color:$bg">
            <li>#list</li>
            <li>
              <span>${max}</span>
            </li>
          </ul>
        </div>
      ');

      trace(vnode2);

      patch(last_node,untyped vnode2);
      last_node = vnode2;
    };

  }

}
