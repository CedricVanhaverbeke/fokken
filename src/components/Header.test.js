import { render } from '@testing-library/react';
import TeacherHeader from './Header';

describe('Teacher header', () => {
  it('should render without crashing', () => {
    const { container } = render(<TeacherHeader />);
  });
});
