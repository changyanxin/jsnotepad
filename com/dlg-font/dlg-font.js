$dlgFont=$(function(editor){
  var $editor = editor;
  var $textarea = editor.$textarea;
  var fonts = ['Agency FB', 'Algerian', 'Arial', 'Arial Rounded MT', 'Axure Handwriting', 'Bahnschrift', 'Baskerville Old Face', 'Bauhaus 93', 
              'Bell MT', 'Berlin Sans FB', 'Bernard MT', 'BlackAdder ITC'];
  var styles = ['常规', '斜体', '粗体', '粗偏斜体'];
  var sizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];
  var $selectBoxInput = [];
  var $selectBoxList = [[], [], []];
  var $sample_txt = $('<p class="sample-txt">AaBbYyZz</p>');
  var nowFont = [0, 0, 0];
  var newFont = [0, 0, 0];

  function show(){
      var $notepad_dlg_font = $('<div class="notepad-dlg-mask notepad-dlg-font"></div>');
      var $dialogbox = $('<div class="dialogbox notepad-dlgbox"></div>');
      var $notepad_dlg_titlebar = $('<div class="notepad-dlg-titlebar"></div>');
      var $title = $('<div class="zititle">字体</div>');
      var $close_btn = $('<div class="close-btn" title="关闭">✖</div>');
      var $main = $('<div class="main notepad-dlg-main"></div>');
      var $selectBox = $('<div class="notepad-dlg-select"></div>');
      var $sample = $('<fieldset class="sample"></fieldset>');
      var $script = $('<div class="script"></div>');
      var $select = $('<select></select>');
      var $btn_ok = $('<input class="btn-ok" type="button" value="确定">');
      var $btn_cancel = $('<input class="btn-cancel" type="button" value="取消">');
      var $sample_txt = $sample_txt;
      var dlgTitle = [
          {
            title: '字体(F):',
            list: fonts,
            value: 2
          },
          {
            title: '字形(Y):',
            list: styles,
            value: 0
          },
          {
            title: '大小(S):',
            list: sizes,
            value: 6
          }
        ];

    $sample.append($('<legend>示例</legend>')).append($sample_txt);
    $script.append($('<span>脚本(R):</span><br>'));
    $select.append($('<option value="西欧语言">西欧语言</option>'))
    $select.append($('<option value="中文 GB2312">中文 GB2312</option>'));
    $script.append($select);

    $main.append($selectBox).append($sample).append($script).append($btn_ok).append($btn_cancel);

    $notepad_dlg_titlebar.mousedown(function (md) {
            var top = $dialogbox.position().top,
                left = $dialogbox.position().left;
            if (md.button == 0) {
              $notepad_dlg_font.mousemove(function (mm) {
                var cssleft = mm.pageX - md.pageX + left + 'px';
                var csstop = mm.pageY - md.pageY + top + 'px';
                $dialogbox.css('left', cssleft);
                $dialogbox.css('top', csstop);
              });
              $notepad_dlg_font.mouseup(function () {
                $notepad_dlg_font.off('mousemove');
                $notepad_dlg_font.off('mouseup');
              });
            }
    });
    $dialogbox.append($notepad_dlg_titlebar);
    $close_btn.click(closefontbox.bind($(this)));
    $notepad_dlg_titlebar.append($title);
    $notepad_dlg_titlebar.append($close_btn);

    for (var i = 0; i < dlgTitle.length; i ++) {
      var $selectTitle = $("<span>" + dlgTitle[i].title + "</span>"),
          $selectInput = $("<input class='zibox' type='text'>"),
          $selectList = $("<ul class='ullist'></ul>");
      for (var j = 0; j < dlgTitle[i].list.length; j ++) {
        var list = dlgTitle[i].list[j],
            $list = $("<li class='list'>" + list + "</li>");
        if (i == 0) {
          $list.css('font-family', list);
        }
        else if (i == 1) {
          changeZi($list, j);
        }
        $list.click(selectLi.bind($(this), i, j));
        $selectBoxList[i].push($list);
        $selectList.append($list);
      }
      $selectBoxInput.push($selectInput);
      selectLi(i, dlgTitle[i].value);
      $selectBox.append($selectTitle);
      $selectBox.append($selectInput);
      $selectBox.append($selectList);
    }

    ok();

    $btn_ok.click(function () {
      ok();
      closefontbox();
    }.bind($(this)));
    
    $btn_cancel.click(closefontbox.bind($(this)));

    $dialogbox.append($main);
    $notepad_dlg_font.append($dialogbox);
    return $notepad_dlg_font;
  };

  function openfontbox() {
    $notepad_dlg_font.addClass('show');
  };
  
  function closefontbox() {
    $notepad_dlg_font.removeClass('show');
  };

  function ok() {
    nowFont = newFont;
    $textarea.css('font-family', fonts[newFont[0]]);
    changeZi($textarea, newFont[1]);
    $textarea.css('font-size', sizes[newFont[2]] + 'px');
  };

  function changeZi(dui, i) {
    if (i == 0) {
      dui.css('font-style', 'normal');
      dui.css('font-weight', 'normal');
    }
    else if (i == 1) {
      dui.css('font-style', 'italic');
      dui.css('font-weight', 'normal');
    }
    else if (i == 2) {
      dui.css('font-style', 'normal');
      dui.css('font-weight', 'bold');
    }
    else if (i == 3) {
      dui.css('font-style', 'italic');
      dui.css('font-weight', 'bold');
    }
  };

  function changeZi (i, j) {
    for (var m = 0; m < $selectBoxList[i].length; m ++) {
      if (m == j) {
        $selectBoxList[i][m].addClass('selected');
      }
      else {
        $selectBoxList[i][m].removeClass('selected');
      }
    }
    newFont[i] = j;
    if (i == 0) {
      $selectBoxInput[i].val(fonts[j]);
      $sample_txt.css('font-family', fonts[j]);
    }
    else if (i == 1) {
      $selectBoxInput[i].val(styles[j]);
      changeZi($sample_txt, j);
    }
    else if (i == 2) {
      $selectBoxInput[i].val(sizes[j]);
      $sample_txt.css('font-size', sizes[j] + 'px');
    }
  };

  return {
    show:show
  }
  
}())
