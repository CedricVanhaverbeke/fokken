import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';

import appEn from '../translations/app.en';
import appNl from '../translations/app.nl';

const languages = {
  nl: appNl,
  en: process.env.NODE_ENV === 'test' ? {} : appEn,
};

const LanguageProvider = ({ onError, children }) => {
  const router = useRouter();
  const locale = process.browser ? router.locale : 'en';

  return (
    <IntlProvider
      locale={locale}
      messages={languages[locale]}
      onError={onError}
    >
      {children}
    </IntlProvider>
  );
};

export default LanguageProvider;
