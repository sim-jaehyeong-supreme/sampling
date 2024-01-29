<script setup lang="ts">
import { ref, provide } from "vue";
import Child from "./components/Child.vue";
const message = ref("message1");
provide("message", message);
</script>

<template>
  <input type="text" v-model="message">
  <child />
</template>
