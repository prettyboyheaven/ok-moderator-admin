import React, { FC, useEffect, useState } from "react";
import styles from "./index.pcss";
import { joinClasses } from "../../../utils/joinClasses";
import { Button } from "../Button";
import { getEndpoint } from "../../../utils/getEndpoint";
import axios from "axios";

interface IProps {
  className: string;
}

const createGame = (gameData) =>  getEndpoint({
  method: "moderation.datasetCreate",
  dataset: encodeURIComponent(
    JSON.stringify(gameData)
  )
});

export const CreationMenu: FC<IProps> = props => {
  const { className } = props;
  const [gameType, setGameType] = useState(null);

  useEffect(() => {
    if (!gameType) {
      return;
    }
    axios.get(createGame(gameType)).then(res => {
      if (res.data.dataset_id) {
        window.location.href = `/edit/${res.data.dataset_id}`;
      } else {
        alert('Что-то пошло не так')
      }
    });
  }, [gameType]);

  const createClassificationGame = () => {
    setGameType({ name: "Классификация", labelingStrategy: { type: "CLASSIFICATION", tagMap: {} } })
  };

  const createInputTextGame = () => {
    setGameType({name: "Ввод текста", labelingStrategy: { type: "INPUT_TEXT", tagMap: {} }})
  };

  return (
    <menu className={joinClasses(styles.creationMenu, className)}>
      <Button className={styles.button} clickHandler={createClassificationGame}>
        Классификация
      </Button>
      <Button className={styles.button} clickHandler={createInputTextGame}>
        Ввод текста
      </Button>
    </menu>
  );
};
