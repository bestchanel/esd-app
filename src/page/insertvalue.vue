<template>




  <div v-if="showformprint == false">
<Card title="จัดการค่าความต้านทาน">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <!-- Dropdown สำหรับเลือกตาราง -->
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

      <!-- แสดง DatePicker เฉพาะเมื่อเลือก WRIST STRAP -->
      <VueTailwindDatePicker
  v-if="selectedTable === 'WRIST STRAP'"
  v-model="dateValue"
  v-slot="{ clear }"
>
  <div>
    <div
      class="date-btn inline-flex btn btn-md whitespace-nowrap space-x-2 rtl:space-x-reverse cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 px-3 py-2 border border-gray-300"
      @click="setDefaultDropdowns(clear)"
    >
      <span class="text-lg"><Icon icon="heroicons:calendar" /></span>
      <span>{{ displayDate }}</span>
    </div>
  </div>
</VueTailwindDatePicker>  

      
            <!-- แสดง DatePicker เฉพาะเมื่อเลือก Table Mat -->
<VueTailwindDatePicker 
v-if="selectedTable === 'TABLE MAT'" 
v-model="dateValue2" 
v-slot="{ clear }"
>
<div>
  <div
    class="shadow-sm date-btn inline-flex btn btn-md whitespace-nowrap space-x-2 rtl:space-x-reverse cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 px-3 py-2 border border-gray-300"
    @click="setDefaultDropdownsTablemat(clear)"
  >
    <span class="text-lg"><Icon icon="heroicons:calendar" /></span>
    <span>{{ displayDate2 }}</span>
  </div>
</div>
</VueTailwindDatePicker>

<!-- Dropdown สำหรับเลือกสาขา -->
<select
v-if="selectedTable === 'WRIST STRAP'"
v-model="selectedBranch"
@change="filterByMonthAndWeek"
class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
>
<option value="" selected>แสดงทุกสาขา</option>
<option v-for="branch in branches" :key="branch.id" :value="branch.attributes.Branchname">
  {{ branch.attributes.Branchname }}
</option>
</select>

<!-- Dropdown สำหรับเลือกปี -->
<select v-if="selectedTable === 'WRIST STRAP'"
v-model="selectedYear"
@change="filterByMonthAndWeek"
class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
>
<option value="" selected>แสดงทุกปี</option>
<option v-for="year in years" :key="year" :value="year">
  {{ year }}
</option>
</select>


<!-- Dropdown สำหรับเลือกเดือน (แสดงเมื่อเลือกสาขาก่อน) -->
<select v-if="selectedTable === 'WRIST STRAP'"
v-model="selectedMonth"
@change="filterByMonthAndWeek"
class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
>
<option value="">แสดงทุกเดือน</option>
<option v-for="month in months" :key="month" :value="month">
  {{ month }}
</option>
</select>


<!-- Dropdown สำหรับเลือกสัปดาห์ (แสดงเมื่อเลือกเดือน) -->
<select v-if="selectedTable === 'WRIST STRAP'"
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


<!-- Dropdown สำหรับเลือกสาขา -->
<select
v-if="selectedTable === 'TABLE MAT'"
v-model="selectedBranch"
@change="filterByMonthAndBranch"
class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
>
<option value="" selected>แสดงทุกสาขา</option>
<option v-for="branch in branches" :key="branch.id" :value="branch.attributes.Branchname">
  {{ branch.attributes.Branchname }}
</option>
</select>

<select v-if="selectedTable === 'TABLE MAT'"
v-model="selectedYear"
@change="filterByMonthAndBranch"
class="block max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
>
<option value="" selected>แสดงทุกปี</option>
<option v-for="year in years" :key="year" :value="year">
  {{ year }}
</option>
</select>

  <!-- Dropdown เลือกเดือน -->
  <select v-if="selectedTable === 'TABLE MAT'"
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



      <div class="flex justify-end">

        <!-- ปุ่มและ Modal สำหรับ WRIST STRAP -->

<Button 
v-if="selectedTable === 'WRIST STRAP'"
@click="openWristStrapModal"
btnClass="btn-success"
:text="savedSignatureWristStrap ? 'เปิดช่องเซ็นชื่อ ✅' : 'เปิดช่องเซ็นชื่อ'"
icon="ph:signature"
class="mr-4" 
/>

