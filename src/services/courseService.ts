import type { Courses } from '../types/course';

export const fetchCourses = async (): Promise<Courses> => {
  try {
    const response = await fetch(
      'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.courses;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to fetch courses');
  }
};