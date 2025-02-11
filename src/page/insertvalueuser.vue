<template>
  <div v-if="showformprint == false">
    <Card title="บันทึกค่าความต้านทาน">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
              <!-- Dropdown สำหรับเลือกตาราง -->
              <div>
  <label for="tableType" class="block">เลือกตารางที่แสดง</label>
  <select
    id="tableType"
    v-model="selectedTable"
    @change="get_data()"
    class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="เลือกตารางที่แสดง">เลือกตารางที่แสดง</option>
    <option value="WRIST STRAP">WRIST STRAP</option>
    <option value="TABLE MAT">TABLE MAT</option>
  </select>
</div>

<!-- Dropdown สำหรับเลือกปี (WRIST STRAP) -->
<div v-if="selectedTable === 'WRIST STRAP'">
  <label for="yearSelectWristStrap" class="block">เลือกปี</label>
  <select
    id="yearSelectWristStrap"
    v-model="selectedYear"
    @change="filterByMonthAndWeek"
    class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="" selected>แสดงทุกปี</option>
    <option v-for="year in years" :key="year" :value="year">
      {{ year }}
    </option>
  </select>
</div>

<!-- Dropdown สำหรับเลือกเดือน (WRIST STRAP) -->
<div v-if="selectedTable === 'WRIST STRAP'">
  <label for="monthSelectWristStrap" class="block">เลือกเดือน</label>
  <select
    id="monthSelectWristStrap"
    v-model="selectedMonth"
    @change="filterByMonthAndWeek"
    class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">แสดงทุกเดือน</option>
    <option v-for="month in months" :key="month" :value="month">
      {{ month }}
    </option>
  </select>
</div>

<!-- Dropdown สำหรับเลือกสัปดาห์ (WRIST STRAP) -->
<div v-if="selectedTable === 'WRIST STRAP' && selectedMonth !== ''">
  <label for="weekSelectWristStrap" class="block">เลือกสัปดาห์</label>
  <select
    id="weekSelectWristStrap"
    v-model="selectedWeek"
    @change="filterByMonthAndWeek"
    class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">แสดงทั้งหมด</option>
    <option value="1">สัปดาห์ที่ 1</option>
    <option value="2">สัปดาห์ที่ 2</option>
    <option value="3">สัปดาห์ที่ 3</option>
    <option value="4">สัปดาห์ที่ 4</option>
    <option value="5">สัปดาห์ที่ 5</option>
  </select>
</div>

<!-- Dropdown สำหรับเลือกปี (TABLE MAT) -->
<div v-if="selectedTable === 'TABLE MAT'">
  <label for="yearSelectTableMat" class="block">เลือกปี</label>
  <select
    id="yearSelectTableMat"
    v-model="selectedYear"
    @change="filterByMonthAndBranch"
    class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="" selected>แสดงทุกปี</option>
    <option v-for="year in years" :key="year" :value="year">
      {{ year }}
    </option>
  </select>
</div>

<!-- Dropdown สำหรับเลือกเดือน (TABLE MAT) -->
<div v-if="selectedTable === 'TABLE MAT'">
  <label for="monthSelectTableMat" class="block">เลือกเดือน</label>
  <select
    id="monthSelectTableMat"
    v-model="selectedMonth"
    @change="filterByMonthAndBranch"
    class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="" selected>แสดงทุกเดือน</option>
    <option v-for="(month, index) in months" :key="index" :value="month">
      {{ month }}
    </option>
  </select>
</div>

  </div>

        <!-- Modal Section -->
        <Modal
        v-if="showModal && (selectedTable === 'WRIST STRAP' || selectedTable === 'TABLE MAT')"
  ref="closemodal"
  title="บันทึกค่าความต้านทาน"
  label="บันทึกค่าความต้านทาน"
  labelClass="btn-success"
  class="ml-auto"
