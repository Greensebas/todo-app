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
        new Todo('Piedra del poder'),
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
 * Show a todo-list
 * @param {String} filter (All, Completed, Pending)
 * @return {Array<String>} Return a filtered todos
 */
const getTodos = ( filter = Filters.All ) => {
    
    switch( filter ) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter( todo => todo.done );     // esto se podría dejar (todo => todo.done === true) ya que si la propiedad done está en 'true' lo va a devolver y si está en 'false' no
    
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );     // esto se podría dejar (todo => todo.done === false) ya que si la propiedad done está en 'false' lo va a devolver y si está en 'true' no
        
        default:
            throw new Error(`Option ${filter} is not valid`);
    }
}

/**
 * Add a todo to the todo-list
 * @param {String} description 
 * @return {Array<String>} Return a todo-list
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error('Description is required');

    state.todos.push( new Todo( description ));
};


/**
 * This function changes the todo property 'done'
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ) {
            todo.done = !todo.done;
        };
        return todo;
    })
};


/**
 * This function delete a todo from a todo-list
 * @param {String} todoId 
 * @return {Array<String>} Return a todo-list
 */
const deleteTodo = ( todoId ) => {
    if ( !todoId ) throw new Error('todoId is required');

    state.todos = state.todos.filter( todo => todo.id !== todoId );
};

/**
 * This function delete a completed todo
 * @return {Array<String>} Return a todo-list
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => todo.done);
};

/**
 * 
 * @param {Filters} newFilter (All, Completed, Pending)
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
};


const getCurrentFilter = () => {
    return state.filter;
};

export default { 
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}