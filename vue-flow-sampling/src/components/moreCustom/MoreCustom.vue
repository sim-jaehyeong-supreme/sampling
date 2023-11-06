<script setup>
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { nextTick, ref, watch, markRaw } from "vue";
import CustomSidebar from "@/components/moreCustom/CustomSidebar.vue";
import CustomPanel from "@/components/moreCustom/CustomPanel.vue";
import CustomDialog from "@/components/moreCustom/CustomDialog.vue";
import DataSource from "@/components/moreCustom/nodes/DataSource.vue";
import Dataset from "@/components/moreCustom/nodes/Dataset.vue";
import Node from "@/components/moreCustom/nodes/Node.vue";

defineProps({
  title: String,
});

const nodeTypes = {
  dataSource: markRaw(DataSource),
  dataset: markRaw(Dataset),
  node: markRaw(Node),
}

const {
  onPaneReady,
  onNodeClick,
  onEdgeClick,
  onConnect,
  findNode,
  findEdge,
  addEdges,
  addNodes,
  removeEdges,
  project,
  vueFlowRef,
  toObject,
} = useVueFlow({nodes: []});

const vueFlowInstanceRef = ref(null);
const isDoneFitView = ref(false);
const isVisibleDialog = ref(false);
const currentModel = ref(null);


onPaneReady((vueFlowInstance) => {
  vueFlowInstanceRef.value = vueFlowInstance;
});
const stop = watch(vueFlowInstanceRef, (instance) => {
  if (instance) {
    instance.fitView({ padding: 1, includeHiddenNodes: true });
    isDoneFitView.value = true;
    stop();
  }
});

/** panel feature */
const isDark = ref(false);
const toggleClass = () => {
  isDark.value = !isDark.value;
}
const fitView = () => {
  vueFlowInstanceRef.value.fitView({ padding: 1, includeHiddenNodes: true });
}

// onNodeDragStop((e) => {
//   console.log("drag stop", e);
// });

onConnect((params) => {
  // 禁止
  // 1. dataSource bottom <-> dataset top
  if (
    params.sourceHandle.includes("dataSource") && params.sourceHandle.includes("bottom") &&
    params.targetHandle.includes("dataset") && params.targetHandle.includes("top")
  ) {
    alert("禁止：dataSource bottom <-> dataset top");
    return;
  }

  // 2. dataSource bottom <-> node bottom
  if (
    params.sourceHandle.includes("dataSource") && params.sourceHandle.includes("bottom") &&
    params.targetHandle.includes("node") && params.targetHandle.includes("bottom") ||

    params.sourceHandle.includes("node") && params.sourceHandle.includes("bottom") &&
    params.targetHandle.includes("dataSource") && params.targetHandle.includes("bottom")
  ) {
    alert("禁止：dataSource bottom <-> node bottom");
    return;
  }

  // 3. node top <-> dataset top
  if (
    params.sourceHandle.includes("node") && params.sourceHandle.includes("top") &&
    params.targetHandle.includes("dataset") && params.targetHandle.includes("top") ||
    params.sourceHandle.includes("dataset") && params.sourceHandle.includes("top") &&
    params.targetHandle.includes("node") && params.targetHandle.includes("top")
  ) {
    alert("禁止：node top <-> dataset top");
    return;
  }

  addEdges([{...params, type: "smoothstep"}]);
});

onEdgeClick(({ edge }) => {
  if (confirm(`線を削除しますか？`)) {
    removeEdges([edge]);
  } 
})

// DnD feature
const id = ref(0);
const getNewId = (type) => `${type}_${id.value++}`;
const onDragOver = (event) => {
  event.preventDefault();

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
}

const onDrop = (event) => {
  const { id, type, subType, name, targetHandle, sourceHandle} = JSON.parse(event.dataTransfer?.getData("application/vueflow"));
  const { left, top} = vueFlowRef.value.getBoundingClientRect();

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top,
  });

  const newNode = {
    id: getNewId(type),
    type,
    data: { // for addtional data
      subType
    },
    position,
    label: name,
    targetHandle,
    sourceHandle
  };

  addNodes([newNode]);

  nextTick(() => {
    const node = findNode(newNode.id);
    const stop = watch(
      () => node.dimensions,
      (dimensions) => {
        if (dimensions.width > 0 && dimensions.height > 0) {
          node.position = {
            x: node.position.x - node.dimensions.width / 2,
            y: node.position.y - node.dimensions.height / 2,
          };
          stop();
        }
      },
      { deep: true, flush: "post" }
    );
  });
}

onNodeClick((e) => {
  isVisibleDialog.value = true;
  currentModel.value = e.node;
});

const onToggleIsVisibleDialog = (value) => {
  isVisibleDialog.value = value;
}

</script>

<template>
  <div class="title" style="text-align: center">{{ title }} </div>
  <div class="dndflow" @drop="onDrop">
    <custom-sidebar />
    <vue-flow
      :class="[isDark ? 'dark' : null]"
      class="customflow"
      :default-viewport="{ zoom: 1.5 }"
      :min-zoom="0.2"
      :max-zoom="4"
      @dragover="onDragOver"
      :nodeTypes="nodeTypes"
    >
      <custom-panel :is-done-fit-view="isDoneFitView" :is-dark="isDark" @toggle-class="toggleClass" @auto-fit="fitView"/>
      <background :pattern-color="isDark ? '#FFFFFB' : '#aaa'" gap="8" />
      <mini-map />
      <controls />
    </vue-flow>
  </div>
  <custom-dialog 
     v-model:isVisibleDialog="isVisibleDialog"
     v-model:model="currentModel"
    @update:isVisibleDialog="onToggleIsVisibleDialog"
    />
</template>

<style scoped lang="scss">
.title {
  height: 5%;
}

.customflow {
  flex-direction: column;
  display: flex;
  height: 90%;
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

.customflow.dark {
  background: #57534e;
  color: #fffffb;
}

.customflow aside {
  color: #fff;
  font-weight: 700;
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: rgba(16, 185, 129, 0.75);
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 10px #0000004d;
}
.customflow aside .nodes > * {
  margin-bottom: 10px;
  cursor: grab;
  font-weight: 500;
  -webkit-box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.25);
  box-shadow: 5px 5px 10px 2px #00000040;
}
.customflow aside .description {
  margin-bottom: 10px;
}
.customflow .vue-flow-wrapper {
  flex-grow: 1;
  height: 100%;
}
@media screen and (min-width: 640px) {
  .customflow {
    flex-direction: row;
  }
  .customflow aside {
    min-width: 25%;
  }
}
@media screen and (max-width: 639px) {
  .customflow aside .nodes {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
}

.customflow.dark .vue-flow__node {
  background: #292524;
  color: #fffffb;
}
.customflow.dark .vue-flow__controls .vue-flow__controls-button {
  background: #292524;
  fill: #fffffb;
  border-color: #fffffb;
}
.customflow.dark .vue-flow__edge-textbg {
  fill: #292524;
}
.customflow.dark .vue-flow__edge-text {
  fill: #fffffb;
}

</style>
