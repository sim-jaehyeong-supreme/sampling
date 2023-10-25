<template>
  <draggable
    class="dragArea"
    tag="ul"
    :list="tasks"
    :group="{ name: 'g1' }"
    item-key="name"
  >
    <template #item="{ element }">
      <li :class="element.type">
        <p>{{ element.name }}</p>
        <nested-draggable :tasks="element.tasks" :length="element.tasks.length"/>
      </li>
    </template>
  </draggable>
</template>
<script>
export default {
  name: "NestedDraggable"
};
</script>

<script setup>
import draggable from "vuedraggable/src/vuedraggable";
const { length, tasks } = defineProps({
  length: Number,
  tasks: Array
});

</script>
<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
</style>