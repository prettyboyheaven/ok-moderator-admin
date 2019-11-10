import React from "react";
import styles from "./index.pcss";
import useAxios from "axios-hooks";
import { ControlPanel } from "../ControlPanel";

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
    "https://api.ok.ru/fb.do?method=moderation.datasetGetList&format=JSON&application_key=CBALBPBNEBABABABA&sig=e774813f8bacfde9b756e364ba526a0c&access_token=-s-en3A5nBOiicdeNaL9o6f4Obw9H.e1o-Shjze5PeQfKajbL6L-i7E3pXMbl5DdoYtbG1B6L6MDK4d4LdLbp0i3t88"
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
