
import { Router } from 'express';

import { StudentHandler } from './student.handler.js';

import {
    registerStudentSchema,
    studentIdScheme,
    loginStudentSchema,
    updateStudentSchema
} from './student.validation.js';

import {
    validateBody,
    validateParams
} from '../../shared/middlewares/validate.js';

import { asyncHandler } from '../../shared/utils/async-handler.js';

import { authenticateJwt } from '../../shared/middlewares/auth.middleware.js';

export const createStudentRoutes = (
    userHandler: StudentHandler
) => {

    const router = Router();

    // POST: Registrasi mahasiswa
    router.post(
        '/register',
        validateBody(registerStudentSchema),
        asyncHandler(userHandler.register)
    );

    // POST: Login mahasiswa
    router.post(
        '/login',
        validateBody(loginStudentSchema),
        asyncHandler(userHandler.login)
    );

    // GET: Mengambil semua mahasiswa
    router.get(
        '/',
        authenticateJwt,
        asyncHandler(userHandler.getAllStudents)
    );

    // GET: Mengambil detail mahasiswa berdasarkan ID
    router.get(
        '/:id',
        authenticateJwt,
        validateParams(studentIdScheme),
        asyncHandler(userHandler.getStudentById)
    );

    // PUT: Memperbarui seluruh data mahasiswa
    router.put(
        '/:id',
        authenticateJwt,
        validateParams(studentIdScheme),
        validateBody(updateStudentSchema),
        asyncHandler(userHandler.update)
    );

    // DELETE: Menghapus mahasiswa
    router.delete(
        '/:id',
        authenticateJwt,
        validateParams(studentIdScheme),
        asyncHandler(userHandler.delete)
    );

    return router;
};
