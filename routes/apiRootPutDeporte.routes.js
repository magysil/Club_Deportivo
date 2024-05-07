import express from 'express';
import { putPrecioDeporteHandler } from '../controller/deporteHandler.js';

const router = express.Router();

// Ruta para editar el precio de un deporte
router.put('/:id', putPrecioDeporteHandler);

export default router;