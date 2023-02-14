import html from './app.html?raw'
import todoStore, { Filters } from "../store/todo.store";
import { renderPending, renderTodos } from './use-cases';

const ElementsIDs = {
    ClearCompletedButtom: '.clear-completed',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    TodoList: '.todo-list',
    PendingCountLabel: '#pending-count',
};



/**
 * Esta función se autoinvoca
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementsIDs.TodoList, todos );
        updatePendingCount();
    };


    const updatePendingCount = () => {
        renderPending( ElementsIDs.PendingCountLabel );
    }


    // Cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


    // Referencias HTML
    const clearCompletedButton = document.querySelector( ElementsIDs.ClearCompletedButtom );
    const newDescriptionInput = document.querySelector( ElementsIDs.NewTodoInput );
    const filtersLIs = document.querySelectorAll( ElementsIDs.TodoFilters );
    const todoListUl = document.querySelector( ElementsIDs.TodoList );


    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if ( event.keyCode !== 13 ) return;                                        // 13 es el código para la tecla 'enter'
        if ( event.target.value.trim().length === 0 ) return;                      // 'trim' borra los espacios al principio y al final

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');                        // Busca al padre mas cercano con el elemento 'data-id'
        elementId = element.getAttribute('data-id');
        todoStore.toggleTodo(elementId);
        displayTodos();
    });

    todoListUl.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');                        // Busca al padre mas cercano con el elemento 'data-id'
        elementId = element.getAttribute('data-id');
        if( isDestroyElement) {
            todoStore.deleteTodo( elementId );
            displayTodos();
        };
    });

    clearCompletedButton.addEventListener('click', () =>{
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach( element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch( element.target.text ) {
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                break;
            };
            displayTodos();
        });
    });

}