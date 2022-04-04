import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { SkillTable } from "../../components/molucules/aboutMePrivate/SkillTable";

export default {
  component: SkillTable,
} as ComponentMeta<typeof SkillTable>;

export const Default: ComponentStoryObj<typeof SkillTable> = {
  storyName: "デフォルト",
};
