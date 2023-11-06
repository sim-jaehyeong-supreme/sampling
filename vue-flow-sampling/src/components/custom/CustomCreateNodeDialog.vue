<script setup>
import { ref, unref } from "vue";

defineProps({
  isVisibleDialog: Boolean,
});
defineEmits(["update:isVisibleDialog", "create:node"]);

const selectedType = ref("SQL");
const nameValue = ref("");
const memoValue = ref("");

const getResult = () => {
  const result = {
    type: unref(selectedType.value),
    name: unref(nameValue.value),
    memo: unref(memoValue.value),
  }
  clearInputValue();
  return result;
}

const clearInputValue = () => {
  selectedType.value = "SQL";
  nameValue.value = "";
  memoValue.value = "";
}

const types = [
  {
    id: 1,
    value: "SQL",
    label: "SQL",
  },
  {
    id: 2,
    value: "Select",
    label: "Select",
  },
  {
    id: 3,
    value: "Filter",
    label: "Filter",
  },
  {
    id: 4,
    value: "GroupBy",
    label: "GroupBy",
  },
  {
    id: 5,
    value: "Join",
    label: "Join",
  },
];
</script>

<template>
  <el-dialog
    :modelValue="isVisibleDialog"
    @update:modelValue="$emit('update:isVisibleDialog', $event)"
    title="ノード新規登録"
    width="30%"
  >
    <div>
      <span>type : </span>
      <el-select v-model="selectedType" class="m-2" size="large">
        <el-option
          v-for="item in types"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      <span>name : </span>
      <el-input v-model="nameValue" class="m-2" style="width: 200px;"/>
    </div>
    <div>
      <span>memo : </span>
      <el-input v-model="memoValue" class="m-2" style="width: 200px;"/>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:isVisibleDialog', false)"
          >Cancel</el-button
        >
        <el-button
          type="primary"
          @click="$emit('create:node', getResult())"
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
