<template>
  <div class="loginwrapper">
    <div class="lg-inner-column">
      <div class="left-column relative z-[1]">
        <div class="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
          <router-link to="/">
            <img
              :src="logo"
              alt=""
              class="mb-10"
              v-if="!this.$store.themeSettingsStore.isDark"
            />
            <img
              :src="logoWhite"
              alt=""
              class="mb-10"
              v-else
            />
          </router-link>

   
        </div>
        <div
          class="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]"
        >
          <img
            :src="sideImg"
            alt=""
            class="h-full w-full object-contain"
          />
        </div>
      </div>
      <div class="right-column relative">
        <div
          class="inner-content h-full flex flex-col bg-white dark:bg-slate-800"
        >
          <div class="auth-box h-full flex flex-col justify-center">
            <div class="text-center 2xl:mb-10 mb-4">
              <h4 class="font-medium">เข้าสู่ระบบ</h4>
              <div class="text-slate-500 text-base">
                เข้าสู่ระบบเพื่อใช้งาน
              </div>
            </div>
            <Signin />
            <div
              class="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6"
            >
            </div>
          </div>
          <div class="auth-footer text-center">
            Copyright 2025, Acacia It Services
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Signin from "./common/Signin";
import Social from "./common/Social";
// Image Import
import logoWhite from "@/assets/images/logo/logo-white.svg"
import logo from "@/assets/images/auth/Acacia3.png"
import sideImg from "@/assets/images/auth/ilst2.png"

export default {
  data () {
    return {
      logoWhite,logo,sideImg
    }
  },
  components: {
    Social,
    Signin,
  },
};
</script>
<style lang="scss"></style>
