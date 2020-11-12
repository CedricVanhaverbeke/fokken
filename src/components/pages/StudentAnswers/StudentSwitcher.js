import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useRouter } from 'next/router';

import useClassGroupLessonStudents from '@/hooks/api/useClassGroupLessonStudents';

import c from '@/utils/c';

import Link from '@/components/Link';

const StudentSwitcher = () => {
  const router = useRouter();
  const { classGroupId, lessonId, studentId, viewMode } = router.query;

  const { classGroupLessonStudents, isLoading } = useClassGroupLessonStudents(
    classGroupId,
    lessonId,
  );

  const submittedStudents = classGroupLessonStudents.filter(
    (s) => !!s.submittedAt,
  );

  const studentIndex = classGroupLessonStudents?.findIndex(
    (student) => student.id === studentId,
  );
  const currentStudent = submittedStudents?.[studentIndex];

  if (isLoading) {
    return <div className="bg-gray-300 w-32 h-8 animate-pulse rounded" />;
  }

  return (
    <div className="flex gap-x-2 items-center text-center">
      <span>{`${currentStudent.firstName} ${currentStudent.lastName}`}</span>
      <div className="flex">
        <Link
          href={{
            pathname: `/classgroups/${classGroupId}/lessons/${lessonId}/students/${
              submittedStudents[studentIndex - 1]?.id
            }`,
            query: { viewMode: viewMode },
          }}
          disabled={studentIndex === 0}
        >
          <FaAngleLeft
            className={c(
              'text-black',
              studentIndex === 0 && 'text-gray-500 cursor-not-allowed',
            )}
          />
        </Link>

        <Link
          href={{
            pathname: `/classgroups/${classGroupId}/lessons/${lessonId}/students/${
              submittedStudents[studentIndex + 1]?.id
            }`,
            query: { viewMode: viewMode },
          }}
          disabled={studentIndex === classGroupLessonStudents.length - 1}
        >
          <FaAngleRight
            className={c(
              'text-black',
              studentIndex === classGroupLessonStudents.length - 1 &&
                'text-gray-500 cursor-not-allowed',
            )}
          />
        </Link>
      </div>
    </div>
  );
};

export default StudentSwitcher;
