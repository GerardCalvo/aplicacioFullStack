// Cargar variables de entorno al inicio
require("dotenv").config();

const express = require("express");
const cors = require('cors');
const pool = require("./database/db.js"); // db.js usará process.env.DB_...
const bcrypt = require("bcrypt");
const validator = require("validator");
const app = express();
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/auth.js");

app.use(cors()); // permite cualquier origen
app.use(express.json());

// Importar rutas
const EquipsRoutes = require("./routes/equips.js");

// Usar rutas
app.use("/api/equips", EquipsRoutes);


app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // ejemplo simple de PostgreSQL
    res.json({ mensaje: `DB OK, hora actual: ${result.rows[0].now}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error conectando a la base de datos' });
  }
});


// ================= REGISTER =================
app.post("/api/register", async (req, res) => {
  try {
    const { nombre, apellidos, mail, contraseña, rol } = req.body;

    // Validaciones básicas
    if (!nombre || !apellidos || nombre.trim() === "" || apellidos.trim() === "") {
      return res.status(400).json({ error: "Nombre y apellidos son obligatorios" });
    }

    if (!mail || !contraseña || !rol) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Validación de email
    if (!validator.isEmail(mail)) {
      return res.status(400).json({ error: "Email no válido" });
    }

    // Comprobar si el email ya existe
    const { rows: existingUser } = await pool.query(
      "SELECT usu_id FROM usuaris WHERE usu_mail = $1",
      [mail.toLowerCase()]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    // Hashear contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    // Insertar usuario
    await pool.query(
      `INSERT INTO usuaris 
       (usu_nom, usu_cognom, usu_mail, usu_contrasenya, usu_rol)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        nombre.trim(),
        apellidos.trim(),
        mail.toLowerCase(),
        hashedPassword,
        rol
      ]
    );

    return res.status(201).json({
      message: "Usuario registrado correctamente"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
});

// ================= LOGIN =================
app.post("/api/login", async (req, res) => {
 try {
   const { mail, contraseña } = req.body;


   if (!mail || !contraseña) {
     return res.status(400).json({ error: "Email i contrasenya són obligatòries" });
   }


   const { rows } = await pool.query(
     `SELECT usu_id, usu_nom, usu_cognom, usu_mail, usu_contrasenya, usu_rol
      FROM usuaris
      WHERE usu_mail = $1`,
     [mail.toLowerCase()]
   );


   if (rows.length === 0) {
     return res.status(401).json({ error: "Credencials incorrectes" });
   }


   const user = rows[0];
   const passwordOk = await bcrypt.compare(contraseña, user.usu_contrasenya);


   if (!passwordOk) {
     return res.status(401).json({ error: "Credencials incorrectes" });
   }


   // Generar JWT
   const token = jwt.sign(
     { id: user.usu_id, nombre: user.usu_nom, apellidos: user.usu_cognom, rol: user.usu_rol },
     process.env.JWT_SECRET,
     { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
   );


   return res.status(200).json({
     message: "Login correcte",
     user: {
       id: user.usu_id,
       nombre: user.usu_nom,
       apellidos: user.usu_cognom,
       rol: user.usu_rol
     },
     token
   });


 } catch (error) {
   console.error(error);
   return res.status(500).json({ error: "Error intern del servidor" });
 }
});


// ================= APP LISTEN =================

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});