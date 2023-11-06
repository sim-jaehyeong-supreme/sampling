<script setup>
import MoreCustom from "@/components/moreCustom/MoreCustom.vue";
import Custom from "@/components/custom/Custom.vue";

import Default from "@/components/example/Default.vue";
import DragDrop from "@/components/example/DragDrop.vue";
import SaveUndoRedo from "@/components/example/SaveUndoRedo.vue";

import { ref } from "vue";
const selectedTabName = ref("moreCustom");
</script>

<template>
  <el-tabs v-model="selectedTabName" class="tabs" :stretch="true">
    <el-tab-pane label="MoreCustom" name="moreCustom" :lazy="true">
      <MoreCustom title="MoreCustom" />
    </el-tab-pane>
    <el-tab-pane label="Custom" name="custom" :lazy="true">
      <Custom title="Custom" />
    </el-tab-pane>
    <el-tab-pane label="Default" name="default" :lazy="true">
      <Default title="Default" />
    </el-tab-pane>
    <el-tab-pane label="Drag & Drop" name="dnd" :lazy="true"
      ><DragDrop title="Drag & Drop" />
    </el-tab-pane>
    <el-tab-pane label="Save & Undo & Redo" name="sur" :lazy="true"
      ><SaveUndoRedo title="Save & Undo & Redo" />
    </el-tab-pane>
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
