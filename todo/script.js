const input = document.querySelector(".inputarea");
const addTaskBtn = document.querySelector("#addtask");
const ul = document.querySelector("ul");

// Enterでも追加できる
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click(); // clickされたときと同じ処理を呼び出す
  }
});

addTaskBtn.addEventListener("click", () => {
  let inputText = input.value;
  if (inputText === "") {
    alert("タスクを入力してください");
    return;
  }
  if (inputText.length > 50) {
    alert("タスクは50文字以内にしてください");
    return;
  }
  // <li>、<span>要素を追加する
  const li = document.createElement("li");
  const taskSpan = document.createElement("span"); // ボタンとテキストを分離させて、長さ調節を細かく行えるようにする
  taskSpan.textContent = inputText;
  li.appendChild(taskSpan);

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "完了";
  doneBtn.classList.add("btn"); // class=btnを追加

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "削除";
  deleteBtn.classList.add("btn"); // class=btnを追加

  li.appendChild(doneBtn);
  li.appendChild(deleteBtn);
  ul.appendChild(li)

  input.value = ""; // タスク追加後、インプット欄を初期化

  // 完了
  doneBtn.addEventListener("click", () => {
    taskSpan.classList.toggle("done"); // リストの文字部分(taskSpan)にだけクラス"done"がついていなかったらつけて、ついていないときは追加, cssでdoneクラスに取り消し線を引く
  })

  // 削除処理
  deleteBtn.addEventListener("click", () => {
    li.remove();
  })
})

