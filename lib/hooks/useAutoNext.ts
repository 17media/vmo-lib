import { useEffect, useRef } from "react";
import { qs, globalThis } from "../utils";

const useAutoNext = (isEnded: boolean, page: number) => {
  useEffect(() => {
    if (isEnded) {
      const search = qs();
      const query = {
        ...search,
        page,
      };
      const queryPath = Object.entries(query).map(
        ([key, value]) => `${key}=${value}`
      );
      const nextLocation = `${globalThis.location.pathname}?${queryPath.join(
        "&"
      )}`;
      globalThis.location.href = nextLocation;
    }
  }, [isEnded, page]);
};

export default useAutoNext;
