import { Content, PageHeader, PageTitle } from '@ftrprf/tailwind-components';

import Table from '../../../../components/Table';

import useClassgroup from '../../../../hooks/useClassgroup';
import useLesson from '../../../../hooks/useLesson';

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Submitted',
    accessor: 'submitted',
    Cell: (cellProps) => {
      return <p {...cellProps}>Test</p>;
    },
  },
];

const Lesson = ({ id, lessonId }) => {
  const { classgroup } = useClassgroup(id);
  const { lesson } = useLesson(id, lessonId);

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
          cellClassName="p-2"
          columnClassName="p-2"
          headerClassName="uppercase text-xs leading-4 tracking-wide rounded-t text-gray-600 bg-gray-200"
          columns={columns}
          data={classgroup?.students || []}
        />
      </Content>
    </>
  );
};

Lesson.getInitialProps = ({ query: { id, lessonId } }) => {
  return { id, lessonId };
};

export default Lesson;