<!-- Modal สำหรับลายเซ็น -->
<!-- Modal สำหรับลายเซ็น Wrist Strap -->
<Transition>
<div v-if="state.showSignatureWristStrap" class="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50">
  <div class="bg-white p-6 rounded-lg shadow-lg w-96">
    <h2 class="text-lg font-semibold mb-4">เซ็นชื่อของคุณ - Wrist Strap</h2>
    <p class="text-sm text-gray-500 mb-4">วันที่: {{ currentDate2 }}</p>
    <div class="flex justify-center">
      <Vue3Signature ref="signatureWristStrap" :sigOption="state.option" :w="'300px'" :h="'300px'" 
             :disabled="state.disabled" class="example"/>
    </div>
    <div class="flex gap-3 r mt-4">
      <button @click="saveSignatureWristStrap" 
              class="px-4 py-2 bg-green-500 text-white rounded-md">บันทึก</button>
      <button @click="clearSignatureWristStrap" 
              class="px-4 py-2 bg-red-500 text-white rounded-md">ล้าง</button>
      <button @click="undoWristStrap" 
              class="px-4 py-2 bg-orange-500 text-white rounded-md">ย้อนกลับ</button>
      <button @click="state.showSignatureWristStrap = false" 
              class="px-4 py-2 bg-gray-500 text-white rounded-md">ปิด</button>
    </div>
    <p v-if="savedSignatureWristStrap" class="text-green-600 font-bold mt-2">✅ บันทึกแล้ว</p>
  </div>
</div>
</Transition>


<!-- ปุ่มและ Modal สำหรับ TABLE MAT -->
<Button 
v-if="selectedTable === 'TABLE MAT'"
 @click="openTableMatModal"
btnClass="btn-success"
:text="savedSignatureTableMat ? 'เปิดช่องเซ็นชื่อ ✅' : 'เปิดช่องเซ็นชื่อ'"
icon="ph:signature"
class="mr-4" 
/>

<!-- Modal สำหรับลายเซ็น -->
<Transition>
<div v-if="state.showSignatureTableMat" class="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50">
  <div class="bg-white p-6 rounded-lg shadow-lg w-96">
    <h2 class="text-lg font-semibold mb-4">เซ็นชื่อของคุณ - Table Mat</h2>
    <p class="text-sm text-gray-500 mb-4">วันที่: {{ currentDate2 }}</p>
    <div class="flex justify-center">
      <Vue3Signature ref="signatureTableMat" :sigOption="state.option" :w="'300px'" :h="'300px'" 
             :disabled="state.disabled" class="example"/>
    </div>
    <div class="flex gap-3 r mt-4">
      <button @click="saveSignatureTableMat" 
              class="px-4 py-2 bg-green-500 text-white rounded-md">บันทึก</button>
      <button @click="clearSignatureTableMat" 
              class="px-4 py-2 bg-red-500 text-white rounded-md">ล้าง</button>
      <button @click="undoTableMat" 
              class="px-4 py-2 bg-orange-500 text-white rounded-md">ย้อนกลับ</button>
      <button @click="state.showSignatureTableMat = false" 
              class="px-4 py-2 bg-gray-500 text-white rounded-md">ปิด</button>
    </div>
    <p v-if="savedSignatureTableMat" class="text-green-600 font-bold mt-2">✅ บันทึกแล้ว</p>
  </div>
</div>
</Transition>


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
          btnClass="btn-success mt-4"
          text="บันทึกข้อมูล"
          icon="gridicons:add"
          @click="SaveData"
        />
      </Modal>
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



    <Modal
      ref="openEditmodal"
      title="แก้ไขค่าความต้านทาน"
      label=""
      labelClass="btn-ghost"
      class="ml-auto"
    >
      <p>
        ชื่อ-นามสกุล :
        {{
          dataupdatemodal.attributes.users_permissions_user.data.attributes
            .Name
        }}
      </p>
      <p>
        Email :
        {{
          dataupdatemodal.attributes.users_permissions_user.data.attributes
            .email
        }}
      </p>
      <p>
        ตำแหน่ง :
        {{
          dataupdatemodal.attributes.users_permissions_user.data.attributes
            .Position
        }}
      </p>

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
      <p>
        ชื่อ-นามสกุล :
        {{
          dataupdatemodal.attributes.users_permissions_user.data.attributes
            .Name
        }}
      </p>
      <p>
        Email :
        {{
          dataupdatemodal.attributes.users_permissions_user.data.attributes
            .email
        }}
      </p>
      <p>
        ตำแหน่ง :
        {{
          dataupdatemodal.attributes.users_permissions_user.data.attributes
            .Position
        }}
      </p>
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
import { reactive,ref, onMounted, computed, watch } from "vue";
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


const currentDate2 = ref(new Date().toLocaleDateString('th-TH')); // แสดงวันที่ในรูปแบบไทย


////////////////////////////////////////////// ส่วนของ DatePicker
import VueTailwindDatePicker from "vue-tailwind-datepicker";
const dateValue = ref("");
const dateValue2 = ref("");

