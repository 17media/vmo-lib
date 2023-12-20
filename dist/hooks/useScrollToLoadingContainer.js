import { useEffect } from 'react';
/**
 * 在傳入值 loading=true 時，將畫面移動到 html element id=loading-container 的位置
 * @param loading boolean
 */
<<<<<<< Updated upstream
const useScrollToLoadingContainer = (loading) => {
    react_1.useEffect(() => {
=======
export const useScrollToLoadingContainer = (loading) => {
    useEffect(() => {
>>>>>>> Stashed changes
        if (loading) {
            const target = document.getElementById('loading-container');
            if (target) {
                target.scrollIntoView();
            }
        }
    }, [loading]);
};
export default useScrollToLoadingContainer;
//# sourceMappingURL=useScrollToLoadingContainer.js.map