import React, { useState } from 'react';
import useStartRender from '../lib/hooks/useStartRender';

const StartRender = () => {
  const hookRenderValue = useStartRender();
  const [startRender, setStartRender] = useState(false);

  const onClickStartRender = () => {
    setStartRender(hookRenderValue);
  };

  const renderView = () => {
    if (!startRender) {
      return <div>not start render</div>;
    }

    return <div>start render</div>;
  };

  return (
    <div>
      <button type="button" onClick={onClickStartRender}>
        Start Render
      </button>
      {renderView()}
    </div>
  );
};

export default React.memo(StartRender);
