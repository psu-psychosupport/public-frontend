import { IconButton, Container, InputBase } from "@mui/material";
import IconSearch from "~/assets/search";
import React from "react";

export default function PostContentSearch({
  onTextChange,
}: {
  onTextChange: (value: string) => void;
}) {
  function handleInput(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    const value = event.target.value;
    onTextChange(value);
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
            bgcolor: "#ffffff",
            borderRadius: "4px",
            color: "#496CC6",
            fontSize: "18px",
            boxShadow: "0px 0px 7px #638EFF",
            zIndex: 2,
          }}
          fullWidth={true}
          placeholder="Что интересует?"
          inputProps={{ "aria-label": "Что интересует?" }}
          onChange={handleInput}
        />
      </Container>
      <IconButton
        className="buttonSearch"
        children={<IconSearch />}
        sx={{
          bgcolor: "white",
          width: 48,
          height: 48,
          borderRadius: "4px",
          boxShadow: 5,
          zIndex: 2,
        }}
      />
    </Container>
  );
}
