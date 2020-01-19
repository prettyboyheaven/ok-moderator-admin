import React, { useState } from "react";
import useFetch from "use-http";
import { Header } from "../components/Header";
import { GamesList } from "../components/GamesList";
import { Filters } from "../components/Filters";
import { getEndpoint } from "../../utils/getEndpoint";
import { filters } from "../enums/gameStateFilters";

export const Games = () => {
  const endPoint = getEndpoint({ method: "moderation.datasetGetList" });
  const [activeFilter, setActiveFilter] = useState(Object.keys(filters)[1]);

  const [request, response] = useFetch(endPoint, { data: [] }, []);

  const { loading, error } = request;
  const { data } = response;

  if (loading) {
    return <p>...loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  const refetch = () => request.get(endPoint);

  const { datasets: games } = data;
  console.log(games);

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
      <GamesList games={games} activeFilter={activeFilter} refetch={ refetch } />
    </>
  );
};
