import { useMemo } from 'react';
import { Content, PageHeader, PageTitle } from '@ftrprf/tailwind-components';
import dayjs from 'dayjs';
import Link from 'next/link';

import Avatar from '../../../../../components/Avatar';
import Table from '../../../../../components/Table';

import useClassgroup, {
  fetchClassgroup,
} from '../../../../../hooks/api/useClassgroup';
import useLesson, { fetchLesson } from '../../../../../hooks/api/useLessons';
import useStudentInfo, {
  fetchStudentInfo,
} from '../../../../../hooks/api/useStudentInfo';

const createColumns = (classgroupId, lessonId) => [
  {
    Header: 'Name',
    Cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return (
        <div className="flex gap-x-2 items-center">
          <Avatar
            className="w-8 h-8 flex-shrink-0 text-white"
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
    Cell: ({ value }) => (
      <div className="bg-green-500">
        <span>{dayjs(value).format('DD/MM/YYYY')}</span>
        <span className="font-bold">{dayjs(value).format('HH-mm')}</span>
      </div>
    ),
  },
  {
    Header: 'Results',
    Cell: ({ row }) => (
      <div className="flex divide-x">
        <Link
          href={`/classgroups/${classgroupId}/lessons/${lessonId}/students/${row.original.id}`}
        >
          <span className="text-blue-400 pr-1 cursor-pointer">home</span>
        </Link>
        <Link
          href={`/classgroups/${classgroupId}/lessons/${lessonId}/students/${row.original.id}`}
        >
          <span className="text-blue-400 pl-1 cursor-pointer">class</span>
        </Link>
      </div>
    ),
  },
];

const Lesson = ({
  classgroupId,
  lessonId,
  initialClassgroup,
  initialLesson,
  initialStudentInfo,
}) => {
  const { classgroup } = useClassgroup(classgroupId, initialClassgroup);
  const { lesson } = useLesson(classgroupId, lessonId, initialLesson);
  const { studentInfo } = useStudentInfo(
    classgroupId,
    lessonId,
    initialStudentInfo,
  );

  const columns = useMemo(() => createColumns(classgroupId, lessonId), [
    classgroupId,
    lessonId,
  ]);

  return (
    <>
      <PageHeader>
        <div className="flex flex-col">
          <PageTitle>Resultaten</PageTitle>
          <span>{`Klas ${classgroup?.name} - ${lesson?.title}`}</span>
        </div>
      </PageHeader>
      <Content>
        <Table
          className="overflow-y-auto w-full"
          cellClassName="p-2"
          columnClassName="p-2"
          headerClassName="uppercase text-left text-xs leading-4 tracking-wide rounded-t text-gray-600 bg-gray-200"
          columns={columns}
          data={
            classgroup?.map((s1) => ({
              ...s1,
              ...studentInfo.find((s2) => s2.id === s1.id),
            })) || []
          }
        />
      </Content>
    </>
  );
};

export async function getServerSideProps({
  query: { classgroupId, lessonId },
}) {
  const initialClassgroup = await fetchClassgroup(classgroupId);
  const initialLesson = await fetchLesson(classgroupId, lessonId);
  const initialStudentInfo = await fetchStudentInfo(classgroupId, lessonId);

  return {
    props: {
      classgroupId,
      lessonId,
      initialClassgroup,
      initialLesson,
      initialStudentInfo,
    },
  };
}

export default Lesson;
