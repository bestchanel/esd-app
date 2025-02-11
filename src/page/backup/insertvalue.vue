<template>
  <div v-if="showformprint == false">

    <Card title="จัดการค่าความต้านทาน">
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

<!-- Dropdown สำหรับเลือกสาขา (WRIST STRAP) -->
<div v-if="selectedTable === 'WRIST STRAP'">
  <label for="branchSelectWristStrap" class="block">เลือกสาขา</label>
  <select
    id="branchSelectWristStrap"
    v-model="selectedBranch"
    @change="filterByMonthAndWeek"
    class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="" selected>แสดงทุกสาขา</option>
    <option v-for="branch in branches" :key="branch.id" :value="branch.attributes.Branchname">
      {{ branch.attributes.Branchname }}
    </option>
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
<div v-if="selectedTable === 'WRIST STRAP'">
  <label for="weekFilter" class="block">เลือกสัปดาห์</label>
  <select
    id="weekFilter"
    v-model="selectedWeek"
    @change="filterByMonthAndWeek"
    class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">แสดงทุกสัปดาห์</option>
    <option value="1">สัปดาห์ที่ 1</option>
    <option value="2">สัปดาห์ที่ 2</option>
    <option value="3">สัปดาห์ที่ 3</option>
    <option value="4">สัปดาห์ที่ 4</option>
    <option value="5">สัปดาห์ที่ 5</option>
  </select>
</div>

<!-- Dropdown สำหรับเลือกสาขา (TABLE MAT) -->
<div v-if="selectedTable === 'TABLE MAT'">
  <label for="branchSelectTableMat" class="block">เลือกสาขา</label>
  <select
    id="branchSelectTableMat"
    v-model="selectedBranch"
    @change="filterByMonthAndBranch"
    class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="" selected>แสดงทุกสาขา</option>
    <option v-for="branch in branches" :key="branch.id" :value="branch.attributes.Branchname">
      {{ branch.attributes.Branchname }}
    </option>
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

        <div class="flex justify-end">
        <!-- Modal Section -->
        <Modal 
          v-if="showModal"
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
            <option value="WRIST STRAP">WRIST STRAP</option>
            <option value="TABLE MAT">TABLE MAT</option>
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

<!-- ปุ่มเปิด Popup -->
<Button
v-if="selectedTable === 'WRIST STRAP' || selectedTable === 'TABLE MAT'"
  btnClass="btn-primary"
  @click="showSignatureModal = true"
  class="ml-4 flex items-center space-x-2">
  <span>สร้างลายเซ็นอิเล็กทรอนิกส์</span>
  <span v-if="isSaved" class="text-green-500">     ✔</span>
</Button>


<!-- ปุ่ม ออกรายงาน PDF -->
<Button
  v-if="selectedTable === 'WRIST STRAP'"
  btnClass="btn-danger"
  text="ออกรายงาน PDF"
  icon="vscode-icons:file-type-pdf2"
  @click="printWristStrap"
  class="ml-4"
/>

<Button
  v-if="selectedTable === 'TABLE MAT'"
  btnClass="btn-danger"
  text="ออกรายงาน PDF"
  icon="vscode-icons:file-type-pdf2"
  @click="printTableMat"
  class="ml-4"
/>
</div>
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
      @page-changed="currentWristStrapPage = $event"
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

    <!-- Popup ลายเซ็น -->
    <div v-if="showSignatureModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-lg font-semibold">สร้างลายเซ็นอิเล็กทรอนิกส์</h2>

        <!-- ส่วนแสดงลายเซ็น -->
        <Signature ref="signatureRef" width="400px" height="200px" class="border border-gray-300 rounded-md shadow-sm" />

        <!-- แสดงลายเซ็นที่บันทึกไว้ -->
        <div v-if="savedSignature" class="mt-4">
          <h3 class="text-sm font-medium">ลายเซ็นที่บันทึกไว้:</h3>
          <img :src="savedSignature" alt="Saved Signature" class="border border-gray-300 rounded-md" />
        </div>

        <div class="flex space-x-2 mt-4">
          <button @click="saveSignature" class="px-4 py-2 bg-green-500 text-white rounded-md">บันทึก</button>
          <button @click="clearSignature" class="px-4 py-2 bg-red-500 text-white rounded-md">ล้าง</button>
          <button @click="showSignatureModal = false" class="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition">ปิด</button>
        </div>
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
import Signature from "vue3-signature";
import Swal from "sweetalert2";
import Card from "@/components/Card/index.vue";
import Button from "@/components/Button/index.vue";
import Modal from "@/components/Modal/Modal.vue";
import Textinput from "@/components/Textinput/index.vue";
import axios from "axios";
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import Pagination from "@/components/Pagination";
import * as fontkit from 'fontkit';  // ใช้การนำเข้าทั้งหมดจาก fontkit
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// เก็บค่าลายเซ็น
const showSignatureModal = ref(false);
const savedSignature = ref(null);
const signatureRef = ref(null);
const isSaved = ref(false); // ใช้ตรวจสอบว่าบันทึกสำเร็จหรือไม่
const showModal = ref(true);
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

