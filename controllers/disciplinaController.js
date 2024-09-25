const { executeQuery } = require('../conexions/database');

const getDisciplinas = async (req, res) => {
    const query = `CALL ams_gym.obtener_disciplinas()`;
    try {
      const [rows] = await executeQuery(query);
   // Transformar los resultados en el formato JSON deseado
   const result = [];
   const disciplinaMap = {};

   rows.forEach(row => {
       const { disciplina_id, disciplina_nombre, disciplina_descripcion, instructor_id, instructor_nombre, horario, dia_nombre } = row;
       
       if (!disciplinaMap[disciplina_id]) {
           disciplinaMap[disciplina_id] = {
               id: disciplina_id,
               nombre: disciplina_nombre,
               descripcion: disciplina_descripcion,
               instructores: [],
               horario: []
           };
       }

       // Agregar instructores únicos
       if (instructor_id && !disciplinaMap[disciplina_id].instructores.find(i => i.id === instructor_id)) {
           disciplinaMap[disciplina_id].instructores.push({
               id: instructor_id,
               nombre: instructor_nombre
           });
       }

       // Agregar horarios y días
       const horarioExistente = disciplinaMap[disciplina_id].horario.find(h => h.hora.includes(horario));
       if (!horarioExistente) {
           disciplinaMap[disciplina_id].horario.push({
               hora: [horario],
               dias: [dia_nombre]
           });
       } else {
           if (!horarioExistente.dias.includes(dia_nombre)) {
               horarioExistente.dias.push(dia_nombre);
           }
       }
   });

   // Convertir el mapa a un array
   for (const disciplinaId in disciplinaMap) {
       result.push({ disciplina: disciplinaMap[disciplinaId] });
   }

   res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las disciplinas', error });
    }
  }
  

  async function agregarDisciplina(req, res) {
    const { disciplina, descripcion, dias, horarios, instructores } = req.body;
    console.log(req.body);
    try {
          // Convertir listas a JSON
          const diasJson = JSON.stringify(dias);
          const instructoresJson = JSON.stringify(instructores);

          console.log(diasJson);
          console.log(instructoresJson);
        // Llamar al procedimiento almacenado
       await executeQuery(
            `CALL agregar_disciplina(?, ?, ?, ?, ?)`,
            [disciplina, descripcion, diasJson, horarios, instructoresJson]
        );

        // Responder con el resultado
        res.status(200).json({
            message: 'Disciplina agregada con éxito'
        });
    } catch (error) {
        console.error('Error al agregar la disciplina:', error);
        res.status(500).json({
            message: 'Error al agregar la disciplina',
            error: error.message
        });
    }
}

const updateDisciplina = async (req, res) => {
    const disciplinaId = req.params.id;
    const { nombre, descripcion, dias, horarios, instructores } = req.body;
  
    if (!nombre || !descripcion || !dias || !horarios || !instructores) {
      return res.status(400).json({ message: 'Todos los campos son requeridos: nombre, descripcion, dias, horarios, instructores' });
    }
  
    const query = `CALL actualizar_disciplina(?, ?, ?, ?, ?, ?);`;
  
    try {
      // Convert arrays to JSON strings
      const diasJson = JSON.stringify(dias);
      const horariosJson = JSON.stringify(horarios);
      const instructoresJson = JSON.stringify(instructores);
  
      await executeQuery(query, [disciplinaId, nombre, descripcion, diasJson, horariosJson, instructoresJson]);
  
      res.status(200).json({ message: 'Disciplina actualizada exitosamente' });
    } catch (error) {
      console.error('Error al actualizar la disciplina:', error);
      res.status(500).json({
        message: 'Error al actualizar la disciplina',
        error: error.message
      });
    }
  };
  

const deleteDisciplina = async (req, res) => {
    const disciplinaId = req.params.id;
  
    const query = `CALL eliminar_disciplina(?);`;
    
    try {
      await executeQuery(query, [disciplinaId]);
  
      res.status(200).json({ message: 'Disciplina eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar la disciplina:', error);
      res.status(500).json({
        message: 'Error al eliminar la disciplina',
        error: error.message
      });
    }
  };

  
  module.exports = {
    getDisciplinas,
    agregarDisciplina,
    updateDisciplina,
    deleteDisciplina
  }