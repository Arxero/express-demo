import joi, { ValidationResult } from 'joi';
import { DataEntity } from './DataEntity';
import mongoose from 'mongoose';

export interface Course extends DataEntity {
  name: string;
}

export const CourseDB = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  })
);

export function validateCourse(params: Course): ValidationResult<any> {
  const schema = {
    name: joi
      .string()
      .min(3)
      .max(50)
      .required(),
  };

  return joi.validate(params, schema);
}
