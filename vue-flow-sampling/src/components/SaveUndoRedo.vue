<script setup>
import { VueFlow } from "@vue-flow/core";
import { ref } from "vue";
import SaveUndoRedoControls from "@/components/SaveUndoRedoControls.vue";

defineProps({
  title: String,
});

const elements = ref([
  { id: "1", label: "Node 1", position: { x: 100, y: 100 } },
]);
</script>

<template>
  <div class="title" style="text-align: center">{{ title }}</div>
  <vue-flow v-model="elements" class="save-undo-redo-flow">
      <SaveUndoRedoControls/>
  </vue-flow>
</template>

<style scoped>
.title {
  height: 5%;
}

.save-undo-redo-flow {
  height: 90%;
}

</style>
