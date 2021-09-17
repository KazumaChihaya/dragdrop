var drag_type = null;

// 位置取得
function clickPosition(e) {
  return {x: e.clientX, y: e.clientY};
}
function touchPosition(e) {
  const touch = e.changedTouches[0];
  return {x: touch.pageX - window.pageXOffset, y: touch.pageY - window.pageYOffset};
}

// ドラッグ開始
$('.dragdrop_origin').on('mousedown', function(e) {
  e.preventDefault();
  startDragSource(e, clickPosition(e));
});
$('.dragdrop_origin').on('touchstart', function(e) {
  e.preventDefault();
  startDragSource(e, touchPosition(e));
});
function startDragSource(e, offset) {
  var drag_origin_element = document.elementFromPoint(offset.x, offset.y);
  if (drag_origin_element !== null && drag_origin_element.classList.contains('dragdrop_origin')) {
    e.preventDefault();
    drag_type = drag_origin_element.dataset.drag_type;
    startDrag(drag_origin_element.dataset);
  }
}


// ドラッグ中
$(document).on('mousemove', function(e) {
  draggingSource(e, clickPosition(e));
});
$(document).on('touchmove', function(e) {
  draggingSource(e, touchPosition(e));
});
function draggingSource(e, offset) {
  if (drag_type !== null) {
    var dragging = $('.dragging.' + drag_type)[0];
    if (dragging) {
      var parent_offset = $(dragging).parent().offset();
      var offset_x_plus = dragging.dataset.offset_x_plus ?? 0;
      var offset_x_minus = (dragging.dataset.offset_x_minus ?? 0) + parent_offset.left;
      var offset_y_plus = dragging.dataset.offset_y_plus ?? 0;
      var offset_y_minus = dragging.dataset.offset_y_minus ?? 0;

      dragging.style.display = 'block';
      dragging.style.transform = 'translate(calc(calc(calc(' + offset.x + 'px + ' + window.pageXOffset + 'px) + ' + offset_x_plus + 'px) - ' + offset_x_minus + 'px), calc(calc(calc(' + offset.y + 'px + ' + window.pageYOffset + 'px) + ' + offset_y_plus + 'px) - ' + offset_y_minus + 'px))';
    }
  }
}


// ドラッグ終了
$(document).on('mouseup', function(e) {
  endDragSource(e, clickPosition(e));
});
$(document).on('touchend', function(e) {
  endDragSource(e, touchPosition(e));
});
function endDragSource(e, offset) {
  if (drag_type !== null) {
    var drop_point_element = document.elementFromPoint(offset.x, offset.y);
    if (drop_point_element.classList.contains('dragdrop_dest') && drop_point_element.classList.contains(drag_type)) {
      endDrag(drop_point_element.dataset);
    }
    var dragging = $('.dragging.' + drag_type)[0];
    if (dragging) {
      dragging.style.display = 'none';
    }
    drag_type = null;
  }
  cancelDrag();
}