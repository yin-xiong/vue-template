import Vue from "vue";
import VueRouter from "vue-router";

// cookie
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

import Home from "../pages/home/index.vue"; // 登录页面

Vue.use(VueRouter);

const routes = [
    { path: "/", name: "Home", component: Home },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

// 路由守卫
// router.beforeEach((to, from, next) => {
//     // 判断该路由是否需要登录权限
//     if (to.matched.some(record => record.meta.requireAuth)) {
//         // 判断缓存里面是否有 token  //在登录的时候设置它的值
//         if (VueCookies.isKey("token")) {
//             next();
//         } else {
//             next({
//                 path: '/login',
//                 // query: {redirect: to.fullPath}
//             });
//         }
//
//         // /* 路由发生变化修改页面title */
//         if (to.meta.title) {
//             document.title = to.meta.title;
//         }
//
//     } else {
//         next();
//     }
// })

export default router;
