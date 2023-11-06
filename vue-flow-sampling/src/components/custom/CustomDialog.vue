<script setup>
defineProps({
  isVisibleDialog: Boolean,
  model: Object,
});
defineEmits(["update:isVisibleDialog"]);
</script>

<template>
  <el-dialog
    :modelValue="isVisibleDialog"
    @update:modelValue="$emit('update:isVisibleDialog', $event)"

    :title="model?.label ?? 'title'"
    width="30%"
  >
    <div>{{ model.type }}</div>
    <div>{{ model.id }}</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:isVisibleDialog', false)"
          >Cancel</el-button
        >
        <el-button
          type="primary"
          @click="$emit('update:isVisibleDialog', false)"
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
