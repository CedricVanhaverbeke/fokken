import { generateClassGroupStudents } from '@/mocks/mockData/classGroup';

import { renderPage } from '../utils';

afterEach(() => {
  jest.clearAllMocks();
});

describe('StudentResultsOverview', () => {
  it('Should open the page when given the route', async () => {
    const { getByText } = await renderPage('/classGroups/23234/lessons/123');
    expect(getByText('Resultaten')).toBeInTheDocument();
  });

  it('should render a table with three columns', async () => {
    const { container } = await renderPage('/classGroups/23234/lessons/123');
    expect(container).toMatchSnapshot();
  });

  it('Should show a list of students', async () => {
    const students = generateClassGroupStudents();
    const { getByText } = await renderPage('/classGroups/23234/lessons/123');
    students.forEach(({ firstName, lastName }) =>
      expect(getByText(`${firstName} ${lastName}`)).toBeInTheDocument(),
    );
  });

  it('Should route to the individual home result page when clicking the button', async () => {
    const listIndex = 1; // Index of first record with submitted answers
    const URL = '/classGroups/23234/lessons/123';
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

  it('Should route to the individual class result page when clicking the button', async () => {
    const listIndex = 1; // Index of first record with submitted answers
    const URL = '/classGroups/23234/lessons/123';
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

  it('Should NOT route to the individual class result page when clicking the button', async () => {
    const listIndex = 0; // Index of first record with NO submitted answers
    const { getAllByText, userEvent, router } = await renderPage(
      '/classGroups/23234/lessons/123',
    );

    const pushSpy = jest.spyOn(router, 'push');

    const activeClassLink = getAllByText('class')[listIndex];
    userEvent.click(activeClassLink);
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });

  it('Should NOT route to the individual home result page when clicking the button', async () => {
    const listIndex = 0; // Index of first record with NO submitted answers
    const { getAllByText, userEvent, router } = await renderPage(
      '/classGroups/23234/lessons/123',
    );

    const pushSpy = jest.spyOn(router, 'push');

    const activeClassLink = getAllByText('home')[listIndex];
    userEvent.click(activeClassLink);
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });
});
