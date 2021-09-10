import axios from 'axios';

export type Translation = {
  key: string;
  values: { language: string; value: string }[];
};

export const getTranslation = async (
  eventType: string,
): Promise<Translation[]> => {
  const url = `https://webcdn.17app.co/campaign/projects/${eventType}/translations.json`;

  const res = await axios.get(url);

  return res.data;
};
