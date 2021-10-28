import { useState, useEffect } from 'react';

/**
 * 設定 startRender 為 true 並且回傳
 * @returns startRender
 */
const useStartRender = () => {
  const [startRender, setStartRender] = useState(false);
  useEffect(() => {
    setStartRender(true);
  }, []);
  return startRender;
};

export default useStartRender;
