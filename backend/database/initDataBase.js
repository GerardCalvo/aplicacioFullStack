const pool = require("./db"); // tu archivo con Pool

async function crearBaseDeDatos() {
  try {

    await pool.query(`DROP TABLE IF EXISTS Equips`);
    await pool.query(`DROP TABLE IF EXISTS Usuaris`);

    // Usuaris
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Usuaris (
        usu_id SERIAL PRIMARY KEY,
        usu_nom VARCHAR(100) NOT NULL,
        usu_cognom VARCHAR(100) NOT NULL,
        usu_mail VARCHAR(150) NOT NULL UNIQUE,
        usu_contrasenya VARCHAR(255) NOT NULL,
        usu_rol VARCHAR(50) NOT NULL
      )
    `);

    // Crear tabla de equipos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Equips (
        eq_id SERIAL PRIMARY KEY,
        eq_nom VARCHAR(100) NOT NULL UNIQUE,
        eq_pais VARCHAR(100) NOT NULL,
        eq_campions INTEGER DEFAULT 0,
        eq_photo TEXT
      )
    `);

    const teams = [
      { name: "McLaren", country: "United Kingdom", worldChampionships: 10, photo: "https://upload.wikimedia.org/wikipedia/commons/2/20/McLaren_Racing_logo.png" },
      { name: "Mercedes", country: "Germany", worldChampionships: 8, photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg/960px-Mercedes_AMG_Petronas_F1_Logo.svg.png" },
      { name: "Red Bull Racing", country: "Austria", worldChampionships: 6, photo: "https://i.pinimg.com/736x/8c/99/28/8c992817370af5183f95ce718d88ec5c.jpg" },
      { name: "Ferrari", country: "Italy", worldChampionships: 16, photo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Scuderia_Ferrari_HP_logo_24.svg/1280px-Scuderia_Ferrari_HP_logo_24.svg.png" },
      { name: "Williams", country: "United Kingdom", worldChampionships: 9, photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Williams_F1_logo_2026_%28Corrigindo%29.png/330px-Williams_F1_logo_2026_%28Corrigindo%29.png" },
      { name: "Racing Bulls", country: "Italy", worldChampionships: 0, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ZX49j667LZEqYkJYYI3FwwtWM83FBqUiiA&s" },
      { name: "Aston Martin", country: "United Kingdom", worldChampionships: 0, photo: "https://upload.wikimedia.org/wikipedia/commons/0/03/Aston_Martin_F1_Team_logo_2024.jpg" },
      { name: "Haas", country: "United States", worldChampionships: 0, photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Haas_F1_Team_Logo.svg/1280px-Haas_F1_Team_Logo.svg.png" },
      { name: "Alpine", country: "France", worldChampionships: 0, photo: "https://upload.wikimedia.org/wikipedia/fr/thumb/1/1f/Alpine.svg/1200px-Alpine.svg.png" },
      { name: "Audi", country: "Germany", worldChampionships: 0, photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Audif1.com_logo17_%28cropped%29.svg/960px-Audif1.com_logo17_%28cropped%29.svg.png" },
      { name: "Cadillac Racing", country: "United States", worldChampionships: 0, photo: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Cadillac_Formula_1_Team_logo.png" }
    ];


    // Insertar cada equipo
    for (const team of teams) {
      await pool.query(
        `INSERT INTO Equips (eq_nom, eq_pais, eq_campions, eq_photo)
         VALUES ($1, $2, $3, $4)`,
        [team.name, team.country, team.worldChampionships, team.photo]
      );
    }

    console.log("Tablas creadas correctamente en PostgreSQL AlwaysData.");
    await pool.end();
  } catch (error) {
    console.error("Error al crear las tablas:", error);
  }
}

crearBaseDeDatos();