<template>
  <div>
    <!-- <Breadcrumb /> -->
    <div class="grid grid-cols-12 gap-5 mb-5">
  <!-- First Section -->
  <div class="2xl:col-span-3 lg:col-span-4 col-span-12 flex flex-col h-full">
    <div
      class="bg-no-repeat bg-cover bg-center p-5 rounded-lg relative shadow-xl flex flex-col justify-between h-full"
      :style="{
        backgroundImage:
          'url(' + widgetbg2 + ')',
      }"
    >
      <div>
        <h4 class="text-base font-medium text-white mb-2">
          <span class="block font-normal">สวัสดีครับคุณ</span>
        </h4>
        <h4 class="text-xl font-medium text-white mb-2">
          <span class="block">{{ fullname }}</span>
        </h4>
        <p class="text-xs text-white font-normal">ยินดีต้อนรับสู่ ESD APP</p>
      </div>
    </div>
  </div>

  <!-- Second Section with equal height -->
  <div class="2xl:col-span-9 lg:col-span-8 col-span-12 flex flex-col space-y-4 min-h-[calc(10vh-200px)]">
    <div class="grid md:grid-cols-3 grid-cols-1 gap-4 h-full">
      <div v-for="(item, i) in statistics" :key="i" class="flex flex-col h-full">
        <Card bodyClass="pt-4 pb-3 px-4 h-full flex flex-col justify-between rounded-lg shadow-xl">
          <div class="flex space-x-3 rtl:space-x-reverse">
            <div class="flex-none">
              <div
                class="h-16 w-16 rounded-full flex items-center justify-center text-2xl"
                :class="`${item.bg} ${item.text}`"
              >
                <Icon :icon="item.icon" />
              </div>
            </div>
            <div class="flex-1">
              <div class="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
                {{ item.title }}
              </div>
              <div class="text-slate-900 dark:text-white text-xl font-semibold">
                {{ item.count }}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>

    <div class="grid grid-cols-12 gap-5">
      <div class="2xl:col-span-8 lg:col-span-7 col-span-12">
  <Card>
    <div class="legend-ring">
      <apexchart
        type="bar"
        height="650"
        :options="columnCharthomeComputed.chartOptions"
        :series="columnCharthomeComputed.series"
      />
    </div>
  </Card>
</div>

      <div class="2xl:col-span-4 lg:col-span-5 col-span-12">
        <Card title="Statistic Wrist Strap">
          <div class="grid md:grid-cols-2 grid-cols-1 gap-5">
<!-- อัตราการบันทึกสัปดาห์ก่อนหน้า -->
<div class="bg-slate-50 dark:bg-slate-900 rounded pt-3 px-4">
  <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">
    อัตราการบันทึกสัปดาห์ก่อนหน้า
  </div>
  <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">
    
  </div>
  <div class="font-normal text-xs text-slate-600 dark:text-slate-300">
    อัตราการบันทึก: {{ previousWeekRecordedPercentage }}%
  </div>
  <div class="mt-4">
    <apexchart
      type="line"
      :options="weekComparisonChartOptions"
      :series="weekComparisonSeries"
      height="250"
    />
  </div>
</div>

<!-- อัตราการบันทึกเดือนก่อนหน้า -->
<div class="bg-slate-50 dark:bg-slate-900 rounded pt-3 px-4">
  <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">
    อัตราการบันทึกตลอดทั้งเดือน
  </div>
  <div class="font-normal text-xs text-slate-600 dark:text-slate-300">
    อัตราการบันทึก: {{ previousMonthRecordedPercentage }}%
  </div>
  <div class="mt-4">
    <apexchart
      type="bar"
      :options="monthComparisonChartOptions"
      :series="monthComparisonSeries"
      height="300"
    />
  </div>
