
import type { IStudentRepository } from './student.repository.js';

import type { Student } from './student.model.js';

import { AppError } from '../../shared/errors/app-error.js';

export class GetStudentByIdUseCase {

    constructor(
        private readonly studentRepository: IStudentRepository
    ) {}

    async execute(id: string): Promise<Student> {

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
