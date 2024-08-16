const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const instructorController = require('../controllers/instructorController');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');
const mantenedorController = require('../controllers/mantenedorController');
const dashboardController = require('../controllers/dashboardController');

const { authenticate, authorize,isAdmin  } = require('../middleware/authMiddleware');



// Rutas de autenticación
router.post('/login', authController.login);
router.post('/register', authController.register);

// Rutas KEYS Mantendor
router.get('/keys/disciplinas',authenticate,mantenedorController.getDisciplinas);
router.get('/keys/horarios/:disciplineID',authenticate,mantenedorController.getHorarios);

//Globales
router.post('/alumno', authenticate, mantenedorController.postAlumnoNuevo);
router.get('/alumno', authenticate, mantenedorController.getAlumnos);

// Rutas para Disciplinas (solo admin puede crear, actualizar, eliminar)
router.post('/disciplinas', authenticate, isAdmin, mantenedorController.createDisciplina);
router.get('/disciplinas', authenticate, mantenedorController.getDisciplinas);
router.get('/disciplinasMantenedor', authenticate, mantenedorController.getDisciplinasMantenedor);

router.put('/disciplinas/:id', authenticate, isAdmin, mantenedorController.updateDisciplina);
router.delete('/disciplinas/:id', authenticate, isAdmin, mantenedorController.deleteDisciplina);


router.get('/dias', authenticate, mantenedorController.getDias);
router.get('/times', authenticate, mantenedorController.getTimes);

router.get('/estadisticas', authenticate, dashboardController.getEstadisticasPorDisciplina);

// Rutas para Instructores (solo admin puede crear, actualizar, eliminar)
//router.post('/instructores', authenticate, isAdmin, mantenedorController.createInstructor);
router.get('/instructores', authenticate, instructorController.getInstructores);
//router.put('/instructores/:id', authenticate, isAdmin, mantenedorController.updateInstructor);
//router.delete('/instructores/:id', authenticate, isAdmin, mantenedorController.deleteInstructor);

/* 
// Rutas para Planes (solo admin puede crear, actualizar, eliminar)
router.post('/planes', authenticate, isAdmin, mantenedorController.createPlan);
router.get('/planes', authenticate, mantenedorController.getPlanes);
router.put('/planes/:id', authenticate, isAdmin, mantenedorController.updatePlan);
router.delete('/planes/:id', authenticate, isAdmin, mantenedorController.deletePlan);



// Rutas para Horarios (solo admin puede crear, actualizar, eliminar)
router.post('/horarios', authenticate, isAdmin, mantenedorController.createHorario);
router.get('/horarios', authenticate, mantenedorController.getHorarios);
router.put('/horarios/:id', authenticate, isAdmin, mantenedorController.updateHorario);
router.delete('/horarios/:id', authenticate, isAdmin, mantenedorController.deleteHorario);

// Rutas para Precios de Disciplinas (solo admin puede actualizar)
router.post('/disciplinas/:id/precio', authenticate, isAdmin, mantenedorController.setDisciplinaPrecio);
router.put('/disciplinas/:id/precio', authenticate, isAdmin, mantenedorController.updateDisciplinaPrecio);

// Ruta para asociar Disciplinas a Instructores (solo admin puede asociar)
router.post('/disciplinas/:disciplinaId/instructores/:instructorId', authenticate, isAdmin, mantenedorController.associateDisciplinaInstructor); */

module.exports = router;
