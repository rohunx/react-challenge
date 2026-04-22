import type { User } from 'firebase/auth';
import { useMemo } from 'react';
import type { Course, Courses } from '../types/course';
import { getConflictingCourses } from '../utilities/timeConflict';
import { CourseCard } from './CourseCard';

interface CourseListProps {
  courses: Courses;
  selectedTerm: string;
  selected: Course[];
  toggleSelected: (course: Course) => void;
  onEdit: (course: Course) => void;
  user: User | null;
  isAdmin: boolean;
}

export const CourseList = ({
  courses,
  selectedTerm,
  selected,
  toggleSelected,
  onEdit,
  user,
  isAdmin,
}: CourseListProps) => {
  const termCourses = useMemo(
    () => Object.values(courses).filter((course) => course.term === selectedTerm),
    [courses, selectedTerm]
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4">
      {termCourses.map((course) => {
        const isSelected = selected.some(
          (c) => c.term === course.term && c.number === course.number
        );
        const hasConflict =
          !isSelected && getConflictingCourses(course, selected);

        return (
          <CourseCard
            key={`${course.term}-${course.number}`}
            course={course}
            isSelected={isSelected}
            isConflicted={hasConflict}
            onToggleSelect={toggleSelected}
            onEdit={onEdit}
            user={user}
            isAdmin={isAdmin}
          />
        );
      })}
    </div>
  );
};