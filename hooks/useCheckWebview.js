import { useState, useEffect } from 'react';
export const useCheckWebview = () => {
    const [isWebview, setIsWebview] = useState(false);
    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const safari = /safari/.test(userAgent);
        const ios = /iphone|ipod|ipad/.test(userAgent);
        setIsWebview((ios && !safari) || (!ios && userAgent.includes('wv')));
    }, []);
    return isWebview;
};
export default useCheckWebview;
//# sourceMappingURL=useCheckWebview.js.map