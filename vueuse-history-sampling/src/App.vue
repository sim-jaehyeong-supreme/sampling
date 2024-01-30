<script setup lang="ts">
import RefHistory from './components/RefHistory.vue'
import ManualRefHistory from './components/ManualRefHistory.vue'
</script>

<template>
  <ref-history />
  <manual-ref-history />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
