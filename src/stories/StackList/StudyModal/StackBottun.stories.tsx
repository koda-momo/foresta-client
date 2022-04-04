import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { StackButton } from "../../../components/atoms/study/StackBotton";

export default {
  component: StackButton,
} as ComponentMeta<typeof StackButton>;

export const AddStack: ComponentStoryObj<typeof StackButton> = {
  args: {
    title: "記録する",
  },
  storyName: "学習リストを記録するボタン",
};
export const UpdateStack: ComponentStoryObj<typeof StackButton> = {
  args: {
    title: "編集する",
  },
  storyName: "学習リストを編集するボタン",
};
export const DeleteStack: ComponentStoryObj<typeof StackButton> = {
  args: {
    title: "削除する",
  },
  storyName: "学習リストを削除するボタン",
};
