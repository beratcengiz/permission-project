<template>
    <PermissionTable/>
  </template>
  
  <script setup>
  import Steppy from "@/components/Vue3Steppy.vue";
  import PermissionTable from "../../components/PermissionTable.vue";
  import { ref } from "vue";
  
  const step = ref(1);
  const loading = ref(false);
  
  const finalize = function () {
    loading.value = true;
  };
  </script>
  
  <style></style>