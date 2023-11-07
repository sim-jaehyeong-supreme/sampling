<script setup>
import { ref } from 'vue';
import { Position } from '@vue-flow/core'
import CustomCreateNodeDialog from "@/components/moreCustom/CustomCreateNodeDialog.vue";

defineProps({
  summary: String,
});

const data = ref({
  dataSource: [
    {
      id: 1,
      type: 'dataSource',
      name: "source 1",
      targetPosition: Position.Bottom,
    },
    {
      id: 2,
      type: 'dataSource',
      name: "source 2",
      targetPosition: Position.Bottom,
    },
    {
      id: 3,
      type: 'dataSource',
      name: "source 3",
      targetPosition: Position.Bottom,
    },
  ],
  dataset: [
  {
      id: 1,
      type: 'dataset',
      name: "set 1",
      targetPosition: Position.Top,
    },
    {
      id: 2,
      type: 'dataset',
      name: "set 2",
      targetPosition: Position.Top,
    },
    {
      id: 3,
      type: 'dataset',
      name: "set 3",
      targetPosition: Position.Top,
    },
  ],
  node: [
    {
      id: 1,
      type: "node",
      subType: "SQL",
      name: "SQL foo",
      memo: "memo SQL foo",
      targetHandle: Position.Top, // or Bottom, Left, Right,
      sourceHandle: Position.Bottom,
    },
    {
      id: 2,
      type: "node",
      subType: "Select",
      name: "Select bar",
      memo: "memo Select bar",
      targetHandle: Position.Top, // or Bottom, Left, Right,
      sourceHandle: Position.Bottom,
  
    },
    {
      id: 3,
      type: "node",
      subType: "Filter",
      name: "Filter foo",
      memo: "memo Filter foo",
      targetHandle: Position.Top, // or Bottom, Left, Right,
      sourceHandle: Position.Bottom,
    },
    {
      id: 4,
      type: "node",
      subType: "GroupBy",
      name: "GroupBy bar",
      memo: "memo GroupBy bar",
      targetHandle: Position.Top, // or Bottom, Left, Right,
      sourceHandle: Position.Bottom,
    },
    {
      id: 5,
      type: "node",
      subType: "Join",
      name: "Join foo",
      memo: "memo Join foo",
      targetHandle: Position.Top, // or Bottom, Left, Right,
      sourceHandle: Position.Bottom,
    },
  ]
});
const onDragStart = (event, nodeType, idx) => {
  if (event.dataTransfer) {
    if (nodeType === "dataSource") {
      event.dataTransfer.setData("application/vueflow", JSON.stringify(data.value.dataSource[idx]));
      event.dataTransfer.effectAllowed = "move";
    } else if (nodeType === "dataset") {
      event.dataTransfer.setData("application/vueflow", JSON.stringify(data.value.dataset[idx]));
      event.dataTransfer.effectAllowed = "move";
    } else if (nodeType === "node") {
      event.dataTransfer.setData("application/vueflow", JSON.stringify(data.value.node[idx]));
      event.dataTransfer.effectAllowed = "move";
    }
  }
};


const isVisibleDialog = ref(false);

const openCreateNodeDialog = () => {
  isVisibleDialog.value = true;
}

const onToggleIsVisibleDialog = (value) => {
  isVisibleDialog.value = value;
}

const onCreateNode = (result) => {
  const newId = data.value.node[data.value.node.length - 1].id + 1;

  data.value.node.push({
    id: newId,
    type: "node",
    subType: result.type,
    name: result.name,
    memo: result.memo,
  })
  onToggleIsVisibleDialog(false);
}
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
            <span>データソース</span>
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
            <span>データセット</span>
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
        <el-sub-menu index="3">
          <template #title>
            <span>ノード</span>
          </template>
          <template v-for="(item, idx) in data.node" :key="item.id">
            <div
              class="vue-flow__node-default"
              :draggable="true"
              @dragstart="onDragStart($event, 'node', idx)"
            >
              {{ item.name }}
            </div>
          </template>
          <div
              class="vue-flow__node-default create-node"
              @click="openCreateNodeDialog"
            >
              新規作成
            </div>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="summary">
      {{ summary }}
    </div>
  </aside>
  <custom-create-node-dialog 
     v-model:isVisibleDialog="isVisibleDialog"
    @update:isVisibleDialog="onToggleIsVisibleDialog"
    @create:node="onCreateNode"
    />
</template>

<style scoped lang="scss">
.create-node {
  background-color: black;
  color: white;

  &:hover {
    font-weight: 700;
  }
}

.summary {
  max-width: 300px;
}
</style>
