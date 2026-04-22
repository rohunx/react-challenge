import { getDatabase, ref, get, update, set, remove } from 'firebase/database';
import type { CourseFormData } from '../types/courseValidation';
import { app } from '../utilities/firebase';
import type { Courses } from '../types/course';

export const fetchCourses = async (): Promise<Courses> => {
  try {
    const db = getDatabase(app);
    const coursesRef = ref(db, 'courses');
    const snapshot = await get(coursesRef);

    if (!snapshot.exists()) {
      console.warn('No courses found in database at path: courses');
      return {};
    }

    const data = snapshot.val();
    return data;
  } catch (error) {
    console.error('❌ Fetch error:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch courses');
  }
};

interface OriginalCourseInfo {
  originalTerm: string;
  originalNumber: string;
}

export const saveCourseChanges = async (
  { originalTerm, originalNumber }: OriginalCourseInfo,
  formData: CourseFormData
): Promise<void> => {
  const database = getDatabase(app);
  const courseData = {
    title: formData.title,
    term: formData.term,
    number: formData.number,
    meets: formData.meets,
  };

  const getCourseKey = (term: string, number: string) => `${term.charAt(0)}${number}`;

  const originalKey = getCourseKey(originalTerm, originalNumber);
  const newKey = getCourseKey(formData.term, formData.number);

  try {
    if (originalKey !== newKey) {
      await remove(ref(database, `courses/${originalKey}`));
      await set(ref(database, `courses/${newKey}`), courseData);
      console.log(`✅ Successfully moved course from ${originalKey} to ${newKey}`);
    } else {
      await update(ref(database, `courses/${originalKey}`), courseData);
      console.log(`✅ Successfully updated course: ${originalKey}`);
    }
  } catch (error) {
    console.error('❌ Firebase operation failed:', error);
    throw error instanceof Error ? error : new Error('Failed to save course changes to Firebase');
  }
};