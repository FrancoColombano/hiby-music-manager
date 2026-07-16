import { Router } from 'express';
import * as hibyController from '../controllers/hibyController.js';
// Acá futuros middlewares como:
// import { validarId } from '../middlewares/validateParams.js';

const router = Router();

router.get('/probar-conexion', hibyController.probarConexion);
//Obtiene la lista de archivos
router.get('/files', hibyController.listarCanciones);
//Crea carpeta
router.post('/files', hibyController.crearCarpeta);
//Mueve archivo o carpeta
router.post('/files/move', hibyController.moverArchivo);
//Elimina archivo o carpeta
router.post('/files/delete', hibyController.eliminarArchivo);

// Exportamos el router usando ES Modules (reemplaza al module.exports = router)
export default router;