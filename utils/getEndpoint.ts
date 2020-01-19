import { generateUrlSignature } from "./generateUrlSignature";

interface Params {
  method: string;
  [key: string]: any;
}

export const getEndpoint = ({ method, ...rest }: Params): string => {
  // const { searchParams } = new URL(window.location.href);

  const { searchParams } = new URL('http://localhost:1234/?container=true&web_server=https%3A%2F%2Fok.ru&first_start=0&logged_user_id=577600345987&sig=e90f078ac3ae75c4365d98fa630bba54&new_sig=1&apiconnection=1277041152_1579427582523&authorized=1&session_key=-s-0oaddreNCgZg5p9wfkzB5PBtcIZh6oaKfn4B.tbPbj1B1-bvfo0f6vYOBjci7mZLi-0d2m9LhiceepBJfH1deu6&clientLog=0&session_secret_key=1e0a8258f7c4e9548bcd09874fb711c2&auth_sig=ebafacaf77fb79dbdfb1cfe1041fa4fa&api_server=https://api.ok.ru/&ip_geo_location=RU%2C66%2CSaint%20Petersburg&application_key=CBALBPBNEBABABABA');

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
