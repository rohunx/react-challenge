import type { Course } from '../types/course';

interface EditCourseProps {
  course: Course;
  onCancel: () => void;
}

export const EditCourse = ({ course, onCancel }: EditCourseProps) => {
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
          Edit CS {course.number}
        </h1>

        <form onSubmit={(e) => e.preventDefault()} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              defaultValue={course.title}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="meets" className="block text-sm font-semibold text-gray-900 mb-2">
              Meeting Times
            </label>
            <input
              id="meets"
              type="text"
              defaultValue={course.meets}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};