<template>
  <div class="scroll-div full-height">
    <q-scroll-area
      :thumb-style="thumbStyle"
      :content-style="contentStyle"
      :content-active-style="contentActiveStyle"
      :style="{height: $q.screen.height > 410 ? '83vh' :  ($q.screen.height > 310 ? '77vh' : ($q.screen.height > 255 ? '72vh' : ($q.screen.height > 238 ? '70vh' : '68vh') ) )}"
      :thumbStyle="{ display: 'none !important' }"
    >
    
      <div v-for="todo in todos" :key="todo.id" class="q-my-sm">
        <TodoItem
          :todo="todo"
          :tab="tab"
          :handleTodoDelete="handleTodoDelete"
          :handleTodoDone="handleTodoDone"
        />
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { Todo } from "./models";
import TodoItem from "./TodoItem.vue";

// onMounted(() => {
  // divHeight.value = document.querySelector(".scroll-div")?.clientHeight;
  // console.log("divHeight: ", divHeight.value);
  // window.addEventListener("resize", () => {
  //   let divHeight = document.querySelector(".scroll-div")?.clientHeight;
  //   document
  //     .querySelector(".scroll-area-class")
  //     ?.setAttribute("style", "height: " + divHeight + "px");
  // });
// });

defineProps<{
  todos: Todo[];
  tab: string;
  handleTodoDelete: (todo: Todo) => void;
  handleTodoDone: (todo: Todo) => void;
}>();

const contentStyle = {
  backgroundColor: "rgba(0,0,0,0.02)",
  color: "#555",
};

const contentActiveStyle = {
  backgroundColor: "#eee",
  color: "black",
};

const thumbStyle = {
  right: "2px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: "0.75",
};
</script>