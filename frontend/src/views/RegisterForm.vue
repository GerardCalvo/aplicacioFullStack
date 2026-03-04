<template>
  <div class="register">
    <h2>Registro</h2>

    <form @submit.prevent="register">
      <input
        type="text"
        placeholder="Nombre"
        v-model="form.nombre"
        required
      />

      <input
        type="text"
        placeholder="Apellidos"
        v-model="form.apellidos"
        required
      />

      <input
        type="email"
        placeholder="Email"
        v-model="form.mail"
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        v-model="form.contraseña"
        required
      />

      <select v-model="form.rol" required>
        <option disabled value="">Selecciona un rol</option>
        <option value="user">Fan</option>
        <option value="admin">Nou Fan</option>
      </select>

      <button type="submit">Registrarse</button>
    </form>

    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/useUser.js";

const router = useRouter();
const userStore = useUserStore();

const form = reactive({
  nombre: "",
  apellidos: "",
  mail: "",
  contraseña: "",
  rol: ""
});

const message = ref("");
const error = ref("");

const register = async () => {
  message.value = "";
  error.value = "";

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      error.value = data.error || "Error al registrar";
      return;
    }

    message.value = data.message;

    Object.keys(form).forEach(key => form[key] = "");

   setTimeout(() => {
      router.push("/login");
    }, 1000);

  } catch (err) {
    error.value = "No se pudo conectar con el servidor";
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

input, select, button {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.6rem;
}

button {
  cursor: pointer;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
