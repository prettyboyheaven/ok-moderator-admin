import React, { useState } from "react";
import useAxios from "axios-hooks";
import { Header } from "../components/Header";
import { GamesList } from "../components/GamesList";
import { Filters } from "../components/Filters";
import { getEndpoint } from "../../utils/getEndpoint";
import { filters } from "../enums/gameStateFilters";

export const Games = () => {
  const [{ data, loading, error }, refetch] = useAxios(getEndpoint({ method: "moderation.datasetGetList" }));

  const [activeFilter, setActiveFilter] = useState(Object.keys(filters)[1]);

  if (loading) {
    return <p>...loading</p>;
  }

  const { datasets: games } = data;
  return (
    <>
      <Header />
      <Filters
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        games={games}
        refetch={refetch}
      />
      <GamesList games={games} activeFilter={activeFilter} />
    </>
  );
};
