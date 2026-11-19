import type {
    Request,
    Response
} from 'express';

import { LoginUseCase } from './login.usecase.js';

import { registerStudentSchema } from './student.validation.js';

import {
    GetAllStudentsUseCase,
    GetStudentByIdUseCase,
    RegisterStudentUseCase,
    UpdateStudentUseCase,
    DeleteStudentUseCase
} from './student.usecase.js';

export class StudentHandler {

    constructor(
        private readonly registerStudentUseCase: RegisterStudentUseCase,
        private readonly getStudentByIdUseCase: GetStudentByIdUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly updateStudentUseCase: UpdateStudentUseCase,
        private readonly deleteStudentUseCase: DeleteStudentUseCase,
        private readonly getAllStudentsUseCase: GetAllStudentsUseCase
    ) {}

    // 1. REGISTER STUDENT
    register = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const validatedData = registerStudentSchema.parse(req.body);

        const inputWithAudit = {
            ...validatedData,
            createdBy: validatedData.createdBy ?? 'system',
        };

        const student = await this.registerStudentUseCase.execute(
            inputWithAudit
        );

        res.status(201).json({
            success: true,
            message: 'Registrasi siswa berhasil',
            data: student
        });
    };

    // 2. GET ALL STUDENTS
    getAllStudents = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const students = await this.getAllStudentsUseCase.execute();

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil semua data mahasiswa',
            total: students.length,
            data: students
        });
    };

    // 3. GET STUDENT BY ID
    getStudentById = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        if (!id || typeof id !== 'string') {
            throw new Error('ID siswa tidak valid');
        }

        const student = await this.getStudentByIdUseCase.execute(id);

        res.status(200).json({
            success: true,
            message: 'Data siswa berhasil ditemukan',
            data: student
        });
    };

    // 4. LOGIN
    login = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const { email, password } = req.body;

        const result = await this.loginUseCase.execute({
            email,
            password
        });

        res.status(200).json({
            success: true,
            message: 'Login berhasil',
            data: result
        });
    };

    // 5. UPDATE STUDENT
    update = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        if (!id) {
            throw new Error('ID siswa tidak valid');
        }

        const input = {
            ...req.body,
            updatedBy: req.body.updatedBy ?? 'system',
        };

        const result = await this.updateStudentUseCase.execute(id, input);

        res.status(200).json({
            success: true,
            message: result.message
        });
    };

    // 6. DELETE STUDENT
    delete = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        if (!id) {
            throw new Error('ID siswa tidak valid');
        }

        const result = await this.deleteStudentUseCase.execute(id);

        res.status(200).json({
            success: true,
            message: result.message
        });
    };
}