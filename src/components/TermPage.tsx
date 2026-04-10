import { useState } from 'react';
import { Banner } from './Banner';
import { CourseList } from './CourseList';
import { TermSelector } from './TermSelector';
import { useCourses } from '../hooks/useCourses';
import type { Course } from '../types/course';

export const TermPage = () => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selected, setSelected] = useState<Course[]>([]);
  const { courses, loading, error } = useCourses();

  const toggleSelected = (item: Course) =>
    setSelected(
      selected.some((x) => x.number === item.number)
        ? selected.filter((x) => x.number !== item.number)
        : [...selected, item]
    );

  return (
    <div className="container mx-auto p-4">
      <Banner title="CS Course Scheduler" />
      <TermSelector selectedTerm={selectedTerm} onTermChange={setSelectedTerm} />
      {loading && <p className="text-center text-gray-500">Loading courses...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && (
        <CourseList
          courses={courses}
          selectedTerm={selectedTerm}
          selected={selected}
          toggleSelected={toggleSelected}
        />
      )}
    </div>
  );
};