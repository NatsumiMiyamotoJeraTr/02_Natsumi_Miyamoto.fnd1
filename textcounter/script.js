const input = document.querySelector(".textarea");
const counter = document.querySelector(".counter");
const clearBtn = document.querySelector(".clear-btn");

counter.textContent = "文字数(空白含む)： 0";

input.addEventListener("input", function () {
  const textLength = input.value.length;
  counter.textContent = `文字数(空白含む)： ${textLength}`;
})

clearBtn.addEventListener("click", function () {
  input.value = "";
  counter.textContent = "文字数(空白含む)： 0";
})
