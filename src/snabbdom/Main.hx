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

  var container = untyped js.Browser.document.getElementById('container');

  patch(untyped container,vnode);

    var last_node = vnode;



    var timer = new haxe.Timer(16);
    timer.run = function() {



        var rnd = Math.random();
        var color = ['red','yellow','green','black','white','grey'].shuffle().first();
        var bg = ['red','yellow','green','black','white','grey'].shuffle().first();
        var vnode2 = jsx('
          <div id="pippa">
            <ul style="font-size:30px;color:$color;background-color:$bg">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>2</li>
              <li>5</li>
              <li>
                <span>${rnd}</span>
              </li>
            </ul>
          </div>
      ');

      patch(last_node,untyped vnode2);
      last_node = vnode2;
    };

  }

}
