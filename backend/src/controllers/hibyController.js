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