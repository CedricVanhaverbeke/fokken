import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TeacherHeader from './Header';
import { render } from '../tests/util';

const linkTexts = [
  'Leerlingen',
  'Leer',
  'Test',
  'Codeer',
  'Hack Room',
  'Studio',
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
        Hello, 
         
        <b>
          Joske
        </b>
      </div>
    `);
    userEvent.click(button.parentElement);

    const profile = await findByText('Profiel');

    expect(profile).toMatchInlineSnapshot(`
      <button
        class="w-full py-1 px-4 text-left rounded-lg hover:bg-gray-200 flex items-center cursor-pointer"
        type="button"
      >
        Profiel
      </button>
    `);
  });

  it('should open header links', async () => {
    const { getByRole, findAllByText, debug } = render(<TeacherHeader />);

    const hamburgerButton = getByRole('button', {
      name: /main menu/i,
    });

    userEvent.click(hamburgerButton);

    for (let link of linkTexts) {
      const button = await findAllByText(link);
      expect(button[0]).toBeVisible();
    }
  });
});
