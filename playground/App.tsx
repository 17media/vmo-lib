import React, { useState } from "react";
import OfflineRound from "./OfflineRound";
import OfflineTeamRound from "./OfflineTeamRound";
import LuckyDraw from "./LuckyDraw";

const App = () => {
  const [currentComponent, setCurrentComponent] =
    useState<string>("offlineRound");
  const changeComponent = (componentName: string) =>
    setCurrentComponent(componentName);

  return (
    <div>
      <div>
        選擇範例:
        <button onClick={() => changeComponent("offlineRound")}>
          OfflineRound
        </button>
        <button onClick={() => changeComponent("luckyDraw")}>LuckyDraw</button>
        <button onClick={() => changeComponent("OfflineTeamRound")}>
          LuckyDraw
        </button>
      </div>
      <hr />
      {currentComponent === "offlineRound" && <OfflineRound />}
      {currentComponent === "luckyDraw" && <LuckyDraw />}
      {currentComponent === "OfflineTeamRound" && <OfflineTeamRound />}
    </div>
  );
};

export default App;
