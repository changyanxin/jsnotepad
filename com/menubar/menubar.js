function Menubar() {
  // 元素
  this.$menubar = null;
  this.$menus = [];

  // 菜单显示状态
  this.openMenu = -1;

  // 初始化
  this.init = function (menuData) {
    // 添加元素
    var $menubar = $('<div class="menubar"></div>');
    // 添加 menu-title
    var $menu_title = $('<ul class="menu_title">');
    for (var i = 0; i < menuData.length; i++) {
      var $li = $(`<li>${menuData[i].title}</li>`);
      // 绑定点击事件和滑动事件
      $li.click(this.showMenu.bind(this, i));
      $li.mouseover(this.showMenu.bind(this, i));
      $menu_title.append($li);
    }
    $menubar.append($menu_title);
    // 添加menus
    for (var i = 0; i < menuData.length; i++) {
      var $menu = $('<ul class="menu"></ul>');
      for (var j = 0; j < menuData[i].menuItems.length; j++) {
        if (menuData[i].menuItems[j].title == 'hr') {
          var $menu_item = $('<li class="menu_hr"></li>');
        } else {
          var $menu_item = $(`<li class="menu_item">${menuData[i].menuItems[j].title}<span class="shortcut">${menuData[i].menuItems[j].shortcut}</span></li>`);
          // 绑定点击事件
          $menu_item.click(menuData[i].menuItems[j].handler);
        }
        $menu.append($menu_item);
      }
      $menu.css('width', menuData[i].width);
      $menu.css('left', 62 * i);
      $menubar.append($menu);
      this.$menus.push($menu);
    }
    this.$menubar = $menubar;
    return $menubar;
  };
  // 显示第 index 个菜单
  this.showMenu = function (index, e) {
    e.stopPropagation();
    if (e.type == 'click' && this.openMenu > -1) {
      this.hideMenu();
    } else if (e.type == 'click' || this.openMenu > -1) {
      this.openMenu = index;
      for (var i = 0; i < this.$menus.length; i++) {
        if (i == index) {
          this.$menus[i].addClass('active');
        } else {
          this.$menus[i].removeClass('active');
        }
      }
    }
  };
  // 隐藏菜单
  this.hideMenu = function () {
    this.openMenu = -1;
    for (var i = 0; i < this.$menus.length; i++) {
      this.$menus[i].removeClass('active');
    }
  };
}
