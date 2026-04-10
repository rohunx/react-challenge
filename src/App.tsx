import { Banner } from './components/Banner';
import { CourseList } from './components/CourseList';
import { useCourses } from './hooks/useCourses';

const App = () => {
  const { courses, loading, error } = useCourses();

  return (
    <div className="container mx-auto p-4">
      <Banner title="CS Courses" />
      {loading && <p className="text-center text-gray-500">Loading courses...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && <CourseList courses={courses} />}
    </div>
  );
};

export default App;