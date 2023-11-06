<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['type', 'label', 'data'])
</script>

<template>
  <div class="wrap">
    <Handle class="handle" type="target" :position="Position.Top" />
    <div>type: {{ type }}</div>
    <div>subType: {{ data.subType }}</div>
    <div>label: {{ label }}</div>
    <Handle class="handle" type="source" :position="Position.Bottom" />
  </div>
</template>

<style scoped>
.wrap {
  width: 200px;
  background-color: green;
  color: #fff;
  padding: 10px;
}
.handle {
  background-color: green;
}
</style>
