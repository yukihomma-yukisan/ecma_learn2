let a = 0; // グローバルコンテキスト上の変数
function b() { //グローバルコンテキスト上の関数
  console.log(this, arguments,a) //関数コンテキスト内。thisはwindowオブジェクト
}
b();

// コールスタックの確認
function aa() {
}
function bb(){
  aa();
}
function cc(){
  bb();
}

cc(); //chromeのsourcesでここにブレークポイントを置きcommand + r
// →step inを押すたびに call stackが積まれていく

//ホイスティング
// 関数宣言が先に読み込まれる
aaa();

function aaa(){
  console.log('関数宣言より上の行で関数を実行してもOK');
}

// 変数宣言
//var bbb //varは先にメモリスペースを確保してundefinedが入る
console.log(bbb);
var bbb = 0;
console.log(bbb);

console.log(ccc); //letはundefinedが入らないので、宣言前に実行できずエラーになる
let ccc = 0;