import { renderPage } from '../utils';

import { classGroupLessonStudents } from '@/mocks/mockData/classGroup';

const URL = '/classgroups/:classGroupId/lessons/:lessonId';

describe('StudentResultsOverview', () => {
  const students = classGroupLessonStudents;

  it('should render the results page when navigating to the URL', async () => {
    const { container, getByText, findByText } = await renderPage(URL);

    await findByText('results-overview.title.results');

    expect(container).toMatchSnapshot();

    students.forEach(({ firstName, lastName }) =>
      expect(getByText(`${firstName} ${lastName}`)).toBeInTheDocument(),
    );
  });

  it('should route to the individual home result page when clicking the button', async () => {
    const listIndex = 1; // Index of first record with submitted answers
    const { getAllByText, userEvent, router, route } = await renderPage(URL);

    const pushSpy = jest.spyOn(router, 'push');

    const activeHomeLink = getAllByText('results-overview.home')[listIndex];
    userEvent.click(activeHomeLink);

    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(
      pushSpy,
    ).toHaveBeenLastCalledWith(
      `${route}/students/${listIndex}?viewMode=SELFSTUDY`,
      `${route}/students/${listIndex}?viewMode=SELFSTUDY`,
      { shallow: undefined },
    );
  });

  it('should route to the individual class result page when clicking the button', async () => {
    const listIndex = 1; // Index of first record with submitted answers
    const { getAllByText, userEvent, router, route } = await renderPage(URL);

    const pushSpy = jest.spyOn(router, 'push');

    const activeClassLink = getAllByText('results-overview.class')[listIndex];
    userEvent.click(activeClassLink);

    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(
      pushSpy,
    ).toHaveBeenLastCalledWith(
      `${route}/students/${listIndex}?viewMode=CLASSICAL`,
      `${route}/students/${listIndex}?viewMode=CLASSICAL`,
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
