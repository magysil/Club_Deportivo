import express from 'express';
import { postDeporteHandler } from '../controller/deporteHandler.js';
const router = express.Router();


router.post('/', postDeporteHandler)

export default router;