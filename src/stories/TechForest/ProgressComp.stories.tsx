import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ProgressComp } from "../../components/molucules/techForest/ProgressComp";

export default {
  component: ProgressComp,
} as ComponentMeta<typeof ProgressComp>;

export const Template: ComponentStoryObj<typeof ProgressComp> = {
  storyName: "進捗率表示バー",
  args: {
    TreeName: "React",
    AchievementRate: 80,
  },
};
