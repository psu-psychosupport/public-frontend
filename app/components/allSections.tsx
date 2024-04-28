import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";

export default function AllSections() {
	type TypeSection = {
		name: string,
		themes: string[],
	};

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * (max + 1));
  }

  const colors: string[] = ["#638EFF", "#303044", "#D0EEFF"];

	const [sections, setSections] = useState<TypeSection[]>([
    {
      name: "Название первого раздела",
      themes: ["Тема раздела", "Другая тема раздела"],
    },
    {
      name: "Название еще одного раздела 2",
      themes: ["Тема раздела", "Тема раздела, но такая длинная, что ей надо много места"],
    },
    {
      name: "Достаточно длинное название раздела 3, что оно не помещается в одну строку",
      themes: ["Тема раздела", "Другая тема раздела", "Тема раздела", "Другая тема раздела, жаль, что по объему текста темы могут быть очень разные, но мы это спрячем"],
    },
    {
      name: "Название раздела",
      themes: ["Название раздела", "Другая тема раздела, они же все должны быть разными", "Другая тема раздела", "Другая тема раздела"],
    },
    {
      name: "Раздел с нереаааааааально длинным названием и описанием и вообще чего тут только нет, зато сам раздел и есть тема. Просто супер",
      themes: []
    },
    {
      name: "Название раздела справа 3",
      themes: ["Тема раздела", "Здесь тоже катастрофически много текста, бедные студенты, искать среди всей этой информации то, что им поможет"],
    },
  ]);

	return (
		<React.Fragment>
			<Typography variant="h4" color={"#303044"} sx={{mt: 4}}>Все разделы</Typography>
			<div className="containerSection">
				{sections && sections.map(sections =>
          <div className="itemSection">
            <div className="itemNameSection">
              <p style={{color: "#496CC6", fontSize: 18, margin: "1% 2% 1% 2%"}}>{sections.name}</p>
            </div>
            {sections.themes && sections.themes.map(theme =>
              <Container
                disableGutters
                sx={{pl: "6%", display: "flex", alignItems: "center", gap: 1.2, mb: 1}}
              >
                <Box 
                  minWidth={"9px"} 
                  height={"11px"} 
                  borderRadius={"4px"} 
                  bgcolor={colors[getRandomInt(colors.length - 1)]}
                />
                <Typography color={"#303044"} fontSize={18}>
                  {theme}
                </Typography>
              </Container>
            )}
          </div>
				)}
			</div>
		</React.Fragment>
	)
}