<script setup lang="ts">
import { inject } from 'vue'

const message = inject('message')
</script>

<template>
  <p>
    손자에게 전하는 메시지: {{ message }}
  </p>
</template>