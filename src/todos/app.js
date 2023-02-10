import html from './app.html?raw'
import todoStore from "../store/todo.store";
import { renderTodos } from './use-cases';

const ElementsIDs = {
    TodoList: '.todo-list'
}



/**
 * Esta función se autoinvoca
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementsIDs.TodoList, todos )
    }

    // Cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();
}