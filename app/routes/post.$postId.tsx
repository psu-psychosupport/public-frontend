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
import { MarkdownViewer } from "mdx-descriptors/src";
import { ClientOnly } from "remix-utils/client-only";
import { UserContentTypes } from "~/api/types/enums";
import useAsyncFetcher from "~/hooks/useAsyncFetcher";
import UserNoteDialog, {
  UserNoteDialogMethods,
} from "~/components/modals/UserNoteDialog";
import { useRef } from "react";
import PostContentSearch from "~/components/PostContentSearch";
import { MDXEditorMethods } from "@mdxeditor/editor";

export async function loader({request, params }: LoaderFunctionArgs) {
  if (!params.postId || Number.isNaN(Number.parseInt(params.postId))) {
    return { post: null, note: null, bookmark: null, category: null };
  }
  const postResponse = await httpClient.getPostById(
    Number.parseInt(params.postId)
  )(request);

  if (postResponse.error) {
    return json({ post: null, note: null, bookmark: null, category: null });
  }

  const categoryResponse = await httpClient.getCategory(
    postResponse.data!.category_id
  )(request);

  const userContentResponse = await httpClient.getUserContentList({
    postId: postResponse.data!.id,
  })(request);

  if (userContentResponse.error || !userContentResponse.data?.length) {
    return json({
      post: postResponse.data,
      note: null,
      bookmark: null,
      category: categoryResponse.data,
    });
  }

  return json({
    post: postResponse.data,
    category: categoryResponse.data,
    note: userContentResponse.data.find(
      (content) => content.content_type === UserContentTypes.NOTE
    ),
    bookmark: userContentResponse.data.find(
      (content) => content.content_type === UserContentTypes.BOOKMARK
    ),
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const { goal, postId, content, contentId, testId, answers } =
    await request.json();

  if (goal === "add-bookmark") {
    await httpClient.addUserContent({
      post_id: postId,
      content_type: UserContentTypes.BOOKMARK,
    })(request);
  } else if (goal === "remove-bookmark" || goal === "remove-note") {
    await httpClient.deleteUserContent(contentId)(request);
  } else if (goal === "add-note") {
    await httpClient.addUserContent({
      post_id: postId,
      content_type: UserContentTypes.NOTE,
      content,
    })(request);
  } else if (goal === "update-note") {
    await httpClient.updateUserContent(contentId, { content })(request);
  } else if (goal === "get-test") {
    const res = await httpClient.getTestById(testId)(request);
    return json({ goal, ...res });
  } else if (goal === "submit-test-answers") {
    const res = await httpClient.completeTest(testId, answers)(request);
    return json(res);
  }
  return json({ status: true });
}

export default function Post() {
  const { post, category, note, bookmark } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const fetcher = useAsyncFetcher();
  const noteDialogRef = useRef<UserNoteDialogMethods>();
  const viewerRef = useRef<MDXEditorMethods>();

  if (!post) {
    return <Typography variant={"h1"}>Пост не найден</Typography>;
  }

  const onBookmarkButtonClick = async () => {
    await fetcher.submit(
      {
        goal: bookmark ? "remove-bookmark" : "add-bookmark",
        postId: post.id,
        contentId: bookmark?.id,
      },
      { method: "POST", encType: "application/json" }
    );
  };

  const onNoteUpdate = async (content: string) => {
    const goal = note ? "update-note" : "add-note";
    await fetcher.submit(
      { goal, contentId: note?.id, postId: post.id, content },
      { method: "POST", encType: "application/json" }
    );
    noteDialogRef.current.close();
  };

  return (
    <Container
      maxWidth={"xl"}
      disableGutters
      sx={{ display: "flex", flexDirection: "column", mt: 1 }}
    >
      {/*
      <Container disableGutters maxWidth={"md"} sx={{mb: 2}}>
        <PostContentSearch onTextChange={onSearch} />
      </Container>
      */}

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
          <Stack
            sx={{ alignItems: "center", mb: 2, gap: 1 }}
            direction={"row"}
            justifyContent={"center"}
          >
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
                <IconBookmark
                  color={bookmark ? colors.yellow.A700 : undefined}
                />
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
          </Stack>

          <Typography
            sx={{ color: "#496CC6", fontSize: 18, fontWeight: "500" }}
          >
            {category.name}
          </Typography>
          {category.subcategories &&
            category.subcategories.map(
              (subcategory) =>
                subcategory.post && (
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
                      to={`/post/${subcategory.post.id}`}
                      style={{
                        textDecoration: "none",
                        color:
                          post.id === subcategory.post.id
                            ? "#638EFF"
                            : "#303044",
                        fontSize: 18,
                      }}
                    >
                      {subcategory.name}
                    </Link>
                  </Box>
                )
            )}
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
                <Typography>Загрузка текста...</Typography>
              </Box>
            }
          >
            {() => (
              <MarkdownViewer viewerRef={viewerRef} content={post.content} />
            )}
          </ClientOnly>
        </Container>
      </Box>
      <UserNoteDialog
        isNewNote={!note}
        ref={noteDialogRef}
        content={note?.content}
        onSubmit={onNoteUpdate}
      />
    </Container>
  );
}
