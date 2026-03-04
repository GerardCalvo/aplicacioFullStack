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
    <RouterLink to="/" class="logo">⚽ Football Clubs</RouterLink>

    <div class="nav-links">
      <RouterLink to="/equips">Clubs</RouterLink>

      <template v-if="!userStore.user">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Registre</RouterLink>
      </template>

      <template v-else>
        <span class="user">Hola, {{ userStore.user.nombre }}</span>
        <button @click="logout" class="logout">Logout</button>
      </template>
    </div>
  </nav>

  <RouterView />
</template>

<style scoped>
.navbar {
  background: linear-gradient(90deg, #0f2027, #14532d);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.logo {
  font-weight: bold;
  text-decoration: none;
  color: white;
  font-size: 1.3rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

a:hover {
  color: #22c55e;
}

.logout {
  background: #ef4444;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.user {
  color: #22c55e;
  font-weight: bold;
}
</style>