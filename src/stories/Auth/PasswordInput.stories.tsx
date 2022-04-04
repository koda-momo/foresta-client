import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { PasswordInput } from "../../components/atoms/auth/PasswordInput";

export default {
  component: PasswordInput,
} as ComponentMeta<typeof PasswordInput>;

export const Template: ComponentStoryObj<typeof PasswordInput> = {
  storyName: "パスワード入力フォーム",
};
