const { executeQuery } = require('../conexions/database');
const { connectToDatabase } = require('../conexions/database');

const getDisciplinas = async (req, res) => {
  const query = 'SELECT * FROM disciplines WHERE State = 1;';
  try {
    const resultQuery = await executeQuery(query, []);

    if (resultQuery.length === 0) {
      return res.status(400).json({ message: 'Sin disciplinas' });
    }

    res.status(200).json(resultQuery);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las disciplinas', error });
  }
}

const getHorarios = async (req, res) => {
  const { disciplineID } = req.params;
  // Verificar si hay múltiples IDs o solo uno
  const idsArray = disciplineID.includes(',')
    ? disciplineID.split(',').map(id => parseInt(id.trim(), 10))
    : [parseInt(disciplineID.trim(), 10)];
  // Generar la parte de la consulta para los IDs
  const placeholders = idsArray.map(() => '?').join(',');

  const query = `SELECT 
    t.TimeID,
    t.TimeValue,
    GROUP_CONCAT(CONCAT(d.DisciplineName, ' (', dd.DayName, ')') ORDER BY dd.DayName SEPARATOR ', ') AS Disciplines
FROM 
    schedules AS s
INNER JOIN 
    disciplines AS d ON d.DisciplineID = s.DisciplineID
INNER JOIN 
    Days AS dd ON dd.DayID = s.DayID
INNER JOIN 
    Times AS t ON s.TimeID = t.TimeID
WHERE 
    d.DisciplineID IN (${placeholders})
GROUP BY 
    t.TimeID, t.TimeValue
ORDER BY 
    t.TimeID;`;
  try {
    const resultQuery = await executeQuery(query, idsArray);

    res.status(200).json(resultQuery);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener horarios', error });
  }


}

// Función para insertar un nuevo alumno y asociarlo con planes y disciplinas
const postAlumnoNuevo = async (req, res) => {
  const { name, email, enrollmentDate, plans, disciplines } = req.body;

  if (!name || !email || !enrollmentDate || !Array.isArray(plans) || !Array.isArray(disciplines)) {
    return res.status(400).json({ message: 'Todos los campos son requeridos y plans y disciplines deben ser arrays' });
  }

  const connection = await connectToDatabase();

  try {
    await connection.beginTransaction();

    // Insertar nuevo alumno
    const insertStudentQuery = `
        INSERT INTO Students (Name, Email, EnrollmentDate)
        VALUES (?, ?, ?);
      `;
    const [studentResult] = await connection.execute(insertStudentQuery, [name, email, enrollmentDate]);
    const studentID = studentResult.insertId;

    // Asociar alumno con planes
    const insertStudentPlanQuery = `
        INSERT INTO StudentPlans (StudentID, PlanID)
        VALUES (?, ?);
      `;

    for (const planID of plans) {
      await connection.execute(insertStudentPlanQuery, [studentID, planID]);
    }

    // Asociar alumno con disciplinas
    const insertStudentDisciplineQuery = `
        INSERT INTO StudentDisciplines (StudentID, DisciplineID)
        VALUES (?, ?);
      `;

    for (const disciplineID of disciplines) {
      await connection.execute(insertStudentDisciplineQuery, [studentID, disciplineID]);
    }

    // Crear recordatorio de pago
    const currentDate = new Date();
    const paymentDueDate = new Date();
    paymentDueDate.setDate(currentDate.getDate() + 30);

    const insertPaymentReminderQuery = `
      INSERT INTO PaymentReminders (StudentID, ReminderDate, PaymentDueDate)
      VALUES (?, ?, ?);
    `;

    await connection.execute(insertPaymentReminderQuery, [studentID, currentDate, paymentDueDate]);


    // Commit the transaction
    await connection.commit();
    res.status(201).json({ message: 'Alumno registrado exitosamente' });
  } catch (error) {
    // Rollback the transaction in case of error
    await connection.rollback();
    res.status(500).json({ message: 'Error al registrar el alumno', error });
  } finally {
    await connection.end();
  }
};

