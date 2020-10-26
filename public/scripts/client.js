$(document).ready(onReady);

function onReady() {
  console.log('HELLO');
  $('.js-btn-add').on('click', handleClickAdd);
  $('.js-todo-list').on('click', '.js-btn-complete', handleClickComplete);
  $('.js-todo-list').on('click', '.js-btn-delete', handleClickDelete);

  getTodoList();
}

// EVENT HANDLERS

function handleClickAdd(event) {
  event.preventDefault();
  const description = $('.js-input-descr').val();
  postTodo(description);
}

function handleClickComplete() {
  const id = $(this).data('id');
  putTodoComplete(id);
}

function handleClickDelete() {
  const id = $(this).data('id');
  deleteTodo(id);
}

// API CALLS

function getTodoList() {
  $.ajax({
    method: 'GET',
    url: '/todos',
  })
    .then(function (response) {
      render(response);
    })
    .catch(function (err) {
      console.log(err);
      alert('Something went wrong retrieving Todos.');
    });
}

function postTodo(description) {
  console.log({ description });
  $.ajax({
    method: 'POST',
    url: '/todos',
    data: { description },
  })
    .then(function (response) {
      getTodoList();
    })
    .catch(function (err) {
      console.log(err);
      alert('Something went wrong saving your Todo.');
    });
}

function putTodoComplete(todoId) {
  $.ajax({
    method: 'PUT',
    url: `/todos/complete/${todoId}`,
  })
    .then(function (response) {
      getTodoList();
    })
    .catch(function (err) {
      console.log(err);
      alert('Something went wrong completing your Todo.');
    });
}

function deleteTodo(todoId) {
  $.ajax({
    method: 'DELETE',
    url: `/todos/${todoId}`,
  })
    .then(function (response) {
      getTodoList();
    })
    .catch(function (err) {
      console.log(err);
      alert('Something went wrong deleting your Todo.');
    });
}

// DOM INTERACTION

function render(fullList) {
  $('.js-todo-list').empty();
  for (let todo of fullList) {
    let buttonElem = `<button class="js-btn-delete" data-id="${todo.id}">Delete</button>`;
    let completeClass = 'isComplete';

    if (todo.complete === false) {
      buttonElem = `<button class="js-btn-complete" data-id="${todo.id}">Complete</button>`;
      completeClass = '';
    }

    $('.js-todo-list').append(`<li class="${completeClass}">
      ${todo.description}
      ${buttonElem}
    </li>`);
  }
}
