import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { SiteImageBox } from "../../components/molucules/aboutMePublic/SiteImageBox";

export default {
  component: SiteImageBox,
} as ComponentMeta<typeof SiteImageBox>;

export const Default: ComponentStoryObj<typeof SiteImageBox> = {
  storyName: "デフォルト",
};
