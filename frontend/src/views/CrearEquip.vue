<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUser.js';

const router = useRouter();
const userStore = useUserStore();

const eq_nom = ref('');
const eq_pais = ref('');
const eq_campions = ref(0);
const eq_photo = ref('');
const error = ref(null);

const crearEquip = async () => {
  if (!userStore.user) return alert("Has d'estar loguejat");

  try {
    const res = await fetch('http://localhost:3000/api/equips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify({
        eq_nom: eq_nom.value,
        eq_pais: eq_pais.value,
        eq_campions: parseInt(eq_campions.value),
        eq_photo: eq_photo.value
      })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Error afegint el club');
    }

    router.push('/equips');
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <div class="form-container">
    <h1>⚽ Afegir nou club</h1>

    <div v-if="error" class="error">{{ error }}</div>

    <form @submit.prevent="crearEquip">
      <div class="form-group">
        <label for="eq_nom">Nom del club</label>
        <input id="eq_nom" v-model="eq_nom" placeholder="Nom del club" required />
      </div>

      <div class="form-group">
        <label for="eq_pais">País</label>
        <input id="eq_pais" v-model="eq_pais" placeholder="País" required />
      </div>

      <div class="form-group">
        <label for="eq_campions">Títols Champions League</label>
        <input id="eq_campions" v-model="eq_campions" type="number" min="0" placeholder="Títols Champions League" required />
      </div>

      <div class="form-group">
        <label for="eq_photo">URL del logo</label>
        <input id="eq_photo" v-model="eq_photo" placeholder="URL del logo" required />
      </div>

      <button type="submit">Crear club</button>
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

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.3rem;
  font-weight: bold;
}

input {
  width: 100%;
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
  margin-bottom: 1rem;
}
</style>