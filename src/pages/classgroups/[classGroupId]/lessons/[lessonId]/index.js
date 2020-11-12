/* eslint-disable react/display-name */
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { Content, PageHeader } from '@ftrprf/tailwind-components';

import useClassGroup from '@/hooks/api/useClassGroup';
import useClassGroupLessonStudents from '@/hooks/api/useClassGroupLessonStudents';
import useLesson from '@/hooks/api/useLesson';
import useFormatMessage from '@/hooks/useFormatMessage';

import c from '@/utils/c';

import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';
import Link from '@/components/Link';
import StudentsResultsOverviewSkeleton from '@/components/pages/StudentResultsOverview/StudentResultsOverviewSkeleton';
import PageTitle from '@/components/PageTitle';
import Table from '@/components/Table';
import Title from '@/components/Title';

const createColumns = (classGroupId, lessonId, t) => [
  {
    Header: t('results-overview.colum.name'),
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
    Header: t('results-overview.colum.submitted_at'),
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
    Header: t('results-overview.colum.results'),
    Cell: ({ row }) => {
      const { id, submittedAt } = row.original;
      return (
        <div className="flex items-center">
          <Link
            href={{
              pathname: `/classgroups/${classGroupId}/lessons/${lessonId}/students/${id}`,
              query: { viewMode: 'SELFSTUDY' },
            }}
            disabled={!submittedAt}
          >
            {t('results-overview.home')}
          </Link>

          <div className="w-px h-4 ml-3 mr-3 bg-gray-300" />

          <Link
            href={{
              pathname: `/classgroups/${classGroupId}/lessons/${lessonId}/students/${id}`,
              query: { viewMode: 'CLASSICAL' },
            }}
            disabled={!submittedAt}
          >
            {t('results-overview.class')}
          </Link>
        </div>
      );
    },
  },
];

const StudentResultsOverview = () => {
  const t = useFormatMessage();

  const router = useRouter();
  const { classGroupId, lessonId } = router.query;

  const { classGroup, isLoading: classGroupLoading } = useClassGroup(
    classGroupId,
  );
  const { lessonDetails, isLoading: lessonDetailsLoading } = useLesson(
    lessonId,
  );
  const {
    classGroupLessonStudents,
    isLoading: classGroupLessonStudentsLoading,
  } = useClassGroupLessonStudents(classGroupId, lessonId);

  const columns = useMemo(() => createColumns(classGroupId, lessonId, t), [
    classGroupId,
    lessonId,
    t,
  ]);

  return (
    <StudentsResultsOverviewSkeleton
      lessonDetailsLoading={lessonDetailsLoading}
      classGroupLessonStudentsLoading={classGroupLessonStudentsLoading}
      classGroupLoading={classGroupLoading}
    >
      <PageHeader className="h-16">
        <Title
          title={(join) =>
            join(
              `${t('results-overview.title.results')} ${t(
                'results-overview.title.class',
              )} ${classGroup?.name || ''}`,
              lessonDetails?.title || '',
            )
          }
        />
        <PageTitle label={t('results-overview.title.results')}>
          {`${t('results-overview.title.class')} ${classGroup?.name} - ${
            lessonDetails?.title
          }`}
        </PageTitle>
      </PageHeader>
      <Content>
        <Table
          className="overflow-x-auto w-full border border-gray-200 rounded-md"
          rowClassName="border-b border-gray-200"
          cellClassName="p-2 whitespace-no-wrap"
          columnClassName="p-2 font-normal"
          headerClassName="uppercase text-xs leading-4 tracking-wide text-left rounded-t text-gray-600 bg-gray-200 h-8"
          columns={columns}
          data={classGroupLessonStudents}
        />
      </Content>
    </StudentsResultsOverviewSkeleton>
  );
};

export function getServerSideProps({ params: { classGroupId, lessonId } }) {
  return {
    props: {
      classGroupId,
      lessonId,
    },
  };
}

export default StudentResultsOverview;
