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
  let currentNum = 0; //現在の問題番号

  question.textContent = quizSet[currentNum].q; //現在の問題番号の問題文を代入

  // 現在の問題文の選択肢を表示
  quizSet[currentNum].c.forEach((choice) => {
    const li = document.createElement("li");
    li.textContent = choice;
    choices.appendChild(li);
  });
}
