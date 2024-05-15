import { json, MetaFunction } from "@remix-run/node";
import { Container } from "@mui/material";
import Search from "~/components/search";
import PopularQuestions from "~/components/popularQuestions";
import AllSections from "~/components/allSections";
import { httpClient } from "~/api/http";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Стобой" },
    { name: "description", content: "Добро пожаловать на сайт Стобой!" },
  ];
};

export async function loader() {
  const [popularPostsRes, categoriesRes] = await Promise.all([
    httpClient.getPopularPosts(),
    httpClient.getCategories(),
  ]);
  return json({ posts: popularPostsRes.data!, categories: categoriesRes.data! });
}

export default function Index() {
  const { posts, categories } = useLoaderData<typeof loader>();

  return (
    <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Search />
      <PopularQuestions posts={posts} />
      <AllSections categories={categories} />
    </Container>
  );
}
