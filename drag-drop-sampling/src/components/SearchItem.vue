<script setup>
import { ref } from "vue";
import SideBarArrow from "@/components/icons/SideBarArrow.vue";
import SearchSubItem from "@/components/SearchSubItem.vue";
const { id, title, subItems } = defineProps({
  id: String,
  title: String,
  subItems: Array,
});

const isShowingDetail = ref(false);
const toggleShowingDetail = () => {
  isShowingDetail.value = !isShowingDetail.value;
};

const dragStart = (item, event) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.dropEffect = "copy";

    event.dataTransfer.setData("id", id);
    event.dataTransfer.setData("subId", item.subId);
    event.dataTransfer.setData("title", title);
    event.dataTransfer.setData("subTitle", item.subTitle);
  }
}

const dragEnd = (sub, event) => {
  //何もしない
}
</script>

<template>
  <div class="item-box">
    <!-- Item -->
    <div class="menu" @click="toggleShowingDetail">
      <span>{{ title }}</span>
      <SideBarArrow />
    </div>

    <!-- SubItems -->
    <div v-show="isShowingDetail">
      <SearchSubItem v-for="sub in subItems" :key="sub.subId" :item="sub" @dragstart="dragStart" @dragend="dragEnd" />
    </div>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;

  padding: 4px 4px;
  margin: 4px 0;

  color: #000000;
  background: #e3e3e3;
  border: solid 1px #000000;

  cursor: pointer;
}

.menu:hover {
  background: #d3d3d3;
}

.menu:hover svg {
  color: #999999;
}
</style>
