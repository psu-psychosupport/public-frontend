import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useImperativeHandle, useRef, useState } from "react";
import StyledInput from "~/components/StyledInput";

export interface UserNoteDialogMethods {
  open: (initialContentValue: string, props: any) => void;
  close: () => void;
}

export interface UserNoteDialogProps {
  content?: string;
  onSubmit: (content: string, props: any) => void;
  isNewNote: boolean;
}

const UserNoteDialog = React.forwardRef<
  UserNoteDialogMethods,
  UserNoteDialogProps
>(({ content, onSubmit, isNewNote }, ref) => {
  const [$content, setContent] = useState<string | undefined>(content);
  const propsRef = useRef({});
  const [isOpen, setOpen] = useState(false);
  useImperativeHandle(
    ref,
    () => ({
      open: (initialContentValue, props) => {
        if (initialContentValue) {
          setContent(initialContentValue);
        }
        propsRef.current = props;
        setOpen(true);
      },
      close: () => {
        propsRef.current = {};
        setOpen(false);
      },
    }),
    []
  );

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={isOpen}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          onSubmit(formData.get("content")! as string, propsRef.current);
        },
      }}
    >
      <DialogTitle>
        {isNewNote ? "Добавление" : "Редактирование"} заметки
      </DialogTitle>
      <DialogContent>
        <StyledInput
          id={"content"}
          name={"content"}
          fullWidth
          value={$content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={"Текстовая информация"}
          multiline
          sx={{ my: 2, p: 2 }}
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
