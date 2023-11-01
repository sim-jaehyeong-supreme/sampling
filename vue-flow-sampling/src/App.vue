<script setup>
import Default from "@/components/Default.vue";
import DragDrop from "@/components/DragDrop.vue";

import { ref } from 'vue';
const selectedTabName = ref('default');
</script>

<template>
  <el-tabs v-model="selectedTabName" class="tabs">
    <el-tab-pane label="Default" name="default" class="tab-pane">
      <Default title="Default"/>
    </el-tab-pane>
    <el-tab-pane label="Drag & Drop" name="dnd"><DragDrop title="Drag & Drop" /></el-tab-pane>
  </el-tabs>
</template>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/@vue-flow/core@1.24.1/dist/style.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/core@1.24.1/dist/theme-default.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css";

html,
body,
#app {
  margin: 0;
  height: 100%;
}
#app {
  text-transform: uppercase;
  font-family: "JetBrains Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-tabs {
  height: 100vh;
  overflow: hidden;
  .el-tabs__content {
    height: 100%;
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
