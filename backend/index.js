require("dotenv").config(); // Cargar variables de entorno al inicio
const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors()); // Habilita CORS para que tu frontend (React/Vue/etc) pueda conectarse
app.use(express.json()); // Vital: Permite leer el JSON que envías en el Body

// --- Rutas ---
app.use("/api/resumes", resumeRoutes);

// Ruta de prueba rápida
app.get("/", (req, res) => {
  res.send("API de Cveo funcionando correctamente 🚀");
});

// Manejo de errores global (Buenas prácticas)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error en el servidor" });
});

// --- Iniciar Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
