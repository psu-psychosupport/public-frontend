import { Container, Box, Stack } from "@mui/material";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, redirect } from "@remix-run/react";
import { httpClient } from "~/api/http";

export async function loader({request}: LoaderFunctionArgs) {
  if (request.url.endsWith("/signin")) return null;
  const session = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  const accessToken = session.get("access_token");
  const refreshToken = session.get("refresh_token");

  if (!accessToken || !refreshToken) throw redirect("/signin");

  return null;
}

export default function MyaccountLayout() {
  return (
    <Container sx={{display: "flex", gap: 2, flexGrow: 1, pt: 2.5, pb: 3}}>
      <Stack 
        spacing={1.5} pt={3} pr={4} pl={3} bgcolor={"#FFFFFF"} 
        sx={{
          borderRadius: "4px",
          boxShadow: "0px 0px 7px #638EFF",
          fontSize: 18
        }}
      >
        <Link
          to={"/me"}
          style={{textDecoration: "none", color: "#303044"}}
        >Личная информация</Link>
        <Link
          to={"/me/interface"}
          style={{textDecoration: "none", color: "#303044"}}
        >Интерфейс</Link>
        <Link
          to={"/me/bookmarks"}
          style={{textDecoration: "none", color: "#303044"}}
        >Закладки</Link>
        <Link
          to={"/me/notes"}
          style={{textDecoration: "none", color: "#303044"}}
        >Заметки</Link>
      </Stack>
      
      <Container 
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "gray",
          paddingY: 2.5,
          flex: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
          boxShadow: "0px 0px 7px #638EFF"
        }}>
        <Outlet/>
      </Container>
    </Container>
  )
}