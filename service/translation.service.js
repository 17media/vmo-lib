import axios from 'axios';
export const getTranslation = async (eventType) => {
    const url = `https://webcdn.17app.co/campaign/projects/${eventType}/translations.json`;
    const res = await axios.get(url);
    return res.data;
};
//# sourceMappingURL=translation.service.js.map