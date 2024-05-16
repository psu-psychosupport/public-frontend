import React, { useState } from "react";
import { Typography, Box, Button, Stack } from "@mui/material";
import { Form, useOutletContext } from "@remix-run/react";
import { IUser } from "~/api/types/users";
import { httpClient, IApiResponse } from "~/api/http";
import { ActionFunctionArgs, json } from "@remix-run/node";
import useAsyncFetcher from "~/hooks/useAsyncFetcher";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import StyledInput from "~/components/StyledInput";

export async function action({ request }: ActionFunctionArgs) {
  const { id, name, email } = await request.json();

  const res = await httpClient.updateUser(id, {
    name,
    email,
  });

  return json(res);
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Введите корректную почту")
    .required("Почта обязательна к заполнению"),
  name: yup.string().required("Имя обязательно к заполнению"),
});

export default function MyAccountUser() {
  const fetcher = useAsyncFetcher<IApiResponse<null>>();
  const { user } = useOutletContext<{ user: IUser }>();
  const [isEditing, setEditing] = useState(false);

  const submitChanges = async ({
    name,
    email,
  }: {
    name: string;
    email: string;
  }) => {
    const res = await fetcher.submit(
      {
        id: user.id,
        name,
        email,
      },
      { method: "POST", encType: "application/json" },
    );

    if (res!.error) {
      toast.error(res!.error.message);
    }
  };

  const formik = useFormik<{ name: string; email: string }>({
    initialValues: {
      name: user.name,
      email: user.email,
    },
    onSubmit: submitChanges,
    validationSchema,
  });

  return (
    <React.Fragment>
      <Typography fontSize={30} color={"#496CC6"} mb={2}>
        Личная информация
      </Typography>
      <Form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {!isEditing ? (
            <Typography fontSize={18}>Имя пользователя: {user.name}</Typography>
          ) : (
            <StyledInput
              required
              id="name"
              name="name"
              placeholder={"Имя пользователя"}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          )}
          {!isEditing ? (
            <Typography fontSize={18}>
              Электронная почта: {user.email}
            </Typography>
          ) : (
            <StyledInput
              required
              id="email"
              name="email"
              autoComplete={"email"}
              placeholder={"Электронная почта"}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          )}
        </Box>

        <Box sx={{ marginTop: "auto", alignSelf: "center" }}>
          {!isEditing ? (
            <Button
              onClick={() => setEditing(true)}
              sx={{
                fontSize: 18,
                borderRadius: "4px",
                boxShadow: "0px 0px 7px #638EFF",
                width: "fit-content",
                padding: "12px 16px 12px 16px",
              }}
            >
              Изменить данные
            </Button>
          ) : (
            <Stack direction={"row"} gap={4}>
              <Button
                type={"submit"}
                sx={{
                  fontSize: 18,
                  borderRadius: "4px",
                  boxShadow: "0px 0px 7px #638EFF",
                  width: "fit-content",
                  padding: "12px 16px 12px 16px",
                }}
              >
                Сохранить
              </Button>
              <Button
                onClick={() => setEditing(false)}
                sx={{
                  fontSize: 18,
                  borderRadius: "4px",
                  boxShadow: "0px 0px 7px #638EFF",
                  width: "fit-content",
                  alignSelf: "center",
                  padding: "12px 16px 12px 16px",
                }}
              >
                Отмена
              </Button>
            </Stack>
          )}
        </Box>
      </Form>
    </React.Fragment>
  );
}
