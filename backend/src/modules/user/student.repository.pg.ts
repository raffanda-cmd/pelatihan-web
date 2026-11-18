import { randomUUID } from 'node:crypto';
import type { Pool } from 'pg';
import type { IStudentRepository } from './student.repository.js';
import type { Student, StudentRecord, CreateStudentInput } from './student.model.js';
import { AppError } from '../../shared/errors/app-error.js';

export class PostgresStudentRepository implements IStudentRepository {
    constructor(private readonly db: Pool) {}

    // ==========================================
    // FIND BY ID (Menggunakan JOIN ke tabel accounts)
    // ==========================================
    async findById(id: string): Promise<StudentRecord | null> {
        const result = await this.db.query(
            `
            SELECT 
                s.id,
                s.nim,
                s.nama,
                a.email,
                a.password,
                s.tanggal_lahir AS "tanggalLahir",
                s.jurusan,
                s.alamat,
                s.created_at AS "createdAt",
                s.created_by AS "createdBy",
                s.updated_at AS "updatedAt",
                s.updated_by AS "updatedBy",
                s.deleted_at AS "deletedAt",
                s.deleted_by AS "deletedby"
            FROM students s
            JOIN student_accounts a ON s.id = a.id_mhs
            WHERE s.id = $1
            `,
            [id]
        );

        return result.rows[0] ?? null;
    }

    // ==========================================
    // FIND BY EMAIL (Untuk Login - Berelasi via id_mhs)
    // ==========================================
    async findByEmail(email: string): Promise<StudentRecord | null> {
        const result = await this.db.query(
            `
            SELECT 
                s.id,
                s.nim,
                s.nama,
                a.email,
                a.password,
                s.tanggal_lahir AS "tanggalLahir",
                s.kelas,
                s.alamat,
                s.created_at AS "createdAt",
                s.created_by AS "createdBy",
                s.updated_at AS "updatedAt",
                s.updated_by AS "updatedBy",
                s.deleted_at AS "deletedAt",
                s.deleted_by AS "deletedby"
            FROM students s
            JOIN student_accounts a ON s.id = a.id_mhs
            WHERE a.email = $1
            `,
            [email]
        );

        return result.rows[0] ?? null;
    }

    // ==========================================
    // CREATE STUDENT (Menyimpan ke 2 tabel dengan relasi id_mhs)
    // ==========================================
    async create(data: CreateStudentInput): Promise<Student> {
        const studentId = randomUUID();
        const accountId = randomUUID();

        // Gunakan Transaction (BEGIN & COMMIT) agar aman jika salah satu gagal
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            // 1. Insert ke tabel students (Data Utama)
            await client.query(
                `
                INSERT INTO students (
                    id, nim, nama, tanggal_lahir, jurusan, alamat, created_at, created_by
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), $8)
                `,
                [
                    studentId,
                    data.nim,
                    data.nama,
                    data.tanggalLahir,
                    data.jurusan,
                    data.alamat,
                    data.createdBy
                ]
            );

            // 2. Insert ke tabel student_accounts (Berelasi menggunakan id_mhs = studentId)
            await client.query(
                `
                INSERT INTO student_accounts (
                    id, id_mhs, email, password
                )
                VALUES ($1, $2, $3, $4)
                `,
                [accountId, studentId, data.email, data.password]
            );

            await client.query('COMMIT');

            // Kembalikan data siswa yang baru dibuat beserta emailnya
            return {
                id: studentId,
                nim: data.nim,
                nama: data.nama,
                tanggalLahir: data.tanggalLahir,
                jurusan: data.jurusan,
                alamat: data.alamat,
                createdAt: new Date(),
                createdBy: data.createdBy,
                updatedAt: null,
                updatedBy: null,
                deletedAt: null,
                deletedby: null
            };

        } catch (error: unknown) {
            await client.query('ROLLBACK');

            if (
                typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === '23505'
            ) {
                throw new AppError('NIM atau Email sudah terdaftar', 409);
            }
            throw error;
        } finally {
            client.release();
        }
    }
    async update(id: string, data: Partial<CreateStudentInput>): Promise<void> {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            // 1. Update tabel students jika ada data profil yang dikirim
            await client.query(
                `
                UPDATE students 
                SET 
                    nim = COALESCE($1, nim),
                    nama = COALESCE($2, nama),
                    tanggal_lahir = COALESCE($4, tanggal_lahir),
                    jurusan = COALESCE($5, jurusan),
                    alamat = COALESCE($6, alamat),
                    updated_at = NOW(),
                    updated_by = COALESCE($7, updated_by)
                WHERE id = $8
                `,
                [data.nim, data.nama,  data.tanggalLahir, data.jurusan, data.alamat, data.createdBy, id]
            );

            // 2. Update tabel student_accounts jika ada email/password yang diubah
            if (data.email || data.password) {
                await client.query(
                    `
                    UPDATE student_accounts 
                    SET 
                        email = COALESCE($1, email),
                        password = COALESCE($2, password)
                    WHERE id_mhs = $3
                    `,
                    [data.email, data.password, id]
                );
            }

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    // ==========================================
    // DELETE STUDENT (Cascade akan hapus account otomatis)
    // ==========================================
    async delete(id: string): Promise<void> {
        // Karena kita sudah pakai ON DELETE CASCADE di relasi database,
        // menghapus data di tabel students akan otomatis menghapus data di student_accounts.
        await this.db.query(
            `DELETE FROM students WHERE id = $1`,
            [id]
        );
    }
    // ==========================================
// FIND ALL STUDENTS
// ==========================================

async findAll(): Promise<StudentRecord[]> {

    const result = await this.db.query(
        `
        SELECT
            s.id,
            s.nim,
            s.nama,
            a.email,
            s.tanggal_lahir AS "tanggalLahir",
            s.jurusan,
            s.alamat,
            s.created_at AS "createdAt",
            s.created_by AS "createdBy",
            s.updated_at AS "updatedAt",
            s.updated_by AS "updatedBy",
            s.deleted_at AS "deletedAt",
            s.deleted_by AS "deletedby"
        FROM students s
        JOIN student_accounts a ON s.id = a.id_mhs
        ORDER BY s.created_at DESC
        `
    );

    return result.rows;
}
}