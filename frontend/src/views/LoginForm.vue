<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useUserStore } from "@/stores/useUser.js";

const router = useRouter();
const userStore = useUserStore();

const form = reactive({ mail: "", contraseña: "" });
const message = ref("");
const error = ref("");

onMounted(() => userStore.loadUser());

const login = async () => {
  message.value = "";
  error.value = "";

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      error.value = data.error || "Error al iniciar sesión";
      return;
    }

    userStore.setUser(data.user, data.token);

    router.push("/");
    form.mail = "";
    form.contraseña = "";

  } catch {
    error.value = "No se pudo conectar con el servidor";
  }
};
</script>

<template>
  <div class="login">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login">
      <input type="email" placeholder="Email" v-model="form.mail" required />
      <input type="password" placeholder="Contraseña" v-model="form.contraseña" required />
      <button type="submit">Iniciar sesión</button>
    </form>
    <p class="register-text">
      No tens compte encara?
      <RouterLink to="/register" class="register-link">Registra't!</RouterLink>
    </p>
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>


<style scoped>
.login {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}

input,
button {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.6rem;
}

button {
  cursor: pointer;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #2563eb;
}

.success {
  color: green;
}

.error {
  color: red;
}

.register-text {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #374151;
}

.register-link {
  color: #3b82f6; 
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.3rem;
  transition: color 0.2s;
}

.register-link:hover {
  color: #2563eb; 
  text-decoration: underline;
}

</style>
