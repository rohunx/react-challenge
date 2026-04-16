import type { CourseFormData, CourseValidationError, ValidTerm } from '../types/courseValidation';
import { VALID_TERMS } from '../types/courseValidation';

const isValidTitle = (title: string): boolean => title.length >= 2;

const isValidTerm = (term: string): boolean => VALID_TERMS.includes(term as ValidTerm);

const isValidCourseNumber = (number: string): boolean => {
  const numberRegex = /^\d+(?:-\d+)?$/;
  return numberRegex.test(number);
};

const isValidMeetingTime = (meets: string): boolean => {
  if (meets === '') return true;

  const meetingRegex = /^[MTWRFSU]+\s+\d{1,2}:\d{2}-\d{1,2}:\d{2}$/;
  return meetingRegex.test(meets);
};

export const validateCourse = (data: Partial<CourseFormData>): CourseValidationError => {
  const errors: CourseValidationError = {};

  if (!data.title || !isValidTitle(data.title)) {
    errors.title = 'Title must be at least 2 characters';
  }

  if (!data.term || !isValidTerm(data.term)) {
    errors.term = 'Term must be Fall, Winter, Spring, or Summer';
  }

  if (!data.number || !isValidCourseNumber(data.number)) {
    errors.number = 'Course number must be a number (e.g., "213" or "213-2")';
  }

  if (data.meets !== undefined && !isValidMeetingTime(data.meets)) {
    errors.meets = 'Meeting time must contain days and start-end time (e.g., MWF 12:00-13:20)';
  }

  return errors;
};

export const isFormValid = (errors: CourseValidationError): boolean => Object.keys(errors).length === 0;