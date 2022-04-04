import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { SiteDetail } from "../../components/molucules/aboutMePublic/SiteDetail";

export default {
  component: SiteDetail,
} as ComponentMeta<typeof SiteDetail>;

export const Default: ComponentStoryObj<typeof SiteDetail> = {
  args: {
    siteItem: {
      id: "Default",
      title: "Default",
      description: "Default",
      img: "Default.jpg",
      portfolioURL: "Default",
      specSheetId: "Default",
      skills: ["Default1", "Default2", "Default3"],
    },
  },
  storyName: "デフォルト",
};