// ฟังก์ชันสำหรับแปลงช่วงวันที่เป็นข้อความโดยไม่เอาเวลา
const formatDateRange = (range) => {
if (!range) return "เลือกช่วงวันที่";

// แยกวันที่จากช่วงที่เลือก เช่น "2024-01-30 10:00:00 ~ 2024-02-05 18:00:00"
const regex = /(\d{4}-\d{2}-\d{2}) \d{2}:\d{2}:\d{2} ~ (\d{4}-\d{2}-\d{2}) \d{2}:\d{2}:\d{2}/;
const match = range.match(regex);

if (match) {
  return `${match[1]} ~ ${match[2]}`; // คืนค่าเฉพาะวันที่ เช่น "2024-01-30 ~ 2024-02-05"
}

return range; // ถ้าไม่มีรูปแบบที่ตรงกัน คืนค่าตามเดิม
};

// คำนวณค่าที่จะแสดงโดยตัดเวลาออก
const displayDate = computed(() => formatDateRange(dateValue.value));
const displayDate2 = computed(() => formatDateRange(dateValue2.value));

const setDefaultDropdowns = (clear) => {
// เคลียร์ค่า dateValue
clear();

// ตั้งค่าของ dropdown ให้เป็นค่าเริ่มต้น (แสดงทุกสาขา, ทุกปี, ทุกเดือน, ทุกสัปดาห์)
selectedBranch.value = ""; // ค่าเริ่มต้นสำหรับสาขา: แสดงทุกสาขา
selectedMonth.value = "";  // ค่าเริ่มต้นสำหรับเดือน: แสดงทุกเดือน
selectedWeek.value = "";   // ค่าเริ่มต้นสำหรับสัปดาห์: แสดงทุกสัปดาห์
selectedYear.value = "";   // ค่าเริ่มต้นสำหรับปี: แสดงทุกปี
get_data()
// เรียกใช้ฟังก์ชันกรองข้อมูลใหม่
filterByMonthAndWeek();
};

const setDefaultDropdownsTablemat = (clear) => {
// เคลียร์ค่า dateValue2
clear();

// ตั้งค่าของ dropdown ให้เป็นค่าเริ่มต้น (แสดงทุกสาขา, ทุกปี, ทุกเดือน, ทุกสัปดาห์)
selectedBranch.value = ""; // ค่าเริ่มต้นสำหรับสาขา: แสดงทุกสาขา
selectedMonth.value = "";  // ค่าเริ่มต้นสำหรับเดือน: แสดงทุกเดือน
selectedYear.value = "";   // ค่าเริ่มต้นสำหรับปี: แสดงทุกปี
get_data()
// เรียกใช้ฟังก์ชันกรองข้อมูลใหม่
filterByMonthAndBranch();
};
///////////////////////////////////////////////////////////////////



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
console.log(currentDate + " Test date")
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


// ฟังก์ชันกรองข้อมูลตามสัปดาห์ที่
const filterByWeek = () => {
if (!selectedWeek.value) {
  filteredData.value = data_wrist_straps.value;
  return;
}
filteredData.value = data_wrist_straps.value.filter(
  (item) => calculateWeek(item.attributes.createdAt) == selectedWeek.value
);
};

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

// ฟังก์ชันกรองข้อมูลตามเดือนและสาขา พร้อมรองรับการกรองตามช่วงวันที่
const filterByMonthAndBranch = () => {
if (!selectedBranch.value && !selectedMonth.value && !selectedYear.value && !dateValue2.value) {
  filteredData.value = data_table_mats.value;
  currentTableMatPage.value = 1
  return;
}

// ฟังก์ชันแยกช่วงวันที่จาก dateValue2
const parseDateRange = (range) => {
  if (!range) return [null, null];

  const regex = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) ~ (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;
  const match = range.match(regex);

  if (match) {
    const startDate = adjustTimeOnDate(new Date(match[1]), false);
    const endDate = adjustTimeOnDate(new Date(match[2]), true);
    return [startDate, endDate];
  }

  return [null, null];
};

// ฟังก์ชันสำหรับปรับเวลา (00:00:00 สำหรับ start date, 23:59:59.999 สำหรับ end date)
const adjustTimeOnDate = (date, isEndDate = false) => {
  if (isEndDate) {
    date.setHours(23, 59, 59, 999);
  } else {
    date.setHours(0, 0, 0, 0);
  }
  return date;
};

// แยกช่วงวันที่จาก dateValue2
const [startDate, endDate] = parseDateRange(dateValue2.value);
console.log('Start Date:', startDate);
console.log('End Date:', endDate);

// หาดัชนีของเดือนที่เลือก
const selectedMonthIndex = months.indexOf(selectedMonth.value);

filteredData.value = data_table_mats.value.filter((item) => {
  const itemBranch = item.attributes.users_permissions_user.data.attributes.branches.data.attributes.Branchname;
  const itemDate = new Date(item.attributes.createdAt);
  const itemYear = itemDate.getFullYear() + 543; // ปีไทย
  const itemMonth = itemDate.getMonth();

  // เปรียบเทียบวันที่ (ตัดเวลา)
  const dateMatches =
    startDate && endDate
      ? itemDate >= startDate && itemDate <= endDate
      : true;

  const branchMatches = selectedBranch.value ? itemBranch === selectedBranch.value : true;
  const monthMatches = selectedMonth.value ? itemMonth === selectedMonthIndex : true;
  const yearMatches = selectedYear.value ? itemYear == selectedYear.value : true;

  return branchMatches && monthMatches && yearMatches && dateMatches;
});
currentTableMatPage.value = 1
};

