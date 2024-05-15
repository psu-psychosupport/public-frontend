import { IconButton, Container, InputBase } from "@mui/material";
import IconSearch from '~/assets/search';

export default function ComponentSearch() {
  return (
    <Container disableGutters sx={{display: "flex", alignItems: "center", gap: 1, }}>
      <InputBase
        className='inputSearch'
        sx={{flex: 1, paddingY: 1, paddingX: 2, bgcolor: "#ffffff", borderRadius: "4px", color: "#496CC6" }}
        fullWidth={true}
        placeholder="Что интересует?"
        inputProps={{ 'aria-label': 'Что интересует?' }}
      />
      <IconButton 
        className='buttonSearch' 
        children={<IconSearch />} 
        sx={{bgcolor: 'white', width: 48, height: 48, borderRadius: "4px", boxShadow: 5}}
      />
    </Container>
  );
}