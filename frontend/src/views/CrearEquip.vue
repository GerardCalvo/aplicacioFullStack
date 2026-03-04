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
  if (!userStore.user) return alert("Has de estar loguejat per afegir equips");

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
      throw new Error(data.error || 'Error afegint l’equip');
    }

    alert('Equip afegit correctament');
    router.push('/equips');

  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <div class="crear-equip-container">
    <h1>Afegir nou equip F1 2026</h1>
    <div v-if="error" class="error">{{ error }}</div>

    <form @submit.prevent="crearEquip" class="equip-form">
      <label>
        Nom de l’equip:
        <input v-model="eq_nom" type="text" required />
      </label>

      <label>
        País:
        <input v-model="eq_pais" type="text" required />
      </label>

      <label>
        Títols de constructors:
        <input v-model="eq_campions" type="number" min="0" required />
      </label>

      <label>
        URL del logo:
        <input v-model="eq_photo" type="text" required />
      </label>

      <button type="submit" class="btn">Afegir equip</button>
    </form>
  </div>
</template>

<style scoped>
.crear-equip-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  text-align: center;
  background: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}

.equip-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  text-align: left;
  font-weight: 500;
}

input {
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.btn {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #229753;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background-color: #39ac00;
}

.error {
  color: red;
  margin-bottom: 1rem;
}
</style>
