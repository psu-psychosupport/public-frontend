import useAsyncFetcher from "~/hooks/useAsyncFetcher";
import { IApiResponse } from "~/api/http";
import { Form, useOutletContext } from "@remix-run/react";
import { IUser } from "~/api/types/users";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import React, { useRef } from "react";
import { Box, Button, InputLabel, Stack, Typography } from "@mui/material";
import StyledInput from "~/components/StyledInput";
import * as yup from "yup";
import NotifyDialog, {
  NotifyDialogMethods,
} from "~/components/modals/NotifyDialog";

const validationSchema = yup.object({
  email: yup.string().required("Имя пользователя обязательно к заполнению"),
});

export default function UserSecuritySection() {
  const fetcher = useAsyncFetcher<IApiResponse<any>>();
  const { user } = useOutletContext<{ user: IUser }>();
  const modalRef = useRef<NotifyDialogMethods>();

  const formik = useFormik<{ email: string }>({
    initialValues: {
      email: user.email,
    },
    onSubmit: async ({ email }: { email: string }) => {
      if (user.email === email) {
        toast.warning("Вы указали текущую почту");
        return;
      }

      const res = await fetcher.submit(
        {
          goal: "change-email",
          email,
        },
        { method: "POST", encType: "application/json" },
      );

      if (res?.error) {
        toast.error(res.error.message);
        return;
      }
      modalRef.current?.open();
    },
    validationSchema,
  });

  return (
    <React.Fragment>
      <Typography fontSize={30} color={"#496CC6"} mb={2}>
        Безопасность
      </Typography>
      <Form
        onSubmit={formik.handleSubmit}
        method={"POST"}
        style={{ display: "flex", flex: 1, flexDirection: "column" }}
      >
        <Stack direction={"row"} gap={2}>
          <Stack>
            <InputLabel shrink htmlFor="id">
              <Typography fontWeight={"600"} fontSize={18}>
                Электронная почта
              </Typography>
            </InputLabel>
            <StyledInput
              required
              id="email"
              name="email"
              placeholder={"Имя пользователя"}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Stack>
          <Box sx={{ marginTop: "auto", alignSelf: "center" }}>
            <Button
              type={"submit"}
              sx={{
                fontSize: 14,
                borderRadius: "4px",
                boxShadow: "0px 0px 7px #638EFF",
                width: "fit-content",
                padding: "12px 16px 12px 16px",
              }}
            >
              Изменить
            </Button>
          </Box>
        </Stack>
      </Form>
      <NotifyDialog ref={modalRef} title={"Изменение адреса электронной почты"}>
        На указанную вами почту было отправлено письмо с ссылкой. Перейдите по
        ней для подтверждения изменения адреса электронной почты
      </NotifyDialog>
    </React.Fragment>
  );
}
