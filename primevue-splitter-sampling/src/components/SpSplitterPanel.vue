<template>
    <SplitterPanelOriginal ref="splitterPanelRef" v-bind="props" :class="['sp-splitter-panel', ...innerClass]"
        :style="innerStyle" data-pc-name="splitterpanel">
        <slot></slot>
    </SplitterPanelOriginal>
</template>

<script setup lang="ts">
import { computed, defineProps, inject, onMounted, ref } from "vue";
import SplitterPanelOriginal, { SplitterPanelProps } from "primevue/splitterpanel";
import {
    SplitterInjectionKey,
    SplitterInjectionValue,
} from "../composables/use-splitter-controller";

/**
 *　SplitterPanel인지를 name으로 판단
 * https://github.com/primefaces/primevue/blob/78b9416f066e41ac3e956966ec1dea42f6c33c21/components/lib/splitter/Splitter.vue#L83
 * */
defineOptions({
    // name: "SpSplitterPanel",
    name: "SplitterPanel",
});

const props = withDefaults(defineProps<SplitterPanelProps>(), {
    minSize: 0,
    unstyled: true,
});

const splitterPanelRef = ref();
const splitterPanel = inject<SplitterInjectionValue>(SplitterInjectionKey);
const currentPanelIndex = ref<number>(-1);
onMounted(() => {
    if (splitterPanel) {
        currentPanelIndex.value = splitterPanel.mountedPanelSize.value;
        splitterPanel.notifyMounted();
    }
});

const innerClass = computed<string[]>(() => {
    return [
        splitterPanel?.layout.value ?? "",
        currentPanelIndex.value === (splitterPanel?.mountedPanelSize.value ?? 0) - 1
            ? "is-last"
            : "",
    ];
});

const innerStyle = computed(() => ({
    "--gutter-size": `${splitterPanel?.gutterSize.value ?? 1}px`,
}));

defineExpose({ ...splitterPanelRef.value });
</script>

<style scoped lang="scss">
.sp-splitter-panel {
    &.horizontal:not(.is-last) {
        border-right: var(--gutter-size) solid gray;
    }

    &.vertical:not(.is-last) {
        border-bottom: var(--gutter-size) solid gray;
    }
}
</style>