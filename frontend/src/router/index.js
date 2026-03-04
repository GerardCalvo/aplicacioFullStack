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
  {
    path: "/equips", name: "Equips", component: Equips
  },
  {
    path: "/equips/:id", name: "EquipDetall", component: EquipDetall
  },
  {
    path: "/crearEquip", name: "CrearEquip", component: CrearEquip,
    meta: { requiresAuth: true }
  },
  {
    path: "/equips/editar/:id", name: "EditarEquip", component: EditarEquip,
    meta: { requiresAuth: true }
  },
  // Página para accesos prohibidos
  { path: "/forbidden", name: "Forbidden", component: Forbidden },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guardia global
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.loadUser() // cargar user desde localStorage si existe

  // Ruta requiere login
  if (to.meta.requiresAuth) {
    if (!userStore.user) {
      return next("/forbidden") // no logueado
    }

    // Si hay meta.role, verificar rol
    if (to.meta.role && userStore.user.rol !== to.meta.role) {
      return next("/forbidden") // rol no permitido
    }
  }

  next()
})

export default router