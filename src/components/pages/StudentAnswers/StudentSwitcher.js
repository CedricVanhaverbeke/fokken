import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import useClassGroupLessonStudents from '@/hooks/api/useClassGroupLessonStudents';

import Dropdown from '@/components/Dropdown';
import Switcher from '@/components/Switcher';

const StudentSwitcher = () => {
  const router = useRouter();
  const {
    classGroupId,
    lessonId,
    studentId: currentStudentId,
    viewMode,
  } = router.query;

  const { classGroupLessonStudents } = useClassGroupLessonStudents(
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

  return (
    <div className="flex gap-x-2 items-center text-center">
      <Dropdown
        items={submittedStudents}
        currentValue={currentStudentId}
        onChange={navigateToStudent}
      />

      <Switcher
        onNext={() =>
          navigateToStudent(submittedStudents[studentIndex + 1]?.id)
        }
        onPrevious={() =>
          navigateToStudent(submittedStudents[studentIndex - 1]?.id)
        }
        itemsSize={submittedStudents?.length}
        currentIndex={studentIndex}
      />
    </div>
  );
};

export default StudentSwitcher;
