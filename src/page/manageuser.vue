<template>
  <Card title="จัดการข้อมูลผู้ใช้งาน">
     <!-- เพิ่ม Dropdown Filters ด้านซ้าย -->
     <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
      <div>
        <label for="filterBranch" class="block">เลือกสาขา</label>
        <select id="filterBranch" v-model="filterBranch" class="form-select">
          <option value="">ทั้งหมด</option>
          <option v-for="branch in branches" :key="branch.id" :value="branch.id">
            {{ branch.attributes.Branchname }}
          </option>
        </select>
      </div>
      <div>
        <label for="filterPosition" class="block">เลือกตำแหน่ง</label>
        <select id="filterPosition" v-model="filterPosition" class="form-select">
          <option value="">ทั้งหมด</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
      </div>
      <div>
        <label for="filterStatus" class="block">เลือกสถานะ</label>
        <select id="filterStatus" v-model="filterStatus" class="form-select">
          <option value="">ทั้งหมด</option>
          <option value="false">อนุญาตให้ใช้งาน</option>
          <option value="true">ไม่อนุญาตให้ใช้งาน</option>
        </select>
      </div>
    </div>
    <div class="flex justify-end">
    <!-- Modal เพิ่มข้อมูลผู้ใช้งาน -->
    <Modal v-if="showAddModal" ref="addModal" title="เพิ่มข้อมูลผู้ใช้งาน" label="เพิ่มข้อมูลผู้ใช้งาน" labelClass="btn-success">
  <Textinput v-model="username" placeholder="กรอกชื่อผู้ใช้งาน" label="ชื่อผู้ใช้งาน" class="mt-4" />
  <Textinput v-model="password" placeholder="กรอกรหัสผ่าน" label="รหัสผ่าน" class="mt-4" type="password" />
  <Textinput v-model="Name" placeholder="กรอกชื่อ-นามสกุล" label="ชื่อ-นามสกุล" class="mt-4" />
  <Textinput v-model="Position" placeholder="กรอกตำแหน่ง" label="ตำแหน่ง" class="mt-4" />
  <Textinput v-model="email" placeholder="กรอก Email" label="Email" class="mt-4" />
  <div class="mt-4">
    <label for="branch" class="block mb-2">สาขา</label>
    <select id="branch" v-model="selectedBranch" class="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      <option value="" disabled selected>กรุณาเลือกสาขา</option>
      <option v-for="branch in branches" :key="branch.id" :value="branch.id">
        {{ branch.attributes.Branchname }}
      </option>
    </select>
  </div>
  <div class="mt-4">
    <label for="blocked" class="block mb-2">สถานะการเข้าใช้งาน</label>
    <select id="blocked" v-model="blocked" class="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      <option value="false">อนุญาตให้ใช้งาน</option>
      <option value="true">ไม่อนุญาตให้ใช้งาน</option>
    </select>
  </div>
  <div class="mt-4">
    <label for="userType" class="block mb-2">สถานะผู้ใช้งาน</label>
    <select id="userType" v-model="User_Type" class="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      <option value="Manager">Manager</option>
      <option value="Employee">Employee</option>
    </select>
  </div>
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
      <Button btnClass="btn-success mt-4" text="บันทึกข้อมูล" icon="gridicons:add" @click="validateUserForm" />
    </Modal>
  </div>
</div>
    <!-- ตารางแสดงข้อมูลผู้ใช้งาน -->
    <h3 class="text-lg font-semibold mt-4">ตารางข้อมูลผู้ใช้งาน</h3>
    <Tableuser :userData="filteredUserData" :onRefresh="refreshUserData" class="mt-4" />
  </Card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';

import Card from "@/components/Card/index.vue";
import Button from "@/components/Button/index.vue";
import Modal from "@/components/Modal/Modal.vue";
import Textinput from "@/components/Textinput/index.vue";
import Tableuser from "@/components/Table/tableuser.vue";

const username = ref('');
const password = ref('');
const Name = ref('');
const Position = ref('');
const email = ref('');
const selectedBranch = ref('');
const blocked = ref(false);  // ตัวแปรสำหรับสถานะการเข้าใช้งาน
const User_Type = ref('Employee');  // ตัวแปรสำหรับสถานะผู้ใช้งาน (Manager หรือ Employee)
const errorMessage = ref('');
const showAddModal = ref(true);
const userData = ref([]);
const branches = ref([]);

const filterBranch = ref('');
const filterPosition = ref('');
const filterStatus = ref('');

const fetchBranches = async () => {
  try {
    const response = await axios.get('https://esd-app-strapi-test.onrender.com/api/branches');
    branches.value = response.data.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: 'ไม่สามารถโหลดข้อมูลสาขาได้',
      showConfirmButton: false,
      timer: 1000,
    });
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://esd-app-strapi-test.onrender.com/api/users?populate=branches');
    userData.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Filtered user data
const filteredUserData = computed(() => {
  return userData.value.filter((user) => {
    const matchesBranch = !filterBranch.value || user.branches.id === filterBranch.value;
    const matchesPosition = !filterPosition.value || user.User_Type === filterPosition.value;
    const matchesStatus = filterStatus.value === '' || (filterStatus.value === 'true' ? user.blocked : !user.blocked);
    return matchesBranch && matchesPosition && matchesStatus;
  });
});

const validateUserForm = () => {
  errorMessage.value = "";
  if (!username.value) errorMessage.value = "กรุณากรอกชื่อผู้ใช้งาน";
  else if (!password.value) errorMessage.value = "กรุณากรอกรหัสผ่าน";
  else if (!email.value) errorMessage.value = "กรุณากรอก Email";
  else if (!selectedBranch.value) errorMessage.value = "กรุณาเลือกสาขา";
  else saveUserData();
};

const saveUserData = async () => {
  const payload = {
    username: username.value,
    email: email.value,
    password: password.value,
    Name: Name.value,
    Position: Position.value,
    branches: selectedBranch.value,
    blocked: blocked.value,  // ส่งค่า blocked
    User_Type: User_Type.value,  // ส่งค่า User_Type
  };
  try {
    await axios.post("https://esd-app-strapi-test.onrender.com/api/auth/local/register", payload);
    Swal.fire({
      icon: "success",
      title: "สมัครผู้ใช้งานสำเร็จ!",
      text: `ผู้ใช้งาน ${username.value} ได้รับการบันทึก`,
      showConfirmButton: false,
      timer: 1000,
    });
    resetForm();
    showAddModal.value = false;
    fetchUsers();
  } catch (error) {
    console.error("Error saving user:", error);
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "ไม่สามารถสมัครผู้ใช้งานได้",
      showConfirmButton: false,
      timer: 1000,
    });
  }
};

const refreshUserData = () => fetchUsers();
const resetForm = () => {
  username.value = "";
  password.value = "";
  Name.value = "";
  Position.value = "";
  email.value = "";
  selectedBranch.value = "";
  blocked.value = false;  // รีเซ็ตค่า blocked
  User_Type.value = 'Employee';  // รีเซ็ตค่า User_Type
};

onMounted(() => {
  fetchBranches();
  fetchUsers();
});
</script>

<style scoped>
.table-auto th,
.table-auto td {
  text-align: center;
  padding: 8px;
}
.form-select {
  width: 150px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
