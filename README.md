ドラッグ&ドロップをするためのライブラリです。

インポート方法
<script type="module" src="dragdropのindex.jsへのパス"></script>

または、vueなどの場合、
import dragdrop from 'dragdrop'　とする(名前だけ書くと、node_modules内のものを探しに行くらしい)

created() {
  dragdrop(this);
}
を追加する。下記の呼び出しもとの関数を含むオブジェクトを渡すことで、イベント発生時にその関数を呼ぶ。

$(document).on('click', '.class', function() {})
としたことで、動的に追加した要素にもclickイベントが発生するようになっている

タグはdata-drag_type=""としてかく

ドラッグされるやつ .dragdrop_origin data-drag_type="タグ"
ドラッグされてるやつ .dragging .タグ
ドロップされる場所 .dragdrop_dest .タグ
全てに、data-drag_type="タグ"　をつける
「タグ」は、種類を示すタグ　複数の種類のドラッグドロップを使用する際に区別できるようにつける

draggingに対して、
data-offset_x_plus="0" data-offset_x_minus="0" data-offset_y_plus="0" data-offset_y_minus="0"
を入れる

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