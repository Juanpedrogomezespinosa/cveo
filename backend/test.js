const express = require("express");
const app = express();
const puppeteer = require("puppeteer"); // Probamos que cargue la librería más pesada

app.get("/", (req, res) => {
  res.send("¡Backend funcionando! Express y Puppeteer están instalados.");
});

app.listen(3000, () => {
  console.log("✅ Servidor Backend corriendo en http://localhost:3000");
});
