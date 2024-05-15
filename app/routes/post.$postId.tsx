import { Container, Box, Stack, IconButton, Typography } from "@mui/material";
import { Link, useLoaderData } from "@remix-run/react";
import ComponentSearch from "~/components/search";
import IconHome from "~/assets/home";
import IconBookmark from "~/assets/bookmark";
import IconPencil from "~/assets/pencil";
import { getRandomColor } from "~/utils/getRandomColor";
import { httpClient } from "~/api/http";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import getPostName from "~/utils/getPostName";
import MarkdownViewer from "~/components/markdownEditor/MarkdownViewer";
import { ClientOnly } from "remix-utils/client-only";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.postId || Number.isNaN(Number.parseInt(params.postId))) {
    return null;
  }
  const res = await httpClient.getPostById(Number.parseInt(params.postId));
  return json(res.data);
}

export default function Post() {
  const post = useLoaderData<typeof loader>();

  if (!post) {
    return <Typography variant={"h1"}>Пост не найден</Typography>;
  }

  return (
    <Container
      maxWidth={"xl"}
      disableGutters
      sx={{ display: "flex", flexDirection: "column", mt: 1 }}
    >
      <Stack sx={{ alignItems: "center", mb: 2, gap: 1 }} direction={"row"}>
        <IconButton
          className="buttonIcon"
          children={<IconHome />}
          sx={{
            bgcolor: "white",
            width: 48,
            height: 48,
            borderRadius: "4px",
            boxShadow: "0px 0px 7px #638EFF",
          }}
        />
        <IconButton
          className="buttonIcon"
          children={<IconBookmark />}
          sx={{
            bgcolor: "white",
            width: 48,
            height: 48,
            borderRadius: "4px",
            boxShadow: "0px 0px 7px #638EFF",
          }}
        />
        <IconButton
          className="buttonIcon"
          children={<IconPencil />}
          sx={{
            bgcolor: "white",
            width: 48,
            height: 48,
            borderRadius: "4px",
            boxShadow: "0px 0px 7px #638EFF",
          }}
        />
        <ComponentSearch />
      </Stack>

      <Box sx={{ display: "flex", gap: 2, flexGrow: 1, pb: 3 }}>
        <Stack
          spacing={1.5}
          pt={3}
          pr={4}
          pl={3}
          bgcolor={"#FFFFFF"}
          sx={{
            borderRadius: "4px",
            boxShadow: "0px 0px 7px #638EFF",
            fontSize: 18,
            flexBasis: "25%",
          }}
        >
          <Typography sx={{ color: "#496CC6", fontSize: 18 }}>
            {post.category.name}
          </Typography>
          {post.category.subcategories &&
            post.category.subcategories.map((subcategory) => (
              <Box
                key={subcategory.id}
                sx={{ pl: 1.5, display: "flex", gap: 1.2, mb: 1 }}
              >
                <Box
                  mt={1}
                  minWidth={"9px"}
                  height={"11px"}
                  borderRadius={"4px"}
                  bgcolor={getRandomColor}
                />
                <Link
                  to={"#"}
                  style={{
                    textDecoration: "none",
                    color: "#303044",
                    fontSize: 18,
                  }}
                >
                  {subcategory.name}
                </Link>
              </Box>
            ))}
        </Stack>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "gray",
            paddingY: 2.5,
            flex: 1,
            flexGrow: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
            boxShadow: "0px 0px 7px #638EFF",
          }}
        >
          <Typography sx={{ color: "#496CC6", fontSize: 30 }}>
            {getPostName(post)}
          </Typography>
          <ClientOnly
            fallback={
              <Box>
                <Typography>Загрузка редактора...</Typography>
              </Box>
            }
          >
            {() => <MarkdownViewer content={post.content} />}
          </ClientOnly>
        </Container>
      </Box>
    </Container>
  );
}
