import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { EmailInput } from "../../components/atoms/auth/EmailInput";

export default {
  component: EmailInput,
} as ComponentMeta<typeof EmailInput>;

export const Template: ComponentStoryObj<typeof EmailInput> = {
  storyName: "メールアドレス入力フォーム",
};
