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

    email: z
        .string()
        .trim()
        .email('Format email tidak valid'),

    password: z
        .string()
        .trim()
        .min(6, 'Password minimal 6 karakter'),

    tanggalLahir: z
        .string()
        .date('Format tanggal harus YYYY-MM-DD'),

    jurusan: z
        .string()
        .trim()
        .min(1, 'Jurusan wajib diisi')
        .max(50, 'Jurusan maksimal 50 karakter'),

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
    email: z.string().trim().email('Format email tidak valid'),
    password: z.string().min(1, 'Password wajib diisi'),
}).strict();

export const updateStudentSchema = registerStudentSchema.partial().omit({
    createdAt: true,
    createdBy: true
}).strict();

export const deleteStudentSchema = studentIdScheme;

export type RegisterStudentRequest = z.infer<typeof registerStudentSchema>;
export type LoginStudentRequest = z.infer<typeof loginStudentSchema>;
export type StudentIdRequest = z.infer<typeof studentIdScheme>;
export type UpdateStudentRequest = z.infer<typeof updateStudentSchema>;
export type DeleteStudentRequest = z.infer<typeof deleteStudentSchema>;