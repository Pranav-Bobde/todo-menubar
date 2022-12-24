<template>
  <div>
    <div>
      <q-btn
        class="block full-width bg-blue-6 text-white"
        size="15px"
        dense
        square
        icon="add"
        @click="handleTodoAdd"
      />
    </div>
    <div style="margin: 0 auto">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="top" label="Top" />
          <q-tab name="rest" label="Rest" />
        </q-tabs>
      </q-card>

      <q-tab-panels v-model="tab" animated class="">
        <q-tab-panel name="top" class="q-pa-none">
          <TodoList
            :todos="todos"
            :tab="tab"
            :handleTodoDelete="handleTodoDelete"
            :handleTodoDone="handleTodoDone"
          />
        </q-tab-panel>

        <q-tab-panel name="rest" class="q-pa-none">
          <TodoList
            :todos="todos"
            :tab="tab"
            :handleTodoDelete="handleTodoDelete"
            :handleTodoDone="handleTodoDone"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from "vue";
import { Todo } from "./models";
import TodoList from "./TodoList.vue";
import { handleEditDoneKey } from "src/symbols";
import PocketBase from "pocketbase";
import { v4 as uuidv4 } from "uuid";

const pb = new PocketBase("http://localhost:8090");

onMounted(() => {
  dbFetchTodos();
});

const tab = ref("top");
const tabs = ref<string[]>(["top", "rest"]);

// db functions
function dbFetchTodos() {
  pb.collection("todos")
    .getFullList()
    .then((res) => {
      console.log("Res: ", res);
      todos.value = res.map((r) => {
        return {
          id: r.id,
          type: r.type,
          title: r.title,
          completed: r.completed,
          is_deleted: r.is_deleted,
          is_editing: r.is_editing,
          created: r.created,
          updated: r.updated,
        };
      });
    });
}

function dbAddTodo(todo: Todo) {
  const res = pb
    .collection("todos")
    .create(todo)
    .then((res) => {
      console.log("Res: ", res);
    })
    .catch((error) => {
      console.error("Error adding document: ", error.data);
    });
  return res;
}

function dbUpdateTodo(todo: Todo) {
  const res = pb.collection("todos").update(todo.id, todo);
}

function dbDeleteTodo(todo: Todo) {
  const res = pb.collection("todos").delete(todo.id);
}

const todos = ref<Todo[]>([]);
const handleTodoDelete = (todo: Todo) => {
  const findTodo = todos.value.find((t) => t.id === todo.id);
  const index = todos.value.indexOf(findTodo!);
  todos.value.splice(index, 1);
  dbDeleteTodo(todo);
};

const handleTodoDone = (todo: Todo) => {
  const findTodo = todos.value.find((t) => t.id === todo.id);
  const index = todos.value.indexOf(findTodo!);
  todos.value.splice(index, 1);
  dbDeleteTodo(todo);
};

const handleTodoAdd = () => {
  const newTodo: Todo = {
    id: uuidv4().toString().substring(0, 15),
    type: tab.value,
    title: "Todo " + (todos.value.length + 1) + " - Tap To Edit",
    completed: false,
    is_deleted: false,
    is_editing: false,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  };
  todos.value.push(newTodo);
  dbAddTodo(newTodo);
};

const handleEditDone = (id: string, newTitle: string) => {
  todos.value.forEach((t) => {
    if (t.id === id) {
      t.title = newTitle;
      t.is_editing = false;
    }
  });
  const updatedTodo = todos.value.find((t) => t.id === id)!
  dbUpdateTodo(updatedTodo);
};

provide(handleEditDoneKey, handleEditDone);
</script>
