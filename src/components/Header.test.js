import { render } from '@testing-library/react';
import TeacherHeader from './Header';

describe('Teacher header', () => {
  it('should render', () => {
    const { container } = render(<TeacherHeader />);
    expect(container).toMatchSnapshot();
  });
});
