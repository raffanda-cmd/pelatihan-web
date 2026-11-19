import type { IStudentRepository } from './student.repository.js';

import type {
    Student,
    StudentRecord,
    CreateStudentInput
} from './student.model.js';
import bcrypt from 'bcrypt'; // Pastikan bcrypt diimpor untuk validasi password
import { AppError } from '../../shared/errors/app-error.js';

// ==========================================
// 1. REGISTER STUDENT USE CASE
// ==========================================

export class RegisterStudentUseCase {

    constructor(
        private readonly studentRepository: IStudentRepository
    ) {}

    async execute(
        input: CreateStudentInput
    ): Promise<Student> {
        const hashedPassword = await bcrypt.hash(input.password.trim(), 10);
        const student = await this.studentRepository.create({
            nim: input.nim.trim(),
            nama: input.nama.trim(),
            email: input.email.trim(),
            password: hashedPassword, // Catatan: Sebaiknya password di-hash (misal pakai bcrypt) sebelum disimpan
            tanggalLahir: input.tanggalLahir,
            jurusan: input.jurusan.trim(),
            alamat: input.alamat.trim(),
            createdBy: input.createdBy || 'system', // Diisi string (misal dari input atau default 'system')
    
        });

        return student;
    }
}

// ==========================================
// 2. GET STUDENT BY ID USE CASE
// ==========================================

export class GetStudentByIdUseCase {

    constructor(
        private readonly studentRepository: IStudentRepository
    ) {}

    async execute(
        id: string
    ): Promise<StudentRecord> {

        const student = await this.studentRepository.findById(id);

        if (!student) {
            throw new AppError(
                'Siswa tidak ditemukan',
                404
            );
        }

        return student;
    }
}
   // ==========================================
// 3. update STUDENTS USE CASE
// ==========================================
export class UpdateStudentUseCase {
    constructor(private readonly studentRepository: IStudentRepository) {}

    async execute(id: string, input: Partial<CreateStudentInput>) {
        const existingStudent = await this.studentRepository.findById(id);
        if (!existingStudent) {
            throw new AppError('Data siswa tidak ditemukan', 404);
        }

        await this.studentRepository.update(id, input);
        return { message: 'Data siswa berhasil diperbarui' };
    }
}
   // ==========================================
// 4. delete STUDENTS USE CASE
// ==========================================
export class DeleteStudentUseCase {
    constructor(private readonly studentRepository: IStudentRepository) {}

    async execute(id: string) {
        const existingStudent = await this.studentRepository.findById(id);
        if (!existingStudent) {
            throw new AppError('Data siswa tidak ditemukan', 404);
        }

        await this.studentRepository.delete(id);
        return { message: 'Data siswa berhasil dihapus' };
    }
    // ==========================================
// 5. GET ALL STUDENTS USE CASE
// ==========================================
}
export class GetAllStudentsUseCase {

    constructor(
        private readonly studentRepository: IStudentRepository
    ) {}

    async execute(): Promise<StudentRecord[]> {

        const students = await this.studentRepository.findAll();

        return students;
    }
}