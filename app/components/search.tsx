import { IconButton, Container, InputBase, Typography, List, ListItem } from "@mui/material";
import IconSearch from '~/assets/search';
import { useState } from "react";
import { Link } from "@remix-run/react";

type SearchResultType = {
  id: number,
  data: string
}

export default function ComponentSearch() {
  const [data, setData] = useState<SearchResultType[]>();

  function handleInput() {
    const inputBox = document.getElementById("input") as HTMLInputElement;
    
    if (inputBox.value.length) {
      setData([
        {
          id: 1,
          data: "Если вы потеряли студенческий билет, то необходимо подойти и написать в деканате заявление о выдаче дубликата.",
        },
        {
          id: 2,
          data: "Потерял студенческий, но другое решение",
        },
      ]);
    }
    else {
      setData(undefined);
    }
  }

  return (
    <Container maxWidth={false} disableGutters sx={{display: "flex", alignItems: "flex-start", gap: 1, position: "relative"}}>
      <Container 
        disableGutters
        sx={{ 
          position: "relative"
        }}
      >
        <InputBase
          id="input"
          sx={{
            flex: 1,
            paddingY: 1,
            paddingX: 2,
            bgcolor: "#ffffff",
            borderRadius: "4px",
            color: "#496CC6",
            fontSize: "18px",
            boxShadow: "0px 0px 7px #638EFF",
            zIndex: 2
          }}
          fullWidth={true}
          placeholder="Что интересует?"
          inputProps={{ 'aria-label': 'Что интересует?' }}
          onChange={handleInput}
        />
        {data &&
          <Container
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#FFFFFF",
              position: "absolute",
              top: "55px",
              boxShadow: "0px 0px 7px #638EFF",
              borderRadius: "4px",
              py: 2,
              zIndex: 2,
            }}>
            <Typography paddingX={2} fontSize={"18px"} color={"#303044"}>Что делать если ...</Typography>
            <List disablePadding dense>
              {data.map((element) =>
                <ListItem key={element.id}>
                  <Link
                    to={"#"}
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                      color: "#303044"
                    }}
                  >
                    {element.data}
                  </Link>
                </ListItem>
              )}
            </List>
          </Container>
        }
      </Container>
      <IconButton 
        className='buttonSearch' 
        children={<IconSearch />} 
        sx={{bgcolor: 'white', width: 48, height: 48, borderRadius: "4px", boxShadow: 5, zIndex: 2}}
      />
      {data && 
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            background: "linear-gradient(#D0EEFF, rgba(215, 210, 255, 0.5)) fixed",
            top: 0,
            left: 0,
            height: "150%",
            width: "100%",
            zIndex: 1
          }}>
        </Container>
      }
    </Container>
  );
}