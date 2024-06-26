<template>
  <div>isResizing: {{isResizing}}</div>
  <div>isHovers: {{ isHovers }}</div>
  <splitter-original v-bind="props" ref="splitterRef" class="sp-splitter" :gutter-size="gutterSize"
    :style="innerStyle" :pt="passThrough" @resize="isResizing = true" @resizestart="isResizing = true"
    @resizeend="isResizing = false">
    <slot></slot>
  </splitter-original>
</template>

<script setup lang="ts">
import { computed, defineProps, provide, withDefaults } from "vue";
import SplitterOriginal, { SplitterProps } from "primevue/splitter";
import { SplitterInjectionKey, useSplitterController } from "../composables/use-splitter-controller";

const props = withDefaults(defineProps<SplitterProps & {
  gutterHoverSize?: number;
}>(), {
  layout: "horizontal",
  gutterSize: 1,
  gutterHoverSize: 4,
  unstyled: true,
});

const { mountedPanelSize,
  notifyMounted, splitterRef, isResizing, isHovers } = useSplitterController();

const passThrough = computed(() => {
  return {
    gutter: {
      class: "gutter",
    },
    gutterHandler: {
      class: "gutter-handler",
    },
  };
});

const currentGutterSize = computed(() => {
  return isHovers.value.some((isHover) => isHover) ? props.gutterHoverSize : props.gutterSize;
});

const innerStyle = computed(() => ({
  "--current-gutter-size": `${currentGutterSize.value}px`,
}));

provide(SplitterInjectionKey, {
  layout: computed(() => props.layout),
  gutterSize: computed(() => props.gutterSize),
  gutterHoverSize: computed(() => props.gutterHoverSize),
  mountedPanelSize,
  notifyMounted,
  isHovers
});
</script>

<style scoped lang="scss">
.sp-splitter {
  width: 100%;
  height: 100%;
}

::v-deep(.horizontal + .gutter:hover) {
  cursor: col-resize;
  background-color: black;

  & .gutter-handler {
    width: var(--current-gutter-size);
  }
}

::v-deep(.vertical + .gutter:hover) {
  cursor: row-resize;
  background-color: black;

  & .gutter-handler {
    height: var(--current-gutter-size);
  }
}
</style>