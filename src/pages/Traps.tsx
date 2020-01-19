import React, {useEffect, useReducer} from "react";
import { getEndpoint } from "../../utils/getEndpoint";
import useFetch from "use-http/dist";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import Trap from "../components/Trap";
import { Trap as TrapType } from "../types/trap";

const init = (initialTraps) => {
  return { traps: initialTraps }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRAPS': {
      return {...state, traps: [...state.traps, action.payload.traps]}
    }
  }
};

export const Traps = props => {
  const { game } = props.location.state;
  const { id } = game;
  const endPoint = getEndpoint({
    method: "moderation.datasetTrapsGetList",
    dataset_id: id,
    limit: 1
  });



  const [request, response] = useFetch(endPoint, { data: [] }, []);
  const [state, dispatch] = useReducer(reducer, traps, init);

  const { loading, error } = request;
  const { data } = response;


  const reFetch = () => request.get(endPoint);

  if (loading) {
    return <p>...loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  const { traps_request: traps } = data;
  const { labelingStrategy } = game;


  console.log(state);

  const renderTraps = traps.map((trap: TrapType) => (
    <Trap key={trap.id} trap={trap} labelingStrategy={labelingStrategy} reFetch={ reFetch } />
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