>
          <label
            for="options"
            class="block font-medium text-base text-slate-600 dark:text-slate-300 mt-4"
            >เลือกเครื่องมือวัด</label
          >
          <select
            id="options"
            v-model="selectedOption"
            class="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">เลือกเครื่องมือวัด</option>
            <option value="WRIST STRAP" v-if="isMonday">WRIST STRAP</option>
            <option value="TABLE MAT" v-if="isFirstDayOfMonth">TABLE MAT</option>
          </select>

          <!-- WRIST STRAP Section -->
          <div
            v-if="selectedOption === 'WRIST STRAP'"
            class="text-base text-slate-600 dark:text-slate-300"
          >
            <Textinput
              v-model="fullname"
              placeholder="กรอกชื่อ-นามสกุล"
              label="ชื่อ-นามสกุล"
              :disabled="isDisabled"
              class="mt-4"
            />
    <Textinput
      type="text"
      id="week"
      v-model="week"
      placeholder="กรอกสัปดาห์ที่"
      label="สัปดาห์ที่"
      :disabled="isDisabled"
      class="mt-4"
    />
    <Textinput
      type="text"
      id="recordDate"
      v-model="recordDate"
      placeholder="กรอกวันที่บันทึก"
      label="วันที่บันทึก"
      :disabled="isDisabled"
      class="mt-4"
    />
            <Textinput
              v-model.number="Resitance"
              placeholder="กรอกค่าความต้านทาน WRIST STRAP"
              label="ค่าความต้านทาน WRIST STRAP"
              class="mt-4"
              type="number"
            />
          </div>

          <!-- TABLE MAT Section -->
          <div
            v-if="selectedOption === 'TABLE MAT'"
            class="text-base text-slate-600 dark:text-slate-300"
          >
            <Textinput
              v-model="fullname"
              placeholder="กรอกชื่อ-นามสกุล"
              label="ชื่อ-นามสกุล"
              :disabled="isDisabled"
              class="mt-4"
            />
            <Textinput
      type="text"
      id="recordDate"
      v-model="recordDate"
      placeholder="กรอกวันที่บันทึก"
      label="วันที่บันทึก"
      :disabled="isDisabled"
      class="mt-4"
    />
            <div class="mt-4">
              <label
                class="block font-medium text-base text-slate-600 dark:text-slate-300"
                >Table Mat ต่อกับสายดิน (Ground) หรือไม่</label
              >
              <div class="flex items-center mt-2">
                <input
                  type="radio"
                  id="groundYes"
                  v-model="Ground"
                  :value="true"
                  class="mr-2"
                />
                <label for="groundYes" class="mr-4">ใช่</label>
                <input
                  type="radio"
                  id="groundNo"
                  v-model="Ground"
                  :value="false"
                  class="mr-2"
                />
                <label for="groundNo">ไม่</label>
              </div>
            </div>
            <Textinput
              v-model="ResistanceTableMat"
              placeholder="กรอกค่าความต้านทาน TABLE MAT"
              label="ค่าความต้านทาน TABLE MAT"
              class="mt-4"
              type="number"
            />
          </div>

          <p v-if="errorMessage" class="text-red-500 mt-2">
            {{ errorMessage }}
          </p>
          <Button
  v-if="selectedOption" 
  btnClass="btn-success mt-4"
  text="บันทึกข้อมูล"
  icon="gridicons:add"
  @click="SaveData"
/>
        </Modal>
      </div>

<!-- ตาราง WRIST STRAP -->
<div v-if="selectedTable === 'WRIST STRAP'" class="mt-6">
  <h3 class="text-lg font-semibold mb-4 text-gray-700">ตาราง WRIST STRAP</h3>
  <div class="overflow-x-auto rounded-lg shadow-md">
    <table class="table-auto w-full border border-gray-200 rounded-lg">
      <thead class="bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
        <tr>
          <th class="border border-gray-200 px-4 py-2 text-center">ลำดับ</th>
          <th class="border border-gray-200 px-4 py-2">ชื่อ-นามสกุล</th>
          <th class="border border-gray-200 px-4 py-2 text-center">ตำแหน่ง</th>
          <th class="border border-gray-200 px-4 py-2 text-center">สาขา</th>
          <th class="border border-gray-200 px-4 py-2 text-center">วันที่บันทึก</th>
          <th class="border border-gray-200 px-4 py-2 text-center">สัปดาห์ที่</th>
          <th class="border border-gray-200 px-4 py-2 text-center">ค่าความต้านทาน</th>
          <th class="border border-gray-200 px-4 py-2 text-center">สถานะ</th>
          <th class="border border-gray-200 px-4 py-2 text-center">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in paginatedData"
          :key="item.id"
        >
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ index + 1 }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ item.attributes.users_permissions_user.data.attributes.Name }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ item.attributes.users_permissions_user.data.attributes.Position }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ item.attributes.users_permissions_user.data.attributes.branches.data.attributes.Branchname }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ formatThaiDate(item.attributes.createdAt) }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">สัปดาห์ที่ {{ calculateWeek(item.attributes.createdAt) }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ item.attributes.Resistance }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">
            <span
              class="inline-block px-3 py-1 rounded-full text-sm"
              :class="{
                'bg-red-100 text-red-500': item.attributes.Resistance < 800,
                'bg-green-100 text-green-500': item.attributes.Resistance >= 800 && item.attributes.Resistance <= 9000,
                'bg-yellow-100 text-yellow-500': item.attributes.Resistance > 9000
              }"
            >
              {{
                item.attributes.Resistance < 800
                  ? "LOW"
                  : item.attributes.Resistance <= 9000
                  ? "GOOD"
                  : "HIGH"
              }}
            </span>
          </td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">
            <div class="flex justify-center space-x-2 rtl:space-x-reverse">
              <Tooltip placement="top" arrow theme="dark">
                <template #button>
                  <div @click="EditItemWristStrap(item)" class="action-btn">
                    <Icon icon="heroicons-outline:pencil-alt" />
                  </div>
                </template>
                <span>แก้ไข</span>
              </Tooltip>
              <Tooltip placement="top" arrow theme="danger-500">
                <template #button>
                  <div @click="deleteItemWristStrap(item.id)" class="action-btn">
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
  </div>
  <div class="py-4 flex justify-center">
    <Pagination
      :total="filteredData.length"
      :current="currentWristStrapPage"
      :per-page="perpage"
      :page-range="pageRange"
      @page-changed="changePage"
    />
  </div>
