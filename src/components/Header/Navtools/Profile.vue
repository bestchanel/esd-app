<template>
  <Dropdown classMenuItems="w-[180px] top-[58px]">
    <div class="flex items-center">
      <div class="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div class="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img
            :src="profileImg"
            alt="User"
            class="block w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div class="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span class="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block">
          {{ fullname }}
        </span>
        <span class="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
          <Icon icon="heroicons-outline:chevron-down"></Icon>
        </span>
      </div>
    </div>

    <!-- Dropdown Menu -->
    <template #menus>
      <MenuItem v-slot="{ active }" v-for="(item, i) in ProfileMenu" :key="i">
        <div
          type="button"
          :class="[
            active ? 'bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-900 dark:text-slate-300' : 'text-slate-600 dark:text-slate-300'
          ]"
          class="inline-flex items-center space-x-2 rtl:space-x-reverse w-full px-4 py-2 first:rounded-t last:rounded-b font-normal cursor-pointer"
          @click="item.link()"
        >
          <div class="flex-none text-lg">
            <Icon :icon="item.icon" />
          </div>
          <div class="flex-1 text-sm">
            {{ item.label }}
          </div>
        </div>
      </MenuItem>
    </template>
  </Dropdown>

  <!-- Modal -->
  <ProfileModal v-if="isModalOpen" @close="isModalOpen = false" />
</template>

<script>
import { ref, watchEffect } from "vue";
import { nextTick } from 'vue'
import { useRouter } from "vue-router";
import { MenuItem } from "@headlessui/vue";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import ProfileModal from "@/components/Header/Navtools/ProfileModal";
import profileImg from "@/assets/images/all-img/user.png";

export default {
  components: {
    Icon,
    Dropdown,
    MenuItem,
    ProfileModal,
  },
  setup() {
    const router = useRouter();
    const isModalOpen = ref(false);
    const fullname = ref("Unknown User");

    // โหลดข้อมูลจาก localStorage แบบปลอดภัย
    const loadProfile = () => {
      fullname.value = localStorage.getItem("fullname") || "Unknown User";
    };

    // เรียกใช้ loadProfile ตอนโหลด Component
    loadProfile();

    const ProfileMenu = [
      {
        label: "Profile",
        icon: "heroicons-outline:user",
        link: () => {
          isModalOpen.value = true;
        },
      },
      // {
      //   label: "Settings",
      //   icon: "heroicons-outline:cog",
      //   link: () => router.push("/settings"),
      // },
      // {
      //   label: "Faq",
      //   icon: "heroicons-outline:information-circle",
      //   link: () => router.push("/faq"),
      // },
      {
  label: "Logout",
  icon: "heroicons-outline:login",
  link: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('Name');
    localStorage.removeItem('email');
    localStorage.removeItem('User_Type');
    localStorage.clear();
    router.push("/").then(() => {
      nextTick(() => {
        location.reload(); // รีเฟรชหน้าเพื่อให้เมนูอัปเดต
      });
    });
  },
}
    ];

    return {
      fullname,
      profileImg,
      ProfileMenu,
      isModalOpen,
    };
  },
};
</script>

<style scoped></style>