</div>

      <div class="md:col-span-2 bg-slate-50 dark:bg-slate-900 rounded py-3 px-4">
  <div class="flex items-center">
    <div class="flex-none">
      <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">
        สถานะการบันทึกข้อมูล
      </div>
      <div class="text-base text-slate-900 dark:text-white font-medium mb-[6px]">บันทึกแล้ว
        {{ recordedUsersCount }} คน / ยังไม่บันทึก {{ notRecordedUsersCount }} คน
      </div>
      <div class="font-normal text-xs text-slate-600 dark:text-slate-300">
        <span class="text-primary-500"></span>
        สัปดาห์ปัจจุบัน: {{ currentWeek }}
      </div>
    </div>
    <div class="flex-1">
      <div class="legend-ring2">
        <apexchart
          type="donut"
          height="200"
          :options="donutChartDarkComputed.chartOptions"
          :series="donutChartDarkComputed.series"
        />
      </div>
    </div>
  </div>
</div>
          </div>
        </Card>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-5">
      <div class="2xl:col-span-8 lg:col-span-7 col-span-12">
  <Card>
    <div class="legend-ring">
      <apexchart
        type="bar"
        height="650"
        :options="columnCharthomeComputed2.chartOptions"
        :series="columnCharthomeComputed2.series"
      />
    </div>
  </Card>
</div>

    <div class="2xl:col-span-4 lg:col-span-5 col-span-12">
        <Card title="Statistic Table Mat">
          <div class="grid md:grid-cols-2 grid-cols-1 gap-5">
<!-- อัตราการบันทึกตลอดทั้งปี -->
<div class="bg-slate-50 dark:bg-slate-900 rounded pt-3 px-4">
  <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">
    อัตราการบันทึกตลอดทั้งปี
  </div>
  <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">
    
  </div>
  <div class="font-normal text-xs text-slate-600 dark:text-slate-300">
    อัตราการบันทึก: {{ previousWeekRecordedPercentage }}%
  </div>
  <div class="mt-4">
    <apexchart
      type="line"
      :options="allmonthComparisonChartOptions"
      :series="allmonthComparisonSeries"
      height="250"
    />
  </div>
</div>

<!-- อัตราการบันทึกเดือนก่อนหน้า -->
<div class="bg-slate-50 dark:bg-slate-900 rounded pt-3 px-4">
  <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">
    อัตราการบันทึกตลอดทั้งเดือน
  </div>
  <div class="font-normal text-xs text-slate-600 dark:text-slate-300">
    อัตราการบันทึก: {{ previousMonthRecordedPercentage }}%
  </div>
  <div class="mt-4">
    <apexchart
      type="bar"
      :options="monthComparisonChartOptions"
      :series="monthComparisonSeries"
      height="300"
    />
  </div>
</div>

      <div class="md:col-span-2 bg-slate-50 dark:bg-slate-900 rounded py-3 px-4">
  <div class="flex items-center">
    <div class="flex-none">
      <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">
        สถานะการบันทึกข้อมูล
      </div>
      <div class="text-base text-slate-900 dark:text-white font-medium mb-[6px]">บันทึกแล้ว
        {{ recordedUsersCount }} คน / ยังไม่บันทึก {{ notRecordedUsersCount }} คน
      </div>
      <div class="font-normal text-xs text-slate-600 dark:text-slate-300">
        <span class="text-primary-500"></span>
        เดือนปัจจุบัน: {{ currentWeek }}
      </div>
    </div>
    <div class="flex-1">
      <div class="legend-ring2">
        <apexchart
          type="donut"
          height="200"
          :options="donutChartDarkComputed.chartOptions"
          :series="donutChartDarkComputed.series"
        />
      </div>
    </div>
  </div>
</div>
          </div>
        </Card>
      </div>

</div>

  </div>
