export enum UserPermissions {
  ADMINISTRATOR = 1 << 0,
}

export const userHasPermission = (
  userPermissions: number,
  permission: UserPermissions,
): permission is number => (userPermissions & permission) === permission;

export enum ErrorResponseCodes {
  MISSING_TOKEN = 10000,
  INVALID_TOKEN = 10001,
  INVALID_TOKEN_TYPE = 10002,
  TOKEN_EXPIRED = 10003,

  INVALID_USER_CREDENTIALS = 10100,
  USER_ALREADY_EXISTS = 10101,
  USER_ALREADY_VERIFIED = 10102,
  USER_NOT_FOUND = 10103,

  UNSUPPORTED_FILE_TYPE = 10200,
  INCORRECT_DOCUMENT_FILE = 10201,

  CATEGORY_NOT_FOUND = 10300,
  SUBCATEGORY_NOT_FOUND = 10301,
  POST_NOT_FOUND = 10302,
}

export enum MediaTypes {
  IMAGE = 1,
  VIDEO = 2,
  AUDIO = 3,
  PRESENTATION = 4,
  PDF = 5,
  TEST = 6,
  FILE = 7,
}
