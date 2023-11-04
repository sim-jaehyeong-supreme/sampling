<script setup>
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { nextTick, ref, watch } from "vue";
import CustomSidebar from "@/components/custom/CustomSidebar.vue";
import CustomPanel from "@/components/custom/CustomPanel.vue";

defineProps({
  title: String,
});

const {
  onPaneReady,
  onNodeDragStop,
  onConnect,
  findNode,
  addEdges,
  addNodes,
  project,
  vueFlowRef,
} = useVueFlow({nodes: []});

// const elements = ref(initialElements);
// const elements = ref([]);
const vueFlowInstanceRef = ref(null);
const isDoneFitView = ref(false);

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


onNodeDragStop((e) => {
  console.log("drag stop", e);
});

onConnect((params) => addEdges(params));

// DnD feature
const id = ref(0);
const getNewId = () => `custom_node_${id.value++}`;
const onDragOver = (event) => {
  event.preventDefault();

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
}

const onDrop = (event) => {
  const type = event.dataTransfer?.getData("application/vueflow");
  const { left, top} = vueFlowRef.value.getBoundingClientRect();
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

</script>

<template>
  <div class="title" style="text-align: center">{{ title }}</div>
  <div class="dndflow" @drop="onDrop">
    <custom-sidebar />
    <vue-flow
      :class="[isDark ? 'dark' : null]"
      class="customflow"
      :default-viewport="{ zoom: 1.5 }"
      :min-zoom="0.2"
      :max-zoom="4"
      @dragover="onDragOver"
    >
      <custom-panel :is-done-fit-view="isDoneFitView" :is-dark="isDark" @toggle-class="toggleClass" @auto-fit="fitView"/>
      <background :pattern-color="isDark ? '#FFFFFB' : '#aaa'" gap="8" />
      <mini-map />
      <controls />
    </vue-flow>
  </div>
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
