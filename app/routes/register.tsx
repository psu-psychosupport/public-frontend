import type { MetaFunction } from "@remix-run/node";
import { Container, Typography, Button, InputBase } from "@mui/material";
import { Form, Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Регистрация | Стобой" },
    { name: "description", content: "Добро пожаловать на сайт Стобой!" },
  ];
};

export default function Register() {
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
        Регистрация
      </Typography>

      <Typography color={"#FF7272"} fontSize={18}>
        Адрес электронной почты уже зарегистрирован
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
          name="password-first"
          type="password"
          id="password-first"
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
         <InputBase
          required
          fullWidth
          name="password-second"
          type="password"
          id="password-second"
          placeholder="Повторите пароль"
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
            paddingX: 2,
            paddingY: 1,
            width: "fit-content",
            alignSelf: "center",
            fontSize: 18,
            backgroundColor: "#638EFF",
            boxShadow: "0px 0px 7px #638EFF",
          }}
        >
          Зарегистрироваться
        </Button>
      </Form>
      
      <Link 
        to={"#"}
        style={{
          "textDecoration": "none",
          fontSize: 18,
          color: "#496CC6",
          alignSelf: "center"
        }}
      >
        Уже зарегистрированы? Войдите
      </Link>
    </Container>
  );
}
