import { useState } from 'react';
import type { Course } from '../types/course';
import type { CourseFormData, CourseValidationError } from '../types/courseValidation';
import { validateCourse } from '../utilities/courseValidator';
import { saveCourseChanges } from '../services/courseService';

interface EditCourseProps {
  course: Course;
  onCancel: () => void;
  onSaveSuccess: () => void; // Add a callback for successful saves
}

export const EditCourse = ({ course, onCancel, onSaveSuccess }: EditCourseProps) => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: course.title,
    term: course.term,
    number: course.number,
    meets: course.meets,
  });

  const [errors, setErrors] = useState<CourseValidationError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (field: keyof CourseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: keyof CourseFormData) => {
    const newErrors = validateCourse(formData);
    setErrors((prev) => ({
      ...prev,
      [field]: newErrors[field],
    }));
  };

  const hasChanges = JSON.stringify(course) !== JSON.stringify(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateCourse(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        await saveCourseChanges({ originalTerm: course.term, originalNumber: course.number }, formData);
        onSaveSuccess(); // Call the success callback
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Failed to save changes');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const canSubmit = hasChanges;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={onCancel}
        className="mb-6 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        aria-label="Back to course list"
      >
        ← Back to Courses
      </button>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edit CS {formData.number}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {submitError}
            </div>
          )}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              onBlur={() => handleBlur('title')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.title ? 'border-red-500 focus:ring-red-600' : 'border-gray-300 focus:ring-blue-600'
              }`}
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="term" className="block text-sm font-semibold text-gray-900 mb-2">
              Term
            </label>
            <select
              id="term"
              value={formData.term}
              onChange={(e) => handleChange('term', e.target.value)}
              onBlur={() => handleBlur('term')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.term ? 'border-red-500 focus:ring-red-600' : 'border-gray-300 focus:ring-blue-600'
              }`}
            >
              <option value="">Select a term</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
            </select>
            {errors.term && <p className="text-red-600 text-sm mt-1">{errors.term}</p>}
          </div>

          <div>
            <label htmlFor="number" className="block text-sm font-semibold text-gray-900 mb-2">
              Course Number
            </label>
            <input
              id="number"
              type="text"
              value={formData.number}
              onChange={(e) => handleChange('number', e.target.value)}
              onBlur={() => handleBlur('number')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.number ? 'border-red-500 focus:ring-red-600' : 'border-gray-300 focus:ring-blue-600'
              }`}
            />
            {errors.number && <p className="text-red-600 text-sm mt-1">{errors.number}</p>}
          </div>

          <div>
            <label htmlFor="meets" className="block text-sm font-semibold text-gray-900 mb-2">
              Meeting Times
            </label>
            <input
              id="meets"
              type="text"
              value={formData.meets}
              onChange={(e) => handleChange('meets', e.target.value)}
              onBlur={() => handleBlur('meets')}
              placeholder="e.g., MWF 12:00-13:20"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.meets ? 'border-red-500 focus:ring-red-600' : 'border-gray-300 focus:ring-blue-600'
              }`}
            />
            {errors.meets && <p className="text-red-600 text-sm mt-1">{errors.meets}</p>}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !canSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};