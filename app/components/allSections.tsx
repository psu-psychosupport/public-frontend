import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { ICategory } from "~/api/types/content";
import { LinkWrapper } from "~/components/LinkWrapper";

export default function AllSections({
  categories,
}: {
  categories: ICategory[];
}) {
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * (max + 1));
  }

  const colors: string[] = ["#638EFF", "#303044", "#D0EEFF"];

  return (
    <React.Fragment>
      <Typography variant="h4" color={"#303044"} sx={{ mt: 4 }}>
        Все разделы
      </Typography>
      <div className="containerSection">
        {categories &&
          categories.map(
            (category) =>
              (category.post ||
                (category.subcategories &&
                  !!category.subcategories.filter((sub) => sub.post).length)) && (
                <div key={category.id} className="itemSection">
                  <div className="itemNameSection">
                    <LinkWrapper category={category}>
                      <p
                        style={{
                          color: "#496CC6",
                          fontSize: 18,
                          fontWeight: "500",
                          margin: "1% 2% 1% 2%",
                        }}
                      >
                        {category.name}
                      </p>
                    </LinkWrapper>
                  </div>
                  {category.subcategories &&
                    category.subcategories.map(
                      (subcategory) =>
                        subcategory.post && (
                          <Container
                            key={subcategory.id}
                            disableGutters
                            sx={{
                              pl: "6%",
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1.2,
                              mb: 1,
                            }}
                          >
                            <Box
                              mt={1}
                              minWidth={"9px"}
                              height={"11px"}
                              borderRadius={"4px"}
                              bgcolor={colors[getRandomInt(colors.length - 1)]}
                            />
                            <LinkWrapper subcategory={subcategory}>
                              <Typography color={"#303044"} fontSize={18}>
                                {subcategory.name}
                              </Typography>
                            </LinkWrapper>
                          </Container>
                        )
                    )}
                </div>
              )
          )}
      </div>
    </React.Fragment>
  );
}
