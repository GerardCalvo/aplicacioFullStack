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

const loading = ref(true);
const error = ref(null);
const success = ref(null);

async function fetchTeam() {
    try {
        const res = await fetch(`http://localhost:3000/api/equips/${route.params.id}`);
        if (!res.ok) throw new Error('Error al obtenir l’equip');
        const data = await res.json();
        team.value = data;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
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

        if (!res.ok) throw new Error('Error al actualitzar l’equip');
        success.value = 'Equip actualitzat correctament!';
        setTimeout(() => router.push('/equips'), 1000);
    } catch (err) {
        error.value = err.message;
    }
}

onMounted(fetchTeam);
</script>

<template>
    <div class="edit-team-container">
        <h1>Editar Equip</h1>

        <div v-if="loading">Carregant dades de l’equip...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="success" class="success">{{ success }}</div>

        <form v-if="!loading && !error" @submit.prevent="updateTeam" class="edit-form">
            <label>
                Nom:
                <input v-model="team.eq_nom" required />
            </label>

            <label>
                País:
                <input v-model="team.eq_pais" required />
            </label>

            <label>
                Títols de constructors:
                <input type="number" v-model.number="team.eq_campions" min="0" required />
            </label>

            <label>
                URL del logotip:
                <input v-model="team.eq_photo" required />
            </label>

            <button type="submit" class="btn">Actualitzar</button>
        </form>
    </div>
</template>

<style scoped>
.edit-team-container {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    background: linear-gradient(145deg, #ffffff, #f1f1f1);
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    font-family: Arial, sans-serif;
}

.edit-team-container h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #222;
}

.edit-form label {
    display: block;
    margin-bottom: 1rem;
    font-weight: 500;
    color: #333;
}

.edit-form input {
    width: 100%;
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-top: 0.3rem;
}

.btn {
    display: block;
    width: 100%;
    padding: 0.8rem;
    background-color: #229753;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.2s, transform 0.2s;
}

.btn:hover {
    background-color: #39ac00;
    transform: scale(1.02);
}

.error {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
}

.success {
    color: green;
    margin-bottom: 1rem;
    text-align: center;
}
</style>
