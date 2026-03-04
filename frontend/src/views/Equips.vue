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
    if (!res.ok) throw new Error('Error al obtenir els equips');
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
  <div class="teams-container">
  <div class="add-btn-container" v-if="userStore.user">
    <RouterLink to="/crearEquip" class="btn-add">Afegir equip</RouterLink>
  </div>

  <h1>Equips F1 2026</h1>

  <div v-if="loading">Carregant equips...</div>
  <div v-if="error" class="error">{{ error }}</div>

  <div class="teams-grid" v-if="!loading && !error">
    <div v-for="team in teams" :key="team.eq_id" class="team-card">
      <div class="team-logo-container">
        <img :src="team.eq_photo" :alt="team.eq_nom" class="team-logo" />
      </div>
      <h2>{{ team.eq_nom }}</h2>
      <RouterLink :to="`/equips/${team.eq_id}`" class="btn">Veure detalls</RouterLink>
    </div>
  </div>
</div>

</template>

<style scoped>
.teams-container {
  position: relative;
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  text-align: center;
}

.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.team-card {
  background: linear-gradient(145deg, #ffffff, #f1f1f1);
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 280px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
}

.team-logo-container {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 8px;
  padding: 0.5rem;
}

.team-logo {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.team-card h2 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #222;
}

.team-card p {
  font-size: 1rem;
  margin: 0.25rem 0;
  color: #555;
}

.btn {
  display: inline-block;
  margin-top: auto;
  padding: 0.6rem 1.2rem;
  background-color: #229753;
  /* verde chill */
  color: white;
  text-decoration: none;
  border-radius: 10px;
  transition: background-color 0.2s, transform 0.2s;
  font-weight: bold;
}

.btn:hover {
  background-color: #39ac00;
  transform: scale(1.05);
}

.error {
  color: red;
  margin-top: 1rem;
}

.add-btn-container {
  position: absolute;
  top: +20px;
  right: 0;
}

.btn-add {
  background-color: #1d4ed8; 
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s, transform 0.2s;
}

.btn-add:hover {
  background-color: #2563eb;
  transform: scale(1.05);
}
</style>
