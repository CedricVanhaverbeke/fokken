import { useEffect } from 'react';

const useTitle = (...titles) => {
  useEffect(() => {
    const previousTitle = window.document.title;
    window.document.title =
      titles.length > 0 ? `FOKWITHME · ${titles.join(' · ')}` : 'FOKWITHME';

    return () => {
      window.document.title = previousTitle;
    };
  }, [titles]);
};

export default useTitle;
