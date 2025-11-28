// ===============================
// DOMまとめて取得
// ===============================
const input = document.querySelector(".inputarea");
const addTaskBtn = document.querySelector("#addtask");
const ul = document.querySelector("ul");


// ===============================
// localStorage保存処理
// ===============================
const saveTasks = () => {
  const tasks = document.querySelectorAll("li");
  const taskSaveArr = [];

  tasks.forEach(li => {
    const textContent = li.querySelector("span").innerText;
    const isDone = li.querySelector("span").classList.contains("done");

    taskSaveArr.push({
      task: textContent,
      done: Boolean(isDone),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(taskSaveArr));
};


// ===============================
// タスク要素にイベント設定する処理
// ===============================
/** 引数イメージ
 * <li>
 *  <span>a</span>
 *  <button class="btn">完了</button>
 *  <button class="btn">削除</button>
 * </li>
 */
const addTaskHandlers = (li) => {
  const taskSpan = li.querySelector("span");
  const doneBtn = li.querySelector("button:nth-of-type(1)");
  const deleteBtn = li.querySelector("button:nth-of-type(2)");

  // 完了ボタンイベント
  doneBtn.addEventListener("click", () => {
    taskSpan.classList.toggle("done");
    saveTasks();
  });

  // 削除ボタンイベント
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });
};


// ===============================
// localStorage読み込み処理
// ===============================
const loadTasks = () => {
  const savedTasks = localStorage.getItem("tasks");
  if (!savedTasks) return; // 空の時

  const parsed = JSON.parse(savedTasks);

  parsed.forEach(taskObj => {
    const li = document.createElement("li");
    
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskObj.task;
    if (taskObj.done) taskSpan.classList.add("done");

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

    addTaskHandlers(li);
  });
};


// ===============================
//イベント設定諸々
// ===============================
// ページ読み込み時にlocalStorage読み込み処理する
document.addEventListener("DOMContentLoaded", loadTasks);


// Enterでも追加できるように
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});


// タスク追加ボタン押下時
addTaskBtn.addEventListener("click", () => {
  const inputText = input.value;
  if (!inputText) {
    alert("タスクを入力してください");
    return;
  }
  if (inputText.length > 50) {
    alert("タスクは50文字以内にしてください");
    return;
  }

  const li = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = inputText;
  li.appendChild(taskSpan);

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "完了";
  doneBtn.classList.add("btn");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "削除";
  deleteBtn.classList.add("btn");

  li.appendChild(doneBtn);
  li.appendChild(deleteBtn);
  ul.appendChild(li);

  addTaskHandlers(li);
  saveTasks();
  input.value = "";
});
