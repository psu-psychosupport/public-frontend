import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useImperativeHandle, useState } from "react";
import StyledInput from "~/components/StyledInput";

export interface UserNoteDialogMethods {
  open: () => void;
  close: () => void;
}

export interface UserNoteDialogProps {
  content: string;
  onSubmit: (content: string) => void;
}

const UserNoteDialog = React.forwardRef<
  UserNoteDialogMethods,
  UserNoteDialogProps
>(({ content, onSubmit }, ref) => {
  const [$content, setContent] = useState<string>(content);
  const [isOpen, setOpen] = useState(false);
  useImperativeHandle(
    ref,
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }),
    [],
  );

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          onSubmit(formData.get("content")! as string);
        },
      }}
    >
      <DialogTitle>Добавление заметки</DialogTitle>
      <DialogContent>
        <StyledInput
          id={"content"}
          name={"content"}
          fullWidth
          value={$content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={"Текстовая информация"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Закрыть</Button>
        <Button type={"submit"}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
});

export default UserNoteDialog;
