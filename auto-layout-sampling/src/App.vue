<template>
  <!-- <div class="wrap">
    <div class="result">
      <h4>list</h4>
      <template v-for="(item, idx) in data" :key="item.id">
        <div class="item">
          <div class="id">{{ item.id }}</div>
          <div class="title">
            <el-input :model-value="item.title" type="text" placeholder="title"
              @update:model-value="updateData(idx, 'title', $event)" />
          </div>
          <div class="target-value">
            <el-input :model-value="item.targetValue" type="number" placeholder="targetValue"
              @update:model-value="updateData(idx, 'targetValue', Number($event))" />
          </div>
          <div class="condition">
            <div class="buttons" v-if="!item.condition">
              <el-button @click="!editFormTarget && openEditForm('customer', item);">Customer</el-button>
              <el-button @click="!editFormTarget && openEditForm('product', item);">Product</el-button>
              <el-button @click="!editFormTarget && openEditForm('service', item);">Service</el-button>
            </div>
            <template v-else>not undefined</template>
          </div>
        </div>
      </template>
      <el-button type="primary" :icon="Plus" @click="addItem" />
    </div>
    <div class="edit-form">
      <edit-form v-if="editFormTarget" :target="editFormTarget" />
    </div>
  </div> -->
  <div>
    <div>data: {{ data }}</div>
    <div>sortedData: {{ sortedData }}</div>
  </div>
</template>

<script setup lang="ts">
// import { useAutoLayoutController } from "@/composables/use-auto-layout-controller";
// import EditForm from "@/components/EditForm.vue";
// import { ElButton, ElInput } from "element-plus";
// import { Plus } from '@element-plus/icons-vue'
// // const { data, addItem, updateData, editFormTarget, openEditForm, closeEditForm } = useAutoLayoutController();
// const { data, addItem, updateData, editFormTarget, openEditForm, closeEditForm, visibleEditForm } = useAutoLayoutController();
import { useId } from "@/composables/use-id";
import { computed, ref } from "vue";
const { generate } = useId();

type FormData = {
  id: string;
  position: number;
  title: string;
}

const data = ref<Array<FormData>>([
  {
    id: generate(),
    position: 3,
    title: "title3",
  },
  {
    id: generate(),
    position: 2,
    title: "title2",
  },
  {
    id: generate(),
    position: 0,
    title: "title0",
  },
  {
    id: generate(),
    position: 1,
    title: "title1",
  },
]);

const sortedData = computed(() => {
  const result = [...data.value];
  return result.sort((a, b) => a.position - b.position)
});


</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  height: calc(100vh - 2rem);
  flex-direction: column;
  align-items: center;

  .result {
    width: 500px;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      border: solid 1px black;

      .condition .buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;
        padding: 16px;

        ::v-deep(.el-button+.el-button) {
          margin: 0px;
        }
      }
    }
  }
}
</style>
