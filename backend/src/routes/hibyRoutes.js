import { Router } from 'express';
import * as hibyController from '../controllers/hibyController.js';
// Acá futuros middlewares como:
// import { validarId } from '../middlewares/validateParams.js';

const router = Router();

// Defino la ruta de prueba
router.get('/probar-conexion', hibyController.probarConexion);

// Exportamos el router usando ES Modules (reemplaza al module.exports = router)
export default router;