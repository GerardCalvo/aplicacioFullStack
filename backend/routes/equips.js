const express = require("express");
const router = express.Router();
const pool = require("../database/db.js");
const auth = require("../middleware/auth.js");

// ================= OBTENER TODOS LOS CLUBES =================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT eq_id, eq_nom, eq_pais, eq_campions, eq_photo FROM Equips ORDER BY eq_id'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener clubes:', err);
    res.status(500).json({ error: 'Error al obtener clubes' });
  }
});

// ================= OBTENER CLUB POR ID =================
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT eq_id, eq_nom, eq_pais, eq_campions, eq_photo FROM Equips WHERE eq_id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Club no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener club:', err);
    res.status(500).json({ error: 'Error al obtener club' });
  }
});

// ================= AÑADIR CLUB =================
router.post('/', auth, async (req, res) => {
  const { eq_nom, eq_pais, eq_campions, eq_photo } = req.body;

  if (!eq_nom || !eq_pais) {
    return res.status(400).json({ error: 'Nombre y país son obligatorios' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO Equips (eq_nom, eq_pais, eq_campions, eq_photo)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [eq_nom, eq_pais, eq_campions || 0, eq_photo || null]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error('Error al añadir club:', err);
    res.status(500).json({ error: 'Error al añadir club' });
  }
});

// ================= MODIFICAR CLUB =================
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { eq_nom, eq_pais, eq_campions, eq_photo } = req.body;

  try {
    const result = await pool.query(
      `UPDATE Equips
       SET eq_nom = COALESCE($1, eq_nom),
           eq_pais = COALESCE($2, eq_pais),
           eq_campions = COALESCE($3, eq_campions),
           eq_photo = COALESCE($4, eq_photo)
       WHERE eq_id = $5
       RETURNING *`,
      [eq_nom, eq_pais, eq_campions, eq_photo, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Club no encontrado' });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error('Error al modificar club:', err);
    res.status(500).json({ error: 'Error al modificar club' });
  }
});

// ================= ELIMINAR CLUB =================
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM Equips WHERE eq_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Club no encontrado" });
    }

    res.json({ message: "Club eliminado correctamente", club: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error eliminando club" });
  }
});

module.exports = router;