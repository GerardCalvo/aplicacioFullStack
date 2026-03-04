# F1 2026 Teams

Aplicació web per explorar els equips de la temporada 2026 de Fórmula 1. Permet veure els equips, els seus detalls, i afegir o modificar equips si estàs loguejat.

---
> ⚠️ **IMPORTANT**  
> CODI BASAT EN EL PROJECTE 2 DE MAURICIO HUAMANÍ I ALEX SÁNCHEZ
> Llegir el pas 4 abans de iniciar el projecte
---
## 1️⃣ Arquitectura del projecte

- **Frontend**:  
  - **Vue 3**, **Pinia**, **Vue Router**
  - Components principals:
    - `Home.vue` → pàgina inicial amb descripció del projecte
    - `Equips.vue` → llista de tots els equips
    - `EquipDetall.vue` → detalls d’un equip
    - `CrearEquip.vue` → afegir un equip
    - `EditarEquip.vue` → modificar un equip
  - CSS personalitzat i layout responsive.

- **Backend**:  
  - **Node.js + Express**
  - Base de dades **PostgreSQL**
  - Endpoints RESTful amb **JWT** per a autenticació.
  - Middleware `auth.js` per protegir operacions com afegir, editar o eliminar equips.

- **Base de dades**:
  - `Usuaris`: id, nom, cognom, email, contrasenya (hash), rol
  - `Equips`: id, nom, país, títols de constructors, logotip

---

## 2️⃣ Endpoints de l’API

### Equips

| Mètode | Ruta | Descripció | Protegit |
|--------|-----|------------|----------|
| GET    | `/api/equips` | Obtenir tots els equips | ❌ |
| GET    | `/api/equips/:id` | Obtenir un equip per ID | ❌ |
| POST   | `/api/equips` | Afegir un equip nou | ✅ |
| PUT    | `/api/equips/:id` | Modificar un equip existent | ✅ |
| DELETE | `/api/equips/:id` | Eliminar un equip | ✅ |

> ✅ Requereix token d’usuari loguejat.

### Usuaris

| Mètode | Ruta | Descripció |
|--------|-----|------------|
| POST   | `/api/auth/register` | Registrar un usuari |
| POST   | `/api/auth/login` | Iniciar sessió i obtenir token |

---

## 3️⃣ Flux d’autenticació

1. L’usuari es registra a `/register` i envia email i contrasenya.  
2. Quan fa login a `/login`, el servidor retorna un **JWT** i les dades de l’usuari.  
3. El **token** es guarda a `localStorage` i s’utilitza per a les peticions protegides (`POST`, `PUT`, `DELETE`).  
4. El frontend comprova si hi ha usuari loguejat i mostra els botons de **editar** o **eliminar** només si està loguejat.

---

## 4️⃣ Instruccions per executar el projecte

> ### Abans d'executar has de fer el .env amb les credencial en l'arrel de la carpeta backend 

Següent: 
```
npm install
```

- Una vegada fet, has de executar la següent comanda per instalar node modules
```
npm run install-all
```

- Per ultim:
```bash
npm run dev
```

## 5️⃣ Tecnologies utilitzades

- **Frontend:** Vue 3, Pinia, Vue Router, CSS3  
- **Backend:** Node.js, Express, PostgreSQL  
- **Autenticació:** JSON Web Token (JWT)  

## 6️⃣ Funcionalitats principals

- Veure la llista de tots els equips de F1 2026  
- Veure detalls d’un equip  
- Afegir, editar i eliminar equips (si estàs loguejat)  
- Autenticació amb registre i login
