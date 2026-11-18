import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './routes/index.js';
import { AppError } from './shared/errors/app-error.js';


const app = express();

app.use(helmet());

// Gunakan satu konfigurasi CORS yang spesifik untuk frontend Vite Anda
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://192.168.31.81:5173' // IP frontend Anda saat ini
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Health check (BERDIRI SENDIRI, TIDAK MEMBUNGKUS RUTE LAIN)
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running'
    });
});

// API routes (Semua rute modular Anda ditangani di sini, misal ./routes/index.js)
app.use('/api/v1', apiRoutes);

// Not found
app.use((req, res, next) => {
    next(
        new AppError('Endpoint tidak ditemukan', 404)
    );
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("GLOBAL ERROR HANDLER:", err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

export default app;