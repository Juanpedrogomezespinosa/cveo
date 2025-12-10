require("dotenv").config({ path: "../.env" }); // Ajustamos ruta porque estamos en subcarpeta
const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

const seedDB = async () => {
  try {
    console.log("🌱 Iniciando Seeding...");

    // 1. Leer el archivo HTML
    const htmlPath = path.join(__dirname, "templates_html", "basic.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf8");

    // 2. Crear Usuario de prueba (si no existe)
    // Usamos INSERT IGNORE para que no falle si ya existe
    await pool.execute(`
            INSERT IGNORE INTO users (id, email, password_hash, full_name, created_at) 
            VALUES (1, 'juan@test.com', 'hash_dummy', 'Juan Perez', NOW())
        `);
    console.log("✅ Usuario de prueba verificado.");

    // 3. Insertar o Actualizar la Plantilla
    // Usamos ON DUPLICATE KEY UPDATE para poder modificar el HTML en el archivo y re-ejecutar el script
    await pool.execute(
      `
            INSERT INTO templates (id, name, thumbnail_url, html_structure, created_at) 
            VALUES (1, 'Plantilla Moderna', 'http://via.placeholder.com/150', ?, NOW())
            ON DUPLICATE KEY UPDATE html_structure = VALUES(html_structure)
        `,
      [htmlContent]
    );

    console.log(
      "✅ Plantilla insertada/actualizada correctamente desde archivo HTML."
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Error en el seeding:", error);
    process.exit(1);
  }
};

seedDB();
