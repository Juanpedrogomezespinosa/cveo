const ResumeModel = require("../models/resumeModel");
const { generatePdfBuffer } = require("../utils/pdfGenerator");

// POST /api/resumes
const createResume = async (req, res) => {
  try {
    // En un caso real, el user_id vendría del token JWT (req.user.id)
    // Aquí asumimos que viene en el body para el ejemplo
    const { user_id, template_id, title } = req.body;

    if (!user_id || !template_id || !title) {
      return res.status(400).json({
        error: "Faltan campos obligatorios (user_id, template_id, title)",
      });
    }

    const newResumeId = await ResumeModel.createResumeTransaction(req.body);

    return res.status(201).json({
      message: "CV creado exitosamente",
      resume_id: newResumeId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno al guardar el CV" });
  }
};

// POST /api/resumes/pdf
const generateResumePdf = async (req, res) => {
  try {
    // Desestructuramos todos los campos necesarios del body
    // Nota: phone, address, summary, profile_title y email están en la raíz del JSON
    const {
      personal_info,
      experience,
      education,
      skills,
      template_id,
      profile_title,
      summary,
      phone,
      address,
      email,
    } = req.body;

    // 1. Obtener la estructura HTML de la base de datos
    let htmlStructure = await ResumeModel.getTemplateStructure(template_id);

    // Fallback si no hay template en DB (para pruebas o seguridad)
    if (!htmlStructure) {
      htmlStructure = `
        <html>
            <style>body { font-family: Arial; padding: 20px; }</style>
            <body>
                <h1>{{name}}</h1>
                <p>{{title}}</p>
                <p>{{email}} | {{phone}}</p>
                <hr/>
                <h3>Experiencia</h3>
                {{experience_list}}
            </body>
        </html>
      `;
    }

    // 2. Inyección de datos (Motor de plantillas simple)
    // Usamos '|| ""' para asegurar que no aparezca "undefined" en el PDF
    let compiledHtml = htmlStructure
      .replace("{{name}}", personal_info?.full_name || "")
      .replace("{{title}}", profile_title || "")
      .replace("{{summary}}", summary || "")
      .replace("{{email}}", email || "")
      .replace("{{phone}}", phone || "")
      .replace("{{address}}", address || "");

    // 3. Generar lista de experiencias HTML respetando las clases CSS de basic.html
    // CORRECCIÓN CLAVE: Usamos las clases 'exp-item', 'item-header', 'company', etc.
    // También controlamos la fecha 'null' para mostrar 'Presente'
    const expHtml = experience
      .map(
        (exp) => `
        <div class="exp-item">
            <div class="item-header">
                <span class="company">${exp.company}</span>
                <span class="dates">
                    ${exp.start_date} - ${
          exp.end_date ? exp.end_date : "Presente"
        }
                </span>
            </div>
            <div class="position">${exp.position}</div>
            <p>${exp.description || ""}</p>
        </div>`
      )
      .join("");

    compiledHtml = compiledHtml.replace("{{experience_list}}", expHtml);

    // 4. Generar PDF con Puppeteer
    const pdfBuffer = await generatePdfBuffer(compiledHtml);

    // 5. Enviar respuesta binaria
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length,
      "Content-Disposition": `attachment; filename="resume_${Date.now()}.pdf"`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generando PDF:", error);
    res.status(500).json({ error: "Error generando el PDF" });
  }
};

module.exports = {
  createResume,
  generateResumePdf,
};
