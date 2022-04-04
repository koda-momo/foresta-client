import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { ButtonItem } from "../components/atoms/common/ButtonItem";

/**
 * ボタンコンポーネント.
 */
export default {
  component: ButtonItem,
} as ComponentMeta<typeof ButtonItem>;

export const Default: ComponentStoryObj<typeof ButtonItem> = {
  args: {
    onClick: () => {
      console.log("クリック");
    },
    name: "Default",
  },
  storyName: "デフォルト",
};

export const red: ComponentStoryObj<typeof ButtonItem> = {
  args: {
    onClick: () => {
      console.log("クリック");
    },
    name: "red",
    backgroundColor: "red",
  },
  storyName: "red",
};

export const gray: ComponentStoryObj<typeof ButtonItem> = {
  args: {
    onClick: () => {
      console.log("クリック");
    },
    name: "gray",
    backgroundColor: "gray",
  },
  storyName: "gray",
};
