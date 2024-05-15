import { AppBar, Box, Container } from "@mui/material";
import IconLogo from '~/assets/logo';
import IconBookmark from '~/assets/bookmark';
import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <Box sx={{mb: 2}}>
      <AppBar position="static" sx={{bgcolor: "#303044"}}>
        <Container sx={{display: "flex", justifyContent: "space-between", alignItems: "center", height: 54}}>
          <Link to={"/"}>
            <IconLogo />
          </Link>

          <Box display={'flex'} gap={2}>
            <IconBookmark />
            <Link to={"/me"}>
              <Box sx={{ height: 33, width: 33, bgcolor: "primary.main", borderRadius: "4px"}} />
            </Link>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
}
