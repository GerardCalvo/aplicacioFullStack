import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/useUser.js'

import LoginForm from '@/views/LoginForm.vue'
import RegisterForm from '@/views/RegisterForm.vue'
import Home from '@/views/Home.vue'
import Forbidden from '@/views/Forbidden.vue'
import Equips from '../views/Equips.vue'
import EquipDetall from '../views/EquipDetall.vue'
import CrearEquip from '../views/CrearEquip.vue'
import EditarEquip from '../views/EditarEquip.vue'

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: LoginForm },
  { path: "/register", name: "Register", component: RegisterForm },
  { path: "/equips", name: "Equips", component: Equips },
  { path: "/equips/:id", name: "EquipDetall", component: EquipDetall },
  {
    path: "/crearEquip",
    name: "CrearEquip",
    component: CrearEquip,
    meta: { requiresAuth: true }
  },
  {
    path: "/equips/editar/:id",
    name: "EditarEquip",
    component: EditarEquip,
    meta: { requiresAuth: true }
  },
  { path: "/forbidden", name: "Forbidden", component: Forbidden },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.loadUser()

  if (to.meta.requiresAuth && !userStore.user) {
    return next("/forbidden")
  }

  next()
})

export default router