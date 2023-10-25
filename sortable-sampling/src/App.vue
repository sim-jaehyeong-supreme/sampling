<script setup>
import { ref } from "vue";
import NestedDraggable from "./components/Nested.vue";

const list = ref([
  {
    name: "task 1",
    tasks: [
      {
        type: "left",
        name: "task 2",
        tasks: [],
      },
      {
        type: "right",
        name: "task 3",
        tasks: [],
      },
    ],
  },
]);
</script>

<template>
  <div>
    <h3>Nested draggable</h3>
    <nested-draggable :tasks="list" :length="list.length"/>
  </div>
</template>
