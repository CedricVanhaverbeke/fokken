import { renderPage } from '../utils';

import { classGroupLessonStudents } from '@/mocks/mockData/classGroup';

import { sortByLastNameAndFirstName } from '@/utils/sort';

const URL = '/classgroups/:classGroupId/lessons/:lessonId';

const students = sortByLastNameAndFirstName(classGroupLessonStudents);

describe('StudentResultsOverview', () => {
  it('should render the results page when navigating to the URL', async () => {
    const { container, getByText, findByText } = await renderPage(URL);

    await findByText('results-overview.title.results');

    expect(container).toMatchSnapshot();

    students.forEach(({ firstName, lastName }) =>
      expect(getByText(`${firstName} ${lastName}`)).toBeInTheDocument(),
    );
  });

  it('should show a skeleton when initially loading the page', async () => {
    const { queryByRole } = await renderPage(URL);
    expect(queryByRole('loading')).toBeDefined();
  });

  it('should route to the individual home result page when clicking the button', async () => {
    const listIndex = 1; // Index of first record with submitted answers
    const {
      getAllByText,
      userEvent,
      router,
      route,
      findByText,
    } = await renderPage(URL);

    const pushSpy = jest.spyOn(router, 'push');

    await findByText(`${students[0].firstName} ${students[0].lastName}`);

    const activeHomeLink = getAllByText('results-overview.home')[listIndex];
    userEvent.click(activeHomeLink);

    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(
      pushSpy,
    ).toHaveBeenLastCalledWith(
      `${route}/students/${students[listIndex].id}?viewMode=SELFSTUDY`,
      `${route}/students/${students[listIndex].id}?viewMode=SELFSTUDY`,
      { shallow: undefined },
    );
  });

  it('should route to the individual class result page when clicking the button', async () => {
    const listIndex = 1; // Index of first record with submitted answers
    const {
      getAllByText,
      userEvent,
      router,
      route,
      findByText,
    } = await renderPage(URL);

    const pushSpy = jest.spyOn(router, 'push');

    await findByText(`${students[0].firstName} ${students[0].lastName}`);

    const activeClassLink = getAllByText('results-overview.class')[listIndex];
    userEvent.click(activeClassLink);

    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(
      pushSpy,
    ).toHaveBeenLastCalledWith(
      `${route}/students/${students[listIndex].id}?viewMode=CLASSICAL`,
      `${route}/students/${students[listIndex].id}?viewMode=CLASSICAL`,
      { shallow: undefined },
    );
  });

  it('should not route to the individual class result page when clicking the button', async () => {
    const listIndex = 0; // Index of first record with NO submitted answers
    const { getAllByText, userEvent, router } = await renderPage(URL);

    const pushSpy = jest.spyOn(router, 'push');

    const activeClassLink = getAllByText('results-overview.class')[listIndex];
    userEvent.click(activeClassLink);
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });

  it('should not route to the individual home result page when clicking the button', async () => {
    const listIndex = 0; // Index of first record with NO submitted answers
    const { getAllByText, userEvent, router } = await renderPage(URL);

    const pushSpy = jest.spyOn(router, 'push');

    const activeClassLink = getAllByText('results-overview.home')[listIndex];
    userEvent.click(activeClassLink);
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });
});
