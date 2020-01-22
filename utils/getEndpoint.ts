import { generateUrlSignature } from "./generateUrlSignature";

interface Params {
  method: string;
  [key: string]: any;
}

export const getEndpoint = ({ method, ...rest }: Params): string => {
   // const { searchParams } = new URL(window.location.href);

   const { searchParams } = new URL('http://localhost:1234?container=true&web_server=https%3A%2F%2Ftest.ok.ru&first_start=0&payment_promo_active=true&logged_user_id=577600345987&sig=780e484ebfa296c9c7db0272df218608&new_sig=1&apiconnection=1277040896_1579694901917&authorized=1&session_key=-s-dOUGkzJq2PUjGvNowSuijuIqzLv-iutt.zvfduJRaPumeUOq4OzFgTtw5wunizMx4yTGgxHNWSuh-yuo4SufFVqe&clientLog=0&session_secret_key=610f2511e5f48b422bffc464cea53e5d&auth_sig=63dec06c9d1f23489dc68a8a2319ac21&api_server=https%3A%2F%2Fapitest.ok.ru%2F&ip_geo_location=RU%2C66%2CSaint%20Petersburg&application_key=CBAKBPBNEBABABABA');

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
