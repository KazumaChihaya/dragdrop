ドラッグ&ドロップをするためのライブラリです。

インポート方法
<script type="module" src="dragdropのindex.jsへのパス"></script>

ドラッグされるやつ .dragdrop_origin .タグ
ドラッグされてるやつ .dragging .タグ
ドロップされる場所 .dragdrop_dest .タグ
全てに、data-drag_type="タグ"　をつける
「タグ」は、種類を示すタグ　複数の種類のドラッグドロップを使用する際に区別できるようにつける

CSS
.draggingのdivへのCSS

position: absolute;
top: 0px;
display: none;
pointer-events: none;

