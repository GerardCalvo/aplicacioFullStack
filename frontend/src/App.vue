<script setup>
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores/useUser.js";

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUser();
});

const logout = () => {
  userStore.logout();
};
</script>

<template>
  <nav class="navbar">
    <div class="nav-left">
      <RouterLink to="/" class="nav-link">🏠 Inici</RouterLink>
    </div>

    <div class="nav-center">
      <template v-if="!userStore.user">
        <RouterLink to="/login" class="nav-link">Iniciar sessió</RouterLink>
      </template>

      <template v-else>
        <RouterLink to="/equips" class="nav-link">Equips</RouterLink>
      </template>
    </div>

    <div class="nav-right" v-if="userStore.user">
      <span class="nav-user">Hola, {{ userStore.user.nombre }}</span>
      <button @click="logout" class="nav-link btn-logout">Logout</button>
    </div>
  </nav>

  <RouterView />
</template>

<style scoped>
/* Navbar general */
.navbar {
  display: flex;
  justify-content: center; 
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #1b1f23, #111416);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  flex-wrap: wrap;
  gap: 1rem;
  text-align: center;
}

/* Grupos de elementos */
.nav-left,
.nav-center,
.nav-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Links generales */
.nav-link {
  color: #e5e7eb;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s, transform 0.2s;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-link:hover {
  background-color: #2d333b;
  color: #ffffff;
  transform: translateY(-2px);
}

/* Usuario */
.nav-user {
  color: #22d37b;
  font-weight: 600;
  margin-right: 0.5rem;
}

/* Logout */
.btn-logout {
  background-color: #ef4444;
  color: white;
  transition: background-color 0.2s, transform 0.2s;
}

.btn-logout:hover {
  background-color: #b91c1c;
  transform: translateY(-2px);
}

/* Link activo */
.router-link-active {
  background-color: #229753; 
  color: white;
}
</style>
