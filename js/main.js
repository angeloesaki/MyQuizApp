"use strict";
{
  const question = document.getElementById("question");
  const choices = document.getElementById("choices");
  const button = document.getElementById("button");

  const quizSet = [
    { q: "Which one is A?", c: ["A", "B", "C"] },
    { q: "Which one is D?", c: ["D", "E", "F"] },
    { q: "Which one is G?", c: ["H", "I", "J"] },
  ];
  //現在の問題番号
  let currentNum = 0;
  //回答したかどうかという変数（真偽値）
  let isAnswered;
  //正答数
  let score = 0;

  //引数に受け取った配列をシャッフルしてから返す関数
  function shuffle(array) {
    //フィッシャー・イェーツシャッフルのアルゴリズム
    //for文の引数はランダムに選ぶ範囲の終点のインデックス
    for (let i = array.length - 1; i > 0; i--) {
      //上記の範囲の中からランダムに選ぶ要素のインデックス
      //1巡目は0,1,2のいずれかの数字が代入される
      //2巡目は0,1
      const j = Math.floor(Math.random() * (i + 1));
      //分割代入
      [array[j], array[i]] = [array[i], array[j]];
    }
    return array;
  }

  //正誤判定機能
  function checkAnswer(li) {
    //もしも回答する前に回答したか否かの変数がtrueだったら、つまり回答済みだったら、これ以降の正誤判定の処理はしないでね
    // if (isAnswered === true) {
    //=== trueは省略可能
    if (isAnswered) {
      return;
    }
    //回答した時に回答したという風にする
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add("correct");
      score++;
    } else {
      li.classList.add("wrong");
    }

    //Nextボタンを使えるようにする
    button.classList.remove("disabled");
  }

  //現在の問題番号のシャッフルされた選択肢を表示
  function setQuiz() {
    //選択肢がセットされた時点ではまだ回答はされていない
    isAnswered = false;
    //現在の問題番号の問題文を代入
    question.textContent = quizSet[currentNum].q;

    //setQuizで回答の選択肢を表示する前に、一度全部の選択肢を消してあげる
    //ループを回す
    //()の中の値がfalseまたはnullになるまで回る
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    //シャッフルされた選択肢の配列
    //スプレッド演算子で配列の要素を展開
    //スプレッド演算子を[]の中に書くことで新しいコピーの配列を作れる
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    // 現在の問題文の選択肢を表示
    shuffledChoices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    //最後の問題の時のNextボタンのテキストを設定
    if (currentNum === quizSet.length - 1) {
      button.textContent = "Show Score";
    }
  }

  setQuiz();

  button.addEventListener("click", () => {
    //Nextボタンにdisabledクラスがついていたら、その後の処理、つまり、次の問題へ進む処理をしない
    if (button.classList.contains("disabled")) {
      return;
    }

    //次の問題に行く時にNextボタンを無効化する
    button.classList.add("disabled");

    //最後の問題だったら
    if (currentNum === quizSet.length - 1) {
      console.log(`Score: ${score} / ${quizSet.length}`);
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
