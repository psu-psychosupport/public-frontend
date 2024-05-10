import React from "react";
import { Typography, Box, Button } from "@mui/material";

export default function Myaccount() {
  return (
    <React.Fragment>
      <Typography fontSize={30} color={"#496CC6"} mb={2}>Личная информация</Typography>

      <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
        <Typography fontSize={18}>ФИО: Иванов Иван Иванович</Typography>
        <Typography fontSize={18}>Электронная почта: IvanovII@smth.com</Typography>
        <Typography fontSize={18}>Пароль: ***************</Typography>
      </Box>

      <Button 
        sx={{
        fontSize: 18,
        borderRadius: "4px",
        boxShadow: "0px 0px 7px #638EFF",
        width: "fit-content",
        alignSelf: "center",
        marginTop: "auto",
        padding: "12px 16px 12px 16px",
        }}>Изменить данные</Button>
    </React.Fragment>
  )
}