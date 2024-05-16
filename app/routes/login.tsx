import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Box, Typography, Button, Stack, InputBase } from "@mui/material";
import { Form, json, redirect, useActionData, Link } from "@remix-run/react";
import * as yup from "yup";
import getUser from "~/utils/getUser";
import { useFormik } from "formik";
import { httpClient } from "~/api/http";
import { sessionStorage } from "~/sessions";
import StyledInput from "~/components/StyledInput";

export const meta: MetaFunction = () => {
  return [
    { title: "Авторизация | Стобой" },
    { name: "description", content: "Добро пожаловать на сайт Стобой!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await getUser(request);
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  // idk why yup's "required" is fucked up
  if (!email || !password) {
    return json({ message: "Вы не ввели логин или пароль" });
  }

  const session = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );

  const res = await httpClient.signIn(email, password);
  if (res.error) return json(res.error);

  session.set("access_token", res.data!.access_token);
  session.set("refresh_token", res.data!.refresh_token);

  return redirect("/me", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Введите корректную почту")
    .required("Почта обязательна к заполнению"),
  password: yup
    .string()
    .min(8, "Длина пароля должна быть как минимум из 8 символов")
    .required("Пароль обязателен к заполнению"),
});

export default function Login() {
  const error = useActionData<typeof action>();
  const formik = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
    validationSchema,
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        p: 3,
        borderRadius: "4px",
        boxShadow: "0px 0px 7px #638EFF",
        height: "fit-content",
        gap: 1,
      }}
    >
      <Typography component="h5" variant="h5" color={"#496CC6"} fontSize={30}>
        Вход
      </Typography>

      {error && (
        <Typography color={"#FF7272"} fontSize={18}>
          {error.message}
        </Typography>
      )}

      <Form
        method="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <StyledInput
          required
          fullWidth
          id="email"
          name="email"
          autoComplete="email"
          placeholder="Введите адрес электронной почты"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <StyledInput
          required
          fullWidth
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="Введите пароль"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            paddingX: 7,
            paddingY: 1,
            width: "fit-content",
            alignSelf: "center",
            fontSize: 18,
            backgroundColor: "#638EFF",
            boxShadow: "0px 0px 7px #638EFF",
          }}
        >
          Войти
        </Button>
      </Form>

      <Stack alignItems={"center"}>
        <Link
          to={"/pass-recovery"}
          style={{
            textDecoration: "none",
            fontSize: 18,
            color: "#496CC6",
          }}
        >
          Забыли пароль?
        </Link>
        <Link
          to={"/register"}
          style={{
            textDecoration: "none",
            fontSize: 18,
            color: "#496CC6",
          }}
        >
          Впервые? Зарегистрируйтесь
        </Link>
      </Stack>
    </Box>
  );
}
