import Collapsable from './Collapsable';

import { render } from '@/tests/utils';

afterEach(() => jest.clearAllMocks());

const childText = 'child';
const triggerText = 'trigger';

const Child = () => <span>{childText}</span>;

const trigger = <span>{triggerText}</span>;

describe('Collapsable', () => {
  it('Should throw an error when no trigger is found', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Collapsable />)).toThrowError();
  });

  it('Should show the children when initialValue equals true', () => {
    const { getByText } = render(
      <Collapsable trigger={trigger} initialValue={true}>
        <Child />
      </Collapsable>,
    );

    expect(getByText(childText)).toBeInTheDocument();
  });

  it('Should show the children when the trigger is clicked', () => {
    const { getByText, queryByText, userEvent } = render(
      <Collapsable trigger={trigger}>
        <Child />
      </Collapsable>,
    );
    expect(queryByText(childText)).toBeNull();

    userEvent.click(getByText(triggerText));

    expect(getByText(childText)).toBeInTheDocument();
  });

  it('Should hide the children when the trigger is clicked and children are not hidden', () => {
    const { getByText, queryByText, userEvent } = render(
      <Collapsable trigger={trigger} initialValue={true}>
        <Child />
      </Collapsable>,
    );
    expect(getByText(childText)).toBeInTheDocument();

    userEvent.click(getByText(triggerText));

    expect(queryByText(childText)).toBeNull();
  });
});
