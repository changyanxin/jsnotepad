$(function(){
    $menubar.show();
    $editor.editor();
    $dlgFont.show();

    var $app = $('body');
    $app.click($menubar.hideMenu())
}())