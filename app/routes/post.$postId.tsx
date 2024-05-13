import { Container, Box, Stack, IconButton, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import ComponentSearch from "~/components/search";
import IconHome from "~/assets/home";
import IconBookmark from "~/assets/bookmark";
import IconPencil from "~/assets/pencil";
import { getRandomColor } from "~/utils/getRandomColor";

export default function Post() {
  const data = {
    "category_id": 0,
    "subcategory_id": 0,
    "content": "Тут находиться текстовый контент по теме. Платформа online.psu.ru — изменения в авторизации Процедура входа на сайт online.psu.ru сегодня изменится: логин и пароль находятся в личном кабинете в ЕТИС в разделе Электронные ресурсы.",
    "id": 0,
    "views": 0,
    "category": {
      "id": 0,
      "name": "Название раздела",
      "subcategories": [
        {
          "id": 0,
          "category_id": 0,
          "name": "Как обратиться и написать письмо преподавателю, сотруднику деканата"
        },
        {
          "id": 1,
          "category_id": 0,
          "name": "Вторая тема раздела"
        },
        {
          "id": 2,
          "category_id": 0,
          "name": "Третья тема раздела на две строчки"
        }
      ]
    },
    "subcategory": {
      "id": 0,
      "category_id": 0,
      "name": "Вторая тема раздела"
    }
  }

  return (
    <Container sx={{display: "flex", flexDirection: "column"}}>
      <Stack sx={{alignItems: "center", mb: 1, gap: 1}} direction={"row"}>
        <IconButton
          className='buttonIcon'
          children={<IconHome />} 
          sx={{
            bgcolor: 'white',
            width: 48,
            height: 48,
            borderRadius: "4px",
            boxShadow: "0px 0px 7px #638EFF"
          }}
        />
        <IconButton
          className='buttonIcon'
          children={<IconBookmark />} 
          sx={{
            bgcolor: 'white',
            width: 48,
            height: 48,
            borderRadius: "4px",
            boxShadow: "0px 0px 7px #638EFF"
          }}
        />
        <IconButton
          className='buttonIcon'
          children={<IconPencil />} 
          sx={{
            bgcolor: 'white',
            width: 48,
            height: 48,
            borderRadius: "4px",
            boxShadow: "0px 0px 7px #638EFF"
          }}
        />
        <ComponentSearch />
      </Stack>

      <Box sx={{display: "flex", gap: 2, flexGrow: 1, pb: 3}}>
        <Stack 
          spacing={1.5}
          pt={3}
          pr={4}
          pl={3}
          bgcolor={"#FFFFFF"} 
          sx={{
            borderRadius: "4px",
            boxShadow: "0px 0px 7px #638EFF",
            fontSize: 18,
            flexBasis: "25%"
          }}
        >
          <Typography sx={{color: "#496CC6", fontSize: 18}}>{data.category.name}</Typography>
          {data && data.category.subcategories.map(subcategory =>
            <Box
              key={subcategory.id}
              sx={{pl: 1.5, display: "flex", gap: 1.2, mb: 1}}
            >
              <Box
                mt={1}
                minWidth={"9px"} 
                height={"11px"} 
                borderRadius={"4px"} 
                bgcolor={getRandomColor}
              />
              <Link
                to={"#"}
                style={{textDecoration: "none", color: "#303044", fontSize: 18}}
              >{subcategory.name}</Link>
            </Box>
          )}
        </Stack>
        
        <Container 
            sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "gray",
            paddingY: 2.5,
            flex: 1,
            flexGrow: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
            boxShadow: "0px 0px 7px #638EFF"
            }}>
            <Typography sx={{color: "#496CC6", fontSize: 30}}>{data.subcategory.name}</Typography>
            <Typography sx={{color: "#303044", fontSize: 18}}>{data.content}</Typography>
        </Container>
      </Box>
    </Container>
  )
}