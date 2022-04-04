import { action } from "@storybook/addon-actions";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { LoginButton } from "../../components/atoms/auth/LoginButton";

export default {
  component: LoginButton,
} as ComponentMeta<typeof LoginButton>;

export const Template: ComponentStoryObj<typeof LoginButton> = {
  storyName: "ログインボタン",
  args: {
    doLogin: action("doLogin"),
  },
};
