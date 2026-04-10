import { useState, useEffect } from 'react';
import type { Courses } from '../types/course';
import { fetchCourses } from '../services/courseService';

interface UseCoursesResult {
  courses: Courses;
  loading: boolean;
  error: string | null;
}

export const useCourses = (): UseCoursesResult => {
  const [courses, setCourses] = useState<Courses>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses');
        setCourses({});
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return { courses, loading, error };
};