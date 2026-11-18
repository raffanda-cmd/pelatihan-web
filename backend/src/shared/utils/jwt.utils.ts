import 'dotenv/config';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

// Gunakan secret key dari environment variable (.env) atau string default untuk development

const JWT_SECRET: Secret = (process.env.JWT_SECRET as Secret) || 'rahasia_negara_kampus_123';
const JWT_EXPIRES_IN: SignOptions['expiresIn'] = (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '1d';

export interface JwtPayload {
    id: string;
    email: string;
}

// Fungsi untuk membuat token
export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Fungsi untuk memverifikasi token
export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
};