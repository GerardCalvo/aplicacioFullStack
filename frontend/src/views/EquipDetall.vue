<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUser.js';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const team = ref(null);
const loading = ref(true);
const error = ref(null);

async function fetchTeam() {
  try {
    const res = await fetch(`http://localhost:3000/api/equips/${route.params.id}`);
    if (!res.ok) throw new Error('Error al obtenir l’equip');
    team.value = await res.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  userStore.loadUser();
  fetchTeam();
});

const deleteTeam = async () => {
  if (!userStore.user) return alert("Has de estar logueado");

  try {
    const res = await fetch(`http://localhost:3000/api/equips/${team.value.eq_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${userStore.token}`
      }
    });

    if (!res.ok) throw new Error("Error eliminando el equipo");

    alert("Equipo eliminado correctamente");
    router.push("/equips");
  } catch (err) {
    alert(err.message);
  }
};


const editTeam = () => {
  router.push(`/equips/editar/${team.value.eq_id}`);
};
</script>

<template>
  <div class="team-detail-container">
    <RouterLink to="/equips" class="back-btn">← Tornar als equips</RouterLink>

    <div v-if="loading">Carregant informació de l’equip...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="!loading && !error && team" class="team-detail-card">
      <div class="team-logo-container">
        <img :src="team.eq_photo" :alt="team.eq_nom" class="team-logo" />
      </div>
      <h1>{{ team.eq_nom }}</h1>
      <p><strong>País:</strong> {{ team.eq_pais }}</p>
      <p><strong>Títols de constructors:</strong> {{ team.eq_campions }}</p>
      <p><strong>ID de l’equip:</strong> {{ team.eq_id }}</p>

      <div v-if="userStore.user" class="actions">
        <button @click="editTeam" class="btn edit-btn">Editar</button>
        <button @click="deleteTeam" class="btn delete-btn">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-detail-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  text-align: center;
}

.back-btn {
  display: inline-block;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: #229753;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s, transform 0.2s;
  font-weight: bold;
}

.back-btn:hover {
  background-color: #39ac00;
  transform: scale(1.05);
}

.team-detail-card {
  background: linear-gradient(145deg, #ffffff, #f1f1f1);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-logo-container {
  height: 160px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  padding: 0.5rem;
}

.team-logo {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.team-detail-card h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #222;
}

.team-detail-card p {
  font-size: 1.1rem;
  margin: 0.3rem 0;
  color: #555;
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.edit-btn {
  background-color: #229753;
  color: white;
}

.edit-btn:hover {
  background-color: #39ac00;
  transform: scale(1.05);
}

.delete-btn {
  background-color: #ef4444;
  color: white;
}

.delete-btn:hover {
  background-color: #b91c1c;
  transform: scale(1.05);
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
