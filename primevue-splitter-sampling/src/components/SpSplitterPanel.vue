<template>
    <splitter-panel-original ref="splitterPanelRef" v-bind="props" :class="['sp-splitter-panel', ...innerClass]"
        :style="innerStyle" data-pc-name="splitterpanel">
        <slot></slot>
    </splitter-panel-original>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseSplitterPanel from "primevue/splitterpanel/BaseSplitterPanel.vue"
import { SplitterInjectionKey } from "../composables/use-splitter-controller";

export default defineComponent({
    name: "SplitterPanel", //primevue/splitterはname=SplitterPanelをパネルとして認識する
    extends: BaseSplitterPanel,  //getVNodeProp内でextendsにアクセスしているため
});
</script>

<script setup lang="ts">
import { computed, defineProps, inject, onMounted, ref } from "vue";
import SplitterPanelOriginal, { SplitterPanelProps } from "primevue/splitterpanel";

const props = withDefaults(defineProps<SplitterPanelProps>(), {
    minSize: 0,
    unstyled: false,
});

const splitterPanel = inject(SplitterInjectionKey);
const panelIndex = ref<number>(-1);
onMounted(() => {
    if (splitterPanel) {
        panelIndex.value = splitterPanel.mountedPanelSize.value;
        splitterPanel.notifyMounted();
    }
});

const isHover = computed(() => splitterPanel?.isHovers.value[panelIndex.value] ?? false);

const innerClass = computed(() => [
    splitterPanel?.layout.value ?? "",
    isHover.value && "is-hover",
    (splitterPanel?.mountedPanelSize.value ?? 0) - 1 === panelIndex.value && "is-last",
]);

const innerStyle = computed(() => ({
    "--gutter-size": `${splitterPanel?.gutterSize.value ?? 1}px`,
    "--gutter-hover-size": `${splitterPanel?.gutterHoverSize.value ?? 4}px`,
    "--panel-size": splitterPanel?.mountedPanelSize.value ?? 0,
}));
</script>

<style scoped lang="scss">

.sp-splitter-panel {
    display: inline-block;
    padding: 16px;
    width: 100%;
    overflow: auto;
}
.sp-splitter-panel:not(.is-last) {
    &.horizontal {
        border-right: var(--gutter-size) solid black;
    }

    &.horizontal.is-hover {
        border-right: var(--gutter-hover-size) solid black;
    }

    &.vertical {
        border-bottom: var(--gutter-size) solid black;
    }

    &.vertical.is-hover {
        border-bottom: var(--gutter-hover-size) solid black;
    }
}
</style>