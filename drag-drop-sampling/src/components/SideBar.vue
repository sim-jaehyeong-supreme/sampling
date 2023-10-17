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
        id: "1",
        title: "subitem1",
      },
      {
        id: "2",
        title: "subitem2",
      },
      {
        id: "3",
        title: "subitem3",
      },
      {
        id: "4",
        title: "subitem4",
      }
    ]
  },
  {
    id: "5",
    title: "dataset5",
    subItems: [
      {
        id: "5",
        title: "subitem5",
      },
      {
        id: "6",
        title: "subitem6",
      },
      {
        id: "7",
        title: "subitem7",
      },
      {
        id: "8",
        title: "subitem8",
      }
    ]
  },
  {
    id: "9",
    title: "node",
    subItems: [
      {
        id: "9",
        title: "subnode9",
      },
      {
        id: "10",
        title: "subnode10",
      },
      {
        id: "11",
        title: "subnode11",
      },
      {
        id: "12",
        title: "subnode12",
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
        <SearchItem :title="item.title" :subItems="item.subItems"/>
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
