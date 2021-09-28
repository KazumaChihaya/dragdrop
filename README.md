# DragDrop ![](https://img.shields.io/badge/npm-v1.0.0-green)

ドラッグ&ドロップのライブラリ
by KazumaChihaya

## インストール
### npmを使用する方法
```bash
npm i KazumaChihaya/dragdrop
```

### ダウンロードして配置する方法
dragdropのindex.jsをダウンロードして任意の場所に配置する

## インポート方法
### npmを使用した場合
```javascript
import dragdrop from 'dragdrop'
```
としてimportする。(npmでinstallしたものは、fromの後に名前だけ書くことでnode_modules内のものを探しに行く)

### ダウンロードして配置した場合
```html
<script type="module" src="dragdropのindex.jsへのパス"></script>
```
としてimportする。

## 起動方法
インポート後、export defaultされた関数を実行することで、ドラッグ&ドロップが使用可能となる。

### vue.jsの場合
```javascript
created() {
  dragdrop(this);
}
```
を追加することで、起動する。
これを記述したクラス内に、
```javascript
function startDrag(dataset) {
  // ドラッグが始まったときに実行する内容
}
function endDrag(origin_dataset, dragging_dataset, dest_dataset) {
  // ドロップしたときに実行する内容
}
function cancelDrag() {
  // ドロップが終わったときとドラッグが中断したときに実行する内容
}
function mouseenterDrag(origin_dataset, dragging_dataset, hover_dataset) {
  // ホバーでマウスが入った時に実行する内容
}
function mouseleaveDrag(origin_dataset, dragging_dataset, hover_dataset) {
  // ホバーでマウスがでた時に実行する内容
}
```
この3つの関数を用意しておく必要がある。


### その他の場合
インポートよりも後で、
```html
<script>
  dragdrop(object);
</script>
```
でdragdropの機能を使用する。
ここで、objectとは
```html
<script>
  var object = {
    startDrag: function(dataset) {
      // ドラッグが始まったときに実行する内容
    },
    endDrag: function (origin_dataset, dragging_dataset, dest_dataset) {
      // ドロップしたときに実行する内容
    },
    cancelDrag: function () {
      // ドロップが終わったときとドラッグが中断したときに実行する内容
    },
    mouseenterDrag: function (origin_dataset, dragging_dataset, hover_dataset) {
      // ホバーでマウスが入った時に実行する内容
    },
    mouseleaveDrag: function (origin_dataset, dragging_dataset, hover_dataset) {
      // ホバーでマウスがでた時に実行する内容
    }
  };
</script>
```
のように宣言された、ドラッグの開始、終了、中断時の処理の関数を持つオブジェクトである。
vuejsなどの場合は、thisを渡せばよい。


## htmlの記述方法
html要素のクラスやdata属性によってドラッグの操作を記述する。

### ドラッグされる要素
ドラッグされる要素は、
```html
<div class="dragdrop_origin" data-drag_type="任意のタグ">ドラッグされるもの</div>
```
のように、「dragdrop_origin」クラスの付与、任意の文字列をdata-drag_typeに指定する必要がある。

### ホバー中の要素
ホバーされる要素は、
```html
<div class="dragdrop_hover 任意のタグ" data-drag_type="任意のタグ">ホバーされるもの</div>
```
のように、「dragdrop_hover」クラスの付与、任意の文字列をdata-drag_typeに指定する必要がある。


### ドラッグされている要素
ドラッグされている際に表示されるhtml要素を作成する必要がある、
その要素は、
```html
<div class="dragging 任意のタグ" data-offset_x_plus="0" data-offset_x_minus="10" data-offset_y_plus="0" data-offset_y_minus="10">ドラッグされているもの</div>
```
のように、「dragging」と任意のタグのクラスの付与が必要である。
また、data属性として、例のようにx_plus,x_minus,y_plus,y_minusの4つを必ず付与する。
これらはドラッグされる要素のオフセットを指定することで、マウスについてくるように調整することが可能である。
使用しない場合でも0を指定する。

### ドロップされる場所
ドロップされる場所の要素は、
```html
<div class="dragdrop_dest 任意のタグ">ドロップされる場所</div>
```
のように、「dragdrop_dest」と任意のタグのクラスの付与が必要である。


## タグの意味
複数のドラッグ&ドロップのグループが存在する場合に、タグによってそれぞれを区別することが可能。

## その他付与が必要なCSS
```css
.dragdrop_origin {
  cursor: pointer;/* 必要 */
}
.dragdrop_origin:hover {
  background-color: rgb(193, 255, 196);/* あるとドラッグされる要素がわかりやすい */
}


.dragging {
  position: absolute;/* 必要 */
  display: none;/* 必要 */
  pointer-events: none;/* 必要 */
  background: rgba(193, 255, 196, 0.7);/* あるとドラッグされている要素がわかりやすい */
}
```

## タッチ対応
iPadなどのタッチによるドラッグにも対応している。

## レスポンシブ
スマホなどではドラッグ&ドロップをしたくないということであれば、画面サイズによってdragdrop_originやdragdrop_destのクラスを消すことで対応可能。