var taskName = new Map([
  [24, "Buy Grocery"],
  [25, "Send Email"],
  [28, "Finish Assignment"],
  [30, "Bake Cake"],
  [31, "Write Blog Post"],
]);
// var taskName = new Map([]);
var taskStatus = new Map([
    [24, 0],
    [25, 0],
    [28, 0],
    [30, 0],
    [31, 0],
]);
var statusArr = ["Todo", "In Progress", "Complete"];
var dtable = document.getElementById("tab");

getTasks();

function getTasks() {
  var keys = Object.keys(localStorage).sort().reverse();
  var i = keys.length;
  while (i--) {
    if (!isNaN(keys[i])) {
      taskName.set(parseInt(keys[i]), localStorage.getItem(keys[i]));
      //   taskStatus.set(parseInt(keys[i]), 0);
    }
  }
  for (let i of taskName.values()) {
    taskStatus.set(getByValue(taskName, i), localStorage.getItem(i));
  }
  updateStorage();
  console.log(localStorage.getItem(24), taskName, taskStatus);
  showTasks();
}
function addNewTask() {
  let keys = Array.from(taskName.keys());
  let task = prompt("Add New Task");
  if (task != null) {
    taskName.set(parseInt(keys[keys.length - 1]) + 1, task);
    taskStatus.set(parseInt(keys[keys.length - 1]) + 1, 0);
    showTasks();
    updateStorage();
  }
}
function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
}
function updateStorage() {
  localStorage.clear();
  taskName.forEach((value, key) => {
    localStorage.setItem(key, value);
  });
  taskStatus.forEach((value, key) => {
    localStorage.setItem(taskName.get(key), value);
    // console.log(taskName.get(key));
  });
  //   window.location.reload();
}

function showTasks() {
  dtable.innerHTML = "";
  for (let i of taskName.keys()) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    td1.innerText = i;
    td1.classList += "table-cell py-2";
    td2.innerText = taskName.get(i);
    td2.id = "task" + i;
    td2.classList += "table-cell py-2";

    var btn = document.createElement("button");
    btn.innerText = statusArr[taskStatus.get(i)];
    btn.id = "btn" + i;
    btn.classList +=
      "status outline outline-1 outline-offset-2 py-0.5 px-2 rounded-sm";
    btn.classList += " " + getStatusButtonStyle(taskStatus.get(i));
    td3.classList += "table-cell py-2";
    td3.appendChild(btn);
    var btn1 = document.createElement("button");
    var icon = document.createElement("i");
    icon.classList += "fa fa-pen text-cyan-500";
    btn1.id = "edit" + i;
    icon.id = "edit" + i;
    btn1.classList +=
      "edit outline outline-1 outline-offset-2 outline-cyan-500 px-2 py-0.5 rounded-sm";
    if (navigator.onLine) {
      btn1.appendChild(icon);
    } else {
      btn1.innerHTML = "Edit";
    }
    td4.classList += "table-cell py-2";
    td4.appendChild(btn1);
    var btn2 = document.createElement("button");
    var icon = document.createElement("i");
    icon.classList += "fa fa-trash text-slate-600";
    icon.id = "delete" + i;
    btn2.id = "delete" + i;
    btn2.classList +=
      "remove outline outline-1 outline-offset-2 outline-slate-600 px-2 py-0.5 rounded-sm z-10";
    if (navigator.onLine) {
      btn2.appendChild(icon);
    } else {
      btn2.innerHTML = "Delete";
    }
    td5.classList += "table-cell py-2";
    td5.appendChild(btn2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.id = "row" + i;
    tr.classList += "table-row text-center border-b-[1px] border-slate-400";
    dtable.appendChild(tr);
  }
  addevents();
}

function changeStatus(id) {
  console.log("Changing", id);
  var btn = parseInt(id.slice(3, id.length));
  var status = document.getElementById(id);
  console.log(status, taskStatus.get(btn));
  if (taskStatus.get(btn) == 0) {
    taskStatus.set(btn, 1);
    status.innerText = statusArr[1];
    status.classList.remove("text-slate-500");
    status.classList.remove("outline-slate-500");
    status.classList.add("text-yellow-500");
    status.classList.add("outline-yellow-500");
  } else if (taskStatus.get(btn) == 1) {
    taskStatus.set(btn, 2);
    status.innerText = statusArr[2];
    status.classList.remove("text-yellow-500");
    status.classList.remove("outline-yellow-500");
    status.classList.add("text-green-500");
    status.classList.add("outline-green-500");
  } else {
    taskStatus.set(btn, 0);
    status.innerText = statusArr[0];
    status.classList.remove("text-green-500");
    status.classList.remove("outline-green-500");
    status.classList.add("text-slate-500");
    status.classList.add("outline-slate-500");
  }
  console.log(status);
  updateStorage();
  //   showTasks();
}

function getStatusButtonStyle(val) {
  if (val == 0) {
    return "text-slate-500 outline-slate-500";
  } else if (val == 1) {
    return "text-yellow-500 outline-yellow-500";
  } else {
    return "text-green-500 outline-green-500";
  }
}
function editTask(id) {
  let tId = parseInt(id.slice(4, id.length));
  let task = prompt("Edit Task", taskName.get(tId));
  // taskName.set(tId, task);
  if (task != null) {
    taskName.set(tId, task);
    document.getElementById("task" + tId).innerHTML = task;
  }
  updateStorage();
}
function deleteTask(id) {
  console.log(id);
  let tId = parseInt(id.slice(6, id.length));
  console.log(tId);
  let text = "Do you want to Remove?";
  if (confirm(text) == true) {
    text = "You pressed OK!";
    taskName.delete(tId);
    taskStatus.delete(tId);
    console.log("row" + tId + " " + id);
    let row = document.getElementById("row" + tId);
    console.log(row);
    dtable.removeChild(row);
  } else {
    console.log("You canceled!");
  }
  updateStorage();
  //   showTasks();
}
function addevents() {
  const breakdownButton = document.querySelectorAll(".status");
  breakdownButton.forEach(function (btn) {
    btn.addEventListener("click", function (ev) {
      changeStatus(ev.target.id);
    });
  });
  const editBtns = document.querySelectorAll(".edit");
  editBtns.forEach(function (btn) {
    btn.addEventListener("click", function (ev) {
      editTask(ev.target.id);
    });
  });
  const removeBtns = document.querySelectorAll(".remove");
  removeBtns.forEach(function (btn) {
    btn.addEventListener("click", function (ev) {
      deleteTask(ev.target.id);
    });
  });
  console.log("YAYYYYYYYY!!!");
}
