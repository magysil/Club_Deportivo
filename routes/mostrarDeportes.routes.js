import express from 'express';
import { mostrarDeportes } from '../controller/deporteHandler.js';
const router = express.Router();


router.get('/', mostrarDeportes)

export default router;