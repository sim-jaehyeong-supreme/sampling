<template>
    <splitter
        v-bind="props" 
        ref="splitterRef" 
        class="sp-splitter" 
        :gutter-size="gutterSize" 
        :style="innerStyle" 
        :pt="passThrough" 
        @resize="isResizing = true" 
        @resizestart="isResizing = true" 
        @resizeend="isResizing = false"
    >
      <slot></slot>
    </splitter>
  </template>
  
  <script setup lang="ts">
  import { computed, defineProps, provide, withDefaults } from "vue";
  import Splitter, { SplitterProps } from "primevue/splitter";
  import { SplitterInjectionKey, useSplitterController } from "../composables/use-splitter-controller";
  
  defineOptions({
    name: "SpSplitter",
  });

  const props = withDefaults(defineProps<SplitterProps & {
  gutterHoverSize?: number;
  }>(), {
    layout: "horizontal",
    gutterSize: 1,
    gutterHoverSize: 4,
    unstyled: true,
    minSize: 0,
  });
  
  const { mountedPanelSize, notifyMounted, splitterRef, isResizing, isHovers } = useSplitterController();
  
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
  
  const gutterSize = computed(() => {
    return isHovers.value.some((isHover) => isHover) ? props.gutterHoverSize : props.gutterSize;
  });
  
  const innerStyle = computed(() => ({
    "--computed-gutter-size": `${gutterSize.value}px`,
  }));
  
  provide(SplitterInjectionKey, {
    layout: computed(() => props.layout),
    gutterSize: computed(() => props.gutterSize),
    gutterHoverSize: computed(() => props.gutterHoverSize),
    mountedPanelSize,
    notifyMounted,
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
      width: var(--computed-gutter-size) !important;
    }
  }
  ::v-deep(.vertical + .gutter:hover) {
    background-color: black;
    cursor: row-resize;
    & .gutter-handler {
      width: var(--computed-gutter-size) !important;
    }
  }
  
  </style>
  