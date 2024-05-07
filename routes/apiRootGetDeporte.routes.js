import express from 'express';
import { getDeporteHandler } from '../controller/deporteHandler.js';
const router = express.Router();


router.get('/', getDeporteHandler)

export default router;