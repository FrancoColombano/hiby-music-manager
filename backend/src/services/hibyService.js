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

//Obtiene el listado de archivos de la SD en el path indicado
export const obtenerArchivos = async (path) => {
    const pathFinal = path || "/data/mnt/sd_0/";
    const encodedPath = encodeURIComponent(pathFinal);
    const URL = HIBY_IP + "/list?path=" + encodedPath;
    const respuesta = await fetch(URL, {
        method: 'GET'
    });

    if (!respuesta.ok) {
        throw new Error (`El HiBy respondió con código: ${respuesta.status}`);
    }
    return await respuesta.json();
};

export const crearCarpeta = async (path) => {
    const URL = HIBY_IP + "/create";
    const respuesta = await fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            path: path
        })
    });

    if (!respuesta.ok) {
        throw new Error (`El HiBy respondió con código: ${respuesta.status}`);
    }
    return await respuesta.json();
};

export const moverArchivo = async (oldPath, newPath) => {
    const URL = HIBY_IP + "/move";
    const respuesta = await fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            oldPath: oldPath,
            newPath: newPath
        })
    });

    if (!respuesta.ok) {
        throw new Error (`El HiBy respondió con código: ${respuesta.status}`);
    }
    return await respuesta.json();
};

export const eliminarArchivo = async (path) => {
    const URL = HIBY_IP + "/delete";
    const respuesta = await fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            path: path
        })
    });

    if (!respuesta.ok) {
        throw new Error (`El HiBy respondió con código: ${respuesta.status}`);
    }
    return await respuesta.json();
}