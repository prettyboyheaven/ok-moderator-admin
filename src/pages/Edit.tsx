import React from "react";
import { Header } from "../components/Header";
import { EditForm } from "../components/EditForm";

export const Edit = props => {
  const { game } = props.location.state;
  return (
    <>
      <Header />
      <EditForm game={game} />
    </>
  );
};
