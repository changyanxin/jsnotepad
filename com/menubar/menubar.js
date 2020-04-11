var $menubar = $(function(){
  var $menus = [];// 存放五个下拉菜单的 DOM 对象
  var $active = -1;// 下拉菜单是否展开，没有展开为：-1
  var $bar = $('<div class="notepad-menubar"></div>');

  function show(menuData){
    var $titles = $('<ul class="menu-title">');

    for (var i = 0; i < menuData.length; i ++) {
      var $title = $("<li class='title'>" + menuData[i].title + "</li>");
      $title.click(function(){
        var $this= $(this);
        pullMenu.bind($this, i);
      });
      $title.mouseover(function(){
          var $this= $(this);
          pullMenu.bind($this, i);
      });
      $titles.append($title);
    }
    $bar.append($titles);

    for (var i = 0; i < menuData.length; i ++) {
      var $menus = $('<ul class="menus"></ul>'),
          items = menuData[i].menuItems;
          
      for (var j = 0; j < items.length; j ++) {
        if (items[j].title == 'hr') {
          var $hr = $('<li class="menu-hr"></li>');
          $menus.append($hr);
        }
        else {
          var $menu = $("<li class='menu-item'>" + menuData[i].menuItems[j].title + "<span class='shortcut'>" + menuData[i].menuItems[j].shortcut + "</span>" + "</li>");
          $menu.click(items[j].handler);
        }
        $menus.append($menu);
      }
      $menus.css('width', menuData[i].width);
      $menus.css('left', 57 * i);
      $bar.append($menus);
      $menus1.push($menus);
    }
  }

  function pullMenu (index, event) {
    event.stopPropagation();
    if (event.type == 'click' && $active > -1) {
      hideMenu();
    }else if(event.type == 'click' || $active > -1) {
      $active = index;
      for(var i = 0; i < $menus1.length; i ++) {
        if(i == index) {
          $menus1[i].addClass('active');
        }else{
          $menus1[i].removeClass('active');
        }
      }
    }
  }

  function hideMenu() {
    $active = -1;
    for (var i = 0; i < $menus1.length; i ++) {
      $menus1[i].removeClass('active');
    }
  };
  return {
    show:show,
    hideMenu:hideMenu,
    pullMenu:pullMenu
  }
}())

