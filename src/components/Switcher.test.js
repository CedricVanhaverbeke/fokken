import Switcher from './Switcher';

import { render } from '@/tests/utils';

afterEach(() => jest.clearAllMocks());

describe('Switcher', () => {
  it('Should show two horizontal arrows', () => {
    const { container } = render(<Switcher />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex"
        >
          <button
            role="previousButton"
          >
            <svg
              fill="currentColor"
              height="1em"
              stroke="currentColor"
              stroke-width="0"
              viewBox="0 0 256 512"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
              />
            </svg>
          </button>
          <button
            role="nextButton"
          >
            <svg
              fill="currentColor"
              height="1em"
              stroke="currentColor"
              stroke-width="0"
              viewBox="0 0 256 512"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
              />
            </svg>
          </button>
        </div>
      </div>
    `);
  });

  it('Should execute the onNext action when clicking an arrow', () => {
    const onNext = jest.fn();
    const { getByRole, userEvent } = render(<Switcher onNext={onNext} />);

    userEvent.click(getByRole('nextButton'));
    expect(onNext).toHaveBeenCalled();
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('Should execute the onPrevious action when clicking an arrow', () => {
    const onPrevious = jest.fn();
    const { getByRole, userEvent } = render(
      <Switcher onPrevious={onPrevious} />,
    );

    userEvent.click(getByRole('previousButton'));
    expect(onPrevious).toHaveBeenCalled();
    expect(onPrevious).toHaveBeenCalledTimes(1);
  });

  it('Should be disabled when the first item is selected', () => {
    const { getByRole } = render(<Switcher currentIndex={0} />);
    expect(getByRole('previousButton')).toBeDisabled();
  });

  it('Should be disabled when the last item is selected', () => {
    const { getByRole } = render(<Switcher currentIndex={1} itemsSize={2} />);
    expect(getByRole('nextButton')).toBeDisabled();
  });
});
