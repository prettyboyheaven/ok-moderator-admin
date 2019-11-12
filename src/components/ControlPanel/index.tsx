import React from "react";
import { Icon } from "../Icon";
import { Link } from "react-router-dom";
import { CHARTS, EDIT } from "../../constants/icons";
import { ExternalLink } from "../ExternalLink";

interface IProps {
  id: string;
}

export const ControlPanel = ({ id }: IProps) => {
  const chartsUrl = `https://charts.odkl.ru/reports?id=1330587&ModerationArenaOpStatParam1=${id}&filter=true`;

  return (
    <div>
      <Link to={{ pathname: `/edit/${id}` }}>
        <Icon name={EDIT} />
      </Link>
      <ExternalLink url={chartsUrl}>
        <Icon name={CHARTS} />
      </ExternalLink>
    </div>
  );
};
