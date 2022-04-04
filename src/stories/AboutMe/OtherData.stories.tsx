import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { OtherData } from "../../components/molucules/aboutMePrivate/OtherData";

export default {
  component: OtherData,
} as ComponentMeta<typeof OtherData>;

export const Default: ComponentStoryObj<typeof OtherData> = {
  storyName: "デフォルト",
};