</template>
<script>
import Card from "@/components/Card/index.vue";
import Icon from "@/components/Icon";
import Customer from "./home/Analytics-Component/Customer.vue";
import {
  areaLine,
  areaLineDark,
  basicArea,
  basicAreaDark,
  columnCharthomeDark,
  donutChart,
  donutChartDark,
  radarChart,
  radarChartDark,
  mostSales2,
} from "./home/Analytics-Component/data.js";
import DropEvent from "./home/Analytics-Component/DropEvent.vue";
import Etable from "./home/Analytics-Component/Etable.vue";
import Map from "./home/Analytics-Component/Map2.vue";
import Products from "./home/Analytics-Component/Products.vue";
import SelectMonth from "./home/Analytics-Component/SelectMonth.vue";
import Breadcrumb from "./home/Analytics-Component/Breadcrumbs.vue";
import widgetbg2 from "@/assets/images/all-img/widget-bg-2.png"
import axios from "axios";
export default {
components: {
  Card,
  Etable,
  Map,
  Customer,
  Products,
  Icon,
  DropEvent,
  SelectMonth,
  Breadcrumb,
},
data() {
  return {
    fullname: "",
    mostSales2,
    columnCharthomeDark,
    fillterMap: "usa",
    areaLine,
    areaLineDark,
    basicArea,
    basicAreaDark,
    donutChart,
    donutChartDark,
    radarChart,
    radarChartDark,
    widgetbg2,
    resistanceData: [],
    tableMatData: [],
    recordedUsersCount: 0, // New data property for recorded users count
    notRecordedUsersCount: 0, // New data property for not recorded users count
    recordedUsersCountPerWeek: [30, 25, 35, 40, 50], // จำนวนผู้ที่บันทึกแล้วในแต่ละสัปดาห์
    notRecordedUsersCountPerWeek: [20, 15, 10, 5, 0], // จำนวนผู้ที่ยังไม่บันทึกในแต่ละสัปดาห์
    currentWeek: "",
    weekComparisonSeries: [
  {
    name: "บันทึกแล้ว",
    data: this.recordedUsersCountPerWeek, // อัปเดตข้อมูลจำนวนผู้ที่บันทึกแล้วในแต่ละสัปดาห์
  },
  {
    name: "ยังไม่บันทึก",
    data: this.notRecordedUsersCountPerWeek, // อัปเดตข้อมูลจำนวนผู้ที่ยังไม่บันทึกในแต่ละสัปดาห์
  },
],

weekComparisonChartOptions: {
  chart: {
    toolbar: { show: false },
  },
  xaxis: {
    categories: ["สัปดาห์ที่ 1", "สัปดาห์ที่ 2", "สัปดาห์ที่ 3", "สัปดาห์ที่ 4", "สัปดาห์ที่ 5"], // แสดงช่วงสัปดาห์
  },
  colors: ["#4669FA", "#FA916B"], // สีที่ใช้ในกราฟ
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " คน"; // แสดงจำนวนผู้ใช้ในรูปแบบ "คน"
      },
    },
  },
},

allmonthComparisonSeries: [
  {
    name: "บันทึกแล้ว",
    data: this.recordedUsersCountPerWeek, // อัปเดตข้อมูลจำนวนผู้ที่บันทึกแล้วในแต่ละสัปดาห์
  },
  {
    name: "ยังไม่บันทึก",
    data: this.notRecordedUsersCountPerWeek, // อัปเดตข้อมูลจำนวนผู้ที่ยังไม่บันทึกในแต่ละสัปดาห์
  },
],

allmonthComparisonChartOptions: {
  chart: {
    toolbar: { show: false },
  },
  xaxis: {
    categories: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"], // แสดงช่วงสัปดาห์
  },
  colors: ["#4669FA", "#FA916B"], // สีที่ใช้ในกราฟ
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " คน"; // แสดงจำนวนผู้ใช้ในรูปแบบ "คน"
      },
    },
  },
},


monthComparisonSeries: [
  {
    name: "บันทึกแล้ว",
    data: [0],
  },
  {
    name: "ยังไม่บันทึก",
    data: [0],
  },
],
monthComparisonChartOptions: {
  chart: {
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      endingShape: "rounded",
      columnWidth: "45%",
    },
  },
  xaxis: {
  categories: ["บันทึกแล้ว", "ยังไม่บันทึก"],
  labels: {
    show: false,  // ไม่ให้แสดง label ของ x-axis
  },
},
  colors: ["#4669FA", "#FA916B"],
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " คน";
      },
    },
  },
},

    // เปอร์เซ็นต์การบันทึก
    previousWeekRecordedPercentage: "0",
    previousMonthRecordedPercentage: "0",

    statistics: [
  { 
    name: "shapeLine1", 
    title: "จำนวนผู้ใช้งานทั้งหมด", 
    count: "0", 
    bg: "bg-[#E5F9FF] dark:bg-slate-900", 
    text: "text-info-500", 
    icon: "heroicons:users" 
  },
  { 
    name: "shapeLine2", 
    title: "จำนวนสาขาทั้งหมด", 
    count: "0", 
    bg: "bg-[#FFEDE6] dark:bg-slate-900", 
    text: "text-warning-500", 
    icon: "heroicons:building-office-2" 
  },
  { 
    name: "shapeLine3", 
    title: "จำนวนการเข้าใช้งานวันนี้", 
    count: "0", 
    bg: "bg-[#EAE6FF] dark:bg-slate-900", 
    text: "text-[#5743BE]", 
    icon: "heroicons:user-group" 
  }
],
      };
    },
