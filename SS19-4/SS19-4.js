const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const clearBtn = document.getElementById("clearBtn");
const taskCount = document.getElementById("taskCount");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Hiển thị dữ liệu
renderTodos();

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTodo();
    }
});

clearBtn.addEventListener("click", () => {

    if(confirm("Xóa toàn bộ công việc?")){

        todos = [];

        saveToLocalStorage();
        renderTodos();
    }
});

// CREATE
function addTodo(){

    const text = todoInput.value.trim();

    if(text === ""){
        alert("Vui lòng nhập công việc!");
        return;
    }

    const todo = {
        id: Date.now(),
        text: text
    };

    todos.push(todo);

    saveToLocalStorage();

    renderTodos();

    todoInput.value = "";
}

// READ
function renderTodos(){

    todoList.innerHTML = "";

    todos.forEach(todo => {

        const li = document.createElement("li");

        li.className = "todo";

        li.innerHTML = `
            <span ondblclick="editTodo(${todo.id})">
                ${todo.text}
            </span>

            <div class="actions">

                <button
                    class="edit-btn"
                    onclick="editTodo(${todo.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTodo(${todo.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>
        `;

        todoList.appendChild(li);
    });

    taskCount.textContent =
        `You have ${todos.length} pending tasks`;
}

// UPDATE
function editTodo(id){

    const todo = todos.find(
        item => item.id === id
    );

    const newText = prompt(
        "Sửa công việc:",
        todo.text
    );

    if(
        newText !== null &&
        newText.trim() !== ""
    ){
        todo.text = newText.trim();

        saveToLocalStorage();
        renderTodos();
    }
}

// DELETE
function deleteTodo(id){

    if(confirm("Bạn có chắc muốn xóa?")){

        todos = todos.filter(
            item => item.id !== id
        );

        saveToLocalStorage();
        renderTodos();
    }
}

// Local Storage
function saveToLocalStorage(){

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}