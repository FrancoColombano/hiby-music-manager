import { Router } from 'express';
import * as hibyController from '../controllers/hibyController.js';
// Acá futuros middlewares como:
// import { validarId } from '../middlewares/validateParams.js';

const router = Router();

router.get('/probar-conexion', hibyController.probarConexion);
router.get('/files', hibyController.listarCanciones);
router.post('/files', hibyController.crearCarpeta);

// Exportamos el router usando ES Modules (reemplaza al module.exports = router)
export default router;