import React from 'react';
import useStartRender from '../lib/hooks/useStartRender';

const StartRender = () => {
  const startRender = useStartRender();

  if (!startRender) {
    return <div>not start render</div>;
  }

  return <div>start render</div>;
};

export default React.memo(StartRender);
