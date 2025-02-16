<template>
  <div class="overflow-x-auto">
    <table class="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead class="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
        <tr>
          <th class="border border-gray-300 px-4 py-2">ID</th>
          <th class="border border-gray-300 px-4 py-2">ชื่อ-นามสกุล</th>
          <th class="border border-gray-300 px-4 py-2 text-center">ตำแหน่ง</th>
          <th class="border border-gray-300 px-4 py-2 text-center">สาขา</th>
          <th class="border border-gray-300 px-4 py-2 text-center">สถานะ</th>
          <th class="border border-gray-300 px-4 py-2 text-center">การเข้าใช้งาน</th>
          <th class="border border-gray-300 px-4 py-2 text-center">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in userData" :key="item.id">
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ index + 1 }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ item.Name }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ item.Position }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ item.branches.Branchname }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">
            <span
              class="inline-block px-3 py-1 rounded-full text-sm mx-auto"
              :class="{
                'bg-red-100 text-red-500': item.User_Type === 'Manager',
                'bg-blue-100 text-blue-500': item.User_Type === 'Employee'
              }"
            >
              {{ item.User_Type }}
            </span>
          </td>
          <td class="border border-gray-300 px-4 py-2 text-center">
            <span
              class="inline-block px-3 py-1 rounded-full text-sm mx-auto"
              :class="{
                'bg-green-100 text-green-500': !item.blocked,
                'bg-red-100 text-red-500': item.blocked
              }"
            >
              {{ item.blocked ? 'ไม่อนุญาตให้ใช้งาน' : 'อนุญาตให้ใช้งาน' }}
            </span>
          </td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">
            <div class="flex justify-center space-x-2 rtl:space-x-reverse">
              <Tooltip placement="top" arrow theme="dark">
                <template #button>
                  <div @click="EditUser(item)" class="action-btn">
                    <Icon icon="heroicons-outline:pencil-alt" />
                  </div>
                </template>
                <span>แก้ไข</span>
              </Tooltip>
              <Tooltip placement="top" arrow theme="danger-500">
                <template #button>
                  <div @click="DeleteUser(item.id)" class="action-btn">
                    <Icon icon="heroicons-outline:trash" />
                  </div>
                </template>
                <span>ลบ</span>
              </Tooltip>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Component -->
    <div class="py-4 px-3 flex justify-center">
      <Pagination
        :total="userData.length"
        :current="current"
        :per-page="perpage"
        :pageRange="pageRange"
        @page-changed="current = $event"
        :pageChanged="props.pageChanged"
        :perPageChanged="props.perPageChanged"
      />
    </div>

  </div>

  <Modal
  ref="openEditUserModal"
  title="แก้ไขข้อมูลผู้ใช้งาน"
  label=""
  labelClass="btn-ghost"
  class="ml-auto"
>

  <Textinput 
    v-model="dataupdateusermodal.username" 
    placeholder="กรอกชื่อผู้ใช้งาน" 
    label="ชื่อผู้ใช้งาน" 
    class="mt-4" />
  <Textinput 
    v-model="dataupdateusermodal.password" 
    placeholder="กรอกรหัสผ่าน" 
    label="รหัสผ่าน" 
    class="mt-4" 
    type="password" />
  <Textinput 
    v-model="dataupdateusermodal.Name"
    placeholder="กรอกชื่อ-นามสกุล" 
    label="ชื่อ-นามสกุล" 
    class="mt-4" />
  <Textinput 
    v-model="dataupdateusermodal.Position"
    placeholder="กรอกตำแหน่ง" 
    label="ตำแหน่ง" 
    class="mt-4" />
  <Textinput 
    v-model="dataupdateusermodal.email"
    placeholder="กรอก Email" 
    label="Email" 
    class="mt-4" />

    <div class="mt-4">
    <label for="Branchname" class="block text-sm font-medium text-gray-700">สาขา</label>
    <div class="relative">
      <select 
  v-model="selectedBranchId" 
  id="Branchname" 
  class="textinput-like-select appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
>
  <option value="" disabled selected>เลือกสาขา</option>
  <option v-for="branch in branches" :key="branch.id" :value="branch.id">
    {{ branch.attributes.Branchname }}
  </option>
</select>
    </div>
  </div>

  <!-- User Type Dropdown Styled Like Textinput -->
  <div class="mt-4">
    <label for="User_Type" class="block text-sm font-medium text-gray-700">สถานะ</label>
    <div class="relative">
      <select 
        v-model="dataupdateusermodal.User_Type" 
        id="User_Type" 
        class="textinput-like-select appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
      >
        <option value="" disabled selected>เลือกสถานะ</option>
        <option value="Manager">Manager</option>
        <option value="Employee">Employee</option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>

  <!-- Blocked Dropdown Styled Like Textinput -->
  <div class="mt-4">
    <label for="blocked" class="block text-sm font-medium text-gray-700">การเข้าใช้งาน</label>
    <div class="relative">
      <select 
        v-model="dataupdateusermodal.blocked" 
        id="blocked" 
        class="textinput-like-select appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
      >
        <option value="" disabled selected>การเข้าใช้งาน</option>
        <option value="false">อนุญาตให้ใช้งาน</option>
        <option value="true">ไม่อนุญาตให้ใช้งาน</option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>

  <!-- Error message -->
  <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>

  <!-- Save button -->
  <Button 
    btnClass="btn-success mt-4" 
    text="บันทึกข้อมูล" 
    icon="gridicons:add" 
    @click="validateUserForm" 
  />
