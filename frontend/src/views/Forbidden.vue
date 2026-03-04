<template>
  <div class="forbidden">
    <h2>Acceso denegado</h2>
    <p>No tienes permisos para acceder a esta página. Por favor, inicia sesión.</p>
    <RouterLink to="/login" class="btn">Ir a Login</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.forbidden {
  text-align: center;
  margin-top: 3rem;
}
.btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 6px;
}
.btn:hover {
  background-color: #2563eb;
}
</style>
