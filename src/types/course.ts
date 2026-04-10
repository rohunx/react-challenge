export interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

export interface Courses {
  [key: string]: Course;
}