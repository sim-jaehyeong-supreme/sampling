<script setup>
import { Position, Handle } from "@vue-flow/core";

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(["type", "label"]);
</script>

<template>
  <div class="wrap">
    <div>type: {{ type }}</div>
    <div>label: {{ label }}</div>
    <Handle class="handle" type="source" :position="Position.Bottom" />
  </div>
</template>

<style scoped>
.wrap {
  width: 200px;
  background-color: #9ca8b3;
  color: #fff;
  padding: 10px;
}
.handle {
  background-color: #9ca8b3;
}
</style>
