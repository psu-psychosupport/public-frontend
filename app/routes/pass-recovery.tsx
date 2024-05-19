import type { MetaFunction } from "@remix-run/node";
import { Box, Typography, Button, Stack, InputBase, Container } from "@mui/material";
import { Form } from "@remix-run/react";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Восстановление пароля | Стобой" },
    { name: "description", content: "Добро пожаловать на сайт Стобой!" },
  ];
};

export default function PasswordRecovery() {
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
        gap: 5
      }}
    >
      <Typography component="h5" variant="h5" color={"#496CC6"} fontSize={30} pr={8}>
        Восстановление пароля
      </Typography>

      <Form 
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 128,
          paddingBottom: 15
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
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            paddingX: 4,
            paddingY: 1,
            width: "fit-content",
            alignSelf: "center",
            fontSize: 18,
            backgroundColor: "#638EFF",
            boxShadow: "0px 0px 7px #638EFF",
          }}
        >
          Отправить письмо
        </Button>
      </Form>
    </Container>
  );
}
