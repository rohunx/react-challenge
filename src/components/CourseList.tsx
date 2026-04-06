export interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

export interface Courses {
  [key: string]: Course;
}

interface CourseListProps {
  courses: Courses;
}

export const CourseList = ({ courses }: CourseListProps) => (
  <div>
    {Object.entries(courses).map(([id, course]) => (
      <div key={id}>
        <h2>{course.term} CS {course.number}: {course.title}</h2>
      </div>
    ))}
  </div>
);