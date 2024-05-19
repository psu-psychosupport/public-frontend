import type { MetaFunction } from "@remix-run/node";
import { Typography, Button, Stack, InputBase, Container } from "@mui/material";
import { Form } from "@remix-run/react";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Авторизация | Стобой" },
    { name: "description", content: "Добро пожаловать на сайт Стобой!" },
  ];
};

export default function Login() {
  return (
    <Container
      maxWidth={"sm"}
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: "white",
        p: 3,
        borderRadius: "4px",
        boxShadow: "0px 0px 7px #638EFF",
        height: "fit-content",
        gap: 1
      }}
    >
      <Typography component="h5" variant="h5" color={"#496CC6"} fontSize={30}>
        Вход
      </Typography>

      <Typography color={"#FF7272"} fontSize={18}>
        Неверный адрес электронной почты или пароль
      </Typography>

      <Form 
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
        <InputBase
          required
          fullWidth
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          placeholder="Введите адрес электронной почты"
          sx={{
            flex: 1,
            paddingY: 1,
            paddingX: 2,
            bgcolor: "#ffffff",
            borderRadius: "4px",
            color: "#496CC6",
            boxShadow: "0px 0px 7px #638EFF",
          }}
        />
        <InputBase
          required
          fullWidth
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="Введите пароль"
          sx={{
            flex: 1,
            paddingY: 1,
            paddingX: 2,
            bgcolor: "#ffffff",
            borderRadius: "4px",
            color: "#496CC6",
            boxShadow: "0px 0px 7px #638EFF",
          }}
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
            to={"#"}
            style={{
              "textDecoration": "none",
              fontSize: 18,
              color: "#496CC6"
            }}
          >
            Забыли пароль?
          </Link>
          <Link
            to={"#"}
            style={{
              "textDecoration": "none",
              fontSize: 18,
              color: "#496CC6"
            }}
          >
            Впервые? Зарегистрируйтесь
          </Link>
      </Stack>
    </Container>
  );
}
