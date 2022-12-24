<template>
  <q-page>
    <TodoContainer />
    <!-- <q-btn flat round icon="restart_alt" @click="handleQuit" class="absolute-bottom-right"/> -->
  </q-page>
</template>

<script setup lang="ts">
import TodoContainer from "../components/TodoContainer.vue";

const handleQuit = () => {
  // window.myAPI.quitApp();
  console.log("quit called")
};
</script>

<style scoped></style>
