<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/useUser.js';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const team = ref(null);

async function fetchTeam() {
  const res = await fetch(`http://localhost:3000/api/equips/${route.params.id}`);
  team.value = await res.json();
}

const deleteTeam = async () => {
  await fetch(`http://localhost:3000/api/equips/${team.value.eq_id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${userStore.token}` }
  });
  router.push("/equips");
};

onMounted(fetchTeam);
</script>

<template>
  <div v-if="team" class="detail">
    <RouterLink to="/equips">← Tornar</RouterLink>

    <img :src="team.eq_photo" />
    <h1>{{ team.eq_nom }}</h1>
    <p><strong>País:</strong> {{ team.eq_pais }}</p>
    <p><strong>Champions League:</strong> {{ team.eq_campions }}</p>

    <div v-if="userStore.user">
      <RouterLink :to="`/equips/editar/${team.eq_id}`">Editar</RouterLink>
      <button @click="deleteTeam">Eliminar</button>
    </div>
  </div>
</template>

<style scoped>
.detail {
  text-align: center;
  padding: 3rem;
  background: #0f172a;
  color: white;
  min-height: 100vh;
}

img {
  height: 150px;
  margin-bottom: 1rem;
}

button {
  margin-top: 1rem;
  background: #ef4444;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: white;
}
</style>