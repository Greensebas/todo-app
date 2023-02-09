import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
};


const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
    ],
    filter: Filters.All,
};


const initStore = () => {
    console.log(state);
    console.log('InitStore 🥑');
};


const loadStore = () => {
    throw new Error('Not implemented');
};


/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    throw new Error('Not implemented');
};


/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    
    state.todos = state.todos.map( todo => {
        
    })
};


/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
    throw new Error('Not implemented');
};


const deleteCompleted = () => {
    throw new Error('Not implemented');
};


const setFilter = ( newFilter = Filters.All ) => {
    throw new Error('Not implemented');
};


const getCurrentFilter = () => {
    throw new Error('Not implemented');
};

export default { 
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}