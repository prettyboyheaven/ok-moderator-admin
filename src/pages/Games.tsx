import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { GamesList } from "../components/GamesList";
import { Filters } from "../components/Filters";
import { getEndpoint } from "../../utils/getEndpoint";
import { filters } from "../enums/gameStateFilters";
import { Game } from "../interfaces/game";
import axios from "axios";

export const Games = () => {
  const endPoint = getEndpoint({ method: "moderation.datasetGetList" });
  const [games, setGames] = useState<Game[]>([]);
  const [activeFilter, setActiveFilter] = useState(Object.keys(filters)[1]);
  const [isNeedFetch, setFetchStatus] = useState(true);

  const loadGames = () => {
    if (!isNeedFetch) {
      return;
    }
    axios.get(endPoint).then(res => {
      if (res.data.datasets) {
        setGames(res.data.datasets);
        setFetchStatus(false);
      } else {
        alert("Что-то пошло не так...");
      }
    });
  };

  useEffect(loadGames, [isNeedFetch]);

  if (isNeedFetch) {
    return <p>Загрузка...</p>
  }

  if (!games.length) {
    return null;
  }

  return (
    <>
      <Header />
      <Filters
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        games={games}
        setFetchStatus={setFetchStatus}
      />
      <GamesList games={games} activeFilter={activeFilter} setFetchStatus={setFetchStatus} />
    </>
  );
};
