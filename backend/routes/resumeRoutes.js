const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");

// Ruta para guardar (Transaccional)
router.post("/", resumeController.createResume);

// Ruta para generar PDF
router.post("/pdf", resumeController.generateResumePdf);

module.exports = router;
