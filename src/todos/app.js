import html from './app.html?raw'
import todoStore from "../store/todo.store";
import { renderTodos } from './use-cases';

const ElementsIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
};



/**
 * Esta función se autoinvoca
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementsIDs.TodoList, todos );
    };

    // Cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


    // Referencias HTML
    const newDescriptionInput = document.querySelector( ElementsIDs.NewTodoInput );


    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if ( event.keyCode !== 13 ) return;                                        // 13 es el código para la tecla 'enter'
        if ( event.target.value.trim().length === 0 ) return;                      // 'trim' borra los espacios al principio y al final

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    })


}