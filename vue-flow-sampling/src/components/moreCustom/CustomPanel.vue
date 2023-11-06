<script setup>
import { Panel, useVueFlow } from "@vue-flow/core";
import { ref, watch, computed } from "vue";
import IconReset from "@/components/icons/IconReset.vue";
import IconAutoFit from "@/components/icons/IconAutoFit.vue";
import IconSun from "@/components/icons/IconSun.vue";
import IconMoon from "@/components/icons/IconMoon.vue";
import IconLog from "@/components/icons/IconLog.vue";

const props = defineProps({
  isDoneFitView: Boolean,
  isDark: Boolean,
});
const emits = defineEmits(["toggleClass", "autoFit"]);
const defaultPanelRef = ref(null);
const surTop = computed(() => {
  if (defaultPanelRef.value) return defaultPanelRef.value.$el.clientHeight + 8;
  else return 0;
});

/** init vue-flow */
const { isNode, setNodes, setEdges, setTransform, toObject } =
  useVueFlow();

/** default-controls */
const logToObject = () => console.log(toObject());

const resetTransform = () => setTransform({ x: 0, y: 0, zoom: 1 });

/** save-undo-redo-controls */
const stop = watch(
  () => props.isDoneFitView,
  (flag) => {
    if (flag) {
      onSave();
      stop();
    }
  }
);

const flowKey = new Date().getTime().toString();
const storageData = ref({
  key: flowKey,
  history: [],
});
const currentHistoryIdx = ref(-1); // 初期値

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
    setTransform({ x, y, zoom: flow.zoom || 1.5 });
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
    setTransform({ x, y, zoom: flow.zoom || 0 });
  }
};
</script>

<template>
  <Panel ref="defaultPanelRef" position="top-right" class="default-controls">
    <button
      style="background-color: #113285; color: #fffffb"
      title="Reset Transform"
      @click="resetTransform"
    >
      <icon-reset />
    </button>

    <button
      style="background-color: #41b883; color: #fffffb"
      title="AutoFit Transform"
      @click="
        $emit('autoFit')
      "
    >
      <icon-auto-fit />
    </button>

    <button
      :style="{
        backgroundColor: isDark ? '#FFFFFB' : '#292524',
        color: isDark ? '#292524' : '#FFFFFB',
      }"
      @click="$emit('toggleClass')"
      title="Toggle Darkmode"
    >
      <icon-moon v-if="isDark" />
      <icon-sun v-else />
    </button>
    <button style="color: #292524" title="Log `toObject`" @click="logToObject">
      <icon-log />
    </button>
  </Panel>
  <Panel position="top-right" class="save-undo-redo-controls" :style="{
    top: `${surTop}px`,
  }">
    <button style="background-color: #33a6b8" @click="onSave">save</button>
    <button
      style="background-color: #113285"
      :disabled="currentHistoryIdx === 0"
      @click="onUndo"
    >
      undo
    </button>
    <button
      style="background-color: #113285"
      :disabled="
        currentHistoryIdx >= storageData.history.length - 1 ||
        storageData.history.length === 1
      "
      @click="onRedo"
    >
      redo
    </button>
  </Panel>
</template>

<style scoped>
.default-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
.default-controls button {
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
.default-controls button:hover {
  transform: scale(102%);
  transition: 0.25s all ease;
}

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
