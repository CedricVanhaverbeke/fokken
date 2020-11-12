import React, { useMemo } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useRouter } from 'next/router';

import useClassGroupLessonStudents from '@/hooks/api/useClassGroupLessonStudents';

const StudentSwitcher = () => {
  const router = useRouter();
  const {
    classGroupId,
    lessonId,
    studentId: currentStudentId,
    viewMode,
  } = router.query;

  const { classGroupLessonStudents, isLoading } = useClassGroupLessonStudents(
    classGroupId,
    lessonId,
  );

  const navigateToStudent = (studentId) => {
    router.push({
      pathname: `/classgroups/${classGroupId}/lessons/${lessonId}/students/${studentId}`,
      query: { viewMode: viewMode },
    });
  };

  const submittedStudents = useMemo(() => {
    if (!classGroupLessonStudents) {
      return null;
    }

    return classGroupLessonStudents?.filter((s) => !!s.submittedAt);
  }, [classGroupLessonStudents]);

  const studentIndex = submittedStudents?.findIndex(
    (student) => student.id === currentStudentId,
  );

  if (isLoading) {
    return <div className="bg-gray-300 w-32 h-8 animate-pulse rounded" />;
  }

  return (
    <div className="flex gap-x-2 items-center text-center">
      <select
        style={{ textAlignLast: 'right' }}
        className="flex-grow h-8 bg-gray-100 text-right pr-2 border-none outline-none"
        value={currentStudentId}
        onChange={({ target }) => navigateToStudent(target.value)}
      >
        {submittedStudents.map((student) => (
          <option
            key={student.id}
            value={student.id}
            className="bg-white border-white outline-white"
          >
            {`${student.firstName} ${student.lastName}`}
          </option>
        ))}
      </select>

      <div className="flex">
        <button
          onClick={() =>
            navigateToStudent(submittedStudents[studentIndex - 1]?.id)
          }
          disabled={studentIndex === 0}
        >
          <FaAngleLeft
            className={studentIndex === 0 && 'text-gray-500 cursor-not-allowed'}
          />
        </button>

        <button
          onClick={() =>
            navigateToStudent(submittedStudents[studentIndex + 1]?.id)
          }
          disabled={studentIndex === submittedStudents.length - 1}
        >
          <FaAngleRight
            className={
              studentIndex === submittedStudents.length - 1 &&
              'text-gray-500 cursor-not-allowed'
            }
          />
        </button>
      </div>
    </div>
  );
};

export default StudentSwitcher;
