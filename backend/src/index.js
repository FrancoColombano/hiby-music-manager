import express from 'express';
// Importo el enrutador de las rutas del HiBy
import hibyRouter from './routes/hibyRoutes.js';

const app = express();

// Mas adelante middlewares globales 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Mas adelante cors cuando conecte el frontend en React
// import cors from 'cors';
// app.use(cors({ origin: 'http://localhost:5173' }));

// Registro las rutas
app.use('/hiby', hibyRouter);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});