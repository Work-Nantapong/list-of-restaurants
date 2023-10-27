import { createRouter, createWebHistory } from 'vue-router'
import { VueCookieNext } from 'vue-cookie-next'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/SignInView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'restaurants',
      component: () => import('../views/RestaurantListView.vue'),
      meta: {
        requiresAuth: true
      }
    },
  ]
})

const isLoggedIn = VueCookieNext.isCookieAvailable("token")


// router.beforeEach((to, from, next) => {
//   console.log(isLoggedIn)
//   console.log(VueCookieNext.isCookieAvailable("token"))
//   console.log(VueCookieNext.getCookie("token"))
//   if(!isLoggedIn){
//     next({
//       name: 'login'
//     })
//   } else {
//     next();
//   }
// })

router.beforeEach((to, from, next) => {
  const isAuthenticated = VueCookieNext.isCookieAvailable("token");

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login'); // ถ้ายังไม่ได้เข้าสู่ระบบ ให้เปลี่ยนไปหน้า login
  } else {
    next();
  }

});

export default router
