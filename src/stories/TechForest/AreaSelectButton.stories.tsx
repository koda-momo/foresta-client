import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { AreaSelectButton } from "../../components/atoms/techForest/AreaSelectButton";
import { action } from "@storybook/addon-actions";

export default {
  component: AreaSelectButton,
} as ComponentMeta<typeof AreaSelectButton>;

export const Template: ComponentStoryObj<typeof AreaSelectButton> = {
  storyName: "技術エリア選択ボタン",
  args: {
    techAreaTextData: "フロントエンド基本技術",
    indexOfTechArea: 0,
    changeArea: action("changeArea"),
  },
};