</div>

<!-- ตาราง TABLE MAT -->
<div v-if="selectedTable === 'TABLE MAT'" class="mt-6">
  <h3 class="text-lg font-semibold mb-4 text-gray-700">ตาราง TABLE MAT</h3>
  <div class="overflow-x-auto rounded-lg shadow-md">
    <table class="table-auto w-full border border-gray-200 rounded-lg">
      <thead class="bg-gradient-to-r from-green-400 to-teal-400 text-white">
        <tr>
          <th class="border border-gray-200 px-4 py-2 text-center">ลำดับ</th>
          <th class="border border-gray-200 px-4 py-2">ชื่อ-นามสกุล</th>
          <th class="border border-gray-200 px-4 py-2 text-center">ตำแหน่ง</th>
          <th class="border border-gray-200 px-4 py-2 text-center">สาขา</th>
          <th class="border border-gray-200 px-4 py-2 text-center">วันที่บันทึก</th>
          <th class="border border-gray-200 px-4 py-2 text-center">ต่อสาย Ground</th>
          <th class="border border-gray-200 px-4 py-2 text-center">ค่าความต้านทาน</th>
          <th class="border border-gray-200 px-4 py-2 text-center">สถานะ</th>
          <th class="border border-gray-200 px-4 py-2 text-center">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in paginatedDataTableMat"
          :key="item.id"
        >
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ index + 1 }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ item.attributes.users_permissions_user.data.attributes.Name }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ item.attributes.users_permissions_user.data.attributes.Position }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ item.attributes.users_permissions_user.data.attributes.branches.data.attributes.Branchname }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ formatThaiDate(item.attributes.createdAt) }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">
            <span v-if="item.attributes.Ground">Yes</span>
            <span v-else>No</span>
          </td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">{{ item.attributes.ResistanceTableMat }}</td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">
            <span
              class="inline-block px-3 py-1 rounded-full text-sm"
              :class="{
                'bg-green-100 text-green-500': item.attributes.ResistanceTableMat >= 1 && item.attributes.ResistanceTableMat <= 100,
                'bg-yellow-100 text-yellow-500': item.attributes.ResistanceTableMat >= 300 && item.attributes.ResistanceTableMat <= 1000,
                'bg-orange-100 text-orange-500': item.attributes.ResistanceTableMat >= 3000 && item.attributes.ResistanceTableMat <= 10000,
                'bg-red-100 text-red-500': item.attributes.ResistanceTableMat >= 100000 && item.attributes.ResistanceTableMat <= 1000000
              }"
            >
              <span v-if="item.attributes.ResistanceTableMat >= 1 && item.attributes.ResistanceTableMat <= 100">Green</span>
              <span v-else-if="item.attributes.ResistanceTableMat >= 300 && item.attributes.ResistanceTableMat <= 1000">Yellow</span>
              <span v-else-if="item.attributes.ResistanceTableMat >= 3000 && item.attributes.ResistanceTableMat <= 10000">Orange</span>
              <span v-else-if="item.attributes.ResistanceTableMat >= 100000 && item.attributes.ResistanceTableMat <= 1000000">Red</span>
              <span v-else>-</span>
            </span>
          </td>
          <td class="border text-slate-600 dark:text-slate-300 capitalize px-4 py-2 text-center">
            <div class="flex justify-center space-x-2 rtl:space-x-reverse">
              <Tooltip placement="top" arrow theme="dark">
                <template #button>
                  <div @click="EditItemTableMat(item)" class="action-btn">
                    <Icon icon="heroicons-outline:pencil-alt" />
                  </div>
                </template>
                <span>แก้ไข</span>
              </Tooltip>
              <Tooltip placement="top" arrow theme="danger-500">
                <template #button>
                  <div @click="deleteItemTableMat(item.id)" class="action-btn">
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
  </div>
  <div class="py-4 flex justify-center">
    <Pagination
      :total="filteredData.length"
      :current="currentTableMatPage"
      :per-page="perpage"
      :page-range="pageRange"
      @page-changed="changePageTableMat"
    />
  </div>