// เรียกใช้งาน filter เมื่อค่าเปลี่ยน
watch([dateValue2, selectedBranch, selectedMonth, selectedYear], filterByMonthAndBranch);

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


// ฟังก์ชันสำหรับกรองข้อมูลตามช่วงวันที่และข้อมูลอื่นๆ
const filterByMonthAndWeek = () => {
// ถ้าไม่มีการเลือกค่าหรือช่วงวันที่ ให้แสดงข้อมูลทั้งหมด
if (!selectedBranch.value && !selectedMonth.value && !selectedWeek.value && !selectedYear.value && !dateValue.value) {
  filteredData.value = data_wrist_straps.value;
  currentWristStrapPage.value = 1; // รีเซ็ตเป็นหน้าแรก
  return;
}

// ฟังก์ชันเพื่อแยกช่วงวันที่
const parseDateRange = (range) => {
  if (!range) return [null, null];

  // Regular expression ที่ใช้แยกวันที่เริ่มต้นและสิ้นสุด
  const regex = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) ~ (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;
  const match = range.match(regex);

  if (match) {
    // ตัดเวลาออกจากวันที่และตั้งเวลาเป็น 00:00:00 สำหรับ startDate และ 23:59:59.999 สำหรับ endDate
    const startDate = adjustTimeOnDate(new Date(match[1]), false); // startDate
    const endDate = adjustTimeOnDate(new Date(match[2]), true);  // endDate
    return [startDate, endDate];
  }

  return [null, null];
};

// ฟังก์ชันสำหรับปรับเวลา (00:00:00 สำหรับ start date, 23:59:59.999 สำหรับ end date)
const adjustTimeOnDate = (date, isEndDate = false) => {
  if (isEndDate) {
    date.setHours(23, 59, 59, 999); // ตั้งเวลาเป็น 23:59:59.999 สำหรับ end date
  } else {
    date.setHours(0, 0, 0, 0); // ตั้งเวลาเป็น 00:00:00 สำหรับ start date
  }
  return date;
};

// แยกช่วงวันที่จาก dateValue
const [startDate, endDate] = parseDateRange(dateValue.value); // แยกช่วงวันที่
console.log('Start Date:', startDate);
console.log('End Date:', endDate);

// ฟิลเตอร์ข้อมูลตามเงื่อนไขต่างๆ
filteredData.value = data_wrist_straps.value.filter((item) => {
  const itemBranch = item.attributes.users_permissions_user.data.attributes.branches.data.attributes.Branchname;
  const itemDate = new Date(item.attributes.createdAt);
  const itemMonth = itemDate.getMonth(); // เดือนในรูปแบบตัวเลข (0-11)
  const itemWeek = calculateWeek(item.attributes.createdAt);
  const itemYear = itemDate.getFullYear() + 543; // ปีไทย

  // เปรียบเทียบวันที่ (ตัดเวลา)
  const dateMatches =
    startDate && endDate
      ? itemDate >= startDate && itemDate <= endDate
      : true;

  // เช็คว่าตรงกับเงื่อนไขที่เลือกหรือไม่
  const branchMatches = selectedBranch.value ? itemBranch === selectedBranch.value : true;
  const monthMatches = selectedMonth.value ? itemMonth === months.indexOf(selectedMonth.value) : true; // เทียบดัชนีเดือน
  const weekMatches = selectedWeek.value ? itemWeek == selectedWeek.value : true;
  const yearMatches = selectedYear.value ? itemYear == selectedYear.value : true;

  // คืนค่าข้อมูลที่ตรงกับเงื่อนไขทั้งหมด
  return branchMatches && monthMatches && weekMatches && yearMatches && dateMatches;
});
currentWristStrapPage.value = 1; // รีเซ็ตเป็นหน้าแรกทุกครั้งที่มีการกรองใหม่
};

