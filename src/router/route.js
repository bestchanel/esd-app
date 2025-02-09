const routes = [
  {
    path: "/",
    name: "Layout",
    redirect: "/signin",
    component: () => import("@/Layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/index.vue"),
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard.vue"),
      },
      {
        path: "/insertvalueuser",
        name: "insertvalueuser",
        component: () => import("@/page/insertvalueuser.vue"),
      },
      {
        path: "/insertvalue",
        name: "insertvalue",
        component: () => import("@/page/insertvalue.vue"),
      },
      {
        path: "/manageuser",
        name: "manageuser",
        component: () => import("@/page/manageuser.vue"),
      },
    ],
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("@/page/signin/signin.vue"),
  },
];

export default routes;
