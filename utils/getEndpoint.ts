import { generateUrlSignature } from "./generateUrlSignature";

interface Params {
  method: string;
  [key: string]: any;
}

export const getEndpoint = ({ method, ...rest }: Params): string => {
  // const { searchParams } = new URL(window.location.href);

   const { searchParams } = new URL('http://localhost:1234/?container=true&web_server=https%3A%2F%2Fok.ru&first_start=0&logged_user_id=577600345987&sig=cc7e1a817a30cada367e0d5c13bc387b&new_sig=1&apiconnection=1277041152_1579804248341&authorized=1&session_key=-s-9I5h6n7J8I6d0PfwZh6f0nbwCk2e1u-QbjzecPeReKajbPbL-iaf3vXwbo5DboZtbK1e5v6Mai3d.qYybKef3t88&clientLog=0&session_secret_key=08adb45bdd684ea9e35328c61c9a2732&auth_sig=351a02f62a6f8f877230728b4bcd921f&api_server=https://api.ok.ru/&ip_geo_location=RU%2C66%2CSaint%20Petersburg&application_key=CBALBPBNEBABABABA');

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
