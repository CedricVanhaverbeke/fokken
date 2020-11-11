import { useCallback } from 'react';
import { useIntl } from 'react-intl';

import throwIfDevelopment from '../utils/throwIfDevelopment';

const useFormatMessage = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (id, ...props) => {
      const message = formatMessage({ id, ...props });

      throwIfDevelopment(message === id, `No translation found for: ${id}`);

      return message;
    },
    [formatMessage],
  );
};

export default useFormatMessage;
