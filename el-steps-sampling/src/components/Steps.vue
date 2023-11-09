<script setup>
import Step from "./Step.vue";

defineProps({
    items: Array,
})
</script>

<template>
  <div class="steps steps--horizontal">
    <template v-for="(item, idx) in items">
        <Step :step="idx + 1" :title="item.title" :status="item.status" :is-last="items.length - 1 === idx"/>
    </template>
  </div>
</template>

<style scoped lang="scss">
.steps {
    display: flex;
    flex-direction: row;
}
</style>
