const { executeQuery } = require('../conexions/database');
const sql = require('mssql');

const createInstructor = async (req, res) => {
  const { name, email, userId } = req.body;
  const query = `INSERT INTO Instructors (Name, Email, UserID) VALUES (@name, @Email, @UserID)`;
  const params = [
    { name: 'name', type: sql.NVarChar, value: name },
    { name: 'email', type: sql.NVarChar, value: email },
    { name: 'userId', type: sql.Int, value: userId },
  ];
  try {
    await executeQuery(query, params);
    res.status(201).json({ message: 'Instructor creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear instructor', error });
  }
};

const createStudent = async (req, res) => {
  const { name, email, enrollmentDate, planId, userId } = req.body;
  const query = `INSERT INTO Students (Name, Email, EnrollmentDate, PlanID, UserID) VALUES (@name, @Email, @EnrollmentDate, @PlanID, @UserID)`;
  const params = [
    { name: 'name', type: sql.NVarChar, value: name },
    { name: 'email', type: sql.NVarChar, value: email },
    { name: 'enrollmentDate', type: sql.Date, value: enrollmentDate },
    { name: 'planId', type: sql.Int, value: planId },
    { name: 'userId', type: sql.Int, value: userId },
  ];
  try {
    await executeQuery(query, params);
    res.status(201).json({ message: 'Alumno creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear alumno', error });
  }
};

const createPlan = async (req, res) => {
  const { planName, description, price } = req.body;
  const query = `INSERT INTO Plans (PlanName, Description, Price) VALUES (@planName, @description, @price)`;
  const params = [
    { name: 'planName', type: sql.NVarChar, value: planName },
    { name: 'description', type: sql.NVarChar, value: description },
    { name: 'price', type: sql.Decimal, value: price },
  ];
  try {
    await executeQuery(query, params);
    res.status(201).json({ message: 'Plan creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear plan', error });
  }
};

const createDiscipline = async (req, res) => {
  const { disciplineName, description } = req.body;
  const query = `INSERT INTO Disciplines (DisciplineName, Description) VALUES (@disciplineName, @description)`;
  const params = [
    { name: 'disciplineName', type: sql.NVarChar, value: disciplineName },
    { name: 'description', type: sql.NVarChar, value: description },
  ];
  try {
    await executeQuery(query, params);
    res.status(201).json({ message: 'Disciplina creada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear disciplina', error });
  }
};

const updateInstructor = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const query = `UPDATE Instructors SET Name = @name, Email = @Email WHERE InstructorID = @id`;
  const params = [
    { name: 'name', type: sql.NVarChar, value: name },
    { name: 'email', type: sql.NVarChar, value: email },
    { name: 'id', type: sql.Int, value: id },
  ];
  try {
    await executeQuery(query, params);
    res.status(200).json({ message: 'Instructor actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar instructor', error });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, enrollmentDate, planId } = req.body;
  const query = `UPDATE Students SET Name = @name, Email = @Email, EnrollmentDate = @EnrollmentDate, PlanID = @PlanID WHERE StudentID = @id`;
  const params = [
    { name: 'name', type: sql.NVarChar, value: name },
    { name: 'email', type: sql.NVarChar, value: email },
    { name: 'enrollmentDate', type: sql.Date, value: enrollmentDate },
    { name: 'planId', type: sql.Int, value: planId },
    { name: 'id', type: sql.Int, value: id },
  ];
  try {
    await executeQuery(query, params);
    res.status(200).json({ message: 'Alumno actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar alumno', error });
  }
};

const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { planName, description, price } = req.body;
  const query = `UPDATE Plans SET PlanName = @planName, Description = @description, Price = @price WHERE PlanID = @id`;
  const params = [
    { name: 'planName', type: sql.NVarChar, value: planName },
    { name: 'description', type: sql.NVarChar, value: description },
    { name: 'price', type: sql.Decimal, value: price },
    { name: 'id', type: sql.Int, value: id },
  ];
  try {
    await executeQuery(query, params);
    res.status(200).json({ message: 'Plan actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar plan', error });
  }
};

const updateDiscipline = async (req, res) => {
  const { id } = req.params;
  const { disciplineName, description } = req.body;
  const query = `UPDATE Disciplines SET DisciplineName = @disciplineName, Description = @description WHERE DisciplineID = @id`;
  const params = [
    { name: 'disciplineName', type: sql.NVarChar, value: disciplineName },
    { name: 'description', type: sql.NVarChar, value: description },
    { name: 'id', type: sql.Int, value: id },
  ];
  try {
    await executeQuery(query, params);
    res.status(200).json({ message: 'Disciplina actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar disciplina', error });
  }
};

const deleteInstructor = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Instructors WHERE InstructorID = @id`;
  const params = [
    { name: 'id', type: sql.Int, value: id },
  ];
  try {
    await executeQuery(query, params);
    res.status(200).json({ message: 'Instructor eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar instructor', error });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Students WHERE StudentID = @id`;
  const params = [
    { name: 'id', type: sql.Int, value: id },
  ];
  try {
    await executeQuery(query, params);
    res.status(200).json({ message: 'Alumno eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar alumno', error });
  }
};

const deletePlan = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Plans WHERE PlanID = @id`;
  const params = [
    { name: 'id', type: sql.Int, value: id },
  ];
  try {
    await executeQuery(query, params);
    res.status(200).json({ message: 'Plan eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar plan', error });
  }
};

const deleteDiscipline = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Disciplines WHERE DisciplineID = @id`;
  const params = [
    { name: 'id', type: sql.Int, value: id },
  ];
  try {
    await executeQuery(query, params);
    res.status(200).json({ message: 'Disciplina eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar disciplina', error });
  }
};

module.exports = {
    createInstructor,
    createStudent,
    createPlan,
    createDiscipline,
    updateInstructor,
    updateStudent,
    updatePlan,
    updateDiscipline,
    deleteInstructor,
    deleteStudent,
    deletePlan,
    deleteDiscipline,
  };