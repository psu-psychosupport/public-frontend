import { AppBar, Box, Toolbar, Typography, Button, IconButton, Icon, Container } from "@mui/material";
import IconLogo from '~/assets/icon';
import IconBookmark from '~/assets/bookmark';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container disableGutters sx={{display: "flex", justifyContent: "space-between", alignItems: "center", height: 54}}>
          <IconLogo />

          <Box display={'flex'} gap={2}>
            <IconBookmark />
            <Box sx={{ height: 33, width: 33, bgcolor: "primary.main", borderRadius: "4px"}} />
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
}
