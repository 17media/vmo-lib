import { useState, useEffect } from 'react';
/**
 * 設定 startRender 為 true 並且回傳
 * @returns startRender
 */
const useStartRender = () => {
<<<<<<< Updated upstream
    const [startRender, setStartRender] = react_1.useState(false);
    react_1.useEffect(() => {
=======
    const [startRender, setStartRender] = useState(false);
    useEffect(() => {
>>>>>>> Stashed changes
        setStartRender(true);
    }, []);
    return startRender;
};
export default useStartRender;
//# sourceMappingURL=useStartRender.js.map