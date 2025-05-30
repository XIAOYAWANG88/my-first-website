// 1. 复制filter-sidebar内容到popup
function moveFilterSidebarToPopup() {
    var sidebar = document.querySelector('.filter-sidebar');
    var container = document.getElementById('filterSidebarContainer');
    if (sidebar && container && container.children.length === 0) {
      container.appendChild(sidebar);
    }
  }

  // 2. 打开弹窗
  document.getElementById('openFilterPopup').onclick = function() {
    moveFilterSidebarToPopup();
    document.getElementById('filterPopup').style.display = 'block';
    document.body.style.overflow = 'hidden';
  };
  document.getElementById('openFilterPopup').onclick = function() {
    moveFilterSidebarToPopup();
    document.getElementById('filterPopup').style.display = 'block';
    document.body.style.overflow = 'hidden';
  };
  // 3. 关闭弹窗
  document.getElementById('filterPopupClose').onclick = function() {
    document.getElementById('filterPopup').style.display = 'none';
    document.body.style.overflow = '';
  };
  document.getElementById('filterPopupMask').onclick = function() {
    document.getElementById('filterPopup').style.display = 'none';
    document.body.style.overflow = '';
  };
  document.getElementById('show-result').onclick = function() {
    document.getElementById('filterPopup').style.display = 'none';
    document.body.style.overflow = '';
  };