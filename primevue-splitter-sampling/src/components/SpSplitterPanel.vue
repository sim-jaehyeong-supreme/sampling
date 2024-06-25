<template>
    <SplitterPanelOriginal ref="splitterPanelRef" v-bind="props" :class="['sp-splitter-panel']"
        :style="innerStyle" data-pc-name="splitterpanel">
        <slot></slot>
    </SplitterPanelOriginal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseSplitterPanel from "primevue/splitterpanel/BaseSplitterPanel.vue"

export default defineComponent({
    name: "SplitterPanel", //primevue/splitterはname=SplitterPanelをパネルとして認識する
    extends: BaseSplitterPanel,  //getVNodeProp内でextendsにアクセスしているため
});
</script>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import SplitterPanelOriginal, { SplitterPanelProps } from "primevue/splitterpanel";

const props = withDefaults(defineProps<SplitterPanelProps>(), {
    minSize: 0,
    unstyled: true,
});

const innerStyle = computed(() => ({
    "--gutter-size": `1px`,
}));
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