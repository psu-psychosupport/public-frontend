import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getMuiLinks } from "./mui/getMuiLinks";
import { MuiMeta } from "./mui/MuiMeta";
import { LinksFunction } from "@remix-run/node";
import { MuiDocument } from "./mui/MuiDocument";
import "./styles/global.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Container } from "@mui/material";

export const links: LinksFunction = () => [...getMuiLinks()];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <MuiMeta />
        <Links />
      </head>
      <body>
        <Header />
        <Container sx={{display: "flex", flexGrow: 1, justifyContent: "center"}}>
          {children}
        </Container>
        <Footer />
        
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <MuiDocument>
        <Outlet />
      </MuiDocument>
    </>
  );
}
