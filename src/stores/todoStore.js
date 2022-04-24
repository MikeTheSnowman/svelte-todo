import { insert } from "svelte/internal";
import { writable } from "svelte/store";
import { supabase } from "../supabase.js";

export const todos = writable([]);

export const loadTodos = async () => {
    const {data, error} = await supabase.from('todos').select()
    if(error){
        return console.error(error);
    }

    todos.set(data);
}

export const addTodo = async (text, user_id) => {
    const {data, error} = await supabase.from('todos').insert([{text, user_id}]);
    
    if(error){
        return console.error(error);
    }

    todos.update( (cur) => {
        const newTodos = [...cur, data[0]];
        return newTodos;
    })
}

export const deleteTodo = async (id) =>{
    const {error} = await supabase.from('todos').delete().match({id});
    
    if(error){
        return console.error(error);
    }

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
export const toggleTodoCompleted = async (id, currentState) =>{
    const {error} = await supabase.from('todos').update({completed: !currentState}).match({id});
    
    if(error){
        return console.error(error);
    }

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