const branches = ref([]);
const selectedBranch = ref('');
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
const perpage = ref(5); // จำนวนรายการต่อหน้า
const currentWristStrapPage = ref(1); // หน้าปัจจุบัน
const currentTableMatPage = ref(1); // หน้าปัจจุบัน
const pageRange = ref(1000); // จำนวนหน้าที่จะแสดงใน pagination

// คำนวณข้อมูลหน้า Pagination
const totalPages = computed(() => Math.ceil(filteredData.value.length / perpage.value));
const totalPagesTableMat = computed(() => Math.ceil(filteredData.value.length / perpage.value));

const paginatedData = computed(() => {
  const start = (currentWristStrapPage.value - 1) * perpage.value;
  return filteredData.value.slice(start, start + perpage.value);
});

const paginatedDataTableMat = computed(() => {
  const start = (currentTableMatPage.value - 1) * perpage.value;
  return filteredData.value.slice(start, start + perpage.value);
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

// คำนวณสัปดาห์ที่จากวันที่
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

// ฟังก์ชันกรองข้อมูลตามเดือน
const filterByMonthAndBranch = () => {
  if (!selectedBranch.value && !selectedMonth.value) {
    filteredData.value = data_table_mats.value;
    return;
  }

  const selectedMonthIndex = months.indexOf(selectedMonth.value);

  filteredData.value = data_table_mats.value.filter((item) => {
    const itemBranch = item.attributes.users_permissions_user.data.attributes.branches.data.attributes.Branchname;
    const itemYear = new Date(item.attributes.createdAt).getFullYear() + 543; // ปีไทย
    const itemMonth = new Date(item.attributes.createdAt).getMonth();

    const branchMatches = selectedBranch.value ? itemBranch === selectedBranch.value : true;
    const monthMatches = selectedMonth.value ? itemMonth === selectedMonthIndex : true;
    const yearMatches = selectedYear.value ? itemYear == selectedYear.value : true;

    return branchMatches && monthMatches && yearMatches;
  });
};



onMounted(() => {
  const today = new Date();
  selectedMonthWristStrap.value = months[today.getMonth()]; // ตั้งค่าสำหรับ WRIST STRAP
});

const years = [];

// สร้างปีไทย (พ.ศ.) ปัจจุบันและปีย้อนหลัง 5 ปี
for (let i = 0; i <= 5; i++) {
  const year = new Date().getFullYear() + 543 - i; // คำนวณปีแบบไทย (พ.ศ.)
  years.push(year);
}

const filterByMonthAndWeek = () => {
  if (!selectedBranch.value && !selectedMonth.value && !selectedWeek.value && !selectedYear.value) {
    filteredData.value = data_wrist_straps.value;
    return;
  }

  filteredData.value = data_wrist_straps.value.filter((item) => {
    const itemBranch = item.attributes.users_permissions_user.data.attributes.branches.data.attributes.Branchname;
    const itemMonth = new Date(item.attributes.createdAt).getMonth(); // เดือนในรูปแบบตัวเลข (0-11)
    const itemWeek = calculateWeek(item.attributes.createdAt);
    const itemYear = new Date(item.attributes.createdAt).getFullYear() + 543; // ปีไทย

    const branchMatches = selectedBranch.value ? itemBranch === selectedBranch.value : true;
    const monthMatches = selectedMonth.value ? itemMonth === months.indexOf(selectedMonth.value) : true; // เทียบดัชนีเดือน
    const weekMatches = selectedWeek.value ? itemWeek == selectedWeek.value : true;
    const yearMatches = selectedYear.value ? itemYear == selectedYear.value : true;

    return branchMatches && monthMatches && weekMatches && yearMatches;
  });
};

// ตั้งค่าปีปัจจุบัน
onMounted(() => {
  const today = new Date();
  selectedMonth.value = months[today.getMonth()];
  selectedWeek.value = calculateWeek(today.toISOString());
  selectedBranch.value = "นครราชสีมา";
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

onMounted(() => {
  fetchBranches();
});


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
const pdfUrl = "/HP-06-Wrist-Strap-Weekly-Self-Check-v.02.pdf";

const printWristStrap = async () => {
  try {
    const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const { width, height } = pdfDoc.getPages()[0].getSize();
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch('/THSarabunNew/THSarabunNew Bold.ttf').then(res => res.arrayBuffer());
    const font = await pdfDoc.embedFont(fontBytes);

    const lineHeight = 20;
    let startY = height - 150;
    let page = pdfDoc.getPages()[0];
    let rowCount = 0;

    const [templatePage] = await pdfDoc.copyPages(pdfDoc, [0]);

    const addNewPage = () => {
      const newPage = pdfDoc.addPage(templatePage);
      page = newPage;
      startY = height - 150;
    };

    if (!filteredData.value || filteredData.value.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'ไม่มีข้อมูล',
        text: 'ไม่มีข้อมูลที่จะแสดงใน PDF',
        timer: 1000, // เวลา 1 วินาที
        showConfirmButton: false
      });
      return;
    }

    const selectedMonthThai = selectedMonth.value || "แสดงทุกเดือน";
    const selectedYearValue = selectedYear?.value || "แสดงทุกปี";
    const currentYear = new Date().getFullYear() + 543;
    const yearToDisplay = selectedYearValue || currentYear;
    const monthYear = `${selectedMonthThai} / ${yearToDisplay}`;
    const branchToShow = selectedBranch.value?.trim() || "แสดงทุกสาขา";

    const weekPositions = {
      week1: 350,
      week2: 450,
      week3: 555,
      week4: 660,
      week5: 765,
    };

    filteredData.value.forEach((item) => {
      const name = item.attributes.users_permissions_user.data.attributes.Name || 'No Name';
      const resistance = item.attributes.Resistance;
      const weekNumber = calculateWeek(item.attributes.createdAt);

      let resistanceLabel = 'GOOD';
      if (resistance < 800) resistanceLabel = 'LOW';
      else if (resistance > 9000) resistanceLabel = 'HIGH';

      if (rowCount >= 12) {
        addNewPage();
        rowCount = 0;
      }

      // วาดเดือนและปีใน PDF
      page.drawText(monthYear, {
        x: 650,
        y: height - 75,
        size: 14,
        font,
        color: rgb(0, 0, 0),
      });

      page.drawText(branchToShow, {
        x: 650,
        y: height - 54,
        size: 14,
        font,
        color: rgb(0, 0, 0),
      });

      page.drawText(`${name}`, {
        x: 80,
        y: startY,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      // เลือกตำแหน่ง x ตาม week
      const weekKey = `week${weekNumber}`; // สร้าง key เช่น 'week1', 'week2'
      const weekXPosition = weekPositions[weekKey] || 350; // ถ้า weekNumber เกิน 5 จะใช้ตำแหน่ง default คือ 350

      // แสดงค่า resistanceLabel ที่ตำแหน่งสัปดาห์
      page.drawText(`${resistanceLabel}`, {
        x: weekXPosition,
        y: startY,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      // ลดค่าตำแหน่ง y และเพิ่ม rowCount
      startY -= lineHeight;
      rowCount++;
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};


const pdfUrlTableMat = "/HP-07-Table-Mat-Checklist-v.02.pdf";

const printTableMat = async () => {
  try {
    const existingPdfBytes = await fetch(pdfUrlTableMat).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const { width, height } = pdfDoc.getPages()[0].getSize();
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch('/THSarabunNew/THSarabunNew Bold.ttf').then(res => res.arrayBuffer());
    const font = await pdfDoc.embedFont(fontBytes);

    const lineHeight = 11; // ระยะห่างระหว่างบรรทัด
    let startY = height - 184; // ตำแหน่งเริ่มต้นแนวตั้ง
    let rowCount = 0; // ตัวนับจำนวนแถว

    // กำหนดหน้าแรก
    let page = pdfDoc.getPages()[0];

    // คัดลอกหน้าแรกไว้สำหรับใช้งานเป็น Template
    const [templatePage] = await pdfDoc.copyPages(pdfDoc, [0]);

    // ฟังก์ชันเพิ่มหน้าใหม่
    const addNewPage = () => {
      const newPage = pdfDoc.addPage(templatePage);
      page = newPage;
      startY = height - 184; // รีเซ็ตตำแหน่งเริ่มต้น Y
    };

    // ตรวจสอบว่ามีข้อมูลใน filteredData หรือไม่
    if (!filteredData.value || filteredData.value.length === 0) {
  Swal.fire({
    icon: 'info',
    title: 'ไม่มีข้อมูล',
    text: 'ไม่มีข้อมูลที่จะแสดงใน PDF',
    timer: 1000, // เวลา 1 วินาที
    showConfirmButton: false
  });
  return;
}

    // ดึงเดือนที่เลือกจาก Dropdown
    const selectedMonthThai = selectedMonth.value || "แสดงทุกเดือน";

    // ตรวจสอบและดึงค่าปีที่เลือกจาก Dropdown
    const selectedYearValue = selectedYear?.value || "แสดงทุกปี";
    const currentYear = new Date().getFullYear() + 543; // ปีปัจจุบันในรูปแบบ พ.ศ.
    const yearToDisplay = selectedYearValue || currentYear;

    const month = `${selectedMonthThai}`;
    const year = `${yearToDisplay}`;

    // วนลูปเพื่อใส่ข้อมูล
    filteredData.value.forEach((item) => {
      const name = item.attributes.users_permissions_user.data.attributes.Name || 'No Name';
      const resistance = item.attributes.ResistanceTableMat;
      const isGrounded = item.attributes.Ground ? 'Yes' : 'No';

      let resistanceLabel = '-';
      if (resistance >= 1 && resistance <= 100) {
        resistanceLabel = 'Green';
      } else if (resistance >= 300 && resistance <= 1000) {
        resistanceLabel = 'Yellow';
      } else if (resistance >= 3000 && resistance <= 10000) {
        resistanceLabel = 'Orange';
      } else if (resistance >= 100000 && resistance <= 1000000) {
        resistanceLabel = 'Red';
      }

      // ตรวจสอบจำนวนแถว ถ้าเกิน 12 ให้สร้างหน้าใหม่
      if (rowCount >= 12) {
        addNewPage();
        rowCount = 0;
      }

         // วาดเดือนและปีใน PDF
    page.drawText(month, {
      x: 640,
      y: height - 85,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(year, {
  x: 725, 
  y: height - 85,
  size: 14,
  font,
  color: rgb(0, 0, 0),
});

    const branchToShow = selectedBranch.value?.trim() || "แสดงทุกสาขา";

    page.drawText(branchToShow, {
      x: 640,
      y: height - 60,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

      // วาดข้อความในแต่ละแถว
      page.drawText(` ${name}`, {
        x: 70,
        y: startY,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      page.drawText(` ${isGrounded}`, {
        x: 300,
        y: startY,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      page.drawText(` ${resistanceLabel}`, {
        x: 440,
        y: startY,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      startY -= lineHeight; // ลดตำแหน่ง Y ลงในแต่ละแถว
      rowCount++;
    });

    const pdfBytes = await pdfDoc.save();

    // สร้าง PDF และเปิดในหน้าต่างใหม่
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  } catch (error) {
    console.error('Error generating PDF:', error.message); // แสดงข้อความผิดพลาด
  }
};


// เรียกข้อมูลเมื่อ component ถูก mount
onMounted(() => {
  get_data();
});

// โหลดค่าลายเซ็นจาก LocalStorage ตอนเปิดเว็บ
onMounted(() => {
  const storedSignature = localStorage.getItem("savedSignature");
  if (storedSignature) {
    savedSignature.value = storedSignature;
    isSaved.value = true;
  }
});

const saveSignature = () => {
  if (signatureRef.value) {
    savedSignature.value = signatureRef.value.save(); // ดึงค่าลายเซ็นที่บันทึก
    localStorage.setItem("savedSignature", savedSignature.value); // บันทึกลง LocalStorage
    isSaved.value = true; // เปลี่ยนสถานะเป็นบันทึกสำเร็จ
    showSignatureModal.value = false; // ปิด popup อัตโนมัติ
  }
};

const clearSignature = () => {
  if (signatureRef.value) {
    signatureRef.value.clear(); // ล้างลายเซ็น
    localStorage.removeItem("savedSignature"); // ลบออกจาก LocalStorage
    savedSignature.value = null;
    isSaved.value = false; // รีเซ็ตสถานะ
    showSignatureModal.value = false; // ปิด popup อัตโนมัติ
  }
};
</script>

<style scoped>
.table-auto {
  font-family: 'Kanit', sans-serif; /* ใช้ฟอนต์ Kanit */
}
th, td {
  text-align: center;
  padding: 8px;
  font-size: 14px;
}
.table-auto thead tr {
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

</style>
