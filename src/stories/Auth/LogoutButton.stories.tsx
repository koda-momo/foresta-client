import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { LogoutButton } from "../../components/atoms/auth/LogoutButton";

export default {
  component: LogoutButton,
} as ComponentMeta<typeof LogoutButton>;

export const Template: ComponentStoryObj<typeof LogoutButton> = {
  storyName: "ログアウトボタン",
};
