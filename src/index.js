var drag_type = null;
var self = {};
var dragdrop_origin_dataset = {};
var dragdrop_hover_dataset = {};
var dragging_dataset = {};

export default function dragdrop(_this, type) {
  if (self[type] === undefined) {
    self[type] = _this;
  }

  // ドラッグ開始
  $(document).on('mousedown', '.dragdrop_origin', function(e) {
    e.preventDefault();
    startDragSource(e, clickPosition(e));
  });
  $(document).on('touchstart', '.dragdrop_origin', function(e) {
    e.preventDefault();
    startDragSource(e, touchPosition(e));
  });


  // ドラッグ中
  document.addEventListener('mousemove', function(e) {
    if (drag_type !== null) {
      e.preventDefault();
      draggingSource(e, clickPosition(e));
    }
  });
  document.addEventListener('touchmove', function(e) {
    if (drag_type !== null) {
      e.preventDefault();
      draggingSource(e, touchPosition(e));
    }
  }, {passive: false});

  // ホバー中
  $(document).on('hover', '.dragdrop_hover', function(e) {
    e.preventDefault();
    hoverDragSource(e, clickPosition(e));
  });
  $(document).on('touchstart', '.dragdrop_hover', function(e) {
    e.preventDefault();
    hoverDragSource(e, touchPosition(e));
  });


  //ドラッグ終了・キャンセル
  $(document).on('mouseup', function(e) {
    endDragSource(e, clickPosition(e)); 
    cancelDragSource();
  });
  $(document).on('touchend', function(e) {
    endDragSource(e, touchPosition(e)); 
    cancelDragSource();
  });
}

// 位置取得
function clickPosition(e) {
  return {x: e.clientX, y: e.clientY};
}
function touchPosition(e) {
  const touch = e.changedTouches[0];
  return {x: touch.pageX - window.pageXOffset, y: touch.pageY - window.pageYOffset};
}




function startDragSource(e, offset) {
  var drag_origin_element = e.currentTarget;
  if (drag_origin_element !== null && drag_origin_element.classList.contains('dragdrop_origin')) {
    e.preventDefault();
    drag_type = drag_origin_element.dataset.drag_type;
    if (self[drag_type] !== undefined) {
      dragdrop_origin_dataset[drag_type] = drag_origin_element.dataset;
      self[drag_type].startDrag(drag_origin_element.dataset);
    }
  }
}
function hoverDragSource(e, offset) {
  var hover_drag_element = e.currentTarget;
  if (hover_drag_element !== null && hover_drag_element.classList.contains('dragdrop_hover')) {
    e.preventDefault();
    drag_type = hover_drag_element.dataset.drag_type;
    dragdrop_hover_dataset[drag_type] = hover_drag_element.dataset;
    if (self[drag_type] !== undefined) {
      self[drag_type].hoverDrag(hover_drag_element.dataset);
    }
  }
}
function draggingSource(e, offset) {
  if (drag_type !== null) {
    var dragging = $('.dragging.' + drag_type)[0];
    if (dragging) {
      var parent_offset = $(dragging).parent().offset();
      var offset_x_plus = Number(dragging.dataset.offset_x_plus);
      var offset_x_minus = Number(dragging.dataset.offset_x_minus) + parent_offset.left;
      var offset_y_plus = Number(dragging.dataset.offset_y_plus);
      var offset_y_minus = Number(dragging.dataset.offset_y_minus) + parent_offset.top;
      
      dragging_dataset[drag_type] = dragging.dataset;

      dragging.style.display = 'block';
      dragging.style.transform = 'translate(calc(calc(calc(' + offset.x + 'px + ' + window.pageXOffset + 'px) + ' + offset_x_plus + 'px) - ' + offset_x_minus + 'px), calc(calc(calc(' + offset.y + 'px + ' + window.pageYOffset + 'px) + ' + offset_y_plus + 'px) - ' + offset_y_minus + 'px))';
    }
  }
}

function endDragSource(e, offset) {
  if (drag_type !== null) {
    var drop_point_element = document.elementFromPoint(offset.x, offset.y);
    if (drop_point_element.classList.contains('dragdrop_dest') && drop_point_element.classList.contains(drag_type)) {
      if (self[drag_type] !== undefined) {
        self.endDrag(dragdrop_origin_dataset[drag_type], dragging_dataset[drag_type], drop_point_element.dataset);
        cancelDragSource();
      }
    }
  }
}

function cancelDragSource() {
  if (drag_type !== null) {
    var dragging = $('.dragging.' + drag_type)[0];
    if (dragging) {
      dragging.style.display = 'none';
    }
    drag_type = null;
  }
  if (self[drag_type] !== undefined) {
    self.cancelDrag();
  }
}

