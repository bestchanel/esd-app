<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Email หรือ Username"
      type="text"
      placeholder="กรอก Email หรือ Username"
      name="email"
      v-model="email"
      :error="emailError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Password"
      type="password"
      placeholder="8+ characters, 1 capital letter"
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    />

    <div class="flex justify-between">
      <label class="cursor-pointer flex items-start">
        <input
          type="checkbox"
          class="hidden"
          @change="() => (checkbox = !checkbox)"
        />
        <span
          class="h-4 w-4 border rounded flex-none inline-flex mr-3 relative top-1 transition-all duration-150"
          :class="
            checkbox
              ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900 dark:bg-slate-900 ring-offset-2 bg-slate-900'
              : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600'
          "
        >
          <img
            src="@/assets/images/icon/ck-white.svg"
            alt=""
            class="h-[10px] w-[10px] block m-auto"
            v-if="checkbox"
          />
        </span>
        <span class="text-slate-500 dark:text-slate-400 text-sm leading-6"
          >จดจำการเข้าสู่ระบบ</span
        >
      </label>
      <router-link
        to="/forgot-password"
        class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >ลืมรหัสผ่าน?</router-link
      >
    </div>

    <button type="submit" class="btn btn-dark block w-full text-center">
      Sign in
    </button>
  </form>
</template>

<script>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  components: {
    Textinput,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  setup() {
    const schema = yup.object({
      email: yup.string().required("Email หรือ Username จำเป็น").email(),
      password: yup.string().required("Password จำเป็น").min(8),
    });

    const router = useRouter();

    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const payload = {
        identifier: email.value,
        password: password.value,
      };

      try {
        const response = await axios.post(
          "https://esd-app-strapi.up.railway.app/api/auth/local",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { jwt, user } = response.data;

        localStorage.setItem("token", jwt);
        localStorage.setItem("userid", user.id);
        localStorage.setItem("fullname", user.Name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("User_Type", user.User_Type);

        await Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          text: "ยินดีต้อนรับสู่ระบบ",
          showConfirmButton: false,
          timer: 1000,
        });

        router.push({ name: "dashboard" });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: "Email หรือ Username หรือ Password ไม่ถูกต้อง",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    };

    const { value: emailValue, errorMessage: emailError } = useField("email");
    const { value: passwordValue, errorMessage: passwordError } = useField(
      "password"
    );

    const onSubmit = handleSubmit;

    return {
      email,
      password,
      emailError,
      passwordError,
      onSubmit,
    };
  },
};
</script>
