import { renderPage } from '../utils';

import { classGroupLessonStudents } from '@/mocks/mockData/classGroup';

describe('StudentResultsOverview', () => {
  const students = classGroupLessonStudents;

  it('should render the results page when navigating to the URL', async () => {
    const { container, getByText } = await renderPage(
      '/classgroups/23234/lessons/123',
    );
    expect(container).toMatchSnapshot();
    students.forEach(({ firstName, lastName }) =>
      expect(getByText(`${firstName} ${lastName}`)).toBeInTheDocument(),
    );
  });

  it('should route to the individual home result page when clicking the button', async () => {
    const listIndex = 1; // Index of first record with submitted answers
    const URL = '/classgroups/23234/lessons/123';
    const { getAllByText, userEvent, router } = await renderPage(URL);

    const pushSpy = jest.spyOn(router, 'push');

    const activeHomeLink = getAllByText('home')[listIndex];
    userEvent.click(activeHomeLink);
    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(
      pushSpy,
    ).toHaveBeenLastCalledWith(
      `${URL}/students/${listIndex}?viewMode=HOME`,
      `${URL}/students/${listIndex}?viewMode=HOME`,
      { shallow: undefined },
    );
  });

  it('should route to the individual class result page when clicking the button', async () => {
    const listIndex = 1; // Index of first record with submitted answers
    const URL = '/classgroups/23234/lessons/123';
    const { getAllByText, userEvent, router } = await renderPage(URL);

    const pushSpy = jest.spyOn(router, 'push');

    const activeClassLink = getAllByText('class')[listIndex];
    userEvent.click(activeClassLink);
    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(
      pushSpy,
    ).toHaveBeenLastCalledWith(
      `${URL}/students/${listIndex}?viewMode=CLASS`,
      `${URL}/students/${listIndex}?viewMode=CLASS`,
      { shallow: undefined },
    );
  });

  it('should not route to the individual class result page when clicking the button', async () => {
    const listIndex = 0; // Index of first record with NO submitted answers
    const { getAllByText, userEvent, router } = await renderPage(
      '/classgroups/23234/lessons/123',
    );

    const pushSpy = jest.spyOn(router, 'push');

    const activeClassLink = getAllByText('class')[listIndex];
    userEvent.click(activeClassLink);
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });

  it('should not route to the individual home result page when clicking the button', async () => {
    const listIndex = 0; // Index of first record with NO submitted answers
    const { getAllByText, userEvent, router } = await renderPage(
      '/classgroups/23234/lessons/123',
    );

    const pushSpy = jest.spyOn(router, 'push');

    const activeClassLink = getAllByText('home')[listIndex];
    userEvent.click(activeClassLink);
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });
});
