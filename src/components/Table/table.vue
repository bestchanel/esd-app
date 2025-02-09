<template>
  <div v-if="selectedTable" class="mt-4">
    <h3 class="text-lg font-semibold"> {{ tableTitle }}</h3>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th v-for="header in headers" :key="header" class="px-4 py-2 border text-center">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="item.id">
          <td class="px-4 py-2 border">{{ index + 1 }}</td>
          <td class="px-4 py-2 border">
            {{ item.attributes.users_permissions_user.data.attributes.Name }}
          </td>
          <td class="px-4 py-2 border">
            {{ item.attributes.users_permissions_user.data.attributes.Position }}
          </td>
          <td class="px-4 py-2 border">
            <ul>
              <li
                v-for="branch in item.attributes.users_permissions_user.data.attributes.branches.data"
                :key="branch.id"
              >
                {{ branch.attributes.Branchname }}
              </li>
            </ul>
          </td>
          <td class="px-4 py-2 border">
            {{ formatThaiDate(item.attributes.createdAt) }}
          </td>
          <td v-if="selectedTable === 'WRIST STRAP'" class="px-4 py-2 border">
            {{ item.attributes.Resistance }}
          </td>
          <td v-if="selectedTable === 'WRIST STRAP'" class="px-4 py-2 border text-center">
            <span v-if="item.attributes.Resistance < 800">LOW</span>
            <span v-else-if="item.attributes.Resistance >= 800 && item.attributes.Resistance <= 9000">GOOD</span>
            <span v-else>HIGH</span>
          </td>
          <td v-if="selectedTable === 'TABLE MAT'" class="px-4 py-2 border">
            <span v-if="item.attributes.Ground">Yes</span>
            <span v-else>No</span>
          </td>
          <td v-if="selectedTable === 'TABLE MAT'" class="px-4 py-2 border">
            {{ item.attributes.ResistanceTableMat }}
          </td>
          <td v-if="selectedTable === 'TABLE MAT'" class="px-4 py-2 border">
            <span v-if="item.attributes.ResistanceTableMat >= 1 && item.attributes.ResistanceTableMat <= 100">Green</span>
            <span v-else-if="item.attributes.ResistanceTableMat >= 300 && item.attributes.ResistanceTableMat <= 1000">Yellow</span>
            <span v-else-if="item.attributes.ResistanceTableMat >= 3000 && item.attributes.ResistanceTableMat <= 10000">Orange</span>
            <span v-else-if="item.attributes.ResistanceTableMat >= 100000 && item.attributes.ResistanceTableMat <= 1000000">Red</span>
            <span v-else>-</span>
          </td>
          <td class="px-4 py-2 border text-center">
            <button
              @click="editItem(item)"
              class="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-3 py-1 mr-2"
            >
              <Icon :icon="'heroicons-outline:pencil-alt'" class="w-6 h-6 inline" />
            </button>
            <button
              @click="deleteItem(item.id)"
              class="bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1"
            >
              <Icon :icon="'heroicons-outline:trash'" class="w-6 h-6 inline" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import Card from "@/components/Card/index.vue";
import Button from "@/components/Button/index.vue";
import Modal from "@/components/Modal/Modal.vue";
import Textinput from "@/components/Textinput/index.vue";
import axios from "axios";
import Table from "@/components/Table/table.vue";
export default {
  name: "Table",
  props: {
    selectedTable: {
      type: String,
      required: true,
    },
    tableTitle: {
      type: String,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
    formatThaiDate: {
      type: Function,
      required: true,
    },
    editItem: {
      type: Function,
      required: true,
    },
    deleteItem: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.table-auto {
  width: 100%;
  border-collapse: collapse;
}
</style>