</div>
      <Modal
        ref="openEditmodal"
        title="แก้ไขค่าความต้านทาน"
        label=""
        labelClass="btn-ghost"
        class="ml-auto"
      >
      <Textinput
              v-model="dataupdatemodal.attributes.users_permissions_user.data.attributes
              .Name"
              placeholder="กรอกชื่อ-นามสกุล"
              label="ชื่อ-นามสกุล"
              :disabled="isDisabled"
              class="mt-4"
            />
          <Textinput
      type="text"
      id="week"
      v-model="week"
      placeholder="กรอกสัปดาห์ที่"
      label="สัปดาห์ที่"
      :disabled="isDisabled"
      class="mt-4"
    />
    <Textinput
      type="text"
      id="recordDate"
      v-model="recordDate"
      placeholder="กรอกวันที่บันทึก"
      label="วันที่บันทึก"
      :disabled="isDisabled"
      class="mt-4"
    />

        <div class="text-base text-slate-600 dark:text-slate-300">
          <Textinput
            v-model="dataupdatemodal.attributes.Resistance"
            placeholder="กรอกค่าความต้านทาน WRIST STRAP"
            label="ค่าความต้านทาน WRIST STRAP"
            class="mt-4"
            type="number"
          />
        </div>
        <Button
          btnClass="btn-success mt-4"
          text="แก้ไขข้อมูล"
          icon="gridicons:add"
          @click="UpdateItemWristStrap"
        />
      </Modal>

      <Modal
        ref="openEditmodalTableMat"
        title="แก้ไขค่าความต้านทาน"
        label=""
        labelClass="btn-ghost"
        class="ml-auto"
      >
      <Textinput
              v-model="dataupdatemodal.attributes.users_permissions_user.data.attributes
              .Name"
              placeholder="กรอกชื่อ-นามสกุล"
              label="ชื่อ-นามสกุล"
              :disabled="isDisabled"
              class="mt-4"
            />

    <Textinput
      type="text"
      id="recordDate"
      v-model="recordDate"
      placeholder="กรอกวันที่บันทึก"
      label="วันที่บันทึก"
      :disabled="isDisabled"
      class="mt-4"
    />
        <div class="mt-4">
              <label
                class="block font-medium text-base text-slate-600 dark:text-slate-300"
                >Table Mat ต่อกับสายดิน (Ground) หรือไม่</label
              >
              <div class="flex items-center mt-2">
                <input
                  type="radio"
                  id="groundYes"
                  v-model="dataupdatemodal.attributes.Ground"
                  :value="true"
                  class="mr-2"
                />
                <label for="groundYes" class="mr-4">ใช่</label>
                <input
                  type="radio"
                  id="groundNo"
                  v-model="dataupdatemodal.attributes.Ground"
                  :value="false"
                  class="mr-2"
                />
                <label for="groundNo">ไม่</label>
              </div>
            </div>
        <div class="text-base text-slate-600 dark:text-slate-300">
          <Textinput
            v-model="dataupdatemodal.attributes.ResistanceTableMat"
            placeholder="กรอกค่าความต้านทาน table-mats"
            label="ค่าความต้านทาน table-mats"
            class="mt-4"
            type="number"
          />
        </div>
        <Button
          btnClass="btn-success mt-4"
          text="แก้ไขข้อมูล"
          icon="gridicons:add"
          @click="UpdateItemTableMat"
        />
      </Modal>

    </Card>

    <!-- <button btnClass="btn-success mt-4" @click="print">xxx</button> -->
  </div>

  <div v-if="showformprint == true">
    <div ref="showformprint">formprint</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import Card from "@/components/Card/index.vue";
