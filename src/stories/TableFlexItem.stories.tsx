import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { TableFlexItem } from "../components/atoms/TableFlexItem";

/**
 * 配列をBOXの形で回してくれるコンポーネント.
 */
export default {
  component: TableFlexItem,
} as ComponentMeta<typeof TableFlexItem>;

export const Default: ComponentStoryObj<typeof TableFlexItem> = {
  args: {
    itemArray: ["Default1", "Default2", "Default3"],
  },
  storyName: "デフォルト",
};

export const Delete: ComponentStoryObj<typeof TableFlexItem> = {
  args: {
    itemArray: ["Delete1", "Delete2", "Delete3"],
    deleteBtn: true,
  },
  storyName: "削除ボタンあり",
};
