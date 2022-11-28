import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { SENTRY_DSN_URL } from '../constants';

/**
 * 包相關設定檔案統一管理, 只需單純 useSentry.
 */
const useSentry = () => {
  useEffect(() => {
    Sentry.init({
      dsn: SENTRY_DSN_URL,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
    });
    Sentry.configureScope(scope => {
      scope.setTag('product', 'eventory/custom');
    });
  }, []);
};

export default useSentry;