import Button from "@/components/Button/index.vue";
import Modal from "@/components/Modal/Modal.vue";
import Textinput from "@/components/Textinput/index.vue";
import axios from "axios";
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import Pagination from "@/components/Pagination";


const showModal = ref(false);
const openEditmodal = ref(true);
const openEditmodalTableMat = ref(true);
const closemodal = ref(false);

const selectedOption = ref("");

const fullname = ref(localStorage.getItem('fullname') || 'Token not found');
const wrist_name = ref("");
const wrist_branch = ref("");
const week = ref(""); // สัปดาห์ปัจจุบัน
const recordDate = ref("");
const isDisabled = ref(true);

const Resitance = ref("");

const Ground = ref("");
const ResistanceTableMat = ref("");

const selectedTable = ref("เลือกตารางที่แสดง");
const selectedWeek = ref("");
const selectedMonth = ref("");
const selectedYear = ref("");
const selectedMonthWristStrap = ref("");

const dataupdatemodal = ref();

const data_wrist_straps = ref([]);
const data_table_mats = ref([]);

const token = ref(localStorage.getItem("token"));
const users = ref(localStorage.getItem("userid") || "Token not found");

const showformprint = ref(false);
const filteredData = ref([]); // ข้อมูลหลังกรอง

const today = new Date();
const isMonday = today.getDay() === 1;
const isFirstDayOfMonth = today.getDate() === 1;
const perpage = ref(5); // จำนวนรายการต่อหน้า
const currentWristStrapPage = ref(1); // หน้าปัจจุบัน
const currentTableMatPage = ref(1); // หน้าปัจจุบัน
const pageRange = ref(1000); // จำนวนหน้าที่จะแสดงใน pagination

// คำนวณข้อมูลหน้า Pagination
const totalPages = computed(() => Math.ceil(filteredData.value.length / perpage.value));
const totalPagesTableMat = computed(() => Math.ceil(filteredData.value.length / perpage.value));

const paginatedData = computed(() => {
  const start = (currentWristStrapPage.value - 1) * perpage.value;
  const data = filteredData.value.slice(start, start + perpage.value);

  // ตรวจสอบว่าวันนี้เป็นวันจันทร์หรือไม่
  const today = new Date();
  const isMonday = today.getDay() === 1; // 1 คือวันจันทร์

  // ถ้าเป็นวันจันทร์ → แค่ซ่อนปุ่ม (showModal.value = true) เมื่อมีข้อมูล
  if (isMonday) {
    showModal.value = data.length > 0 ? false : true;
  } else {
    showModal.value = false; // วันอื่นซ่อนปุ่มเสมอ
  }

  return data; // แสดงข้อมูลเสมอ ไม่ว่าปุ่มจะซ่อนหรือไม่
});

const paginatedDataTableMat = computed(() => {
  const start = (currentTableMatPage.value - 1) * perpage.value;
  const data = filteredData.value.slice(start, start + perpage.value);
  
  // ตรวจสอบว่าวันนี้เป็นวันจันทร์หรือไม่
  const today = new Date();
  const isFirstDayOfMonth = today.getDate() === 1; // วันที่ 1 ของเดือน

  // ถ้าเป็นวันที่ 1 ของเดือน → แค่ซ่อนปุ่ม (showModal.value = true) เมื่อมีข้อมูล
  if (isFirstDayOfMonth) {
    showModal.value = data.length > 0 ? false : true;
  } else {
    showModal.value = false; // วันอื่นซ่อนปุ่มเสมอ
  }

  return data; // แสดงข้อมูลเสมอ ไม่ว่าปุ่มจะซ่อนหรือไม่
});

// ฟังก์ชันเปลี่ยนหน้า
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentWristStrapPage.value = page;
  }
};

const changePageTableMat = (page) => {
  if (page > 0 && page <= totalPagesTableMat.value) {
    currentTableMatPage.value = page;
  }
};


const months = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

onMounted(() => {
  if (isMonday || isFirstDayOfMonth) {
    showModal.value = true;
  }

  // ตรวจสอบว่ามีข้อมูลใน filteredData หรือไม่
  if (filteredData.value.length > 0) {
    showModal.value = false;
  }
});


