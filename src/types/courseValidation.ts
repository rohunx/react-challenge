export interface CourseValidationError {
  title?: string;
  term?: string;
  number?: string;
  meets?: string;
}

export interface CourseFormData {
  title: string;
  term: string;
  number: string;
  meets: string;
}

export const VALID_TERMS = ['Fall', 'Winter', 'Spring', 'Summer'] as const;
export type ValidTerm = typeof VALID_TERMS[number];