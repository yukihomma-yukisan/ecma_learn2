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

// console.log(ccc); //letはundefinedが入らないので、宣言前に実行できずエラーになる
// let ccc = 0;

// スクリプトスコープとグローバルスコープ
let scope_a = 0; //scriptに表示
const scope_aa = 0; //scriptに表示
var scope_b = 0; //globalのwindowに表示
function scope_c(){}; //globalのwindowに表示

let scope_d = 1;
window.scope_d = 0;
console.log(scope_d); //スコープチェーン 同じ変数名の場合、内側にある方が取得される
                      // globalスコープ>scriptスコープ
// debugger;

//関数スコープ
function scope_e(){
  let scope_f = 2;
  console.log(scope_f);
};
scope_e();
// console.log(scope_f); //参照できずエラーになる

//ブロックスコープ内ではletかconstを使う
{
  let scope_g = 2;
  var scope_h = 2;
  function scope_i(){
    console.log('scope_i is called');
  }
  const scope_j = function scope_k(){
    console.log('scope_k is called');
  }
  
}
// console.log(scope_g); //ブロックスコープ内で宣言されたので外では参照できずエラーになる
// console.log(scope_h); //varは参照可能
scope_i(); //関数は参照可能
// scope_j(); //関数宣言時にconstに代入することでブロック外から参照できないようにする

function fn(arg1, arg2){
  console.log(arg1, arg2);
}
fn(0);  //関数宣言の引数は、指定されないとundefinedが入る（arg2にundefined）

//コールバック関数
function hello(name){
  console.log(`hello ${name}`);
}

function bye(name){
  console.log(`bye ${name}`);
}

function greet(arg){
  arg('Tom'); //引数オブジェクトを関数として実行する
}

greet(hello);
greet(bye);