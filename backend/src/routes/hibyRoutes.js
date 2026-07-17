import { Router } from 'express';
import * as hibyController from '../controllers/hibyController.js';
import multer from 'multer';
// Acá futuros middlewares como:
// import { validarId } from '../middlewares/validateParams.js';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/probar-conexion', hibyController.probarConexion);

//Obtiene la lista de archivos
router.get('/files', hibyController.listarCanciones);

//Crea carpeta
router.post('/files', hibyController.crearCarpeta);

//Mueve archivo o carpeta
router.post('/files/move', hibyController.moverArchivo);

//Elimina archivo o carpeta
router.post('/files/delete', hibyController.eliminarArchivo);

//Sube archivos
// El nombre del campo en 'upload.single()' tiene que coincidir exactamente con el campo que envíe el cliente
router.post('/files/upload', upload.single('files[]'), hibyController.subirArchivo);

// Exportamos el router usando ES Modules (reemplaza al module.exports = router)
export default router;




// Configuramos multer para almacenar temporalmente el archivo en la memoria RAM
