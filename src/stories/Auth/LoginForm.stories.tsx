import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { LoginForm } from "../../components/organisms/auth/LoginForm";

export default {
  component: LoginForm,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof LoginForm>;

export const Template: ComponentStoryObj<typeof LoginForm> = {
  storyName: "ログインフォーム",
};
