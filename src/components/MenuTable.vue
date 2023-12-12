
<template>
    <div>
        <!-- {{ Object.keys(selectedKey).filter(item => item.includes('camera') || item.includes('device')) }}
        {{ Math.ceil(currentPage / 5) + 1 }}
        {{ totalCounts  }} -->
        <div class="card">
            <Toolbar class="mb-4">
                <template #end>
                    <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <!-- <Button label="Device And Cameras" icon="pi pi-plus" severity="success" class="mr-2"
                        @click="openGetDeviceAndUserPairing()" /> -->
                    <!-- <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                        :disabled="!selectedProducts || !selectedProducts.length" /> -->
                </template>

                <!-- <template #end>
                    <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
                        class="mr-2 inline-block" />
                    <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                </template> -->
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">Roles</h4>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
                    </div>
                </template>
                <Column field="Name" header="Name" sortable style="min-width:10rem">
                    <template #body="slotProps">
                        <Skeleton v-if="completed == false"></Skeleton>
                        <p v-else>{{ slotProps.data.name }}</p>
                    </template>
                </Column>
                <Column field="Icon" header="Icon" sortable style="min-width:10rem">
                    <template #body="slotProps">
                        <Skeleton v-if="completed == false"></Skeleton>
                        <p v-else>{{ slotProps.data.icon }}</p>
                    </template>
                </Column>
                <Column field="Parent Name" header="Parent Name" sortable style="min-width:10rem">
                    <template #body="slotProps">
                        <Skeleton v-if="completed == false"></Skeleton>
                        <p v-else>{{ slotProps.data.parent_name }}</p>
                    </template>
                </Column>
                <Column field="Url" header="Url" sortable style="min-width:10rem">
                    <template #body="slotProps">
                        <Skeleton v-if="completed == false"></Skeleton>
                        <p v-else>{{ slotProps.data.url }}</p>
                    </template>
                </Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Skeleton v-if="completed == false"></Skeleton>
                        <div v-else>
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                                @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                @click="confirmDeleteUser(slotProps.data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>

            <Paginator @click="getPageNumber()" v-model:first="currentPage" :rows="5" :totalRecords="totalCounts"
                :rowsPerPageOptions="[10, 20, 30]">
                <!-- <template #start="slotProps">
                    Page: {{ slotProps.state.page + 1 }}
                    First: {{ slotProps.state.first }}
                    Rows: {{ slotProps.state.rows }}
                </template>
                <template #end>
                    <Button type="button" icon="pi pi-search" />
                </template> -->
            </Paginator>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true"
            class="p-fluid">
            <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
                :alt="product.image" class="block m-auto pb-3" />
            <div class="formgrid grid">
                <div class="field col">
                    <label for="price">First Name</label>
                    <InputText id="price" v-model="firstName" />
                </div>
                <div class="field col">
                    <label for="quantity">Last Name</label>
                    <InputText id="quantity" v-model="lastName" />
                </div>
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="price">UserName</label>
                    <InputText id="price" v-model="userName" />
                </div>
                <div class="field col">
                    <label for="quantity">Email</label>
                    <InputText id="quantity" v-model="email" />
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
            </template>
        </Dialog>
        <Dialog v-model:visible="tree" :style="{ width: '1200px' }" header="Device-Camera-Category User Pairing"
            :modal="true" class="p-fluid">
            <div class="grid">
                <div class="col">
                    <div class="text-center p-3  font-bold">
                        <Tree @nodeSelect="onNodeSelect" v-model:expandedKeys="expandedKeys"
                            v-model:selectionKeys="selectedKey" :value="nodes" selectionMode="checkbox" :filter="true"
                            filterMode="lenient" class="w-full md:w-30rem">
                            <template #default="slotProps">
                                <b @click="getSidebarNode(slotProps.node)">{{ slotProps.node.label }}</b>
                            </template>
                        </Tree>
                    </div>
                </div>
                <div class="col">
                    <div class="text-center p-3  font-bold ">
                        <Tree @nodeSelect="onNodeSelect" v-model:expandedKeys="expandedKeys"
                            v-model:selectionKeys="selectedKey" :value="nodesUserWithRole" selectionMode="checkbox"
                            :filter="true" filterMode="lenient" class="w-full md:w-30rem">
                            <template #default="slotProps">
                                <b @click="getSidebarNode(slotProps.node)">{{ slotProps.node.label }}</b>
                            </template>
                        </Tree>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteUsers" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteUsers" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '../service/ProductService';
