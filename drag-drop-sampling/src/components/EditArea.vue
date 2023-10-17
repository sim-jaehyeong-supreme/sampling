<script setup>
import { ref } from 'vue';

const list = ref([]);
const drop = (e) => {
  if (e) {
    const id = e.dataTransfer.getData("id");
    const title = e.dataTransfer.getData("title");
    const x = e.offsetX - 100;
    const y = e.offsetY - 30;
    console.log(`id: ${id}, title: ${title} x: ${x}, y: ${y}`);
    list.value.push({
      id: id,
      title: title,
      x: x,
      y: y,
    });
    // emits("addNode", name, type, title, x < 0 ? 0 : x, y < 0 ? 0 : y);
  }
};
</script>

<template>
  <div class="editarea-container"
      @drop="drop"
      @dragover.prevent
      @dragend.prevent
  >
    <div class="editarea-content" v-for="item in list" :key="item.id"
      :style="{
        'left': `${item.x}px`,
        'top': `${item.y}px`,
      }"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<style scoped>
.editarea-container {
  background: #F5F7FA;
  height: 100vh;
  position: relative;
}
.editarea-content {
  position: absolute;
  
  padding: 4px 4px;
  margin: 4px 0;

  color: #000000;
  background: #fefefe;
  border: solid 1px #000000;

  cursor: pointer;
}

.editarea-content:hover {
  color: #000000;
  background: #efefef;
  border: solid 1px #000000;
}

</style>
