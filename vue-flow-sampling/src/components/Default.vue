<script setup>
import { Panel, VueFlow, isNode, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { ref, watch } from "vue";
import { initialElements } from "@/initial-elements.js";
import IconReset from "@/components/icons/IconReset.vue";
import IconShuffle from "@/components/icons/IconShuffle.vue";
import IconAutoFit from "@/components/icons/IconAutoFit.vue";
import IconSun from "@/components/icons/IconSun.vue";
import IconMoon from "@/components/icons/IconMoon.vue";
import IconLog from "@/components/icons/IconLog.vue";

defineProps({
  title: String,
});

const {
  onPaneReady,
  onNodeDragStop,
  onConnect,
  addEdges,
  setTransform,
  toObject,
} = useVueFlow();

const elements = ref(initialElements);
const vueFlowInstanceRef = ref(null);

onPaneReady((vueFlowInstance) => {
  vueFlowInstanceRef.value = vueFlowInstance;
});

const stop = watch(vueFlowInstanceRef, (instance) => {
  if (instance) {
    instance.fitView({ padding: 1, includeHiddenNodes: true });
    stop();
  }
});

onNodeDragStop((e) => {
  console.log("drag stop", e);
});

onConnect((params) => addEdges(params));

const dark = ref(false);

const updatePos = () => {
  return elements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      };
    }
  });
};

const logToObject = () => console.log(toObject());

const resetTransform = () => setTransform({ x: 0, y: 0, zoom: 1 });

const toggleClass = () => (dark.value = !dark.value);
</script>

<template>
  <div class="title" style="text-align: center">{{ title }}</div>
  <vue-flow
    v-model="elements"
    :class="{ dark }"
    class="basicflow"
    :default-viewport="{ zoom: 1.5 }"
    :min-zoom="0.2"
    :max-zoom="4"
  >
    <background :pattern-color="dark ? '#FFFFFB' : '#aaa'" gap="8" />

    <mini-map />

    <controls />

    <panel position="top-right" class="controls">
      <button
        style="background-color: #113285; color: #fffffb"
        title="Reset Transform"
        @click="resetTransform"
      >
        <icon-reset />
      </button>

      <button
        style="background-color: #6f3381; color: #fffffb"
        title="Shuffle Node Positions"
        @click="updatePos"
      >
        <icon-shuffle />
      </button>

      <button
        style="background-color: #41b883; color: #fffffb"
        title="AutoFit Transform"
        @click="vueFlowInstanceRef.fitView({padding: 1, includeHiddenNodes: true })"
      >
        <icon-auto-fit />
      </button>

      <button
        :style="{
          backgroundColor: dark ? '#FFFFFB' : '#292524',
          color: dark ? '#292524' : '#FFFFFB',
        }"
        @click="toggleClass"
        title="Toggle Darkmode"
      >
        <icon-moon v-if="dark" />
        <icon-sun v-else />
      </button>
      <button
        style="color: #292524"
        title="Log `toObject`"
        @click="logToObject"
      >
        <icon-log />
      </button>
    </panel>
  </vue-flow>
</template>

<style scoped>
.title {
  height: 5%;
}

.basicflow {
  height: 85%;
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

.basicflow.dark {
  background: #57534e;
  color: #fffffb;
}
.basicflow.dark .vue-flow__node {
  background: #292524;
  color: #fffffb;
}
.basicflow.dark .vue-flow__controls .vue-flow__controls-button {
  background: #292524;
  fill: #fffffb;
  border-color: #fffffb;
}
.basicflow.dark .vue-flow__edge-textbg {
  fill: #292524;
}
.basicflow.dark .vue-flow__edge-text {
  fill: #fffffb;
}

.basicflow .controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
.basicflow .controls button {
  padding: 4px;
  border-radius: 5px;
  font-weight: 600;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 10px #0000004d;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.basicflow .controls button:hover {
  transform: scale(102%);
  transition: 0.25s all ease;
}
</style>
