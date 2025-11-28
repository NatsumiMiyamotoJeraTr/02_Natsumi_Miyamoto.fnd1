// ---- ユーザ入力のパスワード文字数の要素取得 ----
const lengthInput = document.querySelector(".inputarea");

// ---- 簡単文字数入力buttonの要素取得 ----
const btn8 = document.querySelector(".eight-btn");
const btn12 = document.querySelector(".twelve-btn");

// ---- チェックボックスの要素取得 ----
const chkUpper = document.querySelector(".upper-en-btn");
const chkLower = document.querySelector(".lower-en-btn");
const chkMark = document.querySelector(".mark-btn");
const generateBtn = document.querySelector(".generate-btn");

// ---- 表示とコピー用の要素取得 ----
const showPW = document.querySelector(".show-password-text");
const copyBtn = document.querySelector(".copy-btn");

// ---- 「8文字以上」ボタン ----
btn8.addEventListener("click", () => {
  lengthInput.value = 8;
});

// ---- 「12文字以上」ボタン ----
btn12.addEventListener("click", () => {
  lengthInput.value = 12;
});

// ---- 文字セット ----
  const numbers = "0123456789";
  const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  const marks = "!@#$%^&*()_+-=[]{};:,.<>?";


// Enterでも追加できる
lengthInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    generateBtn.click(); // clickされたときと同じ処理を呼び出す
  }
});

// ---- 生成ボタン ----
generateBtn.addEventListener("click", () => {
  const len = Number(lengthInput.value);
  if (len <= 0 || lengthInput.value === "") {
    alert("生成したいパスワードの文字数を整数の1以上で入力してください");
    return;
  }
  if (len > 50) {
    alert("50文字以下にしてください");
    return;
  }
  let charSet = numbers;
  if (chkUpper.checked) charSet += upperLetters;
  if (chkLower.checked) charSet += lowerLetters;
  if (chkMark.checked) charSet += marks;
  
  let password = "";
  for (let i = 0; i < len; i ++){
    const r = Math.floor(Math.random() * charSet.length); // 選択したcharSetの長さ文だけのインデックスをランダムで得る
    password += charSet[r];
  }

  // ボタンが押されるたびに生成したいので、ここに表示
  showPW.textContent = password;
})

// ---- コピー機能 ----
copyBtn.addEventListener("click", () => {
  const copied_password = showPW.textContent;
  if (!copied_password || copied_password === "ここに表示されます") return;

  navigator.clipboard.writeText(copied_password).then(() => {
    alert("コピーしました！");
  });
});