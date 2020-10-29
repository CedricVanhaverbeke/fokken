import userEvent from '@testing-library/user-event';

import TeacherHeader from './Header';

import { render } from '../tests/utils';

const linkTexts = [
  'header.navigation.students',
  'header.navigation.lessons',
  'header.navigation.exams',
  'header.navigation.exercises',
  'header.navigation.hack_room',
  'header.navigation.studio',
];

describe('Teacher header', () => {
  it('should render', () => {
    const { container } = render(<TeacherHeader />);
    expect(container).toMatchSnapshot();
  });

  it('should open profile option', async () => {
    const { findByText } = render(<TeacherHeader />);

    const button = await findByText('Joske');

    expect(button.parentElement).toMatchInlineSnapshot(`
      <div
        class="hidden md:block"
      >
        header.hello
         
        <b>
          Joske
        </b>
      </div>
    `);
    userEvent.click(button.parentElement);

    const profile = await findByText('header.profile');

    expect(profile).toMatchInlineSnapshot(`
      <button
        class="w-full py-1 px-4 text-left rounded-lg hover:bg-gray-200 flex items-center cursor-pointer"
        type="button"
      >
        header.profile
      </button>
    `);
  });

  it('should open header links', async () => {
    const { getByRole, findAllByText } = render(<TeacherHeader />);

    const hamburgerButton = getByRole('button', {
      name: /main menu/i,
    });

    userEvent.click(hamburgerButton);

    for (let link of linkTexts) {
      // eslint-disable-next-line no-await-in-loop
      const button = await findAllByText(link);
      expect(button[0]).toBeVisible();
    }
  });
});
