import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { CheckBoxInput } from "../../components/atoms/editMe/CheckBoxInput";

/**
 * チェックボックスコンポーネント.
 */
export default {
  component: CheckBoxInput,
} as ComponentMeta<typeof CheckBoxInput>;

export const Default: ComponentStoryObj<typeof CheckBoxInput> = {
  args: {
    errorMessage: "Default",
    array: ["Default", "Default", "Default"],
    label: "Default",
  },
  storyName: "デフォルト",
};
