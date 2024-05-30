import { httpClient } from "~/api/http";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Stack, Typography, Box, IconButton } from "@mui/material";
import { Link, useLoaderData } from "@remix-run/react";
import { UserContentTypes } from "~/api/types/enums";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import useAsyncFetcher from "~/hooks/useAsyncFetcher";
import UserNoteDialog, {
  UserNoteDialogMethods,
} from "~/components/modals/UserNoteDialog";
import { useRef } from "react";

export async function loader({request}: LoaderFunctionArgs) {
  const res = await httpClient.getUserContentList({
    type: UserContentTypes.NOTE,
  })(request);
  return json(res.data);
}

export async function action({ request }: ActionFunctionArgs) {
  const { goal, contentId, content } = await request.json();

  if (goal === "update-note") {
    await httpClient.updateUserContent(contentId, { content })(request);
  } else if (goal === "delete-note") {
    await httpClient.deleteUserContent(contentId)(request);
  }

  return { status: true };
}

export default function UserNotesRoute() {
  const notes = useLoaderData<typeof loader>();
  const fetcher = useAsyncFetcher();
  const userNoteDialogRef = useRef<UserNoteDialogMethods>();

  const deleteNote = async (id: number) => {
    await fetcher.submit(
      { goal: "delete-note", contentId: id },
      { method: "POST", encType: "application/json" }
    );
  };

  const updateNote = async (content: string, { contentId }) => {
    await fetcher.submit(
      { goal: "update-note", contentId, content },
      { method: "POST", encType: "application/json" }
    );
    userNoteDialogRef.current?.close();
  };

  return (
    <Stack>
      <Typography fontSize={30} color={"#496CC6"} mb={2}>
        Заметки
      </Typography>
      {!notes.length && (
        <Typography variant={"h6"}>У вас нет добавленных заметок</Typography>
      )}
      <Stack gap={1}>
        {notes.map((note) => (
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
              padding: 2,
              boxShadow: "0px 0px 7px #638EFF",
              borderRadius: "4px",
            }}
          >
            <Link
              key={note.id}
              to={`/post/${note.post_id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Stack>
                <Typography fontSize={20} fontWeight={"500"}>
                  {note.post.category.name}
                </Typography>
                {note.post.subcategory && (
                  <Typography fontSize={18}>
                    {note.post.subcategory.name}
                  </Typography>
                )}
                <Typography sx={{ mt: 2 }}>{note.content}</Typography>
              </Stack>
            </Link>

            <Stack direction={"row"}>
              <IconButton
                onClick={() =>
                  userNoteDialogRef.current?.open(note.content!, { contentId: note.id })
                }
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteNote(note.id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <UserNoteDialog ref={userNoteDialogRef} onSubmit={updateNote} />
    </Stack>
  );
}
