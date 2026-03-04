<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/useUser.js";

const router = useRouter();
const userStore = useUserStore();

const form = reactive({ mail: "", contraseña: "" });
const error = ref("");

const login = async () => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });

  const data = await res.json();

  if (!res.ok) {
    error.value = data.error;
    return;
  }

  userStore.setUser(data.user, data.token);
  router.push("/");
};
</script>

<template>
  <div class="auth">
    <h2>Login ⚽</h2>
    <input v-model="form.mail" placeholder="Email" />
    <input type="password" v-model="form.contraseña" placeholder="Contraseña" />
    <button @click="login">Entrar</button>
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
}
</style>