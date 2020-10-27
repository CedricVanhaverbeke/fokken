/* eslint-disable react/display-name */
import { useMemo } from 'react';
import { Content, PageHeader, PageTitle } from '@ftrprf/tailwind-components';
import dayjs from 'dayjs';
import Link from 'next/link';

import Avatar from '@/components/Avatar';
import Table from '@/components/Table';
import useClassGroup, { fetchClassGroup } from '@/hooks/api/useClassGroup';
import useClassGroupLessonStudent, {
  fetchClassGroupLessonStudent,
} from '@/hooks/api/useClassGroupLessonStudent';
import useClassGroupStudents, {
  fetchClassGroupStudents,
} from '@/hooks/api/useClassGroupStudents';
import useLesson, { fetchLessonDetails } from '@/hooks/api/useLesson';
import c from '@/utils/c';

const createColumns = (classGroupId, lessonId) => [
  {
    Header: 'Name',
    Cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return (
        <div className="flex gap-x-4 items-center">
          <Avatar
            className="w-10 h-10 flex-shrink-0 text-white"
            firstName={firstName}
            lastName={lastName}
          />
          {`${firstName} ${lastName}`}
        </div>
      );
    },
  },
  {
    Header: 'Submitted',
    Cell: ({ row }) => {
      const { submittedAt } = row.original;
      return (
        <div
          className={c('flex', submittedAt ? 'items-start' : 'items-center')}
        >
          {submittedAt ? (
            <div className="bg-green-200 text-green-800 rounded-sm px-3 flex gap-x-2">
              <span>{dayjs(submittedAt).format('DD/MM/YYYY')}</span>
              <span>{dayjs(submittedAt).format('HH:mm')}</span>
            </div>
          ) : (
            <span className="ml-20">-</span>
          )}
        </div>
      );
    },
  },
  {
    Header: 'Results',
    Cell: ({ row }) => {
      const { id, submittedAt } = row.original;
      return (
        <div className="flex items-center">
          <Link
            href={{
              pathname: `/classGroups/${classGroupId}/lessons/${lessonId}/students/${id}`,
              query: { viewMode: 'HOME' },
            }}
          >
            <span
              className={c(
                submittedAt
                  ? 'cursor-pointer text-blue-400'
                  : 'cursor-none text-blue-200',
              )}
            >
              home
            </span>
          </Link>
          <div className="w-px h-4 ml-1 mr-1 bg-gray-500" />
          <Link
            href={{
              pathname: `/classGroups/${classGroupId}/lessons/${lessonId}/students/${id}`,
              query: { viewMode: 'CLASS' },
            }}
          >
            <span
              className={c(
                submittedAt
                  ? 'cursor-pointer text-blue-400'
                  : 'cursor-none text-blue-200',
              )}
            >
              class
            </span>
          </Link>
        </div>
      );
    },
  },
];

const StudentResultsList = ({
  classGroupId,
  lessonId,
  initialClassGroupStudents,
  initialClassGroup,
  initialClassGroupLessonStudent,
  initialLessonDetails,
}) => {
  const { classGroup } = useClassGroup(classGroupId, initialClassGroup);
  const { classGroupStudents } = useClassGroupStudents(
    classGroupId,
    initialClassGroupStudents,
  );

  const { lessonDetails } = useLesson(lessonId, initialLessonDetails);
  const { classGroupLessonStudent } = useClassGroupLessonStudent(
    classGroupId,
    lessonId,
    initialClassGroupLessonStudent,
  );

  const columns = useMemo(() => createColumns(classGroupId, lessonId), [
    classGroupId,
    lessonId,
  ]);

  return (
    <>
      <PageHeader>
        <div className="flex flex-col">
          <PageTitle>Resultaten</PageTitle>
          <span className="text-xl font-medium text-gray-600">{`Class ${classGroup?.name} - ${lessonDetails?.title}`}</span>
        </div>
      </PageHeader>
      <Content>
        <Table
          className="overflow-y-auto w-full"
          rowClassName="hover:bg-blue-100"
          cellClassName="p-2"
          columnClassName="p-2 font-normal"
          headerClassName="uppercase text-left text-sm leading-4 tracking-wide rounded-t text-gray-500 bg-gray-200"
          columns={columns}
          data={
            classGroupStudents?.map((s1) => ({
              ...s1,
              ...classGroupLessonStudent.find((s2) => s2.id === s1.id),
            })) || []
          }
        />
      </Content>
    </>
  );
};

export async function getServerSideProps({
  query: { classGroupId, lessonId },
}) {
  const initialClassGroup = await fetchClassGroup(classGroupId);
  const initialClassGroupStudents = await fetchClassGroupStudents(classGroupId);
  const initialClassGroupLessonStudent = await fetchClassGroupLessonStudent(
    classGroupId,
    lessonId,
  );
  const initialLessonDetails = await fetchLessonDetails(lessonId);

  return {
    props: {
      classGroupId,
      lessonId,
      initialClassGroupStudents,
      initialClassGroup,
      initialClassGroupLessonStudent,
      initialLessonDetails,
    },
  };
}

export default StudentResultsList;
