const { executeQuery } = require('../conexions/database');
const { connectToDatabase } = require('../conexions/database');





// Función para insertar un nuevo alumno y asociarlo con planes y disciplinas
const postAlumnoNuevo = async (req, res) => {
   const { nombre, apellido, email, telefono, telefono_emergencia, direccion, comuna, disciplina, plan, observaciones, fecha_registro } = req.body;
   try {
    // Convertir el array de disciplinas a JSON
    const disciplinasJson = JSON.stringify(disciplina);

   await executeQuery(
        `CALL crear_alumno(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @nuevo_alumno_id)`,
        [nombre, apellido, email, telefono, telefono_emergencia, direccion, comuna, disciplinasJson, plan, observaciones, fecha_registro]
    );


      /*   // Obtener el nuevo ID del alumno registrado
        const [rows] = await executeQuery(`SELECT @nuevo_alumno_id AS alumno_id`);
        const nuevoAlumnoId = rows[0].alumno_id;

        // Ahora registrar un pago para el nuevo alumno
        const monto_pago_inicial = 100; // O el monto que necesites para el pago inicial
        await connection.execute(
            `CALL registrar_pago(?, ?)`,
            [nuevoAlumnoId, monto_pago_inicial],
            
        ); */

    res.status(200).json({
        message: 'Alumno creado y asociado a las disciplinas con éxito'
    });
} catch (error) {
    console.error('Error al crear alumno:', error);
    res.status(500).json({
        message: 'Error al crear alumno',
        error: error.message
    });
} 

};

const registrarPago = async(req,res)=>{
  const { alumno_id, monto_pago } = req.body;

  try {
    const [result] = await connection.execute(
        `CALL registrar_pago(?, ?)`,
        [alumno_id, monto_pago]
    );

    res.status(200).json({
        message: 'Pago registrado con éxito y fecha de renovación actualizada',
        data: result
    });
} catch (error) {
    console.error('Error al registrar pago:', error);
    res.status(500).json({
        message: 'Error al registrar pago',
        error: error.message
    });
} 

}

const getAlumnos = async (req, res) => {
  const query = `CALL obtener_alumnos_inscritos()`;

  try {
    const [results] = await executeQuery(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los alumnos', error });
  }
};



const getComunas = async (req, res) => {
 
  const query = `call obtener_comunas_por_region()`;
  
  try {
    const [results] = await executeQuery(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener comunas', error : error.message });
  }
};


// Mantenedor de Planes
const createPlan = async (req, res) => {
  const { plan, tipo,precio } = req.body;
  const query = `call agregar_plan(?,?,?)`;
  try {
    await executeQuery(query, [plan, tipo,precio]);
    res.status(201).json({ message: 'Plan creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear plan', error });
  }
};

const deletePlan = async (req,res) =>{
  const  id  = req.params.id;
  const query = `call eliminar_plan(?)`;
  try {
    await executeQuery(query, [id]);
    res.status(201).json({ message: 'Plan eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar plan', error });
  }
}

const updatePlan = async (req,res) =>{
  const { precio } = req.body;
  const planId = req.params.id;
 
  const query = `call actualizar_plan(?,?)`;
  try {
    await executeQuery(query, [planId,precio]);
    res.status(201).json({ message: 'Plan actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar plan', error });
  }
}
// Similarmente se implementan getPlanes, updatePlan, deletePlan



// Similarmente se implementan getInstructores, updateInstructor, deleteInstructor

// Mantenedor de Horarios
const createHorario = async (req, res) => {
  const { dias, horas } = req.body;
    // Convertir la lista de días a JSON
    
    const diasJson = JSON.stringify(dias);

    console.log(diasJson);

  try {
    for (const dia_id of dias) {
      await executeQuery(
        `CALL crear_horario(?, ?)`,
        [dia_id, horas]
    );
    }
    

  res.status(200).json({
    message: 'Horario creado con éxito',
    //data: results
});
  } catch (error) {
    res.status(500).json({ message: 'Error al crear horario', error });
  }
};

// Similarmente se implementan getHorarios, updateHorario, deleteHorario




const getDias = async (req, res) => {
  const query = `call obtener_dias_ordenados()`;
  try {
    const [result] = await executeQuery(query);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener días', error });
  }
}

const getHorarioTabla = async (req, res) => {
 
  try {
    const [result] = await executeQuery(`CALL obtener_horarios_mantenedor()`);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener horarios', error });
  }
}



const getPlanes = async (req, res) => {
  const query = `CALL obtener_planes();`;
  try {
    const [result] = await executeQuery(query);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener horarios', error });
  }
}

const deleteAlumno = async (req,res) =>{
  const  id  = req.params.id;
  const query = `call eliminar_alumno(?)`;
  try {
    await executeQuery(query, [id]);
    res.status(201).json({ message: 'Plan eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar plan', error });
  }
}


module.exports = {
  deleteAlumno,
  getComunas,
  getHorarioTabla,
  getDias,
  registrarPago,
  //planes
  createPlan,
  getPlanes,
  deletePlan,
  updatePlan,
  //planes
  postAlumnoNuevo,
  getAlumnos,
  createHorario,
};