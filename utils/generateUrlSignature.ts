import { Md5 } from "ts-md5/dist/md5";

export const generateUrlSignature = (params: { [key: string]: string }, secretKey: string) => {
  let sig = "";

  Object.keys(params)
    .sort()
    .forEach(key => {
      sig += [key, params[key]].join("=");
    });
  sig += secretKey;
  const md5: Md5 = new Md5();
  md5.appendStr(sig);

  return md5.end();
};
