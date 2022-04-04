import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { EngineerComp } from "../../components/molucules/engineers/EngineerComp";

export default {
  component: EngineerComp,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof EngineerComp>;

export const Template: ComponentStoryObj<typeof EngineerComp> = {
  storyName: "エンジニアコンポーネント",
  args: {
    engineerId: "",
    engineerName: "ポストマン",
    engineerJobType: "フロントエンドエンジニア",
  },
};
