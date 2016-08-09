package snabbdom.engine.dom.plugins;

class Helpers {

    public static macro function next_frame(e:haxe.macro.Expr) {
        return macro js.Browser.window.requestAnimationFrame(function(i) {
            $e;
        });
    }
}