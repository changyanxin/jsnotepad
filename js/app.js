console.log('hhhhhhhhhhh');


var $notepad = $('#notepad');
var menubar = new Menubar();
var editor = new Editor();
var $editor = editor.init();
$notepad.append($editor);
var dlgFont = new DlgFont(editor);
var $dlgFont = dlgFont.init();
$notepad.after($dlgFont);
$notepad.click(menubar.hideMenu.bind(menubar));

