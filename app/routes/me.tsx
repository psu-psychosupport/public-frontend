import { Container, Box, Stack } from "@mui/material";
import { Link, Outlet } from "@remix-run/react";

export default function Myaccount() {
  return (
    <Box sx={{display: "flex", gap: 2, flexGrow: 1, pt: 2.5, pb: 3}}>
      <Stack 
        spacing={1.5} pt={3} pr={4} pl={3} bgcolor={"#FFFFFF"} 
        sx={{
          borderRadius: "4px",
          boxShadow: "0px 0px 7px #638EFF",
          fontSize: 18
        }}
      >
        <Link
          to={"/me"}
          style={{textDecoration: "none", color: "#303044"}}
        >Личная информация</Link>
        <Link
          to={"/me/interface"}
          style={{textDecoration: "none", color: "#303044"}}
        >Интерфейс</Link>
        <Link
          to={"/me/bookmarks"}
          style={{textDecoration: "none", color: "#303044"}}
        >Закладки</Link>
        <Link
          to={"/me/notes"}
          style={{textDecoration: "none", color: "#303044"}}
        >Заметки</Link>
      </Stack>
      
      <Container 
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "gray",
          paddingY: 2.5,
          flex: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
          boxShadow: "0px 0px 7px #638EFF"
        }}>
        <Outlet/>
      </Container>
    </Box>
  )
}