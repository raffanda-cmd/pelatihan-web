import { postgres } from '../../infrastructure/database/postgres.js';

import { PostgresStudentRepository } from './student.repository.pg.js';

import {
    RegisterStudentUseCase,
    GetStudentByIdUseCase,
    GetAllStudentsUseCase,
} from './student.usecase.js';

import { LoginUseCase } from './login.usecase.js'; // Pastikan import ini sudah ada

import { StudentHandler } from './student.handler.js';
import { UpdateStudentUseCase } from './student.usecase.js';
import { DeleteStudentUseCase } from './student.usecase.js';

import { createStudentRoutes } from './student.route.js';

// ==========================================
// 1. REPOSITORY
// ==========================================

const studentRepository = new PostgresStudentRepository(
    postgres
);

// ==========================================
// 2. USE CASES
// ==========================================

const registerStudentUseCase = new RegisterStudentUseCase(
    studentRepository
);

const getStudentByIdUseCase = new GetStudentByIdUseCase(
    studentRepository
);

// TAMBAHKAN INI: Instansiasi loginUseCase
const loginUseCase = new LoginUseCase(
    studentRepository
);
const updateStudentUseCase = new UpdateStudentUseCase(
    studentRepository
);
const deleteStudentUseCase = new DeleteStudentUseCase(
    studentRepository
);
const getAllStudentsUseCase = new GetAllStudentsUseCase(
    studentRepository
);

// ==========================================
// 3. HANDLER
// ==========================================

const studentHandler = new StudentHandler(
    registerStudentUseCase,
    getStudentByIdUseCase,
    loginUseCase, // Sekarang variabel ini sudah dikenal karena sudah dibuat di atas
    updateStudentUseCase,
    deleteStudentUseCase,
    getAllStudentsUseCase
);

// ==========================================
// 4. ROUTES
// ==========================================

export const studentRoutes = createStudentRoutes(
    studentHandler
);