<script setup>
import { Panel, useVueFlow } from "@vue-flow/core";
import { ref, watch } from "vue";

const flowKey = new Date().getTime().toString();

const storageData = ref({
  key: flowKey,
  history: [],
});
const currentHistoryIdx = ref(-1);  // 初期値
const {
  onPaneReady,
  nodes,
  addNodes,
  setNodes,
  setEdges,
  dimensions,
  setTransform,
  toObject,
  onConnect,
  addEdges
} = useVueFlow();

const vueFlowInstanceRef = ref(null);

onPaneReady((vueFlowInstance) => {
  vueFlowInstanceRef.value = vueFlowInstance;
});

const stop = watch(vueFlowInstanceRef, (instance) => {
  if (instance) {
    // init save
    onSave();
    stop();
  }
});

const onSave = () => {
  currentHistoryIdx.value++;
  storageData.value.history.push(JSON.stringify(toObject()));
};

const onUndo = () => {
  if (currentHistoryIdx.value === 0) return;
  currentHistoryIdx.value--;
  const flow = JSON.parse(storageData.value.history[currentHistoryIdx.value]);
  if (!flow) currentHistoryIdx.value++;
  else {
    const [x = 0, y = 0] = flow.position;
    setNodes(flow.nodes);
    setEdges(flow.edges);
    setTransform({x, y, zoom: flow.zoom || 0});
  }
};

const onRedo = () => {
  if (currentHistoryIdx.value >= storageData.value.history.length - 1) return;
  currentHistoryIdx.value++;
  const flow = JSON.parse(storageData.value.history[currentHistoryIdx.value]);
  if (!flow) currentHistoryIdx.value--;
  else {
    const [x = 0, y = 0] = flow.position;
    setNodes(flow.nodes);
    setEdges(flow.edges);
    setTransform({x, y, zoom: flow.zoom || 0});
  }
};

const onAddNode = () => {
  const id = nodes.value.length + 1;

  const newNode = {
    id: `random_node-${id}`,
    label: `Node ${id}`,
    position: {
      x: Math.random() * dimensions.value.width,
      y: Math.random() * dimensions.value.height,
    },
  }
  addNodes([newNode])
};

onConnect((params) => addEdges(params));
</script>

<template>
  <Panel position="top-right" class="save-undo-redo-controls">
    {{ currentHistoryIdx }}
    <button style="background-color: #33a6b8" @click="onSave">save</button>
    <button style="background-color: #113285" :disabled="currentHistoryIdx === 0" @click="onUndo">undo</button>
    <button style="background-color: #113285" :disabled="currentHistoryIdx >= storageData.history.length - 1 || storageData.history.length === 1" @click="onRedo">redo</button>
    <button style="background-color: #6f3381" @click="onAddNode">add node</button>
  </Panel>
</template>

<style scoped>
.save-undo-redo-controls {
  font-size: 12px;
}
.save-undo-redo-controls button {
  margin-left: 5px;
  padding: 5px;
  border-radius: 5px;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 10px #0000004d;
  cursor: pointer;
}

.save-undo-redo-controls button:disabled {
  background-color: gray !important;
}

.save-undo-redo-controls button:hover {
  transform: scale(105%);
  transition: 0.25s all ease-in-out;
}
</style>
