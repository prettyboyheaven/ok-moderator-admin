import React from "react";
import { getEndpoint } from "../../utils/getEndpoint";
import useFetch from "use-http/dist";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import Trap from "../components/Trap";
import { Trap as TrapType } from "../types/trap";

export const Traps = props => {
  const { game } = props.location.state;
  const { id } = game;
  console.log(game);
  const endPoint = getEndpoint({
    method: "moderation.datasetTrapsGetList",
    dataset_id: id,
    limit: 100
  });

  console.log(endPoint);

  const [request, response] = useFetch(endPoint, { data: [] }, []);
  const { loading, error } = request;
  const { data } = response;

  if (loading) {
    return <p>...loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  const { traps_request: traps } = data;
  const { labelingStrategy } = game;

  const renderTraps = traps.map((trap: TrapType) => (
    <Trap key={trap.id} trap={trap} labelingStrategy={labelingStrategy} />
  ));

  return (
    <>
      <Header />
      {renderTraps}
      <Footer>
        <Button clickHandler={() => null} isSubordinate={true}>
          Отменить
        </Button>
        <Button clickHandler={() => null} isAccent={true}>
          Сохранить
        </Button>
      </Footer>
    </>
  );
};
