<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/useUser.js';

const teams = ref([]);
const loading = ref(true);
const error = ref(null);
const userStore = useUserStore();

async function fetchTeams() {
  try {
    const res = await fetch('http://localhost:3000/api/equips');
    if (!res.ok) throw new Error('Error obtenint clubs');
    teams.value = await res.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchTeams);
</script>

<template>
  <div class="clubs">
    <h1>🏆 Clubs</h1>

    <RouterLink v-if="userStore.user" to="/crearEquip" class="add">
      + Afegir club
    </RouterLink>

    <div v-if="loading">Carregant...</div>
    <div v-if="error">{{ error }}</div>

    <div class="grid">
      <div v-for="team in teams" :key="team.eq_id" class="card">
        <img :src="team.eq_photo" />
        <h2>{{ team.eq_nom }}</h2>
        <p>{{ team.eq_pais }}</p>
        <RouterLink :to="`/equips/${team.eq_id}`" class="btn">
          Veure
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clubs {
  padding: 3rem;
  background: #0f172a;
  color: white;
  min-height: 100vh;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  background: #1e293b;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
}

img {
  height: 120px;
  object-fit: contain;
}

.btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #22c55e;
  border-radius: 20px;
  text-decoration: none;
  color: white;
}

.add {
  background: #3b82f6;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  color: white;
}
</style>