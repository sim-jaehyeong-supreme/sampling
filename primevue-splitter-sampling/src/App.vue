<template>
  <div class="wrap">
    <sp-splitter>
      <sp-splitter-panel :size="10"> Panel 1 </sp-splitter-panel>
      <sp-splitter-panel :size="10">
        Panel 2
      </sp-splitter-panel>
      <sp-splitter-panel :size="10">
        Panel 2
      </sp-splitter-panel>
      <sp-splitter-panel :size="70">
        Panel 2
      </sp-splitter-panel>
    </sp-splitter>
  </div>
</template>

<script setup lang="ts">
import SpSplitter from "./components/SpSplitter.vue";
import SpSplitterPanel from "./components/SpSplitterPanel.vue";

</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  height: calc(100vh - 2rem);
}
</style>
