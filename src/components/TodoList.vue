<template>
  <div v-for="todo in todos" :key="todo.id" class="q-my-sm">
    <TodoItem :todo="todo" :tab="tab" :handleTodoDelete="handleTodoDelete" :handleTodoDone="handleTodoDone" /> 
  </div>
</template>

<script setup lang="ts">
import { Todo } from './models';
import TodoItem from './TodoItem.vue';

defineProps<{
  todos: Todo[];
  tab: string;
  handleTodoDelete: (todo: Todo) => void;
  handleTodoDone: (todo: Todo) => void;
}>();


</script>