// ตั้งค่าค่าตั้งต้นเมื่อ component ถูก mount
onMounted(() => {
  const today = new Date();

  const currentDate = today.getDate(); // วันที่ปัจจุบัน
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // วันที่แรกของเดือน
  const firstDayWeekday = firstDayOfMonth.getDay(); // วันในสัปดาห์
  const weekNumber = Math.ceil((currentDate + firstDayWeekday) / 7); // คำนวณสัปดาห์
  week.value = `สัปดาห์ที่ ${weekNumber}`; // ตั้งค่าสัปดาห์ที่

  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม"
  ];

  const thaiYear = today.getFullYear() + 543; // แปลงปีเป็นพุทธศักราช
  const thaiMonth = thaiMonths[today.getMonth()]; // แปลงเดือนเป็นภาษาไทย
  const thaiDate = today.getDate(); // วันที่ในเดือน

  recordDate.value = `${thaiDate} ${thaiMonth} ${thaiYear}`; // ตั้งค่าวันที่เป็นรูปแบบภาษาไทย
});

onMounted(() => {
  const today = new Date();
  selectedWeek.value = calculateWeek(today.toISOString()); // ตั้งค่าสัปดาห์ปัจจุบัน
});

// ฟังก์ชันคำนวณสัปดาห์ที่
const calculateWeek = (date) => {
  const currentDate = new Date(date).getDate();
  const firstDayOfMonth = new Date(
    new Date(date).getFullYear(),
    new Date(date).getMonth(),
    1
  );
  const firstDayWeekday = firstDayOfMonth.getDay();
  return Math.ceil((currentDate + firstDayWeekday) / 7);
};

// ตั้งค่าเดือนปัจจุบันเป็นค่าเริ่มต้น
onMounted(() => {
  const today = new Date();
  selectedMonth.value = months[today.getMonth()];
});

const filterByMonthAndBranch = () => {
  // ถ้าไม่ได้เลือกเดือนหรือปี ให้แสดงข้อมูลทั้งหมด
  if (!selectedMonth.value && !selectedYear.value) {
    filteredData.value = data_table_mats.value.filter(
      (item) =>
        item.attributes.users_permissions_user.data.attributes.Name === fullname.value
    );
    return;
  }
  
  // ถ้าเลือกแค่ปี
  if (!selectedMonth.value) {
    const selectedYearThai = selectedYear.value; // ปีไทยที่เลือก
    filteredData.value = data_table_mats.value.filter((item) => {
      const itemYearThai = new Date(item.attributes.createdAt).getFullYear() + 543; // ปีไทย
      return (
        itemYearThai === selectedYearThai &&
        item.attributes.users_permissions_user.data.attributes.Name === fullname.value
      );
    });
    return;
  }
  
  // ถ้าเลือกทั้งปีและเดือน
  const selectedMonthIndex = months.indexOf(selectedMonth.value);
  const selectedYearThai = selectedYear.value; // ปีไทยที่เลือก
  
  filteredData.value = data_table_mats.value.filter((item) => {
    const itemDate = new Date(item.attributes.createdAt);
    const itemYearThai = itemDate.getFullYear() + 543; // ปีไทย
    const itemMonth = itemDate.getMonth();
    return (
      itemMonth === selectedMonthIndex &&
      itemYearThai === selectedYearThai &&
      item.attributes.users_permissions_user.data.attributes.Name === fullname.value
    );
  });
};


onMounted(() => {
  const today = new Date();
  selectedMonthWristStrap.value = months[today.getMonth()]; // ตั้งค่าสำหรับ WRIST STRAP
  selectedYear.value = today.getFullYear() + 543; // ตั้งค่าปีไทยปัจจุบัน
});

const years = [];

// สร้างปีไทย (พ.ศ.) ปัจจุบันและปีย้อนหลัง 5 ปี
for (let i = 0; i <= 5; i++) {
  const year = new Date().getFullYear() + 543 - i; // คำนวณปีแบบไทย (พ.ศ.)
  years.push(year);
}

