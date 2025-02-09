import { createRouter, createWebHistory } from "vue-router";

import routes from "./route";

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  base: import.meta.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach((to, from, next) => {
  const User_Type = localStorage.getItem("User_Type") || "Token not found";

  // ตรวจสอบสิทธิ์ของผู้ใช้
  const restrictedRoutes = {
    Employee: ["insertvalue", "manageuser"], // หน้าไม่อนุญาต
  };

  if (
    restrictedRoutes[User_Type] &&
    restrictedRoutes[User_Type].includes(to.name)
  ) {
    return next({ name: "dashboard" }); // ถ้าผู้ใช้ไม่มีสิทธิ์ ไปที่หน้า dashboard
  }

  // อัปเดต title
  const titleText = to.name;
  const words = titleText.split(" ");
  const wordslength = words.length;
  for (let i = 0; i < wordslength; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  document.title = "ESD  - " + words;

  next();
});


router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
