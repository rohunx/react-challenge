import type { User } from 'firebase/auth';
import type { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
  isSelected: boolean;
  isConflicted: boolean;
  onToggleSelect: (course: Course) => void;
  onEdit: (course: Course) => void;
  user: User | null;
  isAdmin: boolean;
}

export const CourseCard = ({
  course,
  isSelected,
  isConflicted,
  onToggleSelect,
  onEdit,
  user,
  isAdmin,
}: CourseCardProps) => {
  const cardClasses = `
    border rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[160px] transition-colors
    ${isConflicted && !isSelected ? 'opacity-50 bg-gray-50 border-gray-200 cursor-not-allowed' : 'cursor-pointer'}
    ${isSelected ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-200 hover:shadow-md'}
  `;

  const handleCardClick = () => {
    if (!isConflicted || isSelected) {
      onToggleSelect(course);
    }
  };

  return (
    <div className={cardClasses}>
      <div onClick={handleCardClick} className="flex-grow">
        <h2 className="text-sm font-bold text-gray-900 leading-snug">
          {course.term} CS {course.number}
        </h2>
        <p className="text-sm text-gray-500 mt-2 leading-snug">{course.title}</p>
      </div>

      <div>
        <div className="border-t border-gray-200 mt-3 pt-2 text-sm text-gray-700">
          {course.meets}
          {isConflicted && !isSelected && (
            <div className="text-red-500 font-semibold mt-1 text-xs">
              Conflict
            </div>
          )}
        </div>

        {user && isAdmin && (
          <button
            onClick={() => onEdit(course)}
            className="mt-3 w-full text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors text-left"
            aria-label={`Edit course ${course.title}`}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};