import express from 'express';
const router = express.Router();

import { vistaHome } from '../controller/vistaHome.js';

router.get('/', vistaHome)

export default router;