import React, { useState } from "react";
import { Typography } from "@mui/material";

export default function PopularQuestions() {
	const [questions, setQuestions] = useState<string[]>([
    "Как обратиться и написать письмо преподавателю, сотруднику деканата",
    "Что делать если потерял пароль от ЕТИС",
    "Где и как можно получить психологическую помощь в ПГНИУ",
    "Телефоны доверия, горячие линии города Перми и Пермского края",
    "Как обратиться и написать письмо преподавателю, сотруднику деканата",
    "Что делать если потерял пароль от ЕТИС",
    "Где и как можно получить психологическую помощь в ПГНИУ",
    "Телефоны доверия, горячие линии города Перми и Пермского края",
  ]);

	return (
		<React.Fragment>
			<Typography variant="h4" color={"#303044"}>Популярные вопросы</Typography>
			<div className="containerQuestion">
				{questions && questions.map(question =>
					<div className="itemQuestion">
						<p style={{color: "#496CC6", fontSize: 18}}>{question}</p>
					</div>
				)}
			</div>
		</React.Fragment>
	)
}