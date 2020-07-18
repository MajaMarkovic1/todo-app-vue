<template>
    <div>
        <div class="container">
            <form @submit.prevent="add()">
                <div class="post-todo">
                    <div class="col-5 form-group">
                        <h5>Create todo:</h5>
                        <input type="text" class="form-control" 
                        v-model="newTodo.todo_item" required
                        >
                    </div>
                    <div class="col-2 check">
                        <input type="checkbox" 
                        v-model="newTodo.is_priority"
                        /> Priority       
                    </div>
                </div>
                <button type="submit" class="btn btn-secondary">Submit</button>
            </form><br>

        <div class="todo-wrapper">
            <div class="todo-list">
                <div class="todo-labels" v-if="priority.length > 0">
                    <h5 class="text-danger"><strong>Priorities</strong>:</h5>
                    <h6 class="text-danger">Check done</h6>
                </div>
                <ul class="priorities" v-for="todo in priority" :key="todo.id">
                    <li>
                        <div class="shadow p-2 bg-danger rounded todo">
                        <label>{{ todo.todo_item }}</label>
                        <div>
                            <a @click="deleteTodo(todo)"><i class="fas fa-times"></i></a>
                            <a @click="editTodo(todo)"><i class="fas fa-edit"></i></a> 
                        </div> 
                        </div>
                        <input type="checkbox" 
                       v-model="todo.is_done"
                    />
                    </li>
                </ul><br>
            
                <h5 class="todos" v-if="notPriority.length > 0"><strong>Todos</strong>:</h5> 
                <ul class="shadow p-2 rounded my-todos" v-for="todo in notPriority" :key="todo.id" >
                    <li>
                        <label>{{todo.todo_item}}</label>
                        <div>
                        <a @click="deleteTodo(todo)"><i class="fas fa-times"></i></a>
                        <a @click="editTodo(todo)"><i class="fas fa-edit"></i></a> 
                        </div> 
                    </li>
                </ul>
            </div>

            <div class="todo-done" v-if="doneTodos.length > 0">
                <h5 class="text-info" ><strong>Done</strong>:</h5>
                <ul class="shadow p-2 rounded bg-info" v-for="todo in doneTodos" :key="todo.id" >
                <li>
                    <label>{{todo.todo_item}}</label>
                    <a @click="deleteTodo(todo)"><i class="fas fa-times"></i></a>
                </li>
                </ul>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import { todoService } from '../services/todo';

export default {
    name: "todo",
    data() {
        return {
            todos: todoService.getAll(),
            newTodo: {
                id: null,
                todo_item: '',
                is_priority: false, 
                is_done: false
            },
        }
    },
    computed: {
        priority() {
            return this.todos.filter(todo=> todo['is_priority'] && !todo['is_done']);
        },

        notPriority() {
            return this.todos.filter(todo=> !todo['is_priority'] && !todo['is_done']);    
        },

        doneTodos() {
            return this.todos.filter(todo=> todo['is_done']);        
        },
    },

    methods: {
        
        add() {
            todoService.addTodo(this.newTodo);
            this.newTodo = {}
        },

        deleteTodo(todo){
            todoService.delete(todo);
        },
        editTodo(todo) {
            this.newTodo = todo
            this.todos.splice(this.todos.indexOf(todo), 1)
        }
    }
}
</script>
