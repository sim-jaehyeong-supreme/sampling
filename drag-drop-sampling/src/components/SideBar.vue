<script setup>
import { ref } from "vue";
import SearchItem from "@/components/SearchItem.vue";
const searchText = ref("");

const searchItems = [
  {
    id: "1",
    title: "dataset1",
    subItems: [
      {
        subId: "1",
        subTitle: "subitem1",
      },
      {
        subId: "2",
        subTitle: "subitem2",
      },
      {
        subId: "3",
        subTitle: "subitem3",
      },
      {
        subId: "4",
        subTitle: "subitem4",
      }
    ]
  },
  {
    id: "5",
    title: "dataset5",
    subItems: [
      {
        subId: "5",
        subTitle: "subitem5",
      },
      {
        subId: "6",
        subTitle: "subitem6",
      },
      {
        subId: "7",
        subTitle: "subitem7",
      },
      {
        subId: "8",
        subTitle: "subitem8",
      }
    ]
  },
  {
    id: "9",
    title: "node",
    subItems: [
      {
        subId: "9",
        subTitle: "subnode9",
      },
      {
        subId: "10",
        subTitle: "subnode10",
      },
      {
        subId: "11",
        subTitle: "subnode11",
      },
      {
        subId: "12",
        subTitle: "subnode12",
      }
    ]
  }
]
</script>

<template>
  <div class="sidebar-container">
    <h3>SideBar</h3>
    <input class="search-input" type="search" v-model="searchText" placeholder="search..."/>
    <div class="search-items">
      <template v-for="item in searchItems" :key="item.id">
        <SearchItem :id="item.id" :title="item.title" :subItems="item.subItems"/>
      </template>
    </div>
  </div>

</template>

<style scoped>
.sidebar-container {
  display: block;
}
.search-input {
  margin: 10px 0;
  padding: 10px 5px;
  width: 100%;
  font-size: large;
}

.search-items {
  height: 100%;
}
</style>
