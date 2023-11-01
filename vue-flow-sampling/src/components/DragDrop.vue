<script setup>
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { nextTick, watch, ref } from "vue";
import DragDropSidebar from "@/components/DragDropSidebar.vue";

defineProps({
  title: String,
});

const id = ref(0);
const getNewId = () => `dndnode_${id.value++}`;
const vueFlowInstanceRef = ref(null);

const { findNode, onConnect, addEdges, addNodes, project, vueFlowRef, onPaneReady } =
  useVueFlow({
    nodes: [
      {
        id: "1",
        type: "input",
        label: "input node",
        position: { x: 250, y: 25 },
      },
    ],
  });

onPaneReady((vueFlowInstance) => {
  vueFlowInstanceRef.value = vueFlowInstance;
});

const stop = watch(vueFlowInstanceRef, (instance) => {
  if (instance) {
    instance.fitView({ padding: 1, includeHiddenNodes: true });
    stop();
  }
});

const onDragOver = (event) => {
  event.preventDefault();

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
};

const onDrop = (event) => {
  const type = event.dataTransfer?.getData("application/vueflow");
  const { left, top } = vueFlowRef.value.getBoundingClientRect();
  const position = project({
    x: event.clientX - left,
    y: event.clientY - top,
  });

  const newNode = {
    id: getNewId(),
    type,
    position,
    label: `${type} node`,
  };

  addNodes([newNode]);

  nextTick(() => {
    const node = findNode(newNode.id);
    const stop = watch(
      () => node.dimensions,
      (dimensions) => {
        console.log("watch", node, dimensions);
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
};

onConnect((params) => addEdges(params));
</script>

<template>
  <div class="title" style="text-align: center">{{ title }}</div>
  <div class="dndflow" @drop="onDrop">
    <drag-drop-sidebar />
    <vue-flow @dragover="onDragOver" />
  </div>
</template>

<style>
.title {
  height: 5%;
}
.dndflow {
  flex-direction: column;
  display: flex;
  height: 90%;
}

.dndflow aside {
  color: #fff;
  font-weight: 700;
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: rgba(16, 185, 129, 0.75);
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 10px #0000004d;
}
.dndflow aside .nodes > * {
  margin-bottom: 10px;
  cursor: grab;
  font-weight: 500;
  -webkit-box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.25);
  box-shadow: 5px 5px 10px 2px #00000040;
}
.dndflow aside .description {
  margin-bottom: 10px;
}
.dndflow .vue-flow-wrapper {
  flex-grow: 1;
  height: 100%;
}
@media screen and (min-width: 640px) {
  .dndflow {
    flex-direction: row;
  }
  .dndflow aside {
    min-width: 25%;
  }
}
@media screen and (max-width: 639px) {
  .dndflow aside .nodes {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
}
</style>
