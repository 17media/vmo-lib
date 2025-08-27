import { getEventoryFireantUrl, getOfficial17LiveUrl } from '../utils';
const useLogin = () => {
    const login = () => {
        const eventoryFireantUrl = getEventoryFireantUrl();
        const official17LiveUrl = getOfficial17LiveUrl();
        const toParam = `${eventoryFireantUrl}/redirect?redirectUrl=${encodeURIComponent(window.location.href)}`;
        const redirectLoginUrl = `${official17LiveUrl}/redirect_auth?method=post&to=${encodeURIComponent(toParam)}`;
        window.location.href = redirectLoginUrl;
    };
    return { login };
};
export default useLogin;
//# sourceMappingURL=useLogin.js.map