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

//this　コンテキスト内のオブジェクトを取得する
window.name = 'John';

const person ={
  name: 'Tom',
  hello: function (){
    console.log(`hello ${this.name}`); 
  }
}

person.hello(); //関数コンテキスト Tomを取得する
const ref = person.hello; //helloをpersonからrefにコピーする→コンテキストが変わった
ref(); //John

//bind thisの参照先を固定する
const helloTom = person.hello.bind(person)
function fn_bind(ref){
  // ref();
}
fn_bind(person.hello) //John グローバル
fn_bind(helloTom.hello) //Tom バインドしたので関数コンテキスト

//bindはプロパティや引数も固定できる
function bind_arg1(name){
  console.log('hello ' + name);
}
// const bind_arg2 = bind_arg1.bind({name: 'Tim'}); //nameプロパティの値を固定
const bind_arg2 = bind_arg1.bind(null, 'Tim'); //引数を固定

bind_arg2('Tom'); //引数を渡しても、bindのTimが出力される

//bindは実行されないが、call applyは即実行される
function callapply(){
  console.log('hello ' + this.name);
}
//bindの場合、わざわざbindしたものを変数に参照させてから変数を実行する必要がある
callapply.apply({name: 'kathy'});
callapply.call({name: 'Ellie'}); 

//関数に引数がある場合、applyは配列で引数を渡せる（第２引数に配列を設定する）
//引数がそれぞれ独立している場合はcallを使う
const arry_apply = [1,2,3,4,5]
const resultApply = Math.max.apply(null, arry_apply)
console.log(resultApply)
//上記はES5までの実装方法。ES6ではスプレッド演算子を使える
// const resultApply = Math.max(...arry_apply)

//アロー関数でthisを使うとレキシカルスコープ（１つ上のthisを参照する）
const person_allow2 = {
  name: 'Mike',
  hello(){
    console.log('hello ' + this.name);
    const person_allow1 = () => console.log('bye ' + this.name); //１つ上なのでMikeを参照する
    person_allow1();
  }
}
person_allow2.hello();

//コンストラクター関数 newがないとundefinedになる。
//returnが設定されていない場合は__proto__が返ってくる
//returnがオブジェクト以外の場合も__proto__が返ってくる
function Person(name, age){
  this.name = name;
  this.age = age;
};

const person_list1 = new Person('Taro', 10);
const person_list2 = new Person('Jiro', 11);
const person_list3 = new Person('Saburo', 12);

console.log(person_list1);
console.log(person_list2);
console.log(person_list3);

//メソッドにnewはつけられない
// const methodA = {
//   person(name, age){
//     this.name = name;
//     this.age = age;
//   }
// }
// const person_list4 = new methodA.person('Shiro', 13); //エラーになる
// console.log(person_list4);

//引数が配列の場合はpush、オブジェクトの場合はkeyで値を格納する
//instaceofで参照元のオブジェクトを配列かどうか確認して条件分岐してあげると良い
function PushOrKey(arg){
  if(arg instanceof Array){
    arg.push('value');
  } else {
    arg['key'] = 'value';
  }
  console.log(arg);
}
PushOrKey([]);
PushOrKey({});