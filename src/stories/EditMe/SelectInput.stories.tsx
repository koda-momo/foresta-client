import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { SelectInput } from "../../components/atoms/editMe/SelectInput";

/**
 * セレクトボックスコンポーネント.
 */
export default {
  component: SelectInput,
} as ComponentMeta<typeof SelectInput>;

export const Default: ComponentStoryObj<typeof SelectInput> = {
  args: {
    errorMessage: "Default",
    options: ["Default1", "Default2", "Default3"],
    label: "Default",
    placeholder: "Default",
  },
  storyName: "デフォルト",
};
