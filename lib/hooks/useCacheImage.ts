import { useState, useEffect } from 'react';
import { set, getMany } from 'idb-keyval';
import axios from 'axios';

export const useCacheImage = (imageUrls: string[]) => {
  const [cacheImage, setCacheImage] = useState<Record<string, string>>({});

  const handleSetCache = async (url: string) => {
    const res = await axios.get(url, { responseType: 'blob' });

    const reader = new FileReader();

    reader.readAsDataURL(res.data);
    reader.onloadend = () => {
      const base64data = reader.result;

      // no await
      set(url, base64data);
      setCacheImage(state => ({
        ...state,
        [url]: base64data as string,
      }));
    };
  };

  useEffect(() => {
    (async () => {
      const allImageCaches = await getMany<string>(imageUrls);

      imageUrls.forEach((url, index) => {
        const cache = allImageCaches[index];

        if (cache) {
          setCacheImage(state => ({
            ...state,
            [url]: cache,
          }));
        } else {
          setCacheImage(state => ({
            ...state,
            [url]: url,
          }));

          window.requestIdleCallback(handleSetCache.bind(this, url));
        }
      });
    })();
  }, [JSON.stringify(imageUrls)]);

  return cacheImage;
};

export default useCacheImage;
