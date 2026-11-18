import type {
    CreateStudentInput,
    Student,
    StudentRecord
} from './student.model.js';

export interface IStudentRepository {
    // Mencari siswa berdasarkan email (untuk login)
    findByEmail(
        email: string
    ): Promise<StudentRecord | null>;

    // Mencari siswa berdasarkan ID
    findById(
        id: string
    ): Promise<StudentRecord | null>;

    // Menambahkan data siswa
    create(
        data: CreateStudentInput
    ): Promise<Student>;

    // Memperbarui data siswa
    update(
        id: string,
        data: Partial<CreateStudentInput>
    ): Promise<void>;

    // Menghapus data siswa
    delete(
        id: string
    ): Promise<void>;
    findAll(): Promise<StudentRecord[]>;

}