// เรียกใช้งาน filter เมื่อค่า dateValue หรือค่าต่างๆ เปลี่ยน
watch([dateValue, selectedBranch, selectedMonth, selectedWeek, selectedYear], filterByMonthAndWeek);


// ตั้งค่าปีปัจจุบัน
onMounted(() => {
const today = new Date();
selectedMonth.value = months[today.getMonth()];
selectedWeek.value = calculateWeek(today.toISOString());
selectedBranch.value = "นครราชสีมา";
selectedYear.value = today.getFullYear() + 543; // ปีไทย
filterByMonthAndWeek();
});


const sendTelegramMessage = async (message) => {
const telegramToken = "8057011868:AAHEv_oYaYWbYf3sqKcZFyjB9bmxi8zWK2g"; // ใส่ Token ของบอท
const chatId = "7315907432"; // ตรวจสอบ Chat ID ให้ถูกต้อง
const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

const data = {
  chat_id: chatId,
  text: message,
  parse_mode: "Markdown",
};

console.log("📤 ส่งข้อความไปยัง Telegram:", data);

try {
  const response = await axios.post(url, data);
  console.log("✅ ส่งสำเร็จ:", response.data);
} catch (error) {
  console.error("❌ ส่งไม่สำเร็จ:", error.response?.data || error.message);
  if (error.response) {
    console.error("📌 รายละเอียด:", error.response.data);
  }
}
};

