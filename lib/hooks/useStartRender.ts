import { useState, useEffect } from 'react';

const useStartRender = () => {
  const [startRender, setStartRender] = useState(false);
  useEffect(() => {
    setStartRender(true);
  }, []);
  return startRender;
};

export default useStartRender;
