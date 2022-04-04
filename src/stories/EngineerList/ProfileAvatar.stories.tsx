import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { ProfileAvatar } from "../../components/atoms/engineers/ProfileAvatar";

export default {
  component: ProfileAvatar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof ProfileAvatar>;

export const Template: ComponentStoryObj<typeof ProfileAvatar> = {
  storyName: "アバター",
};