created() {
      this.fetchResistanceData();
    },
    methods: {
      async fetchResistanceData() {
  try {
    // ดึงข้อมูลจาก API
    const response = await axios.get("http://localhost:1337/api/wrist-straps?populate=users_permissions_user");
    this.resistanceData = response.data.data;

    const tableMatResponse = await axios.get("http://localhost:1337/api/table-mats?populate[users_permissions_user][populate]=branches");
    this.tableMatData = tableMatResponse.data.data;


    const usersResponse = await axios.get("http://localhost:1337/api/users");
    const branchesResponse = await axios.get("http://localhost:1337/api/branches");

    this.statistics[0].count = usersResponse.data.length.toString();
    this.statistics[1].count = branchesResponse.data.data.length.toString();

    // คำนวณวันที่ต่างๆ
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // วันที่แรกของเดือนนี้
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // วันที่สุดท้ายของเดือนนี้
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // ตั้งเวลาเป็น 00:00:00 ของวันนี้
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // ตั้งเวลาเป็น 23:59:59 ของวันนี้

        // นับจำนวนข้อมูลที่มี createdAt ในวันนี้
        const currentUsers = this.resistanceData.filter((item) => {
      const createdAt = new Date(item.attributes.createdAt);
      return createdAt >= startOfDay && createdAt <= endOfDay; // ตรวจสอบว่าอยู่ในช่วงวันนี้หรือไม่
    });

    this.statistics[2].count = currentUsers.length.toString();

    const currentWeekIndex = Math.floor((today.getDate() - 1) / 7 + 1); // หาสัปดาห์ปัจจุบัน
    let usersWithWeekData = [
      { recorded: new Set(), notRecorded: new Set() }, // สัปดาห์ที่ 1
      { recorded: new Set(), notRecorded: new Set() }, // สัปดาห์ที่ 2
      { recorded: new Set(), notRecorded: new Set() }, // สัปดาห์ที่ 3
      { recorded: new Set(), notRecorded: new Set() }, // สัปดาห์ที่ 4
      { recorded: new Set(), notRecorded: new Set() }  // สัปดาห์ที่ 5
    ];

    let usersWithMonthData = new Set(); // สำหรับผู้ที่บันทึกข้อมูลในเดือนนี้
    let usersWithoutMonthData = new Set(); // สำหรับผู้ที่ยังไม่บันทึกข้อมูลในเดือนนี้

    // ตรวจสอบข้อมูลของแต่ละช่วงเวลา
    this.resistanceData.forEach((item) => {
      const createdAt = new Date(item.attributes.createdAt);
      const userId = item.attributes.users_permissions_user?.data?.id;

      if (userId) {
        // คำนวณว่าแต่ละวันตกอยู่ในสัปดาห์ไหน
        if (createdAt >= startOfMonth && createdAt <= endOfMonth) {
          const weekIndex = Math.floor((createdAt.getDate() - 1) / 7 + 1); // หาว่าสัปดาห์ที่ 1-5 (ปรับตัวหารเป็น 7)
          usersWithMonthData.add(userId); // ผู้ที่บันทึกข้อมูลในเดือนนี้
          usersWithWeekData[weekIndex].recorded.add(userId); // เพิ่มข้อมูลในสัปดาห์ที่คำนวณได้
        }
      }
    });

    // คำนวณจำนวนผู้ใช้ที่ยังไม่บันทึก
    usersResponse.data.forEach((user) => {
      if (!usersWithMonthData.has(user.id)) {
        usersWithoutMonthData.add(user.id); // ผู้ที่ยังไม่บันทึก
      }
    });

    // สำหรับผู้ที่ยังไม่บันทึกในแต่ละสัปดาห์
    usersWithWeekData.forEach((week) => {
      // คำนวณจำนวนผู้ที่ยังไม่บันทึกในแต่ละสัปดาห์
      week.notRecorded = usersResponse.data.length - week.recorded.size; // นับแค่ผู้ใช้ที่บันทึกแล้วในแต่ละสัปดาห์
    });

    // อัพเดตข้อมูลใน weekComparisonSeries
    this.weekComparisonSeries[0].data = usersWithWeekData.map(week => week.recorded.size); // จำนวนผู้ที่บันทึกในแต่ละสัปดาห์ (ไม่ซ้ำกัน)
    this.weekComparisonSeries[1].data = usersWithWeekData.map(week => week.notRecorded); // จำนวนผู้ที่ยังไม่บันทึกในแต่ละสัปดาห์

    // อัพเดตข้อมูลใน monthComparisonSeries
    this.monthComparisonSeries[0].data = [usersWithMonthData.size]; // จำนวนผู้ที่บันทึกข้อมูลในเดือนนี้
    this.monthComparisonSeries[1].data = [usersResponse.data.length - usersWithMonthData.size]; // จำนวนผู้ที่ยังไม่บันทึกในเดือนนี้

    this.recordedUsersCount = usersWithMonthData.size;
    this.notRecordedUsersCount = usersWithoutMonthData.size;

    // คำนวณเปอร์เซ็นต์การบันทึก
    const recordedUsersLastWeek = usersWithWeekData[currentWeekIndex]?.recorded.size || 0; // ผู้ใช้ที่บันทึกในสัปดาห์ที่แล้ว
    const totalUsersLastWeek = usersResponse.data.length; // จำนวนผู้ใช้ทั้งหมดที่ควรบันทึก
    const previousWeekRecordedPercentage = totalUsersLastWeek > 0 ? ((recordedUsersLastWeek / totalUsersLastWeek) * 100).toFixed(2) : "0";
    const monthPercentage = usersResponse.data.length > 0 ? ((usersWithMonthData.size / usersResponse.data.length) * 100).toFixed(2) : "0";

    this.previousWeekRecordedPercentage = previousWeekRecordedPercentage; // เปอร์เซ็นต์การบันทึกสัปดาห์ที่แล้ว
    this.previousMonthRecordedPercentage = monthPercentage; // เปอร์เซ็นต์การบันทึกเดือนนี้

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
    },
    mounted() {
    // ดึงข้อมูลจาก localStorage และตั้งค่า fullname
    this.fullname = localStorage.getItem("fullname") || "ผู้ใช้";
  },
computed: {
  columnCharthomeComputed() {
  // ดึงวันที่ปัจจุบัน และหาวันแรกของสัปดาห์ (เริ่มที่วันจันทร์)
  const today = new Date();
  const firstDayOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  firstDayOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // ถ้าวันอาทิตย์ให้เลื่อนไปวันจันทร์ก่อนหน้า

  // ฟังก์ชันคำนวณหมายเลขสัปดาห์ในปี
  const getWeekNumber = (date) => {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000)); // จำนวนวันตั้งแต่ 1 มกราคม
    return Math.ceil((days + 1) / 7 - 4); // คำนวณหมายเลขสัปดาห์
  };

  // คำนวณหมายเลขสัปดาห์ในปี
  const currentWeek = getWeekNumber(today);

  // ใช้ Set() เพื่อเก็บ userId ที่ถูกนับแล้ว
  const countedUsers = new Set();
  const usersWithWeekData = {
    low: new Set(),
    good: new Set(),
    high: new Set(),
  };

  // ฟิลเตอร์เฉพาะข้อมูลของสัปดาห์ปัจจุบัน
  this.resistanceData.forEach((item) => {
    const createdAt = new Date(item.attributes.createdAt);
    const userId = item.attributes.users_permissions_user?.data?.id;
    const resistance = item.attributes.Resistance;

    // ตรวจสอบว่าข้อมูลอยู่ในสัปดาห์ปัจจุบัน และ userId ยังไม่ถูกนับมาก่อน
    if (createdAt >= firstDayOfWeek && createdAt <= today && userId && !countedUsers.has(userId)) {
      countedUsers.add(userId); // บันทึก userId ว่าเคยถูกนับแล้ว
      if (resistance < 800) {
        usersWithWeekData.low.add(userId);
      } else if (resistance >= 800 && resistance <= 9000) {
        usersWithWeekData.good.add(userId);
      } else {
        usersWithWeekData.high.add(userId);
      }
    }
  });

  // สร้างข้อมูล series สำหรับกราฟ
  const seriesData = [
    { name: "LOW", data: [usersWithWeekData.low.size] },
    { name: "GOOD", data: [usersWithWeekData.good.size] },
    { name: "HIGH", data: [usersWithWeekData.high.size] },
  ];

  // ตั้งค่ากราฟ
  return {
    series: seriesData,
    chartOptions: {
      chart: {
        toolbar: { show: true },
        background: "#f5f5f5",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: "rounded",
          columnWidth: "80%",
          barGap: "15%",
        },
      },
      colors: ["#FF7F7F", "#7FFF7F", "#FFF27F"],
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
        fontSize: "12px",
        fontFamily: "Inter",
        offsetY: -30,
        markers: {
          width: 8,
          height: 8,
          offsetY: -1,
          offsetX: -5,
          radius: 12,
        },
        labels: {
          colors: this.$store.themeSettingsStore.isDark ? "#CBD5E1" : "#475569",
        },
        itemMargin: {
          horizontal: 18,
          vertical: 0,
        },
      },
      title: {
        text: `Resistance Wrist Strap Chart (สัปดาห์ที่ ${currentWeek})`,
        align: "left",
        offsetX: this.$store.themeSettingsStore.direction ? "0%" : 0,
        offsetY: 13,
        style: {
          fontSize: "20px",
          fontWeight: "500",
          fontFamily: "Inter",
          color: this.$store.themeSettingsStore.isDark ? "#fff" : "#0f172a",
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      yaxis: {
        opposite: this.$store.themeSettingsStore.direction ? true : false,
        labels: {
          style: {
            colors: this.$store.themeSettingsStore.isDark ? "#CBD5E1" : "#475569",
            fontFamily: "Inter",
          },
        },
      },
      xaxis: {
        categories: ["จำนวนผู้ใช้ (สัปดาห์นี้)"],
        labels: {
          style: {
            colors: this.$store.themeSettingsStore.isDark ? "#CBD5E1" : "#475569",
            fontFamily: "Inter",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val} คน`;
          },
        },
      },
      grid: {
        show: true,
        borderColor: this.$store.themeSettingsStore.isDark ? "#334155" : "#E2E8F0",
        strokeDashArray: 10,
        position: "back",
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            legend: {
              position: "bottom",
              offsetY: 8,
              horizontalAlign: "center",
            },
            plotOptions: {
              bar: { columnWidth: "80%" },
            },
          },
        },
      ],
    },
  };
},


columnCharthomeComputed2() {
  // วันที่ปัจจุบัน และหาค่าเดือนและปีปัจจุบัน
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // ใช้ Set() เพื่อเก็บ userId ที่ถูกนับแล้วในเดือนนี้
  const countedUsers = new Set();
  const usersWithMonthData = {
    green: new Set(),
    yellow: new Set(),
    orange: new Set(),
    red: new Set(),
  };

  // ฟิลเตอร์เฉพาะข้อมูลของเดือนปัจจุบัน และป้องกันการนับซ้ำ
  this.tableMatData.forEach((item) => {
    const createdAt = new Date(item.attributes.createdAt);
    const userId = item.attributes.users_permissions_user?.data?.id;
    const resistance = item.attributes.ResistanceTableMat;

    // ตรวจสอบว่าอยู่ในเดือนปัจจุบัน และ userId ยังไม่ถูกนับมาก่อน
    if (
      createdAt.getMonth() === currentMonth &&
      createdAt.getFullYear() === currentYear &&
      userId &&
      !countedUsers.has(userId)
    ) {
      countedUsers.add(userId); // บันทึก userId ว่าเคยถูกนับแล้ว

      if (resistance >= 1 && resistance <= 100) {
        usersWithMonthData.green.add(userId);
      } else if (resistance >= 300 && resistance <= 1000) {
        usersWithMonthData.yellow.add(userId);
      } else if (resistance >= 3000 && resistance <= 10000) {
        usersWithMonthData.orange.add(userId);
      } else if (resistance >= 100000 && resistance <= 1000000) {
        usersWithMonthData.red.add(userId);
      }
    }
  });

  // คืนค่าข้อมูลสำหรับกราฟ
  return {
    series: [
      { name: "Green", data: [usersWithMonthData.green.size] },
      { name: "Yellow", data: [usersWithMonthData.yellow.size] },
      { name: "Orange", data: [usersWithMonthData.orange.size] },
      { name: "Red", data: [usersWithMonthData.red.size] },
    ],
    chartOptions: {
      chart: {
        toolbar: { show: true },
        background: "#f5f5f5",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: "rounded",
          columnWidth: "80%",
          barGap: "15%",
        },
      },
      colors: ["#7FFF7F", "#FFF27F", "#FFB84D", "#FF7F7F"],
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
        fontSize: "12px",
        fontFamily: "Inter",
        offsetY: -30,
        markers: {
          width: 8,
          height: 8,
          offsetY: -1,
          offsetX: -5,
          radius: 12,
        },
        labels: {
          colors: this.$store.themeSettingsStore.isDark ? "#CBD5E1" : "#475569",
        },
        itemMargin: {
          horizontal: 18,
          vertical: 0,
        },
      },
      title: {
        text: `Resistance Table Mat Chart (เดือน ${today.toLocaleString("th-TH", { month: "long" })})`,
        align: "left",
        offsetX: this.$store.themeSettingsStore.direction ? "0%" : 0,
        offsetY: 13,
        style: {
          fontSize: "20px",
          fontWeight: "500",
          fontFamily: "Inter",
          color: this.$store.themeSettingsStore.isDark ? "#fff" : "#0f172a",
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      yaxis: {
        opposite: this.$store.themeSettingsStore.direction ? true : false,
        labels: {
          style: {
            colors: this.$store.themeSettingsStore.isDark ? "#CBD5E1" : "#475569",
            fontFamily: "Inter",
          },
        },
      },
      xaxis: {
        categories: ["จำนวนผู้ใช้ (เดือนนี้)"],
        labels: {
          style: {
            colors: this.$store.themeSettingsStore.isDark ? "#CBD5E1" : "#475569",
            fontFamily: "Inter",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val} คน`;
          },
        },
      },
      grid: {
        show: true,
        borderColor: this.$store.themeSettingsStore.isDark ? "#334155" : "#E2E8F0",
        strokeDashArray: 10,
        position: "back",
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            legend: {
              position: "bottom",
              offsetY: 8,
              horizontalAlign: "center",
            },
            plotOptions: {
              bar: { columnWidth: "80%" },
            },
          },
        },
      ],
    },
  };
},


donutChartDarkComputed() {
  return {
    series: [this.recordedUsersCount, this.notRecordedUsersCount],
    chartOptions: {
      labels: ["บันทึกแล้ว", "ยังไม่บันทึก"],
      dataLabels: { enabled: false },
      colors: ["#0CE7FA", "#FA916B"],
      legend: {
        position: "bottom",
        fontSize: "14px",
        fontFamily: "Inter",
        fontWeight: 400,
        markers: {
          width: 8,
          height: 8,
          offsetY: 0,
          offsetX: -5,
          radius: 12,
        },
        itemMargin: {
          horizontal: 18,
          vertical: 0,
        },
        labels: {
          colors: this.$store.themeSettingsStore.isDark ? "#CBD5E1" : "#475569",
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
},

},
};
</script>
<style></style>