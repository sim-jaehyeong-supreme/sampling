<script setup>
import { ref } from 'vue';


const data = ref({
  dataSource: [
    {
      id: 1,
      name: "source 1",
    },
    {
      id: 2,
      name: "source 2",
    },
    {
      id: 3,
      name: "source 3",
    },
  ],
  dataset: [
  {
      id: 1,
      name: "set 1",
    },
    {
      id: 2,
      name: "set 2",
    },
    {
      id: 3,
      name: "set 3",
    },
  ],
});
const onDragStart = (event, nodeType, idx) => {
  if (event.dataTransfer) {
    if (nodeType === "dataSource") {
      event.dataTransfer.setData("application/vueflow", JSON.stringify(data.value.dataSource[idx]));
      event.dataTransfer.effectAllowed = "move";
    } else if (nodeType === "dataset") {
      event.dataTransfer.setData("application/vueflow", JSON.stringify(data.value.dataset[idx]));
      event.dataTransfer.effectAllowed = "move";
    }
  }
};
</script>

<template>
  <aside>
    <div class="description">You can drag these nodes to the pane.</div>

    <div class="nodes">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
      >
        <el-sub-menu index="1">
          <template #title>
            <span>DataSources</span>
          </template>
          <template v-for="(item, idx) in data.dataSource" :key="item.id">
            <div
              class="vue-flow__node-default"
              :draggable="true"
              @dragstart="onDragStart($event, 'dataSource', idx)"
            >
              {{ item.name }}
            </div>
          </template>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <span>Datasets</span>
          </template>
          <template v-for="(item, idx) in data.dataset" :key="item.id">
            <div
              class="vue-flow__node-default"
              :draggable="true"
              @dragstart="onDragStart($event, 'dataset', idx)"
            >
              {{ item.name }}
            </div>
          </template>
        </el-sub-menu>
      </el-menu>
    </div>
  </aside>
</template>

<style></style>
