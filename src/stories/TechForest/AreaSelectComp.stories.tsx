import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { techAreaMocks } from "../../../__mocks__/TechAreas";
import { AreaSelectComp } from "../../components/molucules/techForest/AreaSelectComp";

export default {
  component: AreaSelectComp,
} as ComponentMeta<typeof AreaSelectComp>;

export const Template: ComponentStoryObj<typeof AreaSelectComp> = {
  storyName: "技術エリア",
  parameters: {
    apolloClient: {
      mocks: techAreaMocks,
      addTypename: false,
    },
  },
};
