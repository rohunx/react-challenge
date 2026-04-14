import type { Course } from '../types/course';

interface TimeRange {
  start: number;
  end: number;
}

const DAYS_ORDER: Record<string, number> = {
  M: 0,
  T: 1,
  W: 2,
  Th: 3,
  F: 4,
};

const parseTime = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const extractTimeRange = (meetingStr: string): TimeRange | null => {
  const timeMatch = meetingStr.match(/(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})/);
  if (!timeMatch) return null;

  const startTime = parseTime(`${timeMatch[1]}:${timeMatch[2]}`);
  const endTime = parseTime(`${timeMatch[3]}:${timeMatch[4]}`);

  return { start: startTime, end: endTime };
};

const extractDays = (meetingStr: string): Set<string> => {
  const daysMatch = meetingStr.match(/^([MTWThF]+)/);
  if (!daysMatch) return new Set();

  const daysStr = daysMatch[1];
  const days = new Set<string>();

  let i = 0;
  while (i < daysStr.length) {
    if (i + 1 < daysStr.length && daysStr[i] === 'T' && daysStr[i + 1] === 'h') {
      days.add('Th');
      i += 2;
    } else {
      days.add(daysStr[i]);
      i += 1;
    }
  }

  return days;
};

const timesOverlap = (range1: TimeRange, range2: TimeRange): boolean =>
  range1.start < range2.end && range2.start < range1.end;

const daysOverlap = (days1: Set<string>, days2: Set<string>): boolean => {
  for (const day of days1) {
    if (days2.has(day)) return true;
  }
  return false;
};

const hasTimeConflict = (course1: Course, course2: Course): boolean => {
  if (course1.term !== course2.term) return false;
  if (!course1.meets || !course2.meets) return false;

  const range1 = extractTimeRange(course1.meets);
  const range2 = extractTimeRange(course2.meets);

  if (!range1 || !range2) return false;

  const days1 = extractDays(course1.meets);
  const days2 = extractDays(course2.meets);

  return daysOverlap(days1, days2) && timesOverlap(range1, range2);
};

export const getConflictingCourses = (
  course: Course,
  selectedCourses: Course[]
): boolean => selectedCourses.some((selected) => hasTimeConflict(course, selected));
