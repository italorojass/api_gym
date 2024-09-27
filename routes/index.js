const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const instructorController = require('../controllers/instructorController');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');
const mantenedorController = require('../controllers/mantenedorController');
const dashboardController = require('../controllers/dashboardController');
const disciplinaController = require('../controllers/disciplinaController');

const { authenticate, authorize,isAdmin  } = require('../middleware/authMiddleware');



// Rutas de autenticación
router.post('/login', authController.login);
router.post('/register', authController.register);

// Rutas KEYS Mantendor
router.get('/keys/disciplinas',authenticate,disciplinaController.getDisciplinas);
router.get('/keys/comunas/',authenticate,mantenedorController.getComunas);
//Globales
router.post('/alumno', authenticate, mantenedorController.postAlumnoNuevo);
router.get('/alumno', authenticate, mantenedorController.getAlumnos);
router.delete('/alumno/:id', authenticate, mantenedorController.deleteAlumno);

// Rutas para Disciplinas (solo admin puede crear, actualizar, eliminar)
router.post('/disciplinas', authenticate, isAdmin, disciplinaController.agregarDisciplina);
router.get('/disciplinas', authenticate, disciplinaController.getDisciplinas);
router.put('/disciplinas/:id', authenticate, isAdmin, disciplinaController.updateDisciplina);
router.delete('/disciplinas/:id', authenticate, isAdmin, disciplinaController.deleteDisciplina);


router.get('/dias', authenticate, mantenedorController.getDias);
//router.get('/times', authenticate, mantenedorController.getTimes);

router.get('/estadisticas', authenticate, dashboardController.getEstadisticasPorDisciplina);


// Rutas para Instructores (solo admin puede crear, actualizar, eliminar)
router.post('/instructores', authenticate, isAdmin, instructorController.postInstructors);
router.get('/instructores', authenticate, instructorController.getInstructores2);

//router.put('/instructores/:id', authenticate, isAdmin, mantenedorController.updateInstructor);
//router.delete('/instructores/:id', authenticate, isAdmin, mantenedorController.deleteInstructor);

// Rutas para Planes (solo admin puede crear, actualizar, eliminar)

router.get('/planes', authenticate, mantenedorController.getPlanes);
router.post('/planes', authenticate, isAdmin, mantenedorController.createPlan);
router.delete('/planes/:id', authenticate, mantenedorController.deletePlan);
router.put('/planes/:id', authenticate, isAdmin, mantenedorController.updatePlan);



// Rutas para Horarios (solo admin puede crear, actualizar, eliminar)
router.post('/horarios', authenticate, isAdmin, mantenedorController.createHorario);
router.get('/horarios', authenticate, mantenedorController.getHorarioTabla);
/* router.put('/horarios/:id', authenticate, isAdmin, mantenedorController.updateHorario);
router.delete('/horarios/:id', authenticate, isAdmin, mantenedorController.deleteHorario);
 */
/* 
// Ruta para asociar Disciplinas a Instructores (solo admin puede asociar)
router.post('/disciplinas/:disciplinaId/instructores/:instructorId', authenticate, isAdmin, mantenedorController.associateDisciplinaInstructor); */

module.exports = router;
