import express from 'express'

import { PORT } from './config.js';
import { sequelize } from './db.js';

import './models/Book.js'

import bookRoutes from './routes/pruebas.routes.js';

const app= express();


try {
    app.listen(PORT);
    app.use(bookRoutes);
    app.use(express.json()); // 1. Middleware para interpretar JSON en req.body (¡Indispensable!)
    
    await sequelize.sync();

    console.log(`El servidor esta escuchando el puerto ${PORT}`);
    
} catch (error) {
    console.log(`Hubo un error en la inicializacion`, error);
    
}
