const __form = document.getElementById("form");
const __btnAdd = document.getElementById("btn-add");
const __newTask = document.getElementById("newtask");
const __todosList = document.getElementById("todos");
const __todosJSON = JSON.parse(localStorage.getItem("todos_items"));

if (__todosJSON) {
	__todosJSON.forEach((todo) => add(todo));
}

document.body.addEventListener("keyup", (e) => {
	e.preventDefault();
	if (e.code == "Enter") {
		add();
	}
});

__btnAdd.addEventListener("click", (e) => {
	e.preventDefault();
	add();
});

function add(todo) {
	let todoText = __newTask.value;

	if (todo) {
		todoText = todo.text;
	}

	if (todoText) {
		const element = document.createElement("li");
		const elementSpan = document.createElement("span");
		const buttonUpdate = document.createElement("button");
		const buttonDelete = document.createElement("button");

		if (todo && todo.completed) {
			element.classList.add("completed");
		}

		elementSpan.innerText = todoText;

		element.appendChild(elementSpan);

		buttonDelete.innerHTML = "<em class='fa fa-times'></em>";
		buttonDelete.className = "btn btn-lg btn-danger";

		buttonDelete.addEventListener("click", () => {
			element.remove();
			update();
		});

		element.append(buttonDelete);

		buttonUpdate.innerHTML = "<em class='fa fa-check'></em>";
		buttonUpdate.className = "btn btn-lg btn-primary";

		buttonUpdate.addEventListener("click", () => {
			element.classList.toggle("completed");
			update();
		});

		element.append(buttonUpdate);

		__todosList.appendChild(element);

		__newTask.value = "";

		update();
	}
}

function update() {
	__element = document.querySelectorAll("li");

	const __todos = [];

	__element.forEach((element) => {
		__todos.push({
			text: element.innerText,
			completed: element.classList.contains("completed"),
		});
	});

	localStorage.setItem("todos_items", JSON.stringify(__todos));
}
