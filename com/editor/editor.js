function Editor () {
  // 元素
  this.$editor = $('<div class="editor"></div>');
  this.$textarea = $('<textarea spellcheck="false" auto-size="none" wrap="off"></textarea>');

  // 初始化
  this.init = function () {
    this.$editor.append(this.$textarea);
    return this.$editor;
  };

}
