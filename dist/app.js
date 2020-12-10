const getElByClass = (el) => document.querySelector(el);

// Variables
const themeSwitcher = getElByClass('.todo__theme-switcher');
const todo = getElByClass('.todo');
const todoInput = getElByClass('.todo__input');
const todoList = getElByClass('.todo__list');
const todosEl = document.querySelectorAll('.todos');
const todoCheckEl = document.querySelectorAll('.todos__check');
const todoDeleteEl = document.querySelectorAll('.todos__delete');
const todoCounter = getElByClass('.todo__counter');
const clearComplete = getElByClass('.clear-completed');
// Filter elements
const allFilterEl = document.getElementById('all');
const activeFilterEl = document.getElementById('active-filter');
const completedFilterEl = document.getElementById('completed');


// Event Listeners
themeSwitcher.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('light-theme');
    themeSwitcher.classList.toggle('light-theme');
    todo.classList.toggle('light-theme');
});

// Add new todo
todoInput.addEventListener('keypress', function(e) {
   if (e.key === 'Enter') {
       e.preventDefault();
        checkInput();
   }
})

// Check or delete todo
todoList.addEventListener('click', completeRemoveTodo);

// Remove all complete todos
clearComplete.addEventListener('click', clearCompleteTodos);

allFilterEl.addEventListener('click', filterAll);
activeFilterEl.addEventListener('click', filterActive);
completedFilterEl.addEventListener('click', filterCompleted);


// Functions

function checkInput() {
    if (todoInput.value !== '') {
        addTodo();
    }
}

function addTodo() {
    // Create li
    const liEl = document.createElement('li');
    liEl.classList.add('todos', 'handle');
    // Create check-div
    const checkDiv = document.createElement('div');
    checkDiv.classList.add('todos__check');
    liEl.appendChild(checkDiv);
    // Create todo name p
    const todoNameP = document.createElement('p');
    todoNameP.classList.add('todos__name');
    todoNameP.innerText = todoInput.value;
    liEl.appendChild(todoNameP);
    // Create cross-div
    const crossDiv = document.createElement('div');
    crossDiv.classList.add('todos__delete');
    crossDiv.innerHTML = '<img src="./img/icon-cross.svg" alt="" />';
    liEl.appendChild(crossDiv);
    // Add this elements to todo__list
    todoList.prepend(liEl);
    // Clear input
    todoInput.value = '';
    countTodos();
}

function countTodos() {
    const todosEl = document.querySelectorAll('.todos');
    todoCounter.innerText = `${todosEl.length} items left`;
}

function completeRemoveTodo(e) {
    const item = e.target;
    
    if (item.classList[0] === 'todos__delete') {
        item.parentElement.remove();
    } else {
        item.parentElement.classList.add('is-completed');
        item.parentElement.children[0].innerHTML = '<img src="./img/icon-check.svg" alt="">';
    }
    
    countTodos();
}

function clearCompleteTodos() {
    const completedTodos = document.querySelectorAll('.is-completed');
    completedTodos.forEach(el => el.remove());
    countTodos();
}

const removeAddActive = (el) => {
    document.querySelector('.active').classList.remove('active');
    el.classList.add('active');
} 

function filterAll() {
    removeAddActive(this);
    const allTodos = document.querySelectorAll('.todos');
    allTodos.forEach(todo => todo.style.display = 'flex');
    todoCounter.innerText = `${allTodos.length} items`;
}

function filterActive() {
    removeAddActive(this);
    const activeTodos = document.querySelectorAll('.todos:not(.is-completed)');
    const completedTodos = document.querySelectorAll('.is-completed');
    activeTodos.forEach(todo => todo.style.display = 'flex');
    completedTodos.forEach(todo => todo.style.display = 'none');
    todoCounter.innerText = `${activeTodos.length} items`;
}

function filterCompleted() {
    removeAddActive(this);
    const activeTodos = document.querySelectorAll('.todos:not(.is-completed)');
    const completedTodos = document.querySelectorAll('.is-completed');
    completedTodos.forEach(todo => todo.style.display = 'flex');
    activeTodos.forEach(todo => todo.style.display = 'none')
    todoCounter.innerText = `${completedTodos.length} items`;
}

new Sortable(todoList, {
    handle: '.handle',
    animation: 200
})