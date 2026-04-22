import { useState } from 'react';
import type { User } from 'firebase/auth';
import { AuthBanner } from './AuthBanner';
import { CourseList } from './CourseList';
import { CoursePlan } from './CoursePlan';
import { EditCourse } from './EditCourse';
import { TermSelector } from './TermSelector';
import { useCourses } from '../hooks/useCourses';
import type { Course } from '../types/course';

interface TermPageProps {
  user: User | null;
  isAdmin: boolean;
}

export const TermPage = ({ user, isAdmin }: TermPageProps) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selected, setSelected] = useState<Course[]>([]);
  const [isCoursePlanOpen, setIsCoursePlanOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { courses, loading, error, refetch } = useCourses();

  const toggleSelected = (item: Course) =>
    setSelected(
      selected.some((x) => x.number === item.number && x.term === item.term)
        ? selected.filter((x) => !(x.number === item.number && x.term === item.term))
        : [...selected, item]
    );

  const handleSaveSuccess = async () => {
    await refetch();
    setEditingCourse(null);
  };

  if (editingCourse) {
    return (
      <EditCourse
        course={editingCourse}
        onCancel={() => setEditingCourse(null)}
        onSaveSuccess={handleSaveSuccess}
      />
    );
  }

  return (
    <div className="container mx-auto p-4">
      <AuthBanner user={user} title="CS Courses for 2018-2019" />
      <div className="flex items-center justify-between mb-6">
        <TermSelector selectedTerm={selectedTerm} onTermChange={setSelectedTerm} />
        <button
          onClick={() => setIsCoursePlanOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          aria-label={`View course plan (${selected.length} courses selected)`}
        >
          Course Plan ({selected.length})
        </button>
      </div>
      {loading && <p className="text-center text-gray-500">Loading courses...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && (
        <CourseList
          courses={courses}
          selectedTerm={selectedTerm}
          selected={selected}
          toggleSelected={toggleSelected}
          onEdit={setEditingCourse}
          user={user}
          isAdmin={isAdmin}
        />
      )}
      <CoursePlan
        isOpen={isCoursePlanOpen}
        onClose={() => setIsCoursePlanOpen(false)}
        selected={selected}
      />
    </div>
  );
};