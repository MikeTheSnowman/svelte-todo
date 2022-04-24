import { writable } from "svelte/store";

export const todos = writable([]);

export const addTodo = (text) => {
    todos.update( (cur) => {
        const newTodos = [...cur, {text, completed: false, id: Date.now()}];
        return newTodos;
    })
}

export const deleteTodo = (id) =>{
    todos.update(todos => todos.filter(todo => todo.id != id));
}

// This implementation probably won't work because obj.find() returns a copy of index, not a reference.
// export const toggleTodoCompleted = (id) =>{
//     todo.update(todos => {
//         const updatedTodos = todos;
//         const currentCompletion = updatedTodos.find(todo => todo.id === id).completed;
//         updatedTodos.find(todo => todo.id === id).completed = !currentCompletion;
//         return updatedTodos;
//     });
// }

// orig implementation:
export const toggleTodoCompleted = (id) =>{
    todos.update(todos => {
        let index = -1;
        for(let i=0; i < todos.length; i++){
            if (todos[i].id === id){
                index = i;
                break;
            }
        }
        if(index !== -1)
            todos[index].completed = !todos[index].completed;
        return todos;
    });
}