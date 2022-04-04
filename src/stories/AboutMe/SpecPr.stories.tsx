import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { SpecPr } from "../../components/molucules/aboutMePrivate/SpecPr";

export default {
  component: SpecPr,
} as ComponentMeta<typeof SpecPr>;

export const Default: ComponentStoryObj<typeof SpecPr> = {
  storyName: "デフォルト",
};
