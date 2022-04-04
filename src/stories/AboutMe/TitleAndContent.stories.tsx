import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { TitleAndContent } from "../../components/atoms/aboutMePrivate/TitleAndContent";

export default {
  component: TitleAndContent,
} as ComponentMeta<typeof TitleAndContent>;

export const Default: ComponentStoryObj<typeof TitleAndContent> = {
  args: {
    title: "Default",
    content: "Default",
  },
  storyName: "デフォルト",
};
