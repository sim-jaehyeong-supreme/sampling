<script setup>
import { computed } from "vue";
import Step from "./Step.vue";

const props = defineProps({
    titles: Array,
    active: Number,
});

const localItems = computed(() => {
    return props.titles.map((title, idx) => ({
            title,
            status : idx < props.active ? "success" : idx === props.active ? "proccess" : "wait"
        }));
    });
</script>

<template>
  <div class="steps steps--horizontal">
    <template v-for="(item, idx) in localItems">
        <Step :step="idx + 1" :title="item.title" :status="item.status" :is-last="localItems.length - 1 === idx"/>
    </template>
  </div>
</template>

<style scoped lang="scss">
.steps {
    display: flex;
    flex-direction: row;
}
</style>
