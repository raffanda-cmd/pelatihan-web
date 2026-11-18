export interface Student {
    id: string;
    nim: string;
    nama: string;
    tanggalLahir: string;
    jurusan: string;
    alamat: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date | null;
    updatedBy: string | null;
    deletedAt: Date | null;
    deletedby: string | null;
}

// Model untuk tabel relasi akun (email & password)
export interface StudentAccount {
    id: string;
    idMhs: string; // Relasi ke students.id
    email: string;
    password: string;
    createdAt: Date;
}

// Data input saat register (menggabungkan data siswa & akun)
export interface CreateStudentInput {
    nim: string;
    nama: string;
    email: string;     // Masuk ke tabel student_accounts
    password: string;  // Masuk ke tabel student_accounts
    tanggalLahir: string;
    jurusan: string;
    alamat: string;
    createdBy: string;
}
// Input untuk memperbarui data siswa (semua field bersifat opsional)
export interface UpdateStudentInput {
    nim?: string;
    nama?: string;
    email?: string;
    password?: string;
    tanggalLahir?: string;
    jurusan?: string;
    alamat?: string;
    updatedBy?: string;
}

export interface StudentRecord extends Student {
    email: string;
    password: string;
}