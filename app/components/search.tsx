import {
  IconButton,
  Container,
  InputBase,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import IconSearch from "~/assets/search";
import React, { useState } from "react";
import { Link } from "@remix-run/react";
import useAsyncFetcher from "~/hooks/useAsyncFetcher";
import { IPost } from "~/api/types/content";

export default function ComponentSearch() {
  const fetcher = useAsyncFetcher();
  const [data, setData] = useState<IPost[]>();

  async function handleInput(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    const value = event.target.value;
    if (!value) {
      setData(null);
      return;
    }
    const posts: IPost[] = await fetcher.submit(
      { goal: "search", query: value },
      { method: "POST", encType: "application/json" },
    );
    setData(posts);
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        position: "relative",
      }}
    >
      <Container
        disableGutters
        sx={{
          position: "relative",
        }}
      >
        <InputBase
          id="input"
          sx={{
            flex: 1,
            paddingY: 1,
            paddingX: 2,
            border: "2px solid #FFFFFF",
            borderRadius: "4px",
            color: "#000000",
            fontSize: "18px",
            boxShadow: "0px 0px 7px #FFFFFF",
            zIndex: 2,
          }}
          fullWidth={true}
          placeholder="Что интересует?"
          inputProps={{ "aria-label": "Что интересует?" }}
          onChange={handleInput}
        />
        {data && (
          <Container
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#FFFFFF",
              position: "absolute",
              top: "55px",
              boxShadow: "0px 0px 7px #FFFFFF",
              borderRadius: "4px",
              py: 2,
              zIndex: 2,
            }}
          >
            <List disablePadding dense>
              {data.map((element) => (
                <ListItem key={element.id}>
                  <Link
                    to={`/post/${element.id}`}
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                      color: "#303044",
                    }}
                    dangerouslySetInnerHTML={{ __html: element.content }}
                  >
                  </Link>
                </ListItem>
              ))}
            </List>
          </Container>
        )}
      </Container>
      <IconButton
        className="buttonSearch"
        children={<IconSearch />}
        sx={{
          width: 54,
          height: 54,
          borderRadius: "4px",
          zIndex: 2,
          border: "2px solid #FFFFFF",
        }}
      />
      {data && (
        <Container
          onClick={() => setData(null)}
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            background:
              "linear-gradient(#D0EEFF, rgba(215, 210, 255, 0.5)) fixed",
            top: 0,
            left: 0,
            height: "150%",
            width: "100%",
            zIndex: 1,
          }}
        ></Container>
      )}
    </Container>
  );
}
