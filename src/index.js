var drag_type = null;

// ドラッグ開始
$('.dragdrop_origin').on('mousedown', function(e) {
  var drag_origin_element = document.elementFromPoint(e.clientX, e.clientY);
  if (drag_origin_element !== null && drag_origin_element.classList.contains('dragdrop_origin')) {
    console.log('mousedown');
    e.preventDefault();
    drag_type = drag_origin_element.dataset.drag_type;
    startDrag(drag_origin_element.dataset);
  }
});
$('.dragdrop_origin').on('touchstart', function(e) {
  var drag_origin_element = document.elementFromPoint(touch.pageX, touch.pageY);
  if (drag_origin_element !== null && drag_origin_element.classList.contains('dragdrop_origin')) {
    console.log('touchstart');
    e.preventDefault();
    drag_type = drag_origin_element.dataset.drag_type;
    startDrag(drag_origin_element.dataset);
  }
});


// ドラッグ中
$(document).on('mousemove', function(e) {
  if (drag_type !== null) {
    var dragging = $('.dragging.' + drag_type)[0];
    if (dragging) {
      console.log('mousemove');
      var parent_offset = $(dragging).parent().offset();
      var offset_x_plus = dragging.dataset.offset_x_plus ?? 0;
      var offset_x_minus = (dragging.dataset.offset_x_minus ?? 0) + parent_offset.left;
      var offset_y_plus = dragging.dataset.offset_y_plus ?? 0;
      var offset_y_minus = dragging.dataset.offset_y_minus ?? 0;

      dragging.style.display = 'block';
      dragging.style.transform = 'translate(calc(calc(calc(' + e.clientX + 'px + ' + window.pageXOffset + 'px) + ' + offset_x_plus + 'px) - ' + offset_x_minus + 'px), calc(calc(calc(' + e.clientY + 'px + ' + window.pageYOffset + 'px) + ' + offset_y_plus + 'px) - ' + offset_y_minus + 'px))';
    }
  }
});
$(document).on('touchmove', function(e) {
  if (drag_type !== null) {
    var dragging = $('.dragging.' + drag_type)[0];
    if (dragging) {
      console.log('touchmove');
      var parent_offset = $(dragging).parent().offset();
      var offset_x_plus = dragging.dataset.offset_x_plus ?? 0;
      var offset_x_minus = (dragging.dataset.offset_x_minus ?? 0) + parent_offset.left;
      var offset_y_plus = dragging.dataset.offset_y_plus ?? 0;
      var offset_y_minus = dragging.dataset.offset_y_minus ?? 0;

      const touch = e.changedTouches[0];
      dragging.style.display = 'block';
      dragging.style.transform = 'translate(calc(calc(calc(' + touch.pageX + 'px + ' + window.pageXOffset + 'px) + ' + offset_x_plus + 'px) - ' + offset_x_minus + 'px), calc(calc(calc(' + touch.pageY + 'px + ' + window.pageYOffset + 'px) + ' + offset_y_plus + 'px) - ' + offset_y_minus + 'px))';
    }
  }
});


// ドラッグ終了
$(document).on('mouseup', function(e) {
  if (drag_type !== null) {
    var drop_point_element = document.elementFromPoint(e.clientX, e.clientY);
    if (drop_point_element.classList.contains('dragdrop_dest') && drop_point_element.classList.contains(drag_type)) {
      console.log('mouseup');
      endDrag(drop_point_element.dataset);
    }
  }
  cancelDragSource();
});
$(document).on('touchend', function(e) {
  if (drag_type !== null) {
    const touch = e.changedTouches[0];
    var drop_point_element = document.elementFromPoint(touch.pageX, touch.pageY);
    if (drop_point_element.classList.contains('dragdrop_dest') && drop_point_element.classList.contains(drag_type)) {
      console.log('touchend');
      endDrag(drop_point_element.dataset);
    }
  }
  cancelDragSource();
});

function cancelDragSource() {
  if (drag_type !== null) {
    var dragging = $('.dragging.' + drag_type)[0];
    if (dragging) {
      dragging.style.display = 'none';
    }
    drag_type = null;
  }
  cancelDrag();
}

function startDrag(dataset) {
  console.log('startDrag');
}
function endDrag(dataset) {
  console.log('endDrag');
}
function cancelDrag() {
  console.log('cancelDrag');
}