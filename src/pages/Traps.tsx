import React, { useEffect, useState } from "react";
import axios from "axios";
import { getEndpoint } from "../../utils/getEndpoint";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import Trap from "../components/Trap";
import { Trap as TrapType } from "../types/trap";

export const Traps = props => {
  const { game } = props.location.state;
  const { id } = game;

  const loadTrapsEndpoint = getEndpoint({
    method: "moderation.datasetTrapsGetList",
    dataset_id: id,
    limit: 100
  });

  const [traps, setTraps] = useState([]);
  const [isNeedFetch, setFetchStatus] = useState(true);

  const loadTraps = () => {
    if (!isNeedFetch) {
      return;
    }

    axios.get(loadTrapsEndpoint).then(res => {
      const traps = res.data.traps_request;
      setTraps(traps);
      setFetchStatus(false);
    });
  };

  useEffect(loadTraps, [isNeedFetch]);

  const { labelingStrategy } = game;
  const renderTraps = () => {
    if (traps && traps.length) {
      return traps.map((trap: TrapType) => (
        <Trap key={trap.id} trap={trap} setFetchStatus={setFetchStatus} labelingStrategy={labelingStrategy} />
      ));
    }

    return <p>Ловушки отсутствуют</p>;
  };

  return (
    <>
      <Header />
      {renderTraps()}
      /* Без футера так как изменения, не происходят по данным кнопкам */
      {/*<Footer>*/}
      {/*  <Button clickHandler={() => null} isSubordinate={true}>*/}
      {/*    Отменить*/}
      {/*  </Button>*/}
      {/*  <Button clickHandler={() => null} isAccent={true}>*/}
      {/*    Сохранить*/}
      {/*  </Button>*/}
      {/*</Footer>*/}
    </>
  );
};
