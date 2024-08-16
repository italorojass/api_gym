const { executeQuery } = require('../conexions/database');
const { connectToDatabase } = require('../conexions/database');

const getEstadisticasPorDisciplina =async (req,res)=>{
    const query = `SELECT 
      d.DisciplineName,
      d.Icon,
      COUNT(sd.StudentID) AS NumberOfStudents,
      SUM(COUNT(sd.StudentID)) OVER () AS TotalStudents
  FROM 
      Disciplines d
  LEFT JOIN 
      StudentDisciplines sd ON d.DisciplineID = sd.DisciplineID
  LEFT JOIN 
      Students s ON sd.StudentID = s.StudentID
      WHERE d.State = 1
  GROUP BY 
      d.DisciplineName, d.Icon
  ORDER BY 
      NumberOfStudents DESC;`;
    try {
      const result = await executeQuery(query);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener horarios', error });
    }
  }

  module.exports = {
    getEstadisticasPorDisciplina

  }