import { redirect } from "@remix-run/react";

import { sessionStorage } from "~/sessions";
import { httpClient } from "~/api/http";

const getUser = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  let accessToken = session.get("access_token");
  const refreshToken = session.get("refresh_token");

  if (!accessToken && !refreshToken) return null;

  httpClient.setTokens({ accessToken, refreshToken });

  await httpClient.getMe();

  accessToken = httpClient.getTokens().accessToken;
  session.set("access_token", accessToken);
  const headers = new Headers();
  headers.append("Set-Cookie", await sessionStorage.commitSession(session));
  throw redirect("/me", { headers });
}

export default getUser;