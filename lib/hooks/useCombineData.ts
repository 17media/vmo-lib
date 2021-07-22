import { useCallback, useMemo, useRef } from 'react';
import { map, includes } from 'lodash';

const updateDataset = (original, current) => {
  if (original && original.length && original.length === current.length) {
    return original.map(item => {
      const updateItem = current.find(
        newItem => newItem.userInfo.userID === item.userInfo.userID,
      );
      if (updateItem) {
        return {
          ...item,
          ...updateItem,
        };
      }
      return item;
    });
  }
  return current;
};

export const useCombineDataRound = data => {
  const teamData = {
    team1: [],
    team2: [],
  };

  const dataRef = useRef({ ...teamData });
  const blackList = useMemo(() => {
    let result = [];
    if (data && data[2]) {
      result = map(data[2], item => item.userInfo && item.userInfo.userID);
    }
    return result;
  }, [data]);
  const whiteList = useCallback(
    list => {
      if (list && list.length) {
        const dataset = list.filter(
          item => !includes(blackList, item.userInfo.userID),
        );
        dataset.forEach((item, index) => {
          item.rank = index + 1;
        });
        return dataset;
      }
      return [];
    },
    [blackList],
  );

  if (!data) {
    dataRef.current = teamData;
  }

  if (data && data.length) {
    const preData = dataRef.current;
    const team1 = updateDataset(preData.team1, whiteList(data[0]));
    const team2 = updateDataset(preData.team2, whiteList(data[1]));

    team1.sort((a, b) =>
      (String(a.rank) || '').localeCompare(String(b.rank) || ''),
    );
    team2.sort((a, b) =>
      (String(a.rank) || '').localeCompare(String(b.rank) || ''),
    );

    let team1TotalScore = 0;
    let team2TotalScore = 0;
    team1.forEach((t1: any) => {
      team1TotalScore += t1.score;
    });
    team2.forEach((t2: any) => {
      team2TotalScore += t2.score;
    });

    dataRef.current = {
      team1,
      team2,
      team1Total: team1TotalScore,
      team2Total: team2TotalScore,
    };
  }
  return { finalData: dataRef.current };
};

export const useCombineDataGrabFast = data => {
  const teamData = {
    team1: [],
  };

  const dataRef = useRef({ ...teamData });
  const blackList = useMemo(() => {
    let result = [];
    if (data && data[1]) {
      result = map(data[1], item => item.userInfo && item.userInfo.userID);
    }
    return result;
  }, [data]);
  const whiteList = useCallback(
    list => {
      if (list && list.length) {
        const dataset = list.filter(
          item => !includes(blackList, item.userInfo.userID),
        );
        dataset.forEach((item, index) => {
          item.rank = index + 1;
        });
        return dataset;
      }
      return [];
    },
    [blackList],
  );

  if (!data) {
    dataRef.current = teamData;
  }

  if (data && data.length) {
    const preData = dataRef.current;
    const team1 = updateDataset(preData.team1, whiteList(data[0]));

    team1.sort((a, b) =>
      (String(a.rank) || '').localeCompare(String(b.rank) || ''),
    );

    dataRef.current = {
      team1,
    };
  }
  return { finalData: dataRef.current };
};

export const useCombineDataLotteryList = data => {
  const teamData = {
    team1: [],
  };
  const dataRef = useRef({ ...teamData });

  const blackList = useMemo(() => {
    let result = [];
    if (data && data[1]) {
      result = map(data[1], item => item.userInfo && item.userInfo.userID);
    }
    return result;
  }, [data]);
  const whiteList = useCallback(
    list => {
      if (list && list.length) {
        const dataset = list.filter(
          item => !includes(blackList, item.userInfo.userID),
        );
        dataset.forEach((item, index) => {
          item.rank = index + 1;
        });
        return dataset;
      }
      return [];
    },
    [blackList],
  );

  if (!data) {
    dataRef.current = teamData;
  }

  if (data && data.length) {
    const preData = dataRef.current;
    const team1 = updateDataset(preData.team1, whiteList(data[0]));
    dataRef.current = {
      team1,
    };
  }

  return { finalData: dataRef.current };
};

export const useCombineDataDrawing = data => {
  const teamData = {
    team1: [],
  };
  const dataRef = useRef({ ...teamData });

  const blackList = useMemo(() => {
    let result = [];
    if (data && data[1]) {
      result = map(data[1], item => item.userInfo && item.userInfo.userID);
    }
    return result;
  }, [data]);
  const whiteList = useCallback(
    list => {
      if (list && list.length) {
        const dataset = list.filter(
          item => !includes(blackList, item.userInfo.userID),
        );
        dataset.forEach((item, index) => {
          item.rank = index + 1;
        });
        return dataset;
      }
      return [];
    },
    [blackList],
  );

  if (!data) {
    dataRef.current = teamData;
  }

  if (data && data.length) {
    const preData = dataRef.current;
    const team1 = updateDataset(preData.team1, whiteList(data[0]));
    dataRef.current = {
      team1,
    };
  }

  return { finalData: dataRef.current };
};

export const useCombineDataList = data => {
  const teamData = {
    team1: [],
  };

  let bonusDataR1 = [];
  if (data[1]) {
    bonusDataR1 = [...data[1]];
  }
  let bonusDataR2 = [];
  if (data[2]) {
    bonusDataR2 = [...data[2]];
  }
  let bonusDataR3 = [];
  if (data[3]) {
    bonusDataR3 = [...data[3]];
  }
  let bonusDataR4 = [];
  if (data[4]) {
    bonusDataR4 = [...data[4]];
  }
  const dataRef = useRef({ ...teamData });

  const blackList = useMemo(() => {
    let result = [];
    if (data && data[5]) {
      result = map(data[5], item => item.userInfo && item.userInfo.userID);
    }
    return result;
  }, [data]);
  const whiteList = useCallback(
    list => {
      if (list && list.length) {
        const dataset = list.filter(
          item => !includes(blackList, item.userInfo.userID),
        );
        dataset.forEach((item, index) => {
          item.rank = index + 1;
        });
        return dataset;
      }
      return [];
    },
    [blackList],
  );

  if (!data) {
    dataRef.current = teamData;
  }

  if (data && data.length) {
    const preData = dataRef.current;
    const team1 = updateDataset(preData.team1, whiteList(data[0]));
    // bonus
    const team1WithBonus = team1.map((t: any) => {
      const bonusItem = bonusDataR1.find(
        b => b.userInfo.userID === t.userInfo.userID,
      );
      const bonusItem2 = bonusDataR2.find(
        b => b.userInfo.userID === t.userInfo.userID,
      );
      const bonusItem3 = bonusDataR3.find(
        b => b.userInfo.userID === t.userInfo.userID,
      );
      const bonusItem4 = bonusDataR4.find(
        b => b.userInfo.userID === t.userInfo.userID,
      );
      if (bonusItem || bonusItem2 || bonusItem3 || bonusItem4) {
        const bonus1 = bonusItem ? bonusItem.score : 0;
        const bonus2 = bonusItem2 ? bonusItem2.score : 0;
        const bonus3 = bonusItem3 ? bonusItem3.score : 0;
        const bonus4 = bonusItem4 ? bonusItem4.score : 0;

        return {
          ...t,
          meta: {
            ...t.meta,
            bonustTotal: bonus1 + bonus2 + bonus3 + bonus4,
          },
        };
      }
      return {
        ...t,
      };
    });

    // bonus
    dataRef.current = {
      team1: team1WithBonus,
    };
  }
  return { finalData: dataRef.current };
};
