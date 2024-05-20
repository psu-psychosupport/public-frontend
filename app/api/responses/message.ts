import { ErrorResponseCodes } from "~/api/types/enums";

export const errorMessages = {
  [ErrorResponseCodes.MISSING_TOKEN]: "Токен аутентификации не обнаружен",
  [ErrorResponseCodes.INVALID_TOKEN]: "Невалидный токен аутентификации",
  [ErrorResponseCodes.INVALID_TOKEN_TYPE]:
    "Некорректный тип токена аутентификации",
  [ErrorResponseCodes.TOKEN_EXPIRED]: "Срок действия токена истёк",

  [ErrorResponseCodes.INVALID_USER_CREDENTIALS]:
    "Неверно указана почта или пароль",
  [ErrorResponseCodes.USER_ALREADY_EXISTS]:
    "Пользователь с такой почтой уже существует",
  [ErrorResponseCodes.USER_ALREADY_VERIFIED]:
    "Вы уже подтвердили свою учётную запись",
  [ErrorResponseCodes.USER_NOT_FOUND]: "Пользователь не найден",
  [ErrorResponseCodes.MISSING_PERMISSIONS]:
    "Это действие доступно только администраторам",
  [ErrorResponseCodes.SAME_EMAIL_ADDRESS]:
    "Вы указали ваш адрес электронной почты",
  [ErrorResponseCodes.EMAIL_ADDRESS_ALREADY_TAKEN]:
    "Этот адрес электронной почты принадлежит другому пользователю",

  [ErrorResponseCodes.UNSUPPORTED_FILE_TYPE]: "Неподдерживаемый тип файла",
  [ErrorResponseCodes.INCORRECT_DOCUMENT_FILE]:
    "Содержимое документа не поддерживается",

  [ErrorResponseCodes.CATEGORY_NOT_FOUND]: "Категория не найдена",
  [ErrorResponseCodes.SUBCATEGORY_NOT_FOUND]: "Подкатегория не найдена",
  [ErrorResponseCodes.POST_NOT_FOUND]: "Пост не найден",
};

export const getErrorMessage = (code: ErrorResponseCodes) =>
  errorMessages[code] || `Произошла неизвестная ошибка. Код: ${code}`;
