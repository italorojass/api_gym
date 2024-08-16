const { executeQuery } = require('../conexions/database');
const sql = require('mssql');

const getInstructorSchedule = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT s.*
    FROM Schedules s
    JOIN Instructors i ON s.InstructorID = i.InstructorID
    WHERE i.InstructorID = @id
  `;
  const params = [
    { name: 'id', type: sql.Int, value: id },
  ];
  try {
    const schedule = await executeQuery(query, params);
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el horario del instructor', error });
  }
};

const getInstructores = async (req,res)=>{
  const query = `
    SELECT InstructorID,Name,Email, Phone FROM gym_ams.instructors;
  `;

  try {
    const result = await executeQuery(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el horario del instructor', error });
  }

}



module.exports = { getInstructorSchedule ,getInstructores};
