<template>
  <button @click="handleClick">click</button>
  <div>hello world {{ list.filter((v) => v.includes("#")).length }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useId } from "./use-id";
const { generate } = useId();
const list = ref<string[]>([]);
const handleClick = () => {
  list.value = [...Array(1000)].map(() => generate());
}



</script>

<style scoped></style>
