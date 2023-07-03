showTasks();
      const formElement = document.querySelector("#form");

      formElement.addEventListener("submit", function (e) {
        e.preventDefault();

        const addTaskElement = document.querySelector("#add-task");

        let addTaskValue = addTaskElement.value;

        error.innerText = "";
        addTaskElement.classList.remove("is-invalid");
        if (addTaskValue == "") {
          error.innerText = "Enter the task!";
          addTaskElement.classList.add("is-invalid");
        } else {
          let localTasks = JSON.parse(localStorage.getItem("tasks"));
          let tasks = [];

          if (localTasks) {
            tasks = localTasks;
          }

          tasks.push(addTaskValue);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          addTaskElement.value = "";
          showTasks();
        }
      });

      function showTasks() {
        let localTasks = JSON.parse(localStorage.getItem("tasks"));

        if (localTasks) {
          let tasksElement = "";

          localTasks.forEach(function (value, index) {
            tasksElement += `<div class="task-section"><input type="text" class="form-control mb-2" id="input-${index}" value="${value}" readonly><button class="btn btn-success mr-2" id="edit-${index}" onclick="editTask(${index})">Edit</button><button class="btn btn-danger" id="delete-${index}" onclick="deleteTask(${index})">Delete</button></div>`;
          });

          const tasksSectionElement = document.querySelector("#tasks-section");
          tasksSectionElement.innerHTML = tasksElement;
        }
      }

      function editTask(index) {
        const btnEditElement = document.querySelector("#edit-" + index);
        const inputElement = document.querySelector("#input-" + index);

        if (btnEditElement.innerText == "Edit") {
          btnEditElement.innerText = "Save";
          inputElement.removeAttribute("readonly");
          inputElement.focus();
          inputElement.setSelectionRange(
            inputElement.value.length,
            inputElement.value.length
          );
          if (inputElement.value.trim() === "") {
            inputElement.classList.add("is-invalid");
            btnEditElement.innerText = "Save";
            inputElement.setAttribute("readonly", true);
          }
        } else {
          let localTasks = JSON.parse(localStorage.getItem("tasks"));
          const inputValue = inputElement.value;
          if (inputValue.trim() === "") {
            inputElement.classList.add("is-invalid");
            console.log("Error: Enter a valid task!");
            return;
          } else {
            inputElement.classList.remove("is-invalid");
          }

          localTasks[index] = inputValue;
          localStorage.setItem("tasks", JSON.stringify(localTasks));
          inputElement.setAttribute("readonly", true);
          btnEditElement.innerText = "Edit";
        }
      }

      function deleteTask(index) {
        let localTasks = JSON.parse(localStorage.getItem("tasks"));
        localTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(localTasks));

        showTasks();
      }