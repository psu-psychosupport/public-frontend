import type { MetaFunction } from "@remix-run/node";
import { Container, Typography, Button, Stack } from "@mui/material";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Завершение регистрации | Стобой" },
    { name: "description", content: "Добро пожаловать на сайт Стобой!" },
  ];
};

export default function AccountFinish() {
  return (
    <Container
      maxWidth={"xs"}
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
      <Typography component="h5" variant="h5" color={"#496CC6"} fontSize={30}>
        Подтверждение аккаунта
      </Typography>

      <Typography
      color={"#496CC6"}
      fontSize={18}
      pr={4}>
        Ваш аккаунт был подтверждён!<br/> 
        Теперь вы можете войти под своим аккаунтом
      </Typography>

      <Stack alignItems={"center"}>
        <Link
          to={"/login"}
          style={{
            marginBottom: 30,
            padding: "2% 20% 2% 20%",
            width: "fit-content",
            fontSize: 18,
            backgroundColor: "#638EFF",
            boxShadow: "0px 0px 7px #638EFF",
            textDecoration: "none",
            borderRadius: "4px",
            color: "#FFFFFF",
          }}
        >
          Войти
        </Link>
      </Stack>
    </Container>
  );
}
