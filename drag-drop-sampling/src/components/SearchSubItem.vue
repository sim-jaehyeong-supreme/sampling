<script setup>
import { ref } from "vue";
const { sub } = defineProps({
  sub: Object,
});

const emits = defineEmits(["dragstart", "dragend"]);
const isDragging = ref(false);

const handleDragStart = (event) => {
  isDragging.value = true;
  emits("dragstart", sub, event);
}

const handleDragEnd = (event) => {
  isDragging.value = false;
  emits("dragend", sub, event);
}
</script>

<template>
  <div
    class="subitem"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <span>{{ sub.title }}</span>
  </div>
</template>

<style scoped>
.subitem {
  display: flex;
  justify-content: space-between;

  padding: 4px 4px;
  margin: 4px 0 0 8px;

  color: #000000;
  background: #fefefe;
  border: solid 1px #000000;

  cursor: pointer;
}

.subitem:hover {
  margin: 4px 0;

  background: #efefef;
}
</style>
