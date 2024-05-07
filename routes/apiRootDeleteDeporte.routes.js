import express from 'express';
import { deleteDeporteHandler } from '../controller/deporteHandler.js';
const router = express.Router();


router.delete('/:id', deleteDeporteHandler)

export default router;