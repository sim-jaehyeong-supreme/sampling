<script setup>
import { Position, Handle } from "@vue-flow/core";

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(["type", "label"]);
</script>

<template>
  <div class="wrap">
    <Handle class="handle" type="target" :position="Position.Top" />
    <div>type: {{ type }}</div>
    <div>label: {{ label }}</div>
  </div>
</template>

<style scoped>
.wrap {
  width: 200px;
  background-color: blue;
  color: #fff;
  padding: 10px;
}
.handle {
  background-color: blue;
}
</style>
