<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="home">
    <h1>⚽ Clubs Europeus</h1>
    <p>Descobreix els clubs més importants d’Europa i els seus títols de Champions League.</p>
    <RouterLink to="/equips" class="btn">Veure clubs</RouterLink>
  </div>
</template>

<style scoped>
.home {
  min-height: 90vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn {
  margin-top: 1.5rem;
  padding: 0.8rem 2rem;
  background: #22c55e;
  border-radius: 30px;
  text-decoration: none;
  color: white;
}
</style>