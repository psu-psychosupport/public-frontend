import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const SUCCESS_COLOR = "#66BB6A";
const ERROR_COLOR = "#EF5350";
const DEFAULT_COLOR = "#638EFF";

export enum TestTypes {
  OPTIONS,
  INPUT,
}

export interface ITestForm {
  title: string;
  type: TestTypes;
  options?: string[];
  validOptionIndex?: number;
  validTextInput?: string;
}

const Options = ({ test }: { test: ITestForm }) => {
  const [clickedIndex, setClickedIndex] = useState(-1);

  const getButtonColor = (index: number) => {
    if (clickedIndex === -1) return DEFAULT_COLOR;

    if (index === test.validOptionIndex)
      return SUCCESS_COLOR;
    if (index !== clickedIndex) return DEFAULT_COLOR;
    return ERROR_COLOR;
  };

  const handleClick = (index: number) => {
    // Пользователь уже ответил на тест и правильный ответ был показан,
    // поэтому запрещаем повторно нажимать на кнопки
    if (clickedIndex !== -1) return;
    setClickedIndex(index);
  };

  return (
    <Stack gap={2}>
      {test.options!.map((option, index) => (
        <Button
          variant={"contained"}
          key={index}
          onClick={() => handleClick(index)}
          sx={{
            backgroundColor: getButtonColor(index),
            color: "#FFFFFF",
          }}
        >
          {option}
        </Button>
      ))}
    </Stack>
  );
};

const Input = ({ test }: { test: ITestForm }) => {
  const [answerState, setAnswerState] = useState<
    "correct" | "incorrect" | "none"
  >("none");
  const [value, setValue] = useState("");

  const buttonTexts = {
    correct: "Правильно",
    incorrect: "Неправильно",
    none: "Проверить",
  };

  const buttonColors = {
    correct: "#66BB6A",
    incorrect: "#EF5350",
    none: "#638EFF",
  };

  const onTextChange = (text: string) => {
    setAnswerState("none");
    setValue(text);
  };

  const checkAnswer = () => {
    console.log(value?.toLowerCase(), test.validTextInput?.toLowerCase());
    if (value.toLowerCase() === test.validTextInput?.toLowerCase()) {
      setAnswerState("correct");
    }
    setAnswerState("incorrect");
  };

  return (
    <Stack gap={4}>
      <TextField
        label={"Поле для ответа"}
        value={value}
        onChange={(event) => onTextChange(event.target.value)}
      />
      <Button
        variant={"contained"}
        onClick={checkAnswer}
        sx={{ backgroundColor: buttonColors[answerState] }}
      >
        {buttonTexts[answerState]}
      </Button>
    </Stack>
  );
};

export default function Test({ test }: { test: ITestForm }) {
  return (
    <Box
      width={400}
      sx={{
        bgcolor: "#FFFFFF",
        boxShadow: "0px 0px 7px #638EFF",
        borderRadius: "4px",
        padding: 2,
        marginY: 1,
      }}
    >
      <Typography variant={"h6"} sx={{mb: 4}}>{test.title}</Typography>
      {test.type === TestTypes.OPTIONS && <Options test={test} />}
      {test.type === TestTypes.INPUT && <Input test={test} />}
    </Box>
  );
}
