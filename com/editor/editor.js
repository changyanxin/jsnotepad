
$editor=$(function(){
  function editor(){
    var $app = $('#notepad-app');
    var $editor = $('<div class="notepad-editor"></div>');
    var $textarea = $('<textarea spellcheck="false" auto-size="none" wrap="off"></textarea>');
    $editor.append($textarea);
    $app.append($editor);
  }
  return {
    editor:editor
  }
}());