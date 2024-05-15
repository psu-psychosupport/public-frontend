import type { MetaFunction } from "@remix-run/node";
import { Container } from "@mui/material";
import Search from "~/components/search";
import PopularQuestions from "~/components/popularQuestions";
import AllSections from "~/components/allSections";

export const meta: MetaFunction = () => {
  return [
    { title: "Стобой" },
    { name: "description", content: "Добро пожаловать на сайт Стобой!" },
  ];
};

export default function Index() {

  return (
    <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Search />
      <PopularQuestions />
      <AllSections />
    </Container>
  );
}