import { getMenu } from '../service/pixCountPeople/pixCountMenu/Menu';
import date from '../utils/dateFormat'
import { getDeviceAndUserPairing } from '../service/pixCountPeople/pixCountDeviceCameraCategoryTree/deviceCameraCategoryTree'
onMounted(async () => {
    // ProductService.getProducts().then((data) => (products.value = data));
    await getAllMenus()
});
const getAllMenus = async () => {
    const result = await getMenu({ page: pageNumber.value, limit: 5, search: null, type : 'list' })
    console.log('result', result)
    pageCount.value = result.pageCount
    totalCounts.value = result.totalcount
    console.log(totalCounts)
    products.value = result.menus
    setTimeout(() => {
        completed.value = true;
    }, 1000);
}
const onNodeSelect = (node) => {
    console.log(node);
}
const openGetDeviceAndUserPairing = async () => {
    const resultGetDeviceAndUserPairing = await getDeviceAndUserPairing();
    const resultGetUserWithRole = await getUserWithRole({ page: 1, limit: 5, search: null });
    console.log(resultGetUserWithRole)
    await changeKeys(resultGetDeviceAndUserPairing);
    await changeKeys2(resultGetUserWithRole);
    expandAll(resultGetDeviceAndUserPairing);
    expandAll(resultGetUserWithRole);
    nodes.value = resultGetDeviceAndUserPairing;
    nodesUserWithRole.value = resultGetUserWithRole;
    tree.value = true;
    console.log('result', resultGetDeviceAndUserPairing)
}

const expandAll = (nodes) => {
    console.log('nodes', nodes)
    for (let node of nodes) {
        expandNode(node);
    }

    expandedKeys.value = { ...expandedKeys.value };
};

async function changeKeys(resultGetDeviceAndUserPairing) {
    resultGetDeviceAndUserPairing.forEach(item => {
        item['label'] = item['name'];
        delete item['name'];
        if (item.children) {
            changeKeys(item.children); // Recursive call for children
        }
    });
}
async function changeKeys2(resultGetDeviceAndUserPairing) {
    resultGetDeviceAndUserPairing.forEach(item => {
        item['label'] = item['name'];
        delete item['name'];
        item['key'] = item['id'];
        delete item['id'];
        if (item.children) {
            changeKeys2(item.children); // Recursive call for children
        }
    });
}
const expandNode = (node) => {
    if (node.children && node.children.length) {
        expandedKeys.value[node.key] = true;

        for (let child of node.children) {
            expandNode(child);
        }
    }
};
const getPageNumber = async () => {
    completed.value = false;
    pageNumber.value = Math.ceil(currentPage.value / 5) + 1;
    await getAllMenus()
}
const completed = ref(false);
const pageNumber = ref(1)
const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const email = ref('');
const totalCounts = ref(null)
const pageCount = ref(1)
const currentPage = ref(null);
const expandedKeys = ref({});
const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const tree = ref(false);
const selectedKey = ref({})
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const nodes = ref(null);
const nodesUserWithRole = ref(null);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);

const formatCurrency = (value) => {
    if (value)
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
};
const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const saveProduct = async () => {
    const data = {
        "firstName": firstName.value,
        "lastName": lastName.value,
        "userName": userName.value,
        "email": email.value
    }
    const result = await createUser({ data });
    await getAllUser();
    productDialog.value = false;
    console.log('result', result)
    // submitted.value = true;

    // if (product.value.name.trim()) {
    //     if (product.value.id) {
    //         product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
    //         products.value[findIndexById(product.value.id)] = product.value;
    //         toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //     }
    //     else {
    //         product.value.id = createId();
    //         product.value.code = createId();
    //         product.value.image = 'product-placeholder.svg';
    //         product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
    //         products.value.push(product.value);
    //         toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //     }

    //     productDialog.value = false;
    //     product.value = {};
    // }
};
const editProduct = (prod) => {
    product.value = { ...prod };
    productDialog.value = true;
};
const confirmDeleteUser = (prod) => {
    console.log('user', prod)
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = () => {
    products.value = products.value.filter(val => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteUsers = async () => {
    console.log('selam')
    // products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    const result = await deleteUser(product.value.id);
    if (result.status == 200) {
        await getAllUser();
        deleteProductDialog.value = false;
        selectedProducts.value = null;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};

</script>
