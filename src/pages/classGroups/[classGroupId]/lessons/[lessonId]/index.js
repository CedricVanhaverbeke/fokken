/* eslint-disable react/display-name */
import { useMemo } from 'react';
import dayjs from 'dayjs';

import { Content, PageHeader, PageTitle } from '@ftrprf/tailwind-components';

import useClassGroup, { fetchClassGroup } from '@/hooks/api/useClassGroup';
import useClassGroupLessonStudent, {
  fetchClassGroupLessonStudent,
} from '@/hooks/api/useClassGroupLessonStudent';
import useClassGroupStudents, {
  fetchClassGroupStudents,
} from '@/hooks/api/useClassGroupStudents';
import useLesson, { fetchLesson } from '@/hooks/api/useLesson';
import useFormatMessage from '@/hooks/useFormatMessage';

import c from '@/utils/c';

import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';
import Link from '@/components/Link';
import Table from '@/components/Table';

const createColumns = (classGroupId, lessonId, t) => [
  {
    Header: t('resultsOverview.colum.name'),
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
    Header: t('resultsOverview.colum.submittedAt'),
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
    Header: t('resultsOverview.colum.results'),
    Cell: ({ row }) => {
      const { id, submittedAt } = row.original;
      return (
        <div className="flex items-center">
          <Link
            href={{
              pathname: `/classGroups/${classGroupId}/lessons/${lessonId}/students/${id}`,
              query: { viewMode: 'HOME' },
            }}
            disabled={!submittedAt}
          >
            {t('resultsOverview.home')}
          </Link>

          <div className="w-px h-4 ml-3 mr-3 bg-gray-300" />

          <Link
            href={{
              pathname: `/classGroups/${classGroupId}/lessons/${lessonId}/students/${id}`,
              query: { viewMode: 'CLASS' },
            }}
            disabled={!submittedAt}
          >
            {t('resultsOverview.class')}
          </Link>
        </div>
      );
    },
  },
];

const StudentResultsOverview = ({
  classGroupId,
  lessonId,
  initialClassGroupStudents,
  initialClassGroup,
  initialClassGroupLessonStudent,
  initialLessonDetails,
}) => {
  const t = useFormatMessage();
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

  const columns = useMemo(() => createColumns(classGroupId, lessonId, t), [
    classGroupId,
    lessonId,
    t,
  ]);

  return (
    <>
      <PageHeader>
        <div className="flex flex-col">
          <PageTitle>{t('resultsOverview.title.results')}</PageTitle>
          <span className="text-xl font-medium text-gray-600">{`${t(
            'resultsOverview.title.class',
          )} ${classGroup?.name} - ${lessonDetails?.title}`}</span>
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
  params: { classGroupId, lessonId },
}) {
  const initialClassGroup = await fetchClassGroup(classGroupId);
  const initialClassGroupStudents = await fetchClassGroupStudents(classGroupId);
  const initialClassGroupLessonStudent = await fetchClassGroupLessonStudent(
    classGroupId,
    lessonId,
  );
  const initialLessonDetails = await fetchLesson(lessonId);

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

export default StudentResultsOverview;
