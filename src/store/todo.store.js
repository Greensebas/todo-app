import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
};


const state = {
    todos: [
        new Todo('Gema del alma'),
        new Todo('Gema del tiempo'),
        new Todo('Gema del poder'),
        new Todo('Gema del espacio'),
        new Todo('Gema de la realidad'),
        new Todo('Gema de la mente'),
    ],
    filter: Filters.All,
};


const initStore = () => {
    loadStore();
    console.log('InitStore 🥑');
};

/**
 * Read the local storage
 * @returns 
 */
const loadStore = () => {
    if( !localStorage.getItem('state') ) return;

    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
};

/**
 * Set the local storage
 */
const saveStateToLocalStorage = () => {
    localStorage.setItem( 'state', JSON.stringify(state) );
}

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
    saveStateToLocalStorage();
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
    });
    saveStateToLocalStorage();
};


/**
 * This function delete a todo from a todo-list
 * @param {String} todoId 
 * @return {Array<String>} Return a todo-list
 */
const deleteTodo = ( todoId ) => {
    if ( !todoId ) throw new Error('todoId is required');
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();
};

/**
 * This function delete a completed todo
 * @return {Array<String>} Return a todo-list
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done);
    saveStateToLocalStorage();
};

/**
 * 
 * @param {Filters} newFilter (All, Completed, Pending)
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
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