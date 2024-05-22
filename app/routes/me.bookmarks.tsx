import { httpClient } from "~/api/http";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Stack, Typography, Box, IconButton } from "@mui/material";
import { Link, useLoaderData } from "@remix-run/react";
import { UserContentTypes } from "~/api/types/enums";
import { Delete as DeleteIcon } from "@mui/icons-material";
import useAsyncFetcher from "~/hooks/useAsyncFetcher";

export async function loader() {
  const res = await httpClient.getUserContentList({
    type: UserContentTypes.BOOKMARK,
  });
  return json(res.data);
}

export async function action({ request }: ActionFunctionArgs) {
  const { goal, contentId } = await request.json();

  if (goal === "delete-bookmark") {
    await httpClient.deleteUserContent(contentId);
  }

  return { status: true };
}

export default function UserBookmarksRoute() {
  const bookmarks = useLoaderData<typeof loader>();
  const fetcher = useAsyncFetcher();

  const deleteBookmark = async (id: number) => {
    await fetcher.submit(
      { goal: "delete-bookmark", contentId: id },
      { method: "POST", encType: "application/json" }
    );
  };

  return (
    <Stack>
      <Typography fontSize={30} color={"#496CC6"} mb={2}>
        Закладки
      </Typography>
      <Stack gap={1}>
        {bookmarks.map((bookmark) => (
          <Link
            key={bookmark.id}
            to={`/post/${bookmark.post_id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{
                padding: 2,
                boxShadow: "0px 0px 7px #638EFF",
                borderRadius: "4px",
              }}
            >
              <Stack>
                <Typography fontSize={20} fontWeight={"500"}>
                  {bookmark.post.category.name}
                </Typography>
                {bookmark.post.subcategory && (
                  <Typography>{bookmark.post.subcategory.name}</Typography>
                )}
              </Stack>
              <IconButton onClick={() => deleteBookmark(bookmark.id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
