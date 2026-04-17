import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../utilities/firebase';
import type { Courses } from '../types/course';

export const fetchCourses = async (): Promise<Courses> => {
  try {

    const db = getDatabase(app);
    const coursesRef = ref(db, 'courses');
    const snapshot = await get(coursesRef);

    if (!snapshot.exists()) {
      throw new Error('No courses found in database');
    }

    const data = snapshot.val();

    const courses = typeof data === 'object' && data.courses ? data.courses : data;
    return courses;
  } catch (error) {
    console.error('❌ Fetch error:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch courses');
  }
};