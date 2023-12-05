<template>
    <div class="flex justify-content-center">
        <Toast />
        <Tree :value="nodes" :filter="true" filterMode="lenient" class="w-full md:w-30rem">
            <template #default="slotProps">
                <b @click="getSidebarNode(slotProps.node)">{{ slotProps.node.label }}</b>
            </template>
        </Tree>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NodeService } from '../service/NodeService';
import { useToast } from "primevue/usetoast";
import { getMenus } from '../service/pixCountPeople/PixCountSidebar/sidebarMenu'
import router from '../router';
const nodes = ref(null);
const selectedKey = ref(null);
const toast = useToast();

onMounted(async () => {
    NodeService.getTreeNodes().then((data) => (nodes.value = data));
    console.log('nodes', nodes)
    const result = await getMenus({ type: 'side' });
    changeKeys(result);
    function changeKeys(result) {
        result.forEach(item => {
            item['key'] = item['id'];
            delete item['id'];
            item['label'] = item['name'];
            delete item['name'];
            if (item.children) {
                changeKeys(item.children); // Recursive call for children
            }
        });
    }

    console.log(result); // Değiştirilmiş veri yapısını konsola yazdırır
    nodes.value = result;
});
const getSidebarNode = async(node) => {
    console.log('node',node)
    router.push(node.url)
}
const onNodeSelect = (node) => {
    toast.add({ severity: 'success', summary: 'Node Selected', detail: node.label, life: 3000 });
};

const onNodeUnselect = (node) => {
    toast.add({ severity: 'warn', summary: 'Node Unselected', detail: node.label, life: 3000 });
};

const onNodeExpand = (node) => {
    toast.add({ severity: 'info', summary: 'Node Expanded', detail: node.label, life: 3000 });
};

const onNodeCollapse = (node) => {
    toast.add({ severity: 'error', summary: 'Node Collapsed', detail: node.label, life: 3000 });
};
</script>
