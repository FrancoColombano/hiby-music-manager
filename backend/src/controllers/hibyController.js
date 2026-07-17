import * as hibyService from '../services/hibyService.js';

//Endpoint para verificar que el backend puede comunicarse con el HiBy.

export const probarConexion = async (req, res) => {
    try {
        console.log('[Controlador] Procesando petición de prueba...');
        
        //llamo al servicio
        const html = await hibyService.obtenerHtmlInicio();
        
        console.log('[Controlador] Respuesta del servicio exitosa.');
        res.set('Content-Type', 'text/html');
        return res.send(html);
        
    } catch (error) {
        console.error('[Controlador] Error en probarConexion:', error.message);
        
        return res.status(500).json({ 
            error: "No se pudo conectar al HiBy. ¿Está encendido y en la misma red Wi-Fi?",
            detalles: error.message 
        });
    }
};

export const listarCanciones = async (req, res) => {
    try {
        const path = req.query.path;
        const canciones = await hibyService.obtenerArchivos(path);
        return res.json(canciones);

    } catch (error) {     
        return res.status(500).json({ 
            error: "No se pudo listar las canciones",
            detalles: error.message 
        });
    }
};

export const crearCarpeta = async (req, res) => {
    try {
        const path = req.body.path;
        const carpeta = await hibyService.crearCarpeta(path);
        return res.json(carpeta);
    } catch (error) {
        return res.status(500).json({ 
            error: "No se pudo crear la carpeta",
            detalles: error.message 
        });
    }
};

export const moverArchivo = async (req, res) => {
    try {
        const oldPath = req.body.oldPath;
        const newPath = req.body.newPath;
        const archivo = await hibyService.moverArchivo(oldPath, newPath);
        return res.json(archivo);
    } catch (error) {
        return res.status(500).json({ 
            error: "No se pudo mover la carpeta o archivo",
            detalles: error.message 
        });
    }
};

export const eliminarArchivo = async (req, res) => {
    try {
        const path = req.body.path;
        const archivo = await hibyService.eliminarArchivo(path);
        return res.json(archivo)
    } catch (error) {
        return res.status(500).json({ 
            error: "No se pudo eliminar la carpeta o archivo",
            detalles: error.message 
        });
    }
};

/**export const subirArchivo = async (req, res) => {
    try {
        // req.file es inyectado automáticamente por el middleware de multer
        if (!req.file) {
            return res.status(400).json({ error: 'No se recibió ningún archivo en la petición' });
        }

        const { path, relativePath } = req.body;
        const { buffer, originalname, mimetype } = req.file;

        if (!path || !relativePath) {
            return res.status(400).json({ error: 'Los campos path y relativePath son obligatorios' });
        }

        // Llamamos al servicio para retransmitir todo al HiBy
        const resultado = await hibyService.subirArchivo(
            path,
            relativePath,
            buffer,
            originalname,
            mimetype
        );

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/

export const subirArchivo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se recibió ningún archivo en la petición' });
        }

        const { path, relativePath } = req.body;
        const { buffer, originalname } = req.file;

        if (!path || !relativePath) {
            return res.status(400).json({ error: 'Los campos path y relativePath son obligatorios' });
        }

        // Llamamos al servicio con los parámetros necesarios
        const resultado = await hibyService.subirArchivo(
            path,
            relativePath,
            buffer,
            originalname
        );

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

     /*   try {
            await hibyService.crearCarpeta(path)
        } catch (error) {
            console.log(`[Upload] Nota: La carpeta ya existía o no se pudo crear: ${error.message}`);            
        }
*/
/**export const subirArchivo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se recibió ningún archivo en la petición' });
        }

        const { path, relativePath } = req.body;
        const { buffer, originalname, mimetype } = req.file; // Extraemos mimetype

        if (!path || !relativePath) {
            return res.status(400).json({ error: 'Los campos path y relativePath son obligatorios' });
        }

        const resultado = await hibyService.subirArchivo(
            path,
            relativePath,
            buffer,
            originalname,
            mimetype // Lo pasamos como quinto parámetro
        );

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/