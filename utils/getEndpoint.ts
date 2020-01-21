import { generateUrlSignature } from "./generateUrlSignature";

interface Params {
  method: string;
  [key: string]: any;
}

export const getEndpoint = ({ method, ...rest }: Params): string => {
   const { searchParams } = new URL(window.location.href);

   // const { searchParams } = new URL('http://localhost:1234/?container=true&web_server=https%3A%2F%2Fok.ru&first_start=0&logged_user_id=577600345987&sig=0977a4fabfd882f8c760021121ff81b4&new_sig=1&apiconnection=1277041152_1579628981079&authorized=1&session_key=-s-9j4dasbPdobA6NZtgi0C2uBLdGbd6o6u9i2AdN7-Al-kzN8xDj1F2MAybn6kboawck8D1mcRdg4c6odthI0b5m8&clientLog=0&session_secret_key=0e3b0956666dd10f534450cdbf912a79&auth_sig=1c26cde690c58adac2d00a649f14124d&api_server=https://api.ok.ru/&ip_geo_location=RU%2C66%2CSaint%20Petersburg&application_key=CBALBPBNEBABABABA');

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
