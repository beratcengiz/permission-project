<script setup>

import { onMounted } from 'vue';
import GlobalTable from '../components/GlobalTable.vue';
import {graphFakeData} from '../service/ApolloFakeApi'
onMounted(async() => {
    await graphFakeData()
})
// await graphFakeData()
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-12 xl:col-12">
            <GlobalTable/>
        </div>
    </div>
</template>
