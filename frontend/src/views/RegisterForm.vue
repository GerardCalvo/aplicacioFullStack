<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  nombre: "",
  apellidos: "",
  mail: "",
  contraseña: "",
  rol: ""
});

const error = ref("");

const register = async () => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });

  const data = await res.json();

  if (!res.ok) {
    error.value = data.error;
    return;
  }

  router.push("/login");
};
</script>

<template>
  <div class="auth">
    <h2>Crear compte ⚽</h2>
    <input v-model="form.nombre" placeholder="Nom" />
    <input v-model="form.apellidos" placeholder="Cognoms" />
    <input v-model="form.mail" placeholder="Email" />
    <input type="password" v-model="form.contraseña" placeholder="Contraseña" />
    <select v-model="form.rol">
      <option value="user">Aficionat</option>
      <option value="admin">Administrador</option>
    </select>
    <button @click="register">Registrar</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.auth {
  max-width: 400px;
  margin: 4rem auto;
  background: #1e293b;
  padding: 2rem;
  border-radius: 20px;
  color: white;
}

input, select {
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
}
</style>