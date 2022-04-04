import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { SiteImage } from "../../components/atoms/aboutMePublic/SiteImage";

export default {
  component: SiteImage,
} as ComponentMeta<typeof SiteImage>;

export const Default: ComponentStoryObj<typeof SiteImage> = {
  args: {
    imageUrl: "Default",
    siteName: "Default",
  },
  storyName: "デフォルト",
};
