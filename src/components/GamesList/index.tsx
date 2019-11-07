import React from "react";
import styles from "./index.pcss";

const { gamesList } = styles;

export const GamesList = () => {
  return (
    <ul className={gamesList}>
      <li className="games-list__item">
        <h1 className="game-list__title">privet</h1>
      </li>
    </ul>
  );
};
