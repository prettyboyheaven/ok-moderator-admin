import React from "react";
import styles from "./index.pcss";
import useAxios from "axios-hooks";
import { ControlPanel } from "../ControlPanel";
import { getEndpoint } from "../../../utils/getEndpoint";
import { Icon } from "../Icon";
import { PRIORITY, ID, TYPE } from "../../constants/icons";

interface game {
  coverPhotoUrl: string;
  name: string;
  taskDescription: string;
  priority: string;
  id: string;
  labelingStrategy: {
    type?: string;
  };
  totalRecords: string;
  processedRecords: string;
}

interface GameName {
  name: string;
  taskDescription: string;
}

interface GameStats {
  priority: string;
  id: string;
  type?: string;
}

interface GameProgress {
  processedRecords: string;
  totalRecords: string;
}

const GameName = ({ name, taskDescription }: GameName) => (
  <div className={styles.name}>
    <h1 className={styles.title}>{name}</h1>
    <p>{taskDescription}</p>
  </div>
);

const GameStats = ({ priority, id, type }: GameStats) => (
  <div className={styles.stats}>
    <p className={styles.description}>
      <Icon name={PRIORITY} />
      <span>{priority}</span>
    </p>
    <p className={styles.description}>
      <Icon name={ID} />
      <span>{id}</span>
    </p>
    <p className={styles.description}>
      <Icon name={TYPE} />
      <span>{type}</span>
    </p>
  </div>
);

const GameProgress = ({ processedRecords, totalRecords }: GameProgress) => {
  const progress = Math.floor((+processedRecords / +totalRecords) * 100) || 0;

  return (
    <div className={styles.progress}>
      <div className={styles.progressLine} style={{ width: `${progress}%` }} />
      <p>{`${progress}% (${processedRecords}/${totalRecords})`}</p>
    </div>
  );
};

export const GamesList = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    getEndpoint({ method: "moderation.datasetGetList" })
  );

  if (loading) {
    return <p>...loading</p>;
  }

  const { datasets: games } = data;

  const renderGames = games
    .filter(game => game.state === "ACTIVE")
    .map((game: game) => {
      const {
        coverPhotoUrl,
        name,
        taskDescription,
        priority,
        id,
        labelingStrategy,
        totalRecords,
        processedRecords
      } = game;

      const type = labelingStrategy && labelingStrategy.type;

      return (
        <li className={styles.game} key={id}>
          <GameName name={name} taskDescription={taskDescription} />
          <img
            className={styles.image}
            src={coverPhotoUrl}
            alt={coverPhotoUrl}
          />
          <GameStats priority={priority} id={id} type={type} />
          <GameProgress
            processedRecords={processedRecords}
            totalRecords={totalRecords}
          />
          <ControlPanel id={id} />
        </li>
      );
    });

  return <ul>{renderGames}</ul>;
};
