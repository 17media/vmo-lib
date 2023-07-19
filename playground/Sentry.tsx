import React from 'react';
import useSentry from '../lib/hooks/useSentry';

const Follower = () => {
  useSentry();

  const handleSentry = () => console.log(nonExistVariable);

  return (
    <div>
      <h3>
        useSentry can record error in{' '}
        <a href="https://sentry.io/organizations/17live/issues/?referrer=sidebar">
          sentry dashboard
        </a>{' '}
        filter by product tag `&quot;`eventory/custom`&quot;`.
      </h3>
      <p>Following button will trigger error and send it to sentry.</p>
      <button type="button" onClick={handleSentry}>
        trigger error button
      </button>
    </div>
  );
};

export default React.memo(Follower);
