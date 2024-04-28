import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Icon, Container, InputBase, TextField  } from "@mui/material";
import { Menu } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import IconSearch from '~/assets/search';


export default function ComponentSearch() {
  return (
    <Container disableGutters sx={{display: "flex", alignItems: "center", gap: 1, mt: 2, mb: 4}}>
      <InputBase
        className='inputSearch'
        sx={{flex: 1, paddingY: 1, paddingX: 2, bgcolor: "#ffffff", borderRadius: "4px", color: "#496CC6" }}
        fullWidth={true}
        placeholder="Что интересует?"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton 
        className='buttonSearch' 
        children={<IconSearch />} 
        sx={{bgcolor: 'white', width: 48, height: 48, borderRadius: "4px", boxShadow: 5}}
      />
    </Container>
  );
}