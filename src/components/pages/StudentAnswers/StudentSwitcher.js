import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useRouter } from 'next/router';

import useClassGroupLessonStudents from '@/hooks/api/useClassGroupLessonStudents';

const StudentSwitcher = () => {
  const router = useRouter();
  const { classGroupId, lessonId, studentId } = router.query;

  const { classGroupLessonStudents, isLoading } = useClassGroupLessonStudents(
    classGroupId,
    lessonId,
  );

  const navigateToStudent = (studentId) => {
    router.push(
      `/classgroups/${classGroupId}/lessons/${lessonId}/students/${studentId}`,
    );
  };

  const studentIndex = classGroupLessonStudents?.findIndex(
    (student) => student.id === studentId,
  );
  const currentStudent = classGroupLessonStudents?.[studentIndex];

  if (isLoading) {
    return <div className="bg-gray-300 w-32 h-8 animate-pulse rounded" />;
  }

  return (
    <div className="flex gap-x-2 items-center">
      <button
        disabled={studentIndex === 0}
        onClick={() =>
          navigateToStudent(classGroupLessonStudents[studentIndex - 1].id)
        }
      >
        <FaAngleLeft
          className={studentIndex === 0 && 'text-gray-500 cursor-not-allowed'}
        />
      </button>
      <span>{`${currentStudent.firstName} ${currentStudent.lastName}`}</span>
      <button
        disabled={studentIndex === classGroupLessonStudents.length - 1}
        onClick={() =>
          navigateToStudent(classGroupLessonStudents[studentIndex + 1].id)
        }
      >
        <FaAngleRight
          className={
            studentIndex === classGroupLessonStudents.length - 1 &&
            'text-gray-500 cursor-not-allowed'
          }
        />
      </button>
    </div>
  );
};

export default StudentSwitcher;
