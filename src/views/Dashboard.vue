<script setup>

import { onMounted } from 'vue';
import GlobalTable from '../components/GlobalTable.vue';
import {graphFakeData} from '../service/ApolloFakeApi'
import { useProductStore } from '../store/productStore'
import { storeToRefs } from 'pinia';
const productStore = useProductStore()
const { products} = storeToRefs(productStore)

const pushSingleElement = () => {
    productStore.pushProducts('a');
}
onMounted(async() => {
    await productStore.fetchProducts()
})
// await graphFakeData()
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-12 xl:col-12">
            <!-- <button @click="pushSingleElement()">ekle</button> -->
            <!-- <GlobalTable/> -->
            <p>DashBoard</p>
        </div>
    </div>
</template>
