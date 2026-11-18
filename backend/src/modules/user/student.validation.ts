
import { z } from 'zod';

// Validasi data registrasi mahasiswa
export const registerStudentSchema = z.object({

    nim: z
        .string()
        .trim()
        .min(1, 'NIM wajib diisi')
        .max(20, 'NIM maksimal 20 karakter'),

    nama: z
        .string()
        .trim()
        .min(2, 'Nama minimal 2 karakter')
        .max(100, 'Nama maksimal 100 karakter'),
        email: z.string().email("Format email tidak valid").trim(),
        password: z.string().min(6, "Password minimal 6 karakter").trim(),

    jenisKelamin: z
        .string()
        .trim()
        .min(1, 'Jenis kelamin wajib diisi'),

    tanggalLahir: z
        .string()
        .date('Format tanggal harus YYYY-MM-DD'),

    kelas: z
        .string()
        .trim()
        .min(1, 'Kelas wajib diisi')
        .max(50, 'Kelas maksimal 50 karakter'),

    alamat: z
        .string()
        .trim()
        .min(1, 'Alamat wajib diisi')
        .max(255, 'Alamat maksimal 255 karakter'),
    createdAt: z.date().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.date().optional(),
    updatedBy: z.string().optional(),
    deletedAt: z.date().optional(),
    deletedBy: z.string().optional()

}).strict();

// Validasi ID mahasiswa
export const studentIdScheme = z.object({
    id: z
        .string()
        .uuid('ID tidak valid')
});
export const loginStudentSchema = z.object({
    email: z.string().email("Format email tidak valid").trim(),
    password: z.string().min(1, "Password wajib diisi"),
}).strict();
export const updateStudentSchema = registerStudentSchema.partial().omit({
    createdAt: true,
    createdBy: true
}).strict();
export const deleteStudentSchema = studentIdScheme;

// Type data registrasi mahasiswa
export type RegisterStudentRequest = z.infer<
    typeof registerStudentSchema
>;

// Type data login mahasiswa
export type LoginStudentRequest = z.infer<
    typeof loginStudentSchema
>;

// Type ID mahasiswa
export type StudentIdRequest = z.infer<
    typeof studentIdScheme
>;
export type UpdateStudentRequest = z.infer<
    typeof updateStudentSchema
>;
export type DeleteStudentRequest = z.infer<
    typeof deleteStudentSchema
>;
