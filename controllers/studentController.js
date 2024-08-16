const { executeQuery } = require('../conexions/database');
const sql = require('mssql');

const getStudentClasses = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT d.*
    FROM StudentDisciplines sd
    JOIN Disciplines d ON sd.DisciplineID = d.DisciplineID
    WHERE sd.StudentID = @id
  `;
  const params = [
    { name: 'id', type: sql.Int, value: id },
  ];
  try {
    const classes = await executeQuery(query, params);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las clases del alumno', error });
  }
};

const getStudentInstructor = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT i.*
    FROM Students s
    JOIN Instructors i ON s.InstructorID = i.InstructorID
    WHERE s.StudentID = @id
  `;
  const params = [
    { name: 'id', type: sql.Int, value: id },
  ];
  try {
    const instructor = await executeQuery(query, params);
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el instructor del alumno', error });
  }
};

module.exports = { getStudentClasses, getStudentInstructor };
