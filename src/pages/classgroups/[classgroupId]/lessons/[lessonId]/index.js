import { useMemo } from 'react';
import { Content, PageHeader, PageTitle } from '@ftrprf/tailwind-components';
import dayjs from 'dayjs';
import Link from 'next/link';

/*import useClassgroupLesson, {
  fetchClassgroupLesson,
} from '~/hooks/api/useClassgroupLesson';
*/
import useClassgroupStudents, {
  fetchClassgroupStudents,
} from '~/hooks/api/useClassgroupStudents';
import useLessonDetails, {
  fetchLessonDetails,
} from '~/hooks/api/useLessonDetails';
import useStudentInfo, { fetchStudentInfo } from '~/hooks/api/useStudentInfo';

import c from '~/utils/c';

import Avatar from '~/components/Avatar';
import Table from '~/components/Table';

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
    Cell: ({ row }) => {
      const { submittedAt } = row.original;
      return (
        <div
          className={c('flex', submittedAt ? 'items-start' : 'items-center')}
        >
          {submittedAt ? (
            <div className="bg-green-200 text-green-800 rounded-sm px-3 flex gap-x-2">
              <span>{dayjs(submittedAt).format('DD/MM/YYYY')}</span>
              <span className="font-semibold">
                {dayjs(submittedAt).format('HH:mm')}
              </span>
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
            href={`/classgroups/${classgroupId}/lessons/${lessonId}/students/${id}/home`}
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
            href={`/classgroups/${classgroupId}/lessons/${lessonId}/students/${id}/class`}
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

const Lesson = ({
  classgroupId,
  lessonId,
  initialClassgroupStudents,
  initialStudentInfo,
  initialLessonDetails,
  //initialClassgroupLesson,
}) => {
  const { classgroup } = useClassgroupStudents(
    classgroupId,
    initialClassgroupStudents,
  );

  /*const { classgroupLesson } = useClassgroupLesson(
    classgroupId,
    lessonId,
    initialClassgroupLesson,
  );*/

  const { lessonDetails } = useLessonDetails(lessonId, initialLessonDetails);
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
          <span>{`Klas TODO (backend) - ${lessonDetails?.title}`}</span>
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
  const initialClassgroupStudents = await fetchClassgroupStudents(classgroupId);
  /*const initialClassgroupLesson = await fetchClassgroupLesson(
    classgroupId,
    lessonId,
  );
  */
  const initialStudentInfo = await fetchStudentInfo(classgroupId, lessonId);
  const initialLessonDetails = await fetchLessonDetails(lessonId);

  return {
    props: {
      classgroupId,
      lessonId,
      initialClassgroupStudents,
      //initialClassgroupLesson,
      initialStudentInfo,
      initialLessonDetails,
    },
  };
}

export default Lesson;
