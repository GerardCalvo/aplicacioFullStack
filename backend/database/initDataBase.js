const pool = require("./db");

async function crearBaseDeDatos() {
  try {

    await pool.query(`DROP TABLE IF EXISTS Equips`);
    await pool.query(`DROP TABLE IF EXISTS Usuaris`);

    // ================= USUARIOS =================
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

    // ================= CLUBES DE FÚTBOL =================
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
      {
        name: "Real Madrid",
        country: "España",
        worldChampionships: 14,
        photo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg"
      },
      {
        name: "FC Barcelona",
        country: "España",
        worldChampionships: 5,
        photo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"
      },
      {
        name: "Manchester City",
        country: "Inglaterra",
        worldChampionships: 1,
        photo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"
      },
      {
        name: "Bayern Munich",
        country: "Alemania",
        worldChampionships: 6,
        photo: "https://upload.wikimedia.org/wikipedia/en/1/1f/FC_Bayern_München_logo_%282017%29.svg"
      },
      {
        name: "Paris Saint-Germain",
        country: "Francia",
        worldChampionships: 0,
        photo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg"
      },
      {
        name: "Liverpool",
        country: "Inglaterra",
        worldChampionships: 6,
        photo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"
      },
      {
        name: "AC Milan",
        country: "Italia",
        worldChampionships: 7,
        photo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg"
      },
      {
        name: "Chelsea",
        country: "Inglaterra",
        worldChampionships: 2,
        photo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg"
      }
    ];

    for (const team of teams) {
      await pool.query(
        `INSERT INTO Equips (eq_nom, eq_pais, eq_campions, eq_photo)
         VALUES ($1, $2, $3, $4)`,
        [team.name, team.country, team.worldChampionships, team.photo]
      );
    }

    console.log("⚽ Base de datos de clubes de fútbol creada correctamente.");
    await pool.end();

  } catch (error) {
    console.error("Error al crear las tablas:", error);
  }
}

crearBaseDeDatos();