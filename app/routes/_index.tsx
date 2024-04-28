import type { MetaFunction } from "@remix-run/node";
import { Container } from "@mui/material";
import Header from "../components/header";
import Search from "~/components/search";
import PopularQuestions from "~/components/popularQuestions";
import AllSections from "~/components/allSections";
import Footer from "~/components/footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Стобой" },
    { name: "description", content: "Добро пожаловать на сайт Стобой!" },
  ];
};

export default function Index() {

  return (
    <Container maxWidth={false} disableGutters>
      <Header />
      <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Search />
        <PopularQuestions />
        <AllSections />
      </Container>
      <Footer />
    </Container>
  );
}
