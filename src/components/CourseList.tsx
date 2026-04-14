import type { Course, Courses } from '../types/course';
import { getConflictingCourses } from '../utilities/timeConflict';

interface CourseListProps {
  courses: Courses;
  selectedTerm: string;
  selected: Course[];
  toggleSelected: (course: Course) => void;
}

export const CourseList = ({
  courses,
  selectedTerm,
  selected,
  toggleSelected,
}: CourseListProps) => {
  const filteredCourses = Object.entries(courses).filter(
    ([, course]) => course.term === selectedTerm
  );

  const isConflicted = (course: Course): boolean =>
    getConflictingCourses(course, selected);

  const isSelected = (course: Course): boolean => selected.includes(course);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4">
      {filteredCourses.map(([id, course]) => {
        const conflicted = isConflicted(course);
        const isCurrentlySelected = isSelected(course);

        return (
          <div
            key={id}
            onClick={() => {
              if (!conflicted || isCurrentlySelected) {
                toggleSelected(course);
              }
            }}
            className={`border rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[160px] transition-colors ${
              conflicted && !isCurrentlySelected
                ? 'opacity-50 bg-gray-50 border-gray-200 cursor-not-allowed'
                : 'cursor-pointer'
            } ${
              isCurrentlySelected
                ? 'bg-blue-100 border-blue-300'
                : 'bg-white border-gray-200 hover:shadow-md'
            }`}
          >
            <div>
              <h2 className="text-sm font-bold text-gray-900 leading-snug">
                {course.term} CS {course.number}
              </h2>
              <p className="text-sm text-gray-500 mt-2 leading-snug">{course.title}</p>
            </div>

            <div className="border-t border-gray-200 mt-3 pt-2 text-sm text-gray-700">
              {course.meets}
              {conflicted && !isCurrentlySelected && (
                <div className="text-red-500 font-semibold mt-1 text-xs">
                  Conflict
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};