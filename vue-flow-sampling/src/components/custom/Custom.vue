<script setup>
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { ref, watch } from "vue";
import { initialElements } from "@/initial-elements.js";
import CustomSidebar from "@/components/custom/CustomSidebar.vue";
import CustomPanel from "@/components/custom/CustomPanel.vue";

defineProps({
  title: String,
});

const {
  onPaneReady,
  onNodeDragStop,
  onConnect,
  addEdges,
} = useVueFlow();

const elements = ref(initialElements);
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

</script>

<template>
  <div class="title" style="text-align: center">{{ title }}</div>
  <vue-flow
    v-model="elements"
    :class="[isDark ? 'dark' : null]"
    class="customflow"
    :default-viewport="{ zoom: 1.5 }"
    :min-zoom="0.2"
    :max-zoom="4"
  >
    <custom-panel :is-done-fit-view="isDoneFitView" :is-dark="isDark" @toggle-class="toggleClass" @auto-fit="fitView"/>
    <background :pattern-color="isDark ? '#FFFFFB' : '#aaa'" gap="8" />
    <mini-map />
    <controls />
  </vue-flow>
</template>

<style scoped lang="scss">
.title {
  height: 5%;
}

.customflow {
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
