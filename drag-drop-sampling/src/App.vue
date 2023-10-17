<script setup>
import SideBar from '@/components/SideBar.vue'
import EditArea from '@/components/EditArea.vue'
</script>

<template>
  <div class="container">
    <SideBar class="sidebar"/>
    <EditArea class="editarea"/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 15%;
}
.editarea {
  width: 85%;
}
</style>
