import { httpClient } from "~/api/http";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Stack } from "@mui/material";
import UserPersonalSection from "~/components/userSettings/UserPersonalSection";
import UserSecuritySection from "~/components/userSettings/UserSecuritySection";

export interface UserActionPayload {
  name?: string;
  goal?: "change-email" | "change-password";
  email?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const { name, goal, email }: UserActionPayload = await request.json();

  if (name) {
    const res = await httpClient.changeUserName(name);
    return json(res);
  }

  if (goal === "change-email") {
    const res = await httpClient.requestChangeUserEmail(email!);
    return json(res);
  } else if (goal === "change-password") {
    const res = await httpClient.requestChangeUserPassword();
    return json(res);
  }

  return null;
}

export default function MyAccountUser() {
  return (
    <Stack>
      <UserPersonalSection />
      <UserSecuritySection />
    </Stack>
  );
}