const filterByMonthAndWeek = () => {
  if (!selectedMonth.value && !selectedWeek.value  && !selectedYear.value) {
    filteredData.value = data_wrist_straps.value.filter(
      (item) =>
        item.attributes.users_permissions_user.data.attributes.Name === fullname.value
    );
    return;
  }

  filteredData.value = data_wrist_straps.value.filter((item) => {
    const itemMonth = new Date(item.attributes.createdAt).getMonth();
    const itemWeek = calculateWeek(item.attributes.createdAt);
    const itemYear = new Date(item.attributes.createdAt).getFullYear() + 543; // ปีไทย

    const monthMatches = selectedMonth.value ? itemMonth === months.indexOf(selectedMonth.value) : true;
    const weekMatches = selectedWeek.value ? itemWeek == selectedWeek.value : true;
    const yearMatches = selectedYear.value ? itemYear == selectedYear.value : true;

    // เพิ่มเงื่อนไขกรองเฉพาะชื่อของคนคนนั้น
    const nameMatches = item.attributes.users_permissions_user.data.attributes.Name === fullname.value;

    return monthMatches && weekMatches && nameMatches && yearMatches;
  });
};


// ตั้งค่าปีเดือนปัจจุบัน
onMounted(() => {
  const today = new Date();
  selectedMonth.value = months[today.getMonth()];
  selectedWeek.value = calculateWeek(today.toISOString());
  selectedYear.value = today.getFullYear() + 543; // ปีไทย
  filterByMonthAndWeek();
});



const SaveData = async () => {
  if (selectedOption.value === "WRIST STRAP") {
    const payload = {
      data: {
        users_permissions_user: users.value,
        name: wrist_name.value,
        branch: wrist_branch.value,
        week: week.value,
        recordDate: recordDate.value,
        Resistance: Resitance.value,
      },
    };

    try {
      const response = await axios.post(
        "https://esd-app-strapi-test.onrender.com/api/wrist-straps",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "application/json",
          },
        }
      );
      closemodal.value?.closeModal();
      resetform();
      selecttablenow();
      get_data();

      // แสดง SweetAlert หลังจากบันทึกข้อมูลสำเร็จ
      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ!",
        text: "ข้อมูลได้ถูกบันทึกเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1000, // แสดงข้อความ 2 วินาที แล้วหายไปเอง
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถบันทึกข้อมูลได้",
        showConfirmButton: false,
        timer: 1000, // แสดงข้อความ 2 วินาที แล้วหายไปเอง
      });
      closemodal.value?.closeModal();
      console.error("Error saving WRIST STRAP data:", error);
    }
  } else if (selectedOption.value === "TABLE MAT") {
    const payload = {
      data: {
        users_permissions_user: users.value,
        name: wrist_name.value,
        branch: wrist_branch.value,
        recordDate: recordDate.value,
        Resistance: Resitance.value,
        Ground: Ground.value, // ค่านี้ต้องเป็น boolean
        ResistanceTableMat: ResistanceTableMat.value,
      },
    };

    try {
      const response = await axios.post(
        "https://esd-app-strapi-test.onrender.com/api/table-mats",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "application/json",
          },
        }
      );
      closemodal.value?.closeModal();
      resetform();
      selecttablenow();
      get_data();

      // แสดง SweetAlert หลังจากบันทึกข้อมูลสำเร็จ
      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ!",
        text: "ข้อมูลได้ถูกบันทึกเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1000, // แสดงข้อความ 2 วินาที แล้วหายไปเอง
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถบันทึกข้อมูลได้",
        showConfirmButton: false,
        timer: 1000, // แสดงข้อความ 2 วินาที แล้วหายไปเอง
      });
      closemodal.value?.closeModal();
      console.error("Error saving TABLE MAT data:", error);
    }
  }
};

const resetform = () => {
  Resitance.value = "";
};

const selecttablenow = () => {
  selectedTable.value = selectedOption.value;
};

