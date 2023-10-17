<script setup>
import { ref } from "vue";
const { item } = defineProps({
  item: Object,
});

const emits = defineEmits(["dragstart", "dragend"]);
const isDragging = ref(false);

const handleDragStart = (event) => {
  isDragging.value = true;
  emits("dragstart", item, event);
}

const handleDragEnd = (event) => {
  isDragging.value = false;
  emits("dragend", item, event);
}
</script>

<template>
  <div
    class="subitem"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <span>{{ item.subTitle }}</span>
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
