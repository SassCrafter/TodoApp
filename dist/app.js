const getElByClass = (el) => document.querySelector(el);

const themeSwitcher = getElByClass('.todo__theme-switcher');
const todo = getElByClass('.todo');


themeSwitcher.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('light-theme');
    themeSwitcher.classList.toggle('light-theme');
    todo.classList.toggle('light-theme');
})