const puppeteer = require("puppeteer");

const generatePdfBuffer = async (htmlContent) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new", // Modo headless moderno
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Recomendado para entornos Docker/Linux
    });

    const page = await browser.newPage();

    // Inyectar HTML
    await page.setContent(htmlContent, {
      waitUntil: "networkidle0", // Esperar a que no haya conexiones de red (imágenes, fuentes cargadas)
    });

    // Generar Buffer
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true, // Imprimir colores de fondo y gráficos
      margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
    });

    return pdfBuffer;
  } catch (error) {
    throw new Error(`Error generando PDF: ${error.message}`);
  } finally {
    if (browser) await browser.close();
  }
};

module.exports = { generatePdfBuffer };
