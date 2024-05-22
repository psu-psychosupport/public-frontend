import {
  Box,
  colors,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import ComponentSearch from "~/components/search";
import IconHome from "~/assets/home";
import IconBookmark from "~/assets/bookmark";
import IconPencil from "~/assets/pencil";
import { getRandomColor } from "~/utils/getRandomColor";
import { httpClient } from "~/api/http";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import getPostName from "~/utils/getPostName";
import MarkdownViewer from "~/components/markdownEditor/MarkdownViewer";
import { ClientOnly } from "remix-utils/client-only";
import { UserContentTypes } from "~/api/types/enums";
import useAsyncFetcher from "~/hooks/useAsyncFetcher";
import UserNoteDialog, { UserNoteDialogMethods } from "~/components/modals/UserNoteDialog";
import { useRef } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.postId || Number.isNaN(Number.parseInt(params.postId))) {
    return {post: null, note: null, bookmark: null};
  }
  const postResponse = await httpClient.getPostById(
    Number.parseInt(params.postId),
  );

  if (postResponse.error) {
    return json({post: null, note: null, bookmark: null});
  }

  const userContentResponse = await httpClient.getUserContentList({
    postId: postResponse.data!.id,
  });

  if (userContentResponse.error || !userContentResponse.data?.length) {
    return json({ post: postResponse.data, note: null, bookmark: null });
  }

  return json({
    post: postResponse.data,
    note: userContentResponse.data.find(
      (content) => content.content_type === UserContentTypes.NOTE,
    ),
    bookmark: userContentResponse.data.find(
      (content) => content.content_type === UserContentTypes.BOOKMARK,
    ),
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const { goal, postId, content, contentId } = await request.json();
  console.log(goal, postId, content, contentId);
  if (goal === "add-bookmark") {
    await httpClient.addUserContent({
      post_id: postId,
      content_type: UserContentTypes.BOOKMARK,
    });
  } else if (goal === "remove-bookmark" || goal === "remove-note") {
    await httpClient.deleteUserContent(contentId);
  } else if (goal === "add-note") {
    await httpClient.addUserContent({
      post_id: postId,
      content_type: UserContentTypes.NOTE,
      content,
    });
  } else if (goal === "update-note") {
    await httpClient.updateUserContent(contentId, {content});
  }
  return {status: true};
}

export default function Post() {
  const { post, note, bookmark } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const fetcher = useAsyncFetcher();
  const noteDialogRef = useRef<UserNoteDialogMethods>();

  if (!post) {
    return <Typography variant={"h1"}>Пост не найден</Typography>;
  }

  const onBookmarkButtonClick = async () => {
    await fetcher.submit(
      { goal: bookmark ? "delete-bookmark" : "add-bookmark", postId: post.id, contentId: bookmark?.id },
      { method: "POST", encType: "application/json" },
    );
  };

  const onNoteUpdate = async (content: string) => {
    const goal = note ? "update-note" : "add-note";
    await fetcher.submit(
      {goal, contentId: note?.id, postId: post.id, content},
      {method: "POST", encType: "application/json"}
    );
    noteDialogRef.current.close();
  }

  return (
    <Container
      maxWidth={"xl"}
      disableGutters
      sx={{ display: "flex", flexDirection: "column", mt: 1 }}
    >
      <Stack sx={{ alignItems: "center", mb: 2, gap: 1 }} direction={"row"}>
        <IconButton
          onClick={() => navigate("/")}
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
          children={
            <IconBookmark color={bookmark ? colors.yellow.A700 : undefined} />
          }
          onClick={onBookmarkButtonClick}
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
          onClick={() => noteDialogRef.current?.open()}
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
      <UserNoteDialog isNewNote={!note} ref={noteDialogRef} content={note?.content} onSubmit={onNoteUpdate} />
    </Container>
  );
}
