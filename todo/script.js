// localStrage保存用関数
const saveTasks = () => {
  const tasks = document.querySelectorAll("li");
  const taskSaveArr = [];

  tasks.forEach(li => {
    const textContent = li.childNodes[0].innerText;
    const isDone = li.childNodes[0].classList.contains("done") // li01.childNodes[0].classList ---> DOMTokenList ['done', value: 'done'];

    taskSaveArr.push({
      task: textContent,
      done: Boolean(isDone),
    })
  })
  localStorage.setItem("tasks", JSON.stringify(taskSaveArr)); // tasksというキー名で //jSのオブジェクトをJSON形式にパース
}

// 完了、削除ボタンとそれぞれのイベント設定をする関数
/** 引数イメージ
 * <li>
 *  <span>a</span>
 *  <button class="btn">完了</button>
 *  <button class="btn">削除</button></li>
 */
const addTaskHanders = (li) => {
  const taskSpan = li.querySelector("span");
  const doneBtn = li.querySelector("button:nth-of-type(1)") // 親要素の中にある button要素のうち 1番目 を選択する
  const deleteBtn = li.querySelector("button:nth-of-type(2)") // 親要素の中にある button要素のうち 2番目 を選択する

  doneBtn.addEventListener("click", () => {
    taskSpan.classList.toggle("done");
    saveTasks();
  })

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  })

}

// localStrage読み込み関数
const loadTasks = () => {
  const savedTasks = localStorage.getItem("tasks"); // キーの値を呼び出す
  if (!savedTasks) return; // 空の時

  const parsed = JSON.parse(savedTasks); //JSONをjSのオブジェクト形式にパース, イメージ{task: 'あ', done: false}
  parsed.forEach(taskObj => {
    // 読み込みデータをもとにページ要素を再構築していく
    const li = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskObj.task;

    // doneクラス有無確認, trueなら追加
    if (taskObj.done) {
      taskSpan.classList.add("done");
    }

    // ボタン追加
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "完了";
    doneBtn.classList.add("btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.classList.add("btn");

    li.appendChild(taskSpan);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);

    // ボタンにイベント追加
    addTaskHanders(li);

  })
}

// ページ読み込み時にlocalStrage読み込み処理する
document.addEventListener("DOMContentLoaded", loadTasks);

// 素材用意
const input = document.querySelector(".inputarea");
const addTaskBtn = document.querySelector("#addtask");
const ul = document.querySelector("ul");

// Enterでも追加できるように
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
  ul.appendChild(li) // 完成したli要素をul下に追加

  // ボタンにイベント追加
  addTaskHanders(li);

  saveTasks(); // 保存
  input.value = ""; // タスク追加後、インプット欄を初期化
})

