<template>
  <q-card v-if="todo.type == tab" square>
    <q-item class="q-pa-none q-pl-sm q-pr-xs">
      <q-item-section @click="isEditing = todo.id">
        <q-item-label v-if="!isEditing" lines="1">
          {{ todo.title }}
        </q-item-label>
        <q-input
          v-else
          v-model="editedTodo"
          dense
          square
          autofocus
          @keyup.enter="handleEditDone(todo.id, editedTodo)"
        />
      </q-item-section>

      <q-item-section side>
        <div v-if="!isEditing" class="text-grey-8">
          <q-btn
            class="text-red"
            size="12px"
            flat
            dense
            icon="delete_outline"
            @click="handleTodoDelete(todo)"
          />
          <q-btn
            class="text-blue"
            size="9px"
            flat
            dense
            icon="done"
            @click="handleTodoDone(todo)"
          />
        </div>

        <div class="text-grey-8" v-if="isEditing">
          <q-btn
            v-if="isEditing"
            class="text-red"
            size="12px"
            flat
            dense
            icon="close"
            @click="handleEditCancel(todo)"
          />
          <q-btn
            class="text-blue"
            size="9px"
            flat
            dense
            icon="done"
            @click="handleEditDone(todo.id, editedTodo)"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup lang="ts">
import { handleEditDoneKey } from "src/symbols";
import { ref, inject } from "vue";
import { Todo } from "./models";

// injections
const handleTodoEdit = inject(handleEditDoneKey, () => {});

// props
const props = defineProps<{
  todo: Todo;
  tab: string;
  handleTodoDelete: (todo: Todo) => void;
  handleTodoDone: (todo: Todo) => void;
}>();

// Editing Todo
const isEditing = ref<string>("");
const editedTodo = ref<string>(props.todo.title);

const handleEditCancel = (todo: Todo) => {
  isEditing.value = "";
  todo.is_editing = false;
};

const handleEditDone = (id: string, editedTodo: string) => {
  isEditing.value = "";
  handleTodoEdit(id, editedTodo);
};
</script>

<style scoped></style>
