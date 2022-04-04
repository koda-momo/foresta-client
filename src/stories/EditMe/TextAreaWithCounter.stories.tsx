import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { TextAreaWithCounter } from "../../components/atoms/common/TextAreaWithCounter";

/**
 * テキストエリアコンポーネント.
 */
export default {
  component: TextAreaWithCounter,
} as ComponentMeta<typeof TextAreaWithCounter>;

export const Default: ComponentStoryObj<typeof TextAreaWithCounter> = {
  args: {
    errorMessage: "Default",
    label: "Default",
    placeholder: "Default",
    counter: false,
  },
  storyName: "デフォルト",
};

export const Counter: ComponentStoryObj<typeof TextAreaWithCounter> = {
  args: {
    errorMessage: "Counter",
    label: "Counter",
    placeholder: "Counter",
    counter: true,
  },
  storyName: "カウンター有",
};
