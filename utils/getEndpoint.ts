import { generateUrlSignature } from "./generateUrlSignature";

interface Params {
  method: string;
  [key: string]: any;
}

export const getEndpoint = ({ method, ...rest }: Params): string => {
  // const { searchParams } = new URL(window.location.href);

  const { searchParams } = new URL('http://localhost:1234/?container=true&web_server=https%3A%2F%2Fok.ru&first_start=0&logged_user_id=577600345987&sig=42ed323bb6b88aab4963ffb01be251ee&new_sig=1&apiconnection=1277041152_1577962049431&authorized=1&session_key=-s-7g5EcsZMhF7f2tXtgi5fePeNaodD2o9Shi7i8O-IcK6Fco6uDH0A1LZQ-i3F2odPBi1bZoevCJ.A2vBtbH8F3oZ9&clientLog=0&session_secret_key=56d1fa73d8fb80d68fa10ce4e79c7496&auth_sig=554ffe7d74e4b024f68809d7e846f071&api_server=https://api.ok.ru/&ip_geo_location=RU%2C66%2CSaint%20Petersburg&application_key=CBALBPBNEBABABABA');

  const appParams = {
    api_server: searchParams.get("api_server") || "",
    application_key: searchParams.get("application_key") || "",
    access_token: searchParams.get("session_key") || "",
    session_secret_key: searchParams.get("session_secret_key") || ""
  };

  const sig = generateUrlSignature(appParams, appParams.session_secret_key);

  const requiredParams: Params = {
    format: "JSON",
    application_key: appParams.application_key,
    access_token: appParams.access_token,
    method,
    ...rest
  };

  const allParams = { ...requiredParams };

  const joinedParams = Object.keys(allParams)
    .map((key) => `${key}=${allParams[key]}`)
    .join("&");

  return `${appParams.api_server}fb.do?${joinedParams}&sig=${sig}`;
};
