import { Content, PageHeader, PageTitle } from '@ftrprf/tailwind-components';
import { useRouter } from 'next/router';

import useClassgroup from '../../../../hooks/useClassgroup';
import useLesson from '../../../../hooks/useLesson';

const Lesson = () => {
  const router = useRouter();
  const { id, lessonId } = router.query;

  const { data: classgroup } = useClassgroup(id);
  const { data: lesson } = useLesson(id, lessonId);

  if (!id || !lessonId) {
    return null;
  }

  return (
    <>
      <PageHeader>
        <div className="flex flex-col">
          <PageTitle>Resultaten</PageTitle>
          <span>{`Klas ${classgroup?.name} - ${lesson?.title}`}</span>
        </div>
      </PageHeader>
      <Content>
        <div className="flex flex-col">
          <div className="text-xl mb-3">Studenten</div>
          <ul>
            {classgroup?.students?.map(({ firstName }, index) => (
              <li key={index}>- {firstName}</li>
            ))}
          </ul>
        </div>
      </Content>
    </>
  );
};

export default Lesson;