</Modal>



</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import Button from "@/components/Button/index.vue";
import Modal from "@/components/Modal/Modal.vue";
import Textinput from "@/components/Textinput/index.vue";
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import Pagination from "@/components/Pagination";
import Swal from "sweetalert2";

const selectedBranchId = ref(null);

const openEditUserModal = ref(true);
const dataupdateusermodal = ref("");
const branches = ref([]);  // ตัวแปรสำหรับเก็บข้อมูลสาขา
const userId = ref(null);
const token = ref(localStorage.getItem("token"));
const errorMessage = ref(""); // Declare errorMessage

const props = defineProps({
  userData: Array,
  onRefresh: Function, // เพิ่ม prop onRefresh
});


const users = ref([]);

const fetchUserData = async () => {
      try {
        const response = await fetch("https://esd-app-strapi.up.railway.app/api/users?populate=branches");
        const data = await response.json();
        const matchedUser = data.find(user => user.Name === fullname.value);
        if (matchedUser) {
          userId.value = matchedUser.id;
          username.value = matchedUser.username;
          jobTitle.value = matchedUser.Position || "Unknown Position";
          location.value = matchedUser.branches ? matchedUser.branches.Branchname : "Unknown Branch";
          editableBranchId.value = matchedUser.branches ? matchedUser.branches.id : null;

          editableUsername.value = matchedUser.username;
          editableFullname.value = matchedUser.Name;
          editableEmail.value = matchedUser.email;
          editableJobTitle.value = matchedUser.Position;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await fetch("https://esd-app-strapi.up.railway.app/api/branches");
        const data = await response.json();
        branches.value = data.data;
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
// ดึงข้อมูลจาก API เมื่อ component ถูก mount
onMounted(async () => {
  try {
    const response = await axios.get("https://esd-app-strapi.up.railway.app/api/branches");
    branches.value = response.data.data;
    console.log(branches.value); // เพิ่มเพื่อเช็คข้อมูล
  } catch (error) {
    console.error("Error fetching branches:", error);
  }
});

watch(
  () => props.userData, // ดูการเปลี่ยนแปลงข้อมูล
  (newVal) => {
    users.value = newVal; // อัปเดต users ในตาราง
  },
  { immediate: true }
);

const EditUser = async (item) => {
  openEditUserModal.value?.openModal();
  dataupdateusermodal.value = { ...item };
  userId.value = item.id;
  console.log("📝 ข้อมูลก่อนแก้ไข:", dataupdateusermodal.value); // Debug
  selectedBranchId.value = item.branches ? item.branches.id : null;
};

const validateUserForm = async () => {
  if (!userId.value || !dataupdateusermodal.value.Name || !dataupdateusermodal.value.Position || !selectedBranchId.value) {
    errorMessage.value = "กรุณากรอกข้อมูลให้ครบถ้วน!";
    return;
  }

  const updatedData = {
    Name: dataupdateusermodal.value.Name,
    Position: dataupdateusermodal.value.Position,
    email: dataupdateusermodal.value.email,
    User_Type: dataupdateusermodal.value.User_Type,
    branches: { id: selectedBranchId.value }, // ✅ ส่งเป็น ID แทน
  };

  console.log("🔍 กำลังอัปเดตข้อมูล:", updatedData); // Debugging

  try {
    const response = await fetch(`https://esd-app-strapi.up.railway.app/api/users/${userId.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(updatedData),
    });

    const result = await response.json();
    console.log("✅ ผลลัพธ์จากเซิร์ฟเวอร์:", result);

    if (response.ok) {
      props.onRefresh();
      openEditUserModal.value?.closeModal();
      Swal.fire({ icon: "success", title: "บันทึกสำเร็จ!", text: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว", showConfirmButton: false, timer: 1000 });
    } else {
      Swal.fire({ icon: "error", title: "เกิดข้อผิดพลาด", showConfirmButton: false, text: result.message || "ไม่สามารถอัปเดตข้อมูลได้", timer: 1000 });
    }
  } catch (error) {
    console.error("❌ Error:", error);
    Swal.fire({ icon: "error", title: "เกิดข้อผิดพลาด", text: "ไม่สามารถอัปเดตข้อมูลได้", timer: 1000 });
  }
};



const DeleteUser = async (id) => {
  const confirmDelete = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "การลบข้อมูลจะไม่สามารถกู้คืนได้!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "ลบ",
    cancelButtonText: "ยกเลิก",
  });

  if (confirmDelete.isConfirmed) {
    try {
      await axios.delete(`https://esd-app-strapi.up.railway.app/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "ลบสำเร็จ!",
        text: "ข้อมูลถูกลบเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1000,
      });

      // เรียกฟังก์ชัน refresh จาก parent
      if (props.onRefresh) {
        props.onRefresh();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถลบข้อมูลได้",
        showConfirmButton: false,
        timer: 1000,
      });
      console.error(error);
    }
  }
};
</script>

