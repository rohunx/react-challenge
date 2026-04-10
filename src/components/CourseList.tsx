import type { Courses } from '../types/course';

interface CourseListProps {
  courses: Courses;
  selectedTerm: string;
}

export const CourseList = ({ courses, selectedTerm }: CourseListProps) => {
  const filteredCourses = Object.entries(courses).filter(
    ([, course]) => course.term === selectedTerm
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4">
      {filteredCourses.map(([id, course]) => (
        <div
          key={id}
          className="border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[160px] bg-white"
        >
          <div>
            <h2 className="text-sm font-bold text-gray-900 leading-snug">
              {course.term} CS {course.number}
            </h2>
            <p className="text-sm text-gray-500 mt-2 leading-snug">{course.title}</p>
          </div>

          <div className="border-t border-gray-200 mt-3 pt-2 text-sm text-gray-700">
            {course.meets}
          </div>
        </div>
      ))}
    </div>
  );
};