import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { TextInput } from "../../components/atoms/common/TextInput";

/**
 * テキストボックスコンポーネント.
 */
export default {
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

export const Default: ComponentStoryObj<typeof TextInput> = {
  args: {
    errorMessage: "Default",
    label: "Default",
    placeholder: "Default",
    type: "text",
  },
  storyName: "デフォルト",
};
