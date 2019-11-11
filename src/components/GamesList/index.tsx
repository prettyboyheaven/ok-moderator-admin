import React from "react";
import styles from "./index.pcss";
import useAxios from "axios-hooks";
import { ControlPanel } from "../ControlPanel";
import { getEndpoint } from "../../../utils/getEndpoint";

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

export const GamesList = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    getEndpoint({ method: "moderation.datasetGetList" })
  );

  if (loading) {
    return <p>...loading</p>;
  }

  const { datasets: games } = data;

  const renderGames = games.map((game: game) => {
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
    const progress = Math.floor((+processedRecords / +totalRecords) * 100) || 0;

    return (
      <li key={id}>
        <div>
          <h1 className={styles.title}>{name}</h1>
          <p className={styles.description}>{taskDescription}</p>
        </div>
        <img className={styles.image} src={coverPhotoUrl} alt={coverPhotoUrl} />
        <div>
          <p className={styles.description}>{priority}</p>
          <p className={styles.description}>{id}</p>
          <p className={styles.description}>{type}</p>
        </div>
        <div className={styles.progress}>
          <div
            className={styles.progressLine}
            style={{ width: `${progress}%` }}
          />
          <p>{`${progress}% (${processedRecords}/${totalRecords})`}</p>
        </div>
        <ControlPanel />
      </li>
    );
  });

  return <ul>{renderGames}</ul>;
};