const getAlumnos = async (req, res) => {
  const query = `
      SELECT 
    d.DisciplineName,
    s.StudentID,
    s.Name AS StudentName,
    s.EnrollmentDate,
    pr.PaymentDueDate,
    i.Name AS InstructorName,
    p.PlanName,
    p.Price
FROM 
    Students s
INNER JOIN 
    StudentDisciplines sd ON s.StudentID = sd.StudentID
INNER JOIN 
    Disciplines d ON sd.DisciplineID = d.DisciplineID
INNER JOIN 
    StudentPlans sp ON s.StudentID = sp.StudentID
INNER JOIN 
    Plans p ON sp.PlanID = p.PlanID
INNER JOIN 
    DisciplineInstructors di ON d.DisciplineID = di.DisciplineID
INNER JOIN 
    Instructors i ON di.InstructorID = i.InstructorID
INNER JOIN 
    PaymentReminders pr ON s.StudentID = pr.StudentID
    WHERE p.planName !='Matricula'
GROUP BY 
    d.DisciplineName, s.StudentID, s.Name, s.EnrollmentDate, pr.PaymentDueDate, i.Name, p.PlanName, p.Price
ORDER BY 
    d.DisciplineName, s.Name;

    `;

  try {
    const results = await executeQuery(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los alumnos', error });
  }
};

// Mantenedor de Disciplinas
const createDisciplina = async (req, res) => {
  const { DisciplineName } = req.body;
  const query = `INSERT INTO Disciplines (DisciplineName) VALUES (?);`;
  try {
    const result = await executeQuery(queryDisciplina, [DisciplineName]);
    const disciplineId = result.insertId;
    const queryAssociation = `INSERT INTO DisciplineInstructors (DisciplineID, InstructorID) VALUES (?, ?);`;
    await executeQuery(queryAssociation, [disciplineId, InstructorID]);

    res.status(201).json({ message: 'Disciplina creada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear disciplina', error });
  }
};

const getDisciplinasMantenedor = async (req, res) => {
  const query = `SELECT 
    d.DisciplineID,
    d.DisciplineName,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'InstructorID', IFNULL(i.InstructorID, 'N/A'),
            'InstructorName', IFNULL(i.Name, 'N/A')
        )
    ) AS Instructors,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'ScheduleID', IFNULL(sc.ScheduleID, 'N/A'),
            'Day', IFNULL(days.DayName, 'N/A'),
            'Time', IFNULL(t.TimeValue, 'N/A')
        )
    ) AS Schedules
FROM 
    Disciplines d
LEFT JOIN 
    DisciplineInstructors di ON d.DisciplineID = di.DisciplineID
LEFT JOIN 
    Instructors i ON di.InstructorID = i.InstructorID
LEFT JOIN 
    Schedules sc ON d.DisciplineID = sc.DisciplineID
LEFT JOIN 
    Times t ON sc.TimeID = t.TimeID
LEFT JOIN 
    Days days ON sc.DayID = days.DayID
GROUP BY 
    d.DisciplineID, d.DisciplineName
ORDER BY 
    d.DisciplineName;`;
  try {
    const results = await executeQuery(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener disciplinas', error });
  }
};

const updateDisciplina = async (req, res) => {
  const { id } = req.params;
  const { DisciplineName } = req.body;
  const query = `UPDATE Disciplines SET DisciplineName = ? WHERE DisciplineID = ?;`;
  try {
    await executeQuery(query, [DisciplineName, id]);
    res.status(200).json({ message: 'Disciplina actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar disciplina', error });
  }
};

const deleteDisciplina = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Disciplines WHERE DisciplineID = ?;`;
  try {
    await executeQuery(query, [id]);
    res.status(200).json({ message: 'Disciplina eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar disciplina', error });
  }
};

// Mantenedor de Planes
const createPlan = async (req, res) => {
  const { PlanName, Price } = req.body;
  const query = `INSERT INTO Plans (PlanName, Price) VALUES (?, ?);`;
  try {
    await executeQuery(query, [PlanName, Price]);
    res.status(201).json({ message: 'Plan creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear plan', error });
  }
};

// Similarmente se implementan getPlanes, updatePlan, deletePlan

// Mantenedor de Instructores
const createInstructor = async (req, res) => {
  const { Name } = req.body;
  const query = `INSERT INTO Instructors (Name) VALUES (?);`;
  try {
    await executeQuery(query, [Name]);
    res.status(201).json({ message: 'Instructor creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear instructor', error });
  }
};

// Similarmente se implementan getInstructores, updateInstructor, deleteInstructor

// Mantenedor de Horarios
const createHorario = async (req, res) => {
  const { DisciplineID, DayID, TimeID, InstructorID } = req.body;
  const query = `INSERT INTO Schedules (DisciplineID, DayID, TimeID, InstructorID) VALUES (?, ?, ?, ?);`;
  try {
    await executeQuery(query, [DisciplineID, DayID, TimeID, InstructorID]);
    res.status(201).json({ message: 'Horario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear horario', error });
  }
};

// Similarmente se implementan getHorarios, updateHorario, deleteHorario

// Mantenedor de Precios de Disciplinas
const setDisciplinaPrecio = async (req, res) => {
  const { id } = req.params; // DisciplineID
  const { Price } = req.body;
  const query = `UPDATE Disciplines SET Price = ? WHERE DisciplineID = ?;`;
  try {
    await executeQuery(query, [Price, id]);
    res.status(200).json({ message: 'Precio actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar precio de la disciplina', error });
  }
};

// Asociación de Disciplinas a Instructores
const associateDisciplinaInstructor = async (req, res) => {
  const { disciplinaId, instructorId } = req.params;
  const query = `INSERT INTO DisciplineInstructors (DisciplineID, InstructorID) VALUES (?, ?);`;
  try {
    await executeQuery(query, [disciplinaId, instructorId]);
    res.status(201).json({ message: 'Disciplina asociada a instructor exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al asociar disciplina a instructor', error });
  }
};

const getDias = async (req, res) => {
  const query = `SELECT * FROM days;`;
  try {
    const result = await executeQuery(query);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener días', error });
  }
}

const getTimes = async (req, res) => {
  const query = `SELECT * FROM times;`;
  try {
    const result = await executeQuery(query);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener horarios', error });
  }
}



const getPlanes = async (req, res) => {
  const query = `SELECT * FROM plans;`;
  try {
    const result = await executeQuery(query);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener horarios', error });
  }
}
module.exports = {
  getDisciplinas,
  getDisciplinasMantenedor,
  getHorarios,
  getDias,
  getTimes,
  getPlanes,
  postAlumnoNuevo,
  getAlumnos,
  createDisciplina,
  updateDisciplina,
  deleteDisciplina,
  createPlan,
  createInstructor,
  createHorario,
  setDisciplinaPrecio,
  associateDisciplinaInstructor
};