const SaveData = async () => {
let message = "";

if (selectedOption.value === "WRIST STRAP") {
  const payload = {
    data: {
      users_permissions_user: users.value,
      name: wrist_name.value,
      fullname: fullname.value,
      branch: wrist_branch.value,
      week: week.value,
      recordDate: recordDate.value,
      Resistance: Resitance.value,
    },
  };

  try {
    await axios.post(
      "https://esd-app-strapi.up.railway.app/api/wrist-straps",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      }
    );

    message = `✅ *บันทึกข้อมูล WRIST STRAP สำเร็จ!*\n📌 *ชื่อ:* ${fullname.value}\n🏢 *สาขา:* ${wrist_branch.value}\n📆 *วันที่:* ${recordDate.value}\n⚡ *ความต้านทาน:* ${Resitance.value}`;
    sendTelegramMessage(message);

    closemodal.value?.closeModal();
    resetform();
    selecttablenow();
    get_data();

    Swal.fire({
      icon: "success",
      title: "บันทึกสำเร็จ!",
      text: "ข้อมูลได้ถูกบันทึกเรียบร้อยแล้ว",
      showConfirmButton: false,
      timer: 1000,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "ไม่สามารถบันทึกข้อมูลได้",
      showConfirmButton: false,
      timer: 1000,
    });
    console.error("Error saving WRIST STRAP data:", error);
  }
} else if (selectedOption.value === "TABLE MAT") {
  const payload = {
    data: {
      users_permissions_user: users.value,
      name: wrist_name.value,
      fullname: fullname.value,
      branch: wrist_branch.value,
      recordDate: recordDate.value,
      Resistance: Resitance.value,
      Ground: Ground.value,
      ResistanceTableMat: ResistanceTableMat.value,
    },
  };

  try {
    await axios.post(
      "https://esd-app-strapi.up.railway.app/api/table-mats",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      }
    );

    message = `✅ *บันทึกข้อมูล TABLE MAT สำเร็จ!*\n📌 *ชื่อ:* ${fullname.value}\n🏢 *สาขา:* ${wrist_branch.value}\n📆 *วันที่:* ${recordDate.value}\n⚡ 🌱 *สายดิน:* ${Ground.value ? "✅ มี" : "❌ ไม่มี"}\n🔵 *ความต้านทานแผ่นรองโต๊ะ:* ${ResistanceTableMat.value}`;
    sendTelegramMessage(message);

    closemodal.value?.closeModal();
    resetform();
    selecttablenow();
    get_data();

    Swal.fire({
      icon: "success",
      title: "บันทึกสำเร็จ!",
      text: "ข้อมูลได้ถูกบันทึกเรียบร้อยแล้ว",
      showConfirmButton: false,
      timer: 1000,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "ไม่สามารถบันทึกข้อมูลได้",
      showConfirmButton: false,
      timer: 1000,
    });
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
  const response = await axios.get('https://esd-app-strapi.up.railway.app/api/branches');
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
      "https://esd-app-strapi.up.railway.app/api/table-mats?populate[users_permissions_user][populate]=branches"
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
      "https://esd-app-strapi.up.railway.app/api/wrist-straps?populate[users_permissions_user][populate]=branches"
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
    `https://esd-app-strapi.up.railway.app/api/wrist-straps/${dataupdatemodal.value.id}`,
    data_update,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  // แสดง SweetAlert หลังจากการอัปเดตสำเร็จ
  Swal.fire({
    title: "Success!",
    text: "The wrist strap has been updated successfully.",
    icon: "success",
    showConfirmButton: false,
    timer: 1000,
  });

  openEditmodal.value?.closeModal();
} catch (error) {
  // กรณีที่เกิดข้อผิดพลาด
  Swal.fire({
    title: "Error!",
    text: "Failed to update the wrist strap. Please try again.",
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
    `https://esd-app-strapi.up.railway.app/api/table-mats/${dataupdatemodal.value.id}`,
    data_update,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  // แสดง SweetAlert หลังจากการอัปเดตสำเร็จ
  Swal.fire({
    title: "Success!",
    text: "The table-mats has been updated successfully.",
    icon: "success",
    showConfirmButton: false,
    timer: 1000,
  });

  openEditmodalTableMat.value?.closeModal();
} catch (error) {
  // กรณีที่เกิดข้อผิดพลาด
  Swal.fire({
    title: "Error!",
    text: "Failed to update the table-mats. Please try again.",
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
    await axios.delete(`https://esd-app-strapi.up.railway.app/api/wrist-straps/${id}`, {
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
    await axios.delete(`https://esd-app-strapi.up.railway.app/api/table-mats/${id}`, {
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

////////////////////ส่วนของ ลายเซ็น
const state = reactive({
showSignature: false,
option: {
  penColor: "rgb(0, 0, 0)",
  backgroundColor: "transparent"
},
disabled: false,
showSignatureWristStrap: false,  // สำหรับ Wrist Strap
showSignatureTableMat: false     // สำหรับ Table Mat
});

const savedSignatureWristStrap = ref(localStorage.getItem('savedSignatureWristStrap') || null);
const savedSignatureTableMat = ref(localStorage.getItem('savedSignatureTableMat') || null);

const signatureWristStrap = ref(null);
const signatureTableMat = ref(null);

const openWristStrapModal = () => {
state.showSignatureWristStrap = true;
setTimeout(() => loadSavedSignatureWristStrap(), 100); // โหลดลายเซ็นเมื่อเปิด Modal
};

const openTableMatModal = () => {
state.showSignatureTableMat = true;
setTimeout(() => loadSavedSignatureTableMat(), 100); // โหลดลายเซ็นเมื่อเปิด Modal
};

const saveSignatureWristStrap = () => {
if (signatureWristStrap.value) {
  const signatureData = signatureWristStrap.value.save('image/png');
  const date = new Date().toLocaleDateString('th-TH');
  savedSignatureWristStrap.value = { signature: signatureData, date: date };
  localStorage.setItem('savedSignatureWristStrap', JSON.stringify(savedSignatureWristStrap.value));
}
};

const saveSignatureTableMat = () => {
if (signatureTableMat.value) {
  const signatureData = signatureTableMat.value.save('image/png');
  const date = new Date().toLocaleDateString('th-TH');
  savedSignatureTableMat.value = { signature: signatureData, date: date };
  localStorage.setItem('savedSignatureTableMat', JSON.stringify(savedSignatureTableMat.value));
}
};

const loadSavedSignatureWristStrap = () => {
const savedWristStrapData = JSON.parse(localStorage.getItem('savedSignatureWristStrap'));
if (savedWristStrapData && savedWristStrapData.signature && signatureWristStrap.value) {
  signatureWristStrap.value.clear(); // ล้างก่อนโหลด
  signatureWristStrap.value.fromDataURL(savedWristStrapData.signature);
}
};

const loadSavedSignatureTableMat = () => {
const savedTableMatData = JSON.parse(localStorage.getItem('savedSignatureTableMat'));
if (savedTableMatData && savedTableMatData.signature && signatureTableMat.value) {
  signatureTableMat.value.clear(); // ล้างก่อนโหลด
  signatureTableMat.value.fromDataURL(savedTableMatData.signature);
}
};

const clearSignatureWristStrap = () => {
if (signatureWristStrap.value) {
  signatureWristStrap.value.clear();
}
savedSignatureWristStrap.value = null;
localStorage.removeItem('savedSignatureWristStrap');
};

const clearSignatureTableMat = () => {
if (signatureTableMat.value) {
  signatureTableMat.value.clear();
}
savedSignatureTableMat.value = null;
localStorage.removeItem('savedSignatureTableMat');
};

const undoWristStrap = () => {
if (signatureWristStrap.value) {
  signatureWristStrap.value.undo();
}
};

const undoTableMat = () => {
if (signatureTableMat.value) {
  signatureTableMat.value.undo();
}
};

onMounted(() => {
const savedWristStrapData = JSON.parse(localStorage.getItem('savedSignatureWristStrap'));
if (savedWristStrapData && savedWristStrapData.signature) {
  if (selectedTable.value === 'WRIST STRAP' && signatureWristStrap.value) {
    signatureWristStrap.value.fromDataURL(savedWristStrapData.signature);
  }
}

const savedTableMatData = JSON.parse(localStorage.getItem('savedSignatureTableMat'));
if (savedTableMatData && savedTableMatData.signature) {
  if (selectedTable.value === 'TABLE MAT' && signatureTableMat.value) {
    signatureTableMat.value.fromDataURL(savedTableMatData.signature);
  }
}
});


watch(savedSignatureWristStrap, (newVal) => {
if (!newVal) {
  localStorage.removeItem('savedSignatureWristStrap');
}
});

watch(savedSignatureTableMat, (newVal) => {
if (!newVal) {
  localStorage.removeItem('savedSignatureTableMat');
}
});

/////////////////////////


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
  let rowCount = 0;
  let page = pdfDoc.getPages()[0]; // เริ่มต้นจากหน้าแรก

  const [templatePage] = await pdfDoc.copyPages(pdfDoc, [0]);

  const addNewPage = () => {
    const newPage = pdfDoc.addPage(templatePage);
    page = newPage;
    startY = height - 150;
    
    // วาดเดือนและปีในหน้าใหม่
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

  // ดึงเดือนที่เลือกจาก Dropdown
  const selectedMonthThai = selectedMonth.value || "ทุกเดือน";

  // ตรวจสอบและดึงค่าปีที่เลือกจาก Dropdown
  const selectedYearValue = selectedYear ? selectedYear.value : null; 
  const currentYear = new Date().getFullYear() + 543; // ปีปัจจุบันในรูปแบบ พ.ศ.
  const yearToDisplay = selectedYearValue || currentYear;

  const monthYear = `${selectedMonthThai} / ${yearToDisplay}`;
  const branchToShow = selectedBranch.value?.trim() || "แสดงทุกสาขา";

  // วาดเดือนและปีในหน้าแรก
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

  // วนลูปเพื่อใส่ข้อมูล
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

    page.drawText(` ${name}`, {
      x: 80,
      y: startY,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    const weekXPosition = 350 + (weekNumber - 1) * 100;
    page.drawText(` ${resistanceLabel}`, {
      x: weekXPosition,
      y: startY,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    startY -= lineHeight;
    rowCount++;
  });

  ///ลายเซ็น
  const savedSignatureWristStrapData = JSON.parse(localStorage.getItem('savedSignatureWristStrap'));

  // วาดวันที่ในทุกหน้า
  if (savedSignatureWristStrapData) {
    const [day, month, year] = savedSignatureWristStrapData.date.split('/'); // แยก วัน/เดือน/ปี

     // สร้างอาร์เรย์ของเดือนภาษาไทย
const thaiMonths = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

// แปลงเดือนจากตัวเลขเป็นชื่อเดือนภาษาไทย
const thaiMonth = thaiMonths[parseInt(month) - 1];
    
     pdfDoc.getPages().forEach((p) => {
       // วันที่ชุดแรก
      p.drawText(`/ `, {
        x: 715,
        y: height - 415, // ตำแหน่งแนวตั้ง
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
    p.drawText(`${day}`, {
        x: 730,
        y: height - 415, // ตำแหน่งแนวตั้ง
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      p.drawText(`${thaiMonth}`, {
    x: 740,
    y: height - 415,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });
  p.drawText(`${year}`, {
    x: 780,
    y: height - 415,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  }); // วันที่ชุดที่สอง (สำเนา)
  p.drawText(`/ `, {
    x: 715,
    y: height - 448, // เปลี่ยนตำแหน่งให้ต่ำกว่าเดิม
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });
  p.drawText(`${day}`, {
    x: 730,
    y: height - 448, // เปลี่ยนตำแหน่งให้ต่ำกว่าเดิม
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });
  p.drawText(`${thaiMonth}`, {
    x: 740,
    y: height - 448, // เปลี่ยนตำแหน่งให้ต่ำกว่าเดิม
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });
  p.drawText(`${year}`, {
    x: 780,
    y: height - 448, // เปลี่ยนตำแหน่งให้ต่ำกว่าเดิม
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });
});
}

  // เพิ่มลายเซ็นใน PDF
  if (savedSignatureWristStrapData && savedSignatureWristStrapData.signature) {
    const signatureImage = await pdfDoc.embedPng(savedSignatureWristStrapData.signature);
    const signatureDims = signatureImage.scale(0.2);

    pdfDoc.getPages().forEach((p) => {
       // ลายเซ็นชุดแรก
      p.drawImage(signatureImage, {
        x: 640,
        y: 150,
        width: signatureDims.width,
        height: signatureDims.height,
      });
       // ลายเซ็นชุดที่สอง (สำเนา)
  p.drawImage(signatureImage, {
    x: 640,
    y: 120, // เปลี่ยนตำแหน่งให้ต่ำกว่าเดิม
    width: signatureDims.width,
    height: signatureDims.height,
  });
});
  }

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

    // วาดเดือนและปีในหน้าใหม่
    page.drawText(month, {
      x: 649,
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
  const selectedMonthThai = selectedMonth.value || "ทุกเดือน";

  // ตรวจสอบและดึงค่าปีที่เลือกจาก Dropdown
  const selectedYearValue = selectedYear ? selectedYear.value : null; 
  const currentYear = new Date().getFullYear() + 543; // ปีปัจจุบันในรูปแบบ พ.ศ.
  const yearToDisplay = selectedYearValue || currentYear;

  const month = `${selectedMonthThai}`;
  const year = `${yearToDisplay}`;

  
       // วาดเดือนและปีใน PDF
  page.drawText(month, {
    x: 649,
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

  // วนลูปเพื่อใส่ข้อมูล
  filteredData.value.forEach((item) => {
    const name = item.attributes.users_permissions_user.data.attributes.Name || 'No Name';
    const createdAt = item.attributes.createdAt;
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

    
    page.drawText(` ${resistanceLabel}`, {
      x: 670,
      y: startY,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    startY -= lineHeight; // ลดตำแหน่ง Y ลงในแต่ละแถว
    rowCount++;
  });

  const savedSignatureTableMatData = JSON.parse(localStorage.getItem('savedSignatureTableMat'));

  if (savedSignatureTableMatData) {
    const [day, month, year] = savedSignatureTableMatData.date.split('/'); // แยก วัน/เดือน/ปี

    // สร้างอาร์เรย์ของเดือนภาษาไทย
    const thaiMonths = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    // แปลงเดือนจากตัวเลขเป็นชื่อเดือนภาษาไทย
    const thaiMonth = thaiMonths[parseInt(month) - 1];
    // วันที่ชุดแรก
    pdfDoc.getPages().forEach((p) => {
      p.drawText(`${day}`, {
        x: 340,
        y: height - 345,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      p.drawText(`${thaiMonth}`, {
        x: 380,
        y: height - 345,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      p.drawText(`${year}`, {
        x: 450,
        y: height - 345,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
    // วันที่ชุดที่สอง (สำเนา)
  p.drawText(`${day}`, {
    x: 615,
    y: height - 345, // เปลี่ยนตำแหน่งให้ต่ำกว่าเดิม
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });

  p.drawText(`${thaiMonth}`, {
    x: 660,
    y: height - 345, // เปลี่ยนตำแหน่งให้ต่ำกว่าเดิม
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });

  p.drawText(`${year}`, {
    x: 740,
    y: height - 345, // เปลี่ยนตำแหน่งให้ต่ำกว่าเดิม
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });
});
}
  // เพิ่มลายเซ็นใน PDF
  if (savedSignatureTableMatData && savedSignatureTableMatData.signature) {
    const signatureImage = await pdfDoc.embedPng(savedSignatureTableMatData.signature);
    const signatureDims = signatureImage.scale(0.2);

    pdfDoc.getPages().forEach((p) => {
       // ลายเซ็นชุดแรก
      p.drawImage(signatureImage, {
        x: 350,
        y: 235,
        width: signatureDims.width,
        height: signatureDims.height,
      });
    // ลายเซ็นชุดที่สอง (สำเนา)
  p.drawImage(signatureImage, {
    x: 650,
    y: 235, // เปลี่ยนตำแหน่งให้ต่ำกว่าเดิม
    width: signatureDims.width,
    height: signatureDims.height,
  });
});
}

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
.example {
  border: 2px solid black;  /* เพิ่มกรอบสีดำ ขนาด 2px */
  border-radius: 5px;        /* ทำมุมโค้งเล็กน้อย */
  width: 300px;              /* กำหนดความกว้าง */
  height: 300px;             /* กำหนดความสูง */
  background: #fff;          /* พื้นหลังขาว */
  padding: 10px;             /* เพิ่มระยะห่างภายในกรอบ */
  position: relative;        /* เพิ่มตำแหน่งเพื่อจัดการ z-index */
  z-index: 10;               /* เพิ่มค่า z-index เพื่อให้ช่องเซ็นชื่ออยู่บนสุด */
}
</style>
