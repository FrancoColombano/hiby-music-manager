import express from 'express';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('El backend del HiBy Manager está funcionandooo');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});