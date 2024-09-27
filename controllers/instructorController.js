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

const getInstructores2 = async (req,res)=>{
  const query = `
    call obtener_instructores()
  `;

  try {
    const [result] = await executeQuery(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al instructores', error });
  }

}

// Mantenedor de Instructores
const postInstructors = async (req, res) => {
  const { nombre,
    apellido,
    correo_electronico,
    telefono,
    telefono_emergencia,
    grado } = req.body;
 const query = `CALL crear_instructor(?, ?, ?, ?, ?, ?)`;
  try {
    const [results] = await executeQuery(query, [
      nombre,
      apellido,
      correo_electronico,
      telefono,
      telefono_emergencia,
      grado]);
    res.status(200).json({
      message: 'Instructor creado con éxito',
      data: results
  });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear instructor', error });
  }
};



module.exports = { 
  getInstructorSchedule,
  getInstructores,
  getInstructores2
  ,postInstructors};
