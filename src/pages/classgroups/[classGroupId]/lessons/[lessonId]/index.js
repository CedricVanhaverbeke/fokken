/* eslint-disable react/display-name */
import { useMemo } from 'react';
import { Content, PageHeader, PageTitle } from '@ftrprf/tailwind-components';
import dayjs from 'dayjs';

import fetcher from '@/hooks/api/index';
import useClassGroup from '@/hooks/api/useClassGroup';
import useClassGroupLessonStudents from '@/hooks/api/useClassGroupLessonStudents';
import useLesson from '@/hooks/api/useLesson';

import c from '@/utils/c';

import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';
import Link from '@/components/Link';
import Table from '@/components/Table';

const createColumns = (classGroupId, lessonId) => [
  {
    Header: 'Name',
    Cell: ({ row }) => {
      const { firstName, lastName, username } = row.original;
      return (
        <div className="flex gap-x-4 items-center" title={username}>
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
    Header: 'Submitted At',
    Cell: ({ row }) => {
      const { submittedAt } = row.original;
      return (
        <div className={c('flex items-start')}>
          {submittedAt && (
            <Badge>
              {dayjs(submittedAt).format('DD/MM/YYYY')}{' '}
              {dayjs(submittedAt).format('HH:mm')}
            </Badge>
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
              pathname: `/classgroups/${classGroupId}/lessons/${lessonId}/students/${id}`,
              query: { viewMode: 'HOME' },
            }}
            disabled={!submittedAt}
          >
            home
          </Link>

          <div className="w-px h-4 ml-3 mr-3 bg-gray-300" />

          <Link
            href={{
              pathname: `/classgroups/${classGroupId}/lessons/${lessonId}/students/${id}`,
              query: { viewMode: 'CLASS' },
            }}
            disabled={!submittedAt}
          >
            class
          </Link>
        </div>
      );
    },
  },
];

const StudentResultsOverview = ({
  classGroupId,
  lessonId,
  initialClassGroup,
  initialClassGroupLessonStudent,
  initialLessonDetails,
}) => {
  const { classGroup } = useClassGroup(classGroupId, initialClassGroup);

  const { lessonDetails } = useLesson(lessonId, initialLessonDetails);
  const { classGroupLessonStudent } = useClassGroupLessonStudents(
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
          className="overflow-x-auto w-full border border-gray-200 rounded-md"
          rowClassName="border-b border-gray-200"
          cellClassName="p-2 whitespace-no-wrap"
          columnClassName="p-2 font-normal"
          headerClassName="uppercase text-xs leading-4 tracking-wide text-left rounded-t text-gray-600 bg-gray-200"
          columns={columns}
          data={classGroupLessonStudent}
        />
      </Content>
    </>
  );
};

export async function getServerSideProps({
  params: { classGroupId, lessonId },
  req,
}) {
  const {
    fetchLesson,
    fetchClassGroup,
    fetchClassGroupLessonStudents,
  } = fetcher(req.cookies.authorization);

  const [
    initialLessonDetails,
    initialClassGroup,
    initialClassGroupLessonStudent,
  ] = await Promise.all([
    fetchLesson(lessonId),
    fetchClassGroup(classGroupId),
    fetchClassGroupLessonStudents(classGroupId, lessonId),
  ]);

  return {
    props: {
      classGroupId,
      lessonId,
      initialClassGroup,
      initialClassGroupLessonStudent,
      initialLessonDetails,
    },
  };
}

export default StudentResultsOverview;
