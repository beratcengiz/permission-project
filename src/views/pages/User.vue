<template>
<GlobalTable/>
</template>
  
  <script setup>
  import Steppy from "@/components/Vue3Steppy.vue";
  import { ref } from "vue";
  import GlobalTable from "../../components/GlobalTable.vue";
  
  const step = ref(1);
  const loading = ref(false);
  
  const finalize = function () {
    loading.value = true;
  };
  </script>
  
  <style></style>