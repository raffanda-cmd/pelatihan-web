import app from './app.js';
import { postgres } from './infrastructure/database/postgres.js'; // Sesuaikan jalur database Anda

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // 1. Tes koneksi database PostgreSQL terlebih dahulu
        await postgres.query('SELECT 1');
        console.log('PostgreSQL connected successfully');

        // 2. Menyalakan server menggunakan app dari src/app.ts
        const server = app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        // 3. Graceful shutdown (mematikan server & koneksi database dengan aman)
        const shutdown = async () => {
            console.log('Shutting down server...');
            server.close(async () => {
                await postgres.end();
                console.log('Server and database connections closed');
                process.exit(0);
            });
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);

    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
};

startServer();