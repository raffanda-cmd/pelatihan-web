import type { IStudentRepository } from './student.repository.js';
import { AppError } from '../../shared/errors/app-error.js';
import { generateToken } from '../../shared/utils/jwt.utils.js';
import bcrypt from 'bcrypt'; // Pastikan bcrypt diimpor untuk validasi password
// import bcrypt from 'bcrypt'; // Gunakan ini jika password di-hash

export class LoginUseCase {
    constructor(private readonly studentRepository: IStudentRepository) {}

    async execute(input: { email: string; password: string }) {
        // 1. Cari data siswa berdasarkan email
        const studentAccount = await this.studentRepository.findByEmail(input.email);
        console.log("Data akun ditemukan:", studentAccount);
        if (!studentAccount) {
            throw new AppError('Email atau password salah', 401);
        }

        // 2. Cocokkan password menggunakan studentAccount.password (bukan student.password)
        // Jika pakai bcrypt: const isPasswordValid = await bcrypt.compare(input.password, studentAccount.password);
        const isPasswordValid = await bcrypt.compare(input.password, studentAccount.password);// <-- Diperbaiki di sini

        if (!isPasswordValid) {
            throw new AppError('Email atau password salah', 401);
        }

        // 3. Jika valid, buat token JWT
        const token = generateToken({
            id: studentAccount.id,
            email: studentAccount.email
        });

        return {
            message: 'Login berhasil',
            token,
            student: {
                id: studentAccount.id,
                nama: studentAccount.nama,
                email: studentAccount.email
            }
        };
    }
}