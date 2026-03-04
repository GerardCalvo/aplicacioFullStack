<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUser.js';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const team = ref({
  eq_nom: '',
  eq_pais: '',
  eq_campions: 0,
  eq_photo: ''
});

const error = ref(null);

async function fetchTeam() {
  const res = await fetch(`http://localhost:3000/api/equips/${route.params.id}`);
  team.value = await res.json();
}

async function updateTeam() {
  try {
    const res = await fetch(`http://localhost:3000/api/equips/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify(team.value)
    });

    if (!res.ok) throw new Error("Error actualitzant");

    router.push('/equips');
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(fetchTeam);
</script>

<template>
  <div class="form-container">
    <h1>Editar club ⚽</h1>

    <div v-if="error" class="error">{{ error }}</div>

    <form @submit.prevent="updateTeam">
      <input v-model="team.eq_nom" required />
      <input v-model="team.eq_pais" required />
      <input type="number" v-model.number="team.eq_campions" min="0" required />
      <input v-model="team.eq_photo" required />
      <button type="submit">Actualitzar</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 4rem auto;
  background: #1e293b;
  padding: 2rem;
  border-radius: 20px;
  color: white;
}

input {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.7rem;
  border-radius: 8px;
  border: none;
}

button {
  width: 100%;
  padding: 0.8rem;
  background: #22c55e;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
}

.error {
  color: #ef4444;
}
</style>