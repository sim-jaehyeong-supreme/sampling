<script setup>
import { ref } from "vue";
import NodeBox from "@/components/NodeBox.vue";

const list = ref([]);
const isDraggingNodeBox = ref(false);
const drop = (e) => {
  if (isDraggingNodeBox.value) return;

  if (e) {
    const id = e.dataTransfer.getData("id");
    const subId = e.dataTransfer.getData("subId");
    const title = e.dataTransfer.getData("title");
    const subTitle = e.dataTransfer.getData("subTitle");

    const x = e.offsetX - 100;
    const y = e.offsetY - 30;
    list.value.push({
      id: id,
      title: title,
      subId: subId,
      subTitle: subTitle,
      x: x,
      y: y,
    });
  }
};

const dropNode = (e) => {
  if (!isDraggingNodeBox.value) return;
  if (e) {
    const index = e.dataTransfer.getData("index");
    const id = e.dataTransfer.getData("id");
    const subId = e.dataTransfer.getData("subId");
    const title = e.dataTransfer.getData("title");
    const subTitle = e.dataTransfer.getData("subTitle");

    const x = e.currentTarget === e.target ? e.offsetX - 200 : e.pageX - 500;
    const y = e.currentTarget === e.target ? e.offsetY - 60 : e.pageY - 60;

    list.value.splice(index, 1, {
      id: id,
      title: title,
      subId: subId,
      subTitle: subTitle,
      x: x,
      y: y,
    });
  }
  isDraggingNodeBox.value = false;
};

const dragStart = (item, index, event) => {
  isDraggingNodeBox.value = true;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("index", index);
    event.dataTransfer.setData("id", item.id);
    event.dataTransfer.setData("subId", item.subId);
    event.dataTransfer.setData("title", item.title);
    event.dataTransfer.setData("subTitle", item.subTitle);
  }
};

const dragEnd = () => {
  // 何もしない
};
</script>

<template>
  <div
    class="editarea-container"
    @drop="drop"
    @drop.prevent="dropNode"
    @dragover.prevent
    @dragend.prevent
  >
    <NodeBox
      v-for="(item, index) in list"
      :key="`${item.id}_${item.subId}`"
      :item="item"
      :index="index"
      @node-box-drag-start="dragStart"
      @node-box-drag-end="dragEnd"
    />
  </div>
</template>

<style scoped>
.editarea-container {
  background: #f5f7fa;
  height: 100vh;
  position: relative;
}
</style>
