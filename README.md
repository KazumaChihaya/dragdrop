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

index.htmlはテスト用
chromeではCORSに引っ掛かるため、safariで「開発」から「クロスオリジンの制限を無効にする」を選択して実行するか、
<script></script>の中にindex.jsの中身を全てコピーして動かす

呼び出しもとのインポート後に<script></script>の中に
function startDrag(dataset) {
  ドラッグが始まったときに実行する内容
}
function endDrag(dataset) {
  ドロップしたときに実行する内容
}
function cancelDrag() {
  ドロップが終わったときとドラッグが中断したときに実行する内容
}
の3種類を追加する。