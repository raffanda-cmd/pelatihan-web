import type { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt.utils.js';
import { AppError } from '../errors/app-error.js';

// Perluas tipe Request Express agar bisa menyimpan data user yang sedang login
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authenticateJwt = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('Token akses tidak ditemukan atau tidak valid', 401);
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        // Simpan payload user ke objek request agar bisa dipakai di handler berikutnya
        req.user = decoded;
        next();
    } catch (error) {
        next(new AppError('Autentikasi gagal: Token tidak valid atau kadaluarsa', 401));
    }
};