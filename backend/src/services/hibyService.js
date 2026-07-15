// IP del HiBy
const HIBY_IP = "http://192.168.100.203:4399";

export const obtenerHtmlInicio = async () => {
    console.log(`[Servicio] Realizando GET a ${HIBY_IP}...`);
    
    const respuesta = await fetch(HIBY_IP, {
        method: 'GET'
    });

    if (!respuesta.ok) {
        throw new Error(`El HiBy respondió con código: ${respuesta.status}`);
    }

    return await respuesta.text();
};