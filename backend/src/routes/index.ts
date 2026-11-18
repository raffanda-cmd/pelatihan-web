import { Router } from 'express';
import { studentRoutes } from '../modules/user/student.module.js';

const router = Router();

// 1. Endpoint tes & health check umum
router.get('/test', (req, res) => {
    res.json({ message: 'API Day-7 is running!' });
});

router.get('/ping', (req, res) => {
    res.status(200).json({ success: true, message: 'pong' });
});

// 2. Semua rute mahasiswa (Register, Login, GET, PUT, DELETE) 
// diserahkan sepenuhnya ke studentRoutes yang sudah modular
router.use('/students', studentRoutes);

export default router;