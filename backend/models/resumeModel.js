const pool = require("../config/db");

class ResumeModel {
  // Funcionalidad 1: Guardado Transaccional
  static async createResumeTransaction(data) {
    const connection = await pool.getConnection();

    try {
      // 1. Iniciar Transacción
      await connection.beginTransaction();

      const {
        user_id,
        template_id,
        title,
        profile_title,
        summary,
        phone,
        website_url,
        linkedin_url,
        address,
        experience,
        education,
        skills,
      } = data;

      // 2. Insertar Datos Principales del Resume
      const [resumeResult] = await connection.execute(
        `INSERT INTO resumes 
                (user_id, template_id, title, profile_title, summary, phone, website_url, linkedin_url, address, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          user_id,
          template_id,
          title,
          profile_title,
          summary,
          phone,
          website_url,
          linkedin_url,
          address,
        ]
      );

      const resumeId = resumeResult.insertId;

      // 3. Insertar Experiencia (Bucle)
      if (experience && experience.length > 0) {
        const expPromises = experience.map((exp) => {
          return connection.execute(
            `INSERT INTO experience 
                        (resume_id, company, position, city, start_date, end_date, is_current, description) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              resumeId,
              exp.company,
              exp.position,
              exp.city,
              exp.start_date,
              exp.end_date,
              exp.is_current,
              exp.description,
            ]
          );
        });
        await Promise.all(expPromises);
      }

      // 4. Insertar Educación (Bucle)
      if (education && education.length > 0) {
        const eduPromises = education.map((edu) => {
          return connection.execute(
            `INSERT INTO education 
                        (resume_id, institution, degree, start_date, end_date, description) 
                        VALUES (?, ?, ?, ?, ?, ?)`,
            [
              resumeId,
              edu.institution,
              edu.degree,
              edu.start_date,
              edu.end_date,
              edu.description,
            ]
          );
        });
        await Promise.all(eduPromises);
      }

      // 5. Insertar Habilidades (Skills) - Extraído del diagrama
      if (skills && skills.length > 0) {
        const skillPromises = skills.map((skill) => {
          return connection.execute(
            `INSERT INTO skills (resume_id, name, level) VALUES (?, ?, ?)`,
            [resumeId, skill.name, skill.level]
          );
        });
        await Promise.all(skillPromises);
      }

      // 6. Confirmar Transacción (Si todo salió bien)
      await connection.commit();
      return resumeId;
    } catch (error) {
      // 7. Rollback (Si algo falló, deshacemos todo)
      await connection.rollback();
      console.error("Error en transacción de Resume:", error);
      throw error;
    } finally {
      // Liberar conexión al pool
      connection.release();
    }
  }

  // Método auxiliar para obtener estructura HTML de una plantilla
  static async getTemplateStructure(templateId) {
    const [rows] = await pool.execute(
      "SELECT html_structure FROM templates WHERE id = ?",
      [templateId]
    );
    return rows[0] ? rows[0].html_structure : null;
  }
}

module.exports = ResumeModel;
