<script setup>
import { ref } from "vue";
const { item, index } = defineProps({
  item: Object,
  index: Number,
});


const emits = defineEmits(["nodeBoxDragStart", "nodeBoxDragEnd"]);
const isDragging = ref(false);
const handleDragStart = (event) => {
  isDragging.value = true;
  emits("nodeBoxDragStart", item, index, event);
}

const handleDragEnd = () => {
  isDragging.value = false;
  emits("nodeBoxDragEnd");
}
</script>

<template>
  <div
    class="editarea-content"
    :style="{
      left: `${item.x}px`,
      top: `${item.y}px`,
    }"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="wrap">
      <img class="image" />
      <div class="content">
        <div class="text title">{{ item.title }}</div>
        <div class="text subtitle">{{ item.subTitle }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editarea-content {
  position: absolute;

  padding: 4px 4px;
  margin: 4px 0;

  color: #000000;
  background: #fefefe;
  border: solid 1px #000000;

  cursor: pointer;

  width: 320px;
  height: 80px;
}

.editarea-content:hover {
  color: #000000;
  background: #efefef;
  border: solid 1px #000000;
}

.wrap {
  display: flex;
}

.image {
  width: 80px;
  height: 80px;
}

.content {
  width: auto;
  padding: 12px 16px 12px 16px;
  height: 54px;
}

.title {
  font-weight: 300;
  font-size: 12px;
}

.subtitle {
  font-weight: 600;
  font-size: 16px;
}
</style>