const get_data = () => {
  console.log(selectedTable.value);
  if (selectedTable.value == "TABLE MAT") {
    axios
      .get(
        "https://esd-app-strapi-test.onrender.com/api/table-mats?populate[users_permissions_user][populate]=branches"
      )
      .then((table_matsresponse) => {
        data_table_mats.value = table_matsresponse.data.data;
        filterByMonthAndBranch();
        console.log(data_table_mats.value);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (selectedTable.value == "WRIST STRAP") {
    axios
      .get(
        "https://esd-app-strapi-test.onrender.com/api/wrist-straps?populate[users_permissions_user][populate]=branches"
      )
      .then((wrist_strapsresponse) => {
        // wrist_straps.value = wrist_strapsresponse.data.data.map(item => item.attributes.Resistance.);
        data_wrist_straps.value = wrist_strapsresponse.data.data;
        filterByMonthAndWeek();
        console.log(data_wrist_straps.value);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
const formatThaiDate = (dateString) => {
  const monthsThai = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = monthsThai[date.getMonth()];
  const year = date.getFullYear() + 543; // แปลงเป็นปี พ.ศ.
  return `${day} ${month} ${year}`;
};

const EditItemWristStrap = async (item) => {
  openEditmodal.value?.openModal();
  dataupdatemodal.value = item;
  console.log(dataupdatemodal.value);
};

const EditItemTableMat = async (item) => {
  openEditmodalTableMat.value?.openModal();
  dataupdatemodal.value = item;
  console.log(dataupdatemodal.value);
}

const UpdateItemWristStrap = async () => {
  console.log(dataupdatemodal);
  const data_update = {
    data: {
      Resistance: dataupdatemodal.value.attributes.Resistance,
    },
  };

  console.log(dataupdatemodal.value.id);

  try {
    await axios.put(
      `https://esd-app-strapi-test.onrender.com/api/wrist-straps/${dataupdatemodal.value.id}`,
      data_update,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    // แสดง SweetAlert หลังจากการอัปเดตสำเร็จ
    Swal.fire({
      title: "แก้ไขข้อมูลสำเร็จ",
      text: "ข้อมูลของคุณถูกแก้ไขแล้ว",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });

    openEditmodal.value?.closeModal();
  } catch (error) {
    // กรณีที่เกิดข้อผิดพลาด
    Swal.fire({
      title: "เกิดข้อผิดพลาด",
      text: "ไม่สามารถแก้ไขข้อมูลได้ โปรดลองอีกครั้ง",
      icon: "error",
      showConfirmButton: false,
      timer: 1000,
    });
    openEditmodal.value?.closeModal();
    console.error("Error updating wrist strap:", error);
  }
};

const UpdateItemTableMat = async () => {
  console.log(dataupdatemodal);
  const data_update = {
    data: {
      ResistanceTableMat: dataupdatemodal.value.attributes.ResistanceTableMat,
    },
  };

  console.log(dataupdatemodal.value.id);

  try {
    await axios.put(
      `https://esd-app-strapi-test.onrender.com/api/table-mats/${dataupdatemodal.value.id}`,
      data_update,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    // แสดง SweetAlert หลังจากการอัปเดตสำเร็จ
    Swal.fire({
      title: "แก้ไขข้อมูลสำเร็จ",
      text: "ข้อมูลของคุณถูกแก้ไขแล้ว",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });

    openEditmodalTableMat.value?.closeModal();
  } catch (error) {
    // กรณีที่เกิดข้อผิดพลาด
    Swal.fire({
      title: "เกิดข้อผิดพลาด",
      text: "ไม่สามารถแก้ไขข้อมูลได้ โปรดลองอีกครั้ง",
      icon: "error",
      showConfirmButton: false,
      timer: 1000,
    });
    openEditmodalTableMat.value?.closeModal();
    console.error("Error updating table-mats:", error);
    
  }
};


const deleteItemWristStrap = async (id) => {
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
      await axios.delete(`https://esd-app-strapi-test.onrender.com/api/wrist-straps/${id}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "ลบสำเร็จ!",
        text: "ข้อมูลถูกลบเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1000, // แสดง 1 วินาทีแล้วหายไปเอง
      });
      // เรียก get_data() เพื่อรีเฟรชข้อมูล
      get_data();
      // ทำให้ showModal = true หลังจากลบข้อมูล
      showModal.value = true;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถลบข้อมูลได้",
        showConfirmButton: false,
        timer: 1000, // แสดง 1 วินาทีแล้วหายไปเอง
      });
      console.error(error);
    }
  }
};

const deleteItemTableMat = async (id) => {
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
      await axios.delete(`https://esd-app-strapi-test.onrender.com/api/table-mats/${id}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "ลบสำเร็จ!",
        text: "ข้อมูลถูกลบเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1000, // แสดง 1 วินาทีแล้วหายไปเอง
      });
      // เรียก get_data() เพื่อรีเฟรชข้อมูล
      get_data();
      // ทำให้ showModal = true หลังจากลบข้อมูล
      showModal.value = true;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถลบข้อมูลได้",
        showConfirmButton: false,
        timer: 1000, // แสดง 1 วินาทีแล้วหายไปเอง
      });
      console.error(error);
    }
  }
};



const print = () => {
  // window.print()
  showformprint.value = true;
  console.log(showformprint);
};


</script>

<style scoped>
.table-auto th,
.table-auto td {
  text-align: center;
  padding: 8px;
}
</style>
