import { useState } from 'react';
import type { Course } from '../types/course';

const TERMS = ['Fall', 'Winter', 'Spring'] as const;

interface CoursePlanProps {
  isOpen: boolean;
  onClose: () => void;
  selected: Course[];
}

export const CoursePlan = ({ isOpen, onClose, selected }: CoursePlanProps) => {
  const [filterTerm, setFilterTerm] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredCourses = filterTerm
    ? selected.filter((course) => course.term === filterTerm)
    : selected;

  const availableTerms = Array.from(
    new Set(selected.map((course) => course.term))
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-plan-title"
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 id="course-plan-title" className="text-lg font-semibold text-gray-900">
            Course Plan
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close dialog"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {selected.length > 0 && availableTerms.length > 0 && (
          <div className="border-b border-gray-200 px-6 pt-4 pb-2 flex gap-2">
            <button
              onClick={() => setFilterTerm(null)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                filterTerm === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {TERMS.map((term) => {
              const hasTermCourses = availableTerms.includes(term);
              return (
                <button
                  key={term}
                  onClick={() => setFilterTerm(term)}
                  disabled={!hasTermCourses}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                    filterTerm === term
                      ? 'bg-blue-600 text-white'
                      : hasTermCourses
                        ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {term}
                </button>
              );
            })}
          </div>
        )}

        <div className="p-6">
          {selected.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">No courses selected yet.</p>
              <p className="text-sm text-gray-500">
                Click on a course card to add it to your plan.
              </p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600">No courses in this term.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <div key={`${course.term}-${course.number}`} className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-gray-900">
                    CS {course.number}: {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{course.meets}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
