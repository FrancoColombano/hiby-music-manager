import axios from 'axios';
import FormData from 'form-data'; 
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
};

/**export const subirArchivo = async (path, relativePath, archivoBuffer, nombreArchivo, mimeType) => {
    const URL = `${HIBY_IP}/upload`;
    
    const formData = new FormData();
    formData.append('path', path);
    formData.append('relativePath', relativePath);
    
    // Creamos un archivo real en memoria usando la clase File nativa de Node.js
    // Esto ayuda a que fetch sepa exactamente qué tamaño tiene y cómo transmitirlo
    const file = new File([archivoBuffer], nombreArchivo, { type: mimeType });
    
    formData.append('files[]', file);

    const respuesta = await fetch(URL, {
        method: 'POST',
        body: formData
        // Nota: No agregamos cabeceras (headers), fetch las genera con los límites correctos de FormData
    });

    if (!respuesta.ok) {
        throw new Error(`Error al subir archivo al HiBy: ${respuesta.statusText}`);
    }

    return await respuesta.json();
};*/

/*export const subirArchivo = async (path, relativePath, archivoBuffer, nombreArchivo) => {
    const URL = `${HIBY_IP}/upload`;

    const formData = new FormData();
    formData.append('path', path);
    formData.append('relativePath', relativePath);

    //const fileBlob = new Blob([archivoBuffer]);
    //formData.append('files[]', fileBlob, nombreArchivo);
    const file = new File([archivoBuffer], nombreArchivo, { type: 'application/octet-stream' });
    formData.append('files[]', file); // No hace falta pasarle el nombre al append si ya es un File
    try {
        const respuesta = await axios.post(URL, formData, {
            // ESTA ES LA LÍNEA MÁGICA: Permite ignorar las cabeceras mal formadas del HiBy
            insecureHTTPParser: true, 
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            timeout: 300000 
        });

        return respuesta.data;
    } catch (error) {
        const mensajeError = error.response ? JSON.stringify(error.response.data) : error.message;
        throw new Error(`Error en la transmisión al HiBy: ${mensajeError}`);
    }
};*/

/*export const subirArchivo = async (path, relativePath, archivoBuffer, nombreArchivo) => {
    const URL = `${HIBY_IP}/upload`;

    const formData = new FormData();
    formData.append('path', path);
    formData.append('relativePath', relativePath);

    // Pasamos el buffer directamente y le configuramos las opciones del archivo de manera explícita
    formData.append('files[]', archivoBuffer, {
        filename: nombreArchivo,
        contentType: 'application/octet-stream' // O el tipo de archivo correspondiente
    });

    try {
        const respuesta = await axios.post(URL, formData, {
            // Obtenemos los headers correctos calculados por la librería form-data (incluye el boundary perfecto)
            headers: {
                ...formData.getHeaders()
            },
            insecureHTTPParser: true, 
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            timeout: 300000 
        });

        return respuesta.data;
    } catch (error) {
        const mensajeError = error.response ? JSON.stringify(error.response.data) : error.message;
        throw new Error(`Error en la transmisión al HiBy: ${mensajeError}`);
    }
};**/

/**export const subirArchivo = async (path, relativePath, archivoBuffer, nombreArchivo, mimeType) => {
    const URL = `${HIBY_IP}/upload`;

    const formData = new FormData();
    
    // 1. Agregamos los campos de texto exactamente en el mismo orden que el navegador
    formData.append('path', path);
    formData.append('relativePath', relativePath);

    // 2. Agregamos el archivo dándole TODA la metadata que un navegador le daría.
    // Usamos options para forzar que el parser del HiBy sepa qué tamaño y tipo de archivo esperar.
    formData.append('files[]', archivoBuffer, {
        filename: nombreArchivo,
        contentType: mimeType || 'application/octet-stream',
        knownLength: archivoBuffer.length // Esto le dice al header multipart el tamaño exacto del archivo
    });

    try {
        const respuesta = await axios.post(URL, formData, {
            headers: {
                ...formData.getHeaders() // Esto inyecta el multipart/form-data con el boundary correcto
            },
            insecureHTTPParser: true, 
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            timeout: 300000 
        });

        return respuesta.data;
    } catch (error) {
        const mensajeError = error.response ? JSON.stringify(error.response.data) : error.message;
        throw new Error(`Error en la transmisión al HiBy: ${mensajeError}`);
    }
};*/

import http from 'http';

import { URL as NodeURL } from 'url';

export const subirArchivo = (path, relativePath, archivoBuffer, nombreArchivo) => {
    crearCarpeta(path);
    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('path', path);
        form.append('relativePath', relativePath);
        form.append('files[]', archivoBuffer, {
            filename: nombreArchivo,
            contentType: 'application/octet-stream',
        });

        const targetUrl = new NodeURL(`${HIBY_IP}/upload`);

        // Calculamos el Content-Length ANTES de mandar nada,
        // igual que hace el navegador (sin chunked)
        form.getLength((err, length) => {
            if (err) return reject(err);

            const options = {
                method: 'POST',
                hostname: targetUrl.hostname,
                port: targetUrl.port || 80,
                path: targetUrl.pathname,
                headers: {
                    ...form.getHeaders(),
                    'Content-Length': length,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                },
                insecureHTTPParser: true,
            };

            const req = http.request(options, (res) => {
                const chunks = [];
                res.on('data', (chunk) => chunks.push(chunk));
                res.on('end', () => {
                    const body = Buffer.concat(chunks).toString('utf8');
                    let parsed;
                    try {
                        parsed = JSON.parse(body);
                    } catch {
                        parsed = body;
                    }

                    // Importante: ahora sí propagamos el status real del HiBy
                    if (res.statusCode >= 400) {
                        return reject(new Error(`HiBy respondió ${res.statusCode}: ${body}`));
                    }
                    resolve(parsed);
                });
            });

            req.on('error', reject);
            form.pipe(req);
        });
    });
};